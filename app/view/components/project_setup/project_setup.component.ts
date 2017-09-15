import {Component } from '@angular/core';
import {Router} from '@angular/router';
//import {LeftNavComponent} from '../common/leftnav/leftnav.component';
import {ZEE_NAV_ADMIN_COLUMNS} from '../admin/zee_leftnav_admin.data';
//import {ROUTES_PROJECT_SETUP} from './project_setup.routes';
import {ZephyrStore} from '../../../store/zephyr.store';

@Component({
  selector: 'project-setup',
  templateUrl: 'project_setup.html'
})

export class ProjectSetupComponent {
    navColumns;
    activeItemKey;

    constructor(public router: Router) {
        this.navColumns = ZEE_NAV_ADMIN_COLUMNS;
        this.activeItemKey = 'manage-projects';
    }
}
