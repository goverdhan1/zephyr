// Project component name (should be same as the element name)
export const PROJECTS_COMPONENT = 'zee-projects';
  export const PROJECT_COMPONENT = 'zee-project';
export const PROJECT_COMPONENTS = 'zee-projects';

export const PROJECT_DETAILS_COMPONENT = 'project-details';
export const PROJECT_RELEASES_COMPONENT = 'project-releases';
export const PROJECT_TEAM_LOCATION_COMPONENT = 'project-team-location';
export const PROJECT_NEWS_COMPONENT = 'zee-panel-content4-project';
export const PROJECT_TEAM_COMPONENT = 'zee-team-tab-content';
export const PROJECT_LOCATION_COMPONENT = 'zee-location-tab-content';

export const PROJECT_SUMMARY_FIELDS = [
    {
        name: 'Releases',
        key: 'totalReleaseCount',
        class: 'summarybox-release'
    },
    {
        name: 'In-progress',
        key: 'visibleReleaseCount',
        class: 'summarybox-inprogress'
    },
    {
        name: 'Test Cases',
        key: 'testcaseCount',
        class: 'summarybox-testcases'
    },
    {
        name: 'Executions',
        key: 'executionCount',
        class: 'summarybox-executions'
    },
    {
        name: 'Members',
        key: 'teamCount',
        class: 'summarybox-members'
    }
];
