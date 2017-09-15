import {NOTIFICATION_OPERATION_CONSTANTS, NOTIFICATION_ACCEPTANCE_KEY_CONSTANTS,
     NOTIFICATION_ENTITY_CONSTANTS, NOTIFICATION_AUTO_APPLY_TIMEWAIT} from '../constants/notification.constants';
import {NotificationStore} from '../../store/notification.store';

export const NOTIFICATION_METADATA = {
    tcrCatalogTree : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE, NOTIFICATION_OPERATION_CONSTANTS.MOVE,
                  NOTIFICATION_OPERATION_CONSTANTS.COPY,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN],
        acceptance: []
    },
	tcrCatalogTreeTestcase : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE, NOTIFICATION_OPERATION_CONSTANTS.MOVE,
                  NOTIFICATION_OPERATION_CONSTANTS.COPY,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN],
        acceptance: []
    },
	teststep : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN ],
        acceptance: []
    },
    cycle : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE, NOTIFICATION_OPERATION_CONSTANTS.COPY
                  ,NOTIFICATION_OPERATION_CONSTANTS.CLONE,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN],
        acceptance: []
    },
	cyclephase : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE, NOTIFICATION_OPERATION_CONSTANTS.COPY
                  ,NOTIFICATION_OPERATION_CONSTANTS.CLONE,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN],
        acceptance: []
    },
    information : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE ],
        acceptance: [NOTIFICATION_ACCEPTANCE_KEY_CONSTANTS.SUBTYPE]
    },
	news : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE ],
        acceptance: [NOTIFICATION_ACCEPTANCE_KEY_CONSTANTS.SUBTYPE]
    },
    assignmentTree : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN ],
        acceptance: []
    },
	requirementTree : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE, NOTIFICATION_OPERATION_CONSTANTS.MOVE,
                  NOTIFICATION_OPERATION_CONSTANTS.COPY,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN],
        acceptance: []
    },
	requirement : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE, NOTIFICATION_OPERATION_CONSTANTS.MOVE,
                  NOTIFICATION_OPERATION_CONSTANTS.COPY,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN],
        acceptance: []
    },
	execution : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN],
        acceptance: []
    },
	execution_result : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN],
        acceptance: []
    },
	release : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN],
        acceptance: []
    },
	agent : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN ],
        acceptance: []
    },
	testcaseBatchExecution : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN ],
        acceptance: []
    },
	user : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE ,NOTIFICATION_OPERATION_CONSTANTS.CLONE,
                  NOTIFICATION_OPERATION_CONSTANTS.ASSIGN],
        acceptance: []
    },
	loginstatus : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE 
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN],
        acceptance: []
    },
	project : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN ],
        acceptance: []
    },
	projectUser : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN ],
        acceptance: []
    },
	chartVisibility : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN ],
        acceptance: []
    },
	metricsDepartment : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN ],
        acceptance: []
    },
	metricsRelease : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN ],
        acceptance: []
    },
	department : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE 
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN],
        acceptance: []
    },
	dashboard : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN ],
        acceptance: []
    },
	gadget : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
                  NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE 
                  ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN],
        acceptance: []
    },
    automation : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
        NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE
        ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN ],
        acceptance: []
    },
    folderWatch : {
        actions: [NOTIFICATION_OPERATION_CONSTANTS.ADD, NOTIFICATION_OPERATION_CONSTANTS.DELETE,
        NOTIFICATION_OPERATION_CONSTANTS.UPDATE,NOTIFICATION_OPERATION_CONSTANTS.CLONE
        ,NOTIFICATION_OPERATION_CONSTANTS.ASSIGN ],
        acceptance: []
    }
};

export function constructNotificationStoreMetadata(entity, topicEntityId, releaseId, subType = '', auto_apply = false, topicEntityIds=[]) {
    let metadata = {
        subType: '',
        entity: '',
        topicEntityId: '',
        releaseId: '',
        topicEntityIds: [],
        releaseIds: [],
        auto_apply: auto_apply
    };
    metadata.entity = entity;
    if(subType) {
        metadata.subType = subType;
    }
    if(topicEntityId) {
        metadata.topicEntityId = topicEntityId;
    }
    if(releaseId) {
        metadata.releaseId = releaseId;
    }
    if(topicEntityIds) {
        metadata.topicEntityIds = topicEntityIds;
    }
    return metadata;
}

