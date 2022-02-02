#!/bin/bash

sudo service nginx stop

postgres_pid=$(sudo netstat -tulpn | grep -m1 postgres | tr -d ' ' | cut -c 35-37)

sudo kill $postgres_pid
