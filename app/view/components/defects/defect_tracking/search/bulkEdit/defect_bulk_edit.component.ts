
import {Component, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ZephyrStore} from '../../../../../../store/zephyr.store';
import {DefectsAction} from '../../../../../../actions/defects.action';
import * as CdUserSelect from '../../../defect_link/create_defect/fields/cd_user_select.util';

// Constants
import {I18N_MESSAGES} from '../../../../../../utils/messages/messages.en';

declare var jQuery: any, _;

@Component({
    selector: 'zee-defect-bulk-edit',
    templateUrl: 'defect_bulk_edit.html',
    viewProviders: [DefectsAction]
})

export class DefectBulkEditComponent implements AfterViewInit {
    @Input() selectedDefects;
    @Output() onDefectBulkUpdate: EventEmitter<any> = new EventEmitter();
    public statuses: any[] = [];
    public resoluctions: any[] = [];
    public priorities: any[] = [];
    public fixVersions: any[] = [];
    public versions: any[] = [];
    public components: any[] = [];
    public i18nMessages = I18N_MESSAGES;
    private fieldValues = {};
    private _zephyrStore;
    private metaData;
    private changes: any[]=[];

    constructor(private _defectsAction: DefectsAction) {
        this._zephyrStore = ZephyrStore.getZephyrStore();
        this._zephyrStore.subscribe((x) => {
            this.onStateChange();
        });

    }
    ngAfterViewInit() {
        jQuery('#defect-bulk-edit').on('show.bs.modal', (ev) => {
            if(ev.target === ev.currentTarget) {
              //  console.log(this.metaData);
                this.setPriorities();
                this.setStatuses();
                this.setFixVersions();
                this.setVersion();
                this.setResoluction();
                this.setComponent();
            }
        });
        jQuery('#defect-bulk-edit').on('hidden.bs.modal', (ev) => {
            this.resetFields();
        });
    }

    resetFields() {
        this.statuses = [];
        this.resoluctions = [];
        this.priorities = [];
        this.fixVersions = [];
        this.versions = [];
        this.components = [];
        this.fieldValues = {};
        this.changes = [];
    }

    setPriorities(){
        var i;
        this.priorities = [];
        for(i=0 ; i< this.metaData.Priority.length;i++){
            let kv = new KeyValueClass(this.metaData.Priority[i].key,this.metaData.Priority[i].value);
            this.priorities.push(kv);
        }
    }

    setStatuses(){
        var i;
        this.statuses = [];
        for(i=0 ; i< this.metaData.IssueType[0].list.length;i++){
            let kv = new KeyValueClass(this.metaData.IssueType[0].list[i].key,this.metaData.IssueType[0].list[i].value);
            this.statuses.push(kv);
        }
    }

    setFixVersions(){
        var i;
        this.fixVersions = [];
        for(i=0 ; i< this.metaData.FixVersions.length;i++){
            let kv = new KeyValueClass(this.metaData.FixVersions[i].key,this.metaData.FixVersions[i].value);
            this.fixVersions.push(kv);
        }
    }

    setVersion(){
        var i;
        this.versions = [];
        for(i=0 ; i< this.metaData.Version.length;i++){
            let kv = new KeyValueClass(this.metaData.Version[i].key,this.metaData.Version[i].value);
            this.versions.push(kv);
        }
    }

    setResoluction(){
        var i;
        this.resoluctions =[];
        for(i=0 ; i< this.metaData.Resolution.length;i++){
            let kv = new KeyValueClass(this.metaData.Resolution[i].key,this.metaData.Resolution[i].value);
            this.resoluctions.push(kv);
        }
    }

     setComponent(){
         var i;
         this.components = [];
        for(i=0 ; i< this.metaData.Component.length;i++){
            let kv = new KeyValueClass(this.metaData.Component[i].key,this.metaData.Component[i].value);
            this.components.push(kv);
        }
    }



    saveBulkEditValues(value, type){
        if(type === 'multiVersions' || type === 'fixVersions' || type === 'multiComponents' || type === 'assigned_to' ) {
            if(!this.fieldValues[type]) {
                this.fieldValues[type] = [];
            }
            this.fieldValues[type].push(value.id);
        } else {
            this.fieldValues[type] = value.text;
        }
        if(this.changes.indexOf(type) < 0) {
            this.changes.push(type);
        }
    }

    onCancelClearPrevious() {
        jQuery('.select-defect-edit').val('').trigger('change');
    }

    onStateChange() {
        let defectMetaData = this._zephyrStore.getState().defectsSearch;
        this.metaData = defectMetaData.metaDataByproject;
        let adminPref = this._zephyrStore.getState().adminPref;
        let statusField = adminPref["testStepResult.testStepResultStatus.LOV"];

        let state = this._zephyrStore.getState().defectDetails;
        if(state.event == 'UPDATE_BULK_DEFECT'){
            this._zephyrStore.dispatch(this._defectsAction.clearDefectDetailsEvent());
            this.onDefectBulkUpdate.emit(this.selectedDefects);
            jQuery('#defect-bulk-edit').modal('hide');
            this.onCancelClearPrevious();
        }
    }

    onBulkEdit() {
        if (this.changes.indexOf("assigned_to") !== -1) {
          this.fieldValues['assigned_to'] = this.fieldValues['assigned_to'][0];
        }

        this.selectedDefects.forEach((defect) => {
            Object.keys(this.fieldValues).forEach((key) => {
                defect[key] = this.fieldValues[key];
            });
        });

        let reqObj = {
            bugs: this.selectedDefects,
            changes: this.changes
        };

       this._zephyrStore.dispatch(this._defectsAction.bulkUpdateDefects(reqObj));
    }
    getSelect2Options(field) {
        if(field === 'user') {
            let project = this.selectedDefects && this.selectedDefects[0] && this.selectedDefects[0].product;
            let selectOptions = _.cloneDeep(CdUserSelect.USER_SELECT_OPTIONS);
            selectOptions['ajax']['queryParams'] = {
                projectkey: project
            };
            return selectOptions;
        }
        return {};
    }
    unSelectField(value, type) {
        if(type === 'multiVersions' || type === 'fixVersions' || type === 'multiComponents' || type === 'assigned_to' ) {
            let _fieldValues = this.fieldValues[type];
            if(_fieldValues && _fieldValues.length) {
                _fieldValues.splice(_fieldValues.indexOf(value.id), 1);
                if(!_fieldValues.length) {
                    this.trimChanges(type);
                }
            }
        } else {
            this.fieldValues[type] = '';
            this.trimChanges(type);
        }
    }
    trimChanges(type) {
        if(this.changes.indexOf(type) > -1) {
            this.changes.splice(this.changes.indexOf(type), 1);
        }
    }
}
export class KeyValueClass {
    public id: any;
    public text: any;
    constructor(id: any, text: any){
        this.id = id;
        this.text = text;
    }
}