export function checkIfAutoApplyRequired(appId, notification) {
    let data = notification.ui_details[appId];
    if(data && data.auto_apply) {
        return NOTIFICATION_AUTO_APPLY_TIMEWAIT;
    }
    return 0;
}

export function getNotificationTopic(entity, metadata) {
    let topics = [];
    switch (entity) {
        case NOTIFICATION_ENTITY_CONSTANTS.PROJECT:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.PROJECT+'/');
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.TCR_CATALOG_TREE:
            if(metadata.topicEntityId && !isNaN(metadata.topicEntityId)) {
                topics.push('/tree/' + metadata.releaseId + '/' +
                            metadata.topicEntityId );
            } else {
                topics.push('/tree/' + metadata.releaseId);
            }
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.TESTCASE:
            topics.push('/testcase/'+ metadata.topicEntityId);
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.TESTSTEP:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.TESTSTEP+'/'+metadata.topicEntityId);
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.AGENT:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.AGENT+'/');
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.ASSIGNMENT_TREE:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.ASSIGNMENT_TREE+'/'+metadata.topicEntityId);
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.METRICS_DEPARTMENT:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.METRICS_DEPARTMENT+'/'+metadata.topicEntityId);
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.METRICS_RELEASE:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.METRICS_RELEASE+'/'+metadata.releaseId);
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.CHART_VISIBILITY:
            if(metadata.releaseId && !isNaN(metadata.releaseId) && Number(metadata.releaseId) != 0) {
                topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.CHART_VISIBILITY+'/'+metadata.releaseId);
            } else {
                topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.CHART_VISIBILITY+'/');
            }
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.CYCLE:
        case NOTIFICATION_ENTITY_CONSTANTS.CYCLE_PHASE:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.CYCLE+'/'+metadata.releaseId);
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.EXECUTION:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.EXECUTION+'/'+metadata.topicEntityId);
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.TESTCASE+'/'+metadata.topicEntityId);
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.INFORMATION:
            if(!metadata.releaseId) {
                topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.INFORMATION+'/0');
            } else {
                topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.INFORMATION+'/'+metadata.releaseId);
            }
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.LOGIN_STATUS:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.LOGIN_STATUS+'/');
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.NEWS:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.NEWS+'/'+metadata.topicEntityId);
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.PROJECT_USER:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.PROJECT_USER+'/'+metadata.topicEntityId);
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.RELEASE:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.RELEASE+'/'+metadata.topicEntityId);
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.REQUIREMENT:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.REQUIREMENT+'/'+metadata.topicEntityId);
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.REQUIREMENT_TREE:
            if(metadata.topicEntityId) {
                topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.REQUIREMENT_TREE+'/project/'+metadata.topicEntityId);
            }
            if(metadata.releaseId) {
                topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.REQUIREMENT_TREE+'/release/'+metadata.releaseId);
            }
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.TESTCASEBATCHEXECUTION:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.TESTCASEBATCHEXECUTION+'/'+metadata.topicEntityId);
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.USER:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.USER+'/');
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.AUTOMATION:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.AUTOMATION+'/');
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.FILEWATCHER:
            topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.FILEWATCHER+'/');
            break;
        case NOTIFICATION_ENTITY_CONSTANTS.EXECUTION_RESULT:
            let ids = metadata.topicEntityIds;
            let i=0;
            for(i=0;i<ids.length;i++) {
                topics.push('/'+NOTIFICATION_ENTITY_CONSTANTS.EXECUTION_RESULT+'/'+ids[i]);
            }
            break;
        default:
            break;
    }
    return topics;
}

export function isNotificationPending(topic, appId) {
    let state = NotificationStore.getNotificationStore().getState();
    if(state && state.notification) {
        let notification = state.notification;
        let topicStore = notification.topics[topic];
        let uiDataStore = notification.ui_details[appId];
        if(topicStore && uiDataStore && uiDataStore.notification_count>0 && topicStore.notification_count>0) {
            return true;
        }
    }
    return false;
}

export function checkIfNotificationIsPending(appId, entity, topicEntityId, releaseId, subType = '', auto_apply = false) {
  let metadata = constructNotificationStoreMetadata(entity, topicEntityId, releaseId, subType, auto_apply);
  let topics = getNotificationTopic(entity, metadata);
  if(topics && topics.length > 0) {
    return isNotificationPending(topics[0], appId);
  }
  return false;
}
