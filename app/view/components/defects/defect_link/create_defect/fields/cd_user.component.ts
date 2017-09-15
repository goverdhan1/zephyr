import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

import * as CdUserSelect from './cd_user_select.util';


declare var jQuery: any, _;

@Component({
    selector: 'cd-user',
    templateUrl: 'cd_user.html'
})

export class CDUserComponent {
    @Input() field;
    @Input() formkey;
    @Input() projectkey;
    @Input() hideLabel;
    @Input() multiple;
    @Output() onUserSelect: EventEmitter<any> = new EventEmitter();
    @Output() onUserUnselect: EventEmitter<any> = new EventEmitter();
    @Output() onMultiUserUnselect: EventEmitter<any> = new EventEmitter();

    getSelect2Options(field) {
        if(field === 'user') {
        	let selectOptions = _.cloneDeep(CdUserSelect.USER_SELECT_OPTIONS);
            if(selectOptions && selectOptions['ajax'] && selectOptions['ajax']
                && selectOptions['ajax'].hasOwnProperty('queryParams')) {
                selectOptions['ajax']['queryParams'] = {
                    'projectkey' : this.projectkey
                };
            }
            return selectOptions;
        }
        return {};
    }
    userUpdate(value, formKey) {
    	this.onUserSelect.emit({'field': formKey, 'value': value.id});
    }
    userUnselect(value, formKey) {
        this.onUserUnselect.emit({'field': formKey, 'value': value.id});
    }
    multiUserUnselect(value, formKey) {
        this.onMultiUserUnselect.emit({'field': formKey, 'value': value.id});
    }
}
