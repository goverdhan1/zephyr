import {Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {DefectsAction} from '../../../../../../actions/defects.action';
import {ZephyrStore} from '../../../../../../store/zephyr.store';

// Constants
import {I18N_MESSAGES} from '../../../../../../utils/messages/messages.en';
import * as CdUserSelect from '../../../defect_link/create_defect/fields/cd_user_select.util';


declare var jQuery: any, _;

@Component({
    selector: 'defects-basic-search',
    templateUrl: 'defects_basic_search.html'
})

export class DefectsBasicSearchComponent implements AfterViewInit, OnDestroy, OnChanges {
    @Input() basicSearchURLParams: any = {};
    @Output() onDefectBasicSearch: EventEmitter<any> = new EventEmitter();
    @Output() selectFilter: EventEmitter<any> = new EventEmitter();
    projects = [];
    issueTypesMeta = [];
    issueTypes = [];
    issueStatus = [];
    projectVersions = [];
    issuePriority = [];
    isResetDTUser;
    unsubscribe;
    validations;
    selectedProject = '';
    selectedIssueType = '';
    selectedStatus = '';
    selectedVersion = '';
    selectedPriority = '';
    filedBy = '';
    assignedTo = '';
    metaDataByproject = [];
    urlSearchCount = 0;
    // basicSearch : FormGroup;
    i18nMessages = I18N_MESSAGES;
    private _zephyrStore;

    constructor( private fb: FormBuilder,private _defectsAction: DefectsAction) {
        this._zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this._zephyrStore.subscribe(() => {
            this.onStateChange();
        });
    }

    ngOnChanges(key) {
        try {
            this.selectedProject = key.basicSearchURLParams.currentValue.project;
            this.selectedIssueType = key.basicSearchURLParams.currentValue.selectedIssueType;
            this.selectedStatus = key.basicSearchURLParams.currentValue.selectedStatus;
            this.selectedVersion = key.basicSearchURLParams.currentValue.selectedVersion;
            this.selectedPriority = key.basicSearchURLParams.currentValue.selectedPriority;
            this.filedBy = key.basicSearchURLParams.currentValue.filedBy;
            this.assignedTo = key.basicSearchURLParams.currentValue.assignedTo;

        } catch (err) {
            console.log(err);
        }
    }
    ngAfterViewInit() {
        this.getJIRAProjects();
        this.issueStatus = [];

    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    onStateChange() {
        let state = this._zephyrStore.getState();
        let defectsSearchFilters = state.linkNewDefect;
        let defectsSearchState = state.defectsSearch;

        this.projects = this.getZeeSelectItem(defectsSearchFilters.jiraProjects);
        if(defectsSearchState.event === 'DEFECT_LIGHT_METADATA_BY_PROJECT') {
            this._zephyrStore.dispatch(this._defectsAction.clearDefectsSearchEvent());

            this.metaDataByproject = defectsSearchState.metaDataByproject;
            this.metaDataByproject['IssueType'] = this.metaDataByproject['IssueType'].concat(this.metaDataByproject['SubTask']);
            this.issueTypes = this.getZeeSelectItem(this.metaDataByproject['IssueType']);
            this.issueTypesMeta = this.metaDataByproject['IssueType'];
            this.projectVersions = this.getZeeSelectItem(this.metaDataByproject['Version']);
            this.issuePriority = this.getZeeSelectItem(this.metaDataByproject['Priority']);

            let issueTypeObj = _.find(this.issueTypesMeta, {key: this.selectedIssueType && this.selectedIssueType.toString()});
            let statuses = issueTypeObj && issueTypeObj.list;
            this.issueStatus = this.getZeeSelectItem(statuses);
        }
    }
    onAssigneeInit(element) {
        if (this.basicSearchURLParams.assignedTo) {
            let selectData = element.data('select2');
            element.select2('open');
            let searchEl =  selectData.dropdown.$search || selectData.selection.$search;
            this.urlSearchCount++;
            searchEl.val(this.basicSearchURLParams.assignedTo).trigger('input');
        }
    }
    onReporterInit(element) {
        if (this.basicSearchURLParams.filedBy) {
            let selectData = element.data('select2');
            element.select2('open');
            let searchEl =  selectData.dropdown.$search || selectData.selection.$search;
            this.urlSearchCount++;
            searchEl.val(this.basicSearchURLParams.filedBy).trigger('input');
        }
    }
    onUserResult(event) {
        if (this.urlSearchCount) {
            this.urlSearchCount--;
            try {
                event.element.select2('trigger', 'select', {
                    data: event.data.results[0] || {}
                });
            } catch (err) {
                console.log('error in setting field value', err);
            }
        }
    }
    getJIRAProjects() {
        this._zephyrStore.dispatch(this._defectsAction.getJIRAProjects({useAdmin: false}));
    }

    selectValue() {
        this.selectFilter.emit({
            project: this.selectedProject || '',
            selectedIssueType: this.selectedIssueType || '',
            selectedStatus: this.selectedStatus || '',
            selectedVersion: this.selectedVersion || '',
            selectedPriority: this.selectedPriority || '',
            filedBy: this.filedBy || '',
            assignedTo: this.assignedTo || ''
        });
    }
    setProject(value) {
        this.resetFields();
        this.resetSelectedFields();
        this.selectedProject = value.id;
        this.selectValue();
    }
    unSelectProject() {
        this.selectedProject = '';
        this.resetFields();
        this.issueTypesMeta = [];
        this.metaDataByproject = [];
        this.selectValue();
    }
    setIssueType(value) {
        this.issueStatus = [];
        this.selectedIssueType = value.id;
        let issueTypeObj = _.find(this.issueTypesMeta, {key: value.id && value.id.toString()});
        let statuses = issueTypeObj && issueTypeObj.list;
        this.issueStatus = this.getZeeSelectItem(statuses);
        this.selectValue();
    }
    unSelectIssueType() {
        this.selectedIssueType = '';
        this.issueStatus = [];
        this.selectValue();
    }
    setStatus(value) {
        this.selectedStatus = value.id;
        this.selectValue();
    }
    unSelectStatus() {
        this.selectedStatus = '';
        this.selectValue();
    }
    setVersion(value) {
        this.selectedVersion = value.id;
        this.selectValue();
    }
    unSelectVersion(value) {
        this.selectedVersion = '';
        this.selectValue();
    }
    setPriority(value) {
        this.selectedPriority = value.id;
        this.selectValue();
    }
    unSelectPriority(value) {
        this.selectedPriority = '';
        this.selectValue();
    }
    setFiledBy(value) {
        this.filedBy = value.id;
        this.selectValue();
    }
    unSelectFiledBy(value) {
        this.filedBy = '';
        this.selectValue();
    }
    setAssignedTo(value) {
        this.assignedTo = value.id;
        this.selectValue();
    }
    unSelectAssignedTo(value) {
        this.assignedTo = '';
        this.selectValue();
    }
    getZeeSelectItem(value) {
        return (value || []).map(data => (_.isObject(data) ? {
            id: data.id || data.key || data.text || data.value || '',
            text: data.text || data.value || data.name || '',
        } : {
            id: data,
            text: data
        }));
    }

    getSelect2Options(field) {
        if(field === 'user') {
            let selectOptions = _.cloneDeep(CdUserSelect.USER_SELECT_OPTIONS);
            selectOptions['ajax']['queryParams'] = null;
            return selectOptions;
        }
        return {};
    }
    resetFields() {
        this.issueTypes = [];
        this.issueStatus = [];
        this.projectVersions = [];
        this.issuePriority = [];
    }
    resetSelectedFields() {
        this.selectedProject = '';
        this.selectedIssueType = '';
        this.selectedStatus = '';
        this.selectedVersion = '';
        this.selectedPriority = '';
        this.filedBy = '';
        this.assignedTo = '';
    }
    defectBasicSearch() {
        let params = {
            project: this.selectedProject,
            issueType: this.selectedIssueType,
            status: this.selectedStatus,
            filedBy: this.filedBy,
            version: this.selectedVersion,
            priority: this. selectedPriority,
            assignee: this.assignedTo
        };
        if(!this.selectedProject && !this.filedBy && !this.assignedTo) {
            this.onDefectBasicSearch.emit(null);
        } else {
            this.onDefectBasicSearch.emit(params);
        }
    }
}
