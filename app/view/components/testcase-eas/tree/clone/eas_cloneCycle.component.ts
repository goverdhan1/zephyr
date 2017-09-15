import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
//import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {TestcaseEASAction} from '../../../../../actions/testcaseEAS.action';
import {ZephyrStore} from '../../../../../store/zephyr.store';

// import {GridUtil} from '../../../grid/grid_util';

declare var jQuery: any, _: any, moment: any, window;

@Component({
    templateUrl: 'eas_cloneCycle.html'
})

export class EasCloneCycleComponent implements OnInit {
    _releaseId;
    cyclePhases;
    cycleInfo;
    cycleGrid;
    currentProject;
    queryParams;
    fixPeriod = false;
    cycleDuration;
    lastCycleStartTime;
    canUpdate = true;
    cloneCycleForm;

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
      this.currentProject = localStorage.getItem(`${window.tab}-currentProject`) ? JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)) : undefined;
    }

    ngOnInit() {
      this.cloneCycleForm = this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.pattern('^.{2,128}$')])],
        build: ['', Validators.pattern('^.{0,128}$')],
        environment: ['', Validators.pattern('^.{0,128}$')],
        status: [''],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        copyassignments: [''],
        phases: this.fb.array([])
       });

      (<FormControl>this.cloneCycleForm.controls['name'])
      .setValue(this.cycleInfo.name);
      (<FormControl>this.cloneCycleForm.controls['build'])
      .setValue(this.cycleInfo.build);
      (<FormControl>this.cloneCycleForm.controls['environment'])
      .setValue(this.cycleInfo.environment);
      (<FormControl>this.cloneCycleForm.controls['status'])
      .setValue(this.cycleInfo.status);

      if(this.currentProject && this.currentProject.startDate) {
          this.startMinDate = moment(this.currentProject.startDate)._d;
          this.endMinDate = moment(this.currentProject.startDate)._d;
      }
      if(this.currentProject && this.currentProject.endDate) {
          this.endMaxDate = moment(this.currentProject.endDate)._d;
          this.startMaxDate = moment(this.currentProject.endDate)._d;
      }

      this.setInitialDates();
      const control = <FormArray>this.cloneCycleForm.controls['phases'];

      if(this.cyclePhases && this.cyclePhases.length) {
        this.cyclePhases.forEach(phase => {
          control.push(this.initPhaseDates(phase.id));
        });
      }

      let tempEndDate = moment(this.cycleInfo.endDate).startOf('day').unix()*1000;
      let tempStartDate = moment(this.cycleInfo.startDate).startOf('day').unix()*1000;
      this.cycleDuration = (parseInt(((tempEndDate - tempStartDate)/1000/60/60/24)+'')+1);
      // this.cycleDuration = moment(this.cycleInfo.endDate - this.cycleInfo.startDate).format('DD');
    }

    setInitialDates() {

      this.startDate = moment(this.cycleInfo.startDate)._d;
      this.endDate = moment(this.cycleInfo.endDate)._d;

      if(this.cyclePhases && this.cyclePhases.length) {
        this.cyclePhases.forEach(phase => {

          let filteredPhase = this.cycleInfo.cyclePhases.filter(ph=> {
            return ph.id === phase.id;
          })[0];
          phase.startDate = moment(filteredPhase.startDate)._d;
          phase.endDate = moment(filteredPhase.endDate)._d;

          phase.endMinDate = moment(this.cycleInfo.startDate)._d;
          phase.endMaxDate = moment(this.cycleInfo.endDate)._d;

          phase.startMaxDate = moment(this.cycleInfo.endDate)._d;
          phase.startMinDate = moment(this.cycleInfo.startDate)._d;

          phase.startDateValid = true;
          phase.endDateValid = true;
        });
      }
    }

    initPhaseDates(id) {
      // initialize our dates for phases
      return this.fb.group({
          startDate: [''],
          endDate: [''],
          id: [id]
      });
    }


    functionCalling(node , self) {
      let nodeData = JSON.parse(node);
      // this.cyclePhases = self.cyclePhases.length ? self.cyclePhases : [];
      this.cycleInfo = self.response.filter(function(cycle){
        return (cycle.id === nodeData['data-id']) && cycle.name === nodeData['data-name'] ;
      })[0];

      if(this.cycleInfo.cyclePhases && this.cycleInfo.cyclePhases.length) {
         this.cyclePhases = [];
         this.cycleInfo.cyclePhases.forEach(phase => {
           let c = Object.assign({}, phase);
           this.cyclePhases.push(c);
         });
      }
//       console.log('node data in ', nodeData, self, this.cycleInfo);
    }

    resetPhaseDates(e, index) {
//      //console.log('check', index, this.cycleInfo.cyclePhases[index]);
      var formValues = this.cloneCycleForm.value.phases[index],
          phaseformValues = this.cloneCycleForm.value.phases[index],
          max, min,
          phase = this.cyclePhases[index];
        max = Math.max(moment(formValues.startDate, 'MM/DD/YYYY').unix() * 1000,
          moment(phaseformValues.startDate,'MM/DD/YYYY').unix() * 1000);
        phase.endMinDate = moment(max)._d;
        min = Math.min(moment(formValues.endDate, 'MM/DD/YYYY').unix() * 1000,
          moment(phaseformValues.endDate,'MM/DD/YYYY').unix() *1000);
        phase.startMaxDate = moment(min)._d;
        this.updatePhaseDates();
    }

    returnDuration(dt1, dt2) {
      //return (dt1 > dt2) ? -1 * (parseInt(moment(dt1 - dt2).format('DD'))) + 1 : parseInt(moment(dt2 - dt1).format('DD')) - 1;
      return (dt1 > dt2) ? -1 * moment(dt1).diff(moment(dt2), 'days') : moment(dt2).diff(moment(dt1), 'days');
    }

    checkDatesValidity(cycle, phase) {
      let phaseDatesValidation = new Array<boolean>();
      (cycle.startDate <= phase.startDate) ? (phaseDatesValidation.push(true)) : (phaseDatesValidation.push(false));
      (cycle.endDate >= phase.endDate) ? (phaseDatesValidation.push(true)) : (phaseDatesValidation.push(false));
      return phaseDatesValidation;
    }

    resetDates(e) {
      let formValues = this.cloneCycleForm.value;

      if(this.fixPeriod && formValues.startDate) {
        let startDiff, cycleStartTimestamp, formValueStartTimestamp;
        if(!this.lastCycleStartTime) {
          this.lastCycleStartTime = moment(this.cycleInfo.startDate).startOf('day').unix() * 1000;
        }
        cycleStartTimestamp = this.lastCycleStartTime;
        formValueStartTimestamp = moment(formValues.startDate, 'MM/DD/YYYY').startOf('day').unix() * 1000;

        startDiff = this.returnDuration(cycleStartTimestamp, formValueStartTimestamp);
        let endDate = moment(formValues.startDate, 'MM/DD/YYYY').add(this.cycleDuration - 1, 'days');

        if(moment(formValues.endDate, 'MM/DD/YYYY').unix() * 1000 !== endDate.unix() * 1000) {
          this.endDate = endDate._d;

          if(this.cyclePhases && this.cyclePhases.length) {
            this.cyclePhases.forEach(phase => {
              //let phaseStart = phase.startDate
              let tempEndDate = moment(phase.endDate).startOf('day').unix()*1000;
              let tempStartDate = moment(phase.startDate).startOf('day').unix()*1000;
              let duration = (parseInt(((tempEndDate - tempStartDate)/1000/60/60/24)+'')+1);
              phase.startDate = moment(phase.startDate, 'MM/DD/YYYY').add(startDiff, 'days')._d;
              phase.endDate = moment(phase.startDate, 'MM/DD/YYYY').add(duration - 1, 'days')._d;

              // phase.endMinDate = moment(this.cycleInfo.startDate).add(1, 'days')._d;
              // phase.endMaxDate = moment(this.cycleInfo.endDate)._d;

              // phase.startMaxDate = moment(this.cycleInfo.endDate).subtract(1, 'days')._d;
              // phase.startMinDate = moment(this.cycleInfo.startDate)._d;
            });
          }
        }

        this.lastCycleStartTime = formValueStartTimestamp;

//        console.log('inside fix period', formValues, this.cycleDuration, startDiff);

        return;
      }

      if(formValues.startDate) {
          this.endMinDate = moment(formValues.startDate, 'MM/DD/YYYY')._d;
      }
      if(formValues.endDate) {
          this.startMaxDate = moment(formValues.endDate, 'MM/DD/YYYY')._d;
      }

      if(this.cyclePhases && this.cyclePhases.length) {
        this.updatePhaseDates();
      }
    }

    updatePhaseDates() {
      let formValues = this.cloneCycleForm.value;
      this.canUpdate = true;

      this.cyclePhases.forEach((phase, i) => {
          var phaseformValues = this.cloneCycleForm.value.phases[i],
              max, min;

          max = Math.max(moment(formValues.startDate, 'MM/DD/YYYY').unix() * 1000, moment(phaseformValues.startDate,'MM/DD/YYYY').unix() *1000);
          min = Math.min(moment(formValues.endDate, 'MM/DD/YYYY').unix() * 1000, moment(phaseformValues.endDate,'MM/DD/YYYY').unix() *1000);
          phase.startMaxDate = moment(min)._d;
          phase.startMinDate = moment(formValues.startDate, 'MM/DD/YYYY')._d;
          phase.endMaxDate = moment(formValues.endDate, 'MM/DD/YYYY')._d;
          phase.endMinDate = moment(max)._d;
          [phase.startDateValid, phase.endDateValid] = this.checkDatesValidity(formValues, phaseformValues);
          this.canUpdate = this.canUpdate && phase.startDateValid && phase.endDateValid;
        });
    }

    modifyAllDates (event) {
      let formValues = this.cloneCycleForm.value;
//      console.log(event.target.checked);
      if(event.target.checked) {
        // Fix the period. Disable all dates
        this.fixPeriod = true;
        this.setInitialDates();
        this.endMinDate = void 0;
        this.startMaxDate = this.currentProject.endDate ?
        moment(this.currentProject.endDate).subtract(this.cycleDuration - 1, 'days')._d : void 0;

      } else {
        this.fixPeriod = false;
        this.endMinDate = moment(formValues.startDate, 'MM/DD/YYYY')._d;
        this.startMaxDate = moment(formValues.endDate, 'MM/DD/YYYY')._d;
      }
    }

    /*Desired DS
     * {
     *  "id": 1,
     *  "environment": "Dev",
     *  "build": "b1",
     *  "name": "Cycle1 with Build1",
     *  "startDate": 1471113000000,
     *  "endDate": 1471631400000,
     *  "status": 0,
     *  "releaseId": 1,
     *  "createdOn": 1470719081000
     * }
    */
    cloneCycleFormSubmit(formValues) {

        let newFormValues = {};
        if(formValues.startDate) {
          newFormValues['cycleStartDate'] = formValues.startDate;
        }
        if(formValues.endDate) {
          newFormValues['cycleEndDate'] = formValues.endDate;
        }
        Object.keys(formValues).forEach(field => {
          if(field === 'startDate' || field === 'endDate') {
              //newFormValues[field] = moment(formValues[field], 'MM/DD/YYYY').unix() * 1000;
              let val = new Date(formValues[field]);
                newFormValues[field] = val.getTime();
          } else if(field === 'status') {
              newFormValues[field] = (!formValues[field]) ? 0 : 1;
          }

          newFormValues['releaseId'] = this._releaseId;
          //newFormValues['createdOn'] = moment().unix() * 1000;
          newFormValues['id'] = this.cycleInfo.id;
          if(this.cycleInfo.cyclePhases && this.cycleInfo.cyclePhases.length) {
            newFormValues['cyclePhases'] = this.cycleInfo.cyclePhases;
          }
        });

        this.queryParams = {};
        if(formValues['copyassignments']) {
          this.queryParams['copyassignments'] = formValues['copyassignments'];
        }
        // if(formValues['name']) {
        //   this.queryParams['name'] = formValues['name'];
        //   //newFormValues['name'] = formValues['name'];
        // }
        newFormValues['name'] = formValues['name'];
        newFormValues['build'] = formValues['build'];
        newFormValues['environment'] = formValues['environment'];

        this.queryParams['deep'] = true;

        if(this.cycleInfo.cyclePhases && this.cycleInfo.cyclePhases.length) {
          newFormValues['cyclePhases'] = [];
          this.cycleInfo.cyclePhases.forEach(phase => {
             let c = Object.assign({}, phase),
              obj = formValues.phases.filter(phase => {
                return phase.id === c.id;
              })[0];
            c.startDate = moment(obj.startDate).unix() * 1000;
            c.endDate = moment(obj.endDate).unix() * 1000;
            c['phaseStartDate'] = obj.startDate;
            c['phaseEndDate'] = obj.endDate;
            // c.startDate = (formValues['startDate'] > c.startDate) ? formValues['startDate'] : c.startDate;
            // c.endDate = (formValues['endDate'] < c.endDate) ? formValues['endDate'] : c.endDate;
            delete c.style;

            newFormValues['cyclePhases'].push(c);
          });
          delete formValues.phases;
        }

        console.log('form value', formValues, newFormValues, jQuery.param(this.queryParams));
        this.zephyrStore.dispatch(this._testcaseEASAction.cloneCycle(newFormValues, newFormValues['id'], jQuery.param(this.queryParams)));
        jQuery('#easCloneNodeModal').modal('hide');
    }
}
