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
@Pipe({name: 'checkBoxPipe', pure: true})
export class CheckboxPipe implements PipeTransform {
    transform(value: string, args) : any {
        let _arguments = args[0];
        var _properties = '';
        for(let _arg in _arguments) {
           _properties += _arg + '="' + _arguments[_arg] + '"';
        }
        return '<div class="zui-checkbox2"><input type="checkbox" ' + _properties +  '/>\
        		<label></label></div>';
    }
}
