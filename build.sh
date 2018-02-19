#!/bin/bash

VERSION=$(cat package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]')
REPOSITORY="amangion"
APP_NAME="snake-coin-backend"

export TAG_BASE=$REPOSITORY/$APP_NAME
export TAG=$TAG_BASE:${VERSION}

docker login

docker build -t $TAG .

docker tag $TAG $APP_NAME
docker push $TAG

docker tag $TAG $TAG_BASE:latest
docker push $TAG_BASE:latest
