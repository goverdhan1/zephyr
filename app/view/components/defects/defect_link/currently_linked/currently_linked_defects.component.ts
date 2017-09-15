import {Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ZephyrStore} from '../../../../../store/zephyr.store';
import {DefectsAction} from '../../../../../actions/defects.action';
import {GridAction} from '../../../../../actions/grid.action';

// Constants
import {CURRENTLY_LINKED_DEFECTS_GRID_TYPE, CURRENTLY_LINKED_DEFECTS_GRID_PAGINATION,
    CURRENTLY_LINKED_DEFECTS_GRID_OPTIONS} from './currently_linked_defects.constants';
import {I18N_MESSAGES} from '../../../../../utils/messages/messages.en';

declare var jQuery: any, _;

@Component({
    selector: 'zee-currently-linked-defects',
    templateUrl: 'currently_linked_defects.html',
    viewProviders: [DefectsAction, GridAction]
})

export class CurrentlyLinkedDefectsComponent implements AfterViewInit, OnDestroy {
    @Input() testcaseId;
    @Input() scheduleId;
    @Output() onMapDefectsSchedule: EventEmitter<any> = new EventEmitter();
    selectedDefectIds=[];
    releaseId;
    gridPageSize;
    currentPage;
    isFirstPage;
    isLastPage;
    gridRows;
    unsubscribe;
    paginationOptions = CURRENTLY_LINKED_DEFECTS_GRID_PAGINATION;
    i18nMessages = I18N_MESSAGES;
    _currentlyLinkedDefectsGridType = CURRENTLY_LINKED_DEFECTS_GRID_TYPE;
    private zephyrStore;

    constructor(private route: ActivatedRoute, public router: Router, private _gridAction: GridAction,
        private _defectsAction: DefectsAction) {
        this.route.params.subscribe(params => {
            this.releaseId = params['id'];
        });
        this.gridPageSize = CURRENTLY_LINKED_DEFECTS_GRID_OPTIONS.rowCount;
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this.zephyrStore.subscribe((x) => {
            this.onStateChange();
        });
    }
    ngAfterViewInit() {
        this.getCurrentlyLinkedDefects();
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    onStateChange() {
        let currentlyLinkedDefectsState = this.zephyrStore.getState().currentlyLinkedDefects;
        let currentlyLinkedDefectsGrid = currentlyLinkedDefectsState.grid;
        this.currentPage = currentlyLinkedDefectsGrid.currentPage;
        this.isFirstPage = currentlyLinkedDefectsGrid.isFirstPage;
        this.isLastPage = currentlyLinkedDefectsGrid.isLastPage;
        this.gridRows = currentlyLinkedDefectsGrid.rows;
        this.paginationOptions = currentlyLinkedDefectsGrid.paginationOptions;
        if(currentlyLinkedDefectsState.event === 'MAPPED_SCHEDULE_DELETION_SUCCESS') {
            this.zephyrStore.dispatch(this._defectsAction.clearCurrentlyLinkedDefectEvent());
            this.selectedDefectIds = [];
            this.toggleButton();
            this.onMapDefectsSchedule.emit();
        }
    }
    getCurrentlyLinkedDefects() {
        this.zephyrStore.dispatch(this._defectsAction.getCurrentlyLinkedDefects(this.scheduleId));
    }
    gridPrevClick() {
        this.zephyrStore.dispatch(this._gridAction.prevPage('', this._currentlyLinkedDefectsGridType));
    }
    gridNextClick() {
        this.zephyrStore.dispatch(this._gridAction.nextPage('', this._currentlyLinkedDefectsGridType));
    }
    gridRowSelection(value) {
        this.selectedDefectIds = value;
        this.toggleButton();
    }
    toggleButton() {
        if (this.selectedDefectIds && this.selectedDefectIds.length) {
            jQuery('#delete-mapped-schedule-button').removeAttr('disabled');
        } else {
            jQuery('#delete-mapped-schedule-button').attr('disabled', 'disabled');
        }
    }
    showDeleteMappedScheduleModal() {
        jQuery('#delete-mapped-schedule-modal').modal();
    }
    hideDeleteMappedScheduleModal() {
        jQuery('#delete-mapped-schedule-modal').modal('hide');
    }
    deleteMappedSchedule() {
        let selectedBugObj = [];
        this.selectedDefectIds.forEach((defectId) => {
            let bugObj = _.find(this.gridRows, {id: defectId});
            if(bugObj) {
                selectedBugObj.push(bugObj);
            }
        });
        this.zephyrStore.dispatch(this._defectsAction.deleteMappedSchedule(this.scheduleId, this.testcaseId, selectedBugObj));
        this.hideDeleteMappedScheduleModal();
    }
}
