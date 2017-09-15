import {Component} from '@angular/core';
//import {FORM_DIRECTIVES, FormBuilder , ControlGroup, Control } from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
//import {ROUTES_ADMIN} from './admin.routes';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {AdminAction} from '../../../../actions/admin.action';
import { ADMIN_PREFERENCES} from '../../admin/admin.constant';

declare var jQuery: any, _;


@Component({
  selector: 'system-admin',
  templateUrl: 'system-admin.html'
})


export class SystemAdminComponent {
    form: FormGroup;
    error: boolean = false;
    public zephyrStore;
    enableBackup = false;
    hotBackupPeriod: number;
    showDirtyCheckModal = false;
    backupHistory : any;
    public previousForm: FormGroup;
    constructor(fb: FormBuilder , private _adminAction: AdminAction) {
      this.zephyrStore = ZephyrStore.getZephyrStore();
      this.form = fb.group({
          enableBackup: [''],
          hotBackupPeriod:  [{disabled: !this.enableBackup}, this.isValidPeriod],
      });
      this.previousForm = _.cloneDeep(this.form);
      this.zephyrStore.subscribe(() => {
          this.setBackupInfo();
      });
    }

    isValidPeriod(periodControl: FormControl) {
      if(periodControl.value <= 0 || periodControl.value > 24) {
        return {
          notPeriod: true
        };
      }
      return null;
    }

    onBackupFormSubmit(form) {
      var hrValue = this.form.controls['hotBackupPeriod'].value || 0,
          enableFlag = this.form.controls['enableBackup'].value;
      this.zephyrStore.dispatch(this._adminAction.setHotBackupInfo(hrValue, enableFlag));
    }

    getHotBackupInfo() {
      this.zephyrStore.dispatch(this._adminAction.getHotBackupInfo());
    }

    getJobHistory() {
      this.zephyrStore.dispatch(this._adminAction.getJobBackupHistory());
    }

    toggleBackup(backupFlag) {
      this.enableBackup = backupFlag;
      let hotBackupPeriodCtrl = this.form.get('hotBackupPeriod');
      if(!backupFlag) {
          hotBackupPeriodCtrl.disable();
      } else {
         hotBackupPeriodCtrl.enable();
      }
    }

    setBackupInfo() {
      var adminPref = this.zephyrStore.getState().adminPref;
      if (!adminPref[ADMIN_PREFERENCES.ENABLE_BACKUP_FLAG]) { return; }
      let enableBackup = !((adminPref[ADMIN_PREFERENCES.ENABLE_BACKUP_FLAG]).toLowerCase() === 'true'),
        hotBackupPeriod = adminPref[ADMIN_PREFERENCES.ENABLE_HOT_BACKUP_PERIOD];
      (<FormControl>this.form.controls['enableBackup']).setValue(enableBackup);
      (<FormControl>this.form.controls['hotBackupPeriod']).setValue(parseInt(hotBackupPeriod) || hotBackupPeriod);
      this.backupHistory = adminPref.backupHistory;
      this.backupHistory['fileSize'] =
        (this.backupHistory['fileSize'] != 'null') ? this.backupHistory['fileSize']: 0;
      this.toggleBackup(enableBackup);
      //jQuery('#hot-backup-modal').modal('hide');
      this.previousForm = _.cloneDeep(this.form);
    }

    onHotBackupNow() {
      this.zephyrStore.dispatch(this._adminAction.performHotBackup());
    }

    cancelHotBackup() {
      if(JSON.stringify(this.previousForm.value) != JSON.stringify(this.form.value)) {
        this.showDirtyCheckModal = true;
      } else {
        this.setBackupInfo();
      }
    }

    dismissNavigation() {
      this.showDirtyCheckModal = false;
      jQuery('#hot-backup-modal').modal('show');
    }

    continueNavigation() {
        this.showDirtyCheckModal = false;
        setTimeout(() => {
            this.setBackupInfo();
        }, 10);
    }
    getHotBackupData() {
      this.getHotBackupInfo();
      this.getJobHistory();
    }
    hasChanges() {
      if(JSON.stringify(this.previousForm.value) == JSON.stringify(this.form.value)) {
        return true;
      }
      return false;
    }
    isFormValid(form) {
      return this.hasChanges() || !form.valid;
    }
}
