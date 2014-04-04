bundle install  # --path vendor/bundle
 
mkdir -p tmp/puma
 
bundle exec puma -d -e production --config config/puma.rb