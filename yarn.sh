#!/bin/sh
docker run -it --rm -v "$PWD":/usr/src/app -w /usr/src/app node:8.11.1 yarn "$@"
