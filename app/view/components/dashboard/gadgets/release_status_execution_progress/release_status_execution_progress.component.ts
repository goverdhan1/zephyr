import {
  Component, Input,
  Injector, Output, EventEmitter, ViewChild, ViewContainerRef,
  ComponentRef, ComponentFactoryResolver, OnDestroy
} from '@angular/core';

import {GET_GADGET_DATA_SUCCESS} from '../../../../../utils/constants/action.events';

//import {TestCaseDistByPhaseComponent} from './gadgets/testcase_dist_by_phase.component';
import { ProjectTeamComponent } from '../../../projects/project_team.component';
import {Router} from '@angular/router';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {REFRESH_RATE, REFRESH_RATE_MAPPINGS} from '../constants/constants';
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

declare var jQuery, _;
// Constants
import {ReleaseStatusRequirementsGadgetComponent} from '../release_status_requirements/release_status_requirements.component';
import {FETCH_RELEASES_AUTOMATION_SUMMARY_SUCCESS, FETCH_RELEASE_SUMMARIES_SUCCESS, FETCH_GADGET_DATA_SUCCESS}
from '../../../../../utils/constants/action.events';
import {TeamAction} from '../../../../../actions/team.action';
import {TCRAction} from '../../../../../actions/tcr.action';
import {TestcaseAction} from '../../../../../actions/testcase.action';
import {GadgetAction} from '../../../../../actions/gadget.action';
import {TestcaseEASAction} from '../../../../../actions/testcaseEAS.action';
import {GadgetClass} from '../gadget.class';

@Component({
	selector: 'zui-release-status-execution-progress-gadget',
  templateUrl: 'release_status_execution_progress.html',
  providers : [GadgetAction, TestcaseEASAction]
})

export class ReleaseStatusExecutionProgressGadgetComponent  extends GadgetClass implements GadgetInterface, OnDestroy {
  public config = {
    project: '',
    release: '',
    cycles: [],
    refreshRate: '',
  };

  _gadgetId;

  public selectedCycles = [];

  @Output() saveConfigEmitter: EventEmitter<any> = new EventEmitter();
  public cycles = [];
  private unsubscribe;

  constructor(public router: Router, _releaseAction: ReleaseAction, _gadgetAction: GadgetAction,
              private _testcaseEasAction : TestcaseEASAction) {
    super(router, _releaseAction, _gadgetAction);
    this.zephyrStore = ZephyrStore.getZephyrStore();

    this.unsubscribe = this.zephyrStore.subscribe(() => {
      let state = this.zephyrStore.getState();

      if(state.gadget.event === GET_GADGET_DATA_SUCCESS && state.gadget.gadgetId === this._gadgetId && !this.isConfigureMode) {
        this.setReleaseSummaries(_.cloneDeep(state.gadget.gadgetData[this._gadgetId]));
        this.zephyrStore.dispatch(this._gadgetAction.clearGadgetEvents(FETCH_GADGET_DATA_SUCCESS, state.gadget.gadgetId));
      }

      if(state.testcaseEAS.event == GET_RELEASE_CYCLES_SUCCESS + this.selectedRelease) {
        this.cycles.splice(0);

        state.testcaseEAS.cycles.forEach(cycle => {
          if(cycle.status == 0) {
            this.cycles.push({
              id: cycle.id,
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

  setConfig(gadgetId, gadgetDetails) {
    super.setConfig(gadgetId, gadgetDetails, false);

    if (gadgetDetails) {
      this.config.cycles = gadgetDetails.properties.config.cycles;

      if (!_.isEmpty(this.config) && this.config.project) {
        this.selectedCycles = _.cloneDeep(this.config.cycles);// ? this._gadgetConfig.cycles.map(cycle => (cycle.id)) : [];

        this.zephyrStore.dispatch(this._testcaseEasAction.getAllCycles(this.selectedRelease[0]));

        this.isConfigureMode = false;
        this.setProjectName();
        this.refreshMetrics();
      }
    }
  }

  enableSave() {
    let value = this.config && this.config.project && this.config.release && this.config.refreshRate;
    if(value) {
      return Boolean(this.selectedCycles && this.selectedCycles.length > 0);
    }
    return Boolean(value);
  }

  setReleaseSummaries(releaseSummaries) {

    let executionSummary = {
      count: '0',
      groups: [
        {
          name: 'Test Cycle',
          items: [

          ]
        }
      ]
    };

    let totalCycleCount = 0;
    let total = 0;
    let _cycleIds = this._gadget.properties.config.cycles.map(c => {
      return +c;
    });

    releaseSummaries.execution.cycles.forEach(cycle => {
      if(_cycleIds.indexOf(cycle.cycleId) == -1) {
        return;
      }
      //totalCount += cycle.completation > 0 ? 1 : 0;
      totalCycleCount += 1;
      total += cycle.completation;

      executionSummary.groups[0].items.push({
        name: cycle.cycleName,
        count: cycle.completation + '%',
        highlightCount: false
      });
    });

    if (totalCycleCount === 0) {
      executionSummary.count = '0%';
    } else {
      executionSummary.count = _.round((total / totalCycleCount), 2) + '%';
    }

    let finalReleaseSummary = _.cloneDeep(RELEASE_SUMMARIES[2]);
    _.merge(finalReleaseSummary, executionSummary);
    this.summaries = finalReleaseSummary;

  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.unsubscribe();
  }

  setReleaseValue(data) {
    super.setReleaseValue(data);
    this.selectedCycles = [];
    this.zephyrStore.dispatch(this._testcaseEasAction.getAllCycles(this.selectedRelease[0]));
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
    gadget.properties.config.cycles = this.selectedCycles;
    this.saveConfigEmitter.emit(gadget);
    // this.refreshMetrics();
  }
}
