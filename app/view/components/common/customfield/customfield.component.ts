import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
declare var _:any, jQuery:any, moment: any;

import {InputFieldComponent} from './input_field.component';
import {TextareaFieldComponent} from './textarea_field.component';
import {SelectFieldComponent} from './select_field.component';

import {ZephyrStore} from '../../../../store/zephyr.store';
import {GlobalAction} from '../../../../actions/global.action';

import {CUSTOM_FIELD_TYPES} from '../../../../utils/constants/application.constants';
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';

@Component({
    selector: 'zee-custom-fields',
    templateUrl: 'customfield.html',
    providers: [GlobalAction],
    styles: [`
        .zee-column-value {
            width: 150px;
            display: inline-block;
        }
    `]
})

export class CustomFieldComponent implements OnChanges {
    @Input() editable;
    @Input() customFields = [];
    @Input() customFieldTypes = [];
    @Input() customProperties = {};
    zephyrStore;
    @Output() onCustomPropertiesUpdate: EventEmitter<any> = new EventEmitter();
    entityCustomFields;
    errorFieldValue;
    errorFieldName;
    CUSTOM_FIELD_TYPES = CUSTOM_FIELD_TYPES;
    i18nMessages = I18N_MESSAGES;

    constructor(private globalAction: GlobalAction) {
      this.zephyrStore = ZephyrStore.getZephyrStore();

      this.zephyrStore.subscribe(() => {
          this.entityCustomFields = this._parseCustomFields();
          let state = this.zephyrStore.getState();
          if ('SHOW_UNIQUE_CUSTOM_FIELD_ERROR' === state.customField.event) {
            let fieldError = JSON.parse(JSON.stringify(state.customField.fieldError));
            this.errorFieldValue = fieldError.colValue;
            let customField = this.entityCustomFields.filter(item => item.fieldName === `zcf_${fieldError.key}`)[0];
            this.errorFieldName = (customField || {}).displayName;
            jQuery('#custom-field-error-modal').modal('show');
            setTimeout(() => {
                this.zephyrStore.dispatch(this.globalAction.clearCustomFieldEvent());
            });
          }
      });

    }

    ngOnChanges(changedNode) {
        this.entityCustomFields = this._parseCustomFields();
    }

    formatTextFieldValues(customField, dataType) {
        let value = customField.entityValue;
        return {
            type: 'text',
            dataType: dataType,
            name: customField.fieldName,
            id: customField.id,
            value: dataType === 'date' ? value ? moment(value).format('YYYY-MM-DD') : '' : value,
            length: customField.length
        };
    }
    formatCheckboxFieldValues(customField) {
        return {
            type: 'checkbox',
            name: customField.fieldName,
            id: customField.id,
            value: customField.entityValue,
            label: 'null'
        };
    }

    formatSelectFieldValues(customField) {
        return {
            type: 'select',
            name: customField.fieldName,
            id: customField.id,
            value: customField.entityValue,
            length: customField.length,
            fieldValues: customField.fieldValues || []
        };
    }

    formatLongTextFieldValues(customField) {
        return {
            type: 'textarea',
            name: customField.fieldName,
            id: customField.id,
            value: customField.entityValue,
            length: customField.length
        };
    }

    saveCFTextValue(value, type) {
        let key = Object.keys(value)[0];
        let val = value[Object.keys(value)[0]];

        let customField = _.filter(this.customFields, {columnName : key})[0];

        if (type === 'number' && !val) {
            // for empty number send null
            value[Object.keys(value)[0]] = null;
        }

        if (type === 'date' && !(_.isNumber(val) || null === val)) {
            return;
        }

        if (customField && customField.mandatory && !String(val || '').length) {
            this.globalAction.showMandatoryFieldError([customField]);
        } else if (customField) {
            this.onCustomPropertiesUpdate.emit(value);
        }
    }

    saveCFCheckboxValue(value) {
        this.onCustomPropertiesUpdate.emit(value);
    }
    saveCFPicklistValue(values) {
        Object.keys(values).forEach(value => {
            values[value] = values[value] ? Number(values[value]) : null;
        });
        this.onCustomPropertiesUpdate.emit(values);
    }
    isChecked(customfield) {
      return customfield.entityValue;
    }
    private _parseCustomFields() {
        /**
         * For every customfield of the entity map the type and entity properties
         */
         let _mappedCustomFieldProperties;
         if (Array.isArray(this.customFields) && this.customFields.length) {
             _mappedCustomFieldProperties = this.customFields.map(_customfield => {
                 let _fieldTypeMetadata = _customfield.fieldTypeMetadata;
                 let _customFieldType = _.pickBy(this.customFieldTypes, fieldtype => fieldtype.id === _fieldTypeMetadata);
                 _customfield.typeMetaData = _.values(_customFieldType)[0];

     			if (_.keys(this.customProperties).length) {
     				let entityValue;
     				if ('Picklist' === (_customfield.typeMetaData || {}).dataType) {
     					if (Array.isArray(_customfield.fieldValues)) {
     						let entityArrayValue = _customfield.fieldValues.filter(value => {
                                let val = Number(this.customProperties[_customfield.fieldName]);

     							return value.id === this.customProperties[_customfield.fieldName] ||
                                     value.id === String(this.customProperties[_customfield.fieldName]);
     						});
     						if (Array.isArray(entityArrayValue) && entityArrayValue.length) {
     							entityValue = entityArrayValue[0].text;
     						}
                        }
     				} else {
     					entityValue = this.customProperties[_customfield.fieldName];
     				}
     				// Fix for ZEPHYR-13583, formatting the date
                    if(entityValue && _customfield.typeMetaData && _customfield.typeMetaData.dataType == 'Date') {
                        _customfield.entityValue = moment(entityValue).format('MM/DD/YYYY');
                    } else {
                        _customfield.entityValue = entityValue;
                    }
     			} else {
                    _customfield.entityValue = '';
                }
                 return _customfield;
             });
         }
        return _mappedCustomFieldProperties || [];
    }
}
