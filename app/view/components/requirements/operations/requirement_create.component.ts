import {Component, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ZephyrStore} from '../../../../store/zephyr.store';
import {RequirementsAction} from '../../../../actions/requirements.action';

// Constants
import * as REQ_CONSTS from './requirement_operations.constant';

/**
 * <zee-create-dialog-requirement
        [fieldOptions]="fieldOptions"
        [isDisabled]="false"
        [reqCatalogTreeId]="reqCatalogTreeId"
    ></zee-create-dialog-requirement>
 * @param fieldOptions: id, header, title
 * @param isDisabled: disable or enable the button
 * @param reqCatalogTreeId
 * @param reqIDs: list of requirement ids
 */

@Component({
 	selector: 'zee-create-dialog-requirement',
 	templateUrl: 'requirement_create.html'
})
export class RequirementCreateComponent {
    zephyrStore;
    @Input() fieldOptions;
    @Input() isDisabled;
    @Input() reqCatalogTreeId;
    @Input() reqIDs;
    @Input() isGlobal;
    @Input() isImported;
    @Input() projectId;
    @Input() tooltip = '';
    private releaseId;
    constructor(private requirementAction: RequirementsAction, private route: ActivatedRoute) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.route.params.subscribe(params => {
            this.releaseId = Number(params['id']);
        });
    }
    disableButton() {
        let fieldId = this.fieldOptions.id;
        return (this.isDisabled ||
            ((fieldId == REQ_CONSTS.REQ_OPERATION_CLONE_ID || fieldId == REQ_CONSTS.REQ_OPERATION_ALLOCATE_ID) && !this.reqIDs.length));
    }
    createRequirement() {
        try {
            let requirement = JSON.parse(JSON.stringify(REQ_CONSTS.REQUIREMENT_REQUEST));
            requirement.requirementTreeId = this.reqCatalogTreeId;
            requirement.releaseIds = [this.releaseId];
            requirement.createdBy = this.zephyrStore.getState().loggedInUser.id;
            if (this.isGlobal || this.isImported) {
                delete requirement.releaseIds;
            }

            this.zephyrStore.dispatch(this.requirementAction.createRequirement(requirement));
        } catch(e) {
//            console.log(e);
        }
    }
    cloneRequirement() {
        try {

            let selectedTreeId = String(this.reqCatalogTreeId);
            let releaseId = this.isGlobal || this.isImported ? 0 : this.releaseId;
            let reqId = this.reqIDs;

            this.zephyrStore.dispatch(this.requirementAction.cloneRequirement(selectedTreeId, releaseId, reqId));

        } catch(e) {
         //   console.log(e);
        }
    }
    allocateRequirement() {
        try {

            let releaseId = this.releaseId;
            let reqId = this.reqIDs;

            this.zephyrStore.dispatch(this.requirementAction.allocateRequirement(releaseId, reqId));

        } catch(e) {
          //  console.log(e);
        }
    }
    onAddClick() {
        switch(this.fieldOptions.id) {
            case REQ_CONSTS.REQ_OPERATION_CREATE_ID:
            case REQ_CONSTS.REQ_OPERATION_CREATE_ID_DETAIL:
                this.createRequirement();
                break;
            case REQ_CONSTS.REQ_OPERATION_CLONE_ID:
            case REQ_CONSTS.REQ_OPERATION_CLONE_ID_DETAIL:
                this.cloneRequirement();
                break;
            case REQ_CONSTS.REQ_OPERATION_ALLOCATE_ID:
                this.allocateRequirement();
                break;
            default:
                break;
        }
    }
}
