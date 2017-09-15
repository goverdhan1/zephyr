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
            iconClass: 'system-setup',
            appId: 1,
            items: [
                {
                    key: 'system-config',
                    name:'System Configuration',
                    title: 'System Config',
                    isActive: true,
                    link: '/admin/systemConfig',
                    permission : true,
                    appId: 1
                },
                {
                    key: 'system-admin',
                    name:'System Admin',
                    title: 'System Admin',
                    isActive: true,
                    link: '/admin/systemAdmin',
                    permission : true,
                    appId: 1
                },
                {
                    key: 'user-auth',
                    name:'User Authentication',
                    title: 'User Auth',
                    isActive: true,
                    link: '/admin/userAuth',
                    permission : true,
                    appId: 1
                },
                {
                    key: 'defect-tracking',
                    name:'Defect Tracking',
                    title: 'Defect Tracking',
                    isActive: true,
                    link: '/admin/defectTrackingIntegration',
                    permission : true,
                    appId: 1
                },
                {
                    key: 'customizations',
                    name:'Customizations',
                    title: 'customizations',
                    isActive: true,
                    link: '/admin/customizations',
                    permission : true,
                    appId: 1
                },
                {
                    key: 'about-zephyr',
                    name:'About Zephyr',
                    title: 'about-zephyr',
                    isActive: true,
                    link: '/admin/aboutZephyr',
                    permission : true,
                    appId: 1
                }
            ]
        },  //Using hard-coded key's value to add role check to it. If changed here, change in leftnav.component also
        {
            key: 'user-setup',
            title: 'User Setup',
            permission : true,
            name: '',
            isActive: true,
            iconClass: 'user-setup',
            appId:  2,
            items: [{
                key : 'resource-management',
                name: 'Manage Users',
                title : 'resource-management',
                isActive: true,
                link: '/resource_management/details',
                permission : true,
                appId: 2
            }]
        },
        {
            key: 'project-setup',
            title: 'Project Setup',
            permission : true,
            name: '',
            isActive: true,
            iconClass: 'project-setup',
            appId: 3,
            items: [{
                key: 'manage-projects',
                name: 'Manage Projects',
                title: 'project-setup',
                isActive: true,
                link: '/project_setup/details',
                permission : true,
                appId: 3
            }]
        },
        {
            key: 'defects-admin',
            title: 'Defects Admin',
            permission : true,
            name: '',
            isActive: true,
            iconClass: 'dts clickable-parent-item',
            link: '/defects_admin',
            appId: 6
        }
    ]
};
