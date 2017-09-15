///<reference path='../../../../utils/localstorage/local-storage.util.ts'/>
import {Component, AfterViewInit, OnInit, ComponentRef, Input, ViewContainerRef, OnChanges, ElementRef,
    ComponentFactory, ComponentFactoryResolver, /*ComponentMetadata, */ ViewChild , OnDestroy} from '@angular/core';
import {Router, Routes, ActivatedRoute} from '@angular/router';

import {LeftNavComponent} from '../../common/leftnav/leftnav.component';
import {TreeComponent} from '../../common/tree/tree.component';
import {ZEE_NAV_COLUMNS} from '../../projects/project_leftnav.data';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {TestcaseEASAction} from '../../../../actions/testcaseEAS.action';
import {GridAction} from '../../../../actions/grid.action';
import {BreadCrumbComponent} from '../../common/breadcrumb/bread_crumb.component';
import {EasAddCycleComponent} from '../tree/add/eas_addCycle.component';
import {EasAddPhaseComponent} from '../tree/add/eas_addPhase.component';
import {EasEditCycleComponent} from '../tree/edit/eas_editCycle.component';
import {EasEditPhaseComponent} from '../tree/edit/eas_editPhase.component';
import {EasCloneCycleComponent} from '../tree/clone/eas_cloneCycle.component';
import {EasDeleteNodeComponent} from '../tree/delete/eas_deleteNode.component';
import {EasExportNodeComponent} from '../tree/export/eas_exportNode.component';
import {CustomContextMenuComponent} from '../../common/custom_context_menu/custom_context_menu.component';
import { ExportComponent } from '../../common/export/export.component';
import {ADD_NEW_CYCLE} from '../../../../utils/constants/action.events';
import {DomSanitizer} from '@angular/platform-browser';
import {UtililtyFunctions as Utils} from '../../../../utils/scripts/utils';
import {TCR_BULK_OPERATION_OPTIONS, TCR_BULK_OPERATION} from '../../tcr/operations/tcr_operations.constant';
import {
  NOTIFICATION_APP_CONSTANTS,
  NOTIFICATION_ENTITY_CONSTANTS
} from '../../../../utils/constants/notification.constants';
import {constructNotificationStoreMetadata} from '../../../../utils/notification/notification.util';
import {NotificationAction} from '../../../../actions/notification.action';
import {NotificationStore} from '../../../../store/notification.store';
import {ReleaseAction} from '../../../../actions/release.action';
import {ZephyrLocalStorage} from '../../../../utils/localstorage/local-storage.util';


declare var jQuery: any, moment: any, _: any, window: any;
var easSelf: any = null;

@Component({
    selector: 'testcase-eas-cycle',
    viewProviders: [TestcaseEASAction, GridAction, NotificationAction, Utils, ReleaseAction],
    templateUrl: 'testcase-eas-cycle.html'
})

