import {Component, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TestcaseEASAction} from '../../../../../../actions/testcaseEAS.action';
import {ZephyrStore} from '../../../../../../store/zephyr.store';

declare var jQuery: any;

@Component({
    templateUrl: 'eas_freeform_delete.html'
})

export class EasFreeformDeleteComponent implements AfterViewInit{
    cyclePhaseId;
    zephyrStore;
    node;
    constructor(private _testcaseEASAction: TestcaseEASAction, private route: ActivatedRoute) {
        //this.cyclePhaseId = params.getParam('id');
        this.route.params.subscribe(params => {
            this.cyclePhaseId = params['id'];
        });
        this.zephyrStore = ZephyrStore.getZephyrStore();
    }
    functionCalling(node , self) {
       this.node = node;
    }

    ngAfterViewInit() {
       jQuery('#easDeleteNodeModal').modal();
    }

    deleteFreeformNode (event) {
        let formValues = {} ;
        let data = JSON.parse(this.node.item.nodeData);
        formValues['cyclephaseid'] = this.cyclePhaseId;
        formValues['treeId'] = data['data-id'];
        jQuery('#easDeleteNodeModal').modal('hide');
        this.zephyrStore.dispatch(this._testcaseEASAction.deleteTreeNode(formValues));
    }
}
