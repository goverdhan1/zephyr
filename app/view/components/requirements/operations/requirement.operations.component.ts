import {Component, Input} from '@angular/core';
import {ZephyrStore} from "../../../../store/zephyr.store";
declare var jQuery: any, _;
const SYSTEM_TYPE_4 = 4;

/**
 * @param isMenuShown: whether to show the menu or hide it
 * @param reqCatalogTreeId
 * @param reqIDs: list of testcase ids
 */
@Component({
	selector: 'zui-req-operations',
	templateUrl: 'requirement_operations.html'
})
export class ReqOperationComponent {
    @Input() releaseId;
    @Input() isMenuShown;
    @Input() treeType;
    @Input() reqCatalogTreeId;
    @Input() reqIDs;
    @Input() reqOpeartionConstants;
    @Input() isSearchView;
    @Input() isDeAllocate;
    @Input() isGlobal;
    @Input() isImported;
    @Input() projectId;
    @Input() searchText;
    @Input() isAdvancedSearch;
    @Input() inRelease;
    private _zephyrStore: any;
    constructor() {
      this._zephyrStore = ZephyrStore.getZephyrStore();
    }
    openImportModal() {
      let defectsystem = this._zephyrStore.getState().global.defectSystem;

      if(defectsystem && defectsystem['systemType'] == SYSTEM_TYPE_4) {
        jQuery('#zui-import-modal-choice').modal();
      } else {
        jQuery('#zee-import-modal-requirement').modal();
      }

    }
}
