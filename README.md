# mongotastrophe
  opensource microservice nodejs for MongoDB database operations
  Is actually run inside a server
  WARNING : there is no security provided in the template, security must be set above the template. (Injection proterction, rate limiter, IP blacklisting)

  composants : 
  - nodejs
  - MongoDb
  - Docker
  - Docker compose

## Introduction
Mongotastrphe is a very basic open source MIT Licensed microservice that have only one responsibility, expose an API to request a MongoDB single database

## to run in local
docker-compose -f docker-compose-local.yml --env-file .env-local up --build

## Docker compose template

version: '3'

services:
  mongotastrophe:
    image: mino189/mongotastrophe:xxx
    networks:
      - xxx
      - xxx
    environment:
      API_PORT: 3000
      MONGO_URL: mongodb://user:password@hostname:27017/dbname?authSource=admin
      ENDPOINT: /endpoint
      BASIC_AUTH_USER: xxxx
      BASIC_AUTH_PASSWORD: xxxx
