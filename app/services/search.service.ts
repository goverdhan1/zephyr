import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
@Injectable()
export class SearchService {
    constructor(public http: any) {
        // console.log('Search service');
    }

    getReindexHealth() {
      let getReindexHealthURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.INDEXING_HEALTH;

      return this.http.get(getReindexHealthURL, {
        headers: getRequestHeader({
          'includeAcceptType': true
        })
      }).map(response => response.json());
    }

    reindexProject(data) {
        let getReindexURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('RE_INDEX_PROJECT', [data.projectId]);

        return this.http.put(getReindexURL, JSON.stringify(data), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }

    fullReindex(data) {
        let getReindexURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.RE_INDEX;

        return this.http.put(getReindexURL, JSON.stringify(data), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }

    getResultsOnSearch(queryParams, isPost = false) {
        /*
         * Get test cases data on search by text or zql
         * @queryParam firstresult *
         * @queryParam maxresults *
         * @urlParam word *
         * @dataParam entityType * : "testcase"|"requirement"|"execution"
         * @dataParam isZql *
         * @dataParam releaseId
         */

        let offset = queryParams.firstresult || 0;
        let maxresults = queryParams.maxresults || 10;
        let getTestCasesDataURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3;
        let wordQuery = '';
        let body :any = {};


        if(queryParams.word) {
            queryParams.isZql = queryParams.isZql || false;
            if(queryParams.word.indexOf('id') === 0 && queryParams.word.indexOf('in') > 0) {
                wordQuery = queryParams.word;
            } else {
                wordQuery = encodeURIComponent(queryParams.word);
            }

            if (isPost === true) {
                getTestCasesDataURL += getApiPath('GET_RESULTS_ON_SEARCH_FILTERS_POST', []);

                body.firstResult = offset;
                body.maxResults = maxresults;
                body.entityType = queryParams.entityType;
                body.zql = queryParams.isZql;
                body.word = wordQuery;

                if (queryParams.releaseId) {
                    body.releaseId = queryParams.releaseId;
                }

                if (queryParams.projectId) {
                    body.projectid = queryParams.projectId;
                }

            } else {
                getTestCasesDataURL += getApiPath('GET_RESULTS_ON_SEARCH_FILTERS', [wordQuery, offset, maxresults, queryParams.entityType, queryParams.isZql]);
            }

        } else {
            getTestCasesDataURL += getApiPath('GET_RESULTS_ON_SEARCH_FILTERS_EMPTY', [offset, maxresults, queryParams.entityType, queryParams.isZql]);
        }

        if (isPost !== true) {
            getTestCasesDataURL += queryParams.releaseId ? `&releaseid=${queryParams.releaseId}` : '';
            getTestCasesDataURL += queryParams.projectId ? `&projectid=${queryParams.projectId}` : '';

            return this.http.get(getTestCasesDataURL, {
                headers: getRequestHeader()
            }).map(response => response.json());
        }

        return this.http.post(getTestCasesDataURL, JSON.stringify(body), {
            headers: getRequestHeader()
        }).map(response => response.json());

    }

    getResultsOnSearchForCyclePhase(queryParams, dataParams) {
        /*
         * Get test cases data on search by text or zql
         * @queryParam firstresult *
         * @queryParam maxresults *
         * @urlParam word *
         * @dataParam entityType * : "testcase"|"requirement"|"execution"
         * @dataParam isZql *
         * @dataParam releaseId
         */
        let offset = queryParams.firstresult || 0;
        let maxresults = queryParams.maxresults || 10;
        let getTestCasesDataURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_RESULTS_ON_SEARCH_CYCLEPPHASE', [queryParams.word, offset, maxresults]);

        return this.http.put(getTestCasesDataURL, JSON.stringify(dataParams), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
}
