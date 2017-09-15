
import {Component, OnInit, NgZone, ChangeDetectorRef} from '@angular/core';
import {Location } from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
// import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup} from '@angular/common';

import {Router} from '@angular/router';
// import {RouteParams} from '@angular/router-deprecated';
// import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {ZephyrStore} from '../../../store/zephyr.store';
import {LoginAction} from '../../../actions/login.action';
import {NotificationAction} from '../../../actions/notification.action';
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import {ResetPasswordComponent} from '../common/reset_password/reset_password.component';
import { AdminAction } from '../../../actions/admin.action';

import {SUBSCRIBER_REGISTRATION_SUCCESS} from '../../../utils/constants/action.events';
import {isLoggedin, getNextPageURL} from '../../../utils/constants/is-loggedin';
import {ADMIN_PREFERENCES} from '../admin/admin.constant';
declare var jQuery: any;

@Component({
  selector: 'login',
  viewProviders: [LoginAction, NotificationAction],
  templateUrl: 'login.html'
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    error: boolean = false;
    resetPasswordObject = {};
    errorObj;
    loginInProgress:boolean = false;
    public zephyrStore;
    //passwordPolicy;
    i18nMessages;
    isSaml;
    showSSO:boolean;
    ssoRedirectionFailed = false;


    constructor(fb: FormBuilder, public router: Router, private _loginAction: LoginAction,
      private _notificationAction: NotificationAction,private _adminaction:AdminAction, private cdr: ChangeDetectorRef) {
        this.loginForm = fb.group({
            username:  ['', Validators.required],
            password:  ['', Validators.required]
            //role: ['']
        });
        this.showSSO = false;
        this.zephyrStore = ZephyrStore.getZephyrStore();

        this.i18nMessages = I18N_MESSAGES;
        //this.resetPasswordObject['lowerText'] = this.i18nMessages['zephyr.resetpassword.condition'];
      setTimeout(() => {
        jQuery(".modal-backdrop").remove();
      },51);

        this.zephyrStore.subscribe(() => {
            this.loginInProgress = false;
            if(Object.keys(this.zephyrStore.getState().loggedInUser).length && window.location.pathname.indexOf('/login') > -1) {
                //
            } else {
              this.error = true;
              }

          if(window.location.href.indexOf('?error=')>0){
              this.ssoRedirectionFailed = true;
              jQuery('#loginError-modal').modal();
              let str = window.location.hash;
              let errorCode = parseInt(str.substring(str.indexOf('#') + 1));
              let obj = {'msg':''};
            switch (errorCode){
              case 3: obj.msg = 'User credentials are expired, Please login internally and reset credentials.';
                break;
              case 4: obj.msg = 'User is disabled and hence cannot login.';
                    break;
              case 32: obj.msg = 'User login is disabled, system change in progress.';
                break;
              case 33: obj.msg = 'Permission denied, Please check with administrator.';
                break;
              case 34: obj.msg = 'You are not associated to any project currently. You need to be associated to a project to login.';
                break;
              case 35: obj.msg = 'Single Sing-On failed. Please contact zephyr administrator.';
                break;
              case 36: obj.msg = 'Sorry, Zephyr is unable to contact external authentication system. Please try again.';
                break;
              case 1: obj.msg = 'You are not an authorized user. Please contact zephyr administrator';
                break;
              case 5226 : obj.msg = 'No Licenses Available, Please Contact Zephyr Support.';
                break;
              case 5222 : obj.msg = 'Max # of users already logged in. If you keep seeing this message please contact your Zephyr Administrator as you might need additional licenses';
                break;
              case 5221 : obj.msg = 'License Expired , Please Contact Zephyr Support.';
                break;
              default: obj.msg = 'You are not an authorized user. Please contact zephyr administrator.';
                  break;
            }
            this.errorObj = obj;
            window.history.replaceState({}, '' , window.location.pathname);
            jQuery('.modal-backdrop').css('z-index', -1);
          }


          let state = this.zephyrStore.getState().loggedUsers;
              let policy = state['admin.authentication.security.policy'],
                  policyArray = state['admin.authentication.security.policy.LOV'] ?
                    JSON.parse(state['admin.authentication.security.policy.LOV']) : [],
                  policyDescription = policyArray.filter(policy => {
                    return policy.policyName === state['admin.authentication.security.policy'];
                  });

              let adminState = this.zephyrStore.getState().adminPref;
              this.showSSO = adminState[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_TYPE] === '5' ? true : false;
             /* if(adminState && adminState['event'] === 'IS_SAML_AUTHNICATED') {
                this.zephyrStore.dispatch(this._adminaction.clearAdminEvents());
                this.showSSO = adminState['IS_SAML_AUTHNICATED'] === 'Y';
              }*/

              this.resetPasswordObject = {
                'upperText' : this.i18nMessages['zephyr.resetpassword.warning'],
                'policy': policy,
                'description': policyDescription && policyDescription.length ?
                policyDescription[0].description : ''
              };
              //console.log('current state in login', policy, policyArray, policyDescription, this.resetPasswordObject);

              if(state['event'] === 'CREDENTIALS_EXPIRED') {
                //fire the reset password modal
                jQuery('#reset-password-modal').modal();
                jQuery('.modal-backdrop').hide();
                //clear the event
                this.zephyrStore.dispatch(this._loginAction.clearEvent());
              }
              if(state['event'] === 'NO_LOGIN_POPUP') {
                let obj = {'message':'{}'};
                try {
                    obj = JSON.parse(JSON.parse(state.error.errorMsg));
                    this.errorObj = JSON.parse(obj.message);
                } catch (err) {
                    // console.log('error message is not parsable');
                    try {
                      //retry with just error and not error.errorMsg
                      obj = JSON.parse(JSON.stringify(state.error));
                      this.errorObj = JSON.parse(JSON.stringify(obj));
                      if(this.cdr) { this.cdr.markForCheck(); }
                    } catch (err1) {

                    }
                }
                jQuery('#loginError-modal').modal();
                jQuery('.modal-backdrop').css('z-index', -1);
                try {
                  if(this.errorObj) {
                    document.getElementById('login_error_modal_text_p').innerHTML = this.errorObj.message;
                  }
                } catch (err) {

                }
                // console.log('error message in login popup', state['error'], this.errorObj.message);
                this.zephyrStore.dispatch(this._loginAction.clearEvent());
              }
        });
    }


    resetPasswordUpdateClicked(value){
      let state = this.zephyrStore.getState().loggedUsers;
     // console.log('inside login component, state = ' +state);
      this.zephyrStore.dispatch(this._loginAction.doResetPassw(value));
  	}

  	redirectToSSO(){
      let url  = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/flex/samllogin";
      if(isLoggedin()) {
        //already logged in - so let login handle redirections based on access
        window.location.reload(false);
        return;
      }
      // window.open(url, "_Self");
      window.location.href = url;
    }

    ngOnInit() {
     setTimeout(() => {
       if(isLoggedin()) {
         if(getNextPageURL(this.router)){
           let nextURL = getNextPageURL(this.router);
           this.router.navigateByUrl(decodeURIComponent(nextURL));
         }
         // already logged in - so let login handle redirections based on access
        // window.location.reload(false);
         return;
       }

        this.zephyrStore.dispatch(this._adminaction.getAnonymousPrefByKey(ADMIN_PREFERENCES.ADMIN_AUTH_SYS_TYPE));
        jQuery('.temp-welcome-screen').hide();
      },10);
    }
    onSubmit(userDetails: any) {
        if(isLoggedin()) {
            //already logged in - so let login handle redirections based on access
            window.location.reload(false);
            return;
        }
        this.loginInProgress = true;
        this.zephyrStore.dispatch(this._loginAction.doLogin(userDetails));
    }
}
