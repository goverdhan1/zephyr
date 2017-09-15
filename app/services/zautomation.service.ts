import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

// Constants
import {API_PATH ,getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
import {EventHttpService} from './event-http.service';

declare var jQuery: any;

@Injectable()
export class ZAutomationService {
    constructor (public http: any) {

    }
    getJobDetailById(id) {
        let _jobById = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_AUTOMATION_JOB_BY_ID + id;
        return this.http.get(_jobById, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    getAllAutomationJobs(){
        let allJob = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ALL_AUTOMATION_JOB;
        return this.http.get(allJob, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    getAllAutomationJobsForReleaseAndProject(releaseId , projectId) {
        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
                        getApiPath('GET_AUTOMATION_JOB_FOR_RELEASE_PROJECT', [releaseId, projectId]);
        return this.http.get(url , {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

      getAllFileWatchJobsForReleaseAndProject(releaseId , projectId) {
        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
                        getApiPath('GET_FILE_WATCH_JOB_FOR_RELEASE_PROJECT', [releaseId, projectId]);
        return this.http.get(url , {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    addAutomationJob(data){
        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ADD_AUTOMATION_JOB;
        return this.http.post(url , JSON.stringify(data) , {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

     editAutomationJob (data){      
        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.EDIT_AUTOMATION_JOB;       
        return this.http.post(url , JSON.stringify(data) , {           
                headers: getRequestHeader({               
                   'includeAcceptType': true            
                })        
        }).map(response => response.json());   
     }

    deleteAutomationJob (ids) {

        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.DELETE_AUTOMATION_JOB;
        return this.http.post(url, JSON.stringify({ids}), {
            headers: getRequestHeader({
                 'includeAcceptType': true
            })
        })
            .map(response => response.json());
    }

    deleteFileWatchJob(ids){
        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.DELETE_FILE_WATCH_JOB;
  
        return this.http.post(url, JSON.stringify({ids}), {
            headers: getRequestHeader({
                    'includeAcceptType': true
                })
            })
            .map(response => response.json());

    }

    startFileWatchJob(ids){
        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.PLAY_FILE_WATCH_JOB;
  
        return this.http.post(url, JSON.stringify({ids}), {
            headers: getRequestHeader({
                    'includeAcceptType': true
                })
            }).map(response => response.json());
    }
    
    stopFileWatchJob(ids){
         let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.PAUSE_FILE_WATCH_JOB;
  
        return this.http.post(url, JSON.stringify({ids}), {
            headers: getRequestHeader({
                    'includeAcceptType': true
                })
            }).map(response => response.json());
    }

    scheduleAutomationJob(ids, prefixname){
        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.SCHEDULE_AUTOMATION_JOB
                    + API_PATH.PREFIX_AUTOMATION_JOB + prefixname;
            
            return this.http.post(url , JSON.stringify({ids}) , {
                headers: getRequestHeader({
                    'includeAcceptType': true
                })
            }).map(response => response.json());
    }

    addFileWatcherJob(data){
       let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ADD_FILE_WATCHER_JOB;
        return this.http.post(url , JSON.stringify(data) , {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

}
