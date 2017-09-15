import {Component, Input, Output, EventEmitter, AfterViewInit, OnChanges, OnDestroy, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {GridComponent} from '../../grid/grid.component';

import {TCRAction} from '../../../../actions/tcr.action';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {Resizable} from '../../../../utils/scripts/resizable';

// Constants
import {GLOBAL_TCR_GRID_TYPE, LOCAL_TCR_GRID_TYPE, TCR_GRID_OPTIONS, TCR_GRID_PAGINATION, GLOBAL_TCC_GRID_OPTIONS, LOCAL_TCC_GRID_OPTIONS} from '../tcr_grid.constant';
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import * as GRID_CONSTANTS from '../../grid/grid.constant';
import {FETCH_TREE_DATA_FOR_LOCAL_TREE} from '../../../../utils/constants/action.events';

declare var jQuery: any, _;

@Component({
    selector: 'zee-tcr-global-tree',
    templateUrl: 'tcr_global_tree.html'
})

export class TcrGlobalTreeComponent implements AfterViewInit, OnChanges, OnDestroy {
    @ViewChild('global') globalGridComponent: GridComponent;
    @ViewChild('local') localGridComponent: GridComponent;
    @Input() selectedTreeNode;
    @Input() openNode;
    @Output() onCopy: EventEmitter<any> = new EventEmitter();

    projectId;
    releaseId;
    currProject;
    localReleaseId;
    globalCalls = {};

    globalTreeData;
    globalNode;
    globalGridRows;
    globalPage = 1;
    globalSize = GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT;
    globalPaginationOptions = TCR_GRID_PAGINATION;

    localTreeData;
    localNode;
    localGridRows;
    localPage = 1;
    localSize = GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT;;
    localPaginationOptions = TCR_GRID_PAGINATION;
    isModalShown = false;

    openId;
    selectId;
    _localGridType = LOCAL_TCR_GRID_TYPE;
    _globalGridType = GLOBAL_TCR_GRID_TYPE;
    dropExternal = {
        scope: 'global_tree'
    };
    i18nMessages = I18N_MESSAGES;
    private localTree;
    private globalTree;
    private zephyrStore;
    private isCopy = '';
    private unsubscribe;
    private resizable;
    private isDock = true;
    private isGlobalDock = false;
    constructor(private tcrAction: TCRAction, private route: ActivatedRoute) {
        this.zephyrStore = ZephyrStore.getZephyrStore();

        this.route.params.subscribe(params => {
            this.localReleaseId = params['id'];
        });
        this.unsubscribe = this.zephyrStore.subscribe(x => {
            let state = this.zephyrStore.getState();

            this.currProject = state.project.name;
            this.localTreeData = state.tcr.localTreeData;
            this.localGridRows = state.tcr.localTcrGrid.rows;
            this.localPaginationOptions = state.tcr.localTcrGrid.paginationOptions;
            this.localPage = state.tcr.localTcrGrid.currentPage;
            this.localSize = state.tcr.localTcrGrid.size;

            this.globalTreeData = state.tcr.globalTcrProjects;
            this.globalGridRows = state.tcr.globalTcrGrid.rows;
            this.globalPage = state.tcr.globalTcrGrid.currentPage;
            this.globalPaginationOptions = state.tcr.globalTcrGrid.paginationOptions;
            this.globalSize = state.tcr.globalTcrGrid.size;
            if (state.tcr.globalTcrGrid.event === FETCH_TREE_DATA_FOR_LOCAL_TREE) {
                this.zephyrStore.dispatch(this.tcrAction.clearGlobalGridEvent());
                jQuery(this.localTree).find('.jstree-clicked').trigger('click');

                if (this.globalCalls.hasOwnProperty(state.project.id) && this.globalCalls[state.project.id][this.localReleaseId]) {
                    if ('tree' === this.isCopy) {
                        this.zephyrStore.dispatch(this.tcrAction.fetchTreeByReleaseId(this.localReleaseId, state.project.id, false));
                    } else if ('grid' === this.isCopy) {
                        jQuery(this.globalTree).find('.jstree-clicked').trigger('click');
                    }
                }
            }
            setTimeout(() => {
                if (this.isModalShown) {
                    this.globalGridComponent.attachDraggableUI();
                }
            }, 100);
        });
    }
    localCheck(operation, node, node_parent, node_position, more) {
        // do not allow move action
        // do not allow drop on root node.
        return 'copy_node' === operation && '#' !== node_parent.id;
    }
    globalCheck() {
        // no node in global tree is droppable
        return false;
    }
    localDragCb() {
        // no node in local tree is draggable
        return false;
    }
    globalDragCb(nodes, event) {
        // do not allow project or release nodes to be draggable, allow imported node to be draggable
        return nodes.every(item => {
            let level = Number(jQuery(`#${item.id}`).attr('aria-level'));
            return level && (level >= 4 || (2 === level && 'import' === item.a_attr['data-type']));
        });
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    ngOnChanges (changedNode) {
        Object.keys(changedNode).forEach(item => {
            switch(item) {
                case 'openNode':
                    this.openId = {
                        node: this.openNode,
                        silent: true
                    };
                    break;
                default:
                    break;
            }
        });
    }
    ngAfterViewInit() {
        jQuery('#zee-global-tcr-tree-modal').on('show.bs.modal', () => {
            this.isModalShown = true;
            this.zephyrStore.dispatch(this.tcrAction.initiateCopyFromGlobal());
            this.localNode = this.selectedTreeNode;
            this.selectId = {
                node: this.selectedTreeNode,
                silent: true
            };
            this.isCopy = '';
            jQuery('.js-global-wrapper').removeClass('blur-overlay');
        }).on('hide.bs.modal', () => {
            this.isModalShown = false;
            this.zephyrStore.dispatch(this.tcrAction.clearGlobalTreeData());
            this.selectId = {};
            this.globalCalls = {};
            this.onCopy.emit(this.isCopy);
            this.isCopy = '';
            this.globalSize = GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT;
            this.localSize = GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT;
            if (this.isDock) {
                jQuery('.global-tc').css('width', '50%');
                jQuery('.local-tc i.dock').toggleClass('fa-chevron-left fa-chevron-right');
                jQuery('.js-local-grid').toggleClass('close');
                jQuery('.local-tc').toggleClass('open');
            }

            if (this.isGlobalDock) {
                jQuery('.global-tc').css('width', '50%');
                jQuery('.global-tc i.dock').toggleClass('fa-chevron-left fa-chevron-right');
                jQuery('.js-global-grid').toggleClass('close');
            }
            if(this.globalGridComponent) {
                this.globalGridComponent.setGridOptions(GLOBAL_TCC_GRID_OPTIONS, null);
            }
            if(this.localGridComponent) {
                this.localGridComponent.setGridOptions(LOCAL_TCC_GRID_OPTIONS, null);
            }
            this.isDock = false;
            this.isGlobalDock = false;
        });
        this.resizable = new Resizable();
        jQuery('#zee-global-tcr-tree-modal').find('.zui-flex-h-resizable').each((index, element) => {
            this.resizable.attachResizable(jQuery(element), jQuery(element).siblings('.zui-w-handle'), {
                lockHeight: true,
                minWidth: jQuery(element).outerWidth(),
                maxWidth: 500
            });
            jQuery(element).css('height', jQuery(element).siblings('.zui-flex-h-fixed').height() + 'px').on('resize.globalTree', (ev, ui) => {
                let element = ui.element.parents('.global-tc').length ? ui.element : jQuery('.global-tc').find('.ui-resizable');
                this.adjustGlobalWidth(element);
            }).trigger('resize.globalTree');
        });

    }

    localTreeInstance(ev) {
        this.localTree = ev.tree;
    }
    globalTreeInstance(ev) {
        this.globalTree = ev.tree;
    }
    toggleDock(ev) {
        this.isDock = !this.isDock;
        jQuery('.js-local-grid').toggleClass('close');
        jQuery('.local-tc').toggleClass('open');
        jQuery(ev.target).toggleClass('fa-chevron-left fa-chevron-right');
        this.adjustGlobalWidth(jQuery('.global-tc').find('.ui-resizable'));
    }
    toggleGlobalDock(ev) {
        this.isGlobalDock = !this.isGlobalDock;
        jQuery('.js-global-grid').toggleClass('close');
        jQuery(ev.target).toggleClass('fa-chevron-left fa-chevron-right');
        this.adjustGlobalWidth(jQuery('.global-tc').find('.ui-resizable'));
    }
    adjustGlobalWidth(target) {
        let globalWidth = jQuery('.local-tc').parent().width() - jQuery('.local-tc').width();
        let width = !this.isGlobalDock ? this.isDock ? `${globalWidth - 40}px` : '50%' : target.width() + 15;
        jQuery('.global-tc').css('width', width);
    }
    onGlobalTreeClick(event) {
        if ('import' !== event.type) {
            if ('2' === String(event.level)) {
                // clicked on project, fetch releases if not already present
                this.projectId = event.selectedNodeId;
                if (!this.globalCalls.hasOwnProperty(event.selectedNodeId)) {
                    this.globalCalls[event.selectedNodeId] = {};
                    this.zephyrStore.dispatch(this.tcrAction.fetchReleasesByProjectId(this.projectId));
                }
                return;
            } else if ('3' === String(event.level)) {
                // clicked on release, fetch tree nodes if not already present
                if (!this.globalCalls.hasOwnProperty(this.projectId) || !this.globalCalls[this.projectId][event.selectedNodeId]) {
                    this.releaseId = event.selectedNodeId;
                    this.globalCalls[this.projectId] = this.globalCalls[this.projectId] || {};
                    this.globalCalls[this.projectId][event.selectedNodeId] = true;
                    this.zephyrStore.dispatch(this.tcrAction.fetchTreeByReleaseId(event.selectedNodeId, this.projectId, true));
                }
                return;
            }
        }
        // clicked on tcr node, fetch testcase
        if (!event.selectedNodeId) {
            return;
        }
        this.globalNode = event.selectedNodeId;
        this.fetchGlobalTestcases(1);
    }
    globalGridPrevClick(value) {
        this.fetchGlobalTestcases(value);
    }
    globalGridNextClick(value) {
        this.fetchGlobalTestcases(value);
    }
    globalGridPaginateByIndex(value) {
        this.fetchGlobalTestcases(value);
    }
    globalGridPageSizeChange(value) {
        this.globalSize = value;
        this.fetchGlobalTestcases(1);
    }
    fetchGlobalTestcases(value?) {
        this.globalPage = value || 1;
        this.zephyrStore.dispatch(this.tcrAction.fetchTestCasesOnGlobalTcrTreeClick({
            treeId: this.globalNode,
            pageSize: this.globalSize,
            offset: this.globalSize * (this.globalPage - 1),
            currentPage: this.globalPage,
            order: 'id'
        }));
    }

    fetchLocalTestcases(value?) {
        this.localPage = value || 1;
        this.zephyrStore.dispatch(this.tcrAction.fetchTestCasesOnLocalTcrTreeClick({
            treeId: this.localNode,
            pageSize: this.localSize,
            offset: this.localSize * (this.localPage - 1),
            currentPage: this.localPage,
            order: 'id'
        }));
    }
    onLocalTreeClick(event) {
        if (!event.selectedNodeId) {
            return;
        }
        this.localNode = event.selectedNodeId;
        this.fetchLocalTestcases(1);
    }
    localGridPrevClick(value) {
        this.fetchLocalTestcases(value);
    }
    localGridNextClick(value) {
        this.fetchLocalTestcases(value);
    }
    localGridPaginateByIndex(value) {
        this.fetchLocalTestcases(value);
    }
    localGridPageSizeChange(ev) {
        this.localSize = ev;
        this.fetchLocalTestcases(1);
    }

    onCopyNode(data) {
        this.isCopy = 'tree';
        this.zephyrStore.dispatch(this.tcrAction.copyGlobalNode(data, data.targetNodeReleaseId));
    }
    onDrag(ev) {
        jQuery('.js-global-wrapper').addClass('blur-overlay');
    }
    onDrop(ev) {
        jQuery('.js-global-wrapper').removeClass('blur-overlay');
    }
    onTreeDrop(ev) {
        if ('copy' === ev.operation && ev.release && ev.dropId && ev.dragId) {
            let data = {
                releaseId: ev.release,
                targetNodeId: ev.dropId,
                ids: ev.dragId
            };
            this.isCopy = 'grid';
            this.zephyrStore.dispatch(this.tcrAction.copyTestcaseNode(data));
        }
    }
    onLocalGridDrop(ev) {
        if ('copy' === ev.operation && ev.dragId) {
            let data = {
                releaseId: this.localReleaseId,
                targetNodeId: this.localNode,
                ids: ev.dragId
            };
            this.isCopy = 'grid';
            this.zephyrStore.dispatch(this.tcrAction.copyTestcaseNode(data));
        }
    }
}
