import {Component , AfterViewInit} from '@angular/core';
//import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control} from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {ActivatedRoute} from '@angular/router';
import {TestcaseEASAction} from '../../../../../../actions/testcaseEAS.action';
import {ZephyrStore} from '../../../../../../store/zephyr.store';
import {FormInputValidator} from '../../../../../validators/form_input_validator';

declare var jQuery: any, _;

@Component({
    templateUrl: 'eas_freeform_edit.html'
})

export class EasFreeformEditComponent implements AfterViewInit {
    cyclephaseid;
    _previousValue;
    zephyrStore;
    editNodeForm;
    node;

    constructor(private _testcaseEASAction: TestcaseEASAction , fb: FormBuilder, private route: ActivatedRoute) {
        //this.cyclephaseid = params.getParam('id');
        this.route.params.subscribe(params => {
            this.cyclephaseid = params['id'];
        });
        this.zephyrStore = ZephyrStore.getZephyrStore();

        this.editNodeForm = fb.group({
          name: ['', Validators.compose([Validators.required, FormInputValidator.invalidateOnlySpaces])],
          description: ['', Validators.pattern('^(.|[\n\r]){0,1024}$')]
         });
         this._previousValue = _.cloneDeep(this.editNodeForm.value);
    }

    ngAfterViewInit() {
       jQuery('#easEditNodeModal').modal();
    }

    functionCalling(node , self) {
       this.node = node;
       let data = JSON.parse(this.node.item.nodeData);
       (<FormControl>this.editNodeForm.controls['name'])
         .setValue(data['data-name']);
       (<FormControl>this.editNodeForm.controls['description'])
         .setValue(data['data-description']);
        this._previousValue = _.cloneDeep(this.editNodeForm.value);
    }

    editFreeformNode (formValues) {
       let data = JSON.parse(this.node.item.nodeData);
       formValues['cyclephaseid'] = this.cyclephaseid;
       formValues['treeId'] = data['data-id'];
       jQuery('#easEditNodeModal').modal('hide');

       formValues.description = formValues.description ? formValues.description : '';
       this.zephyrStore.dispatch(this._testcaseEASAction.updateTreeNode(formValues));
    }

    hasFormChanges() {
      let previousString = JSON.stringify(this._previousValue);
      let currentString = JSON.stringify(this.editNodeForm.value);
      if(previousString == currentString) {
        return false;
      }
      return true;
    }
    isFormInValid(form) {
      return !this.hasFormChanges() || form.invalid;
    }
}
