import {Component,OnDestroy,ViewChild, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
//import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control} from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BreadCrumbComponent} from '../../common/breadcrumb/bread_crumb.component';
import {ZephyrStore} from '../../../../store/zephyr.store';
//import {GridComponent} from '../../grid/grid.component';
import {PROJECT_SETUP_GRID_TYPE, PROJECT_SETUP_GRID_OPTIONS} from '../project_setup.constants';
import {ProjectFormComponent} from '../project_form/project_form.component';

import {ProjectAction} from '../../../../actions/project.action';
import {GridAction} from '../../../../actions/grid.action';

import {ADD_PROJECT_SUCCESS, PREV_PAGE_PROJECTSETUP_GRID_EVENT, NEXT_PAGE_PROJECTSETUP_GRID_EVENT,
        PAGINATE_BY_INDEX_PROJECTSETUP_GRID_EVENT} from '../../../../utils/constants/action.events';

import {ADMIN_PREFERENCES} from '../../admin/admin.constant';
import {UtililtyFunctions} from '../../../../utils/scripts/utils';

declare var jQuery: any, moment: any, _: any;

const DELETE = 'DELETE';
const NO_ACTION = 'NO_ACTION';
const DELETE_DOUBLE_CONFIRMATION = 'DELETE_DOUBLE_CONFIRMATION';
const HIDE_PROJECT_FORM = 'HIDE_PROJECT_FORM';
const CONTINUE_CLICK = 'CONTINUE_CLICK';

@Component({
  selector: 'project-setup-details',
  viewProviders: [ProjectAction ,GridAction],
  templateUrl: 'project_setup_details.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectSetupDetailsComponent implements OnDestroy , OnInit {
    @ViewChild(ProjectFormComponent) projectFormUI: ProjectFormComponent;
    zephyrStore;
    projectSetupGrid;
    state;
    projectForm : FormGroup;
    idProjectClicked = '';
    activeItemKey: string;
    confirmationObject : any = {};
    unsubscribe;
    breadCrumbsList;
    projectSetupGridType;
    inputSearch = '';
    previousEventObject;
    checkForDirty = true;
    utililtyFunctions;
    documentClicked;
    projectSetupGridRows;
    private _gridSize;
    private _currentPage = 1;
    private totalCount;
    private changeDetectionDebounce;

    constructor(fb: FormBuilder, private _projectAction: ProjectAction , private _gridAction: GridAction, public router: Router,  private cdr: ChangeDetectorRef) {

        this._gridSize = 50;
        this.zephyrStore = ZephyrStore.getZephyrStore();
        //initializing with constants and default data
        this.activeItemKey = 'project-dashboard';
        this.breadCrumbsList = [{id:'1', text:'Department'}, {id:'2', text: 'Project Setup'}];
        this.inputSearch='';
        this.projectSetupGridType = PROJECT_SETUP_GRID_TYPE;
        this.checkForDirty = true;
        this.utililtyFunctions = new UtililtyFunctions();
        //Form initializing and setting to default values
        this.projectForm = fb.group({
          name: ['', Validators.required],
          startDate : ['',Validators.required],
          id:[''],
          description : [''],
          endDate : [''],
          isolationLevel : [''],
          dashboardSecured : [false],
          dashboardUrl : ['',Validators.required],
          dashboardRestricted : [false]
        });
        this.projectSetupGrid = this.zephyrStore.getState().projectSetup.projectSetupGrid;
        this.projectSetupGridRows = this.zephyrStore.getState().projectSetup.projectSetupGrid.rows;
        //API call to fetch all projects
          let user = this.zephyrStore.getState().loggedInUser;
          if(Object.keys(user).length) {
            this.fetchingAllProjects();
          }
        this.unsubscribe = this.zephyrStore.subscribe(() => {
            //initializaing grid data
            this.state  = this.zephyrStore.getState();
            let users = this.state.resourceManagement.users.length > 0 ? this.state.resourceManagement.users : this.state.global.users;

            this.projectSetupGridRows = this.state.projectSetup.projectSetupGrid.rows;
            this.totalCount = this.state.projectSetup.projectSetupGrid.totalCount;

            if(this.state.projectSetup.event == ADD_PROJECT_SUCCESS) {
                  this.zephyrStore.dispatch(this._projectAction.clearProjectSetupEvents());
                  this._currentPage = this.projectSetupGrid.paginationOptions.lastIndex;
                  this.projectGridPaginateByIndex(this._currentPage, false);
                  setTimeout(() => {
                    this.triggerLastClick();
                  }, 501);

                  //adding lead fullname to last added object only
                  let dataObject = this.projectSetupGrid.rows[this.projectSetupGrid.rows.length - 1];
                  if (dataObject.lead  && dataObject.lead.id) {
                     users.forEach(userObject => {
                       if (userObject.id == dataObject.lead.id) {
                         dataObject.lead.fullname = userObject.firstName + ' ' + userObject.lastName;
                         return false;
                       }
                       return true;
                     });
                  }
              } else {
                //adding lead fullname to all row objects
                this.projectSetupGrid.rows.forEach(dataObject => {
                  if (dataObject.lead  && dataObject.lead.id) {
                     users.forEach(userObject => {
                       if (userObject.id == dataObject.lead.id) {
                         dataObject.lead.fullname = userObject.firstName + ' ' + userObject.lastName;
                         return false;
                       }
                       return true;
                     });
                  }
                });
              }
              if (this.state.projectSetup.event == PREV_PAGE_PROJECTSETUP_GRID_EVENT || this.state.projectSetup.event == NEXT_PAGE_PROJECTSETUP_GRID_EVENT ||
                  this.state.projectSetup.event == PAGINATE_BY_INDEX_PROJECTSETUP_GRID_EVENT) {
                  this.zephyrStore.dispatch(this._projectAction.clearProjectSetupEvents());
                  if (this.projectFormUI.isShowForm && !this.projectFormUI.isAdd) { //TO check whether form was opened or not
                    this.triggerFirstClick();
                  }
              }
              this.triggerChange();
        });
        this.initializeGrid();
    }

    ngOnInit() {
      this.documentClicked = e => {
          if (this.checkForDirty) {
            if (this.projectFormUI.ifFormDirty() && this.isCheckforthisTarget(e)) {
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

    //This function is called when component is destroyed.
    ngOnDestroy() {
      document.removeEventListener('click', this.documentClicked,true);
      this.unsubscribe();
    }

    isCheckforthisTarget(e) {
        return ((jQuery(e.target.closest('.flex-bar'))).length > 0) || (e.target.className.indexOf('zui-btn-plus') > -1 ) ||
            (jQuery(e.target).hasClass('fa-search')) || (e.target.children[0] && e.target.children[0].className.indexOf('fa-search') > -1);
    }

    //This function is called when a grid-row is clicked.
    //It updates the form, shows the form, updates the boolean values.
    projectSetupGridRowClicked(targetRow) {
      this.idProjectClicked = targetRow.dataset.id;
      let projectOBject = this.projectSetupGrid.sortedRows.filter(item => String(item.id) === String(this.idProjectClicked))[0];

      this.projectFormUI.isShowForm = true;
      this.projectFormUI.isAdd = false;
      this.projectFormUI.updateForm(projectOBject);
    }

    //Function is called when clicked on action icon of grid.
    projectSetupGridActionClick(event) {
        let actionToBaTaken = event.target.dataset.action,
            trParents = jQuery(event.target).closest('.flex-bar'),
            targetRow = trParents[0];

      this.idProjectClicked = targetRow.dataset.id;
      this.projectFormUI.hideForm();
      this.deHighlightRow();
      if (actionToBaTaken === 'delete') {
          this.deleteProject();
          jQuery(targetRow).addClass('selected-row');
      }
    }

    //This function is called when clicked on delete icon of grid.
    deleteProject() {
       if (this.totalCount <= 1) {
         this.confirmationObject['heading'] = 'Invalid Delete';
         this.confirmationObject['text'] = 'Last project cannot be deleted';
         this.confirmationObject['buttonText'] = 'OK';
         this.confirmationObject['cancelButtonText'] = 'cancel';
         this.confirmationObject['showCancelButton'] = false;
         this.confirmationObject['action'] = NO_ACTION;
       } else {
         this.confirmationObject['heading'] = 'Warning';
         this.confirmationObject['text'] = 'Are you sure you want to delete this?';
         this.confirmationObject['buttonText'] = 'OK';
         this.confirmationObject['cancelButtonText'] = 'cancel';
         this.confirmationObject['showCancelButton'] = true;
         this.confirmationObject['action'] = DELETE_DOUBLE_CONFIRMATION;
       }
        jQuery('#confirmation-modal').modal();
    }

    //Function is called when clicked on add-button/add-image.
    addProject() {
        if (this.inputSearch) {
          this.inputSearch = '';
          this.onClickSearch();
        }
        this.projectFormUI.isShowForm = true;
        this.projectFormUI.isAdd = true;
        this.projectFormUI.resetForm();
        this.deHighlightRow();
      setTimeout(() => {
        jQuery('.project-form #project-name').trigger('focus');
      },200);

    }

    //This fucntion is called when any of the two buttons of confirmation popup are pressed.
    confirmationActionCall(event) {
      let actionString = event.target.value;
      if (actionString === DELETE) {
        this.zephyrStore.dispatch(this._projectAction.deleteProject(this.idProjectClicked, this.zephyrStore.getState().loggedInUser.id));
      } else if (actionString === DELETE_DOUBLE_CONFIRMATION) {
         jQuery('#confirmation-modal').modal();
         this.confirmationObject['heading'] = 'Warning';
         this.confirmationObject['text'] = 'This change cannot be rolled back, continue with delete?';
         this.confirmationObject['buttonText'] = 'Delete';
         this.confirmationObject['showCancelButton'] = true;
         this.confirmationObject['action'] = DELETE;
      } else if (actionString === HIDE_PROJECT_FORM) {
        this.projectFormUI.hideForm();
      } else if (actionString === CONTINUE_CLICK) {
        this.checkForDirty = false;
         jQuery('#confirmation-modal-unsaved-data').modal('hide');
        jQuery(this.previousEventObject.target)[0].trigger('click');
      }
      if (!(actionString === DELETE_DOUBLE_CONFIRMATION || actionString === CONTINUE_CLICK)) {
        jQuery('#confirmation-modal').modal('hide');
      }
    }

    //This function updates the store with all the projects.
    fetchingAllProjects() {
      this.zephyrStore.dispatch(this._projectAction.fetchingAllProjects());
    }

    //De-highlites selected row
    deHighlightRow() {
      jQuery('.project-setup-grid').find('.flex-bar').removeClass('selected-row');
    }

    // This function triggers the click of last project in the grid
    triggerLastClick() {
      setTimeout(() => {
        let grid_row = jQuery('.project-setup-grid .flex-bar');
        grid_row.last().trigger('click').parent().scrollTop(grid_row.height() * grid_row.length);
      }, 100);
    }

    // This function triggers the click of first project in the grid
    triggerFirstClick() {
      setTimeout(() => {
        let grid_row = jQuery('.project-setup-grid .flex-bar');
        grid_row.first().trigger('click').parent().scrollTop(grid_row.height() * grid_row.length);
      }, 100);
    }

    //This function is called when search button is clicked and filters the row
    onClickSearch() {
      this.deHighlightRow();
      this.projectFormUI.hideForm();
      let globalData = this.state.projectSetup.projectSetupGrid.allRows;
      let inputTrim = this.inputSearch.trim();

      this.projectSetupGridRows = inputTrim ? globalData.filter(item => this.isMatchFound(item, inputTrim, ['name', 'lead', 'startDate', 'endDate'])) : globalData;

      this._currentPage = 1;
      this.initializeGrid(this.projectSetupGridRows.length);
    }

    //This function tells whether the searchString is present in dataObject or not
    isMatchFound(dataObject, searchString, objectKeys) {
      let matchFound = false;
      let regEx = new RegExp(searchString, 'gi');
      objectKeys.forEach(key => {
          if (key === 'startDate' || key === 'endDate') {
              if (regEx.test(this.utililtyFunctions.timeStampToMmDdYy(dataObject[key]))) {
                matchFound = true;
              }
          } else if ( key === 'lead' && dataObject[key] && dataObject[key].fullname) {
            if (regEx.test(dataObject[key].fullname)) {
                matchFound = true;
              }
          } else {
            if (regEx.test(dataObject[key])) {
              matchFound = true;
            }
          }
      });
      return matchFound;
    }

    //This function is called when user enters anything in  the search-box.
    //This function checks for the enter key and executes search on click of enter-key
    inputSearchKeyPress(event) {
      if (event.which == 13 || event.keyCode == 13) {
         this.onClickSearch();
         return false;
      }
      return true;
    }

    confirmationDialogueData(confirmationObject) {
      jQuery('#confirmation-modal').modal();
      this.confirmationObject = confirmationObject;
    }

  initializeGrid(totalCount?) {
    this.zephyrStore.dispatch(this._gridAction.initializeGrid({
      size: this._gridSize,
      currentPage: this._currentPage,
      rows: this.projectSetupGridRows,
      totalCount: totalCount
    }, 'PROJECTSETUP_GRID'));
  }
  projectGridPrevClick(value) {
    this._currentPage = value;
    this.zephyrStore.dispatch(this._gridAction.prevPage({
      size: this._gridSize,
      currentPage: this._currentPage
    }, 'PROJECTSETUP_GRID'));
  }
  projectGridNextClick(value) {
    this._currentPage = value;
    this.zephyrStore.dispatch(this._gridAction.nextPage({
      size: this._gridSize,
      currentPage: this._currentPage
    }, 'PROJECTSETUP_GRID'));
  }
  projectGridPageSizeChange(value) {
    this._gridSize = value;
    this._currentPage = 1;
    this.zephyrStore.dispatch(this._gridAction.initializeGrid({
      size: this._gridSize,
      currentPage: this._currentPage
    }, 'PROJECTSETUP_GRID'));
  }
  projectGridPaginateByIndex(value, isSetPaginateByIndexEvent) {
    this._currentPage = value;
    this.zephyrStore.dispatch(this._gridAction.paginateByIndex({
      size: this._gridSize,
      currentPage: this._currentPage
    }, 'PROJECTSETUP_GRID', isSetPaginateByIndexEvent));
  }

  triggerChange() {
    if (this.changeDetectionDebounce) {
        clearTimeout(this.changeDetectionDebounce);
    }
    let firstDetection = !this.changeDetectionDebounce;
    this.changeDetectionDebounce = setTimeout(() => {
        this.changeDetectionDebounce = null;
        if(this.cdr) { this.cdr.markForCheck(); }
    }, firstDetection ? 200 : 300);
  }
}
