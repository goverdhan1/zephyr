import { Component, EventEmitter, Input, OnChanges, Output, AfterViewInit } from '@angular/core';

declare var $;
import {ZQLSearchComponent} from  './zql_search.component';
// Constants
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
// declare var _:any, $: any, zqlParserHandler: any;

/**
 * <zui-zephyr-search
    [releaseId]="releaseId"
    [zqlEntityName]="'testcase'"
    [hideHeader]="hideHeader"
    [isAdvancedSearch]="isAdvancedSearch"
    [showFilters]="showFilters"
 * ></zui-zephyr-search>
 * @param releaseId
 * @param zqlEntityName : 'testcase' || 'requirement' || 'testSchedule'
 * @param showFilters
 * @param isAdvancedSearch
 * @param hideHeader: true/false whether to show or hide header
 * @Output onSearchGo
 */
@Component({
	selector: 'zui-zephyr-search',
	templateUrl: 'zephyr_search.html'
})

export class ZephyrSearchComponent implements AfterViewInit, OnChanges {
    // Declarations
    @Input() hideHeader: boolean;
    @Input() searchText: string;
    @Input() releaseId : number;
    @Input() searchFieldSrcId: string;
    @Input() fullWidthText = false;
    @Input() zqlEntityName: string;
    @Input() showFilters: boolean;
    @Input() isAdvancedSearch: boolean;
    @Input() hideGoButton: boolean;
    @Input() searchOnChange: boolean = true;
    @Output() onSearchGo: EventEmitter<any> = new EventEmitter();

    // Constants
    i18nMessages = I18N_MESSAGES;

    private _txtSearchValue = '';

    ngAfterViewInit() {
        this._txtSearchValue = this.searchText || '';
    }
    ngOnChanges(changedNode) {
        this._txtSearchValue = this.searchText || '';
    }
    /**
     * Toggle between advanced and quick search
     */
    toggleSearchType(value) {
        this.isAdvancedSearch = value;
        this._txtSearchValue = '';

        if (this.searchOnChange) {
          let _params = {
            isAdvancedSearch: this.isAdvancedSearch,
            value: null
          };
          this.onSearchGo.emit(_params);
        }
    }
    onGoClick(value) {
        let _params = {
            isAdvancedSearch: this.isAdvancedSearch,
            value: value
        };
        this.onSearchGo.emit(_params);
    }
    onQuickKeyup(ev) {
        if(ev.keyCode == $.ui.keyCode.ENTER) {
            ev.preventDefault();
            this.onGoClick($('#zui-search-quick').val());
        }
    }

    keyDownFunction(event) {
      if(event.keyCode == 13) {
        this.onGoClick(this._txtSearchValue);
      }
    }

    onZQLGo(zql) {
        this.onGoClick(zql);
    }
}
