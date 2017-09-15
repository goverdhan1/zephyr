/**
 * Zee left nav columns and links
 * Contains top level left nav names and links
 * This is called from the parent component and not the leftnav component to make the it left nav content configurable
 */
export var ZEE_NAV_ADMIN_COLUMNS = {
    isAdmin: true,
    header: {
        avatar: '',
        avatarURL: '',
        title: 'Administration',
        titleURL: '',
        subtitleURL: '',
        link: ''
    },
    group: [
        {
            key: 'admin',
            title: 'System Setup',
            permission : true,
            name: '',
            isActive: true,
            iconClass: 'fa-users',
            items: [
                {
                    key: 'system-config',
                    name:'System Configuration',
                    title: 'System Config',
                    isActive: true,
                    link: '/admin/systemConfig'
                },
                {
                    key: 'system-admin',
                    name:'System Admin',
                    title: 'System Admin',
                    isActive: true,
                    link: '/admin/systemAdmin'
                },
                {
                    key: 'user-auth',
                    name:'User Authentication',
                    title: 'User Auth',
                    isActive: true,
                    link: '/admin/userAuth'
                },
                {
                    key: 'defect-tracking',
                    name:'Defect Tracking',
                    title: 'Defect Tracking',
                    isActive: true,
                    link: '/admin/defectTrackingIntegration'
                },
                {
                    key: 'customizations',
                    name:'Customizations',
                    title: 'customizations',
                    isActive: true,
                    link: '/admin/customizations'
                },
                {
                    key: 'about-zephyr',
                    name:'About Zephyr',
                    title: 'about-zephyr',
                    isActive: true,
                    link: '/admin/aboutZephyr'
                }
            ]
        },  //Using hard-coded key's value to add role check to it. If changed here, change in leftnav.component also
        {
            key: 'user-setup',
            title: 'User Setup',
            permission : true,
            name: '',
            isActive: true,
            iconClass: 'fa-user',
            items: [{
                key : 'resource-management',
                name: 'Manage Users',
                title : 'resource-management',
                isActive: true,
                link: '/resource_management/details'
            }]
        },
        {
            key: 'project-setup',
            title: 'Project Setup',
            permission : true,
            name: '',
            isActive: true,
            iconClass: 'fa-check-square-o',
            items: [{
                key: 'project-setup', //Using hard-coded key's value to add role check to it.
                                      // If changed here, change in leftnav.component also
                name: 'Manage Projects',
                title: 'project-setup',
                isActive: true,
                link: '/project_setup/details'
            }]
        },
        {
            key: 'defects-admin',
            title: 'Defects Admin',
            permission : true,
            name: '',
            isActive: true,
            iconClass: 'fa-user',
            link: '/defects_admin'
        }
    ]
};
