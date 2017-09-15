import {Component, Input, Output, EventEmitter, NgZone, ViewChild, forwardRef, OnDestroy} from '@angular/core';

import {ZephyrStore} from '../../../store/zephyr.store';
import {RichTextEditorComponent} from '../common/editor/rich_text_editor.component';
import {RequirementsAction} from '../../../actions/requirements.action';
import {GlobalAction} from '../../../actions/global.action';

// Constants
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import {REQ_OPERATION_CONSTANTS_DETAILS} from './operations/requirement_operations.constant';
import {ACTION_EXPAND, ACTION_COLLAPSE, JIRA_REQUIREMENT_TYPE} from '../../../utils/constants/application.constants';

const TESTAPPID = 15;

declare var jQuery: any, moment, tinymce;

@Component({
    selector: 'zee-requirement-details',
    templateUrl: 'requirement_details.html',
    viewProviders: [RequirementsAction, GlobalAction]
})

export class RequirementDetailsComponent implements OnDestroy {
    @ViewChild(RichTextEditorComponent) rteComponent: RichTextEditorComponent;
    @Input() releaseId;
    @Input() selectedTreeId;
    @Input() editable = true;
    @Input() isGlobal = false;
    @Input() isSearchView = false;
    @Input() allowMapping = true;
    @Input() currentRecord: number;
    @Input() totalRecords: number;
    @Input() hideDocker = false;
    @Output() onRecordChange: EventEmitter<any> = new EventEmitter();
    @Output() onSaveMap: EventEmitter<any> = new EventEmitter();
    mandatoryFields = [];

    isDirty = false;

    reqObj = {
        'requirementTreeId': '',
        'name': '',
        'details': '',
        'externalId': '',
        'url': '',
        'priority': '',
        'id': null,
        'releaseIds': [],
        'customProperties' : {},
        'customProcessedProperties' : {},
        'createdBy': '',
        'createdOn': 0,
        'reqCreationDate': '',
        'testcaseIds': [],
        'requirementType': 0,
        'requirementReleaseTestcaseCountMapping': []
    };
    coverage = '';

