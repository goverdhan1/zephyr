import {Component, Input, Output, OnChanges,
    EventEmitter, AfterViewInit, ElementRef, Inject, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ZephyrStore} from '../../../../../store/zephyr.store';
import {LeftnavAction} from '../../../../../actions/leftnav.action';
import {UserAction} from '../../../../../actions/user.action';
declare var location: any, jQuery: any, _: any;


@Component({
	selector: 'zui-administration-left-nav',
	templateUrl: 'admin_leftnav.html',
  providers: [LeftnavAction]
})
export class AdminLeftNavComponent implements AfterViewInit, OnDestroy, OnChanges {
    @Input() activeGroupKey = '';
    @Input() activeItemKey = '';
    @Input() hideSubHeader;
    zephyrStore;
    unsubscribe;
    column = {
        header: {},
        subHeader: {
            items: [],
            id: null,
            name: '',
            lastVisitedItems: []
        },
        group: []
    };
    constructor(private route: ActivatedRoute, public router: Router,
    private _leftnavAction: LeftnavAction, private _userAction: UserAction) {
      this.zephyrStore = ZephyrStore.getZephyrStore();
      this.unsubscribe = this.zephyrStore.subscribe(() => {
          let _state = this.zephyrStore.getState();
          this.column = _state.leftnav.administration;
          if(_state.loggedInUser.event == 'LOGGEDIN_USER_PERMISSIONS_SUCCESS') {
            this.zephyrStore.dispatch(this._userAction.clearUserEvent());
            this.zephyrStore.dispatch(this._leftnavAction.setLeftNavPermissions('administration'));
          }
      });
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    ngAfterViewInit() {
      this.zephyrStore.dispatch(this._leftnavAction.fetchLeftNavDetails('administration', null));
    }
    ngOnChanges(changedNode) {
        if(this.activeItemKey) {
            this.zephyrStore.dispatch(
            this._leftnavAction.setActiveItem('administration', this.activeGroupKey, this.activeItemKey)
            );
        }
    }
    navigateToLink(ev) {
        if(ev.link) {
          this.router.navigateByUrl(ev.link);
        }
    }
}
