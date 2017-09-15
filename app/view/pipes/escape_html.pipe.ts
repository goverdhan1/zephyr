import {Pipe, PipeTransform} from '@angular/core';

declare var _;

@Pipe({name: 'escapeHTMLPipe', pure: true })
export class EscapeHTMLPipe implements PipeTransform {
    transform(value: string, args?) : any {
        if(!value) // If no value, then return empty
            return '';

        return _.escape(value);
    }
}
