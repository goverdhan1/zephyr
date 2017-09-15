import {Pipe, PipeTransform} from '@angular/core';

/**
 * Returns formatted value of the time passed
 * @value: number
 * @args: options for formatting
 * Usage:
 *   value | timeParser: {}
 * Example:
 *   let _pipeArgs = {name: 'timeParser', args: ['dd:hh:mm']} // Calling TimeParser pipe with format
 *   {{1041000 | gridPipe : _pipeArgs}}
 *   formats to: '12:01:10'
 */
@Pipe({name: 'timeParserPipe', pure: true})
export class TimeParserPipe implements PipeTransform {
    transform(value: string, args) : any {
        if(!value) // If no value, then return empty
            return '00:00:00';
        return this.convertToTimeFormat(value);
    }
    convertToTimeFormat(value) {
        let seconds = parseInt(value, 10),
            hours:any = Math.floor(seconds / 3600),
            minutes:any = Math.floor((seconds - (hours * 3600)) / 60),
            day:any = Math.floor(hours / 24);

        hours = Math.floor(hours % 24);

        if (day < 10) {day = '0' + day;}
        if (hours < 10) {hours   = '0' + hours;}
        if (minutes < 10) {minutes = '0' + minutes;}

        return day + ':' + hours + ':' + minutes;
    }
}
