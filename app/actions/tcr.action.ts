import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import * as Observable from 'rxjs/Observable';
import * as types from '../utils/constants/action.types';
import {TCRService} from '../services/tcr.service';
import {ReleaseService} from '../services/release.service';
import {ProjectService} from '../services/project.service';
import {SearchService} from '../services/search.service';
import {RequirementService} from '../services/requirement.service';
import * as messageTypes from '../utils/constants/messages.types';
import {CustomFieldService} from '../services/customfield.service';
import {AdminPreferenceService} from '../services/admin_preference.service';
import {TCR_COVERAGE_GRID_TYPE} from "../view/components/tcr/tcr_grid.constant";

declare var _: any;

@Injectable()
export class TCRAction {
    _tcrService;
    _releaseService;
    _projectService;
    _searchService;
    _reqService;
    private _releaseName;
    private _releaseId;
    private _observable;
    private _customFields: any;
    constructor(@Inject(Http) private _http: any) {
        this._tcrService = new TCRService(_http);
        this._releaseService = new ReleaseService(_http);
        this._projectService = new ProjectService(_http);
        this._searchService = new SearchService(_http);
        this._reqService = new RequirementService(_http);
        this._observable = Observable.Observable;
    }
    fetchReleasesByProjectId(projectId) {
        return (dispatch) => {
            return this._releaseService.getReleasesByProjectId(projectId).subscribe(releases => {
                dispatch(this._fetchReleasesByProjectId({releases, projectId}));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _fetchReleasesByProjectId(data) {
        return { type: types.FETCH_RELEASE_BY_PROJECT_ID, data };
    }
    fetchTreeByReleaseId(releaseId, projectId, doOpen?) {
        return (dispatch) => {
            return this._tcrService.getTreeDataByReleaseId(releaseId).subscribe(treeData => {
                dispatch(this._fetchTreeByReleaseId({treeData, releaseId, projectId, doOpen}));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _fetchTreeByReleaseId(data) {
        return { type: types.FETCH_TREE_BY_RELEASE_ID, data };
    }
    fetchTestcasePhasesByReleaseId(releaseId) {
        return (dispatch) => {
            return this._tcrService.getTestcasePhasesByReleaseId(releaseId).subscribe(treeData => {
                dispatch(this._fetchTestcasePhasesByReleaseId({treeData, releaseId}));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _fetchTestcasePhasesByReleaseId(data) {
        return { type: types.FETCH_TESTCASE_PHASES_BY_RELEASE_ID, data };
    }
    updateGridSize(gridType, size) {
        return { type: types.UPDATE_GRID_SIZE, gridType, size };
    }
  fetchExecutionPhasesByReleaseId(releaseId) {
      return (dispatch) => {
        return this._tcrService.getExecutionPhasesByReleaseId(releaseId).subscribe(treeData => {
          dispatch(this._fetchExecutionPhasesByReleaseId({treeData, releaseId}));
        }, (error) => {
          dispatch(this.onError(error));
        });
      };
    }
    _fetchExecutionPhasesByReleaseId(data) {
      return { type: types.FETCH_EXECUTION_PHASES_BY_RELEASE_ID, data };
    }
    fetchTreeDataWithReleaseDetails(releaseId, selectedTreeId, selectedRelease = null, selectedProject = null, showImported = true) {
        if (selectedRelease) {
          return (dispatch) => {
              this._releaseName = selectedRelease.name;
              this._releaseId = releaseId;

              if (!selectedProject) {
                dispatch(this.fetchProjectDetailsById(selectedRelease.projectId));
              }


              let calls = [this._tcrService.getTreeDataByReleaseId(releaseId)];

              if (showImported) {
                calls.push(this._tcrService.getImportedTreeData(releaseId));
              }

              return this._observable.forkJoin(
                ...calls
              ).subscribe(data => {
                let treeData = data[0],
                  importedTreeData = data[1],
                  count = data[2];

                dispatch(this._fetchTreeDataWithReleaseDetails({treeData, releaseName: this._releaseName,
                  selectedTreeId, importedTreeData, count, releaseId, showImported}));
              }, (err) => {
               // console.error(err);
                dispatch(this.onError(err));
              });
          };

        } else {

          return (dispatch) => {
            return this._releaseService.getReleaseById(releaseId).subscribe(releaseDetails => {
              this._releaseName = releaseDetails.name;
              this._releaseId = releaseId;
              dispatch(this.fetchProjectDetailsById(releaseDetails.projectId));
              return this._observable.forkJoin(
                this._tcrService.getTreeDataByReleaseId(releaseId),
                // this._tcrService.getTreeCountByReleaseId(releaseId),
                this._tcrService.getImportedTreeData(releaseId)
              ).subscribe(data => {
                let treeData = data[0],
                  importedTreeData = data[1],
                  count = data[2];

                dispatch(this._fetchTreeDataWithReleaseDetails({treeData, releaseName: this._releaseName,
                  selectedTreeId, importedTreeData, count, releaseId, showImported}));
              }, (err) => {
               // console.error(err);
                dispatch(this.onError(err));
              });
            });
          };
        }

    }
    fetchTreeDataByReleaseId(selectedId?, refreshTree?) {
        return dispatch => {
            return this._observable.forkJoin(
                this._tcrService.getTreeDataByReleaseId(this._releaseId),
                // this._tcrService.getTreeCountByReleaseId(this._releaseId),
                this._tcrService.getImportedTreeData(this._releaseId)
                ).subscribe(data => {

                    let treeData = data[0],
                        importedTreeData = data[1],
                        count = data[2];

                    dispatch(this.createTreeNode(selectedId));
                    refreshTree = refreshTree || false;
                    dispatch(this._fetchTreeDataForCopyMove({refreshTree, treeData, importedTreeData, count, releaseName: this._releaseName}));

                }, error => {
                    dispatch(this.onError(error));
            });
        };
    }
    _fetchTreeDataForCopyMove(data) {
        return { type: types.FETCH_TREE_DATA_FOR_COPY_MOVE, data };
    }


    _fetchTreeDataWithReleaseDetails(data) {
        return { type: types.FETCH_TREE_DATA_BY_RELEASE_ID, data };
    }

    _clearTreeEvent() {
      return { type: types.CLEAR_TREE_EVENT};
    }

  fetchProjectDetailsById(id) {
        return (dispatch) => {
            return this._projectService.getProjectDetailsById(id).subscribe(projectDetails => {
                dispatch(this._fetchProjectDetailsById(projectDetails));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _fetchProjectDetailsById(data) {
        return { type: types.FETCH_PROJECT_DETAILS_BY_ID, data };
    }
    moveTcrNode(data) {
        return (dispatch) => {
            return this._tcrService.moveTcrNode(data).subscribe(response => {
                dispatch(this.fetchTreeDataByReleaseId(response.id));
            }, (error) => {
                dispatch(this.onInfo(error));
            });
        };
    }
    copyTcrNode(data) {
        return (dispatch) => {
            return this._tcrService.copyTcrNode(data).subscribe(data => {
                dispatch(this.fetchTreeDataByReleaseId());
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    copyTestcaseNode(data) {
        return dispatch => {
            return this._tcrService.copyTestcaseNode(data).subscribe(() => {
                dispatch(this.fetchLocalTreeByRelease(data.releaseId));
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    copyTestcase(data, id) {
        return dispatch => {
            return this._tcrService.copyTestcaseNode(data).subscribe(() => {
                dispatch(this.fetchTreeDataByReleaseId(id, true));
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    moveTestcase(data) {
        return dispatch => {
            return this._tcrService.moveTestcaseNode(data).subscribe(() => {
                dispatch(this.fetchTreeDataByReleaseId(data.sourceNodeId, true));
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    clearGlobalTreeData() {
        return { type: types.CLEAR_GLOBAL_TREE_DATA };
    }
    copyGlobalNode(data, releaseId) {
        return dispatch => {
            return this._tcrService.copyTcrNode(data).subscribe(() => {
                dispatch(this.fetchLocalTreeByRelease(releaseId));
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    fetchLocalTreeByRelease(releaseId) {
        return dispatch => {
            return this._tcrService.getTreeDataByReleaseId(releaseId).subscribe(data => {
                let releaseName = this._releaseName;
                dispatch(this._fetchTreeDataForLocalTree({data, releaseName, releaseId}));
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    _fetchTreeDataForLocalTree(data) {
        return { type: types.FETCH_TREE_DATA_FOR_LOCAL_TREE, data };
    }
    clearGlobalGridEvent() {
        return { type: types.CLEAR_GLOBAL_GRID_EVENT };
    }

    fetchTestCasesOnGlobalTcrTreeClick(params) {
        params.dbsearch = true;
        return (dispatch) => {
            return this._tcrService.getTestCasesByTreeId(params).subscribe(response => {
              let mappedRequirement = [];
              response.results.forEach((id,index)=>{
               // console.log(response.results[index].testcase);
                mappedRequirement.push(response.results[index].testcase);
              });

              let requirementIds = _.map(mappedRequirement, 'requirementIds');

              requirementIds = [].concat.apply([], requirementIds);

              // return this._reqService.getRequirementNamesByIds(requirementIds).subscribe(requirementNames => {
              //   let mapping = _.cloneDeep(requirementNames);
              //
              //   requirementIds = _.keys(requirementNames);
              //   requirementNames = _.values(requirementNames);
              //
              //   if(requirementIds.length > 0){
              //
              //     mappedRequirement.forEach((res) => {
              //       res.requirementNames = [];
              //
              //       res.requirementIds.forEach((tid) => {
              //         res.requirementNames.push(mapping[tid]);
              //       });
              //     });
              //   }

                let data = {
                  results: response.results,
                  resultSize: response.resultSize,
                  offset: params.offset,
                  size: params.pageSize,
                  currentPage: params.currentPage
                };

                dispatch(this._fetchTestCasesOnGlobalTcrTreeClick(data));
             // });

            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    fetchTestCasesOnLocalTcrTreeClick(params) {
        params.dbsearch = true;
        return (dispatch) => {
          return this._tcrService.getTestCasesByTreeId(params).subscribe(response => {

            let mappedRequirement = [];
            response.results.forEach((id,index)=>{
             // console.log(response.results[index].testcase);
              mappedRequirement.push(response.results[index].testcase);
            });

            let requirementIds = _.map(mappedRequirement, 'requirementIds');

            requirementIds = [].concat.apply([], requirementIds);


            // return this._reqService.getRequirementNamesByIds(requirementIds).subscribe(requirementNames => {
            //
            //   let mapping = requirementNames;
            //
            //   requirementIds = _.keys(requirementNames);
            //   requirementNames = _.values(requirementNames);
            //
            //   if(requirementIds.length > 0){
            //
            //     mappedRequirement.forEach((res) => {
            //       res.requirementNames = [];
            //
            //       res.requirementIds.forEach((tid) => {
            //         res.requirementNames.push(mapping[tid]);
            //       });
            //     });
            //   }

              let data = {
                results: response.results,
                resultSize: response.resultSize,
                offset: params.offset,
                size: params.pageSize,
                currentPage: params.currentPage
              };


              dispatch(this._fetchTestCasesOnLocalTcrTreeClick(data));
            //});


            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    fetchTestCasesOnTreeClick(params) {
        params.dbsearch = true;
        return (dispatch) => {
            return this._tcrService.getTestCasesByTreeId(params).subscribe(response => {

              let mappedRequirement = [];
                response.results.forEach((id, index) => {
                  mappedRequirement.push(response.results[index].testcase);
              });

              let requirementIds = _.map(mappedRequirement, 'requirementIds');

              requirementIds = [].concat.apply([], requirementIds);


              // return this._reqService.getRequirementNamesByIds(requirementIds).subscribe(requirementNames => {
              //
              //   let mapping = {};
              //   //remove duplicate requirementIds
              //   requirementIds = requirementIds.filter((el, i, arr) => arr.indexOf(el) === i);
              //
              //   if(requirementIds.length > 0){
              //
              //     requirementIds.forEach((id, index) => {
              //         if(requirementNames.length == index){
              //           return;
              //         }
              //         mapping[id] = requirementNames[id];
              //     });
              //
              //     mappedRequirement.forEach(res => {
              //       res.requirementNames = [];
              //
              //       res.requirementIds.forEach(tid => {
              //         res.requirementNames.push(mapping[tid]);
              //       });
              //     });
              //   }

                let data = {
                  data: response,
                  offset: params.offset,
                  size: params.pageSize,
                  currentPage: params.currentPage
                };

                dispatch(this._fetchTestCasesOnTreeClick(data));
              //});
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }


    fetchTestCasesOnSearchCyclePhases(queryParams, gridType) {
        return (dispatch) => {
            return this._searchService.getResultsOnSearch(queryParams).subscribe(response => {

                if (response.length && response[0].results.length) {

                    response[0].results.forEach(record => {
                        record.originalId =record.id;
                        record.id = record.tcrTreeTestcase.testcase.id;
                        record.testcase = record.tcrTreeTestcase.testcase;
                        record.testcase.id = record.id;
                        record.testcase.testerId = record.testerId || 'Unassigned';
                        record.testcase.status = record.lastTestResult ? record.lastTestResult.executionStatus || 0 : 0;
                    });

                }

                let data = {
                    data: response.length ? response[0] : [],
                    offset: queryParams.firstresult,
                    currentPage: queryParams.currentPage,
                    size: queryParams.maxresults
                };

                if (gridType === 'tcr') {
                    dispatch(this._fetchTestCasesOnTreeClick(data));
                } else if (gridType === 'find_add') {
                    dispatch(this._fetchTestCaseByCycle(data));
                }
            }, (error) => {
                //dispatch(this.onError(error));
              dispatch(this.onInfo('No records found to match your request.Try modifying your search criteria'));
              dispatch(this._clearGridSelection());
              dispatch(this._clearRowsInSearchGrid());

            });
        };
    }


    clearTcrGRIDAll() {
      return dispatch => {
        dispatch(this._clearGridSelection());
        dispatch(this._clearRowsInSearchGrid());
      };
    }


    _clearGridSelection() {
        return { type: types.CLEAR_GRID_SELECTION };
    }

    _clearRowsInSearchGrid() {
      return { type: types.CLEAR_TCR_GRID };
    }

    fetchTestCasesOnSearch(queryParams, gridType, isPagination?, isPost = false) {
        return (dispatch) => {
            return this._searchService.getResultsOnSearch(queryParams, isPost).subscribe((response) => {

              let mappedRequirement = response[0].results.map(item => item.testcase);

              let requirementIds = mappedRequirement.map(item => item.requirementIds);

              requirementIds = [].concat.apply([], requirementIds);

                let data = {
                  data: response[0],
                  offset: queryParams.firstresult,
                  currentPage: queryParams.currentPage,
                  size: queryParams.size
                };

                if(data.data.resultSize) {

                if (~[TCR_COVERAGE_GRID_TYPE, 'tcr'].indexOf(gridType)) {
                    dispatch(this._fetchTestCasesOnTreeClick(data));

                    if(!isPagination) {
                      dispatch(this._clearGridSelection());
                    }

                  } else if (gridType === 'find_add') {
                    dispatch(this._fetchSearchedTestCases(data));
                  }

                } else {
                  dispatch(this.onInfo('No records found to match your request.Try modifying your search criteria'));
                  setTimeout(() => {
                    dispatch(this._clearGridSelection());
                    dispatch(this._clearRowsInSearchGrid());
                  }, 100);
                }

            }, (error) => {
                dispatch(this.onError(error));
                dispatch(this._clearGridSelection());
            });
        };
    }
    _fetchTestCasesOnGlobalTcrTreeClick(data) {
        return { type: types.FETCH_TESTCASES_BY_GLOBAL_TCR_TREE_ID, data };
    }
    _fetchTestCasesOnTreeClick(data) {
        return { type: types.FETCH_TESTCASES_BY_TREE_ID, data };
    }
    _fetchTestCasesOnLocalTcrTreeClick(data) {
        return { type: types.FETCH_TESTCASES_BY_LOCAL_TCR_TREE_ID, data };
    }
    configureTcrGridColumn(data) {
        return { type: types.CONFIGURE_TCR_GRID_COLUMN, data };
    }
    createTcrNode(params, parentNodeId, releaseId) {
        this._releaseId = releaseId;
        return (dispatch) => {
            return this._tcrService.createTcrNode(params, parentNodeId).subscribe(value => {
                dispatch(this.fetchTreeDataByReleaseId(value.id));
                dispatch(this._onCreateTcrNode(value));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    renameTcrNode(params, selectedNodeId, releaseId) {
        this._releaseId = releaseId;
        return (dispatch) => {
            return this._tcrService.renameTcrNode(params, selectedNodeId).subscribe(data => {
                dispatch(this.fetchTreeDataByReleaseId());
                dispatch(this._onEditTcrNode(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    deleteTcrNode(selectedNodeId, releaseId) {
        this._releaseId = releaseId;
        return (dispatch) => {
            return this._tcrService.deleteTcrNode(selectedNodeId).subscribe(data => {
                dispatch(this.fetchTreeDataByReleaseId());
                dispatch(this._onDeleteTcrNode(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    clearTemporaryEvents() {
        return { type: types.CLEAR_TCR_TREE_EVENTS };
    }
    clearTcrGridData(data , gridType) {
        return { type: types['CLEAR_' + gridType.toUpperCase() + '_GRID_DATA'], data };
    }
    createTreeNode(data) {
        return { type: types.CREATE_TREE_NODE, data };
    }
    deleteTreeNode(value) {
        return (dispatch) => {
            dispatch(this._deleteTreeNode(value));
        };
    }
    _onCreateTcrNode(data: any) {
        return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setUserToastrMessage(data, 'create'))
        };
    }

    _onEditTcrNode(data: any) {
        return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setUserToastrMessage(data, 'edit'))
        };
    }

    _onDeleteTcrNode(data: any) {
        return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setUserToastrMessage(data, 'delete'))
        };
    }

    _deleteTreeNode(data) {
        return { type: types.DELETE_TREE_NODE, data };
    }

    setTCREventForBrowse() {
      return {type: types.SET_EVENT_FOR_TCR};
    }

    clearTCRGridEvent(event) {
        return {type: types.CLEAR_TCR_GRID_EVENT};
    }

    clearTCRGridEventForBrowse(event) {
      return {type: types.CLEAR_TCR_GRID_EVENT_FOR_BROWSE};
    }

    _fetchSearchedTestCases (data) {
       return {type: types.FETCH_SEARCHED_TESTCASES, data};
    }
    _fetchTestCaseByCycle(data) {
        return {type: types.FETCH_TESTCASES_BY_TREE_ID_FREEFORM, data};
    }

    updateBulkTestcaseDetailsById(bulkData) {
        return dispatch => {
            return this._tcrService.updateBulkTestcaseDetailsById(bulkData).subscribe(data => {
               dispatch(this._onUpdateBulkTestcaseDetailsById(data));
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    _onUpdateBulkTestcaseDetailsById(data: any) {
        return { type: types.UPDATE_BULK_TESTCASE_DETAILS_BY_ID, data };
    }
    initiateCopyFromGlobal() {
        return dispatch => {
            return this._tcrService.getImportedTreeData().subscribe(data => {
               dispatch(this._onInitiateCopyFromGlobal(data));
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    _onInitiateCopyFromGlobal(data) {
        return { type: types.INTITATE_COPY_FROM_GLOBAL, data };
    }
    fetchTreeCounts(releaseId) {
        return (dispatch) => {
            this._tcrService.getTreeCountByReleaseId(releaseId).subscribe(data => {
                dispatch(this._onTreeCount(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onTreeCount(data: any) {
        return { type: types.UPDATE_TREE_COUNT, data };
    }
    _onError(data: any) {
        return { type: types.ON_ERROR, data };
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
}

function _setUserToastrMessage(response, type) {
    let _ids = [],
        description,
        title = 'Success';

    if(_.isArray(response)) {
        _ids = _.map(response, function(obj) {return obj.id;});
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
    return {title, description};
}
