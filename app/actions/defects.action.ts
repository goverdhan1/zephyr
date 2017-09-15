import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import * as types from '../utils/constants/action.types';
import * as messageTypes from '../utils/constants/messages.types';
import {DefectsService} from '../services/defects.service';
import {AttachmentService} from '../services/attachment.service';
import {ISSUE_METADATA} from '../mocks/defects.mock';

@Injectable()
export class DefectsAction {
    _defectsService;
    _attachmentService;
    constructor(@Inject(Http) private _http: any) {
        this._defectsService = new DefectsService(_http);
        this._attachmentService = new AttachmentService(_http);
    }
    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.ERROR, data})
        };
    }
    onSuccess(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.SUCCESS, data})
        };
    }
    onInfo(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.INFO, data})
        };
    }

    fetchOpenDefectSummary(releaseId, selectBy, gadgetId) {
      return (dispatch) => {
        return this._defectsService.getOpenDefectSummary(releaseId, selectBy, true).subscribe((openDefectSummary) => {
          openDefectSummary.gadgetId = gadgetId;
          dispatch(this._fetchOpenDefectSummary(openDefectSummary));
        }, (error) => {
          dispatch(this.onError(error));
        });
      };
    }

    _fetchOpenDefectSummary(data) {
      return { type: types.FETCH_OPEN_DEFECT_SUMMARY, data };
    }

    fetchDefectSummaries(releaseId, gadgetId='') {
        return (dispatch) => {
            return this._defectsService.getDefectSummaries(releaseId).subscribe((defectSummaries) => {
              defectSummaries.gadgetId = gadgetId;
              dispatch(this._fetchDefectSummaries(defectSummaries));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _fetchDefectSummaries(data) {
        return { type: types.FETCH_DEFECT_SUMMARIES, data };
    }
    fetchDefectDetails(params) {
        return (dispatch) => {
            return this._defectsService.getDefectDetails(params).subscribe((defectDetails) => {
                let result = {
                    offset: params.offset,
                    currentPage: params.currentPage,
                    defectsData: defectDetails
                };
                dispatch(this._fetchDefectDetails(result));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _fetchDefectDetails(data) {
        return { type: types.FETCH_DEFECT_DETAILS, data };
    }
    exportDefectsbyIds(defectIds) {
        return (dispatch) => {
            return this._defectsService.exportDefectsbyIds(defectIds).subscribe((downloadLink) => {
                dispatch(this._exportDefectsbyIds(downloadLink));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _exportDefectsbyIds(data) {
        return { type: types.EXPORT_DEFECTS, data };
    }
    getFilters() {
        return (dispatch) => {
            return this._defectsService.getFilters().subscribe((filters) => {
                dispatch(this._getFilters(filters));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _getFilters(data) {
        return { type: types.FETCH_DEFECTS_SEARCH_FILTERS, data };
    }
    getFiltersDefectDetails() {
        return (dispatch) => {
            return this._defectsService.getFilters().subscribe((filters) => {
                dispatch(this._getFiltersDefectDetails(filters));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _getFiltersDefectDetails(data) {
        return { type: types.FETCH_DEFECTS_DETAILS_FILTERS, data };
    }
    getDefectById(defectId) {
        return (dispatch) => {
            return this._defectsService.getDefectById(defectId).subscribe((response) => {
                dispatch(this._getDefectById(response));
            }, (error) => {
                dispatch(this.onInfo(error));
            });
        };
    }
    _getDefectById(data) {
        return { type: types.FETCH_DEFECT_BY_ID, data };
    }
    getDefectsByJQL(params, type) {
        return (dispatch) => {
            return this._defectsService.getDefectsByJQL(params, type).subscribe((defects) => {
                let result = {
                    offset: params.offset,
                    currentPage: params.currentPage,
                    defectsData: defects
                };
                dispatch(this._getDefectsByJQL(result, params.jqlQuery));
                if(defects && defects.bugsList && defects.alert && defects.bugsList.length === 0) {
                    dispatch(this.onInfo(defects.alert));
                }
            }, (error) => {
                dispatch(this.onError(error));
                dispatch(this.resetDefectsSearchJQL());
            });
        };
    }
    _getDefectsByJQL(data, jqlQuery) {
        return { type: types.FETCH_DEFECTS_BY_JQL, data, jqlQuery };
    }
    resetDefectsSearchJQL() {
        return { type: types.RESET_DEFECT_SEARCH_JQL };
    }
    getDefectsByFilters(params, type) {
        return (dispatch) => {
            return this._defectsService.getDefectsByFilters(params, type).subscribe((defects) => {
                let result = {
                    offset: params.offset,
                    currentPage: params.currentPage,
                    defectsData: defects
                };
                dispatch(this._getDefectsByFilters(result));
            }, (error) => {
                dispatch(this.onInfo(error));
            });
        };
    }
    _getDefectsByFilters(data) {
        return { type: types.FETCH_DEFECTS_BY_FILTERS, data };
    }
    //
    getDefectByIdDefDetail(defectId) {
        let maptc = true;
        return (dispatch) => {
            return this._defectsService.getDefectById(defectId, maptc).subscribe((response) => {
                dispatch(this._getDefectByIdDefDetail(response));
            }, (error) => {
                dispatch(this.onInfo(error));
            });
        };
    }
    _getDefectByIdDefDetail(data) {
        return { type: types.FETCH_DEFECT_BY_ID_DEFECT_DETAIL, data };
    }
    getDefectsByJQLDefDetail(params) {
        params.maptc = true;
        return (dispatch) => {
            return this._defectsService.getDefectsByJQL(params).subscribe((defects) => {
                let result = {
                    offset: params.offset,
                    currentPage: params.currentPage,
                    defectsData: defects
                };
                dispatch(this._getDefectsByJQLDefDetail(result, params.jqlQuery));
                if(defects && defects.bugsList && defects.alert && defects.bugsList.length === 0) {
                    dispatch(this.onInfo(defects.alert));
                }
            }, (error) => {
                dispatch(this.onError(error));
                dispatch(this.resetDefectDetails());
            });
        };
    }
    _getDefectsByJQLDefDetail(data, jqlQuery) {
        return { type: types.FETCH_DEFECTS_BY_JQL_DEFECT_DETAIL, data, jqlQuery };
    }
    getDefectsByFiltersDefDetail(params) {
        params.maptc = true;
        return (dispatch) => {
            return this._defectsService.getDefectsByFilters(params).subscribe((defects) => {
                let result = {
                    offset: params.offset,
                    currentPage: params.currentPage,
                    defectsData: defects
                };
                dispatch(this._getDefectsByFiltersDefDetail(result));
            }, (error) => {
                dispatch(this.onInfo(error));
            });
        };
    }
    _getDefectsByFiltersDefDetail(data) {
        return { type: types.FETCH_DEFECTS_BY_FILTERS_DEFECT_DETAIL, data };
    }
    //
    getCurrentlyLinkedDefects(executionId) {
        return (dispatch) => {
            return this._defectsService.getCurrentlyLinkedDefects(executionId).subscribe((defects) => {
                dispatch(this._getCurrentlyLinkedDefects(defects));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _getCurrentlyLinkedDefects(data) {
        return { type: types.FETCH_CURRENTLY_LINKED_DEFECTS, data };
    }
    searchDefectsToLink(searchObj) {
        return (dispatch) => {
            return this._defectsService.searchDefects(searchObj).subscribe((defects) => {
                dispatch(this._searchDefectsToLink(defects));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _searchDefectsToLink(data) {
        return { type: types.SEARCH_DEFECTS_TO_LINK, data };
    }
    getIssueMetadata(params) {
        return (dispatch) => {
            return this._defectsService.getIssueMetadata(params).subscribe((data) => {
                dispatch(this._getIssueMetadata(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _getIssueMetadata(data) {
        return { type: types.FETCH_ISSUE_METADATA, data };
    }
    getIssueMetadataForCreate(params) {
        return (dispatch) => {
            return this._defectsService.getIssueMetadata(params).subscribe((data) => {
                dispatch(this._getIssueMetadataForCreate(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _getIssueMetadataForCreate(data) {
        return { type: types.FETCH_ISSUE_METADATA_FOR_CREATE, data };
    }
    clearLinkNewDefectEvent() {
        return { type: types.CLEAR_LINK_NEW_DEFECT_EVENT };
    }
    clearFetchDefectsSummaryEvent() {
      return { type: types.CLEAR_DEFECT_SUMMARY_EVENT };
    }
    clearDefectDetailsEvent() {
        return { type: types.CLEAR_DEFECT_DETAILS_EVENT };
    }
    createDefect(params, testcaseId, scheduleId) {
        return (dispatch) => {
            return this._defectsService.createDefect(params).subscribe((bugObj) => {
                dispatch(this._createDefect(bugObj));
                bugObj['mapTestcaseId'] = testcaseId;
                bugObj['mapScheduleId'] = scheduleId;
                dispatch(this.mapDefectSchedule(bugObj));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    createDefectOnTrackingPage(params) {
        return (dispatch) => {
            return this._defectsService.createDefect(params).subscribe((bugObj) => {
                dispatch(this._createDefectOnTrackingPage(bugObj));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _createDefect(data) {
        return { type: types.CREATE_DEFECT, data };
    }
    _createDefectOnTrackingPage(data) {
        return { type: types.CREATE_DEFECT_FOR_TRACKING_PAGE, data };
    }
    updateDefect(params, defectId, changes) {
        return (dispatch) => {
            return this._defectsService.updateDefect(params, defectId, changes).subscribe((bugObj) => {
              if(params.testcases){
                bugObj['testcases']=[];
                params.testcases.forEach((item)=>{bugObj.testcases.push(item);});
              }
                dispatch(this._updateDefectGridUpdate(bugObj));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _updateDefectGridUpdate(data) {
        return { type: types.UPDATE_DEFECT_GRID_UPDATE, data };
    }
    updateDefectsSearchGridType(data) {
        return { type: types.UPDATE_DEFECT_SEARCH_GRID_TYPE, data };
    }
    getJIRAProjects(options) {
        return (dispatch) => {
            return this._defectsService.getJIRAProjects(options).subscribe((data) => {
                dispatch(this._getJIRAProjects(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _getJIRAProjects(data) {
        return { type: types.GET_JIRA_PROJECTS, data };
    }
    getJIRAProjectsForFileDefect(options) {
        return (dispatch) => {
            return this._defectsService.getJIRAProjects(options).subscribe((data) => {
                dispatch(this._getJIRAProjectsForFileDefect(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _getJIRAProjectsForFileDefect(data) {
        return { type: types.GET_JIRA_PROJECTS_FOR_FILE_DEFECT, data };
    }
    getIssueTypes(projectId) {
        return (dispatch) => {
            return this._defectsService.getIssueTypes(projectId).subscribe((data) => {
                dispatch(this._getIssueTypes(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _getIssueTypes(data) {
        return { type: types.GET_ISSUE_TYPES, data };
    }
    mapDefectSchedule(params) {
        return (dispatch) => {
            return this._defectsService.mapDefectSchedule(params).subscribe((data) => {
                dispatch(this._mapDefectSchedule(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _mapDefectSchedule(data) {
        return { type: types.MAP_DEFECT_SCHEDULE, data };
    }
    dispatchError(msg) {
        return (dispatch) => {
            dispatch(this.onError(msg));
        };
    }
    dispatchSuccess(msg) {
        return (dispatch) => {
            dispatch(this.onSuccess(msg));
        };
    }
    resetDefectsSearch() {
        return { type: types.RESET_DEFECT_SEARCH };
    }
    resetCurrentlyLinkedDefects() {
        return { type: types.RESET_CURRENTLY_LINKED_DEFECTS };
    }
    clearDefectsSearchEvent() {
        return { type: types.CLEAR_DEFECT_SEARCH_EVENT };
    }
    deleteMappedSchedule(scheduleId, testcaseId, selectedBugObj) {
        return (dispatch) => {
            return this._defectsService.deleteMappedSchedule(scheduleId, testcaseId, selectedBugObj).subscribe((data) => {
                dispatch(this._deleteMappedSchedule());
                dispatch(this.getCurrentlyLinkedDefects(scheduleId));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _deleteMappedSchedule() {
        return { type: types.DELETE_MAPPED_SCHEDULE };
    }
    clearCurrentlyLinkedDefectEvent() {
        return { type: types.CLEAR_CURRENTLY_LINKED_DEFECT_EVENT };
    }
    updateArrayFieldsKey(data) {
        return { type: types.UPDATE_ARRAY_FIELDS_KEY, data };
    }
    updateDefectDetailsPageSize(data) {
        return {type: types.UPDATE_DEFECT_DETAILS_GRID_SIZE, data};
    }
    updateDefectSearchPageSize(data) {
        return {type: types.UPDATE_DEFECT_SEARCH_GRID_SIZE, data};
    }
    updateUser(userObj, userCreationType) {
        return (dispatch) => {
            return this._defectsService.updateUser(userObj, userCreationType).subscribe((data) => {
                dispatch(this._updateUser(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _updateUser(data) {
        return {type: types.UPDATE_DEFECT_USER, data};
    }
    clearDefectUserEvent() {
        return { type: types.CLEAR_DEFECT_USER_EVENT };
    }
    getDefectUser() {
        return (dispatch) => {
            return this._defectsService.getDefectUser().subscribe((user) => {
                dispatch(this._getDefectUser(user));
            }, (error) => {
                dispatch(this._getDefectUser(null));
            });
        };
    }
    _getDefectUser(data) {
        return { type: types.GET_DEFECT_USER, data };
    }
    getAdminSetupUser(userObj, defectSystem) {
        return (dispatch) => {
            return this._defectsService.getAdminSetupUser(userObj, defectSystem).subscribe((user) => {
                dispatch(this._getAdminSetupUser('SUCCESS'));
            }, (error) => {
                try {
                    if(error.json().errorCode == "52104") {
                        dispatch(this._getAdminSetupUser('NETWORK_ERROR'));
                    } else if(error.json().errorCode == "52101") {
                        dispatch(this.onError(error.json().errorMsg));
                        setTimeout(() => {
                            dispatch(this._getAdminSetupUser('ERROR'));
                        }, 400);
                    } else {
                        dispatch(this._getAdminSetupUser('ERROR'));
                    }
                }catch(e) {
                    dispatch(this._getAdminSetupUser('ERROR'));
                }
            });
        };
    }
    _getAdminSetupUser(data) {
        return { type: types.GET_ADMIN_SETUP_DEFECT_USER, data };
    }
    deleteUser(userId) {
        return (dispatch) => {
            return this._defectsService.deleteUser(userId).subscribe((response) => {
                dispatch(this._deleteUser());
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _deleteUser() {
        return { type: types.DELETE_DEFECT_USER };
    }
    clearDefectAllRows() {
        return { type: types.CLEAR_DEFECT_IMPORT_ALL_ROWS };
    }
    uploadAttachmentForDefect(formData , id , fileSize ,currentLoggedInUserId) {
        return(dispatch) => {
            return this._attachmentService.uploadAttachmentForDefect(formData).success((data) => {
                dispatch(this.getDefectAttachmentData(id));
                dispatch(this.onSuccess('Attachment uploaded successfully'));
            }).fail((error) => {
                let errorMessage = {
                        zeeErrorCode: error.status,
                        errorMsg: error.statusText
                };
                dispatch(this.onErrorAttachment(errorMessage));
            });
        };
    }
    onErrorAttachment(data) {
        return {
            type: types.SHOW_TOAST_ERROR_ATTACHMENT,
            data: ({type: messageTypes.ERROR, data})
        };
    }
    saveAttachmentData(data) {
        return { type: types.SAVE_DEFECT_ATTACHMENT_DATA, data };
    }
    getDefectAttachmentData(defectId) {
        return (dispatch) => {
            return this._defectsService.getDefectById(defectId).subscribe((response) => {
                let attachments = response.fileDocuments || [];
                dispatch(this.saveAttachmentData(attachments));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    getDefectLightMetaData(defectProjectKey) {
        return(dispatch) => {
            return this._defectsService.getDefectLightMetaData(defectProjectKey).subscribe((response) => {
                let defectMetaData = response || [];
                dispatch(this.saveDefectMetaData(defectMetaData));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    getLightMetaDataForBulkEdit(defectProjectKey) {
         return(dispatch) => {
            return this._defectsService.getDefectLightMetaData(defectProjectKey).subscribe((response) => {
                let defectMetaData = response || [];
                dispatch(this.saveBulkEditMetaData(defectMetaData));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    saveBulkEditMetaData(data) {
        return { type: types.GET_DEFECT_BULK_METADATA , data};
    }

    updateDefectLightMetaData(defectProjectKey) {
        return(dispatch) => {
            return this._defectsService.getDefectLightMetaData(defectProjectKey).subscribe((response) => {
                let defectMetaData = response || [];
                dispatch(this.updateDefectMetaData(defectMetaData));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    updateDefectMetaData(data) {
        return {type: types.DEFECT_UPDATE_LIGHT_METADATA_BY_PROJECT , data};
    }

    bulkUpdateDefects(defects){
        return(dispatch) => {
            return this._defectsService.updateDefectInBulk(defects).subscribe((response) => {
                let defectsResponse = response;
                let defectsList = defects.bugs;
                dispatch(this.bulkUpdateDefect(defectsResponse, defectsList));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    bulkUpdateDefect(data, defectsList){
        return {type : types.UPDATE_BULK_DEFECT , data, defectsList};
    }

    saveDefectMetaData(data) {
        return {type: types.DEFECT_LIGHT_METADATA_BY_PROJECT , data};
    }
    defectBasicSearch(params) {
        return(dispatch) => {
            return this._defectsService.defectBasicSearch(params).subscribe((defects) => {
                let result = {
                    offset: params.offset,
                    currentPage: params.currentPage,
                    defectsData: defects
                };
                dispatch(this._defectBasicSearch(result));
                if(defects && defects.bugsList && defects.alert && defects.bugsList.length === 0) {
                    dispatch(this.onInfo(defects.alert));
                }
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _defectBasicSearch(data) {
        return {type: types.DEFECTS_BASIC_SEARCH , data};
    }
    updateCurrentlyLinkedGrid(data) {
        return {type: types.UPDATE_CURRENTLY_LINKED_GRID , data};
    }
    resetDefectDetails() {
        return {type: types.RESET_DEFECT_DETAILS};
    }
    clearDefectsDetailsAllRows() {
        return {type: types.CLEAR_DEFECT_DETAILS_ALL_ROWS};
    }
}
