import {projectReducer, projectSummariesReducer , projectSetupReducer, projectsReducer
        ,projectsUsersMappingReducer} from './project.reducer';
import {releaseReducer} from './release.reducer';
import {userReducer, resourceManagementReducer, loggedInUserReducer} from './user.reducer';
import { teamReducer } from'./team.reducer';
import  { chartReducer } from './chart.reducer';
import {newsReducer} from './news.reducer';
import {tcrReducer} from './tcr.reducer';
import {testcaseReducer} from './testcase.reducer';
import {globalReducer} from './global.reducer';
import {customField} from './customfield.reducer';
import {admin} from './admin.reducer';
import {rolesReducer} from './roles.reducer';
import {fieldsReducer} from './fields.reducer';
import {etlReducer} from './etl.reducer';
import {licenseReducer} from './license.reducer';
import {defectsLicense, defectSummaries, defectDetails, defectsSearch,
    currentlyLinkedDefects, linkNewDefect, defectUser} from './defects.reducer';
import {testcaseEASReducer} from './testcaseEAS.reducer';
import {zqlReducer} from './zql.reducer';
import {reportReducer} from './report.reducer';
import {importReducer} from './import.reducer';
import {tceReducer} from './tce.reducer';
import {dashboardReducer} from './dashboard.reducer';
import {requirementsReducer} from './requirements.reducer';
import {mapTestReqReducer} from './mapTestReq.reducer';
import {gadgetReducer} from './gadget.reducer';
import {gridReducer} from './grid.reducer';
import {defectsAdminReducer} from './defectsAdmin.reducer';
import {executionStausReducer} from './executionStatus.reducer';
import {leftNavReducer} from './leftnav.reducer';
import {zautomationReducer} from './zautomation.reducer';
import {qualityTrendReducer} from "./qualityTrend.reducer";
import {tcepReducer} from './tcep.reducer';
import {CLEAR_ZEPHYR_STORE} from '../utils/constants/action.types';

declare var Redux: any;

const zeAppReducer = Redux.combineReducers({
    project: projectReducer,
    projectSummaries: projectSummariesReducer,
    projectSetup: projectSetupReducer,
    resourceManagement : resourceManagementReducer,
    projects: projectsReducer,
    release: releaseReducer,
    chartData: chartReducer,
    news: newsReducer,
    team: teamReducer,
    tcr: tcrReducer,
    testcase: testcaseReducer,
    loggedInUser: userReducer,
    global: globalReducer,
    customField: customField,
    adminPref: admin,
    roles: rolesReducer,
    fields:fieldsReducer,
    etl: etlReducer,
    license: licenseReducer,
    defectsLicense: defectsLicense,
    defectSummaries: defectSummaries,
    defectDetails: defectDetails,
    defectsSearch: defectsSearch,
    currentlyLinkedDefects: currentlyLinkedDefects,
    linkNewDefect: linkNewDefect,
    defectUser: defectUser,
    testcaseEAS: testcaseEASReducer,
    zql: zqlReducer,
    report: reportReducer,
    imports: importReducer,
    mapTestReqReducer: mapTestReqReducer,
    tce: tceReducer,
    requirements: requirementsReducer,
    dashboards: dashboardReducer,
    gadget: gadgetReducer,
    grid: gridReducer,
    projectsUsersMapping : projectsUsersMappingReducer,
    loggedUsers : loggedInUserReducer,
    defectsAdmin: defectsAdminReducer,
    executionStatus:executionStausReducer,
    leftnav: leftNavReducer,
    zautomationReducer: zautomationReducer,
    qualityTrend: qualityTrendReducer,
    tcepReducer: tcepReducer
});

export const rootReducer = (state, action) => {
  if (action.type === CLEAR_ZEPHYR_STORE) {
      state.loggedUsers.loggedInUser = {};
      // return state;
  }
  if(action.type === 'SET_ROOT_STATE') {
      return Object.assign({}, action.data);
  }
  return zeAppReducer(state, action);
};
