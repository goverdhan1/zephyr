import {Component, Input, Output, EventEmitter, Inject, AfterViewInit} from '@angular/core';
import {Http} from '@angular/http';
import {JQLService} from '../../../../services/jql.service';

// Constants
import {JQL_FIELDS} from '../../../../mocks/defects.mock';

declare var jQuery: any, _;

@Component({
    selector: 'zee-jql',
    templateUrl: 'jql.html'
})

export class JQLComponent implements AfterViewInit {
    @Input() jqlQuery: String;
    @Input() jqlFieldId: String;
    @Input() hideSubmitButton: Boolean;
    @Output() searchDefectsByJQL: EventEmitter<any> = new EventEmitter();
    @Output() OnEnter: EventEmitter<any> = new EventEmitter();
    jqlFields = [];
    _jqlService;

    constructor(@Inject(Http) private _http: Http) {
        this._jqlService = new JQLService(_http);
        jQuery(document).on('searchByJQL', () => {
            this.searchDefects();
        });
    }

    ngAfterViewInit() {
        this.jqlFields = JQL_FIELDS;
        this.getJQLFields();
    }

    getJQLFields() {
        this.initJQLAutocomplete(this.jqlFields);
        // this._jqlService.getJQLFields().subscribe((fields) => {
        //     fields = JQL_FIELDS; //TODO: To be removed
        //     this.jqlFields = fields;
        //     this.initJQLAutocomplete(fields);
        // }, (error) => {
        //     console.log('Error in fetching fields');
        // });
    }

    inputKeyPress(event) {
      if (event.which == 13 || event.keyCode == 13) {
        this.OnEnter.emit({
          // searchFromButton : true
        });
        return false;
      }
      return true;
    }


  initJQLAutocomplete(fields) {
        jQuery(document).trigger('initJQLAutocomplete', [{
            fieldID: this.jqlFieldId,
            fields: fields,
            errorContainerID: 'jqlerrormsg',
            autoCompleteUrl: '/abcd'
        }]);
    }
    searchDefects() {
        this.searchDefectsByJQL.emit(this.jqlQuery);
    }
}
