#!/bin/bash

BASE_DIR=`dirname $0`

echo "Importing Product definitions..."
mongoimport -h localhost --port 27017 -d mobileconnect -c productDefinitions --drop --jsonArray --stopOnError --file "$BASE_DIR/../test/data/productDefinitions.json"

echo "Importing Companies..."
mongoimport -h localhost --port 27017 -d mobileconnect -c companies --drop --jsonArray --stopOnError --file "$BASE_DIR/../test/data/companies.json"

echo "Loading users..."
mongo localhost:27017/mobileconnect --eval "db.users.drop()"
node "$BASE_DIR/../../Project-Evolution/test/util/seed_users.js" "$BASE_DIR/../test/data/users.json"
