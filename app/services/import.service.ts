import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {getRequestHeader} from '../utils/api/api.utils';
// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';

declare var jQuery: any;

@Injectable()
export class ImportService {
    constructor(public http: any) {
        //console.log('Import service');
    }
    /**
     * Get Saved Maps
     * @param type
     */
    getSavedMaps(type) {
        let getSavedMapsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_SAVED_MAPS', [type]);

        return this.http.get(getSavedMapsURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    /**
     * Get Import Jobs
     * @param type
     */
    getImportJobs(type) {
        let getImportJobsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_IMPORT_JOBS', [type]);

        return this.http.get(getImportJobsURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    getImportJobsById(id) {
        let getImportJobsByIdURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_IMPORT_JOBS_BY_ID', [id]);

        return this.http.get(getImportJobsByIdURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    /**
     * Get Saved Maps Fields Config
     * @param type
     */
    getSavedMapsFieldsConfig(type) {
        let getImportJobsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_FIELD_CONFIG', [type, 'true']);

        return this.http.get(getImportJobsURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    createSavedMaps(data) {
        let createSavedMapsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.CREATE_SAVED_MAPS;

        return this.http.post(createSavedMapsURL, JSON.stringify(data), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    updateSavedMaps(data) {
        let updateSavedMapsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.UPDATE_SAVED_MAPS;

        return this.http.put(updateSavedMapsURL, JSON.stringify(data), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    deleteSavedMaps(mapId) {
        let deleteSavedMapsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('DELETE_SAVED_MAPS', [mapId]);

        return this.http.delete(deleteSavedMapsURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    loadImportJobById(jobId) {
      let loadImportJob = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_IMPORT_JOBS_BY_ID', [jobId]);

      return this.http.get(loadImportJob, {
        headers: getRequestHeader()
      }).map(response => response.json());
    }
    deleteImportJobs(jobId) {
        let deleteImportJobsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('DELETE_IMPORT_JOBS', [jobId]);

        return this.http.delete(deleteImportJobsURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    runImportJobs(jobId, action) {
        let runImportJobsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('RUN_IMPORT_JOBS', [jobId, action]);

        return this.http.put(runImportJobsURL, JSON.stringify({id: jobId, action: action}), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    createImportJobs(data) {
        let createImportJobsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.CREATE_IMPORT_JOBS;

        return this.http.post(createImportJobsURL, JSON.stringify(data), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    updateImportJobs(data) {
        let updateImportJobsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.UPDATE_IMPORT_JOBS;

        return this.http.put(updateImportJobsURL, JSON.stringify(data), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    importRequirementsFromJIRA(data) {
        let importReqsFromJIRAURL;

        if (data.importAll) {
          importReqsFromJIRAURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
            API_PATH.IMPORT_ALL_REQ_FROM_JIRA;
        } else {
          importReqsFromJIRAURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
            API_PATH.IMPORT_REQ_FROM_JIRA;
        }

        return this.http.post(importReqsFromJIRAURL, JSON.stringify(data), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => {
            try {
                return response.json();
            } catch(err) {
                return response['_body'];
            }
        });
    }
    checkJobsFolder(folderName) {
        let checkJobsFolderURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('CHECK_IMPORT_JOBS_FOLDER', [folderName]);

        return this.http.get(checkJobsFolderURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    uploadFile(jobId, formData, cb=null) {
        let accessType = 'HTMLUI';
        let uploadFileURL = API_PATH.BASE_UPLOAD_ENDPOINT + getApiPath('IMPORT_UPLOAD_FILE', [jobId]);

        if('dev' === process.env) {
          accessType = 'API';
        }

        if(cb) {
          jQuery.ajax({
            url: uploadFileURL,
            type: 'POST',
            dataType: 'json',
            data: formData,
            complete: () => {
                cb(jobId);
            },
            processData: false,  // do not process the data
            contentType: false,   // do not set contentType
            headers: {
              accessType: accessType
            }
          });
        } else {
          jQuery.ajax({
            url: uploadFileURL,
            type: 'POST',
            data: formData,
            processData: false,  // do not process the data
            contentType: false,   // do not set contentType
            headers: {
              accessType: accessType
            }
          });
        }
    }
}
