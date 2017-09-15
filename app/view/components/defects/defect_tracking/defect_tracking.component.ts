import {Component, AfterViewInit, ViewChild, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {DefectsAction} from '../../../../actions/defects.action';
import {GlobalAction} from '../../../../actions/global.action';
import {DefectTrackingSearchComponent} from './search/defect_tracking_search.component';

// Constants
import {ZEE_NAV_COLUMNS} from '../../projects/project_leftnav.data';
import {NEXT_RECORD, PREV_RECORD, NEXT_PAGE, PREV_PAGE} from '../../common/paginator/paginator.constant';

declare var jQuery: any, _;
const SYSTEM_TYPE_4 = 4;

@Component({
    selector: 'zee-defect-tracking',
    templateUrl: 'defect_tracking.html',
    viewProviders: [DefectsAction, GlobalAction],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DefectTrackingComponent implements AfterViewInit, OnDestroy {
    @ViewChild(DefectTrackingSearchComponent) dtSearchCmp: DefectTrackingSearchComponent;
    navColumns;
    isUserUpdateRequired;
    isResetDTUser;
    selectedDefect;
    issueMetaData;
    currentRecord: number = 1;
    totalRowCount: number;
    parentIssue;
    parentIssueForAdvancedView;
    unsubscribe;
    defectSystemUrl;
    _releaseId;
    changeDetectionDebounce;
    private zephyrStore;
    constructor(public router: Router, private route: ActivatedRoute, private _defectsAction: DefectsAction,
        private _globalAction: GlobalAction, private cdr: ChangeDetectorRef) {
        this.navColumns = ZEE_NAV_COLUMNS;
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.route.params.subscribe(params => {
            this._releaseId = params['id'];
        });
        this.unsubscribe = this.zephyrStore.subscribe(() => {
            let globalState = this.zephyrStore.getState().global;
            let defectsystem = globalState.defectSystem;
            this.defectSystemUrl = defectsystem['url'];
            if(globalState.event === 'DEFECT_SYSTEM_UPDATED') {
                this.zephyrStore.dispatch(this._globalAction.clearGlobalEvents());
                if(!this.checkDTIntegration() && this.router.url.indexOf('defect-tracking') > -1) {
                    this.router.navigate(['/release', this._releaseId]);
                }
            }
            let linkNewDefectState = this.zephyrStore.getState().linkNewDefect;
            if(linkNewDefectState.event === 'FETCH_ISSUE_METADATA_SUCCESS') {
                this.zephyrStore.dispatch(this._defectsAction.clearLinkNewDefectEvent());
                this.issueMetaData = linkNewDefectState.issueMetaData;
                //this.showUpdateDefectModal();
            }
            this.totalRowCount = this.dtSearchCmp && this.dtSearchCmp.totalCount;
            this.triggerChange();
        });
    }
    ngAfterViewInit() {
        this.checkDefectUserState();
    }
    ngOnDestroy() {
        this.parentIssue = null;
        this.unsubscribe();
    }
    checkDTIntegration() {
        let defectsystem = this.zephyrStore.getState().global.defectSystem;
        if(defectsystem && defectsystem['systemType'] == SYSTEM_TYPE_4) {
          return true;
        }
        return false;
    }
    checkDefectUserState() {
        this.zephyrStore.dispatch(this._defectsAction.getDefectUser());
    }
    onShowUpdateUserModal(selectedVal) {
        this.isUserUpdateRequired = selectedVal;
        if(selectedVal === 'false') {
            this.dismissModal();
            if(this.isResetDTUser) {
                this.isResetDTUser = false;
                this.isUserUpdateRequired = 'true';
                setTimeout(() => {
                    this.isUserUpdateRequired = 'false';
                }, 10);
            }
        } else {
            jQuery('#defect-update-user-modal').modal();
        }
    }
    resetDTUserButtonClick(ev) {
        this.isResetDTUser = true;
        this.isUserUpdateRequired = 'true';
        jQuery('#defect-update-user-modal').modal();
    }
    resetUserCompletion() {
        this.isResetDTUser = false;
        this.isUserUpdateRequired = 'false';
    }
    onCloseUpdateUserModal(ev) {
        if(this.isResetDTUser) {
            this.dismissModal();
            this.resetUserCompletion();
        } else {
            this.dismissModal();
            this.router.navigate(['/release', this._releaseId]);
        }
    }
    onDeleteUser(ev) {
        this.isResetDTUser = false;
        this.isUserUpdateRequired = 'true';
        this.dismissModal();
        this.router.navigate(['/release', this._releaseId]);
    }
    dismissModal() {
        jQuery('#defect-update-user-modal').modal('hide');
        jQuery('.modal-backdrop').remove();
    }
    onDefectRowClick(defectObj) {
        this.currentRecord = ((this.dtSearchCmp.currentPage - 1) * this.dtSearchCmp.gridPageSize) + parseInt(defectObj.index) + 1;
        if(defectObj.defect && defectObj.defect.isSubtask) {
            this.parentIssueForAdvancedView = defectObj.defect.parentKey;
        }
        this.selectedDefect = defectObj.defect;
    }
    onFetchIssueMetaData() {
        let params = {
            project: this.selectedDefect.product,
            issueType: this.selectedDefect.issueTypeName
        };
        this.zephyrStore.dispatch(this._defectsAction.getIssueMetadata(params));
    }
    recordChanged($event) {
        switch($event.type) {
            case NEXT_RECORD:
                this.currentRecord++;

                if (this.currentRecord % this.dtSearchCmp.gridPageSize === 1) {
                    this.dtSearchCmp.gridNextClick(this.dtSearchCmp.currentPage + 1);
                } else {
                    jQuery('.defect-details-grid .selected-row').next().click();
                }
                break;

            case PREV_RECORD:
                this.currentRecord--;

                if (this.currentRecord % this.dtSearchCmp.gridPageSize === 0) {
                    this.dtSearchCmp.gridPrevClick(this.dtSearchCmp.currentPage - 1);
                    // jQuery('.defect-details-grid tr').last().click();
                } else {
                    jQuery('.defect-details-grid .selected-row').prev().click();
                }
                break;
        }
    }
    fileNewButtonButtonClick(ev) {
        jQuery('#file-new-defect-modal').modal();
    }
    defectBulkUpdate(def) {
        if(this.selectedDefect) {
            let defectObj = _.find(def.selectedDefects, {id: this.selectedDefect.id});
            if(defectObj) {
                this.selectedDefect = defectObj;
                jQuery('.defect-details-grid .selected-row').click();
                // let gridRows = def.gridRows;
                // let index = _.findIndex(gridRows, {id: this.selectedDefect.id});
                // jQuery('.defect-details-grid .flex-bar').eq(index).click();
            }
        }
    }
    onCreateSubtask(parentIssue) {
        jQuery('#file-new-defect-modal').on('hidden.bs.modal', ev => {
            if(ev.target === ev.currentTarget) {
                this.parentIssue = null;
            }
        });
        if (_.isObject(parentIssue)) {
            this.parentIssue = JSON.parse(JSON.stringify(parentIssue));
            this.triggerChange();
        }
    }
    onAdvModalClose() {
        this.issueMetaData = null;
        this.parentIssue = null;
    }
    onDefectUpdate(defect) {
        this.selectedDefect = defect;
    }
    resetSelectedDefect() {
        this.selectedDefect = null;
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
