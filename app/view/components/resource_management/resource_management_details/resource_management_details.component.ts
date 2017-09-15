import {Component, OnDestroy, NgZone, ViewChild , OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {UserAction} from '../../../../actions/user.action';
import {GridAction} from '../../../../actions/grid.action';
import {RESOURCE_GRID_TYPE, RESOURCE_GRID_OPTIONS, RESOURCE_GRID_PAGINATION} from '../resource_management.constants';
import {ResourceFormComponent} from '../resource_form.component';

import {AdminAction} from '../../../../actions/admin.action';
import {ProjectAction} from '../../../../actions/project.action';
import {ADMIN_PREFERENCES} from '../../admin/admin.constant';
import {ADD_PROJECT_SUCCESS, LOGGED_USERS_CHANGED} from '../../../../utils/constants/action.events';
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import {UtililtyFunctions} from '../../../../utils/scripts/utils';

declare var jQuery: any, moment: any;

const LOGOUT_DOUBLE_CONFIRMATION = 'LOGOUT_DOUBLE_CONFIRMATION';
const LOGOUT = 'LOGOUT';
const NO_ACTION = 'NO_ACTION';
const CONTINUE_CLICK = 'CONTINUE_CLICK';

@Component({
  selector: 'resource-management-details',
  viewProviders: [UserAction , GridAction ,AdminAction , ProjectAction ],
  templateUrl: 'resource_management_details.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceManagementDetailsComponent implements OnDestroy, OnInit {
    @ViewChild(ResourceFormComponent) resourceFormUI: ResourceFormComponent;
    zephyrStore;
    resourceGrid;
    resourceGridRows;
    paginationOptions;
    userLogout;
    resourceForm : FormGroup;
    isShowForm = false;
    idResourceClicked = '';
    confirmationObject : any = {};
    licenseError;
    unsubscribe;
    inputSearch;
    utililtyFunctions;

    allProjects = [];
    roles = [];
    adminPrefuserTypes = [];
    refreshGrid = true;

    projectsAllocated = [];
    newProjectsAllocated = [];
    isAccountEnabled = true;
    isCustomizeUsername = false;
    isFirst = true;
    resourceObjectSelected;
    paramSub;
    documentClicked;
    checkForDirty = true;
    previousEventObject;
    changeDetectionDebounce;
    _resourceGridType = RESOURCE_GRID_TYPE;
    private _gridSize;
    private _currentPage = 1;


    constructor(fb: FormBuilder, private _gridAction: GridAction, private _userAction: UserAction, public router: Router , private _adminAction: AdminAction,
        private _projectAction: ProjectAction, private route: ActivatedRoute, private zone:NgZone, private cdr: ChangeDetectorRef) {

        this._gridSize = 50;

        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.inputSearch = '';
        this.checkForDirty = true;
        this.utililtyFunctions = new UtililtyFunctions();
        this.fetchingAllResources();

         this.paramSub = this.route.params.subscribe(params => {
            this.setURLParams(params);
        });

        let state  = this.zephyrStore.getState();
        // Initializing of select options for resource_management usertype.
        this.adminPrefuserTypes = state.adminPref[ADMIN_PREFERENCES.RESOURCE_MANAGEMENT_USERTYPE_LOV] &&
            JSON.parse(state.adminPref[ADMIN_PREFERENCES.RESOURCE_MANAGEMENT_USERTYPE_LOV]);


        // Initializing information of all the projects
        let allProjectsArray = state.projectSetup.projectSetupGrid.sortedRows;
        let user = state.loggedInUser;
        if (allProjectsArray.length > 0) {
            this.allProjects = allProjectsArray;
        } else {
          if(Object.keys(user).length) {
            this.zephyrStore.dispatch(this._projectAction.fetchingAllProjects());
          }
        }

        this.resourceGrid = state.resourceManagement.resourceGrid;
        this.unsubscribe = this.zephyrStore.subscribe(() => {
            // initializaing grid data
            if(!this.refreshGrid) {
              this.refreshGrid = !this.refreshGrid;
              return;
            }
            let state  = this.zephyrStore.getState();
            this.resourceGridRows = state.resourceManagement.resourceGrid.rows;

            this.paginationOptions = state.resourceManagement.resourceGrid.paginationOptions;
            if(this.idResourceClicked && this.isFirst && this.resourceGridRows.length) {
              this.isFirst = false;
              setTimeout(() => {
                jQuery('#grid-table-resource').find('.flex-bar[data-id="' + this.idResourceClicked + '"]').trigger('click');
              });
            }
            // Initializing information of all the projects
            let allProjectsArray = state.projects.projects;
            if (allProjectsArray.length > 0) {
              this.allProjects = allProjectsArray;
            }

            // Initializing of select options for resource_management usertype.
            this.adminPrefuserTypes = state.adminPref[ADMIN_PREFERENCES.RESOURCE_MANAGEMENT_USERTYPE_LOV] &&
                                    JSON.parse(state.adminPref[ADMIN_PREFERENCES.RESOURCE_MANAGEMENT_USERTYPE_LOV]);

            // This is fired when resource-magaement-grid-row is clicked. This code refreshes the projects assigned to the user.
            // TODO:loader should be added for this.
            if (state.resourceManagement.event === 'UPDATING_PROJECTS_ASSIGNED_TO_USER') {
                this.zephyrStore.dispatch(this._userAction.clearResourceManagementEvent());
                let resourceObject = state.resourceManagement.users.filter(item => String(item.id) === String(this.idResourceClicked))[0];
                this.projectsAllocated = (resourceObject || {})['projectsAssigned'] || [];
                this.newProjectsAllocated = this.projectsAllocated;
            }

            if (state.resourceManagement.event === 'ADD_USER') {
              this._currentPage = this.resourceGrid.paginationOptions.lastIndex;
              this.releaseGridPaginateByIndex(this._currentPage , false);
              this.newProjectsAllocated = [];
              setTimeout(()=> {
                this.triggerLastClick();
                this.refreshGrid = false;
              }, 1000);
               this.zephyrStore.dispatch(this._userAction.clearResourceManagementEvent());
            }

            if (state.resourceManagement.event === 'TRIGGER_LOGOUT') {
                let targetRow = jQuery('.flex-bar.selected-row')[0],
                    userId = parseInt(targetRow.dataset.id),
                    userObject = this.resourceGridRows.filter(resource => resource.id === userId)[0];

                let userName = userObject.username;
                this.userLogout = {
                    name : userName,
                    id : userId
                };
                if(userObject.loggedIn.status) {
                    this.zephyrStore.dispatch(this._userAction.logOutUser(this.userLogout));
                }

                this.zephyrStore.dispatch(this._userAction.clearResourceManagementEvent());
            }

            if(state.resourceManagement.event === 'LICENSE_ERROR') {
              jQuery('#license-modal').modal();
              this.licenseError = state.resourceManagement.message;
              this.zephyrStore.dispatch(this._userAction.clearResourceManagementEvent());
              this.isShowForm = true;
            }

            if(state.loggedUsers['event'] == LOGGED_USERS_CHANGED) {
                this.zephyrStore.dispatch(this._userAction.clearLoggedUserEvent());
                //this.zephyrStore.dispatch(this._userAction.updateUserLoginStatus(state.loggedUsers));

                setTimeout(() => {
                    this.zone.run(() => {
                      this.resourceGridRows = state.resourceManagement.resourceGrid.rows;
                      this.resourceGridRows = JSON.parse(JSON.stringify(this.resourceGridRows));
                    });
                }, 10);
            }


            if (state.resourceManagement.event === 'PREV_PAGE_RESOURCE_GRID_EVENT' || state.resourceManagement.event === 'NEXT_PAGE_RESOURCE_GRID_EVENT'
                || state.resourceManagement.event === 'PAGINATE_BY_INDEX_RESOURCE_GRID_EVENT') {
              this.zephyrStore.dispatch(this._userAction.clearResourceManagementEvent());
              if (this.isShowForm && this.idResourceClicked) { //TO check whether form was opened or not
                this.triggerFirstClick();
              }
            }
            this.triggerChange();
        });
        this.initializeGrid();
    }

    triggerLastClick() {
      setTimeout(() => {
        let grid_row = jQuery('.resource-management-grid .flex-bar');
        grid_row.last().trigger('click').parent().scrollTop(grid_row.height() * grid_row.length);
      }, 10);
    }

    triggerFirstClick() {
      setTimeout(() => {
        let grid_row = jQuery('.resource-management-grid .flex-bar');
        grid_row.first().trigger('click').parent().scrollTop(grid_row.height() * grid_row.length);
      }, 10);
    }

    setURLParams(params) {
      this.idResourceClicked = params['id'] || null;
    }
    // Update the URL to append the id
    updateURL() {
      if(this.idResourceClicked){
        this.router.navigate(['/resource_management/details', {id: this.idResourceClicked}]);
      } else {
        this.router.navigate(['/resource_management/details']);
      }
    }
    resourceGridRowClicked(targetRow) {
      this.idResourceClicked = targetRow.dataset.id;
      let gridRowObj = this.resourceGrid.sortedRows.filter(item => String(item.id) === String(this.idResourceClicked))[0];

      this.zephyrStore.dispatch(this._userAction.projectsAssignedToUserById(this.idResourceClicked));
      this.resourceObjectSelected = gridRowObj;
      this.isShowForm = true;
      this.updateURL();
    }

    resourceGridColumnChooserClick(target) {
      let targetTag = target.tagName.toUpperCase();
      if(targetTag !== 'LABEL' && targetTag !== 'INPUT') {
          return;
      }
      if(targetTag === 'LABEL') {
          target = target.parentElement.querySelector('INPUT');
      }
      let data = {
          columnId: target.dataset.id,
          isChecked: target.checked
      };
    }

    /* This function handles the action of logging out the other user. */
    resourceGridActionClick(event) {
        let targetRow = jQuery(event).closest('.flex-bar')[0];

        let userId = parseInt(targetRow.dataset.id);
        let userObject = this.resourceGridRows.filter(resource => resource.id === userId)[0] || {};

        let userName = userObject.username;
        this.userLogout = {
            name : userName,
            id : userId
        };

        jQuery('#confirmation-modal').modal();
        this.confirmationObject['heading'] = 'Forcible Logout';
        this.confirmationObject['text'] = 'Do you want to forcibly logout "' + userName + '"? ';
        this.confirmationObject['buttonText'] = 'OK';
        this.confirmationObject['showCancelButton'] = true;
        this.confirmationObject['action'] = LOGOUT_DOUBLE_CONFIRMATION;
    }

    // Three API calls to be made, one to update projects assigned,to update the information of user, to update profile pic.
    onResourceFormSubmit(formValues) {
      this.isShowForm = false;
      this.resourceFormUI.resetForm();
       let profileImageSrc = jQuery('#output').attr('src');
       let objectProfileImageSrc = formValues.id ? this.resourceObjectSelected.picture : false;
       let formDataPic = null;
       if (profileImageSrc && !profileImageSrc.includes('default') && !(profileImageSrc.includes(objectProfileImageSrc))) {
         let $uploadResourceProfilePic = jQuery('#uploadResourceProfilePic');
         formDataPic = new FormData($uploadResourceProfilePic[0]);
         let uploadFileURL = '/flex/upload/document/genericattachment';
       }
       let dataObject = {};
           dataObject['id'] = this.idResourceClicked;
           dataObject['projectId'] = this.newProjectsAllocated;

      if(formValues.id) {
        formValues.groups = this.resourceObjectSelected.groups;
        if (formDataPic) {
           this.zephyrStore.dispatch(this._userAction.editUserComplete(formValues, formDataPic, dataObject));
        } else {
           this.zephyrStore.dispatch(this._userAction.editUserDetails(formValues, dataObject));
        }
      } else {
        if (formDataPic) {
          this.zephyrStore.dispatch(this._userAction.addUserComplete(formValues, formDataPic));
        } else {
          this.zephyrStore.dispatch(this._userAction.addUser(formValues));
        }
      }
    }

    addResource() {
      if (this.inputSearch) {
        this.inputSearch = '';
        this.onClickSearch();
      }

      this.isShowForm = true;
      this.deHighlightRow();
      this.setURLParams({});
      this.updateURL();
      this.resourceObjectSelected = {};
      setTimeout(() => {
        jQuery('.resource-subform #resource-firstname').trigger('focus');
      }, 200);

    }

    deHighlightRow () {
      jQuery('.resource-management-grid').find('.flex-bar').removeClass('selected-row');
    }

    onClickSearch() {
      this.deHighlightRow();
      this.isShowForm = false;
      this.resourceFormUI.resetForm();
      let state  = this.zephyrStore.getState();
      let globalData = state.resourceManagement.resourceGrid.allRows;
      let inputTrim = this.inputSearch.trim();

      this.resourceGridRows = inputTrim ? globalData.filter(item => this.isMatchFound(item, inputTrim, ['fullName', 'title', 'roleName', 'location', 'email', 'username'])) : globalData;

      this._currentPage = 1;
      this.initializeGrid(this.resourceGridRows.length);
    }

    //This function tells whether the searchString is present in dataObject or not
    isMatchFound(dataObject, searchString, objectKeys) {
      let matchFound = false;
      let regEx = new RegExp(searchString, 'gi');
      objectKeys.forEach(key => {
        if (regEx.test(dataObject[key])) {
            matchFound = true;
        }
      });
      return matchFound;
    }

    inputSearchKeyPress(event) {
      if (event.which == 13 || event.keyCode == 13) {
         this.onClickSearch();
         return false;
      }
      return true;
    }

    confirmationActionCall(event) {
      let actionString = event.target.value;
      if (actionString === LOGOUT_DOUBLE_CONFIRMATION) {
         this.confirmationObject['heading'] = 'Forcible Logout';
         this.confirmationObject['text'] = 'Doing this will immediately logout "' + this.userLogout.name +
                                '". They might lose unsaved information.' +
                                ' Do you still want to continue?';

         this.confirmationObject['buttonText'] = 'OK';
         this.confirmationObject['showCancelButton'] = true;
         this.confirmationObject['action'] = LOGOUT;
      } else if (actionString === LOGOUT) {
        this.zephyrStore.dispatch(this._userAction.logOutUser(this.userLogout));
        jQuery('#confirmation-modal').modal('hide');
      } else if (actionString === NO_ACTION) {
        jQuery('#confirmation-modal').modal('hide');
      } else if (actionString === 'CANCEL') {
        this.resourceFormUI.updateResourceForm(this.resourceObjectSelected);
        this.isShowForm = false;
        this.resourceFormUI.resetForm();
        this.cancelProjectsAllocated();
        this.resourceObjectSelected = {};
        jQuery('#confirmation-modal').modal('hide');
      } else if (actionString === CONTINUE_CLICK) {
        this.checkForDirty = false;
        jQuery('#confirmation-modal-unsaved-data').modal('hide');
        jQuery(this.previousEventObject.target)[0].trigger('click');
      }
    }

    ngOnInit() {
      this.documentClicked = e => {
          if (this.checkForDirty) {
            if (this.resourceFormUI.isDirty() && this.isCheckforthisTarget(e)) {
              jQuery('#confirmation-modal-unsaved-data').modal();
              this.previousEventObject = e;
              e.stopPropagation();
            }
          } else {
            this.checkForDirty = true;
          }
        };
        document.addEventListener('click', this.documentClicked,true);
    }

    ngOnDestroy() {
      document.removeEventListener('click', this.documentClicked,true);
      this.unsubscribe();
    }

    isCheckforthisTarget(e) {
        return ((jQuery(e.target.closest('.flex-bar'))).length > 0) || (e.target.className.indexOf('zui-btn-plus') > -1 ) ||
            (jQuery(e.target).hasClass('fa-search')) || (e.target.children[0] && e.target.children[0].className.indexOf('fa-search') > -1);
    }

    fetchingAllResources () {
      let state = this.zephyrStore.getState();
      let user = state.loggedInUser;
      if(Object.keys(user).length) {
        this.zephyrStore.dispatch(this._userAction.fetchAllResourceDetails());
      }
    }

    cancelProjectsAllocated () {
      this.newProjectsAllocated = this.projectsAllocated;
    }

    resetUsersPassword (ev?:string) {
      jQuery('#confirmation-modal').modal();
      this.confirmationObject = {
        heading : 'Information',
        text : 'User\'s password has been reset, please save to apply changes',
        buttonText : 'OK',
        showCancelButton : false,
        action : NO_ACTION
      };
      // this.confirmationObject['heading'] = 'Information';
      // this.confirmationObject['text'] = 'User\'s password has been reset, please save to apply changes';
      // this.confirmationObject['buttonText'] = 'OK';
      // this.confirmationObject['showCancelButton'] = false;
      // this.confirmationObject['action'] = NO_ACTION;
    }

    resetResourceForm () {
      //resetting projects
      //this.cancelProjectsAllocated();

      jQuery('#confirmation-modal').modal();
      this.confirmationObject['heading'] = 'Cancel';
      this.confirmationObject['text'] = 'You have unsaved information. You may want to save or these changes will be lost. '
      + 'Do you still want to continue?';
      this.confirmationObject['buttonText'] = 'Continue';
      this.confirmationObject['showCancelButton'] = true;
      this.confirmationObject['action'] = 'CANCEL';
    }

    updateProjectAllocation(selectedProjects) {
      this.newProjectsAllocated = selectedProjects.map(project => project.id);
    }

   initializeGrid(totalCount?) {
    this.zephyrStore.dispatch(this._gridAction.initializeGrid({
      size: this._gridSize,
      currentPage: this._currentPage,
      rows: this.resourceGridRows,
      totalCount: totalCount
    }, 'RESOURCE_GRID'));
  }
  releaseGridPrevClick(value) {
    this._currentPage = value;
    this.zephyrStore.dispatch(this._gridAction.prevPage({
      size: this._gridSize,
      currentPage: this._currentPage
    }, 'RESOURCE_GRID'));
  }
  releaseGridNextClick(value) {
    this._currentPage = value;
    this.zephyrStore.dispatch(this._gridAction.nextPage({
      size: this._gridSize,
      currentPage: this._currentPage
    }, 'RESOURCE_GRID'));
  }
  releaseGridPageSizeChange(value) {
    this._gridSize = value;
    this._currentPage = 1;
        this.zephyrStore.dispatch(this._gridAction.initializeGrid({
      size: this._gridSize,
      currentPage: this._currentPage
    }, 'RESOURCE_GRID'));
  }
  releaseGridPaginateByIndex(value , isSetPaginateByIndexEvent) {
    this._currentPage = value;
        this.zephyrStore.dispatch(this._gridAction.paginateByIndex({
      size: this._gridSize,
      currentPage: this._currentPage
    }, 'RESOURCE_GRID' , true));
  }
  triggerChange() {
      if (this.changeDetectionDebounce) {
          clearTimeout(this.changeDetectionDebounce);
      }
      let firstDetection = !this.changeDetectionDebounce;
      this.changeDetectionDebounce = setTimeout(() => {
        this.changeDetectionDebounce = null;
          if(this.cdr) { this.cdr.markForCheck(); }
      }, firstDetection ? 50: 300);
  }

}
