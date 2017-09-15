import {
  Component, Input,
  Injector, Output, EventEmitter, ViewChild, ViewContainerRef,
  ComponentRef, ComponentFactoryResolver, OnDestroy, ElementRef
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


// import {Component, Input, AfterViewInit, DynamicComponentLoader,
//     Injector, Output, EventEmitter, ViewChild, ViewContainerRef,
//     ComponentResolver, ComponentRef} from '@angular/core';


declare var jQuery, _;
// Constants
import {ReleaseStatusRequirementsGadgetComponent} from '../release_status_requirements/release_status_requirements.component';
import {FETCH_RELEASE_SUMMARIES_SUCCESS, FETCH_GADGET_DATA_SUCCESS} from '../../../../../utils/constants/action.events';
import {TeamAction} from '../../../../../actions/team.action';
import {TCRAction} from '../../../../../actions/tcr.action';
import {TestcaseAction} from '../../../../../actions/testcase.action';
import {GadgetAction} from '../../../../../actions/gadget.action';
import {GET_GADGET_DATA_SUCCESS} from '../../../../../utils/constants/action.events';
import {GadgetClass} from '../gadget.class';

@Component({
	selector: 'zui-automation-by-phase-tag-gadget',
  templateUrl: 'release_status_automation_by_phase_tag.html',
  providers : [TeamAction, TCRAction, TestcaseAction, GadgetAction]
})

export class ReleaseStatusAutomationByPhaseTagGadgetComponent extends GadgetClass implements GadgetInterface, OnDestroy {
  @Output() saveConfigEmitter: EventEmitter<any> = new EventEmitter();

  public config = {
    project: {},
    release: '',
    refreshRate: {},
    tags: [],
    phases: [],
    showBy: ''
  };

  phases = [];
  _phases= [];
  data;
  width;
  height;

  public selectedTags = [];
  public selectedPhases = [];

  public tags = [];

  public configTags = [];

  options = {
    token: [' ', ','],
    createTag: tag => ({
      id: tag.term,
      text: tag.term
    })
  };
  private unsubscribe;
  private minHeight = 200;
  private maxHeight = 400;
  private eachBarWidth = 30;
  //private i18nMessages = I18N_MESSAGES;

  constructor(public router: Router, public _releaseAction: ReleaseAction, private _projectAction: ProjectAction
    , private _testcaseAction : TestcaseAction, private _tcrAction: TCRAction,
    _gadgetAction: GadgetAction, private elementRef: ElementRef) {

    super(router, _releaseAction, _gadgetAction);

    this.zephyrStore.dispatch(this._testcaseAction.getAllTags());

    this.unsubscribe = this.zephyrStore.subscribe(() => {
      let state = this.zephyrStore.getState();

      if(state.tcr.phasesPerRelease[this.config.release]) {
        this.phases = state.tcr.phasesPerRelease[this.config.release].map((item) => ({id: item.id,text:`${item.name}`}));

        if (this.selectedPhases.length) {
          let _phases = _.map(this.phases, 'id');
          //this.selectedPhases = _.intersection(_phases, this.selectedPhases);
          for(let i = 0; i < this.selectedPhases.length; ) {
            if(_phases.indexOf(this.selectedPhases[i]) === -1) {
              this.selectedPhases.splice(i, 1);
            } else {
              ++i;
            }
          }

          this.config.phases = _.filter(this.config.phases, (o) => {
            return this.selectedPhases.indexOf(o.id) !== -1;
          });
        }

      }

      if(state.testcase.tags) {
        this.tags = [];
        let i = 0;
        state.testcase.tags.forEach(t => {
          this.tags.push({id: i, text: t});
          ++i;
        });
      }

      if(state.gadget.event === GET_GADGET_DATA_SUCCESS && state.gadget.gadgetId === this._gadgetId && !this.isConfigureMode) {
        this.setChartData(_.cloneDeep(state.gadget.gadgetData[this._gadgetId]));
        this.zephyrStore.dispatch(this._gadgetAction.clearGadgetEvents(FETCH_GADGET_DATA_SUCCESS, state.gadget.gadgetId));
      }

    });
  }

  setConfig(gadgetId, gadgetDetails) {
    super.setConfig(gadgetId, gadgetDetails, false);

    if (gadgetDetails) {
      if (!_.isEmpty(this.config) && this.config.project) {
        this.selectedTags = this.config.tags ? this.config.tags.map(tag => (tag.id)) : [];
        this.selectedPhases = this.config.phases ? this.config.phases.map(phase => (phase.id)) : [];
        this.configTags = _.cloneDeep(this.config.tags ? this.config.tags.map(tag => (tag.id)) : []);

        this.refreshMetrics();
        this.zephyrStore.dispatch(this._tcrAction.fetchTestcasePhasesByReleaseId(this.config.release));
      }
    }
  }

  toggleConfigurationMode(mode) {
    this.isConfigureMode = mode;

    if(!mode) {
      this.setConfig(this._gadgetId, this._gadget);
    } else {
      this.zephyrStore.dispatch(this._tcrAction.fetchTestcasePhasesByReleaseId(this.config.release));
    }

    this.cancelConfigEmitter.emit();
  }

  setChartData(response) {
    let yAxisLabel = this.config.showBy;

    let chartData = {
      x: 'Percent Completed',
      y: yAxisLabel,
      data: []
    };

    response = _.sortBy(response, (res) => res.name.toLocaleUpperCase());

    response.forEach(statuses => {
      /*if(this.selectedCycles.indexOf(summary.cycle.id) === -1) {
        return;
      }*/
      let automated = 0, manual = 0, total = 0;
      for(var key in statuses.status) {
        if(key === 'automated') {
          automated += statuses.status[key] = +statuses.status[key];
        } else {
          manual += statuses.status[key] = +statuses.status[key];
        }
      }

      let d = {};
      d['x'] = {};
      d['x']['entries'] = [];

      total = automated + manual;

      if(total > 0) {
        var automatedPercentage = {};
        automatedPercentage['name'] = 'Automated';
        automatedPercentage['value'] = total > 0 ? (automated * 100) / total : 0;
        automatedPercentage['color'] = '#56c88d';

        var manualPercentage = {};
        manualPercentage['name'] = 'Manual';
        manualPercentage['value'] = total > 0 ? (manual * 100) / total : 0;
        manualPercentage['color'] = '#9E987D';

        d['x']['entries'].push(automatedPercentage);
        d['x']['entries'].push(manualPercentage);

        d['y'] = {};
        d['y']['id'] = statuses.id;
        d['y']['name'] = statuses.name;
        d['label'] = +automatedPercentage['value'].toFixed(2) + '% Automated';

        let tooltip = '<div align="center"><strong style="word-wrap: break-word;">' + _.escape(statuses.name) + '</strong></div> <hr>' +
          '<div class="row">';

        for (var key in statuses.status) {
          //tooltip += '<tr>';
          let count = +statuses.status[key];
          let percentage = +((total > 0 ? (count * 100) / total : 0).toFixed(2));
          let keyName = _.startCase(key);

          tooltip += '<div class="col-md-5" style="word-wrap: break-word;">' + keyName + '</div>' +
            '<div class="col-md-4 tip-align">' + statuses.status[key] + '</div>'
            + '<div class="col-sm-3 tip-align">' + percentage + '%</div><hr>';
          //tooltip += '</tr>';
        }

        tooltip += '</div>';

        tooltip += '<hr> <div class="row"><div class="col-md-5"><strong>Total</strong></div>' +
          '<div class="col-md-4 tip-align">' + total + '</div>'
          + '<div class=""></div></div>';

        d['tooltip'] = tooltip;

        chartData.data.push(d);
      }

    });

    this.width = jQuery(this.elementRef.nativeElement).parents('.zui-panel-body').width();

    let totalHeight = chartData.data.length * this.eachBarWidth;

    this.height = totalHeight < this.minHeight ? this.minHeight : totalHeight;

    if(chartData.data.length > 0) {
      this.data = _.cloneDeep(chartData);
    } else {
      this.data = null;
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.unsubscribe();
  }

  enableSave() {
    let value = this.config && this.config.project && this.config.release && this.config.refreshRate && this.config.showBy;
    if(value) {
      if(this.config.showBy === 'tag') {
        return this.selectedTags.length > 0;
      } else if(this.config.showBy === 'phase') {
        return this.selectedPhases.length > 0;
      }
    }
    return Boolean(value);
  }

  toggleChart() {
    let totalHeight = this.data.data.length * this.eachBarWidth;

    this.width = jQuery(this.elementRef.nativeElement).parents('.zui-panel-body').width();
    this.height = totalHeight;// > this.maxHeight ? this.maxHeight : totalHeight < this.minHeight ? this.minHeight : totalHeight;
  }

  setReleaseValue(data) {
    super.setReleaseValue(data);
    this.zephyrStore.dispatch(this._tcrAction.fetchTestcasePhasesByReleaseId(this.config.release));
  }

  /*setTags(data) {
    this.config.tags = this.config.tags || [];
    this.config.tags.push(data);
  }

  removeTag(data) {
    this.config.tags = this.config.tags || [];
    this.config.tags = this.config.tags.filter(tag => {if(data['id'] !== tag['id']) return tag;});
  }

  setPhases(data) {
    this.config.phases = this.config.phases || [];
    this.config.phases.push(data);
  }

  removePhase(data) {
    this.config.phases = this.config.phases || [];
    this.config.phases = this.config.phases.filter(user => {if(data['id'] != user['id']) return user;});
  }*/

  saveConfig() {
    // this._gadgetConfig = _.cloneDeep(this.config);

    let tagsObject = {};
    this.tags.forEach((t) => {
      tagsObject[t.id] = t;
    });

    //this.config.tags.splice(0);
    this.config.tags = this.selectedTags.map(tag => {
      return tagsObject[tag];
    });

    let phasesObject = {};
    this.phases.forEach(p => {
      phasesObject[p.id] = p;
    });
    //this.config.phases.splice(0);
    this.config.phases = this.selectedPhases.map(phase => {
      return phasesObject[phase];
    });
    let gadget = super.saveConfig();

    this.saveConfigEmitter.emit(gadget);
    // this.refreshMetrics();
  }


  selectRadio(ev) {
    let selectedParent = jQuery(ev.target).parents('#select-by-phases-' + this._gadgetId).length > 0
      ? jQuery(ev.target).parents('#select-by-phases-' + this._gadgetId) : jQuery(ev.target).parents('#select-by-tags-' + this._gadgetId);
    selectedParent.siblings('input').prop('checked',true);
    this.config.showBy = selectedParent.siblings('input')[0]['id'];
  }
}
