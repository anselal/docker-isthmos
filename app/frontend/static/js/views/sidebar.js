/**
 * Created by Anastasios Selalmazidis <t.selalmasidis@gmail.com> on 7/7/2016.
 */
var sidebar = {
    name: 'sidebar',
    nodes: [
        {
            id: 'general', text: 'General', group: true, expanded: true, nodes: [
            {id: 'images', text: 'Images', img: 'icon-page', selected: true},
            {id: 'containers', text: 'Containers', img: 'icon-page'},
            {id: 'volumes', text: 'Volumes', img: 'icon-page'},
            {id: 'search', text: 'Search', img: 'icon-page'},
            {id: 'info', text: 'Info', img: 'icon-page'}
        ]
        }
    ]
};

function onClickSidebar(event) {

    switch (event.target) {
        case 'images':
            $('#container_processes').hide();
            $('#container_logs').hide();
            w2ui['master_details'].clear();
            w2ui['image_history'].clear();
            w2ui['layout'].show('right', window.instant);
            $('#image_history').show();
            w2ui.layout.content('main', w2ui.images);
            break;
        case 'containers':
            w2ui['master_details'].clear();
            $('#image_history').hide();
            $('#images_search').hide();
            $('#container_processes').show();
            w2ui['container_processes'].clear();
            $('#container_logs').show();
            w2ui['container_logs'].clear();
            w2ui['layout'].show('right', window.instant);
            w2ui.layout.content('main', w2ui.containers);
            break;
        case 'volumes':
            w2ui['layout'].hide('right', window.instant);
            $('#container_logs').hide();
            $('#image_history').hide();
            $('#images_search').hide();
            $('#container_processes').hide();
            w2ui.layout.content('main', w2ui.volumes);
            break;
        case 'search':
            w2ui['layout'].hide('right', window.instant);
            $('#image_history').hide();
            $('#container_processes').hide();
            $('#container_logs').hide();
            w2ui.layout.content('main', w2ui.images_search);
            break;
        case 'info':
            w2ui['layout'].hide('right', window.instant);
            $('#container_logs').hide();
            $('#image_history').hide();
            $('#images_search').hide();
            $('#container_processes').hide();
            w2ui.layout.content('main', w2ui.version_info);
            w2ui['version_info'].clear();
            $.get('http://127.0.0.1:5000/docker/version_info', function (data, status) {
                //var records = jQuery.parseJSON(data);
                w2ui['version_info'].add([
                    {recid: 0, name: 'API Version:', value: data.records.Version.ApiVersion},
                    {recid: 1, name: 'Docker Version:', value: data.records.Version.Version},

                    {recid: 2, name: 'Build Time:', value: data.records.Version.BuildTime},
                    {recid: 3, name: 'Git Commit:', value: data.records.Version.GitCommit},
                    {recid: 4, name: 'Go Version:', value: data.records.Version.GoVersion},
                    {recid: 5, name: "Containers", value: data.records.Info.Containers},
                    {recid: 6, name: "Images", value: data.records.Info.Images},

                    {recid: 7, name: "Debug", value: data.records.Info.Debug},
                    {recid: 8, name: "CPUs", value: data.records.Info.NCPU},
                    {
                        recid: 9,
                        name: "Total Memory",
                        value: (Math.round((data.records.Info.MemTotal / 1024 / 1024 / 1024) * 100) / 100) + " GB"
                    },
                    {
                        recid: 10,
                        name: 'Operating System:',
                        value: data.records.Info.OperatingSystem + " (" + data.records.Version.Os + ")"
                    },
                    {recid: 11, name: 'Kernel Version:', value: data.records.Version.KernelVersion},
                    {recid: 12, name: 'Architecture:', value: data.records.Version.Arch},
                    {recid: 13, name: 'ID:', value: data.records.Info.ID},
                    {recid: 14, name: 'Goroutines:', value: data.records.Info.NGoroutines}
                ])
            });
            break;
    }

}
