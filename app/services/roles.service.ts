import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

// Constants
import {API_PATH} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';
import {EventHttpService} from './event-http.service';
@Injectable()
export class RolesService {
    constructor(public http: EventHttpService) {
        // console.log('Roles service');
    }
    getRolesTypes(key , skipLoadingBar=true) {
        let getRoleTypesURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ALL_ROLES_TYPES;
        return this.http.get(getRoleTypesURL, {
            headers: getRequestHeader()
        }, skipLoadingBar)
        .map(response => response.json());
    }

    editRole(roleObject) {
        let editRoleURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.EDIT_ROLE;
        return this.http.put(editRoleURL,JSON.stringify(roleObject),  {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

    addRole(roleObject) {
        let addRoleURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ADD_ROLE;
        return this.http.post(addRoleURL,JSON.stringify(roleObject),  {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

    getApps(skipLoadingBar=true) {
        let getAppsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_APPS;
        return this.http.get(getAppsURL, {
            headers: getRequestHeader()
        }, skipLoadingBar)
        .map(response => response.json());
    }

    getRolePermissionsById(data, skipLoadingBar=false) {
        let getRolePermissions = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ROLE_PERMISSIONS_BY_ID + data;
        return this.http.get(getRolePermissions, {
            headers: getRequestHeader()
        }, skipLoadingBar)
        .map(response => response.json());
    }

    moveRole(idToBeDeleted, idToWhomToAssign) {
        let getDeleteRoleURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
        + API_PATH.DELETE_ROLE + parseInt(idToBeDeleted) + '/' + parseInt(idToWhomToAssign);
        return this.http.delete(getDeleteRoleURL, {
            headers: getRequestHeader()
        })
        .map(response => {
            let result = {};
            result['id'] = idToBeDeleted;
            result['status'] = response.status;
            return result;
        });
    }

    updateRolePermissionById(data , roleId) {
        let updateRolePermissionByIdURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ROLE_PERMISSIONS_BY_ID + roleId;
        return this.http.put(updateRolePermissionByIdURL, JSON.stringify(data), {
            headers: getRequestHeader({
                'contentType': '*/*'
            })
        })
        .map(response => response.json());
    }

    checkRoleAssignemnt(roleId) {
       let getULR = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ROLE + '/' + roleId + API_PATH.CHECK_ROLE_ASSIGNMENT;
        return this.http.get(getULR, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
}
