import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
//import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {TestcaseEASAction} from '../../../../../actions/testcaseEAS.action';
import {ZephyrStore} from '../../../../../store/zephyr.store';

// import {GridUtil} from '../../../grid/grid_util';

declare var jQuery: any, _: any, moment: any, window;
declare var ref;

@Component({
    templateUrl: 'eas_editCycle.html'
})

export class EasEditCycleComponent implements OnInit {
    _releaseId;
    cycleInfo;
    cyclePhases;
    cycleGrid;
    cycleDuration;
    currentProject;
    lastCycleStartTime;
    fixPeriod = false;
    canUpdate = true;
    _previousValue;
    editCycleForm;

    public startDate:Date;
    public endDate:Date;

    public startMinDate:Date = void 0;
    public startMaxDate:Date = void 0;
    public endMinDate:Date = void 0;
    public endMaxDate:Date = void 0;

    private zephyrStore;


    constructor(private _testcaseEASAction: TestcaseEASAction , private fb: FormBuilder) {
      this._releaseId = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`)).id;
      this.zephyrStore = ZephyrStore.getZephyrStore();
      this.currentProject = localStorage.getItem(`${window.tab}-currentProject`) ? JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)) : undefined;
      // ref = this;
    }

    ngOnInit() {
      this.editCycleForm = this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.pattern('^.{2,128}$')])],
        build: ['', Validators.pattern('^.{0,128}$')],
        environment: ['', Validators.pattern('^.{0,128}$')],
        status: [''],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        phases: this.fb.array([])
       });

      (<FormControl>this.editCycleForm.controls['name'])
      .setValue(this.cycleInfo.name);
      (<FormControl>this.editCycleForm.controls['build'])
      .setValue(this.cycleInfo.build);
      (<FormControl>this.editCycleForm.controls['environment'])
      .setValue(this.cycleInfo.environment);
      (<FormControl>this.editCycleForm.controls['status'])
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
      const control = <FormArray>this.editCycleForm.controls['phases'];

      if(this.cyclePhases && this.cyclePhases.length) {
        this.cyclePhases.forEach(phase => {
          control.push(this.initPhaseDates(phase.id));
        });
      }

      let tempEndDate = moment(this.cycleInfo.endDate).startOf('day').unix()*1000;
      let tempStartDate = moment(this.cycleInfo.startDate).startOf('day').unix()*1000;
      this.cycleDuration = (parseInt(((tempEndDate - tempStartDate)/1000/60/60/24)+'')+1);

      // Setting a delay as the Phases dates are not yet set
      setTimeout(() => {
        this._previousValue = _.cloneDeep(this.editCycleForm.value);
      }, 300);
      jQuery('#easEditNodeModal').modal();
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

    inputKeyPress($event) {
      if ($event.which == 13 || $event.keyCode == 13) {

        this.editCycleFormSubmit(this.editCycleForm.value);

        return false;
      }
      return true;
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
       //this.cyclePhases = self.cyclePhases.length ? self.cyclePhases : [];
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
    }

    resetPhaseDates(e, index) {
      //console.log('check', index, this.cycleInfo.cyclePhases[index]);
      var formValues = this.editCycleForm.value.phases[index],
          phaseformValues = this.editCycleForm.value.phases[index],
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
      let formValues = this.editCycleForm.value;

      if(this.fixPeriod && formValues.startDate) {

        let startDiff, cycleStartTimestamp, formValueStartTimestamp;
        formValues['cycleStartDate'] = formValues.startDate;
        if(!this.lastCycleStartTime) {
          this.lastCycleStartTime = moment(this.cycleInfo.startDate).startOf('day').unix() * 1000;
        }
        cycleStartTimestamp = this.lastCycleStartTime;
        formValueStartTimestamp = moment(formValues.startDate, 'MM/DD/YYYY').startOf('day').unix() * 1000;
        startDiff = this.returnDuration(cycleStartTimestamp, formValueStartTimestamp);
        let endDate = moment(formValues.startDate, 'MM/DD/YYYY').add(this.cycleDuration - 1, 'days');

        if(moment(formValues.endDate, 'MM/DD/YYYY').unix() * 1000 !== endDate.unix() * 1000) {
          this.endDate = endDate._d;
          formValues['cycleEndDate'] = endDate.format('MM/DD/YYYY');
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
          formValues['cycleStartDate'] = formValues.startDate;
          this.endMinDate = moment(formValues.startDate, 'MM/DD/YYYY')._d;
      }
      if(formValues.endDate) {
          formValues['cycleEndDate'] = formValues.endDate;
          this.startMaxDate = moment(formValues.endDate, 'MM/DD/YYYY')._d;
      }

      if(this.cyclePhases && this.cyclePhases.length) {
        this.updatePhaseDates();
      }
      // this.reRunValidations();
    }

    updatePhaseDates() {
      let formValues = this.editCycleForm.value;

      this.canUpdate = true;
      this.cyclePhases.forEach((phase, i) => {
        var phaseformValues = this.editCycleForm.value.phases[i],
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
      let formValues = this.editCycleForm.value;
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

    /* Desired DS
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

    editCycleFormSubmit(formValues) {

        if(formValues.startDate) {
          formValues['cycleStartDate'] = formValues.startDate;
        }
        if(formValues.endDate) {
          formValues['cycleEndDate'] = formValues.endDate;
        }

        Object.keys(formValues).forEach(field => {
          if(field === 'startDate' || field === 'endDate') {
              formValues[field] = moment(formValues[field], 'MM/DD/YYYY').unix() * 1000;
              // let val = new Date(formValues[field]);
              // formValues[field] = val.getTime();
          } else if(field === 'status') {
              formValues[field] = (!formValues[field]) ? 0 : 1;
          }

          formValues['releaseId'] = this._releaseId;
          formValues['id'] = this.cycleInfo.id;

        });

        if(this.cycleInfo.cyclePhases && this.cycleInfo.cyclePhases.length) {
          formValues.cyclePhases = [];
          this.cycleInfo.cyclePhases.forEach(phase => {
             let c = Object.assign({}, phase),
              obj = formValues.phases.filter(phase => {
                return phase.id === c.id;
              })[0];

            c.startDate = moment(obj.startDate, 'MM/DD/YYYY').unix() * 1000;
            c.endDate = moment(obj.endDate, 'MM/DD/YYYY').unix() * 1000;
            c['phaseStartDate'] = obj.startDate;
            c['phaseEndDate'] = obj.endDate;
            // c.startDate = (formValues['startDate'] > c.startDate) ? formValues['startDate'] : c.startDate;
            // c.endDate = (formValues['endDate'] < c.endDate) ? formValues['endDate'] : c.endDate;
            delete c.style;

            formValues.cyclePhases.push(c);
          });
          delete formValues.phases;
        }



//        console.log('form value', formValues, this.cycleInfo);
        this.zephyrStore.dispatch(this._testcaseEASAction.editCycle(formValues,formValues['id']));
        jQuery('#easEditNodeModal').modal('hide');
    }

    reRunValidations() {
//      console.log('lets check if this runs');
      this.editCycleForm.controls['endDate'].valueChanges.observer({
          next: (value) => {
             //this.formGp.controls['numberFld'].updateValueAndValidity();
             this.editCycleForm.controls.phases.controls.forEach((control)=> {
               control['startDate'].updateValueAndValidity();
               control['endDate'].updateValueAndValidity();
             });
          }
      });
    }
    hasFormChanges() {
      let previousString = JSON.stringify(this._previousValue);
      let currentString = JSON.stringify(this.editCycleForm.value);
      if(previousString == currentString) {
        return false;
      }
      return true;
    }
    isFormInValid(form) {
      return !this.hasFormChanges() || !(this.canUpdate && form.valid);
    }

//     private validateCycleDate(date) {
//       //console.log('date please', date.value, ref, moment(ref.startDate).unix());
//       let cycleStartDate = moment(ref.startDate).startOf('day').unix() * 1000,
//           cycleEndDate = moment(ref.endDate).startOf('day').unix() * 1000,
//           phaseDate = moment(date.value, 'MM/DD/YYYY').unix() * 1000;
// //      console.log(cycleStartDate, cycleEndDate, phaseDate);
//       if(phaseDate <= cycleEndDate && phaseDate >= cycleStartDate) {
//         return null;
//       }
//        return { 'invalidName': true };
//     }
}
