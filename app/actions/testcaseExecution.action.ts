import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';

import * as types from '../utils/constants/action.types';
import * as messageTypes from '../utils/constants/messages.types';

import {TestcaseExecutionService} from '../services/testcaseExecution.service';
import {TCRService} from '../services/tcr.service';
import {TeststepService} from '../services/teststep.service';
import {TestcaseEASService} from '../services/testcaseEAS.service';
import {CustomFieldService} from '../services/customfield.service';
import {SearchService} from '../services/search.service';
import {DefectsService} from '../services/defects.service';

import * as Observable from 'rxjs/Observable';
import {RequirementService} from "../services/requirement.service";

declare var _;

@Injectable()
export class TestcaseExecutionAction {
    _testcaseExecutionService;
    _tcrService;
    _testcaseEASService;
    _searchService;
    _defectsService;
    _reqService;
    private _observable;
    private _teststepService: TeststepService;
    constructor(@Inject(Http) private _http: any) {
        this._testcaseExecutionService = new TestcaseExecutionService(<any>_http);
        this._tcrService = new TCRService(<any>_http);
        this._defectsService = new DefectsService(<any>_http);
        this._testcaseEASService = new TestcaseEASService(<any>_http);
        this._teststepService = new TeststepService(<any>_http);
        this._observable = Observable.Observable;
        this._searchService = new SearchService(_http);
        this._reqService = new RequirementService(_http);
    }

    updateGridPagination(size, currentPage, offset) {
        return {type: types.UPDATE_TCE_GRID_PAGINATION, size, currentPage, offset};
    }
    getExecutionCycleTree(releaseId) {

        return (dispatch) => {
            return this._observable.forkJoin(
                this._testcaseEASService.getReleaseCyclesById(releaseId),
                this._testcaseEASService.getActionableCycles(releaseId)
            ).subscribe(cycleData => {
                let actionableCycles = cycleData[0].filter((cycle) => {
                    return cycleData[1].cycle.filter(id => {
                        return (cycle.id === id && cycle.status == '0'); //second condition doesn't shows hidden cycle
                    })[0];
                });
                actionableCycles.forEach(cycle => {
                    let actionablePhases = cycle.cyclePhases.filter((phase) => {
                        return cycleData[1].cyclePhase.filter(id => {
                            return phase.id === id;
                        })[0];
                    });
                    cycle.cyclePhases = actionablePhases;
                });
                //check added to dispatch that function (which refreshes the tree data), when no executions are there
                if (cycleData[1].cyclePhase.length === 0) {
                    dispatch(this._getExecutionCycleTree([]));
                } else {
                    dispatch(this._getExecutionCycleTree(actionableCycles));
                  cycleData[1].cyclePhase.forEach(phaseId => {
                    dispatch(this.getExecutionPhaseTree(phaseId));
                  });

                }
            });
        };
    }

  getRelatedTcData(tcId, releaseId, cyclephaseid) {
      return (dispatch) => {
        return this._testcaseExecutionService.getRelatedTcData(tcId, releaseId, cyclephaseid).subscribe(
          data => {
            dispatch(this._getRelatedTcData(data));
          }
        );
      };
  }

  _getRelatedTcData(data) {
    return { type: types.GET_RELATED_TC_DATA, data };
  }

    getExecutionPhaseTree(phaseId) {

        return (dispatch) => {
            // return this._observable.forkJoin(
            //     this._testcaseEASService.getPhaseTreeById(phaseId),
            //     this._testcaseEASService.getPhaseTreeVisibilityById(phaseId)
            return this._testcaseExecutionService.getFilteredPhaseTree(phaseId).subscribe(data => {
                console.debug('phase Data', data);
                let phaseData = data[0],
                    visibilityMap = data[1];
                var arr = [];
                this.modifyPhaseDataVisibility(phaseData, visibilityMap);
                dispatch(this._getExecutionPhaseTree(data));
            });
        };
    }

    modifyPhaseDataVisibility(phaseData, visibilityMap) {
        //console.log('phaseData, visibilityMap',phaseData, visibilityMap);
    }

    fetchExecutionPathBySchID(scheduleId, assigneeId) {
      return (dispatch: any) => {
        return this._testcaseExecutionService.getExecutionPath(scheduleId, assigneeId)
          .subscribe((tcPaths) => {
            dispatch(this._onFetchSchPathByID(tcPaths));
          }, (error) => {
            dispatch(this.onError(error));
            dispatch(this._onFetchSchPathByID(null));
          });
      };
    }

