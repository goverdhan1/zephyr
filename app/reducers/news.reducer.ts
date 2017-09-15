import { FETCH_NEWS_BY_PROJECT_ID } from '../utils/constants/action.types';

const initialState = [];

export function newsReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_NEWS_BY_PROJECT_ID:
            state = action.data;
            return state;
        default:
            return state;
    }
}
