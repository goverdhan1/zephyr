import {
  Inject, Component, Input,
  Injector, Output, EventEmitter, ViewChild, ViewContainerRef,
  ComponentRef, ComponentFactoryResolver, OnDestroy
} from '@angular/core';
//import {TestCaseDistByPhaseComponent} from './gadgets/testcase_dist_by_phase.component';
import { ProjectTeamComponent } from '../../projects/project_team.component';
import {Router} from '@angular/router';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {RELEASE_SUMMARIES} from '../../../../mocks/releases.mock';

import {ReleaseAction} from '../../../../actions/release.action';
import {ProjectAction} from '../../../../actions/project.action';
import {GET_GADGET_DATA_EVENT_FAIL, FETCH_RELEASES_SUCCESS, GET_GADGET_DATA_SUCCESS, FETCH_ALL_GADGETS_SUCCESS} from '../../../../utils/constants/action.events';

// import {Component, Input, AfterViewInit, DynamicComponentLoader,
//     Injector, Output, EventEmitter, ViewChild, ViewContainerRef,
//     ComponentResolver, ComponentRef} from '@angular/core';

import {CLEAR_RELEASE_EVENTS, SORT_RELEASE_GRID, GET_RELEASE_SETUP_GRID} from '../../../../utils/constants/action.types';

declare var jQuery, _, moment;
// Constants
import {FETCH_RELEASES_AUTOMATION_SUMMARY_SUCCESS, FETCH_RELEASE_SUMMARIES_SUCCESS, FETCH_GADGET_DATA_SUCCESS}
  from '../../../../utils/constants/action.events';
import {TeamAction} from '../../../../actions/team.action';
import {TCRAction} from '../../../../actions/tcr.action';
import {TestcaseAction} from '../../../../actions/testcase.action';
import {GadgetAction} from '../../../../actions/gadget.action';
import {UserAction} from "../../../../actions/user.action";

export class GadgetClass implements OnDestroy {
  projects = [];

  public isConfigureMode: Boolean = true;
  @Output() cancelConfigEmitter: EventEmitter<any> = new EventEmitter();
  @Output() onConfigErrorEmitter: EventEmitter<any> = new EventEmitter();

  summary : {};
  projectName = '';
  releaseName = '';
  hasConfigError = false;

  public config : any = {
    project: '',
    release: '',
    refreshRate: '',
  };

  _gadgetId;

  refreshRates = [];
  public lastRefreshTime : any = moment();
  public lastRefreshTimeLabel : string;
  public selectedRelease = [];
  public selectedProject = [];
  public selectedRefreshRate = [];
  _gadget;

  public summaries;
  public fv = [];
  allReleases = [];
  public releases = [];
  public zephyrStore;
  public parentUnsubscribe;
  public _releaseAction;
  _gadgetAction;
  private hasDataLoadingError = false;
  //private i18nMessages = I18N_MESSAGES;

  constructor(public router: Router, _releaseAction: ReleaseAction, _gadgetAction: GadgetAction) {
    this._releaseAction = _releaseAction;
    this._gadgetAction = _gadgetAction;
    this.zephyrStore = ZephyrStore.getZephyrStore();

    let state = this.zephyrStore.getState();

    if (!this.projects.length) {
      this.getFilteredProjects();
    }

    if (!state.release.allReleases.length) {
      this.zephyrStore.dispatch(this._releaseAction.fetchAllReleases());
    }

    this.allReleases = state.release.allReleases;

    this.setRefreshRates(state);

    this.parentUnsubscribe = this.zephyrStore.subscribe(() => {
      let state = this.zephyrStore.getState();

      if (!this.projects.length) {
        this.getFilteredProjects();
      }

      this.allReleases = state.release.allReleases;

      this.setRefreshRates(state);

      if (this.config.project) {
        this.setFilteredReleases(this.config.project);

        if (!this.isConfigureMode) {
          this.setProjectName();
        }
      }

      if(state.gadget.event === GET_GADGET_DATA_SUCCESS && state.gadget.gadgetId === this._gadgetId && !this.isConfigureMode) {
        this.lastRefreshTime = moment();
        this.lastRefreshTimeLabel = this.lastRefreshTime.fromNow();
        this.projectName = _.cloneDeep(state.gadget.gadgetMeta[this._gadget.id].projectName);
        this.releaseName = _.cloneDeep(state.gadget.gadgetMeta[this._gadget.id].releaseName);
      }

      if(state.gadget.event === GET_GADGET_DATA_EVENT_FAIL && state.gadget.gadgetId === this._gadgetId && !this.isConfigureMode) {
        this.hasDataLoadingError = true;
        this.onConfigErrorEmitter.emit({
          noError: false,
          message : 'Couldn\'t fetch data for gadget. The configured project or release is no longer available.'
        });

        this.zephyrStore.dispatch(this._gadgetAction.clearGadgetEvents());
      }

      if(state.gadget.event === GET_GADGET_DATA_SUCCESS && state.gadget.gadgetId === this._gadgetId && !this.isConfigureMode) {
        this.lastRefreshTime = moment();
      }
    });
  }

