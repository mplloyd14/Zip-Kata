#!/bin/bash

LOG_DIR='/log'
PE_DIR='/pe-seed'
SYM_DIR='/opt/cai'
APP_DIR='/opt/app'

mkdir $LOG_DIR
mkdir $LOG_DIR/$PE_DIR

ln -f -s $APP_DIR/$PE_DIR $SYM_DIR/$PE_DIR

service pe-seed start
