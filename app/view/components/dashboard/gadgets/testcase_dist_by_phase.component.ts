import {Component, Input, AfterViewInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

declare var $, _;
import {GadgetAction} from '../../../../actions/gadget.action';
import {ZephyrStore} from '../../../../store/zephyr.store';
// import {TestDistChartDirective} from '../../../directives/charts/test_dist_chart.directive';
import {ZQLProjectReleaseSelectionComponent} from  './project_release_selection_gadget.component';
// Constants
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';

@Component({
	selector: 'test-dist-by-phase',
	templateUrl: 'test_dist_by_phase.html',
    providers: [GadgetAction]
   // directives: [TestDistChartDirective, ZQLProjectReleaseSelectionComponent]
})

export class TestCaseDistByPhaseComponent implements AfterViewInit {
    @ViewChild(ZQLProjectReleaseSelectionComponent) projectReleaseCmp;
    @Output() onEditModeUpdate = new EventEmitter();
    @Output() onSaveUpdate = new EventEmitter();
    componentOptions;
    editMode;
    gadgetName;
    zephyrStore;
    projectReleaseParams;
    childList;
    keyWords;
    selectedChartType;
    chartStack;
    gadgetId;
    testDistData = [];
    dashBoardLayout;
	i18nMessages = I18N_MESSAGES;
    private _dashboardId;
    constructor(private _gadgetAction: GadgetAction, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this._dashboardId = params['id'];
        });
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.zephyrStore.subscribe(() => {
            this.onStateChange();
        });
    }
    ngAfterViewInit() {
        /**
         * Instead of ngIf using toggle mechanism
         * as don't want to recreate the viewchild on every mode toggle
         */
        this.toggleViewMode();
        setTimeout(() => {
            this.selectedChartType = this.componentOptions.params.chartType;
        }, 10);
    }
    onStateChange() {
        this.populateLayout();
        this.chartStack = this.zephyrStore.getState().gadget[this.gadgetId];
        if(!this.chartStack) {
            return;
        }
        let data = this.chartStack[this.chartStack.length - 1];
        if(data) {
            this.childList = data.childList;
            this.keyWords = data.keyWords;
            this.testDistData = data.childList;
        }
    }
    populateLayout() {
        let dashboards = this.zephyrStore.getState().dashboards.rows;
        this.dashBoardLayout = _.find(dashboards, {id: this._dashboardId}).style.layout;
    }
    toggleViewMode() {
        if(this.editMode) {
            $('#zui-gadget-edit-mode-' + this.componentOptions.id).show();
            $('#zui-gadget-view-mode-' + this.componentOptions.id).hide();
        } else {
            $('#zui-gadget-edit-mode-' + this.componentOptions.id).hide();
            $('#zui-gadget-view-mode-' + this.componentOptions.id).show();
            setTimeout(() => {
                this.populateChartData();
            }, 10);
        }
    }
    /*
     * On save, update the component options
     */
    onSaveEditGadget() {
        this.componentOptions.params.chartType = this.selectedChartType;
        _.merge(this.componentOptions.params, this.projectReleaseParams);
        this.componentOptions.params.searchString = 'searchstring=releaseid:' +  this.componentOptions.params.releaseId;
        let _params = {
            name: this.gadgetName,
            componentOptions: this.componentOptions
        };
        this.onSaveUpdate.emit(_params);
        /**
         * Update to view mode
         */
        this.editMode = false;
        this.onEditModeUpdate.emit(false);
        this.toggleViewMode();
    }
    /**
     * Cancel the edit operation
     * Display the view mode
     */
    onCancelEditGadget() {
        this.editMode = false;
        this.selectedChartType = this.componentOptions.params.chartType;
        this.projectReleaseCmp.updateParamsOnCancel(this.componentOptions.params.projectId, this.componentOptions.params.releaseId);
        this.onEditModeUpdate.emit(false);
        this.toggleViewMode();
    }
    onChartTypeChange(ev) {
        this.selectedChartType = ev.target.value;
    }
    replaceAll(str, find, replace) {
      return str.replace(new RegExp(find, 'g'), replace);
    }
    populateChartData() {
        let query = 'chartkey=' + this.componentOptions.params.chartKey + '&' +
            this.componentOptions.params.searchString;
        this.zephyrStore.dispatch(this._gadgetAction.getDrillDownData(query, true, this.gadgetId));
       // console.log('Chart Data Loaded');
    }
    fetchNextLevelChart(contextString) {
        if(!contextString) {
            //console.log('No more data to fetch');
            return;
        }
        this.componentOptions.params.searchString = this.replaceAll(contextString, 'contextstring', 'searchstring');
        let query = 'chartkey=' + this.componentOptions.params.chartKey +
            '&' + this.componentOptions.params.searchString;
        // Save the level status
        /*this.onSaveUpdate.emit({
            name: this.gadgetName,
            componentOptions: this.componentOptions
        });*/
        this.zephyrStore.dispatch(this._gadgetAction.getDrillDownData(query, false, this.gadgetId));
    }
    manageStack(index) {
        this.zephyrStore.dispatch(this._gadgetAction.updateChartStack(index, this.gadgetId));
    }
    popFromChartStack() {
        this.zephyrStore.dispatch(this._gadgetAction.popFromChartStack(this.gadgetId));
    }
    updateProjectReleaseIds(ev) {
        this.projectReleaseParams = ev;
    }
}
