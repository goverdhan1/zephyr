import * as types from '../utils/constants/action.types';
import * as events from '../utils/constants/action.events';
import {NOTIFICATION_ENTITY_CONSTANTS, NOTIFICATION_STATE_CONSTANTS, NOTIFICATION_AUTO_APPLY_TIMEWAIT, NOTIFICATION_APP_CONSTANTS}
        from '../utils/constants/notification.constants';
import {getNotificationTopic,NOTIFICATION_METADATA} from '../utils/notification/notification.util';

const initialState = {
    event : '',
    subscriber_id: '',
    resource_id: '',
    registered: false,
    topics: {},
    ui_details : {},
    topicsForUnsubscription : {},
    unsubscriptionInProgress : false
};

export function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case types.CREATE_NOTIFICATION_SUBSCRIBER_ID:
            state.subscriber_id = action.data.subsId || '';
            state.resource_id = action.data.resourceId;
            return state;
        case types.PROCESS_NOTIFICATION_MESSAGE:
            processNotificationMessage(state, action);
            return state;
        case types.SUBSCRIBE_TO_TOPIC:
            processSubscriptions(state, action);
            return state;
        case types.UNSUBSCRIBE_FROM_TOPIC:
            processUnsubscriptions(state, action);
            return state;
        case types.REGISTER_USER_FOR_NOTIFICATION:
            state.registered = action.data;
           // console.log(state.subscriber_id);
            state.event = events.SUBSCRIBER_REGISTRATION_SUCCESS;
            return state;
        case types.UNREGISTER_USER_FROM_NOTIFICATION:
            return state;
        case types.APPLY_NOTIFICATION_FAILED:
            updateState(state, action, false);
            return state;
        case types.APPLY_NOTIFICATION_SUCCESS:
            updateState(state, action, true);
            return state;
        case types.REQUEST_UNSUBSCRIPTION:
            delete state.topicsForUnsubscription[action.data.topic];
            state.unsubscriptionInProgress = false;
            return state;
        case types.INITIATE_UNSUBSCRIPTION:
          state.unsubscriptionInProgress = true;
          return state;
        case types.UNSUBSCRIBE_ALL:
            state.subscriber_id = '';
            state.registered = false;
            state.topics = {};
            state.ui_details = {};
            state.topicsForUnsubscription = {};
            return state;
        case types.CLEAR_NOTIFICATION_EVENTS:
            state.event = '';
            return state;
        case types.DISCARD_NOTIFICATIONS:
            var appId = action.data;
            if(state.ui_details && state.ui_details[appId]) {
                state.ui_details[appId].discard_count += state.ui_details[appId].notification_count;
                state.ui_details[appId].notification_count = 0;
                state.ui_details[appId].notification_messages = [];
            }
            return state;
        case types.CLOSE_APP_NOTIFICATIONS:
            var appId = action.data;
            if(state.ui_details[appId]) {
                state.ui_details[appId].discard_count = 0;
                state.ui_details[appId].notification_count = 0;
                state.ui_details[appId].notification_messages = [];
                state.ui_details[appId].topics = [];
            }
            return state;
        case types.NOTFICATION_TRIGGER_STATE_RESET:
            var triggerState = action.data.triggerState;
            var topic = action.data.topic;
            var data = state.topics[topic];
            if(data) {
                data.trigger_state = triggerState;
            }
            return state;
        default:
            return state;
    }
}

function prepareNotificationStoreData(entity, topic, metadata, appId) {
    let storeMetadata = NOTIFICATION_METADATA[entity];
    let data = {
        subcribers: [appId],
        derived_actions: storeMetadata.actions,
        metadata: metadata,
        derived_acceptance: storeMetadata.acceptance,
        auto_apply: metadata.auto_apply,
        trigger_state: NOTIFICATION_STATE_CONSTANTS.WAITING,
        notification_count: 0
    };
    return data;
}

function processNotificationMessage(state, action) {
    let message = action.data;
    let topic = message.topic;
    let entity = message.entityName;
    let data = state.topics[topic];
    if(data) {
        let i = 0;
        let index = data.derived_actions.indexOf(message.action);
        if(index == -1) {
            // console.log(topic+' is not registered for messages on '+message.action+
            //     ' action. Permitted actions : ['+data.derived_actions+'] ,'+
            //     ' So skipping notification : '+ JSON.stringify(message));
            return false;
        }
        if(data.derived_acceptance.length > 0) {
            //check acceptance
            for(i=0;i<data.derived_acceptance.length;i++) {
                if(message[data.derived_acceptance[i]] != data.metadata[data.derived_acceptance[i]]) {
                   // console.log(topic+' failed acceptance check for '+data.derived_acceptance[i]+
                   //      ' : actual: ['+message[data.derived_acceptance[i]]+'] ,'+
                   //      ' expected: ['+data.metadata[data.derived_acceptance[i]]+'] . '+
                   //      'So skipping notification : '+ JSON.stringify(message));
                    return false;
                }
            }
        }
        data.notification_count++;
        let appIds = data.subcribers;
        for(i=0;i<appIds.length;i++) {
            let ui_data = state.ui_details[appIds[i]];
            ui_data.notification_count++;
            ui_data.notification_messages.push(message);
            if(ui_data.auto_apply) {
                // if(ui_data.trigger_state == NOTIFICATION_STATE_CONSTANTS.WAITING || message.entityName == "testcaseBatchExecution") {
                if(ui_data.trigger_state == NOTIFICATION_STATE_CONSTANTS.WAITING) {
                    //
                    // if (message.entityName == "testcaseBatchExecution") {
                    //   console.log(message.entityName);
                    // }

                    ui_data.event = events.APPLY_NOTIFICATION;
                    ui_data.trigger_state = NOTIFICATION_STATE_CONSTANTS.APPLY_TRIGGERED;
                } else {
                    // console.error(message);
                    console.debug('Not considering message '+message.uuid+
                        ' since it is marked for auto apply and apply has already been triggered');
                }
            }
            // if(!ui_data.auto_apply && data.auto_apply && data.trigger_state == NOTIFICATION_STATE_CONSTANTS.WAITING) {
            //     data.trigger_state = NOTIFICATION_STATE_CONSTANTS.APPLY_TRIGGERED;
            // }
        }
        console.debug('Processed Notification : ' + message.uuid);
        return true;
    } else {
       // console.log(topic+' has no subscriptions . So skipping notification : '+ JSON.stringify(message));
    }
    return false;
}

