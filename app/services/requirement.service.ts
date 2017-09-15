import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
@Injectable()
export class RequirementService {
    constructor(public http: any) {}

    getTreeDataByReleaseId(projectId, releaseId) {
        /*
         * Get tree data by release id
         */
        let getTreeDataURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_REQ_TREE_DATA_BY_RELEASE_ID', [projectId, releaseId]);

        return this.http.get(getTreeDataURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    getImportedTreeData(projectId) {
        /*
         * Get tree data by release id
         */
        let importedTreeDataURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_REQ_IMP_TREE_DATA', [projectId]);

        return this.http.get(importedTreeDataURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    getGlobalTreeData(projectId) {
        let getGlobalTreeDataURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_REQ_GLOBAL_TREE_DATA', [projectId]);

        return this.http.get(getGlobalTreeDataURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }

    getTestCaseNamesByIds(ids, releaseid = null) {
        let getTestCaseNamesUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_TEST_CASE_NAMES;

        if (releaseid) {
            getTestCaseNamesUrl += `?releaseid=${releaseid}`;
        }

        return this.http.put(getTestCaseNamesUrl, JSON.stringify({ids}), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }

    getRequirementNamesByIds(ids) {
        let getRequirementNamesUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_REQUIREMENT_NAMES;

        return this.http.put(getRequirementNamesUrl, JSON.stringify({ids}), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }, true).map(response => response.json());
    }

    getRequirementsByTreeId(params) {
        /*
         * Get requirements data by tree id
         */
        let offset = params.offset || 0;

        let getRequirementsDataURL;

        if(params.releaseId) {

            getRequirementsDataURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
                getApiPath('GET_REQ_BY_TREE_ID', [params.treeId, params.releaseId, params.offset, params.pageSize]);

        } else {
            getRequirementsDataURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
                getApiPath('GET_REQ_BY_TREE_ID_IMPORTED', [params.treeId, params.offset, params.pageSize]);
        }

        if (params.isascorder !== undefined) {
          getRequirementsDataURL += '&isascorder=' + params.isascorder + '&order=' + params.order;
        }

        return this.http.get(getRequirementsDataURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    createRequirement(data) {
        let createRequirementURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.CREATE_REQ;

        return this.http.post(createRequirementURL, JSON.stringify(data), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    updateRequirement(data) {
        let updateRequirementURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('UPDATE_REQ', [data.id]);

        return this.http.put(updateRequirementURL, JSON.stringify(data), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    deleteRequirement(mapId) {
        let deleteRequirementURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('DELETE_REQUIREMENT', [mapId]);

        return this.http.delete(deleteRequirementURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    deleteMultipleRequirements(ids) {
        let deleteMultipleRequirementURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('DELETE_MULTIPLE_REQUIREMENTS', [ids]);

        return this.http.delete(deleteMultipleRequirementURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    deallocateMultipleRequirements(releaseId, ids) {
        let deleteMultipleRequirementURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('DEALLOCATE_MULTIPLE_REQUIREMENTS', [releaseId]);

        return this.http.post(deleteMultipleRequirementURL, JSON.stringify({ids}),  {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    allocateRequirement(releaseId, ids) {
        let allocateMultipleRequirementURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('ALLOCATE_MULTIPLE_REQUIREMENTS', [releaseId]);

        return this.http.post(allocateMultipleRequirementURL, JSON.stringify({ids}), {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    copyRequirement(sourcetreeid, targettreeid, releaseid, requirementids) {
        // the API requires "target to source". DO NOT CHANGE.
        let copyRequirementURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('COPY_REQUIREMENT', [targettreeid, sourcetreeid, releaseid]);

        return this.http.post(copyRequirementURL, JSON.stringify({ids: requirementids}), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    moveRequirement(sourcetreeid, targettreeid, releaseid, requirementids) {
        let moveRequirementURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('MOVE_REQUIREMENT', [sourcetreeid, targettreeid, releaseid]);

        return this.http.post(moveRequirementURL, JSON.stringify({ids: requirementids}), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }

    createReqNode(params) {
        let reqNodeCreateURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.CREATE_REQ_NODE;

        return this.http.post(reqNodeCreateURL, JSON.stringify(params), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    renameReqNode(params, selectedNodeId) {
        let reqNodeRenameURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('RENAME_REQ_NODE', [selectedNodeId]);

        return this.http.put(reqNodeRenameURL, JSON.stringify(params), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    deleteReqNode(selectedNodeId) {
        let reqNodeDeleteURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('DELETE_REQ_NODE', [selectedNodeId]);

        return this.http.delete(reqNodeDeleteURL, {
            headers: getRequestHeader()
        }).map(response => ({
            id: selectedNodeId,
            status: response.status
        }));
    }
    deallocateReqNode(selectedNodeId, releaseId) {
        let deallocateReqNodeURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('DEALLOCATE_REQ_NODE', [selectedNodeId, releaseId]);

        return this.http.post(deallocateReqNodeURL, null, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    allocateReqNode(selectedNodeId, releaseId) {
        let allocateReqNodeURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('ALLOCATE_REQ_NODE', [selectedNodeId, releaseId]);

        return this.http.post(allocateReqNodeURL, null, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    moveReqNode(data) {
        /*
         * Move tcr node
         */
        let reqNodeMoveURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('MOVE_REQ_NODE', [data.sourceNodeId, data.targetNodeId, data.targetNodeReleaseId]);

        return this.http.post(reqNodeMoveURL, null, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    copyReqNode(data) {
        /*/copy/{sourceid}/from/{sourceparentid}/{sourcereleaseid}to/{targetparentid}/{targetreleaseid}
         * Copy tcr node
         */
        let reqNodeCopyURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('COPY_REQ_NODE', [data.sourceNodeId, data.targetNodeId, data.targetNodeReleaseId]);

        return this.http.post(reqNodeCopyURL, null, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    getCumulativeTree(releaseId, gridId) {
        let cumulativeURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_CUMULATIVE_REQUIREMENTS', [releaseId, gridId]);

        return this.http.get(cumulativeURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    getRequirementsByTestcaseId(tcid) {
        let _allocatedURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_REQUIREMENTS_TESTCASE_ID', [tcid, true]);

        return this.http.get(_allocatedURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    syncReqNode(params) {
        let nodeId = params.nodeId ? `&nodeid=${params.nodeId}` : '';
        let syncReqNodeURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
            getApiPath('SYNC_REQ_NODE', [params.projectId, params.nodeType, params.isCascade, params.retryDeleted, nodeId]);

        return this.http.put(syncReqNodeURL, null, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    getJiraDescription(id) {
        let jiraDescriptionURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.JIRA_DESCRIPTION_URL + id;

        return this.http.get(jiraDescriptionURL, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    getRequirementsByRelease(releaseId) {
      let _reqPathByIDURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_REQUIREMENTS_BY_RELEASE', [releaseId]);

      return this.http.get(_reqPathByIDURL, {
        headers: getRequestHeader()
      }).map(response => response.json());
    }
    getRequirementPath(requirementId, releaseId) {
      let _reqPathByIDURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_REQ_PATH_BY_RTS_ID', [requirementId, releaseId]);

      return this.http.get(_reqPathByIDURL, {
        headers: getRequestHeader()
      }).map(response => response.json());
    }
}
