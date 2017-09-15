import {
  GET_DRILL_DOWN_DATA, UPDATE_CHART_STACK, POP_FROM_CHART_STACK,
  FETCH_GADGET_DATA, CLEAR_GADGET_EVENTS, GET_GADGET_DATA_EVENT, UPDATE_GADGET, GET_GADGET_DATA_EVENT_FAIL
} from '../utils/constants/action.types';
import {FETCH_RELEASE_SUMMARIES_SUCCESS, FETCH_GADGET_DATA_SUCCESS, GET_GADGET_DATA_SUCCESS} from '../utils/constants/action.events';

declare var _: any;

/*format: {
    'gadgetId' : chartStack[]
}*/

const initialState = {
    gadgetData: {},
    gadgetMeta: {},
    event : '',
    gadgetId: ''
};

export function gadgetReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GADGET_DATA_EVENT:
            if (action.data) {
              state.gadgetId = action.gadgetId;
              state.gadgetData[action.gadgetId] = action.data.data;
              state.gadgetMeta[action.gadgetId] = {
                projectName : action.data.projectName,
                releaseName : action.data.releaseName,
              };
              state.event = GET_GADGET_DATA_SUCCESS;
            }

            return state;

      case GET_GADGET_DATA_EVENT_FAIL:
          if (action.gadgetId) {
            state.gadgetId = action.gadgetId;
            state.event = GET_GADGET_DATA_EVENT_FAIL;
          }
          return state;

      case UPDATE_GADGET :
        // let gadget = action.data;
        // delete state.gadgetData[gadget.id];
        return state;

      case GET_DRILL_DOWN_DATA:
            if(action.isOnLoad) {
                state[action.gadgetId] = [];
            }
            state[action.gadgetId].push(action.data);
        	return state;
        case UPDATE_CHART_STACK:
        	let index = action.data;
        	state[action.gadgetId] = state[action.gadgetId].slice(0, index + 1);
        	return state;
        case POP_FROM_CHART_STACK:
        	if(state[action.gadgetId].length > 1) {
        		state[action.gadgetId].pop();
        	}
        	return state;
        case FETCH_GADGET_DATA:
          state['summaries'] = action.data;
          state['event'] = FETCH_GADGET_DATA_SUCCESS + action.gadgetId;
          state['gadgetId'] = action.gadgetId;
          return state;
        case CLEAR_GADGET_EVENTS:
          state['event'] = '';
          // state['gadgetId'] = '';
          delete state.gadgetData[action.gadgetId];
          return state;
        default:
            return state;
    }
}
