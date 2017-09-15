import {Component, Output, EventEmitter, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModalComponent} from '../../../common/modal/modal.component';

declare var jQuery: any;

@Component({
    templateUrl: 'tcr_deleteNode.html'
})

export class TcrDeleteNodeComponent {
    @ViewChild(ModalComponent) modal: ModalComponent;
    @Output() deleteNode: EventEmitter<any> = new EventEmitter();
    _releaseId;
    constructor(private route: ActivatedRoute) {
        //this._releaseId = params.getParam('id');
        this.route.params.subscribe(params => {
            this._releaseId = params['id'];
        });
    }
    setNode() {
        this.modal.forceShow({
            preLaunch: true,
            title: 'Delete Node',
            modalId: 'tcrDeleteNodeModal',
            modalSize: 'small'
        });
    }
    deleteTcrNode() {
        this.deleteNode.emit(this._releaseId);
    }
}
