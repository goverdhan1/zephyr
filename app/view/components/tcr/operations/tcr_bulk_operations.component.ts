import {Component, Input} from '@angular/core';
declare var jQuery: any, _;

// Constants
import {TCR_BULK_OPERATION_OPTIONS, TCR_BULK_OPERATION} from './tcr_operations.constant';

/**
 * <zui-tcr-bulk-operations
        [isMenuShown]="isMenuShown"
        [isSearchView]="isSearchView"
        [tcrCatalogTreeId]="selectedTreeNode"
    ></zui-tcr-bulk-operations>
 * @param isMenuShown: whether to show the menu or hide it
 * @param isSearchView: In case of search view only display the Export button
 * @param tcrCatalogTreeId
 * @param tctIds
 * @param testcaseIds
 */
@Component({
	selector: TCR_BULK_OPERATION,
	templateUrl: 'tcr_bulk_operations.html'
})
export class TcrBulkOperaionsComponent {
    @Input() isSearchView;
    @Input() isMenuShown;
    @Input() treeType;
    @Input() tcrCatalogTreeId;
    @Input() tctIds;
    @Input() testcaseIds;
    @Input() releaseId;
    @Input() fieldOptions;
    @Input() isAdvancedSearch;
    @Input() searchText;
    @Input() inRelease;
    tcrBulkOptions = TCR_BULK_OPERATION_OPTIONS;
}
