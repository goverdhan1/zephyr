import {Injectable, Inject} from '@angular/core';
import * as types from '../utils/constants/action.types';
import * as Observable from 'rxjs/Observable';
import {ZAutomationService} from '../services/zautomation.service';
import {Http} from '@angular/http';
import {I18N_MESSAGES} from '../utils/messages/messages.en';
import * as messageTypes from '../utils/constants/messages.types';
import {ProjectService} from '../services/project.service';
import { ZephyrStore } from '../store/zephyr.store';
declare var _: any;

@Injectable()
export class ZAutomationAction {
	private _automationService;

	constructor(@Inject(Http) private _http: Http) {
		this._automationService = new ZAutomationService(_http);
	}

	getAllAutomationJobs(){
		return (dispatch) => {
			return this._automationService.getAllAutomationJobs().subscribe((data) =>{
				dispatch(this._getAllAutomationJobs(data));
			}, (error) => {
				let errorMessge = {
				  zeeErrorCode: error.status,
                  errorMsg: error.json().code
				};
				dispatch(this.onError(error.json()));
			});
		};
	}

	_getAllAutomationJobs(data){
		return {type : types.GET_ALL_AUTOMATION_JOBS, data};
	}

  getAutomationJobsById(id){
    return (dispatch) => {
      return this._automationService.getJobDetailById(id).subscribe((data) =>{
        dispatch(this._getAutomationJobsById(data));
      }, (error) => {
        let errorMessge = {
          zeeErrorCode: error.status,
          errorMsg: error.json().code
        };
        dispatch(this.onError(error.json()));
      });
    };
  }
  _getAutomationJobsById(data){
    return {type : types.GET_ALL_AUTOMATION_JOBS_BY_ID, data};
  }

 updateGridPageSize(size, currentPage) {
        return { type: types.UPDATE_ZAUTO_GRID, size, currentPage };
    }

 updateFileWatchGridPageSize(size, currentPage) {
        return { type: types.UPDATE_FILE_WATCH_GRID, size, currentPage };
    }

	getAllAutomationJobsForReleaseAndProject(releaseId , projectId){
		return (dispatch) => {
			return this._automationService.getAllAutomationJobsForReleaseAndProject(releaseId , projectId).
				subscribe((data) => {
					dispatch(this._getAutomationJobForReleaseProject(data));
				}, (error) => {
					let errorMessge = {
				  	zeeErrorCode: error.status,
                  	errorMsg: error.json().code
					};
					dispatch(this.onError(error.json()));
				});
		};
	}

	_getAutomationJobForReleaseProject(data){
		return {type : types.GET_AUTOMATION_JOB_FOR_RELEASE_PROJECT , data};
	}

	getAllFileWatchJobsForReleaseAndProject(releaseId , projectId){
		return (dispatch) => {
			return this._automationService.getAllFileWatchJobsForReleaseAndProject(releaseId , projectId).
				subscribe((data) => {
					dispatch(this._getFileWatchJobForReleaseProject(data));
				}, (error) => {
					let errorMessge = {
				  	zeeErrorCode: error.status,
                  	errorMsg: error.json().code
					};
					dispatch(this.onError(error.json()));
				});
		};
	}

	_getFileWatchJobForReleaseProject(data){
		return {type : types.GET_FILE_WATCH_JOB_FOR_RELEASE_PROJECT , data};
	}

	scheduleAutomationJob(ids,prefixName){
		return (dispatch) => {
			this._automationService.scheduleAutomationJob(ids,prefixName).subscribe((data) => {
				dispatch(this._scheduleAutomationJob(data));
				dispatch(this._onScheduleAutomationJob(data, data.id));
			},(error) => {
				let errorMessge = {
				  zeeErrorCode: error.status,
				  errorMsg: error.json().code
				};
				dispatch(this.onError(error.json()));
			});
		};
	}

	_scheduleAutomationJob(data){
		return {type : types.SCHEDULE_AUTOMATION_JOB , data};
	}

