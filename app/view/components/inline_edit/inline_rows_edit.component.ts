import {Component, Input, Output, EventEmitter, ElementRef, AfterViewChecked, OnChanges, OnDestroy} from '@angular/core';
import {AutosizeDirective} from '../common/autosize/autosize.directive';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
declare var _, jQuery;

/*
 * Returns the inline edit behaviour based on the field edit type
 * Usage:
 *   <zephyr-inline-rows-edit
 *      [fieldOptions]="fieldOptions"
 *      [fields]="fields"
 *   >
 *   </zephyr-inline-rows-edit>
 * @Input fieldOptions* : field options
 * @Input fields* : Fields value to be displayed
 * @Input editable* : Fields value is editable or not
 * @Input allowCreate* : Allow create or not
 * @Output onCreateSubmit : Event triggered on create submit for the parent component to handle it
 * @Output onEditSubmit : Event triggered on update submit for the parent component to handle it
 * @Output onReorderSubmit : Event triggered on reorder submit for the parent component to handle it
 * Example:
 *   <zephyr-inline-rows-edit
 [fieldOptions]="fieldOptions"
 [fields]="fields"
 (onSubmit)="saveSteps($event)"
 ></zephyr-inline-rows-edit>
 *
 */
@Component({
  selector: 'zephyr-inline-rows-edit',
  templateUrl: 'inline_rows_edit.html'
})

export class InlineRowsEditComponent implements AfterViewChecked, OnChanges, OnDestroy {

  @Input() fieldOptions;
  @Input() fields;
  @Input() editable;
  @Output() onCreateSubmit = new EventEmitter();
  @Output() onEditSubmit = new EventEmitter();
  @Output() onBulkSubmit = new EventEmitter();
  @Output() onReorderSubmit = new EventEmitter();
  @Output() onDeleteSubmit = new EventEmitter();
  @Output() onDirtyCheck = new EventEmitter();
  @Output() onSendFieldsData = new EventEmitter();

  testStep = '';
  testData = '';
  testResult = '';

  dirtyFields = {};
  inlineParentEl;
  createRow = {};
  addMode = false;
  editMode = false;
  testStepsFormGroup: FormGroup;
  editingStarted = false;
  showModal = false;
  modalOptions:any = {};
  cloneFields = [];
  copyfieldsFlag = false;
  previousFields;

