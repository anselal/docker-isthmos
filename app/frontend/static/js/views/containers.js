/**
 * Created by Anastasios Selalmazidis <t.selalmasidis@gmail.com> on 7/7/2016.
 */
var containers = {
    name: 'containers',
    header: 'Containers',
    show: {
        header: true,
        toolbar: true,
        lineNumbers: true,
        footer: true
    },
    columns: [
        {field: 'Image', caption: 'Image', sortable: true, size: '80px'},
        {field: 'Names', caption: 'Names', sortable: true, size: '150px'},
        //{field: 'Id', caption: 'Id', sortable: true, size: '150px'},
        //{field: 'Command', caption: 'Command', sortable: true, size: '40%'},
        //{field: 'NetworkSettings.Networks.bridge.IPAddress', caption: 'IPAddress', size: '90px'},
        //{field: 'NetworkSettings.Networks.bridge.MacAddress', caption: 'MacAddress', size: '100px'},
        {field: 'State', caption: 'State', sortable: true, size: '80px'}
        //{field: 'Status', caption: 'Status', sortable: true, size: '80px', attr: 'align="center"'}
    ],
    url: {
        get: 'http://127.0.0.1:5000/docker/containers'
    },
    sortData: [
        {field: 'Image', direction: 'asc'}
    ],
    multiSearch: false,
    searches: [
        {field: 'Image', caption: 'Image', type: 'text'},
        {field: 'Id', caption: 'Id', type: 'text'},
        {field: 'Command', caption: 'Command', type: 'text'},
        {field: 'State', caption: 'State', type: 'text'},
        {field: 'Status', caption: 'Status', type: 'text'}
    ],
    toolbar: {
        name: 'containers_toolbar',
        items: [
            {
                type: 'menu', id: 'action', caption: 'Action', disabled: true,
                items: [
                    {text: 'Stop Container', id: 'stop'},
                    {text: 'Remove Container', id: 'remove'}
                ]
            },
            {type: 'break'},
            {type: 'check', id: 'show_all', caption: 'Show All', icon: 'icon-bullet-black'}
        ]
    }
};

function initContainersGridEvents() {
    w2ui['containers'].toolbar.on('click', function (event) {
        onClickContainersToolbar(event);
    });

    w2ui['containers'].on('click', function (event) {
        onClickContainers(event);
    });

    w2ui['containers'].on('search', function (event) {
        onSearchContainers(event);
    });

    w2ui['containers'].on('reload', function (event) {
        onReloadContainers(event);
    });
}//CONTAINERS: init()

function onClickContainersToolbar(event) {
    var selectionId = w2ui['containers'].getSelection();
    var record = w2ui['containers'].get(selectionId[0]);
    switch (event.target) {
        case 'action:stop':
            if (record == null) {
                w2popup.open({title: 'Message', body: 'No record selected'});
            }
            else {
                //w2popup.open({title: 'Popup Title HTML', body: containerId, buttons: 'Buttons HTML'});
                msg = "Are you sure you want to stop container <b>" + record.Image + "</b> with name(s) <b>" + record.Names + "</b>?"
                w2confirm(msg, "Stop Container", function btn(answer) {
                    // Yes or No -- case-sensitive
                    switch (answer) {
                        case 'Yes':
                            $.get("http://127.0.0.1:5000/docker/container/" + record.Id + '/stop', function () {
                            })
                                .done(function () {
                                    success_message = "<h2>Container stopped</h2><br><br>Image: " + record.Image + "<br>Names: " + record.Names + "<br>Id: " + record.Id;
                                    w2popup.open({
                                        title: 'Success',
                                        body: success_message,
                                    });
                                    w2ui['containers'].reset();
                                })
                                .fail(function () {
                                    alert("error");
                                });
                            break;
                        case 'No':
                            break;
                    }
                });
            }
            break;
        case 'action:remove' :
            if (record == null) {
                w2popup.open({
                    title: 'Message',
                    body: 'No record selected'
                });
            }
            else {
                //w2popup.open({title: 'Popup Title HTML', body: record.Id, buttons: 'Buttons HTML'});
                msg = "Are you sure you want to remove container <b>" + record.Image + "</b> with name(s) <b>" + record.Names + "</b>?"
                w2confirm(msg, "Remove Container", function btn(answer) {
                    // Yes or No -- case-sensitive
                    switch (answer) {
                        case 'Yes':
                            $.get("http://127.0.0.1:5000/docker/container/" + record.Id + '/remove', function () {
                            })
                                .done(function () {
                                    success_message = "<h2>Container removed</h2><br><br>Image: " + record.Image + "<br>Names: " + record.Names + "<br>Id: " + record.Id
                                    w2popup.open({
                                        title: 'Success',
                                        body: success_message,
                                    });
                                    w2ui['containers'].reset();
                                })
                                .fail(function () {
                                    alert("error");
                                });
                            break;
                        case 'No':
                            break;
                    }
                });
            }
            break;
    }
}//CONTAINERS: toolbar.onClick()

function onClickContainers(event) {
    var record = w2ui['containers'].get(event.recid);
    ports = "";
    if (record.hasOwnProperty("Ports")) {
        ports = container_ports(record.Ports);
    }
    else {
        ports = "[]";
    }

    w2ui['master_details'].clear();
    w2ui['master_details'].add([
        {recid: 0, name: 'Image:', value: record.Image},
        {recid: 1, name: 'Names:', value: record.Names},
        {recid: 2, name: 'Id:', value: record.Id},
        {recid: 3, name: 'Command:', value: record.Command},
        {recid: 4, name: 'IPAddress:', value: record.NetworkSettings.Networks.bridge.IPAddress},
        {recid: 5, name: 'MacAddress:', value: record.NetworkSettings.Networks.bridge.MacAddress},
        {recid: 6, name: 'State:', value: record.State},
        {recid: 7, name: 'Ports:', value: ports}
    ]);

    // Load Container Processses
    w2ui['container_processes'].clear();
    w2ui['container_processes'].load('http://127.0.0.1:5000/docker/container/' + record.Id + '/top');

    // Load Container Logs
    w2ui['container_logs'].clear();
    w2ui['container_logs'].load('http://127.0.0.1:5000/docker/container/' + record.Id + '/logs');

    // Get string or JSON data and add it to the bottom of the layout
    /*
     $.get('http://127.0.0.1:5000/docker/container/' + record.Id + '/logs', function (data, status) {
     w2ui['layout'].content('bottom', "Data: " + data + "\nStatus: " + status);
     });

     $.getJSON('http://127.0.0.1:5000/docker/container/' + record.Id + '/', function (result) {
     $.each(result, function (i, field) {
     //$("div").append(field + " ");
     w2ui['layout'].content('bottom', field + " ");
     });
     });
     */

    // Enable toolbar buttons
    w2ui['containers'].toolbar.enable('action');
}//CONTAINERS: onClick()

function onSearchContainers(event) {
    w2ui['containers'].toolbar.disable('action');
    w2ui['master_details'].clear();
}//CONTAINERS: onSearch()

function onReloadContainers(event) {
    w2ui['containers'].toolbar.disable('action');
    w2ui['master_details'].clear();
    w2ui['container_processes'].clear();
    w2ui['container_logs'].clear();
}//CONTAINERS: onReload()

