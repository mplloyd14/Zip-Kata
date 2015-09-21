#!/bin/bash

LOG_DIR='/log'
PE_DIR='/pe-seed'

mkdir $LOG_DIR
mkdir $LOG_DIR/$PE_DIR

service pe-seed start
