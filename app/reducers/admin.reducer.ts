import {
  SET_ADMIN_PREF, GET_HOT_BACKUP_DATA, SET_HOT_BACKUP_DATA, SET_JOB_HISTORY, UPDATE_PREFERENCE_BY_KEY,
  GET_PREFERENCE_BY_KEY, UPDATE_MULTI_PREFERENCE_BY_KEY, UPDATE_PREFERENCE_BY_KEY_ITEM,
  ADD_PREFERENCE_BY_KEY_ITEM, UPDATE_PREFERENCE_ITEM_STATUS, AUTHENTICATION_CHECK,
  SET_JOB_BACKUP_HISTORY, CLEAR_ADMIN_EVENT, SET_GRID_PREF, INDEXING_HEALTH_STATUS
} from '../utils/constants/action.types';

import {AUTHENTICATION_CHECK_SUCCESS} from '../utils/constants/action.events';
import {ADMIN_PREFERENCES} from '../view/components/admin/admin.constant';

declare var _;

const initialState = {
  'isUpdated':false,
  'authenticationCheck': false,
  'allPreferences': '',
  [ADMIN_PREFERENCES.ACCESS_URL_DESKTOP_URL] : '',
  [ADMIN_PREFERENCES.ACCESS_URL_DASHBOARD_URL] : '',
  [ADMIN_PREFERENCES.COMPANY_INFO_COMPANY_NAME] : '',
  [ADMIN_PREFERENCES.COMPANY_INFO_SYSTEM_NAME] :'',
  [ADMIN_PREFERENCES.MAIL_SERVER_NAME_IP] : '',
  [ADMIN_PREFERENCES.MAIL_SERVER_PORT] : '',
  [ADMIN_PREFERENCES.MAIL_SERVER_PASSWORD] : '',
  [ADMIN_PREFERENCES.ENABLE_BACKUP_FLAG] : '',
  [ADMIN_PREFERENCES.ENABLE_HOT_BACKUP_PERIOD] : '',
  [ADMIN_PREFERENCES.ADMIN_MAIL_SMTP_AUTH] :'',
  [ADMIN_PREFERENCES.ADMIN_MAIL_SERVER_USERNAME]  : '',
  [ADMIN_PREFERENCES.ADMIN_MAIL_SMTP_STARTTLS_ENABLE]:'',
  [ADMIN_PREFERENCES.ADMIN_AUTHENTICATION_SYSTEM_LOV] : '',
  [ADMIN_PREFERENCES.ADMIN_AUTHENTICATION_POLICY_LOV] : '',
  [ADMIN_PREFERENCES.ADMIN_AUTH_LDAP_BASE_DN] : '',
  [ADMIN_PREFERENCES.ADMIN_AUTH_SYS_LDAP_BIND_DN] :'',
  [ADMIN_PREFERENCES.ADMIN_AUTH_SYS_LDAP_SEARCH_ATTR] : '',
  [ADMIN_PREFERENCES.ADMIN_AUTH_SYS_LDAP_URL] : '',
  [ADMIN_PREFERENCES.ADMIN_AUTH_SYS_LDAP_BIND_PWD] : '',
  [ADMIN_PREFERENCES.ADMIN_AUTH_SYS_CROWD_APP_NAME] : '',
  [ADMIN_PREFERENCES.ADMIN_AUTH_SYS_CROWD_URL] : '',
  [ADMIN_PREFERENCES.ADMIN_AUTH_SYS_CROWD_APP_PWD] : '',
  [ADMIN_PREFERENCES.ADMIN_AUTH_SYS_URL] : '',
  [ADMIN_PREFERENCES.ADMIN_AUTH_SYS_TYPE] : '',
  [ADMIN_PREFERENCES.ADMIN_APPLICATION_SELECTED_SKIN] : '',
  [ADMIN_PREFERENCES.ADMIN_APPLICATION_SKINS] : '',
  [ADMIN_PREFERENCES.ADMIN_TCC_NODEACCESS_RESTRICTED]: '',
  [ADMIN_PREFERENCES.ADMIN_AUTH_SECONDRY_AUTH]: '',
  [ADMIN_PREFERENCES.TESTCASE_ESTIMATED_TIME_TO_TEST_VALUE]: '',
  [ADMIN_PREFERENCES.BUG_TRACKING_SYSTEM_LOV]: '',
  [ADMIN_PREFERENCES.TESTSTEPRESULT_TESTSTEPRESSULTSTATUS_LOV]: '',
  [ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV]: '',
  [ADMIN_PREFERENCES.GRID_PREFERENCE]: '',
  'backupHistory': {},
  'event': ''
};

export function admin(state = initialState, action) {

  switch (action.type) {
    case SET_ADMIN_PREF:
      let prefs = action.data;
      if (!Array.isArray(prefs)) {
        try {
            let prefs2 = JSON.parse(prefs);
            if (Array.isArray(prefs)) {
                prefs = prefs2;
            }
        } catch (err) {
            // console.log('prefs');
        }
      }
      prefs.forEach(object => {
        let key = object.name;
        let value = object.value;

        if (key === ADMIN_PREFERENCES.TESTRESULT_TESTRESULTSTATUS_LOV || key === ADMIN_PREFERENCES.TESTSTEPRESULT_TESTSTEPRESSULTSTATUS_LOV) {
          let val = JSON.parse(value);

          let valueArr = [];

          val.forEach(v => {

            v.value = v.value.toLocaleLowerCase() === 'change status' ? 'Not Executed' : v.value;

            valueArr.push(v);
          });

          value = JSON.stringify(valueArr);
        }

        state[key] = value;
      });
      state['allPreferences'] = action.data;
      state['isUpdated'] = true;
      state['event'] = 'PREF_LOADED';
      return state;

    case GET_HOT_BACKUP_DATA:
      Object.keys(action.data).forEach(key => {
        state[key] = action.data[key];
      });
      return state;

    case SET_HOT_BACKUP_DATA:
      if(action.data.status === 200) {
        state['hour'] = action.data.value;
        state['flag'] = '' + !action.data.enableAutoBackup;
      }
      return state;

    case SET_JOB_HISTORY:
      Object.keys(action.data).forEach(key => {
        state[key] = action.data[key];
      });
      return state;

    case GET_PREFERENCE_BY_KEY:
      let key = action.data.name;
      state[key] = action.data.value;
      state['event'] = key;
      return state;

    case UPDATE_PREFERENCE_BY_KEY:
      state[action.data.key] = action.data.value;
      return state;

    case UPDATE_MULTI_PREFERENCE_BY_KEY:
      action.data.forEach(object => {
        state[object.name] = object.value;
      });
      return state;

    case UPDATE_PREFERENCE_BY_KEY_ITEM:
      state[action.data.name] = action.data.value;
      return state;
    case ADD_PREFERENCE_BY_KEY_ITEM:
      state[action.data.name] = action.data.value;
      return state;

    case UPDATE_PREFERENCE_ITEM_STATUS:
      state[action.data.name] = action.data.value;
      return state;
    case AUTHENTICATION_CHECK :
      state.authenticationCheck = action.data;
      state['event'] = AUTHENTICATION_CHECK_SUCCESS;
      return state;
    case SET_JOB_BACKUP_HISTORY:
      state['backupHistory'] = action.data;
      return state;
    case INDEXING_HEALTH_STATUS:
      state['event'] = INDEXING_HEALTH_STATUS;
      state['data'] = action.data;
      return state;
    case CLEAR_ADMIN_EVENT:
      state['event'] = '';
      return state;
    default:
      return state;
  }
}
