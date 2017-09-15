import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';

@Injectable()
export class ReportService {
    constructor(public http: any) {
        //console.log('Report service');
    }
    /**
     * Generate report template
     * @param report
     */
    generateReportTemplate(report) {
        let generateReportURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + API_PATH.GENERATE_REPORT_TEMPLATE;
        return this.http.post(generateReportURL, JSON.stringify(report), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

    /**
     * Get report template
     * @param type
     */
    getReportTemplate(type) {
        let getReportTemplateURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + getApiPath('GET_REPORT_TEMPLATE', [type]);
        return this.http.get(getReportTemplateURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
}
