import {AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, ViewChild} from '@angular/core';

import {TCRAction} from '../../../../../../actions/tcr.action';
import {ZephyrStore} from '../../../../../../store/zephyr.store';
import {TcrGridComponent} from '../../../../tcr/tcr_grid.component';

import {I18N_MESSAGES} from '../../../../../../utils/messages/messages.en';
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {Http} from "@angular/http";
import {TestcaseEASAction} from "../../../../../../actions/testcaseEAS.action";
import {Resizable} from "../../../../../../utils/scripts/resizable";

declare var jQuery: any, _;

@Component({
  selector: 'zui-testcase-eas-freeform-add-browse',
  templateUrl: 'testcase_eas_add_browse.html',
  viewProviders: [TCRAction]
})

export class TestcaseEASFreeFormBrowseComponent implements AfterViewInit, OnDestroy {
  @ViewChild(TcrGridComponent) tcrGridUI: TcrGridComponent;
  @Input() releaseId;
  @Input() cyclePhaseId;
  @Input() parentTreeId;
  @Input() projectId;
  @Input() includeHierarchy;

  selectedNodesForParent = {};
  selectedNodeCount = 0;
  _releaseIdObs:Observable<any>;
  selectedTctIds = [];
  allIds = [];
  allSecondaryIds = [];
  treeOptions = ['checkbox'];
  secIds = [];
  treeData : any;
  selectedNodes;

  total:any = {
    nodes: 0,
    count: 0
  };

  resizable;
  exclusionListForTCT = [];
  timeout = null;
  exclusionListForId = [];
  lastCheckedNode;
  lastClickedNode;
  testcaseId;
  currentRecord;
  _zephyrStore;
  tcrGridCmp;
  selectedTreeNode;
  i18nMessages = I18N_MESSAGES;
  nodeTracker : any= {};
  meta :any = {};
  secondaryIds = [];
  unsubscribe;
  cumulation = {};
  discreteCountOfTestcases = {};
  childNodeMap = {};

  constructor(private _tcrAction: TCRAction, private _testcaseEASAction: TestcaseEASAction, private zone:NgZone) {
    this._zephyrStore = ZephyrStore.getZephyrStore();
    this.resizable = new Resizable();

    this.unsubscribe = this._zephyrStore.subscribe((x) => {
      let state = this._zephyrStore.getState();

        if (state.testcaseEAS.event === "GET_DISCRETE_COUNT_TESTCASE_SUCCESS") {
            // state.testcaseEAS.cumulativeCount.forEach((item) => {
            //   this.cumulation[item.treeId] = item.testcaseCount;
            // });

            this.discreteCountOfTestcases = state.testcaseEAS.discreteCount;

            //
            // if (this.treeData) {
            //   this.discreteCountOfTestcases[0] = this.setDiscreteCount(this.treeData.tree, this.cumulation[0]);
            // }

            this._zephyrStore.dispatch(this._testcaseEASAction.clearEvents(null));
        }

        if (state.tcr.treeData.event === "FETCH_TREE_DATA") {
          let treeData = state.tcr.treeData;

          let indexOfImported = _.findIndex(treeData, { 'text': 'Imported'});

          if (indexOfImported !== -1) {
            treeData[indexOfImported].preventAdd = true;
          }

          setTimeout(() => {
            this.treeData = treeData;
            this.selectedNodes = {};
            this.setSelectedNodes(treeData.tree[0]);
            //
            // if (Object.keys(this.cumulation).length && !Object.keys(this.discreteCountOfTestcases).length) {
            //   this.discreteCountOfTestcases[0] = this.setDiscreteCount(this.treeData.tree, this.cumulation[0]);
            // }

          }, 51);

          this._zephyrStore.dispatch(this._tcrAction._clearTreeEvent());
        }

        if(state.tcr.tcrGrid.gridEvent == 'FETCH_TESTCASES_BY_TREE_ID_SUCCESS') {
          this.zone.run(() => {
            this.meta[this.lastClickedNode] = state.tcr.tcrGrid.totalCount;
            if (this.lastCheckedNode) {
              this.setIds();
            } else {
              jQuery("#testcase_select_all").prop("checked", false);
            }

          });

          this.setInitialAndSecondaryIds();
          this._zephyrStore.dispatch(this._tcrAction.clearTCRGridEventForBrowse(null));
        }

        this.attachResizer();
    });
  }

