import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {AdminAction} from '../../../../actions/admin.action';
import { ADMIN_PREFERENCES} from '../../admin/admin.constant';
import {UtililtyFunctions} from '../../../../utils/scripts/utils';

declare var _;
@Component({
  selector: 'system-config',
  //directives: [ InlineEditComponent],
  templateUrl: 'system-configuration.html'
})

export class SystemConfigComponent implements OnDestroy {
    mailServerForm: FormGroup;
    error: boolean = false;
    MASK_PASSWORD = '[{(*!*)}]';
    public zephyrStore;
    public desktopUrl;
    public dashboardUrl;
    public companyName;
    public systemName;
    public userId;
    public desktopUrlKey = ADMIN_PREFERENCES.ACCESS_URL_DESKTOP_URL;
    public dashboardUrlKey = ADMIN_PREFERENCES.ACCESS_URL_DASHBOARD_URL;
    public companyNameKey = ADMIN_PREFERENCES.COMPANY_INFO_COMPANY_NAME;
    public systemNameKey = ADMIN_PREFERENCES.COMPANY_INFO_SYSTEM_NAME;
    public MAIL_SERVER_MAP = {
      'nameIpKey': ADMIN_PREFERENCES.MAIL_SERVER_NAME_IP,
      'portKey': ADMIN_PREFERENCES.MAIL_SERVER_PORT,
      'usernameKey': ADMIN_PREFERENCES.ADMIN_MAIL_SERVER_USERNAME,
      'passwordMailserverKey': ADMIN_PREFERENCES.MAIL_SERVER_PASSWORD,
      'authenticationSMTPKey': ADMIN_PREFERENCES.ADMIN_MAIL_SMTP_AUTH,
      'authenticationSSLKey': ADMIN_PREFERENCES.ADMIN_MAIL_SMTP_STARTTLS_ENABLE
    };
    //Flag whether SMTP authentication sys is selected or not
    SMTP_enable:boolean = false;
    unsubscribe;
    showDirtyCheckModal = false;
    utilityFunctions;
    isProtocol;
    public previousForm: FormGroup;
    constructor(fb: FormBuilder , private _adminAction: AdminAction) {
       this.zephyrStore = ZephyrStore.getZephyrStore();
       this.isProtocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
      this.mailServerForm = fb.group({
        nameIpKey: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
        portKey: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5),
          Validators.pattern('^[1-9]+\d*$')])],
        usernameKey: [{value: '', disabled: !this.SMTP_enable},
          Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
        passwordMailserverKey: [{value: '', disabled: !this.SMTP_enable}, Validators.compose([Validators.maxLength(50)])],
        authenticationSSLKey: [{value: '', disabled: !this.SMTP_enable}, Validators.required],
        authenticationSMTPKey: ['', Validators.required]
      });
      this.previousForm = _.cloneDeep(this.mailServerForm);
      if (this.zephyrStore.getState().adminPref['isUpdated']) {
          this.onInit();
       }
      this.unsubscribe = this.zephyrStore.subscribe(() => {
          this.onInit();
      });
      this.utilityFunctions = new UtililtyFunctions();
    }
    ngOnDestroy() {
      this.unsubscribe();
    }

    //This function is called when form is submitted
    onSubmit(form) {
      let prefObjectsArray = [];
      for (var key in form) {
        if (form.hasOwnProperty(key)) {
          let val = _.cloneDeep(form[key]);
          let prefObject = {};
          prefObject['name'] = this.MAIL_SERVER_MAP[key];
          if(this.MAIL_SERVER_MAP[key] == ADMIN_PREFERENCES.MAIL_SERVER_PASSWORD) {
            prefObject['value'] = this.utilityFunctions.shiftString(val, 1);
          } else {
            prefObject['value'] = val;
          }
          prefObjectsArray.push(prefObject);
        }
      }
      this.zephyrStore.dispatch(this._adminAction.updateAdminPreference(prefObjectsArray));
    }

    //This function enables mail server fields when SMTP auth is checked and vice-versa.
    onChangeAuthenticationCheckbox(smtpEnable) {
      this.SMTP_enable = smtpEnable;
      let usernameCtrl = this.mailServerForm.get('usernameKey');
      let passwordMailserverCtrl = this.mailServerForm.get('passwordMailserverKey');
      let authenticationSSLCtrl = this.mailServerForm.get('authenticationSSLKey');
      if(!smtpEnable) {
          usernameCtrl.disable();
          passwordMailserverCtrl.disable();
          authenticationSSLCtrl.disable();
      } else {
         usernameCtrl.enable();
         passwordMailserverCtrl.enable();
         authenticationSSLCtrl.enable();
      }
    }

    //This function initializes form values and SMTP_enable flag
    onInit() {
      var adminPref = this.zephyrStore.getState().adminPref;

      this.userId = this.zephyrStore.getState().loggedInUser.id;
      this.desktopUrl = adminPref[ADMIN_PREFERENCES.ACCESS_URL_DESKTOP_URL];
      this.dashboardUrl = adminPref[ADMIN_PREFERENCES.ACCESS_URL_DASHBOARD_URL];
      this.companyName = adminPref[ADMIN_PREFERENCES.COMPANY_INFO_COMPANY_NAME];
      this.systemName = adminPref[ADMIN_PREFERENCES.COMPANY_INFO_SYSTEM_NAME];

      (<FormControl>this.mailServerForm.controls['nameIpKey'])
        .setValue(adminPref[ADMIN_PREFERENCES.MAIL_SERVER_NAME_IP]);
      (<FormControl>this.mailServerForm.controls['portKey'])
        .setValue(adminPref[ADMIN_PREFERENCES.MAIL_SERVER_PORT]);
      (<FormControl>this.mailServerForm.controls['passwordMailserverKey'])
        .setValue(this.MASK_PASSWORD);
        // .setValue(adminPref[ADMIN_PREFERENCES.MAIL_SERVER_PASSWORD]);
      (<FormControl>this.mailServerForm.controls['authenticationSMTPKey'])
        .setValue(adminPref[ADMIN_PREFERENCES.ADMIN_MAIL_SMTP_AUTH] === 'true');
      (<FormControl>this.mailServerForm.controls['usernameKey'])
        .setValue(adminPref[ADMIN_PREFERENCES.ADMIN_MAIL_SERVER_USERNAME]);
      if(adminPref[ADMIN_PREFERENCES.ADMIN_MAIL_SMTP_STARTTLS_ENABLE]) {
        (<FormControl>this.mailServerForm.controls['authenticationSSLKey'])
          .setValue(adminPref[ADMIN_PREFERENCES.ADMIN_MAIL_SMTP_STARTTLS_ENABLE].toLowerCase() === 'true');
      }

      this.SMTP_enable = adminPref[ADMIN_PREFERENCES.ADMIN_MAIL_SMTP_AUTH].toLowerCase() === 'true' ;
      this.onChangeAuthenticationCheckbox(this.SMTP_enable);
      this.previousForm = _.cloneDeep(this.mailServerForm);
    }

    usernameAndSMTPDependency(userName: string, smtpChecbox: string) {
      return (group: FormGroup) => {
        let username = group.controls[userName];
        let smtpcheckbox = group.controls[smtpChecbox];
        if (smtpcheckbox.value && username.value.trim().length === 0) {
              return username.setErrors({ notEquivalent: true });
        } else {
          return null;
        }
      };
    }

    saveAdminPref(value, key) {
      var keyObject = {};
      keyObject['name'] = key;
      keyObject['value'] = value;
      this.zephyrStore.dispatch(this._adminAction.updateAdminPreference(keyObject));
    }
    cancelAdminPref() {
      if(JSON.stringify(this.previousForm.value) != JSON.stringify(this.mailServerForm.value)) {
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
      if(JSON.stringify(this.previousForm.value) == JSON.stringify(this.mailServerForm.value)) {
        return true;
      }
      return false;
    }
    isFormValid(form) {
      return this.hasChanges() || !form.valid;
    }
}
