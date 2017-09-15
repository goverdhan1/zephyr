import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import * as Observable from 'rxjs/Observable';
import * as types from '../utils/constants/action.types';
import {RequirementService} from '../services/requirement.service';
import {ReleaseService} from '../services/release.service';
import {TestcaseService} from '../services/testcase.service';
import {CustomFieldService} from '../services/customfield.service';
import {AdminPreferenceService} from '../services/admin_preference.service';
import {SearchService} from '../services/search.service';
import {AttachmentService} from '../services/attachment.service';
import * as messageTypes from '../utils/constants/messages.types';
import {I18N_MESSAGES} from '../utils/messages/messages.en';

declare var _: any;

@Injectable()
export class RequirementsAction {
    _observable;
    _reqService;
    _releaseService;
    _testcaseService;
    _customfieldService;
    _adminPreferenceService;
    _searchService;
    _attachmentService;
    _releaseId;
    _projectId;
    constructor(@Inject(Http) private _http: any) {
        this._observable = Observable.Observable;
        this._reqService = new RequirementService(_http);
        this._releaseService = new ReleaseService(_http);
        this._testcaseService = new TestcaseService(_http);
        this._customfieldService = new CustomFieldService(_http);
        this._adminPreferenceService = new AdminPreferenceService(_http);
        this._searchService = new SearchService(_http);
        this._attachmentService = new AttachmentService(_http);
    }
    fetchTreeDataWithReleaseDetails(releaseId, projectId, redrawTree, selectedRelease = null, refreshTree = false, selectedId?) {
        this._projectId = projectId;
        this._releaseId = releaseId;

        if (selectedRelease) {
          return dispatch => {

              let releaseName = selectedRelease.name;

              return this._observable.forkJoin(
                this._reqService.getTreeDataByReleaseId(projectId, releaseId),
                this._reqService.getImportedTreeData(projectId),
                this._reqService.getGlobalTreeData(projectId)
              ).subscribe(data => {
                let treeData = data[0];
                let importedTreeData = data[1];
                let globalTreeData = data[2];

                dispatch(this._fetchTreeDataWithReleaseDetails(refreshTree, redrawTree, {treeData, releaseName, importedTreeData, globalTreeData}));

                dispatch(this._onSelectReqNode(selectedId));

              }, err => {
                console.error(err);
                dispatch(this.onError(err));
              });
          };
        } else {
          return dispatch => {
            return this._releaseService.getReleaseById(releaseId).subscribe(releaseDetails => {

              let releaseName = releaseDetails.name;

              return this._observable.forkJoin(
                this._reqService.getTreeDataByReleaseId(projectId, releaseId),
                this._reqService.getImportedTreeData(projectId),
                this._reqService.getGlobalTreeData(projectId)
              ).subscribe(data => {
                let treeData = data[0];
                let importedTreeData = data[1];
                let globalTreeData = data[2];

                dispatch(this._fetchTreeDataWithReleaseDetails(refreshTree, redrawTree, {treeData, releaseName, importedTreeData, globalTreeData}));

              }, err => {
                console.error(err);
                dispatch(this.onError(err));
              });
            });
          };
        }


    }

