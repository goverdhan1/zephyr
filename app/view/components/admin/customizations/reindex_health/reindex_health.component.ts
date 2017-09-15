import {Component  , OnDestroy , AfterViewInit , Output , EventEmitter} from '@angular/core';
import { ZephyrStore } from '../../../../../store/zephyr.store';
import { AdminAction } from '../../../../../actions/admin.action';

declare var jQuery: any, _;

@Component({
  selector: 'reindex-health-modal',
  viewProviders: [AdminAction],
  templateUrl: 'reindex_health.html',
})

export class ReindexHealthModalComponent implements AfterViewInit, OnDestroy {
    @Output() confirmationDialogueData: EventEmitter<any> = new EventEmitter();
    public projectStatuses = [];
    zephyrStore;
    state;
    unsubscribe;
    constructor(private _adminAction: AdminAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this.zephyrStore.subscribe(() => {
          this.zephyrStore = ZephyrStore.getZephyrStore();

          if(this.zephyrStore.getState().adminPref.event === 'INDEXING_HEALTH_STATUS') {
            this.projectStatuses = this.zephyrStore.getState().adminPref.data;
            this._adminAction.clearAdminEvents();
          }
        });
    }

    ngAfterViewInit () {
       jQuery('#reindex-health-modal').on('shown.bs.modal', (e) => {
          this.zephyrStore.dispatch(this._adminAction.getReindexHealth());
        });
    }

    refreshIndexingHealth(ev) {
      this.zephyrStore.dispatch(this._adminAction.getReindexHealth());
    }

    ngOnDestroy() {
      this.unsubscribe();
    }
  }
