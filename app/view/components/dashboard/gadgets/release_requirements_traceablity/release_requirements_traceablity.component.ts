import {
  ElementRef, Component, Input,
  Injector, Output, EventEmitter, ViewChildren, ViewContainerRef,
  ComponentRef, ComponentFactoryResolver, OnDestroy, ViewChild
} from '@angular/core';

import {GET_GADGET_DATA_SUCCESS} from '../../../../../utils/constants/action.events';

//import {TestCaseDistByPhaseComponent} from './gadgets/testcase_dist_by_phase.component';
import { ProjectTeamComponent } from '../../../projects/project_team.component';
import {Router} from '@angular/router';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {RELEASE_SUMMARIES} from '../../../../../mocks/releases.mock';
import {ReleaseAction} from '../../../../../actions/release.action';
import {ProjectAction} from '../../../../../actions/project.action';
import {GadgetInterface} from '../gadgets.interface';
import {RequirementsAction} from '../../../../../actions/requirements.action';

// import {Component, Input, AfterViewInit, DynamicComponentLoader,
//     Injector, Output, EventEmitter, ViewChild, ViewContainerRef,
//     ComponentResolver, ComponentRef} from '@angular/core';

import {
  CLEAR_RELEASE_EVENTS, SORT_RELEASE_GRID, GET_RELEASE_SETUP_GRID,
  GET_RELEASE_CYCLES_SUCCESS
} from '../../../../../utils/constants/action.types';

import {GridUtil} from '../../../../../view/components/grid/grid_util';

declare var jQuery, _;
// Constants
import {ReleaseStatusRequirementsGadgetComponent} from '../release_status_requirements/release_status_requirements.component';
import {FETCH_RELEASES_AUTOMATION_SUMMARY_SUCCESS, FETCH_RELEASE_SUMMARIES_SUCCESS,
    FETCH_GADGET_DATA_SUCCESS, FETCH_REQUIREMENT_BY_RELEASE_SUCCESS} from '../../../../../utils/constants/action.events';
import {TeamAction} from '../../../../../actions/team.action';
import {TCRAction} from '../../../../../actions/tcr.action';
import {TestcaseAction} from '../../../../../actions/testcase.action';
import {GadgetAction} from '../../../../../actions/gadget.action';
import {TestcaseEASAction} from '../../../../../actions/testcaseEAS.action';
import {GadgetClass} from '../gadget.class';
import {ADMIN_PREFERENCES} from '../../../admin/admin.constant';
import { AdminAction } from '../../../../../actions/admin.action';
import {InlineTableZQLComponent} from "../../../common/inline-table-zql/inline-table-zql";

@Component({
	selector: 'zui-release-requirements-traceability-gadget',
  templateUrl: 'release_requirements_traceablity.html',
  providers : [GadgetAction, TestcaseEASAction, AdminAction]
})

export class ReleaseRequirementsTraceabilityComponent extends GadgetClass implements GadgetInterface, OnDestroy {
  @ViewChild(InlineTableZQLComponent) inlineTableZQLComponent: InlineTableZQLComponent;
  elSelector = "#parent-gadget-view";
  dialogContentRef : any;
  widthOffset=76;
  _executionStatus = {};

  carryForwardData : any;

  public config = {
    project: '',
    release: '',
    requirements: [],
    refreshRate: '',
  };

  defects = [];

  paginationOptions = {
    pageSizeOptions : [
      10,
      25,
      50,
      100
    ],
    pageSize: 50,
    pageNumbers: [],
    currentFirst : 1,
    currentPage: 1,
    isLast : false,
    isFirst : true,
    currentLast : 50,
    totalRecords: 100
  };

  reqGridRows = [];

  showDefects = false;

  searchOn = ['reqTreeName', 'reqName'];

  _gadgetId;

  requirements = [];

  public columns = [
    {
      'key': 'reqTreeName',
      'text': 'Tree Node'
    },
    {
      'key': 'reqName',
      'text': 'Requirement'
    }
  ];

  public columnKey = 'reqId';

  public selectedRequirements = [];