  // setDiscreteCount(nodes, count) {
  //
  //   nodes.forEach((node) => {
  //     let aggregate = 0;
  //
  //     let attrs = node['a_attr'];
  //     let id = attrs['data-id'] ? attrs['data-id'] : 0;
  //
  //     if (node.children.length) {
  //       let sumMinusChild = this.setDiscreteCount(node.children, this.cumulation[id]);
  //       aggregate = (this.cumulation[id] - sumMinusChild) + sumMinusChild;
  //       this.discreteCountOfTestcases[id] = sumMinusChild;
  //     } else {
  //       aggregate = aggregate + this.cumulation[id];
  //       this.discreteCountOfTestcases[id] = this.cumulation[id];
  //     }
  //
  //     count = count - aggregate;
  //   });
  //
  //   return count;
  // }

  setSelectedNodes(node) {
    let attrs = node['a_attr'];

    if (attrs) {
      let id = attrs['data-id'] ? attrs['data-id'] : 0;
      this.selectedNodes[id] = "uncheck";

      this.childNodeMap[id] = [];

      if (node.children.length) {
        node.children.forEach((n) => {
          this.childNodeMap[id].push(n['a_attr']['data-id']);
          this.setSelectedNodes(n);
        });

      }

    }
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  setIds() {
    let state = this._zephyrStore.getState();

    if (state.tcr.tcrGrid.rows.length) {
      this.selectedTctIds = [];
      this.selectedTctIds = _.map(state.tcr.tcrGrid.rows, 'id');

      this.secondaryIds = _.map(state.tcr.tcrGrid.rows, (row) => {
        return row.testcase.id;
      });

      if (this.nodeTracker[this.lastClickedNode] && this.nodeTracker[this.lastClickedNode].allSelected && this.nodeTracker[this.lastClickedNode].selectedIds.length) {
        this.exclusionListForTCT = this.nodeTracker[this.lastClickedNode].selectedTctIds;
        this.exclusionListForId = this.nodeTracker[this.lastClickedNode].selectedIds;
      }

      if (!this.nodeTracker[this.lastClickedNode]) {
        this.nodeTracker[this.lastClickedNode] = {
          selectedIds: [],
          selectedTctIds: [],
          allSelected: false
        };
      }

      if (this.nodeTracker[this.lastClickedNode] && !this.nodeTracker[this.lastClickedNode].allSelected && !this.nodeTracker[this.lastClickedNode].selectedTctIds.length) {
        this.selectedTctIds = [];
        this.selectedTctIds = [];
      }

      if (this.exclusionListForTCT.length) {
        this.selectedTctIds = this.selectedTctIds.filter((tctID) => {
            return this.exclusionListForTCT.indexOf(tctID) === -1;
        });
      }

      if (this.exclusionListForId.length) {
        this.secondaryIds = this.secondaryIds.filter((tctID) => {
          return this.exclusionListForId.indexOf(tctID) === -1;
        });
      }

      this.setInitialAndSecondaryIds();

      setTimeout(() => {
        if (this.meta[this.lastClickedNode] === this.selectedTctIds.length) {

          this.zone.onMicrotaskEmpty.first().subscribe(() => {
            let flag = this.checkAllChildChecked(this.lastCheckedNode);

            if (flag) {
              jQuery("#testcase_select_all").prop("checked", true);
              let selectedNodes = _.cloneDeep(this.selectedNodes);
              delete selectedNodes[this.lastClickedNode];
              selectedNodes[this.lastClickedNode] = "check";
              this.selectedNodes = selectedNodes;
            }

          });
        }

      });

    }
    this.calculateTotalSelections();
  }

  checkParentsAndTick(nodes, idForCheck) {

    let flag = false;

    _.forEach(nodes, (node) => {
      let aggregate = 0;

      let attrs = node['a_attr'];
      let id = attrs['data-id'] ? attrs['data-id'] : 0;

      if (id === idForCheck) {
        flag = true;
        return false;
      }

      if (node.children.length) {
        let response = this.checkParentsAndTick(node.children, idForCheck);

        if (response) {
          let childCheckFlag = true;

          if (this.childNodeMap[id].length) {

            this.childNodeMap[id].forEach((i) => {
              childCheckFlag = childCheckFlag && (this.selectedNodes[i] === "check" || this.selectedNodes[i] === "partial");
            });

          }

          let checkNodeChildStatus = true;

          if (this.childNodeMap[idForCheck].length) {

            this.childNodeMap[idForCheck].forEach((i) => {
              checkNodeChildStatus = checkNodeChildStatus && (this.selectedNodes[i] === "check" || this.selectedNodes[i] === "partial");
            });

          }

          if (this.nodeTracker[id]) {

            if (this.nodeTracker[id].selectedIds.length) {
              childCheckFlag = false;
            } else if (!this.nodeTracker[id].allSelected && !this.nodeTracker[id].selectedTctIds.length) {

              if (!childCheckFlag) {
                if ((!this.childNodeMap[idForCheck].length || this.childNodeMap[idForCheck].length && !checkNodeChildStatus)&& !childCheckFlag) {
                  childCheckFlag = null;
                } else {
                  childCheckFlag = false;
                }
              }

            } else if (this.nodeTracker[id].allSelected && (this.discreteCountOfTestcases[id] === 0 || this.discreteCountOfTestcases[id] === NaN)) {

              if (!childCheckFlag) {
                if ((!this.childNodeMap[idForCheck].length || this.childNodeMap[idForCheck].length && !checkNodeChildStatus)) {
                  childCheckFlag = null;
                } else {
                  childCheckFlag = false;
                }
              }

            }

          } else if (this.selectedNodes[idForCheck] === "uncheck") {
              childCheckFlag = null;
          } else if (this.discreteCountOfTestcases[id] > 0) {
            childCheckFlag = false;
          }

          if (childCheckFlag === true) {
            this.selectedNodes[id] = "check";
          } else if (childCheckFlag === null) {
            this.selectedNodes[id] = "uncheck";

            this.nodeTracker[id] = {
              selectedIds: [],
              selectedTctIds: [],
              allSelected: false
            };

            if (this.total.nodes > 0 && id !== 0) {
              this.total.nodes --;
            }

          } else {
            this.selectedNodes[id] = "partial";
          }

          flag = true;
          return false;
        }

        flag = false;
        return true;
      } else {
        flag = false;
        return true;
      }

    });

    return flag;
  }

  setInitialAndSecondaryIds() {
    let state = this._zephyrStore.getState();

    this.allIds = _.map(state.tcr.tcrGrid.rows, 'id');

    this.allSecondaryIds = _.map(state.tcr.tcrGrid.rows, (row) => {
      return row.testcase.id;
    });

  }

  clearSelectedTctIds(ev?:any) {
    this.selectedTctIds = [];
    this.secondaryIds = [];
  }

  updateUIOnTreeData() {
    setTimeout(function() {
      if(jQuery('#testcase-grid-panel').find('table').height() < jQuery('#testcase-grid-panel').find('grid').height()) {
        jQuery('#testcase-grid-panel').find('grid').css('border', 'none');
      } else {
        jQuery('#testcase-grid-panel').find('grid').css('border', '1px solid #ccc');
      }
    }, 50);
  }

  /**
   * On selecting the node,
   * set the breadcrumbs, fetch the testcases and clear the selected tct ids
   */
  onTreeItemSelection(ev) {
    // Call the tcr grid component to fetch testcases
    this.tcrGridUI.selectedTreeNode = ev.selectedTreeNode;
    this.tcrGridUI.fetchTestcases();
    this.clearSelectedTctIds();
  }

  attachResizer() {
    this.resizable.attachResizable(jQuery('#tcr-h-resizer'), jQuery('#tcr-h-resizer-handle'), {
        lockHeight: true,
        minWidth: jQuery('#tcr-h-resizer').outerWidth(),
        maxWidth: 500,
    });
  }

  ngAfterViewInit() {
    this._releaseIdObs = Observable.of(this.releaseId);

    let state = this._zephyrStore.getState();
    let selectedRelease = _.find(state.release.releases, ['id', parseInt(this.releaseId)]);
    let selectedProject = null;

    if (selectedRelease) {
      selectedProject = _.find(state.projects.projects, ['id', parseInt(selectedRelease.projectId)]);
    }
    let user = state.loggedInUser;
    if ( Object.keys(user).length) {
      this._zephyrStore.dispatch(this._tcrAction.fetchTreeDataWithReleaseDetails(this.releaseId, this.selectedTreeNode, selectedRelease, selectedProject, false));
      this._zephyrStore.dispatch(this._testcaseEASAction.fetchDiscreteCount(this.releaseId));
    }
  }

  onTcrTreeClick(event) {
    this.selectedTctIds = [];
    this.secondaryIds = [];

    if(this.tcrGridUI) {
      this.tcrGridCmp = this.tcrGridUI;
    }

    this.exclusionListForTCT = [];
    this.exclusionListForId = [];

    if (event.selectedNodeId) {
      this.lastClickedNode = event.selectedNodeId;

      let selectedNodes = [event.selectedNodeId];

      if (!this.nodeTracker[this.lastClickedNode]) {

        this.nodeTracker[this.lastClickedNode] = {
          selectedIds: [],
          selectedTctIds: [],
          allSelected: false
        };

        this.lastCheckedNode = null;
      } else if (this.nodeTracker[this.lastClickedNode].allSelected){
        this.lastCheckedNode = this.lastClickedNode;
      } else {
        this.lastCheckedNode = false;
      }

      this.selectedTreeNode = selectedNodes;
      this.testcaseId = null;
      this.currentRecord = 1;

      if(!selectedNodes.length) {
        this.tcrGridCmp.clearGridRows();
        this.tcrGridCmp.initGridData(); // To clear the pagination
        return;
      }

      this.tcrGridCmp.selectedTreeNode = this.selectedTreeNode;
      this.tcrGridCmp.initGridData();
      this.tcrGridCmp.fetchTestcases();
      this.clearSelectedTctIds();

      if (this.nodeTracker[this.lastClickedNode].selectedIds.length){

        if (this.nodeTracker[this.lastClickedNode] && !this.nodeTracker[this.lastClickedNode].allSelected) {
          this.selectedTctIds = this.nodeTracker[this.lastClickedNode].selectedTctIds;
          this.secondaryIds = this.nodeTracker[this.lastClickedNode].selectedIds;
        } else {
          this.exclusionListForTCT = this.nodeTracker[this.lastClickedNode].selectedTctIds;
          this.exclusionListForId = this.nodeTracker[this.lastClickedNode].selectedIds;
        }

      }

    } else {
      this.tcrGridCmp.clearGridRows();
      this.tcrGridCmp.initGridData(); // To clear the pagination
      this.lastClickedNode = null;
      this.lastCheckedNode = null;
    }

    // this.calculateTotalSelections(true);
  }

  onTreeNodeSelect(data) {
    if(this.tcrGridUI) {
      this.tcrGridCmp = this.tcrGridUI;
    }

    let currentSelectedNodes = _.cloneDeep(this.selectedNodes);

    currentSelectedNodes = data.selectedNodes;

    if (data.type === "check_node") {

      data.selectedNode.forEach((id) => {

        if (!this.nodeTracker[id]) {
          this.nodeTracker[id] = {
            selectedIds: [],
            selectedTctIds: [],
            allSelected: true
          };
        } else {
          this.nodeTracker[id].allSelected = true;
          this.nodeTracker[id].selectedIds = [];
          this.nodeTracker[id].selectedTctIds = [];
        }

      });

      data.selectedNode.forEach((node) => {
        currentSelectedNodes[node] = "check";
      });

      data.parents.forEach((node) => {
        let id = jQuery(`#${node}_anchor`).data("id");

        let childId = jQuery(`#${data.id}_anchor`).data("id");

        if (!this.selectedNodesForParent[id]) {
          this.selectedNodesForParent[id] = [];
        }

        if (this.selectedNodesForParent[id].indexOf(childId) === -1) {
          this.selectedNodesForParent[id].push(childId);
        }

        let childNodes = jQuery(`#${node} > .jstree-children`).find(".jstree-anchor");

        let uncheckedNodes = childNodes.filter((index, anchor) => {
          let id = jQuery(anchor).data("id");
          return this.selectedNodes[id] !== "check";
        });

        if (uncheckedNodes.length) {

          if (uncheckedNodes.length === childNodes.length) {
            currentSelectedNodes[id] = "uncheck";
          } else {
            currentSelectedNodes[id] = "partial";
          }

        } else {

          if (this.nodeTracker[id]) {
            if (this.discreteCountOfTestcases[id] > 0) {

              if (this.nodeTracker[id].allSelected && !this.nodeTracker[id].selectedIds.length) {
                currentSelectedNodes[id] = "check";
              } else {
                currentSelectedNodes[id] = "partial";
              }

            } else {
              currentSelectedNodes[id] = "check";
            }
          } else {
            currentSelectedNodes[id] = "partial";
          }

        }
      });

      this.lastCheckedNode =  data.selectedNode[data.selectedNode.length - 1];
      this.setIds();

    } else {
      this.lastCheckedNode = null;

      data.selectedNode.forEach((id) => {
        delete this.nodeTracker[id];
      });

      data.parents.forEach((node) => {
        let id = jQuery(`#${node}_anchor`).data("id");

        let childId = jQuery(`#${data.id}_anchor`).data("id");

        if (this.selectedNodesForParent[id]) {
          if (this.selectedNodesForParent[id].indexOf(childId) !== -1) {
            this.selectedNodesForParent[id].splice(this.selectedNodesForParent[id].indexOf(childId), 1);
          }

          if (currentSelectedNodes[id] === "partial" && !this.selectedNodesForParent[id].length && !(this.nodeTracker[id] && this.nodeTracker[id].selectedTctIds.length)) {
            currentSelectedNodes[id] = "uncheck";
          }
        }


        if (this.nodeTracker[id]) {

          if (this.nodeTracker[id].allSelected || this.nodeTracker[id].selectedIds.length) {
            currentSelectedNodes[id] = "partial";
          }

        } else {

        }

      });

      data.selectedNode.forEach((node) => {
        currentSelectedNodes[node] = "uncheck";
      });

      this.selectedTctIds = [];
      this.secondaryIds = [];

      this.exclusionListForTCT = [];
      this.exclusionListForId = [];

      setTimeout(() => {
        jQuery("#testcase_select_all").prop("checked", false);
      }, 100);

    }

    let selectedNodes = Object.keys(data.selectedNodes);

    this.selectedTreeNode = selectedNodes;
    this.selectedNodes = _.clone(currentSelectedNodes);
    this.testcaseId = null;
    this.currentRecord = 1;

    if(!selectedNodes.length) {
      this.tcrGridCmp.clearGridRows();
      this.tcrGridCmp.initGridData(); // To clear the pagination
      return;
    }


    this.calculateTotalSelections();
  }

  tcrGridRowSelection(value) {
    if (!this.nodeTracker[this.lastClickedNode]) {
      this.nodeTracker[this.lastClickedNode] = {
        selectedIds: [],
        selectedTctIds: [],
        allSelected: false
      };
    }

    if (this.nodeTracker[this.lastClickedNode].allSelected) {

      if (value[3]) {
        value[1].forEach((val, index) => {
          let tctid = this.nodeTracker[this.lastClickedNode].selectedTctIds;
          this.nodeTracker[this.lastClickedNode].selectedIds.splice(this.nodeTracker[this.lastClickedNode].selectedIds.indexOf(val), 1);
          this.nodeTracker[this.lastClickedNode].selectedTctIds.splice(this.nodeTracker[this.lastClickedNode].selectedIds.indexOf(tctid), 1);
        });
      } else if (value[3] === false) {

          if (this.nodeTracker[this.lastClickedNode].allSelected) {
            this.nodeTracker[this.lastClickedNode].selectedIds = _.union(this.nodeTracker[this.lastClickedNode].selectedIds, this.allSecondaryIds);
            this.nodeTracker[this.lastClickedNode].selectedTctIds = _.union(this.nodeTracker[this.lastClickedNode].selectedTctIds, this.allIds);
          }

      } else {

        let unselected = this.allSecondaryIds.filter((el) => {
          return value[1].indexOf(el) === -1;
        });

        let secIds = this.allIds.filter((el) => {
          return value[0].indexOf(el) === -1;
        });

        // this.allSecondaryIds.forEach(val => {
        //
        //   if (this.nodeTracker[this.lastClickedNode].selectedIds.indexOf(val) !== -1) {
        //     this.nodeTracker[this.lastClickedNode].selectedIds.splice(this.nodeTracker[this.lastClickedNode].selectedIds.indexOf(val), 1);
        //     this.nodeTracker[this.lastClickedNode].selectedTctIds.splice(this.nodeTracker[this.lastClickedNode].selectedIds.indexOf(val), 1);
        //   }
        //
        // });

        if (_.isEqual(this.allSecondaryIds, this.nodeTracker[this.lastClickedNode].selectedIds)) {
          this.nodeTracker[this.lastClickedNode].selectedIds = unselected;
          this.nodeTracker[this.lastClickedNode].selectedTctIds = secIds;
        } else {
          this.nodeTracker[this.lastClickedNode].allSelected = false;

          this.nodeTracker[this.lastClickedNode].selectedIds = value[1];
          this.nodeTracker[this.lastClickedNode].selectedTctIds = value[0];
        }

      }

    } else if (value[0].length === 0) {

      if (this.checkNoChildUnchecked()) {
        this.nodeTracker[this.lastClickedNode] = {
          selectedIds: [],
          selectedTctIds: [],
          allSelected: false
        };

        this.exclusionListForId = [];
        this.exclusionListForTCT = [];
      }
    } else {
      this.nodeTracker[this.lastClickedNode].selectedIds = value[1];
      this.nodeTracker[this.lastClickedNode].selectedTctIds = value[0];
    }

    this.selectedTctIds = value[0];
    this.secondaryIds = value[1];

    let selectedNodes = _.cloneDeep(this.selectedNodes);
    selectedNodes[this.lastClickedNode] = "partial";
    this.selectedNodes  = selectedNodes;

    this.calculateTotalSelections();
  }

  addTestcases() {
    let modifiedTreeMap = [];

    Object.keys(this.nodeTracker).forEach((key) => {
      let k = parseInt(key);

      if (k) {
        if (this.nodeTracker[k].allSelected) {
          modifiedTreeMap.push({
            treeid : k,
            tctIds: this.nodeTracker[k].selectedIds,
            isExclusion : !this.nodeTracker[k].allSelected
          });
        } else {
          modifiedTreeMap.push({
            treeid : k,
            tctIds: this.nodeTracker[k].selectedIds,
            isExclusion : true
          });
        }
      }

    });

    let _params = {
      includeHierarchy: this.includeHierarchy,
      cyclePhaseId: this.cyclePhaseId,
      parentTreeId: this.parentTreeId,
      easMode: 0,
      modifiedTreeMap
    };

    let body = {
      modifiedTreeMap
    };

    this._zephyrStore.dispatch(this._testcaseEASAction.assignTestcasesByBrowse(_params, modifiedTreeMap));
  }

  calculateTotalSelections(skipCheck = false) {
    let rows = this._zephyrStore.getState().tcr.tcrGrid.totalCount;

    if ((this.nodeTracker[this.lastClickedNode] && this.nodeTracker[this.lastClickedNode].allSelected && !this.nodeTracker[this.lastClickedNode].selectedIds.length) || (rows && rows === this.selectedTctIds.length)) {

      let state = "check";
      let flag = this.checkAllChildChecked(this.lastClickedNode);

      if (!flag) {
        state = "partial";
      }

      let selectedNodes = _.cloneDeep(this.selectedNodes);
      delete selectedNodes[this.lastClickedNode];
      selectedNodes[this.lastClickedNode] = state;
      this.selectedNodes = selectedNodes;
      this.nodeTracker[this.lastClickedNode] = {
        selectedIds: [],
        selectedTctIds: [],
        allSelected: true
      };

      this.setInitialAndSecondaryIds();

      if (state === "check") {
        this.checkParentsAndTick(this.treeData.tree, this.lastClickedNode);
      }
    }

    if (!skipCheck) {
      if (this.selectedTctIds.length === 0 && rows) {

        if (this.nodeTracker[this.lastClickedNode]) {

          if (!this.nodeTracker[this.lastClickedNode].allSelected || (this.nodeTracker[this.lastClickedNode].allSelected && this.nodeTracker[this.lastClickedNode].selectedIds.length === rows)) {

            if (this.checkNoChildUnchecked()) {
              let selectedNodes = _.cloneDeep(this.selectedNodes);
              delete selectedNodes[this.lastClickedNode];
              selectedNodes[this.lastClickedNode] = "uncheck";
              this.selectedNodes = selectedNodes;
              delete this.nodeTracker[this.lastClickedNode];
              this.checkParentsAndTick(this.treeData.tree, this.lastClickedNode);

              if (this.total.nodes > 0) {
                this.total.nodes --;
              }
            } else {
              let selectedNodes = _.cloneDeep(this.selectedNodes);
              delete selectedNodes[this.lastClickedNode];
              selectedNodes[this.lastClickedNode] = "partial";
              this.selectedNodes = selectedNodes;
              this.nodeTracker[this.lastClickedNode] = {
                selectedIds: [],
                selectedTctIds: [],
                allSelected: false
              };

              this.exclusionListForId = [];
              this.exclusionListForTCT = [];

              this.checkParentsAndTick(this.treeData.tree, this.lastClickedNode);
            }
          }

        } else {
          this.checkParentsAndTick(this.treeData.tree, this.lastClickedNode);
        }
      } else {
        this.checkParentsAndTick(this.treeData.tree, this.lastClickedNode);
      }
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.setCheckedNodes();
    } else {
      this.setCheckedNodes();
    }

  }

  setCheckedNodes() {
    this.timeout = setTimeout(() => {
      this.total = {
        nodes: 0,
        count: 0
      };

      Object.keys(this.selectedNodes).forEach((key) => {
        let hasClass = jQuery(`a[data-id=${key}] .jstree-checkbox`).hasClass("jstree-checked") || jQuery(`a[data-id=${key}] .jstree-checkbox`).hasClass("jstree-undetermined");

        if (parseInt(key) !== 0) {
          if ((this.selectedNodes[key] === "check" || this.selectedNodes[key] === "partial") || (this.nodeTracker[key] && (this.nodeTracker[key].allSelected || this.nodeTracker[key].selectedIds.length)) || hasClass) {
            this.total.nodes ++;
          }
        }
      });

      this.total.count = 0;

      Object.keys(this.nodeTracker).forEach((key) => {
        if (this.discreteCountOfTestcases[key]) {
          let node = this.nodeTracker[key];

          if (node.allSelected && !node.selectedIds.length) {
            this.total.count += this.discreteCountOfTestcases[key];
          } else if (node.allSelected && node.selectedIds.length) {
            this.total.count += this.discreteCountOfTestcases[key] - node.selectedIds.length;
          } else if (!node.allSelected && node.selectedIds.length) {
            this.total.count += node.selectedIds.length;
          }
        }
      });

      jQuery("#browse-count").show();
    }, 100);
  }

  checkAllChildChecked(id) {
    let flag = true;
    let children = this.childNodeMap[id];

    if (children && children.length) {
      let unselectedChild = children.filter((child) => {
        return this.selectedNodes[child] !== "check";
      });

      flag = unselectedChild.length === 0;
    }

    return flag;
  }

  checkNoChildUnchecked() {
    let childNodeMap = this.childNodeMap[this.lastClickedNode];
    let reset = true;

    _.forEach(childNodeMap, (node) => {

      if (this.selectedNodes[node] !== "uncheck") {
        reset = false;
        return false;
      }

      return true;
    });

    return reset;
  }

}
