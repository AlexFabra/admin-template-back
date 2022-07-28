const getMenuFrontend = (role = 'USER_ROLE') => {
    const menu = [
        {
            title: 'Dashboard',
            icon: 'mdi mdi-gauge',
            submenu: [
                {
                    title: 'Main',
                    url: '/'
                },
                {
                    title: 'Progress',
                    url: 'progress'
                },
                {
                    title: 'Charts',
                    url: 'grafica1'
                },
            ]
        },
        {
            title: 'Mantenaince',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                // {
                //     title: 'Users',
                //     url: 'users'
                // },
                {
                    title: 'Hospitals',
                    url: 'hospitals'
                },
                {
                    title: 'Doctors',
                    url: 'doctors'
                }
            ]
        }
    ]

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift(
            {
                title: 'Users',
                url: 'users'
            }
        )
    }

    return menu;
}

module.exports = { getMenuFrontend }