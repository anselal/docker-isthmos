import docker
import json
import os

from app.backend import app
from flask import render_template, jsonify, request, redirect, url_for

# -------------------------------------------------------------------------------
# Docker-isthmos

# Enable functionality on OS X and Linux hosts
client = docker.from_env(assert_hostname=False) \
    if os.getenv('DOCKER_HOST') \
    else docker.Client(base_url='unix://var/run/docker.sock')


@app.route('/')
def hello():
    return redirect(url_for('docker_isthmos'))


@app.route('/docker/isthmos')
def docker_isthmos():
    return render_template('index.html')


@app.route('/docker/images')
def docker_images():
    images = client.images()
    recid_counter = 1
    sort = {}
    search = {}
    for image in images:
        image['recid'] = recid_counter
        recid_counter += 1

    # check for GET parameters and sort returned list
    if request.args:
        if request.args.get('search[0][field]'):
            search['field'] = request.args.get('search[0][field]')
            search['value'] = request.args.get('search[0][value]')
            images = [i for i in images for x in i[search['field']] if search['value'] in x]
        sort['field'] = request.args.get('sort[0][field]')
        sort['direction'] = request.args.get('sort[0][direction]')
        if sort['direction'] == 'desc':
            sortedDirection = True
        elif sort['direction'] == 'asc':
            sortedDirection = False
        images = sorted(images, key=lambda k: k[sort['field']], reverse=sortedDirection)

    return jsonify(status="success", total=len(images), records=images)
    # return render_template('docker/index.html', images=images)


@app.route('/docker/images/history/<imageId>')
def docker_image_histoty(imageId):
    imageHistory = client.history(imageId)
    return jsonify(status="success", total=len(imageHistory), records=imageHistory)


@app.route('/docker/images/search/<search_str>')
def docker_search(search_str):
    search_results = client.search(search_str)
    recid_counter = 1
    results = []
    sort = {}
    search = {}
    for result in search_results:
        result['recid'] = recid_counter
        results.append(result)
        recid_counter += 1

    # check for GET parameters and sort returned list
    if request.args:
        if request.args.get('search[0][field]'):
            search['field'] = request.args.get('search[0][field]')
            search['value'] = request.args.get('search[0][value]')
            results = filter(lambda d: search['value'] in d[search['field']], results)
        sort['field'] = request.args.get('sort[0][field]')
        sort['direction'] = request.args.get('sort[0][direction]')
        if sort['direction'] == 'desc':
            sortedDirection = True
        elif sort['direction'] == 'asc':
            sortedDirection = False
        results = sorted(results, key=lambda k: k[sort['field']], reverse=sortedDirection)

    return jsonify(status="success", total=len(results), records=results)


@app.route('/docker/images/pull/<imageName>')
def docker_image_pull(imageName):
    for line in client.pull(imageName, stream=True):
        print(json.dumps(json.loads(line), indent=4))
    return jsonify(status="success", total=len(imageName), records=imageName)


@app.route('/docker/containers')
def docker_containers():
    containers = client.containers()
    recid_counter = 1
    sort = {}
    search = {}
    for container in containers:
        container['recid'] = recid_counter
        recid_counter += 1

    # check for GET parameters and sort returned list
    if request.args:
        if request.args.get('search[0][field]'):
            search['field'] = request.args.get('search[0][field]')
            search['value'] = request.args.get('search[0][value]')
            containers = filter(lambda d: search['value'] in d[search['field']], containers)
        sort['field'] = request.args.get('sort[0][field]')
        sort['direction'] = request.args.get('sort[0][direction]')
        if sort['direction'] == 'desc':
            sortedDirection = True
        elif sort['direction'] == 'asc':
            sortedDirection = False
        containers = sorted(containers, key=lambda k: k[sort['field']], reverse=sortedDirection)

    return jsonify(status="success", total=len(containers), records=containers)


@app.route('/docker/container/top/<containerId>')
def docker_container_top(containerId):
    containerProcesses = client.top(containerId)
    procs = []
    recid_counter = 1
    sort = {}
    for proc in containerProcesses['Processes']:
        proc_zipped_temp = zip(containerProcesses['Titles'], proc)
        procs.append(dict(proc_zipped_temp))
    containerProcesses = {}
    containerProcesses = procs
    for proc in containerProcesses:
        proc['recid'] = recid_counter
        recid_counter += 1

    # check for GET parameters and sort returned list
    if request.args:
        sort['field'] = request.args.get('sort[0][field]')
        sort['direction'] = request.args.get('sort[0][direction]')
        if sort['direction'] == 'desc':
            sortedDirection = True
        elif sort['direction'] == 'asc':
            sortedDirection = False
        containerProcesses = sorted(containerProcesses, key=lambda k: k[sort['field']], reverse=sortedDirection)

    return jsonify(status="success", total=len(containerProcesses), records=containerProcesses)


@app.route('/docker/container/logs/<containerId>')
def docker_container_logs(containerId):
    containerLogs = client.logs(containerId, timestamps=True, tail=20)
    containerLogs_splitlines = containerLogs.splitlines()
    logs = []
    recid_counter = 1
    for line in containerLogs_splitlines:
        log = {"Log": line, "recid": recid_counter}
        recid_counter += 1
        logs.append(log)
    return jsonify(status="success", total=len(logs), records=logs)


@app.route('/docker/container/stop/<containerId>')
def docker_container_stop(containerId):
    client.stop(containerId)
    return jsonify(status="success")


@app.route('/docker/container/remove/<containerId>')
def docker_container_remove(containerId):
    client.remove_container(container=containerId, force=True)
    return jsonify(status="success")


@app.route('/docker/volumes')
def docker_volumes():
    volumes = client.volumes()
    vols = []
    recid_counter = 1
    sort = {}
    search = {}
    for volume in volumes['Volumes']:
        volume['recid'] = recid_counter
        vols.append(volume)
        recid_counter += 1

    # check for GET parameters and sort returned list
    if request.args:
        if request.args.get('search[0][field]'):
            search['field'] = request.args.get('search[0][field]')
            search['value'] = request.args.get('search[0][value]')
            vols = filter(lambda d: search['value'] in d[search['field']], vols)
        sort['field'] = request.args.get('sort[0][field]')
        sort['direction'] = request.args.get('sort[0][direction]')
        if sort['direction'] == 'desc':
            sortedDirection = True
        elif sort['direction'] == 'asc':
            sortedDirection = False
        vols = sorted(vols, key=lambda k: k[sort['field']], reverse=sortedDirection)

    return jsonify(status="success", total=len(vols), records=vols)


@app.route('/docker/version_info')
def docker_version_info():
    version = client.version()
    info = client.info()
    version_info = {}
    version_info['Version'] = version
    version_info['Info'] = info
    return jsonify(status="success", records=version_info)
