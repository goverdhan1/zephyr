import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import {ZephyrStore} from '../../store/zephyr.store';

declare var _:any;
import {LinkPipe} from './link.pipe';
import {ObjectParserPipe} from './object_parser.pipe';
import {ListParserPipe} from './list_parser.pipe';
import {TimeParserPipe} from './time_parser.pipe';
import {CheckboxPipe} from './checkbox.pipe';
import {GridActionsPipe} from './grid_actions.pipe';
import {TraceabilityDefectsPipe} from './traceablitity_defects.pipe';
import {SanitizationPipe} from './sanitization.pipe';
import {ImportConstantsPipe} from './import_constants.pipe';
import {EscapeHTMLPipe} from './escape_html.pipe';
import {UtililtyFunctions} from '../../utils/scripts/utils';

/*
 * Returns the desired output by parsing other core or custom pipes
 * Takes an object of pipe's name and arguments with value.
 * Usage:
 *   value | gridPipe: {name: 'name', args: ['']}
 * Example:
 *   let _pipeArgs = {name: 'date', args: ['dd/mm/yyyy']} // Calling Date pipe with format
 *   {{1438021800000 | gridPipe : _pipeArgs}}
 *   formats to: 7/28/2015
*/
@Pipe({name: 'gridPipe', pure: true})
export class GridPipe implements PipeTransform {
    _datePipe;
    _linkPipe;
    _objectParserPipe;
    _listParserPipe;
    _timeParserPipe;
    _checkBoxPipe;
    _gridActionsPipe;
    _defectsParserPipe;
    _importConstantsPipe;
    _sanitizationPipe;
    _escapeHTMLPipe;
    _utililtyFunctions;
    _zephyrStore = ZephyrStore.getZephyrStore();
    constructor(private sanitizer : DomSanitizer) {
        this._datePipe = new DatePipe('en-US');
        this._linkPipe = new LinkPipe();
        this._objectParserPipe = new ObjectParserPipe();
        this._listParserPipe = new ListParserPipe();
        this._timeParserPipe = new TimeParserPipe();
        this._checkBoxPipe = new CheckboxPipe();
        this._gridActionsPipe = new GridActionsPipe(sanitizer);
        this._defectsParserPipe = new TraceabilityDefectsPipe();
        this._importConstantsPipe = new ImportConstantsPipe();
        this._sanitizationPipe = new SanitizationPipe(this.sanitizer);
        this._escapeHTMLPipe = new EscapeHTMLPipe();
        this._utililtyFunctions = new UtililtyFunctions();
    }
    transform(value, args) : any {
        let _pipeArgs = args || null;
        if(!_pipeArgs) {
            if (value === 0)
                value = value.toString();
            return value || '';
        }
        if(_.isPlainObject(_pipeArgs)) {
            value = this.processPipe(value, _pipeArgs[0]);
        } else if(_.isArray(_pipeArgs)) {
            _pipeArgs.forEach((_pipeArg) => {
                value = this.processPipe(value, _pipeArg);
            });
        }
        return value || '';
    }
    processPipe(value, pipeArgs) {
        switch (pipeArgs.name) {
            case 'date':
                let _dateVal = new Date(value);
                if(_dateVal.toString() != 'Invalid Date') {
                    if (pipeArgs.args && pipeArgs.args[0] && pipeArgs.args[0].key === 'medium') {
                        return this._datePipe.transform(value, pipeArgs.args[0].key);
                    } else {
                        return this._utililtyFunctions.timeStampToMmDdYy(value);
                    }
                } else {
                    return value;
                }
            case 'link':
                return this._linkPipe.transform(value, pipeArgs.args);
            case 'customProperties':
                let property = '';
                let key = pipeArgs.args[1].key;
                let type = pipeArgs.args[0].key;
                if (value && value.customProperties) {
                    let customFields = this._zephyrStore.getState().customField.customFields[type];
                    let customFieldTypes = this._zephyrStore.getState().customField.customFieldTypes;

                    if (Array.isArray(customFields) && customFields.length) {
                        let field = customFields.filter(item => item.fieldName === key)[0];
                        if (_.isObject(field)) {
                            let fieldType;
                            let fieldTypeObj = customFieldTypes.filter(item => item.id === field.fieldTypeMetadata)[0];
                            if (fieldTypeObj) {
                                fieldType = fieldTypeObj.dataType;
                            }
                            let cProp = String(value.customProperties.hasOwnProperty(key) ? value.customProperties[key] : '');
                            if (Array.isArray(field.fieldValues) && field.fieldValues.length) {
                                let fieldValue = field.fieldValues.filter(item => String(item.id) === cProp)[0];
                                if (fieldValue && _.isObject(fieldValue) && !_.isEmpty(fieldValue)) {
                                    property = fieldValue.text;
                                }
                            } else {
                                property = 'Date' === fieldType && cProp ? this._datePipe.transform(cProp) : cProp;
                            }
                        }
                    }
                }
                return property;
            case 'objectParser':
                // if (pipeArgs.args[0].key === 'testcaseNames') {
                //   console.log(this._objectParserPipe.transform(value, pipeArgs.args));
                // }

                return this._objectParserPipe.transform(value, pipeArgs.args);
            case 'listParser':
                return this._listParserPipe.transform(value, pipeArgs.args);
            case 'timeParser':
                return this._timeParserPipe.transform(value, pipeArgs.args);
            case 'checkbox':
                return this._checkBoxPipe.transform(value, pipeArgs.args);
            case 'gridAction':
                return this._gridActionsPipe.transform(value, pipeArgs.args);
            case 'defectsParser':
              return this._defectsParserPipe.transform(value, pipeArgs.args);
            case 'importConstants':
                return this._importConstantsPipe.transform(value, pipeArgs.args);
            case 'delIcon':
                return '<i class="grid-icon fa fa-trash delete-grid-item" aria-hidden="true"></i>';
            case 'start':
                return '<i class="grid-icon fa-play-circle-o" aria-hidden="true"></i>';
            case 'stop':
                return '<i class="grid-icon fa-pause-circle-o" aria-hidden="true"></i>';       
            case 'sanitization':
                 return this._sanitizationPipe.transform(value, pipeArgs.args);
            case 'escapeHTMLPipe':
                 return this._escapeHTMLPipe.transform(value, pipeArgs.args);
            default: return value;
        }
    }
}
