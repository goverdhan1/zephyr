import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
import {EventHttpService} from './event-http.service';

@Injectable()
export class NotificationServices {

    constructor(public http: EventHttpService) {
        //console.log('Notification service');
    }

    createSubscriberId() {
        let createSubscriberIdURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.NOTIFICATION_CREATE_SUBSCRIBER_ID;
        return this.http.post(createSubscriberIdURL, JSON.stringify({}), {
            headers: getRequestHeader()
        }).map(response => response.json());
    }

    registerUser(subscriberId, resourceId) {
        let registerUserURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
                             + getApiPath('NOTIFICATION_REGISTER_USER', [subscriberId, resourceId]);
        return this.http.post(registerUserURL, JSON.stringify({}), {
            headers: getRequestHeader()
        }).map(response => response.json());
    }

    subscribeToTopic(entity, entityId, releaseId) {
        let hd = getRequestHeader();
        let subscribeToTopicURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
                             + getApiPath('NOTIFICATION_SUBSCRIBE_TO_TOPIC', [entity, entityId, releaseId, hd.get('subsId')]);
        return this.http.post(subscribeToTopicURL, JSON.stringify({}), {
            headers: getRequestHeader()
        }, true).map(response => response.json());
    }

    unsubscribeFromTopic(entity, entityId, releaseId) {
        let unsubscribeFromTopicURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
                             + getApiPath('NOTIFICATION_UNSUBSCRIBE_FROM_TOPIC', [entity, entityId, releaseId]);
        return this.http.delete(unsubscribeFromTopicURL, {
            headers: getRequestHeader()
        }, true).map(response => response.json());
    }

    unsubscribeAll() {
        let unsubscribeAllURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.NOTIFICATION_UNSUBSCRIBE_ALL;
        return this.http.delete(unsubscribeAllURL, {
            headers: getRequestHeader()
        }, true).map(response => response.json());
    }

}
