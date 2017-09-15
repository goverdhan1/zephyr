import {Component, Input, AfterViewInit, OnChanges, ViewChild} from '@angular/core';

import {ExportComponent} from '../../common/export/export.component';

// Constants
import {TESTCASE_EXPORT_DIALOG_TCE} from '../../testcase/testcase.constant';

declare var jQuery, window;

@Component({
	selector: TESTCASE_EXPORT_DIALOG_TCE,
	template: `
        <button [class]="'btn btn-secondary'" type="button" data-toggle="modal"
            id="zui-export-modal-trigger-{{fieldOptions.id}}" (click)="onTiggerExport()"
            [attr.data-target]="'#zui-export-modal-' + fieldOptions.id">{{fieldOptions.header}}</button>
        <zui-export
            [fieldOptions]="fieldOptions"
            [isSearchView]="isSearchView"
        ></zui-export>
    `
})
export class TceExportComponent implements AfterViewInit, OnChanges {
	@ViewChild(ExportComponent) exportUI: ExportComponent;
    @Input() fieldOptions;
    @Input() testcaseIds;
    @Input() tcrCatalogTreeId;
    @Input() isDisabled;
    @Input() releaseId;
    @Input() executionIds;
    @Input() exportPrefix;
    @Input() isSearchView;
    @Input() isAdvancedSearch;
    @Input() searchText;
    @Input() inRelease;
    _reportType;
	zephyrStore;
    ngAfterViewInit() {
        this.toggleButton();
    }
	ngOnChanges(changedNode) {
        this.toggleButton();
    }
    setFieldsOptions() {
        // let _searchCriteria = 'TreeNodeId:' + this.tcrCatalogTreeId,
        //     _getMetadata = false;
        // if(!this.tcrCatalogTreeId) {
        //     _searchCriteria = 'releaseId:' + this.releaseId;
        // }

		let _searchCriteria = this.exportPrefix + this.tcrCatalogTreeId,
            _getMetadata = false;

		// if(!this.tcrCatalogTreeId) {
        //     _searchCriteria = 'releaseId:' + this.releaseId;
        // }

		if(!this.testcaseIds.length && this.isSearchView) {
          this._reportType = 'CUSTOM_REPORT_TYPE_SEARCH_SCHEDULE';
          _searchCriteria = (_searchCriteria == 'null') ? '' : _searchCriteria;
          let activeProjectId = localStorage.getItem(`${window.tab}-currentProject`) ? JSON.parse(localStorage.getItem(`${window.tab}-currentProject`))['id'] : 0;
          if (!this.inRelease) {
            _searchCriteria += ';activeProjectId:' + activeProjectId;
          } else {
            _searchCriteria += ';activeProjectId:' + activeProjectId + ';releaseId:' + this.releaseId;
          }
          if (this.isAdvancedSearch) {
            _searchCriteria += ';zql:true;displayStep:true;searchString:' + this.searchText;
          } else {
            _searchCriteria += ';displayStep:true;searchString:' + this.searchText;
          }
          _searchCriteria += ';maxResults:' + this.fieldOptions['maxSize'];
          _getMetadata = true;
        }
        if(this.exportPrefix == 'cycleId:' || this.exportPrefix == 'cyclePhaseId:' || this.exportPrefix == 'TreeNodeId:') {
            _searchCriteria = _searchCriteria + ';displayStep:true';
        }
        if(this.testcaseIds.length && !this.isSearchView) {
            _searchCriteria = 'releaseTestScheduleIds:' + this.executionIds + ';displayStep:true';
            if(this.exportUI && this._reportType != 'CUSTOM_REPORT_TYPE_TCE_GRID') {
                this._reportType = 'CUSTOM_REPORT_TYPE_TCE_GRID';
                _getMetadata = true;
            }
        } else if(this.testcaseIds.length && this.isSearchView) {
            _searchCriteria = 'zql:true;displayStep:true;searchString:scheduleid in (' + this.executionIds.join(",") + ')';
            this._reportType = 'CUSTOM_REPORT_TYPE_SEARCH_SCHEDULE';
            _getMetadata = true;
        } else if(this.exportUI && this._reportType != 'CUSTOM_REPORT_TYPE_TCE' && !this.isSearchView) {
            this._reportType = 'CUSTOM_REPORT_TYPE_TCE';
            _getMetadata = true;
        }
        this.fieldOptions['searchCriteria'] = _searchCriteria;
        if(!this.isSearchView || this.inRelease) {
          this.fieldOptions['releaseId'] = this.releaseId;
        } else {
          this.fieldOptions['releaseId'] = null;
        }
        this.fieldOptions['subTitle'] = 'Test Execution Report';
        if(_getMetadata)
            this.exportUI.getExportMetadata(this._reportType);
    }
    onTiggerExport() {
        this.setFieldsOptions();
    }
    toggleButton() {
        if(this.isSearchView) {
            //ZEPHYR-13262
            jQuery('#zui-export-modal-trigger-' + this.fieldOptions.id).prop('disabled', false);
        } else {
            if(this.disableButton()) {
                jQuery('#zui-export-modal-trigger-' + this.fieldOptions.id).prop('disabled', true);
            } else {
                jQuery('#zui-export-modal-trigger-' + this.fieldOptions.id).prop('disabled', false);
            }
        }
    }
    disableButton() {
        return (this.isDisabled || !this.testcaseIds.length);
    }
	updateReportType(_reportType) {
		this._reportType = _reportType;
	}
}
