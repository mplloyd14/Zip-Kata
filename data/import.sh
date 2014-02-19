#!/bin/bash

BASE_DIR=`dirname $0`

echo "Importing Product definitions..."
mongoimport -h localhost --port 27017 -d mobileconnect -c productDefinitions --drop --jsonArray --stopOnError --file "$BASE_DIR/productDefinitions.json"

echo "Importing Product instances..."
mongoimport -h localhost --port 27017 -d mobileconnect -c productInstances --drop --jsonArray --stopOnError --file "$BASE_DIR/productInstances.json"

echo "Importing Companies..."
mongoimport -h localhost --port 27017 -d mobileconnect -c companies --drop --jsonArray --stopOnError --file "$BASE_DIR/companies.json"

echo "Loading users..."
mongo localhost:27017/mobileconnect --eval "db.users.drop()"
node "$BASE_DIR/../../mobileconnect/test/util/seed_users.js" "$BASE_DIR/users.json"
