
import {Pipe, PipeTransform, SecurityContext} from '@angular/core';
import {ZephyrStore} from '../../store/zephyr.store';
import { ADMIN_PREFERENCES} from '../components/admin/admin.constant';
import {UtililtyFunctions} from '../../utils/scripts/utils';
import { DomSanitizer, } from '@angular/platform-browser';
declare var jQuery: any, _: any;


const SYSTEM_TYPE_1 = 1;
const SYSTEM_TYPE_2 = 2;
const SYSTEM_TYPE_3 = 3;
const SYSTEM_TYPE_4 = 4;
const CHANGE_STATUS_EXECUTION_ID = 10;
/**
 * Returns value of the key provided
 * @value: object
 * @args: key with in the object
 * Usage:
 *   value | objectParser: {}
 * Example:
 *   let _pipeArgs = {key: 'name'}
 *   {{Manage | objectParser : 'name'}}
 *   formats to: object['key']['name']
 */
@Pipe({name: 'gridActionsPipe', pure: true})
export class GridActionsPipe implements PipeTransform {
    _zephyrStore;
    users;
    utililtyFunction;
    _metadataList = [];
    constructor (private _sanitizer: DomSanitizer) {
        this._zephyrStore = ZephyrStore.getZephyrStore();
        this.utililtyFunction = new UtililtyFunctions();

    }
    addAnonymous() {
        // Adding Anyone user object to list if users are taken from resource-management-store
        let state = this._zephyrStore.getState();
        if (state.resourceManagement.users.length > 0) {
          this.users = state.resourceManagement.users;
        } else {
          this.users = state.global.users;
        }
        if (!(this.users.filter(item => -10 === item.id).length)) {
            this.users.push({id: -10, firstName: 'Anyone', lastName: ''});
        }
    }
    transform(value: any, args) : any {
        let state = this._zephyrStore.getState();
        let adminPrefKeyExecutionStatus = state.adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV] ?
            JSON.parse(state.adminPref[ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV]) : [];

        let adminPrefKeyStepExecutionStatus = state.adminPref[ADMIN_PREFERENCES.TESTSTEPRESULT_TESTSTEPRESSULTSTATUS_LOV] ?
            JSON.parse(state.adminPref[ADMIN_PREFERENCES.TESTSTEPRESULT_TESTSTEPRESSULTSTATUS_LOV]) : [];

