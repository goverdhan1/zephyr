/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from '../bootstrap/environment';
import { bootloader } from '@angularclass/hmr';

import { AppModule } from '../app/app.module';

import {NotificationAtmosphereUtil} from '../app/utils/notification/notification_atmosphere.util';
import {API_PATH, getApiPath} from '../app/utils/constants/api.constants';
import {isLoggedin} from '../app/utils/constants/is-loggedin';

declare var ENV;

const platform = platformBrowserDynamic();
let resourceId, atmWaitTimeout;
let subscriberId = '';
let socketIsOpen = false;
let subCallComplete = false;

function bootstrapApp() {
    platform.bootstrapModule(AppModule).then(decorateModuleRef).catch(err => console.error(err));
}

function makeAPICall(url, callBackFunction) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        callBackFunction.call(xhttp, xhttp);
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type','application/json');
    if('dev' == ENV) {
      xhttp.setRequestHeader('accessType', 'API');

      let authorization = localStorage.getItem('base64Value');
      xhttp.setRequestHeader('Authorization', authorization);
    } else {
      xhttp.setRequestHeader('accessType', 'HTMLUI');
    }
    xhttp.send();
}

function makeGETCall(url, callBackFunction) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        callBackFunction.call(xhttp, xhttp);
    };
    xhttp.open('GET', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    if('dev' == ENV) {
        xhttp.setRequestHeader('accessType', 'API');

        let authorization = localStorage.getItem('base64Value');
        xhttp.setRequestHeader('Authorization', authorization);
    } else {
        xhttp.setRequestHeader('accessType', 'HTMLUI');
    }
    xhttp.send();
}

function registerUserComplete(xhttp) {
    if (this.readyState == 4) {
        //console.log(xhttp.responseText);
        NotificationAtmosphereUtil.getInstance().updateSubscriberId(subscriberId || '');
        NotificationAtmosphereUtil.getInstance().setRegisterComplete(true);
        bootstrapApp();
    }
}

function registerUser() {
    if(subCallComplete && socketIsOpen) {
        resourceId = NotificationAtmosphereUtil.getInstance().getSocketId();
        //console.log('subscriber id '+subscriberId+' , resource id : '+resourceId);
        let registerUserURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('NOTIFICATION_REGISTER_USER', [subscriberId, resourceId]);
        makeAPICall(registerUserURL, registerUserComplete);
    }
}

function subCreateCB(xhttp) {
    if (this.readyState == 4) {
    // Typical action to be performed when the document is ready:
        if(this.status == 200) {
            let temp = JSON.parse(xhttp.responseText);
            subCallComplete=true;
            if(temp) {
                subscriberId = temp['subsId'] || '';
            }
            registerUser();
        } else {
            //failed to create subscriber id - just continue
            NotificationAtmosphereUtil.getInstance().updateSubscriberId(subscriberId || '');
            NotificationAtmosphereUtil.getInstance().setRegisterComplete(true);
            bootstrapApp();
        }
    }
}

function onWebsocketOpen(self, response) {
   // console.log('Atmosphere connected using ' + response.transport);
    socketIsOpen = true;
    clearTimeout(atmWaitTimeout);
    registerUser();
}

function placeholder(self, response) {
   // console.log(response);
}

function subProcessToken(xhttp) {
    if (this.readyState == 4) {
        // Typical action to be performed when the document is ready:
        if(this.status == 200) {
            NotificationAtmosphereUtil.getInstance().registerAtmResource(onWebsocketOpen.bind(this, this), placeholder.bind(this, this), placeholder.bind(this, this));
            //failed to initialize websockets -
            atmWaitTimeout = setTimeout(() => {
                NotificationAtmosphereUtil.getInstance().updateSubscriberId(subscriberId || '');
                NotificationAtmosphereUtil.getInstance().setRegisterComplete(true);
                bootstrapApp();
            }, 5000);
            let createSubscriberIdURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.NOTIFICATION_CREATE_SUBSCRIBER_ID;
            makeAPICall(createSubscriberIdURL, subCreateCB);
        } else {
            localStorage.removeItem('base64Value');
            localStorage.removeItem('userInfo');
            localStorage.setItem('isTokenExpired','true');
            bootstrapApp();
        }
    }
}

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main() {
    if(!isLoggedin()) {
        bootstrapApp();
    } else {
        let validateTokenURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.REVALIDATE_TOKEN;
        makeGETCall(validateTokenURL, subProcessToken);
    }
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
