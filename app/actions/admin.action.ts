import {Injectable, Inject} from '@angular/core';
import * as types from '../utils/constants/action.types';
import {I18N_MESSAGES} from '../utils/messages/messages.en';
//import {AdminService} from '../services/admin.service';
import {AdminPreferenceService} from '../services/admin_preference.service';
import {HotBackupService} from '../services/hot_backup.service';
import {RolesService} from '../services/roles.service';
import {FieldsService} from '../services/fields.service';
import {EtlServices} from '../services/etl.service';
import {SearchService} from '../services/search.service';
import {LicenseService} from '../services/license.service';
import {DefectsService} from '../services/defects.service';
import {Http} from '@angular/http';

import * as messageTypes from '../utils/constants/messages.types';
import {EventHttpService} from '../services/event-http.service';
import * as Observable from 'rxjs/Observable';
import {PouchDBPrefsServices} from "../services/pouch.db.service";
import {ZpadService} from "../services/zpad.service";

declare var _;

@Injectable()
export class AdminAction {
    _adminService;
    _adminPreferencesService;
    _hotBackupService;
    _rolesService;
    _fieldsService;
    _etlService;
    _searchService;
    _zpadService;
    _licenseService;
    _defectsService;
    _observable;

    constructor(@Inject(Http) private _http: any, @Inject(PouchDBPrefsServices) private pouchDBSercvice: PouchDBPrefsServices) {
        //this._adminService = new AdminService(_http);
        this._adminPreferencesService = new AdminPreferenceService(<any>_http);
        this._hotBackupService = new HotBackupService(<any>_http);
        this._rolesService = new RolesService(<any>_http);
        this._fieldsService = new FieldsService(<any>_http);
        this._etlService = new EtlServices(<any>_http);
        this._searchService = new SearchService(<any>_http);
        this._zpadService = new ZpadService(<any>_http);
        this._licenseService = new LicenseService(<any>_http);
        this._defectsService = new DefectsService(<any>_http);
        this._observable = Observable.Observable;

    }

    getAllGridPrefs(skipLoadingBar = true) {
      return (dispatch) => {
        return this._adminPreferencesService.getAllGridPrefs(skipLoadingBar).subscribe((data) => {

          // dispatch(this._getAllGridPref(gridPrefs));
        }, (error) => {
          let errorMsg;

          if (error.status && error.status !== 404) {
            errorMsg = {
              zeeErrorCode: error.status,
              errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
            };
          } else {
            errorMsg = "Requested API not found";
          }

          dispatch(this.onError(errorMsg));
        });
      };
    }

    patchGridPrefs(data, userId) {
      let gridPrefs = data.filter(item => 'grid' === item.type);

      let gridPrefsClone = _.cloneDeep(gridPrefs);

      let prefKeys = {};

      gridPrefsClone.forEach((gridPref, index) => {
        let key = `${gridPref.userId}-${gridPref.projectId}-${gridPref.prefKey}`;

        if (!prefKeys[key]) {
          prefKeys[key] = index;
        } else {
          gridPrefs.splice(prefKeys[key], 1);
          prefKeys[key] = index;
        }

      });

      this.pouchDBSercvice.patchGridPrefsFromDB(gridPrefs);

      let location = data.filter(item => 'location' === item.type && item.userId === userId);

      if (location.length) {
        this.pouchDBSercvice.setLocationOnClient(location[0]);
        try {
            return JSON.parse(location[0].value);
        } catch(err) {
            console.log('dd', err, location[0]);
        }
      }

      return {};
    }


