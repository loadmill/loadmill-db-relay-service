#!/usr/bin/env bash
heroku ps:scale web=1 -a db-relay-service-staging
