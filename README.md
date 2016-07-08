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

#### At this moment the UI supports:
* Browsing local images
* Viewing, stopping, deleting running containers
* Viewing local volumes
* Searching hub.docker.com for images
* Viewing some docker and system information like OS, RAM, CPU, Docker Version etc.

#### Work to be done
* Run containers
* Show all containers, not only running ones
* Create and delete Volumes
* Pull images
