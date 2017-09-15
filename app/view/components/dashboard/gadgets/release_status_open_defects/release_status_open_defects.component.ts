import {
  Component,
  Output, EventEmitter,
  OnDestroy
} from '@angular/core';
import {Router} from '@angular/router';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {REFRESH_RATE_MAPPINGS} from '../constants/constants';
import {RELEASE_SUMMARIES} from '../../../../../mocks/releases.mock';
import {ReleaseAction} from '../../../../../actions/release.action';
import {ProjectAction} from '../../../../../actions/project.action';
import {GadgetInterface} from '../gadgets.interface';
import {FETCH_RELEASE_SUMMARIES_SUCCESS, FETCH_GADGET_DATA_SUCCESS} from '../../../../../utils/constants/action.events';
import {GadgetAction} from '../../../../../actions/gadget.action';
import {DefectsAction} from '../../../../../actions/defects.action';
import {FETCH_OPEN_DEFECT_SUMMARY_SUCCESS} from '../../../../../utils/constants/action.types';
import {OPEN_DEFECT_SUMMARIES} from '../../../../../mocks/defects.mock';
import {GET_GADGET_DATA_SUCCESS} from '../../../../../utils/constants/action.events';
import {GadgetClass} from '../gadget.class';

declare var jQuery, _;
// Constants

@Component({
	selector: 'zui-release-status-open-defects-gadget',
    templateUrl: 'release_status_open_defects.html',
  providers : [GadgetAction, DefectsAction]
})

export class ReleaseStatusOpenDefectsGadgetComponent extends GadgetClass implements GadgetInterface, OnDestroy {

  public config = {
    project: {},
    release: {},
    selectBy: '',
    refreshRate: {}
  };

  @Output() saveConfigEmitter: EventEmitter<any> = new EventEmitter();
  public zephyrStore;

  private unsubscribe;
  //private i18nMessages = I18N_MESSAGES;

  constructor(public router: Router, _releaseAction: ReleaseAction, _gadgetAction: GadgetAction, private _defectsAction: DefectsAction) {
    super(router, _releaseAction, _gadgetAction);

    this.zephyrStore = ZephyrStore.getZephyrStore();

    this.unsubscribe = this.zephyrStore.subscribe(() => {
      let state = this.zephyrStore.getState();

      if(state.gadget.event === GET_GADGET_DATA_SUCCESS && state.gadget.gadgetId === this._gadgetId && !this.isConfigureMode) {
        this.setReleaseSummaries(_.cloneDeep(state.gadget.gadgetData[this._gadgetId]));
        this.zephyrStore.dispatch(this._gadgetAction.clearGadgetEvents(FETCH_GADGET_DATA_SUCCESS, state.gadget.gadgetId));
      }
    });
  }

  setConfig(gadgetId, gadgetDetails) {
    super.setConfig(gadgetId, gadgetDetails, false);

    if (gadgetDetails) {
      if (!_.isEmpty(this.config) && this.config.project) {
        this._getSelectBy();
        this.checkAndRefreshMetrics();
      }
    }
  }

  setReleaseSummaries(openDefectSummary) {
    //if (!_.isEmpty(openDefectSummary)) {
      let _openDefectSummary = {
        count: '0',
        name: 'Open Defects',
        groups: [
          {
            name: '',
            items: [

            ]
          }
        ]
      };

      let totalCount = 0;
      let total = 0;
      if (openDefectSummary == null || _.isEmpty(openDefectSummary) || openDefectSummary.statuses == null) {
        this.summaries = _openDefectSummary;
        return;
      }

      openDefectSummary.statuses[0].priorityServerityDefectCount.forEach(status => {

        _openDefectSummary.groups[0].items.push({
          name: status.fieldName,
          count: status.defectCount,
          highlightCount: false
        });
      });

      _openDefectSummary.groups[0].name = this._getSelectBy();
      _openDefectSummary.count = openDefectSummary.totalDefectCount;

      let finalOpenDefectSummary = _.cloneDeep(OPEN_DEFECT_SUMMARIES);
      _.merge(finalOpenDefectSummary, _openDefectSummary);
      this.summaries = finalOpenDefectSummary;
      this.isConfigureMode = false;
    //}
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.unsubscribe();
  }

  saveConfig() {
    this.config.selectBy = 'priority';//TODO : Temp fix. This gadget will support only priority as of now.
    let gadget = super.saveConfig();
    this.saveConfigEmitter.emit(gadget);
    this._getSelectBy();
    //this.zephyrStore.dispatch(this._gadgetAction.fetchReleaseSummaries(this.config.release['id'], this._gadgetId));
    // this.refreshMetrics();
  }

  _getSelectBy() {
    if(this.config.selectBy)
      return this.config.selectBy === 'select-by-severity' ? 'severity' : 'priority';

    return null;
  }

  selectRadio(ev) {
    if ('open' === ev.type) {
      //jQuery(ev.target).closest('label').siblings('input').prop('checked', true);
      jQuery(ev.target).parent().siblings('input').prop('checked',true);
      this.config.selectBy = jQuery(ev.target).parent().siblings('input')[0]['id'];
    }
  }
}
