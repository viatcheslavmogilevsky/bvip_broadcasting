# bundle install --path vendor/bundle
 
mkdir -p tmp/puma
 
bundle exec puma -d --config config/puma.rb