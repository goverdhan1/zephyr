import {Http, Headers} from '@angular/http';
import {NotificationStore} from '../../store/notification.store';

declare var ENV;

/**
 * @export
 * @param {any} params
 *  includeAcceptType
 *  acceptType
 *  contentType
 * @returns header
 */
export function getRequestHeader(params = {}, isAjax ?: boolean): any {
    params = params || {};
    if('dev' == ENV) {
        return getRequestHeaderWithBasicAuth(params, isAjax);
    }
    // let authorization = params['authorization'] || localStorage.getItem('base64Value');
    let subsId = '';
    let store = NotificationStore.getNotificationStore();
    if(store && store.getState().notification) {
        subsId = NotificationStore.getNotificationStore().getState().notification.subscriber_id || '';
    }
    // let hd = {'Authorization': authorization,'subsId': subsId};
    let hd = {'subsId': subsId};
    if(params['includeAcceptType']) {
        hd['Accept']= params['acceptType'] || 'application/json';
    }
    hd['Content-Type']= params['contentType'] || 'application/json';
    if('dev' == ENV) {
        hd['accessType'] = 'API';
    } else {
        hd['accessType'] = 'HTMLUI';
    }
    if(isAjax) {
        return hd;
    } else {
        let header = new Headers(hd);
        return header;
    }
}

export function getRequestHeaderWithBasicAuth(params = {}, isAjax ?: boolean): any {
  params = params || {};
  let authorization = params['authorization'] || localStorage.getItem('base64Value');
  let subsId = '';
  let notificationStore = NotificationStore.getNotificationStore();
  if(notificationStore && notificationStore.getState().notification) {
    subsId = notificationStore.getState().notification.subscriber_id || '';
  }
  let hd = {'Authorization': authorization,'subsId': subsId};
  if(params['includeAcceptType']) {
    hd['Accept']= params['acceptType'] || 'application/json';
  }
  hd['Content-Type']= params['contentType'] || 'application/json';
  if('dev' == ENV) {
      hd['accessType'] = 'API';
  } else {
      hd['accessType'] = 'HTMLUI';
  }
  if(isAjax) {
      return hd;
  } else {
      let header = new Headers(hd);
      return header;
  }
}
