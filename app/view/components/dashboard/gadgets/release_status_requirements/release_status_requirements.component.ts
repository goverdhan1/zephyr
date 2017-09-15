import { ProjectTeamComponent } from '../../../projects/project_team.component';
import {ElementRef, OnDestroy, Component, AfterViewInit, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {REFRESH_RATE_MAPPINGS} from '../constants/constants';
import {RELEASE_SUMMARIES} from '../../../../../mocks/releases.mock';
import {ReleaseAction} from '../../../../../actions/release.action';
import {ProjectAction} from '../../../../../actions/project.action';
import {GadgetInterface} from '../gadgets.interface';
declare var $, _;
import {getGadgetComponentByName} from '../../dashboard_gadget_components.util';
// Constants
import {I18N_MESSAGES} from '../../../../../utils/messages/messages.en';
import {
  FETCH_ALL_DASHBOARDS_SUCCESS, FETCH_RELEASE_SUMMARIES_SUCCESS,
  FETCH_RELEASES_SUCCESS, FETCH_GADGET_DATA_SUCCESS
} from '../../../../../utils/constants/action.events';
import {DASHBOARD_PREDEFINED_GADGETS, DASHBOARD_GADGET_INITIAL_STATE} from '../../dashboard.constant';
import {GadgetAction} from '../../../../../actions/gadget.action';
import {GET_GADGET_DATA_SUCCESS} from '../../../../../utils/constants/action.events';
import {GadgetClass} from '../gadget.class';

@Component({
	selector: 'zui-release-status-gadget',
	templateUrl: 'release_status_requirements.html',
  providers: [GadgetAction]
})

export class ReleaseStatusRequirementsGadgetComponent extends GadgetClass implements GadgetInterface, OnDestroy {
  unsubscribe;
  @Output() saveConfigEmitter: EventEmitter<any> = new EventEmitter();

  constructor(public router: Router, _releaseAction: ReleaseAction, _gadgetAction: GadgetAction) {
        super(router, _releaseAction, _gadgetAction);

        this.zephyrStore = ZephyrStore.getZephyrStore();

        this.zephyrStore.dispatch(this._releaseAction.fetchAllReleases());

        this.unsubscribe = this.zephyrStore.subscribe(() => {
            let state = this.zephyrStore.getState();

            if(state.gadget.event === GET_GADGET_DATA_SUCCESS && state.gadget.gadgetId === this._gadgetId && !this.isConfigureMode) {
              this.setReleaseSummaries(_.cloneDeep(state.gadget.gadgetData[this._gadgetId]));
              this.zephyrStore.dispatch(this._gadgetAction.clearGadgetEvents(FETCH_GADGET_DATA_SUCCESS, state.gadget.gadgetId));
            }
        });
    }

    ngOnDestroy() {
      super.ngOnDestroy();
      this.unsubscribe();
    }

    setReleaseSummaries(releaseSummaries) {
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

        let finalReleaseSummary = _.cloneDeep(RELEASE_SUMMARIES[0]);
        _.merge(finalReleaseSummary, requirements);
        this.summaries = finalReleaseSummary;
        this.isConfigureMode = false;
    }

    saveConfig() {
      let gadget = super.saveConfig();
      this.saveConfigEmitter.emit(gadget);
    }
}
