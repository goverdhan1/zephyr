import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {getRequestHeader} from '../utils/api/api.utils';
import {EventHttpService} from './event-http.service';
// Constants
import {API_PATH} from '../utils/constants/api.constants';

declare var $: any;
@Injectable()
export class GlobalService {
    constructor(public http: EventHttpService) {}
    /**
     * Check if it is mobile or desktop browser
     * @type: In mobile: android, blackberry, IOS, opera mini, windows
     */
    isAndroid() {
        return navigator.userAgent.match(/Android/i);
    }
    isBlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i);
    }
    isIOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }
    isOperaMini() {
        return navigator.userAgent.match(/Opera Mini/i);
    }
    isWindows() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    }
    isMobile() {
        return (this.isAndroid() || this.isBlackBerry() || this.isIOS() || this.isOperaMini() || this.isWindows());
    }
    browser() {
        let browser = {
            isIE: false
        };
        if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
            browser.isIE = true;
        }
        return browser;
    }

    jobPregress (data) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.JOB_PREGRESS + data;
        return this.http.get(getURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    fetchDefectSystemDetails () {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.FETCH_DEFECT_SYSTEM;
        return this.http.get(getURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    serverPaused(skipLoadingBar = true) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.SERVER_PAUSED;
        return this.http.get(getURL, {
            headers: getRequestHeader()
        },skipLoadingBar)
        .map(response => response.json());
    }
}
