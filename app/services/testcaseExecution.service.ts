import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {TestcaseTreeModel} from '../models/testcasetree.model';

declare var _:any;
declare var ENV;
// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
@Injectable()
export class TestcaseExecutionService {
    public testcase: TestcaseTreeModel;
    constructor(public http: any) {
    }

    getAllExecutions(params) {
         let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + API_PATH.EXECUTION + '?parentid=' + params.parentid + '&testerid=' + params.testerid
            +'&offset=' + params.offset + '&pagesize=' + params.pageSize + '&dbsearch=' + params.dbsearch + '&orderByAsc=true';
         return this.http.get(getURL, {
             headers: getRequestHeader()
         })
          .map(response => {
              let resultObject = {};
              resultObject['firstResult'] = response.json().firstResult;
              resultObject['resultSize'] = response.json().resultSize;
              resultObject['results'] = response.json().results;
              resultObject['type'] = response.json().type;
              resultObject['pageNumber'] = params.pageSize;
              return resultObject;
          });
    }

    getExecutionPath(scheduleId, assigneeId) {
      let _schPathByIDURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
      + getApiPath('GET_EXECUTION_PATH_BY_RTS_ID', [scheduleId, assigneeId]);
      return this.http.get(_schPathByIDURL, {
        headers: getRequestHeader()
      })
        .map(response => response.json());
    }

    getFilteredPhaseTree(phaseId) {
      let _getFilteredPhaseTreeURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
      + API_PATH.ASSIGNMENT_TREE_TCE + API_PATH.VISIBLE + '/' + phaseId;
      return this.http.get(_getFilteredPhaseTreeURL, {
        headers: getRequestHeader()
      })
        .map(response => response.json());
    }

    updateExecutionDetailsById(id, value, type, testerId) {
        let toUpdate = '';
        if(type !== 'notes') {
          toUpdate = type + '=' + encodeURIComponent(value) + '&';
        }
        let updateExecutionURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.EXECUTION
                            + '/' + id + '?' + toUpdate + 'testerid=' + testerId;

        return this.http.put(updateExecutionURL,type === 'notes' ? JSON.stringify({notes: value}): {}, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

    updatestepResultsByTeststepId(id, value, type) {
        let updatestepResultsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.EXECUTION + API_PATH.TEST_STEP_RESULT
                            + '/' + id + '?' + type + '=' + value;
        return this.http.put(updatestepResultsURL,{}, {
            headers: getRequestHeader({
                'contentType': '*/*'
            })
        })
        .map(response => response.json());
    }

    updateTestcaseStatus(scheduleIds, status, testerId) {
        let _bulkTestcaseStatusUpdateURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.UPDATE_TESTCASE_STATUS
            + '?status=' + status + '&testerid=' + testerId;
        return this.http.put(_bulkTestcaseStatusUpdateURL, JSON.stringify(scheduleIds), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

    getAgents(params) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_AGENTS;
        return this.http.get(getURL, {
           headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    executeBatch(data, executeFlag) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.EXECUTE_BATCH;
        if(executeFlag) {
            return this.http.put(getURL, JSON.stringify(data), {
              headers: getRequestHeader()
            })
            .map(response => response.json());
        } else {
            return this.http.post(getURL, JSON.stringify(data), {
              headers: getRequestHeader()
            })
            .map(response => response.json());
        }
    }

    getBatch(id) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.EXECUTE_BATCH + '/' + id;
        return this.http.get(getURL, {
           headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    getRelatedTcData(tcId, releaseId, cyclephaseid) {
      var url = window.location.protocol + '//' + window.location.hostname +':9000?tcid='+tcId+'&releaseid='+releaseId+'&cyclephaseid='+cyclephaseid;
      if('dev' == ENV) {
          url = 'http://192.168.11.87:9000?tcid='+tcId+'&releaseid='+releaseId+'&cyclephaseid='+cyclephaseid;
      }
      var hd = new Headers();
      hd['Content-Type']= 'application/json';
      hd['Access-Control-Allow-Origin']= '*';
      return this.http.get(url, {headers:hd}, true, true)
        .map(response => response.json());
    }

    getCyclePhaseName(ids) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_CYCLE_PHASE_NAME + this.getRepeatedQueryParams('ids', ids);
        return this.http.get(getURL, {
           headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    /**
     * @param key
     * @param items []
     * @Output string
     * Example:
     * Input: getRepeatedQueryParams('ids', [1,2,3])
     * Output: ?ids=1&ids=2&ids=3
     */
    getRepeatedQueryParams(key, items) {
        let _itemURL = '';
        _.each(items, (_itemId, _i) => {
            _itemURL += key + '=' + _itemId;
            if((_i + 1) != items.length) {
                _itemURL += '&';
            }
            if(_i == 0) {
                _itemURL = '?' + _itemURL;
            }
        });
        return _itemURL;
    }

}
