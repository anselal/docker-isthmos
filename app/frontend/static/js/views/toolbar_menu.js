/**
 * Created by Anastasios Selalmazidis <t.selalmasidis@gmail.com> on 8/7/2016.
 */
var toolbar_menu = {
    name: 'toolbar_menu',
    items: [
        {type: 'break'},
        {
            type: 'menu', id: 'github', caption: 'GitHub',
            items: [
                {
                    id: '_fork',
                    text: '<a href="https://github.com/anselal/docker-isthmos/" target="_blank">Fork me on GitHub</a>',
                    img: 'icon-save'
                },
                {
                    id: '_issue',
                    text: '<a href="https://github.com/anselal/docker-isthmos/issues" target="_blank">Report an Issue</a>',
                    img: 'icon-save'
                },
                {
                    id: '_pull',
                    text: '<a href="https://github.com/anselal/docker-isthmos/pulls" target="_blank">Submit a Pull Request</a>',
                    img: 'icon-save'
                }
            ]
        },
        {type: 'break'},
        {type: 'button', id: 'help', caption: 'Help', img: 'icon-save', disabled: true},
        {type: 'break'},
        {type: 'button', id: 'about', caption: 'About', img: 'icon-save'},
        {type: 'spacer'},
        {type: 'html', id: 'copyright', html: '(c) 2016 selalmaz.xyz '}
    ]
};

function initToolbarMenuEvents() {
    w2ui['toolbar_menu'].on('click', function (event) {
        onClickToolbarMenu(event);
    });
}//TOOLBARMENU: init()

function onClickToolbarMenu(event) {
    switch (event.target) {
        case 'about':

            var msg = '<h2 style="text-align: center;">Docker-Isthmos</h2>';
            msg += '<h4 style="text-align: center;">Created by Anastasios Selalmazidis &lt;' +
                '<a href="mailto:t.selalmasidis@gmail.com">t.selalmasidis@gmail.com</a>&gt;</h4>';
            msg += '<p>&nbsp;</p>';
            msg += '<p>&nbsp;</p>';            
            msg += '<p style="text-align: center;">&copy; 2016&nbsp;<a href="https://selalmaz.xyz" target="_blank">selalmaz.xyz</a></p>';
            w2popup.open({title: 'About Docker-Isthmos', body: msg});
            break;
    }
}//TOOLBARMENU: onClick()
