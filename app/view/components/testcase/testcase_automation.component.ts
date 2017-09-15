import {Component, Input, Output, EventEmitter, OnDestroy, Inject} from '@angular/core';

declare var _, $;
import {ExpanderDirective} from '../../directives/expander/expander.directive';
import {ZephyrStore} from '../../../store/zephyr.store';
import {TestcaseAction} from '../../../actions/testcase.action';

// Constants
import {TESTCASE_AUTOMATION} from './testcase.constant';
import { ToastrService } from "../../../services/toastr.service";

@Component({
	selector: TESTCASE_AUTOMATION,
	templateUrl: 'testcase_automation.html'
})
export class TestcaseAutomationComponent implements OnDestroy {
    @Input() editable;
	@Output() updateTestCase: EventEmitter<any> = new EventEmitter();

    nameValidation = '^(?=.{1,255}$)(?=^[\\s]*)(?=.*[\\s]*$)(?=.*[\\S]+).*$';
    idValidation = '^.{0,255}$';
    pathValidation = '^.{0,255}$';
    action: string= 'zee-expand';
    automation = {
        automated: false,
        scriptId: '',
        scriptName: '',
        scriptPath: ''
    };
    zephyrStore;
    tcid;
    unsubscribe;
    _testcase = {
        testcase: _.cloneDeep(this.automation)
    };

    constructor(private testcaseAction: TestcaseAction, @Inject(ToastrService) private toastrService:ToastrService) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this.zephyrStore.subscribe((x) => {
                this.setAutomationDetails(this.zephyrStore.getState().testcase);
        });
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    setAutomationDetails(testcase) {
        this._testcase = testcase.testcase;
        let _testcase = testcase.testcase.testcase;
        this.tcid = _testcase.id;
        this.automation = {
            automated: _testcase.automated,
            scriptId: _testcase.scriptId || '',
            scriptName: _testcase.scriptName || '',
            scriptPath: _testcase.scriptPath || ''
        };
        $('#zui-automated-script-checkbox').prop('checked', this.automation.automated);
    }

    saveAutomationPreference(value) {
      this._testcase.testcase['automated'] = value;
      this.automation.automated = value;

      if (value) {
        this.checkAndSave(false);
      } else {
        this.updateTestCase.emit();
      }
    }

    checkIfValid(shouldShowToastr = true) {
      let name = this._testcase.testcase['scriptName'];
      let path = this._testcase.testcase['scriptPath'];

      if (!path && shouldShowToastr) {
          this.toastrService.info(`An automated testcase must have a path for it's execution.`, {
            'showDuration': '3000',
            'hideDuration': '1000',
            'timeOut': '5000'
          });

      }

      // return name && name.length && path && path.length;
      return name && name.length;
    }

    saveScriptName(value) {
      this._testcase.testcase['scriptName'] = value;
      this.checkAndSave();
    }

    checkAndSave(shouldShowToastr = true) {
      if (this.checkIfValid(shouldShowToastr)) {
        this.updateTestCase.emit();
      }
    }

    saveScriptId(value) {
        this._testcase.testcase['scriptId'] = value;
        this.checkAndSave(false);
    }

    saveScriptPath(value) {
        this._testcase.testcase['scriptPath'] = value;
        this.checkAndSave();
    }
}
