import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

// Constants
import {API_PATH} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
import {EventHttpService} from './event-http.service';

declare var jQuery: any;

@Injectable()
export class UserService {
    constructor(public http: EventHttpService) {
        // console.log('User service');
    }
    getUserById(id) {
        let _userByIdURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_USER_BY_ID + id;
        return this.http.get(_userByIdURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    getUsers(skipLoadingBar=false) {
        let _allUsersURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ALL_USERS;
        return this.http.get(_allUsersURL, {
            headers: getRequestHeader()
        }, skipLoadingBar)
        .map(response => response.json());
    }

    getAllLoggedInUsers(skipLoadingBar=false) {
        let _allUsersURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ALL_LOGGED_IN_USERS;
        return this.http.get(_allUsersURL, {
            headers: getRequestHeader()
        }, skipLoadingBar)
        .map(response => response.json());
    }

    getAllResources() {
        let _allUsersURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ALL_RESOURCES;
        return this.http.get(_allUsersURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }

    logOutUser(data) {
        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.LOG_OUT_USER + data.id;
        let id = data.id;
        return this.http.delete(url, {
            headers: getRequestHeader()
        })
        .map(response => {
            let result = {};
            result['id'] = id;
            result['status'] = response.status;
            return result;
        });
    }
    projectsAssignedToUserById (id) {
        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.PROJECTS_ASSIGNED_TO_USER_BY_ID + id;
        return this.http.get(url, {
            headers: getRequestHeader()
        })
        .map(response => {
            let result = {};
            result['id'] = id;
            result['response'] = response.json();
            result['status'] = response.status;
            return result;
        });
    }
    editUser(data) {
        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.EDIT_USER + data.id;
        return this.http.put(url, JSON.stringify(data) , {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

    allcateProjectsToUser (data) {
        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ALLOCATE_PROJECTS_TO_USER + data.id + '/allocate?';
        data.projectId.forEach (function (object , index) {
            if (index == 0) {
                url+='projectids=' + object;
            } else {
                url+='&projectids=' + object;
            }
        });
        return this.http.post(url, null , {
            headers: getRequestHeader()
        })
        .map(response => {
            let result = {};
            result['id'] = data.id;
            result['projectArray'] = data.projectId;
            result['status'] = response.status;
            return result;
        });
    }

    addUser(data) {
        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ADD_USER;
        return this.http.post(url, JSON.stringify(data) , {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

    editUserPic (formData) {
        let uploadFileURL = API_PATH.BASE_UPLOAD_ENDPOINT + API_PATH.UPLOAD_IMAGE;
        let accessType = 'HTMLUI';

        if('dev' === process.env) {
          accessType = 'API';
        }

        return jQuery.ajax({
            url: uploadFileURL,
            type: 'POST',
            dataType: 'json', //TODO: To be checked further
            data: formData,
            processData: false,  // do not process the data
            contentType: false,   // do not set contentType
            headers: {
              accessType: accessType
            }
        });
    }
}
