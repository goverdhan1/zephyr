import {Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ZephyrStore} from '../../../store/zephyr.store';

declare var jQuery: any;
var def_self = null;

const LOGOUT_DOUBLE_CONFIRMATION = 'LOGOUT_DOUBLE_CONFIRMATION';
const LOGOUT = 'LOGOUT';
const NO_ACTION = 'NO_ACTION';

@Component({
  selector: 'preference-form',
  templateUrl: 'defects_admin_form.html'
})

export class PreferenceFormComponent implements OnChanges {
    @Input() allPreferences;
    @Input() preferenceObject;
    @Output() onFormSubmit: EventEmitter<any> = new EventEmitter();
    @Output() onFormCancel: EventEmitter<any> = new EventEmitter();
    @Output() onConfirmActionCall: EventEmitter<any> = new EventEmitter();


    formtype;
    zephyrStore;
    state;
    preferenceForm : FormGroup;
    unsubscribe;
    confirmationObject = {};
    addedPref;
    valueErrorMsg = '';

    constructor( private fb: FormBuilder, public router: Router) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        def_self = this;

        this.preferenceForm = this.fb.group({
          name: ['', Validators.compose([Validators.required, Validators.pattern('^.{1,255}$'), this.uniquePreference])],
          value : [''],
          active:['']

         });


        // this.unsubscribe = this.zephyrStore.subscribe(() => {

        // });
    }

    ngOnChanges(changes: SimpleChanges) {
      console.debug('SimpleChanges', changes);
      if(changes['preferenceObject']) {
        let prefObj = changes['preferenceObject'].currentValue;
        this.checkValidations(prefObj);
        this.updatePreferenceForm(prefObj);
        //this.addedPref = Object.keys(prefObj).indexOf('defaultValue') == -1 ? true : false;
      }
    }

    preferenceFormSubmit(formValues) {
     // console.log('before submiting', formValues, this.preferenceObject);
      this.onFormSubmit.emit({formValues: formValues, preference: this.preferenceObject});
    }

    checkValidations (value) {
      let validations = {
        name: [this.preferenceForm.value.name, Validators.compose([Validators.required, Validators.pattern('^.{1,255}$'),
          this.uniquePreference])],
        active: [this.preferenceForm.value.active]
      };
      //console.log('value', value, !isNaN(value.value));
      if (Object.keys(value).length) {
        if(value.defaultValue && !isNaN(value.defaultValue)) {
          validations['value'] = [this.preferenceForm.value['value'], Validators.compose([Validators.required,
            Validators.pattern('^[0-9]+$')])];
          this.valueErrorMsg = 'and should be of type integer';
        } else {
          validations['value'] = [this.preferenceForm.value['value'], Validators.required];
          this.valueErrorMsg = '';
        }

      } else {
        validations['value'] = [''];
        this.valueErrorMsg = '';
      }

      this.preferenceForm = this.fb.group(validations);
    }

    updatePreferenceForm(preferenceDataOBject) {
      let isAddPreference = !Object.keys(preferenceDataOBject).length;

      this.formtype = isAddPreference ? 'Add' : 'Edit';

      this.preferenceForm.patchValue({
        name : preferenceDataOBject.name,
        value :preferenceDataOBject.value,
        active : isAddPreference ? true : preferenceDataOBject.active
      });

    }

    hello () {
     // console.log('hello');
    }

    resetPreferenceForm () {
      //this.updatePreferenceForm(this.preferenceObject);
      this.onFormCancel.emit();
    }

    private uniquePreference(control) {
      if (!(def_self.allPreferences && def_self.allPreferences.length)) {
        return;
      }
      let match = def_self.allPreferences.filter((preference) => {
      //console.log('preference', preference, control.value);

        return (preference.name && control.value) && (preference.name.toLowerCase() == control.value.toLowerCase());
      });
      if(!(match && match.length) || def_self.formtype === 'Edit') {
        return null;
      }

      return { 'invalidName': true };
    }

  }
