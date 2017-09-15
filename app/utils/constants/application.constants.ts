export const APP_CONSTANTS = {
	'REGEX_URL':/^https?:\/\/[a-z0-9-\.]+(\.[a-z]{2,4}\/?)?(:[0-9]{1,5})?/g,
	'REGEX_USERNAME':/^[a-zA-Z0-9\.]+$/,
	'LENGTH_PASSWORD':2,
	'LENGTH_USERNAME':2,
	'FILTER_STORAGE_LIMIT':10,
	'MAX_EXECUTION_PER_PAGE':10,
	'USE_LOADER':false,
	'FAKE_LOADING_TIME':1000, //millisecs
	'MAX_TTE_DAYS':99,
	'MAX_TTE_HOURS':23,
	'MAX_TTE_MINUTES':59,
	'MAX_NOTES_CHARS':1024
};

export const ACTION_EXPAND = 'zee-expand';
export const ACTION_COLLAPSE = 'zee-collapse';
export const JIRA_REQUIREMENT_TYPE = 4;
export const ADMIN_PREFERENCES = {
    'priority': 'testcase.testcasePriority.LOV',
    'defectSystems': 'bugtracking.system.LOV'
};

export const CUSTOM_FIELD_TYPES = {
    NUMBER: 'Number',
    DATE: 'Date',
    CHECKBOX: 'Checkbox',
    PICKLIST: 'Picklist',
    LONG_TEXT: 'Long Text (32000)',
    TEXT: 'Text (1024)'
};

export const RELEASE_DATE_FORMAT = 'MM/DD/YYYY';

export const VISIBLE_RELEASE_STATUS = 0;