export class TestCaseEASCycleComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

    @ViewChild('target', {read: ViewContainerRef}) target;
    @ViewChild(CustomContextMenuComponent) _customContextMenu: CustomContextMenuComponent;
    cmpRef:ComponentRef<any>;
    error: boolean = false;
    firedOnChanges = false;
    _reportType;
    cycleGrid: Array<Object>;
    public dt:Date;
    @Input() isEmbedded: Boolean = false;
    @Input() releaseId;
    @Input() forceSelect;
    public zephyrStore;
    previousParams: any;
    selectedNodeId;
    notificationStore;
    currentPage: number = 1;
    totalPage: number = 100;
    releaseObjectSelected;
    breadCrumbsList: Array<Object>;
    navColumns;
    paramSub;
    treeData: {};
    response = [];
    cyclePhases = [];
    releaseCycle = [];
    cyclesArray = [];
    removeFromDefault = ['dnd'];
    treeDrawn: boolean = false;
    days = [];
    colorArray = [];
    numDaysInMonth = [];
    monthsInYear = [];
    selectedTimeWindow;
    selectedTimeWindowText;
    calendarConfig : any;
    selectedIdTree;
    filterCriteria = {a_attr: 'data-node', value: 'cycle'};
    appId;
    easCalendarWidth:any = '100%';
    previousReleaseId;
    selectedCyclePhase;
    public unsubscribe;
    private isViewInitialized:boolean = false;
    private fieldOptions = _.cloneDeep(TCR_BULK_OPERATION_OPTIONS['export']);
    private el;
    private showDatePicker: boolean;
    constructor(public router: Router, private _testcaseEASAction: TestcaseEASAction, private _gridAction: GridAction,
                private vcRef: ViewContainerRef, private route: ActivatedRoute, private resolver: ComponentFactoryResolver,
                private _notificationAction:NotificationAction, private utils: Utils, private Sanitizer: DomSanitizer,
                private elementRef: ElementRef, private _releaseAction: ReleaseAction) {

        this.navColumns = ZEE_NAV_COLUMNS;
        this.appId = NOTIFICATION_APP_CONSTANTS.EAS_APP.name;
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.notificationStore = NotificationStore.getNotificationStore();

        this.showDatePicker = false;

        this.paramSub = this.route.params.subscribe(params => {
            this.releaseId = params['id'];
        });

        this.unsubscribe = this.zephyrStore.subscribe(() => {
            let state = this.zephyrStore.getState();
            let user = state.loggedInUser;
            let newPhaseInfo = state.testcaseEAS.isRoute;

            let UserAllocProj = JSON.parse(localStorage.getItem(`projects`));
            let isProjectAccess = _.find(UserAllocProj,['id',Number(this.releaseId)]);
            this.releaseObjectSelected = _.find(state.release.releases, ['id', Number(this.releaseId)]);

            if (!this.releaseObjectSelected && Object.keys(user).length && isProjectAccess && !this.isEmbedded) {
                this.zephyrStore.dispatch(this._releaseAction.fetchReleaseById(this.releaseId));
                return;
            }
            //else if(Object.keys(user).length){
              let breadCrumbsList = this.releaseObjectSelected ? [{id: '/release/' + this.releaseObjectSelected['id'], text: this.releaseObjectSelected['text']}] : [];
              if (!_.isEqual(breadCrumbsList, this.breadCrumbsList)) {
                this.breadCrumbsList = breadCrumbsList;
              }

           // }

            this.setLeftNavData(state);
            if (state.global.event == 'UPDATE_TREE') {
               this.zephyrStore.dispatch(this._gridAction.clearGlobalEvents());
               this.handleSubscriptions();
               this.zephyrStore.dispatch(this._testcaseEASAction.getAllCyclesAndPhases(this.releaseId));
            } else if (state.testcaseEAS.event == ADD_NEW_CYCLE) {
                this.zephyrStore.dispatch(this._testcaseEASAction.clearEvents(null));
                this.selectedIdTree = {node: state.testcaseEAS.createNewNode.id, silent: false, filter: this.filterCriteria};
            }
            if(newPhaseInfo) {
                let localPhaseInfo =  localStorage.getItem('localPhaseInfo') ? JSON.parse(localStorage.getItem('localPhaseInfo')) : undefined;
                if(!localPhaseInfo || (localPhaseInfo && localPhaseInfo.id !== newPhaseInfo.id)) {
                    localStorage.setItem('localPhaseInfo',JSON.stringify(newPhaseInfo));
                    this.router.navigate(['/testcase-eas/phase/', newPhaseInfo.id]);
                }

            }
            this.buildReleaseCycle();

        });
        this.colorArray = ['#94C779', '#E7BF7C', '#4EB161', '#6ABAEE', '#8F9293', '#5BC78F', '#f0ad4e'];

        this.calendarConfig = {
            'selectedTimeWindow': 'month',
            'startTimestamp': moment().startOf('day').unix() * 1000,
            'noOfDays': moment().startOf('month').daysInMonth(),
            'selectedTimeWindowText': ''
        };
        this.selectedTimeWindow = this.calendarConfig.selectedTimeWindow;
        this.selectedTimeWindowText = this.calendarConfig.selectedTimeWindowText = moment(this.calendarConfig.startTimestamp).format('MMMM YYYY');
        easSelf = this;

        this.paramSub = this.route.params.subscribe(params => {
          // this.releaseId = params['id'];
          this.setURLParams(params);
        });
    }

    getURLQueryParams() {
      let _qParams = {};

      if(this.selectedNodeId) {
        _qParams['treeId'] = this.selectedNodeId;
      }

      if (this.selectedTimeWindow) {
        _qParams['window'] = this.selectedTimeWindow;
        _qParams['start'] = this.calendarConfig.startTimestamp;
        _qParams['days'] = this.calendarConfig.noOfDays;
      }

      return _qParams;
    }

    updateRouteUrl() {
      let _urlParams = this.getURLQueryParams();
      this.router.navigate(['/testcase-eas/cycle/', this.releaseId, _urlParams]);
    }

    setURLParams(params) {
      // this.releaseId = params['id'];
      this.previousParams = params;

      if(params['treeId']) {
        this.selectedNodeId = +params['treeId'];
      }

      if (params['window']) {
        this.calendarConfig = {
          'selectedTimeWindow': params['window'],
          'startTimestamp': +params['start'],
          'noOfDays': +params['days'],
          'selectedTimeWindowText': ''
        };

        this.dt = moment(+params['start']);

        this.selectedTimeWindow = params['window'];

        this.calendarConfig['selectedTimeWindowText'] = moment(this.calendarConfig.startTimestamp).format('MMMM, YYYY');
      }

    }

    ngOnChanges(changes) {
      let state = this.zephyrStore.getState();
      let user = state.loggedInUser;
      if ( Object.keys(user).length) {
        if (changes['releaseId']) {
          this.firedOnChanges = true;
          this.zephyrStore.dispatch(this._testcaseEASAction.getAllCyclesAndPhases(this.releaseId));
        }
      }

    }

    ngOnInit() {
        this.handleSubscriptions();
        let currRelease = this.getCurrentReleaseFromLocalStorage();
        let currentProject;
        try {
            currentProject = JSON.parse(localStorage.getItem(`${window.tab}-currentProject`));
        } catch (err) {
            // console.log('err', err);
        }
        let state = this.zephyrStore.getState();
        let user = state.loggedInUser;
        let currReleaseID;
        try {
            currReleaseID = (currRelease ? currRelease.id : ((currRelease || [])[0] || {}).id);
        } catch (err) {
            console.log(err);
        }
        if (Object.keys(user).length) {
            if (this.releaseId || currReleaseID) {
                if (!this.firedOnChanges) {
                    this.zephyrStore.dispatch(this._testcaseEASAction.getAllCyclesAndPhases(this.releaseId ? this.releaseId : currReleaseID));
                    this.firedOnChanges = false;
                }
            } else if (currentProject && currentProject.id) {
              this.router.navigate(['/project', currentProject.id]);
            } else {
              this.router.navigateByUrl('/project/1');
            }

        }
    }

    getCurrentReleaseFromLocalStorage() {
      try {
        return JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`));
      } catch(e) {
        return null;
      }
    }

    handleSubscriptions() {
        if(this.releaseId && this.appId) {
            let curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.CYCLE, '', this.releaseId);
            let prevMetadata;
            if(this.previousReleaseId) {
                prevMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.CYCLE, '', this.previousReleaseId);
            }
            this.previousReleaseId = this.releaseId;
            this.notificationStore.dispatch(this._notificationAction.subscribeToTopic(curMetadata, prevMetadata, this.appId));
        }
    }

    handleUnsubscriptions() {
        if(this.releaseId && this.appId) {
            let curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.CYCLE, '', this.releaseId);
            this.notificationStore.dispatch(this._notificationAction.unSubscribeFromTopic(curMetadata, this.appId));
            this.notificationStore.dispatch(this._notificationAction.discardAppNotifications(this.appId));
        }
    }

    applyNotifications(ev) {
      this.zephyrStore.dispatch(this._testcaseEASAction.getAllCyclesAndPhases(this.releaseId));
      this.notificationStore.dispatch(this._notificationAction.applyNotification(this.appId, true));
    }

    ngAfterViewInit() {
        this.isViewInitialized = true;
        if(!this.isEmbedded) {
            this.keepInSyncCustom.apply(this, [document.querySelector('.eas-tree-wrapper'), document.querySelector('.gantt-chart-wrapper')]);
        }
        this.el = jQuery(this.elementRef.nativeElement).find('.datepicker-group')[0];
        document.addEventListener('click', e => {
           this.closeDatepicker(e.target);
        });
    }

    toggleDatepicker(e) {
        this.showDatePicker = true;
    }

    isChild(targetEle, className) {
        while (targetEle !== null) {
          if (targetEle == className || (targetEle.tagName === 'TABLE' && targetEle.getAttribute('role') == 'grid')) {
            return targetEle;
          }
          targetEle = targetEle.parentNode;
        }
        return false;
    }

    closeDatepicker(target) {
        let ele = this.isChild(target, this.el);
        if(!ele) {
          this.showDatePicker = false;
        }
    }
    ngOnDestroy() {
        if(this.cmpRef) {
            this.cmpRef.destroy();
        }
        this.handleUnsubscriptions();
        this.unsubscribe();
    }

    setLeftNavData(state) {
        if(state.project.id) {
            this.navColumns.header.title = state.project.name;
            this.navColumns.header.subtitle = state.project.description;
            this.navColumns.header.link = `/project/${state.project.id}`;
            this.navColumns.header.isSelected = false;
            _.filter(this.navColumns.group.items, item => {
                if(item.key == 'release-setup') {
                    item.isActive = true;
                } else {
                    item.isActive = false;
                }
            });
        }
    }
    navigateToProject(ev) {
        if(this.navColumns.header.link.length) {
            this.router.navigateByUrl(this.navColumns.header.link);
        }
    }
    clickContextAction(data) {
        switch(data.label) {
            case 'Add Phase':
                this.showTcrModal('add', data.node, '');
                break;
            case 'Assign':
                this.router.navigate(['/testcase-eas/phase/', data.node.a_attr['data-id']]);
                break;
            case 'Edit':
                this.showTcrModal('edit', data.node, data.isCycle);
                break;
            case 'Delete':
                this.showTcrModal('delete', data.node, '');
                break;
            case 'Clone':
                this.showTcrModal('clone', data.node, data.isCycle);
                break;
            case 'Export':
                this.showTcrModal('export',data.node, data.isCycle);
                break;
        }
    }
    easContextMenuItems(node) {
        if(!node) {return;}
        let isCycle = node.a_attr['data-node'] === 'cycle',
            isStatus = node.a_attr['data-status'];

        let items =  {
            add: { // The 'add' menu item
                label: 'Add Phase',
                nodeData : JSON.stringify(node.a_attr),
                action: easSelf.showTcrModal.bind(easSelf, 'add', node),
                separator_after: true
            },
            assign: { // The 'assign' menu item
                label: 'Assign',
                action: function (data) {
                    let inst = jQuery.jstree.reference(data.reference),
                        item = inst.get_node(data.reference),
                        id = item.a_attr['data-id'];
                    easSelf.router.navigate(['/testcase-eas/phase/', id]);
                },
                separator_after: true
            },
            edit: { // The 'edit' menu item
                label: 'Edit',
                nodeData : JSON.stringify(node.a_attr),
                action: easSelf.showTcrModal.bind(easSelf, 'edit', node, isCycle)
            },
            delete: { // The 'delete' menu item
                label: 'Delete',
                nodeData : JSON.stringify(node.a_attr),
                action: easSelf.showTcrModal.bind(easSelf, 'delete', node)
            },
            clone: { // The 'clone' menu item
                label: 'Clone',
                nodeData : JSON.stringify(node.a_attr),
                action: easSelf.showTcrModal.bind(easSelf, 'clone', node, isCycle)
            },
            export: { // The 'export' menu item
                label: 'Export',
                nodeData : JSON.stringify(node.a_attr),
                action: easSelf.showTcrModal.bind(easSelf, 'export')
            }
        };

        if(!isCycle) {
            delete items.add;
            delete items.clone;
        } else {
            delete items.assign;
            if(isStatus) {
                delete items.add;
            }
        }
        return items;
    }

    showTcrModal(action, node, isCycle) {

        let nodeData =  JSON.stringify(node.a_attr);

        if(this.cmpRef) {
            this.cmpRef.destroy();
        }


        if(action === 'add') {
            let factory = this.resolver.resolveComponentFactory(EasAddPhaseComponent);
            this.cmpRef = this.target.createComponent(factory);
            this.cmpRef.instance.functionCalling(nodeData , this);
        } else if(action === 'edit') {
            let factory;

            if (isCycle) {
                factory = this.resolver.resolveComponentFactory(EasEditCycleComponent);
            } else {
                factory = this.resolver.resolveComponentFactory(EasEditPhaseComponent);
            }

            this.cmpRef = this.target.createComponent(factory);
            this.cmpRef.instance.functionCalling(nodeData , this);
            setTimeout(() => {
              jQuery('#easEditNodeModal').on('shown.bs.modal', ev => {
                jQuery('#easEditNodeModal input[formcontrolname="name"]').trigger('focus');
              });
            }, 50);
        } else if(action === 'clone') {
            let factory = this.resolver.resolveComponentFactory(EasCloneCycleComponent);
            this.cmpRef = this.target.createComponent(factory);
            this.cmpRef.instance.functionCalling(nodeData , this);
            setTimeout(() => {
             jQuery('#easCloneNodeModal').on('shown.bs.modal', ev => {
                jQuery('#easCloneNodeModal input[formcontrolname="name"]').trigger('focus');
              });
            }, 50);
        } else if(action === 'delete') {
            let factory = this.resolver.resolveComponentFactory(EasDeleteNodeComponent);
            this.cmpRef = this.target.createComponent(factory);
            this.cmpRef.instance.functionCalling(nodeData , this);
        } else if(action === 'export') {
            let factory = this.resolver.resolveComponentFactory(EasExportNodeComponent);
            this.cmpRef = this.target.createComponent(factory);
            this.cmpRef.instance.setFieldsOptions(node, this.releaseId);
        }
    }


    onToggleNode(nodeInfo) {
        let eventType = nodeInfo.eventType,
            cycleId = nodeInfo.selectedNodeId;

        switch (eventType) {
            case 'close_node' :
                jQuery('.test-eas-cycle[data-cycleId='+ cycleId +'] .cycle-phase-wrapper').slideUp();
                break;

            case 'open_node' :
                jQuery('.test-eas-cycle[data-cycleId='+ cycleId +'] .cycle-phase-wrapper').slideDown();
                break;
        }
    }

    onTestcaseEASCycleTreeClick(target) {
        this.breadCrumbsList = target.bCrumbData;
        let releaseBCrumbObject = {
            id: '/release/' + (this.releaseObjectSelected || {})['id'] || this.releaseId,
            text: (this.releaseObjectSelected || {})['text'],
            type: 'parent'
        };

        this.selectedNodeId = target.selectedNodeId;

        this.breadCrumbsList.unshift(releaseBCrumbObject);

        if (this.selectedNodeId != this.previousParams.treeId) {
            let nodeId = (target.nodeData === 'cycle') ? target.nodeData : target.cycleId;
            let nodeStart = (this.response.filter(cycle => cycle.id === nodeId)[0] || {}).startDate;

            let nodeStartCount, calendarStartCount,
                timeWindow = this.calendarConfig.selectedTimeWindow,
                year = moment(nodeStart).year();

            switch(timeWindow) {
                case 'month':
                    nodeStartCount = moment(nodeStart).month();
                    calendarStartCount = moment(this.calendarConfig.startTimestamp).month();
                    break;

                case 'week':
                    nodeStartCount = moment(nodeStart).week();
                    calendarStartCount = moment(this.calendarConfig.startTimestamp).week();
                    break;
            }
            let count = nodeStartCount - calendarStartCount;

            this.configureTimeWindow(count, year);
            this.updateRouteUrl();
        }
    }

    calendarCycleClick(cycleId) {
        this.selectedIdTree = {node: cycleId, silent: true, filter: this.filterCriteria};
    }
    getNodeData(type, id, name, cycleId) {
        let nodeData = {
            node: {
                a_attr: {
                    'data-id': id,
                    'data-name': name
                }
            },
            isCycle: false
        };
        switch (type) {
            case 'cycle':
                nodeData['isCycle'] = true;
                nodeData.node.a_attr['data-node'] = 'cycle';
                break;
            default:
                nodeData['isCycle'] = false;
                nodeData.node.a_attr['data-node'] = 'phase';
                nodeData.node.a_attr['data-cycleId'] = cycleId;
                break;
        }
        return nodeData;
    }
    showCustomContexMenu($event, type, id, name, cycleId) {
        if(this.isEmbedded) {
            return;
        }
        if(this.selectedCyclePhase) {
            this.selectedCyclePhase.removeClass('active');
        }
        this.selectedCyclePhase = jQuery($event.currentTarget);
        this.selectedCyclePhase.addClass('active');
        let nodeData = this.getNodeData(type, id, name, cycleId);
        this._customContextMenu.showContextMenu($event, nodeData);
    }
    editChart($event, type, id, name, cycleId) {
        if(this.isEmbedded) {
            return;
        }
        if(!jQuery($event.currentTarget).hasClass('active')) {
            if(this.selectedCyclePhase) {
                this.selectedCyclePhase.removeClass('active');
            }
            this.selectedCyclePhase = jQuery($event.currentTarget);
            this.selectedCyclePhase.addClass('active');
        }
        let nodeData = this.getNodeData(type, id, name, cycleId);
        this.showTcrModal('edit', nodeData.node, nodeData.isCycle);
    }
    addCycle() {
        if(!this.isViewInitialized) { return; }

        if(this.cmpRef) {
            this.cmpRef.destroy();
        }
        let componentFactory = this.resolver.resolveComponentFactory(EasAddCycleComponent);
        this.cmpRef = this.target.createComponent(componentFactory);
        this.cmpRef.instance.something = 'somedata';
        setTimeout(() => {
            jQuery('#easAddCycleModal').on('shown.bs.modal', ev => {
                jQuery('#easAddCycleModal input[formcontrolname="name"]').trigger('focus');
            });
        }, 50);

    }

    keepInSync() {
        let elements = [];
        let sync = e => {
            let target = e.target;

            elements.forEach(element => {
                if (element === target) {
                    return;
                }
                element.scrollTop = target.scrollTop;
                element.scrollLeft = target.scrollLeft;
            });
        };

        let k,l;
        for (k = 0, l = arguments.length; k < l; k++) {
            let element = arguments[k];
            if (document.addEventListener) {
                element.addEventListener('scroll', sync);
            } else {
                element.attachEvent('onscroll', sync);
            }
            elements.push(element);
        }
    }

    keepInSyncCustom() {
        let treeElement = arguments[0];
        let ganttChartElement = arguments[1];
        let sync = e => {
            ganttChartElement.scrollTop = treeElement.scrollTop;
        };
        if (document.addEventListener) {
            treeElement.addEventListener('scroll', sync);
        } else {
            treeElement.attachEvent('onscroll', sync);
        }
    }

    configureTimeWindow(count, year=undefined) {

        let startTimestamp, noOfDays, momentStart;
        let changeYear = year ? year - moment(this.calendarConfig.startTimestamp).year() : 0;

        switch (this.selectedTimeWindow) {
            case 'month':
                startTimestamp = moment(this.calendarConfig.startTimestamp).add(count, 'month').add(changeYear, 'year').unix() * 1000;
                noOfDays = moment(startTimestamp).startOf('month').daysInMonth();
                break;

            case 'week':
                momentStart = moment(this.calendarConfig.startTimestamp).add(count, 'week').add(changeYear, 'year');
                startTimestamp = momentStart.format('dddd') === 'Sunday' ? momentStart.unix() * 1000 : momentStart.isoWeekday(0).unix() * 1000;
                noOfDays = 7;

              break;

        }

        this.calendarConfig.startTimestamp = startTimestamp;
        this.calendarConfig.noOfDays = noOfDays;
        this.calendarConfig.selectedTimeWindowText = moment(this.calendarConfig.startTimestamp).format('MMMM, YYYY');
        this.buildReleaseCycle();
    }

    onDateChange(today) {
        if(today) {
            this.dt = moment()._d;
        }
        this.changeTimeWindow('todate');
    }

    setTimeWindow(period) {
        this.selectedTimeWindow = this.calendarConfig.selectedTimeWindow = period;
        this.configureTimeWindow(0);
        this.updateRouteUrl();
    }

    changeTimeWindow(action) {
        let count;
        switch (action) {
            case 'prev':
                count = -1;
                break;

            case 'next':
                count = 1;
                break;

            case 'todate':
                //let todayDate = moment().unix() * 1000,
                let todayDate = moment(this.dt).unix() * 1000,
                    timeWindow = this.calendarConfig.selectedTimeWindow,
                    calendarDate = this.calendarConfig.startTimestamp;
                let startMonths = this.getAbsoulteMonths(todayDate),
                    endMonths = this.getAbsoulteMonths(calendarDate);


                if(timeWindow === 'month') {
                    count =  startMonths - endMonths;
                } else {
                    count = moment(todayDate).diff(moment(this.calendarConfig.startTimestamp), timeWindow, true);
                }

                break;
        }
        this.configureTimeWindow(count);
        this.updateRouteUrl();
    }

    getAbsoulteMonths(momentDate) {
        let months = Number(moment(momentDate).format('MM'));
        let years = Number(moment(momentDate).format('YYYY'));
        return months + (years * 12);
    }

    getDaysArray(calendarConfig) {
        let i, startTimestamp, timestamp, day,
            daysArray = [],
            noOfDays = calendarConfig.noOfDays;

        startTimestamp = calendarConfig.selectedTimeWindow === 'month' ? moment(calendarConfig.startTimestamp).date(1).unix() * 1000 : calendarConfig.startTimestamp;
        startTimestamp = moment(startTimestamp).startOf('day').unix() * 1000;

        for (i = 0; i < noOfDays; i ++) {
            timestamp = moment(startTimestamp);
            day = timestamp.format('dddd');
            daysArray.push({
              'date': timestamp.format('DD'),
              'day': day,
              'startTimestamp': startTimestamp,
              'text': calendarConfig.selectedTimeWindow === 'month' ? day.slice(0, 1) : day.slice(0, 3)
            });
            startTimestamp = moment(startTimestamp).add(1, 'day').unix() * 1000;
        }
        return daysArray;
    }

    buildReleaseCycle() {
        this.response = this.zephyrStore.getState().testcaseEAS.cycles;
        this.cyclePhases = this.zephyrStore.getState().testcaseEAS.cyclePhases;
        this.treeData = this.zephyrStore.getState().testcaseEAS.treeData;

        let numDays, width, minDate, maxDate, duration, leftStyle;
        numDays = (this.calendarConfig.selectedTimeWindow === 'month') ? this.calendarConfig.noOfDays : 7;
        width = 1 / numDays * 100;

        //this.getDaysArray(this.calendarConfig);
        this.days = this.getDaysArray(this.calendarConfig);
        this.easCalendarWidth = this.isEmbedded ?
            this.Sanitizer.bypassSecurityTrustStyle('calc(100% - ' + this.utils.getScrollbarWidth() + 'px)') : '100%';

        this.days.forEach((day, index) => {
            day.style = { 'width': width + '%' };
            day.class = day.day === 'Saturday' || day.day === 'Sunday' ? 'holiday' : '';
        });

        if (!this.response.length) {return;}

        this.response.forEach((obj, index) => {
            minDate = Math.max(this.days[0].startTimestamp, moment(obj.startDate).startOf('day').unix() * 1000);
            maxDate = Math.min(this.days[this.days.length - 1].startTimestamp, moment(obj.endDate).startOf('day').unix() * 1000);
            leftStyle = (obj.startDate > this.days[0].startTimestamp) ? ((obj.startDate - this.days[0].startTimestamp)/1000/60/60/24) * width + '%' : 0;

            duration = (maxDate - minDate) > 0 ? (parseInt((maxDate - minDate)/1000/60/60/24 + '') + 1) : 0;

            if(maxDate == minDate) {
                // it is a single day cycle - Automatically mark duration as 1
                duration = 1;
            }

            obj.style = {
                'width': (duration * width) >= 100 ? 100 + '%' : duration * width + '%',
                'background': this.colorArray[index % this.colorArray.length],
                'margin-left': leftStyle
            };

            obj.style['visibility'] = obj.style['width'] === '0%' ? 'hidden' : 'visible';
            obj.style['opacity'] = obj.status ? 0.5 : 1;
            obj.text = obj.name;

            if(obj.cyclePhases && obj.cyclePhases.length && !obj.status) {
                obj.cyclePhases.forEach(phase => {
                    let minPhaseDate, maxPhaseDate, phaseDuration, leftPhaseStyle;
                    minPhaseDate = Math.max(this.days[0].startTimestamp, moment(phase.startDate).startOf('day').unix() * 1000);

                    maxPhaseDate = Math.min(this.days[this.days.length - 1].startTimestamp, moment(phase.endDate).startOf('day').unix() * 1000);

                    phaseDuration = (maxPhaseDate - minPhaseDate) > 0 ? (parseInt((maxPhaseDate - minPhaseDate)/1000/60/60/24 + '') + 1) : 0;

                    if(maxPhaseDate == minPhaseDate) {
                        // it is a single day cycle - Automatically mark duration as 1
                        phaseDuration = 1;
                    }
                    leftPhaseStyle = (phase.startDate > this.days[0].startTimestamp) ? ((phase.startDate - this.days[0].startTimestamp)/1000/60/60/24) * width + '%' : 0;

                    phase.style = {
                      'width': (phaseDuration * width) >= 100 ? 100 + '%' : phaseDuration * width + '%',
                      'background': this.colorArray[index % this.colorArray.length],
                      'margin-left': leftPhaseStyle
                    };
                });
            }
        });

    }
    onBreadCrumbClick ($event) {
        let routerLink = $event.target.dataset.nodeid;
        if (routerLink) {
            this.router.navigateByUrl(routerLink);
        }
    }
}
