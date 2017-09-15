import {rootReducer} from '../reducers/root.reducer';
import {thunkMiddleware} from '../middleware/thunk.middleware';

declare var Redux: any;

export class ZephyrStore {

    static zephyrStore;

    static createZephyrStore(initialState) {
        this.zephyrStore = Redux.createStore(rootReducer, initialState, Redux.applyMiddleware(thunkMiddleware));
    }

    static getZephyrStore() {
        return this.zephyrStore;
    }
}
