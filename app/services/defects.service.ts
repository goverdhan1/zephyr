///<reference path="../../node_modules/rxjs/add/operator/map.d.ts"/>
import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {getRequestHeader} from '../utils/api/api.utils';
// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';

declare var _;

@Injectable()
export class DefectsService {
    constructor(public http: any) {
        //console.log('DefectsService');
    }
    getWebhooksUser() {
      let getFieldsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_WEBHOOK_USER_STATUS;
        return this.http.get(getFieldsURL, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map((response) => {
          return response['status']!=204 ? response.json() : {};
        });
    }

    getFieldsForDefectSystem(id) {
      let getFieldsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_FIELDS_DEFECT_SYSTEM;
        return this.http.get(getFieldsURL, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    setFieldsForDefectSystem(formObj) {
      let setFieldsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_FIELDS_DEFECT_SYSTEM;
      return this.http.put(setFieldsURL, JSON.stringify(formObj), {
        headers: getRequestHeader({
            'includeAcceptType': true
        })
      })
        .map(response => response.json());
    }
    getOpenDefectSummary(releaseId, selectBy, expando) {
        let getOpenDefectSummaryURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_OPEN_DEFECT_SUMMARY', [releaseId, expando, selectBy]);

        return this.http.get(getOpenDefectSummaryURL, {
          headers: getRequestHeader({
            'includeAcceptType': true
          })
        })
          .map(response => response.json());
    }
    getDefectSummaries(releaseId) {
        let getDefectSummaryURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_DEFECT_SUMMARY', [releaseId]);

        return this.http.get(getDefectSummaryURL, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    getDefectDetails(params) {
        let offset = params.offset || 0;
        let pageSize = params.pageSize || 10;
        let getDefectDetailsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_DEFECT_DETAILS', [offset, pageSize]);

        return this.http.put(getDefectDetailsURL, {searchString: ''}, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    exportDefectsbyIds(defectIds) {
        let exportDefectsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.EXPORT_DEFECTS_BY_IDS;

        defectIds.forEach((defectId, i) => {
            if(i === 0) {
                exportDefectsURL += 'bugId=' + defectId;
            } else {
                exportDefectsURL += '&bugId=' + defectId;
            }
        });

        return this.http.get(exportDefectsURL, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    getFilters() {
        let getDefectsSearchFiltersURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_DEFECTS_SEARCH_FILTERS;

        return this.http.get(getDefectsSearchFiltersURL, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    getDefectById(defectId, maptc) {
        maptc = maptc ? true : false;
        let getDefectByIdURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
            getApiPath('GET_DEFECT_BY_ID', [defectId, maptc]);
        return this.http.get(getDefectByIdURL, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    getDefectsByJQL(params, type) {
        let offset = params.offset || 0;
        let pageSize = params.pageSize || 10;
        let jqlQuery = params.jqlQuery;
        let maptc = params.maptc ? true : false;
        let getDefectsByJQLURL;

        if(type === 'requirement') {
            getDefectsByJQLURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
                getApiPath('GET_REQ_DEFECTS_BY_JQL', [offset, pageSize]);
            return this.http.post(getDefectsByJQLURL, {searchString: jqlQuery}, {
                headers: getRequestHeader({
                    'includeAcceptType': true
                })
            }).map(response => response.json());
        }

        getDefectsByJQLURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
            getApiPath('GET_DEFECTS_BY_JQL', [offset, pageSize, maptc]);
        return this.http.put(getDefectsByJQLURL, {searchString: jqlQuery}, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }

    getDefectsByFilters(params, type) {
        let offset = params.offset || 0;
        let pageSize = params.pageSize || 10;
        let filterId = params.filterId;
        let maptc = params.maptc ? true : false;
        let getDefectsByFilterURL;
        if(type === 'requirement') {
            getDefectsByFilterURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_REQ_DEFECTS_BY_FILTER', [offset, pageSize]);
            return this.http.post(getDefectsByFilterURL, {searchString: filterId}, {
                headers: getRequestHeader({
                    'includeAcceptType': true
                })
            }).map(response => response.json());

        }
        getDefectsByFilterURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_DEFECTS_BY_FILTER', [offset, pageSize, maptc]);
        return this.http.put(getDefectsByFilterURL, {searchString: filterId}, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }

    getCurrentlyLinkedDefects(executionId) {
        let getCurrentlyLinkedDefectsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
            getApiPath('GET_CURRENTLY_LINKED_DEFECTS', [executionId]);

        return this.http.get(getCurrentlyLinkedDefectsURL, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map((response) => {
            return response['_body'] ? response.json() : {};
        });
    }
    searchDefects(searchObj) {
        let query = searchObj.jqlQuery;
        let searchDefectsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('SEARCH_DEFECTS', [query]);

        return this.http.get(searchDefectsURL, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

    getIssueMetadata(params) {
      let encodedProjectName = encodeURIComponent(params.project);
        let getIssueMetadataURL = API_PATH.BASE_ENDPOINT +
          API_PATH.API_VERSION_V3 + getApiPath('ISSUE_METADATA', [encodedProjectName, params.issueType]);

        return this.http.get(getIssueMetadataURL, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    createDefect(params) {
        let createDefectURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('CREATE_DEFECT', null);

        return this.http.post(createDefectURL, JSON.stringify(params), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    updateDefect(params, defectId, changes) {

        let changesUrl = this.getRepeatedQueryParams('changed', changes);
        let updateDefectURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3  + API_PATH.UPDATE_DEFECT + '/' + defectId + changesUrl;

        return this.http.put(updateDefectURL, JSON.stringify(params), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    getJIRAProjects(options) {
        let getJIRAProjectsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_JIRA_PROJECTS', [options.useAdmin]);

        return this.http.get(getJIRAProjectsURL, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    getIssueTypes(projectId) {
      let encodedProjectId = encodeURIComponent(projectId);

        let getIssueTypesURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('GET_ISSUE_TYPES', [encodedProjectId]);

        return this.http.get(getIssueTypesURL, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    mapDefectSchedule(params) {
        let mapDefectScheduleURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('MAP_DEFECT_SCHEDULE', null);

        return this.http.post(mapDefectScheduleURL, JSON.stringify(params), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    deleteMappedSchedule(scheduleId, testcaseId, selectedBugObjs) {
        let deleteMappedScheduleURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
             getApiPath('DELETE_MAPPED_SCHEDULE', [scheduleId, testcaseId]);
        return this.http.delete(deleteMappedScheduleURL, {
            headers: getRequestHeader({
                'includeAcceptType': true
            }),
            body: JSON.stringify(selectedBugObjs)
        })
        .map(response => response.json());
    }
    updateUser(userObj, userCreationType) {
        let updateUserURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + getApiPath('UPDATE_DEFECT_USER', null);

        if(userCreationType === 'CREATE') {
            return this.http.post(updateUserURL, JSON.stringify(userObj), {
                headers: getRequestHeader({
                    'includeAcceptType': true
                })
            })
            .map(response => response.json());
        } else {
            return this.http.put(updateUserURL, JSON.stringify(userObj), {
                headers: getRequestHeader({
                    'includeAcceptType': true
                })
            })
            .map(response => response.json());
        }
    }
    getDefectUser() {
        let getDefectUserURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_DEFECT_USER;
        return this.http.get(getDefectUserURL, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map((response) => {
            return response['_body'] ? response.json() : null;
        });
    }
    getAdminSetupUser(userObj, defectSystem) {
        let getAdminSetupUserURL;
        if(userObj.password) {
            getAdminSetupUserURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + getApiPath('GET_ADMIN_SETUP_USER', [userObj.username, userObj.password]);
        } else {
            getAdminSetupUserURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + getApiPath('GET_ADMIN_SETUP_USER_NO_PASSWORD', [userObj.username]);
        }

        return this.http.post(getAdminSetupUserURL, JSON.stringify(defectSystem), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    deleteUser(userId) {
        let deleteUserURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
             getApiPath('DELETE_DEFECT_USER', [userId]);
        return this.http.delete(deleteUserURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
    /**
     * @param key
     * @param items []
     * @Output string
     * Example:
     * Input: getRepeatedQueryParams('ids', [1,2,3])
     * Output: ?ids=1&ids=2&ids=3
     */
    getRepeatedQueryParams(key, items) {
        let _itemURL = '';
        _.each(items, (_itemId, _i) => {
            _itemURL += key + '=' + _itemId;
            if((_i + 1) != items.length) {
                _itemURL += '&';
            }
            if(_i == 0) {
                _itemURL = '?' + _itemURL;
            }
        });
        return _itemURL;
    }
    reloginDefectUser(username) {
        let reloginUserURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
                            + getApiPath('RELOGIN_DEFECT_USER', [username]);
        return this.http.post(reloginUserURL, null, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

  saveConnectionInfo(userObj,username,password) {
    let createUserURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
      + getApiPath('DEFECT_SETUP_USER',[username,password]);
    return this.http.post(createUserURL, JSON.stringify(userObj), {
      headers: getRequestHeader({
        'includeAcceptType': true
      })
    })
      .map(response => response.json());
  }

  getDefectLightMetaData(projectKey) {
      let encodedProjectKey = encodeURIComponent(projectKey);
        let defectLightMetaData = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
                                   + getApiPath('DEFECT_LIGHT_METADATA', ([encodedProjectKey]));
        return this.http.get(defectLightMetaData, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }
    defectBasicSearch(params) {
        let defectBasicSearchUrl = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
                                   + API_PATH.DEFECT_BASIC_SEARCH;
        if(params.project) {
            defectBasicSearchUrl += '?Product=' + encodeURIComponent(params.project);
            if(params.issueType) {
                defectBasicSearchUrl += '&IssueType=' + encodeURIComponent(params.issueType);
            }
            if(params.status) {
                defectBasicSearchUrl += '&Status=' + encodeURIComponent(params.status);
            }
            if(params.filedBy) {
                defectBasicSearchUrl += '&Created By=' + encodeURIComponent(params.filedBy);
            }
            if(params.version) {
                defectBasicSearchUrl += '&Version=' + encodeURIComponent(params.version);
            }
            if(params.priority) {
                defectBasicSearchUrl += '&Priority=' + encodeURIComponent(params.priority);
            }
            if(params.assignee) {
                defectBasicSearchUrl += '&Assigned To=' + encodeURIComponent(params.assignee);
            }
            defectBasicSearchUrl += '&offset=' + params.offset + '&maxresult=' + params.pageSize + '&maptc=true';
        } else {
            if(params.assignee) {
                defectBasicSearchUrl += '?Assigned To=' + params.assignee;
                if(params.filedBy) {
                    defectBasicSearchUrl += '&Created By=' + params.filedBy;
                }
            } else if(params.filedBy) {
                defectBasicSearchUrl += '?Created By=' + params.filedBy;
                if(params.assignee) {
                    defectBasicSearchUrl += '&Assigned To=' + params.assignee;
                }
            }
            defectBasicSearchUrl += '&offset=' + params.offset + '&maxresult=' + params.pageSize + '&maptc=true';
        }
        return this.http.get(defectBasicSearchUrl, {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        })
        .map(response => response.json());
    }

    updateDefectInBulk(defectBulkObject){
        let defectBulkUpdateURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
                                    API_PATH.BULK_UPDATE_DEFECT;
        return this.http.put(defectBulkUpdateURL , JSON.stringify(defectBulkObject), {
           headers: getRequestHeader({
               'includeAcceptType': true
           })
       })
       .map(response => response.json());
    }
    syncDefects(data) {
        let syncDefectsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
            API_PATH.SYNC_DEFECTS + '?releaseid=' + data.releaseid + '&syncon='+data.syncon + '&entityid=' + data.entityid;

        return this.http.get(syncDefectsURL, {
           headers: getRequestHeader({
               'includeAcceptType': true
           })
       })
       .map(response => response.json());
    }
}
