# Development Status

[![Requirements Status](https://requires.io/github/anselal/docker-isthmos/requirements.svg?branch=master)](https://requires.io/github/anselal/docker-isthmos/requirements/?branch=master)

# docker-isthmos
Docker UI

I wanted to create an easy to use docker UI with a small footprint so I used
Flask and docker-py for the backend and w2ui for the frontend.

## Install

To install the dependencies use pip:
```
$ pip install -r requirements.txt
```

## Run

Start the application with the following command:
```
$ python run.py
```

## Dockerize (optionally)

In case you want to build the container on your own (optionally)
```
$ docker build -t anselal/docker-isthmos:0.0.2 .
```

Otherwise download the container from hub.docker.com (optionally)
```
$ docker pull anselal/docker-isthmos:0.0.2
```

Run docker container with the following command:
```
$ docker run -d -p 5000:5000 -v /var/run/docker.sock:/var/run/docker.sock anselal/docker-isthmos:0.0.2
```

#### At this moment the UI supports:
* Browsing, removing local images
* Viewing, stopping, deleting running containers
* Viewing local volumes
* Searching hub.docker.com for images
* Viewing some docker and system information like OS, RAM, CPU, Docker Version etc.

#### Work to be done
* Run containers
* Show all containers, not only running ones
* Create and delete Volumes
* Pull images
