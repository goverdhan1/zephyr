import {ComponentRef, Injector, Input, Output, EventEmitter, ViewContainerRef, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {ReqAddNodeComponent} from './add/req_addNode.component';
import {ReqRenameNodeComponent} from './rename/req_renameNode.component';
import {ReqDeleteNodeComponent} from './delete/req_deleteNode.component';
import {ReqSyncNodeComponent} from './sync/req_syncNode.component';
import {REQ_OPERATION_EXPORT_ID, REQ_OPERATION_CONSTANTS} from '../operations/requirement_operations.constant';
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import {checkIfNotificationIsPending} from '../../../../utils/notification/notification.util';
import {NOTIFICATION_ENTITY_CONSTANTS} from '../../../../utils/constants/notification.constants';

declare var jQuery: any, _;
const SYSTEM_TYPE_4 = 4;

export class ReqContextMenu {

    copyMoveData;
    tree;
    itemCopied  = '';
    @ViewChild('target', {read: ViewContainerRef}) target : ViewContainerRef;
    i18nMessages = I18N_MESSAGES;
    private isGlobal;
    private isImported;

    constructor(target: ViewContainerRef, private resolver: ComponentFactoryResolver, private _reqAction, private _zephyrStore,
        private releaseId, private appId, private notificationAction, private notificationEntId) {

        this.target = target;
    }

    contextMenuItems(selectedNode, treeSelector, isGlobal, isImported, syncCallback) {
        this.tree = treeSelector.tree;
        this.isGlobal = isGlobal;
        this.isImported = isImported;

        // if nothing was copied, disable paste
        // if global was copied, enable paste only for global nodes
        // if imported was copied/moved, enable paste for global and release nodes
        let isPasteDisabled = this.itemCopied ? 'global' === this.itemCopied ? !isGlobal : false : true;

        let contextMenuConfig = jQuery(`${treeSelector.tree} #${selectedNode[0]}`).data('exclude-context-items');

        let menuItems = {
            add: { // The "add" menu item
                label: 'Add',
                action: this.showReqModal.bind(this, ['add'])
            },
            rename: { // The 'rename' menu item
                label: 'Rename',
                action: this.showReqModal.bind(this, ['rename'])
            },
            delete: { // The 'delete' menu item
                label: 'Delete',
                action: this.showReqModal.bind(this, ['delete'])
            },
            move: { // The 'move' menu item
                label: 'Move',
                action: this.showReqModal.bind(this, ['move'])
            },
            copy: { // The 'copy' menu item
                label: 'Copy',
                action: this.showReqModal.bind(this, ['copy'])
            },
            paste: { // The 'paste' menu item
                label: 'Paste',
                action: this.showReqModal.bind(this, ['paste']),
                _disabled: isPasteDisabled
            },
            allocate: { // The 'allocate' menu item
                label: 'Allocate',
                action: this.showReqModal.bind(this, ['allocate']),
                separator_after: true,
            },
            importTests: { // The 'importTests' menu item
                label: 'Import Requirements',
                action: this.showReqModal.bind(this, ['importTests'])
            },
            exportTests: { // The 'exportTests' menu item
                label: 'Export Requirements',
                action: this.showReqModal.bind(this, ['exportTests'])
            },
            sync: { // The 'sync' menu item
                label: 'Sync',
                action: this.showReqModal.bind(this, ['sync', syncCallback]),
                _disabled: this.checkDTIntegration.bind(this),
            }
        };

        contextMenuConfig = (contextMenuConfig || '').split(',');
        if (Array.isArray(contextMenuConfig) && contextMenuConfig.length) {
            contextMenuConfig.forEach(item => {
                if (item) {
                    delete menuItems[item];
                }
            });
        }

        return menuItems;
    }
    checkDTIntegration() {
        let defectsystem = this._zephyrStore.getState().global.defectSystem;
        return !(defectsystem && defectsystem['systemType'] == SYSTEM_TYPE_4);
    }
    showReqModal(actionObj, node) {
        let that = this;
        let action = actionObj[0];

        if(action === 'add') {
            if(this.checkIfNotificationIsPending()) {
              this._zephyrStore.dispatch(this.notificationAction.handlePendingNotificationError());
              return;
            }
            let componentFactory = this.resolver.resolveComponentFactory(ReqAddNodeComponent);
            let cmpRef:ComponentRef<any> = this.target.createComponent(componentFactory);
            cmpRef.instance.setNode();

            cmpRef.instance.createNode.subscribe(value => {
                value.parentId = jQuery(`#${jQuery(this.tree).jstree().get_selected()[0]}`).find('a').data('id') || 0;

                let releaseId = value.releaseIds[0];

                if (this.isGlobal) {
                    delete value.releaseIds;
                }

                this._zephyrStore.dispatch(this._reqAction.createReqNode(value, releaseId));
                jQuery('#reqAddNodeModal').modal('hide');
                cmpRef.destroy();
            });

            cmpRef.instance.destroyComponent.subscribe(() => {
                cmpRef.destroy();
            });

            jQuery('#reqAddNodeModal').modal('show');
        } else if(action === 'rename') {

            if(this.checkIfNotificationIsPending()) {
              this._zephyrStore.dispatch(this.notificationAction.handlePendingNotificationError());
              return;
            }
            let componentFactory = this.resolver.resolveComponentFactory(ReqRenameNodeComponent);
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
                value['id'] = selectedNodeId;
                let releaseId = value.releaseId;
                if (this.isGlobal) {
                    delete value.releaseId;
                }
                this._zephyrStore.dispatch(this._reqAction.renameReqNode(value, selectedNodeId, releaseId, this.isGlobal));

                jQuery('#reqRenameNodeModal').modal('hide');
            });

            jQuery('#reqRenameNodeModal').modal('show');
        } else if(action === 'delete') {

            if(this.checkIfNotificationIsPending()) {
                this._zephyrStore.dispatch(this.notificationAction.handlePendingNotificationError());
                return;
            }

            let componentFactory = this.resolver.resolveComponentFactory(ReqDeleteNodeComponent);
            let cmpRef:ComponentRef<any> = this.target.createComponent(componentFactory);

            cmpRef.instance.setNode({
                nodeName: jQuery(`#${jQuery(this.tree).jstree().get_selected()[0]}`).find('a').data('name'),
                isDeAllocate: !this.isImported && !this.isGlobal
            });

            cmpRef.instance.deleteNode.subscribe(value => {
                let selectedNodeId = jQuery(`#${jQuery(this.tree).jstree().get_selected()[0]}`).find('a').data('id');
                this._zephyrStore.dispatch(this._reqAction.deleteReqNode(selectedNodeId, value));
                jQuery('#reqDeleteNodeModal').modal('hide');
            });

            cmpRef.instance.deallocateNode.subscribe(value => {
                let selectedNodeId = jQuery(`#${jQuery(this.tree).jstree().get_selected()[0]}`).find('a').data('id');
                this._zephyrStore.dispatch(this._reqAction.deallocateReqNode(selectedNodeId, value));
                jQuery('#reqDeleteNodeModal').modal('hide');
            });
            cmpRef.instance.destroyComponent.subscribe(() => {
                cmpRef.destroy();
            });

            jQuery('#reqDeleteNodeModal').modal('show');
        } else if(action === 'allocate') {
            let selectedNodeId = jQuery(`#${jQuery(this.tree).jstree().get_selected()[0]}`).find('a').data('id');
            this._zephyrStore.dispatch(this._reqAction.allocateReqNode(selectedNodeId, this.releaseId));
        } else if(action === 'copy' || action === 'move') {
            if(this.checkIfNotificationIsPending()) {
              this._zephyrStore.dispatch(this.notificationAction.handlePendingNotificationError());
              return;
            }
            this.copyOrMoveNode(action);
        } else if(action === 'paste') {
            if(this.checkIfNotificationIsPending()) {
              this._zephyrStore.dispatch(this.notificationAction.handlePendingNotificationError());
              return;
            }
            this.pasteNode();
        } else if(action === 'importTests') {
            let defectsystem = this._zephyrStore.getState().global.defectSystem;
            if(defectsystem && defectsystem['systemType'] == SYSTEM_TYPE_4) {
                jQuery('#zui-import-modal-choice').modal('show');
            } else {
                jQuery('#zee-import-modal-requirement').modal('show');
            }
        } else if(action === 'exportTests') {
            REQ_OPERATION_CONSTANTS['export']['isTreeNodeSelected'] = true;
            jQuery('#zui-export-modal-' + REQ_OPERATION_EXPORT_ID + '-choice').modal('show');
        } else if(action === 'sync') {
            let componentFactory = this.resolver.resolveComponentFactory(ReqSyncNodeComponent);
            let cmpRef:ComponentRef<any> = this.target.createComponent(componentFactory);
            cmpRef.instance.syncNode.subscribe((params) => {
                let selectedNodeId = jQuery(`#${jQuery(this.tree).jstree().get_selected()[0]}`).find('a').data('id');
                params['isCascade'] = params.isCascade || false;
                params['retryDeleted'] = params.retryDeleted || false;
                params['projectId'] = this._zephyrStore.getState().project.id;
                params['nodeType'] = this.isGlobal ? 'globalTreeSync' : selectedNodeId ? 'requirementTreeSync' : 'relasesSync';
                params['nodeId'] = selectedNodeId;
                if (!params['nodeId'] && !this.isGlobal) {
                    params['nodeId'] = params.releaseId;
                }
                let componentId = '-requirement';
                jQuery('#reqSyncNodeModal').modal('hide');
                this._zephyrStore.dispatch(this._reqAction.syncReqNode(params, componentId));
            });

            let cb = actionObj[1];
            if(cb && cb instanceof Function) {
                cb();
            }
        }
    }
    copyOrMoveNode(action) {
        let selectedNode = jQuery(this.tree).jstree().get_selected()[0];

        let selectedNodeId = jQuery(`#${selectedNode}`).find('a'),
            sourceNodeId = selectedNodeId.data('id'),
            sourceNodeReleaseId = selectedNodeId.data('releaseid'),
            newNodeName = selectedNodeId.data('name');

        this.copyMoveData = {sourceNodeId, sourceNodeReleaseId, operation: action + '_node', newNodeName};

        this.itemCopied = this.isImported ? 'import' : this.isGlobal ? 'global' : '';
    }
    pasteNode() {
        let selectedNode = jQuery(this.tree).jstree().get_selected()[0];

        let selectedNodeId = jQuery(`#${selectedNode}`).find('a'),
            targetNodeId = selectedNodeId.data('id'),
            targetNodeReleaseId = selectedNodeId.data('releaseid'),
            copyMoveData = this.copyMoveData,
            newNodeName = copyMoveData.newNodeName,
            newNode = { state: 'open', data: newNodeName, text: newNodeName};

        copyMoveData['targetNodeId'] = targetNodeId || 0;
        copyMoveData['targetNodeReleaseId'] = this.isGlobal ? 0 : targetNodeReleaseId || this.releaseId;

        if(copyMoveData.operation === 'move_node') {
            this._zephyrStore.dispatch(this._reqAction.moveReqNode(copyMoveData));
        } else if(copyMoveData.operation === 'copy_node') {
            this._zephyrStore.dispatch(this._reqAction.copyReqNode(copyMoveData));
        }
        this.itemCopied = '';
    }
    checkIfNotificationIsPending() {
        return checkIfNotificationIsPending(this.appId, NOTIFICATION_ENTITY_CONSTANTS.REQUIREMENT_TREE,'',this.notificationEntId);
    }
}
