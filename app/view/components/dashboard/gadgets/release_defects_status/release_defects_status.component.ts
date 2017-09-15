import { ProjectTeamComponent } from '../../../projects/project_team.component';
import {ElementRef, OnDestroy, Component, AfterViewInit, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {REFRESH_RATE_MAPPINGS} from '../constants/constants';
import {RELEASE_SUMMARIES} from '../../../../../mocks/releases.mock';
import {ReleaseAction} from '../../../../../actions/release.action';
import {ProjectAction} from '../../../../../actions/project.action';
import {GadgetInterface} from '../gadgets.interface';
import {DefectsAction} from '../../../../../actions/defects.action';
import {GET_GADGET_DATA_SUCCESS} from '../../../../../utils/constants/action.events';
import {GadgetClass} from '../gadget.class';

declare var $, _;
import {getGadgetComponentByName} from '../../dashboard_gadget_components.util';
// Constants
import {I18N_MESSAGES} from '../../../../../utils/messages/messages.en';
import {
  FETCH_ALL_DASHBOARDS_SUCCESS, FETCH_RELEASE_SUMMARIES_SUCCESS,
  FETCH_RELEASES_SUCCESS, FETCH_GADGET_DATA_SUCCESS
} from '../../../../../utils/constants/action.events';

import {
  FETCH_DEFECT_SUMMARIES_SUCCESS
} from '../../../../../utils/constants/action.types';

import {DASHBOARD_PREDEFINED_GADGETS, DASHBOARD_GADGET_INITIAL_STATE} from '../../dashboard.constant';
import {GadgetAction} from '../../../../../actions/gadget.action';

@Component({
	selector: 'zui-release-defects-status-gadget',
	templateUrl: 'release_defects_status.html',
  providers: [GadgetAction, DefectsAction]
})

export class ReleaseDefectsStatusGadgetComponent extends GadgetClass implements GadgetInterface, OnDestroy {
    noStatusData = [
      {'status': 'Open', 'defectCount': 0},
      {'status': 'In Progress', 'defectCount': 0},
      {'status': 'Closed', 'defectCount': 0},
    ];

    @Output() saveConfigEmitter: EventEmitter<any> = new EventEmitter();
    public i18nMessages = I18N_MESSAGES;
    private unsubscribe;


    constructor(public router: Router, _releaseAction: ReleaseAction, _gadgetAction: GadgetAction) {
        super(router, _releaseAction, _gadgetAction);

        this.zephyrStore = ZephyrStore.getZephyrStore();
        let state = this.zephyrStore.getState();
        this.setRefreshRates(state);

        this.unsubscribe = this.zephyrStore.subscribe(() => {
            let state = this.zephyrStore.getState();
            let releaseSummaries = _.cloneDeep(state.release.automation);

            this.allReleases = state.release.allReleases;

            if(state.gadget.event === GET_GADGET_DATA_SUCCESS && state.gadget.gadgetId === this._gadgetId && !this.isConfigureMode) {
              this.setDefectsSummary(_.cloneDeep(state.gadget.gadgetData[this._gadgetId]));
              this.zephyrStore.dispatch(this._gadgetAction.clearGadgetEvents(FETCH_GADGET_DATA_SUCCESS, state.gadget.gadgetId));
            }
        });
    }

    ngOnDestroy() {
      super.ngOnDestroy();
      this.unsubscribe();
    }

    setDefectsSummary(defectsSummary) {
        let defects = [];
        let statuses = defectsSummary.statuses || [];
        let totalDefectCount = defectsSummary.totalDefectCount;
        let tempObj = {};

        if (!statuses.length) {
          statuses = _.cloneDeep(this.noStatusData);
        }

        statuses.unshift({
          'status': 'Defects Filed',
          'defectCount': totalDefectCount || 0
        });

        statuses.forEach((status) => {
          tempObj['class'] = 'zee-align-center';
          tempObj['name'] = status.status;
          tempObj['count'] = status.defectCount || 0;
          let projectsPerStatus = status.projectWithDefectCount;

          if (projectsPerStatus && projectsPerStatus.length) {
            tempObj['hoverItems'] = [];
            projectsPerStatus.forEach((project) => {
              tempObj['hoverItems'].push({
                name: project.name,
                count: project.defectCount || 0,
                highlightCount: false
              });
            });
          }

          defects.push(tempObj);
          tempObj = {};
        });

        this.summaries = defects;
    }

    saveConfig() {
      let gadget = super.saveConfig();
      this.saveConfigEmitter.emit(gadget);
    }
}
