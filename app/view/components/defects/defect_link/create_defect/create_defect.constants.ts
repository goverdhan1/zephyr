export const CREATE_DEFECT_FIELDS_ORDER = [
    'project',
    'issuetype',
    'parent',
    'summary',
    'components',
    'description',
    'fixVersions',
    'priority',
    'attachment',
    'assignee',
    'app-release-select'
];

export const DEFECT_KEY_MAPPING = {
    'project': 'product',
    'issuetype': 'issueType',
    'parent': 'parentKey',
    'priority': 'priority',
    'description': 'longDesc',
    'summary': 'shortDesc',
    'components': 'multiComponents',
    'versions': 'multiVersions',
    'fixVersions': 'fixVersions',
    'assignee': 'assigned_to',
    'app-release-select':'app-release-select'
};
