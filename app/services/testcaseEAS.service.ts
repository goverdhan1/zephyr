import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
//import {TestcaseTreeModel} from '../models/testcasetree.model';

// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
@Injectable()
export class TestcaseEASService {
    //public testcase: TestcaseTreeModel;
    constructor(public http: any) {}

    getReleaseCyclesById(id) {
        let getReleaseCyclesUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_RELEASE_CYLCES + id;

        return this.http.get(getReleaseCyclesUrl, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }

    getCyclePhases(id) {
        let getReleasePhasesUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_TESTCASE_PHASES_BY_RELEASE_ID + id;

        return this.http.get(getReleasePhasesUrl, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }

    getActionableCycles(id) {
        let getActionableCyclesUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.CYCLE +
            API_PATH.ASSIGNMENTS + id;

        return this.http.get(getActionableCyclesUrl, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }

    getPhaseTreeById(id) {
        let getPhaseTreeURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_PHASE_TREE_BY_ID + id;

        return this.http.get(getPhaseTreeURL, {
            headers: getRequestHeader()
        }).map(response => ({
            result: response.json(),
            id: id,
            status: response.status
        }));
    }

    getPhaseTreeVisibilityById(id) {
        let getPhaseTreeVisibilityURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ASSIGNMENT_TREE_TCE + API_PATH.ASSIGNMENTS + id;

        return this.http.get(getPhaseTreeVisibilityURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }


    getCountAssignedTestcasesCyclePhaseId(id) {
       let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_COUNT_ASSIGNED_TESTCASES_CYCLE_PHASE_ID + id;

       return this.http.get(getURL, {
           headers: getRequestHeader()
       }).map(response => ({
           result: response.json(),
           id: id,
           status: response.status
       }));
    }

    fetchTotalTestcasesbytcrCatelogIdRealeaseId(tcrcatalogtreeid , releaseid , cyclePhaseId) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_TOTAL_TESTCASES_RELEASE_ID_TCRCATEGLOGTREE_ID + tcrcatalogtreeid + '&releaseid=' +releaseid;

        return this.http.get(getURL, {
            headers: getRequestHeader()
        }).map(response => ({
            result: response.json(),
            id: cyclePhaseId,
            status: response.status
        }));
    }

    fetchAssignedTestcasesbytreeNodeId(id , nodeTypeId) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ASSIGNED_TESTCASES_BY_TREENODEID + id;

        return this.http.get(getURL, {
            headers: getRequestHeader()
        }).map(response => ({
            result: response.json(),
            nodeTypeId: nodeTypeId,
            status: response.status
        }));
    }

    fetchExecutionsByTreeId(id) {
         let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_EXECUTIONS_BY_TREEID + id  + '&pagesize=1000000&dbsearch=true&orderByAsc=true';

         return this.http.get(getURL, {
             headers: getRequestHeader()
         }).map(response => response.json());
    }

    getAssignTestcasesBySearchQuery(params) {
        let _query = [];

        _query.push(`includehierarchy=${params.includeHierarchy}`);

        if(params.zql) {
            _query.push('zql=' + params.zql);
        }
        if(params.searchQuery) {
            _query.push('searchquery=' + params.searchQuery);
        }
        if(params.hasOwnProperty('maxresults')) {
            _query.push('maxresults=' + params.maxresults);
        }
        return _query.join('&');
    }
    getAssignTestcasesByCycleQuery(params) {
        let _query = [];

        _query.push(`includehierarchy=${params.includeHierarchy}`);
        _query.push(`maintainassignments=${params.maintainassignments}`);

        if(params.hasOwnProperty('maxresults')) {
            _query.push('maxresults=' + params.maxresults);
        }
        if(params.hasOwnProperty('parenttreeid')) {
            _query.push('parenttreeid=' + params.parenttreeid);
        }

        return _query.join('&');
    }

    getAssignTestcasesByCycles(params) {
        let _query = [];
        _query.push('includehierarchy=' + params.includeHierarchy);
        if(params.zql) {
            _query.push('zql=' + params.zql);
        }
        if(params.searchQuery) {
            _query.push('searchquery=' + params.searchQuery);
        }
        if(params.testcaseIds) {
            _query.push(params.testcaseIds);
        }
        return _query.join('&');
    }

    assignTestcasesBySearch(params) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + getApiPath('ASSIGN_TESTCASES_BY_SEARCH', [params.cyclePhaseId, params.parentTreeId])
            + '?' + this.getAssignTestcasesBySearchQuery(params);

         return this.http.post(getURL, JSON.stringify(params.testcaseIds), {
             headers: getRequestHeader({
                 'includeAcceptType': true
             })
         }).map(response => response.json());
    }

    assignTestcasesByBrowse(params, body) {
      let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
        + getApiPath('ASSIGN_TESTCASES_BY_BROWSE', [params.cyclePhaseId, params.parentTreeId])
        + '?' + this.getAssignTestcasesBySearchQuery(params);

      return this.http.post(getURL, JSON.stringify(body), {
        headers: getRequestHeader({
          'includeAcceptType': true
        })
      }).map(response => response.json());
    }

    assignTestcasesByCycle(params) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + getApiPath('ASSIGN_TESTCASES_BY_CYCLE', [params.cyclePhaseId])
            + '?' + this.getAssignTestcasesByCycleQuery(params);

         return this.http.post(getURL, JSON.stringify({ids: params.scheduleids}), {
             headers: getRequestHeader({
                 'includeAcceptType': true
             })
         }).map(response => response.json());
    }

