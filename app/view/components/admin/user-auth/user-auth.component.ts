import {Component, OnDestroy} from '@angular/core';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {AdminAction} from '../../../../actions/admin.action';
import {GlobalAction} from '../../../../actions/global.action';
import { ADMIN_PREFERENCES} from '../../admin/admin.constant';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {UtililtyFunctions} from '../../../../utils/scripts/utils';

declare var jQuery, _;
@Component({
  selector: 'user-auth',
  templateUrl: 'user-auth.html'
})


export class UserAuthComponent implements OnDestroy {
    error: boolean = false;
    public adminPref;
    form: FormGroup;
    files : FileList;
    fileName;
    uploadedCertificate;
    currentLoggedInUserId : number;
    previousForm: FormGroup;
    isAuthTested = false;
    location;

    //flags used to dynamically handle show/hide of corresponding div's
    showSampleUserDiv: boolean = false;
    showConnectionInfoDiv: boolean = false;
    isLDAPSelecetd: boolean = false;
    isCrowdSelcted: boolean = false;
    isWebServiceSelected: boolean = false;
    isWebAuthSelected: boolean = false;
    authenticationCheck: boolean = false;
    showDirtyCheckModal = false;
    showLDAPPassword = false;
    showCrowdPassword = false;
    showPassword = false;
    allPref;

    public LDAPID = '2';               //assuming LDAP id will always be fixed as 2
    public crowdID = '3';              //assuming Crowd id will always be fixed as 3
    public webServiceID = '4';         //assuming WebSerice id will always be fixed as 4
    public webAuthSSOID = '5';         //assuming Web Auth SSO id will always be fixed as 5

