import {ComponentRef, Injector, Input, Output, EventEmitter, ViewContainerRef, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {TcrAddNodeComponent} from './add/tcr_addNode.component';
import {TcrRenameNodeComponent} from './rename/tcr_renameNode.component';
import {TcrDeleteNodeComponent} from './delete/tcr_deleteNode.component';
import {NOTIFICATION_ENTITY_CONSTANTS} from '../../../../utils/constants/notification.constants';
import {checkIfNotificationIsPending, constructNotificationStoreMetadata,
  getNotificationTopic} from '../../../../utils/notification/notification.util';

declare var jQuery: any, _;

export class TcrContextMenu {

    copyMoveData;
    tree;
    treeSelector;
    releaseId;
    isPasteDisabled = true;
    @ViewChild('target', {read: ViewContainerRef}) target : ViewContainerRef;

    constructor(target: ViewContainerRef, private resolver: ComponentFactoryResolver, private tcrAction, private zephyrStore,
        private appId, private notificationAction, private notificationEntId) {

        this.target = target;
    }

    contextMenuItems(selectedNode, treeSelector) {
        this.tree = treeSelector.tree;
        this.treeSelector = treeSelector;

        let contextMenuConfig = jQuery(`${this.treeSelector.tree} #${selectedNode[0]}`).data('exclude-context-items');

        let menuItems = {
            add: { // The "add" menu item
                label: 'Add',
                action: this.showTcrModal.bind(this, 'add')
            },
            rename: { // The 'rename' menu item
                label: 'Rename',
                action: this.showTcrModal.bind(this, 'rename')
            },
            delete: { // The 'delete' menu item
                label: 'Delete',
                action: this.showTcrModal.bind(this, 'delete')
            },
            move: { // The 'move' menu item
                label: 'Move',
                action: this.showTcrModal.bind(this, 'move')
            },
            copy: { // The 'copy' menu item
                label: 'Copy',
                action: this.showTcrModal.bind(this, 'copy')
            },
            paste: { // The 'paste' menu item
                label: 'Paste',
                action: this.showTcrModal.bind(this, 'paste'),
                separator_after: true,
                _disabled: this.isPasteDisabled
            },
            search: { // The 'search' menu item
                label: 'Find and Add',
                action: this.showTcrModal.bind(this, 'findAndAdd'),
                separator_after: true
            },
            importTests: { // The 'importTests' menu item
                label: 'Import Tests',
                action: this.showTcrModal.bind(this, 'importTests')
            },
            exportTests: { // The 'exportTests' menu item
                label: 'Export Tests',
                action: this.showTcrModal.bind(this, 'exportTests')
            },
            copyFromGlobalTree: { // The 'copyFromGlobalTree' menu item
                label: 'Copy from Project Releases',
                action: this.showTcrModal.bind(this, 'copyFromGlobalTree')
            }
        };

        contextMenuConfig = (contextMenuConfig || '').split(',');
        if (Array.isArray(contextMenuConfig) && contextMenuConfig.length) {
            contextMenuConfig.forEach((item) => {
                if (item) {
                    delete menuItems[item];
                }
            });
        }

        return menuItems;
    }
    showTcrModal(action, node) {

        if(action === 'add') {
            if(this.checkIfNotificationIsPending()) {
                this.zephyrStore.dispatch(this.notificationAction.handlePendingNotificationError());
                return;
            }

            this.target.clear();
            let componentFactory = this.resolver.resolveComponentFactory(TcrAddNodeComponent);
            let cmpRef:ComponentRef<any> = this.target.createComponent(componentFactory);

            cmpRef.instance.setNode();

            cmpRef.instance.createNode.subscribe(value => {
                let selectedNodeId = jQuery(`#${jQuery(this.tree).jstree().get_selected()[0]}`).find('a').data('id');
                if(!selectedNodeId) {
                    selectedNodeId = 0;
                    value['type'] = 'Phase';
                }

                this.zephyrStore.dispatch(this.tcrAction.createTcrNode(value, selectedNodeId, value.releaseId));
                jQuery('#tcrAddNodeModal').modal('toggle');
            });
        } else if(action === 'rename') {
            if(this.checkIfNotificationIsPending()) {
                this.zephyrStore.dispatch(this.notificationAction.handlePendingNotificationError());
                return;
            }
            this.target.clear();
            let componentFactory = this.resolver.resolveComponentFactory(TcrRenameNodeComponent);
            let cmpRef:ComponentRef<any> = this.target.createComponent(componentFactory);

            cmpRef.instance.setNode({
                name: node.reference.data('name'),
                description: node.reference.data('desc'),
            });

            cmpRef.instance.renameNode.subscribe(value => {
                let selectedNodeId = jQuery(`#${jQuery(this.tree).jstree().get_selected()[0]}`).find('a').data('id');
                if(!selectedNodeId) {
                    selectedNodeId = 0;
                    value['type'] = 'phase';
                }
                this.zephyrStore.dispatch(this.tcrAction.renameTcrNode(value, selectedNodeId, value.releaseId));
                jQuery('#tcrRenameNodeModal').modal('toggle');
            });
        } else if(action === 'delete') {
            if(this.checkIfNotificationIsPending()) {
                this.zephyrStore.dispatch(this.notificationAction.handlePendingNotificationError());
                return;
            }
            this.target.clear();
            let componentFactory = this.resolver.resolveComponentFactory(TcrDeleteNodeComponent);
            let cmpRef:ComponentRef<any> = this.target.createComponent(componentFactory);
            cmpRef.instance.setNode();

            cmpRef.instance.deleteNode.subscribe(value => {
                let selectedNodeId = jQuery(`#${jQuery(this.tree).jstree().get_selected()[0]}`).find('a').data('id');
                this.zephyrStore.dispatch(this.tcrAction.deleteTcrNode(selectedNodeId, value));
                jQuery('#tcrDeleteNodeModal').modal('toggle');
            });

        } else if (action === 'findAndAdd') {
            jQuery('#find-and-add-modal').modal();
        } else if(action === 'copy' || action === 'move') {
            if(this.checkIfNotificationIsPending()) {
                this.zephyrStore.dispatch(this.notificationAction.handlePendingNotificationError());
                return;
            }
            this.copyOrMoveNode(action);
        } else if(action === 'paste') {
            this.pasteNode();
        } else if(action === 'importTests') {
            jQuery('#zee-import-modal-testcase').modal();
        } else if(action === 'exportTests') {
              jQuery('.zui-export-modal').find('.modal').modal();
        } else if(action === 'copyFromGlobalTree') {
            jQuery('#zee-global-tcr-tree-modal').modal('show');
        }
    }
    copyOrMoveNode(action) {
        let selectedNodeId = jQuery(`#${jQuery(this.tree).jstree().get_selected()[0]}`).find('a');

        let sourceNodeId = selectedNodeId.data('id'),
            sourceNodeReleaseId = selectedNodeId.data('releaseid'),
            newNodeName = selectedNodeId.data('name');

        this.copyMoveData = {sourceNodeId, sourceNodeReleaseId, operation: action + '_node', newNodeName};
        this.isPasteDisabled = false;
        this.releaseId = sourceNodeReleaseId;
    }
    pasteNode() {
        let selectedNodeId = jQuery(`#${jQuery(this.tree).jstree().get_selected()[0]}`).find('a');

        this.copyMoveData['targetNodeId'] = selectedNodeId.data('id') || 0;
        this.copyMoveData['targetNodeReleaseId'] = selectedNodeId.data('releaseid') || this.releaseId;

        this.releaseId = undefined;
        if(this.copyMoveData.operation === 'move_node') {
            this.zephyrStore.dispatch(this.tcrAction.moveTcrNode(this.copyMoveData));
        } else if(this.copyMoveData.operation === 'copy_node') {
            this.zephyrStore.dispatch(this.tcrAction.copyTcrNode(this.copyMoveData));
        }
        this.isPasteDisabled = true;
    }
    checkIfNotificationIsPending() {
        return checkIfNotificationIsPending(this.appId,NOTIFICATION_ENTITY_CONSTANTS.TCR_CATALOG_TREE,'',this.notificationEntId);
    }
}
