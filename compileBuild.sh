#!/bin/bash

# This script compiles the code of the entire app 
# and builds a docker image of the app.

npm run build

docker build -t docker-app .


# To start the container:
# docker run -it \
#   -v ${PWD}:/usr/src/app \
#   -v /usr/src/app/node_modules \
#   -p 3000:3000 \
#   --rm \
#   docker-app