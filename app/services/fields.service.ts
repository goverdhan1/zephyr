import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {getRequestHeader} from '../utils/api/api.utils';
import {EventHttpService} from './event-http.service';
// Constants
import {API_PATH} from '../utils/constants/api.constants';

@Injectable()
export class FieldsService {
    constructor(public http: EventHttpService) {
        // console.log('Fields service');
    }

    getCustomFields(entity, skipLoadingBar = true) {
        let getFieldsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_ALL_CUSTOMFIELDS_BY_ENTITY + `${entity}?includsystemfield=false`;

        return this.http.get(getFieldsURL, {
            headers: getRequestHeader()
        }, skipLoadingBar).map(response => response.json());
    }

    toggleZephyrAccess(data) {
        let getLockAccessURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.TOGGLE_ZEPHYR_ACCESS + `?pause=${data.pause}&userid=${data.userId}`;

        return this.http.get(getLockAccessURL, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }


    editField(fieldObject) {
       let getEditFieldURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.EDIT_FIELD;

       return this.http.put(getEditFieldURL, JSON.stringify(fieldObject), {
           headers: getRequestHeader({
                'includeAcceptType': true
            })
       }).map(response => ({response: response.json(), status: response.status}));
    }

    addField(fieldObject) {
       let getAddFieldURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.ADD_FIELD;

       return this.http.post(getAddFieldURL, JSON.stringify(fieldObject), {
           headers: getRequestHeader({
                'includeAcceptType': true
            })
       }).map(response => ({response: response.json(), status: response.status}));
      }

    validateSearchValue(data) {
        let validateSearchValueURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.VALIDATE_SEARCH_VALUE;
        let getParamsToBeAdded = `entityname=${data['entityName']}&searchfieldname=${data['searchFieldName']}`;

        getParamsToBeAdded = `?${getParamsToBeAdded}`;
        getParamsToBeAdded += data['id'] ? `&id=${data['id']}`: '';

        validateSearchValueURL += getParamsToBeAdded;

        return this.http.get(validateSearchValueURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }

    getFieldsMetadata(skipLoadingBar = true) {
       let fieldsMetadataURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_FIELDS_METADATA;

       return this.http.get(fieldsMetadataURL, {
           headers: getRequestHeader()
       }, skipLoadingBar).map(response => response.json());
    }

    deleteField(id) {
      let fieldsDeleteURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.DELETE_FIELD + id;
      return this.http.delete(fieldsDeleteURL, {
          headers: getRequestHeader({
                'includeAcceptType': true
            })
      }).map(response => ({id: id, status: response.status}));
    }

}
