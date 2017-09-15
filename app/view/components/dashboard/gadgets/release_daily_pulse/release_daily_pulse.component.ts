import { ProjectTeamComponent } from '../../../projects/project_team.component';
import {ElementRef, OnDestroy, Component, AfterViewInit, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {TRACK_PULSE_BY, TRACK_PULSE_BY_OBJ, DATE_RANGES, PULSE_COLOR, TRACK_PULSE_BY_ORDER, TRACK_PULSE_BY_ORDER_KEY} from '../constants/constants';
import {RELEASE_SUMMARIES} from '../../../../../mocks/releases.mock';
import {ReleaseAction} from '../../../../../actions/release.action';
import {ProjectAction} from '../../../../../actions/project.action';
import {GadgetInterface} from '../gadgets.interface';
import {DefectsAction} from '../../../../../actions/defects.action';
import {GET_GADGET_DATA_SUCCESS} from '../../../../../utils/constants/action.events';
import {GadgetClass} from '../gadget.class';

declare var $, _, moment;
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
//
// var testData = [{
//   'date': 1388514600000,
//   'testcaseCount': 51,
//   'executionCount': 9,
//   'defectCount': 1
// }, {
//   'date': 1388601000000,
//   'testcaseCount': 67,
//   'executionCount': 32,
//   'defectCount': 13
// }];
// {
//   'date': 1388687400000,
//   'testcaseCount': 0,
//   'executionCount': 30,
//   'defectCount': 0
// },{
//   'date': 1388773800000,
//   'testcaseCount': 0,
//   'executionCount': 36,
//   'defectCount': 72
// }, {
//   'date': 1388860200000,
//   'testcaseCount': 16,
//   'executionCount': 0,
//   'defectCount': 256
// }, {
//   'date': 1388946600000,
//   'testcaseCount': 16,
//   'executionCount': 45,
//   'defectCount': 192
// }, {
//   'date': 1389033000000,
//   'testcaseCount': 16,
//   'executionCount': 60,
//   'defectCount': 36
// }, {
//   'date': 1389119400000,
//   'testcaseCount': 12,
//   'executionCount': 18,
//   'defectCount': 0
// }, {
//   'date': 1389205800000,
//   'testcaseCount': 3,
//   'executionCount': 60,
//   'defectCount': 258
// }, {
//   'date': 1389292200000,
//   'testcaseCount': 6,
//   'executionCount': 36,
//   'defectCount': 72
// }, {
//   'date': 1389378600000,
//   'testcaseCount': 24,
//   'executionCount': 60,
//   'defectCount': 0
// }, {
//   'date': 1389465000000,
//   'testcaseCount': 32,
//   'executionCount': 60,
//   'defectCount': 0
// }, {
//   'date': 1389551400000,
//   'testcaseCount': 24,
//   'executionCount': 36,
//   'defectCount': 96
// }, {
//   'date': 1389637800000,
//   'testcaseCount': 4,
//   'executionCount': 60,
//   'defectCount': 96
// }, {
//   'date': 1389724200000,
//   'testcaseCount': 0,
//   'executionCount': 30,
//   'defectCount': 36
// }, {
//   'date': 1389810600000,
//   'testcaseCount': 3,
//   'executionCount': 12,
//   'defectCount': 0
// }, {
//   'date': 1389897000000,
//   'testcaseCount': 12,
//   'executionCount': 24,
//   'defectCount': 144
// }, {
//   'date': 1389983400000,
//   'testcaseCount': 24,
//   'executionCount': 0,
//   'defectCount': 0
// }, {
//   'date': 1390069800000,
//   'testcaseCount': 3,
//   'executionCount': 36,
//   'defectCount': 96
// }, {
//   'date': 1390156200000,
//   'testcaseCount': 4,
//   'executionCount': 90,
//   'defectCount': 172
// }, {
//   'date': 1390242600000,
//   'testcaseCount': 12,
//   'executionCount': 60,
//   'defectCount': 384
// }, {
//   'date': 1390329000000,
//   'testcaseCount': 24,
//   'executionCount': 60,
//   'defectCount': 96
// }, {
//   'date': 1390415400000,
//   'testcaseCount': 24,
//   'executionCount': 90,
//   'defectCount': 36
// }, {
//   'date': 1390501800000,
//   'testcaseCount': 24,
//   'executionCount': 36,
//   'defectCount': 144
// }, {
//   'date': 1390588200000,
//   'testcaseCount': 0,
//   'executionCount': 0,
//   'defectCount': 72
// }, {
//   'date': 1390674600000,
//   'testcaseCount': 9,
//   'executionCount': 90,
//   'defectCount': 129
// }, {
//   'date': 1390761000000,
//   'testcaseCount': 0,
//   'executionCount': 30,
//   'defectCount': 172
// }, {
//   'date': 1390847400000,
//   'testcaseCount': 18,
//   'executionCount': 24,
//   'defectCount': 384
// }, {
//   'date': 1390933800000,
//   'testcaseCount': 24,
//   'executionCount': 45,
//   'defectCount': 256
// }, {
//   'date': 1391020200000,
//   'testcaseCount': 48,
//   'executionCount': 30,
//   'defectCount': 258
// }, {
//   'date': 1391106600000,
//   'testcaseCount': 18,
//   'executionCount': 60,
//   'defectCount': 72
// }, {
//   'date': 1391193000000,
//   'testcaseCount': 9,
//   'executionCount': 60,
//   'defectCount': 0
// }, {
//   'date': 1391279400000,
//   'testcaseCount': 48,
//   'executionCount': 90,
//   'defectCount': 192
// }, {
//   'date': 1391365800000,
//   'testcaseCount': 12,
//   'executionCount': 24,
//   'defectCount': 384
// }, {
//   'date': 1391452200000,
//   'testcaseCount': 3,
//   'executionCount': 60,
//   'defectCount': 0
// }, {
//   'date': 1391538600000,
//   'testcaseCount': 9,
//   'executionCount': 18,
//   'defectCount': 144
// }, {
//   'date': 1391625000000,
//   'testcaseCount': 0,
//   'executionCount': 40,
//   'defectCount': 192
// }, {
//   'date': 1391711400000,
//   'testcaseCount': 24,
//   'executionCount': 24,
//   'defectCount': 144
// }, {
//   'date': 1391797800000,
//   'testcaseCount': 3,
//   'executionCount': 18,
//   'defectCount': 172
// }, {
//   'date': 1391884200000,
//   'testcaseCount': 16,
//   'executionCount': 9,
//   'defectCount': 144
// }, {
//   'date': 1391970600000,
//   'testcaseCount': 24,
//   'executionCount': 18,
//   'defectCount': 0
// }, {
//   'date': 1392057000000,
//   'testcaseCount': 18,
//   'executionCount': 36,
//   'defectCount': 384
// }, {
//   'date': 1392143400000,
//   'testcaseCount': 48,
//   'executionCount': 36,
//   'defectCount': 96
// }, {
//   'date': 1392229800000,
//   'testcaseCount': 4,
//   'executionCount': 60,
//   'defectCount': 258
// }, {
//   'date': 1392316200000,
//   'testcaseCount': 0,
//   'executionCount': 90,
//   'defectCount': 144
// }, {
//   'date': 1392402600000,
//   'testcaseCount': 12,
//   'executionCount': 36,
//   'defectCount': 192
// }, {
//   'date': 1392489000000,
//   'testcaseCount': 0,
//   'executionCount': 0,
//   'defectCount': 256
// }, {
//   'date': 1392575400000,
//   'testcaseCount': 16,
//   'executionCount': 60,
//   'defectCount': 256
// }, {
//   'date': 1392661800000,
//   'testcaseCount': 12,
//   'executionCount': 60,
//   'defectCount': 96
// }, {
//   'date': 1392748200000,
//   'testcaseCount': 12,
//   'executionCount': 36,
//   'defectCount': 96
// }, {
//   'date': 1392834600000,
//   'testcaseCount': 9,
//   'executionCount': 45,
//   'defectCount': 48
// }, {
//   'date': 1392921000000,
//   'testcaseCount': 24,
//   'executionCount': 0,
//   'defectCount': 384
// }, {
//   'date': 1393007400000,
//   'testcaseCount': 0,
//   'executionCount': 30,
//   'defectCount': 48
// }, {
//   'date': 1393093800000,
//   'testcaseCount': 24,
//   'executionCount': 0,
//   'defectCount': 129
// }, {
//   'date': 1393180200000,
//   'testcaseCount': 18,
//   'executionCount': 40,
//   'defectCount': 0
// }, {
//   'date': 1393266600000,
//   'testcaseCount': 18,
//   'executionCount': 36,
//   'defectCount': 129
// }, {
//   'date': 1393353000000,
//   'testcaseCount': 0,
//   'executionCount': 0,
//   'defectCount': 72
// }, {
//   'date': 1393439400000,
//   'testcaseCount': 24,
//   'executionCount': 40,
//   'defectCount': 72
// }, {
//   'date': 1393525800000,
//   'testcaseCount': 24,
//   'executionCount': 0,
//   'defectCount': 0
// }, {
//   'date': 1393612200000,
//   'testcaseCount': 0,
//   'executionCount': 0,
//   'defectCount': 172
// }, {
//   'date': 1393698600000,
//   'testcaseCount': 0,
//   'executionCount': 18,
//   'defectCount': 0
// }, {
//   'date': 1393785000000,
//   'testcaseCount': 48,
//   'executionCount': 60,
//   'defectCount': 192
// }, {
//   'date': 1393871400000,
//   'testcaseCount': 24,
//   'executionCount': 0,
//   'defectCount': 192
// }, {
//   'date': 1393957800000,
//   'testcaseCount': 9,
//   'executionCount': 18,
//   'defectCount': 144
// }, {
//   'date': 1394044200000,
//   'testcaseCount': 9,
//   'executionCount': 0,
//   'defectCount': 144
// }, {
//   'date': 1394130600000,
//   'testcaseCount': 0,
//   'executionCount': 36,
//   'defectCount': 129
// }, {
//   'date': 1394217000000,
//   'testcaseCount': 16,
//   'executionCount': 90,
//   'defectCount': 72
// }, {
//   'date': 1394303400000,
//   'testcaseCount': 24,
//   'executionCount': 0,
//   'defectCount': 36
// }, {
//   'date': 1394389800000,
//   'testcaseCount': 6,
//   'executionCount': 40,
//   'defectCount': 192
// }, {
//   'date': 1394476200000,
//   'testcaseCount': 18,
//   'executionCount': 9,
//   'defectCount': 72
// }, {
//   'date': 1394562600000,
//   'testcaseCount': 0,
//   'executionCount': 40,
//   'defectCount': 384
// }, {
//   'date': 1394649000000,
//   'testcaseCount': 0,
//   'executionCount': 24,
//   'defectCount': 0
// }, {
//   'date': 1394735400000,
//   'testcaseCount': 0,
//   'executionCount': 90,
//   'defectCount': 384
// }, {
//   'date': 1394821800000,
//   'testcaseCount': 16,
//   'executionCount': 60,
//   'defectCount': 72
// }, {
//   'date': 1394908200000,
//   'testcaseCount': 0,
//   'executionCount': 18,
//   'defectCount': 72
// }, {
//   'date': 1394994600000,
//   'testcaseCount': 48,
//   'executionCount': 0,
//   'defectCount': 72
// }, {
//   'date': 1395081000000,
//   'testcaseCount': 9,
//   'executionCount': 0,
//   'defectCount': 48
// }, {
//   'date': 1395167400000,
//   'testcaseCount': 24,
//   'executionCount': 36,
//   'defectCount': 0
// }, {
//   'date': 1395253800000,
//   'testcaseCount': 6,
//   'executionCount': 18,
//   'defectCount': 0
// }, {
//   'date': 1395340200000,
//   'testcaseCount': 12,
//   'executionCount': 18,
//   'defectCount': 36
// }, {
//   'date': 1395426600000,
//   'testcaseCount': 12,
//   'executionCount': 40,
//   'defectCount': 48
// }, {
//   'date': 1395513000000,
//   'testcaseCount': 6,
//   'executionCount': 18,
//   'defectCount': 129
// }, {
//   'date': 1395599400000,
//   'testcaseCount': 32,
//   'executionCount': 60,
//   'defectCount': 144
// }, {
//   'date': 1395685800000,
//   'testcaseCount': 32,
//   'executionCount': 0,
//   'defectCount': 256
// }, {
//   'date': 1395772200000,
//   'testcaseCount': 16,
//   'executionCount': 12,
//   'defectCount': 258
// }, {
//   'date': 1395858600000,
//   'testcaseCount': 0,
//   'executionCount': 36,
//   'defectCount': 0
// }, {
//   'date': 1395945000000,
//   'testcaseCount': 0,
//   'executionCount': 18,
//   'defectCount': 144
// }, {
//   'date': 1396031400000,
//   'testcaseCount': 0,
//   'executionCount': 40,
//   'defectCount': 384
// }, {
//   'date': 1396117800000,
//   'testcaseCount': 6,
//   'executionCount': 18,
//   'defectCount': 36
// }, {
//   'date': 1396204200000,
//   'testcaseCount': 16,
//   'executionCount': 18,
//   'defectCount': 72
// }, {
//   'date': 1396290600000,
//   'testcaseCount': 24,
//   'executionCount': 36,
//   'defectCount': 384
// }, {
//   'date': 1396377000000,
//   'testcaseCount': 24,
//   'executionCount': 18,
//   'defectCount': 36
// }, {
//   'date': 1396463400000,
//   'testcaseCount': 0,
//   'executionCount': 40,
//   'defectCount': 48
// }, {
//   'date': 1396549800000,
//   'testcaseCount': 3,
//   'executionCount': 90,
//   'defectCount': 258
// }, {
//   'date': 1396636200000,
//   'testcaseCount': 6,
//   'executionCount': 18,
//   'defectCount': 0
// }, {
//   'date': 1396722600000,
//   'testcaseCount': 24,
//   'executionCount': 36,
//   'defectCount': 0
// }, {
//   'date': 1396809000000,
//   'testcaseCount': 12,
//   'executionCount': 9,
//   'defectCount': 384
// }, {
//   'date': 1396895400000,
//   'testcaseCount': 16,
//   'executionCount': 36,
//   'defectCount': 258
// }, {
//   'date': 1396981800000,
//   'testcaseCount': 6,
//   'executionCount': 0,
//   'defectCount': 72
// }, {
//   'date': 1397068200000,
//   'testcaseCount': 3,
//   'executionCount': 40,
//   'defectCount': 0
// }
// ];

@Component({
	selector: 'zui-release-daily-plus-gadget',
	templateUrl: 'release_daily_pulse.html',
  providers: [GadgetAction, DefectsAction]
})

export class ReleaseDailyPulseComponent extends GadgetClass implements GadgetInterface, OnDestroy {
    @Output() saveConfigEmitter: EventEmitter<any> = new EventEmitter();
    columnColors = PULSE_COLOR;

    additionalConfig = {
      selectedStartDate : new Date(),
      selectedStringStartDate : '',
      selectedEndDate : new Date(),
      selectedStringEndDate : '',
      selectedDateRange : [6],
      selectedPulseOptions : ['testcaseCount', 'executionCount', 'defectCount']
    };

    summary = [

    ];

    showStartDatePicker = false;
    showEndDatePicker = false;

    trackByOptions = TRACK_PULSE_BY;
    trackByOptionsObj = TRACK_PULSE_BY_OBJ;
    dateRanges = DATE_RANGES;

    data = [];

    dataKeys = [];

    timeKey = 'displayDate';

    public config : any = {
      project: '',
      release: '',
      refreshRate: '',
      fromDate : 0,
      toDate : 0,
      track: [

      ]
    };
    public i18nMessages = I18N_MESSAGES;
    private width = 500;

    private minHeight = 200;
    private maxHeight = 400;
    private eachBarWidth = 40;

    private unsubscribe;


    constructor(private elementRef : ElementRef, public router: Router, _releaseAction: ReleaseAction, _gadgetAction: GadgetAction) {
      super(router, _releaseAction, _gadgetAction);

      this.zephyrStore = ZephyrStore.getZephyrStore();
      let state = this.zephyrStore.getState();
      this.setRefreshRates(state);

      this.unsubscribe = this.zephyrStore.subscribe(() => {
        let state = this.zephyrStore.getState();
        let releaseSummaries = _.cloneDeep(state.release.automation);

        this.allReleases = state.release.allReleases;

          if(state.gadget.event === GET_GADGET_DATA_SUCCESS && state.gadget.gadgetId === this._gadgetId && !this.isConfigureMode) {
            this.setDailyPulseSummary(_.cloneDeep(state.gadget.gadgetData[this._gadgetId]));
            this.zephyrStore.dispatch(this._gadgetAction.clearGadgetEvents(FETCH_GADGET_DATA_SUCCESS, state.gadget.gadgetId));
          }
      });

      this.additionalConfig.selectedStartDate = moment().add(-6, 'days').toDate();
    }

    ngOnDestroy() {
      super.ngOnDestroy();
      this.unsubscribe();
    }

    setConfig(gadgetId, gadgetDetails) {
      super.setConfig(gadgetId, gadgetDetails, false);

      if (gadgetDetails) {
        if (!_.isEmpty(this.config) && this.config.project) {
          this.additionalConfig.selectedDateRange = (this.config.selectedDateRange ? this.config.selectedDateRange : [7]);
          this.additionalConfig.selectedStartDate = this.config.selectedStartDate;
          if(this.config.selectedStringStartDate) {
            this.additionalConfig.selectedStringStartDate = this.config.selectedStringStartDate;
          }
          if(this.config.selectedStringEndDate) {
            this.additionalConfig.selectedStringEndDate = this.config.selectedStringEndDate;
          }
          this.additionalConfig.selectedPulseOptions = this.config.selectedPulseOptions;

          this.refreshMetrics();
        }
      }
    }


    refreshMetrics() {
      if (!this.hasConfigError) {
        let queryString = {
          'startdate': moment(this.additionalConfig.selectedStartDate).startOf('day').valueOf(),
          'stringStartDate': this.additionalConfig.selectedStringStartDate,
          'enddate': moment(this.additionalConfig.selectedEndDate).startOf('day').valueOf(),
          'stringEndDate': this.additionalConfig.selectedStringEndDate
        };

        this.zephyrStore.dispatch(this._gadgetAction.getGadgetData(this._gadgetId, $.param(queryString)));
      }
    }

    enableSave() {
      let value = this.config && this.config.project && this.config.release;

      if(value) {
        return Boolean(this.additionalConfig.selectedPulseOptions && this.additionalConfig.selectedPulseOptions.length > 0);
      }
      return Boolean(value);
    }

    setChangedDate($event) {
      this.additionalConfig.selectedDateRange = _.cloneDeep($event.dateRange);
      this.additionalConfig.selectedStartDate = _.cloneDeep($event.startDate);
      this.additionalConfig.selectedStringStartDate = moment($event.startDate).format('MM/DD/YYYY');
      this.additionalConfig.selectedEndDate= _.cloneDeep($event.endDate);
      this.additionalConfig.selectedStringEndDate= moment($event.endDate).format('MM/DD/YYYY');
    }

    onDateChange(isStartDate) {
      let diff = moment(this.additionalConfig.selectedStartDate).diff(this.additionalConfig.selectedEndDate, 'days');

      let filteredDateRange = _.filter(this.dateRanges, {id : Math.abs(parseInt(diff)).toString()});

      if (!filteredDateRange.length) {
        this.additionalConfig.selectedDateRange = [0];
      }
    }

    setDailyPulseSummary(defectsSummary) {
      this.data = _.cloneDeep(defectsSummary);

      // this.data = _.cloneDeep(testData);
      this.data = _.sortBy(this.data, 'date');

      this.width = $(this.elementRef.nativeElement).parents('.zui-panel-body').width();

      this.dataKeys = _.cloneDeep(this.additionalConfig.selectedPulseOptions);
      this.trackByOptionsObj = _.pickBy(TRACK_PULSE_BY_OBJ, (value, key) => {
        return this.dataKeys.indexOf(key) !== -1;
      });

      let summary = {

      };

      this.config.selectedPulseOptions = _.sortBy(this.config.selectedPulseOptions, (obj) => {
        return TRACK_PULSE_BY_ORDER_KEY[obj];
      });

      this.config.selectedPulseOptions.forEach((options) => {
        summary[options] = 0;
      });


      this.summary = [];

      this.data.forEach((d) => {
        let tooltip = `<div class="text-center"><strong>${d.displayDate}</strong></div> <hr \>`;

        _.forEach(summary, (value, key) => {
            tooltip += `<div class="row"><div class="col-md-8" style="word-wrap: break-word;">${this.trackByOptionsObj[key]}</div>
              <div class="col-md-4 tip-align">${d[key]}</div> <hr /> </div>`;
        });

        _.forEach(summary, (value, key) => {
            summary[key] = summary[key] + (parseInt(d[key]) ? parseInt(d[key]) : 0);

            if (!d[key]) {
              d[key] = 0;
            }

            d[key + '_tooltip'] = tooltip;
        });
      });

      if (summary['defectCount']) {
        summary['defectCount'] = this.data[this.data.length - 1].defectCount;
      }

      delete summary['date'];

      _.forEach(summary, (value, key) => {
        let keyName = _.filter(this.trackByOptions, {id : key})[0];

        this.summary.push({
          key : keyName.text,
          value
        });
      });

      this.summary = _.sortBy(this.summary, (obj) => {
        return TRACK_PULSE_BY_ORDER[obj.key];
      });

    }

    toggleChart() {
      this.width = $(this.elementRef.nativeElement).parents('.zui-panel-body').width();
    }

    setPulseOptions(values) {
      if (this.additionalConfig.selectedPulseOptions.indexOf(values.id) === -1) {
        this.additionalConfig.selectedPulseOptions.push(values.id);
      }
    }

    saveConfig() {
      let gadget = super.saveConfig();

      gadget.refreshInterval = '1h';
      gadget.properties.config.selectedDateRange = this.additionalConfig.selectedDateRange;
      gadget.properties.config.selectedStartDate = this.additionalConfig.selectedStartDate;
      gadget.properties.config.selectedStringStartDate = this.additionalConfig.selectedStringStartDate;
      gadget.properties.config.selectedEndDate = this.additionalConfig.selectedEndDate;
      gadget.properties.config.selectedStringEndDate = this.additionalConfig.selectedStringEndDate;
      gadget.properties.config.selectedPulseOptions = this.additionalConfig.selectedPulseOptions;

      this.saveConfigEmitter.emit(gadget);
    }
}
