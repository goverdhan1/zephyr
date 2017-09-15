import {Component, AfterViewInit, Input, Output, EventEmitter, OnChanges, OnDestroy} from '@angular/core';
import {ZephyrStore} from '../../../../../../store/zephyr.store';
import {DefectsAction} from '../../../../../../actions/defects.action';

// Constants
import {I18N_MESSAGES} from '../../../../../../utils/messages/messages.en';
import * as CdUserSelect from '../../../defect_link/create_defect/fields/cd_user_select.util';

declare var jQuery: any, _;

@Component({
    selector: 'defect-basic-detail',
    templateUrl: 'defect_basic_detail.html',
    viewProviders: [DefectsAction]
})

export class DefectBasicDetailComponent implements AfterViewInit, OnChanges, OnDestroy {
    @Input() defect;
    @Input() defectSystemUrl;
    @Input() issueMetaData;
    @Input() currentRecord: number;
	@Input() totalRecords: number;
    @Output() onRecordChange: EventEmitter<any> = new EventEmitter();
    @Output() onFetchIssueMetaData: EventEmitter<any> = new EventEmitter();
    metaDataByproject = {};
    selectedOptions = {};
    isShowUpdateDefectModal = false;
    defectAllOptions = {};
    comments = [];
    selectedStatus;
    selectedResolution;
    unsubscribe;
    i18nMessages = I18N_MESSAGES;
    private zephyrStore;

