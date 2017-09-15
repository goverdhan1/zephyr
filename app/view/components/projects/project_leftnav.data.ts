/**
 * Zee left nav columns and links for project page
 * Contains top level left nav names and links
 * This is called from the parent component and not the leftnav component to make the it left nav content configurable
 */
export var ZEE_NAV_COLUMNS = {
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
        iconClass: 'fa-user',
        isActive: true,
        link: '/requirements/'
      },
      {
        key: 'repository-setup',
        name: 'Test Repository',
        title: 'Test Repository',
        permission : true,
        iconClass: 'fa-check-square-o',
        isActive: true,
        link: '/tcr/'
      },
      // {
      //   key: 'project-dashboard',
      //   name: 'Project Dashboard',
      //   title: 'Project Dashboard',
      //   permission : true,
      //   iconClass: 'fa-files-o',
      //   isActive: false,
      //   link: '/release/'
      // },
      {
        key: 'testcase-eas',
        name: 'Testcase EAS',
        title: 'Test Planning',
        permission : true,
        iconClass: 'fa-files-o',
        isActive: true,
        link: '/testcase-eas/cycle/'
      },
      {
        key: 'testcase-execution',
        name: 'Testcase Execution',
        title: 'Test Execution',
        permission : true,
        iconClass: 'fa-files-o',
        isActive: true,
        link: '/tce/'
      },
      {
        key: 'defect-tracking',
        name: 'Defect Tracking',
        title: 'Defect Tracking',
        permission : true,
        iconClass: 'fa-files-o',
        isActive: true,
        link: '/defect-tracking/'
      },
      {
          key: 'zautomation',
          name: 'ZAutomation',
          title: 'ZAutomation',
          permission : true,
          iconClass: 'fa-files-o',
          isActive: true,
          link: '/zautomation/'
      }
    ]
};
