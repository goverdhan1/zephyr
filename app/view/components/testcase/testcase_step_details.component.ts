import {Component, Input, Output, EventEmitter, AfterViewInit, OnChanges, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ZephyrStore} from '../../../store/zephyr.store';
import {NotificationStore} from '../../../store/notification.store';
import {TestcaseAction} from '../../../actions/testcase.action';
import {NotificationAction} from '../../../actions/notification.action';
import {GlobalAction} from '../../../actions/global.action';
import {NOTIFICATION_ENTITY_CONSTANTS} from '../../../utils/constants/notification.constants';
import {constructNotificationStoreMetadata} from '../../../utils/notification/notification.util';

// Constants
import {TESTCASE_STEP_DETAILS, TESTSTEP_FIELD_OPTIONS, getTeststepNonEditableOptions} from './testcase.constant';

declare var _, $;

@Component({
	selector: TESTCASE_STEP_DETAILS,
	templateUrl: 'testcase_step_details.html'
})
export class TestcaseStepDetailsComponent implements AfterViewInit, OnChanges, OnDestroy {
    @Input() editable;
    @Input() testcaseId;
    @Input() isExpanded;
    @Input() isTce;
    @Input() appId;
    @Output() onSendFieldsData = new EventEmitter();
    teststep = {
        steps: []
    };
    tcid;
    zephyrStore;
    action: string ='zee-collapse';
    stepOptions = {};
    _prevTestcaseId;
    unsubscribe;
    //_origTestStep;
	private _releaseId;
    private _teststep;
    constructor(private testcaseAction: TestcaseAction, private route: ActivatedRoute, private cdr: ChangeDetectorRef,
        private _notificationAction: NotificationAction, private globalAction: GlobalAction) {

		//this._releaseId = params.getParam('id');

		this.route.params.subscribe(params => {
            this._releaseId = params['id'];
        });

		this.zephyrStore = ZephyrStore.getZephyrStore();
		this.unsubscribe = this.zephyrStore.subscribe(() => {
            let _state = this.zephyrStore.getState();
            if(_state && _state.testcase) {
                this.setTeststepDetails(_state.testcase);
                if(_state.testcase.event === 'TESTCASE_STEP_UPDATE') {
                    this.zephyrStore.dispatch(this.testcaseAction.clearTestcaseTestStep());
                    if(_state.testcase.treeType !== 'import') {
                        this.zephyrStore.dispatch(this.testcaseAction.fetchTestcaseHistory(this.tcid));
                    }
                }
            }
			if(this.cdr) { this.cdr.markForCheck(); }
		});
    }
    ngOnDestroy() {
        this.unsubscribeFromStepChanges();
        this.unsubscribe();
    }
    ngAfterViewInit() {
        // In case non editable then set the constants
        if(this.editable) {
            this.stepOptions = TESTSTEP_FIELD_OPTIONS;
        } else {
            this.stepOptions = getTeststepNonEditableOptions();
        }
        this.action = this.isExpanded ? 'zee-expand': 'zee-collapse';
        if(this.isExpanded) {
            this.subscribeToStepChanges();
            this.zephyrStore.dispatch(this.testcaseAction.fetchTeststepDetailsByTCId(this.tcid, this.testcaseId, this.isTce));
        }
    }
	ngOnChanges(changedNode) {
        // In case non editable then set the constants
        if(this.editable) {
            this.stepOptions = TESTSTEP_FIELD_OPTIONS;
        } else {
            this.stepOptions = getTeststepNonEditableOptions();
        }
		this.setExpandedState();
    }
	setExpandedState() {
		if(this.tcid != this._prevTestcaseId) {
			this.isExpanded = false;
		}
		if(this.isExpanded  && this.tcid != this._prevTestcaseId) {
			this.subscribeToStepChanges();
			this.zephyrStore.dispatch(this.testcaseAction.fetchTeststepDetailsByTCId(
				this.tcid, this.testcaseId, this.isTce));
		}
		let _prevAction = this.isExpanded ? 'zee-collapse': 'zee-expand';
		this.action = this.isExpanded ? 'zee-expand': 'zee-collapse';
		$('#zee-testcase-step-details-module').removeClass(_prevAction).addClass(this.action);
	}
    subscribeToStepChanges() {
        if(this.tcid) {
            let _prevTopic;
            if(this._prevTestcaseId) {
                _prevTopic = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTSTEP, this._prevTestcaseId, '', '');
            }
            let _curTopic = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTSTEP, this.tcid,'','');
            this._prevTestcaseId = this.tcid;
            this.teststep.steps = [];
            NotificationStore.getNotificationStore().dispatch(this._notificationAction.subscribeToTopic(_curTopic, _prevTopic, this.appId));
        }
    }
    unsubscribeFromStepChanges() {
      if(this.tcid) {
        let _curTopic = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTSTEP, this.tcid,'','');
        NotificationStore.getNotificationStore().dispatch(this._notificationAction.unSubscribeFromTopic(_curTopic, this.appId));
      }
    }
    onPanelToggle(ev) {
        if(ev.action == 'zee-expand') {
            this.isExpanded = true;
            if(this.testcaseId && this.tcid && this.tcid != this._prevTestcaseId) {
                this.subscribeToStepChanges();
                this.zephyrStore.dispatch(this.testcaseAction.fetchTeststepDetailsByTCId(this.tcid, this.testcaseId, this.isTce));
            }
        } else {
            this.isExpanded = false;
        }
    }
    setTeststepDetails(testcase) {
        let prevTestcaseId = _.clone(this.tcid);
        this._teststep = testcase.teststep;
        this.tcid = testcase.testcase.testcase.id;
        this.teststep.steps = this._teststep.steps;
		    this.setExpandedState();
        //
        // if (prevTestcaseId === this.tcid) {
        //   this.isExpanded = true;
        //   this.action = this.isExpanded ? 'zee-expand': 'zee-collapse';
        //   $('#zee-testcase-step-details-module').addClass('zee-expand').removeClass('zee-collapse');
        // }

		    // if(this._teststep && this._teststep.steps) {
        //   this._origTestStep = JSON.stringify(this._teststep.steps);
        // } else {
        //   this._origTestStep = '';
        // }
    }
    saveUpdatedSteps(step) {
        delete step['editMode'];
        _.each(this._teststep.steps, (_step) => {
            if(_step.id === step.id) {
                Object.assign(_step, step);
            }
        });
        this.zephyrStore.dispatch(this.testcaseAction.updateTestcaseTestStep(this.tcid, this._teststep));
    }

	onDirtyCheck(ev) {
//        console.log('dirty');
		this.zephyrStore.dispatch(this.globalAction.setDirtyCheck(Object.keys(ev).length));
	}

    sendFieldsData(fields) {
        this.onSendFieldsData.emit(fields);
    }

    saveBulkData(steps) {
        if(!(steps && steps.length)) {
            return;
        }
        //this.zephyrStore.dispatch(this.testcaseAction.updateTestcaseTestStep(this.tcid, this._teststep));
        let stepData = {
            releaseId: this._releaseId,
            tcId: this.tcid
        };
        if(this._teststep.steps && this._teststep.steps.length) {
            this._teststep.steps = steps;
            this.zephyrStore.dispatch(this.testcaseAction.updateTestcaseTestStep(this.tcid, this._teststep));
            // if(this._origTestStep === JSON.stringify(steps)) {
            //   console.log('No updates to test step.');
            // } else {
            //   this.zephyrStore.dispatch(this.testcaseAction.updateTestcaseTestStep(this.tcid, this._teststep));
            //   this._origTestStep = JSON.stringify(steps);
            // }
        } else {
			let step = steps[0];
			step.orderId = 1;
            this._teststep.steps = steps;
            stepData['maxId'] = steps[0].orderId;
            stepData['steps'] = this._teststep.steps;
            //this._origTestStep = JSON.stringify(steps);
            this.zephyrStore.dispatch(this.testcaseAction.createTestcaseTestStep(this.tcid, stepData));
        }
    }

    createSteps(step) {
        let stepData = {
            releaseId: this._releaseId,
            tcId: this.tcid
        };
		//TODO update maxId and orderId considering reorder and delete usecases.
		if(this._teststep.steps && this._teststep.steps.length) {
			step.orderId = this._teststep.steps.length + 1;
			this._teststep.steps.push(step);
            this.zephyrStore.dispatch(this.testcaseAction.updateTestcaseTestStep(this.tcid, this._teststep));
		} else {
			step.orderId = 1;
			this._teststep.steps = [step];
            stepData['maxId'] = step.orderId;
            stepData['steps'] = this._teststep.steps;
            this.zephyrStore.dispatch(this.testcaseAction.createTestcaseTestStep(this.tcid, stepData));
		}
    }
    deleteStep(steps) {
        this._teststep.steps = steps;
        // if(this._teststep.steps && this._teststep.steps.length) {
        //     _.remove(this._teststep.steps, function (step) {
        //         return step.id === stepId;
        //     });
        // }
        console.debug('final teststeps', this._teststep.steps);
        this.zephyrStore.dispatch(this.testcaseAction.updateTestcaseTestStep(this.tcid, this._teststep));
    }
}
