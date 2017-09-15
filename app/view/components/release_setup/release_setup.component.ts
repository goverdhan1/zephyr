import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Router, Routes} from '@angular/router';
// import {LeftNavComponent} from '../common/leftnav/leftnav.component';
import {ZEE_NAV_COLUMNS} from '../projects/project_leftnav.data';
// import {ROUTES_RELEASE_SETUP} from './release_setup.routes';
import {ZephyrStore} from '../../../store/zephyr.store';
import {ReleaseAction} from '../../../actions/release.action';

declare var window: any;

@Component({
  selector: 'release-setup',
  templateUrl: 'release_setup.html',
  viewProviders : [ReleaseAction],
  changeDetection: ChangeDetectionStrategy.OnPush
})
//@Routes(ROUTES_RELEASE_SETUP)

export class ReleaseSetupComponent {
    error: boolean = false;
    public zephyrStore;
    navColumns;
    releases: any;
    hideSubHeader;
    constructor(public router: Router , private _releaseAction : ReleaseAction, private cdr: ChangeDetectorRef) {
        this.navColumns = ZEE_NAV_COLUMNS;
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.fetchingAllReleases();
        this.hideSubHeader = this.isCurrentRelease();
        this.zephyrStore.subscribe((x) => {
            let state = this.zephyrStore.getState();
            let releases = state.release.releases;
            this.setReleasesDropdown(releases);
        });
    }

    fetchingAllReleases () {
      this.zephyrStore.dispatch(this._releaseAction.fetchAllReleases());
    }

    navigateToProject(ev) {
        if(this.navColumns.header.link.length) {
            this.router.navigateByUrl(this.navColumns.header.link);
        }
    }

    setReleasesDropdown(releases) {
      releases = releases.filter(function(release) {
          return !release.status;
      });
      this.releases = releases.map((obj) => {
          return {id: obj.id, text: obj.name};
      });
      this.navColumns.releases = this.releases;
      if(this.cdr) { this.cdr.markForCheck(); }
    }

    isCurrentRelease() {
      let currentRelease = localStorage.getItem(`${window.tab}-currentRelease`);
      try {
        let release = JSON.parse(currentRelease);
        return release.hasOwnProperty('id') && release.id ? false : true;
      } catch (err) {
        return true;
      }

    }
}