/**
 * Function to check if two topics are different
 *
 * @param {any} topic
 * @param {any} oldTopic
 * @returns true if both are different else false
 */
function isUnsubscriptionRequired(topic, oldTopic) {
    let topicStr = topic.join();
    let oldTopicStr = oldTopic.join();
    if(topicStr == oldTopicStr) {
        return false;
    } else {
        return true;
    }
}

/**
 * Function that processes httpStartSubscriber requests from components
 *
 * @param {any} state
 * @param {any} action
 */
function processSubscriptions(state, action) {
    let curMetadata = action.data.topicMetadata;
    let prevMetadata = action.data.previousTopicMetadata;
    let appId = action.data.appId;
    let curTopic = getNotificationTopic(curMetadata.entity, curMetadata);
    if(prevMetadata) {
        let prevTopic = getNotificationTopic(prevMetadata.entity, prevMetadata);
        if(isUnsubscriptionRequired(curTopic, prevTopic)) {
            //change in topic so unsubscribe from old topic first
            updateUnsubscription(state, prevMetadata.entity, prevTopic, appId);
            updateSubscription(state, curMetadata.entity, curTopic, curMetadata, appId);
        }
        //no httpStartSubscriber required in case old and new topics are same
    } else {
        updateSubscription(state, curMetadata.entity, curTopic, curMetadata, appId);
    }
}

function processUnsubscriptions(state, action) {
    let metadata = action.data.topicMetadata;
    let topic = getNotificationTopic(metadata.entity, metadata);
    updateUnsubscription(state, metadata.entity, topic, action.data.appId);
}

/**
 * Function that updates the httpStartSubscriber count for the components in the notification store
 *
 * @param {any} state
 * @param {any} entity
 * @param {any} topics
 * @param {any} metadata
 * @param {any} appId
 */
function updateSubscription(state, entity, topics, metadata, appId) {
    let ui_data = state.ui_details[appId];
    if(!ui_data) {
        ui_data = {
            notification_count: 0,
            topics: [],
            notification_messages: [],
            discard_count: 0,
            event: '',
            trigger_state: NOTIFICATION_STATE_CONSTANTS.WAITING,
            auto_apply: (NOTIFICATION_APP_CONSTANTS[appId] || {}).auto_apply
        };
    }
    let i=0;
    for(i=0;i<topics.length;i++) {
        let data = state.topics[topics[i]];
        if(data) {
            let index = data.subcribers.indexOf(appId);
            if(index == -1) {
                data.subcribers.push(appId);
            }
        } else {
            data = prepareNotificationStoreData(entity, topics[i], metadata, appId);
        }
        state.topics[topics[i]] = data;
        let index = -1;
        index = ui_data.topics.indexOf(topics[i]);
        if(index < 0) {
            ui_data.topics.push(topics[i]);
        }
    }
    state.ui_details[appId] = ui_data;
}

/**
 * Function that updates the httpStartSubscriber count for components in the notification store. Also initiates un-httpStartSubscriber
 * call to the server in case there are no more subscriptions to a particular topic
 *
 * @param {any} state
 * @param {any} entity
 * @param {any} topics
 * @param {any} appId
 */
function updateUnsubscription(state, entity, topics, appId) {
    let ui_data = state.ui_details[appId];
    let i=0;
    for(i=0;i<topics.length;i++) {
        let data = state.topics[topics[i]];
        let index = -1;
        if(data) {
            index = data.subcribers.indexOf(appId);
        }
        if(index > -1) {
            data.subcribers.splice(index, 1);
            state.topics[topics[i]] = data;
            if(data.subcribers.length == 0) {
              initiateUnsubscription(state, topics[i], data.metadata, entity);
              delete state.topics[topics[i]];
            }
        }
        index = -1;
        if(ui_data && ui_data.topics) {
            index = ui_data.topics.indexOf(topics[i]);
            if(index > -1) {
                ui_data.topics.splice(index, 1);
            }
        }
    }
    state.ui_details[appId] = ui_data;
}

function initiateUnsubscription(state, topic, metadata, entity) {
    //function to initiate unsubscribe call to the server
    state.topicsForUnsubscription[topic] = {topic: topic, metadata: metadata, entity: entity};
    return '';
}

/**
 * Function that updates the notification count in the store on application of notifications
 *
 * @param {any} state
 * @param {any} action
 */
function updateState(state, action, status) {
    let appId = action.data;
    let data = state.ui_details[appId];
    if(data) {
        if(status) {
            data.discard_count = 0;
            data.notification_count = 0;
            data.notification_messages = [];
            if(data.topics) {
                let i = 0;
                for(i=0;i<data.topics.length;i++) {
                    let topic = state.topics[data.topics[i]];
                    if(topic && topic['subcribers'].length<2) {
                        topic.notification_count = 0;
                    }
                }
            }
        }
        data.event = '';
        data.trigger_state = NOTIFICATION_STATE_CONSTANTS.WAITING;
    }
}
