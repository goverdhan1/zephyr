import {Component} from '@angular/core';
//import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup} from '@angular/common';
import {Router, Routes} from '@angular/router';
// import {RouteParams, RouteConfig, RouterOutlet} from '@angular/router-deprecated';
//import {ROUTES_TESTCASE} from './testcase-eas.routes';
import {ZephyrStore} from '../../../store/zephyr.store';

// Constants
import {ZEE_NAV_COLUMNS} from '../projects/project_leftnav.data';

@Component({
  selector: 'testcase-eas',
  templateUrl: 'testcase-eas.html'
})

  //@Routes(ROUTES_TESTCASE)

export class TestcaseEASComponent {
    //form: ControlGroup;
    error: boolean = false;
    public zephyrStore;
    public releases;
    navColumns;
    activeItemKey;
    constructor(public router: Router) {
      this.navColumns = ZEE_NAV_COLUMNS;
      this.activeItemKey = 'testcase-eas';
      this.zephyrStore = ZephyrStore.getZephyrStore();
      this.zephyrStore.subscribe(() => {
        this.releases = this.zephyrStore.getState().release.releases;
        this.setReleasesDropdown(this.releases);
      });
    }
    setReleasesDropdown(releases) {
        this.releases = releases.map(obj => ({id: obj.id, text: obj.name}));
        this.navColumns.releases = this.releases;
    }
}
