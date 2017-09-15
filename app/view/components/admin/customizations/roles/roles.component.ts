import {Component  , OnDestroy , AfterViewInit, Input , Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {AdminAction} from '../../../../../actions/admin.action';
import {ADD_ROLE_SUCCESS,ROLE_ASSIGNMENTS} from '../../../../../utils/constants/action.events';
import {
  ROLES_GRID_TYPE, MANAGER_ROLE_ID,
  DEFECT_USER_ROLE_ID
} from '../../../admin/customizations/customizations.constant';

declare var jQuery: any, _;

const DELETE_ROLE = 'DELETE_ROLE';
const HIDE_ROLES_FORM = 'HIDE_ROLES_FORM';
const CLOSE_ROLES_MODAL = 'CLOSE_ROLES_MODAL';
const ADD_ROLE_CONTINUE = 'ADD_ROLE_CONTINUE';

@Component({
  selector: 'roles-modal',
  viewProviders: [AdminAction],
  templateUrl: 'roles.html',
})

export class RolesModalComponent implements AfterViewInit, OnDestroy {
    @Input() confirmationObject;
    @Output() confirmationDialogueData: EventEmitter<any> = new EventEmitter();
    zephyrStore;
    state;
    unsubscribe;
    rolesGridType;
    rolesForm;
    rolesTypes;
    rolesTypesForDelete;
    roleIdToBeDeleted;
    deptApps = [];
    projectApps = [];
    rolesGrid;
    deleteRowDropdown;
    roleOBjectSelected = {
      id: '',
      name: '',
      description: '',
      editable : false
    };
    isShowRoleChangeOptions: boolean = false;
    isShowApps : boolean = false;
    isRoleAdd: boolean = false;
    isShowForm: boolean = false;
    deleteRoleData = {
      noOfUsers : 0,
      name : '',
      usersArray : []
    };
    users;
    permissionsDirty;
    constructor( fb: FormBuilder, private _adminAction: AdminAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.rolesGridType = ROLES_GRID_TYPE;
        this.rolesGrid = this.zephyrStore.getState().roles.rolesGrid;
        this.rolesForm = fb.group({
          name: ['', Validators.compose([Validators.required,
            Validators.pattern('^(?=.{1,25}$)(?!^[\\s]+)(?=.*[\\s]*$)(?=.*[\\S]+).*$')])],
          description : ['',Validators.pattern('^(.|[\n\r]){0,255}$')]
        });
        this.unsubscribe = this.zephyrStore.subscribe(() => {
           this.zephyrStore = ZephyrStore.getZephyrStore();
           this.onInit();
           let event = this.zephyrStore.getState().roles.event;
           if (event === ADD_ROLE_SUCCESS) {
             this.zephyrStore.dispatch(this._adminAction.clearRolesEvents());
             this.triggerLastClick();
           } else if (event === ROLE_ASSIGNMENTS) {
             this.zephyrStore.dispatch(this._adminAction.clearRolesEvents());
             this.deleteRoleConfirmed();
           }
        });
    }
    onInit() {
      this.initRolesData();
      this.initAppsData();
      this.initiRolePermissionData();
    }

    ngAfterViewInit () {
       jQuery('#roles-modal').on('shown.bs.modal', (e) => {
          this.getApps();
          this.getAllRoles();
          this.isShowRoleChangeOptions = false;
          this.isShowApps = false;
          this.isShowForm = false;
          this.rolesForm.reset();
          this.permissionsDirty = false;
       });
    }

    getApps() {
      this.zephyrStore.dispatch(this._adminAction.getApps());
    }

    getAllRoles() {
      this.zephyrStore.dispatch(this._adminAction.getRolesTypes());
    }

    initRolesData() {
      this.rolesTypes = this.zephyrStore.getState().roles.rolesTypeArray;
      this.rolesGrid = this.zephyrStore.getState().roles.rolesGrid;
    }

    initAppsData() {
    if (this.zephyrStore.getState().roles.appsUpdated) {
        var apps = this.zephyrStore.getState().roles.apps;
        this.deptApps = [];
        this.projectApps = [];
        for (let i = 0; i < apps.length; i++) {
          if (apps[i].desktopLevel === 1) {
            this.deptApps.push(apps[i]);
          } else if (apps[i].desktopLevel === 2) {
            this.projectApps.push(apps[i]);
          }
        }
      }
    }
    initiRolePermissionData() {
      let RolepermissionAray = [];
      for (let i = 0; i < this.rolesTypes.length; i++ ) {
        let RoleObject = this.rolesTypes[i];
        if (RoleObject.id === this.roleOBjectSelected.id) {
            RolepermissionAray = RoleObject.applicationIdArray ? JSON.parse(JSON.stringify(RoleObject.applicationIdArray)) : [];
        }
      }
      var appListingCheckbox = jQuery('.apps-listing').find('input[type=\'checkbox\']');
      for (let i = 0; i < appListingCheckbox.length; i++ ) {
       appListingCheckbox[i].checked = false;
       for (let j = 0; j < RolepermissionAray.length; j++ ) {
         if (RolepermissionAray[j].toString().trim() === appListingCheckbox[i].getAttribute('id').toString().trim()) {
            appListingCheckbox[i].checked = true;
            RolepermissionAray.splice(j, 1);
            break;
          }
        }
      }
    }
    addRoleConfirmation() {
      if (this.rolesForm.dirty || this.permissionsDirty) {
        let confirmationObject = {};
          confirmationObject['heading'] = 'Unsaved changes';
          confirmationObject['text'] = 'You have some unsaved changes. Are you sure you want to continue?';
          confirmationObject['buttonText'] = 'Continue';
          confirmationObject['showCancelButton'] = true;
          confirmationObject['cancelButtonText'] = 'cancel';
          confirmationObject['action'] = ADD_ROLE_CONTINUE;
          this.confirmationDialogueData.emit(confirmationObject);

      } else {
        this.addRole();
      }
    }

    addRole() {
      this.isRoleAdd = true;
      this.isShowForm = true;
      this.isShowRoleChangeOptions = false;
      this.isShowApps = true;
      this.rolesForm.reset();
      this.roleOBjectSelected = {
            id: '',
            name: '',
            description: '',
            editable : true
          };
      this.resetRolesPermissions();
      this.deHighlightTableRow();
       setTimeout(() => {
        jQuery('.clearfix #role-name').trigger('focus');
      },200);
    }

    onRoleFormSubmit(form) {
      let rolesPermissionArray = this.saveRolePermissions();
      if (this.isRoleAdd) {
        this.zephyrStore.dispatch(this._adminAction.addRole(form,rolesPermissionArray));
      } else {
        let keyObject = {};
        if (((form.name && form.name.trim()) !== (this.roleOBjectSelected.name && this.roleOBjectSelected.name.trim())) ||
              ((form.description && form.description.trim()) !== (this.roleOBjectSelected.description && this.roleOBjectSelected.description.trim()))) {
          keyObject = {
            'id' :this.roleOBjectSelected.id,
            'name' : form.name,
            'description' : form.description
          };
          this.zephyrStore.dispatch(this._adminAction.editRoleComplete(keyObject,rolesPermissionArray));
        } else {
          this.zephyrStore.dispatch(this._adminAction.updateRolePermissionById(rolesPermissionArray , this.roleOBjectSelected.id, false));
        }

      }
      this.isRoleAdd = false;
      this.isShowForm = false;
      this.isShowApps = false;
      this.rolesForm.reset();
      this.permissionsDirty = false;
      this.deHighlightTableRow();
    }

    rolesGridRowClicked(targetRow) {
      let index = targetRow.dataset.index;
      let roleDataOBject = this.rolesGrid.rows[index];
      let roleId = roleDataOBject.id;
      this.roleOBjectSelected = JSON.parse(JSON.stringify(roleDataOBject));
      this.zephyrStore.dispatch(this._adminAction.getRolePermissions(roleId , false));
      roleDataOBject.description = roleDataOBject.description ? roleDataOBject.description : "";
      this.rolesForm.reset();
      this.rolesForm.patchValue({
        name : roleDataOBject.name.trim(),
        description : roleDataOBject.description.trim()
      });
      this.isShowApps = true;
      this.isShowForm = true;
      this.isRoleAdd = false;
      this.permissionsDirty = false;
      this.isShowRoleChangeOptions = false;
    }

    saveRolePermissions() {
      var rolesPermissionArray = [];
      var appListingCheckbox = jQuery('.apps-listing').find('input[type=\'checkbox\']');
      for (let i = 0; i < appListingCheckbox.length; i++ ) {
        if (appListingCheckbox[i].checked) {
          var permissionObject = {};
          permissionObject['applicationName'] = parseInt(appListingCheckbox[i].getAttribute('id').trim());
          rolesPermissionArray.push(permissionObject);
        }
      }
      //if (this.isRoleAdd) {
      return rolesPermissionArray;
      // } else {
      //   this.zephyrStore.dispatch(this._adminAction.updateRolePermissionById(rolesPermissionArray, this.roleOBjectSelected.id, false));
      // }
      // return null;
    }

    resetRolesPermissions() {
      this.permissionsDirty = false;
      var appListingCheckbox = jQuery('.apps-listing').find('input[type=\'checkbox\']');
      for (let i = 0; i < appListingCheckbox.length; i++ ) {
       appListingCheckbox[i].checked = false;
      }
    }

    rolesGridActionClick ($event) {
        let target = $event.target,
            actionToBaTaken = target.dataset.action,
            trParents = jQuery(target).closest('.flex-bar'),
            targetRow = trParents[0];
        let index = targetRow.dataset.index;
        let roleDataOBject = this.rolesGrid.rows[index];
        this.roleIdToBeDeleted = roleDataOBject.id;
        if (actionToBaTaken === 'delete') {
            this.deHighlightTableRow();
            this.isShowForm = false;
            this.isShowApps  = false;
            this.isShowRoleChangeOptions = false;
            this.roleOBjectSelected = {
              id: roleDataOBject.id,
              name: roleDataOBject.name,
              description: '',
              editable : false //making this flag false, as per UI logic (to hide modal-footer)
            };
            this.deleteRoleData = {
              noOfUsers : 0,
              name : roleDataOBject.name,
              usersArray: []
            };
            jQuery(targetRow).addClass('selected-row');
            setTimeout(() => {
              this.deleteRole();
            }, 10);
        }
    }

    deleteRole() {
      let confirmationObject = {};
        confirmationObject['heading'] = 'Delete';
        confirmationObject['text'] = 'Are you sure you want to Delete this?';
        confirmationObject['buttonText'] = 'Yes';
        confirmationObject['showCancelButton'] = true;
        confirmationObject['cancelButtonText'] = 'No';
        confirmationObject['action'] = DELETE_ROLE;
        this.confirmationDialogueData.emit(confirmationObject);
    }

    getRoleAssignment() {
      this.zephyrStore.dispatch(this._adminAction.checkRoleAssignemnt(parseInt(this.roleIdToBeDeleted)));
    }

    deleteRoleConfirmed() {
      let assignmentArray = this.zephyrStore.getState().roles.roleAssignment;
      if (assignmentArray && assignmentArray.length > 0) {
        this.isShowRoleChangeOptions = true;
        let roleIdToBeDeleted = this.roleIdToBeDeleted;
        this.deleteRowDropdown = this.rolesTypes.filter(member=> {
          return !(member.id == MANAGER_ROLE_ID || member.id == roleIdToBeDeleted || member.id == DEFECT_USER_ROLE_ID);
                  })[0].id;
        this.rolesTypesForDelete = this.rolesTypes.filter(member=> {
          return !(member.id == MANAGER_ROLE_ID || member.id == roleIdToBeDeleted || member.id == DEFECT_USER_ROLE_ID);
        });
        this.deleteRoleData.noOfUsers = assignmentArray.length;
        this.deleteRoleData.usersArray = [];
        this.users = this.zephyrStore.getState().resourceManagement.users.length > 0 ?
                        this.zephyrStore.getState().resourceManagement.users : this.zephyrStore.getState().global.users;
        for (let i=0;i<assignmentArray.length;i++) {
          for (let j=0;j<this.users.length;j++) {
            if (assignmentArray[i] == this.users[j].id) {
              this.deleteRoleData.usersArray.push(this.users[j].firstName + ' ' + this.users[j].lastName);
              this.users.splice(j,1);
              break;
            }
          }
        }
      } else {
        this.zephyrStore.dispatch(this._adminAction.deleteRole(parseInt(this.roleIdToBeDeleted), 0));
      }
    }
    cancelModifyRole() {
      this.isShowRoleChangeOptions = false;
    }
    modifyRole() {
      let roleId = this.deleteRowDropdown;
      this.isShowRoleChangeOptions = false;
      this.zephyrStore.dispatch(this._adminAction.deleteRole(parseInt(this.roleIdToBeDeleted), roleId));
    }
    deHighlightTableRow() {
      jQuery('.roles-grid').find('.flex-bar').removeClass('selected-row');
    }
    cancelRoleForm() {
      this.isShowForm = false;
      this.roleOBjectSelected.editable = false;
      this.rolesForm.reset();
      this.permissionsDirty = false;
      this.deHighlightTableRow();
    }
    cancelRoleFormConfirmation(ev) {
      if (this.rolesForm.dirty || this.permissionsDirty) {
        let confirmationObject = {};
          confirmationObject['heading'] = 'Unsaved changes';
          confirmationObject['text'] = 'You have some unsaved changes. Are you sure you want to continue?';
          confirmationObject['buttonText'] = 'Continue';
          confirmationObject['showCancelButton'] = true;
          confirmationObject['cancelButtonText'] = 'cancel';
          confirmationObject['action'] = HIDE_ROLES_FORM;
          this.confirmationDialogueData.emit(confirmationObject);
      } else {
        this.cancelRoleForm();
      }
    }

    closeRolesModal() {
      if (this.rolesForm.dirty || this.permissionsDirty) {
        let confirmationObject = {};
          confirmationObject['heading'] = 'Unsaved changes';
          confirmationObject['text'] = 'You have some unsaved changes. Are you sure you want to continue?';
          confirmationObject['buttonText'] = 'Continue';
          confirmationObject['showCancelButton'] = true;
          confirmationObject['cancelButtonText'] = 'cancel';
          confirmationObject['action'] = CLOSE_ROLES_MODAL;
          this.confirmationDialogueData.emit(confirmationObject);
      } else {
        this.hideRolesModal();
      }
    }

    ngOnDestroy() {
      this.unsubscribe();
    }
    triggerLastClick() {
      setTimeout(() => {
        let grid_row = jQuery('.roles-grid .flex-bar');
        grid_row.last().click();
        grid_row.parent().scrollTop(grid_row.height() * grid_row.length);
      }, 10);
    }

    onClickAppsList(ev) {
      if (jQuery(ev.target).is('label') || jQuery(ev.target).is('input')) {
        this.permissionsDirty = true;//because form-submit button has to be enabled.
                                   // form doesnot includes app control objects
      }
    }

    hideRolesModal() {
      jQuery('#roles-modal').modal('hide');
    }

  }
