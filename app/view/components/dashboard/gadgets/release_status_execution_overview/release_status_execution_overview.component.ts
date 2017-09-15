import {
  Component, Input,
  Injector, Output, EventEmitter, ViewChild, ViewContainerRef,
  ComponentRef, ComponentFactoryResolver, OnDestroy, ElementRef
} from '@angular/core';
//import {TestCaseDistByPhaseComponent} from './gadgets/testcase_dist_by_phase.component';
import { ProjectTeamComponent } from '../../../projects/project_team.component';
import {Router} from '@angular/router';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {REFRESH_RATE} from '../constants/constants';
import {RELEASE_SUMMARIES} from '../../../../../mocks/releases.mock';
import {ReleaseAction} from '../../../../../actions/release.action';
import {ProjectAction} from '../../../../../actions/project.action';
import {GadgetInterface} from '../gadgets.interface';

// import {Component, Input, AfterViewInit, DynamicComponentLoader,
//     Injector, Output, EventEmitter, ViewChild, ViewContainerRef,
//     ComponentResolver, ComponentRef} from '@angular/core';

import {
  CLEAR_RELEASE_EVENTS, SORT_RELEASE_GRID, GET_RELEASE_SETUP_GRID,
  GET_RELEASE_CYCLES_SUCCESS
} from '../../../../../utils/constants/action.types';

import {
  UPDATE_DASHBOARD_SUCCESS
} from '../../../../../utils/constants/action.events';

import {CHART_TITLE, CYCLE_PHASE, PHASE, UNEXECUTED, TCR_CATALOG_TREE_ID} from './release_status_execution_overview.constants';

declare var jQuery, _, Highcharts:any;
// Constants
import {ReleaseStatusRequirementsGadgetComponent} from '../release_status_requirements/release_status_requirements.component';
import {
  FETCH_RELEASES_AUTOMATION_SUMMARY_SUCCESS, FETCH_RELEASE_SUMMARIES_SUCCESS, FETCH_GADGET_DATA_SUCCESS,
  GET_GADGET_DATA_SUCCESS
}
  from '../../../../../utils/constants/action.events';
import {TeamAction} from '../../../../../actions/team.action';
import {TCRAction} from '../../../../../actions/tcr.action';
import {TestcaseAction} from '../../../../../actions/testcase.action';
import {GadgetAction} from '../../../../../actions/gadget.action';
import {TestcaseEASAction} from '../../../../../actions/testcaseEAS.action';
import {ChartAction} from '../../../../../actions/chart.action';
import {GadgetClass} from '../gadget.class';
import {ADMIN_PREFERENCES} from '../../../admin/admin.constant';
import {DrillDownBarChartComponent} from "../../../common/chart/drilldown-stacked-bar/drilldown-stacked-bar";

@Component({
	selector: 'zui-release-status-execution-overview-gadget',
  templateUrl: 'release_status_execution_overview.html',
  providers : [GadgetAction, TestcaseEASAction, ChartAction]
})

export class ReleaseStatusExecutionOverviewGadgetComponent extends GadgetClass implements GadgetInterface, OnDestroy {
  legendsMetadata = [];
  @ViewChild(DrillDownBarChartComponent) drillDownChart;

  chartTitle = '';
  fileName = CHART_TITLE;

  currentId = -1;
  currentType = '';
  colors = [];
  height = 0;
  hierarchy = [];
  public config = {
    project: {},
    release: {},
    cycles: [],
    refreshRate: {},
  };
  _gadgetId;
  public selectedCycles = [];
  data;

  @Output() saveConfigEmitter: EventEmitter<any> = new EventEmitter();
  public cycles = [];

  private unsubscribe;
  private _executionStatus = {};