    reqDetails;
    expanded: string = ACTION_EXPAND;
    collapsed: string = ACTION_COLLAPSE;
    priorities = [];
    isUpdateRequirement = false;
    reqConstants = REQ_OPERATION_CONSTANTS_DETAILS;
    customField = {
        customFields: [],
        customProperties: {},
        customFieldTypes: []
    };
    reqPanelHeight;
    testPerm = false;
    nameValidation = '^.{1,255}$';
    altIdValidation: '^.{0,255}$';
    linkVaidation: '^.{0,4048}$';
    i18nMessages = I18N_MESSAGES;
    private _zephyrStore;
    private attachmentsLoaded = false;
    private unsubscribe;
    private maxCountOnEditor = 10;
    private editorTimeout;
    private isJira = false;
    private isDetailsEditable;
    constructor(private _reqAction: RequirementsAction, private globalAction: GlobalAction, private zone: NgZone) {
        this._zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this._zephyrStore.subscribe(() => {
            let state = this._zephyrStore.getState();
            this.customField.customFieldTypes = JSON.parse(JSON.stringify(state.customField.customFieldTypes));

            this.setPriorities(state.adminPref);

            let testApp = state.leftnav.project.group.filter(item => item.appId === TESTAPPID)[0] || {};
            this.testPerm = testApp.permission;

            if(state.requirements.event === 'DELETE_REQUIREMENT_SUCCESS') {
                this.reqObj = null;
                this.reqDetails = null;
                this._zephyrStore.dispatch(this._reqAction.clearReqEvent());
            }

        });
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    isMapEnabled() {
        return this.editable && !this.isGlobal && !this.isSearchView && this.testPerm;
    }
    setPriorities(preferences) {
        let _priorities = [];
        if(preferences && preferences['requirement.requirementPriority.LOV']) {
            try {
                _priorities =  JSON.parse(preferences['requirement.requirementPriority.LOV']);
            } catch (e) {
//                console.log(e);
            }
        }
        this.priorities = _priorities.map(item => ({id: item.id, text: item.value}));
    }
    onReqDetailsUpdate(reqDetails, releaseId) {
        if(reqDetails && Object.keys(reqDetails).length) {
            let oldId = (this.reqObj || {})['id'];
            this.reqObj = {
                'requirementTreeId': '',
                'name': '',
                'details': '',
                'externalId': '',
                'url': '',
                'priority': '',
                'id': null,
                'releaseIds': [],
                'customProperties': {},
                'customProcessedProperties': {},
                'createdBy': '',
                'createdOn': 0,
                'reqCreationDate': '',
                'testcaseIds': [],
                'requirementType': 0,
                'requirementReleaseTestcaseCountMapping': []
            };
            this.reqDetails = reqDetails;
            this.isUpdateRequirement = true;

            this.reqObj.name = reqDetails.name;
            this.reqObj.externalId = reqDetails.externalId;
            this.reqObj.url = reqDetails.url || '';
            this.reqObj.releaseIds = [this.releaseId];
            this.reqObj.priority = reqDetails.priority;
            this.reqObj.id = reqDetails.id;
            this.reqObj.createdOn = reqDetails.createdOn;
            this.reqObj.reqCreationDate = reqDetails.reqCreationDate;
            this.reqObj.createdBy = reqDetails.createdBy;
            this.reqObj.testcaseIds = reqDetails.testcaseIds;
            this.reqObj.requirementType = reqDetails.requirementType;
            this.reqObj.requirementReleaseTestcaseCountMapping = reqDetails.requirementReleaseTestcaseCountMapping;

            this.isJira = JIRA_REQUIREMENT_TYPE === reqDetails.requirementType;

            if (!this.isDirty || oldId !== reqDetails.id) {
                this.isDirty = false;
                this.reqObj.details = reqDetails.details;
                this.editorTimeout = (new Date()).getTime();
                if(reqDetails && reqDetails.details) {
                    this.reInitEditor(reqDetails.details, 0);
                }
            }

            this.isDetailsEditable = !this.isJira && this.editable;

            let maps = reqDetails.requirementReleaseTestcaseCountMapping;
            if (!this.isGlobal) {
                maps = Array.isArray(maps) ? maps.filter(item => String(item.releaseId) === String(releaseId)) : [];
            }

            let coverage = 0;
            if (Array.isArray(maps)) {
                maps.forEach(item => {
                    coverage += item.testcaseCount || 0;
                });
            }

            this.coverage = ('Maps to ' + coverage + ' testcase') + (0 === coverage || 1 === coverage ? '' : 's');

            let state = this._zephyrStore.getState();
            this.customField.customFields = JSON.parse(JSON.stringify(state.customField.customFields['requirement'].filter(item => item.allProject || ~item.projectIds.indexOf(reqDetails.projectId || state.project.id))));
            this.customField.customProperties = JSON.parse(JSON.stringify(reqDetails.customProperties || {}));

            this.reqObj.customProperties = this.customField.customProperties;
            this.reqObj.customProcessedProperties = JSON.parse(JSON.stringify(reqDetails.customProcessedProperties));

            this.reqObj.requirementTreeId = this.selectedTreeId;
            this.reqObj = JSON.parse(JSON.stringify(this.reqObj));

            let mandatoryFields = this.customField.customFields.filter(item => item.mandatory);
            if (Array.isArray(mandatoryFields) && mandatoryFields.length) {
                this.mandatoryFields = mandatoryFields;
            }

            this.attachmentsLoaded = false;

        }
    }
    isEditDisabled() {
        return !this.isDirty || !this.isDetailsEditable;
    }
    reInitEditor(reqDetails, count) {
        if(this.rteComponent) {
            this.rteComponent.setEditorContent(reqDetails);
        } else {
            // try to init editor a max of maxCountOnEditor times only
            if (count < this.maxCountOnEditor) {
                setTimeout(() => {
                    this.reInitEditor(reqDetails, ++count);
                }, 10);
            } else {
                let time = this.editorTimeout - (new Date()).getTime();
//                console.log('editor reInit timed out after', time, 'milli seconds');
            }
        }
    }
    saveCFFieldValue(value) {
        let _customProperties = this.customField.customProperties;
        let tempList = Object.keys(value);
        if(tempList && tempList.length > 0 && this.customField.customFields) {
            tempList.forEach((key) => {
              let tempList1 = this.customField.customFields.filter((cf) => (cf.fieldName == key && 5 == cf.fieldTypeMetadata));
              if(tempList1 && tempList1.length > 0) {
                this.reqObj.customProcessedProperties = this.reqObj.customProcessedProperties || {};
                this.reqObj.customProcessedProperties[key] = moment(value[key]).format('MM/DD/YYYY');
              }
            });
        }
        Object.assign(_customProperties, value);
        this.reqObj.customProperties = _customProperties;

        this.updateRequirement();

    }
    onPriorityChange(selectedVal) {
        this.reqObj.priority = selectedVal;
    }

    onKeyUp(event) {
        // Added zone for ZEPHYR-13561
        this.zone.run(() => {
            this.isDirty = true;
        });
    }

    saveRichText() {
        this.reqObj.details = this.rteComponent.getEditorContent();
        this.reqObj.releaseIds = [this.releaseId];
        this.isDirty = false;
        this.updateRequirement();
    }
    savePriority(value) {
        this.reqObj.priority = value;
        this.updateRequirement();
    }
    getSelect2Options() {
        return {
            width: '100%'
        };
    }
    saveReqName(value) {
        this.reqObj.name = value;
        this.updateRequirement();
    }
    saveReqExternalId(value) {
        this.reqObj.externalId = value;
        this.updateRequirement();
    }
    saveReqLink(value) {
        this.reqObj.url = value || '';
        this.updateRequirement();
    }
    getSelectedPriorityName() {
        if (JIRA_REQUIREMENT_TYPE === this.reqObj.requirementType) {
            return this.reqObj.priority || '';
        }
        if(this.reqObj.priority && Array.isArray(this.priorities) && this.priorities.length) {
            return (this.priorities.filter(priority => String(priority.id) === String(this.reqObj.priority))[0] || {}).text || '';
        }
        return '';
    }
    hideReqDetails() {
        this.reqDetails = null;
        this.reqObj = null;
        this.mandatoryFields = [];
        this._zephyrStore.dispatch(this._reqAction.clearJira());
    }
    resetDescription() {
        // added for ZEPHYR-13560
        this.isDirty = false;
        this.reInitEditor(this.reqObj.details, 0);
    }
    panelCollapsible(data) {
        let coll = jQuery(data.event.currentTarget);
        let panel = coll.closest('zee-requirement-details').parent().parent().siblings('.zui-flex-v-resizable');

        if(coll.hasClass('requirement-default-view') || data.openByDefault) {
            this.reqPanelHeight = panel.height();

            coll.removeClass('requirement-default-view').addClass('requirement-full-view').find('span').removeClass('fa-chevron-up').addClass('fa-chevron-down');

            panel.css('height', '0px').addClass('collapse');
        } else if(coll.hasClass('requirement-full-view')) {
            coll.removeClass('requirement-full-view').addClass('requirement-default-view').find('span').removeClass('fa-chevron-down').addClass('fa-chevron-up');

            panel.css('height', this.reqPanelHeight + 'px').removeClass('collapse');
        }
    }
    recordChanged(ev) {
        this.onRecordChange.emit(ev);
    }
    updateRequirement() {
        if(this.isUpdateRequirement) {

            let customProperties = this.customField.customProperties;
            let emptyField = this.mandatoryFields.filter(item => !(customProperties.hasOwnProperty(item.fieldName) || customProperties[item.fieldName]));

            if (Array.isArray(emptyField) && emptyField.length) {
                this.globalAction.showMandatoryFieldError(emptyField);
            } else {
                this._zephyrStore.dispatch(this._reqAction.updateRequirement(this.reqObj));
            }
        } else {
            this._zephyrStore.dispatch(this._reqAction.createRequirement(this.reqObj));
        }
    }
    saveMap(data) {
        jQuery('#zee-requirement-map-module').removeClass(this.expanded).addClass(this.collapsed);
        this.onSaveMap.emit(data);
    }
    attachmentPaneltoggle(ev) {
        if (this.expanded === ev.action && !this.attachmentsLoaded) {
            // panel moves from collapsed state to expanded state
            this.attachmentsLoaded = true;
            this._zephyrStore.dispatch(this._reqAction.fetchAttachments(this.reqObj.id));
        }
    }
    navigateToLink() {
        let url = this.reqObj.url;
        let urlRegEx = /^https?:\/\/|^\/\//i;
        url = urlRegEx.test(url) ? url : '';
        window.open(url, '_blank');
    }
}
