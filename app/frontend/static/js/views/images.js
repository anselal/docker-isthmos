/**
 * Created by Anastasios Selalmazidis <t.selalmasidis@gmail.com> on 7/7/2016.
 */
var images = {
    name: 'images',
    header: 'Images',
    show: {
        header: true,
        toolbar: true,
        lineNumbers: true,
        footer: true
    },
    columns: [
        {field: 'RepoTags', caption: 'RepoTags', sortable: true, size: '180px'},
        {field: 'Id', caption: 'Id', sortable: true, size: '230px'}
    ],
    url: {
        get: 'http://127.0.0.1:5000/docker/images'
    },
    sortData: [
        {field: 'RepoTags', direction: 'asc'}
    ],
    multiSearch: false,
    searches: [
        {field: 'RepoTags', caption: 'RepoTags', type: 'text'}
    ],
    toolbar: {
        name: 'images_toolbar',
        items: [
            {
                type: 'menu', id: 'action', caption: 'Action', disabled: true,
                items: [{text: 'Run', id: 'run'}]
            },
            {type: 'break'}
        ]
    }
};

function initImagesGridEvents() {
    w2ui['images'].toolbar.on('click', function (event) {
        onClickImagesToolbar(event);
    });

    w2ui['images'].on('click', function (event) {
        onClickImages(event);
    });

    w2ui['images'].on('search', function (event) {
        onSearchImages(event);
    });

    w2ui['images'].on('reload', function (event) {
        onReloadImages(event);
    });
}//IMAGES: init()

function onClickImagesToolbar(event) {
    var selectionId = w2ui['images'].getSelection();
    var record = w2ui['images'].get(selectionId[0]);
    switch (event.target) {
        case 'action:run':
            if (record == null) {
                w2popup.open({title: 'Message', body: 'No record selected'});
            }
            else {
                var imageName = record.RepoTags;
                w2popup.open({title: 'Popup Title HTML', body: "TO-DO"});
            }
            break;
    }
}//IMAGES: toolbar.onClick()

function onClickImages(event) {
    w2ui['master_details'].clear();
    var record = w2ui['images'].get(event.recid);
    w2ui['master_details'].add([
        {recid: 0, name: 'RepoTags:', value: record.RepoTags},
        {recid: 1, name: 'Id:', value: record.Id},
        {recid: 2, name: 'PrentId:', value: record.ParentId},
        {recid: 3, name: 'Size:', value: record.Size},
        {recid: 4, name: 'Created:', value: record.Created}
    ]);

    // Load Image History
    w2ui['image_history'].clear();
    w2ui['image_history'].load('http://127.0.0.1:5000/docker/images/history/' + record.Id);

    // Enable toolbar buttons
    w2ui['images'].toolbar.enable('action');
}//IMAGES: onClick()

function onSearchImages(event) {
    w2ui['images'].toolbar.disable('action');
    w2ui['master_details'].clear();
}//IMAGES: onSearch()

function onReloadImages(event) {
    w2ui['images'].toolbar.disable('action');
    w2ui['master_details'].clear();
    w2ui['image_history'].clear();
}//IMAGES: onReload()

