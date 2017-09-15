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
	selector: 'zui-release-testcase-status-gadget',
  templateUrl: 'release_status_testcases.html',
  providers : [TeamAction, TCRAction, TestcaseAction, GadgetAction]
})

export class ReleaseTestcaseStatusGadgetComponent extends GadgetClass implements GadgetInterface, OnDestroy {
  @Output() saveConfigEmitter: EventEmitter<any> = new EventEmitter();

  public config = {
    project: {},
    release: {},
    refreshRate: {},
    tags: [],
    users: [],
    showBy: ''
  };

  users = [];
  _users= [];

  public selectedTags = [];
  public selectedUsers = [];

  public tags = [];

  tagOptions = {
    createTag: tag => false
  };

  public configTags = [];

  options = {
    token: [' ', ','],
    createTag: tag => ({
      id: tag.term,
      text: tag.term
    })
  };
  private unsubscribe;
  //private i18nMessages = I18N_MESSAGES;

  constructor(public router: Router, public _releaseAction: ReleaseAction, private _projectAction: ProjectAction
    , private _testcaseAction : TestcaseAction, private _teamAction: TeamAction, _gadgetAction: GadgetAction) {

    super(router, _releaseAction, _gadgetAction);

    this.zephyrStore.dispatch(this._testcaseAction.getAllTags());

    this.unsubscribe = this.zephyrStore.subscribe(() => {
      let state = this.zephyrStore.getState();

      if(state.team.teamDetailsForGadget[this._gadgetId]) {
        this.users = state.team.teamDetailsForGadget[this._gadgetId].data.map((item) =>
          ({id: item.id,text:`${item.firstName} ${item.lastName}`}));
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

      if(state.testcase.tags) {
        this.tags = [];
        let i = 0;

        state.testcase.tags.forEach(t => {
          this.tags.push({id: i, text: t});
          ++i;
        });

        this.reverseMapSelectedTags();
	      this.tags.sort(this.sortByText);
      }

      if(state.gadget.event === GET_GADGET_DATA_SUCCESS && state.gadget.gadgetId === this._gadgetId && !this.isConfigureMode) {
        this.setReleaseSummaries(_.cloneDeep(state.gadget.gadgetData[this._gadgetId]));
        this.zephyrStore.dispatch(this._gadgetAction.clearGadgetEvents(FETCH_GADGET_DATA_SUCCESS, state.gadget.gadgetId));
      }

    });
  }

  enableSave() {
    let value = this.config && this.config.project && this.config.release && this.config.refreshRate && this.config.showBy;
    if(value) {
      if(this.config.showBy === 'filter-by-tag') {
        return this.selectedTags.length > 0;
      } else if(this.config.showBy === 'filter-by-user') {
        return this.selectedUsers.length > 0;
      }
    }
    return Boolean(value);
  }

  createTag() {
    return false;
  }

  setConfig(gadgetId, gadgetDetails) {
    super.setConfig(gadgetId, gadgetDetails, false);

    if (gadgetDetails) {
      if (!_.isEmpty(this.config) && this.config.project) {
        if(this.config.tags && this.tags) {
          this.reverseMapSelectedTags();
        } else {
          this.selectedTags = [];
        }

        this.selectedUsers = this.config.users ? this.config.users.map(user => (user.id)) : [];
        this.configTags = _.cloneDeep(this.config.tags ? this.config.tags.map(tag => (tag.id)) : []);

        this.refreshMetrics();
        this.zephyrStore.dispatch(this._teamAction.fetchTeamDetailsByProjectIdForGadget(this.config.project, this._gadgetId));
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
      this.zephyrStore.dispatch(this._teamAction.fetchTeamDetailsByProjectIdForGadget(this.config.project, this._gadgetId));
    }

    this.cancelConfigEmitter.emit();
  }

  setReleaseSummaries(releaseSummaries) {
    let _tagIds = [];
    let _userIds = [];

    if(this.config.tags)
      _tagIds = this.config.tags.map(tag => String(tag.text));

    if(this.config.users)
      _userIds = this.config.users.map(user => user.id);

    let testCases = {
      count: 0,
      viewAll: true,
      groups: [{
        name: 'Tags',
        items: []
      }, {
        name: 'Created by',
        items: []
      }]
    };

    let index = -1, flagForTags = false;
    let totalCount = 0;

    this._users = this.zephyrStore.getState().global.users;

    _.forEach(releaseSummaries.testcase, (releaseSummaryDetail) => {
      // if (Object.keys(releaseSummaryDetail).length) {
      index++;
      // }

      _.forEach(releaseSummaryDetail, (count, key) => {
        // if (flagForTags) {
        //     totalCount += count;
        // }

        let name;
        let eligible = false;

        if (index === 0 && _tagIds.indexOf(key) != -1) {
          name = key;
          eligible = true;
        } else if(_userIds.indexOf(Number(key)) != -1) {
          name = _.find(this._users, {'id': parseInt(key)});

          if (name) {
            name = name.fullName;
          }
          eligible = true;
        }

        if(eligible)
          testCases.groups[index].items.push({
            name,
            count,
            highlightCount: true
          });

      });

      // flagForTags = true;
    });

    if(this.config.showBy === 'filter-by-tag') {
      testCases.groups.splice(1, 1);
    } else {
      testCases.groups.splice(0, 1);
    }


    testCases.count = releaseSummaries.testcase.totalTestcaseCount;

    let finalReleaseSummary = _.cloneDeep(RELEASE_SUMMARIES[1]);
    _.merge(finalReleaseSummary, testCases);
    this.summaries = finalReleaseSummary;
    this.isConfigureMode = false;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.unsubscribe();
  }

  setProject(data) {
    super.setProject(data);
    this.zephyrStore.dispatch(this._teamAction.fetchTeamDetailsByProjectIdForGadget(this.config.project, this._gadgetId));
  }

  setTags(data) {
    this.config.tags = this.config.tags || [];
    //
    // let selectedTag = data.id;
    //
    // let ifExists = this.tags.filter(t => t.id === selectedTag)[0];
    //
    // if (ifExists && ifExists.id) {
      this.config.tags.push(data);
    // } else {
    //   let selectedTags = _.cloneDeep(this.selectedTags);
    //   selectedTags.pop();
    //   this.selectedTags = selectedTags;
    //   this.selectedTags = selectedTags;
    // }
  }

  removeTag(data) {
    this.config.tags = this.config.tags || [];
    this.config.tags = this.config.tags.filter(tag => {if(data['id'] !== tag['id']) return tag;});
  }

  setUsers(data) {
    this.config.users = this.config.users || [];
    this.config.users.push(data);
  }

  removeUser(data) {
    this.config.users = this.config.users || [];
    this.config.users = this.config.users.filter(user => {if(data['id'] != user['id']) return user;});
  }

  saveConfig() {
    let tagsObject = {};
    this.tags.forEach((t) => {
      let id = _.cloneDeep(t.id);
      tagsObject[id] = t;
      t.id = t.text;
    });

    //this.config.tags.splice(0);
    this.config.tags = this.selectedTags.map(tag => {
      return tagsObject[tag];
    });


    let userObject = {};
    this.users.forEach(p => {
      userObject[p.id] = p;
    });

    this.config.users = this.selectedUsers.map(user=> {
      return userObject[user];
    });

    let gadget = super.saveConfig();
    this.saveConfigEmitter.emit(gadget);
  }

  selectRadio(ev) {
    if ('open' === ev.type) {
      //jQuery(ev.target).closest('label').siblings('input').prop('checked', true);
      jQuery(ev.target).parent().siblings('input').prop('checked',true);
      this.config.showBy = jQuery(ev.target).parent().siblings('input')[0]['id'];
    }
  }
  sortByText(v1, v2) {
	  var textA = v1.text.toUpperCase(); // ignore upper and lowercase
      var textB = v2.text.toUpperCase(); // ignore upper and lowercase
      if (textA < textB) {return -1;}
      if (textA > textB) {return 1;}
      return  0;
 }
}
