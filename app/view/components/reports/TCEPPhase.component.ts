import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, ViewEncapsulation, Inject } from '@angular/core';
import { TCEPService } from '../../../services/TCEPService.service';
import { Http } from '@angular/http';
import { I18N_MESSAGES } from '../../../utils/messages/messages.en';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GridAction } from '../../../actions/grid.action';
import { GridComponent } from '../grid/grid.component';

import * as GRID_CONSTANTS from '../grid/grid.constant';
import { TCEP_GRID_TYPE, TCEP_GRID_OPTIONS, TCEP_GRID_ROW_COUNT_DEFAULT, TCEP_GRID_PAGINATION }
  from './tcep_grid.constant';

import { LeftNavComponent } from '../common/leftnav/leftnav.component';
import { ZephyrStore } from '../../../store/zephyr.store';
import { Resizable } from '../../../utils/scripts/resizable';
import { ToastrService } from "../../../services/toastr.service";
import { TestCaseEASCycleComponent } from '../testcase-eas/cycle/testcase-eas-cycle.component';
// Constants
import { RELEASE_COMPONENT } from '../release/release.constant';
import { ZEE_NAV_COLUMNS } from '../projects/project_leftnav.data';
import { ProjectAction } from '../../../actions/project.action';
import { RELEASE_SETUP_APPLICATION_ID } from '../admin/customizations/customizations.constant';
import { NEXT_PAGE, PREV_PAGE } from '../common/paginator/paginator.constant';
import { TCEPAction } from '../../../actions/tcep.action';
import { ADMIN_PREFERENCES } from '../admin/admin.constant';

import {
  NOTIFICATION_APP_CONSTANTS,
  NOTIFICATION_ENTITY_CONSTANTS
} from '../../../utils/constants/notification.constants';
import { constructNotificationStoreMetadata } from '../../../utils/notification/notification.util';
import { NotificationStore } from '../../../store/notification.store';
import { NotificationAction } from '../../../actions/notification.action';
import { Observable } from 'rxjs/Rx';

declare var jQuery: any, _, window: any, moment: any;

const NO_ACTION = 'NO_ACTION';
const DELETE_DOUBLE_CONFIRMATION = 'DELETE_DOUBLE_CONFIRMATION';

declare let d3: any;
@Component({
  selector: 'TCEPPhase',
  templateUrl: "TCEPPhase.html",
  providers: [TCEPAction],
  viewProviders: [GridAction, NotificationAction, ProjectAction]
})
export class TCEPPhaseComponent implements OnInit, AfterViewInit, OnDestroy {
  options;
  data;
  gridData;
  id: string;
  title: string;
  category: string;
  isinvokeScript: boolean = false;
  iscreatePkg: boolean = true;
  isDisabled: boolean = true;
  isPrefix: boolean = false;
  navColumns;
  currentProject;
  currentRelease;
  releases;
  startDate: any;
  endDate: any;
  currentPage = 1;
  confirmationObject: any = {};
  zephyrStore;
  releaseModel;
  _tcepGridType = TCEP_GRID_TYPE;
  _columns=[];
  paginationOptions = TCEP_GRID_PAGINATION;
  releaseId;
  projectId;
  isZbotEnabled = true;
  resizable;
  invokeScript: boolean = false;
  manualRun: boolean = true;
  showConfig: boolean = false;
  showConfigDetails: boolean = true;
  unsubscribe;
  isManually = false;
  isDeleteRow;
  appId = NOTIFICATION_APP_CONSTANTS.ZAUTOMATION_APP.name;
  isFromApplyNotification;
  gridPageSize = TCEP_GRID_ROW_COUNT_DEFAULT;
  selectedJobId;
  selectedJob;
  prefixValue = "";
  prefixValueDeb = null;

  public notificationStore;
  public i18nMessages = I18N_MESSAGES;
  public tcepGridData = [];
  public tcepPhaseData;
  public tcepSummaryData = [];
  public contextString = null;
  public phaseId = null;
  public chartKey = "P10";

  private tcepGridColumns = [];
  private automationJobs = [];
  private _releaseId;
  private _automationJobs = [];
  private _rows = [];
  private addZAutomationJob: FormGroup;
  private changeDetectionDebounce;
  private _zephyrStore;

