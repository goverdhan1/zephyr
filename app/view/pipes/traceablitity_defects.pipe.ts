import {Pipe, PipeTransform} from '@angular/core';

/**
 */
@Pipe({name: 'defectsParserPipe', pure: true})
export class TraceabilityDefectsPipe implements PipeTransform {
    transform(value: any, args) : any {

      if (value) {
        if (! (value instanceof Array)) {
          return `
            <span class='defects-figures' title="Executions">
              <span class='green'>${value.pass ? value.pass : '0'}</span>
              <span class='display-block'>Passed</span>
            </span>          
            <span class='defects-figures'>
              <span class='red'>${value.fail ? value.fail : '0'}</span>
              <span class='display-block'>Failed</span>
            </span>
        `;
        } else {
          return `
            <span class='defects-figures' title="Defects">
              <span class='bold-font'>${value['pass'] ? value['pass'] : '0'}</span>
              <span class='display-block'>Total</span>
            </span>          
            <span class='defects-figures'>
              <span class='open-defects'>${value['fail'] ? value['fail'] : '0'}</span>
              <span class='display-block'>Open</span>
            </span>
        `;
        }

      }

      return '';
      // return args.split('.').reduce((o,i)=>o[i], value);
    }
}
