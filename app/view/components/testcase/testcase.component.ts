import {Component, Input, OnChanges, Output, EventEmitter, SimpleChanges, AfterViewInit, OnDestroy} from '@angular/core';

import {ZephyrStore} from '../../../store/zephyr.store';
import {NotificationStore} from '../../../store/notification.store';

import {TestcaseAction} from '../../../actions/testcase.action';
import {NotificationAction} from '../../../actions/notification.action';
import {GlobalAction} from '../../../actions/global.action';

import {NOTIFICATION_ENTITY_CONSTANTS} from '../../../utils/constants/notification.constants';
import {constructNotificationStoreMetadata} from '../../../utils/notification/notification.util';

// Constants
import {TESTCASE_COMPONENT} from './testcase.constant';
import {TCR_BULK_OPERATION_OPTIONS, TCR_BULK_OPERATION} from '../tcr/operations/tcr_operations.constant';

declare var jQuery: any, _:any;

@Component({
	selector: TESTCASE_COMPONENT,
	templateUrl: 'testcase.html',
    providers: [TestcaseAction, NotificationAction, GlobalAction]
})
//@CanActivate(() => isLoggedin())
export class TestcaseComponent implements OnChanges, AfterViewInit, OnDestroy {
	@Input() testcaseId: number;
    @Input() tcTestcaseId;
    @Input() editable;
    @Input() paginationOptions;
    @Input() allowRequirementMapping;
    @Input() isEditable;
    @Input() isTce;
    @Input() isDetailView = false;
    @Input() isSearchView = false;
    @Input() treeType;
    @Input() releaseId;
    @Input() appId;
  	@Input() currentRecord: number;
  	@Input() totalRecords: number;
    @Input() fetchFromServer;
    @Input() cyclePhaseId;
    @Input() rtsId;
    @Input() selectedTreeNode;
    @Input() hideDocker = false;
    @Input() areExecDetailsEnabled = false;
    //@Output() editableChange = new EventEmitter();
    @Output() onEditClick = new EventEmitter();
    @Output() onPanelCollapsed = new EventEmitter();
    @Output() onRecordChange: EventEmitter<any>;
    @Output() onTestStepAttachmentCountClicked: EventEmitter<any> = new EventEmitter();
    @Output() emitAttachmentCount: EventEmitter<any> = new EventEmitter(); //emits the count of attachment when it is added/deleted
  	tcOpOptions = JSON.parse(JSON.stringify(TCR_BULK_OPERATION_OPTIONS));

    //id: number;
	title: string;
	category: string;
    projectId: string;
    isCollaped: boolean = false;
    zephyrStore;
    isEditableField = false;
    _prevTestcaseId;
    unsubscribe;
    public testcaseModel;
	private mandatoryFields;
	private _testcase = {
        testcase: {
            customProperties: {}
        }
    };
	constructor(private _testcaseAction: TestcaseAction, private _notificationAction: NotificationAction, private globalAction: GlobalAction) {
        this.isEditable = this.isEditable || false;
        this.isTce = this.isTce || false;
        this.onRecordChange = new EventEmitter();
        this.zephyrStore = ZephyrStore.getZephyrStore();

        this.unsubscribe = this.zephyrStore.subscribe(() => {
	      	let state = this.zephyrStore.getState();
          this._testcase = state.testcase.testcase;
          // console.log(this._testcase);
        });
    }
    ngAfterViewInit() {
        this.zephyrStore.dispatch(this._testcaseAction.updateTreeType(this.treeType));
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
	ngOnChanges(changes: SimpleChanges) {
        if (!(Object.keys(changes).length === 1
            && Object.keys(changes)[0] === 'currentRecord')) {
            if(this.fetchFromServer) {
                // TODO: Remove once we remove this dependency in other components for steps
                this.getTestcaseDetails();
            }
        }

		jQuery(document).off('click.fullsize').on('click.fullsize', '#testcase-fullscreen-resizer', ev => {
            ev.stopImmediatePropagation();
            let coll = jQuery(ev.currentTarget);
            let panel = coll.parents('zee-testcase').parent().siblings('.zui-flex-v-resizable');

            if(coll.hasClass('testcase-default-view')) {
				coll.removeClass('testcase-default-view').addClass('testcase-full-view').find('span').removeClass('fa-chevron-up').addClass('fa-chevron-down');

				panel.addClass('collapse');
			} else if(coll.hasClass('testcase-full-view')) {

                coll.removeClass('testcase-full-view').addClass('testcase-default-view').find('span').removeClass('fa-chevron-down').addClass('fa-chevron-up');

                panel.removeClass('collapse');
			}
        });
	}
	updateTestCase(skipCall = false) {
		setTimeout(() => {
	      let mField = this.mandatoryFields;
	      if (mField && mField.length && !skipCall) {
	        let customProperties = this._testcase.testcase.customProperties || {};

	        let emptyField = mField.filter(item => !(customProperties.hasOwnProperty(item.fieldName) || customProperties[item.fieldName]));

	        if (Array.isArray(emptyField) && emptyField.length) {
	          // if any mandatory field is empty, show error and do not save
	          this.globalAction.showMandatoryFieldError(emptyField);
	        } else {
	          this.zephyrStore.dispatch(this._testcaseAction.updateTestcaseDetailsById(this._testcase, skipCall));
	        }
	      } else {
	        this.zephyrStore.dispatch(this._testcaseAction.updateTestcaseDetailsById(this._testcase, skipCall));
	      }
	    });
	}
	setMandatoryField(mandatoryFields) {
		this.mandatoryFields = mandatoryFields;
	}
    emitClickEvent(ev) {
        this.onEditClick.emit(ev);
        this.isEditableField = true;
    }

    collapsePanel(event) {
        this.isCollaped = !this.isCollaped;
        this.onPanelCollapsed.emit(this.isCollaped);
    }

    /**
     * TODO: Remove once we remove this dependency in other components for steps
     */
    subscribeToStepChanges() {
        if(this.tcTestcaseId) {
            let _prevTopic;
            if(this._prevTestcaseId) {
                _prevTopic = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTSTEP, this._prevTestcaseId, '', '');
            }
            let _curTopic = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTSTEP, this.tcTestcaseId,'','');
            this._prevTestcaseId = this.tcTestcaseId;
            NotificationStore.getNotificationStore().dispatch(this._notificationAction.subscribeToTopic(_curTopic, _prevTopic, this.appId));
        }
    }
    getTestcaseDetails() {
        console.debug('testcase ID', this.testcaseId);
        console.debug('testcase ID', this.tcTestcaseId);

        if (this.testcaseId) {
          this.subscribeToStepChanges();
          // this.zephyrStore.dispatch(this._testcaseAction.clearTestcaseData());
          this.zephyrStore.dispatch(this._testcaseAction.fetchTestcaseDetailsById(this.testcaseId, this.treeType, this.isTce));
        }
    }
    recordChanged($event) {
        $event['currentRecord'] = this.currentRecord;
        this.onRecordChange.emit($event);
    }
    //refreshes the attachment count
    attachmentsCountRefreshed (data) {
        this.emitAttachmentCount.emit(data);
    }

    onTestStepAttachmentClick (data) {
        this.onTestStepAttachmentCountClicked.emit(data);
    }
}
