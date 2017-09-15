import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ModalComponent} from '../../../common/modal/modal.component';
import {FormInputValidator} from '../../../../validators/form_input_validator';

declare var jQuery: any, _;

@Component({
    templateUrl: 'tcr_renameNode.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TcrRenameNodeComponent {
    @ViewChild(ModalComponent) modal: ModalComponent;
    @Output() renameNode: EventEmitter<any> = new EventEmitter();
    _releaseId;
    _previousForm;
    editNodeForm;
    constructor(private route: ActivatedRoute, private fb: FormBuilder) {
        this.route.params.subscribe(params => {
            this._releaseId = params['id'];
        });

        this.editNodeForm = fb.group({
          name: ['', Validators.compose([Validators.required, Validators.pattern('^.{1,128}$'), FormInputValidator.invalidateOnlySpaces])],
          description: ['', Validators.pattern('^(.|[\n\r]){0,1024}$')]
        });
        this._previousForm = _.cloneDeep(this.editNodeForm);
    }

    setNode(node) {
        this.editNodeForm = this.fb.group({
          name: [node.name, Validators.compose([Validators.required, Validators.pattern('^.{1,128}$'), FormInputValidator.invalidateOnlySpaces])],
          description: [node.description, Validators.pattern('^(.|[\n\r]){0,1024}$')]
        });
        this.modal.onOpen.subscribe(ev => {
            jQuery('#nodeDescription').val(node.description || '');
            jQuery('#testcaseNodeName').val(node.name || '').focus();
        });
        this.modal.forceShow({
            preLaunch: true,
            title: 'Rename Node',
            modalId: 'tcrRenameNodeModal',
            modalSize: 'small'
        });
        this._previousForm = _.cloneDeep(this.editNodeForm);
    }

    inputKeyPress(event) {
      if (event.which == 13 || event.keyCode == 13) {
        let nodeName = jQuery('#testcaseNodeName').val();

        if (nodeName.length) {
          this.renameTcrNode();
        }

        return false;
      }
      return true;
    }

    renameTcrNode() {
        let nodeName = jQuery('#testcaseNodeName').val(),
            nodeDesc = jQuery('#nodeDescription').val();

        let params = {name: nodeName, description: nodeDesc, type: 'module', releaseId: this._releaseId};

        this.renameNode.emit(params);
    }
    hasFormChanges() {
        if(JSON.stringify(this.editNodeForm.value) != JSON.stringify(this._previousForm.value)) {
            return true;
        }
        return false;
    }
    isFormValid(form) {
        return !this.hasFormChanges() || form.invalid;
    }
}
