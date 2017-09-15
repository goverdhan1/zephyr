import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {ZephyrStore} from '../../../store/zephyr.store';
import {TestCaseEASCycleComponent} from '../testcase-eas/cycle/testcase-eas-cycle.component';
// Constants
import {RELEASE_COMPONENT} from './release.constant';
import {ZEE_NAV_COLUMNS} from '../projects/project_leftnav.data';

import {RELEASE_SETUP_APPLICATION_ID} from '../admin/customizations/customizations.constant';

declare var _, window;

@Component({
	selector: RELEASE_COMPONENT,
	templateUrl: 'release_summary.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReleaseComponent implements OnInit {
	id: string;
	title: string;
	category: string;
    public navColumns;
    public releases;
    zephyrStore;
    releaseModel;
    releaseId;
    ifReleaseSetupPermitted: boolean = false;
	constructor(private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) {
        this.route.params.subscribe(params => {
            this.releaseId = params['id'];
        });
        this.navColumns = ZEE_NAV_COLUMNS;
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.isReleaseSetupPermit();
        this.zephyrStore.subscribe(() => {
            this.setLeftNavData(this.zephyrStore.getState());
            this.releases = this.zephyrStore.getState().release.releases;
            this.setRelease(this.releases);
            this.setReleasesDropdown(this.releases);
            if(this.cdr) { this.cdr.markForCheck(); }
            this.isReleaseSetupPermit();
		});
	}
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.navColumns.currentRelease = this.getCurrentRelease();
        });
    }
    setLeftNavData(state) {
        if(state.project.id) {
            this.navColumns.header.title = state.project.name;
            this.navColumns.header.subtitle = state.project.description;
            this.navColumns.header.link = `/project/${state.project.id}`;
            this.navColumns.header.isSelected = false;
            _.filter(this.navColumns.group.items, (item) => {
                if(item.key == 'release-setup') {
                    item.isActive = true;
                } else {
                    item.isActive = false;
                }
            });
        }
    }
    setRelease(releases) {
        this.releaseModel = releases.filter((release) => {
            return this.releaseId == release.id;
        })[0];
    }
    navigateToProject(ev) {
        if(this.navColumns.header.link.length) {
            this.router.navigateByUrl(this.navColumns.header.link);
        }
    }
    navigateToreleaseSetup () {
        this.router.navigateByUrl('/release_setup/details');
    }
    setReleasesDropdown(releases) {
        releases = releases.filter(function(release) {
            return !release.status;
        });
        this.releases = releases.map((obj) => {
            return {id: obj.id, text: obj.name};
        });
        this.navColumns.releases = this.releases;
    }
    getCurrentRelease() {
        return JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`));
    }
    isReleaseSetupPermit () {
    let permissions = this.zephyrStore.getState().loggedInUser.permissions;
    let isPermission = false;
    if (permissions) {
        _.each(permissions, (_app) => {
            if (RELEASE_SETUP_APPLICATION_ID == _app.applicationName) {
                isPermission = true;
                return -1;
            }
        });
    }
    this.ifReleaseSetupPermitted = isPermission;
    }
}
