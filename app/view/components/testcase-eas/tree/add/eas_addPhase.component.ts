import {Component, AfterViewInit} from '@angular/core';
//import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control} from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {ActivatedRoute} from '@angular/router';
import {TestcaseEASAction} from '../../../../../actions/testcaseEAS.action';
import {ZephyrStore} from '../../../../../store/zephyr.store';

declare var jQuery: any, moment: any, _: any, window: any;

@Component({
    templateUrl: 'eas_addPhase.html'
})

export class EasAddPhaseComponent implements AfterViewInit {

    _releaseId;
    cycleInfo;
    cyclePhases;
    isNewPhase = false;
    addPhaseForm;

    public startDate:Date;
    public endDate:Date;

    public startMinDate:Date = void 0;
    public startMaxDate:Date = void 0;
    public endMinDate:Date = void 0;
    public endMaxDate:Date = void 0;

    private zephyrStore;

    constructor(private _testcaseEASAction: TestcaseEASAction, private fb: FormBuilder) {
        this._releaseId = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`)).id;
        this.zephyrStore = ZephyrStore.getZephyrStore();

        this.addPhaseForm = this.fb.group({
          name: [''],
          phaseListing: [''],
          startDate: [''],
          endDate: ['']
        });
    }

    ngAfterViewInit() {
       jQuery('#easAddPhaseModal').modal();
    }

    togglePhaseSelection(value) {
      this.isNewPhase = value;

//      console.log(this.addPhaseForm.value);
      this.checkValidations (value);

    }
    checkValidations (value) {
      let validations = {
        phaseListing: [this.addPhaseForm.value.phaseListing],
        startDate: [this.addPhaseForm.value.startDate],
        endDate: [this.addPhaseForm.value.endDate]
      };

      if (value) {
        validations['name'] = [this.addPhaseForm.value.name, Validators.compose([Validators.required,
          Validators.pattern('^(?=.{1,128}$)(?=^[\\s]*)(?=.*[\\s]*$)(?=.*[\\S]+).*$')])];
      } else {
        validations['name'] = [this.addPhaseForm.value.name];
      }

      this.addPhaseForm = this.fb.group(validations);
    }

    functionCalling(node , self) {
       let nodeData = JSON.parse(node);
       this.cyclePhases = self.cyclePhases.length ? _.sortBy(self.cyclePhases, (phase)=> {
         return phase.name.toLowerCase();
       }) : [];
       this.cycleInfo = self.response.filter(function(cycle){
         return (cycle.id === nodeData['data-id']) && cycle.name === nodeData['data-name'] ;
       })[0];

       if(this.cyclePhases.length) {
         (<FormControl>this.addPhaseForm.controls['phaseListing'])
        .setValue(this.cyclePhases[0].id);
       } else {
         this.isNewPhase = true;
         this.checkValidations(true);
       }


      this.startDate = moment(this.cycleInfo.startDate)._d;
      this.endDate = moment(this.cycleInfo.endDate)._d;
      this.endMinDate = moment(this.cycleInfo.startDate)._d;
      this.endMaxDate = moment(this.cycleInfo.endDate)._d;

      this.startMaxDate = moment(this.cycleInfo.endDate)._d;
      this.startMinDate = moment(this.cycleInfo.startDate)._d;


//      console.log('node data in ', nodeData, self, this.cycleInfo);

    }

    resetDates(e) {
        var formValues = this.addPhaseForm.value,
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

    /* Desired DS
     * {
     * "name": "hello",
     * "freeForm": true,
     * "startDate": 1471199400000,
     * "endDate": 1471545000000,
     * "createdOn": 1470716915000,
     * "cycleId": 1
     * }
    */

    addPhaseFormSubmit(formValues) {

        let newFormValues = {};
        Object.keys(formValues).forEach(field => {
          if(field === 'startDate' || field === 'endDate') {
              newFormValues[field] = moment(formValues[field], 'MM/DD/YYYY').unix() * 1000;
          }
          newFormValues['phaseStartDate'] = formValues.startDate;
          newFormValues['phaseEndDate'] = formValues.endDate;
          newFormValues['cycleId'] = this.cycleInfo.id;
          newFormValues['releaseId'] = this._releaseId;
          let phaseListingValue = this.cyclePhases.filter(phase => phase.id === parseInt(formValues['phaseListing']))[0];
          newFormValues['name'] = !this.isNewPhase ? phaseListingValue.name : formValues['name'];
          newFormValues['freeForm'] = this.isNewPhase;
          if(!this.isNewPhase) {
            newFormValues['tcrCatalogTreeId'] = parseInt(formValues['phaseListing']);
          }
        });

//        console.log('form value', formValues, newFormValues);
        this.zephyrStore.dispatch(this._testcaseEASAction.addPhase(newFormValues,newFormValues['cycleId']));
        jQuery('#easAddPhaseModal').modal('hide');
    }

}
