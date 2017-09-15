import {Component, Input, ViewChild, AfterViewInit, OnChanges} from '@angular/core';

declare var window;
import {ExportComponent} from '../../common/export/export.component';

// Constants
import {TESTCASE_EXPORT_DIALOG} from '../testcase.constant';

@Component({
	selector: TESTCASE_EXPORT_DIALOG,
    //directives: [ExportComponent],
	template: `
        <button [class]="'zui-btn zui-btn-tertiary'" type="button" data-toggle="modal" [disabled]="disableButton()"
            id="zui-export-modal-trigger-{{fieldOptions.id}}" (click)="onTiggerExport()"
            [attr.data-target]="'#zui-export-modal-' + fieldOptions.id">{{fieldOptions.header}}</button>
        <zui-export
            [fieldOptions]="fieldOptions"
            [isSearchView]="isSearchView"
        ></zui-export>
    `
})
export class TestcaseExportComponent implements AfterViewInit, OnChanges {
    @ViewChild(ExportComponent) exportUI: ExportComponent;
    @Input() fieldOptions;
    @Input() testcaseIds;
    @Input() tcrCatalogTreeId;
    @Input() isDisabled;
    @Input() releaseId;
    @Input() isSearchView = false;
    @Input() isAdvancedSearch;
    @Input() searchText;
    @Input() inRelease;
    _reportType;
	zephyrStore;
    ngAfterViewInit() {
        this.setFieldsOptions();
    }
    ngOnChanges(data) {
        this.setFieldsOptions();
    }
    setFieldsOptions() {
         //console.log('thisin export component', this);
        let _searchCriteria1 = 'TreeNodeId:' + this.tcrCatalogTreeId,
            _getMetadata = false;
        if(!this.tcrCatalogTreeId) {
            if(this.isSearchView && !this.inRelease) {
                _searchCriteria1 = '';
            } else {
                _searchCriteria1 = 'releaseID:' + this.releaseId;
            }
        }
        let _searchCriteria2;
        if(this.testcaseIds.length) {
            _searchCriteria2 = _searchCriteria1 + ';nodeId:' + this.testcaseIds;
            if(this.exportUI && this._reportType != 'CUSTOM_REPORT_TYPE_TESTCASE_GRID') {
                this._reportType = this.isSearchView ? 'CUSTOM_REPORT_TYPE_SEARCH_TESTCASE': 'CUSTOM_REPORT_TYPE_TESTCASE_GRID';
                _getMetadata = true;
            }
            if(this.isSearchView) {
               _searchCriteria2 = ';zql:true;searchString:id in ('+ this.testcaseIds.toString() + ')';
            }
        } else if(this.exportUI && this._reportType != 'CUSTOM_REPORT_TYPE_TESTCASE') {
            this._reportType = 'CUSTOM_REPORT_TYPE_TESTCASE';
            _getMetadata = true;
        }
        if(!this.testcaseIds.length && this.isSearchView) {
            this._reportType = this.isSearchView ? 'CUSTOM_REPORT_TYPE_SEARCH_TESTCASE': 'CUSTOM_REPORT_TYPE_TESTCASE_GRID';
            let activeProjectId = localStorage.getItem(`${window.tab}-currentProject`) ? JSON.parse(localStorage.getItem(`${window.tab}-currentProject`))['id'] : 0;
            if(this.isAdvancedSearch) {
              _searchCriteria1 += ';maxResults:' + this.fieldOptions['maxSize'] + ';zql:true;activeProjectId:' + activeProjectId + ';searchString:' + this.searchText;
            } else {
              _searchCriteria1 += ';maxResults:' + this.fieldOptions['maxSize'] + ';activeProjectId:' + activeProjectId + ';searchString:' + this.searchText;
            }
        }
        if (this.fieldOptions.hasOwnProperty('isSecondSearchCriteria')) {
            this.fieldOptions['searchCriteria1'] = _searchCriteria1;
            this.fieldOptions['searchCriteria2'] = _searchCriteria2;
        } else {
            if (this.testcaseIds.length) {
                this.fieldOptions['searchCriteria'] = _searchCriteria2;
            } else {
                this.fieldOptions['searchCriteria'] = _searchCriteria1;
            }
        }
        if(!this.isSearchView || this.inRelease) {
          this.fieldOptions['releaseId'] = this.releaseId;
        } else {
          this.fieldOptions['releaseId'] = null;
        }
        this.fieldOptions['subTitle'] = 'Testcase Tree Report';
        if(_getMetadata)
            this.exportUI.getExportMetadata(this._reportType);
    }
    onTiggerExport() {
        if (this.fieldOptions.hasOwnProperty('isSecondSearchCriteria')) {
            if (this.isSearchView) {
                if (!this.testcaseIds.length) {
                    this.fieldOptions['isSecondSearchCriteria'] = false;
                } else {
                    this.fieldOptions['isSecondSearchCriteria'] = true;
                }
             } else {
                this.fieldOptions['isSecondSearchCriteria'] = true;
            }
        }
    }
    disableButton() {
        return !this.isSearchView && (this.isDisabled || !this.testcaseIds.length);
    }
}
