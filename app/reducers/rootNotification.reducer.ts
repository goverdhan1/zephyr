import {notificationReducer} from './notification.reducer';

declare var Redux: any;

export const rootNotificationReducer = Redux.combineReducers({
    notification: notificationReducer
});
