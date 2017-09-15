import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {Http} from '@angular/http';

import {GlobalService} from '../services/global.service';
import {ToastrService} from '../services/toastr.service';
import {AttachmentService} from '../services/attachment.service';
import {CustomFieldService} from '../services/customfield.service';
import {AdminPreferenceService} from '../services/admin_preference.service';
import {FieldsService} from '../services/fields.service';

import * as types from '../utils/constants/action.types';
import * as messageTypes from '../utils/constants/messages.types';

@Injectable()
export class GlobalAction {
    _globalService;
    _attachmentService;
    _toastrService;
    _customfieldService: CustomFieldService;
    _adminPreferenceService: AdminPreferenceService;
    _fieldsService: FieldsService;
    _observable;
    constructor(@Inject(Http) private _http: any) {
        this._observable = Observable;
        this._globalService = new GlobalService(_http);
        this._attachmentService = new AttachmentService(_http);
        this._toastrService = new ToastrService();
        this._customfieldService = new CustomFieldService(_http);
        this._adminPreferenceService = new AdminPreferenceService(_http);
        this._fieldsService = new FieldsService(<any>_http);
    }

    //TODO:This action to be removed from grid.action.ts and to be replaced in implemented components
    clearGlobalEvents() {
        return {type: types.CLEAR_EVENT};
     }

     clearDefectsAdminEvents() {
         return {type: types.CLEAR_DEFECTS_ADMIN_EVENT};
     }

