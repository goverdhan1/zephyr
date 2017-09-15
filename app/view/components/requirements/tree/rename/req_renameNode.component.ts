import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {FormInputValidator} from '../../../../validators/form_input_validator';

declare var jQuery: any;

@Component({
    templateUrl: 'req_renameNode.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ReqRenameNodeComponent {
    @Output() renameNode: EventEmitter<any> = new EventEmitter();
    _releaseId;
    editNodeForm;
    constructor(private route: ActivatedRoute, private fb: FormBuilder) {
        this.route.params.subscribe(params => {
            this._releaseId = params['id'];
        });
        this.editNodeForm = fb.group({
          name: ['', Validators.compose([Validators.required, Validators.pattern('^.{1,128}$'), FormInputValidator.invalidateOnlySpaces])],
          description: ['', Validators.pattern('^(.|[\n\r]){0,1024}$')]
        });
        jQuery('#reqRenameNodeModal').modal('show');
    }
    setNode(node) {
        this.editNodeForm = this.fb.group({
          name: [node.name, Validators.compose([Validators.required, Validators.pattern('^.{1,255}$'), FormInputValidator.invalidateOnlySpaces])],
          description: [node.description, Validators.pattern('^(.|[\n\r]){0,1024}$')]
        });
        jQuery('#reqRenameNodeModal').on('shown.bs.modal', () => {
            jQuery('#nodeDescription').val(node.description || '');
            jQuery('#renameNodeName').val(node.name || '').focus();
        });
    }

    inputKeyPress(event) {
      if (event.which == 13 || event.keyCode == 13) {
        let nodeName = jQuery('#renameNodeName').val();

        if (nodeName.length) {
          this.renameReqNode();
        }

        return false;
      }
      return true;
    }


    renameReqNode() {
        let nodeName = jQuery('#renameNodeName').val(),
            nodeDesc = jQuery('#nodeDescription').val();

        let params = {name: nodeName, description: nodeDesc, type: 'module', releaseId: this._releaseId};

        this.renameNode.emit(params);
    }
}
