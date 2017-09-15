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

const PICKLIST_ID = 3;

// Constants
import {ReleaseStatusRequirementsGadgetComponent} from '../release_status_requirements/release_status_requirements.component';
import {FETCH_RELEASE_SUMMARIES_SUCCESS, FETCH_GADGET_DATA_SUCCESS} from '../../../../../utils/constants/action.events';
import {TeamAction} from '../../../../../actions/team.action';
import {TCRAction} from '../../../../../actions/tcr.action';
import {TestcaseAction} from '../../../../../actions/testcase.action';
import {GadgetAction} from '../../../../../actions/gadget.action';
import {GET_GADGET_DATA_SUCCESS} from '../../../../../utils/constants/action.events';
import {GadgetClass} from '../gadget.class';
import {ADMIN_PREFERENCES} from '../../../admin/admin.constant';
import { AdminAction } from "../../../../../actions/admin.action";
import {
  FETCH_ALL_FIELDS_SUCCESS,
  FETCH_EXECUTION_STATUS_GRID_STATUS
} from "../../../../../utils/constants/action.types";

@Component({
	selector: 'zui-automation-by-phase-tag-gadget',
  templateUrl: 'release_status_execution_remaining.html',
  providers : [TeamAction, TCRAction, TestcaseAction, GadgetAction]
})

export class ReleaseStatusExecutionRemainingGadgetComponent extends GadgetClass implements GadgetInterface, OnDestroy {
  @Output() saveConfigEmitter: EventEmitter<any> = new EventEmitter();

  public config = {
    project: {},
    release: '',
    refreshRate: {},
    users: [],
    priorities: [],
    phases: [],
    tags: [],
    customFields: [],
    showBy: ''
  };

  users = [];
  customFieldsFetched = false;
  priorities = [];
  phases = [];
  tags = [];
  customFields= [];
  data;
  width;
  height;
  searchOnForPhases = ['text', 'cycle'];

  public phaseColumns = [
    {
      'key': 'cycle',
      'text': 'Cycle'
    },
    {
      'key': 'text',
      'text': 'Phase'
    }
  ];
  public phaseColumnKey = 'id';

  public selectedUsers = [];
  public selectedPriorities = [];
  public selectedPhases = [];
  public selectedTags = [];
  public selectedCustomFields = [];

  options = {
    token: [' ', ','],
    createTag: tag => ({
      id: tag.term,
      text: tag.term
    })
  };

  private customFieldsMaster = [];
  private _executionStatus = {};
  private unsubscribe;
  private minHeight = 200;
  private maxHeight = 400;
  private eachBarWidth = 30;
  //private i18nMessages = I18N_MESSAGES;

