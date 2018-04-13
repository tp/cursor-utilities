#!/bin/sh
docker run -it --rm -p 8080:8080 -v "$PWD":/usr/src/app -w /usr/src/app node:8.11.1 yarn run start
