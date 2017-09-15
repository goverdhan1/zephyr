import {Pipe, PipeTransform} from '@angular/core';

/**
 * Returns formatted value of the time passed
 * @value: number
 * @args: options for formatting
 * Usage:
 *   value | trimString: {delimiter: $delimiter, position: $position}
 *   @optional $position can be start or end. If start, will return the start of the split value else end 
 * Example:
 *   let _pipeArgs = {delimiter: '\n', position: 'start'} // Calling TrimString pipe with format
 *   {{'Estimated Time \n <font size='7'>dd:hh:mm</font>' | trimString : _pipeArgs}}
 *   formats to: 'Estimated Time'
 */
@Pipe({name: 'trimString', pure: true})
export class TrimString implements PipeTransform {
    transform(value: string, args) : any {
        if(!value) // If no value, then return empty
            return '';
        return this.trimString(value, args);
    }
    trimString(value, args) {
        let _value;
        if(args.delimiter) {
            try {
                let _values = value.toString().split(args.delimiter);
                if(args.position == 'end') {
                    _value = _values[1];
                } else {
                    _value = _values[0];
                }
            } catch(e) {
//                console.log(e);
            }
        }
        return _value;
    }
}
