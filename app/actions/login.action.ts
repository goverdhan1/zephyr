import {Injectable, Inject} from '@angular/core';
import * as types from '../utils/constants/action.types';
import {AuthenticationService} from '../services/authentication.service';
import {Http} from '@angular/http';
import * as messageTypes from '../utils/constants/messages.types';
import * as Observable from 'rxjs/Observable';
import {LicenseService} from '../services/license.service';

@Injectable()
export class LoginAction {
    _authenticationService;
    _userId: string;
    _username: string;
    _token: string;
    _observable;
    _licenseService;
    constructor(@Inject(Http) private _http: any) {
        this._authenticationService = new AuthenticationService(_http);
        this._licenseService = new LicenseService(<any>_http);
        this._observable = Observable.Observable;
    }
    refreshToken() {
        return (dispatch) => {
            return this._authenticationService.validateToken().subscribe(() => {
                // dispatch(this._doLogout(null));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    doLoginSAML() {

        return (dispatch) => {
            return this._authenticationService.login_saml().subscribe((user) => {
                /*console.log("doLoginSAML");*/
                dispatch(this._doLogin(user));
                dispatch(this.getLicenseInfo());
                dispatch(this.getAutomationLicense());
                dispatch(this.getAdminAccessCheck());
            }, (error) => {
                console.log('error', error);
                error = error.json instanceof Function ? (error.json() || '') : error;
                try {
                    if(typeof error === 'string') {
                        error = JSON.parse(error || '{}');
                    }
                    if(error && typeof error.message === 'string') {
                        error = JSON.parse(error.message || '{}');
                    }
                } catch (err) {
                    console.log('json error', error);
                }
                let errorMsg = error.code || error.message;
               /// dispatch(this.onError(errorMsg));
            });
        };
    }
    doLogin(userDetails) {

        return (dispatch) => {
            return this._authenticationService.login(userDetails.username, userDetails.password).subscribe((user) => {
                dispatch(this._doLogin(user));
                dispatch(this.getLicenseInfo());
                dispatch(this.getAutomationLicense());
                dispatch(this.getAdminAccessCheck());
                localStorage.setItem('isLogOut', 'false');
            }, (error) => {
               // console.log('error', error);
                error = error.json instanceof Function ? (error.json() || '') : error;
                try {
                    if(typeof error === 'string') {
                        error = JSON.parse(error || '{}');
                    }
                    if(error && typeof error.message === 'string') {
                        error = JSON.parse(error.message || '{}');
                    }

                    if (error.errorMsg) {
                      let err = JSON.parse(error.errorMsg);

                      while (typeof err === "string") {
                        err = JSON.parse(err);
                      }

                      error = JSON.parse(err.message);
                    }

                } catch (err) {
                   console.log('json error', error);
                }

                let errorMsg = error.code || error.message;
                let errorCode = error.errorCode;
                let userId = error.userId;
                let token = error.token;

                this._userId = userId;
                this._token = token;
                this._username = userDetails.username;


                if (errorCode == 3 && errorMsg == 'User credentials are expired, Please login to UI and reset credentials.') {
                    return this._authenticationService.getPasswordPolicy().subscribe((data) => {
                        dispatch(this._credentialsExpiredError(data, error));
                    }, (error) => {
                        let errorMsg = {
                            zeeErrorCode: error.status,
                            errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                        };
                        dispatch(this.onError(errorMsg));
                    });
                }  else {
                   dispatch(this._nologinPopup(error));
                }

            });
        };
    }

    _nologinPopup (data) {
      return  { type: types.NO_LOGIN_POPUP, data };
    }

    _credentialsExpiredError (data, error) {
      return  { type: types.CREDENTIALS_EXPIRED, data, error };
    }

    clearEvent() {
      return { type: types.CLEAR_EVENT};
    }

    _doLogin(data) {
        return { type: types.SET_USER_DETAILS, data };
    }
    doLogout() {
        return (dispatch) => {
            return this._authenticationService.logout().subscribe(() => {
                localStorage.setItem('isLogOut', 'true');
                dispatch(this._doLogout(null));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    clearZephyrStore(data={}) {
        return (dispatch) => {
            dispatch({ type: types.CLEAR_ZEPHYR_STORE, data });
        };
    }
    _doLogout(data) {
        return { type: types.ON_USER_LOGOUT, data };
    }
    doChangePassw(data) {
        return (dispatch) => {
            return this._authenticationService.changePassw(data).subscribe(() => {
                dispatch(this._doChangePassw(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _doChangePassw(data) {
        return { type: types.ON_USER_CHANGE_PASSWORD, data };
    }

    doResetPassw(data) {
        return (dispatch) => {
            return this._authenticationService.resetPassw(data, this._userId, this._username, this._token).subscribe(() => {
                let userDetails = {
                    'username': this._username,
                    'password': data
                };
                dispatch(this.doLogin(userDetails));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    getAutomationLicense() {

      return (dispatch) => {
          return this._licenseService.getAutomationLicense().subscribe((data) => {
                          dispatch(this._storeAutomationLicenseInfo(data));
                      }, (error) => {
                         dispatch(this.onError(error));
                      });
                };
        }

    _storeAutomationLicenseInfo(data) {
        return { type: types.GET_AUTOMATION_LICENSE, data };
    }


  getAdminAccessCheck() {
    return (dispatch) => {
      return this._licenseService.getAdminAccessCheck().subscribe((data) => {
        try {
          data = data.json();
          dispatch(this._storeAdminAccessCheck(data));
        } catch (err) {
          console.log('access blocked - parsing error');
          //dispatch(this.onError(err));
        }
      }, (error) => {
        console.log('access blocked - parsing error');
        //dispatch(this.onError(error));
      });
    };
  }

  _storeAdminAccessCheck(data) {
    return { type: types.ACCESS_ADMIN_CHECK, data };
  }

    getLicenseInfo() {
        return (dispatch) => {
            return this._observable.forkJoin(
                this._licenseService.getAppLicense(),
                this._licenseService.getAppLicenseInfo(),
                this._licenseService.getAppDFPInfo(),
                this._licenseService.getAppDBInfo()

            ).subscribe((data) => {
                var _data = {
                    'loggedInUsers': data[1].currentlyLogged,
                    'licEdition': data[1].licenseEdition,
                    'licType': data[1].licenseType,
                    'buildNumber': data[1].buildNumber,
                    'licenseId': data[0].licenseId,
                    'licensedUsers': data[0].noOfTotalUser,
                    'activeUsers': data[0].noOfPaidUser,
                    'custId': data[0].custId,
                    'chksum': data[2]['dfp'],
                    'db': data[3][0],
                    'dbv': data[3][1]
                };
                let expirationDate = (data[0].expirationDate - (Number)(new Date())) / (1000*60*60*24);
                dispatch(this.storeLicenceExpiry(expirationDate));
                dispatch(this.doVersionPing(_data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    doVersionPing(data) {
        return (dispatch) => {
            return this._licenseService.doVersionPing(data).subscribe((data) => {
                // dispatch(this._doVersionPing(data));
            }, (error) => {
                // dispatch(this.onError(error));
            });
        };
    }

    storeLicenceExpiry(data){
        return { type: types.LICENCE_EXPIRATION_DAYS, data };
    }
    _doVersionPing(data) {
        //return { type: types.ON_USER_LOGOUT, data };
    }
    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.ERROR, data})
        };
    }
}
