import {Pipe, PipeTransform} from '@angular/core';
declare var  _ : any;

/**
 * Return html anchor element
 * @value: element name
 * @args: link arguments
 * {
 *  href: 'href',
 *  className: 'classes'
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
@Pipe({name: 'DeepCopy', pure: true})
export class DeepCopy implements PipeTransform {
    transform(value: string, args) : any {
        if (typeof(value) === 'object') {
            return  _.cloneDeep(value);
        } else {
            return value;
        }
    }
}
