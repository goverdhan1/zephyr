import {OnDestroy, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {isLoggedin}  from '../../../utils/constants/is-loggedin';
import {FETCH_USER_ALLOCATED_PROJECT_DETAILS_SUCCESS } from '../../../utils/constants/action.events';
import {ZephyrStore} from '../../../store/zephyr.store';
import {ProjectAction} from '../../../actions/project.action';


/**
 * On empty URL, component will navigate to '/login' and '/project'
 */
@Component({
  selector: 'empty-url',
  template: '',
  providers: [ProjectAction]
})
export class EmptyURLComponent implements OnInit, OnDestroy {
    isLoggedin = isLoggedin;
    _zephyrStore;
    unsubscribe;
    constructor(private router: Router, private _projectAction:ProjectAction) {
        this._zephyrStore = ZephyrStore.getZephyrStore();

        this.unsubscribe = this._zephyrStore.subscribe(() => {
          let state = this._zephyrStore.getState();

          if (state.projects.userAllocatedProjects.length) {
            this.router.navigate(['/project', state.projects.userAllocatedProjects[0]]);
          }
        });

    }

    ngOnDestroy() {
      this.unsubscribe();
    }

    ngOnInit() {
        if(!this.isLoggedin()) {
            this.router.navigate(['/login']);
        } else {
            // TODO: Update the project URL condition not to hardcode to 1
            // this.router.navigate(['/project', 1]);
            let user = this._zephyrStore.getState().loggedInUser;
            if(user) {
                this._zephyrStore.dispatch(this._projectAction.fetchUserAllocatedProjectsPostLogin(user.id));
            } else {
                this.router.navigate(['/project', 1]);
            }
        }
    }
}
