import {Pipe, PipeTransform} from '@angular/core';

declare var _;
@Pipe({name: 'listParserPipe', pure: true})
export class ListParserPipe implements PipeTransform {
    transform(value: Array<Object>, args) : any {
        if(!value || value.length === 0) // If no value, then return empty
            return '';
        let val = '';
        let params = args[0].params;
        let seperator = args[0].seperator;
        let valLength = value.length;
        let paramsLength = params.length;
        let OBJECT_VALUE = params && params[0] && params[0].key === 'OBJECT_VALUE';

        if(value instanceof Array) {
            let hideRowValue, showRowValue = true;
            value.forEach((obj, i) => {
                params.forEach((param, j) => {
                    let result = obj[param.key],
                        dataHTML = '';

                    // Calculate the data param
                    try {
                        /**
                         * Setting the param as value because data is not sanitized
                         * in grid innerHTML
                         * TODO: Change this once sanitizer logic is added to innerHTML
                         */
                        if(param.dataKey && obj[param.dataKey]) {
                            dataHTML = ' value="' + obj[param.dataKey] + '"';
                        }
                    } catch(e) {
//                        console.log(e);
                    }
                    // If there are multiple redundant values to show,
                    // Choose to show the first one and hide the rest
                    if(param.hideRowAlike) {
                        if(hideRowValue === obj[param.hideRowAlikeKey]) {
                            showRowValue = false;
                        } else {
                            showRowValue = true;
                        }
                        hideRowValue = obj[param.hideRowAlikeKey];
                    }
                    let _resultClassName = showRowValue ? 'grid_link_click zui-grid-row-link' :'zui-grid-row-link-hide';
                    if(param.pipe && param.pipe === 'link') {
                        if(param.className) {
                            _resultClassName += ' ' + param.className;
                        }
                        result = '<a ' + dataHTML + ' class="' + _resultClassName + '" title=' + _.escape(result) +
                            ' href="#">' + _.escape(result) + '</a>';
                    } else {
                        result = '<span class="' + _resultClassName +
                            '" title=' + _.escape(result) + '>' + _.escape(result) + '</span>';
                    }
                    val = (j < paramsLength - 1) ? val + result + ' - ' : val + result;
                });
                if(i < valLength - 1) {
                    val = val + seperator + ' ';
                }
            });
        } else if(OBJECT_VALUE) {
            let resultVal = '';
            let keys = Object.keys(value);
            keys.forEach((key, i) => {
                resultVal += value[key];
                if(i < keys.length - 1) {
                    resultVal = resultVal + seperator + ' ';
                }
            });
            val = resultVal;
        } else {
            let resultVal = '';
            params.forEach((param, j) => {
                let result = value[param.key];
                if(param.pipe && param.pipe === 'link') {
                    result = '<a  href="javascript:void(0)">' + result + '</a>';
                }
                resultVal += result;
                if(j < paramsLength - 1) {
                    resultVal = resultVal + seperator + ' ';
                }
            });
            val = resultVal;
        }
        return val;
    }
}