    _clearTCEEvent() {
      return {type: types.CLEAR_TCE_EVENT};
    }

  _onFetchSchPathByID(data: any) {
    return { type: types.FETCH_SCH_PATH_BY_ID, data };
  }



    fetchTestCasesExecutoinsOnTreeClick(params, parentId) {
        return (dispatch) => {
            return this._observable.forkJoin(
                this._tcrService.getTestCasesByTreeId(params),
                this._testcaseEASService.fetchExecutionsByTreeId(parentId)
            ).subscribe((data) => {
                dispatch(this._fetchTestCasesExecutoinsOnTreeClick(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    fetchAllExecutions(params) {
        return (dispatch) => {
            return this._testcaseExecutionService.getAllExecutions(params).subscribe((data) => {
              let mappedRequirement = [];

              data.results.forEach((id, index) => {
                mappedRequirement.push(data.results[index].tcrTreeTestcase.testcase);
              });

              let requirementIds = _.map(mappedRequirement, 'requirementIds');

              requirementIds = [].concat.apply([], requirementIds);

              // return this._reqService.getRequirementNamesByIds(requirementIds).subscribe(requirementNames => {
              //   let mapping = _.cloneDeep(requirementNames);
              //
              //   requirementIds = _.keys(requirementNames);
              //   requirementNames = _.values(requirementNames);
              //
              //   // requirementIds = requirementIds.filter(function (el, i, arr) {
              //   //   return arr.indexOf(el) === i;
              //   // });
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

                dispatch(this._fetchAllExecutions(data));
             // });

            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    fetchAllExecutionsAfterDefectLink(params) {
        return (dispatch) => {
            return this._testcaseExecutionService.getAllExecutions(params).subscribe((data) => {
                dispatch(this._fetchAllExecutionsAfterDefectLink(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    _fetchAllExecutionsAfterDefectLink(data) {
        return { type: types.FETCH_TESTCASES_EXECUTIONS_AFTER_DEFECT_LINK, data };
    }

    sortTceGridSaved() {
        return { type: 'SORT_TCE_GRID_SAVED' };
    }

    updateExecutionDetailsById(execDetails, value, type, testerId , tcId) {


        return (dispatch) => {
            return this._testcaseExecutionService.updateExecutionDetailsById(execDetails.executionId ? execDetails.executionId : execDetails, value, type, testerId)
            .subscribe((data) => {
                if (tcId && type == 'status' && value == '10') {
                    dispatch(this.getTestStepResult(tcId));
                }

                data.tcrTreeTestcase.testcase.requirementNames = execDetails.tcrTreeTestcase.testcase.requirementNames;
                dispatch(this._updateExecutionDetailsById(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }


    resetAttachmentCountForTestcaseSteps() {
      return { type: types.RESET_ATTACHMENT_COUNT};
    }

    getTestStepResult(id) {
        return (dispatch: any) => {
            return this._teststepService.getTeststepResult(id)
            .subscribe((data) => {
                dispatch(this._getTestStepResult(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    _getTestStepResult(data) {
        return { type: types.GET_TEST_STEP_RESULT, data };
    }

    updatestepResultsByTeststepId(id, value, type) {
        return (dispatch) => {
            return this._testcaseExecutionService.updatestepResultsByTeststepId(id, value, type)
            .subscribe((data) => {
                dispatch(this._updatestepResultsByTeststepId(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    _updateExecutionDetailsById(data) {
        return { type: types.UPDATE_EXECUTION_DETAILS_BY_ID, data };
    }

    _updatestepResultsByTeststepId(data) {
        return { type: types.UPDATE_STEP_RESULTS_BY_ID, data };
    }

    _fetchAllExecutions(data) {
        return { type: types.FETCH_TESTCASES_EXECUTIONS_BY_TCRID, data };
    }

    fetchTestCasesByTreeId(params) {
        return (dispatch) => {
            return this._observable.forkJoin(
                this._tcrService.getTestCasesByTreeId(params)
            ).subscribe((data) => {
                dispatch(this._fetchTestCasesByTreeId(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    _getExecutionCycleTree(data) {
        return { type: types.GET_EXECUTION_CYCLES, data };
    }

    _getExecutionPhaseTree(data) {
        return { type: types.GET_EXECUTION_PHASE, data };
    }

    _fetchTestCasesByTreeId(data) {
        return { type: types.FETCH_TESTCASES_BY_TCRID, data };
    }

    configureTceGridColumn(data) {
        return { type: types.CONFIGURE_TCE_GRID_COLUMN, data };
    }

    _fetchTestCasesExecutoinsOnTreeClick(data) {
        return { type: types.FETCH_TESTCASES_EXECUTIONS_BY_TCRID, data };
    }


    clearEvents(event) {
        return { type: types.CLEAR_EAS_EVENTS, event };
    }

    clearEventExecution(event) {
        return { type: types.CLEAR_EXECUTION, event };
    }

    onSuccess(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.SUCCESS, data})
        };
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

    setTCEGridEvent (event) {
        return {type: types.SET_TCE_GRID_EVENT , event};
    }

    updateTestcaseStatus(scheduleIds, status, testerId) {
        return (dispatch: any) => {
            return this._testcaseExecutionService.updateTestcaseStatus(scheduleIds, status, testerId)
            .subscribe(data => {
               dispatch(this._onUpdateTestcaseStatus(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    _onUpdateTestcaseStatus(data: any) {
        return { type: types.UPDATE_TESTCASE_STATUS, data };
    }

    clearGridData (data) {
        return {type: types.CLEAR_TCE_GRID , data};
    }

    updateAttachmentCount(data) {
        return { type: types.UPDATE_ATTACHMENT_COUNT, data };
    }

    fetchAgents() {
        return (dispatch) => {
            return this._testcaseExecutionService.getAgents().subscribe((data) => {
                dispatch(this._fetchAgents(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    _fetchAgents(data) {
        return { type: types.FETCH_AGENTS, data };
    }

    _deleteAgents() {
        return { type: types.DELETE_AGENTS };
    }

    _updateAgents(data) {
        return { type: types.UPDATE_AGENTS, data };
    }

    executeBatch(data, executeFlag) {
        return (dispatch) => {
            return this._testcaseExecutionService.executeBatch(data, executeFlag)
            .subscribe((data) => {
                // dispatch(this._fetchAgents(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    getBatch(id) {
        return (dispatch) => {
            return this._testcaseExecutionService.getBatch(id).subscribe((data) => {
                dispatch(this._getBatch(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    _getBatch(data) {
        return { type: types.GET_BATCH, data };
    }


    fetchExecutionsOnSearch(queryParams, dataParams, isPagination) {
        return (dispatch) => {
            return this._searchService.getResultsOnSearch(queryParams, dataParams).subscribe((response) => {
                let data = response[0];
                let ids = [];
                data['pageNumber'] = queryParams.size;
                if(data.resultSize ) {
                    data.results.forEach(function(obj){
                        ids.push(obj.cyclePhaseId);
                    });
                    if(!isPagination) {
                        dispatch(this._clearGridSelection());
                    }
                    return this._testcaseExecutionService.getCyclePhaseName(ids).subscribe((results) => {
                        dispatch(this._fetchExecutionsOnSearch(data, results));
                    }, (error) => {
                        dispatch(this.onError(error));
                    });

                } else {
                    dispatch(this.onInfo('No records found to match your request.Try modifying your search criteria'));
                    setTimeout(() => {
                        dispatch(this._clearGridSelection());
                        dispatch(this._clearRowsInSearchGrid());
                    }, 100);
                }
            }, (error) => {
                dispatch(this.onInfo('No records found to match your request.Try modifying your search criteria'));
                //dispatch(this.onError(error));
                dispatch(this._clearRowsInSearchGrid());
            });
        };
    }

    _clearRowsInSearchGrid() {
        return { type: types.CLEAR_TCE_GRID };
    }

    _clearGridSelection() {
        return { type: types.CLEAR_GRID_SELECTION };
    }

    _fetchExecutionsOnSearch(data, results) {
        return { type: types.FETCH_EXECUTIONS_ON_SEARCH, data, results };
    }

    setTCERows(data) {
      return {type: types.SET_TCE_ZBOT_GRID, data};
    }

    syncDefects(data, componentId) {
        return (dispatch) => {
            return this._defectsService.syncDefects(data).subscribe((response) => {
                dispatch(this._syncDefects(response, componentId));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    _syncDefects(data, componentId) {
       return { type: types.JOB_PROGRESS_STATUS_STARTS, data, componentId };
    }
}
