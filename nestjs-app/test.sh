#!/bin/sh

docker build -t web-sample-api-test .
docker run --rm --name web-sample-api-test -v $(pwd):/app web-sample-api-test sh -c "cd /app && npm install && npm run test"