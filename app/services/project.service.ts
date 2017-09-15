import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import {ProjectModel} from '../models/project.model';
import {PROJECTS} from '../mocks/projects.mock';
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
import {EventHttpService} from './event-http.service';

@Injectable()
export class ProjectService {
    public projects: ProjectModel[];
    public projectSummaries;
    constructor(public http: EventHttpService) {
        this.projects = PROJECTS;
    }
    getProjectDetailsById(id, skipLoadingBar=false): Observable<any> {
        let getProjectURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_PROJECT_BY_ID + id;
        return this.http.get(getProjectURL, {
            headers: getRequestHeader()
        }, skipLoadingBar)
        .map(response => response.json());
    }
    getProjectSummaries(projectId): Observable<any> {
        let getReleasesURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_PROJECT_SUMMARY', [projectId]);
        return this.http.get(getReleasesURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    getUserProjects(userId, skipLoadingBar=false) {
        let getProjectsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_PROJECTS_BY_USER', [userId]);
        return this.http.get(getProjectsURL, {
            headers: getRequestHeader()
        }, skipLoadingBar)
        .map(response => response.json());
    }
    getUserAllocatedProjects(userId, skipLoadingBar=false) {
      let getProjectsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_PROJECTS_ALLOCATED_BY_USER', [userId]);
      return this.http.get(getProjectsURL, {
        headers: getRequestHeader()
      }, skipLoadingBar)
        .map(response => response.json());
    }
    addProject(data) {
        return this.projects.push(this.parseProjectData(data));
    }

    getAllProjects () {
        let getReleasesURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.PROJECT;
        return this.http.get(getReleasesURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    getAllProjectsLite (skipLoadingBar=false) {
        let getReleasesURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.PROJECT_LITE;
        return this.http.get(getReleasesURL, {
          headers: getRequestHeader()
        }, skipLoadingBar)
          .map(response => response.json());
    }

    getAllUIProjects () {
        let getReleasesURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.UI_PROJECTS;
        return this.http.get(getReleasesURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    editProject (data) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.PROJECT;
        return this.http.put(getURL, JSON.stringify(data) , {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

    addNewProject (data) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.PROJECT;
        return this.http.post(getURL, JSON.stringify(data) , {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

    deleteProject (id) {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.PROJECT + '/' + id;
        return this.http.delete(getURL, {
            headers: getRequestHeader()
        })
        .map(response => {
            let result = {};
            result['id'] = id;
            result['status'] = response.status;
            return result;
        });
    }

    getUsersAllocatedToAllProjects () {
        let getURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.PROJECT + API_PATH.USERS_ALLOCATED_TO_PROJECTS;
        return this.http.get(getURL, {
            headers: getRequestHeader({
                headers: getRequestHeader()
            })
        })
        .map(response => response.json());
    }

    private parseProjectData(projectData) {
        return projectData;
    }
}
