import {Component, AfterViewInit, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ZephyrStore} from '../../../../../../store/zephyr.store';
import {DefectsAction} from '../../../../../../actions/defects.action';
import {CreateDefectFormComponent} from
    '../../../defect_link/create_defect/create_defect_form.component';

// Constants
import {I18N_MESSAGES} from '../../../../../../utils/messages/messages.en';

declare var jQuery: any, _;

@Component({
    selector: 'defect-advanced-detail',
    templateUrl: 'defect_advanced_detail.html',
    viewProviders: [DefectsAction],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DefectAdvancedDetailComponent implements AfterViewInit {
    @ViewChild(CreateDefectFormComponent) cdFormCmp: CreateDefectFormComponent;
    @Input() parentIssueKey;
    @Input() selectedDefect;
    @Input() issueMetaData;
    @Input() updateIssueTypeName;
    @Input() manageModalClose;
    @Output() onDismissModal: EventEmitter<any> = new EventEmitter();
    selectedProject;
    selectedIssueType;
    selectedIssueTypeName;
    changedDefectObj = {};
    i18nMessages = I18N_MESSAGES;
    changeDetectionDebounce;
    private zephyrStore;
    constructor(private _defectsAction: DefectsAction, private cdr: ChangeDetectorRef) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
    }
    ngAfterViewInit() {
        this.selectedProject = this.selectedDefect.product;
        this.selectedIssueType = this.selectedDefect.issueType;
        this.selectedIssueTypeName = this.selectedDefect.issueTypeName || this.updateIssueTypeName;
        jQuery('div#defect-advanced-detail-modal-' + this.selectedDefect.id).on('show.bs.modal', (e) => {
            if(e.target === e.currentTarget) {
                this.zephyrStore.dispatch(this._defectsAction.getDefectAttachmentData(this.selectedDefect.id));
            }
        });
        jQuery('div#defect-advanced-detail-modal-' + this.selectedDefect.id).on('hidden.bs.modal', (e) => {
            if(e.target === e.currentTarget) {
                this.dismissModal();
            }
        });
    }
    filterFormValue(formValue, selectedDefect) {
        if(!formValue || !selectedDefect) {
            return [];
        }
        let changes = [];
        changes = Object.keys(formValue).filter((key) => {
            if((formValue.hasOwnProperty(key) || selectedDefect.hasOwnProperty(key)) && !_.isEqual(formValue[key], selectedDefect[key])) {
                if(key.indexOf('customfield') > -1) {
                    this.changedDefectObj['customProperties'][key] = formValue[key];
                } else {
                    this.changedDefectObj[key] = formValue[key];
                }
                return true;
            }
            return false;
        });
        let customPropIndex = changes.indexOf('customProperties');
        if(customPropIndex > -1) {
            changes.splice(customPropIndex, 1);
        }
        return changes;
    }
    getChangedKeys(formValue) {
        // let changes = this.filterFormValue(formValue, this.selectedDefect).concat(
        //     this.filterFormValue(formValue.customProperties, this.selectedDefect.customProperties)
        // );
        let changes = this.filterFormValue(formValue, this.selectedDefect);
        let customFieldChanges = this.filterFormValue(formValue.customProperties, this.selectedDefect.customProperties);
        return changes;
    }
    onDefectUpdate() {
        let formValue = this.cdFormCmp.getFormValue();
        this.changedDefectObj = _.cloneDeep(this.selectedDefect);
        let changes = this.getChangedKeys(formValue);
        this.zephyrStore.dispatch(
            this._defectsAction.updateDefect(this.changedDefectObj, this.selectedDefect.id, changes));
    }
    dismissModal() {
        this.onDismissModal.emit();
    }
    triggerChange() {
        if (this.changeDetectionDebounce) {
            clearTimeout(this.changeDetectionDebounce);
        }
        let firstDetection = !this.changeDetectionDebounce;
        this.changeDetectionDebounce = setTimeout(() => {
            this.changeDetectionDebounce = null;
            if(this.cdr) { this.cdr.markForCheck(); }
        }, firstDetection ? 200 : 300);
    }
}
