  import {Inject, OnDestroy, AfterViewChecked, Component, Input, AfterViewInit,
      ElementRef, Injector, Output, EventEmitter, ViewChild, ViewContainerRef, HostBinding,
      ChangeDetectionStrategy, ComponentRef, ComponentFactoryResolver} from '@angular/core';
import {TestCaseDistByPhaseComponent} from './gadgets/testcase_dist_by_phase.component';

import {Http, Headers} from '@angular/http';

import { Subscription }   from 'rxjs/Subscription';
import { EventHttpService } from '../../../services/event-http.service';

// import {Component, Input, AfterViewInit, DynamicComponentLoader,
//     Injector, Output, EventEmitter, ViewChild, ViewContainerRef,
//     ComponentResolver, ComponentRef} from '@angular/core';

import {ZephyrStore} from '../../../store/zephyr.store';
import {DashboardAction} from '../../../actions/dashboard.action';

import {
  FETCH_ALL_GADGETS_SUCCESS,
  SORT_DASHBOARD_DATA_SUCCESS, FETCH_DASHBOARD_SUCCESS, CREATE_GADGET_SUCCESS, UPDATE_GADGET_SUCCESS, UPDATE_DASHBOARD_SUCCESS,
  GET_GADGET_DATA_SUCCESS,  DELETE_GADGET_SUCCESS
} from '../../../utils/constants/action.events';


declare var $, _, Masonry;
import {getGadgetComponentByName, checkDefectTrackingEnabled} from './dashboard_gadget_components.util';
// Constants
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';
import {FETCH_ALL_DASHBOARDS_SUCCESS} from '../../../utils/constants/action.events';
import {DASHBOARD_PREDEFINED_GADGETS, DASHBOARD_GADGET_INITIAL_STATE, DASHBOARD_GADGETS_MAPPING} from './dashboard.constant';

@Component({
	selector: 'zui-dashboard-gadget',
	templateUrl: 'dashboard_gadget.html',
    viewProviders: [DashboardAction]
})

export class DashboardGadgetComponent implements AfterViewChecked, OnDestroy {
    @Input() gadget;
    @Input() layout ;
    @Input() _userId;
    @Input() createdBy;
    @HostBinding('class') classes = 'col-xs-12';
    @HostBinding('id') gadgetId = 'gadget-';
    @ViewChild('target', {read: ViewContainerRef}) target;
    cmpRef: ComponentRef<any>;
    hasConfigError = false;
    refreshTimeout = null;
    resetMasonryInterval = null;
    timeout = -1;
    defectTrackingEnabled = null;
    unsubscribe;
    eventAttached = false;
    data;
    httpStartSubscriber: Subscription;
    httpEndSubscriber: Subscription;
    _zephyrStore;
    @Output() onDeleteGadget: EventEmitter<any> = new EventEmitter();
    @Output() onUpdateGadget: EventEmitter<any> = new EventEmitter();
    i18nMessages = I18N_MESSAGES;
    masonryRef: any;

    constructor(@Inject(ElementRef) private elementRef: ElementRef, @Inject(Http) private _http : any, private _dashboardAction: DashboardAction,
      private vcRef: ViewContainerRef, private resolver: ComponentFactoryResolver) {

      this.httpEndSubscriber = this._http.httpCallCompletedObservable.subscribe(
        () => {
            this.initializeMasonry();
        });

      // this.httpEndSubscriber = this._http. httpCallStartedObservable.subscribe(
      //   () => {
      //     // this.destroyMasonry();
      //   });

    }

    ngAfterViewChecked() {
      setTimeout(() => {
        this.defectTrackingEnabled = checkDefectTrackingEnabled();

        if (!this.cmpRef) {
          if(!this.gadget.properties.component.name || !getGadgetComponentByName(this.gadget.properties.component.name)) {
            //  console.log('No gadget component found!');
            return;
          }

          this._zephyrStore = ZephyrStore.getZephyrStore();

          let _gadgetId = this.gadget.id || '', _gadgetHTMLID = '#zephyr-gadget-component-' + _gadgetId;

          let componentFactory = this.resolver.resolveComponentFactory(getGadgetComponentByName(this.gadget.properties.component.name));
          this.cmpRef = this.target.createComponent(componentFactory);
          this.classes = "gadget-component col-xs-" + (12 / parseInt(this.layout));
          this.gadgetId = `gadget-${this.gadget.id}`;
          this.attachComponentDataAndEvents();
        }
      }, 1000);
    }

    destroyMasonry() {
      if(this.masonryRef){
        this.masonryRef.destroy();
      }
      // $('#gadget-target').masonry().masonry('destroy');
    }

    initializeMasonry() {
      setTimeout(() => {
        let items = $(document).find('#zui-gadget-sortable').length;

        if (items) {
          this.masonryRef = new Masonry('#zui-gadget-sortable', {
            itemSelector: '.gadget-component',
            columnWidth: '.gadget-component',
            percentPosition: true
          });

          this.masonryRef.reloadItems();
        }
      }, 100);
    }

