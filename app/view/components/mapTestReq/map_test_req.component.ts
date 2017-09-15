import {Component, Input, Output, EventEmitter, ViewChild, OnDestroy, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';

import {ZephyrStore} from '../../../store/zephyr.store';

import {MapTestReqAction} from '../../../actions/mapTestReq.action';
import {TestcaseAction} from '../../../actions/testcase.action';

import {GridComponent} from '../grid/grid.component';
import {RequirementDetailsComponent} from '../requirements/requirement_details.component';
import {ToastrService} from '../../../services/toastr.service';

// Constants
import { MAP_TC_GRID_TYPE, MAP_REQ_GRID_TYPE, FETCH_TREE_SUCCESS, FETCH_GRID_SUCCESS, MAP_TC_GRID_OPTIONS,
    MAP_REQ_GRID_OPTIONS } from './map_test.constant';
import {NEXT_RECORD, PREV_RECORD} from '../common/paginator/paginator.constant';
import * as GRID_CONSTANTS from '../grid/grid.constant';
import {JIRA_REQUIREMENT_TYPE} from '../../../utils/constants/application.constants';

declare var jQuery: any, _: any, window: any;

@Component({
    selector: 'map-req-test',
    templateUrl: 'map_test_req.html',
    viewProviders: [MapTestReqAction, TestcaseAction],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapTestReqComponent implements OnDestroy, AfterViewChecked {
    @ViewChild(GridComponent) gridComponent: GridComponent;
    @ViewChild(RequirementDetailsComponent) reqDetailsComponent: RequirementDetailsComponent;
    @Input() buttonId = '';
    @Input() editable = true;
    @Input() buttonText = 'Map';
    @Input() title = '';
    @Input() type = 'none';
    @Input() gridId;
    @Input() isBulk = false;
    @Output() onSaveMap: EventEmitter<any> = new EventEmitter();
    treeData;
    releaseId;
    releaseName;
    selectedTreeNode;
    mapId = null;
    selectedNodes = {};
    treeMap = {};
    mapIds = [];
    rowIds;
    rows: Array<Object> = [];
    isFirstPage;
    isLastPage;
    currentPage;
    unsubscribe;
    isModalShown;
    isChildren;
    defectSystemType;
    reqId;
    _zephyrStore;
    gridPageSize = GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT;
    _mapGridType;
    _mapGridOptions;
    paginationOptions;
    treeType;
    currentRecord = 1;
    tcTestcaseId;
    gridSelectIds;
    gridIds;
    totalCount;
    secondaryIds = [];
    maps = {};
    doSave = false;
    _toastrService;
    selectedTreeId;
    selectedParents;
    constructor(private _mapAction: MapTestReqAction, private _testcaseAction: TestcaseAction, private cdr: ChangeDetectorRef) {
        let release = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`));
        this.releaseId = (release || {}).id;
        this.releaseName = (release || {}).text;
        this._toastrService = new ToastrService();

        this._zephyrStore = ZephyrStore.getZephyrStore();

        this.unsubscribe = this._zephyrStore.subscribe(() => {

            // we have 2 instances of this component in tcr, so we need to prevent any action of the component not in view
            if (!this.isModalShown) {
                return;
            }

            let fullState = this._zephyrStore.getState();
            let state = fullState.mapTestReqReducer;

            let defectSystem = fullState.global.defectSystem;
            if(defectSystem && defectSystem['systemType']) {
                this.defectSystemType = defectSystem['systemType'];
            }

            if ('FETCH_JIRA_REQUIREMENT' === state.event) {
                let jiraDetails = state.jiraDetails;
                this._zephyrStore.dispatch(this._mapAction.clearEvents());
                let reqObj = this.rows.filter(item => item['id'] === this.reqId)[0];
                if (reqObj) {
                    reqObj['details'] = jiraDetails;
                    this.reqDetailsComponent.onReqDetailsUpdate(reqObj, this.releaseId);
                }
            }

            if (FETCH_TREE_SUCCESS === state.event) {
                this.selectedNodes = state.mapData;
                this.treeMap = state.treeMap;
                if ('test' === this.type) {
                    this.mapIds = state.mapIds.filter(item => this.releaseId === item.pathDto.releaseId).map(item => item.testcaseId);
                } else if ('req' === this.type) {
                    this.mapIds = state.mapIds.map(item => item.requirementId);
                }
                this._zephyrStore.dispatch(this._mapAction.clearEvents());
            }

            if (FETCH_GRID_SUCCESS === state.event) {
                this._zephyrStore.dispatch(this._mapAction.clearEvents());

                if (!this.maps.hasOwnProperty(this.selectedTreeNode)) {
                    let key = this.selectedNodes[this.selectedTreeNode];
                    this.maps[this.selectedTreeNode] = {
                        key: 'check' === key ? 2 : 0,
                        ids: 'check' === key || 'uncheck' === key ? [] : this.mapIds
                    };
                }

                this.paginationOptions = state.grid.paginationOptions;
                this.gridPageSize = state.grid.size;
                this.currentPage = state.grid.currentPage;
                if ('req' === this.type) {
                    state.grid.rows = state.grid.rows.map(item => {
                        let maps = (item.requirementReleaseTestcaseCountMapping || []).filter(item => String(item.releaseId) === String(this.releaseId))[0];
                        let coverage = maps && _.isObject(maps) ? maps.testcaseCount || 0 : 0;

                        item.coverage = coverage;

                        return item;
                    });
                }
                this.rows = state.grid.rows;
                this.totalCount = state.grid.totalCount;
                this.setRows();

                this.isFirstPage = state.grid.isFirstPage;
                this.isLastPage = state.grid.isLastPage;

            }

            if (!state.grid.rows.length) {
                this.rows = [];
                this.rowIds = [];
                this.gridIds = [];
                this.gridSelectIds = [];
                this.mapId = null;
            }
            if (!_.isEmpty(state.saveMap) || Array.isArray(state.saveMap)) {
                let map = JSON.parse(JSON.stringify(state.saveMap));
                jQuery(this.getId('#zee-map-modal')).modal('hide');
                this.onSaveMap.emit(map);
                return;
            }
            this.treeData = state.treeData;
            this.isChildren = false;
            if (Array.isArray(state.treeData.tree) && state.treeData.tree.length && state.treeData.tree[0].children && state.treeData.tree[0].children.length) {
                this.isChildren = true;
            }
            if(this.cdr) { this.cdr.markForCheck(); }
        });
    }
    ngOnDestroy() {
        this.unsubscribe();
    }

    ngAfterViewChecked() {
        if ('test' === this.type) {
            this._mapGridType = MAP_TC_GRID_TYPE;
            this._mapGridOptions = MAP_TC_GRID_OPTIONS;
        } else if ('req' === this.type) {
            this._mapGridType = MAP_REQ_GRID_TYPE;
            this._mapGridOptions = MAP_REQ_GRID_OPTIONS;
        }

        jQuery(this.getId('#zee-map-modal')).off('hide.bs.modal').on('hide.bs.modal', (event) => {
            this._zephyrStore.dispatch(this._mapAction.clearData());
            this.clearData();
            this.isModalShown = false;

        }).off('show.bs.modal').on('show.bs.modal', () => {
            this.isModalShown = true;
        });

    }

    getId(id) {
        return id + this.buttonId;
    }

    isDisable() {
        return !this.doSave && !jQuery('#override').prop('checked');
    }

    clearData() {
        this.selectedTreeNode = undefined;
        this.selectedTreeId = undefined;
        this.selectedParents = [];
        this.secondaryIds = [];
        this.maps = {};

        this.paginationOptions = undefined;
        this.gridPageSize = GRID_CONSTANTS.GRID_ROW_COUNT_DEFAULT;
        if(this.gridComponent) {
            this.gridComponent.setGridOptions(this._mapGridOptions, null);
        }

        jQuery('.map-details').addClass('hide');
        jQuery('#override').prop('checked', false);
    }
    setRows() {
        this.rowIds = [];
        this.gridIds = [];
        this.gridSelectIds = [];
        if ('test' === this.type) {
            this.rows.forEach(item => {
                this.rowIds.push(item['testcase']['id']);
                this.gridIds.push(item['id']);
            });
        } else if ('req' === this.type) {
            this.rows.forEach(item => {
                this.rowIds.push(item['id']);
                this.gridIds.push(item['id']);
            });
        }
        if (this.selectedTreeNode) {
            let map = this.maps[this.selectedTreeNode];
            if (0 === map.key) {
                this.secondaryIds = map.ids;
            } else {
                this.secondaryIds = _.difference(this.rowIds, map.ids);
            }
            let gridSelectIds = [];
            if (2 === map.key) {
                if ('test' === this.type) {
                    gridSelectIds = this.rows.filter(item => -1 === map.ids.indexOf(item['testcase']['id']));
                } else if ('req' === this.type) {
                    gridSelectIds = this.rows.filter(item => -1 === map.ids.indexOf(item['id']));
                }
            } else if (0 === map.key) {
                if ('test' === this.type) {
                    gridSelectIds = this.rows.filter(item => -1 !== map.ids.indexOf(item['testcase']['id']));
                } else if ('req' === this.type) {
                    gridSelectIds = this.rows.filter(item => -1 !== map.ids.indexOf(item['id']));
                }
            }
            this.gridSelectIds = gridSelectIds.map(item => item['id']);
        }
    }
    getDetails() {
        if ('test' === this.type) {
            this._zephyrStore.dispatch(this._mapAction.fetchTestcaseTreeWithReleaseDetails(this.releaseId,
                this.releaseName, this.gridId));
        } else if ('req' === this.type) {
            let state = this._zephyrStore.getState();
            this._zephyrStore.dispatch(this._mapAction.fetchRequirementTreeWithReleaseDetails(state.project.id, this.releaseId,
                this.releaseName, this.gridId, this.isBulk));
        }
    }
    setAllocatedTree(checkNodes, thisId) {

        if (this.treeMap.hasOwnProperty(thisId)) {

            let thisCount = Number(this.treeMap[thisId].total || '0');

    		thisCount = 'check_node' === checkNodes.type ? thisCount : -thisCount;

    		checkNodes.parentId.forEach(id => {

                if (this.treeMap.hasOwnProperty(id)) {
                    let total = Number(this.treeMap[id].total);
                    let allocated = Number(this.treeMap[id].allocated);
                    let count = Math.max(allocated + thisCount, 0);
                    this.treeMap[id].allocated = Math.min(count, total);
                }

    		});
    		checkNodes.selectedNode.forEach(id => {
                if (this.treeMap.hasOwnProperty(id)) {
                    let total = 'check_node' === checkNodes.type ? Number(this.treeMap[id].total) || 0 : 0;
                    this.treeMap[id].allocated = total;
                }
    		});
        }

	}
    setAllocatedGrid(length) {

        let thisId = jQuery(`#${this.selectedTreeId}`).children('a').attr('data-id');
        if (this.treeMap.hasOwnProperty(thisId)) {
            let thisAllocated = Number(this.treeMap[thisId].allocated);
            let diff = length - thisAllocated;
            this.selectedParents.concat(this.selectedTreeId).forEach(item => {
                let node = jQuery(`#${item}`).children('a');
                let id = node.attr('data-id');
                if (this.treeMap.hasOwnProperty(id)) {
                    let allocated = Math.max(Number(this.treeMap[id].allocated) + diff, 0);
                    let total = Number(this.treeMap[id].total);
                    this.treeMap[id].allocated = Math.min(allocated, total);
                    let type = 0 !== allocated && 0 !== total ? allocated === total ? 'check' : 'partial' : 'uncheck';
                    this.selectedNodes[id] = type;
                }
    		});
        }

        let nodes = this.selectedNodes;
        let treeCheckStatus =  Object.keys(nodes).map(function(e) {
          return [Number(e), nodes[e]];
        });
        //check for handling select all from grid
        if(this.selectedNodes && treeCheckStatus.length == 2){
          treeCheckStatus[1][1] === 'check'?this.selectedNodes['0'] = 'check':this.selectedNodes['0'] = 'uncheck';
        }
        // force onChange on this.selectedNodes
        this.selectedNodes = JSON.parse(JSON.stringify(this.selectedNodes));

    }
    onGridSelection(value) {
        this.doSave = true;

        // get selected rows of current grid

        let secIds = 'test' === this.type ? value[1] : value;

        value = 'test' === this.type ? value[0] : value;
        value = JSON.parse(JSON.stringify(value));

        secIds = secIds.filter(item => -1 !== this.rowIds.indexOf(item));
        let map = this.maps[this.selectedTreeNode];

        map.ids = _.difference(map.ids, this.rowIds);

        if (2 === map.key) {
            // exclusion list, so add those ids which are unselected
            secIds = _.difference(this.rowIds, secIds);
        }
        map.ids = _.union(map.ids, secIds);

        secIds = value.filter(item => -1 !== this.gridIds.indexOf(item));
        this.gridSelectIds = this.gridSelectIds.filter(item => -1 === this.gridIds.indexOf(item)).concat(secIds);

        this.setAllocatedGrid(value.length);
    }
    onTreeSelect(checkNodes) {
        let thisId = jQuery(`#${checkNodes.id}`).children('a').attr('data-id');
        this.setAllocatedTree(checkNodes, thisId);
        if (this.treeMap.hasOwnProperty(thisId) && 0 === Number(this.treeMap[thisId].total)) {
            let type = 'test' === this.type ? 'testcases' : 'requirements';
            this._toastrService.error(`No ${type} were assigned.`);
        }
        this.doSave = true;

        checkNodes.selectedNode.forEach(item => {
            this.maps[item] = {
                key: 'check_node' === checkNodes.type ? 2 : 0,
                ids: []
            };
        });
        this.setRows();
        let checkItems = checkNodes.selectedNode.concat(checkNodes.parentId);
        checkItems.forEach(id => {
            if (this.treeMap.hasOwnProperty(id)) {
                let total = Number(this.treeMap[id].total);
                let allocated = Number(this.treeMap[id].allocated);
                let type = 0 !== allocated ? allocated === total ? 'check' : 'partial' : 'uncheck';
                this.selectedNodes[id] = type;
            }
        });

        // force onChange on this.selectedNodes
        this.selectedNodes = JSON.parse(JSON.stringify(this.selectedNodes));
    }
    onClose() {
        this.clearSelectedNodes();
    }
    clearSelectedNodes() {
        this.mapId = null;
        this.currentRecord = 1;
        jQuery('.map-details').addClass('hide');
    }
    onTreeNodeClick(target) {
        this.selectedTreeNode = target.selectedNodeId;
        this.treeType = target.type;
        this.selectedParents = target.parents;
        this.selectedTreeId = target.selectedNode[0];
        this.clearSelectedNodes();

        this.fetchMap(1);
    }
    fetchRequirements() {
        this._zephyrStore.dispatch(this._mapAction.fetchRequriementsOnTreeClick({
            treeId: this.selectedTreeNode,
            releaseId: this.releaseId,
            pageSize: this.gridPageSize,
            offset: this.gridPageSize * (this.currentPage - 1)
        }, this.currentPage));
    }
    fetchTestCases() {
        this._zephyrStore.dispatch(this._mapAction.fetchTestCasesOnTreeClick({
            treeId: this.selectedTreeNode,
            pageSize: this.gridPageSize,
            order: 'id',
            offset: this.gridPageSize * (this.currentPage - 1)
        }, this.currentPage));
    }
    fetchMap(page?) {
        if (!this.selectedTreeNode) {

            this.rows = [];
            this.setRows();

            this.paginationOptions = undefined;
            this.isFirstPage = true;
            this.isLastPage = true;

            return;
        }
        this.currentPage = page || 1;

        if ('test' === this.type) {
            this.fetchTestCases();
        } else if ('req' === this.type) {
            this.fetchRequirements();
        }
    }
    onPrevClick(ev) {
        // do not go below zero
        let page = Math.max(ev, 0);
        this.fetchMap(page);
    }
    onNextClick(ev) {
        // do not go beyond total pages
        let page = Math.min(ev, this.paginationOptions.lastIndex);
        this.fetchMap(page);
    }
    onIndexClick(ev) {
        // do not go below zero or beyond total pages
        let page = Math.min(Math.max(ev, 0), this.paginationOptions.lastIndex);
        this.fetchMap(page);
    }
    onPageSizeChange(ev) {
        this.gridPageSize = ev;
        this.fetchMap(1);
    }
    onGridClick(targetRow) {
        if (this.isBulk) {
            return;
        }
        let index = Number(targetRow.dataset.index);
        let mapObject: any = this.rows[index];
        this.currentRecord = ((this.currentPage - 1) * this.gridPageSize) + index + 1;
        if(!mapObject || !mapObject.id) {
            return;
        }
        jQuery('.map-details').removeClass('hide');
        if ('test' === this.type) {
            this.mapId = mapObject.id;
            this.tcTestcaseId = (mapObject.testcase || {}).id || 0;
            this._zephyrStore.dispatch(this._testcaseAction.setTestcaseFromGrid(mapObject));
        } else if ('req' === this.type) {
            if (!mapObject) {
                this.reqDetailsComponent.onReqDetailsUpdate(mapObject, this.releaseId);
                return;
            }
            if (JIRA_REQUIREMENT_TYPE === mapObject['requirementType'] && !mapObject.hasOwnProperty('details') &&
                this.defectSystemType && Number(this.defectSystemType) === mapObject['requirementType']) {

                this.reqId = mapObject['id'];
                this._zephyrStore.dispatch(this._mapAction.getJiraDescription(mapObject['externalId']));
            } else {
                this.reqDetailsComponent.onReqDetailsUpdate(mapObject, this.releaseId);
            }
        }
    }
    recordChanged(ev) {
        this.currentRecord = ev.currentRecord;
        switch(ev.type) {
            case NEXT_RECORD:
                if (this.currentRecord % this.gridPageSize === 1) {
                    this.onNextClick(this.currentPage + 1);
                } else {
                    jQuery('#map-grid .selected-row').next().trigger('click');
                }
                break;

            case PREV_RECORD:
                if (this.currentRecord % this.gridPageSize === 0) {
                    this.onPrevClick(this.currentPage - 1);
                } else {
                    jQuery('#map-grid .selected-row').prev().trigger('click');
                }
                break;
        }
    }
    saveMap() {
        if (!this.doSave && !jQuery('#override').prop('checked')) {
            this._toastrService.error('Data has not been modified. Nothing to save.');
            return;
        }
        let modTree = [],
            modItem = [],
            selectTree = _.difference(Object.keys(this.selectedNodes), Object.keys(this.maps));

        // add for nodes not visited
        selectTree.forEach(key => {
            key = Number(key);
            if (key) {
                if ('check' === this.selectedNodes[key]) {
                    modTree.push([key, 2]);
                } else if ('uncheck' === this.selectedNodes[key]) {
                    modTree.push([key, 0]);
                } else if ('partial' === this.selectedNodes[key]) {
                    modTree.push([key, 0]);
                    this.mapIds.forEach(item => {
                        modItem.push([key, item]);
                    });
                }
            }
        });

        // add for visited nodes
        Object.keys(this.maps).forEach(key => {
            let numKey = Number(key);
            if (numKey) {
                modTree.push([numKey, this.maps[numKey].key]);
                this.maps[numKey].ids.forEach(item => {
                    modItem.push([numKey, item]);
                });
            }
        });


        if ('test' === this.type) {
            let modTCRCatalogTree = modTree;
            let requirementId = this.gridId;
            let modTestcase = modItem;
            // console.log('save testcase', requirementId, modTCRCatalogTree, modTestcase);
            this._zephyrStore.dispatch(this._mapAction.saveTestCase({modTCRCatalogTree, requirementId, modTestcase, releaseId: this.releaseId}));
        } else if ('req' === this.type) {
            let modRequirementTree = modTree;
            let modRequirement = modItem;
            let releaseId = this.releaseId;
            // console.log('save requirement', testcaseid, modRequirementTree, modRequirement, releaseId);
            if(this.isBulk) {
                let override = jQuery('#override').prop('checked');
                let testcaseids = this.gridId;
                this._zephyrStore.dispatch(this._mapAction.saveBulkRequirement({modRequirementTree, testcaseids, modRequirement, releaseId, override}));
            } else {
                let testcaseid = this.gridId;
                this._zephyrStore.dispatch(this._mapAction.saveRequirement({modRequirementTree, testcaseid, modRequirement, releaseId}));
            }
        }
    }
}
