import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
declare var $, _;

import {ZephyrStore} from '../../../../store/zephyr.store';
import {ReleaseAction} from '../../../../actions/release.action';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

declare var jQuery: any, moment: any, _ : any;
const NO_ACTION = 'NO_ACTION';
import * as DASHBOARD_CONSTANTS from '../dashboard.constant';

import {GridAction} from '../../../../actions/grid.action';
import {DashboardAction} from '../../../../actions/dashboard.action';
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import {DASHBOARD_INITIAL_STATE, DASHBOARDS_INITIAL_STATE} from '../dashboard.constant';
import {DASHBOARD_GRID_COLUMNS,  DASHBOARD_GRID_TYPE, DASHBOARD_GRID_PAGINATION} from '../dashboard_grid.constant';
import {FormInputValidator} from '../../../validators/form_input_validator';

@Component({
  selector: 'dashboard-form',
  viewProviders: [DashboardAction, GridAction],
  templateUrl: 'dashboard_form.html'
})

export class DashboardFormComponent implements OnChanges {
  users;
  unsubscribe;
  @Input() dashboard;
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  accessTypes = [
    {id : 2, text: 'Private'},
    {id : 3, text: 'Project Team'},
    {id : 1, text: 'Any logged in user'},
  ];

  originalLayout = null;
  _isEditDialog = false;
   i18nMessages = I18N_MESSAGES;
  _DASHBOARD_CONSTANTS = DASHBOARD_CONSTANTS;
  _userId;
  _zephyrStore;
  selectedAccessType;
  originalSelectedAccessType;

  constructor(private _dashboardAction: DashboardAction, private _gridAction: GridAction, public router: Router,
              private fb: FormBuilder) {

    this.selectedAccessType = [3];

    this._zephyrStore = ZephyrStore.getZephyrStore();

    this.unsubscribe = this._zephyrStore.subscribe(() => {
      let state = this._zephyrStore.getState();
      this._userId = state.loggedInUser.id;
      this.setUsers(state.global.users);
    });

    this.ngOnChanges({});
  }

  ngOnChanges(changedNode) {
    if (this.dashboard) {
      this.selectedAccessType = [3];

      this._isEditDialog = this.dashboard.id ? true : false;
      this.form = this.fb.group({
        'name': [this.dashboard.name, Validators.compose([Validators.required, Validators.pattern('^.{1,255}$'), FormInputValidator.invalidateOnlySpaces])],
        'description': [this.dashboard.description, Validators.pattern('^(.|[\n\r]){0,255}$')],
        'layout': [this.dashboard.properties.style.layout, Validators.required]
      });

      this.originalLayout = this.dashboard.properties.style.layout;
      this.originalSelectedAccessType = this.dashboard.accessType;

      if (this.dashboard.accessType) {
        this.selectedAccessType = [this.dashboard.accessType];
      } else {
        this.selectedAccessType = [3];
      }

    } else {
      this._isEditDialog = false;
      this.form = this.fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.pattern('^.{1,255}$'), FormInputValidator.invalidateOnlySpaces])],
        'description': ['', Validators.pattern('^(.|[\n\r]){0,255}$')],
        'layout': ['', Validators.required]
      });

      this.selectedAccessType = [3];
    }

    setTimeout(() => {
      $("#dashboard-name").focus();
    }, 100);
  }

  setAccessType(type) {
    this.selectedAccessType = [type.id];
  }

  checkFormStatus() {
    return $("#dashboard-name").val() === this.dashboard.name
      && $("#dashboard-description").val() === this.dashboard.description
      && ((this.dashboard.accessType === 0 && this.originalSelectedAccessType === 1) || this.originalSelectedAccessType === this.dashboard.accessType)
      && this.dashboard.properties.style.layout === this.originalLayout
      && $("#dashboard-description").val() === this.dashboard.description;
  }

  onClickAddDashboard() {
    // let _sharedDashboardId = $('#dashboard-start-from').val();
    // this.setSharedUsersById();

      // if(_sharedDashboardId && _sharedDashboardId != -1) {
      //     let _dashboard = this.getDashboardById(_sharedDashboardId);
      //     if(_dashboard) {
      //         this.dashboard.style = _.cloneDeep(_dashboard.style);
      //         this.dashboard.gadgets = _.cloneDeep(_dashboard.gadgets);
      //         // this.dashboard.settings = _.cloneDeep(_dashboard.settings);
      //     }
      // }
    let dashboard = this.form.value;
    dashboard.properties = {
      'style' : {
        'layout' : parseInt(this.dashboard.properties.style.layout)
      }
    };

    dashboard.accessType = this.selectedAccessType[0];

    dashboard = _.merge(_.cloneDeep(DASHBOARD_INITIAL_STATE), dashboard);

    // delete dashboard.layout;
    this.saveDashboard(dashboard);
    $('#zui-dashboard-modal-add').modal('hide');
  }

  /**
   * On click of edit, save
   */
  onClickUpdateDashboard() {
    let dashboard = this.form.value;
    dashboard.properties = {
      'style' : {
        'layout' : parseInt(this.dashboard.properties.style.layout)
      }
    };

    dashboard = _.merge(this.dashboard, dashboard);
    dashboard.accessType = this.selectedAccessType[0];

    dashboard.layout = parseInt(this.dashboard.properties.style.layout);

    $('#zui-dashboard-modal-add').modal('hide');
    this._zephyrStore.dispatch(this._dashboardAction.updateDashboardById(this.dashboard));
  }
  /**
   * On click of delete confirmation, delete the dashboard
   */
  onClickDeleteDashboard() {
    $('#zui-dashboard-modal-delete').modal('hide');
    this._zephyrStore.dispatch(this._dashboardAction.deleteDashboardById(this.dashboard));
  }

  /**
   * on click of the cancel button in Add/Edit/Delete modal,
   * clear previous dashboard state
   */
  onClickClearDashboardState() {
      this.onCancel.emit({});
    // this.dashboard = _.cloneDeep(DASHBOARD_INITIAL_STATE);
  }

  saveDashboard(dashboard) {
    if (!dashboard.id) {
      dashboard.createdBy = this._userId;
      dashboard.createdOn = _.now();
      dashboard.dashboardURL = 'asdsad';
      dashboard.relativePosition= '1,1';
    }
    // dashboard.layout = '1';
    // dashboard.dashboardMetaDataId = _.now();
    // dashboard.id += this._userId + '-' + _.now();
    // this.dashboards.rows.push(dashboard);
    // console.log(dashboard);
    // return;
    this._zephyrStore.dispatch(this._dashboardAction.saveDashboard(dashboard));
  }

  /**
   * set user map
   */
  setUsers(users) {
    this.users = users.map((user) => {
      return {id: user.id, text: user.fullName};
    });
  }
}
