import {Component, Input, AfterViewInit, OnChanges, OnDestroy, ViewChild} from '@angular/core';

import { ZephyrStore } from '../../../../store/zephyr.store';

import {ExportComponent} from '../../common/export/export.component';

import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import {FETCH_REPORT_TEMPLATE_SUCCESS} from '../../../../utils/constants/action.events';

declare var jQuery;

@Component({
    selector: 'zee-export-dialog-requirement',
    templateUrl: 'requirement_export.html'
})
export class RequirementExportComponent implements AfterViewInit, OnChanges, OnDestroy {
    zephyrStore;
    @Input() fieldOptions;
    @Input() reqIDs;
    @Input() reqCatalogTreeId;
    @Input() isDisabled;
    @Input() releaseId;
    @Input() inRelease;
    @Input() isSearchView;
    @Input() isGlobal;
    @Input() projectId;
    @Input() isAdvancedSearch;
    @Input() searchText;
    @ViewChild(ExportComponent) exportUI: ExportComponent;
    _reportType;
    unsubscribe;
    _zephyrStore;
    i18nMessages = I18N_MESSAGES;
    constructor() {
        this._zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this._zephyrStore.subscribe(() => {
            let _state = this._zephyrStore.getState();
            if(_state.report.event == FETCH_REPORT_TEMPLATE_SUCCESS) {
                // do not clear this event here, as it is cleared in export component
                setTimeout(() => {
                    jQuery(`#zui-export-modal-${this.fieldOptions.id}-choice`).modal('hide');
                    jQuery(`#zui-export-modal-${this.fieldOptions.id}`).modal();
                });
            }
        });
    }
    ngAfterViewInit() {
        this.toggleButton();
    }
    ngOnChanges(changedNode) {
        this.toggleButton();
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    setFieldsOptions() {
        let _getMetadata = false;
        let _searchCriteria = this.inRelease && !this.isGlobal ? 'releaseID:' + this.releaseId + ';' : '';
        if (this.reqIDs.length && !this.fieldOptions['isTreeNodeSelected']) {
            _searchCriteria += 'requirementIds:' + this.reqIDs;
            if (this.exportUI) {
                _getMetadata = true;
            }
        } else if (this.exportUI) {
            if(this.reqCatalogTreeId) {
                _searchCriteria += 'treeNodeId:' + this.reqCatalogTreeId;
            }
            _getMetadata = true;
        }
        this.fieldOptions['isTreeNodeSelected'] = false;
        this.fieldOptions.searchCriteria = _searchCriteria;
        if (this.isGlobal) {
            //console.log('field options', this.fieldOptions, this.projectId, this.reqCatalogTreeId);
            if(!this.reqCatalogTreeId) {
                this.fieldOptions.searchCriteria = "projectID:" + this.projectId;
            }
            delete this.fieldOptions['releaseId'];
        } else {
            this.fieldOptions['releaseId'] = this.releaseId;
        }

        if(!this.reqIDs.length && this.isSearchView) {
          _searchCriteria = '';
          if(this.inRelease) {
            _searchCriteria = 'releaseId:' + this.releaseId + ';';
          }
          if(this.isAdvancedSearch) {
            _searchCriteria += 'zql:true;searchString:' + this.searchText;
          } else {
            _searchCriteria += 'searchString:' + this.searchText;
          }
          this._reportType = 'CUSTOM_REPORT_TYPE_SEARCH_REQ';
          this.fieldOptions['searchCriteria'] = _searchCriteria;
          _getMetadata = true;
        }
        this.fieldOptions['subTitle']='Requirement Tree Report';
        if (_getMetadata) {
            this.exportUI.getExportMetadata(this._reportType);
        }
    }
    toggleButton() {
        if(this.isSearchView) {
            //ZEPHYR-13262
            jQuery(`#zui-export-modal-trigger-${this.fieldOptions.id}`).prop('disabled', false);
        } else {
            if (this.disableButton()) {
                jQuery(`#zui-export-modal-trigger-${this.fieldOptions.id}`).prop('disabled', true);
            } else {
                jQuery(`#zui-export-modal-trigger-${this.fieldOptions.id}`).prop('disabled', false);
            }
        }
    }
    disableButton() {
        return (this.isDisabled || !this.reqIDs.length);
    }
    exportEntireTrac() {
        this.fieldOptions.exportType = 'EXPORT_TYPE_REQUIREMENT_TRACEABILITY';
        this._reportType = this.reqIDs.length ? 'CUSTOM_REPORT_TYPE_REQ_TRACEBILITY' : 'CUSTOM_REPORT_TYPE_REQ_TREE_TRACEBILITY';
        this.setFieldsOptions();
    }
    exportReqOnly() {
        this.fieldOptions.exportType = 'EXPORT_TYPE_REQUIREMENT';
        this._reportType = this.reqIDs.length ? 'CUSTOM_REPORT_TYPE_REQ' : 'CUSTOM_REPORT_TYPE_REQ_TREE';
        this.setFieldsOptions();
    }
    showReqChoiceModal(ev) {
        if(!this.isSearchView) {
            jQuery(`#zui-export-modal-${this.fieldOptions.id}-choice`).modal('show');
        } else {
            this.exportReqOnly();
        }
    }
}