    public zephyrStore;
    public authenticationSystems;
    public passwordPolicies = [];
    showPolicies = true;
    passwordPolicyDescription;
    unsubscribe;
    _isSecAuthEnabled;
    isCheckInProgress = false;
    constructor(fb: FormBuilder, private _adminAction: AdminAction, private _globalAction: GlobalAction) {
      this.zephyrStore = ZephyrStore.getZephyrStore();
      this.currentLoggedInUserId = this.zephyrStore.getState().loggedInUser.id;
      this.location = window.location.origin;
      // form
      this.form = fb.group({
        authenticationSystem: ['', Validators.compose([Validators.required])],
        ldapHostURL: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        ldapBindPassword: ['', Validators.compose([ Validators.maxLength(255)])],
        ldapSearchAttribute: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        ldapBaseDN: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        ldapBindDN: [''],
        crowdServerURL: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        crowdAppName: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        crowdAppPassword: ['', Validators.compose([Validators.required, Validators.minLength(1),
          Validators.maxLength(255)])],
        webServiceURL: ['', Validators.compose([Validators.required])],
        ssoAppUrl: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        ssoIssuerId: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        ssoCertificate: [''],
        passwordPolicySelectid: [''],
        username: ['', Validators.compose([Validators.required, Validators.minLength(2),
          Validators.maxLength(255)])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(2),
          Validators.maxLength(255)])]
      });
      this.previousForm = _.cloneDeep(this.form);
      if (this.zephyrStore.getState().adminPref['isUpdated']) {
        this.onInit();
      }
      this.unsubscribe = this.zephyrStore.subscribe(() => {
        let state = this.zephyrStore.getState();
        this.allPref = state.adminPref['allPreferences'];

        if(state.global.event === 'SET_SSO_ATTACHMENT_PATH_SUCCESS'|| state.global.event === 'UPLOAD_SSO_ATTACHMENT_SUCCESS') {
          this.isCheckInProgress = true;
          this.uploadedCertificate = state.global.ssoAttachment.name;

          if (!this.uploadedCertificate) {
            this.uploadedCertificate = this.fileName;
          }

          if(state.global.event === 'UPLOAD_SSO_ATTACHMENT_SUCCESS'){
            this.fileName = state.global.ssoAttachment.name;
            (<FormControl>this.form.controls['ssoCertificate'])
              .setValue(this.fileName);
          }
        }

        if(!this.isCheckInProgress) {
          this.onInit();
        }
        if(this.zephyrStore.getState().adminPref['event'] == 'AUTHENTICATION_CHECK_SUCCESS') {
          this.isCheckInProgress = false;
          this.zephyrStore.dispatch(this._adminAction.clearAdminEvents());
        }
      });
    }

    ngOnDestroy() {
      this.unsubscribe();
    }
    //This function initializes form variables and boolean values
    onInit() {
      let _state = this.zephyrStore.getState();
      if(!this.authenticationCheck) {
        this.adminPref = _state.adminPref;
        this._isSecAuthEnabled = this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SECONDRY_AUTH];
        let _authenticationSystem = this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTHENTICATION_SYSTEM_LOV];
        let _passwordPolicies = this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTHENTICATION_POLICY_LOV];
        let _adminAuthSysType = this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_TYPE];
        if(_authenticationSystem) {
          _authenticationSystem = JSON.parse(_authenticationSystem) || [];
          // Remove webAuthSSOID from the list
          this.authenticationSystems = _authenticationSystem;/*.filter((system) => {
            return system.id != this.webAuthSSOID;
          });*/
        }
        if(_passwordPolicies) {
          this.passwordPolicies = JSON.parse(_passwordPolicies);
        }
        (<FormControl>this.form.controls['authenticationSystem'])
            .setValue(this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_TYPE]);
        this.showSampleUserConnectionInfoDivs(_adminAuthSysType);
        if(this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_TYPE] == '1') {
          this.isAuthTested = true;
        }
        // LDAP
        (<FormControl>this.form.controls['ldapHostURL'])
            .setValue(this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_LDAP_URL]);
        //(<FormControl>this.form.controls['ldapBindPassword'])
        //  .setValue(this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_LDAP_BIND_PWD]);
        (<FormControl>this.form.controls['ldapSearchAttribute'])
            .setValue(this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_LDAP_SEARCH_ATTR]);
        (<FormControl>this.form.controls['ldapBaseDN'])
            .setValue(this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_LDAP_BASE_DN]);
        (<FormControl>this.form.controls['ldapBindDN'])
            .setValue(this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_LDAP_BIND_DN]);
        // CROWD
        (<FormControl>this.form.controls['crowdServerURL'])
            .setValue(this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_CROWD_URL]);
        (<FormControl>this.form.controls['crowdAppName'])
            .setValue(this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_CROWD_APP_NAME]);
        //(<FormControl>this.form.controls['crowdAppPassword'])
        //  .setValue(this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_CROWD_APP_PWD]);
        // WebService
        (<FormControl>this.form.controls['webServiceURL'])
            .setValue(this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_URL]);

        //SSO
        (<FormControl>this.form.controls['ssoAppUrl'])
          .setValue(this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_SSO_APPURL]);
        (<FormControl>this.form.controls['ssoIssuerId'])
          .setValue(this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_SSO_ISSUERID]);
        (<FormControl>this.form.controls['ssoCertificate'])
          .setValue(this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_SSO_CERTIFICATE]);

        var pwdPolicy = this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTHENTICATION_POLICY];
        var passwordPolicySelected = this.passwordPolicies.filter(function (i,n) {
          return i.policyName == pwdPolicy;
        });
        if(passwordPolicySelected.length) {
          (<FormControl>this.form.controls['passwordPolicySelectid'])
            .setValue(passwordPolicySelected[0].policyName);
          this.passwordPolicyDescription = passwordPolicySelected[0].description;
        }
        if(_adminAuthSysType != '1' && this._isSecAuthEnabled == 'false') {
          this.showPolicies = false;
        } else {
          this.showPolicies = true;
        }
        this.form.controls['username'].setValue('');
        this.form.controls['password'].setValue('');
        this.form.controls['crowdAppPassword'].setValue('');
        this.form.controls['ldapBindPassword'].setValue('');
        this.uploadedCertificate = _state.global.ssoAttachment.name ?_state.global.ssoAttachment.name : 'No file uploaded';

        if (!_state.global.ssoAttachment.name && this.fileName) {
          this.uploadedCertificate = this.fileName;
        }

        this.previousForm = _.cloneDeep(this.form);
      } else {
        setTimeout(() => {
          this.authenticationCheck = false;
        }, 1000);
      }
    }
    //This function changes password policy description, on change of password policy.
    onChangePasswordPolicySelect(policyName) {
      var policyObject = this.passwordPolicies.filter((i,n) => {
        return i.policyName === policyName;
      });
      this.passwordPolicyDescription = policyObject[0].description;
    }
    //This funciton binds showing of connection-info and sample user information, depending authentication system selected.
    onChangeAuthenticationSystem(id) {
      jQuery('#zui-switching-authentication-warning').modal('show');
      this.showSampleUserConnectionInfoDivs(id);
      if(id == '1') {
        this.isAuthTested = true;
        this.showPolicies = true;
      } else {
        this.isAuthTested = false;
        this.showPolicies = !(this._isSecAuthEnabled == 'false');
       }
    }
    //This funciton holds the logic of showing/hidding of sample-credentials div and connection-info div.
    showSampleUserConnectionInfoDivs(id) {
      this.isWebServiceSelected = id === this.webServiceID;
      this.isLDAPSelecetd = id === this.LDAPID;
      this.isCrowdSelcted = id === this.crowdID;
      this.isWebAuthSelected = id === this.webAuthSSOID;

      this.showSampleUserDiv = id === this.LDAPID ||
        id === this.crowdID ||
        id === this.webServiceID;

      this.showConnectionInfoDiv = this.showSampleUserDiv ||
        id === this.webAuthSSOID;
    }
    getTestPref() {
      let _authPref = {
        'sample_userName': this.form.get('username').value,
        'sample_password': this.form.get('password').value
      };
      _authPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_TYPE] = this.form.get('authenticationSystem').value;
      if (this.isWebServiceSelected) {
        _authPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_URL] = this.form.get('webServiceURL').value;
      } else if(this.isLDAPSelecetd) {
        _authPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_LDAP_URL] = this.form.get('ldapHostURL').value;
        _authPref[ADMIN_PREFERENCES.ADMIN_AUTH_LDAP_BASE_DN] = this.form.get('ldapBaseDN').value;
        _authPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_LDAP_BIND_DN] = this.form.get('ldapBindDN').value;
        _authPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_LDAP_BIND_PWD] = this.form.get('ldapBindPassword').value;
        _authPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_LDAP_SEARCH_ATTR] = this.form.get('ldapSearchAttribute').value;
      } else if (this.isCrowdSelcted) {
        _authPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_CROWD_URL] = this.form.get('crowdServerURL').value;
        _authPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_CROWD_APP_NAME] = this.form.get('crowdAppName').value;
        _authPref[ADMIN_PREFERENCES.ADMIN_AUTH_SYS_CROWD_APP_PWD] = this.form.get('crowdAppPassword').value;
      }
      return _authPref;
    }
    testAuthentication () {
      this.authenticationCheck = true;
      this.isAuthTested = true;
      let _authPref = this.getTestPref();
      this.isCheckInProgress = true;
      this.zephyrStore.dispatch(this._adminAction.authenticationCheck(_authPref));
      return;
    }
    saveAuthFields () {
        this.previousForm = _.cloneDeep(this.form);
        let prefObjectArray = [];
        if (this.isWebServiceSelected) {
          prefObjectArray = this.getWebServiceInfo();
        } else if (this.isLDAPSelecetd) {
          prefObjectArray = this.getLdapInfo();
        } else if (this.isCrowdSelcted) {
          prefObjectArray = this.getCrowdInfo();
        } else if(this.isWebAuthSelected) {
          prefObjectArray = this.getSSOInfo();
        }
        prefObjectArray.push({
          'name': ADMIN_PREFERENCES.ADMIN_AUTH_SYS_TYPE,
          'value': this.form.get('authenticationSystem').value
        });
        if(this.showPolicies) {
          prefObjectArray.push({
            'name': ADMIN_PREFERENCES.ADMIN_AUTHENTICATION_POLICY,
            'value': this.form.get('passwordPolicySelectid').value
          });
        }

        // console.log('preference object array', prefObjectArray, this.adminPref, this.allPref);
        prefObjectArray.forEach((obj) => {
          let match = this.allPref.filter((preference)=>{
            return preference.name === obj.name;
          });
          if(match && match.length) {
            Object.assign(obj, {
              'defaultValue' : match.defaultValue,
              'editable' : match.editable,
              'accessLevel' : match.accessLevel
            });
          }
        });

        this.isCheckInProgress = true;
        if(this.form.get('authenticationSystem').value == '1' ) {
          this.isAuthTested = true;
          this.zephyrStore.dispatch(this._adminAction.updateAdminAuthPreference(
            prefObjectArray,
            'Authentication updated successfully!'
          ));
        } else if(this.form.get('authenticationSystem').value == '5'){
              this.isAuthTested = true;
              this.uploadedCertificate =  this.fileName;
              this.fileName = undefined;

              this.zephyrStore.dispatch(this._globalAction.saveSSOcertificate(this.zephyrStore.getState().global.ssoAttachment, this.currentLoggedInUserId));
              this.zephyrStore.dispatch(this._adminAction.updateAdminAuthPreference(
                prefObjectArray,
                'Authentication updated successfully!'
              ));
      //clear events
          this.zephyrStore.dispatch(this._globalAction.clearSSOAttachment(this.zephyrStore.getState().global.ssoAttachment));
        }else {
          let _authPref = this.getTestPref();
          this.zephyrStore.dispatch(this._adminAction.authenticationCheckWithPreferenceUpdate(
            _authPref,
            prefObjectArray,
            'Authentication updated successfully!'
          ));
        }
    }
    getWebServiceInfo() {
      return [{
        'name': ADMIN_PREFERENCES.ADMIN_AUTH_SYS_URL,
        'value': this.form.get('webServiceURL').value
      }];
    }
    getLdapInfo() {
      let ldapBindPasswd = this.form.get('ldapBindPassword').value;
      return [{
        'name': ADMIN_PREFERENCES.ADMIN_AUTH_SYS_LDAP_URL,
        'value': this.form.get('ldapHostURL').value
      }, {
        'name': ADMIN_PREFERENCES.ADMIN_AUTH_LDAP_BASE_DN,
        'value': this.form.get('ldapBaseDN').value
      }, {
        'name': ADMIN_PREFERENCES.ADMIN_AUTH_SYS_LDAP_BIND_DN,
        'value': this.form.get('ldapBindDN').value
      }, {
        'name': ADMIN_PREFERENCES.ADMIN_AUTH_SYS_LDAP_BIND_PWD,
        'value': new UtililtyFunctions().shiftString(ldapBindPasswd, 1)
      }, {
        'name': ADMIN_PREFERENCES.ADMIN_AUTH_SYS_LDAP_SEARCH_ATTR,
        'value': this.form.get('ldapSearchAttribute').value
      }];
    }
    getCrowdInfo() {
      let crowdPasswd = this.form.get('crowdAppPassword').value;
      return [{
        'name': ADMIN_PREFERENCES.ADMIN_AUTH_SYS_CROWD_URL,
        'value': this.form.get('crowdServerURL').value
      }, {
        'name': ADMIN_PREFERENCES.ADMIN_AUTH_SYS_CROWD_APP_NAME,
        'value': this.form.get('crowdAppName').value
      }, {
        'name': ADMIN_PREFERENCES.ADMIN_AUTH_SYS_CROWD_APP_PWD,
        'value': new UtililtyFunctions().shiftString(crowdPasswd, 1)
      }];
    }
    getSSOInfo() {
      return [{
        'name': ADMIN_PREFERENCES.ADMIN_AUTH_SYS_SSO_APPURL,
        'value': this.form.get('ssoAppUrl').value
      }, {
        'name': ADMIN_PREFERENCES.ADMIN_AUTH_SYS_SSO_ISSUERID,
        'value': this.form.get('ssoIssuerId').value
      }, {
        'name': ADMIN_PREFERENCES.ADMIN_AUTH_SYS_SSO_CERTIFICATE,
        'value': this.fileName//this.form.get('ssoCertificate').value
      }];
    }

    validateWebService() {
      return this.form.get('webServiceURL').valid;
    }
    validateCrowd() {
      return (this.form.get('crowdServerURL').valid &&
        this.form.get('crowdAppName').valid &&this.form.get('crowdAppPassword').valid);
    }
    validateLdap() {
      return (this.form.get('ldapHostURL').valid && this.form.get('ldapBaseDN').valid
        && this.form.get('ldapBindDN').valid && this.form.get('ldapBindPassword').valid
        && this.form.get('ldapSearchAttribute').valid);
    }
    validateSSO() {
      return  this.fileName? (this.form.get('ssoAppUrl').valid && this.form.get('ssoIssuerId').valid && this.fileName.length > 0 ): false;
    }
    isFormTestable(form) {
      let _username = this.form.get('username').value;
      let _isUsernameInValid = (!_username || _.size(_username) < 2 || _.size(_username) > 255);
      let _password = this.form.get('password').value;
      let _isPasswordInValid = (!_password || _.size(_password) < 2 || _.size(_password) > 255);
      let _isInValid = (this.isFormValid(form) || _isUsernameInValid || _isPasswordInValid);
      return _isInValid;
    }
    isFormValid(form?:string) {
      let _isInValid,
          _isPasswordPolicyInValid = !this.form.get('passwordPolicySelectid').valid,
          _isUsernameInValid = !this.form.get('username').valid,
          _isPasswordInValid = !this.form.get('password').valid;
      if (this.isWebServiceSelected) {
        _isInValid = !this.validateWebService();
      } else if (this.isLDAPSelecetd) {
        _isInValid = !this.validateLdap();
      } else if (this.isCrowdSelcted) {
        _isInValid = !this.validateCrowd();
      } else if(this.isWebAuthSelected) {

        if (!this.fileName) {
          this.fileName = this.form.value['ssoCertificate'];
        }

        _isInValid = !this.validateSSO();
      }
      // Validate the system and password policy.
      _isInValid = (_isInValid || _isPasswordPolicyInValid);
      if(this.form.get('authenticationSystem').value != '1'
          && this.form.get('authenticationSystem').value != '5') {
        _isInValid = (_isInValid || _isUsernameInValid || _isPasswordInValid);
      }
      return (_isInValid ||!this.hasChanges());
    }
    cancelAdminPref() {
      if(JSON.stringify(this.previousForm.value) != JSON.stringify(this.form.value)) {
        this.showDirtyCheckModal = true;
      } else {
        this.onInit();
      }
    }
    dismissNavigation() {
      this.showDirtyCheckModal = false;
    }
    continueNavigation() {
        this.showDirtyCheckModal = false;
        setTimeout(() => {
            this.onInit();
        }, 10);
    }
    hasChanges() {
      if(JSON.stringify(this.previousForm.value) != JSON.stringify(this.form.value)) {
        return true;
      }
      return false;
    }
}
