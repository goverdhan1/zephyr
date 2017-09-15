import {Pipe, PipeTransform} from '@angular/core';

declare var _: any;

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
@Pipe({name: 'linkPipe', pure: true})
export class LinkPipe implements PipeTransform {
    transform(value: string, args) : any {
        if(!value) // If no value, then return empty
            return '';
        let infoObj = _.find(args, 'info');
        let _arguments = args[0];
        var _properties = '';
        for(let _arg in _arguments) {
           _properties += _arg + '="' + _arguments[_arg] + '"';
        }
        if(infoObj && infoObj.info) {
            return '<a ' + _properties + '>' + value + '</a>' +
                '<span class="link-info ' + infoObj.class + '"><i class="fa fa-info-circle" aria-hidden="true"></i></span>';
        }
        return '<a ' + _properties + '>' + value + '</a>';
    }
}