    constructor(private _defectsAction: DefectsAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this.zephyrStore.subscribe(() => {
            this.onStateChange();
        });
    }
    ngAfterViewInit() {
        jQuery('#zee-defect-update-status-resolution').on('hidden.bs.modal', (ev) => {
            if(ev.target === ev.currentTarget) {
                this.unSelectStatus();
                jQuery('#defect-status-detail-view').val(null);
                jQuery('#defect-status-detail-view').trigger('change');
                this.unSelectResolution();
                jQuery('#defect-resolution-detail-view').val(null);
                jQuery('#defect-resolution-detail-view').trigger('change');
            }
        });
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    ngOnChanges(changedKey) {
        if(changedKey['defect'] && changedKey['defect'].previousValue !=
            changedKey['defect'] && changedKey['defect'].currentValue) {
            this.getMetaDataByproject();
        }
        if(changedKey['issueMetaData'] && changedKey['issueMetaData'].previousValue !=
            changedKey['issueMetaData'] && changedKey['issueMetaData'].currentValue) {
                if(this.isShowUpdateDefectModal) {
                    this.isShowUpdateDefectModal = false;
                    this.showUpdateDefectModal();
                }
        }
    }
    onStateChange() {
        let defectDetailsState = this.zephyrStore.getState().defectDetails;
        let defectsSearchState = this.zephyrStore.getState().defectsSearch;
        if(defectsSearchState.event === 'DEFECT_UPDATE_LIGHT_METADATA_BY_PROJECT') {
            this.zephyrStore.dispatch(this._defectsAction.clearDefectsSearchEvent());
            this.metaDataByproject = defectsSearchState.metaDataByproject;
            this.parseByLiteMetadata();
        }
    }
    parseByLiteMetadata() {
        let metaDataByproject = this.metaDataByproject;

        // setting all options
        let defectAllOptions = {};
        defectAllOptions['components'] = this.getZeeSelectItem(metaDataByproject['Component']);
        defectAllOptions['versions'] = this.getZeeSelectItem(metaDataByproject['Version']);
        defectAllOptions['fixVersions'] = this.getZeeSelectItem(metaDataByproject['FixVersions']);
        defectAllOptions['priority'] = this.getZeeSelectItem(metaDataByproject['Priority']);
        let statusObj;
        if(this.defect && this.defect.isSubtask) {
            statusObj = _.find(metaDataByproject['SubTask'], {key: this.defect.issueType});
        } else {
            statusObj = _.find(metaDataByproject['IssueType'], {key: this.defect.issueType});
        }
        let statuses = statusObj && statusObj.list || [];
        defectAllOptions['status'] = this.getZeeSelectItem(statuses);
        defectAllOptions['resolution'] = this.getZeeSelectItem(metaDataByproject['Resolution']);
        defectAllOptions['assigned_to'] = this.getZeeSelectItem(metaDataByproject['Assigned To']);
        defectAllOptions['environment'] = this.getZeeSelectItem(metaDataByproject['Environment']);
        this.defectAllOptions = defectAllOptions;
        this.parseSelectedDefect();
        // select grid row - ZEPHYR-14182
        let updatedDefectId = this.defect.id;
        let gridRows = this.zephyrStore.getState().defectDetails.grid.rows;
        let index = _.findIndex(gridRows, {id: updatedDefectId});
        let $rowList = jQuery('.defect-details-grid .flex-bar');
        if(index > -1 && $rowList.length) {
            $rowList.eq(index).addClass('selected-row');
        }
    }
    parseSelectedDefect() {
        let selectedOptions = {};
        let defectObj = this.defect;
        selectedOptions['components'] = defectObj.multiComponents;
        selectedOptions['componentLabels'] = Object.keys(defectObj.multiComponentsMap).map((key) => {
            return defectObj.multiComponentsMap[key];
        });
        selectedOptions['versions'] = defectObj.multiVersions;
        selectedOptions['versionLabels'] = Object.keys(defectObj.multiVersionsMap).map((key) => {
            return defectObj.multiVersionsMap[key];
        });
        selectedOptions['fixVersions'] = defectObj.fixVersions;
        selectedOptions['fixVersionLabels'] = Object.keys(defectObj.fixVersionsMap).map((key) => {
            return defectObj.fixVersionsMap[key];
        });
        selectedOptions['priority'] = defectObj.priority || '';
        selectedOptions['status'] = defectObj.status || '';
        selectedOptions['resolution'] = defectObj.resolution || '';
        selectedOptions['assigned_to'] = defectObj.assigned_to || '';
        selectedOptions['environment'] = defectObj.environment || '';
        this.comments = defectObj.defectComments;
        this.selectedOptions = selectedOptions;
    }
    getMetaDataByproject() {
        let defectsSearchState = this.zephyrStore.getState().defectsSearch;
        this.metaDataByproject = defectsSearchState.metaDataByproject;
        this.fetchMetaDataByproject();
        //Performance can be improved by checking the store for same issuetype and making the call - Sanjeev
        // if(!Object.keys(this.metaDataByproject).length) {
        //     this.fetchMetaDataByproject();
        // } else {
        //     this.parseByLiteMetadata();
        // }
    }
    fetchMetaDataByproject() {
        this.zephyrStore.dispatch(this._defectsAction.updateDefectLightMetaData(this.defect.product));
    }
    fetchIssueMetadata() {
        this.onFetchIssueMetaData.emit();
    }
    showUpdateDefectModal() {
        if(!this.issueMetaData) {
            this.isShowUpdateDefectModal = true;
            this.fetchIssueMetadata();
        } else {
            setTimeout(() => {
                jQuery('#defect-advanced-detail-modal-'+ this.defect.id).modal();
            }, 100);
        }
    }
    updateMultiFields(value, property, label, field) {
        this.selectedOptions[label] = this.selectedOptions[field].map((key) => {
            return _.find(this.defectAllOptions[field], {id: key}).text;
        });
        this.defect[property] = value.split(',');
        if(!value) {
            this.defect[property] = [];
        }
    }
    updateDefect(value, property, type) {
        if(property === 'multiComponents') {
            this.updateMultiFields(value, property, 'componentLabels', 'components');
        }
        if(property === 'multiVersions') {
            this.updateMultiFields(value, property, 'versionLabels', 'versions');
        }
        if(property === 'fixVersions') {
            this.updateMultiFields(value, property, 'fixVersionLabels', 'fixVersions');
        }
        if(property === 'priority') {
            let selectPriority = this.defectAllOptions[property].filter(item => String(item.id) === String(value))[0];
            if (selectPriority) {
                let selectValue = selectPriority.text;
                this.selectedOptions[property] = selectValue;
                this.defect[property] = selectValue;
            }
        }
        if(property === 'environment' || property === 'shortDesc') {
            this.selectedOptions[property] = value;
            this.defect[property] = value;
        }
        if(property === 'assigned_to') {
            this.selectedOptions[property] = value;
            this.defect[property] = value;
        }
        this.zephyrStore.dispatch(this._defectsAction.updateDefect(this.defect, this.defect.id, [property]));
    }
    getZeeSelectItem(value) {
        return value && value.map(data => (_.isObject(data) ? {
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
            selectOptions['ajax']['queryParams'] = {
                projectkey: this.defect.product
            };
            return selectOptions;
        }
        return {};
    }
    recordChanged($event) {
        this.onRecordChange.emit($event);
    }
    showStatusResolutionUpdateModal() {
        jQuery('#zee-defect-update-status-resolution').modal();
    }
    saveStatus(selectedOption) {
        this.selectedStatus = selectedOption.text;
    }
    unSelectStatus() {
        this.selectedStatus = null;
    }
    saveResolution(selectedOption) {
        this.selectedResolution = selectedOption.text;
    }
    unSelectResolution() {
        this.selectedResolution = null;
    }
    updateStatusResolution() {
        if(!this.selectedStatus && !this.selectedResolution) {
            this.zephyrStore.dispatch(this._defectsAction.onInfo('Please select status and/or resolution'));
            return;
        }
        let defectObj = _.cloneDeep(this.defect);
        defectObj.status = this.selectedStatus;
        defectObj.resolution = this.selectedResolution;
        this.zephyrStore.dispatch(this._defectsAction.updateDefect(defectObj, defectObj.id, ['status', 'resolution']));
    }
    updateComment(val) {
        let defectObj = _.cloneDeep(this.defect);
        defectObj.newComment = val;
        this.zephyrStore.dispatch(this._defectsAction.updateDefect(defectObj, defectObj.id, ['newComment']));
    }
}
