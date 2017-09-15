import {Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import {AppComponent} from '../app/app.component';

import {ZephyrStore} from '../../../store/zephyr.store';

// Constants
import {RELEASE_DETAILS_COMPONENT} from './release.constant';
import {RELEASE_SUMMARIES} from '../../../mocks/releases.mock';
import {ReleaseAction} from '../../../actions/release.action';
import {FETCH_RELEASE_SUMMARIES_SUCCESS} from '../../../utils/constants/action.events';

// Declaring AJS as global
declare var AJS: any, _: any, window;

@Component({
	selector: RELEASE_DETAILS_COMPONENT,
	viewProviders: [ReleaseAction],
	templateUrl: 'release_details.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReleaseDetailsComponent implements OnInit, OnDestroy {
    public releaseId: string;
    releaseModel;
    public finalReleaseSummary;
    public originalReleaseSummaries : any;
    _users = [];
    public releases;
    public summaries;
	  public zephyrStore;
    unsubscribe;
    constructor(private route: ActivatedRoute, private _releaseAction: ReleaseAction, public router: Router, private cdr: ChangeDetectorRef, private appComponent: AppComponent) {

		this.zephyrStore = ZephyrStore.getZephyrStore();

		this.unsubscribe = this.zephyrStore.subscribe(() => {
            let state = this.zephyrStore.getState();
            let releases = state.release.releases;
            let releaseSummaries = state.release.summaries;

            this.setReleasesDropdown(releases);
            this.setRelease(releases);

            if(state.release.event === FETCH_RELEASE_SUMMARIES_SUCCESS) {
              this.zephyrStore.dispatch(this._releaseAction.clearReleaseEvent(FETCH_RELEASE_SUMMARIES_SUCCESS));
              this.setReleaseSummaries(releaseSummaries);
            }

            if (!this._users.length && this.originalReleaseSummaries) {
              // this._users = this.zephyrStore.getState().global.users;
              this.setReleaseSummaries(this.originalReleaseSummaries);
            }

            if (state.release.event === 'FETCH_RELEASES_BY_PROJECT_ID_UPDATING_GRID') {
              this.zephyrStore.dispatch(this._releaseAction.clearReleaseEvent(FETCH_RELEASE_SUMMARIES_SUCCESS));
              let thisRelease = releases.filter(item => String(item.id) === String(this.releaseId))[0];
			  let user = state.loggedInUser;
              if(!thisRelease && !Object.keys(user).length) {
                 this.appComponent.displayUnauthorisedPopup();
              }
            }
          	this.cdr.markForCheck();
          });

    }
    setReleasesDropdown(releases) {
        releases = releases.filter(release => !release.status).map(obj => ({id: obj.id, text: obj.name}));

		this.releases = releases.filter(release => this.releaseId != release.id);
    }
    goToRelease(event) {
        this.zephyrStore.dispatch(this._releaseAction.setReleaseId(this.releaseId));
        this.setCurrentReleaseinLocalStorage(event);
        this.router.navigate(['/release', event.id]);
    }
    setRelease(releases) {
        this.releaseModel = releases.filter((release) => {
            return this.releaseId == release.id;
        })[0];
    }
    setCurrentReleaseinLocalStorage(currentRelease) {
      localStorage.setItem(`${window.tab}-currentRelease`, JSON.stringify(currentRelease));
    }

    getCurrentReleaseFromReleases(event) {
        let currentRelease = null;
        this.releases.filter(function(release) {
            if(release.id === event.id) {
                currentRelease = release;
            }
        });
      return currentRelease;
    }

    setReleaseSummaries(releaseSummaries) {
         //We only update as much information as required, and merge it constructively in RELEASE_SUMMARIES.
        this.originalReleaseSummaries = releaseSummaries;

        let requirements = {
            count: releaseSummaries.requirement.mappedRequirementCount + releaseSummaries.requirement.unmappedRequirementCount,
            groups:  [
                {
                    items: [
                        {
                            name: 'Mapped',
                            count: releaseSummaries.requirement.mappedRequirementCount,
                        }, {
                            name: 'Not Mapped',
                            count: releaseSummaries.requirement.unmappedRequirementCount,
                        }
                    ]
                }
            ]
        };

        let testCases = {
            count: 0,
            viewAll: true,
            groups: [{
                name: 'Tags',
                items: []
            }, {
                name: 'Created by',
                items: []
            }]
        };

        let index = -1, flagForTags = false;
        let totalCount = 0;

        this._users = this.zephyrStore.getState().global.users;

        _.forEach(releaseSummaries.testcase, (releaseSummaryDetail) => {
            // if (Object.keys(releaseSummaryDetail).length) {
                index++;
            // }

            _.forEach(releaseSummaryDetail, (count, key) => {
                // if (flagForTags) {
                //     totalCount += count;
                // }

                let name;

                if (index === 0) {
					          name = key;//(key || '').toLowerCase().replace(/^./, match => match.toUpperCase());
                } else {
                    name = _.find(this._users, {'id': parseInt(key)});

                    if (name) {
                        name = name.fullName;
                    }
                }

                testCases.groups[index].items.push({
                    name,
                    count,
                    highlightCount: true
                });

            });

            // flagForTags = true;
        });

        testCases.count = releaseSummaries.testcase.totalTestcaseCount;

        let executionSummary = {
            count: '0',
            groups: [
                {
                    name: 'Test Cycle',
                    items: [

                    ]
                }
            ]
        };

        let defectSummary = {
          count: releaseSummaries.defect.totalDefectCount,
          groups: [{  name: '',
                        items: []
                  }]
           };
           //defect summary details
          releaseSummaries.defect.statuses.forEach(statuses => {
           defectSummary.groups[0].items.push({
              name: statuses.status,
              count: statuses.defectCount,
              highlightCount: false
            });
          });

        totalCount = 0;
        let total = 0;

        // Execution cycle details
		releaseSummaries.execution.cycles.forEach(cycle => {
            totalCount += 1;
            total += cycle.completation;

            executionSummary.groups[0].items.push({
                name: cycle.cycleName,
                count: cycle.completation + '%',
                highlightCount: false
            });
        });

        if (totalCount === 0) {
            executionSummary.count = '0%';
        } else {
            executionSummary.count = (total / releaseSummaries.execution.totalCycleCount).toFixed(2) + '%';
        }

        this.finalReleaseSummary = _.cloneDeep(RELEASE_SUMMARIES);
        _.merge(this.finalReleaseSummary, [requirements, testCases, executionSummary, defectSummary]);
        this.summaries = this.finalReleaseSummary;

        for(let i = 0; i < this.summaries.length; i++) {
            var countPercentString = this.summaries[i].count;
            if (typeof countPercentString === 'string') {
                countPercentString = countPercentString.substring(0, countPercentString.length - 1);

                let countAsNumber = parseFloat(countPercentString);
                this.summaries[i].count = String(countAsNumber.toFixed(2)) + '%';
            }

            if (typeof countPercentString === 'number' && (countPercentString % 1 !== 0)) {
                countPercentString = countPercentString.toFixed(2);
                //countPercentString = countPercentString.toString() + '%';
                this.summaries[i].count = countPercentString;
            }
        }
    }

    getReleaseDetails() {
      let state = this.zephyrStore.getState();
      let user = state.loggedInUser;
      if (Object.keys(user).length) {
        this.zephyrStore.dispatch(this._releaseAction.fetchReleaseById(this.releaseId));
		this.zephyrStore.dispatch(this._releaseAction.fetchReleaseSummaries(this.releaseId, true));
      }
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.releaseId = params['id'];
                this.getReleaseDetails();
            }
        });
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}
