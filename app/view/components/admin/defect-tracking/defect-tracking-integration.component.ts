import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

declare var _, jQuery;
import {ZephyrStore} from '../../../../store/zephyr.store';
import {AdminAction} from '../../../../actions/admin.action';
import {GlobalAction} from '../../../../actions/global.action';
import { ADMIN_PREFERENCES} from '../../admin/admin.constant';
import {UtililtyFunctions} from '../../../../utils/scripts/utils';

@Component({
  selector: 'defect-tracking-integration',
  templateUrl: 'defect-tracking-integration.html'
})

export class DefectTrackingIntegrationComponent implements OnDestroy {
  form: FormGroup;
  hasChanges: boolean = false;
  showJira: boolean = false;
  isInternalSelected: boolean = false;
  isJiraSelected: boolean = false;
  isBugzillaSelected: boolean = false;
  hideRelogin: boolean = true;
  showDirtyCheckModal = false;
  showPassword = false;
  utilityFunctions;
  currentDTSystem;
  unsubscribe;
  public zephyrStore;
  public defectSystems = [];
  public defectsValues;
  public previousDTS: FormGroup;
  constructor(fb: FormBuilder, private _adminAction: AdminAction, private _globalAction: GlobalAction) {
    this.form = fb.group({
      systemType: [''],
      url: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])]
    });
    // For dirty checking
    this.previousDTS = _.cloneDeep(this.form);
    // Listening to the form changes
    // To hide/show Relogin button
    this.form.valueChanges.forEach((value) => {
      this.setReloginState(value, false);
    });
    this.zephyrStore = ZephyrStore.getZephyrStore();
    this.utilityFunctions = new UtililtyFunctions();
    // this.getDefectSystems();
    this.getFieldsForDefectSystem();
    this.unsubscribe = this.zephyrStore.subscribe(() => {
       if((this.zephyrStore.getState().defectsLicense.event == 'GET_FIELDS_DEFECTS_SUCCESS' ||
       this.zephyrStore.getState().defectsLicense.event == 'SET_FIELDS_DEFECTS_SUCCESS') &&
        this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.BUG_TRACKING_SYSTEM_LOV]) {
          this.setDefectSystemValues(true);
          this.zephyrStore.dispatch(this._adminAction.clearDefectLicenseEvents());
       }
    });
  }
  ngOnDestroy() {
    this.unsubscribe();
  }
  setReloginState(value, skipPasswordValidation) {
    let _prevValue = this.previousDTS.value || {},
        _url = _prevValue.url,
        _username = _prevValue.username,
        _password = _prevValue.password || '',
        _chgPwd = value.password || '';
    if(value.systemType != '' && (value.url != '') && (value.username != '') &&
      (skipPasswordValidation || _password != '') && (skipPasswordValidation || _chgPwd != '')){
      if(value.systemType != 4 || (value.url != _url) || (value.username != _username) || (_password != _chgPwd)) {
        this.hideRelogin = true;
      } else {
        this.hideRelogin = false;
      }
    }
  }
  isFormValid(form) {
    if(form.value.systemType == '1') {
      return this.hasFormChanges() || false;
    }
    return this.hasFormChanges() || form.invalid;
  }
  onSubmit(form) {
    form.id = '1';
    this.zephyrStore.dispatch(this._adminAction.setFieldsForDefectSystem(form));
    this.hideConfirmationDialog(form);
  }
  onChangeDefectTrackingSystem(id) {
    this.setSelectedOption(id);
    this.onChangeSetDefectSystemValues(id);
  }
  setSelectedOption(selection) {
    this.isInternalSelected = selection === '2';
    this.isJiraSelected = selection === '4';
    this.isBugzillaSelected = selection === '5';
    this.hideRelogin = !this.isJiraSelected;
  }
  getDefectSystems() {
    this.zephyrStore.dispatch(this._adminAction.getPrefByKey('defectSystems', false));
  }
  getFieldsForDefectSystem() {
    this.zephyrStore.dispatch(this._adminAction.fetchFieldsForDefectSystem());
 }

  onChangeSetDefectSystemValues(id) {
    if ('1' === String(id)) {
        this.form.clearValidators();

        this.form.patchValue({
            systemType: id
        });

    } else if ('4' === String(id)) {
        this.form.controls['url'].setValidators(Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)]));
        this.form.controls['username'].setValidators(Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)]));
        this.form.controls['password'].setValidators(Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)]));
        let defectValues = this.zephyrStore.getState().defectsLicense;

        this.form.patchValue({
            url: defectValues.url,
            systemType: id,
            username: defectValues.username,
            password: defectValues.password
        });
    }
  }

  setDefectSystemValues(skipPasswordValidation) {
    var response = this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.BUG_TRACKING_SYSTEM_LOV];
    this.defectsValues = this.zephyrStore.getState().defectsLicense;
    this.defectSystems = response ? JSON.parse(response) : [];
    if (Object.keys(this.defectsValues).length && this.defectSystems.length) {
      //var selectedSystem = this.defectsValues.systemType;
      //filter non JIRA dts from list
      this.defectSystems = this.defectSystems.filter((entry) => {
        return entry.id == 1 || entry.id == 4;
      });
      var match = this.defectSystems.filter((entry) => {
        return entry.id == this.defectsValues.systemType;
      })[0];

      if(!match) {
          let _currentDTSystem = _.find(JSON.parse(response), {'id': this.defectsValues.systemType});
          if(_currentDTSystem) {
            this.currentDTSystem = _currentDTSystem['value'];
          }
          return;
      } else {
          this.currentDTSystem = null;
      }


      // console.log('checking store', this.defectsValues, this.defectSystems, match);
      (<FormControl>this.form.controls['url'])
        .setValue(this.defectsValues.url);
      (<FormControl>this.form.controls['username'])
        .setValue(this.defectsValues.username);
      (<FormControl>this.form.controls['systemType'])
        .setValue(match.id);
      (<FormControl>this.form.controls['password'])
        .setValue(this.defectsValues.password);
      if(JSON.stringify(this.previousDTS.value) != JSON.stringify(this.form.value)) {
        this.previousDTS = _.cloneDeep(this.form);
        this.setReloginState(this.form.value, skipPasswordValidation);
      }
      this.setSelectedOption(match.id);
    }
    //console.log('defect systems values', this.defectSystems);
  }
  onRelogin() {
    this.zephyrStore.dispatch(this._adminAction.reloginDefectUser(this.defectsValues.username));
  }
  //Hides the form on click of form cancel button
  cancelDTSForm() {
      if(JSON.stringify(this.previousDTS.value) != JSON.stringify(this.form.value)) {
        this.showDirtyCheckModal = true;
      } else {
        this.setDefectSystemValues(true);
      }
  }
  dismissNavigation() {
    this.showDirtyCheckModal = false;
  }
  continueNavigation() {
      //jQuery('#zui-unsaved-changes-prompt').modal('hide');

      this.showDirtyCheckModal = false;
      setTimeout(() => {
          this.setDefectSystemValues(true);
      }, 10);
  }
  showConfirmationDialog(form) {
    if(form.systemType  == '4') {
      jQuery('#zui-defect-jira-warning').modal('show');
    } else
      if(form.systemType == '1') {
      jQuery('#zui-defect-none-warning').modal('show');
    }
  }
  hideConfirmationDialog(form) {
    if(form.systemType  == '4') {
      jQuery('#zui-defect-jira-warning').modal('hide');
    } else if(form.systemType == '1') {
      jQuery('#zui-defect-none-warning').modal('hide');
    }
  }
  hasFormChanges() {
    if(JSON.stringify(this.previousDTS.value) == JSON.stringify(this.form.value)) {
      return true;
    }
    return false;
  }
}
