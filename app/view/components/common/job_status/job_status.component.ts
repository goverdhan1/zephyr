import {Component,Input , Output , EventEmitter , OnDestroy} from '@angular/core';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {GlobalAction} from '../../../../actions/global.action';
import {GridAction} from '../../../../actions/grid.action';
import * as events from '../../../../utils/constants/action.events';

declare var jQuery: any;
declare var moment: any;

const JOB_PROGRESS_STATUS_INPROGRESS: Number = 0;
const JOB_PROGRESS_STATUS_SUCCESS: Number = 1;
const JOB_PROGRESS_STATUS_FAILED: Number = 2;
const JOB_PROGRESS_STATUS_PARTIAL_SUCCESS: Number = 3;

const JOB_PROGRESS_STATUS_MESSAGE = ['' , 'Success' , 'Failed' , 'Partial Success'];

@Component({
  selector: 'job-status',
  viewProviders: [GlobalAction, GridAction],
  templateUrl: 'job_status.html'
})

export class JobStatusComponent implements OnDestroy {
    @Input() modalHeading; //inputs the heading of job progress component
     //outputs the action to be taken after click on Refresh of this modal
    @Input() messages = {
      'success' : '',
      'failure' : ''
    }; //Inputs the failure message and success message
    @Input() autoHideOnSuccess:Boolean = false;
    @Input() jobStatusId;
    @Output() jobProgressRefreshClicked: EventEmitter<any> = new EventEmitter();
    @Output() jobCompleted: EventEmitter<any> = new EventEmitter();
    zephyrStore;
    componentId;
    state;
    progessStatus:any = {heading : '' , status : {} , id : '' };
    percentageCompleted; //This variables tells the % of work done
    isShowStatusWindow; //THis variable controls when to show status window
    isJobCompleted : boolean; //This variable is set awhen job is completed
    isFailed = false;
    unsubscribe;
    timerConstant;
    constructor ( private _globalAction: GlobalAction , private _gridAction: GridAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.jobStatusId = this.jobStatusId || '';
        this.percentageCompleted = 0; //Initializing % completion as 0
        this.isJobCompleted = false;
        let self = this;
        this.unsubscribe = this.zephyrStore.subscribe(() => {
            this.state  = this.zephyrStore.getState();
            this.progessStatus.id = this.state.global.progessStatus.id;
            this.progessStatus.heading = this.modalHeading;
            let componentId = this.state.global.componentId;
            if (this.state.global.event === events.JOB_PROGRESS_STATUS_STARTS && componentId === this.jobStatusId) {
                this.percentageCompleted = 0; //Initializing the status object and % completed
                this.componentId = this.state.global.componentId;
                this.progessStatus.status = {};
                self.isJobCompleted = false;
                this.isFailed = false;
                this.isShowStatusWindow = false;
                this.progessStatus.status['message'] = [];
                //API call to get the status
                this.zephyrStore.dispatch(this._globalAction.jobProgressStatus(this.progessStatus.id));
                //starting the timer to make API calls to fetch the status
                this.timerConstant = setInterval(function(){ self.refreshStatus();}, 3000);

                jQuery(`#job-status-modal${this.componentId}`).modal();
            } else if (this.state.global.event === events.JOB_PROGRESS_STATUS_INBETWEEN && this.componentId === this.jobStatusId) { //Updates the status
              this.progessStatus.status = JSON.parse(JSON.stringify(this.state.global.progessStatus.status));
              this.progessStatus.status['statusMessage'] = 'In Progress';
              this.isFailed = false;

              this.progessStatus.status['message'] = (this.progessStatus.status['message'] &&
                (this.progessStatus.status['message']).constructor === String) ? (this.progessStatus.status['message'] || '').trim().split('\n') : [];

              this.percentageCompleted = this.progessStatus.status['totalSteps'] == 0 ? 0 :
                          Math.floor(this.progessStatus.status['completedSteps'] / this.progessStatus.status['totalSteps']*100);

              let progressStatus = this.progessStatus.status['status'];
              if ((progressStatus == ('2')) && (!self.isJobCompleted)) {
                this.zephyrStore.dispatch(this._gridAction.clearGlobalEvents());
                this.percentageCompleted = 100;
                this.isFailed = true;
                clearInterval(this.timerConstant);
                this.progessStatus.status['statusMessage'] = JOB_PROGRESS_STATUS_MESSAGE[progressStatus];
                this.isShowStatusWindow = false;
                self.isJobCompleted = true;
                this.jobCompleted.emit({fail: true});
                this.zephyrStore.dispatch(this._globalAction.onError(this.messages.failure));
                return;  //no further processing needed after this
              } else if ((progressStatus == '1' || progressStatus == '3') && (!self.isJobCompleted) && this.componentId === this.jobStatusId) {
                //If stoing conidtion is reached, clears the timer, hides modal and shows toaster
                this.zephyrStore.dispatch(this._gridAction.clearGlobalEvents());
                this.percentageCompleted = 100;
                clearInterval(this.timerConstant);
                this.progessStatus.status['statusMessage'] = JOB_PROGRESS_STATUS_MESSAGE[progressStatus];
                this.isShowStatusWindow = false;
                self.isJobCompleted = true;
                this.isFailed = false;
                if(this.autoHideOnSuccess) {
                  this.jobCompleted.emit(this.progessStatus.status['data']);
                  jQuery(`#job-status-modal${this.componentId}`).modal('hide');
                } else {
                  this.jobCompleted.emit();
                  this.zephyrStore.dispatch(this._globalAction.showToaster(this.messages.success));
                }
                return;
              }
            } else if (this.state.global.event === events.JOB_PROGRESS_ERROR && this.componentId === this.jobStatusId) {
              this.zephyrStore.dispatch(this._gridAction.clearGlobalEvents());
              self.isJobCompleted = true;
              this.isShowStatusWindow = false;
              this.progessStatus.status['statusMessage'] = 'Failed';
              this.isFailed = true;
              this.jobCompleted.emit();
            }
        });
    }

    //This function hides the modal and emits the event
    refreshClicked(ev) {
        jQuery(`#job-status-modal${this.componentId}`).modal('hide');
        this.componentId = '';
        this.jobProgressRefreshClicked.emit(ev.target);
    }

    //This function hides the modal and shows status-window
    hideClicked () {
      jQuery(`#job-status-modal${this.componentId}`).modal('hide');
      this.componentId = '';
      this.isShowStatusWindow = true;
    }

    //This function opens the modal
    openStatusModal () {
      jQuery(`#job-status-modal${this.componentId}`).modal();
      this.isShowStatusWindow = false;
    }

    setStyles() {
      if (this.isFailed) {
        let styles = {
          'color':'red'
        };
        return styles;
      }
      return null;
    }

    //This function calls the job status API
    refreshStatus() {
      if (this.isJobCompleted) {
        //jQuery('#job-status-modal .zui-btn.zui-btn-primary').attr("disabled", true);
        jQuery(`#job-status-modal${this.componentId} .zui-btn.zui-btn-primary`).attr("disabled", true);
        this.jobProgressRefreshClicked.emit('');
      } else {
        this.zephyrStore.dispatch(this._globalAction.jobProgressStatus(this.progessStatus.id));
      }
    }

    ngOnDestroy() {
      //clearing the time interval so that repeated called doesnot go
      //TODO : on completion, how to show success/error toaster message
      clearInterval(this.timerConstant);
      this.unsubscribe();
    }
  }
