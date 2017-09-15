import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import * as Observable from 'rxjs/Observable';

import {SearchService} from '../services/search.service';
import {TCRService} from '../services/tcr.service';
import {TestcaseEASService} from '../services/testcaseEAS.service';
import {TestcaseExecutionService} from '../services/testcaseExecution.service';
import {DefectsService} from '../services/defects.service';
import {RequirementService} from "../services/requirement.service";
import {PouchDBPrefsServices} from "../services/pouch.db.service";

import {DEFAULT_GRID_STATE} from "../reducers/grid.reducer";

import * as types from '../utils/constants/action.types';
import * as messageTypes from '../utils/constants/messages.types';

declare var _;

@Injectable()
export class GridAction {
    _tcrService;
    _searchService;
    _observable;
    _testcaseEASService;
    _testcaseExecutionService;
    _defectsService;
    _reqService;
    constructor(@Inject(Http) private _http: any, @Inject(PouchDBPrefsServices) private pouchDBSercvice: PouchDBPrefsServices) {
        this._tcrService = new TCRService(<any>_http);
        this._searchService = new SearchService(_http);
        this._observable = Observable.Observable;
        this._testcaseEASService = new TestcaseEASService(_http);
        this._testcaseExecutionService = new TestcaseExecutionService (_http);
        this._defectsService = new DefectsService(_http);
        this._reqService = new RequirementService(_http);
    }
    fetchInitialGridState(gridType) {
        let _data = {data: gridType};
        return {type: types.FETCH_INITIAL_GRID_STATE, _data};
    }

    setInitialGridState(gridType, state) {
      let data = {
        gridType,
        state
      };

      return {type: types.SET_INITIAL_GRID_STATE, data};
    }

    resetAllGridStates() {
      return {type: types.RESET_INITIAL_GRID_STATE_FOR_ALL};
    }

    resetAllGridStatesWithNewState(flag) {

    }

    resetInitialGridState(gridType) {
      DEFAULT_GRID_STATE[gridType].columns.forEach(col => {
        if(col.fieldType === "custom_field") {
          col.show = false;
        }
      });

      let data = {
        gridType,
        state : DEFAULT_GRID_STATE[gridType]
      };

      this.pouchDBSercvice.putObject('grid', DEFAULT_GRID_STATE[gridType], gridType);

      return {type: types.RESET_INITIAL_GRID_STATE, data};
    }

    updateGridState(gridType, data, makeServerCall = true) {
        if (makeServerCall) {
          this.pouchDBSercvice.putObject('grid', data, gridType);
        }

        return {type: types.UPDATE_GRID_STATE, gridType, data};
    }
    clearGridEvents(event) {
        return {type: types.CLEAR_GRID_EVENTS, event};
    }
    clearGridData(gridType) {
        return {type: types.CLEAR_GRID_DATA_BY_TYPE, gridType};
    }
    initializeGrid(data, gridType) {
        let actionType = 'INITIALIZE_' + gridType;
        return { type: types[actionType], data };
    }
    getGridData(data, gridType) {
        let actionType = 'GET_' + gridType;
        return { type: types[actionType], data };
    }
    nextPage(data, gridType) {
        let actionType = 'NEXT_PAGE_' + gridType;
        return { type: types[actionType], data };
    }
    prevPage(data, gridType) {
        let actionType = 'PREV_PAGE_' + gridType;
        return { type: types[actionType], data };
    }
    paginateByIndex(data, gridType , isSetPaginateByIndexEvent) {
        if (isSetPaginateByIndexEvent) {
            let actionType = 'PAGINATE_BY_INDEX_' + gridType;
            return { type: types[actionType], data };
        } else {
            let actionType = 'INITIALIZE_' + gridType;
            return { type: types[actionType], data };
        }
    }
    tcePaginationRequest(params, gridType, paginationType) {
        return (dispatch) => {
            return this._testcaseExecutionService.getAllExecutions(params).subscribe((data) => {
                let requirementIds = [];

                data.results.forEach(id => {
                  requirementIds = _.union(requirementIds, id.tcrTreeTestcase.testcase.requirementIds || []);
                });

                // return this._reqService.getRequirementNamesByIds(requirementIds).subscribe(requirementNames => {
                //
                //     if(_.isObject(requirementNames) && !_.isEmpty(requirementNames)) {
                //         data.results.forEach(test => {
                //             let res = test.tcrTreeTestcase.testcase;
                //             res.requirementNames = res.requirementIds.map(tid => requirementNames[tid]);
                //
                //         });
                //     }

                    if(paginationType === 'PREV') {
                        dispatch(this.prevPage(data, gridType));
                    } else if(paginationType === 'NEXT') {
                        dispatch(this.nextPage(data, gridType));
                    }
                //});
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    paginationSearchRequest(queryParams, gridType, paginationType, searchType) {
         return (dispatch) => {
            return this._searchService.getResultsOnSearch(queryParams).subscribe((data) => {
                let result = {
                    offset: queryParams.firstresult,
                    currentPage: queryParams.currentPage
                };

                result[searchType] = data[0];

                if(paginationType === 'PREV') {
                    dispatch(this.prevPage(result, gridType));
                } else if(paginationType === 'NEXT') {
                    dispatch(this.nextPage(result, gridType));
                }
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    sort(data, gridType) {
        let actionType = 'SORT_' + gridType;
        return { type: types[actionType], data };
    }
    //TODO:This is to be removed from here and to be used defined in global.reducer.
    clearGlobalEvents() {
        return {type: types.CLEAR_EVENT};
    }
    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.ERROR, data})
        };
    }
}
