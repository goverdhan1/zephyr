import {
  Component, Input,
  Injector, Output, EventEmitter, ViewChild, ViewContainerRef,
  ComponentRef, ComponentFactoryResolver, OnDestroy
} from '@angular/core';
//import {TestCaseDistByPhaseComponent} from './gadgets/testcase_dist_by_phase.component';
import { ProjectTeamComponent } from '../../../projects/project_team.component';
import {Router} from '@angular/router';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {REFRESH_RATE_MAPPINGS} from '../constants/constants';
import {RELEASE_SUMMARIES} from '../../../../../mocks/releases.mock';
import {ReleaseAction} from '../../../../../actions/release.action';
import {ProjectAction} from '../../../../../actions/project.action';
import {GadgetInterface} from '../gadgets.interface';
import {GET_GADGET_DATA_SUCCESS, FETCH_ALL_GADGETS_SUCCESS} from '../../../../../utils/constants/action.events';

// import {Component, Input, AfterViewInit, DynamicComponentLoader,
//     Injector, Output, EventEmitter, ViewChild, ViewContainerRef,
//     ComponentResolver, ComponentRef} from '@angular/core';

import {CLEAR_RELEASE_EVENTS, SORT_RELEASE_GRID, GET_RELEASE_SETUP_GRID} from '../../../../../utils/constants/action.types';
import {GadgetClass} from '../gadget.class';

declare var jQuery, _;
// Constants
import {ReleaseStatusRequirementsGadgetComponent} from '../release_status_requirements/release_status_requirements.component';
import {FETCH_RELEASES_AUTOMATION_SUMMARY_SUCCESS, FETCH_RELEASE_SUMMARIES_SUCCESS, FETCH_GADGET_DATA_SUCCESS}
from '../../../../../utils/constants/action.events';
import {TeamAction} from '../../../../../actions/team.action';
import {TCRAction} from '../../../../../actions/tcr.action';
import {TestcaseAction} from '../../../../../actions/testcase.action';
import {GadgetAction} from '../../../../../actions/gadget.action';

@Component({
	selector: 'zui-release-automation-status-gadget',
    templateUrl: 'release_automation_status.html',
    providers : [TeamAction, TCRAction, TestcaseAction, GadgetAction]
})

export class ReleaseAutomationStatusGadgetComponent extends GadgetClass implements GadgetInterface, OnDestroy {
  unsubscribe;
  @Output() saveConfigEmitter: EventEmitter<any> = new EventEmitter();
  //private i18nMessages = I18N_MESSAGES;

  constructor(public router: Router, _releaseAction: ReleaseAction, _gadgetAction: GadgetAction) {
    super(router, _releaseAction, _gadgetAction);

    this.zephyrStore = ZephyrStore.getZephyrStore();
    let state = this.zephyrStore.getState();

    this.allReleases = state.release.allReleases;

    this.unsubscribe = this.zephyrStore.subscribe(() => {
      let state = this.zephyrStore.getState();

      if(state.gadget.event === GET_GADGET_DATA_SUCCESS && state.gadget.gadgetId === this._gadgetId && !this.isConfigureMode) {
        this.setReleaseSummaries(_.cloneDeep(state.gadget.gadgetData[this._gadgetId]));
        this.zephyrStore.dispatch(this._gadgetAction.clearGadgetEvents(FETCH_GADGET_DATA_SUCCESS, state.gadget.gadgetId));
      }
    });
  }

  setReleaseSummaries(summary) {
    let sum = {
      total : summary.totalTestcaseCount,
      project : summary.projectName,
      release: summary.releaseName,
      automated : summary.automatedTestcaseCount,
      percent : (summary.totalTestcaseCount > 0 ? (summary.automatedTestcaseCount * 100 / summary.totalTestcaseCount) : 0)
    };
    this.summary = sum;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.unsubscribe();
  }

  saveConfig() {
    let gadget = super.saveConfig();

    this.saveConfigEmitter.emit(gadget);
    // this.refreshMetrics();
  }
  isSummary() {
    return !this.isConfigureMode && this.summary;
  }
}
