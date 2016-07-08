/**
 * Created by Anastasios Selalmazidis <t.selalmasidis@gmail.com> on 7/7/2016.
 */
var version_info = {
    name: 'version_info',
    header: 'Docker Info',
    show: {
        header: true,
	toolbar: true,
	toolbarSearch   : false,
	toolbarColumns  : false,
        columnHeaders: false,
	footer: true
    },
    columns: [
        {
            field: 'name',
            caption: 'Name',
            size: '120px',
            style: 'background-color: #efefef; border-bottom: 1px solid white; padding-right: 5px;',
            attr: "align=right"
        },
        {field: 'value', caption: 'Value', size: '100%'}
    ]
};
