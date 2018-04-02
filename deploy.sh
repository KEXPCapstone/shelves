#!/usr/bin/env bash
. build.sh
echo "Deploying to DigitalOcean Droplet; You may be prompted to enter your SSH passphrase:"
ssh root@kexpshelves.com << HERE
    docker pull johnlawsharrison/shelves
    docker rm -f shelves-app
    docker run -d \
    --name shelves-app \
    -p 80:80 -p 443:443 \
    -v /etc/letsencrypt:/etc/letsencrypt:ro \
    johnlawsharrison/shelves
HERE