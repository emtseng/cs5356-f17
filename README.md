[![CircleCI](https://circleci.com/gh/emtseng/cs5356-f17.svg?style=svg)](https://circleci.com/gh/emtseng/cs5356-f17)


This project is built on Adam Fleming's [skeleton](https://github.com/amfleming/skeleton.git), a super simple foundation for building a scalable, RESTful HTTP server.

## Building with Docker
1. Run `./gradlew distTar` _this tells gradle to make a .tar file containing the java application code and all dependencies_
2. Run `docker build -t myapp .` _this runs the Dockerfile, and builds an image tagged with `myapp`.  See all images with `docker images`_
3. Run `docker run -p 80:8080 myapp` _this runs the `myapp` image, routing port 80 on **Your Machine** to port 8080 in **the container**_

## Uploading to DockerHub
1. Tag your image: `docker tag myapp YOUR_DOCKERHUB_NAME/myapp`
2. Push: `docker push YOUR_DOCKERHUB_NAME/myapp`
