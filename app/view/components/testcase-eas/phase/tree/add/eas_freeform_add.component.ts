import {Component, AfterViewInit} from '@angular/core';
//import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control} from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {TestcaseEASAction} from '../../../../../../actions/testcaseEAS.action';
import {ZephyrStore} from '../../../../../../store/zephyr.store';
import {FormInputValidator} from '../../../../../validators/form_input_validator';

declare var jQuery: any;

@Component({
    templateUrl: 'eas_freeform_add.html'
})

export class EasFreeformAddComponent implements AfterViewInit {
    _releaseId;
    zephyrStore;
    addNodeForm;
    node;

    constructor(private _testcaseEASAction: TestcaseEASAction, fb: FormBuilder, private route: ActivatedRoute) {
        //this._releaseId = params.getParam('id');
        this.route.params.subscribe(params => {
            this._releaseId = params['id'];
        });
        this.zephyrStore = ZephyrStore.getZephyrStore();

        this.addNodeForm = fb.group({
          name: ['', Validators.compose([Validators.required, FormInputValidator.invalidateOnlySpaces])],
          description: ['', Validators.pattern('^(.|[\n\r]){0,1024}$')]
         });
    }

    ngAfterViewInit() {
       jQuery('#easAddNodeModal').modal();
    }

    functionCalling(node , self) {
       this.node = node;
    }
    createFreeformNode (formValues) {
       let data = JSON.parse(this.node.item.nodeData);
       jQuery('#easAddNodeModal').modal('hide');
       formValues.cyclephaseid = this._releaseId;
       formValues.parentId = data['data-id'];
       this.zephyrStore.dispatch(this._testcaseEASAction.addTreeNode(formValues));
    }
}
