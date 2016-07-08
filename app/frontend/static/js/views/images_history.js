/**
 * Created by Anastasios Selalmazidis <t.selalmasidis@gmail.com> on 7/7/2016.
 */
var image_history = {
    name: 'image_history',
    header: 'Image History',
    show: {
        header: true,
        toolbar: true,
        toolbarReload: false,
        lineNumbers: true,
        footer: true
    },
    columns: [
        {field: 'Created', caption: 'Created', sortable: true, size: '180px'},
        {field: 'CreatedBy', caption: 'CreatedBy', sortable: true, size: '230px'},
        {field: 'Id', caption: 'Id', sortable: true, size: '180px'},
        {field: 'Tags', caption: 'Tags', sortable: true, size: '180px'}
    ],
    sortData: [
        {field: 'Tags', direction: 'asc'}
    ],
    multiSearch: false,
    searches: [
        {field: 'Tags', caption: 'Tags', type: 'text'}
    ]
};
