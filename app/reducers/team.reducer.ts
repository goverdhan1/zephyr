import {
  FETCH_TEAM_DETAILS, FETCH_TEAM_LOCATION_DETAILS,
  FETCH_TEAM_DETAILS_FOR_GADGET
} from '../utils/constants/action.types';
declare var _: any;

const initialState = {
    'teamDetails': [],
    'location': [],
    'teamDetailsForGadget': {}
};

export function teamReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_TEAM_DETAILS:
            state.teamDetails = action.data;
            let locations = [];
            state.teamDetails.forEach((team) => {
                let locationObject = _.find(locations, {location: team.location});
                if(!locationObject) {
                    locations.push({
                        location: team.location,
                        count: 1
                    });
                } else {
                    locationObject.count++;
                }
            });
            state.location = locations;
            return state;
      case FETCH_TEAM_DETAILS_FOR_GADGET:
            let teamDetails = action.data;
            state.teamDetailsForGadget[action.gadgetId] = {data : teamDetails};
            return state;
        case FETCH_TEAM_LOCATION_DETAILS:
            return state;
        default:
            return state;
    }
}
