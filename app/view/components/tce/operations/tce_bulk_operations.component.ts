import {Component, Input, ViewChild} from '@angular/core';

import {ZephyrStore} from '../../../../store/zephyr.store';
import {TestcaseCreateComponent} from '../../testcase/operations/testcase_create.component';
import {TestcaseExportComponent} from '../../testcase/operations/testcase_export.component';
// Constants
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import {TCE_BULK_OPERATION_OPTIONS, TCE_BULK_OPERATION} from './tce_operations.constant';
import {TceExportComponent} from './tce_export.component';

/**
 * <zui-tce-bulk-operations
        [isMenuShown]="isMenuShown"
        [isSearchView]="isSearchView"
        [tcrCatalogTreeId]="selectedTreeNode"
    ></zui-tce-bulk-operations>
 * @param isMenuShown: whether to show the menu or hide it
 * @param isSearchView: In case of search view only display the Export button
 * @param tcrCatalogTreeId
 * @param tctIds
 * @param testcaseIds
 */
@Component({
	selector: TCE_BULK_OPERATION,
	templateUrl: 'tce_bulk_operations.html'
})
export class TceBulkOperationsComponent {
    @ViewChild(TceExportComponent) tceExport: TceExportComponent;
    @Input() isSearchView;
    @Input() isMenuShown;
    @Input() tcrCatalogTreeId;
    @Input() tcrCatalogTreeName;
    @Input() tctIds;
    @Input() testcaseIds;
    @Input() releaseId;
    @Input() tceGridRows;
    @Input() executionIds;
    @Input() exportPrefix;
    @Input() fieldOptions;
    @Input() statuses;
    @Input() isAdvancedSearch;
    @Input() searchText;
    @Input() inRelease;
    zephyrStore;
    tceBulkOptions = TCE_BULK_OPERATION_OPTIONS;
    typeOfBulkExecution = 'TCE';
    i18nMessages = I18N_MESSAGES;
    updateReportType(_reportType) {
        this.tceExport.updateReportType(_reportType);
    }
}
