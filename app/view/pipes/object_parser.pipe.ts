import {Pipe, PipeTransform} from '@angular/core';
import {ZephyrStore} from '../../store/zephyr.store';

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
@Pipe({name: 'objectParserPipe', pure: true})
export class ObjectParserPipe implements PipeTransform {
    transform(value: string, args) : any {
        if(!value) {
        	if (args[0].key == 'attachmentCount') { //returning 0 when attachmentCount's key-value pair is undefined/null
        		return 'No Attachment';
        	} else {
           	return '';
           }
        }
        let _arguments = args[0].key;
        return (args[0].key == 'attachmentCount' && !value[_arguments]) ? 'No Attachment' : value[_arguments];
        //returning 0 when attachmentCount's key-value pair is undefined/null
    }
}
