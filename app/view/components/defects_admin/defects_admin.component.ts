import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {DefectsAdminAction} from '../../../actions/defectsAdmin.action';
import {GridAction} from '../../../actions/grid.action';
import {GlobalAction} from '../../../actions/global.action';
import {DefectsAction} from '../../../actions/defects.action';
import {PreferenceFormComponent} from './defects_admin_form.component';


import {ZEE_NAV_ADMIN_COLUMNS} from '../admin/zee_leftnav_admin.data';
import {ZephyrStore} from '../../../store/zephyr.store';
import {DEFECTS_ADMIN_GRID_TYPE} from './defects_admin.constants';

declare var jQuery: any,  _: any;
@Component({
  selector: 'defects-admin',
  viewProviders: [DefectsAdminAction, GridAction, GlobalAction, DefectsAction],
  templateUrl: 'defects_admin.html'
})

export class DefectsAdminComponent implements OnInit, OnDestroy {
    @ViewChild(PreferenceFormComponent) preferenceFormUI: PreferenceFormComponent;
    navColumns;
    activeItemKey;
    zephyrStore;
    unsubscribe;
    state;
    isUserUpdateRequired;
    defectsAdminGridRows;
    paginationOptions;
    categories;
    selectedIndex;
    dtsId;
    isShowForm;
    selectedCategory;
    preferenceObjectSelected = {};
    defectsCacheForm : FormGroup;
    isClearAll = '';
    filePath;
    offline;
    defectsAccess = true;
    _key;
    deletePreferenceObj = {};
    deleteIndex;
    confirmationObject : any = {};
    currentFormValues;
    fileURL;

    _defectsGridType = DEFECTS_ADMIN_GRID_TYPE;

    constructor(private fb: FormBuilder, private _gridAction: GridAction, private _defectsAdminAction: DefectsAdminAction,
                    private _globalAction: GlobalAction, private _defectsAction: DefectsAction, public router: Router) {
        this.navColumns = ZEE_NAV_ADMIN_COLUMNS;
        this.activeItemKey = 'defects-admin';

        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.state = this.zephyrStore.getState();

        this.defectsCacheForm = this.fb.group({
          selected: ['']
         });

        this.fileURL = new FormControl('', this.urlValidator);

        this.unsubscribe = this.zephyrStore.subscribe(() => {

          this.defectsAdminGridRows = this.state.defectsAdmin.defectsAdminGrid.rows;
          this.paginationOptions = this.state.defectsAdmin.defectsAdminGrid.paginationOptions;
          //console.log('store updated in defects admin ui', this.state.defectsAdmin.defectsAdminGrid);

          if(this.state.global.defectsAdminEvent === 'DEFECT_SYSTEM_UPDATED') {
            this.dtsId = (this.state.global.defectSystem && this.state.global.defectSystem.systemType)
              ? parseInt(this.state.global.defectSystem.systemType) : '';
              if(this.dtsId) {
                this.zephyrStore.dispatch(this._defectsAdminAction.fetchPreferenceByDtsId(this.dtsId));
              }
            this.zephyrStore.dispatch(this._globalAction.clearDefectsAdminEvents());

          }
          this.categories = this.state.defectsAdmin.categories;
        });
    }

    ngOnInit() {
      let state = this.zephyrStore.getState();
      let user = state.loggedInUser;
      if(Object.keys(user).length) {
        this.checkDefectUserState();
        this.dtsId = (this.state.global.defectSystem && this.state.global.defectSystem.systemType)
          ? parseInt(this.state.global.defectSystem.systemType) : '';
        if (this.dtsId) {
          this.zephyrStore.dispatch(this._defectsAdminAction.fetchPreferenceByDtsId(this.dtsId));
        }
      }
      // let initialRows = this.state.defectsAdmin.defectsAdminGrid.rows;
      // if(initialRows && initialRows.length){
      //   this.defectsAdminGridRows = this.state.defectsAdmin.defectsAdminGrid.rows.forEach((preference) => {
      //     delete preference['hide'];
      //   });
      // }
    }

    checkDefectUserState() {
      this.zephyrStore.dispatch(this._defectsAction.getDefectUser());
    }

    onShowUpdateUserModal(selectedVal) {
        this.isUserUpdateRequired = selectedVal;
        if(selectedVal === 'false') {
            this.dismissModal();
        } else {
          jQuery('#defect-update-user-modal').modal();
        }
    }

    onCloseUpdateUserModal() {
        if(this.isUserUpdateRequired === 'false') {
            this.dismissModal();
            this.defectsAccess = true;
        } else {
            this.dismissModal();
            this.defectsAccess = false;
            // this.router.navigate(['/defect-admin']);
        }
    }

    dismissModal() {
        jQuery('#defect-update-user-modal').modal('hide');
        jQuery('.modal-backdrop').remove();
    }

    onTabClick(e) {
      let action = jQuery(e.target).closest('a').hasClass('active');
      if(!action) {
        this.deHighlightRow();
        this.isShowForm = false;
      }

    }

    filterGridCategories(category) {
      this.selectedIndex = category.id;
      this.selectedCategory = category;
      this.defectsAdminGridRows.forEach((preference)=> {
        preference.hide = preference.section !== category.name;
      });
    }

    toggleClearCache(value) {
      this.isClearAll = value;
      // console.log(this.defectsCacheForm.value,this.isClearAll, !this.isClearAll,  !this.defectsCacheForm.valid);
      this.checkValidations (value);
    }