    ngOnDestroy() {
      clearTimeout(this.refreshTimeout);
      this.httpEndSubscriber.unsubscribe();
      this.destroyMasonry();
    }

    changeLayout(layout) {
      this.layout = layout;
      this.classes = "gadget-component col-xs-" + (12 / parseInt(this.layout));

      setTimeout(() => {
        this.initializeMasonry();

        if(this.cmpRef.instance.toggleChart) {
          this.cmpRef.instance.toggleChart();
        }
      }, 100);
    }

  refreshGadget(justRefresh = false) {

      if (justRefresh) {
        clearTimeout(this.refreshTimeout);
        this.cmpRef.instance.refreshMetrics();
        this.refreshGadget();
      } else if (this.gadget.projectId && this.gadget.refreshInterval) {
        if (this.timeout !== -1) {
          // this.cmpRef.instance.refreshMetrics();

          this.refreshTimeout = setTimeout(() => {
            this.refreshGadget(true);
          }, this.timeout);
        } else {

          let gadgets = this._zephyrStore.getState().dashboards.gadgets;

          if (gadgets.length) {
            let gadget = _.filter(gadgets, {component : this.gadget.component})[0];
            let refreshRate = _.filter(gadget.refreshValues, {id : this.gadget.refreshInterval});

            if (refreshRate.length) {
              refreshRate = refreshRate[0].value;
              this.timeout = (_.toNumber(refreshRate) * 60 * 1000);
              this.refreshGadget();//calling refreshGadget after setting timeout.
            }

          } else {
            setTimeout(() => {
              this.refreshGadget();
            }, 1000);
          }

        }
      }
    }

    /**
     * set the component data
     * Subscribe to the events
     */
    attachComponentDataAndEvents() {
        this.eventAttached = true;
        this.setGadgetConfig();

        this.cmpRef.instance.saveConfigEmitter.subscribe((config) => {
          this.gadget = config;
          this.hasConfigError = false;
          this.onUpdateGadget.emit(_.cloneDeep(this.gadget));
          clearTimeout(this.refreshTimeout);
          this.startRefreshTimer(this.gadget.refreshInterval);
        });

        this.cmpRef.instance.onConfigErrorEmitter.subscribe((error) => {
          if (error.noError) {
            this.hasConfigError = false;
          } else {
            $(this.elementRef.nativeElement).find(".error-message").text(error.message);
            this.hasConfigError = true;
          }

          // this.gadget = config;
          // this.onUpdateGadget.emit(_.cloneDeep(this.gadget));
        });

        this.cmpRef.instance.cancelConfigEmitter.subscribe((config) => {
            // this.resetMasonry();
        });

        this.onToggleOfMinimize(this.gadget.properties.settings.minimize, false);
        this.startRefreshTimer(this.gadget.refreshInterval);

        this.updateLastRefreshTime();
    }

  updateLastRefreshTime() {
      this.cmpRef.instance.lastRefreshTimeLabel = this.cmpRef.instance.lastRefreshTime.fromNow();

      setTimeout(() => {
        this.updateLastRefreshTime();
      }, 60000);

    }

    setGadgetConfig() {
        this.cmpRef.instance.setConfig(this.gadget.id, this.gadget);
    }

    startRefreshTimer(time) {
      if (time) {
        this.hasConfigError = false;
        setTimeout(() => {
          this.refreshGadget();
        }, time);
      }
    }

    toggleConfigurationMode() {
      this.hasConfigError = false;

      this.cmpRef.instance.toggleConfigurationMode(true);
        // this.resetMasonry();
      setTimeout(() => {
        this.initializeMasonry();
      }, 100);
    }

    /**
     * Delete the Gadget
     */
    onClickDeleteGadget() {
        $('#zui-gadget-modal-delete-' + this.gadget.id).modal('hide');
        this.onDeleteGadget.emit({id: this.gadget.id, dashboardId : this.gadget.dashboardId});
    }
    /**
     * Update the Gadget
     */
    onClickEditGadget() {
        this.gadget.settings.editMode = this.cmpRef.instance.editMode = true;
        this.cmpRef.instance.toggleViewMode();
        this.onUpdateGadget.emit(this.gadget);
    }
    /**
     * On toggle of minimize and maximize
     */
    onToggleOfMinimize(value, sendCall = true) {
        let _gadgetId = this.gadget.id || '',
            _gadgetHTMLID = '#zephyr-gadget-component-' + _gadgetId;
        this.gadget.properties.settings.minimize = value;

        /*
         * Doing this here and not in html as we don't want to re-render
         * html by using *ngIf and [hidden] property is not recommended due to its css issue
         */

        $(_gadgetHTMLID).parent().toggle(!value);

        this.initializeMasonry();

        if (sendCall) {
          //this.onUpdateGadget.emit(this.gadget);
        }
        // this.resetMasonry();
    }
}
