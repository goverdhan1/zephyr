import { AUTOMATION_QUALITY } from '../utils/constants/action.types';

const initialState = {
  'automationQuality': ''
};


export function qualityTrendReducer (state = initialState, action) {

  switch (action.type) {

    case AUTOMATION_QUALITY:
      if(action.data) {
        state.automationQuality = action.data;
      }
      return state;

    default:
      return state;
  }
}
