# semirara

- https://github.com/shokai/semirara
- http://semirara.herokuapp.com

[![Circle CI](https://circleci.com/gh/shokai/semirara.svg?style=svg)](https://circleci.com/gh/shokai/semirara)


## Requirements
- Node.js
- Memcached
- MongoDB

## Setup

[Register new app on GitHub](https://github.com/settings/applications/new)

    % cp sample.env .env
    % npm install


## Develop

    % npm run watch
    % npm run start:dev


## Deploy

    % NODE_ENV=production npm start


## Deploy on Heroku

### create app

    % heroku apps:create [app_name]
    % git push heroku master

### config

    % heroku config:add TZ=Asia/Tokyo
    % heroku config:set "DEBUG=semirara*,koa*"
    % heroku config:set NODE_ENV=production
    % heroku config:set GITHUB_CLIENT_ID=your-client-id
    % heroku config:set GITHUB_CLIENT_SECRET=your-client-secret

### enable MongoDB plug-in

    % heroku addons:create mongolab
    # or
    % heroku addons:create mongohq

### enable Memcached plug-in

    % heroku addons:create memcachier

### logs

    % heroku logs --num 300
    % heroku logs --tail