import {Pipe, PipeTransform} from '@angular/core';

/**
 * Returns value of the key provided
 * @value: object
 * @args: key with in the object
 * Usage:
 *   value | objectParser: {}
 * Example:
 *   let _pipeArgs = {key: 'name'}
 *   {{Manage | objectParser : 'name'}}
 *   formats to: object['key']['name']
 */
@Pipe({name: 'importConstantsPipe', pure: true})
export class ImportConstantsPipe implements PipeTransform {
    transform(value: string, args) : any {
        switch(args[0].key) {
            case 'status':
                let statuses = {
                    11000: 'New',
                    11001: 'New',
                    11002: 'Normalization in progress',
                    11003: 'Normalization Success',
                    11004: 'Normalization Failed',
                    11005: 'Import in progress',
                    11006: 'Import failed',
                    11007: 'Import successful',
                    11008: 'Import Partial successful',
                    11009: 'Import in progress'
                };
                return statuses[value];
            case 'icon':
                let iconStatuses = {
                    11000: '1,3',
                    11001: '1,3',
                    11002: '2,3',
                    11003: '3',
                    11004: '2,3',
                    11005: '2,3',
                    11006: '2,3',
                    11007: '3',
                    11008: '2,3',
                    11009: '2,3'
                };
                let displayIcons = iconStatuses[value] ? iconStatuses[value].split(',') : ['1', '3'];
                if(args[0].type === 'savedMaps') {
                    displayIcons = ['3'];
                }
                let icon = '<i class="grid-action-icon fa fa-trash deleteJobs" id="deleteJobs" aria-hidden="true"></i>';
                if(displayIcons.indexOf('1') > -1) {
                    icon = '<i class="grid-action-icon fa fa-play-circle-o runJobs" id="runJobs" aria-hidden="true"></i>'
                        + icon;
                } else if(displayIcons.indexOf('2') > -1) {
                    icon = '<i class="grid-action-icon fa fa-refresh reRunJobs" id="reRunJobs" aria-hidden="true"></i>'
                        + icon;
                }
                return icon;
        }
    }
}