    getAllPref(skipLoadingBar=false) {
        return (dispatch) => {
            return this._adminPreferencesService.getAllPref(skipLoadingBar).subscribe((data) => {
                dispatch(this._getAllPref(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    getETLTiming() {
        return (dispatch) => {
            return this._etlService.getETLTiming().subscribe((data) => {
                dispatch(this._getETLTiming(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    getHotBackupInfo() {
        return (dispatch) => {
            return this._hotBackupService.getHotBackupInfo().subscribe((data) => {
                dispatch(this._getHotBackupInfo(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    setHotBackupInfo(value, flag) {
      return (dispatch) => {
        return this._hotBackupService.setHotBackupInfo(value, flag).subscribe((data) => {
          dispatch(this._setHotBackupInfo(data));
        }, (error) => {
          let errorMsg = {
            zeeErrorCode: error.status,
            errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
          };
          dispatch(this.onError(errorMsg));
        });
      };
    }

    performHotBackup() {
        return (dispatch) => {
            return this._hotBackupService.performHotBackup().subscribe((data) => {
                dispatch(this._performHotBackup());
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    _performHotBackup() {
        return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, {
                title: 'Hot Backup',
                description: 'Hot Backup will start in 10 seconds'
            })
        };
    }

    getJobHistory() {
        return (dispatch) => {
            return this._hotBackupService.getJobHistory().subscribe((data) => {
                dispatch(this._getJobHistory(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode ||  JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    getJobBackupHistory() {
        return (dispatch) => {
            return this._hotBackupService.getJobBackupHistory().subscribe((data) => {
                dispatch(this._getJobBackupHistory(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    getRolesTypes() {
        return (dispatch) => {
            return this._rolesService.getRolesTypes().subscribe((data) => {
                dispatch(this._getRolesTypes(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    editRole(roleObject) {
        return (dispatch) => {
            return this._rolesService.editRole(roleObject).subscribe((data) => {
                dispatch(this._editRole(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    addRole(roleObject, rolesPermissionArray) {
        return (dispatch) => {
            return this._rolesService.addRole(roleObject).subscribe((data) => {
                dispatch(this._addRole(data));
                if (rolesPermissionArray.length > 0) {
                    dispatch(this.updateRolePermissionById(rolesPermissionArray , data.id, true));
                } else {
                    dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.customization.role.add.success']));
                }
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: JSON.parse(error._body).errorMsg || error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg.errorMsg));
            });
        };
    }

    getCustomFields(entity, gadgetId = null) {
        return (dispatch) => {
            return this._fieldsService.getCustomFields(entity).subscribe((data) => {
              if (gadgetId) {
                data.gadgetId = gadgetId;
              }

              dispatch(this._getFields(data));
            }, (error) => {
                let errorMsg;
                if (404 === error.status) {
                    errorMsg = 'Could not fetch custom fields. Please try again.';
                } else {
                    errorMsg = {
                        zeeErrorCode: error.status,
                        errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                    };
                }
                dispatch(this.onError(errorMsg));
            });
        };
    }

    toggleZephyrAccess(data) {
        return (dispatch) => {
            return this._fieldsService.toggleZephyrAccess(data).subscribe(() => {
                dispatch(this._toggleZephyrAccess(data.pause));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    editField(data, fieldType) {
        return dispatch => {
            return this._fieldsService.editField(data).subscribe(response => {
                dispatch(this._editField(response));
                let field = response.response;
                dispatch(this._editCustomFieldField({field, fieldType}));
                if (data.isMetaDataPickList && response.status === 200) {

                    var keyObject = data.pickListObject;
                    keyObject['isCustomizable'] = true;
                    keyObject['editable'] = true;
                    keyObject['accessLevel'] = 0;

                    this._adminPreferencesService.updatePreferenceByKey(keyObject).subscribe(preference => {
                        dispatch(this._updatePreferenceByKey(preference));
                        dispatch(this._updatePickList({fieldType, preference}));
                        dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.customization.field.edit.success']));
                    }, error => {
                        let errorMsg = {
                            zeeErrorCode: error.status,
                            errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                        };
                        dispatch(this.onError(errorMsg));
                    });
                } else {
                    dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.customization.field.edit.success']));
                }

            }, error => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    addField(data, fieldType) {
        return dispatch => {
            return this._fieldsService.addField(data).subscribe(response => {
                dispatch(this._addField(response));
                dispatch(this._addCustomField({fieldType, customFields: [response.response]}));
                if (data.isMetaDataPickList && response.status === 200) {

                    var keyObject = data.pickListObject;
                        keyObject['name'] = response.response.entityName.toLowerCase() + '.' + response.response.columnName + '.LOV';

                    this._adminPreferencesService.updatePreferenceByKey(keyObject).subscribe(preference => {
                        dispatch(this._updatePreferenceByKey(preference));
                        dispatch(this._updatePickList({fieldType, preference}));
                        dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.customization.field.add.success']));
                    }, error => {
                        let errorMsg = {
                            zeeErrorCode: error.status,
                            errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                        };
                        dispatch(this.onError(errorMsg));
                    });
                } else {
                    dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.customization.field.add.success']));
                }
            }, error => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorMsg || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    validateSearchValue(data) : any {
        return (dispatch) => {
            return this._fieldsService.validateSearchValue(data).subscribe((data) => {
                dispatch(this._validateSearchValue(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

   getAnonymousPrefByKey(data) {
        return dispatch => {
            return this._adminPreferencesService.getAnonymousPrefByKey(data).subscribe(data => {
             dispatch(this._getPreferenceByKey(data));
          }, error => {
            let errorCode = error.json instanceof Function ? error.json() : {};
            errorCode = _.isObject(errorCode) ? (errorCode.code || errorCode.errorCode) : JSON.parse(errorCode).message;
            let errorMsg = {
              zeeErrorCode: error.status,
              errorMsg: errorCode
            };
            dispatch(this.onError(errorMsg));
          });
        };
    }

    updateAdminPreference(data, message = '') {
        let _message = message || I18N_MESSAGES['zephyr.admin.preference.update.success'];
        if (data.constructor === Array ) {
            return (dispatch) => {
                return this._adminPreferencesService.updateMultiPreferenceByKey(data).subscribe((data) => {
                    dispatch(this._updateMultiPreferenceByKey(data));
                    dispatch(this.onSuccess(_message));
                }, (error) => {
                    let errorMsg = {
                        zeeErrorCode: error.status,
                        errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                    };
                    dispatch(this.onError(errorMsg));
                });
            };
        } else {
            return (dispatch) => {
                return this._adminPreferencesService.updatePreferenceByKey(data).subscribe((data) => {
                    dispatch(this._updatePreferenceByKey(data));
                    dispatch(this.onSuccess(_message));
                }, (error) => {
                    let errorMsg = {
                        zeeErrorCode: error.status,
                        errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                    };
                    dispatch(this.onError(errorMsg));
                });
            };
        }
    }

    updateAdminAuthPreference(data, message = '') {
       let _message = message || I18N_MESSAGES['zephyr.admin.preference.update.success'];
        if (data.constructor === Array ) {
            return (dispatch) => {
                return this._adminPreferencesService.updateUserAuthentication(data).subscribe((data) => {
                    dispatch(this._updateMultiPreferenceByKey(data));
                    dispatch(this.onSuccess(_message));
                }, (error) => {
                    let errorMsg = {
                        zeeErrorCode: error.status,
                        errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                    };
                    dispatch(this.onError(errorMsg));
                });
            };
        } else {
            return (dispatch) => {
                return this._adminPreferencesService.updatePreferenceByKey(data).subscribe((data) => {
                    dispatch(this._updatePreferenceByKey(data));
                    dispatch(this.onSuccess(_message));
                }, (error) => {
                    let errorMsg = {
                        zeeErrorCode: error.status,
                        errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                    };
                    dispatch(this.onError(errorMsg));
                });
            };
        }
    }

    updateETLTiming(data) {
        return (dispatch) => {
            return this._etlService.updateETLTiming(data).subscribe((data) => {
                dispatch(this._updateETLTiming(data));
                dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.etl.update.success']));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

  getReindexHealth() {
      return (dispatch) => {
        return this._searchService.getReindexHealth().subscribe((data) => {
          dispatch(this._setReindexHealth(data));
        }, (error) => {
          let errorMsg = {
            zeeErrorCode: error.status,
            errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
          };
          dispatch(this.onError(errorMsg));
        });
      };
  }

    reIndexProject(data, componentId) {
        return (dispatch) => {
            return this._searchService.reindexProject(data).subscribe((data) => {
                dispatch(this._reIndex(data, componentId));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    zpadPush(data, componentId) {
      return (dispatch) => {
        return this._zpadService.zpadPush(data).subscribe((data) => {
          dispatch(this._zpad(data, componentId));
        }, (error) => {
          let errorMsg = {
            zeeErrorCode: error.status,
            errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
          };
          dispatch(this.onError(errorMsg));
        });
      };
    }

  fullReindex(data, componentId) {
        return (dispatch) => {
            return this._searchService.fullReindex(data).subscribe((data) => {
                dispatch(this._reIndex(data, componentId));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }
    getETLHistory(isShowToaster) {
        return (dispatch) => {
            return this._etlService.getETLHistory().subscribe((data) => {
                dispatch(this._getETLHistory(data));
                if (isShowToaster) {
                   dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.etl.history.get.success']));
                }
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }
    updatePagination(currentPage, size) {
        return {type: types.UPDATE_HISTORY_PAGINATION, currentPage, size};
    }
    getRefreshHistory(params) {
        return (dispatch) => {
            return this._etlService.getRefreshHistory(params).subscribe((data) => {
                dispatch(this._getETLHistory(data));
                dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.etl.history.get.success']));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }
    getApps() {
        return (dispatch) => {
            return this._rolesService.getApps().subscribe((data) => {
                dispatch(this._getApps(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: (error.status === 500) ? error.json().code || error.json().errorCode
                        || JSON.parse(error.json()).message : 'Something went wrong'
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    etlSchedule(data) {
       return (dispatch) => {
           return this._etlService.etlSchedule(data).subscribe((data) => {
               if (data) {
                   dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.customization.trend.data.success']));
               } else {
                   dispatch(this.onError(I18N_MESSAGES['zephyr.admin.customization.trend.data.failure']));
               }
           }, (error) => {
               let errorMsg = {
                   zeeErrorCode: error.status,
                   errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
               };
               dispatch(this.onError(errorMsg));
           });
       };
    }

    getRolePermissions(data , isLoggedInUser, skipLoadingBar=false) {
        return (dispatch) => {
            return this._rolesService.getRolePermissionsById(data, skipLoadingBar).subscribe((data) => {
                if (!isLoggedInUser) {
                    dispatch(this._getRolePermissionsById(data));
                } else {
                    dispatch(this._getLoggedInUserPermissions(data));
                }
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    getFieldsMetadata() {
        return (dispatch) => {
            return this._fieldsService.getFieldsMetadata().subscribe((data) => {
                dispatch(this._getFieldsMetadata(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    fetchFieldsForDefectSystem() {
        return (dispatch) => {
            return this._defectsService.getFieldsForDefectSystem().subscribe((data) => {
                data['isDefectForm'] = true;
                dispatch(this._getFieldsDefectSystem(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    getWebhooksUser(){
         return (dispatch) => {
            return this._defectsService.getWebhooksUser().subscribe((data) => {
                if(!_.isEmpty(data)) {
                    // dispatch(this._getFieldsDefectSystem(data));
                } else {
                    data='Webhook is not created.';
                    dispatch(this.onError(data));
                }
            }, (error) => {
                let errorMsg;
               if(error.status==204){
                    error.errorMsg='Webhook is not created.';
                    dispatch(this.onError(error.errorMsg));
                }
            });
        };
    }

    authenticationCheckWithPreferenceUpdate(data, preferences, message) {
        return (dispatch) => {
            return this._adminPreferencesService.authenticatinCheck(data).subscribe((data) => {
                if(data) {
                    dispatch(this.updateAdminAuthPreference(preferences, message));
                } else {
                    dispatch(this.onError({
                        errorMsg: 'Authentication test failed.'
                    }));
                }
                dispatch(this._authenticatinCheck(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    setFieldsForDefectSystem(form) {
        return (dispatch) => {
            return this._defectsService.setFieldsForDefectSystem(form).subscribe((data) => {
                if(data && data['systemType'] == 4) {
                    dispatch(this.getWebhooksUser());
                }
                dispatch(this.onSuccess('Defect Tracking System updated successfully!'));
                dispatch(this._setFieldsDefectSystem(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }

    deleteField(id, fieldType) {
        return dispatch => {
            return this._fieldsService.deleteField(id).subscribe(data => {
                dispatch(this._deleteField(data));
                dispatch(this._deleteCustomField({id, fieldType}));
                dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.customization.field.delete.success']));
            }, error => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }
    addPreferenceByKeyAndItem(dataObject, key) {
       return (dispatch) => {
           return this._adminPreferencesService.addPreferenceByKeyAndItem(dataObject, key).subscribe((data) => {
               dispatch(this._addPreferenceByKeyAndItem(data));
           }, (error) => {
               let errorMsg = {
                   zeeErrorCode: error.status,
                   errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
               };
               dispatch(this.onError(errorMsg));
           });
       };
    }

    addPreferenceByKeyAndItemUpdateGrid(dataObject, key) {
        return (dispatch) => {
            return this._adminPreferencesService.addPreferenceByKeyAndItem(dataObject, key).subscribe((data) => {
                dispatch(this._addExecutionStatus(data));
                dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.customization.status.add.success']));
                dispatch(this.getAllPref(true));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: JSON.parse(error._body).errorMsg || error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg.errorMsg));
            });
        };
    }
    updatePreferenceByKeyAndItemUpdateGrid(dataObject, key, isExecutionStatus) {
        return (dispatch) => {
            return this._adminPreferencesService.updatePreferenceByKeyAndItem(dataObject, key).subscribe((data) => {
                dispatch(this._updateExecutionStatusGrid(data));
                if(isExecutionStatus) {
                    dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.customization.execution.status.edit.success']));
                } else {
                    dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.customization.status.edit.success']));
                }

                dispatch(this.getAllPref(true));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: JSON.parse(error._body).errorMsg || error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg.errorMsg));
            });
        };
    }

    updatePreferenceByKeyAndItem(dataObject, key) {
        return (dispatch) => {
            return this._adminPreferencesService.updatePreferenceByKeyAndItem(dataObject, key).subscribe((data) => {
                dispatch(this._updatePreferenceByKeyAndItem(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    updatePreferenceItemStatus(id , key , status) {
        return (dispatch) => {
            return this._adminPreferencesService.updatePreferenceItemStatus(parseInt(id), key , status).subscribe((data) => {
                dispatch(this._updatePreferenceItemStatus(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    updatePreferenceItemStatusUpdateGrid(id , key , status, isExecutionStatus) {
        return (dispatch) => {
            return this._adminPreferencesService.updatePreferenceItemStatus(parseInt(id), key , status).subscribe((data) => {
                dispatch(this._updateExecutionStatusGrid(data));
                dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.customization.status.edit.success']));
                dispatch(this.getAllPref(true));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    deleteRole(idToBeDeleted, idToWhomToAssign) {
        return (dispatch) => {
            return this._rolesService.moveRole(idToBeDeleted, idToWhomToAssign).subscribe((data) => {
                dispatch(this._deleteRole(data));
                dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.customization.role.delete.success']));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    updateRolePermissionById(data , roleId , isAdd) {
        return (dispatch) => {
            return this._rolesService.updateRolePermissionById(data, roleId).subscribe((data) => {
                dispatch(this._updateRolePermissionById({roleId : roleId , permissions : data}));
                if (isAdd) {
                    dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.customization.role.add.success']));
                } else {
                    dispatch(this.onSuccess(I18N_MESSAGES['zephyr.admin.customization.role.edit.success']));
                }
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    _setReindexHealth(data) {
      return { type: types.INDEXING_HEALTH_STATUS, data };
    }

    _reIndex (data, componentId) {
        return { type: types.JOB_PROGRESS_STATUS_STARTS, data, componentId };
    }

    _zpad (data, componentId) {
      return { type: types.PUSH_ZPAD_CREDENTIALS, data, componentId };
    }

    _updateRolePermissionById(data) {
        return { type: types.UPDATE_ROLE_PERMISSION_BY_ID, data};
    }

    _deleteRole(data) {
        return { type: types.DELETE_ROLE, data };
    }

    _updatePreferenceItemStatus(data) {
        return { type: types.UPDATE_PREFERENCE_ITEM_STATUS, data };
    }

    _addPreferenceByKeyAndItem(data) {
        return { type: types.ADD_PREFERENCE_BY_KEY_ITEM, data };
    }
    _updatePreferenceByKeyAndItem(data) {
        return { type: types.UPDATE_PREFERENCE_BY_KEY_ITEM, data};
    }
    _deleteField(data) {
        return { type: types.DELETE_FIELD, data};
    }
    _deleteCustomField(data) {
        return { type: types.DELETE_CUSTOM_FIELD, data};
    }

    _addField(data) {
        return { type: types.ADD_FIELD, data };
    }
    _addCustomField(data) {
        return { type: types.ADD_CUSTOM_FIELD, data };
    }

    _getFieldsMetadata(data) {
        return { type: types.GET_FIELDS_METADATA, data };
    }

    _getFieldsDefectSystem(data) {
        return { type: types.GET_FIELDS_DEFECTS, data };
    }

    _setFieldsDefectSystem(data) {
        return { type: types.SET_FIELDS_DEFECTS, data };
    }

    _getRolePermissionsById(data) {
        return { type: types.GET_ROLE_PERMISSIONS_BY_ID, data };
    }

    _getApps(data) {
        return { type: types.GET_APPS, data };
    }

    _getETLHistory(data) {
        return { type: types.GET_ETL_HISTORY, data };
    }

    getAppLicense() {
      return (dispatch) => {
        return this._observable.forkJoin(
                this._licenseService.getAppLicense(),
                this._licenseService.getSystemLicense()
        ).subscribe((data) => {
          let licenseType = data[0].licenseType;
          return this._licenseService.getUsersCount(licenseType).subscribe((val) => {
           // console.log(data, val);
            data[1]['usedLicenses'] = val;
            dispatch(this._getAppLicense(data));

            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || JSON.parse(error.json()).message
                };
            });
        }, (error) => {
          let errorMsg = {
            zeeErrorCode: error.status,
            errorMsg: error.json().code || JSON.parse(error.json()).message
          };
          dispatch(this.onError(errorMsg));
        });
      };
    }

    getAppInfo() {
        return (dispatch) => {
            return this._licenseService.getAppInfo().subscribe((data) => {
                dispatch(this._getAppInfo(data));
            }, (error) => {
                let errorMsg = {
                    zeeErrorCode: error.status,
                    errorMsg: error.json().code || JSON.parse(error.json()).message
                };
                dispatch(this.onError(errorMsg));
            });
        };
    }

    setAppInfo(value) {
        return (dispatch) => {
            return this._licenseService.setAppInfo(value).subscribe((data) => {
              dispatch(this._setAppInfo(data));
            }, (error) => {
              let errorMsg = {
                zeeErrorCode: error.status,
                errorMsg: error.json().code || JSON.parse(error.json()).message
              };
              dispatch(this.onError(errorMsg));
            });
        };
    }

    getPrefByKey(data, skipLoadingBar) {
        return (dispatch) => {
            return this._adminPreferencesService.getPreferenceByKey(data, skipLoadingBar).subscribe((data) => {
             dispatch(this._getPreferenceByKey(data));
          }, (error) => {
            let errorMsg = {
              zeeErrorCode: error.status,
              errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
            };
            dispatch(this.onError(errorMsg));
          });
        };
    }

    getExecutionStausUpdateGrid(key,skipLoadingBar = true) {
        return (dispatch) => {
            return this._adminPreferencesService.getPreferenceByKey(key , skipLoadingBar).subscribe((data) => {
             dispatch(this._updateExecutionStatusGrid(data));
          }, (error) => {
            let errorMsg = {
              zeeErrorCode: error.status,
              errorMsg: error.json().code || error.json().errorCode || JSON.parse(error.json()).message
            };
            dispatch(this.onError(errorMsg));
          });
        };
    }

    authenticationCheck(data) {
        return (dispatch) => {
            return this._adminPreferencesService.authenticatinCheck(data).subscribe((data) => {
                if(data) {
                    dispatch(this.onSuccess('Authentication test was successful.'));
                } else {
                    dispatch(this.onError({
                        errorMsg: 'Authentication test failed.'
                    }));
                }
                dispatch(this._authenticatinCheck(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _addExecutionStatus(data) {
        return {type: types.ADD_EXECUTION_STATUS , data};
    }
    _updateExecutionStatusGrid(data) {
        return {type: types.FETCH_EXECUTION_STATUS_GRID , data};
    }

    reloginDefectUser(username) {
        return (dispatch) => {
            return this._defectsService.reloginDefectUser(username).subscribe((data) => {
                dispatch(this._reloginDefectUser(data));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _reloginDefectUser(data) {
        return {
            type: types.SHOW_TOAST,
            data: (<any>Object).assign({type: messageTypes.SUCCESS}, {
                title: 'Information',
                description: 'Defect user relogin successful'
            })
        };
    }
  saveConnectionInfo(form,username,password) {
    return (dispatch) => {
      return this._defectsService.saveConnectionInfo(form,username,password).subscribe((data) => {
        dispatch(this.setFieldsForDefectSystem(form));
      }, (error) => {
        dispatch(this.onError(error));
      });
    };
  }
  _saveConnectionInfo(data) {
    return {
      type: types.SHOW_TOAST,
      data: (<any>Object).assign({type: messageTypes.SUCCESS}, {
        title: 'Information',
        description: 'Defect user connection info saved successfully'
      })
    };
  }

   checkRoleAssignemnt(roleId) {
     return (dispatch) => {
       return this._rolesService.checkRoleAssignemnt(roleId).subscribe((data) => {
         dispatch(this._checkRoleAssignemnt(data));
       }, (error) => {
         dispatch(this.onError({
           errorMsg: 'Cannot fetch '
         }));
       });
     };
   }
   editRoleComplete(dataObject , permissionsArray) {
       return (dispatch) => {
           return this._rolesService.editRole(dataObject).subscribe((data) => {
               dispatch(this._editRole(data));
               dispatch(this.updateRolePermissionById(permissionsArray , dataObject.id, false));
           }, (error) => {
               let errorMsg = {
                   zeeErrorCode: error.status,
                   errorMsg: JSON.parse(error._body).errorMsg || error.json().code || error.json().errorCode || JSON.parse(error.json()).message
               };
               dispatch(this.onError(errorMsg.errorMsg));
           });
       };
   }
   _checkRoleAssignemnt(data) {
       return { type: types.CHECK_ROLE_ASSIGNMENT, data };
   }
    _authenticatinCheck (data) {
        return { type: types.AUTHENTICATION_CHECK, data };
    }

    _validateSearchValue(data) {
        return { type: types.VALIDATE_SEARCH_FIELD, data };
    }

    _getAppInfo(data) {
        return { type: types.GET_APP_INFO, data };
    }

    _setAppInfo(data) {
      return { type: types.SET_APP_INFO, data };
    }

    _updateMultiPreferenceByKey(data) {
        return { type: types.UPDATE_MULTI_PREFERENCE_BY_KEY, data };
    }
    _getPreferenceByKey(data) {
        return { type: types.GET_PREFERENCE_BY_KEY, data };
    }

    _updateETLTiming(data) {
        return { type: types.UPDATE_ETL_TIMING, data };
    }
    _getETLTiming(data) {
        return { type: types.GET_ETL_TIMING, data };
    }
    _updatePreferenceByKey(data) {
        return { type: types.UPDATE_PREFERENCE_BY_KEY, data };
    }
    _updatePickList(data) {
        return { type: types.FETCH_CUSTOM_FIELD_PICKLIST_PREFERENCE, data };
    }
    _editField(data) {
        return { type: types.EDIT_FIELD, data };
    }
    _editCustomFieldField(data) {
        return { type: types.EDIT_CUSTOM_FIELD, data };
    }

    _getJobHistory(data) {
        return { type: types.SET_JOB_HISTORY, data };
    }

    _getJobBackupHistory(data) {
        return {type: types.SET_JOB_BACKUP_HISTORY, data};
    }

    _getHotBackupInfo(data) {
        return { type: types.GET_HOT_BACKUP_DATA, data };
    }

    _setHotBackupInfo(data) {
      return { type: types.SET_HOT_BACKUP_DATA, data };
    }

    _getAllPref(data) {
        return { type: types.SET_ADMIN_PREF, data };
    }

    _getAllGridPref(data) {
      return { type: types.SET_GRID_PREF, data };
    }

    _getRolesTypes(data) {
        return { type: types.FETCH_ALL_ROLES_TYPES, data };
    }

    _editRole(data) {
        return { type: types.EDIT_ROLE, data };
    }

    _addRole(data) {
        return { type: types.ADD_ROLE, data };
    }

    _getFields(data) {
        return { type: types.FETCH_ALL_FIELDS, data };
    }

    _toggleZephyrAccess(data) {
        return { type: types.TOGGLE_ZEPHYR_ACCESS, data };
    }

    _getAppLicense(data) {
      return { type: types.GET_LICENSE_DATA, data };
    }

    _getLoggedInUserPermissions (data) {
        return { type: types.LOGGEDIN_USER_PERMISSIONS, data };
    }

    onSuccess(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.SUCCESS, data})
        };
    }

    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.ERROR, data})
        };
    }

    clearRolesEvents() {
        return { type: types.CLEAR_ROLES_EVENTS, data: ''};
    }

    clearExecutionStatusEvents() {
        return { type: types.CLEAR_EXECUTION_STATUS_EVENTS, data: ''};
    }
    clearFieldsEvents() {
        return { type: types.CLEAR_FIELDS_EVENT, data: ''};
    }
    clearDefectLicenseEvents() {
        return {type: types.CLEAR_DEFECTS_LICENSE, data: ''};
    }
    clearAdminEvents() {
        return { type: types.CLEAR_ADMIN_EVENT, data: ''};
    }
}
