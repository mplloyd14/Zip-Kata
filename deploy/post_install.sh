#!/bin/bash

LOG_DIR='/log'
SERVICE_DIR='deploy_test'
PE_DIR='pe-seed'
SYM_DIR='/opt/cai'
APP_DIR='/opt/apps'
TAG_NAME='pe-seed_test_tag'

mkdir $LOG_DIR
mkdir $LOG_DIR/$PE_DIR

echo "$SYM_DIR/$PE_DIR to $APP_DIR/$SERVICE_DIR/$TAG_NAME"
ln -fsn $APP_DIR/$SERVICE_DIR/$TAG_NAME $PE_DIR

service pe-seed start
