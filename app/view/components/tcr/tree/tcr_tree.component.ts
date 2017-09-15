import {
  Component, Injector, AfterViewInit, Input, Output, EventEmitter, NgZone,
  OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import {TCRAction} from '../../../../actions/tcr.action';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {NotificationStore} from '../../../../store/notification.store';
import {TcrContextMenu} from './tcr_contextMenu';

import {NotificationAction} from '../../../../actions/notification.action';
import {constructNotificationStoreMetadata, checkIfNotificationIsPending} from '../../../../utils/notification/notification.util';
import {NOTIFICATION_ENTITY_CONSTANTS} from '../../../../utils/constants/notification.constants';

// Constants
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import {Observable} from 'rxjs/Rx';

declare var jQuery: any, _;
var tcr_tree_self;

@Component({
    selector: 'zui-tcr-tree',
    templateUrl: 'tcr_tree.html',
    viewProviders: [NotificationAction],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TcrTreeComponent implements AfterViewInit, OnDestroy {
    @ViewChild('target', {read: ViewContainerRef}) target : ViewContainerRef;
    @Input() releaseIdObs:Observable<any>;
    @Input() showContextMenu;
    @Input() treeOptions;
    @Input() appId;
    @Input() showImported = true;
    @Input() isDetailView;
    @Output() onTreeClick: EventEmitter<any> = new EventEmitter();
    @Output() onTreeCollapse: EventEmitter<any> = new EventEmitter();
    @Output() OnContextMenuClick: EventEmitter<any> = new EventEmitter();
    @Output() onTreeNodeSelect: EventEmitter<any> = new EventEmitter();
    @Output() onToggleNode: EventEmitter<any> = new EventEmitter();
    @Output() treeDrop: EventEmitter<any> = new EventEmitter();
    treeData;
    selectedNode;
    forceSelect;
    deleteNode;
    treeSelector;
    tcrContextMenu;
    unsubscribe;
    releaseId;
    treeId;
    dropExternal = {
        scope: 'tcr'
    };
    _zephyrStore;
    _notificatonStore;
    selectedTreeNode;
    i18nMessages = I18N_MESSAGES;
    constructor(private cdr: ChangeDetectorRef, private _tcrAction: TCRAction, private zone:NgZone,
                private _notificationAction:NotificationAction , private injector: Injector,
                private resolver: ComponentFactoryResolver, private route: ActivatedRoute, public router: Router) {

        this.route.params.subscribe(params => {
            this.treeId = params['treeId'];
        });

        this._zephyrStore = ZephyrStore.getZephyrStore();
        this._notificatonStore = NotificationStore.getNotificationStore();
        this.unsubscribe = this._zephyrStore.subscribe((x) => {
            this.zone.run(() => {
                let state = this._zephyrStore.getState();
                let treeData = state.tcr.treeData;

                let indexOfImported = _.findIndex(treeData, { 'text': 'Imported'});

                if (indexOfImported !== -1) {
                    treeData[indexOfImported].preventAdd = true;
                }

                setTimeout(() => {
                    this.treeData = treeData;

                    if (state.tcr.tcrTree.deleteNode) {
                        this.deleteNode = state.tcr.tcrTree.deleteNode;
                        this._zephyrStore.dispatch(this._tcrAction.clearTemporaryEvents());
                    }
                    if (state.tcr.tcrTree.createNode) {
                        this.forceSelect = state.tcr.tcrTree.createNode;
                        this._zephyrStore.dispatch(this._tcrAction.clearTemporaryEvents());
                    } else {
                        setTimeout(() => {
                            this.forceSelect = undefined;
                        }, 101);
                    }
                    if(this.cdr) { this.cdr.markForCheck(); }
                }, 51);
            });

        });

        tcr_tree_self = this;
    }


    onTreeNodeSelected(data) {
        this.onTreeNodeSelect.emit(data);
    }

    ngAfterViewInit() {
        this.releaseIdObs.subscribe(x => {
          this.releaseId = x;
          tcr_tree_self.tcrContextMenu = new TcrContextMenu(this.target, this.resolver, tcr_tree_self._tcrAction,
            tcr_tree_self._zephyrStore, this.appId, this._notificationAction, this.releaseId);
          this.fetchTreeDataWithReleaseDetails();
        });
    }
    ngOnDestroy() {
        this.unsubscribe();
        this.handleUnsubscriptions();
    }
    clearTreeUpdate() {
        let state = this._zephyrStore.getState();
        state.tcr.tcrTree = {};
    }
    treeInstance(ev) {
        this.treeSelector = ev;
    }
    handleSubscriptions() {
      if (this.appId) {
        let curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TCR_CATALOG_TREE,'',this.releaseId,'');
        this._notificatonStore.dispatch(this._notificationAction.subscribeToTopic(curMetadata,'',this.appId));
        curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.PROJECT,'','','',true);
        this._notificatonStore.dispatch(this._notificationAction.subscribeToTopic(curMetadata,'',this.appId));
      }
    }
    handleUnsubscriptions() {
      if (this.appId) {
        let curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TCR_CATALOG_TREE,'',this.releaseId,'');
        this._notificatonStore.dispatch(this._notificationAction.unSubscribeFromTopic(curMetadata,this.appId));
        curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.PROJECT,'','','',true);
        this._notificatonStore.dispatch(this._notificationAction.unSubscribeFromTopic(curMetadata,this.appId));
      }
    }
    fetchTreeDataWithReleaseDetails() {
        let state = this._zephyrStore.getState();
        let selectedRelease = _.find(state.release.releases, ['id', parseInt(this.releaseId)]);
        this.handleSubscriptions();
        let selectedProject = null;

        if (selectedRelease) {
          selectedProject = _.find(state.projects.projects, ['id', parseInt(selectedRelease.projectId)]);
        }

        this._zephyrStore.dispatch(this._tcrAction.fetchTreeDataWithReleaseDetails(this.releaseId, this.selectedTreeNode, selectedRelease, selectedProject, this.showImported));
    }
    onTcrTreeClick(target) {
        this.selectedNode = target.selectedNode;
        this.selectedTreeNode = target.selectedNode;
        this.onTreeClick.emit({
            selectedNodeId: target.selectedNodeId,
            breadCrumbsList: target.bCrumbData,
            type: target.type,
            showMenu: target.showMenu
        });
    }
    onTcrNodeDragAndDrop(data) {
        if (jQuery(`[data-id=${data.sourceNodeId}]`).parent().hasClass('operation-disabled')) {
            jQuery(`[data-id=${data.sourceNodeId}]`).parent().removeClass('operation-disabled');
            return;
        }
        if(this.checkIfNotificationIsPending()) {
            this._zephyrStore.dispatch(this._notificationAction.handlePendingNotificationError());
            return;
        }
        if(data.operation === 'move_node') {
            this._zephyrStore.dispatch(this._tcrAction.moveTcrNode(data));
        } else if(data.operation === 'copy_node') {
            this._zephyrStore.dispatch(this._tcrAction.copyTcrNode(data));
        }
    }
    onTreeDrop(ev) {
        this.treeDrop.emit(ev);
    }
    tcrContextMenuItems() {
        return tcr_tree_self.tcrContextMenu.contextMenuItems(tcr_tree_self.selectedNode, tcr_tree_self.treeSelector,
            tcr_tree_self.OnContextMenuClick.emit());
    }
    onTcrTreeCollapse(ev) {
        this.onTreeCollapse.emit(true);
    }
    onToggleTcrNode(event) {
        let openNode;
        if (event.selectedNodeId) {
            if ('open_node' === event.eventType) {
                openNode = event.selectedNodeId;
            } else {
                openNode = event.parentNode;
            }
        }
        this.onToggleNode.emit(openNode);
    }
    checkCb(operation, node, node_parent, node_position, more) {

        // do not allow drop above release nodes
        if ('#' === node_parent.id) {
            jQuery(`#${node.id}`).addClass('operation-disabled');
            return false;
        }
        // do not allow move of phases
        if ('move_node' === operation && 'Phase' === node.a_attr['data-type']) {
            jQuery(`#${node.id}`).addClass('operation-disabled');
            return false;
        }

        // do not allow drop onto imported node
        let nodes = node_parent.parents.concat(node_parent);
        let importedLength = nodes.filter(item => more && 'Imported' === more.origin.get_node(item).text).length;
        if (importedLength) {
            jQuery(`#${node.id}`).addClass('operation-disabled');
            return false;
        }
        jQuery(`#${node.id}`).removeClass('operation-disabled');
        return true;
    }
    checkIfNotificationIsPending() {
        return checkIfNotificationIsPending(this.appId, NOTIFICATION_ENTITY_CONSTANTS.TCR_CATALOG_TREE, '', this.releaseId);
    }
}