    isMobile() {
        let _data = {'data': this._globalService.isMobile()};
        return { type: types.IS_MOBILE, _data};
    }
    browser() {
        let _data = {'data': this._globalService.browser()};
        return { type: types.BROWSER, _data};
    }
    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.ERROR, data})
        };
    }
    //TODO : to be crosschecked and make in sync with regular error-msg-flow
    onErrorAttachment(data) {
        return {
            type: types.SHOW_TOAST_ERROR_ATTACHMENT,
            data: ({type: messageTypes.ERROR, data})
        };
    }
    uploadAttachment(formData, id, fileSize, currentLoggedInUserId) {
       return (dispatch) => {
            return this._attachmentService.uploadAttachment(formData).success(data => {
                let attachmentPathData_second = [],
                 currentDate = new Date (),
                 currentDateMs = currentDate.getTime();

                data.forEach((object, index)=>{
                  attachmentPathData_second.push( {
                    name: data[index]['fileName'],
                    contentType: data[index]['contentType'],
                    itemType: data[index]['fieldName'],
                    tempPath: data[index]['file'],
                    itemId: id,
                    createdBy: currentLoggedInUserId,
                    fileSize: fileSize[index]['fileSize'],
                    timeStamp: currentDateMs
                  });
                });

                dispatch(this.setAttchmentPathParticualarItem(attachmentPathData_second,id));
            }).fail((error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.statusText
                };
              if(error.status === 200){
                return;
              }
                dispatch(this.onErrorAttachment(errorMsg));
            });
        };
    }
  uploadSSOCertificate(formData, id, fileSize, currentLoggedInUserId) {
        return (dispatch) => {
          return this._attachmentService.uploadAttachment(formData).success((data) => {
            //let modifiedData = {};
            //modifiedData['data'] = data;
            //modifiedData['id'] = id;
            //dispatch(this._uploadSSOAttachment(data));
            let attachmentPathData_second = {};
            let attachmentPathData_first = data[0];
            attachmentPathData_second['name'] = attachmentPathData_first['fileName'];
            attachmentPathData_second['contentType'] = attachmentPathData_first['contentType'];
            attachmentPathData_second['itemType'] = attachmentPathData_first['fieldName'];
            attachmentPathData_second['tempPath'] = attachmentPathData_first['file'];
            attachmentPathData_second['itemId'] = id;
            attachmentPathData_second['createdBy'] = currentLoggedInUserId;
            attachmentPathData_second['fileSize'] = fileSize;
            let currentDate = new Date (),
              currentDateMs = currentDate.getTime();
            attachmentPathData_second['timeStamp'] = currentDateMs;
            dispatch(this._uploadSSOAttachment(attachmentPathData_second));
          }).fail((error) => {

            let errorMsg = {
              zeeErrorCode: error.status,
              errorMsg: error.statusText
            };
            //check for blank call success IE
            if(error.status === 200){
              return;
            }
            dispatch(this.onErrorAttachment(errorMsg));
          });
        };
      }

    _uploadAttachment (data) {
        return { type: types.UPLOAD_ATTACHMENT , data};
    }

    _uploadSSOAttachment (data) {
        return { type: types.UPLOAD_SSO_ATTACHMENT , data};
    }

    clearSSOAttachment (data) {
        return { type: types.CLEAR_SSO_EVENT , data};
    }

    setAttchmentPathParticualarItem (formData , attachmentMapId) {
        return (dispatch) => {
            return this._attachmentService.setAttchmentPathParticualarItem(formData , attachmentMapId).subscribe((data) => {
                dispatch(this._setAttchmentPathParticualarId(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    saveSSOcertificate (formData , attachmentMapId) {
        return (dispatch) => {
          if(!formData.tempPath){
            return;
          }
            return this._attachmentService.saveAttachedSSOcertificate(formData , attachmentMapId).subscribe((data) => {
                dispatch(this._setSSOAttchmentPath(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    _setAttchmentPathParticualarId (data) {
        return { type: types.SET_ATTACHMENT_PATH_PARTICUALR_ITEM, data };
    }

    _setSSOAttchmentPath (data) {
      return { type: types.SET_SSO_ATTACHMENT_PATH, data };
    }

    fetchAttachments (data) {
        return (dispatch) => {
            return this._attachmentService.getAttachmentsByCriteria(data).subscribe((data) => {
                dispatch(this._fetchAttachments(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    _fetchAttachments (data) {
        return { type: types.FETCH_ATTACHMENTS, data };
    }

    deleteAttachment (id , attachmentMapId) {
       return (dispatch) => {
            return this._attachmentService.deleteAttachment(id , attachmentMapId).subscribe((data) => {
                dispatch(this._deleteAttachment(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    _deleteAttachment (data) {
        return { type: types.DELETE_ATTACHMENT, data };
    }

    showMandatoryFieldError(fields) {
        let error = '';
        fields.forEach(item => {
            error += item.displayName ? `<span> Custom field ${item.displayName} is required.</span><br/>` : '';
        });
        this._toastrService.error(error);
    }

    updateCustomFieldProject(id) {
        return {type: types.UPDATE_CUSTOM_FIELD_PROJECT, id};
    }
    fetchCustomFields() {
        return dispatch => {
            return this._observable.forkJoin(
                this._fieldsService.getCustomFields('Requirement'),
                this._fieldsService.getCustomFields('Testcase'),
                this._customfieldService.getCustomFieldTypes()
            ).subscribe(response => {
                let requirement = response[0];
                let testcase = response[1];
                let commonCustomFields = {requirement, testcase};
                let customTypes = response[2];

                dispatch(this._onFetchCustomFieldTypes(customTypes));

                dispatch(this._onFetchCustomFieldAndTypes({customTypes, commonCustomFields}));

                Object.keys(commonCustomFields).forEach(fieldType => {
                    let customFields = commonCustomFields[fieldType];
                    dispatch(this._onFetchCustomFields({customFields, fieldType}));
                    dispatch(this.fetchPicklistCustomFieldValues(customFields, customTypes, fieldType));
                });
            }, error => {
                dispatch(this.onError(error));
                let commonCustomFields = {
                    requirement: [],
                    testcase: []
                };
                Object.keys(commonCustomFields).forEach(fieldType => {
                    let customFields = commonCustomFields[fieldType];
                    dispatch(this._onFetchCustomFields({customFields, fieldType}));
                });
            });
        };
    }

    fetchPicklistCustomFieldValues(customFields, customTypes, fieldType) {
        return (dispatch: any) => {
            let _picklistType = customTypes.filter(type => 'Picklist' === type.dataType)[0];
            if(_picklistType) {
                customFields.filter(customfield => customfield.fieldTypeMetadata === _picklistType.id).forEach(field => {
                    let _preference = `${fieldType}.${field.fieldName}.LOV`;
                    dispatch(this.fetchPickListPreferences(_preference, fieldType));
                });
            }
        };
    }
    fetchPickListPreferences(preference, fieldType) {
        return (dispatch: any) => {
            return this._adminPreferenceService.getPreferenceByKey(preference, false).subscribe(preference => {
                dispatch(this._onFetchPickListPreference({preference, fieldType}));
            }, error => {
                dispatch(this.onError(error));
            });
        };
    }
    _onFetchPickListPreference(data: any) {
        return { type: types.FETCH_CUSTOM_FIELD_PICKLIST_PREFERENCE, data };
    }
    _onFetchCustomFieldTypes(data: any) {
        return { type: types.FETCH_CUSTOM_FIELD_TYPES, data };
    }
    _onFetchCustomFields(data: any) {
        return { type: types.FETCH_CUSTOM_FIELDS, data };
    }
    _onFetchCustomFieldAndTypes(data: any) {
        return { type: types.FETCH_CUSTOM_FIELD_AND_TYPES, data };
    }

    jobProgressStatus(data) {
        return (dispatch) => {
            return this._globalService.jobPregress(data).subscribe((data) => {
                dispatch(this._jobPregresseStatus(data));
            }, (error) => {
                dispatch(this._jobPregresseStatusError(data));
                dispatch(this.onError(error));
            });
        };
    }
    _jobPregresseStatusError(data) {
        return { type: types.JOB_PROGRESS_STATUS_ERROR, data };
    }

    _jobPregresseStatus (data) {
        return { type: types.JOB_PROGRESS_STATUS_INBETWEEN, data };
    }

    showToaster (data) {
        return {
                type: types.SHOW_TOAST,
                data: ({type: messageTypes.SUCCESS, data})
            };
    }

    fetchDefectSystemDetails () {
        return (dispatch) => {
          return this._globalService.fetchDefectSystemDetails().subscribe((data) => {
              dispatch(this._fetchDefectSystemDetails(data));
          }, (error) => {
              dispatch(this.onError(error));
          });
        };
    }

    _fetchDefectSystemDetails (data) {
        return { type: types.FETCH_DEFECT_SYSTEM, data };
    }
    setDirtyCheck(data) {
        return {type: types.SET_DIRTY_CHECK_FOR_TEST_STEPS, data};
    }
    clearDirtyCheck() {
        return {type: types.CLEAR_DIRTY_CHECK_FOR_TEST_STEPS};
    }

    serverPaused() {
        return (dispatch) => {
            return this._globalService.serverPaused().subscribe((data) => {
                dispatch(this._serverPaused(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    _serverPaused(data) {
        return {type: types.SERVER_PAUSED, data};
    }
    clearCustomFieldEvent() {
        return { type: types.CLEAR_CUSTOM_FIELD_EVENT };
    }
}