        switch(args[0].key) {
            case 'automated':
                return value ? 'A' : 'M';
            case 'requirementIds':
                return value && value.length > 0 ? `<span title="Requirement(s) covered:${value.length}"  class="popover-indication coverage">${value.length}  Requirement(s)</span>` : 'Not Covered';
            case 'testcaseIds':
                return value ? `<span title="Testcase(s) covered: ${value}"  class="popover-indication coverage">${value} Testcase(s) Covered</span>` : 'Not Covered';

            case 'testcaseLink':
                return value ? 'No' : 'Yes';
            case 'user':
                this.addAnonymous();

                let userTitle = 'Unassigned';
                this.users.forEach(object => {
                   if (object.id == value) {
                    userTitle = object.firstName + ' ' + object.lastName;
                   }
                });
                return userTitle;
            case 'userid-username-mapping':
                this.addAnonymous();

                let userName = '';
                this.users.forEach(object => {
                    if (object.id == value) {
                        userName = object.firstName + ' ' + object.lastName;
                    }
                });
                return userName;
            case 'executedby-name-mapping':
                this.addAnonymous();

                userName = '';
                this.users.forEach(object => {
                    if (object.id == value) {
                        userName = object.firstName + ' ' + object.lastName;
                    }
                });
                return userName;
            case 'user-select-options':
                let users = this.users || (state.resourceManagement.users.length > 0 ?
                    state.resourceManagement.users : state.global.users);

                let modifiedUsersArray = users.map(object => ({
                    text: object.firstName + ' ' + object.lastName,
                    id: object.id
                }));

                let modifiedObject = {
                    text: 'Unassigned',
                    id: 0
                };
                modifiedUsersArray.push(modifiedObject);
                return modifiedUsersArray;
            case 'testcasePriority':
                let testcasePriorities = state.adminPref[ADMIN_PREFERENCES.TESTCASE_TESTCASE_PRIORITY_LOV] &&
                    JSON.parse(state.adminPref[ADMIN_PREFERENCES.TESTCASE_TESTCASE_PRIORITY_LOV]);

                let testcasePriority = (testcasePriorities || []).filter(item => String(item.id) === String(value))[0];
                return testcasePriority ? testcasePriority.value : '';
            case 'reqPriority':
                let reqPriorities = state.adminPref[ADMIN_PREFERENCES.REQUIREMENT_REQUIREMENT_PRIORITY_LOV] &&
                    JSON.parse(state.adminPref[ADMIN_PREFERENCES.REQUIREMENT_REQUIREMENT_PRIORITY_LOV]);

                let reqPriority = (reqPriorities || []).filter(item => String(item.id) === String(value))[0];
                return reqPriority ? reqPriority.value : value;
            case 'defects-checkbox':
                return '<div class="zui-checkbox2"><input type="checkbox"' + (value ? 'checked=' + value : '') + '/><label></label></div>';
            case 'step-execution-status' :
                  var stringText = adminPrefKeyStepExecutionStatus[0].value;
                  var colorHexCode = '#000';
                  //INFO:hard coded in fornt-ended to show not-executed when executionStausId is
                  if (!(value == CHANGE_STATUS_EXECUTION_ID)) {
                    adminPrefKeyStepExecutionStatus.forEach(object => {
                        if (object.id === value) {
                            stringText = object.value;
                            colorHexCode = object.color;
                        }
                    });
                  }
                  return '<span title="' + stringText + '" style="' + this.utililtyFunction.styleObjectLozenges(colorHexCode) + '">' + stringText + '</span>';
            case 'execution-status':
                var stringText = adminPrefKeyExecutionStatus[0].value;
                var colorHexCode = '#000';

                adminPrefKeyExecutionStatus.forEach(object => {
                    if (object.id === value) {
                        stringText = object.value;
                        colorHexCode = object.color;
                    }
                });

                return '<span title="'+ stringText +'" style="' +this.utililtyFunction.styleObjectLozenges(colorHexCode)+'">' + stringText + '</span>';
            case 'status-select':
                let stausArray = [];
                for (let i = 0 ;i < adminPrefKeyExecutionStatus.length ; i++ ) {
                    let object = adminPrefKeyExecutionStatus[i];
                    if (object.active == 'true') {
                        let modifiedObject = {};

                        modifiedObject['text'] = object.value;
                        modifiedObject['id'] = object.id;
                        modifiedObject['color'] = object.color;

                        stausArray.push(modifiedObject);
                  }
              }
              return stausArray;
            case 'step-status-select':
                stausArray = [];
                for (let i = 0 ;i < adminPrefKeyStepExecutionStatus.length ; i++ ) {
                    let object = adminPrefKeyStepExecutionStatus[i];
                    if (object.active == 'true') {

                        let modifiedObject = {};
                        modifiedObject['text'] = object.value;
                        modifiedObject['id'] = object.id;
                        modifiedObject['color'] = object.color;
                        stausArray.push(modifiedObject);
                    }
                }
                return stausArray;

            case 'status-mapping':
                let statusString  = adminPrefKeyExecutionStatus[0].value;
                for (let i = 0 ;i <adminPrefKeyExecutionStatus.length ; i++ ) {
                    let object = adminPrefKeyExecutionStatus[i];
                    if (object.id === value) {
                        statusString = object.value;
                    }
                }
                return statusString;

            case 'step-status-mapping':
                let status = adminPrefKeyExecutionStatus[0].value;
                //INFO:hard coded in fornt-ended to show not-executed when executionStausId is
                if (!(value == CHANGE_STATUS_EXECUTION_ID)) {
                  for (let i = 0 ;i <adminPrefKeyStepExecutionStatus.length ; i++ ) {
                      let object = adminPrefKeyStepExecutionStatus[i];
                      if (object.id === value) {
                          status = object.value;
                      }
                  }
                }
                return status;


            case 'flag-image':
                if (value) {
                    return 'selected-star-grid-image';
                }
                return 'unselected-star-grid-image';
            case 'flag-action':
                if (value) {
                    return 'star';
                }
                return 'unstar';
            case 'resource-management-role':
                let roleNames = '';
                if (value) {
                    value.forEach(object => {
                        roleNames = roleNames + object.name.trim() + ', ';
                    });
                    roleNames = roleNames.trim();
                    value.length > 0 ? roleNames = roleNames.substring(0 , roleNames.length -1 ) : roleNames = roleNames;
                }
                return roleNames;
            case 'resource-management-logged-in':
                let valueReturned = '';
                if (value) {
                  value.status = (state.loggedUsers && state.loggedUsers.loggedInUser[value.userId]) ? 1 : 0;

                  if (value.userId == state.loggedInUser.id) {
                    valueReturned = 'Me (Logged in)';
                  } else if (value.status == 0) {
                    valueReturned = 'Not Logged in';
                  } else if (value.status == 1) {
                    valueReturned = '<a tabindex="1" class="grid_link_click logOutUser">Logged in (Force)</a>';
                  }
                }
                return valueReturned;
            case 'project-type':
                let projectType;
                let projectTypes = state.adminPref[ADMIN_PREFERENCES.PROJECT_TYPE_LOV] ?
                    JSON.parse(state.adminPref[ADMIN_PREFERENCES.PROJECT_TYPE_LOV]) : [];

                projectTypes.forEach(object => {
                    if (object.id == value) {
                        projectType = object.value;
                    }
                });
                return projectType;
            case 'release-visible':
                return value ? 'No' : 'Yes';
            case 'link-icon':
                let classObj = _.find(args, 'class');
                if(classObj && classObj.class) {
                    return '<span class="link-icon grid-icon ' + classObj.class + '">' +
                        '<i class="fa fa-link grid-icon" aria-hidden="true"></i></span>';
                }
                return '';
            case 'play-pause-delete-icon':
                return '<i class="grid-action-icon fa fa-play-circle-o" aria-hidden="true" id="play"></i>' +
                    '<i class="grid-action-icon fa fa-pause-circle-o" aria-hidden="true" id="pause"></i>' +
                    '<i class="grid-action-icon fa fa-trash deleteJobs" id="deleteJobs" aria-hidden="true" data-action="delete"></i>';

            case 'subtask-icon':
                let classObject = _.find(args, 'class');
                if(classObject && classObject.class) {
                    if(value) {
                        return '<span title="Create sub task" class="disabled"><i class="fa fa-tasks grid-icon" aria-hidden="true"></i></span>';
                    }
                    return '<span title="Create sub task" class="subtask-icon grid-icon ' + classObject.class + '">' +
                        '<i class="fa fa-tasks grid-icon" aria-hidden="true"></i></span>';
                }
                return '';
            case 'subtask-parent':
                let storeInfo = _.find(args, 'store');
                if(!storeInfo) {
                    return '';
                }
                let defects = state[storeInfo.store].grid.rows;
                let defectSystem = state.global.defectSystem;
                let defectObj = _.find(defects, {'alternateId': value});
                if(defectObj) {
                    if(defectObj.isSubtask) {
                        if(defectSystem && defectSystem['url']) {
                            let defectSystemUrl = defectSystem['url'];
                            return `<span><a target="_blank" href="${defectSystemUrl}/browse/${defectObj.parentKey}">${defectObj.parentKey}</a> /
                                <a target="_blank" href="${defectSystemUrl}/browse/${defectObj.alternateId}">${defectObj.alternateId}</a><span>`;
                        } else {
                            return defectObj.parentKey + ' / ' + defectObj.alternateId;
                        }
                    } else {
                        if(defectSystem && defectSystem['url']) {
                            let defectSystemUrl = defectSystem['url'];
                            return `<span><a target="_blank" href="${defectSystemUrl}/browse/${defectObj.alternateId}">${defectObj.alternateId}</a></span>`;
                        } else {
                            return defectObj.alternateId;
                        }
                    }
                }
                return '';
            case 'tce-defects':
                let htmlString = '';
                let defectsystem = state.global.defectSystem;
                value.defects.forEach(obj => {
                    htmlString += '<span class="grid_link_select_click popover-indication defect-detail-popover">'+ obj.externalId + ' </span>';
                });
                if ((value.status) && (defectsystem['systemType'] == SYSTEM_TYPE_4)) {
                    htmlString = '<span class=\'defect_link grid_link_select_click\'>D </span>' + htmlString;
                } else if (defectsystem['systemType'] == SYSTEM_TYPE_1 || defectsystem['systemType'] == SYSTEM_TYPE_2
                    || defectsystem['systemType'] == SYSTEM_TYPE_3) {

                    htmlString = '';

                } else if (value.defects.length > 0) {
                    htmlString = '<span class="defect_link disabled grid_link_select_click">D </span>' + htmlString;
                }
                return htmlString;
            case 'tce-current-defects':
              let defectsys = state.global.defectSystem;
              return '<span class="tce-current-defects-detail-url">'+ value + '</span>';
            case 'schedule_automation' :
                 let schedule_automation = '<span class="defect_link grid_link_select_click">E</span>' ;
                 return schedule_automation;
            case 'project-resources-count':
                return `${value || 0} members`;
            case 'metadata-id-name-mapping':
                this._metadataList = state.fields.metadata.options;
                let dataString = '';
                this._metadataList.forEach(object => {
                    if (object.id === value) {
                        dataString = object.dataType;
                    }
                });
                return dataString;
            case 'projects-list':
                return (value || []).map(item => item.name).join(', ');
            case 'user-allocated-to-current-project-select-options':
                modifiedUsersArray = [];
                let teamDet = state.team.teamDetails;
                for (let i=0; i<teamDet.length; i++) {
                    if (teamDet[i]['accountEnabled']) {
                        let userObject  = {};
                        userObject['id'] = teamDet[i]['id'] ;
                        userObject['text'] = teamDet[i]['firstName'] + ' ' + teamDet[i]['lastName'];

                        modifiedUsersArray.push(userObject);
                    }
                }
                let anyoneUserObject = {};
                anyoneUserObject['text'] = 'Anyone';
                anyoneUserObject['id'] = -10;
                modifiedUsersArray.push(anyoneUserObject);
                let unassignedUserObject = {};
                unassignedUserObject['text'] = 'Unassigned';
                unassignedUserObject['id'] = 0;
                modifiedUsersArray.push(unassignedUserObject);
                return modifiedUsersArray;
            case 'execution-status-box':
                return '<span class="execution-status-color-box" style="background-color:' + value + ';"></span>';
            case 'job-status':
                if (value == -1) {
                    return 'In progress';
                }
                if (value > 0) {
                    return 'Error';
                }
                return 'Completed';
            case 'execution-status-enable-toggle-button':
                let _toggleClass = 'zui-toggle',
                    _checked = '';

                if(parseInt(value.id) <= 10) {
                    _toggleClass += ' disabled';
                }

                if (value && value.active == 'true') {
                    _checked = ' checked';
                }
                return '<div class="zui-toggle-wrapper"> <div class="' + _toggleClass + '">' +
                    '<input class="tgl" id="toggle1" type="checkbox"'+ _checked + '>' +
                    '<label class="tgl-btn" for="toggle1"></label></div></div>';
            case 'cycle_duration':
                return '<span>'+ value + ' day' + (value === 1 ? '' : 's') + '</span>';
            case 'html_space':
                return value.replace(/\s/g, '&nbsp;');
        }
    }
}
