import {Injectable, Inject} from '@angular/core';
import * as types from '../utils/constants/action.types';
import {Http} from '@angular/http';
import * as messageTypes from '../utils/constants/messages.types';

import {NotificationServices} from '../services/notification.service';
import {NOTIFICATION_STATE_CONSTANTS,NOTIFICATION_PENDING_MESSAGE} from '../utils/constants/notification.constants';

@Injectable()
export class NotificationAction {

    _notificationService;

    constructor(@Inject(Http) private _http: any) {
        this._notificationService = new NotificationServices(<any>_http);
    }

    handlePendingNotificationError() {
        return (dispatch) => {
          dispatch(this.onError(NOTIFICATION_PENDING_MESSAGE));
        };
    }

    resetNotificationTriggerState(topic, triggerState = NOTIFICATION_STATE_CONSTANTS.WAITING) {
        return (dispatch) => {
            let data = {type: types.NOTFICATION_TRIGGER_STATE_RESET, data: {topic:topic, triggerState: triggerState}};
            dispatch(data);
        };
    }

    discardAppNotifications(appId) {
        return (dispatch) => {
            let data = {type: types.DISCARD_NOTIFICATIONS, data: appId};
            dispatch(data);
        };
    }

    closeAppNotifications(appId) {
        return (dispatch) => {
            let data = {type: types.CLOSE_APP_NOTIFICATIONS, data: appId};
            dispatch(data);
        };
    }

    processNotificationMessage(message) {
        return (dispatch) => {
            dispatch(this._processNotificationMessage(message));
        };
    }

    updateSubscriberAndResourceId(subscriberId, resourceId) {
        return (dispatch) => {
            dispatch(this._createSubscriberId(subscriberId,resourceId));
        };
    }

    createSubscriberId(resourceId) {
        return (dispatch) => {
            return this._notificationService.createSubscriberId().subscribe((data) => {
                dispatch(this._createSubscriberId(data.subsId,resourceId));
                dispatch(this.registerUser(data.subsId || '', resourceId));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
                dispatch(this._createSubscriberId('',resourceId));
                dispatch(this._registerUser(false));
            });
        };
    }

    registerUser(subsciberId, resourceId) {
        return (dispatch) => {
            return this._notificationService.registerUser(subsciberId, resourceId).subscribe((data) => {
                dispatch(this._registerUser(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
                dispatch(this._registerUser(false));
            });
        };
    }

    subscribeToTopic(topicMetadata, previousTopicMetadata, appId) {
        return (dispatch) => {
            let data = {topicMetadata: topicMetadata, previousTopicMetadata:previousTopicMetadata, appId: appId };
            dispatch(this._subscribeToTopic(data));
        };
    }

    subscribeToTopicOnServer(topicMetadata, appId) {
        return (dispatch) => {
            return this._notificationService.subscribeToTopic(topicMetadata.entity,
                    topicMetadata.topicEntityId, topicMetadata.releaseId).subscribe((data) => {
                dispatch(this._subscribeToTopic({topicMetadata: topicMetadata, previousTopicMetadata:'', appId: appId }));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    requestUnsubscription(topicMetadata) {
        return (dispatch) => {
            let entityId = topicMetadata.metadata.topicEntityId || '';
            let releaseId = topicMetadata.metadata.releaseId || '';
            dispatch(this._initiateUnsubscription(topicMetadata.topic));
            return this._notificationService.unsubscribeFromTopic(topicMetadata.entity, entityId, releaseId).subscribe((data) => {
                dispatch(this._requestUnsubscription(topicMetadata.topic,true));
            }, (error) => {
                dispatch(this._requestUnsubscription(topicMetadata.topic,false));
                dispatch(this.onError(error));
            });
        };
    }

    unsubscribeAll() {
        return (dispatch) => {
            return this._notificationService.unsubscribeAll().subscribe((data) => {
                dispatch(this._unsubscribeAll(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    clearNotificationStore(data='') {
      return (dispatch) => {
          dispatch(this._unsubscribeAll(data));
      };
    }

    unSubscribeFromTopic(topicMetadata, appId) {
        return (dispatch) => {
            let data = {topicMetadata: topicMetadata, appId: appId };
            dispatch(this._unSubscribeFromTopic(data));
        };
    }

    applyNotification(appId,status) {
        return (dispatch) => {
            let data = appId;
            dispatch(this._applyNotification(data, status));
        };
    }

    clearNotificationEvent() {
        return { type: types.CLEAR_NOTIFICATION_EVENTS};
    }

    _processNotificationMessage(data) {
        return { type: types.PROCESS_NOTIFICATION_MESSAGE, data };
    }

    _createSubscriberId(subsciberId, resourceId) {
        let data = {subsId: subsciberId, resourceId: resourceId};
        return { type: types.CREATE_NOTIFICATION_SUBSCRIBER_ID, data };
    }

    _registerUser(data) {
        return { type: types.REGISTER_USER_FOR_NOTIFICATION, data };
    }

    _subscribeToTopic(data) {
        return { type: types.SUBSCRIBE_TO_TOPIC, data };
    }

    _unSubscribeFromTopic(data) {
        return { type: types.UNSUBSCRIBE_FROM_TOPIC, data };
    }

    _applyNotification(data, status) {
        if(status) {
            return { type: types.APPLY_NOTIFICATION_SUCCESS, data };
        } else {
            return { type: types.APPLY_NOTIFICATION_FAILED, data };
        }
    }

    _requestUnsubscription(topic, status) {
        let data = {topic: topic, status: status};
        return { type: types.REQUEST_UNSUBSCRIPTION, data };
    }

    _initiateUnsubscription(data) {
        return { type: types.INITIATE_UNSUBSCRIPTION, data };
    }

    _unsubscribeAll(data) {
        return { type: types.UNSUBSCRIBE_ALL, data };
    }

    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.ERROR, data})
        };
    }

}
