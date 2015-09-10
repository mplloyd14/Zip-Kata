#!/bin/bash
# mongo/bin must be in path
BASE_DIR=`dirname $0`

server=$1
if [[ $server = "" ]]
then
    server=localhost
fi

echo "Importing Product definitions..."
mongoimport -h $server --port 27017 -d evolution -c productDefinitions --drop --jsonArray --stopOnError --file $BASE_DIR/../data/productDefinitions.json

echo "Importing Companies..."
mongoimport -h $server --port 27017 -d evolution -c companies --drop --jsonArray --stopOnError --file $BASE_DIR/../data/companies.json

echo "Importing users..."
mongoimport -h $server --port 27017 -d evolution -c users --drop --jsonArray --stopOnError --file $BASE_DIR/../data/users.json
