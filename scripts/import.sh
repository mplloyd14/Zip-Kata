#!/bin/bash
# mongo/bin must be in path
BASE_DIR=`dirname $0`

echo "Importing Product definitions..."
mongoimport -h localhost --port 27017 -d mobileconnect -c productDefinitions --drop --jsonArray --stopOnError --file $BASE_DIR/../data/productDefinitions.json

echo "Importing Companies..."
mongoimport -h localhost --port 27017 -d mobileconnect -c companies --drop --jsonArray --stopOnError --file $BASE_DIR/../data/companies.json

echo "Importing users..."
mongoimport -h localhost --port 27017 -d mobileconnect -c users --drop --jsonArray --stopOnError --file $BASE_DIR/../data/users.json

echo "Importing state data..."
mongoimport -h localhost --port 27017 -d mobileconnect -c states --drop --jsonArray --stopOnError --file $BASE_DIR/../data/states-cities.json

echo "Importing fake job data..."
mongoimport -h localhost --port 27017 -d mobileconnect -c jobs --drop --jsonArray --stopOnError --file $BASE_DIR/../data/fake_jobs.json
