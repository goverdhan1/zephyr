import {Component,OnDestroy,ViewChild , NgZone} from '@angular/core';
//import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control} from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
//import {ROUTES_ADMIN} from './admin.routes';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {AdminAction} from '../../../../actions/admin.action';
import { ADMIN_PREFERENCES} from '../../admin/admin.constant';
// import {InlineEditComponent} from '../../inline_edit/inline_edit.component';
// import {InlineRowsEditComponent} from '../../inline_edit/inline_rows_edit.component';
import {GridAction} from '../../../../actions/grid.action';
// import {GridComponent} from '../../grid/grid.component';

import { RolesModalComponent } from './roles/roles.component';
import { EstimatedTimeModalComponent } from './estimated_time/estimated_time.component';
import {ExecutionStatusModalComponent} from './execution_status/execution_status.component';
import {MiscellaneousModalComponent} from './miscellaneous/miscellaneous.component';
import { HistoryModalComponent } from './history/history.component';
import { FieldsModalComponent } from './fields/fields.component';
import { SchedulingModalComponent } from './scheduling/scheduling.component';
declare var jQuery: any, _;

const DELETE_ROLE = 'DELETE_ROLE';
const SAVE_EST_TIME = 'SAVE_EST_TIME';
const EXECUTION_STATUS_UPDATE = 'EXECUTION_STATUS_UPDATE';
const EXECUTION_STATUS_FORM_SUBBMIT = 'EXECUTION_STATUS_FORM_SUBBMIT';
const SAVE_MISC_SETTINGS = 'SAVE_MISC_SETTINGS';
const SCHEDULE = 'SCHEDULE';
const REINDEX = 'REINDEX';
const FULL_REINDEX = 'FULL_REINDEX';
const LOCK_ACCESS = 'LOCK_ACCESS';
const DELETE_FIELD_SECOND = 'DELETE_FIELD_SECOND';
const DELETE_FIELD_FIRST = 'DELETE_FIELD_FIRST';
const OPEN_FIELDS_MODAL = 'OPEN_FIELDS_MODAL';
const HIDE_ROLES_FORM = 'HIDE_ROLES_FORM';
const CLOSE_ROLES_MODAL = 'CLOSE_ROLES_MODAL';
const HIDE_ESTIMATED_TIME_MODAL = 'HIDE_ESTIMATED_TIME_MODAL';
const HIDE_EXECUTION_STATUS_MODAL = 'HIDE_EXECUTION_STATUS_MODAL';
const HIDE_EXECUTION_STATUS_FORM = 'HIDE_EXECUTION_STATUS_FORM';
const CLOSE_SCHEDULING_MODAL = 'CLOSE_SCHEDULING_MODAL';
const CLOSE_PUSH_TOOL_MODAL = 'CLOSE_PUSH_TOOL_MODAL';
const CLOSE_MISCELLANIOUS_MODAL = 'CLOSE_MISCELLANIOUS_MODAL';
const CLOSE_FIELDS_MODAL = 'CLOSE_FIELDS_MODAL';
const HIDE_FIELDS_MODAL = 'HIDE_FIELDS_MODAL';
const CONFIRM_LOCK_ENABLE = 'CONFIRM_LOCK_ENABLE';
const ADD_ROLE_CONTINUE = 'ADD_ROLE_CONTINUE';
const ADD_FIELD_CONTINUE = 'ADD_FIELD_CONTINUE';
const ADD_FIELD = 'ADD_FIELD';
const ADD_EXECUTION_CONTINUE = 'ADD_EXECUTION_CONTINUE';

@Component({
  selector: 'customizations',
  //directives: [InlineEditComponent, InlineRowsEditComponent, GridComponent],
  templateUrl: 'customizations.html',
  providers: [GridAction]
})


export class CustomizationsComponent implements OnDestroy {
    @ViewChild(RolesModalComponent) rolesModalUI: RolesModalComponent;
    @ViewChild(EstimatedTimeModalComponent) estimatedTimeModalUI: EstimatedTimeModalComponent;
    @ViewChild(ExecutionStatusModalComponent) executionStatusModalUI: ExecutionStatusModalComponent;
    @ViewChild(MiscellaneousModalComponent) miscellaneousModalUI: MiscellaneousModalComponent;
    @ViewChild(HistoryModalComponent) historyModalUI: HistoryModalComponent;
    @ViewChild(FieldsModalComponent) fieldsModalUI: FieldsModalComponent;
    @ViewChild(SchedulingModalComponent) schedulingModalUI: SchedulingModalComponent;
    confirmationObject = {};
    reIndexMessages = {};
    zephyrStore;
    constant_requirement: string = 'Requirement'; //considering to be always fixed;
    constant_testcase: string = 'Testcase';  //considering to be always fixed;
    isRequiremntModal: boolean = false; //Considering to differentiate betweeen requiremnt and testcase modal for fields
    isexecutionStatusClicked: boolean = false;//Considering to differentiate betweeen exec-status and step-exec-status modal
    projects = [];
    selectedProject = [];
    loggedInUser;
    unsubscribe;
    constructor(fb: FormBuilder, private _adminAction: AdminAction, private _gridAction: GridAction , private zone : NgZone) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.loggedInUser = this.zephyrStore.getState().loggedInUser;
        this.reIndexMessages = {
          'success' : 'Re-indexing completed successfully',
          'failure' : 'Re-indexing failed'
        };

