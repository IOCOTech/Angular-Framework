cd usr/share/nginx/html

contents="$(jq --arg apiBaseURL "$apiBaseURL" '.apiBaseURL = $apiBaseURL' config.json)" && echo ${contents} > config.json
# contents="$(jq --arg appInsightsKey "$appInsightsKey" '.appInsightsKey = $appInsightsKey' config.json)" && echo ${contents} > config.json

nginx -g 'daemon off;'