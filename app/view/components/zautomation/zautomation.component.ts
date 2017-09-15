import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  Inject
} from '@angular/core';
import {Http} from '@angular/http';
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {TcrGridComponent} from '../../components/tcr/tcr_grid.component';
import {TestcaseExecutionService} from '../../../services/testcaseExecution.service';
import {TestcaseExecutionAction} from '../../../actions/testcaseExecution.action';
import {GridAction} from '../../../actions/grid.action';
import {GridComponent} from '../grid/grid.component';
import {ZAUTO_GRID_TYPE, ZAUTO_GRID_OPTIONS, GRID_ROW_COUNT_DEFAULT, ZAUTO_GRID_PAGINATION} from './zautomation_grid.constant';
import {FILEWATCH_GRID_TYPE, FILE_WATCH_GRID_OPTIONS, FILE_WATCH_GRID_PAGINATION} from './file_watcher_grid.constant';
import {LeftNavComponent} from '../common/leftnav/leftnav.component';
import {ZephyrStore} from '../../../store/zephyr.store';
import {Resizable} from '../../../utils/scripts/resizable';
import {ToastrService} from "../../../services/toastr.service";
import {TestCaseEASCycleComponent} from '../testcase-eas/cycle/testcase-eas-cycle.component';
// Constants
import {RELEASE_COMPONENT} from '../release/release.constant';
import {ZEE_NAV_COLUMNS} from '../projects/project_leftnav.data';
import {FormInputValidator} from '../../validators/form_input_validator';

import {ProjectAction} from '../../../actions/project.action';
import {RELEASE_SETUP_APPLICATION_ID} from '../admin/customizations/customizations.constant';
import {NEXT_PAGE, PREV_PAGE} from '../common/paginator/paginator.constant';
import {ZAutomationAction} from '../../../actions/zautomation.action';
import {
  NOTIFICATION_APP_CONSTANTS,
  NOTIFICATION_ENTITY_CONSTANTS
} from '../../../utils/constants/notification.constants';
import {constructNotificationStoreMetadata} from '../../../utils/notification/notification.util';
import {NotificationStore} from '../../../store/notification.store';
import {NotificationAction} from '../../../actions/notification.action';
import {Observable} from 'rxjs/Rx';
declare var jQuery: any, _, window: any, moment: any;

const NO_ACTION = 'NO_ACTION';
const DELETE_DOUBLE_CONFIRMATION = 'DELETE_DOUBLE_CONFIRMATION';

@Component({
  selector: 'zee-automation',
  viewProviders: [TestcaseExecutionAction, GridAction, NotificationAction, ProjectAction],
  templateUrl: 'zautomation.html',
  providers: [ZAutomationAction]
  })

export class ZautomationComponent implements OnInit, AfterViewInit, OnDestroy {
  id: string;
  title: string;
  category: string;
  isinvokeScript :boolean = false;
  iscreatePhase :boolean = false;
  iscreatePkg :boolean =true;
  isDisabled :boolean = true;
  isPrefix :boolean = false;
  zbotAgents = [];
  navColumns;
  currentProject;
 currentRelease;
  releases;
  startDate;
  endDate;
  releaseStartDate;
  currentPage = 1;
  confirmationObject:any = {};
  zephyrStore;
  isShowForm;
  releaseModel;
 tcrGridRows: Array<Object> = [];
  tcrGridColumns: Array<Object> = [];
  _zautoGridType = ZAUTO_GRID_TYPE;
  _fileWatcherType = FILEWATCH_GRID_TYPE;
  paginationOptions = ZAUTO_GRID_PAGINATION;
  paginationOption = FILE_WATCH_GRID_PAGINATION;
  releaseId;
  projectId;
  isZbotEnabled = true;
  resizable;
  selectedFileWatchIds= [];
  selectedFWIds = {};
  selectedFileWatchJobs: Array<Object> = [];
  modifiedDate;
  automationJobId;
  isDeleteRow = [];
  isPlayRow = [];
  isPauseRow = [];
  username;
  invokeScript: boolean = false;
  manualRun: boolean = true;
  showConfig: boolean = false;
  showConfigDetails: boolean = true;
  createdDate;
  scheduleDate;
  selectedJobIds= {};
  selectdJobs:Array<Object> = [];
  selectedJob = {};
  unsubscribe;
  isManually = false;
  appId = NOTIFICATION_APP_CONSTANTS.ZAUTOMATION_APP.name;
  fileWatcherApp = NOTIFICATION_APP_CONSTANTS.ZFILE_WATCHER_APP.name;
  isFromApplyNotification;
  gridPageSize = GRID_ROW_COUNT_DEFAULT ;
  selectedJobId;
  selectedTctIds = "";
  selectedTestcaseIds = "";
  prefixValue = "";
  prefixValueDeb = null;
  isFileWatcher= false;

