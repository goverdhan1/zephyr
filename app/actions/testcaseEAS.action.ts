import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';

import * as types from '../utils/constants/action.types';
import * as messageTypes from '../utils/constants/messages.types';
import {SearchService} from '../services/search.service';
import {I18N_MESSAGES} from '../utils/messages/messages.en';

import {TestcaseEASService} from '../services/testcaseEAS.service';
import {TCRService} from '../services/tcr.service';
import * as Observable from 'rxjs/Observable';


@Injectable()
export class TestcaseEASAction {
    _testcaseEASService;
    _tcrService;
    _searchService;
    private _observable;

    constructor(@Inject(Http) private _http: any) {
        this._testcaseEASService = new TestcaseEASService(<any>_http);
        this._searchService = new SearchService(<any>_http);
        this._tcrService = new TCRService(<any>_http);
        this._observable = Observable.Observable;
    }

    // searchTestCaseByZql(queryParams, dataParams) {
    //     return (dispatch) => {
    //         return this._searchService.getResultsOnSearch(queryParams, dataParams).subscribe((response) => {
    //             let data = {
    //                 data: response[0],
    //                 offset: queryParams.firstresult,
    //                 currentPage: queryParams.currentPage,
    //                 size: queryParams.size
    //             };
    //             if (gridType === 'tcr') {
    //                 dispatch(this._fetchTestCasesOnTreeClick(data));
    //             } else if (gridType === 'find_add') {
    //                 dispatch(this._fetchSearchedTestCases(data));
    //             }
    //         }, (error) => {
    //             dispatch(this.onError(error));
    //         });
    //     };
    // }

    getAllCycles(id) {
      if (id) {
        return (dispatch) => {
          return this._testcaseEASService.getReleaseCyclesById(id).subscribe((data) => {
            dispatch(this._getAllCycles(data, id));
          }, (error) => {
            let errorMsg = {
              zeeErrorCode: error.status,
              errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
            };
            dispatch(this.onError(errorMsg));
          });
        };
      } else {
        return (dispatch) => {};
      }
    }

    getAllPhases(id) {
        if (id) {
          return (dispatch) => {
            return this._testcaseEASService.getCyclePhases(id).subscribe((data) => {
              dispatch(this._getAllPhases(data));
            }, (error) => {
              let errorMsg = {
                zeeErrorCode: error.status,
                errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
              };
              dispatch(this.onError(errorMsg));
            });
          };
        } else {
          return (dispatch) => {};
        }
    }

