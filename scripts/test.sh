#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Running all tests..."
echo "-------------------------------------------------------------------"

echo "Running server tests..."
node $BASE_DIR/../node_modules/mocha/bin/mocha -R xunit $BASE_DIR/../test/unit/server --globals NODE_CONFIG,exportscoffeeScripts > $BASE_DIR/../test/out/unit_server.xml

echo "Running client tests..."
$BASE_DIR/../node_modules/karma/bin/karma start $BASE_DIR/../test/config/karma.conf.js $*

echo "Running e2e tests..."
$BASE_DIR/../node_modules/protractor/bin/protractor $BASE_DIR/../test/config/protractor.conf.js %*


echo "all test suites complete"
echo "-------------------------------------------------------------------"
