#!/bin/bash

LOG_DIR='/log'
PE_DIR='pe-seed'
SYM_DIR='/opt/cai'
APP_DIR='../apps'
TAG_NAME='pe-seed_test_tag'

mkdir $LOG_DIR
mkdir $LOG_DIR/$PE_DIR

cd /opt/cai

echo "$SYM_DIR/$PE_DIR to $APP_DIR/$PE_DIR/$TAG_NAME"
ln -f -s $APP_DIR/$PE_DIR/$TAG_NAME $PE_DIR

service pe-seed start
