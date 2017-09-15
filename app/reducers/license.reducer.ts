import {
  GET_LICENSE_DATA, GET_APP_INFO, SET_APP_INFO, GET_AUTOMATION_LICENSE,
  ACCESS_ADMIN_CHECK
} from '../utils/constants/action.types';

const initialState = {
  'companyName': '',
  'licenseId': '',
  'licenseEdition': '',
  'licenseType': '',
  'activationDate': '',
  'expirationDate': '',
  'custId': '',
  'email': '',
  'noOfTotalUser': '',
  'noOfPaidUser': '',
  'application': {},
  'automation' : '',
  'adminAccess' : ''
};


export function licenseReducer(state = initialState, action) {

    switch (action.type) {

        case GET_LICENSE_DATA:
            action.data.forEach((actionData)=>{
              Object.keys(actionData).forEach((k) => {
                var key = k;
                var value = actionData[k];
                state[key] = value;
              });
            });
            console.debug('#$%^&*(*%^&*(',state);
            return state;

        case GET_APP_INFO:
          Object.keys(action.data).forEach((k) => {
            var key = k;
            var value = action.data[k];
            state[key] = value;
          });
          return state;

        case SET_APP_INFO:
          console.debug('on successful save', action, state);
          if(action.data.status === 200) {
            state['application']['reminderFrequencyPref'] = parseInt(action.data.value);
          }
          return state;

        case GET_AUTOMATION_LICENSE:

            if(action.data) {
              state.automation = action.data;
            }
            return state;

      case ACCESS_ADMIN_CHECK:

        if(action.data) {
          state.adminAccess = action.data;
        }
        return state;

        default:
            return state;
    }
}
