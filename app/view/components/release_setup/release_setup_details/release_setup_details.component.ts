import {
  Component, OnDestroy, ViewChild, ViewContainerRef, ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {ReleaseFormComponent} from '../release_form/release_form.component';
import {CloneReleaseComponent} from '../clone_release/clone_release.component';
import {ReleaseAction} from '../../../../actions/release.action';
import {GridAction} from '../../../../actions/grid.action';
// Constants
import {RELEASE_SETUP_GRID_TYPE, RELEASE_GRID_OPTIONS} from '../release_setup_grid.constant';
import {BreadCrumbComponent} from '../../common/breadcrumb/bread_crumb.component';
import {NOTIFICATION_APP_CONSTANTS, NOTIFICATION_ENTITY_CONSTANTS} from '../../../../utils/constants/notification.constants';
import {constructNotificationStoreMetadata, checkIfNotificationIsPending} from '../../../../utils/notification/notification.util';

import {NotificationAction} from '../../../../actions/notification.action';
import {NotificationStore} from '../../../../store/notification.store';

import {ZephyrLocalStorage} from '../../../../utils/localstorage/local-storage.util';
import {isLoggedin}  from '../../../../utils/constants/is-loggedin';

declare var jQuery: any, moment: any, window: any;

const DELETE = 'DELETE';
const NO_ACTION = 'NO_ACTION';
const DELETE_DOUBLE_CONFIRMATION = 'DELETE_DOUBLE_CONFIRMATION';
const CLONE_RELEASE = 'CLONE_RELEASE';
const CLONE_RELEASE_CONFIRMED = 'CLONE_RELEASE_CONFIRMED';

@Component({
  selector: 'release-setup-details',
  viewProviders: [ReleaseAction ,GridAction, NotificationAction],
  templateUrl: 'release_setup_details.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ReleaseSetupDetailsComponent implements OnDestroy {
    @ViewChild(ReleaseFormComponent) releaseFormUI: ReleaseFormComponent;
    @ViewChild(CloneReleaseComponent) cloneReleaseUI: CloneReleaseComponent;
    showDirtyCheckModal = false;
    isLoggedin = isLoggedin;
    zephyrStore;
    _notificationStore;
    state;
    selectedRelease:any;
    refreshTriggered = false;
    isShowForm = false;
    releaseSetupGrid;//Contains all data of release-setup grid
    idReleaseClicked = '';
    currentRelease = {  id: '',
                        text : ''
                      };
    confirmationObject = {
      heading : '',
      text: '',
      showCancelButton : true,
      action: '',
      buttonText: '',
      cancelButtonText: ''
    };
    addReleaseRadioOption ; //Controls whether to open add release form or clone form, when add-new-release button is clicked
    lastRow;
    unsubscribe;
    rowIds='';
    _currentPage = 1;
    _gridSize;
    releaseGridType = RELEASE_SETUP_GRID_TYPE;
    breadCrumbsList = [];
    project_link;
    release_link;
    currentProject = {};
    appId;
    constructor( fb: FormBuilder, private _releaseAction: ReleaseAction , private _gridAction: GridAction,
                 private _notificationAction:NotificationAction, public router: Router,  private cdr: ChangeDetectorRef) {
        this.appId = NOTIFICATION_APP_CONSTANTS.RELEASE_SETUP_APP.name;
        this._gridSize = RELEASE_GRID_OPTIONS.rowCount;
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this._notificationStore = NotificationStore.getNotificationStore();
        this.addReleaseRadioOption = 'create-new'; //Setting default value as 'create-new', because by default create-new-relase is selected

        this.currentProject = this.getCurrentProject();
        this.currentRelease = this.getCurrentRelease();

        if (this.currentProject) {
          this.fetchingAllReleasesByProjectId(false);
          this.fetchAllRelease();
          this.handleSubscriptions();

          //Checking if this.currentReleaseis is not an empty object
          if (this.currentRelease.constructor === Object && Object.keys(this.currentRelease).length > 0 && this.currentProject) {
            this.breadCrumbsList = [{text:this.currentProject['name'], id:'/project/' + this.currentProject['id']},
              {text:this.currentRelease['text'] , id:'/release/' + this.currentRelease['id']},
              {text:'Release Setup' , id:null}
            ];
          } else {
            this.breadCrumbsList = [{text:this.currentProject['name'], id:'/project/' + this.currentProject['id']},
                {text:'Release Setup' , id:null}
            ];
          }


          this.releaseSetupGrid = this.zephyrStore.getState().release.releaseSetupGrid;

          let releases = this.releaseSetupGrid.rows.filter(function(release) {
            return !release.status;
          });

          releases = releases.map((obj) => {
              return {id: obj.id, text: obj.name};
          });

          localStorage.setItem('releases', JSON.stringify(releases));

          this.unsubscribe = this.zephyrStore.subscribe(() => {
              //initializaing grid data and bread-crumb data
              this.state  = this.zephyrStore.getState();
              this.releaseSetupGrid = this.state.release.releaseSetupGrid;

            if(this.state.release.event == 'TRIGGER_LAST_RELEASE') {
                  this._currentPage = this.releaseSetupGrid.paginationOptions.lastIndex;
                  this.zephyrStore.dispatch(this._releaseAction.clearReleaseEvent(null));
                  this.releaseGridPaginateByIndex(this._currentPage);
                  setTimeout(() => {
                    // jQuery(`div[data-id=${this.state.release.addedRelease}]`).click();
                    this.triggerLastClick();
                  });
              }

              this.currentRelease = this.getCurrentRelease();
              this.currentProject = this.getCurrentProject();

              if (this.currentProject) {
                  //Checking if this.currentReleaseis is not an empty object
                  if (this.currentRelease.constructor === Object && Object.keys(this.currentRelease).length > 1) {

                    this.breadCrumbsList = [{text:this.currentProject['name'], id:'/project/' + this.currentProject['id']},
                      {text:this.currentRelease['text'] , id:'/release/' + this.currentRelease['id']},
                      {text:'Release Setup' , id:null}
                    ];
                  } else {
                    this.breadCrumbsList = [{text:this.currentProject['name'], id:'/project/' + this.currentProject['id']},
                        {text:'Release Setup' , id:null}
                    ];
                  }
              }

            if (this.refreshTriggered) {
              this.triggerLastClick();
              this._currentPage = this.releaseSetupGrid.paginationOptions.lastIndex;
              this.refreshTriggered = false;
            }
            if(this.cdr) { this.cdr.markForCheck(); }
          });

        }
    }

    getCurrentRelease() {
      let currentRelease = localStorage.getItem(`${window.tab}-currentRelease`);

      return JSON.parse(currentRelease || '{}');
    }

    getCurrentProject() {
      let currentProject = localStorage.getItem(`${window.tab}-currentProject`);

      if (currentProject) {
        return JSON.parse(currentProject);
      } else {
        try {
          this.router.navigate(['/project', JSON.parse(localStorage.getItem("userAllocatedProjects"))[0]]);
        } catch(e) {
          if(this.isLoggedin()) {
            this.router.navigate(['/']);
          }
        }
      }
    }


    triggerLastClick() {
      setTimeout(() => {
        let grid_row = jQuery('.release-grid .flex-bar');
        grid_row.last().click();
        grid_row.parent().scrollTop(grid_row.height() * grid_row.length);
      }, 10);
    }

    handleSubscriptions() {
        if (this.currentProject && this.currentRelease) {
          let metadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.RELEASE,this.currentProject['id'],'');
          this._notificationStore.dispatch(this._notificationAction.subscribeToTopic(metadata,'',this.appId));
        }
    }

    handleUnSubscriptions() {
      if (this.currentProject && this.currentRelease) {
        let metadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.RELEASE,this.currentProject['id'],'');
        this._notificationStore.dispatch(this._notificationAction.unSubscribeFromTopic(metadata,this.appId));
      }
    }

    applyNotifications(ev) {
        this.refreshReleases();
        this._notificationStore.dispatch(this._notificationAction.applyNotification(this.appId, true));
    }

    checkIfNotificationIsPending() {
        //return checkIfNotificationIsPending(this.appId,NOTIFICATION_ENTITY_CONSTANTS.RELEASE, this.currentProject['id'], '');
        return false;
    }

    //This function controls prev action of release grid and hides the form
    releaseSetupGridPrevClick(value) {
        this._currentPage = value;
        this.zephyrStore.dispatch(this._gridAction.prevPage({
            size: this._gridSize,
            currentPage: this._currentPage
        }, 'RELEASE_SETUP_GRID'));
        this.cloneReleaseUI.hideCloneForm();
        this.releaseFormUI.hideReleaseForm();
    }

    //This function controls next action of release grid and hides the form
    releaseSetupGridNextClick(value) {
        this._currentPage = value;
        this.zephyrStore.dispatch(this._gridAction.nextPage({
            size: this._gridSize,
            currentPage: this._currentPage
        }, 'RELEASE_SETUP_GRID'));
        this.cloneReleaseUI.hideCloneForm();
        this.releaseFormUI.hideReleaseForm();
    }

    //This function opens/updates the edit-release form of selected release
    releaseSetupGridRowClicked(targetRow) {
      this.lastRow = targetRow;

      if (this.releaseFormUI.shouldNotAllowClose() && this.releaseFormUI.isShowForm) {
        this.showDirtyCheckModal = true;
      } else {
        this.handleRowClick(targetRow);
      }

    }

    dismissNavigation(event) {
      this.showDirtyCheckModal = false;
    }

    continueNavigation(event) {
      this.showDirtyCheckModal = false;
      this.handleRowClick(this.lastRow);
    }

    handleRowClick(targetRow) {
      if (targetRow) {
        this.lastRow = null;
        let index = targetRow.dataset.index;
        if(!index) {
          return;
        }

        let gridRowObj = this.releaseSetupGrid.rows[index];
        this.selectedRelease = gridRowObj;
        this.idReleaseClicked = gridRowObj.id;
        this.releaseFormUI.updateReleaseForm(gridRowObj); //updates the relase-form with selected release data
        this.cloneReleaseUI.hideCloneForm();
      } else {
        this.showDirtyCheckModal = false;
        this.releaseFormUI.hideReleaseForm();
      }
    }

    // On page size update the state and get releases by size
    releaseGridPageSizeChange(value) {
        this._gridSize = value;
        this._currentPage = 1;
        this.zephyrStore.dispatch(this._gridAction.getGridData({
            size: this._gridSize,
            currentPage: this._currentPage
        }, 'RELEASE_SETUP_GRID'));
        this.cloneReleaseUI.hideCloneForm();
        this.releaseFormUI.hideReleaseForm();
    }
    releaseGridPaginateByIndex(value) {
      this._currentPage = value;
          this.zephyrStore.dispatch(this._gridAction.getGridData({
          size: this._gridSize,
          currentPage: this._currentPage
      }, 'RELEASE_SETUP_GRID'));
      this.cloneReleaseUI.hideCloneForm();
      this.releaseFormUI.hideReleaseForm();
    }

    //This function control action to be taken (delete and clone)
    releaseSetupGridActionClick ($event) {
      let target = $event.target,
          actionToBaTaken = target.dataset.action,
          trParents = jQuery(target).closest('.flex-bar'),
          targetRow = trParents[0];
      this.idReleaseClicked = targetRow.dataset.id;
      this.releaseFormUI.hideReleaseForm();
      this.cloneReleaseUI.hideCloneForm();
      //Depending on the action-icon clicked, calls that particular function
      if (actionToBaTaken === 'delete') {
            this.deleteRelease();
      } else if (actionToBaTaken === 'clone') {
            this.cloneRelease();
      }

    }

    //Opens add-release-modal
    addNewRelease() {
      if(this.checkIfNotificationIsPending()) {
        this.zephyrStore.dispatch(this._notificationAction.handlePendingNotificationError());
        return;
      }
      jQuery('#add-release-modal').modal();
    }

    //Hides add relase-modal, and opens add-release form or clone-form and hides the other.
    addModalClicked() {
      jQuery('#add-release-modal').modal('hide');
      this.deHighlightRow();
      if (this.addReleaseRadioOption === 'create-new') { //opens add-release form
        this.releaseFormUI.resetReleaseForm(); //call to reset the release-form
        this.cloneReleaseUI.hideCloneForm();
      } else if (this.addReleaseRadioOption === 'clone') { //opens clone form
        this.idReleaseClicked = '';
        this.selectedRelease = null;
        this.releaseFormUI.hideReleaseForm();
        this.cloneRelease();
      }
       setTimeout(() => {
        jQuery('.subform #release-name').trigger('focus');
      },200);
    }

    //This function handles deleting of release
    deleteRelease() {
      if(this.checkIfNotificationIsPending()) {
        this.zephyrStore.dispatch(this._notificationAction.handlePendingNotificationError());
        return;
      }
      //INFO: user cannot delete current release and last release
      if (this.releaseSetupGrid.sortedRows.length === 1) {
        jQuery('#confirmation-modal').modal();
        this.confirmationObject['heading'] = 'Invalid Delete';
        this.confirmationObject['text'] = 'Last release can only be deleted along with the project';
        this.confirmationObject['buttonText'] = 'OK';
        this.confirmationObject['showCancelButton'] = false;
        this.confirmationObject['action'] = NO_ACTION;
      } else if (this.idReleaseClicked == this.currentRelease.id) {
          jQuery('#confirmation-modal').modal();
          this.confirmationObject['heading'] = 'Invalid Delete';
          this.confirmationObject['text'] = 'Current release cannot be deleted, if you wish to delete'
                          + ' this release please navigate away to another release tab';
          this.confirmationObject['buttonText'] = 'OK';
          this.confirmationObject['showCancelButton'] = false;
          this.confirmationObject['action'] = NO_ACTION;
      } else {
        //Double confirmation while deleteing the release
        jQuery('#confirmation-modal').modal();
        this.confirmationObject['heading'] = 'Warning';
        this.confirmationObject['text'] = 'Are you sure you want to delete this?';
        this.confirmationObject['buttonText'] = 'OK';
        this.confirmationObject['showCancelButton'] = true;
        this.confirmationObject['action'] = DELETE_DOUBLE_CONFIRMATION;
      }
    }

    confirmationActionCall($event) {
      let actionString = $event.target.value;
      if (actionString === DELETE) {
        jQuery('#confirmation-modal').modal('hide');
        //API call to delete release
        this.zephyrStore.dispatch(this._releaseAction.deleateRelease(this.idReleaseClicked));
      } else if (actionString === DELETE_DOUBLE_CONFIRMATION) {
         jQuery('#confirmation-modal').modal('hide');
         setTimeout(function() { jQuery('#confirmation-modal').modal(); }, 1000);
         this.confirmationObject['heading'] = 'Warning';
         this.confirmationObject['text'] = 'This change cannot be rolled back, continue with delete?';
         this.confirmationObject['buttonText'] = 'Delete';
         this.confirmationObject['showCancelButton'] = true;
         this.confirmationObject['action'] = DELETE;
         //jQuery('#confirmation-modal').modal();
      } else if (actionString === CLONE_RELEASE) {
        jQuery('#confirmation-modal').modal('hide');
         this.cloneReleaseUI.resetCLoneForm(this.idReleaseClicked);
         this.cloneReleaseUI.setCloneFormDetails(this.selectedRelease);
      } else if (actionString === CLONE_RELEASE_CONFIRMED) {
        this.cloneReleaseUI.clonedReleaseAPIcall();
      } else if (actionString === NO_ACTION) {
        jQuery('#confirmation-modal').modal('hide');
      }
    }

    //Clone Release confirmation
    cloneRelease() {
      if(this.checkIfNotificationIsPending()) {
        this.zephyrStore.dispatch(this._notificationAction.handlePendingNotificationError());
        return;
      }
      jQuery('#confirmation-modal').modal();
         this.confirmationObject['heading'] = 'Warning';
         this.confirmationObject['text'] = 'Based on the size of the release being cloned and the options selected,'
                                         + ' this process can take a long time to complete. The release being cloned will'
                                         +  ' be locked and unavailable to users during this process. Any unsaved data will be'
                                         + ' lost and API access to this release will also be impacted. It is highly recommended '
                                         + 'that this feature be used during off-peak hours so users are not affected. Please'
                                         + ' inform users of this impact.\n Do you wish to continue?';
         this.confirmationObject['buttonText'] = 'Yes';
         this.confirmationObject['showCancelButton'] = true;
         this.confirmationObject['action'] = CLONE_RELEASE;
    }

    ngOnDestroy() {
      if(this.appId) {
          this.handleUnSubscriptions();
      }

      if (this.currentProject && this.currentRelease) {
        this.unsubscribe();
      }
    }

    //This function fetches all release of current project selected
    fetchingAllReleasesByProjectId (isTriggerLastOne) {
      this.zephyrStore.dispatch(this._releaseAction.fetchReleasesByProjectId(this.currentProject['id'] , isTriggerLastOne));
                    //project id fetched from localstorage
    }

    //This function fetches all release of all projects
    fetchAllRelease() {
      this.zephyrStore.dispatch(this._releaseAction.fetchAllReleases()); //Fetch all reelases, irrespective of project
    }

    releaseSetupGridRowReorder (releaseOrderArray) {
      //TODO: API integration, loader and dragnDrop icon to be added
//      console.log('API to be Integrated for release re-ordering' , releaseOrderArray);
    }

    //Refreshes release-setup-grid releases and all releases
    refreshReleases() {
      this.refreshTriggered = true;
      this.fetchingAllReleasesByProjectId(true);
      this.fetchAllRelease();
    }

    //De-highlites selected row
    deHighlightRow () {
      jQuery('.release-grid').find('.flex-bar').removeClass('selected-row');
    }

    //This function is called, whenever breadcumb is clicked
    onBreadCrumbClick ($event) {
       let routerLink = $event.target.dataset.nodeid;
       if (routerLink) {
         this.router.navigateByUrl(routerLink);
       }
     }
  }
