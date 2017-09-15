import {Component  , OnDestroy , AfterViewInit , Output , EventEmitter} from '@angular/core';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {AdminAction} from '../../../../../actions/admin.action';
import { ADMIN_PREFERENCES} from '../../../admin/admin.constant';

declare var jQuery: any, _;
declare var moment: any;

const SAVE_EST_TIME = 'SAVE_EST_TIME';
const HIDE_ESTIMATED_TIME_MODAL = 'HIDE_ESTIMATED_TIME_MODAL';

@Component({
  selector: 'estimated-time-modal',
  viewProviders: [AdminAction],
  templateUrl: 'estimated_time.html',
})

export class EstimatedTimeModalComponent implements AfterViewInit, OnDestroy {
    @Output() confirmationDialogueData: EventEmitter<any> = new EventEmitter();
    zephyrStore;
    state;
    unsubscribe;
    estTime;
    adminPref;
    isFormDirty;
    newEstTime;
    constructor(private _adminAction: AdminAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.adminPref = this.zephyrStore.getState().adminPref;
        this.isFormDirty = false;
        this.unsubscribe = this.zephyrStore.subscribe(() => {
             this.zephyrStore = ZephyrStore.getZephyrStore();
             this.onInit();
        });
    }
    onInit() {
      this.adminPref = this.zephyrStore.getState().adminPref;
      this.initEstTime();
    }

    ngAfterViewInit() {
       jQuery('#estimated-time-modal').on('shown.bs.modal', (e) => {
          this.getEstTime();
        });
    }

    getEstTime() {
      this.zephyrStore.dispatch(this._adminAction.getPrefByKey(ADMIN_PREFERENCES.TESTCASE_ESTIMATED_TIME_TO_TEST_VALUE , true));
    }

    initEstTime() {
      let noOfSec = this.adminPref[ADMIN_PREFERENCES.TESTCASE_ESTIMATED_TIME_TO_TEST_VALUE];
      this.estTime = this.adminPref[ADMIN_PREFERENCES.TESTCASE_ESTIMATED_TIME_TO_TEST_VALUE];
      this.newEstTime = this.adminPref[ADMIN_PREFERENCES.TESTCASE_ESTIMATED_TIME_TO_TEST_VALUE];
      this.isFormDirty = false;
    }

    converSectoDDHHMM(seconds) : any {
      seconds = parseInt(seconds);
      let arrayReturned = [0, 0, 0];
      if (seconds.constructor === Number) {
        let noOfSecOneDay = 24*60*60;
        let NoOfSecOneHour =60*60;
        let NoOfSecOneMin = 60;
        let NoOfDays = Math.floor(seconds/noOfSecOneDay);
        let NoOfHrs =  Math.floor((seconds%noOfSecOneDay)/NoOfSecOneHour);
        let NoOfSec =  Math.floor(((seconds%noOfSecOneDay)%NoOfSecOneHour)/NoOfSecOneMin);
        arrayReturned[0] = NoOfDays;
        arrayReturned[1] = NoOfHrs;
        arrayReturned[2] = NoOfSec;
        return arrayReturned;
        //return '00:00:10';
      }
    }

    cancelEstTimeConfirmation(ev) {
      if (this.isFormDirty) {
        let confirmationObject = {};
          confirmationObject['heading'] = 'Unsaved changes';
          confirmationObject['text'] = 'You have some unsaved changes. Are you sure you want to continue?';
          confirmationObject['buttonText'] = 'Continue';
          confirmationObject['showCancelButton'] = true;
          confirmationObject['cancelButtonText'] = 'cancel';
          confirmationObject['action'] = HIDE_ESTIMATED_TIME_MODAL;
          this.confirmationDialogueData.emit(confirmationObject);
      } else {
        this.hideEstimatedTimeModal();
      }
    }
    hideEstimatedTimeModal() {
      jQuery('#estimated-time-modal').modal('hide');
    }

    saveEstTimeConfirmation() {
      let confirmationObject = {};
        confirmationObject['heading'] = 'Confirmation';
        confirmationObject['text'] = 'Are you sure you want to continue';
        confirmationObject['buttonText'] = 'Yes';
        confirmationObject['showCancelButton'] = true;
        confirmationObject['cancelButtonText'] = 'No';
        confirmationObject['action'] = SAVE_EST_TIME;
        this.confirmationDialogueData.emit(confirmationObject);
    }
    saveEstTime() {
      let prefKey = {};
      prefKey['name'] = ADMIN_PREFERENCES.TESTCASE_ESTIMATED_TIME_TO_TEST_VALUE;
      //prefKey['value'] = NoOfSec.toString();
      prefKey['value'] = this.newEstTime;
      this.zephyrStore.dispatch(this._adminAction.updateAdminPreference(prefKey));
    }

    ngOnDestroy() {
      this.unsubscribe();
    }
    onDurationUpdate(value) {
      this.newEstTime = value;
      this.estTime = value;
      if (value) {
        this.isFormDirty = true;
      } else {
        this.isFormDirty = false;
      }
    }
  }
