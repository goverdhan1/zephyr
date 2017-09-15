import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import {enableProdMode} from '@angular/core';

import {NotificationAtmosphereUtil} from './utils/notification/notification_atmosphere.util';
import {API_PATH, getApiPath} from './utils/constants/api.constants';
import {isLoggedin} from './utils/constants/is-loggedin';

enableProdMode();
const platform = platformBrowserDynamic();
let subscriberId='';
let socketIsOpen=false;
let subCallComplete=false;
let resourceId;
let atmWaitTimeout;

declare var ENV;

if(!isLoggedin()) {
    platform.bootstrapModule(AppModule);
} else {
    let validateTokenURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.REVALIDATE_TOKEN;
    makeGETCall(validateTokenURL, subProcessToken);
}

function makeGETCall(url, callBackFunction) {
  let authorization = localStorage.getItem('base64Value');
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    callBackFunction.call(xhttp,xhttp);
  };
  xhttp.open('GET', url, true);
  xhttp.setRequestHeader('Content-Type','application/json');
  if('dev' == ENV) {
    xhttp.setRequestHeader('accessType', 'API');
    xhttp.setRequestHeader('Authorization', authorization);
  } else {
    xhttp.setRequestHeader('accessType', 'HTMLUI');
  }
  xhttp.send();
}

function makeAPICall(url, callBackFunction) {
    let authorization = localStorage.getItem('base64Value');
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        callBackFunction.call(xhttp,xhttp);
    };
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type','application/json');
    if('dev' == ENV) {
      xhttp.setRequestHeader('accessType', 'API');
      xhttp.setRequestHeader('Authorization', authorization);
    } else {
      xhttp.setRequestHeader('accessType', 'HTMLUI');
    }
    xhttp.send();
}

function subProcessToken(xhttp) {
  if (this.readyState == 4) {
    // Typical action to be performed when the document is ready:
    if(this.status == 200) {
      NotificationAtmosphereUtil.getInstance().registerAtmResource(onWebsocketOpen.bind(this,this),
        placeholder.bind(this,this), placeholder.bind(this,this));
      //failed to initialize websockets -
      atmWaitTimeout = setTimeout(() => {
        NotificationAtmosphereUtil.getInstance().updateSubscriberId(subscriberId || '');
        NotificationAtmosphereUtil.getInstance().setRegisterComplete(true);
        platform.bootstrapModule(AppModule);
      },5000);
      let createSubscriberIdURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.NOTIFICATION_CREATE_SUBSCRIBER_ID;
      makeAPICall(createSubscriberIdURL, subCreateCB);
    } else {
      localStorage.removeItem('base64Value');
      localStorage.removeItem('userInfo');
      localStorage.setItem('isTokenExpired','true');
      platform.bootstrapModule(AppModule);
    }
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
            platform.bootstrapModule(AppModule);
        }
    }
}

function placeholder(self,response) {
   // console.log(response);
}

function registerUser() {
    if(subCallComplete && socketIsOpen) {
        resourceId = NotificationAtmosphereUtil.getInstance().getSocketId();
        //console.log('subscriber id '+subscriberId+' , resource id : '+resourceId);
        let registerUserURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
                             + getApiPath('NOTIFICATION_REGISTER_USER', [subscriberId, resourceId]);
        makeAPICall(registerUserURL, registerUserComplete);
    }
}

function registerUserComplete(xhttp) {
    if (this.readyState == 4) {
        //console.log(xhttp.responseText);
        NotificationAtmosphereUtil.getInstance().updateSubscriberId(subscriberId || '');
        NotificationAtmosphereUtil.getInstance().setRegisterComplete(true);
        platform.bootstrapModule(AppModule);
    }
}

function onWebsocketOpen(self, response) {
   // console.log('Atmosphere connected using ' + response.transport);
    socketIsOpen = true;
    clearTimeout(atmWaitTimeout);
    registerUser();
}
