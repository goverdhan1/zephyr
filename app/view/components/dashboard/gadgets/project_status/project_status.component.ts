import {
  Component,
  Output, EventEmitter,
  OnDestroy
} from '@angular/core';

import {Router} from '@angular/router';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {ProjectAction} from '../../../../../actions/project.action';
import {GadgetInterface} from '../gadgets.interface';
import {ReleaseAction} from '../../../../../actions/release.action';
import {GadgetClass} from '../gadget.class';

declare var jQuery, _;
// Constants
import {FETCH_ALL_GADGETS_SUCCESS, FETCH_GADGET_DATA_SUCCESS, GET_GADGET_DATA_SUCCESS} from '../../../../../utils/constants/action.events';
import {TeamAction} from '../../../../../actions/team.action';
import {TCRAction} from '../../../../../actions/tcr.action';
import {TestcaseAction} from '../../../../../actions/testcase.action';
import {GadgetAction} from '../../../../../actions/gadget.action';
import {PROJECT_SUMMARY_FIELDS} from '../../../projects/project.constant';

@Component({
	selector: 'zui-project-status-gadget',
    templateUrl: 'project_status.html',
  providers : [TeamAction, TCRAction, TestcaseAction, GadgetAction]
})

export class ProjectStatusGadgetComponent extends GadgetClass implements GadgetInterface, OnDestroy {
  public isConfigureMode: Boolean = true;
  refreshRates = [];

  public config = {
    project: '',
    refreshRate : '1d'
  };

  public summaries;
  @Output() saveConfigEmitter: EventEmitter<any> = new EventEmitter();
  @Output() cancelConfigEmitter: EventEmitter<any> = new EventEmitter();
  public zephyrStore;

  private unsubscribe;

  constructor(public router: Router, _gadgetAction: GadgetAction, _releaseAction: ReleaseAction) {
    super(router, _releaseAction, _gadgetAction);
    this.zephyrStore = ZephyrStore.getZephyrStore();
    this.refreshRates = [];

    this.unsubscribe = this.zephyrStore.subscribe(() => {
      let state = this.zephyrStore.getState();

      if(state.gadget.event === GET_GADGET_DATA_SUCCESS && state.gadget.gadgetId === this._gadget.id && !this.isConfigureMode) {
        this.summaries = this.parseProjectSummaries(_.cloneDeep(state.gadget.gadgetData[this._gadget.id]));
        this.zephyrStore.dispatch(this._gadgetAction.clearGadgetEvents(FETCH_GADGET_DATA_SUCCESS, state.gadget.gadgetId));
      }
    });
  }

  setConfig(gadgetId, gadgetDetails) {
    if (gadgetDetails) {
      this._gadgetId = gadgetId;
      this._gadget = _.cloneDeep(gadgetDetails);
      this.config = gadgetDetails.properties.config;

      this.config.project = gadgetDetails.projectId;
      this.config.refreshRate = '1d';

      if (!_.isEmpty(this.config) && this.config.project) {
        this.selectedProject = [this.config.project];
        this.setProjectName();
        this.isConfigureMode = false;
        this.refreshMetrics();
      }
    }
  }

  parseProjectSummaries(projectSummary) {
    let summaries = _.map(_.cloneDeep(PROJECT_SUMMARY_FIELDS), (summary) => {
      summary.count = (projectSummary[summary.key]);
      return summary;
    });
    this.isConfigureMode = false;

    return summaries;
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  saveConfig() {
    this.setProjectName();

    let gadget = _.cloneDeep(this._gadget);

    gadget.projectId = this.config.project;
    gadget.refreshInterval = this.config.refreshRate;

    gadget.properties.config = _.cloneDeep(this.config);
    delete gadget.properties.config.project;
    delete gadget.properties.config.refreshRate;
    this.saveConfigEmitter.emit(gadget);
  }
}
