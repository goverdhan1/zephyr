import {Pipe, PipeTransform} from '@angular/core';
//import {InlineEditComponent} from '../components/inline_edit/inline_edit.component';


/**
 * Return value in inline edit form
 * @value: element name
 * @args: same as inline edit arguments
 * {
 *  @Input() field; 
 *  @Input() editType;
 *  @Input() fieldOptions;
 *  @Input() selectedOption;
 *  @Input() placeholder;
 *  @Input() editOptions;
 *  @Output() onSubmit = new EventEmitter();
 * }
 * Usage:
 *   value | linkPipe: {}
 * Example:
 *   let _pipeArgs = {href: 'href', className: 'selected'}
 *   {{Manage | linkPipe : 'href'}}
 *   formats to: <a href="href" class="selected">Manage</a>
 *  Specify within the innerHTML to unescape html, like
 *  <td [innerHTML]="release.endDate | gridPipe: _pipeArgs"></td>
 */
@Pipe({name: 'inlineEditPipe', pure: true })
export class InlineEditPipe implements PipeTransform {
    transform(value: string, args) : any {
        if(!value) // If no value, then return empty
            return '';
        let _arguments = args[0];
        var _properties = '';
        for(let _arg in _arguments) {
           _properties += _arg + '="' + _arguments[_arg] + '"';
        }
        return '<a ' + _properties + '>' + value + '</a>';
    }
}
