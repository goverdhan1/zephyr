import {Component, Input, OnChanges, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

declare var $;
import {ZephyrStore} from '../../../../store/zephyr.store';
import {RequirementsAction} from '../../../../actions/requirements.action';

/**
 * <zee-delete-dialog-requirement
        [fieldOptions]="fieldOptions"
        [isDisabled]="false"
        [reqIDs]="reqIDs"
        [reqCatalogTreeId]="reqCatalogTreeId"
    ></zee-delete-dialog-requirement>
 * @param fieldOptions: id, header, title
 * @param isDisabled: disable or enable the button
 * @param tctIds: list of tct ids
 */
@Component({
	selector: 'zee-delete-dialog-requirement',
	templateUrl: 'requirement_delete.html'
})
export class RequirementDeleteComponent implements OnChanges, AfterViewInit {
    _zephyrStore;
    @Input() isDeAllocate;
    @Input() fieldOptions;
    @Input() isDisabled;
    @Input() reqCatalogTreeId;
    @Input() reqIDs;
    private releaseId;
    constructor(private requirementAction: RequirementsAction, private route: ActivatedRoute) {
        this._zephyrStore = ZephyrStore.getZephyrStore();
        //this.releaseId = params.getParam('id');
        this.route.params.subscribe(params => {
            this.releaseId = params['id'];
        });
        this._zephyrStore.subscribe(() => {
            let state = this._zephyrStore.getState();
            if(state.requirements.event === 'DELETE_REQUIREMENT_SUCCESS') {
                this.toggleButton();
                return;
            }
        });
    }
    ngAfterViewInit() {
        this.toggleButton();
    }
    ngOnChanges(changedNode) {
        this.toggleButton();
    }
    toggleButton() {
        if(this.disableButton()) {
            $('#zui-modal-trigger-' + this.fieldOptions.id).prop('disabled', true);
        } else {
            $('#zui-modal-trigger-' + this.fieldOptions.id).prop('disabled', false);
        }
    }
    disableButton() {
        return (this.isDisabled || !this.reqIDs.length);
    }
    onClickDeallocate() {
        let state = this._zephyrStore.getState().requirements.reqGrid;
        let size = state.size;
        let offset = state.offset;
        let currentPage = state.currentPage;
        this._zephyrStore.dispatch(this.requirementAction.deallocateMultipleRequirements(this.reqIDs, this.reqCatalogTreeId,
            this.releaseId, size, offset, currentPage));

        $('#zee-delete-modal-' + this.fieldOptions.id).modal('hide');
    }
    onClickDelete() {
        let state = this._zephyrStore.getState().requirements.reqGrid;
        let size = state.size;
        let offset = state.offset;
        let currentPage = state.currentPage;
        this._zephyrStore.dispatch(this.requirementAction.deleteMultipleRequirements(this.reqIDs, this.reqCatalogTreeId,
            this.releaseId, size, offset, currentPage));

        $('#zee-delete-modal-' + this.fieldOptions.id).modal('hide');
    }
}
