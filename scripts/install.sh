#!/bin/bash

BASE_DIR=`dirname $0`
LOG_DIR='/var/log/cai'
BASE_DIR='/opt/cai'
APP_DIR='high-availability'

echo "Installing High Availability Server"

# logging
mkdir -p $LOG_DIR/$APP_DIR
#logrotate
cp $BASE_DIR../scripts/logrotate.cfg /etc/logrotate.d/highavailability

#aws cloudwatch

#daemon
cp $BASE_DIR../scripts/daemon.init /etc/init.d/highavailability
chmod +x /etc/init.d/highavailability
chkconfig --add highavailability
service highavailability start
