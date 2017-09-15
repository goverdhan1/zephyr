import {Component } from '@angular/core';
import {Router} from '@angular/router';
import {ZEE_NAV_ADMIN_COLUMNS} from '../admin/zee_leftnav_admin.data';
import {ZephyrStore} from '../../../store/zephyr.store';

@Component({
  selector: 'resource-management',
  templateUrl: 'resource_management.html'
})

export class ResourceManagementComponent {
    navColumns;
    activeItemKey;

    constructor(public router: Router) {
        this.navColumns = ZEE_NAV_ADMIN_COLUMNS;
        this.activeItemKey = 'resource-management';
    }
}
