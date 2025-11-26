#!/bin/bash
DOCKER_USERNAME="nguyenminhquan2108"

echo "Pull Images"
docker pull $DOCKER_USERNAME/cvconnect-fe:latest

echo "Stop and Remove Existing Containers"
docker stop cvconnect-fe || true
docker rm cvconnect-fe || true

echo "Create Network if not exists"
docker network inspect cvconnect-network >/dev/null 2>&1 || docker network create cvconnect-network

echo "Run New Containers"
docker run -d --name cvconnect-fe --network cvconnect-network -p 3000:3000 $DOCKER_USERNAME/cvconnect-fe:latest

echo "Deployment Completed"