    modifyExecution(dataObject) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.MODIFY_EXECUTIONS;
         return this.http.post(getURL, JSON.stringify(dataObject), {
             headers: getRequestHeader({
                 'includeAcceptType': true
             })
         }).map(response => ({
             result: response.json(),
             requestobject: dataObject,
             status: response.status
         }));
    }

    addCycle(formValue) {
        let addCycleURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.CYCLE;

         return this.http.post(addCycleURL, JSON.stringify(formValue), {
             headers: getRequestHeader({
                 'includeAcceptType': true
             })
         }).map(response => response.json());
    }

    addPhase(formValue, cycleId) {
        let addPhaseURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.CYCLE + '/' + cycleId + API_PATH.PHASE;

         return this.http.post(addPhaseURL, JSON.stringify(formValue), {
             headers: getRequestHeader({
                 'includeAcceptType': true
             })
         }).map(response => response.json());
    }

    editCycle(formValue, cycleId) {
        let editCycleURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.CYCLE + '/' + cycleId;

         return this.http.put(editCycleURL, JSON.stringify(formValue), {
             headers: getRequestHeader()
         }).map(response => response.json());
    }

    editPhase(formValue, cycleId) {
        let editPhaseURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.CYCLE + '/' + cycleId + '/phase';

         return this.http.put(editPhaseURL, JSON.stringify(formValue), {
             headers: getRequestHeader({
                 'includeAcceptType': true
             })
         }).map(response => response.json());
    }

    cloneCycle(formValue, cycleId, params) {
        let cloneCycleURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.CYCLE + API_PATH.CLONE + '/' + cycleId + '/?' + params;

         return this.http.post(cloneCycleURL, JSON.stringify(formValue), {
             headers: getRequestHeader({
                 'includeAcceptType': true
             })
         }).map(response => response.json());
    }

    deleteCycle (cycleId) {
        let deleteURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.CYCLE + '/' + cycleId;

         return this.http.delete(deleteURL, {
             headers: getRequestHeader()
         }).map(response => response.json());
    }

    deletePhase (cycleId, phaseId) {
        let deleteURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.CYCLE + '/' + cycleId + API_PATH.PHASE + '/' + phaseId;

         return this.http.delete(deleteURL, {
             headers: getRequestHeader()
         }).map(response => response.json());
    }

    syncByCyclephaseidAndTreeid (cyclePhaseId , treeId , deleteFlagValue) {
      let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
          + API_PATH.SYNC_TESTCASES + cyclePhaseId  + '/sync/' + treeId + '?delete=' + deleteFlagValue;

       return this.http.put(getURL, null, {
           headers: getRequestHeader({
                 'includeAcceptType': true
             })
       }).map(response => response.json());
    }

    bullkAssignmentTestcases (keyobject) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + API_PATH.BULK_ASSIGNMENT_TESTCASES + keyobject['cyclephaseid']  + '/bulk/tree/'
            + keyobject['treeid'] +'/from/' + keyobject['fromid'] + '/to/' + keyobject['toid']
            + '?cascade=' + keyobject['cascade'] + '&easmode=' + keyobject['easmode'];

         return this.http.put(getURL, null, {
             headers: getRequestHeader({
                 'includeAcceptType': true
             })
         }).map(response => response.json());
    }

    updateAllTestcasesFlagByTreeId (flagValue , treeId) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + API_PATH.ALL_TESTCASES_FLAG_BY_TREEID + treeId  + '/flag/' + flagValue;

         return this.http.put(getURL, null, {
             headers: getRequestHeader({
                 'includeAcceptType': true
             })
         }).map(response => response.json());
    }

    addTreeNode (formValues) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ASSIGNEMENT_TREE + formValues.cyclephaseid +
            '/tree/' + formValues.parentId + '?name=' + encodeURIComponent(formValues.name) + '&description=' +
            encodeURIComponent(formValues.description);

         return this.http.post(getURL, null, {
             headers: getRequestHeader({
                 'includeAcceptType': true
             })
         }).map(response => response.json());
    }

    updateTreeNode (formValues) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ASSIGNEMENT_TREE + formValues.cyclephaseid +
            '/tree/' + formValues.treeId + '?name=' + encodeURIComponent(formValues.name) + '&description=' +
            encodeURIComponent(formValues.description);

         return this.http.put(getURL, null, {
             headers: getRequestHeader({
                 'includeAcceptType': true
             })
         }).map(response => response.json());
    }

    deleteTreeNode (formValues) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + API_PATH.ASSIGNEMENT_TREE + formValues.cyclephaseid  + '/tree/' + formValues.treeId;
         return this.http.delete(getURL, {
             headers: getRequestHeader()
         })
         .map(response => response.json());
    }

    updateTestcasesFlag (flagValue, testcasesArray) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + API_PATH.UPDATE_TESTCASES_FLAG + flagValue  + '?testcaseids=' + testcasesArray[0];

        for (let i = 1 ;i < testcasesArray.length; i++) {
            getURL = getURL + '&testcaseids=' + testcasesArray[i];
        }

        return this.http.put(getURL, null, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }

    deleteTestcasesbyCyclePhaseId (cyclePhaseId, testcasesArray) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + API_PATH.DELETE_TESTCASE + cyclePhaseId  + '/testcase?testcaseids=' + testcasesArray[0];

        for (let i = 1 ;i < testcasesArray.length; i++) {
            getURL = getURL + '&testcaseids=' + testcasesArray[i];
        }

        return this.http.delete(getURL, {
             headers: getRequestHeader()
         }).map(response => ({
             result: response.json(),
             testcaseids: testcasesArray,
             status: response.status
         }));
    }

    defaultAssignementToCreatorTestcase (cyclePhaseId) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.DEFAULT_ASSIGNMENT_TO_CREATOR_TESTCASES +  cyclePhaseId + '/assign';

         return this.http.post(getURL, null, {
             headers: getRequestHeader({
                 'includeAcceptType': true
             })
         }).map(response => response.json());
    }

    fetchCumulativeCount(releaseId) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_CUMULATIVE_COUNT_TESTCASE + releaseId;

         return this.http.get(getURL, {
             headers: getRequestHeader({
                 'includeAcceptType': true
             })
         }).map(response => response.json());
    }

    fetchDiscreteCount(releaseId) {
      let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_DISCRETE_COUNT_TESTCASE + releaseId;

      return this.http.get(getURL, {
        headers: getRequestHeader({
          'includeAcceptType': true
        })
      }).map(response => response.json());
    }

    getCountTestcasesAllChild (idArray) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.COUNT_TESTCASES_ALL_CHILD + 'treeids=' + idArray.join('&treeids=');

         return this.http.get(getURL, {
             headers: getRequestHeader({
                 'includeAcceptType': true
             })
         }).map(response => response.json());
    }
}
