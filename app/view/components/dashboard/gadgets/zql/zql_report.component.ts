import {Component, Input, AfterViewInit, Output, EventEmitter, ViewChild} from '@angular/core';

declare var $, _;
// import {ZQLSearchComponent} from  '../../../common/search/zql_search.component';
import {TcrGridComponent} from '../../../tcr/tcr_grid.component';
// Constants
import {I18N_MESSAGES} from '../../../../../utils/messages/messages.en';

@Component({
	selector: 'zui-zql-chart',
	templateUrl: 'zql_report.html',
    // directives: [ZQLSearchComponent, TcrGridComponent],
    styles: [`
        .zui-disable-pointer {
            opacity: 0.4;
	        pointer-events: none;
        }
        .zui-zql-gadget-wrapper {
            display: inline-block;
            width: 100%;
        }
    `]
})

export class ZQLSearchReportComponent implements AfterViewInit {
    @ViewChild(TcrGridComponent) tcrGridCmp: TcrGridComponent;
    @Output() onEditModeUpdate = new EventEmitter();
    @Output() onSaveUpdate = new EventEmitter();
    componentOptions;
    editMode;
    gadgetName;
    i18nMessages = I18N_MESSAGES;
    // TODO: Fix store state for the TCR grid/ create a new store for reports
    ngAfterViewInit() {
        /**
         * Instead of ngIf using toggle mechanism
         * as don't want to recreate the viewchild on every mode toggle
         */
        this.toggleViewMode();
    }
    toggleViewMode() {
        if(this.editMode) {
            $('#zui-gadget-edit-mode-' + this.componentOptions.id).show();
            $('#zui-gadget-view-mode-' + this.componentOptions.id).hide();
        } else {
            $('#zui-gadget-edit-mode-' + this.componentOptions.id).hide();
            $('#zui-gadget-view-mode-' + this.componentOptions.id).show();
            setTimeout(() => {
                this.populateGridData();
            }, 10);
        }
    }
    /*
     * On save, update the component options
     */
    onSaveEditGadget() {
        // set search parameters
        this.onSearchGo();
        let _params = {
            name: this.gadgetName,
            componentOptions: this.componentOptions
        };
        this.onSaveUpdate.emit(_params);
        /**
         * Update to view mode
         */
        this.editMode = false;
        this.onEditModeUpdate.emit(false);
        this.toggleViewMode();
    }
    /**
     * Cancel the edit operation
     * Display the view mode
     */
    onCancelEditGadget() {
        this.editMode = false;
        this.onEditModeUpdate.emit(false);
        this.toggleViewMode();
    }
    /**
     * set search parameters
     */
    onSearchGo() {
        // TODO: specific to component
        let _value = $('#zql-search-input').val();
        this.componentOptions.params.searchOffset = 0;
        this.componentOptions.params.searchText = _value;
        this.componentOptions.params.isAdvancedSearch = true;
    }
    populateGridData() {
        if(this.tcrGridCmp) {
            this.tcrGridCmp.searchOffset = this.componentOptions.params.searchOffset;
            this.tcrGridCmp.searchText = this.componentOptions.params.searchText;
            this.tcrGridCmp.isAdvancedSearch = this.componentOptions.params.isAdvancedSearch;
            this.tcrGridCmp.fetchTestcasesOnSearch(this.tcrGridCmp.searchText);
        }
    }
}
