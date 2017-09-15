import {
  Component, Input, EventEmitter, Output, AfterViewInit, NgZone, ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import {NotificationStore} from '../../../store/notification.store';
import {NotificationListComponent} from './notification.list.component';
import {NOTIFICATION_APP_CONSTANTS} from '../../../utils/constants/notification.constants';

// Constants
import {NOTIFICATION_SELECTOR} from './notifications.constants';
import {NotificationAction} from '../../../actions/notification.action';

declare var jQuery: any, io : any;

@Component({
    selector: NOTIFICATION_SELECTOR,
    templateUrl: 'notifications.html',
    viewProviders: [NotificationAction],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent {
    @Input() appId;
    @Output() onNotificationApply: EventEmitter<any>;
    notificationList = [];
    notificationCount = 0;
    appName;
    private _notificationStore;
    constructor(private _notificationAction:NotificationAction,private zone:NgZone,private cdr: ChangeDetectorRef) {
        this.onNotificationApply = new EventEmitter();
        this._notificationStore = NotificationStore.getNotificationStore();
        this._notificationStore.subscribe((x) => {
          this.zone.run(() => {
            this.appName = NOTIFICATION_APP_CONSTANTS[this.appId].userReadableName;
            let state = this._notificationStore.getState();
            let notification = state.notification;
            if(notification) {
              let data = notification.ui_details[this.appId];
              if(data) {
                this.notificationCount = data.notification_count;
                this.notificationList = data.notification_messages;
                if(this.cdr) { this.cdr.markForCheck(); }
              }
            }
          });
        });
    }

    discardNotifications(ev) {
      jQuery('body').trigger('onNotificationCompletion');
        this._notificationStore.dispatch(this._notificationAction.discardAppNotifications(this.appId));
    }
    applyNotifications(ev) {
      jQuery('body').trigger('onNotificationCompletion');
      this.onNotificationApply.emit(ev);
    }
}