  constructor(private route: ActivatedRoute, private router: Router,
    private _TCEPAction: TCEPAction, private fb: FormBuilder, private _gridAction: GridAction,
    private _notificationAction: NotificationAction, private _projectAction: ProjectAction,
    @Inject(ToastrService) private toastrService: ToastrService) {

    this.gridPageSize = TCEP_GRID_OPTIONS.rowCount;
    this.currentRelease = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`));
    this.releaseId = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`)).id;
    this.projectId = JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)).id;
    this.notificationStore = NotificationStore.getNotificationStore();
    this.zephyrStore = ZephyrStore.getZephyrStore();
    // this.navColumns = ZEE_NAV_COLUMNS;
    this.currentProject = localStorage.getItem(`${window.tab}-currentProject`) ? JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)) : undefined;

    this.route.params.subscribe(
      (params) => {
        this.phaseId = params["id"];
      }
    );

    this.unsubscribe = this.zephyrStore.subscribe(() => {
      let state = this.zephyrStore.getState();
      let adminPrefKeyExecutionStatus = this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV] ?
        JSON.parse(this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV]) : [];
      if (state.tcepReducer.event === 'GET_TCEP_PHASE_FOR_RELEASE_PROJECT') {

          let automationGridRow = state.tcepReducer.automationGrid.rows;

      //  this.tcepSummaryData = state.tcepReducer.automationGrid.rows.keyWords;
        this.tcepPhaseData = state.tcepReducer.automationGrid.rows;
        this.paginationOptions = state.tcepReducer.automationGrid.paginationOptions;

        var dataGridArr = [];

        for (let i = 0; i < state.tcepReducer.automationGrid.rows.childList.length; i++) {
          var myObj = { "name": state.tcepReducer.automationGrid.rows.childList[i].name };

          for (let keyWordsProp in state.tcepReducer.automationGrid.rows.childList[i].keyWords) {
            if (state.tcepReducer.automationGrid.rows.childList[i].keyWords.hasOwnProperty(keyWordsProp)) {
              myObj[keyWordsProp] = state.tcepReducer.automationGrid.rows.childList[i].keyWords[keyWordsProp];
            }
          }

          dataGridArr.push(myObj);
        }

        this.tcepGridData = dataGridArr;

//        this.tcepSummaryData = state.tcepReducer.automationGrid.rows.keyWords;
        var keyObj = [];

        let sortAdminPrefKeyExecutionStatus = adminPrefKeyExecutionStatus.sort(function (a, b) {
        console.log(a);
        console.log(b);
          return (a.id - b.id);
        });


        this.tcepSummaryData=[];
        this._columns =[];

        for(var i=0;i<sortAdminPrefKeyExecutionStatus.length; i++){
        for(let key in automationGridRow.keyWords){
            if(sortAdminPrefKeyExecutionStatus[i].value==key){
              this.tcepSummaryData.push({"key": key, "value": automationGridRow.keyWords[key]});
              this._columns.push({
                 'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
                 'labelId': key,
                 'labelName': key,
                 'labelClass': '',
                 'sortable': true,
                 'sortOptions': {
                   'default': false,
                   'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
                   'isSorted': false,
                   'key': 'name',
                   'reverse': true,
                   'dataType': 'string'
                 },
                 'resizable': false,
                 'fixedSize': '61',
                 'show': true,
                 'min': 61,
                 'flexGrow': 'initial',
                 'defaultSize': 'px',
                 'cellJustification': GRID_CONSTANTS.GRID_CELL_JUSTIFICATION_LEFT,
                 'cell': {
                   'visibility': GRID_CONSTANTS.GRID_CELL_SHOW_ALWAYS,
                   'type': GRID_CONSTANTS.GRID_CELL_TYPES['TEXT'],
                   'actions': [],
                   'key': key
                 }
               });
            }
          }
        }
TCEP_GRID_OPTIONS.columns = this._columns;


        for (let j = 0; j < sortAdminPrefKeyExecutionStatus.length; j++) {
          var seriesArr = [];
          var key = sortAdminPrefKeyExecutionStatus[j].keys;
          var color = sortAdminPrefKeyExecutionStatus[j].colors;
          for (let i = 0; i < this.tcepPhaseData.childList.length; i++) {
            let details = Object.keys(this.tcepPhaseData.childList[i].details).map(key => this.tcepPhaseData.childList[i].details[key]);
            let series = { "x": this.tcepPhaseData.childList[i].name, "y": details[j] };
            seriesArr.push(series);
          }
          keyObj.push({ "key": key, "values": seriesArr, "color": color });
        }
        this.data = keyObj;

      }
    });
  }

  ngOnInit() {
    this.zephyrStore.dispatch(this._TCEPAction.getTCEPPhaseForReleaseAndProject(this.releaseId, this.projectId, this.phaseId, this.chartKey));
    this.options = {
      chart: {
        type: 'multiBarChart',
        height: 350,
        margin: {
          top: 40,
          right: 10,
          bottom: 40,
          left: 10
        },
        clipEdge: true,
        duration: 500,
        stacked: true,
        showControls: false,
        multibar: {
          dispatch: {
            elementClick: () => {
              this.router.navigate(['/reports/1/tcepphase']);
            }
          }
        },
        callback: function (e) { console.log('! callback !'); }
      }
    };
  }

  ngAfterViewInit() {
    this.handleZAutomationSubscriptions();
    this.initResizable();
  }

  initResizable() {
    this.resizable = new Resizable();
    this.resizable.attachResizable(jQuery('.zui-flex-h-resizable'), jQuery('.zui-w-handle'), {
      lockHeight: true,
      minWidth: jQuery('.zui-flex-h-resizable').outerWidth(),
      maxWidth: 500,
    });
  }

  handleZAutomationSubscriptions() {
    let curMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.AUTOMATION, '', '');
    this.notificationStore.dispatch(this._notificationAction.subscribeToTopic(curMeta, '', this.appId));
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  zautoGridPrevClick(value) {
    this.updateGridPageSize(value);
  }

  zautoGridNextClick(value) {
    this.updateGridPageSize(value);
  }

  zautoGridPageSizeChange(value) {
    this.gridPageSize = value;
    this.updateGridPageSize(1);
  }

  zautoGridPaginateByIndex(value) {
    this.updateGridPageSize(value);
  }

  updateGridPageSize(value) {
    this.currentPage = value;
  }

  automationGridIconClick($event) {
    let ev = $event;
    let tr = jQuery(ev.target).closest('.flex-bar')[0],
      _actionType = jQuery(ev.target)[0].dataset.action;
    if (_actionType === 'delete') {
      let row = _.find(this._rows, { id: parseInt(tr.dataset.id, 10) });
      this.isDeleteRow = row.id;

    }
  }

  scheduleJob($event) {
    let ev = $event;
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

  dismissModal() {
    this.prefixValue = "";
    this.prefixValue = jQuery('#prefix-value').val('');
  }

  confirmationActionCall(event) {
    let actionString = event.target.value;

  }
};
