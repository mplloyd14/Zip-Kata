#!/bin/bash

# Absolute path to this script, e.g. /home/user/bin/foo.sh
SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname "$SCRIPT")
LOG_DIR='/var/log/cai'
BASE_DIR='/opt/cai'
APP_DIR='high-availability'

echo "Installing High Availability Server"

# logging
mkdir -p $LOG_DIR/$APP_DIR
#logrotate
cp $SCRIPTPATH/logrotate.cfg /etc/logrotate.d/highavailability

#aws cloudwatch

#daemon
cp $SCRIPTPATH/daemon.init /etc/init.d/highavailability
chmod +x /etc/init.d/highavailability
chkconfig --add highavailability
service highavailability start
