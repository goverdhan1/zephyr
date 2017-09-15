import {Component, Input , Output , EventEmitter , OnChanges} from '@angular/core';
import {FormBuilder, AbstractControl, FormGroup, FormControl, Validators} from '@angular/forms';

import {ZephyrStore} from '../../../../store/zephyr.store';

// import './change_password.scss';

declare var jQuery: any;

const NEW_PASSWORD = 'NEW_PASSWORD';
const CONFIRM_PASSWORD = 'CONFIRM_PASSWORD';

@Component({
  selector: 'change-password',
  templateUrl: 'change_password.html'
})

export class ChangePasswordComponent implements OnChanges {
    @Input() changePasswordObject; //contains the support text
    @Input() passwordValidationFunction; //function for validating the password
    @Output() changePasswordUpdate: EventEmitter<any> = new EventEmitter(); //Emits the function with new value of password
    zephyrStore;
    state;
    indexedDB = {};
    enabledUpdate  = false;
    changePasswordForm : FormGroup;
    changeNewPassword;
    changeConfirmPassword;

    newPassword = {
      'value' : '',
      'showPasswordIcon' : true,
      'type' : 'password'
    };
    confirmPassword = {
      'value' : '',
      'showPasswordIcon' : true,
      'type' : 'password'
    };
    constructor (private fb: FormBuilder) {

        this.changePasswordForm = this.fb.group({
          newPassword: ['', Validators.required],
          confirmPassword : ['', Validators.required]
        });
    }


    changePasswordFormSubmit(formValue) {
      jQuery('#change-password-modal').modal('hide');
      this.changePasswordUpdate.emit(formValue.newPassword);
    }


    ngOnChanges(changes) {
      if(changes['changePasswordObject']) {
        this.renewValidations(changes['changePasswordObject'].currentValue);
      }
      //console.debug('this fires on changes in top nav', this.changePasswordObject, changes);
    }

    renewValidations(obj) {
      let validations = {
        'newPassword': null,
        'confirmPassword': ['', Validators.required]
      };
      switch(obj.policy) {
        case 'Default':
          validations['newPassword'] = ['', Validators.compose([Validators.required, Validators.pattern('^.{4,30}$')])];
          break;

        //~!@#$%^&*()_-+{}[]<>?/|:;.   //-[]/
        case 'Strong':
          validations['newPassword'] = ['', Validators.compose([Validators.required,
            Validators.pattern('^(?=.{8,30}$)(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()_\\-+{}[\\]<>?/|:;.]).*$')])];

          break;

        case 'Very Strong':
          validations['newPassword'] = ['', Validators.compose([Validators.required,
            Validators.pattern('^(?=.{10,30}$)(?=(.*\\d){2})(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*[~!@#$%^&*()_\\-+{}[\\]<>?/|:;.]){2}).*$')])];
          break;

        case 'Weak':
          validations['newPassword'] = ['', Validators.compose([Validators.required,
            Validators.pattern('^(?=.{6,30}$)(?=.*[0-9])(?=.*[A-Z]).*$')])];
          break;
      }
      this.changePasswordForm = this.fb.group(validations);
    }



    showpasswordClicked (inputType) {
      if (inputType === NEW_PASSWORD) {
         this.newPassword.type = 'text';
         this.newPassword.showPasswordIcon = false;
      } else if (inputType === CONFIRM_PASSWORD) {
        this.confirmPassword.type = 'text';
        this.confirmPassword.showPasswordIcon = false;
      }
    }

    addEventListener(message, callback) {

    }

    hidePasswordClicked (inputType) {
      if (inputType === NEW_PASSWORD) {
        this.newPassword.type = 'password';
        this.newPassword.showPasswordIcon = true;
      } else if (inputType === CONFIRM_PASSWORD) {
        this.confirmPassword.type = 'password';
        this.confirmPassword.showPasswordIcon = true;
      }
    }
  }