        if (!this.projects.length) {
          this.getFilteredProjects();
        }

        this.unsubscribe = this.zephyrStore.subscribe(() => {
            this.zone.run(() => {
             this.zephyrStore = ZephyrStore.getZephyrStore();
             this.loggedInUser = this.zephyrStore.getState().loggedInUser;
             let isOpenFieldsModal = localStorage.getItem('openFieldsModal');
             if (isOpenFieldsModal === 'true') {
               this.ifZephyrLocked();
             }
            });
            if (!this.projects.length) {
              this.getFilteredProjects();
            }
        });
    }

    setProject(data) {
      this.selectedProject = [data.id];
    }

    cancelActionCall($event) {
      this.selectedProject = [];
    }

    confirmationActionCall($event) {
      let actionString = $event.target.value;
      if (actionString === DELETE_ROLE) {
        this.rolesModalUI.getRoleAssignment();
      } else if ( actionString === SAVE_EST_TIME) {
        this.estimatedTimeModalUI.saveEstTime();
      } else if (actionString === EXECUTION_STATUS_UPDATE) {
        this.executionStatusModalUI.saveEnableStatus();
      } else if (actionString === EXECUTION_STATUS_FORM_SUBBMIT) {
        this.executionStatusModalUI.onExecutionStatusFormSubmit(null);
      } else if (actionString === SAVE_MISC_SETTINGS) {
        this.miscellaneousModalUI.saveMiscSettings();
      } else if (actionString === SCHEDULE) {
        this.historyModalUI.onScheduleFormSubmit(null);
      } else if (actionString === REINDEX) {
        this.reIndexClicked();
      } else if (actionString === FULL_REINDEX) {
        this.fullReindexClicked();
      } else if (actionString === LOCK_ACCESS) {
        this.fieldsModalUI.lockAccessAPIcall();
      } else if (actionString === DELETE_FIELD_FIRST) {
        this.fieldsModalUI.deleteSecondConfirm();
      } else if (actionString === DELETE_FIELD_SECOND) {
        this.fieldsModalUI.deleteField();
      } else if (actionString === OPEN_FIELDS_MODAL) {
        this.closeOtherModals();
        jQuery('#fields-modal').modal();
      } else if (actionString === HIDE_ROLES_FORM) {
        this.rolesModalUI.cancelRoleForm();
      } else if (actionString === CLOSE_ROLES_MODAL) {
        this.rolesModalUI.hideRolesModal();
      } else if (actionString === HIDE_ESTIMATED_TIME_MODAL) {
        this.estimatedTimeModalUI.hideEstimatedTimeModal();
      } else if (actionString === HIDE_EXECUTION_STATUS_MODAL) {
        this.executionStatusModalUI.hideExecutionStatusModal();
      } else if (actionString === HIDE_EXECUTION_STATUS_FORM) {
        this.executionStatusModalUI.hideExecutionStatusForm();
      } else if (actionString === CLOSE_SCHEDULING_MODAL) {
        this.schedulingModalUI.hideScedulingModal();
      } else if (actionString === CLOSE_MISCELLANIOUS_MODAL) {
        this.miscellaneousModalUI.hideMiscModal();
      } else if (actionString === CLOSE_FIELDS_MODAL) {
        this.fieldsModalUI.CloseFieldsModal();
      } else if (actionString === HIDE_FIELDS_MODAL) {
        this.fieldsModalUI.hideFieldsForm();
      } else if (actionString === CONFIRM_LOCK_ENABLE) {
        this.fieldsModalUI.confirmLockEnable();
      } else if (actionString === ADD_ROLE_CONTINUE) {
        this.rolesModalUI.addRole();
      } else if (actionString === ADD_FIELD_CONTINUE) {
        this.fieldsModalUI.addField();
      } else if (actionString === ADD_FIELD) {
        this.fieldsModalUI.addCustomField();
      } else if (actionString === ADD_EXECUTION_CONTINUE) {
        this.executionStatusModalUI.addExecutionStatus();
      }
      if (actionString !== DELETE_FIELD_FIRST) {
        jQuery('#confirmation-modal').modal('hide');
      }
    }

    closeOtherModals() {
      jQuery('#roles-modal').modal('hide');
      jQuery('#estimated-time-modal').modal('hide');
      jQuery('#execution-status-modal').modal('hide');
      jQuery('#scheduling-modal').modal('hide');
      jQuery('#history-modal').modal('hide');
      jQuery('#miscellaneous-modal').modal('hide');
    }

    fieldsModalClicked(id) {
      if (id === this.constant_requirement) {
          this.isRequiremntModal = true;
      } else {
          this.isRequiremntModal = false;
      }
    }

    reIndexClicked() {
      let componentId = '-reindex';
      if(this.selectedProject.length) {
        this.zephyrStore.dispatch(this._adminAction.reIndexProject({'projectId' : this.selectedProject[0]}, componentId));
      }
    }

    fullReindexClicked() {
      let componentId = '-reindex';
      this.zephyrStore.dispatch(this._adminAction.fullReindex({}, componentId));
    }

    fullReindexConfirmation() {
      if (this.zephyrStore.getState().fields.isZephyrAccessLocked == true) {
        this.ifZephyrLocked();
      } else {
        let confirmationObject = {};
        confirmationObject['heading'] = 'Full Reindex';
        confirmationObject['text'] = ' This process will re-index all the projects in Zephyr.'
          + 'This is especially useful if you find discrepancies in the Search results.'
          + ' Based on the amount of data in the system, this process might take a while.'
          + 'All functionalities of Zephyr will be available while this process runs in the background except for Search results.'
          + '\n\n Do you want to continue?';
        confirmationObject['buttonText'] = 'Reindex';
        confirmationObject['showCancelButton'] = true;
        confirmationObject['cancelButtonText'] = 'Cancel';
        confirmationObject['action'] = FULL_REINDEX;
        this.confirmationDialogueData(confirmationObject);
      }
    }

    projectReindexConfirmation() {
      if (this.zephyrStore.getState().fields.isZephyrAccessLocked == true) {
        this.ifZephyrLocked();
      } else {
      let confirmationObject = {};
        confirmationObject['heading'] = 'Project Reindex';
        confirmationObject['text'] = ' This process will re-index your Zephyr data.'
              + 'This is especially useful if you find discrepancies in the Search results.'
              + ' Based on the amount of data in the system, this process might take a while.'
              + 'All functionalities of Zephyr will be available while this process runs in the background except for Search results.'
              + '\n\n Please select a project to reindex.';
        confirmationObject['buttonText'] = 'Reindex';
        confirmationObject['showCancelButton'] = true;
        confirmationObject['cancelButtonText'] = 'Cancel';
        confirmationObject['action'] = REINDEX;
        this.confirmationDialogueData(confirmationObject);
      }
    }

    executionStatusModalClicked(id) {
      if (id == '1') {
        this.isexecutionStatusClicked = true;
      } else if (id == '2') {
        this.isexecutionStatusClicked = false;
      }
    }

    ngOnDestroy() {
      this.unsubscribe();
    }

    confirmationDialogueData(confirmationObject) {
      this.confirmationObject = confirmationObject;
      jQuery('#confirmation-modal').modal();
    }

    ifZephyrLocked() {
      setTimeout(() => {
        if (!(jQuery("#fields-modal").hasClass('in'))) {
          let confirmationObject = {};
            confirmationObject['heading'] = 'Alert';
            confirmationObject['text'] = ' Due to an uncompleted custom fields edit session, '
              +'the system is currently in a locked state where users are not allowed to login, '
              +'please finish editing the custom fields and enable access.';
            confirmationObject['buttonText'] = 'Ok';
            confirmationObject['showCancelButton'] = false;
            confirmationObject['cancelButtonText'] = 'No';
            confirmationObject['action'] = OPEN_FIELDS_MODAL;
            this.confirmationDialogueData(confirmationObject);
           localStorage.setItem('openFieldsModal', 'false');
        }
       }, 20);
    }

  getFilteredProjects() {
    let allocatedProjIds = this.zephyrStore.getState().projects.userAllocatedProjects;
    let allProjects = this.zephyrStore.getState().projects.projects;

    this.projects = [];

    allProjects.forEach((val, key) => {
      this.projects.push({
        id: val.id,
        text: val.name,
      });
    });

  }
}
