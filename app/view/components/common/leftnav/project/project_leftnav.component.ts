import {Component, Input, Output, EventEmitter, AfterViewInit, ElementRef, Inject, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {UserAction} from '../../../../../actions/user.action';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {PROJECT_SETUP_APPLICATION_ID , RESOURCE_MANAGEMENT_APPLICATION_ID} from '../../../admin/customizations/customizations.constant';
import {LeftnavAction} from '../../../../../actions/leftnav.action';

declare var jQuery: any, _: any, window:any;

@Component({
	selector: 'zui-project-left-nav',
	templateUrl: 'project_leftnav.html',
	providers: [LeftnavAction],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectLeftNavComponent implements AfterViewInit, OnDestroy {
    @Input() activeItemKey = '';
    @Input() hideSubHeader;
    @Output() onHeaderLinkClick: EventEmitter<any> = new EventEmitter();
    zephyrStore;
    selectedEntity = {};
    selectedNestedEntity = {};
    currentRelease;
    currentProject = {};
    unsubscribe;
    column = {
        header: {},
        subHeader: {
            items: [],
            id: null,
            name: '',
            lastVisitedItems: []
        },
        group: []
    };
    releases = [];
    private releaseId;
    constructor(private route: ActivatedRoute, private _userAction: UserAction,
    	public router: Router, private _leftnavAction: LeftnavAction, private cdr: ChangeDetectorRef) {
	    this.zephyrStore = ZephyrStore.getZephyrStore();
      this.unsubscribe = this.zephyrStore.subscribe(() => {
          let _state = this.zephyrStore.getState();
          let _releases = _state.release.releases;
          this.column = _state.leftnav.project; // Set the project leftnav column
          if(_state.leftnav.event == 'FETCH_LEFT_NAV_DATA_SUCCESS' && _releases.length) {
              this.zephyrStore.dispatch(this._leftnavAction.setLeftNavReleaseDetails('project', this.releases));
          }
          let currRel = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`));
		  if (currRel && currRel.hasOwnProperty('id')) {
			this.releaseId = this.releaseId || currRel.id;
			this.setReleaseDetails(_releases);
			this.setCurrentReleaseDetails(_releases, this.releaseId);
		  }
          if(_state.loggedInUser.event == 'LOGGEDIN_USER_PERMISSIONS_SUCCESS') {
            this.zephyrStore.dispatch(this._userAction.clearUserEvent());
            this.zephyrStore.dispatch(this._leftnavAction.setLeftNavPermissions('project'));
          }
          this.setProjectDetails(_state);
          this.handleHiddenReleases();
          if(this.cdr) {
            if(this.cdr) { this.cdr.markForCheck(); }
          }
      });
    }
    handleHiddenReleases() {
        let curRelease = this.getCurrentReleaseFromLocalStorage();
        let navigateRelease = false;
        let newRelease;
        if(curRelease) {
          this.releases.forEach(release => {
            if (curRelease.id == release.id && release.status) {
              navigateRelease = true;
            } else if(!release.status) {
              newRelease = release;
            }
          });
        }
        if(navigateRelease && newRelease) {
          let curRel = {'id': newRelease.id, 'text': newRelease.name};
          this.setCurrentReleaseinLocalStorage(curRel);
          jQuery('.modal-backdrop').remove();
          this.router.navigate(['/release', newRelease.id]);
        } else if(navigateRelease && !newRelease && curRelease) {
            jQuery('.modal-backdrop').remove();
            this.router.navigate(['/project', curRelease.projectId]);
        }
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    ngAfterViewInit() {
          let parentEntity, currentEntity;
          if(this.activeItemKey && this.column.group) {
            parentEntity = this.findObject(this.column.group, this.activeItemKey) || {};
            currentEntity = parentEntity.items ? this.findObject(parentEntity.items, this.activeItemKey) : {};
          } else if(this.column && this.column.group) {
            parentEntity = this.findObjectFromLocation(this.column.group) || {};
            currentEntity = parentEntity.items ? this.findObjectFromLocation(parentEntity.items) : {};
          }
          this.selectedEntity = parentEntity;
          this.selectedNestedEntity = currentEntity;
          this.route.params.subscribe(params => {
            let currReleaseId;

            if(window.location.pathname.indexOf('phase') > 0) {
              let release = this.getCurrentReleaseFromLocalStorage();
              currReleaseId =  release.id;
            } else {
              currReleaseId =  params['id'];
            }
          this.setCurrentRelease(currReleaseId);
          this.releaseId = currReleaseId;
              if(this.column && this.currentRelease) {
                this.onReleaseChange(this.currentRelease);
              }

              // this.column.releases = this.column.releases || JSON.parse(localStorage.getItem('releases'));

            });
          this.zephyrStore.dispatch(this._leftnavAction.fetchLeftNavDetails('project', this.releases));
    }
    navigateToLink(ev) {
        if(ev.link) {
          this.currentRelease = this.getCurrentReleaseFromLocalStorage() || {id: 1};
          this.router.navigateByUrl(ev.link + (this.currentRelease.id ? this.currentRelease.id : this.currentRelease[0].id));
        }
    }
    navigateToProject(ev) {
        if(this.column.header['link'].length) {
            this.router.navigateByUrl(this.column.header['link']);
        }
    }
    getCurrentReleaseFromReleases(event) {
      let currentRelease = null;
      this.column.subHeader.items.forEach(release => {
        if(release.id === event.id) {
          currentRelease = release;
        }
      });
      return currentRelease;
    }
    goToRelease(event) {
      jQuery('#custom-backdrop').removeClass('backdrop-show');
      this.currentRelease = this.getCurrentReleaseFromReleases(event);
      this.setCurrentReleaseinLocalStorage(event);
      jQuery('#project-release-dropdown').removeClass('open');
      this.router.navigate(['/release', event.id]);
    }
    onReleaseChange(currRelease) {
      let releases = JSON.parse(localStorage.getItem('releases')) || this.column.subHeader.items;
      releases = releases.filter(project => currRelease.id !== project.id);
      releases.unshift(currRelease);
      localStorage.setItem('releases', JSON.stringify(releases));
    }
    setProjectDetails(state) {
      let state1 = this.zephyrStore.getState();
      let user = state1.loggedInUser;
      if (Object.keys(user).length){

        if(state.project.id && !(_.isEqual(state.project, this.currentProject))) {
          this.currentProject = state.project;
          this.zephyrStore.dispatch(this._leftnavAction.setProjectDetails('project', state.project, this.activeItemKey));
        }
      }
    }
    setCurrentRelease(id) {
        let _release = this.getCurrentReleaseFromLocalStorage();
        if(_release) {
            this.column.subHeader.name = _release.text;
            this.column.subHeader.id = _release.id;
        } else {
			let _state = this.zephyrStore.getState();
			if (_state) {
				let relObs = Observable.of(_state.release.releases);
				relObs.subscribe(x => {
					let releases = Array.isArray(_state.release.releases) ? _state.release.releases : [];
					this.setCurrentReleaseDetails(releases, id);
				});
			}
		}
    }
    setCurrentReleaseinLocalStorage(currentRelease) {
      localStorage.setItem(`${window.tab}-currentRelease`, JSON.stringify(currentRelease));
    }
    getCurrentReleaseFromLocalStorage() {
        try {
            return JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`));
        } catch(e) {
            return null;
        }
    }
	setCurrentReleaseDetails(releases, id) {
		let release = releases.filter(item => id && String(item.id || '') === String(id || ''))[0] || {'id': id, 'name': 'Untitled'};

		this.column.subHeader.name = release.name;
		this.column.subHeader.id = release.id;
		let curRel = {'id': release.id, 'text': release.name};
		if (!_.isEqual(this.getCurrentReleaseFromLocalStorage(), curRel)) {
			this.setCurrentReleaseinLocalStorage(curRel);
		}
	}
    setReleaseDetails(releases) {

        if(_.isEqual(this.releases, releases)) {
            return;
        }

		let allReleases = [];

		this.releases = _.cloneDeep(releases);
        this.releases.forEach(release => {
          if (!release.status) {
            allReleases.push({
              id: release.id,
              text: release.name
            });
          }
        });

        this.filterReleases(allReleases);
		this.zephyrStore.dispatch(this._userAction.setReleasesAction());
    }
    filterReleases(allReleases) {
      let releasesInLocalStorage = JSON.parse(localStorage.getItem('releases'));

      if(allReleases && allReleases.length) {
        localStorage.setItem('releases', JSON.stringify(allReleases));
        releasesInLocalStorage = _.cloneDeep(allReleases);
      }

      if(releasesInLocalStorage !== null) {
          this.column.subHeader.lastVisitedItems = releasesInLocalStorage.slice(0, 5);

        // extracting last five visited release ids
        let lastFiveVisitedReleaseIds = this.column.subHeader.lastVisitedItems.map(release => release.id);

		let remainingReleases = [];
        if(allReleases && allReleases.length) {
          // filtering out remaining releases after showing last five visited
          allReleases.forEach(release => {
            if(lastFiveVisitedReleaseIds.indexOf(release.id) === -1) {
              remainingReleases.push(release);
            }
          });
        }

        // extracting id and name for remaining releases to be put in autocomplete
        this.column.subHeader.items = remainingReleases.map(obj => ({id: obj.id, text: obj.text}));
      }

    }
    findObject(list, entity) {
      let parent, matchObj;
      let match = JSON.parse(JSON.stringify(list));
      match = match.filter(entry => (entry.items && entry.items.length) ? this.findObject(entry.items, entity) : entry.key.toLowerCase().indexOf(entity) > -1)[0];
      return match;
    }

    findObjectFromLocation(list) {
      let match = JSON.parse(JSON.stringify(list));
      let currentReleaseId = '';
      let _release = this.getCurrentReleaseFromLocalStorage();

      if(_release) {
        currentReleaseId = _release.id;
      }

      match = match.filter(entry => (entry.items && entry.items.length) ? this.findObjectFromLocation(entry.items) : (window.location.pathname).indexOf(entry.link + currentReleaseId) > -1)[0];
      return match;
    }
}
