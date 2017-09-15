import {Component, AfterViewInit} from '@angular/core';
//import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control} from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {ActivatedRoute} from '@angular/router';
import {TestcaseEASAction} from '../../../../../actions/testcaseEAS.action';
import {ZephyrStore} from '../../../../../store/zephyr.store';

declare var jQuery: any;

@Component({
    templateUrl: 'eas_deleteNode.html'
})

export class EasDeleteNodeComponent implements AfterViewInit {
    //_releaseId;
    cycleInfo;
    phaseInfo;
    nodeInfo;
    nodeType;
    deleteCycleForm;
    private zephyrStore;
    constructor(private _testcaseEASAction: TestcaseEASAction,  fb: FormBuilder) {
        //this._releaseId = params.getParam('id');
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.deleteCycleForm = fb.group({});
    }

    ngAfterViewInit() {
       jQuery('#easDeleteNodeModal').modal();
    }

    functionCalling(node , self) {
       let nodeData = JSON.parse(node);
       let nodeType = this.nodeType = nodeData['data-node'];
       switch(nodeType) {
           case 'cycle':
                this.nodeInfo = this.cycleInfo = self.response.filter(function(cycle){
                    return (cycle.id === nodeData['data-id']) && cycle.name === nodeData['data-name'] ;
                })[0];
                break;

            case 'phase':
                this.cycleInfo = self.response.filter(function(cycle){
                    return (cycle.id === nodeData['data-cycleId']);
                })[0];
                this.nodeInfo = this.phaseInfo = this.cycleInfo.cyclePhases.filter(function(phase){
                    return (phase.id === nodeData['data-id']) && phase.name === nodeData['data-name'] ;
                })[0];
                break;
       }
    }

    deleteCycleFormSubmit(formObject) {
//        console.log('yes please delete node', this.nodeInfo);
        switch(this.nodeType) {
            case 'cycle':
                this.zephyrStore.dispatch(this._testcaseEASAction.deleteCycle(this.nodeInfo.id));
                break;

            case 'phase':
                this.zephyrStore.dispatch(this._testcaseEASAction.deletePhase(this.cycleInfo.id, this.phaseInfo.id));
                break;
        }

        jQuery('#easDeleteNodeModal').modal('hide');
    }
}
