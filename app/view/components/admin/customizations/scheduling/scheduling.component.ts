import {Component  , OnDestroy , AfterViewInit , Output , NgZone , EventEmitter} from '@angular/core';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {AdminAction} from '../../../../../actions/admin.action';

declare var jQuery: any, _;

const CLOSE_SCHEDULING_MODAL = 'CLOSE_SCHEDULING_MODAL';

@Component({
  selector: 'scheduling-modal',
  viewProviders: [AdminAction],
  templateUrl: 'scheduling.html',
})

export class SchedulingModalComponent implements AfterViewInit, OnDestroy {
    @Output() confirmationDialogueData: EventEmitter<any> = new EventEmitter();
    zephyrStore;
    state;
    unsubscribe;
    etlTimingObject;
    etlHourSelect;
    etlMmSelect;
    etlTimeZone;
    prevEtlHourSelect;
    prevEtlMmSelect;
    hourRepeatConstant = new Array(24);
    minuteRepeatConstant = new Array(60);
    constructor(private _adminAction: AdminAction  ,private zone : NgZone ) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.etlHourSelect = '0';
        this.etlMmSelect = '0';
        this.unsubscribe = this.zephyrStore.subscribe(() => {
            this.zone.run(() => {
             this.zephyrStore = ZephyrStore.getZephyrStore();
             this.onInit();
            });
        });
    }
    onInit() {
      this.initETLTiming();
    }

    ngAfterViewInit () {
       jQuery('#scheduling-modal').on('shown.bs.modal', (e) => {
          this.getETLTiming();
        });
    }

    getETLTiming() {
      this.zephyrStore.dispatch(this._adminAction.getETLTiming());
    }

     initETLTiming() {
      this.etlTimingObject = this.zephyrStore.getState().etl.timing;
      this.etlTimeZone = this.etlTimingObject.timezone + '(' + this.etlTimingObject.timezoneShort + ')';
      this.etlHourSelect = this.etlTimingObject['hrs'] ? this.etlTimingObject['hrs'].toString() : '0';
      this.etlMmSelect = this.etlTimingObject['min'] ? this.etlTimingObject['min'].toString() : '0';
      this.prevEtlHourSelect = _.cloneDeep(this.etlHourSelect);
      this.prevEtlMmSelect = _.cloneDeep(this.etlMmSelect);
    }
    saveEtlTiming() {
      let data = {};
        data['hrs'] = this.etlHourSelect;
        data['mm'] = this.etlMmSelect;
      this.zephyrStore.dispatch(this._adminAction.updateETLTiming(data));
    }

    resetEtlTiming() {
      this.initETLTiming();
    }

    ngOnDestroy() {
      this.unsubscribe();
    }
    isFormValid() {
      return (this.etlHourSelect == this.prevEtlHourSelect && this.etlMmSelect == this.prevEtlMmSelect);
    }

    hideScedulingModal() {
      jQuery('#scheduling-modal').modal('hide');
    }

    cancelEtlTimingConfirmation() {
      if (!this.isFormValid()) {
        let confirmationObject = {};
          confirmationObject['heading'] = 'Unsaved changes';
          confirmationObject['text'] = 'You have some unsaved changes. Are you sure you want to continue?';
          confirmationObject['buttonText'] = 'Continue';
          confirmationObject['showCancelButton'] = true;
          confirmationObject['cancelButtonText'] = 'cancel';
          confirmationObject['action'] = CLOSE_SCHEDULING_MODAL;
          this.confirmationDialogueData.emit(confirmationObject);
        } else {
          this.hideScedulingModal();
        }
    }
  }