    checkValidations (value) {
      let validations = {};
      if (value === 'jira') {
        validations['selected'] = [this.defectsCacheForm.value.selected,
        Validators.compose([Validators.required, Validators.pattern('^.{1,128}$')])];
      } else {
        validations['selected'] = [''];
      }

      this.defectsCacheForm = this.fb.group(validations);
    }

    defectsCacheFormSubmit(formValue) {
     // console.log('formValue', formValue);
      this._key = !formValue.selected ? 'all' : formValue.selected;
      jQuery('#clearCache-modal').modal();


    }

    clearCacheCall() {
      // console.log('fsdfsdf', this._key)
      this.zephyrStore.dispatch(this._defectsAdminAction.clearDefectsCache(this._key));
      jQuery('#clearCache-modal').modal('hide');
    }

    uploadMetaData() {
     // console.log('model path', this.filePath, this.offline);
      this.zephyrStore.dispatch(this._defectsAdminAction.uploadMetaData(this.filePath, this.offline));
    }

    addPreference() {
      jQuery('#preference-name').trigger('focus');
      this.isShowForm = true;
      this.deHighlightRow();
      this.preferenceObjectSelected = {};
    }

    defectsAdminGridRowClicked(targetRow) {
      let index = targetRow.dataset.index;
      let gridRowObj = this.defectsAdminGridRows[index];
      this.preferenceObjectSelected = gridRowObj;
      this.isShowForm = true;
     // console.log('preferenceObject', this.preferenceObjectSelected);
    }

    deletePreference($event) {
      if(!this.selectedIndex) {
        return;
      }
      let target = $event.target,
          actionToBaTaken = target.dataset.action,
          trParents = jQuery(target).closest('.flex-bar'),
          index = parseInt(trParents[0].dataset.index),
          gridRowObj = this.defectsAdminGridRows[index];
      this.deletePreferenceObj = gridRowObj;
      this.deleteIndex = index;
      jQuery('#confirmation-modal').modal();
      this.confirmationObject['heading'] = 'Delete Preference';
      this.confirmationObject['text'] = 'Are you sure you want to delete preference ' + gridRowObj['name'] +'?';
      this.confirmationObject['buttonText'] = 'Yes';
      this.confirmationObject['showCancelButton'] = true;
      this.confirmationObject['action'] = 'DELETE';
    }



    confirmationActionCall($event) {
      let actionString = $event.target.value;
      if (actionString === 'DELETE') {
        this.defectsAdminGridRows.splice(this.deleteIndex, 1);
        this.isShowForm = false;
        this.savePreferences(this.defectsAdminGridRows, this.dtsId, this.deletePreferenceObj, 'delete');
      } else if(actionString === 'SAVE') {
        this.isShowForm = false;
        let action;
        if(!Object.keys(this.currentFormValues.preference).length) {
          let c = Object.assign({}, this.currentFormValues.formValues);
          c['descrption'] = '';
          c['section'] = this.categories[this.selectedIndex - 1].name;
          c['uiReqd'] = true;
          c['customizable'] = true;
          c['dtsType'] = this.dtsId;
          action = 'create';
          this.defectsAdminGridRows.push(c);
          this.savePreferences(this.defectsAdminGridRows, this.dtsId, c, action);
        } else {
          let obj = Object.assign(this.currentFormValues.preference, this.currentFormValues.formValues);
          action = 'edit';
          this.savePreferences([obj], this.dtsId, this.currentFormValues.preference, action);
        }
      } else if (actionString === 'CANCEL') {
         this.preferenceFormUI.updatePreferenceForm(this.preferenceObjectSelected);
         this.isShowForm = false;
      }
      jQuery('#confirmation-modal').modal('hide');

    }

    deHighlightRow () {
      jQuery('.defects-preference-grid').find('.flex-bar').removeClass('selected-row');
    }

    savePreferences(arr, id, preferenceObj, action) {
      let preferencesArray = _.cloneDeep(arr);

      preferencesArray.forEach((preference)=> {
         delete preference['hide'];
         delete preference['noneditable'];
      });
      this.zephyrStore.dispatch(this._defectsAdminAction.savePreferenceByDtsId(preferencesArray, id, preferenceObj, action));
    }

    onPreferenceFormSubmit(formValues) {
      this.currentFormValues = formValues;
      jQuery('#confirmation-modal').modal();
      this.confirmationObject['heading'] = 'Save Preference';
      this.confirmationObject['text'] = 'Are you sure you want to save changes ?';
      this.confirmationObject['buttonText'] = 'Save';
      this.confirmationObject['showCancelButton'] = true;
      this.confirmationObject['action'] = 'SAVE';
    }

    resetPreferenceForm() {
      jQuery('#confirmation-modal').modal();
      this.confirmationObject['heading'] = 'Cancel';
      this.confirmationObject['text'] = 'You have unsaved information. You may want to save or these changes will be lost. '
      + 'Do you still want to continue?';
      this.confirmationObject['buttonText'] = 'Continue';
      this.confirmationObject['showCancelButton'] = true;
      this.confirmationObject['action'] = 'CANCEL';
    }

    ngOnDestroy() {
      this.unsubscribe();
    }

    private urlValidator(url) {
      //https://github.com/angular/angular.js/pull/11381
      //var regEx = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      var regEx = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;


      var valid = regEx.test(url.value);
      if(valid) {
        let last = url.value.substring(url.value.lastIndexOf('/') + 1, url.value.length),
            substr = last.substring(last.lastIndexOf('.') + 1, last.length),
            len = last.split('.').length;
            valid = (len == 2) && (substr === 'txt' || substr === 'json');
      console.log('url value', url.value, len, last, substr);

      }
      if(valid || !url.value) {
        return null;
      }
      return { 'invalidName': true };
    }
}
