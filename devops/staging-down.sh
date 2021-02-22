#!/usr/bin/env bash
heroku ps:scale web=0 -a db-relay-service-staging