  @Output() saveConfigEmitter: EventEmitter<any> = new EventEmitter();
  public cycles = [];
  private unsubscribe;

  constructor(private gadgetComponent: ElementRef, public router: Router, _releaseAction: ReleaseAction, _gadgetAction: GadgetAction,
              private _requirementsAction : RequirementsAction, private _adminAction: AdminAction) {
    super(router, _releaseAction, _gadgetAction);
    this.zephyrStore = ZephyrStore.getZephyrStore();

    this.unsubscribe = this.zephyrStore.subscribe(() => {
      let state = this.zephyrStore.getState();

      let _execStatuses = this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV] ?
        JSON.parse(this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV]) : [];

        if(this.zephyrStore.getState().adminPref['event'] == 'PREF_LOADED') {
          this.zephyrStore.dispatch(this._adminAction.clearAdminEvents());

          if (Object.keys(this._executionStatus).length) {
            this._executionStatus = {};

            _execStatuses.forEach(status => {
              if(status['id'] == 10) {
                this._executionStatus[status['id']] = 'unexecuted';
              } else {
                this._executionStatus[status['id']] = status['value'];
              }
            });

            if (this.carryForwardData) {
              this.setReleaseSummaries(this.carryForwardData);
              this.carryForwardData = null;
              this.configureInlineDefectsTable();
            }
          }
        }

        this._executionStatus = {};

        _execStatuses.forEach(status => {
          if(status['id'] == 10) {
            this._executionStatus[status['id']] = 'unexecuted';
          } else {
            this._executionStatus[status['id']] = status['value'];
          }
        });

        if(state.gadget.event === GET_GADGET_DATA_SUCCESS && state.gadget.gadgetId === this._gadgetId && !this.isConfigureMode) {
          this.setReleaseSummaries(_.cloneDeep(state.gadget.gadgetData[this._gadgetId]));
          this.zephyrStore.dispatch(this._gadgetAction.clearGadgetEvents(FETCH_GADGET_DATA_SUCCESS, state.gadget.gadgetId));
          this.configureInlineDefectsTable();
        }

      if(state.requirements.event == FETCH_REQUIREMENT_BY_RELEASE_SUCCESS + this._gadgetId) {
        this.requirements = state.requirements.gadgetRequirements[this._gadgetId];
        this.calculatePagination();

        if (!this.isConfigureMode) {
          this.checkAndLoadData();
        }

        this.zephyrStore.dispatch(this._requirementsAction.clearReqEvent());
      }
    });
  }

  onRowSelection($event) {
    this.selectedRequirements =$event.selectedOptions;
  }

  checkAndLoadData() {

    // if (this.selectedRequirements.length && !this.reqGridRows.length) {
    //   let keys = _.map(this.requirements, 'reqId');
    //   this.selectedRequirements = this.selectedRequirements.filter(x => keys.indexOf(x) !== -1);
      this.loadActualData();
    // }

  }

  configureInlineDefectsTable() {
    let self = this;

    setTimeout(() => {
      jQuery('.inline-dialog-trigger-' + this._gadgetId).click(function(event) {
        self.showDefects = true;

        setTimeout(() => {
          self.showDialog(event);
        }, 100);
      });

      jQuery("#inline-defects-" + this._gadgetId).unbind("click").bind("click", function() {
        self.showDefects = false;
      });
    }, 100);
  }

  enableSave() {
    let value = this.config && this.config.project && this.config.release && this.config.refreshRate;
    if(value) {
      return Boolean(this.selectedRequirements && this.selectedRequirements.length > 0);
    }
    return Boolean(value);
  }

  showDialog(event) {
    let dialogWidth, dialogHeight, changedX, changedY,
      pageX = jQuery(event.currentTarget).offset().left,
      pageY = jQuery(event.currentTarget).offset().top + jQuery(event.currentTarget).height();

    jQuery('#inline-defects-' + this._gadgetId).appendTo('body').each((index, element) => {
      this.dialogContentRef = jQuery(element);
      let el = jQuery(element).find('.inline-dialog-content');
      dialogWidth = jQuery(el).width();
      dialogHeight = jQuery(el).height();
    });

    // this.dialogContentRef = jQuery("#inline-defects-" + this._gadgetId);
    // let el = jQuery(element).find('.inline-dialog-content');
    // dialogWidth = jQuery(el).width();
    // dialogHeight = jQuery(el).height();

    this.dialogContentRef.removeClass('top-left-arrow top-right-arrow');

    if (pageX + dialogWidth > jQuery(window).width()) {
      changedX = pageX - dialogWidth;
    } else {
      changedX = pageX;
    }

    if (pageY + dialogHeight > jQuery(window).height()) {
      changedY = pageY - jQuery(event.currentTarget).height() - dialogHeight;
    } else {
      changedY = pageY + 1;
    }

    this.dialogContentRef.find('.inline-dialog-content').css({'display': 'block', 'left': changedX, 'top': changedY});

    if (jQuery(this.elSelector).parents('.modal').length) {
      this.dialogContentRef.css('z-index', 1050);
    }
  }

  hideDialog(event) {
    this.showDefects = false;
  }

  refreshMetrics() {
    if (!this.hasConfigError) {
      this.reqGridRows = [];
      this.checkAndLoadData();
      // this.zephyrStore.dispatch(this._requirementsAction.fetchRequirementsByRelease(this.selectedRelease[0], this._gadgetId));
    }
  }

  loadActualData() {
    let requirements = this.selectedRequirements.slice(this.paginationOptions.currentFirst - 1,
      this.paginationOptions.currentFirst - 1 + this.paginationOptions.pageSize);
    let queryString = "requirementIds=" + requirements.join(",");

    this.paginationOptions.currentLast = (this.paginationOptions.currentFirst + requirements.length - 1);

    this.zephyrStore.dispatch(this._gadgetAction.getGadgetData(this._gadgetId, queryString));
  }

  setConfig(gadgetId, gadgetDetails) {
    super.setConfig(gadgetId, gadgetDetails, false);

    if (gadgetDetails) {
      // this.config.cycles = gadgetDetails.properties.config.cycles;

      if (!_.isEmpty(this.config) && this.config.project) {
        this.selectedRequirements = _.cloneDeep(this.config.requirements);// ? this._gadgetConfig.cycles.map(cycle => (cycle.id)) : [];

        this.selectedRequirements.sort((a, b) => a - b);
        this.reqGridRows = [];

        this.elSelector = "#parent-gadget-view-" + this._gadgetId;

        this.paginationOptions.totalRecords = this.selectedRequirements.length;
        this.paginationOptions.currentFirst = 1;
        this.paginationOptions.pageSize = 50;
        this.paginationOptions.currentPage = 1;
        // this.zephyrStore.dispatch(this._requirementsAction.fetchRequirementsByRelease(this.selectedRelease[0], this._gadgetId));

        this.refreshMetrics();

        this.isConfigureMode = false;
        this.setProjectName();
      }
    }
  }

  toggleConfigurationMode(mode) {
    super.toggleConfigurationMode(mode);

    if (mode) {
      this.zephyrStore.dispatch(this._requirementsAction.fetchRequirementsByRelease(this.selectedRelease[0], this._gadgetId));
    }
  }

  setReleaseSummaries(requirements) {
    let noIssuesFlag = true;

    requirements.forEach(row => {
      let summary = {
        total : 0,
        open : 0
      };

      this.paginationOptions.totalRecords = this.selectedRequirements.length;

      row['execution'] = row['execution'] ? row['execution'] : {};
      row['defect'] = row['defect'] ? row['defect'] : [];
      row['testcaseCount'] = row['testcaseCount'] ? row['testcaseCount'] : 0;

      row['defect'].forEach((defect) => {

        if (defect && defect.category !== undefined) {
          if (defect.category.toLocaleLowerCase() === "open" || defect.category.toLocaleLowerCase() === "to do" ) {
            summary.open ++;
          }
        }

        summary.total++;
      });

      // row.execution = {
      //   "fail": 3,
      //   "blocked": 2,
      //   "pass": 3,
      //   "wip": 2
      // };

      row.executionStatuses = [];

      _.forEach(row.execution, (value, key) => {
        let keyNameOrig = this._executionStatus[+key];
        let keyName = keyNameOrig;

        if (!keyNameOrig) {
          noIssuesFlag = false;
          this.zephyrStore.dispatch(this._adminAction.getAllPref(false));
        } else {

          if (keyNameOrig.length && !keyName.length) {
            keyName = keyNameOrig;
          } else {
            if (keyName === "wip") {
              keyName = keyName.toLocaleUpperCase();
            } else {
              keyName = _.capitalize(keyName);
            }
          }

        }

        row.executionStatuses.push({
          key : keyName,
          value
        });
      });

      row['defectSummary'] = summary;
    });

    if (noIssuesFlag) {
      this.reqGridRows = requirements;

      this.paginationOptions.pageNumbers = GridUtil.generatePageNumbers(
        this.paginationOptions.pageSize,
        this.paginationOptions.totalRecords,
        this.paginationOptions.currentPage
      );

      this.calculatePagination();
    } else {
      this.carryForwardData = requirements;
      this.reqGridRows = [];
    }
  }

  calculatePagination() {
    if (this.paginationOptions.currentFirst === 1) {
      this.paginationOptions.isFirst = true;
    } else {
      this.paginationOptions.isFirst = false;
    }

    if ((this.paginationOptions.currentPage * this.paginationOptions.pageSize) >= this.selectedRequirements.length) {
      this.paginationOptions.isLast = true;
    } else {
      this.paginationOptions.isLast = false;
    }
  }

  reqGridPrevClick(event) {
    this.reqGridPaginateByIndex(this.paginationOptions.currentPage - 1);
  }

  reqGridNextClick(event) {
    this.reqGridPaginateByIndex(this.paginationOptions.currentPage + 1);
  }

  reqGridPaginateByIndex(page) {
    this.paginationOptions.currentPage = parseInt(page);
    this.paginationOptions.currentFirst = (this.paginationOptions.pageSize * (this.paginationOptions.currentPage - 1)) + 1;
    this.paginationOptions.currentLast = this.paginationOptions.currentFirst + this.paginationOptions.pageSize - 1;
    this.loadActualData();
  }

  reqGridPageSizeChange(event) {
    this.paginationOptions.pageSize = parseInt(jQuery("#pagination-page-size-" + this._gadgetId).val());
    this.paginationOptions.currentFirst = 1;
    this.paginationOptions.currentPage = 1;
    this.loadActualData();
  }

  showDefectsFromRow(row) {
    this.defects = row.defect;

    // this.defects = [];
    //
    // for (let i = 0; i < 22; i++) {
    //   this.defects.push({
    //     "external_id": "PROJ-2",
    //     "id": "2",
    //     "status": "To Do"
    //   });
    // }
  }

  showOpenDefectsFromRow(row) {
    this.defects = row.defect;

    this.defects = this.defects.filter((defect) => {
      if (!defect && !defect.category) {
        return false;
      } else {
        return defect && defect.category && defect.category.toLocaleLowerCase() === "open" || defect.category.toLocaleLowerCase() === "to do";
      }
    });
  }

  reqGridLinkClick(event) {
    //
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.unsubscribe();
  }

  setReleaseValue(data) {
    super.setReleaseValue(data);
    this.selectedRequirements = [];
    this.inlineTableZQLComponent.resetValues();
    // this.zephyrStore.dispatch(this._requirementsAction.fetchRequirementsByRelease(this.selectedRelease[0], this._gadgetId));
  }

  setCycles(cycles) {
    this.cycles = cycles.map(cycle => {
      return {
        id: cycle.id,
        text: cycle.name
      };
    });
  }

  saveConfig() {
    let gadget = super.saveConfig();
    gadget.properties.config.requirements = this.selectedRequirements;
    this.saveConfigEmitter.emit(gadget);
    // this.refreshMetrics();
  }
}