  setRefreshRates(state) {
    setTimeout(() => {

      if (!this.refreshRates) {
        this.refreshRates = [];
      }

      if ((state.dashboards.event === FETCH_ALL_GADGETS_SUCCESS || state.dashboards.gadgets.length) && !this.refreshRates.length) {
        this.refreshRates = _.filter(state.dashboards.gadgets, {component: this._gadget.component})[0].refreshValues;
      }
    });
  }

  refreshMetrics() {
    if (!this.hasConfigError) {
      this.zephyrStore.dispatch(this._gadgetAction.getGadgetData(this._gadgetId));
    }
  }

  setConfig(gadgetId, gadgetDetails, refreshMerics = true) {

    if (gadgetDetails) {
      this._gadget = _.cloneDeep(gadgetDetails);
      this.config = gadgetDetails.properties.config;

      this.config.project = gadgetDetails.projectId;
      this.config.release = gadgetDetails.releaseId;
      this.config.refreshRate = gadgetDetails.refreshInterval;

      this._gadgetId = gadgetId;

      if (!_.isEmpty(this.config) && this.config.project) {
        this.selectedProject = [this.config.project];
        this.selectedRelease = [this.config.release];
        this.selectedRefreshRate = [this.config.refreshRate];

        this.setFilteredReleases(this.config.project);

        this.isConfigureMode = false;
        this.setProjectName();

        if (refreshMerics) {
          this.checkAndRefreshMetrics();
        }
      }
    }
  }

  checkAndRefreshMetrics() {
      let state = this.zephyrStore.getState();

      if(!state.gadget.gadgetData[this._gadgetId]) {
        this.refreshMetrics();
      }

  }

  showConfigError() {

  }

  setFilteredReleases(id) {
    if (id) {
      this.releases = _.filter(this.allReleases, {projectId: id, status: 0}).map((val, key) => {
        return {
          id: val.id,
          text: val.name,
        };
      });
    }
  }


  toggleConfigurationMode(mode) {
    this.isConfigureMode = mode;

    if(!mode) {
      this.setConfig(this._gadgetId, this._gadget);
    }
    this.cancelConfigEmitter.emit();
  }

  setReleaseSummaries(releaseSummaries) {
    this.summary = releaseSummaries;
  }

  ngOnDestroy() {
    this.parentUnsubscribe();
  }

  getFilteredProjects() {
    let allocatedProjIds = this.zephyrStore.getState().projects.userAllocatedProjects;
    let allProjects = this.zephyrStore.getState().projects.projects;
    let userInfo = localStorage.getItem(`userInfo`) ? JSON.parse(localStorage.getItem(`userInfo`)).id : undefined;

    if(allocatedProjIds && userInfo !== 1) {
      allProjects = allProjects.filter(project => allocatedProjIds.indexOf(project.id) > -1);
    }

    this.projects = [];

    allProjects.forEach((val, key) => {
      this.projects.push({
        id: val.id,
        text: val.name,
      });
    });

  }

  setProject(data) {
    this.config.project = data.id;

    this.setFilteredReleases(data.id);

    this.config.release = '';
    this.selectedRelease = [];
    this.selectedProject = [this.config.project];
  }

  setReleaseValue(data) {
    this.config.release = data.id;

    this.selectedRelease = [this.config.release];
  }

  setRefreshRate(data) {
    let refreshRate = _.filter(this.refreshRates, {id : data.id})[0].value;
    this.config.refreshRate = data.id;

    this.selectedRefreshRate = [data.id];
  }

  setProjectName() {
    // let project = _.filter(this.projects, {id : this.config.project});
    //
    // let previousConfigError = this.hasConfigError;
    //
    // if (project.length) {
    //   this.projectName = project[0].text;
    // }
    //
    // if (!this.hasDataLoadingError) {
    //   this.onConfigErrorEmitter.emit({
    //     noError : true
    //   });
    // }
    //
    // this.hasConfigError = false;
    //
    // if (this.config.release) {
    //   let release = _.filter(this.allReleases, {projectId: this.config.project, id : this.config.release});
    //   if (release.length) {
    //     if (release[0].status === 0) {
    //       this.releaseName = release[0].name;
    //
    //       if (!this.hasDataLoadingError) {
    //         this.onConfigErrorEmitter.emit({
    //           noError : true
    //         });
    //       }
    //       this.hasConfigError = false;
    //     } else {
    //       this.onConfigErrorEmitter.emit({
    //         message : 'The configured release is hidden.'
    //       });
    //       this.hasConfigError = true;
    //     }
    //
    //   } else {
    //     this.onConfigErrorEmitter.emit({
    //       message : 'The configured release is either deleted or you don\'t have necessary permissions.'
    //     });
    //     this.hasConfigError = true;
    //   }
    // }
    //
    // if (this.hasConfigError === false && previousConfigError) {
    //   this.refreshMetrics();
    // }

  }

  saveConfig() {
    this.setProjectName();
    this.hasConfigError = false;

    let gadget = _.cloneDeep(this._gadget);

    gadget.projectId = this.config.project;
    gadget.releaseId = this.config.release;
    gadget.refreshInterval = this.config.refreshRate;

    gadget.properties.config = _.cloneDeep(this.config);
    delete gadget.properties.config.project;
    delete gadget.properties.config.release;
    delete gadget.properties.config.refreshRate;

    return gadget;
  }
}
