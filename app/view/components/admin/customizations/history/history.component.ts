import {Component  , OnDestroy , AfterViewInit, EventEmitter,Output} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {AdminAction} from '../../../../../actions/admin.action';
import {HISTORY_GRID_TYPE, HISTORY_GRID_PAGINATION} from '../../../admin/customizations/customizations.constant';

declare var jQuery: any, _ ,moment;
const SCHEDULE = 'SCHEDULE';
const SYSTEM_TYPE_4 = 4;
const NO_ACTION = 'NO_ACTION';
@Component({
  selector: 'history-modal',
  viewProviders: [AdminAction],
  templateUrl: 'history.html',
})

export class HistoryModalComponent implements AfterViewInit, OnDestroy {
    @Output() confirmationDialogueData: EventEmitter<any> = new EventEmitter();
    zephyrStore;
    state;
    unsubscribe;
    scheduleForm;
    etlHistoryGrid;
    etlHistoryGridType;
    executeDate;
    targetDateCalendar;
    minDateCalendar;
    currentPage = HISTORY_GRID_PAGINATION.currentIndex;
    size = HISTORY_GRID_PAGINATION.size;
    paginationOptions = HISTORY_GRID_PAGINATION;
    isDefectOn : boolean; //boolean to check if linked to jira or not
    constructor(fb: FormBuilder, private _adminAction: AdminAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        let state = this.zephyrStore.getState();
        this.etlHistoryGrid = state.etl.history.historyGrid;
        this.etlHistoryGridType = HISTORY_GRID_TYPE;
        this.executeDate = false;
        let defectSystem = state.global.defectSystem || {};
        this.isDefectOn = defectSystem['systemType'] == SYSTEM_TYPE_4;
        this.scheduleForm = fb.group({
          targetDate: [moment().format('YYYY-MM-DD')],
          tccTrend: [true],
          tceTrend: [false],
          defectTrend: [false],
          predictiveDataPush:[false]
        });
        this.unsubscribe = this.zephyrStore.subscribe(() => {
            let state = this.zephyrStore.getState();
            let defectSystem = state.global.defectSystem || {};
            this.isDefectOn = defectSystem['systemType'] == SYSTEM_TYPE_4;
            this.initETLHistoryData(state);
            this.paginationOptions = this.etlHistoryGrid.paginationOptions;
            this.size = this.etlHistoryGrid.size;
            this.currentPage = this.etlHistoryGrid.currentPage;
        });
    }

    ngAfterViewInit() {
      jQuery('#history-modal').on('shown.bs.modal', () => {
         this.getETLHistory(false);
         this.resetScheduleForm();
       });
    }
    getETLHistory(isShowToaster) {
      this.zephyrStore.dispatch(this._adminAction.getETLHistory(isShowToaster));
    }

    initETLHistoryData(state) {
        if (state.etl.history.isUpdated && !_.isEqual(state.etl.history.historyGrid, this.etlHistoryGrid)) {
            this.etlHistoryGrid = state.etl.history.historyGrid;
        }
    }

    onScheduleFormSubmit(form) {
     form ? form = form : form = JSON.parse(JSON.stringify(this.scheduleForm.value));
     form['executeTillToday'] = this.executeDate;
     form['targetDate'] = moment(form['targetDate']).format('YYYY-MM-DD');
     this.zephyrStore.dispatch(this._adminAction.etlSchedule(form));
    }

    onScheduleFormConfirmation() {

        let confirmationObject = {};

        // check addded when defect trend is selected and selected date cant be different from todays and yesterday's
        if (this.scheduleForm.value.defectTrend && (new Date(this.scheduleForm.value.targetDate).getTime() < new Date().getTime() - 2*24*60*60*1000)) {

            confirmationObject['heading'] = 'Opps';
            confirmationObject['text'] = 'Certain limitations prohibit the accurate collection of defect historical trend data. It '+
                'can be collected only for yesterday or today.\nPlease reset target date or uncheck Defect trend.';

            confirmationObject['buttonText'] = 'Ok';
            confirmationObject['showCancelButton'] = false;
            confirmationObject['action'] = NO_ACTION;

        } else {

            let dateText = this.executeDate ? 'from ' + this.scheduleForm.value.targetDate + ' until today' : 'for ' + this.scheduleForm.value.targetDate;
            confirmationObject['heading'] = 'Confirmation';

            confirmationObject['text'] = 'Do you wish to collect trend data ' + dateText +
                ' ?' +'\n (This process cannot be undone.) Based on the amount of data, this could take a while.';

            confirmationObject['buttonText'] = 'Yes';
            confirmationObject['showCancelButton'] = true;
            confirmationObject['cancelButtonText'] = 'No';
            confirmationObject['action'] = SCHEDULE;
        }

        this.confirmationDialogueData.emit(confirmationObject);
    }

    updateIndex(value) {
        this.currentPage = value;
        this.zephyrStore.dispatch(this._adminAction.updatePagination(this.currentPage, this.size));
    }
    updatePageSize(value) {
        this.size = value;
        this.currentPage = 1;
        this.zephyrStore.dispatch(this._adminAction.updatePagination(this.currentPage, this.size));
    }
    resetScheduleForm() {
      this.scheduleForm.reset();
      this.executeDate = false;
      this.targetDateCalendar = moment((new Date()).getTime())._d;
      this.minDateCalendar = moment(new Date().setFullYear(new Date().getFullYear() - 1))._d;
      this.scheduleForm.patchValue({
        targetDate: [moment().format('YYYY-MM-DD')],
        tccTrend: true,
        tceTrend: false,
        defectTrend: false,
        predictiveDataPush: false
      });
    }
    getRefreshHistory() {
      let dateOffset = (24*60*60*1000) * 7;
      let dataObject = {
        onlyetljobs : true,
        fromdate : new Date().getTime() - dateOffset
      };
      this.zephyrStore.dispatch(this._adminAction.getRefreshHistory(dataObject));
    }
    ngOnDestroy() {
      this.unsubscribe();
    }
}
