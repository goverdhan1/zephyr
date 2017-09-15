import {Component, Input, Output, EventEmitter, ElementRef, AfterViewChecked, OnChanges, OnInit,
    ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import {FormInputValidator} from '../../validators/form_input_validator';
import { UtililtyFunctions as UtilityFunctions} from '../../../utils/scripts/utils';

declare var _, jQuery:any, moment: any;

/*
 * Returns the inline edit behaviour based on the field edit type
 * Usage:
 *   <zephyr-inline-edit
 *      [placeholder]="placeholder"
 *      [field]="field"
 *      [editType]="type"
 *      [fieldOptions]="options"
 *      [selectedOption]="selectedOption"
 *      [editOptions]="editOptions"
 *   >
 *   </zephyr-inline-edit>
 * @Input placeholder* : Placeholder text if value is empty
 * @Input field* : Field value to display
 * @Input editType* : Edit field type: text, textarea,
 *      select, singleselect, multiselect,
 *      singleselect-ajax, multiselect-ajax
 * @Input fieldOptions : Select options, Ajax options
 * @Input selectedOption: previously selected field id
 * @Input editOptions : options passed for multiselect, singleselect
 * @Input forcedHover : To enforced the hover state CSS
 * @Output onSubmit : Event triggered on submit for the parent component to handle it
 * Example:
 *   <zephyr-inline-edit [placeholder]="'Click to add comment'" [field]="testcase.comment" [editType]="'text'"></zephyr-inline-edit>
 *
*/
@Component({
  selector: 'zephyr-inline-edit',
  templateUrl: 'inline_edit.html',
  providers: [UtilityFunctions],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InlineEditComponent implements AfterViewChecked, OnChanges {
    @Input() field;
    @Input() identifier;
    @Input() title;
    @Input() editType;
    @Input() fieldOptions;
    @Input() selectedOption;
    @Input() placeholder;
    @Input() editOptions;
    @Input() maxLength = 100000;
    @Input() saveOnEnter = false;
    @Input() scrollViewMode = false;
    @Input() isRequired: boolean = false;
    @Input() validationPattern: string;
    @Input() maxCount;
    @Input() minCount = 0;
    @Input() tags;
    @Input() forcedHover: boolean = false;
    @Input() _date: any;
    @Output() onSubmit = new EventEmitter();
    id = -1;
    editMode = false;
    selectedValue;
    originalValue: '';
    validationForm : FormGroup;
    editingStarted = false;
    timeChanged = false;
    _previousValue;
    _previousSelected;
    private _value;
    private _datePipe;
    private selectedDebounce;
    constructor(private formBuilder: FormBuilder, private el: ElementRef, private cdr: ChangeDetectorRef, private utils: UtilityFunctions) {
        this._datePipe = new DatePipe('en-US');
        this.fieldOptions = [];
        this.setValidations();
    }
    ngOnChanges(changedNode) {
        if (this.id === 0) {
          this.id = Date.now();
        }

        this._value = this.field;
        this.originalValue = this.field;
        if (this.field) {
            this._previousValue = JSON.parse(JSON.stringify(this.field));
        }
        this.setValidations();

        this.selectedOption = this.selectedOption ? Array.isArray(this.selectedOption) ? this.selectedOption : [this.selectedOption] : [];
        if (this.isSelect() && changedNode.selectedOption) {
            if (!_.isEqual(changedNode.selectedOption.previousValue, changedNode.selectedOption.currentValue)) {
                let selectedOption = this.selectedOption.map(item => isNaN(Number(item)) ? item : Number(item));
                setTimeout(() => {
                    if (this.editMode) {
                        this.onClickCancel();
                    }
                    this.selectedValue = this.setMultipleAttr() ? selectedOption : selectedOption[0];
                }, 10);
            } else {
                if (this.selectedDebounce) {
                    clearTimeout(this.selectedDebounce);
                }
                this.selectedDebounce = setTimeout(() => {
                    this.selectedDebounce = null;
                    if (this.editMode) {
                        this.onClickCancel();
                    }
                }, 10);
            }
        }


        if (this.editType === 'date') {

          if (this.field.length) {
            this.field = moment(this.field, 'YYYY-MM-DD').valueOf();
            this._date = new Date(moment(this.field).valueOf());
          } else if (_.isNumber(this.field)) {
            this._date = _.clone(this.field);
          } else {
            this._date = '';
          }

        }
    }

    ngAfterViewChecked() {
        if(!this.editingStarted) {
            return;
        }
        let $inputEl = jQuery(this.el.nativeElement).find('.js-zephyr-inline-edit-' + this.editType);
        if(this.editType === 'date') {
            $inputEl.addClass('aui-date-picker');
        }
        if (this.isSelect()) {
            if(this.fieldOptions) {
                this.fieldOptions = this.fieldOptions.map((option) => {
                    let newOption = {
                        id: null,
                        text: null
                    };
                    newOption.id = option.id;
                    if (option.color) {
                        newOption['color'] = option.color;
                    }
                    newOption.text = option.text || option.value;
                    return newOption;
                });
            }

          if (this.selectedOption.length && !this.fieldOptions.length && !this.setMultipleAttr()) {

              if (_.isNumber(this.selectedOption[0])) {
                this.fieldOptions = [
                  {
                    id : this.selectedOption,
                    text : this._value
                  }
                ];
              } else {
                this.fieldOptions = [
                  {
                    id : 1,
                    text : this.selectedOption[0]
                  }
                ];

                this.selectedOption = [1];
              }

          }

        }

        setTimeout(() => {
            $inputEl.focus();
        });
        this.editingStarted = false;
    }

    isSelect() {
        return (/select/i).test(this.editType);
    }
    setMultipleAttr() {
        return (/multiselect/i).test(this.editType);
    }
    setValidations() {
        if (this.isRequired && this.validationPattern) {
            this.validationForm = this.formBuilder.group({
              'field' : [this._value, Validators.compose([Validators.required, Validators.pattern(this.validationPattern), FormInputValidator.invalidateOnlySpaces])],
            });
        } else if (this.isRequired) {
            this.validationForm = this.formBuilder.group({
              'field' : [this._value,  Validators.compose([Validators.required, FormInputValidator.invalidateOnlySpaces])],
            });
        } else if (this.validationPattern) {
            this.validationForm = this.formBuilder.group({
              'field' : [this._value, Validators.pattern(this.validationPattern)],
            });
        } else {
            this.validationForm = this.formBuilder.group({
              'field' : [this._value],
            });
        }
    }

    inputKeyPress($event, isInvalid) {
      if ($event.which == 13 || $event.keyCode == 13) {
        this.onTextFocusout($event, isInvalid);
        return false;
      }
      return true;
    }

    validateEditType(types) {
        return types.indexOf(this.editType) > -1;
    }
    stopPropagation($event) {
        $event.stopPropagation();
    }
    showEdit() {
        jQuery('.zephyr-editable-field').addClass('active');
        this.field = this.field || null;
        this.editMode = true;
        this.editingStarted = true;
        this._previousValue = JSON.parse(JSON.stringify(this.field));
        this._previousSelected = JSON.parse(JSON.stringify(this.selectedOption || {}));

        setTimeout(() => {
          if(jQuery(this.el.nativeElement).find('.zui-ng-select').length) {
            if (this.editType.indexOf('multiselect') === -1 && !jQuery(this.el.nativeElement).find('select').data('select2')) {
              jQuery(this.el.nativeElement).find('select').select2({
                allowClear: true,
                placeholder: ' '
              });
            }

            setTimeout(() => {
              jQuery(this.el.nativeElement).find('select').select2('open');
            });
          }

          if(jQuery(this.el.nativeElement).find('.zui-ng-multi-select').length) {
            jQuery(this.el.nativeElement).find('.multiselect.dropdown-toggle').trigger('click');
          }
        }, 100);
    }

    saveDate(event, value) {
      if (this.field === null || moment(event).valueOf() !== this.field) {
        this.field = event;
        this.onSubmit.emit(moment(event).valueOf());
        this.editMode = false;
      }
    }

    onSelect(ev, isInvalid) {
        if (this.editMode) {
            if (this.setMultipleAttr()) {
                this.selectedValue.push(ev.id);
            } else {
                this.selectedValue = ev.id;
                this.onClickSave(ev, isInvalid);
            }
        }
    }
    onUnselect(ev, isInvalid) {
        if (this.editMode) {
            if (this.setMultipleAttr()) {
                this.selectedValue = this.selectedValue.filter(item => item !== ev.id);
            } else {
                this.selectedValue = null;
                this.onClickSave(ev, isInvalid);
            }
        }
    }
    onToggleSelect(ev, isInvalid) {
        if (this.editMode && !this.setMultipleAttr() && ev.type === 'close') {
            this.editMode = false;
            // this.selectedValue = ev.id !== undefined ? ev.id : null;
            // this.onClickSave(ev.ev, isInvalid);
        }
    }
    onSelectSubmit(isInvalid) {
        this.onClickSave({}, isInvalid);
    }
    saveEdit() {
        jQuery('.zephyr-editable-field').removeClass('active');
        let inlineInpueEl, _inputValue;
        if (this.isSelect()) {
            inlineInpueEl = jQuery(this.el.nativeElement).find('.inline-edit-select select');
            if (this.setMultipleAttr()) {
                _inputValue = (this.selectedValue || []).join(',');
            } else {
                _inputValue = (this.selectedValue || this.selectedValue == 0) ? this.selectedValue :  '';
            }
        } else {
           inlineInpueEl = jQuery(this.el.nativeElement).find('.js-zephyr-inline-edit-' + this.editType);
           if(this.editType == 'duration' && !this.timeChanged) {
                this.editMode = false;
                return;
           } else {
                _inputValue = this.selectedValue || inlineInpueEl.val();
           }
        }

        if(this.isRequired && !_inputValue) {
            inlineInpueEl.addClass('error');
            inlineInpueEl.attr('title', 'Value is required');
            return;
        }
        if(_inputValue && _inputValue.length > this.maxCount) {
             inlineInpueEl.addClass('error');
             inlineInpueEl.attr('title', 'Count exceeded ' + this.maxCount);
             return;
        } else if(this.minCount && _inputValue && _inputValue.length < this.minCount) {
            inlineInpueEl.addClass('error');
            inlineInpueEl.attr('title', 'This is shorter than minimum allowed length of ' + this.minCount);
            return;
        } else {
            inlineInpueEl.removeClass('error');
            inlineInpueEl.attr('title', '');
            this.editMode = false;
        }

        if (this.editType === 'multiselect-checkbox') {
          _inputValue = this._value;
        }

        this.timeChanged = false;
        if(_inputValue !== this._value) {
            this.onSubmit.emit(_inputValue);
        }
        if(this.cdr) { this.cdr.markForCheck(); }

        setTimeout(() => {
          this.editMode = false;
        }, 10);
    }

    onChangeMultiSelect(event) {
        this._value = event.selection;
    }

    onClickSave(ev, isInValid) {

        if (ev.preventDefault instanceof Function) {
            ev.preventDefault();
        }

        if (!isInValid) {
            this.saveEdit();
        } else {
            this._value = this.originalValue;
        }

    }
    onClickCancel(ev?) {
        if (ev && ev.preventDefault instanceof Function) {
            ev.preventDefault();
        }
        this.editMode = false;
        jQuery('.zephyr-editable-field').removeClass('active');

        if (ev) {
            let isSelect = jQuery(ev.target).closest('.save-options').prev().find('zee-select');
            if (isSelect.length && !isSelect.find('select').prop('multiple')) {
                // if single select zee-select, do not change values as not required [ZEPHYR-15619]
                return;
            }
        }

        this.field = this._previousValue;
        this.selectedOption = this._previousSelected;
    }
    onTextFocusout(ev, isInValid) {
        setTimeout(() => {
            if(!this.editMode) {
                return;
            }

            this.onClickSave(ev, isInValid);
        }, 300);
    }
    onDurationUpdate(value) {
        this.selectedValue = value;
        this.timeChanged = true;
    }
    getDateField(field) {
        if (field instanceof Date) {
            return this.utils.parseDate(field.getTime());
        }

        if (_.isNumber(field)) {
            return this.utils.parseDate(field);
        }

        return this.field && this.field.length ? this._datePipe.transform(field) : '';
    }
}
