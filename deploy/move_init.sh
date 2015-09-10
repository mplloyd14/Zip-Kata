#!/bin/sh

echo "## Moving pe-seed init script to /etc/init.d"
cp ../init/pe-seed /etc/init.d

echo "## Making init script executable"
chmod +x /etc/init.d/pe-seed
chkconfig --add pe-seed

echo "## Starting pe-seed service"
service pe-seed start
