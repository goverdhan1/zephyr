import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
import 'rxjs/add/operator/map';
declare var  _: any;

@Injectable()
export class TCRService {
    constructor(public http: any) {}
    getTreeDataByReleaseId(releaseId) {
        /*
         * Get tree data by release id
         */
        let getTreeDataURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
                            + API_PATH.GET_TREE_DATA_BY_RELEASE_ID + releaseId;
        return this.http.get(getTreeDataURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    getTestcasePhasesByReleaseId(releaseId) {
        /*
         * Get tree data by release id
         */
        let getTreePhasesURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
                            + API_PATH.GET_TESTCASE_PHASES_BY_RELEASE_ID + releaseId;
        return this.http.get(getTreePhasesURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    getExecutionPhasesByReleaseId(releaseId) {
        /*
         * Get tree data by release id
         */
        let getTreePhasesURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
                            + API_PATH.GET_EXECUTION_PHASES_BY_RELEASE_ID + releaseId;
        return this.http.get(getTreePhasesURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    getTreeCountByReleaseId(releaseId) {

        /*
         * Get tree node count by release id
         */

        let getTreeDataURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
                            + API_PATH.GET_TREE_COUT_BY_RELEASE_ID + releaseId;
        return this.http.get(getTreeDataURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    getTreeCountByTreeId(treeIds) {

        /*
         * Get tree node count by tree id
         */

        let idParam = '?treeids=' + treeIds.join('&treeids=');

        let getTreeDataURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
                            + API_PATH.GET_TREE_COUT_BY_TREE_ID + idParam;
        return this.http.get(getTreeDataURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    getImportedTreeData(releaseId?) {
        /*
         * Get tree data by release id
         */
        let importedTreeDataURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
                            + API_PATH.GET_IMP_TREE_DATA_BY_RELEASE_ID + (releaseId ? `&releaseid=${releaseId}` : '');
        return this.http.get(importedTreeDataURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    getTestCasesByTreeId(params) {
        /*
         * Get test cases data by tree id
         */

        params.isascorder  = params.isascorder ? params.isascorder : true;

        let offset = params.offset || 0;
        let getTestCasesDataURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
                            + API_PATH.GET_TESTCASES_BY_TREE_ID + params.treeId + '?offset=' + offset
                            +'&pagesize=' + params.pageSize + '&dbsearch=' + params.dbsearch + '&isascorder=' + params.isascorder + "&order=" + params.order;
        return this.http.get(getTestCasesDataURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    moveTcrNode(data) {
        /*
         * Move tcr node
         */
        let tcrNodeMoveURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('MOVE_TCR_NODE', [data.sourceNodeId, data.targetNodeId]);

        return this.http.post(tcrNodeMoveURL, null, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    copyTestcaseNode(data) {
        /* /testcase/clone/on/{sourcetreeid}/to/{targettreeid}?link=
         * Copy testcase node
         */
        let testcaseNodeCopyURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('COPY_TESTCASE_NODE', [data.releaseId, data.targetNodeId]);

        return this.http.post(testcaseNodeCopyURL, JSON.stringify({ids: data.ids}), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    moveTestcaseNode(data) {
        /* /testcase/move/from/{sourceentryid}/to/{targetentryid}
         * Copy testcase node
         */
        let testcaseNodeMoveURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('MOVE_TESTCASE_NODE', [data.sourceNodeId, data.targetNodeId]);

        return this.http.post(testcaseNodeMoveURL, JSON.stringify({ids: data.ids}), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    copyTcrNode(data) {
        /*/copy/{sourceid}/from/{sourceparentid}/{sourcereleaseid}to/{targetparentid}/{targetreleaseid}
         * Copy tcr node
         */
        let tcrNodeCopyURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('COPY_TCR_NODE',
            [data.sourceNodeId, data.sourceNodeReleaseId, data.targetNodeId, data.targetNodeReleaseId]);

        return this.http.post(tcrNodeCopyURL, null, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    createTcrNode(params, parentNodeId) {
        let tcrNodeCreateURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('CREATE_TCR_NODE', [parentNodeId]);

        return this.http.post(tcrNodeCreateURL, JSON.stringify(params), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    renameTcrNode(params, selectedNodeId) {
        let tcrNodeRenameURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('RENAME_TCR_NODE', [selectedNodeId]);

        return this.http.put(tcrNodeRenameURL, JSON.stringify(params), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    deleteTcrNode(selectedNodeId) {
        let tcrNodeDeleteURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('DELETE_TCR_NODE', [selectedNodeId]);

        return this.http.delete(tcrNodeDeleteURL, {
            headers: getRequestHeader()
        })
        .map(response => {
            let result = {};
            result['id'] = selectedNodeId;
            result['status'] = response.status;
            return result;
        });
    }
    updateBulkTestcaseDetailsById(bulkData) {
        let _bulkTestcaseUpdateURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + API_PATH.UPDATE_BULK_TESTCASE_DETAILS_BY_ID;
        return this.http.put(_bulkTestcaseUpdateURL, JSON.stringify(bulkData), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    getTestCaseTags() {
        let getTestCaseTagUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + API_PATH.GET_TAGS + '?fieldname=testcase.tag&startingwith=&';

        return this.http.get(getTestCaseTagUrl, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    getCumulativeTree(releaseId, gridId) {
        let cumulativeURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
                            + getApiPath('GET_CUMULATIVE_TESTCASES', [releaseId, gridId]);

        return this.http.get(cumulativeURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    getTestCasesByReqId(reqID) {
        let _allocatedURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
                getApiPath('GET_TESTCASES_REQUIREMENT_ID', [reqID, true]);

        return this.http.get(_allocatedURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    /**
     * @param data
     * @Output string
     * Example:
     * Input: encodeQueryData({'firstName':'John', 'lastName':'Doe', 'age':40 })
     * Output: firstName=John&lastName=Doe&age=40
     */
    encodeQueryData(data) {
        var ret = [];
        for (var d in data)
            if(data[d] || typeof(data[d]) === 'boolean') {
                ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
            }
        return ret.join('&');
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
