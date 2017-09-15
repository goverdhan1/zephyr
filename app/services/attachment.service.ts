import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

import {getRequestHeader} from '../utils/api/api.utils';
// Constants
import {API_PATH} from '../utils/constants/api.constants';

declare var jQuery: any;

@Injectable()
export class AttachmentService {
    constructor(public http: any) {
        //console.log('Attachement service');
    }
    getAttachmentsByCriteria(params) {
        let _attachmentByCriteriaURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + API_PATH.GET_ATTACHMENTS_BY_CRITERIA + '?' + this._getCriteriaParams(params);
        return this.http.get(_attachmentByCriteriaURL, {
            headers: getRequestHeader()
        }, true)
        .map(response => {
           let result = {};
           result['data'] = response.json();
           result['params'] = params;
           result['status'] = response.status;
           return result;
       });
    }
    getAttachmentCount() {
        // TODO
    }
    updateAttachment() {
        // TODO
    }
    createAttachment() {
        // TODO
    }
    deleteAttachment(id , attachmentMapId) {
       let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + API_PATH.DELETE_ATTACHMENT + id;
        return this.http.delete(url, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => {
            let result = {};
            result['id'] = id;
            result['attachmentMapId'] = attachmentMapId;
            result['status'] = response.status;
            return result;
        });
    }

    setAttchmentPathParticualarItem (formData , attachmentMapId) {
        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.SET_ATTACHMENT_PATH_PARTICULAR_ID;
        return this.http.post(url, JSON.stringify(formData) , {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => {
           let result = {};
           result['data'] = response.json();
           result['attachmentMapId'] = attachmentMapId;
           result['status'] = response.status;
           return result;
       });
    }

    saveAttachedSSOcertificate (formData , attachmentMapId) {
        let url = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.SET_SSO_ATTACHMENT_PATH;
          url= url+formData.tempPath;
        return this.http.post(url, JSON.stringify(formData) , {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => {
           let result = {};
           result['data'] = response.json();
           result['attachmentMapId'] = attachmentMapId;
           result['status'] = response.status;
           return result;
       });
    }

    uploadAttachment (formData) {
        let accessType = 'HTMLUI';

        if('dev' === process.env) {
          accessType = 'API';
        }

        let uploadFileURL = API_PATH.BASE_UPLOAD_ENDPOINT + API_PATH.UPLOAD_IMAGE;
        return jQuery.ajax({
            url: uploadFileURL,
            type: 'POST',
            dataType: 'json',
            data: formData,
            processData: false,  // do not process the data
            contentType: false,   // do not set contentType
            headers: {
              accessType: accessType
            }
        });
    }

    uploadAttachmentForDefect(formData) {
        let accessType = 'HTMLUI';
        let uploadAttachmentForDefectUrl = API_PATH.BASE_UPLOAD_ENDPOINT + API_PATH.UP_LOAD_ATTACHMENT_TO_DEFECT;

        if('dev' === process.env) {
          accessType = 'API';
        }

        return jQuery.ajax({
            url: uploadAttachmentForDefectUrl,
            type: 'POST',
            data: formData,
            processData: false,  // do not process the data
            contentType: false,   // do not set contentType
            headers: {
              accessType: accessType
            }
        });
    }

    private _getCriteriaParams(params) {
        return `itemid=${params.itemid}&type=${params.type}`;
    }
}
