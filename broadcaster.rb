#!/usr/bin/env ruby
 
require 'sinatra/base'
require './services/redis_connection.rb'
 
class Broadcaster < Sinatra::Base

  def build_channel_map(user_id,company_id,device_id)
    {
      user_changes: "bvip:user_changes:#{user_id}",
      company_changes: "bvip:company_changes:#{company_id}",
      general_changes: "bvip:general_changes",
      disconnect_channel: "bvip:disconnect:#{user_id}",
      disconnect_device_channel: "bvip:disconnect_device:#{device_id}"
    }
  end

  configure do
    set :server, :puma
    set :redis_config, Services::RedisConnection.generate_config( File.join(settings.root, 'config/redis.yml') , self.environment )
  end

  get '/stream', provides: 'text/event-stream' do
    redis_client = Redis.new(settings.redis_config)
    user_id, company_id, device_id = redis_client.hmget("bvip:auth_token:#{params[:auth_token]}", 'user_id', 'company_id', 'device_id')
    puts "Connected: (id: #{user_id}; company_id: #{company_id}; device_id: #{device_id})"
    channel_map = build_channel_map(user_id, company_id, device_id)

    stream :keep_open do |out|
      redis_client.subscribe(*channel_map.values) do |on|
        on.message do |channel, msg|
          if (channel =~ /disconnect/)
            puts "Disconnected: (id: #{user_id}) from channel #{channel}"
            redis_client.unsubscribe(*channel_map.values)
          else
            puts "To (id: #{user_id}): #{msg[0..90]}"
            out << "data: #{msg} \n\n"
          end
        end

        on.unsubscribe do |channel, subscriptions|
          out.close
        end
      end
    end
  end
end