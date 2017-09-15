import {FormControl} from '@angular/forms';

export class FormInputValidator {

  static invalidateOnlySpaces(c: FormControl) {
    return (String(c.value) || '').trim().length == 0 ? {
        validateOnlySpaces: {
          valid: false
        }
      } : null;
  }

  constructor() {
//    console.log('');
  }
}
