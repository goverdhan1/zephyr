import {Component, Input, Output, EventEmitter, OnDestroy} from '@angular/core';

import {ZephyrStore} from '../../../store/zephyr.store';
import {TestcaseAction} from '../../../actions/testcase.action';

// Constants
import {TESTCASE_TIME} from './testcase.constant';

@Component({
	selector: TESTCASE_TIME,
	templateUrl: 'testcase_time.html'
})
export class TestcaseTimeComponent implements OnDestroy {
    @Input() editable;
	  @Output() updateTestCase: EventEmitter<any> = new EventEmitter();

	  time = {
        estimatedTime: null,
        tooltip: ''
    };

	  action: string = 'zee-expand';

	  zephyrStore;

	  _pipeArgs = ['dd:hh:mm'];

    unsubscribe;

    private _testcase = {
        testcase: {
            id: null
        }
    };

    constructor(private testcaseAction: TestcaseAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();

        this.unsubscribe = this.zephyrStore.subscribe((x) => {
            let _state = this.zephyrStore.getState();
            if(_state && _state.testcase) {
                this.setEstimatedTimeDetails(_state.testcase);
            }
        });
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    setEstimatedTimeDetails(testcase) {
        this._testcase = testcase.testcase;
        this.time = {
            estimatedTime: this._testcase['testcase']['estimatedTime'],
            tooltip: ''
        };

        this.time.tooltip = this.convertSecondsToDuration(this._testcase['testcase']['estimatedTime']);
    }
    saveEstimatedTime(value) {
      this._testcase.testcase['estimatedTime'] = value;
      this.updateTestCase.emit();
    }

    convertSecondsToDuration(value) {
      let day, hour, minute, dayText, minuteText, hourText;

      if (isNaN(value) || value <= 0) {
        day = 0;
        hour = 0;
        minute = 0;
        dayText = '00';
        minuteText = '00';
        hourText = '00';
      } else {
        let seconds = parseInt(value, 10);
        day = 0;
        hour = 0;
        minute = 0;

        /*this.minute = seconds / 60;
         this.hour = this.minute / 60;
         this.minute = this.minute % 60;
         this.day = this.hour / 24;
         this.hour = this.hour % 24;*/

        hour = Math.floor(seconds / 3600);
        minute = Math.floor((seconds - (hour * 3600)) / 60);
        day = Math.floor(hour / 24);
        hour = Math.floor(hour % 24);

        dayText = (day < 10) ? '0' + day: day;
        hourText = (hour < 10) ? '0' + hour: hour;
        minuteText = (minute < 10) ? '0' + minute: minute;
      }

      return `${dayText}:${hourText}:${minuteText}`;
    }
}
