/**
 * Created by Anastasios Selalmazidis <t.selalmasidis@gmail.com> on 7/7/2016.
 */
var images_search = {
    name: 'images_search',
    header: 'Search hub.docker.com',
    show: {
        header: true,
        toolbar: true,
        lineNumbers: true,
        footer: true
    },
    columns: [
        {field: 'name', caption: 'Name', sortable: true, size: '200px'},
        {field: 'description', caption: 'Description', sortable: true, size: '100%'},
        {field: 'star_count', caption: 'Stars', sortable: true, size: '50px'},
        {field: 'is_automated', caption: 'Automated', sortable: true, size: '70px'},
        {field: 'is_official', caption: 'Official', sortable: true, size: '60px'},
        {field: 'is_trusted', caption: 'Trusted', sortable: true, size: '60px'}
    ],
    sortData: [
        {field: 'star_count', direction: 'desc'}
    ],
    multiSearch: false,
    searches: [
        {field: 'name', caption: 'Name', type: 'text'},
        {field: 'description', caption: 'Description', type: 'text'}
    ],
    toolbar: {
        name: 'images_search_toolbar',
        items: [
            {type: 'break'},
            {type: 'button', id: 'pull', caption: 'Pull Image', disabled: true}
        ]
    }
};

function initImagesSearchGridEvents() {
    w2ui['images_search'].toolbar.on('click', function (event) {
        onClickImageSearchToolbar(event);
    });

    w2ui['images_search'].on('click', function (event) {
        onClickImageSearch(event);
    });

    w2ui['images_search'].on('search', function (event) {
        onSearchImageSearch(event);
    });

    w2ui['images_search'].on('reload', function (event) {
        onReloadImageSearch(event);
    });
}//IMAGES_SEARCH: init()

function onClickImageSearchToolbar(event) {
    var selectionId = w2ui['images_search'].getSelection();
    var record = w2ui['images_search'].get(selectionId[0]);
    switch (event.target) {
        case 'pull':
            if (record == null) {
                w2popup.open({title: 'Message', body: 'No record selected'});
            }
            else {
                w2popup.open({title: 'Popup Title HTML', body: "TO-DO"});
            }
            break;
    }
}//IMAGES_SEARCH: toolbar.onClick()

function onClickImageSearch(event) {
    w2ui['images_search'].toolbar.enable('pull');
}//IMAGES_SEARCH: onClick()

function onSearchImageSearch(event) {
// Load Search Image Results
    w2ui['images_search'].clear();
    w2ui['images_search'].load('/docker/images/' + event.searchValue + '/search');

    w2ui['images_search'].toolbar.disable('pull');
}//IMAGES_SEARCH: onSearch()

function onReloadImageSearch(event) {
    w2ui['images_search'].toolbar.disable('pull');
    var search_value = w2ui['images_search'].searchData[0].value;
    w2ui['images_search'].clear();
    w2ui['images_search'].load('/docker/images/' + search_value + '/search');
}//IMAGES_SEARCH: onReload()


