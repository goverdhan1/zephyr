import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
declare var _: any;

import {AdminPreferenceService} from '../services/admin_preference.service';
import {AttachmentService} from '../services/attachment.service';
import {ProjectService} from '../services/project.service';
import {ReleaseService} from '../services/release.service';
import {RequirementService} from '../services/requirement.service';
import {TestcaseService} from '../services/testcase.service';
import {TeststepService} from '../services/teststep.service';
import {TestcaseHistoryService} from '../services/testcase_history.service';
import {UserService} from '../services/user.service';
import {CustomFieldService} from '../services/customfield.service';

// Constants
import * as types from '../utils/constants/action.types';
import * as messageTypes from '../utils/constants/messages.types';
import * as Observable from 'rxjs/Observable';

@Injectable()
export class TestcaseAction {
    private _testcase = {};
    private _testcaseService: TestcaseService;
    private _releaseService: ReleaseService;
    private _projectService: ProjectService;
    private _teststepService: TeststepService;
    private _adminPreferenceService: AdminPreferenceService;
    private _attachmentService: AttachmentService;
    private _requirementService: RequirementService;
    private _testcaseHistoryService: TestcaseHistoryService;
    private _userService: UserService;
    private _customfieldService: CustomFieldService;
    private _observable;
    constructor(@Inject(Http) private _http: any) {
        this._testcaseService = new TestcaseService(_http);
        this._releaseService = new ReleaseService(_http);
        this._projectService = new ProjectService(_http);
        this._teststepService = new TeststepService(_http);
        this._adminPreferenceService = new AdminPreferenceService(_http);
        this._attachmentService = new AttachmentService(_http);
        this._requirementService = new RequirementService(_http);
        this._testcaseHistoryService = new TestcaseHistoryService(_http);
        this._userService = new UserService(_http);
        this._customfieldService = new CustomFieldService(_http);
        this._observable = Observable.Observable;
    }
    /**
     * Action from component is triggered to fetch the testcase details
     * The APIs the will be called to collect all the details are
     * 1. testcase by id (tctid)
     * 2. release by id
     * 3. project by id
     * 4. test steps by testcase id
     * 5. all priorities
     * 6. attachments by testcase id
     * 7. mapped requirements by testcase id
     * 8. history by testcase id
     * 9. user details by testcase createdby id
     * 10. custom fields
     */
    fetchTestcaseDetailsById(id: any, treeType: any, tceFlag) {
        return (dispatch: any) => {
            return this._testcaseService.getTestcaseById(id)
            .subscribe((testcase) => {
                // console.debug('fetchTestcaseDetailsById', testcase);
                let _tcid = testcase.testcase.id;
                // let _releaseid = testcase.testcase.releaseId;
                this._testcase = testcase;
                /*if(_releaseid) {
                    dispatch(this.fetchReleaseDetailsById(_releaseid));
                }*/
                // dispatch(this.fetchTestcasePathByTCTID(id));
                dispatch(this.fetchTeststepDetailsByTCId(_tcid, id, tceFlag));
                dispatch(this.fetchAttachments(_tcid));
                if(treeType != 'import') {
                    dispatch(this.fetchTestcaseHistory(_tcid));
                }
                dispatch(this._onFetchTestcaseDetailsById(testcase, null));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onFetchTestcaseDetailsById(data, error) {
        return { type: types.FETCH_TESTCASE_DETAILS_BY_ID, data };
    }
    updateTreeType(treeType) {
        return { type: types.UPDATE_TESTCASE_TREE_TYPE, data: treeType };
    }
    getAllTags() {
      return (dispatch) => {
        return this._testcaseService.getAllTags()
          .subscribe(tags => {
            let data = [];
            tags.forEach(tag => {
              data = data.concat(tag.split(' '));
            });
            data = _.uniqWith(data, _.isEqual);
            dispatch({type: types.GET_ALL_TAGS, data});
          });
      };
    }
    fetchTestcaseHistory(tcid) {
        return (dispatch: any) => {
            return this._testcaseHistoryService.getTestcaseHistoryByTcid(tcid)
            .subscribe((histories) => {
                dispatch(this._onFetchTestcaseHistoryByTCID(histories));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onFetchTestcaseHistoryByTCID(data: any) {
        return { type: types.FETCH_TC_HISTORY_BY_TCID, data };
    }
    fetchAttachments(tcid) {
        let _params = {
            'itemid': tcid,
             'type': 'testcase'
        };
        return (dispatch: any) => {
            return this._attachmentService.getAttachmentsByCriteria(_params)
            .subscribe((attachments) => {
                dispatch(this._onFetchAttachmentsByTCTID(attachments));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onFetchAttachmentsByTCTID(data: any) {
        return { type: types.FETCH_ATTACHMENTS, data };
    }
    fetchPriorities() {
        return (dispatch: any) => {
            return this._adminPreferenceService.getPreferenceByKey('priority' , false)
            .subscribe((priorities) => {
                dispatch(this._onFetchTestcasePriorities(priorities));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onFetchTestcasePriorities(data: any) {
        return { type: types.FETCH_TC_PRIORITIES, data };
    }
    fetchTeststepDetailsByTCId(tcid, id, isTCE) {
        return (dispatch: any) => {
            if(isTCE) {
                return this._observable.forkJoin(
                    this._teststepService.getTeststepByTestcaseId(tcid),
                    this._teststepService.getTeststepResult(id)
                )
                .subscribe((teststep) => {
                    dispatch(this._onFetchTeststepsByTCID(teststep, isTCE));
                }, (error) => {
                    dispatch(this.onError(error));
                });
            } else {
                return this._teststepService.getTeststepByTestcaseId(tcid)
                .subscribe((teststep) => {
                    dispatch(this._onFetchTeststepsByTCID([teststep], isTCE));
                }, (error) => {
                    dispatch(this.onError(error));
                });
            }
        };
    }

    _onFetchTeststepsByTCID(data: any, isTCE) {
        return { type: types.FETCH_TC_TEST_STEPS_BY_TCTID, data, isTCE };
    }
    fetchTestcasePathByTCTID(tctid) {
        return (dispatch: any) => {
            return this._testcaseService.getTestcasePathByTestcaseTreeId(tctid)
            .subscribe((tcPaths) => {
                dispatch(this._onFetchTestcasePathByTCTID(tcPaths));
            }, (error) => {
                dispatch(this.onError(error));
                dispatch(this._onFetchTestcasePathByTCTID(null));
            });
        };
    }
    _onFetchTestcasePathByTCTID(data: any) {
        return { type: types.FETCH_TC_PATH_BY_TCTID, data };
    }
    // fetchReleaseDetailsById(id) {
    //     return (dispatch: any) => {
    //         return this._releaseService.getReleaseById(id)
    //         .subscribe((release) => {
    //             if(release.projectId) {
    //                 dispatch(this.fetchProjectDetailsById(release.projectId));
    //             }
    //             dispatch(this._onFetchReleaseDetailsById(release));
    //         }, (error) => {
    //             dispatch(this.onError(error));
    //         });
    //     };
    // }
    // _onFetchReleaseDetailsById(data: any) {
    //     return { type: types.FETCH_RELEASE_BY_ID, data };
    // }
    fetchProjectDetailsById(id) {
        return (dispatch: any) => {
            return this._projectService.getProjectDetailsById(id)
            .subscribe((project) => {
                dispatch(this._onFetchProjectDetailsById(project));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onFetchProjectDetailsById(data: any) {
        return { type: types.FETCH_PROJECT_DETAILS_BY_ID, data };
    }
    updateTestcaseDetailsById(testcase, skipCall = false): any {
        if (skipCall) {
            return this._onUpdateTestcaseDetailsById(JSON.parse(JSON.stringify(testcase)));
        }
        return (dispatch: any) => {
            return this._testcaseService.updateTestcaseDetailsById(testcase).subscribe(_testcase => {
                _testcase.testcase.requirementNames = testcase.testcase.requirementNames;
                dispatch(this._onUpdateTestcaseDetailsById(_testcase));

               setTimeout(() => {
                   dispatch({
                    type: types.SHOW_TOAST,
                    data: ({type: messageTypes.SUCCESS, data: 'Testcase with id '+ _testcase.testcase.id +' updated successfully.'})
                  });
               }, 100);

             }, error => {
                let errorJSON = error.json instanceof Function ? (error.json() || '') : error;
                if ('102z02' === errorJSON.errorCode) {
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
    _onUpdateTestcaseDetailsById(data: any) {
        return { type: types.UPDATE_TESTCASE_DETAILS_BY_ID, data };
    }
    _uniqueError(data) {
        return { type: types.SHOW_UNIQUE_CUSTOM_FIELD_ERROR, data };
    }
    updateTestcaseTestStep(tcid:any, step:any) {
        return (dispatch: any) => {
            return this._teststepService.updateTeststep(tcid, step).subscribe(_step => {
                dispatch(this._onUpdateTestcaseTestStep(_step));
                setTimeout(() => {
                    dispatch({
                        type: types.SHOW_TOAST,
                        data: ({type: messageTypes.SUCCESS, data: 'Testcase with id '+ _step.tcId +' updated successfully.'})
                  });
                }, 100);
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    _onUpdateTestcaseTestStep(data: any) {
        return { type: types.UPDATE_TESTSTEP_DETAILS_BY_ID, data };
    }
    createTestcase(testcase) {
        return(dispatch: any) => {
            return this._testcaseService.addTestcase(testcase)
                .subscribe((_testcase) => {
                    dispatch({
                        type: types.CREATE_TESTCASE_SUCCESS,
                        data: _testcase
                    });
                    dispatch(this._onCreateTestcase(_testcase));
                }, (error) => {
                    dispatch(this.onError(error));
                });
        };
    }
    createCompleteTestcase(testcase) {
        return(dispatch: any) => {
            return this._testcaseService.addTestcase(testcase)
                .subscribe((_testcase) => {
                    dispatch({
                        type: types.CREATE_TESTCASE_SUCCESS,
                        data: _testcase
                    });
                    dispatch(this._onCreateTestcase(_testcase));
                    dispatch(this._onCreateCompleteTestcase(_testcase));
                }, (error) => {
                    dispatch(this.onError(error));
                });
        };
    }
    cloneTestcase(sourceEntryId, targetEntryId, testcaseIds, isQueryParams?) {
        return(dispatch: any) => {
            return this._testcaseService.cloneTestcase(sourceEntryId, targetEntryId, testcaseIds, isQueryParams)
                .subscribe((_testcase) => {
                    dispatch({
                        type: types.CREATE_TESTCASE_SUCCESS,
                        data: _testcase
                    });
                    dispatch(this._onCreateTestcase(_testcase));
                }, (error) => {
                    dispatch(this.onError(error));
                });
        };
    }
    _onCreateTestcase(data: any) {
        return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setTestcaseSuccessMessage(data, 'create'))
        };
    }
    createTestcaseTestStep(tcid:any, step:any) {
        return (dispatch: any) => {
            return this._teststepService.addTeststep(tcid, step)
            .subscribe((_steps) => {
                dispatch(this._onCreateTestcaseTestStep(_steps));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onCreateTestcaseTestStep(data: any) {
        return { type: types.CREATE_TESTSTEP, data };
    }
    deleteTestcaseByTCTId(tctIds:any, testcaseIds:any) {
        return (dispatch: any) => {
            return this._testcaseService.deletTestcaseByTCTID(tctIds)
            .subscribe((response) => {
                dispatch({
                    type: types.DELETE_TESTCASE_SUCCESS
                });
                dispatch(this._onDeleteTestcase({testcase: {id: testcaseIds}}));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onDeleteTestcase(data: any) {
        return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setTestcaseSuccessMessage(data, 'delete'))
        };
    }
    _onCreateCompleteTestcase(data) {
        return { type: types.COMPLETE_TESTCASE_CREATED, data };
    }
    clearTestcaseStatus() {
        return { type: types.CLEAR_TESTCASE_STATUS };
    }

    // updateSingleTestStepById (data) {
    //     return (dispatch: any) => {
    //         return this._teststepService.updateSingleTestStepById(data)
    //         .subscribe((_steps) => {
    //             dispatch(this._updateSingleTestStepById(_steps));
    //         }, (error) => {
    //             dispatch(this.onError(error));
    //         });
    //     };
    // }

    // _updateSingleTestStepById (data) {
    //     return {type: types.UPDATE_SINGLE_TESTSTEP_BY_ID};
    // }

    updateSingleTestStepResult(data , isSetEvent , isStatusUpdate) {
        return (dispatch: any) => {
            return this._teststepService.updateSingleTestStepResult(data)
            .subscribe((_steps) => {
                if (isSetEvent) {
                    dispatch(this._updateSingleTestStepResultForAttachments(_steps));
                } else {
                    dispatch(this._updateSingleTestStepResult(_steps , isStatusUpdate));
                }
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    _updateSingleTestStepResultForAttachments(data  ) {
        return {type: types.UPDATE_SINGLE_TEST_STEP_RESULT_FOR_ATTACHMENTS, data};
    }

    _updateSingleTestStepResult (data , isStatusUpdate) {
        return {type: types.UPDATE_SINGLE_TEST_STEP_RESULT, data , isStatusUpdate : isStatusUpdate};
    }
    setTestcaseFromGrid(data) {
        return { type: types.FETCH_TESTCASE_FROM_LOCAL, data };
    }
    configureStepGridColumn(data) {
        return { type: types.CONFIGURE_STEP_GRID_COLUMN, data };
    }
    clearTestcaseData() {
        return {type: types.CLEAR_TESTCASE_DATA};
    }
    clearTestcaseTestStep() {
        return {type: types.CLEAR_UPDATE_TESTCASE_TESTSTEP};
    }
    clearFetchTestcasePath() {
      return {type: types.CLEAR_FETCH_TESTCASE_PATH};
    }

    clearEvent(event: string) {
        let _index:any = event;
        try {
            _index = `CLEAR_${event}`;
        } catch(e) {
          //  console.log(e);
        }
        return { type: types[_index]};
    }
    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.ERROR, data})
        };
    }
}


function _setTestcaseSuccessMessage(response, type) {
    let _ids = [],
        description;

    if(_.isArray(response)) {
        _ids = _.map(response, function(obj) {return obj.testcase.id;});
    } else {
        _ids.push(response.testcase && response.testcase.id);
    }
    if(type == 'create') {
        description = 'Created testcase with id(s) ' + _ids.join(', ');
    } else if(type == 'delete') {
        description = 'Deleted testcase with id(s) ' + _ids.join(', ');
    }
    // TODO: Add link to navigate to testcase, waiting for path API to be fixed for node names.
    return {
        title: 'Success',
        description: description
    };
}
