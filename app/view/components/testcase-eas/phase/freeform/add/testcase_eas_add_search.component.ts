import {Component, Input, ViewChild} from '@angular/core';

import {TestcaseEASAction} from '../../../../../../actions/testcaseEAS.action';
import {ZephyrStore} from '../../../../../../store/zephyr.store';
import {TcrGridComponent} from '../../../../tcr/tcr_grid.component';

// Constants
import * as FREE_FORM_CONSTANTS from '../testcase_eas_freeform.constant';
import {ASSIGN_TESTCASES_BY_SEARCH_SUCCESS} from '../../../../../../utils/constants/action.events';
import {I18N_MESSAGES, getI18nText} from '../../../../../../utils/messages/messages.en';

declare var $: any, _;

@Component({
    selector: 'zui-testcase-eas-freeform-add-search',
    templateUrl: 'testcase_eas_add_search.html',
    viewProviders: [TestcaseEASAction]
    // directives: [
    //     ZephyrSearchComponent,
    //     TcrGridComponent
    // ]
})

export class TestcaseEASFreeFormSearchComponent {
    @ViewChild(TcrGridComponent) tcrGridUI: TcrGridComponent;
    @Input() cyclePhaseId;
    @Input() parentTreeId;
    @Input() releaseId;
    @Input() projectId;
    @Input() includeHierarchy;
    _confirmationJSON : any;
    _selectAll = false;
    _searchText = '';
    _zephyrStore;
    _isAdvancedSearch = false;
    _testcaseTab = FREE_FORM_CONSTANTS.TESTCASE_EAS_FREEFORM_SEARCH_TAB;
    _FREE_FORM_CONSTANTS = FREE_FORM_CONSTANTS;
    i18nMessages = I18N_MESSAGES;
    constructor(private _testcaseEASAction: TestcaseEASAction) {
        this._zephyrStore = ZephyrStore.getZephyrStore();
		// this._zephyrStore.subscribe((x) => {
        //     let _state = this._zephyrStore.getState();
        //     // if(_state.testcaseEAS.event == ASSIGN_TESTCASES_BY_SEARCH_SUCCESS) {
        //     //     this.showAssignTestcasesConfirmation(_state.testcaseEAS.assignedFreeFormTestcases);
        //     // }
		// });
    }
    /**
     * Event handler for event emitted from search component
     * @param isAdvancedSearch
     * @param value
     */
    onSearchGo(param) {

        if (!param.value) {
            return;
        }
        // Trigger tcr grid component's search testcases
        this.tcrGridUI.searchOffset = 0;
        this.tcrGridUI.searchText = this._searchText = param.value;
        this.tcrGridUI.isAdvancedSearch = this._isAdvancedSearch = param.isAdvancedSearch;
        this.tcrGridUI.fetchTestcasesOnSearch(param.value, this.releaseId, this.projectId);
        /**
         * disable the checkbox if the select all is enabled
         */
        this.toggleTestcasesSelection();
    }
    /**
     * Based on the select all checkbox,
     * enable/disable the testcase selection chekbox
     */
    toggleTestcasesSelection() {
        let $selectAllEl = $('input[type=checkbox]#zui-search-save-all');
        // Call the tcr grid component this.toggleCheckboxSelection() method to enable/disable checkbox
        this.tcrGridUI.disableCheckbox = this._selectAll = $selectAllEl.prop('checked');
        this.tcrGridUI.toggleCheckboxSelection();
    }
    addTestcasesOnSearch() {
        let _params = {
            includeHierarchy: this.includeHierarchy,
            cyclePhaseId: this.cyclePhaseId,
            parentTreeId: this.parentTreeId,
            releaseId: this.releaseId
        };
        if(this._selectAll) {
            _params['zql'] = this._isAdvancedSearch;
            _params['searchQuery'] = this._searchText;
            _params['maxresults'] = 0;
        } else {
            let _testcaseIds = [];
            _.each(this.tcrGridUI.selectedTctIds, (testcaseid) => {
               _testcaseIds.push(testcaseid);
            });
            _params['testcaseIds'] = {
              'ids':  _testcaseIds
            };
        }
        this._zephyrStore.dispatch(this._testcaseEASAction.assignTestcasesBySearch(_params));
    }
}
