import {Component, Input, OnDestroy, OnInit, ChangeDetectorRef} from '@angular/core';
// import {   Validators, Control} from '@angular/common';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {ReleaseAction} from '../../../../actions/release.action';
import {DefectsAction} from '../../../../actions/defects.action';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

// Constants
import {RELEASE_INIT_STATE} from '../release_setup.constant';
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import {RELEASE_DATE_FORMAT} from '../../../../utils/constants/application.constants';
import {UtililtyFunctions} from '../../../../utils/scripts/utils';

declare var jQuery: any, moment: any, _: any, window;

const NO_ACTION = 'NO_ACTION';
const RELEASE_LOCKED = 3;
const SYSTEM_TYPE_4 = 4;

@Component({
  selector: 'release-form',
  viewProviders: [ReleaseAction, DefectsAction],
  templateUrl: 'release_form.html'
})

export class ReleaseFormComponent implements OnDestroy, OnInit {
    zephyrStore;
    state;
    isAdd : boolean; //True value indicates to behave as Add form, False indicate to behave as edit form
    isShowForm : boolean; //Boolean to control visibility of form
    releaseForm : FormGroup;
    currentRelease : number; // cuurently selected release
    confirmationObject = {
      heading : '',
      text: '',
      showCancelButton : true,
      action: '',
      buttonText: '',
      cancelButtonText: ''
    };
    currentProject = {};
    globalReleases;
    defectSystem; //containes information about the defect system
    defectProjects = []; //List of defects projects
    isDefectOn : boolean; //boolean to check if linked to jira or not
    isApiFiredDefectProjects: boolean;//variable to make API call for defects-projects once
    unsubscribe;
    datesValidation = {
      'startDateMin' : '',
      'startDateMax' : '',
      'endDateMin' : '',
      'endDateMax' : ''
    };
    release = _.cloneDeep(RELEASE_INIT_STATE);
    _previousValue = {};
    showDirtyCheckModal = false;
    i18nMessages = I18N_MESSAGES;
    constructor( private _releaseAction: ReleaseAction, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef, private _defectAction: DefectsAction) {

        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.defectProjects = this.zephyrStore.getState().linkNewDefect.jiraProjects || [];
        this.defectSystem = this.zephyrStore.getState().global.defectSystem || {};
        this.isDefectOn = this.defectSystem['systemType'] == SYSTEM_TYPE_4;
        //Making API call to fetch jira projects only when it is linked to it
        if (this.isDefectOn && !this.isApiFiredDefectProjects) {
          //Making API call to fetch all jira projects
          this.isApiFiredDefectProjects = true;
          this.zephyrStore.dispatch(this._defectAction.getJIRAProjects({useAdmin: true}));
        }
        this.unsubscribe = this.zephyrStore.subscribe((x) => {
            this.globalReleases = this.zephyrStore.getState().release.releases;
            this.defectProjects = this.zephyrStore.getState().linkNewDefect.jiraProjects || [];
            this.defectSystem = this.zephyrStore.getState().global.defectSystem || {};
            this.isDefectOn = this.defectSystem['systemType'] == SYSTEM_TYPE_4;
            //Making API call to fetch jira projects only when it is linked to it
            if (this.isDefectOn && !this.isApiFiredDefectProjects) {
              //Making API call to fetch all jira projects
              this.isApiFiredDefectProjects = true;
              this.zephyrStore.dispatch(this._defectAction.getJIRAProjects({useAdmin: true}));
            }
        });
        this.isAdd = true; //Setting default falue as true, i.e. to open as add form by default
        this.isShowForm = false; //Setting default falue as false, i.e. not to show form
        this.currentRelease = localStorage.getItem(`${window.tab}-currentRelease`) && JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`)).id;
        this.defectProjects = this.zephyrStore.getState().linkNewDefect.jiraProjects || [];
        this.defectSystem = this.zephyrStore.getState().global.defectSystem || {};
        this.releaseForm = this.formBuilder.group({
            'name' : [this.release.name, Validators.compose([Validators.required, Validators.pattern('^.{2,50}$')])],
            'description' : [this.release.description, Validators.pattern('^(.|[\n\r]){0,255}$')],
            'status' : [this.release.status],
            'startDate': ['', Validators.required],
            'endDate': [''],
            'externalSystem': ['']
          });
        this._previousValue = _.cloneDeep(this.releaseForm.value);
    }

    updateReleaseFormValues() {
      //this.releaseForm.reset();

      //not updating startDate and endDate because it is already binded with this.release object keys
      this.releaseForm.patchValue({
        'name': this.release.name,
        'description' : this.release.description || '',
        'status' : this.release.status,
        'externalSystem': this.release.externalSystem || '',
        //'startDate': this.release.startDate,
        //'endDate': this.release.endDate,
      });
    }

    //Function called when release-form is submitted
    onReleaseFormSubmit(formValues) {
      if(formValues.startDate) {
        formValues['releaseStartDate'] = formValues.startDate;
      }
      if(formValues.endDate) {
        formValues['releaseEndDate'] = formValues.endDate;
      }
      for (var key in formValues) {
          if (formValues.hasOwnProperty(key)) {
            var val = formValues[key];
            if (key === 'startDate' || key === 'endDate') {
              if (!val) {
                delete formValues[key];
                continue;
              }
              let date = new Date(val);
                val = date.getTime();
              formValues[key] = val;
            } else if (key === 'status') {
              val = val === false ? 0 : 1;
              formValues[key] = val;
            }
          }
      }
      this.isShowForm = false;
      //If add-form, calls add-release action
      if (this.isAdd) {
        delete formValues['id'];
        //fetching project id of current selected project from localstorage.
        formValues['projectId'] = this.currentProject['id'];
        this.zephyrStore.dispatch(this._releaseAction.addRelease(formValues));
      } else { //if edit-form, calls edit-release action
        let _release = formValues;
        _release.id = this.release.id;
        this.zephyrStore.dispatch(this._releaseAction.editRelease(_release));
      }
      //this.releaseForm.reset();
    }

    //Updates the form, whenever release-grid-row is clicked
    updateReleaseForm(releaseDataOBject) {
      this.isShowForm = true;
      this.isAdd = false;
      this.currentProject = JSON.parse(localStorage.getItem(`${window.tab}-currentProject`));
      this.datesValidation.startDateMin = moment(this.currentProject['startDate'])._d;
      this.datesValidation.startDateMax = this.currentProject['endDate'] &&
                            moment(this.currentProject['endDate'])._d;
      this.datesValidation.endDateMax = this.currentProject['endDate'] &&
                            moment(this.currentProject['endDate'])._d;
      this.datesValidation.endDateMin =  moment(releaseDataOBject.startDate)._d ||
                                    moment(this.currentProject['startDate'])._d;
      this.release = _.cloneDeep(releaseDataOBject);
      this.release.status = this.release.status == 0 ? false : true;
      this.release.startDate = moment(this.release.startDate)._d;
      this.release.endDate = this.release.endDate && moment(this.release.endDate)._d;
      this.updateReleaseFormValues();
      this._previousValue = _.cloneDeep(this.releaseForm.value);
      this._previousValue['startDate'] = moment(this.release.startDate).format(RELEASE_DATE_FORMAT);
      this._previousValue['endDate'] = this.release.endDate ? moment(this.release.endDate).format(RELEASE_DATE_FORMAT) : null;
    }

    //Resets the form, when add new release is clicked
    resetReleaseForm () {
      this.isAdd = true;
      this.isShowForm = true;
      this.currentProject = JSON.parse(localStorage.getItem(`${window.tab}-currentProject`));
      this.datesValidation.startDateMin = moment(this.currentProject['startDate'])._d;
      this.datesValidation.startDateMax = this.currentProject['endDate'] &&
                            moment(this.currentProject['endDate'])._d;
      this.datesValidation.endDateMax = this.currentProject['endDate'] &&
                            moment(this.currentProject['endDate'])._d;
      this.datesValidation.endDateMin =  moment(this.currentProject['startDate'])._d;
      this.release = _.cloneDeep(RELEASE_INIT_STATE);
      this.updateReleaseFormValues();
    }

    //This function updates the endDate validation
    onChangeStartDate ($event) {
      this.datesValidation.endDateMin = moment(moment(this.releaseForm.value.startDate,RELEASE_DATE_FORMAT).unix() *1000)._d ||
              moment(this.currentProject['startDate'])._d;
      // this.releaseForm.dirty = true;
      //this.datesValidation.endDateMin =  moment(this.releaseForm['startDate'])._d || moment(this.currentProject['startDate'])._d;
    }

    onChangeEndDate ($event) {
      // this.releaseForm.dirty = true;
    }

    //Hides the form on click of form cancel button
    cancelReleaseForm() {
      if(this.shouldNotAllowClose()) {
        //jQuery('#zui-unsaved-changes-prompt').modal('show');
        this.showDirtyCheckModal = true;
      } else {
        this.clearReleaseForm();
      }
    }

    shouldNotAllowClose() {
      let previousString = JSON.stringify(this._previousValue);
      let currentString = JSON.stringify(this.releaseForm.value);

      return previousString !== currentString;
    }

    clearReleaseForm() {
      this.hideReleaseForm();
      this.deHighlightRow();
      if(this.cdr) { this.cdr.markForCheck(); }
      //this.releaseForm.reset();
    }

    continueNavigation(event) {
      //jQuery('#zui-unsaved-changes-prompt').modal('hide');

      this.showDirtyCheckModal = false;
      setTimeout(() => {
        this.clearReleaseForm();
      }, 10);
    }

    dismissNavigation(event) {
      //jQuery('#zui-unsaved-changes-prompt').modal('hide');
      this.showDirtyCheckModal = false;
    }

    //Hides the release form
    hideReleaseForm() {
      // this.resetReleaseForm();
      this.isShowForm = false;
    }

    //De-highlites selected row
    deHighlightRow () {
      jQuery('.release-grid').find('tr').removeClass('selected-row');
    }

    //for checking, user cannot hide current release
    onChangeHide (value) {
      // if (value && !this.isAdd && this.release.id == this.currentRelease) {
      if (value && !this.isAdd && (this.release.id == this.currentRelease)) {
        jQuery('#confirmation-modal-form').modal();
        this.confirmationObject['heading'] = 'Invalid Hide';
        this.confirmationObject['text'] = 'Current release cannot be hidden, if you wish to hide'
                        + ' this release please navigate to another release';
        this.confirmationObject['buttonText'] = 'OK';
        this.confirmationObject['showCancelButton'] = false;
        this.confirmationObject['action'] = NO_ACTION;
        this.release.status = false;
        (<FormControl>this.releaseForm.controls['status'])
            .setValue(false);
      }
      let curRel = this.globalReleases ? this.globalReleases.filter(projectObj => this.release.id === projectObj.id):'';
      let user = this.zephyrStore.getState().loggedInUser;
      let utililtyFunction = new UtililtyFunctions();
      let isManager = utililtyFunction.isUserManager(user);
      if(curRel && curRel.length && curRel[0].id && curRel[0].status == RELEASE_LOCKED && !isManager) {
        jQuery('#confirmation-modal-form').modal();
        this.confirmationObject['heading'] = 'Invalid Hide';
        this.confirmationObject['text'] = 'Release is locked. Please wait till it becomes visible again. '
            + 'Release would be automatically visible at end of cloning process.'
            + ' If you are sure release cloning process terminated before unlocking it, contact Zephyr Manager';
        this.confirmationObject['buttonText'] = 'OK';
        this.confirmationObject['showCancelButton'] = false;
        this.confirmationObject['action'] = NO_ACTION;
        this.release.status = true;
        (<FormControl>this.releaseForm.controls['status'])
          .setValue(true);
      }
      if(curRel && curRel.length && curRel[0].id && curRel[0].status == RELEASE_LOCKED && isManager) {
        jQuery('#confirmation-modal-form').modal();
        this.confirmationObject['heading'] = 'Warning';
        this.confirmationObject['text'] = 'You have changed the status of a locked release to visible. ' +
          'A release is locked during release cloning.'
        + 'Users can make modifications to the release if it is visible. ' +
          'If release cloning is in progress, please wait and undo your changes.'
        + '\n   If you are sure that release cloning process terminated before unlocking it, continue.';
        this.confirmationObject['buttonText'] = 'OK';
        this.confirmationObject['showCancelButton'] = false;
        this.confirmationObject['action'] = NO_ACTION;
        this.release.status = false;
        (<FormControl>this.releaseForm.controls['status'])
          .setValue(false);
      }
    }
    clickedOutside ($event : any, isDirty : any) {
      let that = this;
      // if (!($event.target).closest('form')) {
      //   if (isDirty) {
      //     let confirmationString = 'You have unsaved information. You may want to \'Save\''+
      //                             ' else these new changes will be lost.  Do you still want'+
      //                             ' to continue?';
      //     let retVal = confirm(confirmationString);
      //     if (!retVal) {
      //       $event.stopPropagation();
      //      }
      //   }
      // }
    }

    ngOnInit() {
      let self = this;
      setTimeout(()=> {
        document.addEventListener('click', (e)=> {
          self.clickedOutside(e, self.releaseForm.dirty);
        },true);
      }, 0);
    }

    ngOnDestroy () {
      let self = this;
      this.unsubscribe();
      document.removeEventListener('click', (e)=> {
          self.clickedOutside(e, self.releaseForm.dirty);
        },true);
    }
    confirmationActionCall($event) {
      let actionString = $event.target.value;
      if (actionString === NO_ACTION) {
        jQuery('#confirmation-modal-form').modal('hide');
      }
    }
    hasFormChanges() {
      let previousString = JSON.stringify(this._previousValue);
      let currentString = JSON.stringify(this.releaseForm.value);
      if(previousString == currentString) {
        return false;
      }
      return true;
    }
    isFormInValid(form) {
      return !this.hasFormChanges() || !form.valid;
    }
  }
