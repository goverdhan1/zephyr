import {Component, Output, EventEmitter, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {I18N_MESSAGES} from '../../../../../utils/messages/messages.en';
import {ModalComponent} from '../../../common/modal/modal.component';

declare var jQuery: any;

@Component({
    templateUrl: 'req_deleteNode.html'
})

export class ReqDeleteNodeComponent {
    @ViewChild(ModalComponent) modal: ModalComponent;
    _releaseId;
    nodeName;
    isDeAllocate = true;
    @Output() deleteNode: EventEmitter<any> = new EventEmitter();
    @Output() deallocateNode: EventEmitter<any> = new EventEmitter();
    @Output() destroyComponent: EventEmitter<any> = new EventEmitter();
    i18nMessages = I18N_MESSAGES;
    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this._releaseId = params['id'];
        });

        jQuery('#reqDeleteNodeModal').modal('show');
    }
    setNode(obj) {
        this.nodeName = obj.nodeName;
        this.isDeAllocate = obj.isDeAllocate;
        this.modal.forceShow({
            preLaunch: true,
            title: 'Delete Node',
            modalId: 'reqDeleteNodeModal',
            medium: 'small'
        });
    }
    onOpen() {
        jQuery('#reqDeleteNodeModal').off('hidden.bs.modal').on('hidden.bs.modal', ev => {
            this.destroyComponent.emit();
        });
    }
    deleteReqNode(ev) {
        this.deleteNode.emit(this._releaseId);
    }
    deallocateReqNode() {
        this.deallocateNode.emit(this._releaseId);
    }
}
