/**
 * Zee left nav columns and links
 * Contains top level left nav names and links
 * This is called from the parent component and not the leftnav component to make the it left nav content configurable
 */
export var ZEE_NAV_COLUMNS = {
    header: {
        avatar: '',
        avatarURL: '',
        title: 'Project Name',
        titleURL: '',
        subtitle: 'Description',
        subtitleURL: '',
        link: '',
        isSelected: false
    },
    group: [
        {
            name: 'Project',
            items: [
                {
                    key: '/release/1-setup',
                    name: 'Releases',
                    title: 'Release',
                    iconClass: 'fa-users',
                    isActive: false,
                    link: '/release/1'
                },
                {
                    key: 'requirements',
                    name: 'Requirements',
                    title: 'Requirements',
                    iconClass: 'fa-user',
                    isActive: false,
                    link: '/release/1'
                },
                {
                    key: 'repository-setup',
                    name: 'Test Repository',
                    title: 'Repository setup',
                    iconClass: 'fa-check-square-o',
                    isActive: true,
                    link: 'tcr/1'
                },
                {
                    key: 'project-dashboard',
                    name: 'Project Dashboard',
                    title: 'Project dashboard',
                    iconClass: 'fa-files-o',
                    isActive: false,
                    link: '/release/1'
                },
                {
                    key: 'zautomation',
                    name: 'ZAutomation',
                    title: 'ZAutomation',
                    permission : true,
                    iconClass: 'fa-files-o',
                    isActive: false,
                    link: '/zautomation/'
                }
            ]
        },
        {
            name: 'Admin',
            items: [
                {
                    key: 'system-config',
                    name: 'System Configuration',
                    title: 'System Config',
                    iconClass: 'fa-users',
                    isActive: true,
                    link: '/admin/systemConfig'
                },
                {
                    key: 'system-admin',
                    name: 'System Admin',
                    title: 'System Admin',
                    iconClass: 'fa-user',
                    isActive: false,
                    link: '/admin/systemAdmin'
                },
                {
                    key: 'user-auth',
                    name: 'User Auth',
                    title: 'User Auth',
                    iconClass: 'fa-check-square-o',
                    isActive: false,
                    link: '/admin/userAuth'
                },
                {
                    key: 'defect-tracking',
                    name: 'Defect Tracking',
                    title: 'Defect Tracking',
                    iconClass: 'fa-files-o',
                    isActive: false,
                    link: '/admin/defectTracking'
                },
                {
                    key: 'customizations',
                    name: 'Customizations',
                    title: 'customizations',
                    iconClass: 'fa-files-o',
                    isActive: false,
                    link: '/admin/customizations'
                },
                {
                    key: 'about-zephyr',
                    name: 'About Zephyr',
                    title: 'about-zephyr',
                    iconClass: 'fa-files-o',
                    isActive: false,
                    link: '/admin/aboutZephyr'
                }
            ]
        },


    ]


};
