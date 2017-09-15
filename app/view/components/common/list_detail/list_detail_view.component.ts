import {Component, Input, Output, EventEmitter} from '@angular/core';

import {ZephyrStore} from '../../../../store/zephyr.store';
import {GlobalAction} from '../../../../actions/global.action';
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';

import './list_detail_view.scss';

@Component({
    selector: 'zee-list-detail-view',
    templateUrl: 'list_detail_view.html',
    providers: [GlobalAction]
    // styleUrls: ['list_detail_view.scss']
})

export class ListDetailViewComponent {

    @Input() isDetailView: boolean = false;
    @Output() toggleListDetailView: EventEmitter<any> = new EventEmitter();
    i18nMessages = I18N_MESSAGES;
    private _zephyrStore;
    private doDirtyCheck = true;
    constructor(private globalAction: GlobalAction) {
        this._zephyrStore = ZephyrStore.getZephyrStore();
    }

    toggleListDetailUI(isDetailViewType) {
        if (this.promptForSave()) {
            return;
        }
        this.isDetailView = isDetailViewType;
        this.toggleListDetailView.emit(isDetailViewType);
    }
    promptForSave() {
        let isDirty = this._zephyrStore.getState().global.isDirty;
        if (this.doDirtyCheck && isDirty && !confirm('There is unsaved data in the testcase. Are you sure you want to continue?')) {
            return true;
        }
        this._zephyrStore.dispatch(this.globalAction.clearDirtyCheck());
        return false;

    }
}
