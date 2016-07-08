/**
 * Created by Anastasios Selalmazidis <t.selalmasidis@gmail.com> on 7/7/2016.
 */
var container_processes = {
    name: 'container_processes',
    header: 'Container Processes',
    show: {
        header: true,
        toolbar: true,
        toolbarReload: false,
        lineNumbers: true,
        footer: true
    },
    columns: [
        {field: 'UID', caption: 'UID', sortable: true, size: '90px'},
        {field: 'PID', caption: 'PID', sortable: true, size: '90px'},
        {field: 'PPID', caption: 'PPID', sortable: true, size: '90px'},
        {field: 'C', caption: 'C', sortable: true, size: '90px'},
        {field: 'STIME', caption: 'STIME', sortable: true, size: '90px'},
        {field: 'TTY', caption: 'TTY', sortable: true, size: '90px'},
        {field: 'TIME', caption: 'TIME', sortable: true, size: '90px'},
        {field: 'CMD', caption: 'CMD', sortable: true, size: '500px'}
    ],
    sortData: [
        {field: 'UID', direction: 'asc'}
    ],
    multiSearch: false,
    searches: [
        {field: 'UID', caption: 'UID', type: 'text'}
    ]
};
