import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import * as Observable from 'rxjs/Observable';

import * as types from '../utils/constants/action.types';
import {I18N_MESSAGES} from '../utils/messages/messages.en';

import {MapTestReqService} from '../services/mapTestReq.service';
import {TCRService} from '../services/tcr.service';
import {RequirementService} from '../services/requirement.service';

declare var _;

@Injectable()
export class MapTestReqAction {
    _observable;
    _mapTestReqService;
    _tcrService;
    _reqService;
    constructor(@Inject(Http) private _http: any) {
        this._observable = Observable.Observable;
        this._mapTestReqService = new MapTestReqService(_http);
        this._tcrService = new TCRService(_http);
        this._reqService = new RequirementService(_http);
    }
    fetchTestcaseTreeWithReleaseDetails(releaseId, releaseName, gridId) {
        return dispatch => {
            return this._observable.forkJoin(
                this._tcrService.getTreeDataByReleaseId(releaseId),
                this._tcrService.getCumulativeTree(releaseId, gridId),
                this._tcrService.getTestCasesByReqId(gridId)
            ).subscribe(data => {
                let treeData = data[0];
                let mapData = data[1];
                let allocatedData = data[2];

                dispatch(this._fetchTreeWithReleaseDetails({treeData, mapData, releaseName, allocatedData}));
            }, err => {
                console.error(err);
                dispatch(this.onError(err));
            });
        };
    }
    _fetchTreeWithReleaseDetails(data) {
        return { type: types.FETCH_TREE_DATA_BY_RELEASE_ID_TO_MAP, data };
    }
    fetchRequirementTreeWithReleaseDetails(projectId, releaseId, releaseName, gridId, isBulk) {
        gridId = isBulk ? gridId[0] : gridId;
        return dispatch => {
            return this._observable.forkJoin(
                this._reqService.getTreeDataByReleaseId(projectId, releaseId),
                this._reqService.getCumulativeTree(releaseId, gridId),
                this._reqService.getRequirementsByTestcaseId(gridId)
            ).subscribe(data => {
                let treeData = data[0];
                let mapData = data[1];
                let allocatedData = data[2];

                dispatch(this._fetchTreeWithReleaseDetails({treeData, mapData, releaseName, allocatedData, isBulk}));
            }, err => {
                console.error(err);
                dispatch(this.onError(err));
            });
        };

    }
    fetchTestCasesOnTreeClick(params, currentPage) {
        return dispatch => {
            return this._tcrService.getTestCasesByTreeId(params).subscribe(data => {

              let mappedRequirement = [];

              data.results.forEach((id, index) => {
                mappedRequirement.push(data.results[index].testcase);
              });

              let requirementIds = _.map(mappedRequirement, 'requirementIds');

              requirementIds = [].concat.apply([], requirementIds);

              // return this._reqService.getRequirementNamesByIds(requirementIds).subscribe(requirementNames => {
              //
              //   let mapping = _.cloneDeep(requirementNames);
              //
              //   requirementIds = _.keys(requirementNames);
              //   requirementNames = _.values(requirementNames);
              //
              //   if(requirementIds.length > 0){
              //
              //     mappedRequirement.forEach(res => {
              //       res.requirementNames = [];
              //
              //       res.requirementIds.forEach(tid => {
              //         res.requirementNames.push(mapping[tid]);
              //       });
              //     });
              //   }

                 let dataNew = {
                   data: data,
                   offset: params.offset,
                   size: params.pageSize,
                  currentPage: params.currentPage
                 };


                dispatch(this._fetchMapOnTreeClick({data, currentPage, size: params.pageSize}));
                // dispatch(this._fetchTestCasesOnTreeClick(data));
             // });


            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    fetchRequriementsOnTreeClick(params, currentPage) {
        return dispatch => {
            return this._reqService.getRequirementsByTreeId(params).subscribe(data => {

              let testCaseIds = _.map(data.results, 'testcaseIds');

              testCaseIds = [].concat.apply([], testCaseIds);

              // return this._reqService.getTestCaseNamesByIds(testCaseIds, params.releaseId).subscribe(testCaseNames => {
              //   let mapping = _.cloneDeep(testCaseNames);
              //
              //   testCaseIds = _.keys(testCaseNames);
              //   testCaseNames = _.values(testCaseNames);
              //
              //   data.results.forEach((res) => {
              //     res.testcaseNames = [];
              //
              //     let reqTestCaseIds = [];
              //
              //     res.testcaseIds.forEach((tid) => {
              //
              //       if (testCaseIds.indexOf(tid.toString()) !== -1) {
              //         res.testcaseNames.push(mapping[tid.toString()]);
              //         reqTestCaseIds.push(tid);
              //       }
              //
              //     });
              //
              //     res.testcaseIds = reqTestCaseIds;
              //   });

                dispatch(this._fetchMapOnTreeClick({data, currentPage, size: params.pageSize}));
              //});

            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    _fetchMapOnTreeClick(data) {
        return { type: types.FETCH_MAP_TREE_ID, data };
    }
      saveTestCase(params) {
        return dispatch => {
            return this._mapTestReqService.saveTestCase(params).subscribe(data => {

                // return this._reqService.getTestCaseNamesByIds(data.testcaseIds, params.releaseId).subscribe(testCaseNames => {
                //   data.testcaseIds = _.keys(testCaseNames);
                //   data.names = _.values(testCaseNames);
                  dispatch(this._saveMap(data));
                //});

            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    saveRequirement(params) {
        return dispatch => {
            return this._mapTestReqService.saveRequirement(params).subscribe(data => {

                // return this._reqService.getRequirementNamesByIds(data).subscribe(requirementNames => {
                   let response = {
                     ids : data,
                //     names: requirementNames
                  };

                  dispatch(this._saveMap(response));
                //});

              }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    saveBulkRequirement(params) {
        return dispatch => {
            return this._mapTestReqService.saveBulkRequirement(params).subscribe(data => {
                let testcaseIds = _.union([].concat.apply([], _.keys(data)));
                let reqIds = _.union([].concat.apply([], _.values(data)));

                // return this._reqService.getRequirementNamesByIds(reqIds).subscribe(reqNames => {
                //
                //   let mapping = {};
                //
                //   testcaseIds.forEach(key => {
                //     mapping[key] = {
                //       ids: [],
                //       names: []
                //     };
                //
                //     mapping[key].ids = data[key];
                //
                //     mapping[key].ids.forEach(k => {
                //       mapping[key].names.push(reqNames[k]);
                //     });
                //
                //   });

                  dispatch(this._saveMap(data));
               // });

            }, error => {
                dispatch(this.onError(error));
            });
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
    _getJiraDescription(data) {
        return {type: types.GET_JIRA_REQUIREMENT_MAP, data};
    }
    _reqDtUserUpdate() {
        return {type: types.REQ_DT_JIRA_USER_UPDATE};
    }
    _saveMap(data) {
        return { type: types.SAVE_MAP, data };
    }
    clearEvents() {
        return {type: types.CLEAR_MAP_EVENT};
    }
    clearData() {
        return {type: types.CLEAR_MAP_DATA};
    }
    onError(data) {
        return { type: types.ON_ERROR, data };
    }
}
