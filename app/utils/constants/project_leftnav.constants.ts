/**
 * Zee left nav columns and links for project page
 * Contains top level left nav names and links
 * This is called from the parent component and not the leftnav component to make the it left nav content configurable
 */
export var PROJECT_NAV_COLUMNS = {
    type: {
      dataType: 'project-leftnav'
    },
    header: {
        avatar: '',
        avatarURL: '',
        title: 'Project Name',
        titleURL: '',
        subtitle:'Description',
        subtitleURL: '',
        link: '',
        isSelected: false
    },
    subHeader: {
        name: '',
        id: null,
        link: '/release',
        title: 'Go to Release',
        lastVisitedItems: [],
        items: []
    },
    group: [
      // {
      //   key: '/release/1-setup',
      //   name: 'Releases',
      //   title: 'Release',
      //   iconClass: 'fa-users',
      //   isActive: false,
      //   link: '/release/1'
      // },
      {
        key: 'requirements',
        name: 'Requirements',
        title: 'Requirements',
        permission : true,
        iconClass: 'requirements',
        isActive: true,
        link: '/requirements/',
        appId: 9
      },
      {
        key: 'repository-setup',
        name: 'Test Repository',
        title: 'Test Repository',
        permission : true,
        iconClass: 'tcc',
        isActive: true,
        link: '/tcr/',
        appId: 15
      },
      //{
      //  key: 'project-dashboard',
      //  name: 'Project Dashboard',
      //  title: 'Project Dashboard',
      //  permission : true,
      //  iconClass: 'fa-files-o',
      //  isActive: false,
      //  link: '/release/'
      //},
      {
        key: 'testcase-eas',
        name: 'Testcase EAS',
        title: 'Test Planning',
        permission : true,
        iconClass: 'planning',
        isActive: true,
        link: '/testcase-eas/cycle/',
        appId: 11
      },
      {
        key: 'testcase-execution',
        name: 'Testcase Execution',
        title: 'Test Execution',
        permission : true,
        iconClass: 'tce',
        isActive: true,
        link: '/tce/',
        appId: 16
      },
      {
        key: 'defect-tracking',
        name: 'Defect Tracking',
        title: 'Defect Tracking',
        permission : true,
        iconClass: 'dts',
        isActive: true,
        link: '/defect-tracking/',
        appId: 17
      },
      {
        key: 'zautomation',
        name: 'Vortex',
        title: 'Vortex',
        permission : false,
        iconClass: 'zautomation',
        isActive: true,
        link: '/zautomation/',
        appId: 18
      },
      {
        key: 'quality-trends',
        name: 'Cyclone',
        title: 'Cyclone',
        permission : true,
        iconClass: 'quality-trends fa-tachometer',
        isActive: true,
        link: '/quality-trends/',
        appId: 19
      },
      {
        key: 'reports',
        name: 'Reports',
        title: 'Reports',
        permission : true,
        iconClass: 'reports fa-bar-chart',
        isActive: true,
        link: '/reports/',
        appId: 8
      }
    ]
};
