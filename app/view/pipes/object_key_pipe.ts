import {Pipe, PipeTransform} from '@angular/core';

/**
 * Return html checkbox element
 * @value: element name
 * @args: link arguments
 * {
 *  checked: 'checked',
 *  className: 'classes'
 * }
 * Usage:
 *   value | checkBoxPipe: {}
 * Example:
 *   let _pipeArgs = {checked: 'checked', className: 'selected'}
 *   {{Manage | checkBoxPipe : 'class'}}
 *   formats to: <input type="checkbox" checked="checked" class="selected" />
 */
@Pipe({name: 'objectKeyPipe', pure: true})
export class ObjectKeyResolvePipe implements PipeTransform {
    transform(value: string, args) : any {
      return args.split('.').reduce((o,i)=>o[i], value);
    }
}
