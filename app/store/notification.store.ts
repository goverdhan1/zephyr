import {rootNotificationReducer} from '../reducers/rootNotification.reducer';
import {thunkMiddleware} from '../middleware/thunk.middleware';

declare var Redux: any;

export class NotificationStore {

    static notificationStore;

    static createNotificationStore(initialState) {
        this.notificationStore = Redux.createStore(rootNotificationReducer, initialState, Redux.applyMiddleware(thunkMiddleware));
    }

    static getNotificationStore() {
        return this.notificationStore;
    }
}
