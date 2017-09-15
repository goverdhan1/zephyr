import {Component, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
//import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {TestcaseEASAction} from '../../../../../actions/testcaseEAS.action';
import {ZephyrStore} from '../../../../../store/zephyr.store';

declare var jQuery: any, moment: any, _, window;

@Component({
    templateUrl: 'eas_editPhase.html'
})

export class EasEditPhaseComponent implements AfterViewInit {
    _releaseId;
    cycleInfo;
    phaseInfo;
    cyclePhases;
    cycleGrid;
    _previousValue;
    editPhaseForm;
    public startDate:Date;
    public endDate:Date;

    public startMinDate:Date = void 0;
    public startMaxDate:Date = void 0;
    public endMinDate:Date = void 0;
    public endMaxDate:Date = void 0;


    private zephyrStore;


    constructor(private _testcaseEASAction: TestcaseEASAction , fb: FormBuilder) {
        this._releaseId = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`)).id;
        this.zephyrStore = ZephyrStore.getZephyrStore();

        this.editPhaseForm = fb.group({
          name: [{value:'', disabled: true}, Validators.required],
          startDate: ['', Validators.required],
          endDate: ['', Validators.required]
         });
    }

    ngAfterViewInit() {
       jQuery('#easEditNodeModal').modal();
    }


    functionCalling(node , self) {
      let nodeData = JSON.parse(node);
      if(!(nodeData['data-node'] === 'phase' && nodeData['data-cycleId'])) { return; }
      this.cycleInfo = self.response.filter(function(cycle){
         return (cycle.id === nodeData['data-cycleId']);
       })[0];
      this.phaseInfo = this.cycleInfo.cyclePhases.filter(function(phase){
        return (phase.id === nodeData['data-id']) && phase.name === nodeData['data-name'] ;
      })[0];

      (<FormControl>this.editPhaseForm.controls['name'])
        .setValue(this.phaseInfo.name);
      //this.editPhaseForm.controls['name'].disabled = this.phaseInfo.freeForm;
      if(this.phaseInfo.freeForm) {
        this.editPhaseForm.controls['name'].enable();
      }

      // (<FormControl>this.editPhaseForm.controls['name'])
      //   .patchValue({name: this.phaseInfo.name, disabled: this.phaseInfo.freeForm});
      // (<FormControl>this.editPhaseForm.controls['startDate'])
      //   .setValue(moment(this.phaseInfo.startDate).format('MM/DD/YYYY'));
      // (<FormControl>this.editPhaseForm.controls['endDate'])
      //   .setValue(moment(this.phaseInfo.endDate).format('MM/DD/YYYY'));

      this.startDate = moment(this.phaseInfo.startDate)._d;
      this.endDate = moment(this.phaseInfo.endDate)._d;
      this.endMinDate = moment(this.cycleInfo.startDate)._d;
      this.endMaxDate = moment(this.cycleInfo.endDate)._d;

      this.startMaxDate = moment(this.cycleInfo.endDate)._d;
      this.startMinDate = moment(this.cycleInfo.startDate)._d;

      // Setting a delay as the Phases dates are not yet set
      setTimeout(() => {
        this._previousValue = _.cloneDeep(this.editPhaseForm.value);
      }, 300);
    }

    resetDates(e) {
        var formValues = this.editPhaseForm.value,
            max, min;

        if(formValues.startDate) {
            max = Math.max(this.cycleInfo.startDate, moment(formValues.startDate,'MM/DD/YYYY').unix() *1000);
            this.endMinDate = moment(max)._d;
        }
        if(formValues.endDate) {
            min = Math.min(this.cycleInfo.endDate, moment(formValues.endDate,'MM/DD/YYYY').unix() *1000);
            this.startMaxDate = moment(min)._d;
        }
    }

    /* API endpoint
     * Desired DS for edit
     * {
     *  "id": 264 (phaseId),
     *  "cycleId": 106 (cycleId),
     *  "tcrCatalogTreeId" : 3522,
     *  "name": "Automation",
     *  "startDate": 1471113000000,
     *  "endDate": 1471631400000,
     *  "freeform" : false
     * }
     */

    editPhaseFormSubmit(formValues) {

        let phaseForm = this.cycleInfo.cyclePhases.filter(phase => {
          return phase.id === this.phaseInfo.id;
        })[0];
        phaseForm['phaseStartDate'] = formValues['startDate'];
        phaseForm['phaseEndDate'] = formValues['endDate'];
        Object.keys(formValues).forEach(field => {
          if(field === 'startDate' || field === 'endDate') {
            phaseForm[field] = formValues[field] = moment(formValues[field], 'MM/DD/YYYY').unix() * 1000;
          }
          //formValues['releaseId'] = this._releaseId;
          //formValues['createdOn'] = moment().unix() * 1000;
          //formValues['id'] = this.phaseInfo.id;
        });
        phaseForm['name'] = formValues['name'];
        //delete phaseForm.style;
        //delete phaseForm.text;

        this.zephyrStore.dispatch(this._testcaseEASAction.editPhase(phaseForm,this.cycleInfo['id']));
        jQuery('#easEditNodeModal').modal('hide');
    }
    hasFormChanges() {
      let previousString = JSON.stringify(this._previousValue);
      let currentString = JSON.stringify(this.editPhaseForm.value);
      if(previousString == currentString) {
        return false;
      }
      return true;
    }
    isFormInValid(form) {
      return !this.hasFormChanges() || !form.valid;
    }
}
