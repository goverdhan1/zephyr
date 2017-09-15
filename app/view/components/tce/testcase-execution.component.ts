import {
  Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef,
  Inject, ViewChild
} from '@angular/core';

import {Router, Routes, ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs/Rx';
import {Http} from '@angular/http';

import * as EXPORT_CONSTANTS from '../common/export/export.constant';

//import TreeComponent from '../common/tree/tree.component';
import {Resizable} from '../../../utils/scripts/resizable';
import {TestcaseExecutionAction} from '../../../actions/testcaseExecution.action';
import {TestcaseEASAction} from '../../../actions/testcaseEAS.action';
import {DefectsAction} from '../../../actions/defects.action';
import {TCE_BULK_OPERATION_OPTIONS, TCE_BULK_OPERATION} from './operations/tce_operations.constant';
import {GridComponent} from '../grid/grid.component';
import {InlineRowsEditComponent} from '../inline_edit/inline_rows_edit.component';
import {BreadCrumbComponent} from '../common/breadcrumb/bread_crumb.component';
import {ReleaseAction} from '../../../actions/release.action';
import {GridAction} from '../../../actions/grid.action';
import {GlobalAction} from '../../../actions/global.action';
import {ReportAction} from '../../../actions/report.action';
import {TestcaseAction} from '../../../actions/testcase.action';

import {ZEE_NAV_COLUMNS} from '../projects/project_leftnav.data';
import { ADMIN_PREFERENCES } from '../../components/admin/admin.constant';
import {TCE_GRID_TYPE, TCE_GRID_OPTIONS, GRID_ROW_COUNT_DEFAULT, TCE_GRID_PAGINATION, TCE_SEARCH_GRID_TYPE} from './tce_grid.constant';
import {FETCH_EXECUTIONS_SUCCESS, FETCH_SCHEDULE_PATH_SUCCESS,
  FETCH_EXECUTIONS_AFTER_DEFECT_LINK_SUCCESS,GET_CYCLE_PHASE_NAME_SUCCESS,
  ALL_TESTSTEPS_HAVE_SAME_STATUS} from '../../../utils/constants/action.events';

import {NEXT_RECORD, PREV_RECORD, NEXT_PAGE, PREV_PAGE} from '../common/paginator/paginator.constant';
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';

import {Templates} from '../../../utils/scripts/templates';

import {ZephyrStore} from '../../../store/zephyr.store';
import {UtililtyFunctions} from '../../../utils/scripts/utils';
import {NotificationAction} from '../../../actions/notification.action';
import {NotificationStore} from '../../../store/notification.store';
import {
  NOTIFICATION_APP_CONSTANTS,
  NOTIFICATION_ENTITY_CONSTANTS
} from '../../../utils/constants/notification.constants';
import {constructNotificationStoreMetadata} from '../../../utils/notification/notification.util';
import { TceBulkOperationsComponent } from './operations/tce_bulk_operations.component';

import {GridActionsPipe} from '../../pipes/grid_actions.pipe';
import {REQ_COVERAGE_GRID_TYPE, TCE_REQ_COVERAGE_GRID_TYPE} from "../requirements/req_grid.constant";
import {CoverageGridComponent} from "../common/coverage-grid/coverage-grid.component";
import {DomSanitizer} from "@angular/platform-browser";

declare var jQuery: any, moment: any, _: any, window: any, $:any;

var tcexecSelf:any = null;
const SYNC = 'SYNC';
const SYSTEM_TYPE_4 = 4;
const ANYONE_USER_ID = -10;
const CHANGE_STATUS_EXECUTION_ID = 10;
const EXECUTION_STATUS_PASS_ID = '1';


@Component({
  selector: 'testcase-execution',
  viewProviders: [TestcaseExecutionAction, TestcaseEASAction, ReleaseAction, GridAction, GlobalAction, NotificationAction, ReportAction, DefectsAction, TestcaseAction],
  templateUrl: 'testcase-execution.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class TestcaseExecutionComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(TceBulkOperationsComponent) bulkComp: TceBulkOperationsComponent;
    @ViewChild(GridComponent) tceGrid: GridComponent;
    @ViewChild(CoverageGridComponent) coverageComponent: any;
    lastTestCaseId = null;
    firstClick = true;
    timeoutThreshold;
    error: boolean = false;
    zephyrStore;
    notificationStore;
    unsubscribe;
    testcaseId;
    scheduleId;
    testId;
    lastEvent = '';
    rowClicked = false;
    selectedTreeNodeName;
    lastRow = -1;
    coverageRequirementIds = [];
    indexedDB = {};
    isPanelCollapsed = false;
    _isMobile= false;
    selectedGridType = TCE_GRID_TYPE;
    _reqGridType = TCE_REQ_COVERAGE_GRID_TYPE;

    treeData: {};
    currentRecord: number = 1;
    totalRecords: number = 1;
    lastParams;
    cycleResponse;
    build;
    environment;
    phaseResponse;
    navColumns;
    releases;
    activeItemKey: string;
    phaseIds;
    tceGridColumns;
    tceGridRows;
    isFirstPage;
    isLastPage;
    fetchedCycleData: boolean = false;
    nodeStats:any = {};
    releaseId;
    paginationOptions;
    currentPage;
    noData;
    isMenuShown = true;
    allExecutionIds = [];
    selectedTctIds = [];
    selectedTestcaseIds = [];
    executionIds = [];
    testcaseAttachmentId;
    attachmentEntityType;
    loggedInUserId;
    resizable;
    _adminPrefKeyExecutionStatus;
    statuses;
    statusSelectEditOptions = {};
    cyclePhaseId;
    _phaseId;
    _prevCyclePhaseId;
    _prevReleaseId;
    _prevRtsId;
    _prevTestcaseId;
    _treeId;
    _prevTreeId;
    _tcId;
    rtsId;
    rtsRow;
    appId;
    invalidClick;
    _currentNode;
    isFromApplyNotification;
    _pageFromNotification;
    _schedulePathFetch=false;
    _treeFetch=false;
    fieldOptions;
    toggleForDetails = true;
    isSearchView = false; // Intially folder tree view is displayed
    inRelease = true;
    searchOffset = 0;
    searchText = '';
    confirmationObject = {};
    isAdvancedSearch;
    syncNodeData;
    currentRelease;
    defectSyncMessages = {};
    syncClicked = false;
    paramSub;
    totalRowCount;
    areTceDetailsEnabled = false; // to disable some details in tce details
    areExecDetailsEnabled = true;
    statusAllTestSteps;
    testcaseStatusDropdown;
    testcaseStatusDropdownFinalValue;
    httpEndSubscriber: Subscription;
    changeDetectionDebounce;
    selectedTreeNode;
    exportPrefix = '';
    gridPageSize;
    releaseTime;
    isReleasesLoaded;
    _tceGridType = TCE_GRID_TYPE;
    _tceSearchGridType = TCE_SEARCH_GRID_TYPE;
    i18nMessages = I18N_MESSAGES;
    gridPipe;
    summaries = [
      {name: 'All Related Executions with probable Failure',
        key: 'totaltc',
        class: 'summarybox-executions', count: 0},
      {name: 'Related Executions with over 90% Failure rate',
        key: 'tcCount90',
        class: 'summarybox-testcases', count: 0}];
    relatedTc = {tcid:0};
    relatedExec;
    queryParams;
    constructor (public router: Router, private _testcaseExecutionAction: TestcaseExecutionAction,
                  private _testcaseEASAction: TestcaseEASAction, private route: ActivatedRoute,
                  private _releaseAction: ReleaseAction,  private _gridAction: GridAction,
                  private _globalAction:GlobalAction, private _notificationAction:NotificationAction,
                  private _reportAction : ReportAction, private _defectsAction : DefectsAction,
                  private sanitizer : DomSanitizer,
                  private _testcaseAction : TestcaseAction, private cdr: ChangeDetectorRef, @Inject(Http) private _http : any) {


        this.navColumns = ZEE_NAV_COLUMNS;
        this.appId = NOTIFICATION_APP_CONSTANTS.TCE_APP.name;
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.notificationStore = NotificationStore.getNotificationStore();
        let tceBulkOptions = TCE_BULK_OPERATION_OPTIONS;
        this.fieldOptions = tceBulkOptions['export'];
        this.fieldOptions['maxSize'] = this.totalRowCount;

        this.gridPipe = new GridActionsPipe(sanitizer);
        this.gridPageSize = TCE_GRID_OPTIONS.rowCount;

        this.paramSub = this.route.params.subscribe(params => {
            this.releaseId = params['id'];

            this.setReleases(0);

            this.handleCycleSubscriptions();
            this.setURLParams(params);
            if(this.isSearchView) {
              this.fetchExecutionsOnSearch(this.searchText, '');
            }

        });

        this.activeItemKey = 'testcase-execution';
        let state = this.zephyrStore.getState();
        this.loggedInUserId = state.loggedInUser.id;
        this.zephyrStore.dispatch(this._testcaseExecutionAction.clearGridData('TCE_GRID'));

        // Initial call to get export_tce_node metadata
        this.zephyrStore.dispatch(this._reportAction.getReportTemplate(EXPORT_CONSTANTS['CUSTOM_REPORT_TYPE_TCE']));
        let utililtyFunction = new UtililtyFunctions();
        this.statusSelectEditOptions['templateSelection'] = utililtyFunction.statusSelectSelectedOptionTemplateFunction;
        this.statusSelectEditOptions['templateResult'] = utililtyFunction.statusSelectTemplateFunction;
        // this.testcaseId = '';
        this.currentRelease = localStorage.getItem(`${window.tab}-currentRelease`) && JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`));
        this.defectSyncMessages = {
          'success' : 'Sync completed successfully',
          'failure' : 'Sync failed'
        };
        this.unsubscribe = this.zephyrStore.subscribe(() => {
          this.onStateChange(state);
        });

        tcexecSelf = this;

        this.httpEndSubscriber = this._http.httpCallCompletedObservable.subscribe(() => {
          let selector = null;

          if (this.lastTestCaseId) {

              setTimeout(() => {
                let index = _.findIndex(this.tceGridRows, {id: parseInt(this.lastTestCaseId)});

                if (index !== -1) {

                  if (this.isSearchView) {
                    selector = `#grid-table-tce_search .flex-bar:nth-child(${index + 1})`;
                  } else {
                    selector = `#grid-table-tce .flex-bar:nth-child(${index + 1})`;
                  }

                }

                let grid_row =  jQuery(selector).trigger('click')[0];

                if (grid_row) {
                  grid_row.scrollIntoView(false);
                }

              }, 501);

          } else if (this.lastEvent === 'NEXT') {

            if (this.isSearchView) {
              selector = `#grid-table-tce_search .flex-bar:first`;
            } else {
              selector = `#grid-table-tce .flex-bar:first`;
            }

          } else if (this.lastEvent === 'PREV') {

            if (this.isSearchView) {
              selector = `#grid-table-tce_search .flex-bar:last`;
            } else {
              selector = `#grid-table-tce .flex-bar:last`;
            }

          }

          if (this.lastRow !== -1) {
            if (this.isSearchView) {
              selector = `#grid-table-tce_search .flex-bar:nth-child(${this.lastRow + 1})`;
            } else {
              selector = `#grid-table-tce .flex-bar:nth-child(${this.lastRow + 1})`;
            }
          }

          if (selector) {
            setTimeout(() => {
              let grid_row =  jQuery(selector).trigger('click')[0];
              if (grid_row) {
                grid_row.scrollIntoView(false);
              }
            }, 501);
          }

          this.lastEvent = '';
          this.lastRow = -1;
        });

    }

    onStateChange(state) {
        if (this.timeoutThreshold) {
          clearTimeout(this.timeoutThreshold);
        }

        this.timeoutThreshold = setTimeout(() => {
          this.isReleasesLoaded = state.tcr.isReleasesLoaded;
          this.setLeftNavData(this.zephyrStore.getState());
          this.buildExecutionCycle();
          this._adminPrefKeyExecutionStatus = this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV] ?
            JSON.parse(this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV]) : [];
          if(this._adminPrefKeyExecutionStatus) {
            jQuery('.select-exec-status select').select2({ placeholder: 'Select Status' });
            this.getStatusArray();
          }

          this.tceGridColumns = state.tce.tceGrid.columns;
          this.paginationOptions = state.tce.tceGrid.paginationOptions;
          this.currentPage = state.tce.tceGrid.currentPage;
          this.noData = state.tce.tceGrid.noData;
          this.gridPageSize = state.tce.tceGrid.size;

          let tempRelatedTc = state.tce.relatedTc;
          if(!this.isSearchView && state.tce.tceGrid.rows && state.tce.tceGrid.rows.length && state.tce.tceGrid.rows[0].testcase) {
            if(Object.keys(tempRelatedTc).length && tempRelatedTc.tcid != 0) {
              this.relatedTc = tempRelatedTc;
            }
            if(Object.keys(this.relatedTc).length && this.relatedTc.tcid != 0) {
              this.summaries = this.summaries.map(summary => {
                if(summary.key == 'tcCount90') {
                  summary['count'] = this.relatedTc['data'][90].length;
                } else {
                  summary['count'] = this.relatedTc[summary.key];
                }
                return summary;
              });
              let tempRow = state.tce.tceGrid.rows.filter(row => row.testcase.id == tempRelatedTc.tcid);
              this.relatedExec = tempRelatedTc.tcid + ' - ' + tempRow[0].testcase.name.substring(0,85) + '... ';
            }
          }

          setTimeout(() => {
            this.triggerChange();
          }, 100);

          if(!(state.tce.tceGrid.rows && state.tce.tceGrid.rows.length && !this.isSearchView)) {
            this.tceGridRows = state.tce.tceGrid.rows;

            // this.testcaseId = null;
            // clearTimeout(this.selectFirstRowTimeout);

            // this.selectFirstRowTimeout = setTimeout(() => {
            //   jQuery('#grid-table-tce_search .flex-bar:first').click();
            // }, 100);

            if (this.isSearchView) {
              this.totalRowCount = state.tce.tceGrid.totalCount;
              this.fieldOptions['maxSize'] = this.totalRowCount;
            }

          } else if(!this.invalidClick) {
            if(!this.isSearchView) {
              this.tceGridRows = state.tce.tceGrid.rows.filter(row => row.testcase.testerId === this.loggedInUserId || row.testcase.testerId === -10);
            } else {
              this.tceGridRows = state.tce.tceGrid.rows;
            }
            this.totalRowCount = state.tce.tceGrid.totalCount;
            this.fieldOptions['maxSize'] = this.totalRowCount;

          }

          if(this.isSearchView) {
            if(!state.tce.tceGrid.rows && !state.release.releases) {
              return;
            }
          }

          this.releases = this.zephyrStore.getState().release.releases;
          this.setReleasesDropdown(this.releases);

          // check if cycleResponse updated
          if(this.nodeStats != undefined) {
            // check if cycleResponse updated
            if(this.nodeStats['nodeType']){
              this.setBuildEvrmntDetails(this.nodeStats);
            }
          }
          let event = this.zephyrStore.getState().tce.event;
          if(event == FETCH_SCHEDULE_PATH_SUCCESS) {
            this.zephyrStore.dispatch(this._testcaseExecutionAction.clearEventExecution('FETCH_SCHEDULE_PATH_SUCCESS'));
            if(state.tce['schPaths']) {
              let index = state.tce['schPaths']['index'];
              this._pageFromNotification = Math.floor(index / this.gridPageSize) + 1;
              this._schedulePathFetch = true;
              this.navigateScheduleOnNotification();
            }
          }
          if(event == 'UPDATE_EXECUTION') {
            this.clearingSelectedTestcases();
            this.zephyrStore.dispatch(this._testcaseExecutionAction.clearEventExecution('UPDATE_EXECUTION'));
          }
          if (event === FETCH_EXECUTIONS_SUCCESS) {
            this.zephyrStore.dispatch(this._testcaseExecutionAction.clearEventExecution(FETCH_EXECUTIONS_SUCCESS));
            var that = this;
            setTimeout(() => {
              // jQuery('#grid-table-tce .flex-bar:first').trigger('click');
              jQuery('body').popover({
                placement : 'left',
                trigger : 'hover',
                selector: '.defect-detail-popover',
                html: true,
                content: function() {
                  let tceGridRowsData = that.zephyrStore.getState().tce.tceGrid.rows;
                  let bugId = jQuery(this).text().trim();
                  let index = jQuery(this).closest('.flex-bar').data('index');
                  if (undefined === index) {
                    index = jQuery('#grid-table-tce').find(`.flex-bar[data-id=${that.testcaseId || 0}]`).data('index');
                  }
                  if (_.isNumber(index)) {
                    let defectsArray = tceGridRowsData[index].testcase.defects.defects;
                    let popoverContent = defectsArray.filter(defectObj => defectObj.externalId == bugId);
                    let templates = new Templates();
                    return jQuery('<div></div>').html(templates.defectPopoverInTce(popoverContent[0]));
                  }
                  return '';
                }
              });
            }, 50);
          }
          if(this.zephyrStore.getState().testcase.event == 'UPDATE_SINGLE_TEST_STEP_RESULT') {
            this.repaintGrid();
            this.zephyrStore.dispatch((this._testcaseAction.clearFetchTestcasePath()));
          }
          if (this.zephyrStore.getState().testcase.event == ALL_TESTSTEPS_HAVE_SAME_STATUS) {
            this.repaintGrid();
            this.zephyrStore.dispatch((this._testcaseAction.clearFetchTestcasePath()));
            jQuery('#execute-testcase-tce').modal();
            this.testcaseStatusDropdown = [''];
            this.statusAllTestSteps = this.mappingStepStatus(this.zephyrStore.getState().testcase.teststep.steps[0].stepResults &&
              this.zephyrStore.getState().testcase.teststep.steps[0].stepResults.status);
            let statusAllTestSteps = this.statusAllTestSteps;
            let testcaseStatusDropdown = this._adminPrefKeyExecutionStatus.filter(statusObject => statusObject.value.trim().toLowerCase() === statusAllTestSteps.trim().toLowerCase() && statusObject.active == 'true');
            setTimeout(()=>{
              if (testcaseStatusDropdown.length > 0) {
                this.testcaseStatusDropdown = [testcaseStatusDropdown[0].id];
              } else {
                this.testcaseStatusDropdown = [EXECUTION_STATUS_PASS_ID]; //Always selecting the PASS status
              }
              this.testcaseStatusDropdownFinalValue = this.testcaseStatusDropdown[0];
              this.zephyrStore.dispatch(this._testcaseAction.clearFetchTestcasePath());
            });
          }

          if(event === FETCH_EXECUTIONS_AFTER_DEFECT_LINK_SUCCESS) {
            this.zephyrStore.dispatch(this._testcaseExecutionAction.clearEventExecution(FETCH_EXECUTIONS_AFTER_DEFECT_LINK_SUCCESS));
            this.zephyrStore.dispatch(this._testcaseExecutionAction.sortTceGridSaved());
            var that = this;
            setTimeout(() => {
              jQuery('body').popover({
                placement : 'left',
                trigger : 'hover',
                selector: '.defect-detail-popover',
                html: true,
                content: function() {
                  let tceGridRowsData = that.zephyrStore.getState().tce.tceGrid.rows;
                  let bugId = jQuery(this).text().trim();
                  let index = jQuery(this).closest('.flex-bar').data('index');
                  if (undefined === index) {
                    index = jQuery('#grid-table-tce').find(`.flex-bar[data-id=${that.testcaseId || 0}]`).data('index');
                  }
                  if (_.isNumber(index)) {
                    let defectsArray = tceGridRowsData[index].testcase.defects.defects;
                    let popoverContent = defectsArray.filter(defectObj => defectObj.externalId == bugId);
                    let templates = new Templates();
                    return jQuery('<div></div>').html(templates.defectPopoverInTce(popoverContent[0]));
                  }
                  that.zephyrStore.dispatch(this._testcaseExecutionAction.sortTceGridSaved());
                  return '';
                }
              });
            }, 10);
          }

          if (event === 'SORT_TCE_GRID') {
            let selector = null;

            if (this.isSearchView) {
              selector = `#grid-table-tce_search .flex-bar:first`;
            } else {
              selector = `#grid-table-tce .flex-bar:first`;
            }

            setTimeout(() => {
              let grid_row =  jQuery(selector).trigger('click')[0];
              if (grid_row) {
                grid_row.scrollIntoView(false);
              }
            }, 501);

            this.zephyrStore.dispatch(this._testcaseExecutionAction.clearEventExecution(FETCH_EXECUTIONS_AFTER_DEFECT_LINK_SUCCESS));
          }


          this.triggerChange();
        }, 100);
    }

  //Putting Repaint into a function
  repaintGrid() {
    jQuery('grid').find('.grid-content').css({display: 'none'});
    setTimeout(() => {
      jQuery('grid').find('.grid-content').css({display: 'block'});
    });
  }
  getCycleId(targetEle) {
    while (jQuery(targetEle[0]).data('node')) {
      if(jQuery(targetEle[0]).data('node') === 'cycle') {
        return targetEle;
      }
      targetEle = jQuery(targetEle[0]).closest('ul').siblings('a');
    }
    return false;
  }

  setBuildEvrmntDetails(node) {
    switch(node.nodeType) {
      case 'cycle' :
        let i;
        for(i = 0; i < this.cycleResponse.length; i++) {
          if(this.cycleResponse[i]['name']=== this.nodeStats.nodeName ){
            if(this.cycleResponse[i]['build']){
              this.build = this.cycleResponse[i]['build'];
            }
            if(this.cycleResponse[i]['environment']){
              this.environment = this.cycleResponse[i]['environment'];
            }
            break;
          }
        }
        break;
      case 'phase' :
      case 'Module':
        let nodeEle = jQuery('a[data-tcrCatalogTreeId="'+ node.tcrCatalogTreeId +'"][data-id="'+ node.dataId +'"]').closest('ul').siblings('a');
        let cycleNode = this.getCycleId(nodeEle);
        if(cycleNode && cycleNode.length) {
          let match = this.cycleResponse.filter(cycle => cycle.id === jQuery(cycleNode[0]).data('id'));
          if(match && match.length) {
            this.build = match[0].build;
            this.environment = match[0].environment;
          }
        }

        break;
      default :
    }
  }

  setReleases(counter) {

    if (this.isReleasesLoaded) {
      this.setReleaseData();
    } else {
      if (counter > 10) {
        return;
      }
      this.releaseTime = setTimeout(() => {
        this.setReleases(++counter);
      }, 50);
    }
  }

  setReleaseData() {
    if (!localStorage.getItem(`${window.tab}-currentRelease`)) {
      let releases = JSON.parse(localStorage.getItem('releases'));

      if (!releases) {
        let state = this.zephyrStore.getState();
        this.router.navigate(['/project', state.projects.userAllocatedProjects[0]]);
      } else {
        let release = releases.filter(rel => rel.id == this.releaseId);
        localStorage.setItem(`${window.tab}-currentRelease`, JSON.stringify(release));
      }
    }
  }

    handleCycleSubscriptions() {
        if(this.releaseId && this.appId) {
            let curMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.CYCLE,'',this.releaseId);
            let prevMeta;
            if(this._prevReleaseId) {
                prevMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.CYCLE,'',this._prevReleaseId);
            }
            this._prevReleaseId = this.releaseId;
            this.notificationStore.dispatch(this._notificationAction.subscribeToTopic(curMeta,prevMeta,this.appId));
        }
    }

    handleStepSubscription() {
        if(this.rtsId && this.appId) {
          let rtsIdList = [];
          rtsIdList[0] = this.rtsId;
          let curMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.EXECUTION_RESULT,this.rtsId,'','',false,rtsIdList);
          let prevMeta;
          if(this._prevRtsId) {
            rtsIdList = [];
            rtsIdList[0] = this._prevRtsId;
            prevMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.EXECUTION_RESULT,
                this._prevRtsId,'','',false,rtsIdList);
          }
          this._prevRtsId = this.rtsId;
          this.notificationStore.dispatch(this._notificationAction.subscribeToTopic(curMeta,prevMeta,this.appId));
        }
        if(this.testId && this.appId) {
            let curMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTSTEP,this.testId,'');
            let prevMeta;
            if(this._prevTestcaseId) {
              prevMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTSTEP,this._prevTestcaseId,'');
            }
            this._prevTestcaseId = this.testId;
            this.notificationStore.dispatch(this._notificationAction.subscribeToTopic(curMeta,prevMeta,this.appId));
        }
    }

    handleTreeSubscription() {
        if(this._phaseId && this.appId) {
            let curMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.ASSIGNMENT_TREE,this._phaseId,'');
            let prevMeta;
            if(this._prevCyclePhaseId) {
              prevMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.ASSIGNMENT_TREE,this._prevCyclePhaseId,'');
            }
            this._prevCyclePhaseId = this._phaseId;
            this.notificationStore.dispatch(this._notificationAction.subscribeToTopic(curMeta,prevMeta,this.appId));
        }
    }

    handleExecutionSubscription() {
        if(this._treeId && this.appId) {
            let curMeta1 = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTCASE,this._treeId,'');
            let curMeta2 = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.EXECUTION,this._treeId,'');
            let prevMeta1;
            let prevMeta2;
            if(this._prevTreeId) {
              prevMeta1 = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTCASE,this._prevTreeId,'');
              prevMeta2 = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.EXECUTION,this._prevTreeId,'');
            }
            this._prevTreeId = this._treeId;
            this.notificationStore.dispatch(this._notificationAction.subscribeToTopic(curMeta1,prevMeta1,this.appId));
            this.notificationStore.dispatch(this._notificationAction.subscribeToTopic(curMeta2,prevMeta2,this.appId));
        }
    }

    handleExecutionUnSubscription() {
        if(this._treeId && this.appId) {
            let curMeta1 = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTCASE,this._treeId,'');
            let curMeta2 = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.EXECUTION,this._treeId,'');
            this.notificationStore.dispatch(this._notificationAction.unSubscribeFromTopic(curMeta1,this.appId));
            this.notificationStore.dispatch(this._notificationAction.unSubscribeFromTopic(curMeta2,this.appId));
            this._treeId = '';
        }
    }

    handleUnsubscriptions() {
        if(this.releaseId && this.appId) {
            let curMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.CYCLE,'',this.releaseId);
            this.notificationStore.dispatch(this._notificationAction.unSubscribeFromTopic(curMeta,this.appId));
            this.notificationStore.dispatch(this._notificationAction.discardAppNotifications(this.appId));
        }
        if(this._treeId && this.appId) {
            let curMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTCASE,this._treeId,'');
            this.notificationStore.dispatch(this._notificationAction.unSubscribeFromTopic(curMeta,this.appId));
            curMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.EXECUTION,this._treeId,'');
            this.notificationStore.dispatch(this._notificationAction.unSubscribeFromTopic(curMeta,this.appId));
        }
        if(this._phaseId && this.appId) {
            let curMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.ASSIGNMENT_TREE,this._phaseId,'');
            this.notificationStore.dispatch(this._notificationAction.unSubscribeFromTopic(curMeta,this.appId));
        }
        if(this.rtsId && this.appId) {
            let rtsIdList = [];
            rtsIdList[0] = this.rtsId;
            let curMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.EXECUTION_RESULT,
                this.rtsId,'','',false,rtsIdList);
            this.notificationStore.dispatch(this._notificationAction.unSubscribeFromTopic(curMeta,this.appId));
        }
        if(this.testId && this.appId) {
            let curMeta = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTSTEP,this.testId,'');
            this.notificationStore.dispatch(this._notificationAction.unSubscribeFromTopic(curMeta,this.appId));
        }
    }

    ngOnInit() {
        this.zephyrStore.dispatch(this._testcaseExecutionAction.getExecutionCycleTree(this.releaseId));
        this.getReleaseDetails();
    }

    ngOnDestroy() {
        this.handleUnsubscriptions();
        jQuery('.popover').popover('hide');
        this.unsubscribe();
    }

    ngAfterViewInit() {
        this.resizable = new Resizable();
        // this.resizable.attachResizable(jQuery('.zui-flex-h-resizable'), jQuery('.zui-w-handle'), {
        //     lockHeight: true,
        //     minWidth: jQuery('.zui-flex-h-resizable').outerWidth(),
        //     maxWidth: 500,
        // });

        this.resizable.attachResizable(jQuery('.zui-flex-v-resizable'), jQuery('.zui-s-handle'), {
            lockWidth: true,
            maxHeight: 600
        });
        this.resizable.attachResizable(jQuery('#tce-h-resizer'), jQuery('#tce-h-resizer-handle'), {
            lockHeight: true,
            minWidth: jQuery('#tce-h-resizer').outerWidth(),
            maxWidth: 500,
        });
        this.triggerChange();
    }

  applyNotifications(ev) {
      this._pageFromNotification = '';
      this.isFromApplyNotification = '';
      this._treeFetch = false;
      this._schedulePathFetch = false;
      this.zephyrStore.dispatch(this._testcaseExecutionAction.clearGridData('TCE_GRID'));
      this.isFromApplyNotification = 'NOTIFICATION_START';
      this.zephyrStore.dispatch(this._testcaseExecutionAction.getExecutionCycleTree(this.releaseId));
      this.getReleaseDetails();
      if(this.rtsId) {
          this.zephyrStore.dispatch(this._testcaseExecutionAction.fetchExecutionPathBySchID(this.rtsId, this.loggedInUserId));
      }
      this.notificationStore.dispatch(this._notificationAction.applyNotification(this.appId,true));
  }

    // enableEditableFields() {
    //     this.isEditableField = !this.isEditableField;
    // }

    navigateScheduleOnNotification() {
        if(this._treeFetch && this._schedulePathFetch && this._pageFromNotification) {
          setTimeout(() => {
            this.gotoTCEPage(this._pageFromNotification);
            this._pageFromNotification = '';
            setTimeout(() => {
              jQuery('#grid-table-tce .flex-bar[data-id="' + this._tcId + '"]').trigger('click');
            }, 100);
          },20);
          this._treeFetch = false;
          this._schedulePathFetch = false;
        }
    }

    gotoTCEPage(value) {
      this.currentPage = value;

      let params = {
        pageSize: this.gridPageSize,
        offset: this.gridPageSize * (this.currentPage - 1),
        parentid: (this.nodeStats['nodeType'] == 'Module') ? this.nodeStats && this.nodeStats['dataId'] : this.nodeStats && this.nodeStats['tcrCatalogTreeId'],
        currentPage: this.currentPage,
        testerid: this.loggedInUserId,
        dbsearch: true
      };

      if(this.isSearchView) {
        this.searchOffset = params.offset;
        this.fetchExecutionsOnSearch(this.searchText, '');
      } else {
        this.zephyrStore.dispatch(this._gridAction.tcePaginationRequest(params, TCE_GRID_TYPE.toUpperCase() + '_GRID', 'NEXT'));
      }
    }

    buildExecutionCycle() {
        this.phaseIds = [];
        this.cycleResponse = this.zephyrStore.getState().tce.cycles;
        if(!this.isFromApplyNotification) {
            this.treeData = this.zephyrStore.getState().tce.treeData;
        } else {
          let data = this.zephyrStore.getState().tce.treeData;
          data.redrawTree = false;
          this.treeData = data;
          if(this.selectedTreeNode && this.isFromApplyNotification == 'NOTIFICATION_START') {
              this.isFromApplyNotification = 'NOTIFICATION_EXEC_FETCH';
              this.onNodeClick(this._currentNode);
              this._treeFetch = true;
              this.navigateScheduleOnNotification();
          }
        }
    }

    showTestcaseCoverage(event) {
      let index = jQuery(event.target).parents(".flex-bar").index();
      this.coverageRequirementIds = this.tceGridRows[index]['testcase']['requirementIds'];

      setTimeout(() => {
        jQuery('#zee-coverage-modal').modal('show');

        if (this.coverageComponent) {
          this.coverageComponent.ngOnChanges();
        }
      }, 100);
    }

    tceGridColumnChooserClick(target) {
        let targetTag = target.tagName.toUpperCase();

        if(targetTag !== 'LABEL' && targetTag !== 'INPUT') {
            return;
        }
        if(targetTag === 'LABEL') {
            target = target.parentElement.querySelector('INPUT');
        }
        let data = {
            columnId: target.dataset.id,
            isChecked: target.checked
        };
        this.zephyrStore.dispatch(this._testcaseExecutionAction.configureTceGridColumn(data));
    }

    tceGridRowClick(event) {
        let match, executions;
        this.testcaseId = jQuery(event).data('id');
        executions = this.zephyrStore.getState().tce;

        if(executions && executions.executions) {
            match = executions.executions.filter(execution => this.testcaseId === execution.id);
        }
        this.scheduleId = (match && match.length) ? match[0].executionId : this.scheduleId;
        this.testId = (match && match.length) ? match[0].testcase.id : this.testId;
        this._tcId = this.testcaseId;

        //call to fetch attachments for testcase-execution
        let index = jQuery(event).index(),
            executionId = this.tceGridRows[index].executionId;

        // this.currentRecord = index + 1;
        this.currentRecord = ((this.currentPage - 1) * this.gridPageSize) + Number(index) + 1;
        this.totalRecords = this.tceGridRows.length;
        this.rtsId = executionId;
        this.rtsRow = this.tceGridRows[index];

        if(this.isSearchView) {
          if(match[0].testerId === this.loggedInUserId  || match[0].testerId === ANYONE_USER_ID) {
            this.areExecDetailsEnabled = true;
          } else {
            this.areExecDetailsEnabled = false;
          }
        }

        this.handleStepSubscription();
        if (this.isSearchView) {
          this.cyclePhaseId = (match && match.length) ? match[0].cyclePhaseId : '';
        }
       this.zephyrStore.dispatch(this._globalAction.fetchAttachments({'itemid' :executionId , 'type' :'releaseTestSchedule'  }));

       this.updateTCEURL();
    }

    /*function when tree node is clicked*/
    onNodeClick(target) {
        let node = target.node;

        let storeState = this.zephyrStore.getState();

        if (storeState.report.metadata.type != EXPORT_CONSTANTS['CUSTOM_REPORT_TYPE_TCE'] || this.selectedTestcaseIds.length > 0) {
            // Making API call for export_tce_node metadata and adding check if testcases were selected or not
            this.zephyrStore.dispatch(this._reportAction.getReportTemplate(EXPORT_CONSTANTS['CUSTOM_REPORT_TYPE_TCE']));
            this.bulkComp.updateReportType('CUSTOM_REPORT_TYPE_TCE');
        }
        this.clearingSelectedTestcases(); //clears all the arrays of the selected testcases
        this._currentNode = JSON.parse(JSON.stringify(node));
        let node_attr = node.a_attr, phaseId, cycleId, tcrCatalogTreeId, match, cycles,
            state = this.zephyrStore.getState();

        if(!(state.testcaseEAS.cycles && state.testcaseEAS.cycles.length)) {
            this.zephyrStore.dispatch(this._testcaseEASAction.getAllCycles(this.releaseId));
        }

        cycles = state.testcaseEAS.cycles;
        if (node_attr['data-node'] === 'cycle') {
            match = cycles.filter(cycle => cycle.id === node_attr['data-id'])[0];
        } else {
            cycles.every(cycle => {
                match = cycle.cyclePhases.filter(phase => phase.id === node_attr['data-id'])[0];
                if(match) {
                    return false;
                }
            });
        }
        this.nodeStats = {
            'nodeType': node_attr['data-node'],
            'nodeName': node_attr['data-name'],
            'startDate': match ? moment(match.startDate).format('MMM DD, YYYY') : 'NA',
            'endDate': match ? moment(match.endDate).format('MMM DD, YYYY') : 'NA',
            'tcrCatalogTreeId': node_attr['data-tcrCatalogTreeId'],
            'dataId': node_attr['data-id']
        };

        if(this.nodeStats.nodeType){
          this.setBuildEvrmntDetails(this.nodeStats);
        }

        switch(node_attr['data-type']) {
            case 'cycle' :
                this.exportPrefix = 'cycleId:';
                this.selectedTreeNodeName = node_attr['data-name'];
                this.selectedTreeNode = node_attr['data-id'];
                this.selectedTreeNodeName = node_attr['data-name'];
                break;

            case 'phase' :
                this.exportPrefix = 'cyclePhaseId:';
                this.selectedTreeNodeName = node_attr['data-name'];
                this.selectedTreeNode = node_attr['data-id'];
                this.selectedTreeNodeName = node_attr['data-name'];
                break;

            case 'release' :
                this.exportPrefix = 'releaseId:';
                this.selectedTreeNodeName = node_attr['data-name'];
                this.selectedTreeNode = this.releaseId;
                this.selectedTreeNodeName = node_attr['data-name'];
              break;

            default :
                this.exportPrefix = 'TreeNodeId:';
                this.selectedTreeNodeName = node_attr['data-name'];
                this.selectedTreeNode = node_attr['data-id'];
                this.selectedTreeNodeName = node_attr['data-name'];
              break;
        }

        if(node_attr['data-node'] === 'cycle' || node_attr['data-node'] === 'release') {
            this.handleExecutionUnSubscription();
            this.tceGridRows = [];
            this.paginationOptions.show = false;
            this.invalidClick = true;
        } else {
            this.invalidClick = false;
            phaseId = node_attr['data-id'];
            cycleId = node_attr['data-cycleId'];
            tcrCatalogTreeId = node_attr['data-type'] === 'phase' ? node_attr['data-tcrCatalogTreeId'] : node_attr['data-id'];
            this._treeId = tcrCatalogTreeId;
            this._phaseId = phaseId;

            this.cyclePhaseId = node_attr['data-cyclephaseid'];

            let params = {
              parentid: tcrCatalogTreeId,
              pageSize: this.gridPageSize,
              order: 'id',
              offset: target.showMenu ? this.gridPageSize * (this.currentPage - 1) : 0,
              testerid: this.loggedInUserId,
              dbsearch: true
            };

            this.handleExecutionSubscription();
            if(node_attr['data-node'] === 'phase') {
                this.handleTreeSubscription();
            }
            this.zephyrStore.dispatch(this._testcaseExecutionAction.fetchAllExecutions(params));

            if (this.firstClick) {
              this.testcaseId = '';
            }

            this.firstClick = true;
            this.lastEvent = 'NEXT';
        }

        this.updateTCEURL();
    }

    getReleaseDetails() {
      let state = this.zephyrStore.getState();
      let selectedRelease = _.find(state.release.releases, ['id', parseInt(this.releaseId)]);

      if (!selectedRelease) {
        this.zephyrStore.dispatch(this._releaseAction.fetchReleaseById(this.releaseId));
      }
    }
    setLeftNavData(state) {
        if(state.project.id) {
            this.navColumns.header.title = state.project.name;
            this.navColumns.header.subtitle = state.project.description;
            this.navColumns.header.link = `/project/${state.project.id}`;
            this.navColumns.header.isSelected = false;
            _.filter(this.navColumns.group.items, item => {
                if(item.key == 'release-setup') {
                    item.isActive = true;
                } else {
                    item.isActive = false;
                }
            });
        }
    }
    navigateToProject(ev) {
        if(this.navColumns.header.link.length) {
            this.router.navigateByUrl(this.navColumns.header.link);
        }
    }
    setReleasesDropdown(releases) {
        this.releases = releases.map(obj => ({id: obj.id, text: obj.name}));
        this.navColumns.releases = this.releases;
    }

    recordChanged(event) {
        let record = event.currentRecord % this.paginationOptions.size;

        jQuery(`.testcase-grid .flex-bar:nth-child(${record})`).addClass('selected-row');

        switch(event.type) {
            case NEXT_RECORD:
                this.currentRecord++;

                if (this.currentRecord % this.gridPageSize === 1) {
                    this.tceGridNextClick(this.currentPage + 1);
                } else {
                    jQuery('.testcase-grid .selected-row').next().trigger('click');
                }
                break;

            case PREV_RECORD:
                this.currentRecord--;

                if (this.currentRecord % this.gridPageSize === 0) {
                    this.tceGridPrevClick(this.currentPage - 1);
                } else {
                  jQuery('.testcase-grid .selected-row').prev().trigger('click');
                }
                break;
        }
    }

    tceGridPrevClick(value) {
        this.currentPage = value;
        let params = {
            pageSize: this.gridPageSize,
            offset: this.gridPageSize * (this.currentPage - 1),
            parentid: (this.nodeStats['nodeType'] == 'Module') ?
            this.nodeStats && this.nodeStats['dataId'] :
            this.nodeStats && this.nodeStats['tcrCatalogTreeId'],
            currentPage: this.currentPage,
            testerid: this.loggedInUserId,
            dbsearch: true
        };
        if(this.isSearchView) {
            this.searchOffset = params.offset;
            this.fetchExecutionsOnSearch(this.searchText, '');
        } else {
          this.tceGridRows = [];
          this.zephyrStore.dispatch(this._gridAction.tcePaginationRequest(params, TCE_GRID_TYPE.toUpperCase() + '_GRID', 'PREV'));
        }
        this.lastEvent = 'PREV';
        this.updateTCEURL();

    }
    tceGridNextClick(value) {
        this.currentPage = value;
        let params = {
            pageSize: this.gridPageSize,
            offset: this.gridPageSize * (this.currentPage - 1),
            parentid: (this.nodeStats['nodeType'] == 'Module') ?
            this.nodeStats && this.nodeStats['dataId'] :
            this.nodeStats && this.nodeStats['tcrCatalogTreeId'],
            currentPage: this.currentPage,
            testerid: this.loggedInUserId,
            dbsearch: true
        };
        if(this.isSearchView) {
            this.searchOffset = params.offset;
            this.fetchExecutionsOnSearch(this.searchText, '');
        } else {
          this.tceGridRows = [];
          this.zephyrStore.dispatch(this._gridAction.tcePaginationRequest(params, TCE_GRID_TYPE.toUpperCase() + '_GRID', 'NEXT'));
        }

        this.lastEvent = 'NEXT';
        this.updateTCEURL();
    }

    tceGridRowSelection(testcaseIds) {
        this.executionIds = [];
        let tctIds = testcaseIds[0];
        if(this.selectedTreeNode && tctIds && tctIds.length) {
            this.isMenuShown = true;
        }
        this.selectedTctIds = tctIds;
        this.selectedTestcaseIds = testcaseIds[1];

        //get all selected testcases execution ids
        let testExecutions = this.zephyrStore.getState().tce.tceGrid.rows;
        let selectedExecutions = testExecutions.filter(execution => this.selectedTctIds.indexOf(execution.id) !== -1);
        selectedExecutions.forEach(execution => {
            this.executionIds.push(execution.executionId);
        });

        this.allExecutionIds = testcaseIds[2];
    }

    tceGridPageSizeChange(value) {
        this.currentPage = 1;
        this.gridPageSize = value;
        let params = {
            pageSize: value,
            offset: this.gridPageSize * (this.currentPage - 1),
            parentid: (this.nodeStats['nodeType'] == 'Module') ?
            this.nodeStats && this.nodeStats['dataId'] :
            this.nodeStats && this.nodeStats['tcrCatalogTreeId'],
            currentPage: 1,
            testerid: this.loggedInUserId,
            dbsearch: true
        };
        if(this.isSearchView) {
            this.searchOffset = params.offset;
            this.fetchExecutionsOnSearch(this.searchText, '');
        } else {
          this.tceGridRows = [];
          this.zephyrStore.dispatch(this._testcaseExecutionAction.fetchAllExecutions(params));
        }
    }

    tceGridPaginateByIndex(value) {
        this.currentPage = value;
        let params = {
            pageSize: this.gridPageSize,
            offset: this.gridPageSize * (this.currentPage - 1),
            parentid: (this.nodeStats['nodeType'] == 'Module') ?
            this.nodeStats && this.nodeStats['dataId'] :
            this.nodeStats && this.nodeStats['tcrCatalogTreeId'],
            currentPage: this.currentPage,
            testerid: this.loggedInUserId,
            dbsearch: true
        };
        this.lastEvent = 'NEXT';
        if(this.isSearchView) {
            this.searchOffset = params.offset;
            this.fetchExecutionsOnSearch(this.searchText, '');
        } else {
          this.tceGridRows = [];
          this.zephyrStore.dispatch(this._testcaseExecutionAction.fetchAllExecutions(params));
        }
        this.updateTCEURL();
    }
    tceGridLinkClick (target) {
        if(jQuery(target).hasClass('attachment_count')) {
          jQuery('#attachment-modal').modal();
          let index = jQuery(target).closest('div.flex-bar').data('index');
          this.testcaseAttachmentId = this.tceGridRows[index].executionId;
          this.attachmentEntityType = 'releaseTestSchedule';
        } else if(jQuery(target).hasClass('defect_link')) {
          jQuery('#defect-link-modal').modal();
        } else if(jQuery(target).hasClass('defect-detail-popover')) {
            let defectId = (jQuery(target).text() || '').trim();
            this.router.navigate(['defect-tracking', this.releaseId, {defectId}]);
        }
    }

    tceGridInlineEditSubmit (data) {
        let updateType = 'tce_notes' === data.key ? 'notes' : 'tce_status' === data.key ? 'status' : undefined;
        let rowId = data.row.id == this.testcaseId ? data.row.id : null;
        if ('tce_status' === data.key && !data.event) {
            // for empty status, set it as first value
            let options = this.gridPipe.transform('', [{'key':'status-select'}])[0] || {};
            data.event = Number(options.id || '0');
        }
        if( updateType == 'status' && data.event == 2 && $('#mlFeature').val() == 'enable') {
          let tcId = data.row.testcase.id;
          let releaseId = this.releaseId;
          this.zephyrStore.dispatch(this._testcaseExecutionAction.getRelatedTcData(tcId, releaseId, this._phaseId));
        }

        this.zephyrStore.dispatch(this._testcaseExecutionAction.updateExecutionDetailsById(data.row, data.event, updateType, this.loggedInUserId, rowId));
    }

    attachmentsCountRefreshed (data) {
        if (data.attachmentType === 'releaseTestSchedule') {
            //Updating the count in thfe grid, no need to make call to store
            //TODO : updating sortedRows.
            this.tceGridRows.forEach(rowObject => {
                if (rowObject.executionId === data.id) {
                    rowObject.testcase = JSON.parse(JSON.stringify(rowObject.testcase));
                    rowObject.testcase.attachmentCount = data.count == 0 ? 'No Attachment' : data.count;
                    return;
                }
            });
        } else if (data.attachmentType === 'testStepResult') {
           //dispatching to store to update the count of attachments
           this.zephyrStore.dispatch(this._testcaseExecutionAction.updateAttachmentCount(data));
        }
    }

    onTestStepAttachmentClick (data) {
       jQuery('#attachment-modal').modal();
       this.testcaseAttachmentId = data.id;
       this.attachmentEntityType = data.attachmentType;
    }
    onMapDefectsSchedule() {
        if(this.isSearchView) {
          let searchButton = jQuery('.zui-search-area-wrapper').find('button');
          if(searchButton.hasClass('zui-search-btn-go')){
            jQuery('.zui-search-btn-go').trigger('click');
          } else {
            jQuery('.zql-search-btn-go').trigger('click');
          }

          this.lastRow = jQuery('#grid-table-tce_search .selected-row').index();

          return;
        }

        //fetching testcases after linking defects
        let params = {
            pageSize: this.gridPageSize,
            offset: this.gridPageSize * (this.currentPage - 1),
            parentid: (this.nodeStats['nodeType'] == 'Module') ?
            this.nodeStats && this.nodeStats['dataId'] :
            this.nodeStats && this.nodeStats['tcrCatalogTreeId'],
            currentPage: this.currentPage,
            testerid: this.loggedInUserId,
            dbsearch: true
        };
        this.zephyrStore.dispatch(this._testcaseExecutionAction.fetchAllExecutionsAfterDefectLink(params));
    }

    // doing this temporarily - dont know why we have falsy values in statuses - temporary fix
    filterStatus() {
        this.statuses = this.statuses.filter(status => status.text);
    }

    getStatusArray() {
      this.statuses = this._adminPrefKeyExecutionStatus.map(obj => obj.active == 'true' && {id: obj.id, text: obj.value, color:obj.color});

      this.filterStatus();
    }

    updateStatus(ev) {
        let scheduleIds = {ids: []};
        let status = ev.id;
        let testerId = null;

        testerId = this.loggedInUserId;
        scheduleIds.ids = this.executionIds;
        if(scheduleIds.ids && scheduleIds.ids.length) {
            this.zephyrStore.dispatch(this._testcaseExecutionAction.updateTestcaseStatus(scheduleIds, status, testerId));
        }
        jQuery('.bulk-exec-update').find('select').val(null).trigger('change');
    }

    // context menu functions
    tceContextMenuItems(node) {
        tcexecSelf.syncNodeData = node;
        if(!node) { return; }

        let items =  {
            sync: { // The 'sync' menu item
                label: 'Sync',
                action: tcexecSelf.showTceModal.bind(tcexecSelf, 'sync')
            },
            export: { // The 'export' menu item
                label: 'Export',
                action: tcexecSelf.showTceModal.bind(tcexecSelf, 'export')
            }
        };
        let defectsystem = tcexecSelf.zephyrStore.getState().global.defectSystem || {};
        if (defectsystem['systemType'] != SYSTEM_TYPE_4 || node.a_attr['data-type'] == 'Module') {
           delete items.sync;
        }

        return items;
    }

    showTceModal(action, node) {
        if(action === 'export') {
            this.setFiledOptions();
            jQuery('.zui-export-modal').find('.modal').modal();
        } else if (action === 'sync') {
          jQuery('#confirmation-modal-tce').modal();
          this.confirmationObject['heading'] = 'Confirmation';
          this.confirmationObject['text'] = 'This process will take few minutes to sync mapped defects.'
                                     + '\nDo you wish to continue?';
          this.confirmationObject['buttonText'] = 'Yes';
          this.confirmationObject['showCancelButton'] = true;
          this.confirmationObject['cancelButtonText'] = 'No';
          this.confirmationObject['action'] = SYNC;
        }
    }
    setFiledOptions() {
        //Meta data has been taken care of
        let _searchCriteria = this.exportPrefix + this.selectedTreeNode;
        if(this.exportPrefix == 'cycleId:' || this.exportPrefix == 'cyclePhaseId:' || this.exportPrefix == 'TreeNodeId:') {
            _searchCriteria = _searchCriteria + ';displayStep:true';
        }
        this.fieldOptions['searchCriteria'] = _searchCriteria;
        this.fieldOptions['releaseId'] = this.releaseId;
        this.fieldOptions['subTitle'] = 'Test Execution Report';
    }

    clearingSelectedTestcases() {
        this.executionIds = [];
        this.isMenuShown = false;
        this.selectedTctIds = [];
        this.selectedTestcaseIds = [];
        this.allExecutionIds = [];
    }

    onSearchGo(param) {
        this.clearingSelectedTestcases();
        this.searchOffset = 0;
        this.searchText = param.value;
        this.isAdvancedSearch = param.isAdvancedSearch;
        this.updateTCEURL();
    }

    fetchExecutionsOnSearch(value, type, isPagination?) {
        let queryParams = {
            'firstresult': this.searchOffset,
            'maxresults': this.gridPageSize,
            'size': this.gridPageSize,
            'entityType': 'execution'
        }, dataParams = {
            'entityType': 'execution',
            'releaseId': this.releaseId
        }, searchType = 'executions';

        if(this.inRelease) {
            queryParams['releaseId'] = this.releaseId;
        }

        if(this.isAdvancedSearch) {
            queryParams['isZql'] = true;
        } else {
            queryParams['isZql'] = false;
        }
        queryParams['word'] = value;
        if (_.isEqual(this.queryParams, queryParams)) {
            // same search, do not search again.
            return;
        }
        this.queryParams = JSON.parse(JSON.stringify(queryParams));
        queryParams['currentPage'] = this.currentPage;
        this.tceGridRows = [];
        this.testcaseId = null;
        this.zephyrStore.dispatch(this._testcaseExecutionAction.fetchExecutionsOnSearch(queryParams, dataParams, isPagination));
    }

    setGridType() {
      if (this.isSearchView) {
        this.selectedGridType = this._tceSearchGridType;
      } else {
        this.selectedGridType = this._tceGridType;
      }

      if (this.tceGrid) {
        this.tceGrid.ngAfterViewInit();
      }
    }

    // dismissSwitchViewModal(isSearchViewType,doSwitch){
    //     // if(doSwitch){
    //    // }
    // }

    searchForRelatedTc() {
      let tcList = this.relatedTc['data']['90'];
      this.searchText = 'id in ('+tcList.join(',')+')';
      this.isAdvancedSearch = true;
      this.inRelease = true;
      this.toggleSearchFolderView(true);
    }

    markAllAsFailed() {
      let status = {id:2};
      this.executionIds = this.relatedTc['data']['90_rts'];
      this.updateStatus(status);
      this.relatedTc.tcid = 0;
    }

    toggleSearchFolderView(isSearchViewType) {
      // display Switch view modal
      this.isSearchView = isSearchViewType;

      this.setGridType();

      this.testcaseId = null;
      this.selectedTreeNode = null;
      if(this.isSearchView) {
        jQuery('.zui-search-textarea').val('');
        this.isMenuShown = true;
        let hasClass = jQuery('#requirement-fullscreen-resizer').hasClass('requirement-default-view');
        if(this.searchText) {
          this.fetchExecutionsOnSearch(this.searchText, '');
        }

      } else {
        // enable tce execution details in folder view
        this.areExecDetailsEnabled = true;
        jQuery('.jstree-clicked.zee-tcr-anchor').click();
      }
      this.updateTCEURL();

      this.toggleForDetails = false;

      setTimeout(() => {
        this.toggleForDetails = true;
        this.isMenuShown = true;

      }, 100);
    }

    toggleInReleaseRequirements(ev) {
        this.inRelease = !this.inRelease;
    }

    confirmationActionCall(event) {
      let actionString = event.target.value;
      if (actionString === SYNC) {
        this.syncClicked = true;
        this.zephyrStore.dispatch(this._defectsAction.getDefectUser());
      }
      jQuery('#confirmation-modal-tce').modal('hide');
    }

    onShowUpdateUserModal(selectedVal) {
            if(selectedVal === 'false') {
              jQuery('#defect-update-user-modal').modal('hide');
              this.syncClicked = false;
                let nodeData = this.syncNodeData;
                let dataObject = {};
                    dataObject['releaseid'] = this.currentRelease && this.currentRelease.id;
                    dataObject['entityid'] = nodeData.a_attr['data-type'] == 'release' ? (this.currentRelease && this.currentRelease.id) : nodeData.a_attr['data-id'];
                    dataObject['syncon'] = nodeData.a_attr['data-type'];
                let componentId = '-execution';
                this.zephyrStore.dispatch(this._testcaseExecutionAction.syncDefects(dataObject, componentId));
            } else {
                jQuery('#defect-update-user-modal').modal();
            }
      }

      setURLParams(params) {
        this.lastParams = params;
        this.releaseId = params['id'];
        this.selectedTreeNode = null;

        if (params['treeId']) {
          this.selectedTreeNode = params['treeId'];
        }

        if (params['executionId']) {
          this.firstClick = false;
          this.lastTestCaseId = params['executionId'];
        }

        if(params['pageView']) {
            if(params['pageSize']) {
                let currentPage = 1;
                let offset = 0;
                if (params['offset']) {
                    offset = +params.offset;
                    currentPage = ((+params.offset || 0) / params['pageSize']) + 1;
                }
                this.zephyrStore.dispatch(this._testcaseExecutionAction.updateGridPagination(+params['pageSize'], currentPage, offset));
            }
            this.isSearchView = (params['pageView'] === 'search') ? true: false;
            if(this.isSearchView) {
                this.searchText = params['searchText'] || '';
                this.inRelease = JSON.parse(params.inRelease || 'true');
                this.searchOffset = +params.offset || 0;

                if(params['searchType']) {
                    this.isAdvancedSearch = (params['searchType'] === 'zql') ? true : false;
                }
            }

            this.setGridType();
        }
    }
    getURLQueryParams() {
        let _qParams = {};

        if (this.selectedTreeNode) {
          _qParams['treeId'] = this.selectedTreeNode;
        }

        if (this.testcaseId) {
          _qParams['executionId'] = this.testcaseId;
        }

        if(this.gridPageSize) {
            _qParams['pageSize'] = this.gridPageSize;
        }
        if (this.currentPage) {
            _qParams['offset'] = this.gridPageSize * (this.currentPage - 1);
        }

        _qParams['pageView'] = this.isSearchView ? 'search' : 'folder';
        if(this.isSearchView) {
            _qParams['searchText'] = this.searchText || '';
            _qParams['searchType'] = (this.isAdvancedSearch)? 'zql': 'text';
            _qParams['inRelease'] = this.inRelease;
        }
        return _qParams;
    }
    updateTCEURL() {
        let _urlParams = this.getURLQueryParams();
        this.router.navigate(['tce', this.releaseId, _urlParams]);
    }
    executeTestcaseStatus(event) {
      jQuery('#execute-testcase-tce').modal('hide');
      this.zephyrStore.dispatch(this._testcaseExecutionAction.updateExecutionDetailsById(
          this.rtsRow, this.testcaseStatusDropdownFinalValue, 'status', this.loggedInUserId , null));
    }
    mappingStepStatus(id) {
      // let status = 'Not Executed';
      let adminPrefKeyStepExecutionStatus = this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTSTEPRESULT_TESTSTEPRESSULTSTATUS_LOV] ?
            JSON.parse(this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTSTEPRESULT_TESTSTEPRESSULTSTATUS_LOV]) : [];
      //INFO:hard coded in fornt-ended to show not-executed when executionStausId is

      let status = adminPrefKeyStepExecutionStatus[0].value;

      if (!(id == CHANGE_STATUS_EXECUTION_ID)) {
        for (let i = 0 ;i <adminPrefKeyStepExecutionStatus.length ; i++ ) {
            let object = adminPrefKeyStepExecutionStatus[i];
            if (object.id === id) {
                status = object.value;
            }
        }
      }
      return status;
    }
    updateTestcaseStatusDropdown(ev) {
      this.testcaseStatusDropdownFinalValue = String(ev.id);
    }
    triggerChange() {
        if (this.changeDetectionDebounce) {
            clearTimeout(this.changeDetectionDebounce);
        }
        let firstDetection = !this.changeDetectionDebounce;
        this.changeDetectionDebounce = setTimeout(() => {
            this.changeDetectionDebounce = null;
            if(this.cdr) { this.cdr.markForCheck(); }
        }, firstDetection ? 200 : 300);
    }

    addEventListener(message, callback) {

    }
}