	_onScheduleAutomationJob(data, automationJobid){
		return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setToasterMessage(data, 'schedule',automationJobid))
        };
	}

	addAutomationJob(data){
		return (dispatch) =>{
			this._automationService.addAutomationJob(data).subscribe((data) => {
				dispatch(this._addAutomationJob(data));
                dispatch(this._onAddAutomationJob(data));
			}, (error) => {
					let errorMessge = {
				  	zeeErrorCode: error.status,
                  	errorMsg: error.json().code
					};
					dispatch(this.onError(error.json()));
			});
		};
	}

	_addAutomationJob(data){
		return {type : types.CREATE_AUTOMATION_JOB , data};
	}

	addfileWatchJob(data){
			return (dispatch) =>{
				this._automationService.addFileWatcherJob(data).subscribe((data) => {
					dispatch(this._addFileWatchJob(data));
					dispatch(this._onAddFileWatchJob(data));
				}, (error) => {
						let errorMessge = {
						zeeErrorCode: error.status,
						errorMsg: error.json().code
						};
						dispatch(this.onError(error.json()));
				});
			};
		}

	_addFileWatchJob(data){
		return {type : types.CREATE_FILE_WATCHER_JOB , data};
	}

		_onAddFileWatchJob(data){
		return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setAutomationToastrMessage(data, 'create'))
        };
	}

	_onAddAutomationJob(data){
		return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, _setAutomationToastrMessage(data, 'create'))
        };
	}

	onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.ERROR, data})
        };
    }

    editAutomationJob(id, automationJobId){
	return (dispatch) =>{
	return this._automationService.editAutomationJob(id).subscribe((data) => {
	dispatch(this._editAutomationJob(data));
	dispatch(this.onSuccess(I18N_MESSAGES['zephyr.zautomation.Jobs.Edit.success']));
	 }, (error) => {
	dispatch(this.onError('error'));
	});
	};
	}
	_editAutomationJob(data){
	return { type: types.EDIT_AUTOMATION_JOB, data};

	}

    deleteAutomationJob (jobIds) {
       return (dispatch) => {
            return this._automationService.deleteAutomationJob(jobIds).subscribe((data) => {
                dispatch(this._deleteAutomationJob(data));
                dispatch(this.onSuccess(I18N_MESSAGES['zephyr.zautomation.Jobs.delete.success']));
            }, (error) => {
                dispatch(this.onError('error'));
            });
        };
    }
    _deleteAutomationJob(data) {
        return { type: types.DELETE_AUTOMATION_JOB, data };
    }

     deleteFileWatchJob (jobIds) {
       return (dispatch) => {
            return this._automationService.deleteFileWatchJob(jobIds).subscribe((data) => {
                dispatch(this._deleteFileWatchJob(data));
                dispatch(this.onSuccess(I18N_MESSAGES['zephyr.zautomation.Jobs.delete.success']));
            }, (error) => {
                dispatch(this.onError('error'));
            });
        };
    }
    _deleteFileWatchJob(data) {
        return { type: types.DELETE_FILE_WATCH_JOB, data };
    }
    
    playFileWatchJob (jobIds) {
       return (dispatch) => {
            return this._automationService.startFileWatchJob(jobIds).subscribe((data) => {
                dispatch(this._playFileWatchJob(data));
                dispatch(this.onSuccess(I18N_MESSAGES['zephyr.zautomation.Jobs.play.success']));
            }, (error) => {
                dispatch(this.onError('error'));
            });
        };
    }
    _playFileWatchJob(data) {
        return { type: types.PLAY_FILE_WATCH_JOB, data };
    }

      pauseFileWatchJob (jobIds) {
       return (dispatch) => {
            return this._automationService.stopFileWatchJob(jobIds).subscribe((data) => {
                dispatch(this._pauseFileWatchJob(data));
                dispatch(this.onSuccess(I18N_MESSAGES['zephyr.zautomation.Jobs.pause.success']));
            }, (error) => {
                dispatch(this.onError('error'));
            });
        };
    }
    _pauseFileWatchJob(data) {
        return { type: types.PAUSE_FILE_WATCH_JOB, data };
    }

    onSuccess(data) {
		return {
			type: types.SHOW_TOAST,
			data: ({type: messageTypes.SUCCESS, data})
		};
  	}


};

	function _setToasterMessage(response, type, automationJobId) {
			let _ids = [],
			description,
				title = 'Success';
		if(type == 'schedule') {
				description = 'Schedule Job with Id(s) ' + automationJobId;
		} else if(type == 'error') {
				title = 'Error';
				description = response.errorMsg || response.code ;
			}
		return {
				title: title,
				description: description
		};
		}

	function _setAutomationToastrMessage(response, type) {
			let _ids = [],
			description,
				title = 'Success';
			if(_.isArray(response)) {
				_ids = _.map(response, function(obj) {return obj.id;});
			} else if(response.id) {
				_ids.push(response.id);
			}
			if(type == 'create') {
				description = 'Created Automation Job with id(s) ' + _ids.join(', ');
			} else if(type == 'edit') {
				description = 'Edited Automation Job with id(s) ' + _ids.join(', ');
			} else if(type == 'error') {
				title = 'Error';
				description = response.errorMsg || response.code ;
			}
			return {
				title: title,
				description: description
  };
}


