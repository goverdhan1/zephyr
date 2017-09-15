import {Component, OnDestroy, AfterViewInit, Input, Output, EventEmitter, OnChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {AdminAction} from '../../../../../actions/admin.action';
import {GridAction} from '../../../../../actions/grid.action';
import { ADMIN_PREFERENCES} from '../../../admin/admin.constant';
import {ADD_EXECUTION_STATUS_SUCCESS} from '../../../../../utils/constants/action.events';
import {TST_EXECUTION_STATUS_GRID_TYPE, TST_STEP_EXECUTION_STATUS_GRID_TYPE} from '../../../admin/customizations/customizations.constant';
import {GridComponent} from "../../../grid/grid.component";

declare var jQuery: any, _, window: any;
const NO_ACTION = 'NO_ACTION';
const EXECUTION_STATUS_UPDATE = 'EXECUTION_STATUS_UPDATE';
const EXECUTION_STATUS_FORM_SUBBMIT = 'EXECUTION_STATUS_FORM_SUBBMIT';
const HIDE_EXECUTION_STATUS_MODAL = 'HIDE_EXECUTION_STATUS_MODAL';
const HIDE_EXECUTION_STATUS_FORM = 'HIDE_EXECUTION_STATUS_FORM';
const ADD_EXECUTION_CONTINUE = 'ADD_EXECUTION_CONTINUE';

@Component({
  selector: 'execution-status-modal',
  viewProviders: [AdminAction],
  templateUrl: 'execution_status.html',
})

export class ExecutionStatusModalComponent implements AfterViewInit, OnDestroy, OnChanges {
    @ViewChild(GridComponent) gridComponent: GridComponent;
    @Input() isexecutionStatusClicked;
    @Output() confirmationDialogueData: EventEmitter<any> = new EventEmitter();
    zephyrStore;
    state;
    unsubscribe;
    executionStatusForm;
    adminPref;
    isShowStatusForm;
    executionStatus;
    commonExecutionStatus;
    stepExecutionStatus;
    isAddExecutionStatus;
    executionStatusGrid;
    executionStatusGridType;
    isStatusEnabled = false;
    targetId;
    colorPickerEl = null;
    isIE = false;
    constructor( fb: FormBuilder, private _adminAction: AdminAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        let state = this.zephyrStore.getState();
        this.adminPref = state.adminPref;
        this.executionStatusGridType = TST_EXECUTION_STATUS_GRID_TYPE;
        this.executionStatusForm = fb.group({
           value: ['', Validators.compose([Validators.required,
             this.validateExecutionStatus])],
           color: ['#ff0000'],
           id: ['']
          });
        this.executionStatusGrid = this.zephyrStore.getState().executionStatus.executionStatusGrid;
        this.unsubscribe = this.zephyrStore.subscribe(() => {
             this.zephyrStore = ZephyrStore.getZephyrStore();
             this.executionStatusGrid = this.zephyrStore.getState().executionStatus.executionStatusGrid;

              this.executionStatusGrid.rows.forEach((v) => {
                if (v.value.toLocaleLowerCase() === 'change status') {
                  v.value = 'Not Executed';
                }
              });

             let event = this.zephyrStore.getState().executionStatus.event;
             if (event == ADD_EXECUTION_STATUS_SUCCESS) {
               this.triggerLastClick();
               this.zephyrStore.dispatch(this._adminAction.clearExecutionStatusEvents());
             }
             this.onInit();
        });
        if(state.global.browser.isIE) {
          this.isIE = true;
        }
    }

    ngOnChanges(changes) {
      if (this.isexecutionStatusClicked) {
        this.executionStatusGridType = TST_EXECUTION_STATUS_GRID_TYPE;
      } else {
        this.executionStatusGridType = TST_STEP_EXECUTION_STATUS_GRID_TYPE;
      }

      this.gridComponent.ngAfterViewInit();
    }

    validateExecutionStatus(c: FormControl) {
      return c.value && c.value.trim().length >= 3 && c.value.trim().length <= 64 ? null : {
        value: {
          valid: false
        }
      };
    }
    onInit() {
      this.adminPref = this.zephyrStore.getState().adminPref;
      this.initExecutionStatusData();
      this.initStepExecutionStatusData();
    }

    // ngOnChanges(changes) {
    //   if(changes && Object.keys(changes).indexOf('isexecutionStatusClicked') > -1) {
    //     console.log('changes in execution', changes);
    //     if(changes['isexecutionStatusClicked'].currentValue) {
    //       this.getExecutionStatusData();
    //     } else {
    //         this.getStepExecutionStatusData();
    //     }
    //     this.isShowStatusForm = false;
    //   }
    // }

    ngAfterViewInit () {
       jQuery('#execution-status-modal').on('shown.bs.modal', (e) => {
          if (this.isexecutionStatusClicked) {
            this.getExecutionStatusData();
          } else {
            this.getStepExecutionStatusData();
          }
          this.isShowStatusForm = false;
        });
    }

    addColorPickerSupportIE() {
       setTimeout(() => {
         let colorPickerDiv = document.getElementById('colorPicker');
         if (colorPickerDiv) {
            this.colorPickerEl = window.tinycolorpicker(colorPickerDiv);
                jQuery('#colorPicker').bind('change', () => {
                this.executionStatusForm.controls['color'].setValue(jQuery('#execution-status-color').val());
                this.executionStatusForm.markAsDirty();
            });
         }
       });
    }

    initExecutionStatusData() {
        this.executionStatus = this.adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV].length > 0 ?
          JSON.parse(this.adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV]) : [];
        if (this.isexecutionStatusClicked) {
         this.commonExecutionStatus = this.executionStatus;
        }
    }

    initStepExecutionStatusData() {
        this.stepExecutionStatus = this.adminPref[ADMIN_PREFERENCES.TESTSTEPRESULT_TESTSTEPRESSULTSTATUS_LOV].length > 0 ?
          JSON.parse(this.adminPref[ADMIN_PREFERENCES.TESTSTEPRESULT_TESTSTEPRESSULTSTATUS_LOV]) : [];
        if (!this.isexecutionStatusClicked) {
          this.commonExecutionStatus = this.stepExecutionStatus;
        }
    }

    getExecutionStatusData() {
      this.zephyrStore.dispatch(this._adminAction.getExecutionStausUpdateGrid(ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV));
    }

    getStepExecutionStatusData() {
      this.zephyrStore.dispatch(this._adminAction.getExecutionStausUpdateGrid(ADMIN_PREFERENCES.TESTSTEPRESULT_TESTSTEPRESSULTSTATUS_LOV));
    }

    resetExecutionStatusForm() {
      this.executionStatusForm.reset();
      this.executionStatusForm.patchValue({
        color: '#efefef'
      });
    }
    addExecutionStatusConfirmation() {
        if (this.executionStatusForm.dirty) {
          let confirmationObject = {};
            confirmationObject['heading'] = 'Unsaved changes';
            confirmationObject['text'] = 'You have some unsaved changes. Are you sure you want to continue?';
            confirmationObject['buttonText'] = 'Continue';
            confirmationObject['showCancelButton'] = true;
            confirmationObject['cancelButtonText'] = 'cancel';
            confirmationObject['action'] = ADD_EXECUTION_CONTINUE;
            this.confirmationDialogueData.emit(confirmationObject);
        } else {
            this.addExecutionStatus();
        }
    }

    addExecutionStatus() {
      this.addColorPickerSupportIE();
      if (this.commonExecutionStatus.length < parseInt(this.adminPref[ADMIN_PREFERENCES.EXECUTION_STATUS_MAXIMUM_ALLOWED])) {
        this.isShowStatusForm = true;
        this.isAddExecutionStatus = true;
        this.resetExecutionStatusForm();
        this.deHighlightTableRow();
      } else {
        let confirmationObject = {};
          confirmationObject['heading'] = 'Information';
          confirmationObject['text'] = 'Only total of ' +  this.adminPref[ADMIN_PREFERENCES.EXECUTION_STATUS_MAXIMUM_ALLOWED] + ' can be added';
          confirmationObject['buttonText'] = 'Yes';
          confirmationObject['showCancelButton'] = false;
          confirmationObject['action'] = NO_ACTION;
        this.confirmationDialogueData.emit(confirmationObject);
      }
    }

    onExecutionStatusFormSubmit(form) {
      form ? form = form : form = this.executionStatusForm.value;
      let executionobject = {};
      for (var key in form) {
        if (form.hasOwnProperty(key)) {
          var val = form[key];
          executionobject[key] = val && (val + '').trim();
        }
      }
      if (this.isAddExecutionStatus) {
        delete executionobject['id'];
        if (this.isexecutionStatusClicked) {
          this.zephyrStore.dispatch(this._adminAction.addPreferenceByKeyAndItemUpdateGrid(executionobject,
            ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV));
        } else {
          this.zephyrStore.dispatch(this._adminAction.addPreferenceByKeyAndItemUpdateGrid(executionobject,
            ADMIN_PREFERENCES.TESTSTEPRESULT_TESTSTEPRESSULTSTATUS_LOV));
        }
      } else {
         if (this.isexecutionStatusClicked) {
           this.zephyrStore.dispatch(this._adminAction.updatePreferenceByKeyAndItemUpdateGrid(executionobject,
             ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV, this.isexecutionStatusClicked));
         } else {
           this.zephyrStore.dispatch(this._adminAction.updatePreferenceByKeyAndItemUpdateGrid(executionobject,
             ADMIN_PREFERENCES.TESTSTEPRESULT_TESTSTEPRESSULTSTATUS_LOV, this.isexecutionStatusClicked));
         }
      }
      this.isShowStatusForm = false;
      this.executionStatusForm.reset();
    }

    executionStatusGridRowClicked(targetRow) {
      this.isAddExecutionStatus = false;
      let index = targetRow.dataset.index;
      let dataOBject = this.executionStatusGrid.rows[index];
      let id = dataOBject.id;
      /*if (parseInt(id) <= 10) {
        this.isShowStatusForm = false;
        return;
      }*/
      this.isShowStatusForm = true;
      this.addColorPickerSupportIE();
      this.updateExecutionStatusForm(dataOBject);
    }

    updateExecutionStatusForm(dataOBject) {
      this.executionStatusForm.reset();
      this.executionStatusForm.patchValue({
        id: dataOBject.id,
        value:dataOBject.value,
        color:dataOBject.color
      });
      //wait for the object to be init
      setTimeout(()=>{
        this.colorPickerEl.setColor(dataOBject.color);
      });
    }
    hideExecutionStatusForm() {
      this.executionStatusForm.reset();
      this.isShowStatusForm = false;
    }

    disableExecutionStatus(id) {
      if (this.isexecutionStatusClicked) {
        this.zephyrStore.dispatch(this._adminAction.updatePreferenceItemStatusUpdateGrid(id,
          ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV , false, this.isexecutionStatusClicked));
      } else {
        this.zephyrStore.dispatch(this._adminAction.updatePreferenceItemStatusUpdateGrid(id,
          ADMIN_PREFERENCES.TESTSTEPRESULT_TESTSTEPRESSULTSTATUS_LOV , false, this.isexecutionStatusClicked));
      }
    }
    enableExecutionStatus(id) {
      if (this.isexecutionStatusClicked) {
        this.zephyrStore.dispatch(this._adminAction.updatePreferenceItemStatusUpdateGrid(id,
          ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV , true, this.isexecutionStatusClicked));
      } else {
        this.zephyrStore.dispatch(this._adminAction.updatePreferenceItemStatusUpdateGrid(id,
          ADMIN_PREFERENCES.TESTSTEPRESULT_TESTSTEPRESSULTSTATUS_LOV , true, this.isexecutionStatusClicked));
      }
    }
    saveEnableStatus() {
      if(this.isStatusEnabled) {
        this.disableExecutionStatus(this.targetId);
      } else {
        this.enableExecutionStatus(this.targetId);
      }
      this.isShowStatusForm = false;
    }
    executionStatusGridToggleButtonClick(target) {
      if (parseInt(target.id) > 10 ) {
        this.isStatusEnabled = target.value;
        this.targetId = target.id;
        this.updateStatusConfirmation();
      }
    }
    deHighlightTableRow() {
      jQuery('.execution-status-grid').find('.flex-bar').removeClass('selected-row');
    }
    ngOnDestroy() {
      this.unsubscribe();
    }
    triggerLastClick() {
      setTimeout(() => {
        let grid_row = jQuery('.execution-status-grid .flex-bar');
        grid_row.last().click();
        grid_row.parent().scrollTop(grid_row.height() * grid_row.length);
      }, 10);
    }
    updateStatusFormConfirmation() {
      let confirmationObject = {};
        confirmationObject['heading'] = 'Confirmation';
        confirmationObject['text'] = 'Are you sure you want to continue ?';
        confirmationObject['buttonText'] = 'Yes';
        confirmationObject['showCancelButton'] = true;
        confirmationObject['cancelButtonText'] = 'No';
        confirmationObject['action'] = EXECUTION_STATUS_FORM_SUBBMIT;
      this.confirmationDialogueData.emit(confirmationObject);
    }

    updateStatusConfirmation() {
      let enableStatusText = 'On disabling this execution status, all testcases that currently have that status will continue to'
                             + ' show it unless they are re-executed. New testcase executions will not be able to use this disabled status.';
      let text = this.isStatusEnabled ? enableStatusText : 'Are you sure you want to continue ?';
      let confirmationObject = {};
        confirmationObject['heading'] = 'Confirmation';
        confirmationObject['text'] = text;
        confirmationObject['buttonText'] = 'Yes';
        confirmationObject['showCancelButton'] = true;
        confirmationObject['cancelButtonText'] = 'No';
        confirmationObject['action'] = EXECUTION_STATUS_UPDATE;
      this.confirmationDialogueData.emit(confirmationObject);
    }

    cancelExecutionStatusFormConfirmation(e) {
      if (this.executionStatusForm.dirty) {
        let confirmationObject = {};
          confirmationObject['heading'] = 'Unsaved changes';
          confirmationObject['text'] = 'You have some unsaved changes. Are you sure you want to continue?';
          confirmationObject['buttonText'] = 'Continue';
          confirmationObject['showCancelButton'] = true;
          confirmationObject['cancelButtonText'] = 'cancel';
          confirmationObject['action'] = HIDE_EXECUTION_STATUS_FORM;
          this.confirmationDialogueData.emit(confirmationObject);
      } else {
        this.executionStatusForm.reset();
        this.hideExecutionStatusForm();
      }
    }

    onCloseExecutionStatusModal(ev) {
      if (this.executionStatusForm.dirty) {
        let confirmationObject = {};
          confirmationObject['heading'] = 'Unsaved changes';
          confirmationObject['text'] = 'You have some unsaved changes. Are you sure you want to continue?';
          confirmationObject['buttonText'] = 'Continue';
          confirmationObject['showCancelButton'] = true;
          confirmationObject['cancelButtonText'] = 'cancel';
          confirmationObject['action'] = HIDE_EXECUTION_STATUS_MODAL;
          this.confirmationDialogueData.emit(confirmationObject);
      } else {
        this.executionStatusForm.reset();
        this.hideExecutionStatusModal();
      }
    }

    hideExecutionStatusModal() {
      jQuery('#execution-status-modal').modal('hide');
      this.executionStatusForm.reset();
    }

    openColorpicker() {
      window.open('http://www.colorpicker.com','targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=400');
    }
  }
