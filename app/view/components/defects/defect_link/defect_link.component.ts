import {Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import {DefectsAction} from '../../../../actions/defects.action';
import {GridAction} from '../../../../actions/grid.action';
import {UpdateDefectUserComponent} from '../defect_tracking/update_user/update_defect_user.component';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {DEFECT_KEY_MAPPING} from './create_defect/create_defect.constants';
import {FileNewDefectComponent} from './create_defect/file_new_defect.component';

declare var jQuery: any, _;

@Component({
    selector: 'zee-defect-link',
    templateUrl: 'defect_link.html',
    viewProviders: [DefectsAction, GridAction]
})

export class DefectLinkComponent implements AfterViewInit, OnDestroy {
    @ViewChild(FileNewDefectComponent) fndFormCmp: FileNewDefectComponent;
    @ViewChild(UpdateDefectUserComponent) updateDtUserCmp: UpdateDefectUserComponent;
    @Input() testcaseId;
    @Input() scheduleId;
    @Input() releaseId;
    @Output() onMapDefectsSchedule: EventEmitter<any> = new EventEmitter();
    @Output() triggerChangeDetection: EventEmitter<any> = new EventEmitter();
    fieldOptions = {
      id: 'linkNew',
      header: 'Create New Defect',
      type: 'linkNew'
    };
    showFileNewDefect = false;
    isProjectIssueSelected = false;
    isProjectSelectionModal = false;
    projects = [];
    issueTypes = [];
    createdDefect;
    issueMetaData;
    selectedProject;
    selectedProjectName;
    selectedIssueType;
    selectedIssueTypeName;
    isUserUpdateRequired;
    isResetDTUser;
    parentIssue;
    parentIssueKey;
    unsubscribe;
    i18nMessages = I18N_MESSAGES;
    private _zephyrStore;

    constructor(public router: Router, private _defectsAction: DefectsAction) {
        this._zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this._zephyrStore.subscribe((x) => {
            this.onStateChange();
        });
    }
    ngAfterViewInit() {
        jQuery('#defect-link-modal').on('hidden.bs.modal', (ev) => {
            if(ev.target === ev.currentTarget) {
                this.isUserUpdateRequired = null;
                this.dismissModal();
                this._zephyrStore.dispatch(this._defectsAction.resetDefectsSearch());
                this._zephyrStore.dispatch(this._defectsAction.resetCurrentlyLinkedDefects());
            }
        });
        jQuery('#defect-link-modal').on('show.bs.modal', (ev) => {
            if(ev.target === ev.currentTarget) {
                this.checkDefectUserState();
            }
        });
    }
    ngOnDestroy() {
        this.parentIssue = null;
        this.parentIssueKey = null;
        this.unsubscribe();
    }
    checkDefectUserState() {
        this._zephyrStore.dispatch(this._defectsAction.getDefectUser());
    }
    getJIRAProjects() {
        this._zephyrStore.dispatch(this._defectsAction.getJIRAProjects({useAdmin: false}));
    }
    getIssueTypes(projectName) {
        this._zephyrStore.dispatch(this._defectsAction.getIssueTypes(projectName));
    }
    openFileNewDefectDialog() {
      this.showFileNewDefect = true;
      this.isProjectSelectionModal = true;
      this.getJIRAProjects();
    }
    onStateChange() {
        let linkNewDefectState = this._zephyrStore.getState().linkNewDefect;
        let defectDetailsState = this._zephyrStore.getState().defectDetails;
        this.projects = this.getZeeSelectItem(linkNewDefectState.jiraProjects);
        let issueTypes = linkNewDefectState.issueTypes;
        if(this.parentIssue) {
            issueTypes = issueTypes.filter((issueType) => {
                return issueType.subtask;
            });
        } else {
            issueTypes = issueTypes.filter((issueType) => {
                return !issueType.subtask;
            });
        }
        issueTypes = _.sortBy(issueTypes, 'name');
        this.issueTypes = this.getZeeSelectItem(issueTypes);
        this.manageReducerEvents(linkNewDefectState, defectDetailsState);
    }
    manageReducerEvents(linkNewDefectState, defectDetailsState) {
        if(linkNewDefectState.event === 'FETCH_ISSUE_METADATA_SUCCESS') {
            this._zephyrStore.dispatch(this._defectsAction.clearLinkNewDefectEvent());
            this.issueMetaData = linkNewDefectState.issueMetaData;
            if(Object.keys(this.issueMetaData).length) {
                this.isProjectIssueSelected = true;
                this.isProjectSelectionModal = false;
            } else {
                this._zephyrStore.dispatch(this._defectsAction.dispatchError(this.i18nMessages['zephyr.defect.no.fields']));
            }
        } else if(linkNewDefectState.event === 'CREATE_DEFECT_SUCCESS') {
            this.backToDefectLink();
            this.createdDefect = linkNewDefectState.defect;
            this.parentIssueKey = (this.createdDefect.parentKey) ? this.createdDefect.parentKey : null;
            setTimeout(() => {
                jQuery('#defect-advanced-detail-modal-'+ this.createdDefect.id).modal();
                jQuery('div#defect-advanced-detail-modal-' + this.createdDefect.id).on('hidden.bs.modal', (e) => {
                    this.selectedProject = null;
                    this.selectedIssueType = null;
                    this.selectedIssueTypeName = null;
                    this.showFileNewDefect = false;
                    this.isProjectIssueSelected = false;
                    this.isProjectSelectionModal = false;
                    this.parentIssue = null;
                    this.parentIssueKey = null;
                });
            }, 100);
        } else if(linkNewDefectState.event === 'MAP_DEFECT_SCHEDULE_SUCCESS') {
            this._zephyrStore.dispatch(this._defectsAction.clearLinkNewDefectEvent());
            this._zephyrStore.dispatch(this._defectsAction.getCurrentlyLinkedDefects(this.scheduleId));
            this._zephyrStore.dispatch(this._defectsAction.dispatchSuccess(this.i18nMessages['zephyr.defect.linked.success']));
            this.onMapDefectsSchedule.emit();
        } else if(linkNewDefectState.event === 'FETCH_JIRA_PROJECTS_SUCCESS') {
            //clear event
            this._zephyrStore.dispatch(this._defectsAction.clearLinkNewDefectEvent());
            //select mapped project in project dropdown
            //get selected release external system
            this.checkMappedProject();
        } else if(defectDetailsState.event === 'UPDATE_DEFECT_GRID_UPDATE_SUCCESS') {
            this._zephyrStore.dispatch(this._defectsAction.clearDefectDetailsEvent());
            this._zephyrStore.dispatch(this._defectsAction.updateCurrentlyLinkedGrid(defectDetailsState.updatedDefect));
            this._zephyrStore.dispatch(this._defectsAction.onSuccess('Defect with id ' + defectDetailsState.updatedDefect.alternateId
                + ' updated successfully'));
            jQuery('#defect-advanced-detail-modal-'+ defectDetailsState.updatedDefect.id).modal('hide');
            this.createdDefect = null;
        }
    }
    checkMappedProject() {
        let mappedProjectName;
        let releases = this._zephyrStore.getState().release.releases;
        let currentReleaseId = _.find(releases, {id: parseInt(this.releaseId, 10)});
        if(currentReleaseId && currentReleaseId.externalSystem) {
            mappedProjectName = currentReleaseId.externalSystem;
        } else {
            //get selected project external system
            let currentProject = this._zephyrStore.getState().project;
            if(currentProject && currentProject.externalSystem) {
                mappedProjectName = currentProject.externalSystem;
            }
        }
        // set project to external system
        if(mappedProjectName) {
            setTimeout(() => {
                jQuery('#fileNewDefectProject').val(mappedProjectName);
                jQuery('#fileNewDefectProject').trigger('change');
                let selectedProject = _.find(this.projects, {text: mappedProjectName});
                if(selectedProject && this.fndFormCmp) {
                    this.fndFormCmp.selectedProject = mappedProjectName;
                    this.onSetProject(selectedProject);
                }
            }, 200);
        }
    }
    backToDefectLink() {
      this.isProjectIssueSelected = false;
      this.isProjectSelectionModal = false;
      this.showFileNewDefect = false;
      this.parentIssue = null;
      this.parentIssueKey = null;
    }
    backToProjectSelection() {
        //this.getJIRAProjects();
        this.isProjectIssueSelected = false;
        this.selectedIssueType = null;
        this.selectedIssueTypeName = null;
        this.showFileNewDefect = true;
        this.isProjectSelectionModal = true;
        this.checkMappedProject();
    }
    onDefectCreation() {
        let formValue = this.fndFormCmp && this.fndFormCmp.cdFormCmp.getFormValue();
        this._zephyrStore.dispatch(this._defectsAction.createDefect(formValue, this.testcaseId, this.scheduleId));
    }
    onSetProject(project) {
        this.selectedProject = project;
        this.selectedProjectName = project.text;
        if(this.selectedProjectName) {
            this.getIssueTypes(this.selectedProjectName);
        }
    }
    onSetIssueType(issueType) {
        this.selectedIssueType = issueType;
        this.selectedIssueTypeName = issueType.text;
    }
    onProjectIssueTypeSelection() {
        if(!this.selectedIssueTypeName) {
            this._zephyrStore.dispatch(this._defectsAction.dispatchError(this.i18nMessages['zephyr.defect.issuetype.select']));
            return;
        }
        let params = {
            project: this.selectedProjectName,
            issueType: this.selectedIssueTypeName
        };
        this._zephyrStore.dispatch(this._defectsAction.getIssueMetadata(params));
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
    onUserUpdate() {
        this.updateDtUserCmp.onUserUpdate();
    }
    dismissModal() {
        this.selectedProject = null;
        this.selectedIssueType = null;
        this.selectedIssueTypeName = null;
        this.showFileNewDefect = false;
        this.isProjectIssueSelected = false;
        this.isProjectSelectionModal = false;
        this.parentIssue = null;
        this.parentIssueKey = null;
        jQuery('#defect-link-modal').modal('hide');
    }
    resetDTUserButtonClick() {
        this.isResetDTUser = true;
        this.isUserUpdateRequired = 'true';
    }
    onResetUserCompletion() {
        this.isResetDTUser = false;
        this.isUserUpdateRequired = 'false';
    }
    onResetUser() {
        this.updateDtUserCmp.userCreationType = 'UPDATE';
        this.updateDtUserCmp.onUserUpdate();
    }
    deleteUser() {
        jQuery('#defect-delete-user-modal').modal('hide');
        this.updateDtUserCmp.deleteUser();
    }
    showDeleteUserPopup() {
        this.updateDtUserCmp.showDeleteUserPopup();
    }
    onDeleteUser() {
        //after delete
        this.isResetDTUser = false;
        this.isUserUpdateRequired = 'false';
        this.dismissModal();
    }
    getZeeSelectItem(value) {
        return value && value.length && value.map(data => (_.isObject(data) ? {
            id: data.id || data.key || data.text || data.value || '',
            text: data.text || data.value || data.name || '',
        } : {
            id: data,
            text: data
        }));
    }
    onCreateSubtask(parentIssue) {
        this.parentIssue = parentIssue;
        this.showFileNewDefect = true;
        this.isProjectSelectionModal = true;
        this.selectedProjectName = this.parentIssue.product;
        this.getIssueTypes(this.selectedProjectName);
    }
    onDefAdvModalDismiss() {
        jQuery('#defect-advanced-detail-modal-'+ this.createdDefect.id).modal('hide');
        this.createdDefect = null;
    }
    refreshMappedDefects() {
        this.onMapDefectsSchedule.emit();
    }
    emitChangeDetection() {
        this.triggerChangeDetection.emit();
    }
}
