# Receipt Tracker

[![CircleCI](https://circleci.com/gh/emtseng/cs5356-f17.svg?style=svg)](https://circleci.com/gh/emtseng/cs5356-f17)

Production: [v.2.0](http://ec2-54-82-243-98.compute-1.amazonaws.com)

A simple app for recording and tracking receipts. Java-based backend and API, React frontend.

This project is built on Adam Fleming's [skeleton](https://github.com/amfleming/skeleton.git), a super simple foundation for building a scalable, RESTful HTTP server.

## Building with Docker
1. Run `./gradlew distTar` _this tells gradle to make a .tar file containing the java application code and all dependencies_
2. Run `docker build -t myapp .` _this runs the Dockerfile, and builds an image tagged with `myapp`.  See all images with `docker images`_
3. Run `docker run -p 80:8080 myapp` _this runs the `myapp` image, routing port 80 on **Your Machine** to port 8080 in **the container**_

## Pushing to DockerHub
1. Tag your image: `docker tag myapp YOUR_DOCKERHUB_NAME/myapp`
2. Push: `docker push YOUR_DOCKERHUB_NAME/myapp`

## Pushing to AWS (after setup)
1. Run `docker images` to find the tag for your AWS cluster. It'll be something along the lines of `YOUR_ACCOUNT_ID.dkr.ecr.YOUR_REGION.amazonaws.com/YOUR_APP_NAME`
2. Re-build an image tagged for your AWS cluster: `docker build -t YOUR_AWS_TAG .`
3. Push the image: `docker push YOUR_AWS_TAG`

You may need to log into AWS again. If prompted, enter ```aws ecr get-login --no-include-email``` for Docker 17.06+.
