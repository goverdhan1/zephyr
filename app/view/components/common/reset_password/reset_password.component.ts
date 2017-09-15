import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {FormBuilder, AbstractControl, FormGroup, FormControl, Validators} from '@angular/forms';

import {ZephyrStore} from '../../../../store/zephyr.store';

declare var jQuery: any;

const NEW_PASSWORD = 'NEW_PASSWORD';
const CONFIRM_PASSWORD = 'CONFIRM_PASSWORD';

@Component({
  selector: 'reset-password',
  templateUrl: 'reset_password.html'
})

export class ResetPasswordComponent implements OnChanges {
    @Input() resetPasswordObject; //contains the support text
    //@Input() passwordPolicy;
    @Output() resetPasswordUpdate: EventEmitter<any> = new EventEmitter(); //Emits the function with new value of password

    zephyrStore;
    state;
    enabledUpdate  = false;
    resetPasswordForm : FormGroup;
    token: string;
    username: string;
    resetNewPassword: any;
    resetConfirmPassword: any;
    indexedDB = {};
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
        // this.zephyrStore = ZephyrStore.getZephyrStore();
        // this.zephyrStore.subscribe(() => {
        //     this.state  = this.zephyrStore.getState();
        // });

        this.resetPasswordForm = this.fb.group({
          newPassword: ['', Validators.required],
          confirmPassword : ['', Validators.required]
        });
    }


    resetPasswordFormSubmit(formValue) {
      jQuery('#reset-password-modal').modal('hide');
      this.resetPasswordUpdate.emit(formValue.newPassword);
    }


    ngOnChanges(changes) {
      if(changes['resetPasswordObject']) {
        this.renewValidations(changes['resetPasswordObject'].currentValue);
      }
      //console.debug('this fires on changes', this.resetPasswordObject, changes)
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

        case 'Strong':
          //~!@#$%^&*()_-+{}[]<>?/|:;.   //-[]/
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
      this.resetPasswordForm = this.fb.group(validations);
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
