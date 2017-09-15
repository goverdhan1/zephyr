import {Component, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
//import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control} from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {FormInputValidator} from '../../../../validators/form_input_validator';


import {TestcaseEASAction} from '../../../../../actions/testcaseEAS.action';
import {ZephyrStore} from '../../../../../store/zephyr.store';


declare var jQuery: any, window: any, moment: any;

@Component({
    templateUrl: 'eas_addCycle.html'
})

export class EasAddCycleComponent implements AfterViewInit {
    _releaseId;
    cycleInfo;
    currentProject;
    addCycleForm: FormGroup;
    public startDate:Date;
    public endDate:Date;

    public startMinDate:Date = void 0;
    public startMaxDate:Date = void 0;
    public endMinDate:Date = void 0;
    public endMaxDate:Date = void 0;


    private zephyrStore;

    constructor(private _testcaseEASAction: TestcaseEASAction, private fb: FormBuilder, private route: ActivatedRoute) {

        this._releaseId = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`)).id;
        this.currentProject = localStorage.getItem(`${window.tab}-currentProject`) ? JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)) : undefined;
        //console.log('printing out testcaseEas Action in addCycleComponent', _testcaseEASAction, this, this._releaseId);
        this.zephyrStore = ZephyrStore.getZephyrStore();
        var cycleId = 1;
//        console.log('the state', this.zephyrStore, this._releaseId, JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)));

        this.addCycleForm = this.fb.group({
          name: ['', Validators.compose([Validators.required, Validators.pattern('^.{2,128}$'), FormInputValidator['invalidateOnlySpaces']])],
          build: ['', Validators.pattern('^.{0,128}$')],
          environment: ['', Validators.pattern('^.{0,128}$')],
          status: [''],
          startDate: ['', Validators.required],
          endDate: ['', Validators.required]
        });

        var that = this;
//        console.log('inside add node component', this, this.zephyrStore.getState().testcaseEAS);
        var modalCycle = this.zephyrStore.getState().testcaseEAS.cycles;
        //(this.endMinDate = new Date()).setDate(this.endMinDate.getDate() + 1);

        this.cycleInfo = modalCycle.filter(function(cycle){
            return cycle.id === cycleId;
        })[0];

        if(this.currentProject && this.currentProject.startDate) {
            this.startMinDate = moment(this.currentProject.startDate)._d;
            this.endMinDate = moment(this.currentProject.startDate)._d;
        }
        if(this.currentProject && this.currentProject.endDate) {
            this.endMaxDate = moment(this.currentProject.endDate)._d;
            this.startMaxDate = moment(this.currentProject.endDate)._d;
        }

//        console.log('cycleInfo', this.cycleInfo);
    }

    ngAfterViewInit() {
        jQuery('#easAddCycleModal').modal();
    }

    resetDates(e) {

//        console.log('this.addCycleForm.value', this.addCycleForm.value);
        let formValues = this.addCycleForm.value;
        if(!formValues.startDate && !formValues.endDate) {
            return;
        }
        if(formValues.startDate) {
            formValues['cycleStartDate'] = formValues.startDate;
            this.endMinDate = moment(formValues.startDate, 'MM/DD/YYYY')._d;
        }
        if(formValues.endDate) {
            formValues['cycleEndDate'] = formValues.endDate;
            this.startMaxDate = moment(formValues.endDate, 'MM/DD/YYYY')._d;
        }
    }

    /*  Desired DS
    * {
    *  "name": "eret",
    *  "startDate": 1470940200000,
    *  "endDate": 1471199400000,
    *  "status": 0,
    *  "releaseId": 1,
    *  "createdOn": 1470940200000
    } */

    addCycleFormSubmit(formValues) {

        if(formValues.startDate) {
            formValues['cycleStartDate'] = formValues.startDate;
        }
        if(formValues.endDate) {
            formValues['cycleEndDate'] = formValues.endDate;
        }
        Object.keys(formValues).forEach(field => {
            if(field === 'startDate' || field === 'endDate') {
                formValues[field] = moment(formValues[field], 'MM/DD/YYYY').unix() * 1000;
                //let val = new Date(formValues[field]);
                //formValues[field] = val.getTime();

            } else if(field === 'status') {
                formValues[field] = (!formValues[field]) ? 0 : 1;
            }

            formValues['releaseId'] = this._releaseId;
        });
//        console.log('form value', formValues);
        this.zephyrStore.dispatch(this._testcaseEASAction.addCycle(formValues));
        jQuery('#easAddCycleModal').modal('hide');
    }


  inputKeyPress($event) {
    if ($event.which == 13 || $event.keyCode == 13) {

      if (!this.addCycleForm.invalid) {
        this.addCycleFormSubmit(this.addCycleForm.value);
      }

      return false;
    }
    return true;
  }

}