  constructor(public router: Router, public _releaseAction: ReleaseAction, private _projectAction: ProjectAction
    , private _testcaseAction : TestcaseAction, private _tcrAction: TCRAction, _gadgetAction: GadgetAction,
      private _adminAction: AdminAction, private _teamAction: TeamAction, private elementRef: ElementRef) {

    super(router, _releaseAction, _gadgetAction);

    this.zephyrStore.dispatch(this._testcaseAction.getAllTags());

    this.priorities = this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTCASE_TESTCASE_PRIORITY_LOV] ?
      JSON.parse(this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTCASE_TESTCASE_PRIORITY_LOV]).map(pref => {
        return {id: pref.id, text: pref.value};
      }) : [];

    this.customFields = [];
    //
    // this.customFields = _.reject(this.customFields, customField => {
    //   return customField == null;
    // });

    this.zephyrStore.dispatch(this._adminAction.getCustomFields('Testcase', this._gadgetId));
    this.customFieldsFetched = true;

    let _execStatuses = this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV] ?
      JSON.parse(this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV]) : [];

    this._executionStatus = {};
    _execStatuses.forEach(status => {
      if(status['id'] == 10) {
        this._executionStatus['unexecuted'] = _.cloneDeep(status);
        this._executionStatus['unexecuted'].value = 'Unexecuted';
      } else {
        this._executionStatus[status['id']] = _.cloneDeep(status);
      }
    });

    this.unsubscribe = this.zephyrStore.subscribe(() => {
      let state = this.zephyrStore.getState();

      let event = this.zephyrStore.getState().fields.event;

      if (event === FETCH_ALL_FIELDS_SUCCESS && this.customFieldsFetched) {
        this.customFieldsMaster = this.zephyrStore.getState().fields.fieldsGrid.rows;

        this.customFieldsFetched = false;

        if (this.config.project) {
          this.setCustomFields(this.config.project);
        }

        this.zephyrStore.dispatch(this._adminAction.clearFieldsEvents());
      }

      if(state.tcr.executionPhasesPerRelease[this.config.release]) {
        this.phases = state.tcr.executionPhasesPerRelease[this.config.release].map(
          (item) => (
            {id: item.tcrCatalogTree.id,text:`${item.tcrCatalogTree.name}`,cycle:`${item.cycleName}`}
          )
        );

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
        // this.tags = state.testcase.tags.map((item) => ({id: item, text: item}));
        // this.tags = state.testcase.tags.map((item) => ({id: item, text: item}));

        this.tags = [];
        let i = 0;

        state.testcase.tags.forEach(t => {
          this.tags.push({id: i, text: t});
          ++i;
        });

        this.reverseMapSelectedTags();
        this.tags.sort(this.sortByText);
      }

      if(state.team.teamDetailsForGadget[this._gadgetId]) {
        this.users = state.team.teamDetailsForGadget[this._gadgetId].data.map((item) =>
          ({id: item.id,text:`${item.firstName} ${item.lastName}`}));
        this.users.push({id: -10, text: 'Anyone'});
        this.users.sort(this.sortByText);
        if (this.selectedUsers.length) {
          let _users = _.map(this.users, 'id');
          //this.selectedUsers = _.intersection(_users, this.selectedUsers);
          for(let i = 0; i < this.selectedUsers.length; ) {
            if(_users.indexOf(this.selectedUsers[i]) === -1) {
              this.selectedUsers.splice(i, 1);
            } else {
              ++i;
            }
          }

          this.config.users = _.filter(this.config.users, (o) => {
            return this.selectedUsers.indexOf(o.id) !== -1;
          });

        }

      }
      if(state.gadget.event === GET_GADGET_DATA_SUCCESS && state.gadget.gadgetId === this._gadgetId && !this.isConfigureMode) {
        this.setChartData(_.cloneDeep(state.gadget.gadgetData[this._gadgetId]));
        this.zephyrStore.dispatch(this._gadgetAction.clearGadgetEvents(FETCH_GADGET_DATA_SUCCESS, state.gadget.gadgetId));
      }

    });
  }

  enableSave() {
    let value = this.config && this.config.project && this.config.release && this.config.refreshRate && this.config.showBy;
    if(value) {
      if(this.config.showBy === 'priority') {
        return this.selectedPriorities.length > 0;
      } else if(this.config.showBy === 'tag') {
        return this.selectedTags.length > 0;
      } else if(this.config.showBy === 'phase') {
        return this.selectedPhases.length > 0;
      } else if(this.config.showBy === 'customField') {
        return this.selectedCustomFields.length > 0;
      } else if(this.config.showBy === 'user') {
        return this.selectedUsers.length > 0;
      }
    }
    return Boolean(value);
  }

  setProject(data) {
    super.setProject(data);

    this.setCustomFields(data.id);

    this.zephyrStore.dispatch(this._teamAction.fetchTeamDetailsByProjectIdForGadget(this.config.project, this._gadgetId));
  }

  setCustomFields (id) {
    this.customFields = [];

    this.customFieldsMaster.forEach(customField => {
      if (customField['fieldTypeMetadata'] === PICKLIST_ID && (customField.allProject === true || customField.projectIds.indexOf(id) !== -1)) {
        this.customFields.push({id: customField.id, text: customField.displayName});
      }
    });
  }

  toggleChart() {
    if(this.data) {
      let totalHeight = this.data.data.length * this.eachBarWidth;

      this.width = jQuery(this.elementRef.nativeElement).parents('.zui-panel-body').width();
      this.height = totalHeight;// > this.maxHeight ? this.maxHeight : totalHeight < this.minHeight ? this.minHeight : totalHeight;
      /*let tempData = _.cloneDeep(this.data);
      this.data = null;
      this.data = tempData;*/
    }
  }

  setConfig(gadgetId, gadgetDetails) {
    super.setConfig(gadgetId, gadgetDetails, false);

    if (gadgetDetails) {
      if (!_.isEmpty(this.config) && this.config.project) {
        this.zephyrStore.dispatch(this._teamAction.fetchTeamDetailsByProjectIdForGadget(this.config.project, this._gadgetId));
        if(this.config.tags && this.tags) {
          this.reverseMapSelectedTags();
        } else {
          this.selectedTags = [];
        }
        this.selectedPhases = this.config.phases ? this.config.phases.map(phase => (phase.id)) : [];
        this.selectedCustomFields = this.config.customFields ? this.config.customFields.map(customField => (customField.id)) : [];
        this.selectedUsers = this.config.users ? this.config.users.map(user => (user.id)) : [];
        this.selectedPriorities = this.config.priorities ? this.config.priorities.map(priority => (priority.id)) : [];

        this.refreshMetrics();
        this.zephyrStore.dispatch(this._tcrAction.fetchExecutionPhasesByReleaseId(this.config.release));
      }
    }
  }

  reverseMapSelectedTags() {
    if(this.config.tags && this.config.tags.length > 0 && this.tags.length > 0) {
      let _reverseTagMapping = {};
      this.tags.forEach(t => {
        _reverseTagMapping[t.text] = t.id;
      });
      this.selectedTags = this.config.tags.map(t => {
        return _reverseTagMapping[t.text];
      });
    }
  }

  toggleConfigurationMode(mode) {
    this.isConfigureMode = mode;

    if(!mode) {
      this.setConfig(this._gadgetId, this._gadget);
    } else {
      this.zephyrStore.dispatch(this._adminAction.getCustomFields('Testcase', this._gadgetId));
      this.customFieldsFetched = true;
      this.zephyrStore.dispatch(this._tcrAction.fetchExecutionPhasesByReleaseId(this.config.release));
    }

    this.cancelConfigEmitter.emit();
  }

  setChartData(response) {
      let field = _.find(this.customFields, customField => {
        return customField.id == this.selectedCustomFields[0];
      });

      if (!field && this.config.showBy == 'customField') {
        setTimeout(() => {
          this.setChartData(response);
        }, 1000);

        return;
      }

      let yAxisLabel = this.config.showBy
                        ? this.config.showBy != 'customField'
                            ? this.config.showBy
                            : field.text
                        : '';

      let chartData = {
        x: 'Count',
        y: yAxisLabel,
        data: []
      };

      response = _.sortBy(response, (res) => res.name.toLocaleUpperCase());

      response.forEach(statuses => {
      /*if(this.selectedCycles.indexOf(summary.cycle.id) === -1) {
        return;
      }*/
      let executed = 0, unexecuted = 0, total = 0;
      for(var key in statuses.status) {
        if(key != 'unexecuted') {
          executed += statuses.status[key] = +statuses.status[key];
        } else {
          unexecuted += statuses.status[key] = +statuses.status[key];
        }
      }

      let d = {};
      d['x'] = {};
      d['x']['entries'] = [];

      total = executed + unexecuted;

      if(total > 0) {
        /*var executedObject = {};
        executedObject['name'] = 'Executed';
        executedObject['value'] = executed;
        executedObject['color'] = '#56c88d';

        var unexecutedObject = {};
        unexecutedObject['name'] = 'Unexecuted';
        unexecutedObject['value'] = unexecuted;
        unexecutedObject['color'] = '#9E987D';*/

        for(var s in statuses.status) {
          var statusObject = {};
          statusObject['name'] = this._executionStatus[s].value;
          statusObject['value'] = statuses.status[s];
          statusObject['color'] = this._executionStatus[s].color;
          d['x']['entries'].push(statusObject);
        };

        var executedPercentage = {};
        executedPercentage['name'] = 'Executed';
        executedPercentage['value'] = total > 0 ? (executed * 100) / total : 0;
        executedPercentage['color'] = '#56c88d';

        var unexecutedPercentage = {};
        unexecutedPercentage['name'] = 'Unexecuted';
        unexecutedPercentage['value'] = total > 0 ? (unexecuted * 100) / total : 0;
        unexecutedPercentage['color'] = '#d2d2d2';

        /*d['x']['entries'].push(executedObject);
        d['x']['entries'].push(unexecutedObject);*/

        d['y'] = {};
        d['y']['id'] = statuses.id;
        let name = _.escape(this.getNameFromId(statuses.id, statuses.name));
        d['y']['name'] = name;
        d['label'] = +unexecutedPercentage['value'].toFixed(2) + '% Unexecuted';

        let tooltip = '<div align="center"><strong st>' + name + '</strong></div> <hr>' +
          '<div class="row">';

        for (var key in statuses.status) {
          //tooltip += '<tr>';
          let count = +statuses.status[key];
          let percentage = +((total > 0 ? (count * 100) / total : 0).toFixed(2));
          let keyName = key == 'unexecuted' ? this._executionStatus['unexecuted'].value : this._executionStatus[+key].value;

          tooltip += '<div class="col-md-5" style="word-wrap: break-word;">' + _.escape(keyName) + '</div>' +
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

  getNameFromId(id, defaultName) {
    let _name = defaultName;
    if(this.config.showBy === 'priority') {
      _.forEach(this.priorities, p => {
        if(p.id === id) {
          _name = p.text;
          return false;
        }
      });
    } else if(this.config.showBy === 'tag') {
      //return default;
    } else if(this.config.showBy === 'phase') {
      //return default
    } else if(this.config.showBy === 'customField') {
      _.forEach(this.customFields, c => {
        if(c.id === +id) {
          _name = c.text;
          return false;
        }
      });
    } else if(this.config.showBy === 'user') {
      _.forEach(this.users, u => {
        if(u.id === +id) {
          _name = u.text;
          return false;
        }
      });
    }
    return _name;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.unsubscribe();
  }

  setReleaseValue(data) {
    super.setReleaseValue(data);
    this.zephyrStore.dispatch(this._tcrAction.fetchExecutionPhasesByReleaseId(this.config.release));
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
      let id = _.cloneDeep(t.id);
      tagsObject[id] = t;
      t.id = t.text;
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

    let customFieldObject = {};
    this.customFields.forEach(c => {
      customFieldObject[c.id] = c;
    });
    this.config.customFields = this.selectedCustomFields.map(customField => {
      return customFieldObject[customField];
    });

    let userObject = {};
    this.users.forEach(u => {
      userObject[u.id] = u;
    });
    this.config.users = this.selectedUsers.map(user => {
      return userObject[user];
    });

    let priorityObject = {};
    this.priorities.forEach(pri => {
      priorityObject[pri.id] = pri;
    });
    this.config.priorities = this.selectedPriorities.map(priority => {
      return priorityObject[priority];
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
  sortByText(v1, v2) {
    var textA = v1.text.toUpperCase(); // ignore upper and lowercase
    var textB = v2.text.toUpperCase(); // ignore upper and lowercase
    if (textA < textB) {return -1;}
    if (textA > textB) {return 1;}
    return  0;
  }
}
