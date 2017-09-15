import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {API_PATH} from '../utils/constants/api.constants';
import {Http, Headers, Response} from '@angular/http';

import {getRequestHeader, getRequestHeaderWithBasicAuth} from '../utils/api/api.utils';
declare var unescape:any, encodeURIComponent:any;
@Injectable()
export class AuthenticationService {
    base64Value: string;
    constructor(public http: any) {
        this.base64Value = localStorage.getItem('base64Value');
    }

  login(username: String, password: String): Observable<any> {
    /*
     * Login
     */
    let loginURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.AUTHORIZE;
    let authorization = 'Basic ' + btoa(unescape(encodeURIComponent(username + ':' + password)));
    return this.http.get(loginURL, {
        headers: getRequestHeaderWithBasicAuth({
                'authorization': authorization,
                'includeAcceptType': true
            })
    })
    .map((res : Response) => {
        let data = res.json();
        if(typeof data === 'string') {
            /*
             * This is in case the current username, password is not in the db,
             * then the server returns me 401 in response with 200 (ok) status.
             */
            data = JSON.parse(data);
            data['username'] = username;
        }
        this.base64Value = data.token;
        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('base64Value', authorization);
        localStorage.setItem('IS_FIRST_LOAD', 'true');
        return data;
      });
  }

  login_saml(): Observable<any> {
    /*
     * Login
     */
    let loginURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.AUTHORIZE;
    //let authorization = 'Basic ' + btoa(username + ':' + password);
    return this.http.get(loginURL, {
       headers: getRequestHeader()
    })
    .map((res : Response) => {
        let data = res.json();
        if(typeof data === 'string') {
            /*
             * This is in case the current username, password is not in the db,
             * then the server returns me 401 in response with 200 (ok) status.
             */
            data = JSON.parse(data);
            //data['username'] = username;
        }
        //this.base64Value = data.username;
        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('base64Value', "cacheAccessor.updateCache");
        localStorage.setItem('IS_FIRST_LOAD', 'true');
        return data;
      });
  }

  logout(): Observable<any> {
    var logoutURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.LOGOUT;
    /*
     * Logout
    */
        return this.http.delete(logoutURL, {
            headers: getRequestHeader()
        })
        .map((res : Response) => {
            this.base64Value = null;
            // localStorage.removeItem('base64Value');
            // localStorage.removeItem('userInfo');
            localStorage.clear();
        });
  }

  changePassw(data) {
        let changePasswURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.USERS_CHANGE_PASSWORD;
        /*
         * Change Password
        */

        let obj = {
          'newPassword': data
        };

        return this.http.put(changePasswURL, JSON.stringify(obj), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map((res : Response) => {
            //this.base64Value = null;
            //localStorage.removeItem('base64Value');
            //localStorage.removeItem('userInfo');
        });
  }

  resetPassw(data, userId, username, token) {
        let resetPasswURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.USERS_RESET_PASSWORD +token;
        let obj = {
          'id': userId,
          'username': username,
          'password': data
        };

        return this.http.put(resetPasswURL, JSON.stringify(obj), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map((res : Response) => {
            //this.base64Value = null;
            //localStorage.removeItem('base64Value');
            //localStorage.removeItem('userInfo');
        });
  }

  getPasswordPolicy() {
        let passwordPolicyURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ANONYMOUS_PREFERENCES;

        return this.http.get(passwordPolicyURL, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
  }

  validateToken() {
    let validateTokenURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.REVALIDATE_TOKEN;
    return this.http.get(validateTokenURL, {
      headers: getRequestHeader({
        'includeAcceptType': true
      })
    });
  }

}
