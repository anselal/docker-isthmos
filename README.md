# docker-isthmos
Docker UI

I wanted to create an easy to use docker UI with a small footprint so I used
Flask and docker-py for the backend and w2ui for the frontend.

![Alt text](/screenshots/docker-isthmos_ImagesGrid.png "Isthmos - Images Grid")

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
Build docker image with following command:
```
$ docker build -t anselal/docker-isthmos:v0.0.1 .
```

Run docker container with the following command:
```
$ docker run -d -p 5000:5000 -v /var/run/docker.sock:/var/run/docker.sock anselal/isthmos:v0.0.1
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
