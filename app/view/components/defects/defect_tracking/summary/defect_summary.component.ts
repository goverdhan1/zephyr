import {Component, ViewChild, Injector, AfterViewInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ZephyrStore} from '../../../../../store/zephyr.store';
import {DefectsAction} from '../../../../../actions/defects.action';

// Constants
import {I18N_MESSAGES} from '../../../../../utils/messages/messages.en';

declare var jQuery: any, _;

@Component({
    selector: 'zee-defect-summary',
    templateUrl: 'defect_summary.html',
    viewProviders: [DefectsAction]
})

export class DefectSummaryComponent implements AfterViewInit {
    summaries = [];
    releaseId;
    i18nMessages = I18N_MESSAGES;
    private zephyrStore;
    constructor(private route: ActivatedRoute, private _defectsAction: DefectsAction) {
        this.route.params.subscribe(params => {
          this.releaseId = params['id'];
        });
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.zephyrStore.subscribe((x) => {
            this.onStateChange();
        });
    }
    ngAfterViewInit() {
        this.getDefectSummary();
    }
    onStateChange() {
        let state = this.zephyrStore.getState();
        this.summaries = this.zephyrStore.getState().defectSummaries.defects;
    }
    getDefectSummary() {
        this.zephyrStore.dispatch(this._defectsAction.fetchDefectSummaries(this.releaseId));
    }
}
