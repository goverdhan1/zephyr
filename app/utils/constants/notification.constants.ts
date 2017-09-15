export const NOTIFICATION_OPERATION_CONSTANTS = {
	ADD : 'ADD',
	UPDATE: 'UPDATE',
	DELETE: 'DELETE',
	MOVE: 'MOVE',
	COPY: 'COPY',
	MULTIPLE: 'MULTIPLE',
	CLONE: 'CLONE',
	ASSIGN:'ASSIGN'
};

export const NOTIFICATION_AUTO_APPLY_TIMEWAIT = 3000;
export const NOTIFICATION_PENDING_MESSAGE =
	'There are notification(s) pending. Please apply the change(s) before performing the operation(s).';

export const NOTIFICATION_STATE_CONSTANTS = {
	WAITING: 'WAITING',
	APPLY_TRIGGERED: 'APPLY_TRIGGERED',
	APPLY_IN_PROGRESS: 'APPLY_IN_PROGRESS'
};

export const NOTIFICATION_ACCEPTANCE_KEY_CONSTANTS = {
    SUBTYPE: 'subType'
};

export const NOTIFICATION_APP_CONSTANTS = {
  TCR_APP: {name:'TCR_APP', userReadableName:'Testcase Repository',auto_apply:false},
	PROJECT_APP: {name:'PROJECT_APP', userReadableName:'Project',auto_apply:false},
	GLOBAL_PROJECT_APP: {name:'GLOBAL_PROJECT_APP', userReadableName:'Global Project',auto_apply:true},
    GLOBAL_RELEASE_APP: {name:'GLOBAL_RELEASE_APP', userReadableName:'Global Release',auto_apply:true},
	GLOBAL_USER_APP: {name:'GLOBAL_USER_APP', userReadableName:'Global User',auto_apply:true},
	GLOBAL_LOGGED_IN_USER_APP: {name:'GLOBAL_LOGGED_IN_USER_APP', userReadableName:'Logged In User',auto_apply:true},
    RELEASE_SETUP_APP: {name:'RELEASE_SETUP_APP', userReadableName:'Release Setup',auto_apply:false},
    EAS_APP: {name:'EAS_APP', userReadableName:'Test Planning',auto_apply:false},
    TCE_APP: {name:'TCE_APP', userReadableName:'Test Execution',auto_apply:false},
    REQUIREMENT_APP: {name:'REQUIREMENT_APP', userReadableName:'Requirement',auto_apply:false},
    AGENTS_APP: {name:'AGENTS_APP', userReadableName:'Agents',auto_apply:true},
	ZAUTOMATION_APP: {name:'ZAUTOMATION_APP', userReadableName:'zautomation job',auto_apply:false},
	ZFILE_WATCHER_APP: {name:'ZFILE_WATCHER_APP', userReadableName:'zfile watcher',auto_apply:false}
};

export const NOTIFICATION_ENTITY_CONSTANTS = {
	TCR_CATALOG_TREE: 'tcrCatalogTree',
	TESTCASE: 'tcrCatalogTreeTestcase',
	TESTSTEP: 'teststep',
    CYCLE : 'cycle',
	CYCLE_PHASE : 'cyclephase',
    INFORMATION : 'information',
	NEWS: 'news',
    ASSIGNMENT_TREE: 'assignmentTree',
	REQUIREMENT_TREE : 'requirementTree',
	REQUIREMENT : 'requirement',
	EXECUTION : 'execution',
	EXECUTION_RESULT : 'execution_result',
	RELEASE: 'release',
	AGENT: 'agent',
	TESTCASEBATCHEXECUTION: 'testcaseBatchExecution',
	USER: 'user',
	LOGIN_STATUS: 'loginstatus',
	PROJECT: 'project',
	PROJECT_USER: 'projectUser',
	CHART_VISIBILITY: 'chartVisibility',
	METRICS_DEPARTMENT: 'metricsDepartment',
	METRICS_RELEASE: 'metricsRelease',
	DEPARTMENT: 'department',
	DASHBOARD: 'dashboard',
	GADGET: 'gadget',
	AUTOMATION: 'automation',
	FILEWATCHER: 'folderWatch'
};
