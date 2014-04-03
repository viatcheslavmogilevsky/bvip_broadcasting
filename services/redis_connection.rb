require 'redis'
require 'hiredis'
require 'yaml'
#require 'redis-namespace'

module Services
  class RedisConnection
    def self.generate_config(config_path, environment)
      all_configurations = ::YAML.load(File.open(config_path)) 
      current_config = (all_configurations[environment] || all_configurations['default'])
      #namespace = current_config.delete('namespace')

      current_config.instance_exec do
        keys.each do |key|
          self[key.to_sym] = delete(key)
        end
      end

      current_config
    end
  end
end