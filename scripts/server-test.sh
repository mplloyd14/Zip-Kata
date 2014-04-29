#!/bin/bash

BASE_DIR=`dirname $0`

echo "Running server tests..."
node $BASE_DIR/../node_modules/mocha/bin/mocha -R xunit $BASE_DIR/../test/unit/server --globals NODE_CONFIG,exportscoffeeScripts > $BASE_DIR/../test/out/unit_server.xml