  constructor(public router: Router, _releaseAction: ReleaseAction, _gadgetAction: GadgetAction,
              private _testcaseEasAction : TestcaseEASAction, private elementRef: ElementRef) {
    super(router, _releaseAction, _gadgetAction);
    this.zephyrStore = ZephyrStore.getZephyrStore();

    this.zephyrStore.dispatch(this._releaseAction.fetchAllReleases());

    this.unsubscribe = this.zephyrStore.subscribe(() => {
      let state = this.zephyrStore.getState();

      if(state.gadget.event === GET_GADGET_DATA_SUCCESS && state.gadget.gadgetId === this._gadgetId && !this.isConfigureMode) {
        this.setExecutionSummaries(_.cloneDeep(state.gadget.gadgetData[this._gadgetId]));
        // this.setExecutionSummaries(this.mockData[this.currentChartHierarchy]);
        this.zephyrStore.dispatch(this._gadgetAction.clearGadgetEvents(FETCH_GADGET_DATA_SUCCESS + state.gadget.gadgetId));
      }

      let _execStatuses = this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV] ?
        JSON.parse(this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV]) : [];

      this._executionStatus = {};
      _execStatuses.forEach(status => {
        if (status.active === "true") {
          if(status['id'] == 10) {
            this._executionStatus[UNEXECUTED] = _.cloneDeep(status);
            this._executionStatus[UNEXECUTED].value = 'Unexecuted';
          } else {
            this._executionStatus[status['id']] = _.cloneDeep(status);
          }
        }
      });

      if(state.testcaseEAS.event == GET_RELEASE_CYCLES_SUCCESS + this.selectedRelease) {
        this.cycles.splice(0);
        state.testcaseEAS.cycles.forEach(cycle => {
          if(cycle.status == 0) {
            this.cycles.push({
              id: cycle.id.toString(),
              text: cycle.name
            });
          }
        });
        setTimeout(() => {
          this.zephyrStore.dispatch(this._testcaseEasAction.clearEvents(GET_RELEASE_CYCLES_SUCCESS + this.selectedRelease));
        }, 100);
      }
    });
  }

  setSelectedCycles(data) {
    this.config.cycles = this.config.cycles || [];
    this.config.cycles.push(data);
  }

  removeSelectedCycle(data) {
    this.config.cycles = this.config.cycles || [];
    this.config.cycles = this.config.cycles.filter(user => {if(data['id'] != user['id']) return user;});
  }

  updateTitle() {

    if (this.hierarchy.length) {
      let titleArr = _.cloneDeep(this.hierarchy);
      // titleArr.unshift(CHART_TITLE);
      this.chartTitle = titleArr.join(" -> ");
    } else {
      this.chartTitle = '';
    }

  }

  setConfig(gadgetId, gadgetDetails) {

    super.setConfig(gadgetId, gadgetDetails, false);

    if (gadgetDetails) {
      this.config.cycles = gadgetDetails.properties.config.cycles;

      if (!_.isEmpty(this.config) && this.config.project) {
        this.selectedCycles = _.cloneDeep(this._gadget.properties.config.cycles).map((c) => {
          return c.toString();
        });

        this.zephyrStore.dispatch(this._testcaseEasAction.getAllCycles(this.selectedRelease));

        this.refreshMetrics();
      }
    }
  }

  refreshMetrics(changeHierarchy = true) {
    if (!this.hasConfigError) {

      let queryString = "";

      if (changeHierarchy) {
        this.currentId = -1;
        this.currentType = '';
        this.hierarchy = [];

        if (this.drillDownChart) {
          this.drillDownChart.resetLevel();
        }

      }

      if (this.currentId !== -1) {
        queryString = `id=${this.currentId}&type=${this.currentType}`;
      }
      this.zephyrStore.dispatch(this._gadgetAction.getGadgetData(this._gadgetId, queryString));
    }
  }

  onDrillUp($event) {
    this.currentId = $event.id;

    if ($event.currentLevel === 1) {

      this.currentType = CYCLE_PHASE;

    } else if ($event.currentLevel >= 2) {

      this.currentType = PHASE;

    } else {
      this.currentType = "";
      this.currentId = -1;
    }

    this.refreshMetrics(false);
    this.hierarchy.pop();
  }

  onDrillDown($event) {
    this.currentId = $event.id;

    if ($event.currentLevel === 2) {

      this.currentType = CYCLE_PHASE;

    } else if ($event.currentLevel >= 3) {

      this.currentType = PHASE;

    }

    this.refreshMetrics(false);
    this.hierarchy.push($event.name);
  }

  setExecutionSummaries(releaseSummaries, drilldown = true) {
    let executionStatusesIds = _.map(this._executionStatus, 'id');

    let executionStatusesValues = _.map(this._executionStatus, 'value');

    this.colors = _.map(this._executionStatus, 'color');

    if (this._executionStatus[UNEXECUTED]) {
      executionStatusesIds[executionStatusesIds.indexOf(this._executionStatus[UNEXECUTED].id)] = UNEXECUTED;
    }

    this.legendsMetadata = [];

    let key = 'id';

    if (this.currentType === CYCLE_PHASE) {
      key = TCR_CATALOG_TREE_ID;
    }

    releaseSummaries = releaseSummaries.filter((release) => {
      if (release.entityStatus) {
        return release;
      }
    });

    this.height = releaseSummaries.length * 40;

    if (this.height < 300) {
      this.height = 300;
    }

    releaseSummaries.forEach(release => {

      this.legendsMetadata.push({
        name : release.entity.name,
        id : release.entity[key],
        drilldown : release.drillDownPresent
        // drilldown : release.cycle.hasDrillDown
      });

    });

    this.data = [];

    let statuses = _.map(releaseSummaries, 'entityStatus');

    // if (statuses.length) {
      executionStatusesIds.forEach((key, ind) => {

        let chartData = {
          name: executionStatusesValues[ind],
          data: [],
          options: {
            ids: []
          }
        };

        let noStatusCount = 0;

        releaseSummaries.forEach((summary, index) => {

          if (!isNaN(key)) {
            key = parseInt(key);
          }

          if (summary.entityStatus && summary.entityStatus[key]) {
            chartData.data.push(summary.entityStatus[key]);
          } else {
            noStatusCount++;
            chartData.data.push(0);
          }

          chartData.options.ids.push({
            id : summary.entity[key],
            name : summary.entity.name
          });
        });

        this.data.push(chartData);
      });
    // }

    this.updateTitle();
  }

  enableSave() {
    let value = this.config && this.config.project && this.config.release && this.config.refreshRate;
    if(value) {
      value = this.selectedCycles && this.selectedCycles.length > 0;
    }
    return Boolean(value);
  }

  toggleChart() {
    this.drillDownChart.redrawChart();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.unsubscribe();
  }

  setProject(data) {
    super.setProject(data);
    this.selectedCycles.splice(0);
  }

  setReleaseValue(data) {
    super.setReleaseValue(data);
    this.selectedCycles.splice(0);
    this.zephyrStore.dispatch(this._testcaseEasAction.getAllCycles(this.selectedRelease));
  }

  saveConfig() {
    // this.config.cycles = this.selectedCycles.map(cycle => {
    //   return Object(cycle).toString();
    // });

    this.config.cycles = _.uniq(this.selectedCycles);
    let gadget = super.saveConfig();
    this.saveConfigEmitter.emit(gadget);
  }
}
