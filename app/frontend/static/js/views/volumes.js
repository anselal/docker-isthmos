/**
 * Created by Anastasios Selalmazidis <t.selalmasidis@gmail.com> on 7/7/2016.
 */
var volumes = {
    name: 'volumes',
    header: 'Volumes',
    show: {
        header: true,
        toolbar: true,
        lineNumbers: true,
        footer: true
    },
    columns: [
        {field: 'Mountpoint', caption: 'Mountpoint', sortable: true, size: '100%'},
        {field: 'Name', caption: 'Name', sortable: true, size: '100%'},
        {field: 'Driver', caption: 'Driver', sortable: true, size: '80px'},
        {field: 'Labels', caption: 'Labels', sortable: true, size: '80px'}
    ],
    url: {
        get: '/docker/volumes'
    },
    sortData: [
        {field: 'Mountpoint', direction: 'asc'}
    ],
    multiSearch: false,
    searches: [
        {field: 'Mountpoint', caption: 'Mountpoint', type: 'text'},
        {field: 'Name', caption: 'Name', type: 'text'},
        {field: 'Driver', caption: 'Driver', type: 'text'},
        {field: 'Labels', caption: 'Labels', type: 'text'}
    ],
    toolbar: {
        name: 'volumes_toolbar',
        items: [
            {type: 'button', text: 'Add', id: 'add'},
            {type: 'break'},
            {type: 'button', text: 'Remove', id: 'remove', disabled: true}
        ]
    }
};

function initVolumesGridEvents() {
    w2ui['volumes'].toolbar.on('click', function (event) {
        onClickVolumesToolbar(event);
    });

    w2ui['volumes'].on('click', function (event) {
        onClickVolumes(event);
    });

    w2ui['volumes'].on('search', function (event) {
        onSearchVolumes(event);
    });

    w2ui['volumes'].on('reload', function (event) {
        onReloadVolumes(event);
    });
}//VOLUMES: init()

function onClickVolumesToolbar(event) {
    var selectionId = w2ui['volumes'].getSelection();
    var record = w2ui['volumes'].get(selectionId[0]);
    switch (event.target) {
        case 'remove':
            if (record == null) {
                w2popup.open({title: 'Message', body: 'No record selected'});
            }
            else {
                w2popup.open({title: 'Message', body: 'TO-DO'});
            }
            break;
        case 'add':
            w2popup.open({title: 'Message', body: 'TO-DO'});
            break;
    }
}//VOLUMES: toolbar.onClick()

function onClickVolumes(event) {
    w2ui['volumes'].toolbar.enable('remove');
}//VOLUMES: onClick()

function onSearchVolumes(event) {
    w2ui['volumes'].toolbar.disable('remove');
}//VOLUMES: onSearch()

function onReloadVolumes(event) {
    w2ui['volumes'].toolbar.disable('remove');
}//VOLUMES: onReload()