    getAllCyclesAndPhases(id) {
        if (id) {
            return dispatch => {
                return this._observable.forkJoin(this._testcaseEASService.getCyclePhases(id), this._testcaseEASService.getReleaseCyclesById(id)).subscribe(data => {
                    dispatch(this._getAllPhasesAndCycles(data[0], data[1]));
                }, error => {
                    let errorMsg = {
                      zeeErrorCode: error.status,
                      errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json() || '{}').message
                    };
                    dispatch(this.onError(errorMsg));
                });
            };
        } else {
            return dispatch => {};
        }
    }

    refreshAfterAdd(treeId, releaseId, cyclePhaseId, cycleTreeId) {
        return (dispatch) => {
            return this._testcaseEASService.getPhaseTreeById(cyclePhaseId).subscribe((dataTree) => {
                dispatch(this.getAllCountsForRefresh(treeId, releaseId, cyclePhaseId, cycleTreeId, dataTree));
            }, (error) => {
                let errorMsg = {
                  zeeErrorCode: error.status,
                  errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    fetchPhaseTreeById(id) {
       return (dispatch) => {
           return this._testcaseEASService.getPhaseTreeById(id).subscribe((dataTree) => {
               return this._testcaseEASService.getCountTestcasesAllChild([dataTree.result.id]).subscribe((data) => {
                   let finalData = [];
                     finalData[0] = dataTree;
                     finalData[1] = data;
                   dispatch(this._getPhaseTreeById(finalData));
               }, (error) => {
                   let errorMsg = {
                       zeeErrorCode: error.status,
                       errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                   };
                   dispatch(this.onError(errorMsg));
               });
           }, (error) => {
               let errorMsg = {
                   zeeErrorCode: error.status,
                   errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
               };
               dispatch(this.onError(errorMsg));
           });
       };
    }

    fetchTestCasesOnTreeClick(params) {
        return (dispatch) => {
            return this._tcrService.getTestCasesByTreeId(params).subscribe((data) => {
                Object.assign(data, {
                    offset: params.offset,
                    currentPage: params.currentPage,
                    size: params.pageSize
                });
                dispatch(this._fetchTestCasesOnTreeClick(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    fetchTotalTestcasesbytcrCatelogIdRealeaseId(tcrcatalogtreeid , releaseid , cyclePhaseId) {
      return (dispatch) => {
          return this._testcaseEASService.fetchTotalTestcasesbytcrCatelogIdRealeaseId(tcrcatalogtreeid ,releaseid , cyclePhaseId )
            .subscribe((data) => {
                dispatch(this._fetchTotalTestcasesbytcrCatelogIdRealeaseId(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
      };
    }


    assignTestcasesByBrowse(params, body) {
      return (dispatch) => {
        return this._testcaseEASService.assignTestcasesByBrowse(params, body).subscribe((data) => {
          dispatch(this._onAssignTestcases(data));
        }, (error) => {
          dispatch(this.onError(error));
        });
      };
    }

    fetchAssignedTestcasesbytreeNodeId(id , nodeTypeId) {
      return (dispatch) => {
          return this._testcaseEASService.fetchAssignedTestcasesbytreeNodeId(id , nodeTypeId).subscribe((data) => {
              dispatch(this._fetchAssignedTestcasesbytreeNodeId(data));
          }, (error) => {
              dispatch(this.onError(error));
          });
      };
    }

    fetchExecutionsByTreeId(id) {
      return (dispatch) => {
          return this._testcaseEASService.fetchExecutionsByTreeId(id).subscribe((data) => {
              dispatch(this._fetchExecutionsByTreeId(data));
          }, (error) => {
              dispatch(this.onError(error));
          });
      };
    }

    modifyExecution(dataObject) {
      return (dispatch) => {
        return this._testcaseEASService.modifyExecution(dataObject).subscribe((data) => {
          if (dataObject.createRTSList || dataObject.updateRTSList) {
            dispatch(this._createUpdateExecution(data));
            dispatch(this.onSuccess(I18N_MESSAGES['zephyr.tescase.eas.assignment.success']));
          } else if (dataObject.unassignedRtsIds) {
            dispatch(this._deleteExecution(data));
            dispatch(this.onSuccess(I18N_MESSAGES['zephyr.tescase.eas.assignment.success']));
          };
        }, (error) => {
            dispatch(this.onError(error));
        });
      };
    }

    assignTestcasesBySearch(params) {
        return (dispatch) => {
            return this._testcaseEASService.assignTestcasesBySearch(params).subscribe((data) => {
                dispatch(this._onAssignTestcases(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    assignTestcasesByCycle(params) {
        return (dispatch) => {
            return this._testcaseEASService.assignTestcasesByCycle(params).subscribe((data) => {
                dispatch(this._onAssignTestcases(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    updateTestcasesFlag (flagValue, testcasesArray) {
      return (dispatch) => {
          return this._testcaseEASService.updateTestcasesFlag(flagValue ,testcasesArray).subscribe((data) => {
              dispatch(this._updateTestcasesFlag(data));
              dispatch(this.onSuccess(I18N_MESSAGES['zephyr.tescase.eas.flag.update.success']));
          }, (error) => {
              dispatch(this.onError(error));
          });
      };
    }

    deleteTestcasesbyCyclePhaseId(cyclePhaseId , testcasesArray) {
      return (dispatch) => {
          return this._testcaseEASService.deleteTestcasesbyCyclePhaseId(cyclePhaseId ,testcasesArray).subscribe((data) => {
              dispatch(this._deleteTestcasesbyCyclePhaseId(data));
              dispatch(this.onSuccess(I18N_MESSAGES['zephyr.tescase.eas.delete.success']));
          }, (error) => {
              dispatch(this.onError(error));
          });
      };
    }

    syncByCyclephaseidAndTreeid (cyclePhaseId , treeId , deleteFlagValue) {
      return (dispatch) => {
          return this._testcaseEASService.syncByCyclephaseidAndTreeid(cyclePhaseId ,treeId , deleteFlagValue).subscribe((data) => {
              dispatch(this._syncByCyclephaseidAndTreeid(data));
              dispatch(this.onSuccess(I18N_MESSAGES['zephyr.tescase.eas.sync.succes']));
          }, (error) => {
              dispatch(this.onError(error));
          });
      };
    }

    bullkAssignmentTestcases (keyObject, isEventToBeUpdated) {
      return (dispatch) => {
          return this._testcaseEASService.bullkAssignmentTestcases(keyObject).subscribe((data) => {
              dispatch(this._bullkAssignmentTestcases(data ,isEventToBeUpdated ));
              dispatch(this.onSuccess(I18N_MESSAGES['zephyr.tescase.eas.assignment.success']));
          }, (error) => {
              dispatch(this.onError(error));
          });
      };
    }

    updateAllTestcasesFlagByTreeId (flagValue , treeId) {
      return (dispatch) => {
          return this._testcaseEASService.updateAllTestcasesFlagByTreeId(flagValue , treeId).subscribe((data) => {
              dispatch(this._updateAllTestcasesFlagByTreeId(data));
              dispatch(this.onSuccess(I18N_MESSAGES['zephyr.tescase.eas.flag.update.success']));
          }, (error) => {
              dispatch(this.onError(error));
          });
      };
    }

    addTreeNode (formValues) {
     return (dispatch) => {
         return this._testcaseEASService.addTreeNode(formValues).subscribe((data) => {
             dispatch(this._addTreeNode(data));
         }, (error) => {
             dispatch(this.onError(error));
         });
     };
    }

    updateTreeNode (formValues) {
      return (dispatch) => {
          return this._testcaseEASService.updateTreeNode(formValues).subscribe((data) => {
              dispatch(this._updateTreeNode(data));
          }, (error) => {
              dispatch(this.onError(error));
          });
      };
    }

    deleteTreeNode (formValues) {
      return (dispatch) => {
          return this._testcaseEASService.deleteTreeNode(formValues).subscribe((data) => {
              dispatch(this._deleteTreeNode(data));
          }, (error) => {
              dispatch(this.onError(error));
          });
      };
    }

    addCycle(form) {
      return (dispatch) => {
          return this._testcaseEASService.addCycle(form).subscribe((data) => {
              dispatch(this._addNewCycle(data));
          }, (error) => {
              let errorMsg = {
                  zeeErrorCode: error.status,
                  errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
              };
              dispatch(this.onError(errorMsg));
          });
      };
    }

    addPhase(form, cycleId) {
      return (dispatch) => {
          return this._testcaseEASService.addPhase(form, cycleId).subscribe((data) => {
              dispatch(this._addNewPhase(data));
              dispatch(this._routeToPhase(data));
          }, (error) => {
              let errorMsg = {
                  zeeErrorCode: error.status,
                  errorMsg: error.json().errorMsg
              };
              dispatch(this.onError(errorMsg));
          });
      };
    }

    clearPhaseRoute() {
      return { type: 'CLEAR_PHASE_ROUTE' };
    }

    editCycle(form, cycleId) {
      return (dispatch) => {
          return this._testcaseEASService.editCycle(form, cycleId).subscribe((data) => {
              dispatch(this._editCycle(data));
          }, (error) => {
              let errorMsg = {
                  zeeErrorCode: error.status,
                  errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
              };
              dispatch(this.onError(errorMsg));
          });
      };
    }

    editPhase(form, cycleId) {
      return (dispatch) => {
          return this._testcaseEASService.editPhase(form, cycleId).subscribe((data) => {
              dispatch(this._editPhase(data));
          }, (error) => {
              let errorMsg = {
                  zeeErrorCode: error.status,
                  errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
              };
              dispatch(this.onError(errorMsg));
          });
      };
    }

    cloneCycle(form, cycleId, params) {
      return (dispatch) => {
          return this._testcaseEASService.cloneCycle(form, cycleId, params).subscribe((data) => {
              dispatch(this._cloneCycle(data));
          }, (error) => {
              let errorMsg = {
                  zeeErrorCode: error.status,
                  errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
              };
              dispatch(this.onError(errorMsg));
          });
      };
    }

    deleteCycle(id) {
      return (dispatch) => {
          return this._testcaseEASService.deleteCycle(id).subscribe((data) => {
              dispatch(this._deleteNode(data));
          }, (error) => {
              let errorMsg = {
                  zeeErrorCode: error.status,
                  errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
              };
              dispatch(this.onError(errorMsg));
          });
      };
    }

    deletePhase(cycleId, phaseId) {
      return (dispatch) => {
          return this._testcaseEASService.deletePhase(cycleId, phaseId).subscribe((data) => {
              dispatch(this._deleteNode(data));
          }, (error) => {
              let errorMsg = {
                  zeeErrorCode: error.status,
                  errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
              };
              dispatch(this.onError(errorMsg));
          });
      };
    }

    defaultAssignementToCreatorTestcase (cyclePhaseId) {
      return (dispatch) => {
          return this._testcaseEASService.defaultAssignementToCreatorTestcase(cyclePhaseId).subscribe((data) => {
              dispatch(this._defaultAssignementToCreatorTestcase(data));
              dispatch(this.onSuccess(I18N_MESSAGES['zephyr.tescase.eas.assignment.success']));
          }, (error) => {
              let errorMsg = {
                  zeeErrorCode: error.status,
                  errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
              };
              dispatch(this.onError(errorMsg));
          });
      };
    }

    getAllCountsForRefresh (treeId, releaseId, cyclePhaseId, cycleTreeId, treeData='') {
      return (dispatch: any) => {
        return this._observable.forkJoin(
          this._testcaseEASService.getCountTestcasesAllChild([cycleTreeId]),
          this._testcaseEASService.fetchAssignedTestcasesbytreeNodeId(cycleTreeId , cyclePhaseId),
          this._testcaseEASService.fetchTotalTestcasesbytcrCatelogIdRealeaseId(cycleTreeId ,releaseId , cyclePhaseId ),
          this._testcaseEASService.fetchAssignedTestcasesbytreeNodeId(treeId , ''),
          this._testcaseEASService.fetchTotalTestcasesbytcrCatelogIdRealeaseId(treeId ,releaseId , '' )
        ).subscribe((data) => {
          let newData = {};
          if (cyclePhaseId) {
            newData['result1'] = {};
            newData['result1']['id'] = cyclePhaseId;
            newData['result1']['result'] = data[0];
          }
          newData['treedata'] = treeData;
          newData['result2'] = data[1];
          newData['result3'] = data[2];
          newData['result4'] = data[3];
          newData['result5'] = data[4];
          dispatch(this._getAllCountsForRefresh(newData));
        }, (error) => {
          dispatch(this.onError(error));
        });
      };
    }

    getCountTotalTestcasesAllChild (idArray, phaseTreeId) {
      return (dispatch) => {
          return this._testcaseEASService.getCountTestcasesAllChild(idArray).subscribe((data) => {
              let newData = {};
              if (phaseTreeId) {
                newData['id'] = phaseTreeId;
                newData['result'] = data;
              }
              dispatch(this._getCountTotalTestcasesAllChild(newData));
          }, (error) => {
              let errorMsg = {
                  zeeErrorCode: error.status,
                  errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
              };
              dispatch(this.onError(errorMsg));
          });
      };
    }

    getTotalAssignedCounts(id , nodeTypeId, releaseid) {
      return (dispatch: any) => {
        return this._observable.forkJoin(
          this._testcaseEASService.fetchAssignedTestcasesbytreeNodeId(id , nodeTypeId),
          this._testcaseEASService.fetchTotalTestcasesbytcrCatelogIdRealeaseId(id, releaseid, id)
        ).subscribe((data) => {
          dispatch(this._getTotalAssignedCounts(data));
        }, (error) => {
          dispatch(this.onError(error));
        });
      };
    }

    fetchCumulativeCount(releaseId) {
        return dispatch => {
            return this._testcaseEASService.fetchCumulativeCount(releaseId).subscribe(data => {
                dispatch(this._fetchCumulativeCount(data));
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }

    fetchDiscreteCount(releaseId) {
      return dispatch => {
        return this._testcaseEASService.fetchDiscreteCount(releaseId).subscribe(data => {
          dispatch(this._fetchDiscreteCount(data));
        }, error => {
          dispatch(this.onError(error));
        });
      };
    }

    _fetchCumulativeCount(data) {
      return { type: types.GET_CUMULATIVE_COUNT_TESTCASE, data};
    }

    _fetchDiscreteCount(data) {
      return { type: types.GET_DISCRETE_COUNT_TESTCASE, data};
    }

    _getTotalAssignedCounts(data) {
      return { type: types.GET_TOTAL_ASSIGNED_COUNT, data};
    }

    _getAllCountsForRefresh (data) {
      return { type: types.FETCH_ALL_EAS_TREE_COUNTS, data};
    }

    _getCountTotalTestcasesAllChild (data) {
      return { type: types.UPDATE_TREEDATA_WITH_COUNT_TESTACSES, data};
    }
    _defaultAssignementToCreatorTestcase (data) {
      return { type: types.DEFAULT_ASSIGNMENT_TO_CREATOR_TESTCASES, data};
    }

    _deleteNode (data) {
      return { type: types.UPDATE_TREE, data};
    }
    _addNewCycle (data) {
      return { type: types.ADD_NEW_CYCLE, data};
    }
    _cloneCycle (data) {
      return { type: types.UPDATE_TREE, data};
    }

    _addNewPhase (data) {
      return { type: types.UPDATE_TREE, data};
    }

    _routeToPhase (data) {
      return { type: types.ROUTE_TO_PHASE, data};
    }

    _editCycle (data) {
      return { type: types.UPDATE_TREE, data};
    }

    _editPhase (data) {
      return { type: types.UPDATE_TREE, data};
    }

    _updateTreeNode (data) {
      return { type: types.UPDATE_TREE_TESTCASE_EAS_EVENT, data};
    }
    _deleteTreeNode (data) {
        return { type: types.DELETE_TREE_TESTCASE_EAS_EVENT, data};
    }
    _addTreeNode (data) {
      return { type: types.UPDATE_TREE_TESTCASE_EAS_EVENT, data};
    }

    _updateAllTestcasesFlagByTreeId (data) {
      return { type: types.UPDATE_ALL_TESTCASES_FLAG_BY_TREEID, data};
    }

    _bullkAssignmentTestcases (data , isEventToBeUpdated) {
      data['isEventToBeUpdated'] = isEventToBeUpdated;
      return { type: types.BULK_TESTCASES_ASSIGNMENT, data};
    }

    _syncByCyclephaseidAndTreeid (data) {
      return { type: types.SYNC_SUCCEESS, data};
    }

    _deleteTestcasesbyCyclePhaseId(data) {
      return { type: types.DELETE_TESTCASE, data};
    }
    _updateTestcasesFlag (data) {
      return { type: types.UPDATE_TESTCASES_FLAG, data};
    }
     _createUpdateExecution (data) {
       return { type: types.CREATE_UPDATE_EXECUTION, data};
     }
     _deleteExecution (data) {
       return { type: types.DELETE_EXECUTION, data};
     }
    _fetchExecutionsByTreeId (data) {
      return { type: types.FETCH_EXECUTIONS_BY_TREEID, data};
    }
    _onAssignTestcases(data) {
        return { type: types.ASSIGN_TESTCASES_BY_SEARCH, data};
    }

    _fetchAssignedTestcasesbytreeNodeId(data) {
      return { type: types.FETCH_ASSIGNED_TESTCASES_BY_TREENODEID, data};
    }

    _fetchTotalTestcasesbytcrCatelogIdRealeaseId(data) {
      return { type: types.FETCH_TOTAL_TESTCASES_BY_RELEASEID_TCRCATELOGTREEID, data};
    }

    configureTcrGridColumn(data) {
        return { type: types.CONFIGURE_PHASE_GRID_COLUMN, data };
    }

    _getPhaseTreeById (data) {
         return { type: types.FETCH_PHASE_TREE_BY_ID, data};
    }

    _fetchTestCasesOnTreeClick(data) {
        return { type: types.FETCH_TESTCASES_BY_TREE_ID_PHASE, data };
    }

    _getAllCycles(data, id) {
        return { type: types.GET_RELEASE_CYCLES, data, releaseId: id };
    }

    _getAllPhases(data) {
        return { type: types.GET_CYCLE_PHASES, data };
    }

    _getAllPhasesAndCycles(phases, cycles) {
        return { type: types.GET_CYCLE_AND_PHASES, phases, cycles };
    }
    clearEvents(event) {
         return { type: types.CLEAR_EAS_EVENTS, event };
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

    clearGridData (data) {
      return { type: types.CLEAR_EAS_GRID_DATA, data };
    }
}
