import {Component, Output, EventEmitter, AfterViewInit} from '@angular/core';

declare var jQuery: any;

@Component({
    templateUrl: 'req_syncNode.html'
})

export class ReqSyncNodeComponent implements AfterViewInit {
    isCascade = true;
    retryDeleted;
    @Output() syncNode: EventEmitter<any> = new EventEmitter();
    ngAfterViewInit() {
        jQuery('#reqSyncNodeModal').on('hidden.bs.modal', (ev) => {
            if(ev.target === ev.currentTarget) {
                this.removeModal();
            }
        });
    }
    syncReqNode() {
        this.syncNode.emit({isCascade: this.isCascade, retryDeleted: this.retryDeleted});
    }
    removeModal() {
        this.isCascade = false;
        this.retryDeleted = false;
        jQuery('div#reqSyncNodeModal').remove();
    }
}
