import {Component, Input, Output, EventEmitter} from '@angular/core';

import {ZephyrStore} from '../../../store/zephyr.store';

@Component({
    selector: 'notification-list',
    templateUrl: 'notification.list.html'
})
export class NotificationListComponent {
    @Input() notificationList;
    @Output() discardNotification: EventEmitter<any> = new EventEmitter();
    @Output() applyNotification: EventEmitter<any> = new EventEmitter();

    zephyrStore;
    constructor() {
        this.zephyrStore = ZephyrStore.getZephyrStore();
    }

    discardNotifications(ev) {
        this.discardNotification.emit(true);
    }

    applyNotifications(ev) {
      this.applyNotification.emit(ev);
    }
}
