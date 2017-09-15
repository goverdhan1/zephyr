import {Component, Input, AfterViewInit, OnChanges} from '@angular/core';

import {ZephyrStore} from '../../../../../../store/zephyr.store';
import {DefectsAction} from '../../../../../../actions/defects.action';

// Constants
import {API_PATH} from '../../../../../../utils/constants/api.constants';
import {I18N_MESSAGES} from '../../../../../../utils/messages/messages.en';

declare var jQuery: any, _;

@Component({
	selector: 'zee-defect-export',
    templateUrl: 'defect_export.html'
})
export class DefectExportComponent implements AfterViewInit, OnChanges  {
    zephyrStore;
    @Input() fieldOptions;
    @Input() defectIds;
    @Input() disabled = false;
    @Input() maxAllowed = 0;
    exportDownloadLink = null;
    i18nMessages = I18N_MESSAGES;
    constructor(private _defectsAction: DefectsAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.zephyrStore.subscribe((x) => {
            this.onStateChange();
        });
    }
    ngAfterViewInit() {
        this.toggleButton();
    }
	ngOnChanges(changedNode) {
        this.toggleButton();
    }
    onStateChange() {
        let defectDetailsState = this.zephyrStore.getState().defectDetails;
        if(defectDetailsState.event === 'EXPORT_DEFECTS_SUCCESS') {
            this.zephyrStore.dispatch(this._defectsAction.clearDefectDetailsEvent());
            this.exportDownloadLink = defectDetailsState.exportDownloadLink;
            if(this.exportDownloadLink) {
                jQuery('#zui-export-modal-' + this.fieldOptions.id + '-download').modal('show');
            }
        }
    }
    toggleButton() {
        if (this.defectIds && this.defectIds.length && (!this.disabled)) {
            jQuery('#zui-export-modal-trigger-' + this.fieldOptions.id).removeAttr('disabled');
        } else {
            jQuery('#zui-export-modal-trigger-' + this.fieldOptions.id).attr('disabled', 'disabled');
        }

    }
    exportDefects() {
        this.zephyrStore.dispatch(this._defectsAction.exportDefectsbyIds(this.defectIds));
    }
    onClickDownloadFile() {
        let defectDetailsState = this.zephyrStore.getState().defectDetails;
        this.exportDownloadLink = defectDetailsState.exportDownloadLink;
        document.getElementById('export-file-download-iframe')['src'] = API_PATH.BASE_FLEX + '/' +  this.exportDownloadLink;
        jQuery('#zui-export-modal-' + this.fieldOptions.id + '-download').modal('hide');
    }
}
