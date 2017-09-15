import {Component, OnDestroy, Input, Output, OnChanges, EventEmitter, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {I18N_MESSAGES} from '../../../../../utils/messages/messages.en';
import {CreateDefectFormComponent} from './create_defect_form.component';
import { ZephyrStore } from '../../../../../store/zephyr.store';

declare var jQuery: any, _;

@Component({
    selector: 'file-new-defect',
    templateUrl: 'file_new_defect.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class FileNewDefectComponent implements OnChanges, OnDestroy {
    @ViewChild(CreateDefectFormComponent) cdFormCmp: CreateDefectFormComponent;
    @Input() disableCopyTestStep;
    @Input() isProjectIssueSelected;
    @Input() issueMetaData;
    @Input() projects;
    @Input() issueTypes = [];
    @Input() parentIssue;
    @Output() onSetProject: EventEmitter<any> = new EventEmitter();
    @Output() onSetIssueType: EventEmitter<any> = new EventEmitter();
    @Output() emitChangeDetection: EventEmitter<any> = new EventEmitter();
    selectedProject;
    selectedIssueType;
    selectedIssueTypeName;
    changeDetectionDebounce;
    unsubscribe;
    _zephyrStore;
    i18nMessages = I18N_MESSAGES;
    constructor(private cdr: ChangeDetectorRef) {
        this._zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this._zephyrStore.subscribe(() => {
            this.triggerChange();
        });
    }
    ngOnChanges(changedKey) {
        if(changedKey['parentIssue'] && changedKey['parentIssue'].previousValue !== changedKey['parentIssue'].currentValue &&
            changedKey['parentIssue'].currentValue) {
            this.selectedProject = this.parentIssue.product;
        }
    }
    ngOnDestroy() {
        this.isProjectIssueSelected = null;
        this.issueMetaData = null;
        this.projects = null;
        this.issueTypes = [];
        this.selectedProject = null;
        this.selectedIssueType = null;
        this.selectedIssueTypeName = null;
        this.parentIssue = null;
        this.unsubscribe();
    }
    setProject(value) {
        this.selectedProject = value.text;
        this.onSetProject.emit(value);
    }
    setIssueType(value) {
        this.selectedIssueType = value.id;
        this.selectedIssueTypeName = value.text;
        this.onSetIssueType.emit(value);
    }
    triggerChangeDetection() {
        this.emitChangeDetection.emit();
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
