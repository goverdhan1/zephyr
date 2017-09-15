import {Component, Input, AfterViewInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {DefectsAction} from '../../../../actions/defects.action';
import {ImportAction} from '../../../../actions/import.action';
import {UpdateDefectUserComponent} from '../../defects/defect_tracking/update_user/update_defect_user.component';
import {DefectsAdvancedSearchComponent} from '../../defects/defect_tracking/search/advanced/defects_advanced_search.component';

// Constants
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';

declare var jQuery: any, _;

@Component({
    selector: 'zui-import-req-jira',
    templateUrl: 'requirement_import_jira.html',
    viewProviders: [DefectsAction, ImportAction]
})
export class RequirementsImportJIRAComponent implements AfterViewInit {
    @ViewChild(UpdateDefectUserComponent) updateDtUserCmp: UpdateDefectUserComponent;
    @ViewChild(DefectsAdvancedSearchComponent)jiraSearchCmp: DefectsAdvancedSearchComponent;

    isFilter = false;
    records = 0;
    releaseId;
    isUserUpdateRequired;
    isResetDTUser;
    selectedReqIds = [];
    importDesc:any = {
      JQL : null,
      filterName: ''
    };
    showSearchComp = true;
    i18nMessages = I18N_MESSAGES;
    foldername;
    topFolderName;
    isImportToolarge = false;

    private zephyrStore;

    constructor(private route: ActivatedRoute, public router: Router,
         private _defectsAction: DefectsAction, private _importAction: ImportAction) {
        this.route.params.subscribe(params => {
            this.releaseId = params['id'];
        });
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.zephyrStore.subscribe((x) => {
            this.onStateChange();
        });
    }
    ngAfterViewInit() {
        jQuery('#zee-import-modal-requirement-jira').on('show.bs.modal', (ev) => {
            if(ev.target === ev.currentTarget) {
                this.checkDefectUserState();
                this.clearImportJIRAState();  //clear import start in the modal
            }
        });
        jQuery('#zee-import-modal-requirement-jira').on('hidden.bs.modal', (ev) => {
            if(ev.target === ev.currentTarget) {
                this.clearImportJIRAState();
            }
        });
    }
    onStateChange() {
        let importState = this.zephyrStore.getState().imports;
        if(importState.event === 'IMPORT_REQ_FROM_JIRA') {
            this.zephyrStore.dispatch(this._importAction.clearImportEvents());
            this.zephyrStore.dispatch(this._defectsAction.clearDefectAllRows());
            this.dismissModal();
        }
    }
    clearImportJIRAState() {
        this.showSearchComp = false;
        this.foldername ="";
        this.topFolderName="";

        this.importDesc = {
          JQL : null
        };

      setTimeout(() => {
            this.showSearchComp = true;
        }, 100);
    }
    setFolderStructure(obj){
        this.foldername= obj.subFolder;
        this.topFolderName = obj.topFolderName;
    }
    checkDefectUserState() {
        this.zephyrStore.dispatch(this._defectsAction.getDefectUser());
    }
    onShowUpdateUserModal(selectedVal) {
        this.isUserUpdateRequired = selectedVal;
        if(selectedVal === 'false') {
            if(this.isResetDTUser) {
                this.isResetDTUser = false;
                this.isUserUpdateRequired = 'true';
                setTimeout(() => {
                    this.isUserUpdateRequired = 'false';
                }, 10);
            }
        }
    }
    resetDTUserButtonClick() {
        this.isResetDTUser = true;
        this.isUserUpdateRequired = 'true';
    }
    onUserUpdate() {
        this.updateDtUserCmp.onUserUpdate();
    }
    onResetUser() {
        this.updateDtUserCmp.userCreationType = 'UPDATE';
        this.updateDtUserCmp.onUserUpdate();
    }
    deleteUser() {
        jQuery('#defect-delete-user-modal').modal('hide');
        this.updateDtUserCmp.deleteUser();
    }
    onDeleteUser() {
        //after delete
        this.isResetDTUser = false;
        this.isUserUpdateRequired = 'false';
        this.dismissModal();
    }
    onResetUserCompletion() {
        this.isResetDTUser = false;
        this.isUserUpdateRequired = 'false';
    }
    dismissModal() {
        jQuery('#zee-import-modal-requirement-jira').modal('hide');
        this.isImportToolarge = false;
    }

    hideModal() {
      jQuery("#confirmation-modal-import-all").modal("hide");
      this.isImportToolarge = false;
    }

    closeEmptyPopup() {
      jQuery("#jql-empty-popup").modal("hide");

      setTimeout(() => {
        jQuery("#searchDefectsJQL").focus();
      });
    }

    importRequirementsFromJIRA(importAll) {

        if (!importAll) {
          let requestObj = {
            'projectId': this.zephyrStore.getState().project.id,
            'description': this.importDesc,
            'topFolderName' : this.topFolderName,
            'subFolder' : this.foldername
          };
          //added check for req> 1000
          if(this.selectedReqIds && this.selectedReqIds.length > 1000 && !this.isImportToolarge){
              this.records = this.selectedReqIds.length;
              jQuery("#confirmation-modal-import-all").modal("show");
          }else{
            this.selectedReqIds = [];
            this.jiraSearchCmp.importRequirementsFromJIRA(requestObj, this.releaseId, 'requirement', false);
            jQuery('.modal-backdrop').remove();
          }

        } else if (this.jiraSearchCmp.paginationOptions.totalCount > 1000){
          this.records = this.jiraSearchCmp.paginationOptions.totalCount;
          jQuery("#confirmation-modal-import-all").modal("show");
        } else {
          this.importAll();
        }

    }

    importAll() {

      if (!this.importDesc.JQL) {
        jQuery("#jql-empty-popup").modal("show");
      } else if(this.selectedReqIds && this.selectedReqIds.length > 1000 && !this.isImportToolarge){
        this.isImportToolarge = true;
        this.importRequirementsFromJIRA(false);

      } else {
        jQuery("#confirmation-modal-import-all").modal("hide");

        let requestObj = {
          "projectId" : this.zephyrStore.getState().project.id,
          "importExternalRequirementDTO": {
            "projectId": this.zephyrStore.getState().project.id,
            "topFolderName": this.topFolderName,
            'subFolder' : this.foldername
          },
          "searchStringDTO": {
            "searchString": this.importDesc.JQL
          },
          "filterSearch": this.isFilter,
          "filterName" : this.isFilter ? this.importDesc.filterName : ''
        };
        if (this.jiraSearchCmp.paginationOptions.totalCount > 1000 && !this.isImportToolarge){
              this.isImportToolarge = true;
              this.importRequirementsFromJIRA(true);
        }else{
          this.selectedReqIds = [];
          this.jiraSearchCmp.importRequirementsFromJIRA(requestObj, this.releaseId, 'requirement', true);
        }


      }

    }

    onGridSelection(ev) {
        this.selectedReqIds = ev;
    }

    isImportDisabled() {
        return !(Array.isArray(this.selectedReqIds) && this.selectedReqIds.length);
    }

    isImportAllDisabled() {
      return this.jiraSearchCmp ? this.jiraSearchCmp.gridRows.length > 0 : false;
    }

    getSearchCriteria(searchObj) {
      this.importDesc = searchObj;

      if (typeof searchObj.JQL == "string") {
        this.isFilter = false;
        this.importDesc.JQL = searchObj.JQL;
      } else if(searchObj.filter) {
        this.isFilter = true;
        this.importDesc.JQL = searchObj.id;
        this.importDesc.filterName = searchObj.filter;
      }

      if (searchObj.reset) {
        this.importDesc.JQL = null;
      }

    }
    showDeleteUserPopup() {
        this.updateDtUserCmp.showDeleteUserPopup();
    }
}
