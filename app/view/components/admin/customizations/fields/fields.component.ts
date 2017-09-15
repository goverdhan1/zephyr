import {Component, OnDestroy, AfterViewInit, Input, Output, EventEmitter, OnChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {AdminAction} from '../../../../../actions/admin.action';
import {ADD_FIELD_SUCCESS, EDIT_FIELD_SUCCESS} from '../../../../../utils/constants/action.events';
import {REQ_FIELDS_GRID_TYPE, TST_FIELDS_GRID_TYPE} from '../../../admin/customizations/customizations.constant';
import {GridComponent} from "../../../grid/grid.component";

declare var jQuery: any, moment: any, _;

const PICKLIST_ID = 3;  //considering to be always fixed;
const NUMBER_ID = 10;  //considering to be always fixed;
const DATE_ID = 5;  //considering to be always fixed;
const TEXT_ID = 1;
const LONG_TEXT_ID = 2;

const TEXT_FIELD_LENGTH = 1024;
const LONG_TEXT_FIELD_LENGTH = 32000;

const REQUIREMENT = 'Requirement'; //considering to be always fixed;
const TESTCASE = 'Testcase';  //considering to be always fixed;

const NO_ACTION = 'NO_ACTION';
const LOCK_ACCESS = 'LOCK_ACCESS';
const DELETE_FIELD_SECOND = 'DELETE_FIELD_SECOND';
const DELETE_FIELD_FIRST = 'DELETE_FIELD_FIRST';
const CLOSE_FIELDS_MODAL = 'CLOSE_FIELDS_MODAL';
const HIDE_FIELDS_MODAL = 'HIDE_FIELDS_MODAL';
const CONFIRM_LOCK_ENABLE = 'CONFIRM_LOCK_ENABLE';
const ADD_FIELD_CONTINUE = 'ADD_FIELD_CONTINUE';
const ADD_FIELD = 'ADD_FIELD';

@Component({
  selector: 'fields-modal',
  viewProviders: [AdminAction],
  templateUrl: 'fields.html',
})

export class FieldsModalComponent implements AfterViewInit, OnDestroy, OnChanges  {
    @ViewChild(GridComponent) gridComponent: GridComponent;
    @Input() isRequiremntModal;
    @Output() confirmationDialogueData: EventEmitter<any> = new EventEmitter();
    zephyrStore;
    state;
    unsubscribe;
    fieldsForm;
    fieldsGridType;
    fieldsGrid;
    filedsMetadata;
    adminPref;
    lockStatusId;
    lockStatusText;
    isFieldAdd: boolean = false;
    isFieldEdit: boolean = false;
    isZephyrAccessLocked: boolean = false;
    isPicklistSelected: boolean = false;
    isViewFieldDetails: boolean = false;
    isDateSelected: boolean = false;
    pickListValues = [];
    pickListValue: string ='';
    selectedFieldObject = {};
    asyncValidation = true;
    fieldIdToBeDeleted;
    loggedInUser;
    //flags for searchable field
    isSearchFieldValueAccepted: boolean = false;
    isSearchableChecked: boolean = false;
    searchableFieldStoreUpdate:boolean = false;
    isSearchableFieldAcceptable: boolean = false;
    userProjects = [];
    selectedProjects = [];
    selectId = 'projects';
    checkSearchField = false;

    constructor(fb: FormBuilder, private _adminAction: AdminAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.fieldsGridType = REQ_FIELDS_GRID_TYPE;
        this.loggedInUser = this.zephyrStore.getState().loggedInUser;
        this.fieldsGrid = this.zephyrStore.getState().fields.fieldsGrid;

        this.fieldsForm = fb.group({
            fieldName: [''],
            displayName: ['', Validators.compose([Validators.required, this.validateFieldsName])],
            fieldTypeMetadata: [''],
            mandatory: [false],
            importable: [true],
            exportable: [true],
            searchable: [false],
            searchFieldName: [''],
            description: [''],
            hiddenPicklistValues: [''],
            projectCheck: [false],
            unique:['']
        });


        this.unsubscribe = this.zephyrStore.subscribe(() => {
            let state = this.zephyrStore.getState();
            this.userProjects = (state.projects.projects || []).map(item => ({
                id: item.id,
                text: item.name
            }));
            this.loggedInUser = state.loggedInUser;
            this.adminPref = state.adminPref;

            if (!this.checkSearchField) {
                this.initFieldsData(state);
            }
            this.checkSearchField = false;
            this.state = state.fields;
            this.asyncValidation = this.state['isSearchFieldValueAccepted'];
        });
    }

    ngOnChanges(changes) {
      if (this.isRequiremntModal) {
        this.fieldsGridType = REQ_FIELDS_GRID_TYPE;
      } else {
        this.fieldsGridType = TST_FIELDS_GRID_TYPE;
      }

      this.gridComponent.ngAfterViewInit();
    }

    validateFieldsName(c: FormControl) {
      return c.value && c.value.trim().length >= 1 && c.value.trim().length <= 50 ? null : {
        displayName: {
          valid: false
        }
      };
    }
    ngAfterViewInit() {
      jQuery('#fields-modal').off('shown.bs.modal').on('shown.bs.modal', e => {
          this.getFieldsMetadata();
          this.getFields();
          this.isViewFieldDetails = false;
          this.fieldsForm.reset();
       });
    }

    deHighlightTableRow() {
      jQuery('.fields-grid').find('.flex-bar').removeClass('selected-row');
    }
    ngOnDestroy() {
      this.unsubscribe();
    }
    triggerLastClick() {
      setTimeout(() => {
        let grid_row = jQuery('.fields-grid .flex-bar');
        grid_row.last().trigger('click').parent().scrollTop(grid_row.height() * grid_row.length);
      }, 10);
    }

    fieldsGridRowClicked(targetRow) {
      let index = targetRow.dataset.index;
      let fieldDataOBject = this.fieldsGrid.rows[index];
      let selectedFieldId = fieldDataOBject.id;
      this.selectedFieldObject = _.cloneDeep(fieldDataOBject);
      if (this.selectedFieldObject['fieldTypeMetadata'] === PICKLIST_ID) {
        let key = this.selectedFieldObject['entityName'].toLowerCase() + '.' + this.selectedFieldObject['columnName'] + '.LOV';
        this.zephyrStore.dispatch(this._adminAction.getPrefByKey(key, false));
      }
      this.isFieldAdd = false;
      this.isFieldEdit = true;
      this.populateFieldData(this.selectedFieldObject);
      this.isViewFieldDetails = true;
    }

    fieldsGridActionClick (event) {
      let target = event.target,
          actionToBaTaken = target.dataset.action,
          trParents = jQuery(target).closest('.flex-bar'),
          targetRow = trParents[0];

      let fieldIdToBeDeleted = targetRow.dataset.id;
      this.fieldIdToBeDeleted = fieldIdToBeDeleted;
      if (actionToBaTaken === 'delete') {
          if (!this.isZephyrAccessLocked) {
            this.confirmationDialogueData.emit({
                heading: 'Information',
                text: 'You have to lock Zephyr access to delete fields',
                buttonText: 'Ok',
                showCancelButton: false,
                action: NO_ACTION
            });
          } else {
            this.deleteFirstConfirm();
          }
      }
    }
    initFieldsData(state) {
      this.fieldsGrid = state.fields.fieldsGrid;
      if (state.fields.metadata.isUpdated) {
        this.filedsMetadata = state.fields.metadata.options;
      }
      if (this.selectedFieldObject && this.selectedFieldObject['entityName']) {
        let key = this.selectedFieldObject['entityName'].toLowerCase() + '.' + this.selectedFieldObject['columnName'] + '.LOV';
        this.pickListValues = this.adminPref[key] ? JSON.parse(this.adminPref[key]) : [];
        this.fieldsForm.patchValue({hiddenPicklistValues: this.pickListValues});
      }
      if (state.fields.isZephyrAccessLocked == true) {
        this.lockStatusId = 'enable-zephyr-access';
        this.lockStatusText = 'Enable Zephyr access';
        this.isZephyrAccessLocked = true;
      } else {
        this.lockStatusId = 'lock-zephyr-access';
        this.lockStatusText = 'Lock Zephyr access';
        this.isZephyrAccessLocked = false;
      }
      let event = state.fields.event;
      if (event == ADD_FIELD_SUCCESS) {
        this.zephyrStore.dispatch(this._adminAction.clearFieldsEvents());
        this.hideFieldsForm();
        this.triggerLastClick();
      } else if (event == EDIT_FIELD_SUCCESS) {
        this.zephyrStore.dispatch(this._adminAction.clearFieldsEvents());
        this.fieldsForm.markAsPristine();
      }
    }

    getFields() {
        let entity = this.isRequiremntModal ? 'Requirement' : 'Testcase';
        this.zephyrStore.dispatch(this._adminAction.getCustomFields(entity));
    }

    getFieldsMetadata() {
      this.zephyrStore.dispatch(this._adminAction.getFieldsMetadata());
    }

    confirmationForLockAccess(event) {
      let id = event.target.id;
      if (id === 'lock-zephyr-access') {
        this.confirmationDialogueData.emit({
            heading: 'Confirmation',
            text: 'All users will now be logged off the system and will not be able to login again until you enable access. Are you sure you want to continue?',
            buttonText: 'Yes',
            showCancelButton: true,
            cancelButtonText: 'No',
            action: LOCK_ACCESS
        });
    } else if( id === 'enable-zephyr-access') {
        if (this.fieldsForm.dirty) {
          this.confirmationDialogueData.emit({
              heading: 'Unsaved changes',
              text: 'You have some unsaved changes. Are you sure you want to continue?',
              buttonText: 'Continue',
              showCancelButton: true,
              cancelButtonText: 'cancel',
              action: CONFIRM_LOCK_ENABLE
          });
        } else {
          let userId = this.zephyrStore.getState().loggedInUser.id;
          let userObject = { 'userId': userId , 'pause' : true };
          userObject['pause'] = false;
          this.zephyrStore.dispatch(this._adminAction.toggleZephyrAccess(userObject));
        }
      }
    }

    confirmLockEnable() {
      let userId = this.zephyrStore.getState().loggedInUser.id;
      let userObject = { 'userId': userId , 'pause' : true };
      userObject['pause'] = false;
      this.zephyrStore.dispatch(this._adminAction.toggleZephyrAccess(userObject));
      this.populateFieldData(this.selectedFieldObject);
      // this.deHighlightTableRow();
    }

    lockAccessAPIcall() {
      let userId = this.zephyrStore.getState().loggedInUser.id;
      let userObject = { 'userId': userId , 'pause' : true };
      this.zephyrStore.dispatch(this._adminAction.toggleZephyrAccess(userObject));
      // this.deHighlightTableRow();
    }

    searchablCheckboxChange(isCheckboxClicked) {
      this.isSearchableChecked = isCheckboxClicked;
      if (isCheckboxClicked) {
        (<FormControl>this.fieldsForm.controls['searchFieldName']).setValue(this.fieldsForm.value.displayName && this.fieldsForm.value.displayName.toLowerCase().replace(/ /g, '-'));
        this.onKeySearchFieldName(jQuery('#searchFieldName').val());
      } else {
        this.asyncValidation = true;
        (<FormControl>this.fieldsForm.controls['searchFieldName']).setValue(null);
      }
    }

    populateFieldData(selecetdFieldObject) {
      this.selectedProjects = [];
      if (this.isFieldAdd) {
          this.fieldsForm.reset();
          this.fieldsForm.patchValue({
             fieldName: '',
             description:'',
             searchFieldName:'',
             mandatory: false,
             importable: true,
             exportable: true,
             searchable: false,
             hiddenPicklistValues:'',
             fieldTypeMetadata: this.filedsMetadata && this.filedsMetadata[0] && this.filedsMetadata[0].id,
             projectCheck: false,
             unique: false
          });
          jQuery(`#${this.selectId}`).prop('disabled', false);
          this.pickListValues = [];
          this.isSearchFieldValueAccepted = true;
          this.isSearchableChecked = false;
          this.onChangeMetaDataType(this.filedsMetadata && this.filedsMetadata[0] && this.filedsMetadata[0].id);
      } else {
        this.fieldsForm.reset();
        this.isSearchFieldValueAccepted = true;
        this.isSearchableChecked = selecetdFieldObject.searchable;
        this.selectedProjects = selecetdFieldObject.hasOwnProperty('projects') ? (selecetdFieldObject.projects || []).map(item => item.id) : selecetdFieldObject.projectIds || [];
        this.fieldsForm.patchValue({
           fieldName: selecetdFieldObject.fieldName,
           displayName: selecetdFieldObject.displayName,
           fieldTypeMetadata: selecetdFieldObject.fieldTypeMetadata,
           mandatory: selecetdFieldObject.mandatory,
           importable: selecetdFieldObject.importable,
           exportable: selecetdFieldObject.exportable,
           searchable: selecetdFieldObject.searchable,
           searchFieldName: selecetdFieldObject.searchFieldName,
           description: selecetdFieldObject.description,
           hiddenPicklistValues: selecetdFieldObject.pickListValues,
           projectCheck: selecetdFieldObject.allProject,
           unique: selecetdFieldObject.unique
        });
        this.onChangeMetaDataType(selecetdFieldObject.fieldTypeMetadata);
      }
    }
    onKeySearchFieldName(event) {
        this.searchableFieldStoreUpdate = true;
        let fieldObject = {};
        fieldObject['id'] = this.selectedFieldObject['id'];
        fieldObject['entityName'] = this.selectedFieldObject['entityName'];
        fieldObject['searchFieldName'] = _.isObject(event) ? event.target.value : event;
        this.isSearchableFieldAcceptable = false;
        this.checkSearchField = true;

        this.zephyrStore.dispatch(this._adminAction.validateSearchValue(fieldObject));

    }
    addCustomField(form=null) {
        form = form || this.fieldsForm.value;

        let fieldType = this.isRequiremntModal ? REQUIREMENT : TESTCASE;

        let fieldObject = {};
        fieldObject['entityName'] = fieldType;
        fieldObject['systemField'] = false;

        Object.keys(form).forEach(key => {
            let val = form[key];
            fieldObject[key] = key === 'displayName' ? val.trim() : val;
        });
        fieldObject['unique'] = this.isUniqueAvailable() ? fieldObject['unique'] : false;
        fieldObject['isMetaDataPickList'] = fieldObject['fieldTypeMetadata'] == PICKLIST_ID;
        if (fieldObject['isMetaDataPickList']) {
          let keyObject = {};
              keyObject['value'] = JSON.stringify(this.formatPicklistValues(fieldObject['hiddenPicklistValues']));
              keyObject['accessLevel'] = 0;
              keyObject['defaultValue'] = JSON.stringify(fieldObject['hiddenPicklistValues']);
              keyObject['editable'] = true;
              keyObject['isCustomizable'] = true;

          fieldObject['pickListObject'] = keyObject;
        } else if (fieldObject['fieldTypeMetadata'] == TEXT_ID) {
          fieldObject['length'] = TEXT_FIELD_LENGTH;
        } else if (fieldObject['fieldTypeMetadata'] == LONG_TEXT_ID) {
          fieldObject['length'] = LONG_TEXT_FIELD_LENGTH;
        }
        if (jQuery('#projectCheck').prop('checked')) {
            fieldObject['allProject'] = true;
            fieldObject['projectIds'] = [];
        } else {
            fieldObject['projectIds'] = [jQuery(`#${this.selectId}`).val()];
            fieldObject['allProject'] = false;
        }
        this.zephyrStore.dispatch(this._adminAction.addField(fieldObject, fieldType.toLowerCase()));
    }
    onFieldFormSubmit(form) {
      let fieldType = this.isRequiremntModal ? 'requirement' : 'testcase';

      if (this.isFieldEdit) {
        Object.keys(form).forEach(key => {
            let val = form[key];
            this.selectedFieldObject[key] = key === 'displayName' ? val.trim() : val;
        });
        let fieldObject = JSON.parse(JSON.stringify(this.selectedFieldObject));
            fieldObject['isMetaDataPickList'] = fieldObject['fieldTypeMetadata'] == PICKLIST_ID;
            if (fieldObject['isMetaDataPickList']) {
              let keyObject = {};
                  keyObject['name'] = fieldObject.entityName.toLowerCase() + '.' + fieldObject.columnName + '.LOV';
                  keyObject['value'] = JSON.stringify(this.formatPicklistValues(fieldObject.hiddenPicklistValues));
              fieldObject['pickListObject'] = keyObject;
            }
            this.zephyrStore.dispatch(this._adminAction.editField(fieldObject, fieldType));
      }
      if (this.isFieldAdd) {
        if (!jQuery('#projectCheck').prop('checked')) {
            let projectId = Number(jQuery(`#${this.selectId}`).val());
            let thisProject = this.fieldsGrid.rows.filter(item => ~item.projectIds.indexOf(projectId));
            if (thisProject.length >= 5) {
                this.confirmationDialogueData.emit({
                    heading: 'Performance Warning',
                    text: `You have already added ${thisProject.length} custom fields for this project. Adding any more will result in performance degrade. Are you sure you want to continue?`,
                    buttonText: 'Continue',
                    showCancelButton: true,
                    cancelButtonText: 'cancel',
                    action: ADD_FIELD
                });
                return;
            }
        }

        this.addCustomField(form);

      }
    }

    hideFieldsForm() {
      this.fieldsForm.reset();
      this.deHighlightTableRow();
      this.isViewFieldDetails = false;
    }

    cancelFieldsFormConfirmstion() {
      if (this.fieldsForm.dirty) {
        this.confirmationDialogueData.emit({
            heading: 'Unsaved changes',
            text: 'You have some unsaved changes. Are you sure you want to continue?',
            buttonText: 'Continue',
            showCancelButton: true,
            cancelButtonText: 'cancel',
            action: HIDE_FIELDS_MODAL
        });
      } else {
        this.hideFieldsForm();
      }
    }

    closeFieldsModalConfirmation(event) {
      if (this.fieldsForm.dirty) {
        this.confirmationDialogueData.emit({
            heading: 'Unsaved changes',
            text: 'You have some unsaved changes. Are you sure you want to continue?',
            buttonText: 'Continue',
            showCancelButton: true,
            cancelButtonText: 'cancel',
            action: CLOSE_FIELDS_MODAL
        });
      } else {
        this.fieldsForm.reset();
        this.CloseFieldsModal();
      }
    }

    CloseFieldsModal() {
      jQuery('#fields-modal').modal('hide');

      setTimeout(() => {
        jQuery('.modal-backdrop').remove();
      }, 100);
    }

    addField() {
      this.isFieldAdd = true;
      this.isFieldEdit = false;
      this.isViewFieldDetails = true;
      this.populateFieldData(null);
      this.selectedFieldObject = {};
      this.selectedFieldObject['entityName'] = this.isRequiremntModal ? REQUIREMENT : TESTCASE;
      this.isPicklistSelected = this.fieldsForm.controls['fieldTypeMetadata'].value === PICKLIST_ID;
      jQuery('#fields-modal table').find('tr').removeClass('selected-row');
         setTimeout(() => {
        jQuery('.subform #displayName').trigger('focus');
      }, 200);
    }

    addFieldConfirmation() {
      if (this.fieldsForm.dirty) {
        this.confirmationDialogueData.emit({
            heading: 'Unsaved changes',
            text: 'You have some unsaved changes. Are you sure you want to continue?',
            buttonText: 'Continue',
            showCancelButton: true,
            cancelButtonText: 'cancel',
            action: ADD_FIELD_CONTINUE
        });

      } else {
        this.addField();
      }
    }

    deleteField() {
        let fieldType = this.isRequiremntModal ? 'requirement' : 'testcase';
        this.zephyrStore.dispatch(this._adminAction.deleteField(this.fieldIdToBeDeleted, fieldType));
        this.deHighlightTableRow();
        this.isViewFieldDetails = false;
    }

    deleteSecondConfirm() {
      this.confirmationDialogueData.emit({
          heading: 'Confirmation',
          text: 'Data stored in custom field would be irrevocably deleted.',
          buttonText: 'Yes',
          showCancelButton: true,
          cancelButtonText: 'No',
          action: DELETE_FIELD_SECOND
      });
    }

    deleteFirstConfirm() {
      this.confirmationDialogueData.emit({
          heading: 'Confirmation',
          text: 'Are you sure you want to delete it?',
          buttonText: 'Yes',
          showCancelButton: true,
          cancelButtonText: 'No',
          action: DELETE_FIELD_FIRST
      });
    }

    pickListValueClicked(ev) {
      if (ev.target.className.indexOf('delete-picklist') > -1 ) {
        let id = Number(ev.target.getAttribute('value'));
        let value = this.fieldsForm.controls['hiddenPicklistValues'].value;
        value.splice(id, 1);
        this.fieldsForm.markAsDirty();
        this.fieldsForm.patchValue({
           hiddenPicklistValues: value
        });
        this.pickListValues = value;
      }
    }

    addPicklist() {
      if (this.pickListValue && this.pickListValue.trim().length > 0) {
        let value = this.pickListValue.trim();
        let valString = this.fieldsForm.controls['hiddenPicklistValues'].value;
        valString = valString.length === 0 ? [] : valString;
        valString.push({ 'value': value});
        //(<FormControl>this.form.controls['hiddenPicklistValues']).setValue(valString);
        this.fieldsForm.patchValue({
           hiddenPicklistValues: valString
        });
        this.fieldsForm.markAsDirty();
        this.pickListValues = valString;
        this.pickListValue = '';
        let picklistWrapper = document.getElementsByClassName('picklist-values-wrapper')[0],
           scrollHeight = picklistWrapper.scrollHeight;
        jQuery(picklistWrapper).animate({scrollTop: scrollHeight}, 'slow');
      }
    }

    addPickListOnEnter(ev) {
      // on enter keyPress
      if (ev.which === 13) {
        jQuery(ev.target).next('.cursor-pointer').trigger('click');
      }
    }

    onKeyupFieldName() {
      if(this.fieldsForm.value.searchable) {
        (<FormControl>this.fieldsForm.controls['searchFieldName'])
            .setValue(this.fieldsForm.value.displayName && this.fieldsForm.value.displayName.toLowerCase().replace(/[^A-Za-z0-9_]/g,'-'));

        this.onKeySearchFieldName(jQuery('#searchFieldName').val());
      }
    }

    onChangeMetaDataType(id) {
      if (Number(id) === PICKLIST_ID) {
       this.isPicklistSelected = true;
       this.isDateSelected = false;
      } else if (Number(id) === DATE_ID) {
        this.isPicklistSelected = false;
        this.isDateSelected = true;
        this.fieldsForm.patchValue({
           searchable: false
        });
      } else {
        this.isPicklistSelected = false;
        this.isDateSelected = false;
      }
    }

    pickListSort() {
      this.pickListValues.sort((a, b) => a.value.toUpperCase() > b.value.toUpperCase() ? 1 : -1);
    }

    formatPicklistValues(pickListArray) {
      let i, maxId = 1;

      // calculating maxId
      for(i = 0; i < pickListArray.length; i++) {
        if (pickListArray[i].id && Number(pickListArray[i].id) > maxId) {
         maxId = Number(pickListArray[i].id);
        }
      }
      maxId == 1 ? maxId-- : maxId = maxId ;

      // assigning id
      for(i = 0; i < pickListArray.length; i++) {
        if (!pickListArray[i].id) {
           pickListArray[i].id = ++maxId + '';
        }
      }
      return pickListArray;
    }
    onPickListEdit(ev, value) {
      let valString = this.fieldsForm.controls['hiddenPicklistValues'].value;
      valString[value].value = ev;
      this.fieldsForm.patchValue({
         hiddenPicklistValues: valString
      });
      this.fieldsForm.markAsDirty();
      this.pickListValues = valString;
    }
    isUniqueAvailable() {
        return ~[NUMBER_ID, TEXT_ID].indexOf(Number(this.fieldsForm.controls['fieldTypeMetadata'].value)) && !jQuery('#projectCheck').prop('checked');
    }
    isUpdateField() {
        return this.selectedFieldObject.hasOwnProperty('columnName');
    }
    isUniqueDisabled() {
        return this.isUpdateField() && !this.selectedFieldObject['unique'];
    }
    allProjChanged(isCheck) {
        jQuery(`#${this.selectId}`).val([]).prop('disabled', isCheck).trigger('change');
    }
    isDisabled(fieldsForm) {
        return !(fieldsForm.valid && fieldsForm.dirty) || (this.isPicklistSelected && this.pickListValues.length === 0)
            || (this.isSearchableChecked && !this.isSearchFieldValueAccepted) || !this.asyncValidation || (!jQuery(`#${this.selectId}`).val() && !jQuery('#projectCheck').prop('checked'));
    }

  }
