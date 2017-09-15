import {Component} from '@angular/core';
//import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup} from '@angular/common';
import {Router} from '@angular/router';
// import {RouteParams, RouteConfig, RouterOutlet} from '@angular/router-deprecated';

import {ZephyrStore} from '../../../store/zephyr.store';
import {AdminAction} from '../../../actions/admin.action';
import {URL_ACTIVE_ITEM} from './admin.constant';

@Component({
  selector: 'admin',
  viewProviders: [AdminAction],
  templateUrl: 'admin.html'
})

//@Routes(ROUTES_ADMIN)

export class AdminComponent {
    //form: ControlGroup;
    error: boolean = false;
    public zephyrStore;
    activeItem = '';
    constructor(public router: Router, private _adminAction: AdminAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.router.events.subscribe((value) => {
          if(value.url) {
            this.activeItem = URL_ACTIVE_ITEM[value.url];
          }
        });
        let state = this.zephyrStore.getState();
        let user = state.loggedInUser;
        if (!(this.zephyrStore.getState().adminPref['isUpdated']) && Object.keys(user).length) {
          this.getAdminPref();
        }
    }
    getAdminPref() {
      this.zephyrStore.dispatch(this._adminAction.getAllPref());
    }
}
