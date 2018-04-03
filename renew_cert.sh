#!/bin/bash

# simple script for renewing letsencrypt certs (perhaps via cron)
# temporarily stop docker container (to open port 443)
echo "[$(date)] renewing letsencrypt cert"
docker stop shelves-app
# renew cert
letsencrypt renew
# restart the stopped container
docker start shelves-app