  zautoGridRows = [];
  fileWatcherGridRows = [];
  i18nMessages = I18N_MESSAGES;
  public notificationStore;
  private zautoGridColumns = [];
  private automationJobs = [];
  private _releaseId;
  private _automationJobs = [];
  private _rows = [];
  private addZAutomationJob: FormGroup;
  private addFileWatcherJob: FormGroup;
  private changeDetectionDebounce;
  private _zephyrStore;

  constructor(private route: ActivatedRoute, private router: Router, private _testcaseExecutionAction: TestcaseExecutionAction,
              private _zautomationAction: ZAutomationAction, private fb: FormBuilder,private _gridAction: GridAction,
              private _notificationAction:NotificationAction, private _projectAction: ProjectAction, @Inject(ToastrService) private toastrService:ToastrService) {

    this.gridPageSize = ZAUTO_GRID_OPTIONS.rowCount;
    this.currentRelease = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`));
    this.releaseId = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`)).id;
    this.projectId = JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)).id;
    this.notificationStore = NotificationStore.getNotificationStore();
    this.zephyrStore = ZephyrStore.getZephyrStore();
   // this.navColumns = ZEE_NAV_COLUMNS;
    this.currentProject = localStorage.getItem(`${window.tab}-currentProject`) ? JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)) : undefined;
    this.addZAutomationJob = this.fb.group({
          automationTool: ['', Validators.required],
          scriptpath: [''],
          resultPath: ['', Validators.compose([Validators.required, Validators.pattern('^.{1,128}$'), FormInputValidator.invalidateOnlySpaces])],
          zBoatmachine: ['', Validators.required],
       //   ismanuallyRun: [''],
          invokscript: [''],
          cycleDuration:['', Validators.required],
          createPackage:['']
    });

    this.addFileWatcherJob = this.fb.group({
          automationTool: ['', Validators.required],
          folderPath: ['', Validators.compose([Validators.required, Validators.pattern('^.{1,128}$'), FormInputValidator.invalidateOnlySpaces])],
          zBoatmachine: ['', Validators.required],
       //   ismanuallyRun: [''],
          cycleDuration:['', Validators.required],
          createPackage:[''],
          cyclePhase: [''],
          delay: ['', Validators.required]
    });

    this.unsubscribe = this.zephyrStore.subscribe(() => {
      let state = this.zephyrStore.getState();
      this.paginationOptions = state.zautomationReducer.automationGrid.paginationOptions;
      this.paginationOption = state.zautomationReducer.filewatchergrid.paginationOptions;
      this.zbotAgents = state.tce.agents;
      this.zautoGridRows = state.zautomationReducer.automationGrid.rows;
      this.fileWatcherGridRows = state.zautomationReducer.filewatchergrid.rows;
     if (state.zautomationReducer.event === 'GET_AUTOMATION_JOB_FOR_RELEASE_PROJECT') {
          this.zautoGridRows = state.zautomationReducer.automationGrid.rows;
          this._rows = state.zautomationReducer.automationGrid.rows;
      }else if(state.zautomationReducer.event === 'GET_FILE_WATCH_JOB_FOR_RELEASE_PROJECT'){
           this.fileWatcherGridRows = state.zautomationReducer.filewatchergrid.rows;
           this._rows = state.zautomationReducer.filewatchergrid.rows;
      }
    });
  }

  ngOnInit() {
      this.clearSelectedFileWatchJobIds();
      this.clearSelectedJobIds();
       this.zephyrStore.dispatch(this._zautomationAction.getAllAutomationJobsForReleaseAndProject(this.releaseId, this.projectId));
       this.zephyrStore.dispatch(this._testcaseExecutionAction.fetchAgents());
      //  this.zephyrStore.dispatch(this._projectAction._fetchProjectDetailsById());
  }
   handleZAutomationSubscriptions() {
        let curMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.AUTOMATION, '', '');
        this.notificationStore.dispatch(this._notificationAction.subscribeToTopic(curMeta, '', this.appId));
      }
   applyNotifications(event) {
    this.zephyrStore.dispatch(this._zautomationAction.updateGridPageSize(this.gridPageSize, this.currentPage));
    this.zephyrStore.dispatch(this._zautomationAction.getAllAutomationJobsForReleaseAndProject(this.releaseId, this.projectId));
    this.notificationStore.dispatch(this._notificationAction.applyNotification(this.appId, true));
      }

   applyNotificationsForFileWatcher(event){
    this.zephyrStore.dispatch(this._zautomationAction.updateFileWatchGridPageSize(this.gridPageSize, this.currentPage));
    this.zephyrStore.dispatch(this._zautomationAction.getAllFileWatchJobsForReleaseAndProject(this.releaseId, this.projectId));
    this.notificationStore.dispatch(this._notificationAction.applyNotification(this.fileWatcherApp, true));
    }
    discardNotifiaction(){
        this.notificationStore.dispatch(this._notificationAction.discardAppNotifications(this.appId));
      }
   initResizable() {
        this.resizable = new Resizable();
        this.resizable.attachResizable(jQuery('.zui-flex-h-resizable'), jQuery('.zui-w-handle'), {
            lockHeight: true,
            minWidth: jQuery('.zui-flex-h-resizable').outerWidth(),
            maxWidth: 500,
        });
   }

    //  addEditToggle(formValues){
    //   jQuery('#AddJob').off('click.add').on('click.add', () => {
    //     if(jQuery('#btn').data('clicked')) {
    //         this.addAutomationJobFormSubmit(formValues);
    //     }
    //   });
    //   if(this.zautoGridRowClick){
    //     this.zautoGridRowClick(formValues);
    //   }
    // }

    ClearFields() {
      if(this.addZAutomationJob.controls['automationTool'].value!="" || this.addZAutomationJob.controls['scriptpath'].value!="" ||
       this.addZAutomationJob.controls['resultPath'].value!="" || this.addZAutomationJob.controls['zBoatmachine'].value!="" ||
      this.addZAutomationJob.controls['invokscript'].value || this.addZAutomationJob.controls['cycleDuration'].value!="" ||
      this.addZAutomationJob.controls['createPackage'].value){
        jQuery('#zui-unsaved-changes-prompt').modal('show');
      }else{
       this.continueNavigation();
        }
      }

        zautoGridRowClick(ev) {
          //let index = Number(ev.dataset.index.id);
          this.selectedJobIds = Number(ev.dataset.id);
          this.selectdJobs.push(this.selectedJobIds);
          //   if(this.selectdJobs.length >= 0){
          //    jQuery('#zui-modal-delete-four').prop('disabled', false);
          //     jQuery('# zui-modal-execution').prop('disabled', false);
            
          // }else{
          //       jQuery('#zui-modal-delete-four').prop('disabled', true);
          //     jQuery('# zui-modal-execution').prop('disabled', true);
          // }
          // this.configureAutomationJob();    
          // let state = this.zephyrStore.getState();
          // let row = this.zautoGridRows[jQuery(ev).closest('.flex-bar').index()];
          // this.addZAutomationJob.controls['automationTool'].setValue(row.automationFramework);      
          // this.addZAutomationJob.controls['resultPath'].setValue(row.resultPath);     
          // this.addZAutomationJob.controls['zBoatmachine'].setValue(row.zbotAgentMachine);  
          // this.addZAutomationJob.controls['cycleDuration'].setValue(row.cycleDuration);
          // this.addZAutomationJob.controls['scriptpath'].setValue(row.scriptPath);   
          // this.username = state.loggedInUser.fullName;
          // this.createdDate = row.jobCrationDate;
          // this.modifiedDate = row.jobModifyDate;
          // this.scheduleDate = row.jobScheduleDate;
          // // jQuery('#createdBy').prop("hidden", false); 
          //   jQuery('#btn').on('click',()=>{
          // this.zephyrStore.dispatch(this._zautomationAction.editAutomationJob(this.id, this.automationJobId));
          //  });
          //  this.continueNavigation();
          // this.notificationStore.dispatch(this._notificationAction.applyNotification(this.appId, true));
   }

        fileWatchGridRowClick(value){
          this.selectedFWIds = Number(value.dataset.id);
          this.selectedFileWatchJobs.push(this.selectedFWIds);
          //  if(this.selectedFileWatchJobs.length >= 0){
          //    jQuery('#delete-button-three').prop('disabled', false);
          // }else{
          //      jQuery('#delete-button-three').prop('disabled', true);
          // }

        }

      ClearFieldsForFileWatcher() {
        if(this.addFileWatcherJob.controls['automationTool'].value!="" || this.addFileWatcherJob.controls['folderPath'].value!="" ||
        this.addFileWatcherJob.controls['zBoatmachine'].value!="" ||
        this.addFileWatcherJob.controls['cycleDuration'].value!="" ||  this.addFileWatcherJob.controls['createPackage'].value ||
        this.addFileWatcherJob.controls['delay'].value){
          jQuery('#zui-unsaved-changes-prompt').modal('show');
        }else{
         this.continueNavigation();
          }
        }

      dismissNavigation() {
        jQuery('#zui-unsaved-changes-prompt').modal('hide');
    }

    continueNavigation(){
      this.showConfig = false;
      this.addZAutomationJob.controls['automationTool'].setValue('');
      this.addZAutomationJob.controls['scriptpath'].setValue('');
      this.isinvokeScript = false;
      this.addZAutomationJob.controls['resultPath'].setValue('');
      this.addZAutomationJob.controls['zBoatmachine'].setValue('');
      this.addZAutomationJob.controls['invokscript'].setValue('');
      this.addZAutomationJob.controls['cycleDuration'].setValue('');
      this.addZAutomationJob.controls['createPackage'].setValue('');
      this.iscreatePkg=true;
      //clear fields for file watcher.

      this.addFileWatcherJob.controls['automationTool'].setValue('');
      this.addFileWatcherJob.controls['folderPath'].setValue('');
      this.addFileWatcherJob.controls['zBoatmachine'].setValue('');
      this.addFileWatcherJob.controls['cycleDuration'].setValue('');
      this.addFileWatcherJob.controls['delay'].setValue('');
      jQuery('#zui-unsaved-changes-prompt').modal('hide');
    }
    changeTool(){
     this.addZAutomationJob.controls['scriptpath'].setValue('');
     this.isinvokeScript = false;
     this.addZAutomationJob.controls['resultPath'].setValue('');
     this.addZAutomationJob.controls['zBoatmachine'].setValue('');
     this.addZAutomationJob.controls['invokscript'].setValue('');
     this.addZAutomationJob.controls['cycleDuration'].setValue('');
     this.addZAutomationJob.controls['createPackage'].setValue('');
     this.iscreatePkg=true;
      }
    confirmationDialogueData(confirmationObject) {
      jQuery('#confirmation-modal').modal();
      this.confirmationObject = confirmationObject;
    }

     confirmationMultipleDialogueData(confirmationObject) {
      jQuery('#confirmation-modal-four').modal();
      this.confirmationObject = confirmationObject;
    }

    confirmationMultipleFileWatchDialogueData(confirmationObject){
          jQuery('#confirmation-modal-three').modal();
          this.confirmationObject = confirmationObject;
    }

  addAutomationJobFormSubmit(formValues){
      if(formValues.automationTool){
        formValues['automationFramework'] = formValues.automationTool;
      }

      if(formValues.resultPath){
        formValues['resultPath'] = formValues.resultPath;
      }
      if(this.projectId){
        formValues['projectId'] = this.projectId;
      }
      if(this.releaseId){
        formValues['releaseId'] = this.releaseId;
      }
      if(formValues.zBoatmachine){
        formValues['zbotAgentMachine'] = formValues.zBoatmachine;
      }
      if(formValues.createPackage){
        formValues['createPackage'] = formValues.createPackage;
         }else{
          formValues['createPackage'] = false;
        }

      formValues['cycleDuration'] = formValues.cycleDuration;


      /*if(formValues.ismanuallyRun) {
        this.isManually = formValues.ismanuallyRun;
      }

      formValues['manualRun'] =  this.isManually;*/

     if(formValues.invokscript) {
        this.invokeScript = formValues.invokscript;
        if(formValues.scriptpath){
          formValues['scriptPath'] = formValues.scriptpath;
        }
      }
      formValues['invokeScript'] = this.invokeScript;

      this.zephyrStore.dispatch(this._zautomationAction.addAutomationJob(formValues));
      setTimeout(()=>{
            this.zephyrStore.dispatch(this._zautomationAction.getAllAutomationJobsForReleaseAndProject(this.releaseId, this.projectId));
      }, 200);
         this.continueNavigation();
        this.notificationStore.dispatch(this._notificationAction.applyNotification(this.appId, true));
  }

   addFileWatchJobFormSubmit(formValues){
      if(formValues.automationTool){
        formValues['automationFramework'] = formValues.automationTool;
      }

      if(formValues.folderPath){
        formValues['folderPath'] = formValues.folderPath;
      }
      if(this.projectId){
        formValues['projectId'] = this.projectId;
      }
      if(this.releaseId){
        formValues['releaseId'] = this.releaseId;
      }
      if(formValues.zBoatmachine){
        formValues['zbotAgentMachine'] = formValues.zBoatmachine;
      }
      if(formValues.createPackage){
        formValues['createPackage'] = formValues.createPackage;
         }else{
          formValues['createPackage'] = false;
        }

        //  if(formValues.createPhase){
        // formValues['createPhase'] = formValues.createPhase;
        //  }else{
        //   formValues['createPhase'] = false;
        // }

      formValues['cycleDuration'] = formValues.cycleDuration;

      if(formValues.delay){
        formValues['delay'] = formValues.delay;
      }

     this.zephyrStore.dispatch(this._zautomationAction.addfileWatchJob(formValues));
      setTimeout(()=>{
            this.zephyrStore.dispatch(this._zautomationAction.getAllFileWatchJobsForReleaseAndProject(this.releaseId, this.projectId));
      }, 200);
         this.continueNavigation();
        this.notificationStore.dispatch(this._notificationAction.applyNotification(this.fileWatcherApp, true));
  }

    togglecreatePkg(value, form){
          if(value.value !== 'Selenium'){
            this.addZAutomationJob.controls['createPackage'].setValue('');
              this.iscreatePkg=false;
            }else{
              this.iscreatePkg=true;
            }
    }

    togglePhaseSelection () {
      this.isinvokeScript = !this.isinvokeScript;
      if(!this.isinvokeScript){
            this.addZAutomationJob.controls['scriptpath'].setValue('');
      }
        this.checkValidation( this.isinvokeScript);
    }

      onTabClick(e) {
        this.clearSelectedJobIds();
        this.clearSelectedFileWatchJobIds();
        jQuery('a[data-toggle="tab"]').on('shown.bs.tab',  (e) => {
          let filewatch = '#fileWatcher' === jQuery(e.target).attr('href');
          if(filewatch){
            this.isFileWatcher=true;
            this.ClearFields();
           //Subscribe to Notifications
            let curMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.FILEWATCHER, '', '');
            this.notificationStore.dispatch(this._notificationAction.subscribeToTopic(curMeta, '', this.fileWatcherApp));
            this.zephyrStore.dispatch(this._zautomationAction.getAllFileWatchJobsForReleaseAndProject(this.releaseId, this.projectId));
            this.notificationStore.dispatch(this._notificationAction.discardAppNotifications(this.appId));
          }else{
            //subscribe automation
            //unsubscribe zfile watcher
            this.isFileWatcher=false;
            this.ClearFieldsForFileWatcher();
            this.notificationStore.dispatch(this._notificationAction.discardAppNotifications(this.fileWatcherApp));
          }

        });


    }

      deHighlightRow () {
        jQuery('.zAutomation-grid').find('.flex-bar').removeClass('selected-row');
      }

    tooglePrefix(){
      this.isPrefix = !this.isPrefix;
        if(!this.isPrefix) {
        this.prefixValue = '';
          this.isDisabled = true;
        } else if(this.prefixValue.length == 0) {
          this.isDisabled = true;
        }
    }
    toggleButton(){
      if(this.prefixValueDeb) {
        clearTimeout(this.prefixValueDeb);
      }
      this.prefixValueDeb = setTimeout(()=>{
        this.prefixValueDeb = null;
        if(this.prefixValue.length > 0) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      },200);
    }
    checkValidation (value) {
      this.addZAutomationJob.controls['automationTool'].setValidators(Validators.compose([Validators.required, Validators.pattern('^.{2,128}$')]));
      this.addZAutomationJob.controls['automationTool'].setValue(this.addZAutomationJob.value.automationTool);
      this.addZAutomationJob.controls['resultPath'].setValidators(Validators.compose([Validators.required, Validators.pattern('^.{0,128}$')]));
      this.addZAutomationJob.controls['resultPath'].setValue(this.addZAutomationJob.value.resultPath);
      this.addZAutomationJob.controls['zBoatmachine'].setValidators(Validators.compose([Validators.required, Validators.pattern('^.{2,128}$')]));
      this.addZAutomationJob.controls['zBoatmachine'].setValue(this.addZAutomationJob.value.zBoatmachine);
      this.addZAutomationJob.controls['invokscript'].setValue(this.addZAutomationJob.value.invokscript);

      if (this.isinvokeScript) {

            this.addZAutomationJob.controls['scriptpath'].setValidators( Validators.compose([Validators.required, Validators.pattern('^.{1,128}$'), FormInputValidator.invalidateOnlySpaces]));
            this.addZAutomationJob.controls['scriptpath'].setValue(this.addZAutomationJob.value.scriptpath);

      } else {

            this.addZAutomationJob.controls['scriptpath'].setValue(this.addZAutomationJob.value.scriptpath);
            this.addZAutomationJob.controls['scriptpath'].clearValidators();
            this.addZAutomationJob.controls['scriptpath'].reset();
      }

  }

    ngAfterViewInit() {
    this.handleZAutomationSubscriptions();
    this.initResizable();
    }

  ngOnDestroy() {
    this.unsubscribe();
    this.discardNotifiaction();
    // if (this.paramSub) {
    //   this.paramSub.unsubscribe();
    // }
  }
   navigateToProject(ev) {
    if (this.navColumns.header.link.length) {
      this.router.navigateByUrl(this.navColumns.header.link);
    }
  }

  navigateToreleaseSetup() {
    this.router.navigateByUrl('/release_setup/details');
  }

  configureAutomationJob() {
    this.showConfig = true;
    this.showConfigDetails = false;

  }

  showConfiguredAutomationJobs(): void {
    this.showConfig = false;
    this.showConfigDetails = true;
  }


  zautoGridPrevClick(value) {
    this.updateGridPageSize(value);
  }
 zautoGridNextClick(value) {
    this.updateGridPageSize(value);
  }

  fileWatchGridPrevClick(value){
    this. updateFileWatchGridPageSize(value);
  }

  fileWatchGridNextClick(value) {
    this. updateFileWatchGridPageSize(value);
  }

  fileWatchGridPageSizeChange(value) {
        this.gridPageSize = value;
          this.updateFileWatchGridPageSize(1);
    }


  zautoGridPageSizeChange(value) {
      this.gridPageSize = value;
        this.updateGridPageSize(1);
  }

   zautoGridPaginateByIndex(value) {
        this.updateGridPageSize(value);
  }

    fileWatchGridPaginateByIndex(value) {
        this.updateFileWatchGridPageSize(value);
  }

  updateGridPageSize(value) {
        this.currentPage = value;
        this.zephyrStore.dispatch(this._zautomationAction.updateGridPageSize(this.gridPageSize, this.currentPage));
  }

   updateFileWatchGridPageSize(value) {
        this.currentPage = value;
        this.zephyrStore.dispatch(this._zautomationAction.updateFileWatchGridPageSize(this.gridPageSize, this.currentPage));
  }

  automationGridIconClick($event){
     let ev=$event;
      let tr = jQuery(ev.target).closest('.flex-bar')[0],
      _actionType  = jQuery(ev.target)[0].dataset.action;
      if (_actionType === 'delete') {
          let row = _.find(this._rows, {id: parseInt(tr.dataset.id, 10)});
          this.isDeleteRow = row.id;
          this.deleteJob();
      }
   }


    fileWatchGridIconClick(ev){
      let tr = jQuery(ev.target).closest('.flex-bar')[0];
      if (jQuery(ev.target).hasClass('deleteJobs')) {
          let row = _.find(this._rows, {id: Number(tr.dataset.id)});
          this.isDeleteRow = row.id;
          this.deleteFileWatchJob();
      }else if(jQuery(ev.target).hasClass('fa-play-circle-o')){
           let row = _.find(this._rows, {id: parseInt(tr.dataset.id, 10)});
           this.isPlayRow = row.id;
           this.playFileWatchJob();
      }else if(jQuery(ev.target).hasClass('fa-pause-circle-o')){
          let row = _.find(this._rows, {id: parseInt(tr.dataset.id, 10)});
           this.isPauseRow = row.id;
            this.pauseFileWatchJob();
      }
   }
 
      playFileWatchJob(){
       this.zephyrStore.dispatch(this._zautomationAction.playFileWatchJob([this.isPlayRow]));
       this.zephyrStore.dispatch(this._zautomationAction.getAllFileWatchJobsForReleaseAndProject(this.releaseId, this.projectId));
      }

      pauseFileWatchJob(){
      this.zephyrStore.dispatch(this._zautomationAction.pauseFileWatchJob([this.isPauseRow]));
      this.zephyrStore.dispatch(this._zautomationAction.getAllFileWatchJobsForReleaseAndProject(this.releaseId, this.projectId));
      }

    fileWatchMultipleDelete() {
      this.deleteMultipleFileWatchJob();
    }

    automationMultipleDelete(){
      this.deleteMultipleJob();
    }

  //  onClickFileWatchDelete(ev){
  //     let tr = jQuery(ev.target).closest('.flex-bar')[0],
  //     _actionType  = jQuery(ev.target)[0].dataset.action;
  //      this.selectedFileWatchIds = ev || [];
  //     if (_actionType === 'delete') {
  //         // let row = _.find(this._rows, {id: parseInt(tr.dataset.id, 10)});
  //         this.isDeleteRow = this.selectedFileWatchIds;
  //         this.deleteFileWatchJob();
  //     }
  //  }

   confirmationActionCallThree(event){
      let actionString = event.target.value;
      if (actionString === DELETE_DOUBLE_CONFIRMATION) {
      this.zephyrStore.dispatch( this._zautomationAction.deleteFileWatchJob(this.selectedFileWatchJobs));
       jQuery('#confirmation-modal-three').modal('hide');
       this.clearSelectedFileWatchJobIds();
       this.clearSelectedJobIds();
       this.zephyrStore.dispatch(this._zautomationAction.getAllAutomationJobsForReleaseAndProject(this.releaseId, this.projectId));
     }
   }

    confirmationActionCallFour(event){
      let actionString = event.target.value;
      if (actionString === DELETE_DOUBLE_CONFIRMATION) {
      this.zephyrStore.dispatch( this._zautomationAction.deleteAutomationJob(this.selectdJobs));
       jQuery('#confirmation-modal-four').modal('hide');
       this.clearSelectedJobIds();
       this.zephyrStore.dispatch(this._zautomationAction.getAllAutomationJobsForReleaseAndProject(this.releaseId, this.projectId));
     }
   }

  scheduleJob($event) {
    let ev = $event;
    this.clearSelectedJobIds();
    let date = (new Date()).getTime();
    if (jQuery(ev).hasClass('defect_link')) {
      if (date < this.currentProject.startDate || (this.currentProject.endDate && date > this.currentProject.endDate)) {
        if (date < this.currentProject.startDate) {
          this.toastrService.error('Project has not started yet.');
        } else {
          this.toastrService.error('Project has completed.');
        }
      } else if (!this.currentProject.endDate || date <= this.currentProject.endDate) {
        let tr = jQuery(ev).closest('.flex-bar')[0];
        jQuery('#prefix-add-modal').modal();
        this.selectedJobId = parseInt(tr.dataset.id, 10);
        this.selectedJob = _.find(this._rows, { id: parseInt(tr.dataset.id, 10) });
      }
    }
  }

  //  zautoGridRowSelection(value){
  //    let selectedJobId = value[0];
  //     this.selectedJobIds = selectedJobId;
  //  }

    //  zautoGridRowSelection(value){
    //    this.selectdJobs = value || [];
    //  }

    clearSelectedJobIds() {
        this.selectdJobs = [];
    }

    clearSelectedFileWatchJobIds(){
        this.selectedFileWatchJobs = [];
    }
    
  scheduleMultipleJobs(ev){
     let prefixName = encodeURIComponent(jQuery('#prefix-add-modal-two #prefix-value').val());
    // let selectedJobIds = ev || [];
      this.zephyrStore.dispatch(this._zautomationAction.scheduleAutomationJob(this.selectdJobs, prefixName));
       this.prefixValue = jQuery('#prefix-value').val('');
    jQuery('#prefix-add-modal-two').modal('hide');
    this.clearSelectedJobIds();
      setTimeout(()=>{
            this.zephyrStore.dispatch(this._zautomationAction.getAllAutomationJobsForReleaseAndProject(this.releaseId, this.projectId));
      }, 200);
  }

  addTestCyclePrefix() {
    let prefixName = encodeURIComponent(jQuery('#prefix-add-modal #prefix-value').val());
    this.zephyrStore.dispatch(this._zautomationAction.scheduleAutomationJob([this.selectedJobId], prefixName));
    this.selectedJobId = [];
     this.selectedJob = {};
    this.prefixValue = jQuery('#prefix-value').val('');
    jQuery('#prefix-add-modal').modal('hide');
    setTimeout(()=>{
            this.zephyrStore.dispatch(this._zautomationAction.getAllAutomationJobsForReleaseAndProject(this.releaseId, this.projectId));
      }, 200);
  }


   dismissModal(){
     this.prefixValue="";
    this.prefixValue = jQuery('#prefix-value').val('');
   }

   confirmationActionCall(event) {
     let actionString = event.target.value;
     if (actionString === DELETE_DOUBLE_CONFIRMATION) {
      this.zephyrStore.dispatch(this._zautomationAction.deleteAutomationJob([this.isDeleteRow]));
       jQuery('#confirmation-modal').modal('hide');
       this.zephyrStore.dispatch(this._zautomationAction.getAllAutomationJobsForReleaseAndProject(this.releaseId, this.projectId));
     }
   }

     confirmationActionCallTwo(event) {
     let actionString = event.target.value;
     if (actionString === DELETE_DOUBLE_CONFIRMATION) {
      this.zephyrStore.dispatch(this._zautomationAction.deleteFileWatchJob([this.isDeleteRow]));
       jQuery('#confirmation-modal-two').modal('hide');
       this.zephyrStore.dispatch(this._zautomationAction.getAllAutomationJobsForReleaseAndProject(this.releaseId, this.projectId));
     }
   }

  deleteJob() {
       if (this.zautoGridRows.length <= 0) {
         this.confirmationObject['heading'] = 'Invalid Delete';
         this.confirmationObject['text'] = 'Last job cannot be deleted';
         this.confirmationObject['buttonText'] = 'OK';
         this.confirmationObject['cancelButtonText'] = 'cancel';
         this.confirmationObject['showCancelButton'] = false;
         this.confirmationObject['action'] = NO_ACTION;
       } else {
         this.confirmationObject['heading'] = 'Warning';
         this.confirmationObject['text'] = 'Are you sure you want to delete this?';
         this.confirmationObject['buttonText'] = 'OK';
         this.confirmationObject['cancelButtonText'] = 'cancel';
         this.confirmationObject['showCancelButton'] = true;
         this.confirmationObject['action'] = DELETE_DOUBLE_CONFIRMATION;
       }
        jQuery('#confirmation-modal').modal();
    }

 deleteFileWatchJob() {
       if (this.fileWatcherGridRows.length <= 0) {
         this.confirmationObject['heading'] = 'Invalid Delete';
         this.confirmationObject['text'] = 'Last job cannot be deleted';
         this.confirmationObject['buttonText'] = 'OK';
         this.confirmationObject['cancelButtonText'] = 'cancel';
         this.confirmationObject['showCancelButton'] = false;
         this.confirmationObject['action'] = NO_ACTION;
       } else {
         this.confirmationObject['heading'] = 'Warning';
         this.confirmationObject['text'] = 'Are you sure you want to delete this?';
         this.confirmationObject['buttonText'] = 'OK';
         this.confirmationObject['cancelButtonText'] = 'cancel';
         this.confirmationObject['showCancelButton'] = true;
         this.confirmationObject['action'] = DELETE_DOUBLE_CONFIRMATION;
       }
        jQuery('#confirmation-modal-two').modal();
    }

 deleteMultipleFileWatchJob() {
       if (this.selectedFileWatchJobs.length <= 0) {
         this.confirmationObject['heading'] = 'Invalid Delete';
         this.confirmationObject['text'] = 'Last job cannot be deleted';
         this.confirmationObject['buttonText'] = 'OK';
         this.confirmationObject['cancelButtonText'] = 'cancel';
         this.confirmationObject['showCancelButton'] = false;
         this.confirmationObject['action'] = NO_ACTION;
       } else {
         this.confirmationObject['heading'] = 'Warning';
         this.confirmationObject['text'] = 'Are you sure you want to delete this?';
         this.confirmationObject['buttonText'] = 'OK';
         this.confirmationObject['cancelButtonText'] = 'cancel';
         this.confirmationObject['showCancelButton'] = true;
         this.confirmationObject['action'] = DELETE_DOUBLE_CONFIRMATION;
       }
     //   jQuery('#confirmation-modal-three').modal();
    }

  deleteMultipleJob() {
       if (this.selectdJobs.length <= 0) {
         this.confirmationObject['heading'] = 'Invalid Delete';
         this.confirmationObject['text'] = 'Last job cannot be deleted';
         this.confirmationObject['buttonText'] = 'OK';
         this.confirmationObject['cancelButtonText'] = 'cancel';
         this.confirmationObject['showCancelButton'] = false;
         this.confirmationObject['action'] = NO_ACTION;
       } else {
         this.confirmationObject['heading'] = 'Warning';
         this.confirmationObject['text'] = 'Are you sure you want to delete this?';
         this.confirmationObject['buttonText'] = 'OK';
         this.confirmationObject['cancelButtonText'] = 'cancel';
         this.confirmationObject['showCancelButton'] = true;
         this.confirmationObject['action'] = DELETE_DOUBLE_CONFIRMATION;
       }
    //    jQuery('#confirmation-modal-four').modal();
    }

    zAutomationGridRowClick(event){
      //

      return;
   }
}

