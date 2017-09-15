import {Component, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';

// Constants
import {I18N_MESSAGES} from '../../../../../../utils/messages/messages.en';

declare var jQuery: any, _;

@Component({
    selector: 'defects-advanced-search-finder',
    templateUrl: 'defects_advanced_search_finder.html'
})

export class DefectsAdvancedSearchFinderComponent implements AfterViewInit {
    @Input() filters;
    @Input() hiddenOptions = [];
    @Input() selectedSearchCriteria;
    @Input() isFileNewDefect;
    @Input() type;
    @Input() selectedFilter:any = '';
    @Input() jqlQuery:String = '';
    @Output() onSearchDefectById: EventEmitter<any> = new EventEmitter();
    @Output() onSearchDefectsByJQL: EventEmitter<any> = new EventEmitter();
    @Output() onSearchDefectsByFilters: EventEmitter<any> = new EventEmitter();
    @Output() onSelectedSearchCriteriaChange: EventEmitter<any> = new EventEmitter();
    @Output() showFileNewDefectDialog: EventEmitter<any> = new EventEmitter();
    @Output() searchFromButton: EventEmitter<any> = new EventEmitter();
    @Output() setFolderstructure: EventEmitter<any> = new EventEmitter();

     accessFolderTypes = [
        {id: 0, text: 'Sub Folder Name'},
        {id: 1, text: 'Priority'},
        {id: 2, text: 'Component'},
        {id: 3, text: 'Environment'},
        {id: 4, text: 'FixVersions'},
        {id: 5, text: 'AffectVersions'},
        {id: 6, text: 'IssueType'},
        {id: 7, text: 'Status'},
        {id: 8, text: 'Project'}
    ];
    selectedAccessFolderType = [0];
    selectedAccessFolderName;
    defectId;
    jqlFieldId = 'searchDefectsJQL';
    searchOptions;
    i18nMessages = I18N_MESSAGES;
    private isPagination;
    ngAfterViewInit() {
        this.searchOptions = [{
            id: 'id', text: 'Defect Id'
        }, {
            id: 'jql', text: 'JQL'
        }, {
            id: 'filters', text: 'My Filters'
        }];
        this.searchOptions = this.searchOptions.filter(option => !~this.hiddenOptions.indexOf(option.id));

        this.selectedSearchCriteria = this.selectedSearchCriteria || this.searchOptions[0].id;
    }
    onFilterChange(selectedVal) {
        this.selectedFilter = selectedVal.id;
    }
    unSelectFilter() {
        this.selectedFilter = null;
    }
    onSearchCriteriaChange(selectedVal) {
      this.selectedSearchCriteria = selectedVal.id;
      this.onSelectedSearchCriteriaChange.emit(this.selectedSearchCriteria);
    }
    updateTopFolderVal(event){
      this.setFolderstructure.emit({'topFolderName':event.target.value,'subFolder':this.selectedAccessFolderName});
    }

    setAccessFolderType(event) {
        this.selectedAccessFolderType = [event.id];
        let topFolderName = jQuery('#fldrnm').val();
        this.selectedAccessFolderName = event.text;
        this.setFolderstructure.emit({'topFolderName':topFolderName,'subFolder':this.selectedAccessFolderName});
  }
    searchDefectById() {
        let isPagination = this.isPagination;
        let defectId = this.defectId;
        this.onSearchDefectById.emit({isPagination, defectId});
    }
    searchDefectsByJQL(jqlQuery) {
        let isPagination = this.isPagination;
        this.onSearchDefectsByJQL.emit({isPagination, jqlQuery});
    }
    searchDefectsByFilters() {
        let selectedFilter = this.selectedFilter;
        let isPagination = this.isPagination;
        this.onSearchDefectsByFilters.emit({isPagination, selectedFilter});
    }
    searchDefects(obj) {
        if(obj && !obj.hasOwnProperty('searchFromButton')) {
            this.searchFromButton.emit();
        }
        this.isPagination = obj.isPagination || false;
        let selectedSearchCriteria = this.selectedSearchCriteria;
        if(selectedSearchCriteria === 'id') {
            this.searchDefectById();
        } else if(selectedSearchCriteria === 'jql') {
            jQuery(document).trigger('searchByJQL');
        } else if(selectedSearchCriteria === 'filters') {
            this.searchDefectsByFilters();
        }
    }
    openFileNewDefectDialog() {
        this.showFileNewDefectDialog.emit();
    }
  inputKeyPress(event) {
    if (event.which == 13 || event.keyCode == 13) {
      this.searchDefects(event);
      return false;
    }
    return true;
  }
}
