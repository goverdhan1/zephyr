import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, ViewEncapsulation, Inject } from '@angular/core';
import { TCEPService } from '../../../services/TCEPService.service';
import { Http } from '@angular/http';
import { I18N_MESSAGES } from '../../../utils/messages/messages.en';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GridAction } from '../../../actions/grid.action';
import { GridComponent } from '../grid/grid.component';
import { DecimalPipe } from '@angular/common';

import * as GRID_CONSTANTS from '../grid/grid.constant';
import { TCEP_GRID_TYPE, TCEP_GRID_OPTIONS, TCEP_GRID_COLUMNS, TCEP_GRID_ROW_COUNT_DEFAULT, TCEP_GRID_PAGINATION }
  from './tcep_grid.constant';

import { LeftNavComponent } from '../common/leftnav/leftnav.component';
import { ZephyrStore } from '../../../store/zephyr.store';
import { Resizable } from '../../../utils/scripts/resizable';
import { ToastrService } from "../../../services/toastr.service";
import { TestCaseEASCycleComponent } from '../testcase-eas/cycle/testcase-eas-cycle.component';

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
declare let d3: any;

const NO_ACTION = 'NO_ACTION';
const DELETE_DOUBLE_CONFIRMATION = 'DELETE_DOUBLE_CONFIRMATION';

@Component({
  selector: 'TCEPGraph',
  templateUrl: "TCEPGraph.html",
  providers: [TCEPAction],
  viewProviders: [GridAction, NotificationAction, ProjectAction]
})

export class TCEPGraphComponent implements OnInit, AfterViewInit, OnDestroy {
  options;
  data;
  gridData;
  id: string;
  title: string;
  category: string;
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
  _columns = [];
  paginationOptions = TCEP_GRID_PAGINATION;
  releaseId;
  projectId;
  chartKey = "P10";
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
  public tcepGraphData = [];
  public tcepSummaryData = [];
  public contextString = [];

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

    this.unsubscribe = this.zephyrStore.subscribe(() => {
      let state = this.zephyrStore.getState();
      var adminPrefKeyExecutionStatus = this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV] ?
        JSON.parse(this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV]) : [];
      if (state.tcepReducer.event === 'GET_TCEP_CYCLE_FOR_RELEASE_PROJECT') {
        if (state.tcepReducer.automationGrid.rows.length > 0) {
          let automationGridRow = state.tcepReducer.automationGrid.rows[0];
          this.paginationOptions = state.tcepReducer.automationGrid.paginationOptions;
          this.tcepGraphData = state.tcepReducer.automationGrid.rows;
          this.contextString = automationGridRow.childList;
          var dataGridArr = [];
          for (let i = 0; i < automationGridRow.childList.length; i++) {
            let dataGridArrItem = { "name": automationGridRow.childList[i].name };
            for (let keyWordsProp in automationGridRow.childList[i].keyWords) {
              if (automationGridRow.childList[i].keyWords.hasOwnProperty(keyWordsProp)) {
                dataGridArrItem[keyWordsProp] = automationGridRow.childList[i].keyWords[keyWordsProp];

              }
            }
            for (let keyWordsProp in automationGridRow.childList[i].details) {

            if (automationGridRow.childList[i].details.hasOwnProperty(keyWordsProp)) {
              dataGridArrItem[keyWordsProp] = automationGridRow.childList[i].details[keyWordsProp];
            }
          }

            dataGridArr.push(dataGridArrItem);
          }

          this.tcepGridData = dataGridArr;
          var keyObj = [];

          let sortAdminPrefKeyExecutionStatus = adminPrefKeyExecutionStatus.sort(function (a, b) {
            return (a.id - b.id);
          });
          this.tcepSummaryData=[];
          this._columns =[];

          console.log(adminPrefKeyExecutionStatus);

          for(var i=0; i<adminPrefKeyExecutionStatus.length; i++){
          for(let key in automationGridRow.keyWords){
              if(adminPrefKeyExecutionStatus[i].value==key){
                this.tcepSummaryData.push({"key": key, "value": automationGridRow.keyWords[key]});
                this._columns.push({
                   'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
                   'labelId': key,
                   'labelName': key + " %",
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

            if(adminPrefKeyExecutionStatus[i].value=="Not Executed"){
            this.tcepSummaryData.push({"key": "Not Executed", "value": automationGridRow.keyWords["Change Status"]});
            this._columns.push({
               'labelType': GRID_CONSTANTS.GRID_LABEL_TYPE_TEXT,
               'labelId': "Change Status",
               'labelName': 'Change Status %',
               'labelClass': '',
               'sortable': true,
               'sortOptions': {
                 'default': false,
                 'order': GRID_CONSTANTS.GRID_CELL_SORT_DESC,
                 'isSorted': false,
                 'key': 'Change Status',
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
                 'key': 'Change Status'
               }
             });
            }


          }
          TCEP_GRID_OPTIONS.columns = this._columns;

          for (var i = 0; i < adminPrefKeyExecutionStatus.length; i++) {
            var seriesArr = [];
            for (var j = 0; j < this.tcepGraphData[0].childList.length; j++) {
              for(var key in this.tcepGraphData[0].childList[j].details){
              if(adminPrefKeyExecutionStatus[i].id == key)
              var series = { "x": adminPrefKeyExecutionStatus[i].value, "y": this.tcepGraphData[0].childList[j].details[key] };
              }
            seriesArr.push(series);
            }
            keyObj.push({ "key": adminPrefKeyExecutionStatus[i].value, "values": seriesArr, "color": adminPrefKeyExecutionStatus[i].color });
          }
          this.data = keyObj;



        }
      }
    });
  }

  ngOnInit() {
    this.zephyrStore.dispatch(this._TCEPAction.getTCEPCycleForReleaseAndProject(this.releaseId, this.projectId, this.chartKey));
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
            elementClick: (e) => {
              let contextStr = this.contextString[e.index].contextString.split(":")[1];
              this.router.navigate(['/reports/1/tcepphase/' + contextStr]);
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
