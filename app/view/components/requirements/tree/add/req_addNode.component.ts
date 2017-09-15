import {Component, Output, EventEmitter, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {ModalComponent} from '../../../common/modal/modal.component';

import {FormInputValidator} from '../../../../validators/form_input_validator';

declare var jQuery: any;

@Component({
    templateUrl: 'req_addNode.html'
})

export class ReqAddNodeComponent {
    @ViewChild(ModalComponent) modal: ModalComponent;
    @Output() createNode: EventEmitter<any> = new EventEmitter();
    @Output() destroyComponent: EventEmitter<any> = new EventEmitter();

    _releaseId;
    addNodeForm;
    constructor(private route: ActivatedRoute, fb: FormBuilder) {
        this.route.params.subscribe(params => {
            this._releaseId = params['id'];
        });
        this.addNodeForm = fb.group({
          name: ['', Validators.compose([Validators.required, Validators.pattern('^.{1,255}$'), FormInputValidator.invalidateOnlySpaces])],
          description: ['', Validators.pattern('^(.|[\n\r]){0,1024}$')]
        });
    }

    removeModal(){
      this.destroyComponent.emit();
    }

    setNode() {
        this.modal.onOpen.subscribe(() => {
            jQuery('#addNodeDescription').val('');
            jQuery('#addNodeName').val('').focus();
        });

        this.modal.onClose.subscribe(() => {
            this.removeModal();
        });
        this.modal.forceShow({
            preLaunch: true,
            title: 'Add Node',
            modalId: 'reqAddNodeModal',
            modalSize: 'small'
        });
    }

    inputKeyPress(event) {
      if (event.which == 13 || event.keyCode == 13) {
        let nodeName = jQuery('#addNodeName').val();

        if (nodeName.length) {
          this.createReqNode();
        }

        return false;
      }
      return true;
    }

    createReqNode() {
        let nodeName = jQuery('#addNodeName').val(),
            nodeDesc = jQuery('#addNodeDescription').val();

        let params = {name: nodeName, description: nodeDesc, type: 'req', releaseIds: [this._releaseId]};

        this.createNode.emit(params);
    }
}
