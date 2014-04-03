#!/usr/bin/env ruby
 
require 'sinatra/base'
require './services/redis_connection.rb'
 
class Broadcaster < Sinatra::Base

  MESSAGE_FIELDS = {
    user_changes: 'activity_log',
    company_changes: 'activity_log',
    general_changes: 'activity_log',
    status_changes: 'status'
  }

  def build_channel_map(user_id,company_id)
    {
      user_changes: "bvip:user_changes:#{user_id}",
      company_changes: "bvip:company_changes:#{company_id}",
      general_changes: "bvip:general_changes",
      status_changes: "bvip:status_changes:#{user_id}"
    }
  end

  configure do
    set :server, :puma
    set :redis_config, Services::RedisConnection.generate_config( File.join(settings.root, 'config/redis.yml') , self.environment )
  end

  get '/stream', provides: 'text/event-stream' do
    redis_client = Redis.new(settings.redis_config)
    user_id, company_id = redis_client.hmget("bvip:auth_token:#{params[:auth_token]}", 'user_id', 'company_id')
    channel_map = build_channel_map(user_id, company_id)
    inverted_map = channel_map.invert

    stream :keep_open do |out|
      redis_client.subscribe(*channel_map.values) do |on|
        on.message do |channel, msg|
          out << "data: #{msg} \n\n"
          if (channel == channel_map[:status_changes]) && (msg == '1')
            redis_client.unsubscribe(*channel_map.values)
          end
        end

        on.unsubscribe do |channel, subscriptions|
          out.close
        end
      end
    end
  end
end