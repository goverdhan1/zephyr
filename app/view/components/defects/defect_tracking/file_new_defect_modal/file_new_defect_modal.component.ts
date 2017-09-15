import {Component, AfterViewInit, ViewChild, Input, Output, EventEmitter, OnChanges, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {DefectsAction} from '../../../../../actions/defects.action';
import {I18N_MESSAGES} from '../../../../../utils/messages/messages.en';
import {FileNewDefectComponent} from '../../defect_link/create_defect/file_new_defect.component';

declare var jQuery: any, _;

@Component({
    selector: 'file-new-defect-modal',
    templateUrl: 'file_new_defect_modal.html',
    viewProviders: [DefectsAction],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class FileNewDefectModalComponent implements AfterViewInit, OnChanges, OnDestroy {
    @ViewChild(FileNewDefectComponent) fndFormCmp: FileNewDefectComponent;
    @Input() parentIssue;
    @Input() releaseId;
    @Output() onDefectUpdate: EventEmitter<any> = new EventEmitter();
    selectedProjectName;
    selectedIssueTypeName;
    isProjectIssueSelected = false;
    issueMetaData;
    projects;
    issueTypes = [];
    selectedDefect;
    unsubscribe;
    parentIssueKey;
    changeDetectionDebounce;
    i18nMessages = I18N_MESSAGES;
    private zephyrStore;

    constructor(private _defectsAction: DefectsAction, private cdr: ChangeDetectorRef) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this.zephyrStore.subscribe(() => {
            this.onStateChange();
        });
    }
    ngOnChanges(changedKey) {
        if(changedKey['parentIssue'] && changedKey['parentIssue'].previousValue !== changedKey['parentIssue'].currentValue &&
            changedKey['parentIssue'].currentValue) {
            jQuery('#file-new-defect-modal').modal();
        }
        this.triggerChange();
    }
    ngOnDestroy() {
        this.parentIssue = null;
        this.unsubscribe();
    }
    ngAfterViewInit() {
        jQuery('#file-new-defect-modal').on('show.bs.modal', ev => {
            if(ev.target === ev.currentTarget) {
                if(this.parentIssue) {
                    this.selectedProjectName = this.parentIssue.product;
                    this.getIssueTypes(this.selectedProjectName);
                } else {
                    this.getJIRAProjects();
                }
            }
        });
        jQuery('#file-new-defect-modal').on('hidden.bs.modal', ev => {
            if(!this.selectedDefect) {
               this.resetUpdateModal();
           }
        });
    }
    onStateChange() {
        let linkNewDefectState = this.zephyrStore.getState().linkNewDefect;
        this.projects = this.getZeeSelectItem(linkNewDefectState.jiraProjects);
        let issueTypes = linkNewDefectState.issueTypes;
        if(this.parentIssue) {
            issueTypes = issueTypes.filter(issueType => issueType.subtask);
        } else {
            issueTypes = issueTypes.filter(issueType => !issueType.subtask);
        }
        issueTypes = _.sortBy(issueTypes, 'name');
        this.issueTypes = this.getZeeSelectItem(issueTypes);
        if(linkNewDefectState.event === 'FETCH_ISSUE_METADATA_FOR_CREATE_SUCCESS') {
            this.zephyrStore.dispatch(this._defectsAction.clearLinkNewDefectEvent());
            this.issueMetaData = linkNewDefectState.issueMetaData;
            if(Object.keys(this.issueMetaData).length) {
                this.isProjectIssueSelected = true;
            } else {
                this.zephyrStore.dispatch(this._defectsAction.dispatchError(this.i18nMessages['zephyr.defect.no.fields']));
            }
        }
        if(linkNewDefectState.event === 'CREATE_DEFECT_FOR_TRACKING_PAGE_SUCCESS') {
            this.zephyrStore.dispatch(this._defectsAction.clearLinkNewDefectEvent());
            let defectAlternateId = linkNewDefectState.defect && linkNewDefectState.defect.alternateId;
            this.zephyrStore.dispatch(this._defectsAction.onSuccess('Defect with id ' + defectAlternateId + ' created successfully'));
            jQuery('#file-new-defect-modal').modal('hide');
            this.selectedDefect = linkNewDefectState.defect;
            this.parentIssueKey = (this.selectedDefect.parentKey) ? this.selectedDefect.parentKey : null;
            setTimeout(() => {
                jQuery('#defect-advanced-detail-modal-'+ this.selectedDefect.id).modal();
                jQuery('div#defect-advanced-detail-modal-' + this.selectedDefect.id).on('hidden.bs.modal', (e) => {
                    this.resetUpdateModal();
                });
                this.triggerChange();
            }, 501);
        }
        if(linkNewDefectState.event === 'GET_JIRA_PROJECTS_FOR_FILE_DEFECT') {
            this.zephyrStore.dispatch(this._defectsAction.clearLinkNewDefectEvent());
            this.checkMappedProject();
        }
        let defectDetailsState = this.zephyrStore.getState().defectDetails;
        if(defectDetailsState.event === 'UPDATE_DEFECT_GRID_UPDATE_SUCCESS') {
            this.zephyrStore.dispatch(this._defectsAction.clearDefectDetailsEvent());
            this.zephyrStore.dispatch(this._defectsAction.onSuccess('Defect with id ' + defectDetailsState.updatedDefect.alternateId + ' updated successfully'));
            this.onDefectUpdate.emit(defectDetailsState.updatedDefect);
            jQuery('#defect-advanced-detail-modal-'+ defectDetailsState.updatedDefect.id).modal('hide');
            jQuery('#zee-defect-update-status-resolution').modal('hide');
        }
        this.triggerChange();
    }
    checkMappedProject() {
        let mappedProjectName;
        let releases = this.zephyrStore.getState().release.releases;
        let currentReleaseId = _.find(releases, {id: parseInt(this.releaseId, 10)});
        if(currentReleaseId && currentReleaseId.externalSystem) {
            mappedProjectName = currentReleaseId.externalSystem;
        } else {
            //get selected project external system
            let currentProject = this.zephyrStore.getState().project;
            if(currentProject && currentProject.externalSystem) {
                mappedProjectName = currentProject.externalSystem;
            }
        }
        //set project to external system
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
    resetUpdateModal() {
        this.selectedProjectName = null;
        this.selectedIssueTypeName = null;
        this.issueMetaData = null;
        this.parentIssue = null;
        this.issueTypes = [];
        this.parentIssueKey = null;
        this.isProjectIssueSelected = false;
        this.selectedDefect = null;
    }
    onProjectIssueTypeSelection() {
        if(!this.selectedIssueTypeName) {
            this.zephyrStore.dispatch(this._defectsAction.dispatchError(this.i18nMessages['zephyr.defect.issuetype.select']));
            return;
        }
        let params = {
            project: this.selectedProjectName,
            issueType: this.selectedIssueTypeName
        };
        this.zephyrStore.dispatch(this._defectsAction.getIssueMetadataForCreate(params));
    }
    backToProjectSelection() {
        this.isProjectIssueSelected = false;
        this.selectedIssueTypeName = null;
        this.checkMappedProject();
    }
    onSetProject(project) {
        this.selectedProjectName = project.text;
        this.getIssueTypes(this.selectedProjectName);
    }
    onSetIssueType(issueType) {
        this.selectedIssueTypeName = issueType.text;
    }
    getJIRAProjects() {
        this.zephyrStore.dispatch(this._defectsAction.getJIRAProjectsForFileDefect({useAdmin: false}));
    }
    getIssueTypes(projectName) {
        this.zephyrStore.dispatch(this._defectsAction.getIssueTypes(projectName));
    }
    getZeeSelectItem(value) {
        if (Array.isArray(value) && value.length) {
            return value.map(data => (_.isObject(data) ? {
                id: data.id || data.key || data.text || data.value || '',
                text: data.text || data.value || data.name || '',
            } : {
                id: data,
                text: data
            }));
        }
        return [];
    }
    onDefectCreation() {
        let formValue = this.fndFormCmp.cdFormCmp.getFormValue();
        this.zephyrStore.dispatch(this._defectsAction.createDefectOnTrackingPage(formValue));
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
