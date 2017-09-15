import {Component  , OnDestroy , AfterViewInit , Output , EventEmitter} from '@angular/core';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {AdminAction} from '../../../../../actions/admin.action';
import { ADMIN_PREFERENCES} from '../../../admin/admin.constant';

declare var jQuery: any, _;

const SAVE_MISC_SETTINGS = 'SAVE_MISC_SETTINGS';
const CLOSE_MISCELLANIOUS_MODAL = 'CLOSE_MISCELLANIOUS_MODAL';

@Component({
  selector: 'miscellaneous-modal',
  viewProviders: [AdminAction],
  templateUrl: 'miscellaneous.html',
})

export class MiscellaneousModalComponent implements AfterViewInit, OnDestroy {
    @Output() confirmationDialogueData: EventEmitter<any> = new EventEmitter();
    zephyrStore;
    state;
    unsubscribe;
    isEnableSecondryAuth;
    prevIsEnableSecondryAuth;
    adminPref;
    isSaml=false;
    constructor(private _adminAction: AdminAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.adminPref = this.zephyrStore.getState().adminPref;
        this.unsubscribe = this.zephyrStore.subscribe(() => {
             this.zephyrStore = ZephyrStore.getZephyrStore();
             this.onInit();
        });
    }
    onInit() {
      this.adminPref = this.zephyrStore.getState().adminPref;
      if(parseInt(this.adminPref["admin.authenticationSystem.type"]) === 5){
          this.isSaml = true;
      }
      this.initMiscData();
    }

    ngAfterViewInit () {
       jQuery('#miscellaneous-modal').on('shown.bs.modal', (e) => {
          this.getMiscTime();
        });
    }
    getMiscTime() {
      this.zephyrStore.dispatch(this._adminAction.getPrefByKey(ADMIN_PREFERENCES.ADMIN_AUTH_SECONDRY_AUTH , true));
    }
    initMiscData() {
      this.isEnableSecondryAuth = this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SECONDRY_AUTH].toLowerCase() === 'true' ? true : false;
      this.prevIsEnableSecondryAuth = _.cloneDeep(this.isEnableSecondryAuth);
    }
    saveMiscSettings() {
      let prefKey = {};
      prefKey['name'] = ADMIN_PREFERENCES.ADMIN_AUTH_SECONDRY_AUTH;
      prefKey['value'] = this.isEnableSecondryAuth.toString();
      this.zephyrStore.dispatch(this._adminAction.updateAdminPreference([prefKey]));
    }

    saveMiscSettingsConfirmation() {
      let confirmationObject = {};
        confirmationObject['heading'] = 'Confirmation';
        confirmationObject['text'] = 'Are you sure you want to continue ?';
        confirmationObject['buttonText'] = 'Yes';
        confirmationObject['showCancelButton'] = false;
        confirmationObject['action'] = SAVE_MISC_SETTINGS;
      this.confirmationDialogueData.emit(confirmationObject);
    }

    resetMiscSettings() {
      this.isEnableSecondryAuth = this.adminPref[ADMIN_PREFERENCES.ADMIN_AUTH_SECONDRY_AUTH].toLowerCase() === 'true' ? true : false;
    }

    ngOnDestroy() {
      this.unsubscribe();
    }
    isFormValid() {
      return (this.isEnableSecondryAuth == this.prevIsEnableSecondryAuth);
    }
    cancelMiscSettingsConfirmation(ev) {
      if (!this.isFormValid()) {
        let confirmationObject = {};
          confirmationObject['heading'] = 'Unsaved changes';
          confirmationObject['text'] = 'You have some unsaved changes. Are you sure you want to continue?';
          confirmationObject['buttonText'] = 'Continue';
          confirmationObject['showCancelButton'] = true;
          confirmationObject['cancelButtonText'] = 'cancel';
          confirmationObject['action'] = CLOSE_MISCELLANIOUS_MODAL;
          this.confirmationDialogueData.emit(confirmationObject);
        } else {
          this.hideMiscModal();
        }
    }

    hideMiscModal() {
       jQuery('#miscellaneous-modal').modal('hide');
       this.resetMiscSettings();
    }
  }
