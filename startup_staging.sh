bundle install  # --path vendor/bundle
 
mkdir -p tmp/puma
 
bundle exec puma -d -e staging --config config/puma.rb