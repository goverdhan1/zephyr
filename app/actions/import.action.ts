import {Injectable, Inject} from '@angular/core';
import * as types from '../utils/constants/action.types';
import {ImportService} from '../services/import.service';
import {TCRService} from '../services/tcr.service';
import {RequirementService} from '../services/requirement.service';
import {AdminPreferenceService} from '../services/admin_preference.service';
import {Http} from '@angular/http';
import * as messageTypes from '../utils/constants/messages.types';

@Injectable()
export class ImportAction {
    private _importService: ImportService;
    private _tcrService: TCRService;
    private _reqService: RequirementService;
    private _adminPreferenceService: AdminPreferenceService;
    constructor(@Inject(Http) private _http: any) {
        this._importService = new ImportService(_http);
        this._tcrService = new TCRService(_http);
        this._reqService = new RequirementService(_http);
        this._adminPreferenceService = new AdminPreferenceService(_http);
    }
    _onSavedMaps(data) {
        return { type: types.IMPORT_SAVED_MAPS, data };
    }
    getSavedMaps(type, customFields) {
        return (dispatch) => {
            return this._importService.getSavedMaps(type).subscribe((response) => {
                dispatch(this._onSavedMaps(response));
                dispatch(this.getSavedMapsFieldsConfig(type, customFields));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onImportJobs(data) {
        return { type: types.IMPORT_JOBS, data };
    }
    clearImportEvents() {
      return { type: types.CLEAR_IMPORT_EVENT};
    }
    updateJobsPagination(currentPage, size) {
        return {type: types.UPDATE_JOB_PAGINATION, currentPage, size};
    }
    updateMapsPagination(currentPage, size) {
        return {type: types.UPDATE_MAP_PAGINATION, currentPage, size};
    }
    getImportJobs(type) {
        return (dispatch) => {
            return this._importService.getImportJobs(type).subscribe((response) => {
                dispatch(this._onImportJobs(response));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onImportJobsById(data) {
        return { type: types.IMPORT_JOBS_BY_ID, data };
    }
    getImportJobsById(id) {
        return (dispatch) => {
            return this._importService.getImportJobsById(id).subscribe((response) => {
                dispatch(this._onImportJobsById(response));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onSavedMapsFieldsConfig(data) {
        return { type: types.IMPORT_SAVED_MAPS_FIELDS_CONFIG, data };
    }
    getSavedMapsFieldsConfig(type, customFields) {
        return (dispatch) => {
            return this._importService.getSavedMapsFieldsConfig(type).subscribe((response) => {
                response = response.concat(Array.isArray(customFields) ? customFields : []);
                dispatch(this._onSavedMapsFieldsConfig(response));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onCreateSavedMaps(data) {
        return { type: types.IMPORT_CREATE_SAVED_MAPS , data };
    }
    createSavedMaps(data, DatePipe) {
        return (dispatch) => {
            return this._importService.createSavedMaps(data).subscribe((response) => {
                let date = response.creationDate;
                let rawDate = new Date(date);
                let formattedDate = new DatePipe().transform(rawDate, 'yyyy-MM-dd');
                response.creationDate = formattedDate;
                dispatch(this._onCreateSavedMaps(response));
                dispatch(this.onSuccess("Mapped testcase with id "+ response.id +" created successfully"));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onUpdateSavedMaps(data) {
        return { type: types.IMPORT_UPDATE_SAVED_MAPS, data };
    }
    updateSavedMaps(data, DatePipe) {
        return (dispatch) => {
            return this._importService.updateSavedMaps(data).subscribe((response) => {
                let date = response.creationDate;
                let rawDate = new Date(date);
                let formattedDate = new DatePipe().transform(rawDate, 'yyyy-MM-dd');
                response.creationDate = formattedDate;
                dispatch(this._onUpdateSavedMaps(response));
                dispatch(this.onSuccess("Mapped testcase with id "+ response.id +" updated successfully"));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onDeleteSavedMaps(data) {
        return { type: types.IMPORT_DELETE_SAVED_MAPS, data };
    }
    deleteSavedMaps(mapId) {
        return (dispatch) => {
            return this._importService.deleteSavedMaps(mapId).subscribe((response) => {
                dispatch(this._onDeleteSavedMaps({id: mapId}));
                dispatch(this.onSuccess("Mapped testcase with id "+ mapId +" deleted successfully"));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onSavedMapsDiscriminators(data) {
        return { type: types.IMPORT_SAVED_MAPS_DISCRIMINATORS, data };
    }
    getSavedMapsDiscriminators(key) {
        return (dispatch: any) => {
            return this._adminPreferenceService.getPreferenceByKey(key, false)
            .subscribe((preference) => {
                dispatch(this._onSavedMapsDiscriminators(preference));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _LoadJobHistory(data) {
      return { type: types.IMPORT_LOAD_JOB_HISTORY, data };
    }
    loadImportJobById(jobId) {
      return (dispatch) => {
        return this._importService.loadImportJobById(jobId).subscribe((response) => {
          dispatch(this._LoadJobHistory(response));
        }, (error) => {
          dispatch(this.onError(error));
        });
      };
    }
    _onDeleteImportJobs(data) {
        return { type: types.IMPORT_DELETE_IMPORT_JOBS, data };
    }
    deleteImportJobs(jobId) {
        return (dispatch) => {
            return this._importService.deleteImportJobs(jobId).subscribe((response) => {
                dispatch(this._onDeleteImportJobs({id: jobId}));
                dispatch(this.onSuccess("Mapped job with id "+ jobId +" deleted successfully"));

            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _onCreateImportJobs(data) {
        return { type: types.IMPORT_CREATE_IMPORT_JOBS, data };
    }
    createImportJobs(data, cb) {
        return (dispatch) => {
            return this._importService.createImportJobs(data).subscribe((response) => {
               // console.log('done');
                //console.log(response);
                if(cb && cb instanceof Function) {
                    cb(response);
                }
                dispatch(this._onCreateImportJobs(response));
                dispatch(this.onSuccess("Mapped job with id "+ response.id +" created successfully"));
            }, (error) => {
              //  console.log(error);
                //console.log('error');
                dispatch(this.onError(error));
            });
        };
    }
    _onUpdateImportJobs(data) {
        return { type: types.IMPORT_UPDATE_IMPORT_JOBS, data };
    }
    updateImportJobs(data, cb) {
        return (dispatch) => {
            return this._importService.updateImportJobs(data).subscribe((response) => {
                if(cb && cb instanceof Function) {
                    cb(response);
                }
                dispatch(this._onUpdateImportJobs(response));
                dispatch(this.onSuccess("Mapped job with id "+ response.id +" updated successfully"));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    runImportJobs(jobId, action, componentId) {
        return (dispatch) => {
            return this._importService.runImportJobs(jobId, action).subscribe(data => {
                dispatch(this._reIndex(data, componentId));

            }, (error) => {
                dispatch(this.getImportJobsById(jobId));
                // dispatch(this.onError(error));
            });
        };
    }
    _reIndex(data, componentId) {
        return { type: types.JOB_PROGRESS_STATUS_STARTS, data, componentId };
    }
    fetchImportedTreeData(releaseId, reqType, projectId) {
        return dispatch => {
            if(reqType === 'requirement') {
                return this._reqService.getImportedTreeData(projectId).subscribe((response) => {
                    dispatch(this._fetchTreeDataForImportedReq(response));
                }, (error) => {
                    dispatch(this.onError(error));
                });
            }

            return this._tcrService.getImportedTreeData(releaseId).subscribe((response) => {
                dispatch(this._fetchTreeDataForImportedTcr(response));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _fetchTreeDataForImportedTcr(data) {
        return { type: types.FETCH_TREE_DATA_FOR_IMPORTED_TCR, data };
    }
    _fetchTreeDataForImportedReq(data) {
        return { type: types.FETCH_TREE_DATA_FOR_IMPORTED_REQ, data };
    }
    checkJobsFolder(folderName) {
        return this._importService.checkJobsFolder(folderName);
    }
    uploadFile(jobId, formData, cb=null) {
        return this._importService.uploadFile(jobId, formData, cb);
    }
    importRequirementsFromJIRA(data, releaseId, reqType, importAll = false) {
      data.importAll = importAll;

      return (dispatch) => {
            return this._importService.importRequirementsFromJIRA(data).subscribe((response) => {
                dispatch(this._importRequirementsFromJIRA());
                dispatch(this.onSuccess(response));
                dispatch(this.fetchImportedTreeData(releaseId, reqType, data.projectId));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _importRequirementsFromJIRA() {
        return { type: types.IMPORT_REQ_FROM_JIRA };
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
}