    _fetchTreeDataWithReleaseDetails(refreshTree, redrawTree, data) {
        return { type: types.FETCH_REQ_TREE_DATA, data, redrawTree, refreshTree };
    }
    /*
        params: {
            treeId, releaseId
        }
    */
    updateReqObj(data: any, releaseId) {
      return dispatch => {
        // return this._reqService.getTestCaseNamesByIds(data.testcaseIds, releaseId).subscribe(testCaseNames => {
        //
        //   let mapping = {};
        //   //remove duplicate testcaseIds
        //   data.testcaseIds = data.testcaseIds.filter((el, i, arr) => arr.indexOf(el) === i);
        //
        //   data.testcaseIds.forEach((id, index) => {
        //     mapping[id] = testCaseNames[id];
        //   });
        //
        //   data.testcaseNames = [];
        //
        //   data.testcaseIds.forEach((tid) => {
        //     data.testcaseNames.push(mapping[tid]);
        //   });

          dispatch({ type: types.UPDATE_REQ_OBJ, data });
        //});
      };
    }
    updateRequirement(reqObj) {
        return dispatch => {
            return this._reqService.updateRequirement(reqObj).subscribe(reqId => {
                reqObj.id = reqId;

                dispatch(this.updateReqObj(reqObj, null));

                dispatch({
                        type: types.SHOW_TOAST,
                        data: ({type: messageTypes.SUCCESS, data: 'Requirement with id '+ reqId +' updated successfully.'})
                });

            }, error => {
                let errorJSON = error.json instanceof Function ? (error.json() || '') : error;
                if ('91z02' === errorJSON.errorCode) {
                    try {
                        dispatch(this._uniqueError(JSON.parse(errorJSON.data)));
                    } catch (err) {
                        dispatch(this.onError(error));
                    }
                } else {
                    dispatch(this.onError(error));
                }
            });
        };
    }
    _uniqueError(data) {
        return { type: types.SHOW_UNIQUE_CUSTOM_FIELD_ERROR, data };
    }
    deleteRequirement(reqId, treeId, releaseId, pageSize, offset) {
        return dispatch => {
            return this._reqService.deleteRequirement(reqId).subscribe(() => {

                dispatch(this.fetchReqByCriteria({releaseId, offset, treeId, pageSize, isChange: true}, null));
                dispatch(this._clearGrid());

                dispatch({
                    type: types.SHOW_TOAST,
                    data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setRequirementSuccessMessage({id: reqId}, 'delete'))
                });
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    deleteMultipleRequirements(reqId, treeId, releaseId, pageSize, offset, currentPage) {
        let reqIdList = reqId.map(r => ({id: r}));

        reqId = `?ids=${reqId.join('&ids=')}`;

        return dispatch => {
            return this._reqService.deleteMultipleRequirements(reqId).subscribe(() => {

                dispatch(this.fetchReqByCriteria({releaseId, offset, treeId, pageSize, currentPage, isChange: true}, null));
                dispatch(this._clearGrid());

                dispatch({
                    type: types.SHOW_TOAST,
                    data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setRequirementSuccessMessage(reqIdList, 'delete'))
                });
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    deallocateMultipleRequirements(reqId, treeId, releaseId, pageSize, offset, currentPage) {

        return dispatch => {
            return this._reqService.deallocateMultipleRequirements(releaseId, reqId).subscribe(() => {

                dispatch(this.fetchReqByCriteria({releaseId, offset, treeId, pageSize, currentPage, isChange: true}, null));
                dispatch(this._clearGrid());

                dispatch({
                    type: types.SHOW_TOAST,
                    data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setRequirementSuccessMessage(reqId, 'delete'))
                });
            }, error => {
                dispatch(this.onError(error));
            });
        };
	}
    createRequirement(reqObj) {
        return dispatch => {
            return this._reqService.createRequirement(reqObj).subscribe(req => {
                dispatch(this._createRequirement([req]));
                dispatch({
                    type: types.SHOW_TOAST,
                    data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setRequirementSuccessMessage(req, 'create'))
                });
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    _createRequirement(data) {
        return { type: types.CREATE_REQ_OBJ, data };
    }
    cloneRequirement(treeId, releaseId, reqId) {

        return dispatch => {
            return this._reqService.copyRequirement(treeId, treeId, releaseId, reqId).subscribe(response => {
                dispatch(this._createRequirement(response));
                dispatch({
                    type: types.SHOW_TOAST,
                    data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setRequirementSuccessMessage(response, 'create'))
                });
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    _onCopyRequirement(id) {
        return { type: types.COPY_REQUIREMENT, id };
    }
    copyRequirement(sourceId, targetId, reqId, releaseId, isRelease) {

        releaseId = releaseId || 0;
        let moveRelease = isRelease ? releaseId : 0;

        return dispatch => {
            return this._reqService.copyRequirement(sourceId, targetId, moveRelease, reqId).subscribe(response => {
                dispatch(this._clearGridSelection());
                dispatch(this._onCopyRequirement(sourceId));
                dispatch({
                    type: types.SHOW_TOAST,
                    data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setRequirementSuccessMessage(response, 'create'))
                });
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    moveRequirement(sourceId, targetId, reqId, releaseId, offset, pageSize, currentPage, isRelease) {

        releaseId = releaseId || 0;
        let moveRelease = isRelease ? releaseId : 0;

        return dispatch => {
            return this._reqService.moveRequirement(sourceId, targetId, moveRelease, reqId).subscribe(response => {
                dispatch(this.fetchReqByCriteria({releaseId, offset, treeId: sourceId, pageSize, currentPage, isChange: true}, null));
                dispatch(this._clearGrid());
                dispatch({
                    type: types.SHOW_TOAST,
                    data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setRequirementSuccessMessage(reqId, 'move'))
                });
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    createReqNode(params, releaseId) {
        this._releaseId = releaseId;
        params.projectId = this._projectId;

        return dispatch => {
            return this._reqService.createReqNode(params).subscribe(data => {
                dispatch(this.fetchTreeDataWithReleaseDetails(releaseId, this._projectId, false, null, false, data.id));
                dispatch(this._onCreateReqNode(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onCreateReqNode(data: any) {
        return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setUserToastrMessage(data, 'create'))
        };
    }
    _onSelectReqNode(data) {
        return { type: types.SELECT_REQ_NODE, data };
    }
    allocateRequirement(releaseId, reqId) {

        return dispatch => {
            return this._reqService.allocateRequirement(releaseId, reqId).subscribe(() => {
                dispatch(this.fetchTreeDataWithReleaseDetails(releaseId, this._projectId, false, null, true));
                dispatch({
                    type: types.SHOW_TOAST,
                    data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setRequirementSuccessMessage(reqId, 'allocate'))
                });
            }, error => {
                dispatch(this.onError(error));
            });
        };
	}
    renameReqNode(params, selectedNodeId, releaseId, isGlobal) {
        this._releaseId = releaseId;
        if (isGlobal) {
            params.projectId = this._projectId;
        }

        return dispatch => {
            return this._reqService.renameReqNode(params, selectedNodeId).subscribe(data => {
                dispatch(this.fetchTreeDataWithReleaseDetails(releaseId, this._projectId, false));
                dispatch(this._onEditReqNode(data));
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    deleteReqNode(selectedNodeId, releaseId) {
        this._releaseId = releaseId;
        return (dispatch) => {
            return this._reqService.deleteReqNode(selectedNodeId).subscribe((data) => {
                dispatch(this.fetchTreeDataWithReleaseDetails(releaseId, this._projectId, false));
                dispatch(this._onDeleteReqNode(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    deallocateReqNode(selectedNodeId, releaseId) {
        this._releaseId = releaseId;
        return (dispatch) => {
            return this._reqService.deallocateReqNode(selectedNodeId, releaseId).subscribe(() => {
                dispatch(this.fetchTreeDataWithReleaseDetails(releaseId, this._projectId, false));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    allocateReqNode(selectedNodeId, releaseId) {
        this._releaseId = releaseId;
        return (dispatch) => {
            return this._reqService.allocateReqNode(selectedNodeId, releaseId).subscribe(() => {
                dispatch(this.fetchTreeDataWithReleaseDetails(releaseId, this._projectId, false, null, true));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    moveReqNode(data) {
        return (dispatch) => {
            return this._reqService.moveReqNode(data).subscribe((data) => {
                dispatch(this.fetchTreeDataWithReleaseDetails(this._releaseId, this._projectId, false));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    copyReqNode(data) {
        return (dispatch) => {
            return this._reqService.copyReqNode(data).subscribe((data) => {
                dispatch(this.fetchTreeDataWithReleaseDetails(this._releaseId, this._projectId, false));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    clearReqGridData() {
        return { type: types.CLEAR_REQUIREMENT_GRID_DATA };
    }
    fetchAttachments(reqId) {
        let _params = {
            'itemid': reqId,
             'type': 'requirement'
        };
        return dispatch => {
            return this._attachmentService.getAttachmentsByCriteria(_params).subscribe(attachments => {
                dispatch(this._onFetchAttachmentsByReqID(attachments));
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    _onFetchAttachmentsByReqID(data: any) {
        return { type: types.FETCH_ATTACHMENTS, data };
    }
    fetchRequirementsOnSearch(queryParams, dataParams, isOnSearch = false, isPost = false) {
        return dispatch => {
            return this._searchService.getResultsOnSearch(queryParams, isPost).subscribe(response => {

                let data = {
                  data: response[0],
                  offset: queryParams.firstresult,
                  currentPage: queryParams.currentPage,
                  size: queryParams.size,
                  isOnSearch
                };
                if(data.data.resultSize) {
                  dispatch(this._fetchRequirementsTreeClick(data));
                } else{
                  dispatch(this.onInfo('No records found to match your request.Try modifying your search criteria'));
                  setTimeout(() => {
                    dispatch(this._clearGrid());
                  }, 100);
                }

            }, error => {
                dispatch(this.onError(error));

            });
        };
    }
    _clearGrid() {
        return { type: types.CLEAR_REQ_GRID };
    }
    _clearGridSelection() {
        return { type: types.CLEAR_REQ_GRID_SELECTION };
    }

    fetchAndUpdateReq(reqId, testcaseIds) {
      return dispatch => {
         // return this._reqService.getTestCaseNamesByIds(testcaseIds).subscribe(testCaseNames => {
         //
        let mapping = {};
         //   //remove duplicate testcaseIds
         //   testcaseIds = testcaseIds.filter((el, i, arr) => arr.indexOf(el) === i);
         //
         //   testcaseIds.forEach((id, index) => {
         //    mapping[id] = testCaseNames[id];
         //  });

          dispatch(this._fetchAndUpdateReq({id: reqId, mapping}));
      //  });
      };
    }

    _fetchAndUpdateReq(data) {
      return { type: types.FETCH_TESTCASE_NAME_ON_UPDATE, data };
    }

    fetchReqByCriteria(queryParams, releaseIdParam) {
          return dispatch => {
            return this._reqService.getRequirementsByTreeId(queryParams).subscribe(response => {
                let releaseId = null;

                if (queryParams.releaseId || releaseIdParam) {
                  releaseId = queryParams.releaseId ? queryParams.releaseId : releaseIdParam;
                }

                  let data = {
                    data: response,
                    offset: queryParams.offset,
                    currentPage: queryParams.currentPage,
                    size: queryParams.pageSize,
                    selectNew: queryParams.isChange
                  };

                  dispatch(this._fetchRequirementsTreeClick(data));

            }, error => {
                dispatch(this.onError(error));
            });
        };
    }

    _fetchRequirementsTreeClick(data) {
        return { type: types.FETCH_REQUIREMENTS_BY_TREE_ID, data };
    }
    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.ERROR, data})
        };
    }
    onInfo(data) {
      return {
        type: types.SHOW_TOAST,
        data: ({type: messageTypes.INFO, data})
      };
    }
    clearReqEvent() {
        return {type: types.CLEAR_REQ_EVENT};
    }

    clearReqFlag() {
      return {type: types.CLEAR_REQ_FLAG};
    }

    syncComplete(params) {
        return dispatch => {
            dispatch(this._syncReqNode());
            dispatch(this.fetchTreeDataWithReleaseDetails(params.releaseId, params.projectId, false));
        };
    }
    syncReqNode(params, componentId) {
        return (dispatch) => {
            return this._reqService.syncReqNode(params).subscribe(data => {
                dispatch(this._syncJob(data, componentId));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _syncJob (data, componentId) {
        return { type: types.JOB_PROGRESS_STATUS_STARTS, data, componentId };
    }
    _syncReqNode() {
        return {type: types.SYNC_REQ_NODE};
    }
    clearJira() {
        return {type: types.CLEAR_JIRA_REQUIREMENTS};
    }
    onSuccess(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.SUCCESS, data})
        };
    }

    _onEditReqNode(data: any) {
        return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setUserToastrMessage(data, 'edit'))
        };
    }
    getJiraDescription(id) {
        return (dispatch) => {
            return this._reqService.getJiraDescription(id).subscribe(data => {
                dispatch(this._getJiraDescription(data.value));
            }, (error) => {
                if (400 === error.status) {
                    let msg = `<p>${I18N_MESSAGES['zephyr.issue.deleted']}</p>`;
                    dispatch(this._getJiraDescription(msg));
                } else if (500 === error.status && error.json() && error.json().errorCode == '50003') {
                    dispatch(this._reqDtUserUpdate());
                } else {
                    dispatch(this._getJiraDescription(''));
                    dispatch(this.onError(error));
                }
            });
        };
    }
    _reqDtUserUpdate() {
        return {type: types.REQ_DT_JIRA_USER_UPDATE};
    }
    _getJiraDescription(data) {
        return {type: types.GET_JIRA_REQUIREMENT, data};
    }
    _onDeleteReqNode(data: any) {
        return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setUserToastrMessage(data, 'delete'))
        };
    }
    fetchRequirementPathByID(requirementId, releaseId) {
        return (dispatch: any) => {
            return this._reqService.getRequirementPath(requirementId, releaseId)
              .subscribe((tcPaths) => {
                dispatch(this._fetchRequirementPathByID(tcPaths));
              }, (error) => {
                dispatch(this.onError(error));
                dispatch(this._fetchRequirementPathByID(null));
              });
        };
    }

    _fetchRequirementPathByID(data: any) {
        return { type: types.FETCH_REQ_PATH_BY_ID, data };
    }

    fetchRequirementsByRelease(releaseId, gadgetId = "") {
      return (dispatch : any) => {
        return this._reqService.getRequirementsByRelease(releaseId).subscribe((requirements) => {
            let data = {
              requirements,
              gadgetId,
              releaseId
            };

            dispatch(this._fetchRequirementsByRelease(data));
        }, (error) => {
            dispatch(this.onError(error));
            // dispatch(this._fetchRequirementPathByID(null));
        });
      };
    }

    _fetchRequirementsByRelease(data: any) {
      return { type: types.FETCH_REQ_BY_RELEASE, data};
    }


}
function _setUserToastrMessage(response, type) {
    let _ids = [],
        description,
        title = 'Success';
    if(_.isArray(response)) {
        _ids = _.map(response, obj => obj.id);
    } else if(response.id) {
        _ids.push(response.id);
    }
    if(type == 'create') {
        description = 'Created node with id(s) ' + _ids.join(', ');
    } else if(type == 'edit') {
        description = 'Edited node with id(s) ' + _ids.join(', ');
    } else if(type == 'error') {
        title = 'Error';
        description = response.errorMsg || response.code ;
    } else if(type == 'delete') {
        description = 'Deleted node with id(s) ' + _ids.join(', ');
    }
    return {
        title: title,
        description: description
    };
}

function _setRequirementSuccessMessage(response, type) {
    let description, _ids = [];

    if(Array.isArray(response)) {
        _ids = response.map(obj => obj.id || obj);
    } else {
        _ids.push(response.id);
    }
    if(type == 'create') {
        description = 'Created requirement with id(s) ' + _ids.join(', ');
    } else if(type == 'delete') {
        description = 'Deleted requirement with id(s) ' + _ids.join(', ');
    } else if(type == 'allocate') {
        description = 'Allocated requirement with id(s) ' + _ids.join(', ');
    } else if(type == 'move') {
        description = 'Moved requirement with id(s) ' + _ids.join(', ');
    }
    return {
        title: 'Success',
        description: description
    };
}