  constructor(private el: ElementRef) {
    this.inlineParentEl = jQuery(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.onClickCancelStep();
  }
  ngOnChanges(changedNode) {
    let fields = changedNode.fields;
    if (_.isObject(fields)) {
      this.copyfieldsFlag = this.copyfieldsFlag && _.isEqual(fields.currentValue, fields.previousValue);
      this.testResult = '';
      this.testStep = '';
      this.testData = '';
    }
    this.previousFields = this.removeExtraFields();
  }

  ngAfterViewChecked() {
    if(this.showModal) {
      jQuery('#zee-operation-modal-' + this.modalOptions['id']).modal('show').on('shown.bs.modal', () => {
        this.showModal = false;
      });
    }
  }

  customTrackBy(index: number, obj: any): any {
    return obj.orderId;
  }

  showEdit(field, column, event) {
    if(!this.copyfieldsFlag) {
      this.createCopy();
    }
    this.fields.forEach(fld => {

      jQuery('#zee-test-rows tr#zephyr-editable-row-'+ fld.orderId +' textarea:visible').each((index, thisField) => {
        let _fieldKey = jQuery(thisField).data('key'),
          _fieldValue = (thisField.value || '').trim();

        fld[_fieldKey] = _fieldValue;
      });

      if (fld.id !== field.id) {
        fld.editMode = false;
      }

    });

    field.editMode = true;

    this.editMode = true;

    setTimeout(() => {
      jQuery(event.target).closest('.zephyr-editable-row-td').find('textarea').trigger('click').focus();
    });
  }

  onChange(ev) {
    let id = jQuery(ev.target).closest('tr').prop('id').substr(-1);
    if (!id) {
        // change is in the "new" row
        if (this.testStep || this.testData || this.testResult) {
            this.dirtyFields['new'] = true;
        } else {
            delete this.dirtyFields['new'];
        }
    } else {
        this.dirtyFields[id] = true;
    }
    this.onDirtyCheck.emit(this.dirtyFields);
  }

  onClickCancelStep() {
    this.testData = '';
    this.testStep = '';
    this.testResult = '';
    this.fields = JSON.parse(this.previousFields);
    this.dirtyFields = {};
    this.onDirtyCheck.emit(this.dirtyFields);
  }

  checkUnsavedData() {
    return this.fieldOptions.columns.filter(column => column.allowEdit).filter(field => (this.inlineParentEl.find('textarea#zee-add-' + field.id).val() || '').length).length;
  }

  onClickBulkUpdate(ev) {
    if (this.checkUnsavedData()) {
      this.onClickAdd(null);
    }

    let _fieldJSON = (this.fields) ? JSON.parse(JSON.stringify(this.fields)) : [];
    if(_fieldJSON && _fieldJSON.length) {
      let localId = 0;
      _fieldJSON.forEach(field => {
        delete field.editMode;
        field.orderId = ++localId;
        jQuery('#zee-test-rows tr#zephyr-editable-row-'+ field.orderId +' textarea:visible').each((index, thisField) => {
          let _fieldKey = jQuery(thisField).data('key'),
          _fieldValue = jQuery(thisField).val().trim();
          field[_fieldKey] = _fieldValue;
        });
      });
    }

    this.fieldOptions.columns.filter(column => column.allowEdit).forEach(thisField => {
        this.inlineParentEl.find('textarea#zee-add-' + thisField.id).val('');
    });

    console.debug('fields have', this.fields, _fieldJSON, this.createRow);
    this.dirtyFields = {};
    this.onDirtyCheck.emit(this.dirtyFields);
    this.onBulkSubmit.emit(_fieldJSON);

    this.testStep = '';
    this.testData = '';
    this.testResult = '';
  }

  escapeTags(pieces, ...substitutions) {
      // console.log(string, val);
      let reEscape = /[&<>'"]/g,
          oEscape = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
          };

      let fnEscape = m => oEscape[m];
      let result = substitutions.map((substitution, index) => String.prototype.replace.call(substitution, reEscape, fnEscape) + pieces[index + 1]);

      return pieces[0] + result.join('');
  }


  getTextField(val) {
    // replace new line character by <br> and wrap each line in span
    //escaping tags using tagged template literals to allow HTML unsafe characters
    return (val || '').split(/\r|\n/).map(item => '<span>' + this.escapeTags`${item}` + '</span>').join('<br/>');
  }
  onClickAdd(ev) {
    // this.addMode = true;
    this.createRow = {};
    let _editableFields = this.fieldOptions.columns.filter(column => column.allowEdit);
    _editableFields.forEach(field => {
      let $textareaEl = this.inlineParentEl.find('textarea#zee-add-' + field.id);
      this.createRow[field.key] = $textareaEl.val();
      $textareaEl.val('');
    });
    this.inlineParentEl.find('textarea#zee-add-' + _editableFields[0].id).focus();
    let orderId = this.fields ? this.fields.length + 1 : 1;
    this.createRow['orderId'] = orderId;
    if(this.fields && this.fields.length) {
      this.createRow['orderId'] = this.fields.length + 1;
    } else {
      this.fields = [];
      this.createRow['orderId'] = 1;
    }
    this.fields.push(this.createRow);
    let ele = document.getElementById('zee-test-rows');
    let scrollHeight = ele.scrollHeight;
    jQuery(ele).animate({scrollTop: scrollHeight}, 'slow');

    this.onSendFieldsData.emit(this.fields);
    this.dirtyFields[orderId] = true;
    delete this.dirtyFields['new'];
    this.onDirtyCheck.emit(this.dirtyFields);
  }

  onClickDelete(operation, stepId) {

    if(_.isObject(operation) && operation.showConfirmation) {
      this.modalOptions = operation.confirmationOptions || {};
      this.modalOptions['stepId'] = stepId;
      this.showModal = true;
    }
  }

  onClickReset(operation, stepId) {

    if(_.isObject(operation) && operation.showConfirmation) {
      this.modalOptions = operation.confirmationOptions || {};
      this.modalOptions['stepId'] = stepId;
      this.showModal = true;
    }

  }

  onClickContextAction(operation, stepId) {
    //  console.log('event and step id', operation, stepId);
    jQuery('.inline-dialog-body:visible').trigger('click');
    switch (operation.id) {
      case 'delete':
        this.onClickDelete(operation, stepId);
        break;

      case 'reset':
        this.onClickReset(operation, stepId);
        break;
    }
  }

  createCopy() {
    this.cloneFields = JSON.parse(JSON.stringify(this.fields));
    this.copyfieldsFlag = true;
  }

  onClickModalAction(action, stepId) {
    switch (action) {
      case 'Delete':
        this.onClickModalDelete(stepId);
        break;

      case 'Yes':
        if(!this.copyfieldsFlag) {
          this.createCopy();
        }
        this.onClickModalReset(stepId);
        break;
    }
  }

  onClickModalReset(stepId) {
    //  console.log('this should reset the fields', this.fields, this.cloneFields, stepId);
    let match = this.cloneFields.filter(fld => fld.id === stepId)[0];

    if(match) {
      delete this.dirtyFields[match.orderId];
      this.onDirtyCheck.emit(this.dirtyFields);
      this.fields.forEach(fld => {
        if(fld.id === stepId) {
          fld['step'] = match['step'];
          fld['data'] = match['data'];
          fld['result'] = match ['result'];
        }
      });
    }

    jQuery('#zee-operation-modal-' + this.modalOptions['id']).modal('hide');
  }

  gridRowDrag(ev,index) {
    ev.dataTransfer.setData('text', index.toString());
  }

  gridRowAllowDrop(ev) {
    ev.preventDefault();
  }

  sortList (arr, old_index, new_index) {
    if (new_index >= arr.length) {
      let k = new_index - arr.length;
      while ((k--) + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
  };

  reorderList() {
    let localId = 0;
    this.fields.forEach(field => {
      field.orderId = ++localId;
    });
  }

  gridRowDrop(ev , rowRef , index) {
    ev.preventDefault();
    let rowIndex = ev.dataTransfer.getData('text');

    rowIndex = parseInt(rowIndex);

    this.sortList(this.fields, rowIndex, index);
    console.debug('get me the orderId', rowIndex, index, this.fields);
    this.reorderList();
    this.fields = _.sortBy(this.fields, 'orderId');

  }

  onClickModalDelete(stepId) {
    if(this.fields && this.fields.length && stepId) {
      this.fields = this.fields.filter(step => step.id !== stepId);
    }
    this.reorderList();

    this.onDeleteSubmit.emit(this.fields);
    this.onDirtyCheck.emit(this.dirtyFields);
    jQuery('#zee-operation-modal-' + this.modalOptions['id']).modal('hide');
  }
  isFormValid() {
    return this.previousFields === this.removeExtraFields() && !this.fields.some(item => item.editMode) && !(
      this.testStep.length || this.testData.length || this.testResult.length
    );
  }
  removeExtraFields() {
    return JSON.stringify((JSON.parse(JSON.stringify(this.fields))).map(item => {
      delete item.editMode;
      return item;
    }));
  }
}
