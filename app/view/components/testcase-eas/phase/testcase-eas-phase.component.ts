import {
  Component, AfterViewInit, ComponentRef, NgZone,
  Input, ViewContainerRef, ComponentFactory, ComponentFactoryResolver, ViewChild, OnDestroy, ApplicationRef
} from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';

import {GlobalAction} from '../../../../actions/global.action';
import {ZEE_NAV_COLUMNS} from '../../projects/project_leftnav.data';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {TestcaseEASAction} from '../../../../actions/testcaseEAS.action';
import {ProjectAction} from '../../../../actions/project.action';
import {Resizable} from '../../../../utils/scripts/resizable';
import {EasFreeformAddComponent} from './tree/add/eas_freeform_add.component';
import {EasFreeformEditComponent} from './tree/edit/eas_freeform_edit.component';
import {EasFreeformDeleteComponent} from './tree/delete/eas_freeform_delete.component';
import {EasPhaseExportComponent} from './tree/export/eas_phase_export.component';
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import { ExportComponent } from '../../common/export/export.component';
import {UtililtyFunctions} from '../../../../utils/scripts/utils';
import {TCR_BULK_OPERATION_OPTIONS, TCR_BULK_OPERATION} from '../../tcr/operations/tcr_operations.constant';
import {
  DELETE_TESTCASE_SUCCESS, UPDATE_TREE_TESTCASE_EAS_EVENT, FETCH_COUNT_TESTCASES,
  TESTCASE_EXECUTIONS_UPDATED, FETCH_PHASE_TREE_BY_ID, SYNC_SUCCEESS,
  UPDATE_ROOT_NODE_ASSIGNED_COUNT, FETCH_ALL_EAS_TREE_COUNTS_COMPLETE,
  GET_TOTAL_ASSIGNED_COUNT, DELETE_TREE_TESTCASE_EAS_EVENT
} from '../../../../utils/constants/action.events';
import {TeamAction} from '../../../../actions/team.action';

declare var jQuery: any, _: any, window;

var easPhaseSelf = null;

//constant values used as action type for confirmation and alert modal
const DELETE = 'DELETE';
const STAR_FLAG = 'STAR_FLAG';
const UNSTAR_FLAG = 'UNSTAR_FLAG';
const UNSTAR_FLAG_BY_FOLDER = 'UNSTAR_FLAG_BY_FOLDER';
const STAR_FLAG_BY_FOLDER = 'STAR_FLAG_BY_FOLDER';
const SYNC = 'SYNC';
const SHOW_BULK_ASSIGNMENT_MODAL = 'SHOW_BULK_ASSIGNMENT_MODAL';
const NO_ACTION = 'NO_ACTION'; //This constant value is used when #confirmation-modal to
                                                       //be used as alert instead of confirmation

@Component({
  selector: 'testcase-eas-phase',
  viewProviders: [TestcaseEASAction , GlobalAction, TeamAction],
  templateUrl: 'testcase-eas-phase.html'
})

export class TestcaseEASPhaseComponent implements AfterViewInit, OnDestroy {
    @ViewChild('target', {read: ViewContainerRef}) target;
    treeData: {};
    cmpRef:ComponentRef<any>;

    zephyrStore;
    navColumns;
    i18nMessages = I18N_MESSAGES;

    isFreeForm: boolean = false; //variable to define phase type i.e. true value means it is free form phase else regular phase
    releaseId;
    reDrawTree : boolean = true;
    treeId;
    phaseTreeId;
    selectedNodeId;
    selectedTreeNode;
    totalAssignedTestcases: number = 0; // total assigned test cases of the phase (by cyclePhaseId)
    totalTestcases: number = 0;
    hereTotalTestcasesCount:number = 0;
    hereAssignedTestcasesCount: number = 0;
    users : Array<Object>;
    usersWithoutUnassigned : Array<Object>;
    breadCrumbList : Array<Object>;
    releaseObjectSelected: {};
    _reportType; // variable defines reportType used in export component
    fieldOptions = _.cloneDeep(TCR_BULK_OPERATION_OPTIONS['export']);

    //Phase Grid constants
    selectedTctIds = [];
    executionTests = [];
    gridPageSize;
    gridCurrentPage: number = 1;
    projectId = '';
    activeItemKey: string;
    unsubscribe;
    usersFetched=false;
    resizable;
    isFirstTimeLoading = true;

    testcaseId; //defines id of testcase currently selected

    phaseTree;

    isRemoveDeletednodestestcases = false;
    treeNodeClicked;
    paramSub;

    //form variables used in bulk assignment modal
    easModeBulkAssignment = 1;
    easMode1SelectAssignee = 'select';
    easMode2SelectAssignee = 'select';
    easMode3SelectAssigneeFrom = 'select';
    easMode3SelectAssigneeTo = 'select';
    easMode1Checkbox = false;
    easMode2Checkbox = false;
    easMode3Checkbox = false;

    confirmationObject = {};
    initialBulkAssignmentValue: number;
    syncMessagesArray = [];

    //constant values for title attribute.
    NO_TESTCASES_SELECTED = 'No testcases selected';
    DELETE_SELECTED_TESTCASES = 'Delete selected testcases';
    UPDATE_FLAG_SELECTED_TESTCASES = 'Update flag of selected testcases';
    ASSIGN_SELECTED_TESTCASES = 'Assign to selected testcases';

    constructor(public router: Router, private _testcaseEASAction: TestcaseEASAction,private _globalAction: GlobalAction,
      private vcRef: ViewContainerRef, private resolver: ComponentFactoryResolver, private route: ActivatedRoute,
      private ref: ApplicationRef,private zone:NgZone, private _projectAction:ProjectAction, private _teamAction:TeamAction) {

        easPhaseSelf = this;

        this.navColumns = ZEE_NAV_COLUMNS;
        this.zephyrStore = ZephyrStore.getZephyrStore();
	      this.gridPageSize = this.zephyrStore.getState().testcaseEAS.phaseGrid.size;
        this.initialBulkAssignmentValue = 1;
        this.releaseObjectSelected = localStorage.getItem(`${window.tab}-currentRelease`) ? JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`)) : {};
        this.breadCrumbList = [{id: '/release/' + this.releaseObjectSelected['id'],text:this.releaseObjectSelected['text']}];
        this.isFirstTimeLoading  = true;
        this.fetchUsersAllocatedToCurrentProject();

        //fetching of phase id clicked(passed in routing)
        // //this.phaseTreeId = parseInt(params.getParam('id'));
        // this.route.params.subscribe(params => {
        //     this.phaseTreeId = +params['id'];
        // });


        this.paramSub = this.route.params.subscribe(params => {
          this.phaseTreeId = +params['id'];
          this.setURLParams(params);
        });

        //call to fetch  phase tree
        this.zephyrStore.dispatch(this._testcaseEASAction.fetchPhaseTreeById(this.phaseTreeId));
        this.activeItemKey = 'testcase-eas';

        //Here was the error for binding issue in phase / Firefox phase routing issue
        this.zephyrStore.dispatch(this._testcaseEASAction.clearGridData('phaseGrid'));

        this.zephyrStore.dispatch(this._testcaseEASAction.clearPhaseRoute());
        //boolean value assignemnt to segregate phase type -- wheather free form or not
        let cycleArray = this.zephyrStore.getState().testcaseEAS.cycles;
        if (cycleArray && cycleArray.length > 0) { //checks for cyles data in store, if not available then makes API call for it.
          for (let j = 0; j < cycleArray.length; j++ ) {
            let cyclePhasesArray =  cycleArray[j].cyclePhases;
            for (let i = 0; i < cyclePhasesArray.length; i++) {
              let phaseObject = cyclePhasesArray[i];
              let phaseObjectId = cyclePhasesArray[i].id;
              if (phaseObjectId === this.phaseTreeId) {
                this.isFreeForm = phaseObject.freeForm;
                if (this.breadCrumbList.length === 1) { //checks whether the data is populated or not
                  this.breadCrumbList.push({id: '/testcase-eas/cycle/' + this.releaseObjectSelected['id'],text:cycleArray[j].name});
                  this.breadCrumbList.push({id:null,text:phaseObject.name});
                }
              }
            }
          }
        } else {
          this.zephyrStore.dispatch(this._testcaseEASAction.getAllCycles(this.releaseObjectSelected['id']));
        }


        this.unsubscribe = this.zephyrStore.subscribe(() => {
          this.zone.run(() => {

          let state = this.zephyrStore.getState();

          if(!this.usersFetched) {
              this.fetchUsersAllocatedToCurrentProject();
          }
          this.setLeftNavData(state);
          this.filteringUsersArray(state);

          //function call to update counts
          this.updateAllcounts(state);

        	this.phaseTree = state.testcaseEAS.phaseMap[this.phaseTreeId] && JSON.parse(JSON.stringify(state.testcaseEAS.phaseMap[this.phaseTreeId]));

            if (this.phaseTree && (state.testcaseEAS.event == FETCH_PHASE_TREE_BY_ID || state.testcaseEAS.event === FETCH_COUNT_TESTCASES ||
            state.testcaseEAS.event == FETCH_ALL_EAS_TREE_COUNTS_COMPLETE)) {
        	  let refetchData = false;

            //Call to clear events
            if(state.testcaseEAS.event == FETCH_ALL_EAS_TREE_COUNTS_COMPLETE) {
              refetchData = true;
            }
            this.zephyrStore.dispatch(this._testcaseEASAction.clearEvents(null));

    		let phaseTreeArray = [];
			  phaseTreeArray.push(this.phaseTree);
    		this.setTreeData(phaseTreeArray, this.reDrawTree);

            if(refetchData) {
              let id = this.treeNodeClicked['selectedNodeId'] || this.phaseTree['id'];
              this.zephyrStore.dispatch(this._testcaseEASAction.fetchTestCasesOnTreeClick({
                treeId: id,
                pageSize: this.gridPageSize,
                order: 'id',
                dbsearch: true,
                offset: this.gridPageSize * ( this.gridCurrentPage - 1 )
              }));


              //API call to fetch execution test cases of the clicked root node.
              this.zephyrStore.dispatch(this._testcaseEASAction.fetchExecutionsByTreeId(id));
            } else {
                //API call to get total and assigned test cases
                this.zephyrStore.dispatch(this._testcaseEASAction.getTotalAssignedCounts(this.phaseTree['id'],
                this.phaseTreeId , this.phaseTree['releaseId']));

            }
          }

          if(state.global.event == SYNC_SUCCEESS) {
               // clearing setting of global events
               this.zephyrStore.dispatch(this._globalAction.clearGlobalEvents());

               this.selectedTctIds = [];
               this.executionTests = [];

               this.reDrawTree = true; //to forget tree state (node selection and node state)

               //openign of sync-messages modal
               jQuery('#sync-messages-modal').modal();
               let syncData = state.global.syncMesages.messageObject;
               this.mapSyncObjectMessages(syncData);

               setTimeout(() => {

                 //code and API call to update tree
                 this.zephyrStore.dispatch(this._testcaseEASAction.fetchPhaseTreeById(this.phaseTreeId));

                 // updating count of total testcases also
                 // API call to get total assigned test cases
                 // call to fetch total assigned test cases for this particular phase(root tree node)
                 this.zephyrStore.dispatch(this._testcaseEASAction.fetchAssignedTestcasesbytreeNodeId(
                     this.phaseTree['id'] , this.phaseTreeId));

                 // API call to fetch count of all test cases of root tree node
                 this.zephyrStore.dispatch(this._testcaseEASAction.fetchTotalTestcasesbytcrCatelogIdRealeaseId(
                    this.phaseTree['id'] , this.phaseTree['releaseId'] , this.phaseTreeId
                  ));

                  // deleting the previous selection of node
                  this.treeNodeClicked = null;

                  // clearing grid data
                  this.zephyrStore.dispatch(this._testcaseEASAction.clearGridData('phaseGrid'));
               }, 2000);
           } else if (state.testcaseEAS.event == UPDATE_TREE_TESTCASE_EAS_EVENT) {
             this.zephyrStore.dispatch(this._testcaseEASAction.fetchPhaseTreeById(this.phaseTreeId));
           } else if (state.testcaseEAS.event == DELETE_TREE_TESTCASE_EAS_EVENT) {
              this.zephyrStore.dispatch(this._testcaseEASAction.fetchPhaseTreeById(this.phaseTreeId));
              this.treeNodeClicked = {};
            } else if (state.testcaseEAS.event == DELETE_TESTCASE_SUCCESS) {

              //Call to clear events
              this.zephyrStore.dispatch(this._testcaseEASAction.clearEvents(null));

              //API call to update count of total testcases for all the nodes
              this.zephyrStore.dispatch(this._testcaseEASAction.getAllCountsForRefresh(this.treeNodeClicked['selectedNodeId'],
                this.phaseTree['releaseId'], this.phaseTreeId, this.phaseTree['id']));

              // this.onTreeNodeClick(this.treeNodeClicked);
              this.selectedTctIds = [];

           } else if (state.testcaseEAS.event == TESTCASE_EXECUTIONS_UPDATED) {

              // Call to clear events
              this.zephyrStore.dispatch(this._testcaseEASAction.clearEvents(null));
              this.selectedTctIds = [];
              this.executionTests = [];

              //call to fetch total assigned test cases for this particular phase(root tree node)
              this.zephyrStore.dispatch(this._testcaseEASAction.fetchAssignedTestcasesbytreeNodeId(
                this.phaseTree['id'] , this.phaseTreeId));

              //API call to fetch count of assigned test cases of selected tree node
              this.zephyrStore.dispatch(this._testcaseEASAction.fetchAssignedTestcasesbytreeNodeId(
                this.treeNodeClicked.selectedNodeId , null));
           } else if (state.testcaseEAS.event == UPDATE_ROOT_NODE_ASSIGNED_COUNT) {

             //Call to clear events
             this.zephyrStore.dispatch(this._testcaseEASAction.clearEvents(null));

             //call to fetch total assigned test cases for this particular phase(root tree node)
             this.zephyrStore.dispatch(this._testcaseEASAction.fetchAssignedTestcasesbytreeNodeId(
               this.phaseTree['id'] , this.phaseTreeId));
           } else if (this.isFirstTimeLoading && state.testcaseEAS.event == GET_TOTAL_ASSIGNED_COUNT) {

             //Call to clear events
             this.zephyrStore.dispatch(this._testcaseEASAction.clearEvents(null));
             if (this.totalTestcases > 0 && this.totalAssignedTestcases == 0) {
               jQuery('#bulk-assignment-initial-modal').modal();
              }
             this.isFirstTimeLoading = false;
           }

           //boolean value to segregate phase type -- wheather free form or regular phase
            if (this.breadCrumbList.length === 1) { //checks whether the data is populated or not
              let cycleArray = state.testcaseEAS.cycles;
              if (cycleArray && cycleArray.length > 0) {
                for (let j = 0; j < cycleArray.length; j++ ) {
                  let cyclePhasesArray =  cycleArray[j].cyclePhases;
                  for (let i = 0; i < cyclePhasesArray.length; i++) {
                    let phaseObject = cyclePhasesArray[i];
                    let phaseObjectId = cyclePhasesArray[i].id;
                    if (phaseObjectId === this.phaseTreeId) {
                      this.isFreeForm = phaseObject.freeForm;
                      this.breadCrumbList.push({id: '/testcase-eas/cycle/' + this.releaseObjectSelected['id'],text:cycleArray[j].name});
                      this.breadCrumbList.push({id:null,text:phaseObject.name});
                    }
                  }
                }
              }
            }
          });
        });

    }

    getURLQueryParams() {
      let _qParams = {};

      if(this.selectedNodeId) {
        _qParams['treeId'] = this.selectedNodeId;
      }
      _qParams['pageSize'] = this.gridPageSize;
      if( this.gridCurrentPage) {
        _qParams['offset'] =  this.gridPageSize *(this.gridCurrentPage - 1);
      }
      return _qParams;
    }

    updateRouteUrl() {
      let _urlParams = this.getURLQueryParams();
      this.router.navigate(['/testcase-eas/phase/', this.phaseTreeId, _urlParams]);
    }

    setURLParams(params) {
      if(params['treeId']) {
        this.selectedNodeId = +params['treeId'];
      }

      if(params['pageSize']) {
        this.gridPageSize = +params['pageSize'];
      }

      this.gridCurrentPage = (+params.offset / +params['pageSize']) + 1;
    }


  ngAfterViewInit() {
      jQuery('.bulk-operations .unselected-star-image').hide();
      jQuery('.folder-operations .unselected-star-image').hide();
      this.resizable = new Resizable();
      this.resizable.attachResizable(jQuery('.zui-flex-h-resizable'), jQuery('.zui-w-handle'), {
          lockHeight: true,
          minWidth: jQuery('.zui-flex-h-resizable').outerWidth(),
          maxWidth: 500,
      });
      jQuery('#sync-modal').on('show.bs.modal', () => {
        this.isRemoveDeletednodestestcases = false;
      });
    }

    goBack() {
      let currentRelease = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`)).id;
      this.router.navigate(['/testcase-eas/cycle', currentRelease]);
    }

    restbulkAssignmentTestcases() {
        //resetting of the form
        jQuery('#bulk-assignment-modal').modal('hide');
        this.easMode1SelectAssignee = 'select';
        this.easMode2SelectAssignee = 'select';
        this.easMode3SelectAssigneeFrom = 'select';
        this.easMode3SelectAssigneeTo = 'select';
        this.easMode1Checkbox = false;
        this.easMode2Checkbox = false;
        this.easMode3Checkbox = false;
        this.easModeBulkAssignment = 1;
    }

    ngOnDestroy () {
      this.zephyrStore.dispatch(this._testcaseEASAction.clearGridData('phaseGrid'));
      this.paramSub.unsubscribe();
      this.unsubscribe();
    }

    onTestcaseAdd() {
        this.reDrawTree = false;
        // this.onTreeNodeClick(this.treeNodeClicked);
        this.zephyrStore.dispatch(this._testcaseEASAction.refreshAfterAdd(this.treeNodeClicked['selectedNodeId'] || this.phaseTree['id'],
        this.phaseTree['releaseId'], this.phaseTreeId, this.phaseTree['id']));
    }

    // function when tree node is clicked
    onTreeNodeClick(data) {
        // extracting id when tree node is clicked, or when grid is upadated with root node of tree(initial loading of page)

        this.selectedTctIds = [];
        this.executionTests = [];
        let releaseId = data.releaseId;
        let projectId = data.projectId;
        this.selectedNodeId = data.selectedNodeId;
        let selectedNodeId = data.selectedNodeId;
        this.treeNodeClicked = {releaseId, selectedNodeId, projectId};
        let id = selectedNodeId || this.phaseTree['id'];
        this.selectedTreeNode = id;
        this.zephyrStore.dispatch(this._testcaseEASAction.fetchTestCasesOnTreeClick({
            treeId: id,
            pageSize: this.gridPageSize,
            order: 'id',
            dbsearch: true,
            currentPage: this.gridCurrentPage,
            offset: this.gridPageSize * ( this.gridCurrentPage - 1 )
        }));


        // API call to fetch execution test cases of the clicked root node.
        this.zephyrStore.dispatch(this._testcaseEASAction.fetchExecutionsByTreeId(id));

        // API calls for here - total test cases and  assigned test cases
        if (data) {

            /** setting releaseId and treeId to be passed to child components */
            this.releaseId = releaseId;
            this.treeId = selectedNodeId;

            // API call to fetch total testcases of selecetd tree node
            this.zephyrStore.dispatch(this._testcaseEASAction.fetchTotalTestcasesbytcrCatelogIdRealeaseId(selectedNodeId, releaseId, null));

            // API call to fetch count of assigned test cases of selected tree node
            this.zephyrStore.dispatch(this._testcaseEASAction.fetchAssignedTestcasesbytreeNodeId(selectedNodeId, null));
        }

        this.updateRouteUrl();
    }

    getTreeNodes(treeData) {
      this.projectId = this.zephyrStore.getState().project.id;

      return treeData.map(level => {
        let treeData = {
          'a_attr': {
            'data-id': level.id,
            'data-releaseId': level.releaseId,
            'data-projectId': this.projectId,
            'data-type': level.type,
            'data-revision': level.revision,
            'data-name': level.name,
            'title': (level.description ? level.description : ''),
            // 'title': level.name +  ' ' + (level.description ? level.description : ''),
            'data-linkedTCRCatalogTreeId': level.linkedTCRCatalogTreeId,
            'data-parentId' : level.parentId ,
            'data-description' : level.description,
            'data-count' : level.totalTestcaseCount,
            'class': 'zee-tcr-anchor'
          },
          'text': level.name,
          'children': level.categories && level.categories.length ? this.getTreeNodes(level.categories) : []
        };
        return treeData;
      });
    }

    setTreeData(data, reDrawTree) {
      this.treeData = {
        redrawTree: reDrawTree,
        tree: this.getTreeNodes(data)
      };
      this.reDrawTree = false;
    }

    phaseGridRowClick(testcaseId) {
      this.testcaseId = testcaseId;
    }
    phaseGridRowSelection(value) {
        let rows = this.zephyrStore.getState().testcaseEAS.phaseGrid.sortedRows;
        try {
            if ((value || []).length > (this.selectedTctIds || []).length) {
                // row has been selected
                let addedRows = _.difference(value, this.selectedTctIds);
                addedRows = addedRows.map(item => rows.filter(row => Number(row.id) === Number(item))[0] || {});
                this.executionTests = _.union(this.executionTests, addedRows);
            } else {
                // row has been deselected
                let deletedRows = _.difference(this.selectedTctIds, value);
                deletedRows = deletedRows.map(item => rows.filter(row => Number(row.id) === Number(item))[0] || {});
                this.executionTests = _.differenceBy(this.executionTests, deletedRows, item => item.testcase.id);
            }
        } catch (err) {
            console.log('something went wrong', err);
        }
        this.selectedTctIds = value || [];
    }

    clearSelectedTctIds() {
      this.selectedTctIds = [];
      this.executionTests = [];
    }

    clearSelectedTctIdsPageUpdation(value) {
        this.selectedTctIds = [];
        this.executionTests = [];

        // udating the complete page (testcases , executions, here count testcases and here count assigned testcases)
        this.onTreeNodeClick(this.treeNodeClicked);

        //API call to get total assigned test cases
        //call to fetch total assigned test cases for this particular phase(root tree node)
        this.zephyrStore.dispatch(this._testcaseEASAction.fetchAssignedTestcasesbytreeNodeId(this.phaseTree['id'] , this.phaseTreeId));
        //API call to fetch count of all test cases of root tree node
        this.zephyrStore.dispatch(this._testcaseEASAction.fetchTotalTestcasesbytcrCatelogIdRealeaseId(
           this.phaseTree['id'] , this.phaseTree['releaseId'] , this.phaseTreeId
        ));
    }

    //function to make API call for assignemnt of single testcase
    phaseGridAssignSelectChange(data) {
        let executionId = data.row.testcase.executionId,
            cyclePhaseId = this.phaseTreeId,
            assignedId = data.event;

      let dataObject = {};
      if (executionId) {
        if (assignedId == '0') {
          dataObject['unassignedRtsIds'] = [executionId];
        } else {
          dataObject['updateRTSList'] = [{
              rtsId: executionId,
              testerId: Number(assignedId),
              cyclePhaseId: cyclePhaseId
          }];
        }
      } else {
        dataObject['createRTSList'] = [{
            tctId: data.row.id,
            testerId: Number(assignedId),
            cyclePhaseId: cyclePhaseId
        }];
      }
      this.zephyrStore.dispatch(this._testcaseEASAction.modifyExecution(dataObject));
    }

    //function to make API call for bulk assignemnt of selected testcases
    bulkAssignmentSelectChange(value) {
      let valueSelect = value.id;
      let cyclePhaseId = this.phaseTreeId;
      let testcaseAssignmentObject = {};
      if (valueSelect == '0') {
        testcaseAssignmentObject['unassignedRtsIds'] = [];
      } else {
        testcaseAssignmentObject['updateRTSList'] = [];
        testcaseAssignmentObject['createRTSList'] = [];
      }
      this.executionTests.forEach(item => {
        let executionId = (item.testcase || {}).executionId;
        if (executionId) {
            if (valueSelect == '0') {
                testcaseAssignmentObject['unassignedRtsIds'].push(executionId);
           } else {
              testcaseAssignmentObject['updateRTSList'].push({
                  rtsId: executionId,
                  testerId: Number(valueSelect),
                  cyclePhaseId: cyclePhaseId
              });
            }
         } else {
            if (!(valueSelect == '0')) {
                testcaseAssignmentObject['createRTSList'].push({
                    tctId: item.id,
                    testerId: Number(valueSelect),
                    cyclePhaseId: cyclePhaseId
                });
            }
         }
      });

      jQuery('#bulk-assignment-select').val('').trigger('change');
      this.zephyrStore.dispatch(this._testcaseEASAction.modifyExecution(testcaseAssignmentObject));
      //display bulk edit warning
      if(this.selectedTctIds && this.selectedTctIds.length > 1){
        jQuery('#bulk-operation-warning-modal').modal();
      }
    }

    //function for bulk delete of selected testcases
    bulkDeleteTestcases($event) {
      if (this.selectedTctIds.length > 0) {
        this.confirmationObject['heading'] = 'Confirmation Delete';
        this.confirmationObject['text'] = 'Are you sure you want to delete ' + this.selectedTctIds.length
                        + (this.selectedTctIds.length === 1 ? ' testcase' : ' testcases') + " ?";
        this.confirmationObject['buttonText'] = 'Delete';
        this.confirmationObject['showCancelButton'] = true;
        this.confirmationObject['action'] = DELETE;
        jQuery('#confirmation-modal').modal();
      }
    }

    delteTestcasesAPIcall () {
      this.zephyrStore.dispatch(this._testcaseEASAction.deleteTestcasesbyCyclePhaseId(this.phaseTreeId , this.selectedTctIds));
    }

    //function for bulk staring of selected testcases
    bulkStarTestcases($event) {
      if (this.selectedTctIds.length > 0) {
        this.confirmationObject['heading'] = 'Confirmation Update Flag';
        this.confirmationObject['text'] = 'Are you sure you want to set the flag on ' + this.selectedTctIds.length
                        + (this.selectedTctIds.length === 1 ? ' testcase' : ' testcases');
        this.confirmationObject['buttonText'] = 'Continue';
        this.confirmationObject['showCancelButton'] = true;
        this.confirmationObject['action'] = STAR_FLAG;
        jQuery('#confirmation-modal').modal();
      }
    }

    //function for bulk unstaring of selected testcases
    bulkUnstarTestcases($event) {
      if (this.selectedTctIds.length > 0) {
        this.confirmationObject['heading'] = 'Confirmation Update Flag';
        this.confirmationObject['text'] = 'Are you sure you want to reset the flag on ' + this.selectedTctIds.length
                        + (this.selectedTctIds.length === 1 ? ' testcase' : ' testcases');
        this.confirmationObject['buttonText'] = 'Continue';
        this.confirmationObject['showCancelButton'] = true;
        this.confirmationObject['action'] = UNSTAR_FLAG;
        jQuery('#confirmation-modal').modal();
      }
    }

    updateFlagAPIcall (flagValue) {
      if (flagValue) {
        jQuery('.bulk-operations .selected-star-image').hide();
        jQuery('.bulk-operations .unselected-star-image').show();
      } else {
        jQuery('.bulk-operations .selected-star-image').show();
        jQuery('.bulk-operations .unselected-star-image').hide();
      }
      this.zephyrStore.dispatch(this._testcaseEASAction.updateTestcasesFlag(flagValue , this.selectedTctIds));
    }

    confirmationActionCall($event) {
      let actionString = $event.target.value;
      if (actionString === DELETE) {
        this.delteTestcasesAPIcall();
      } else if (actionString === STAR_FLAG) {
        this.updateFlagAPIcall(true);
      } else if (actionString === UNSTAR_FLAG) {
        this.updateFlagAPIcall(false);
      } else if (actionString === STAR_FLAG_BY_FOLDER) {
        this.bulkFolderUpdateflagApicall(true);
      } else if (actionString === UNSTAR_FLAG_BY_FOLDER) {
        this.bulkFolderUpdateflagApicall(false);
      } else if (actionString === SYNC) {
        this.syncAPIcall();
      } else if (actionString === SHOW_BULK_ASSIGNMENT_MODAL) {
        jQuery('#confirmation-modal').modal('hide');
        jQuery('#bulk-assignment-modal').modal();
      } else if (actionString === NO_ACTION) {
        jQuery('#confirmation-modal').modal('hide');
      }
    }

    //function to sync testcaases
    syncNodesTestases () {
        this.confirmationObject['heading'] = 'Warning!';
        this.confirmationObject['text'] = 'Removing the deleted nodes/testcases from this schedule '
          +'will delete all execution data associated with it (Status, Comments, Attachments, Notes,'
          +' etc.) and reset the Metrics. This is potentially dangerous as once deleted, this data '
          +'cannot be recovered. Do you wish to continue?';
        this.confirmationObject['buttonText'] = 'Continue';
        this.confirmationObject['showCancelButton'] = true;
        this.confirmationObject['action'] = SYNC;
        jQuery('#confirmation-modal').modal();
    }

    //function to bulk assign testcases -- bulk assignemnt modal
    bulkAssignmentTestcases () {
        let keyobjets = {
            cyclephaseid: this.phaseTreeId,
            treeid: this.treeId || this.phaseTree['id']
        };

        if (this.easModeBulkAssignment === 3) {
            keyobjets['fromid'] = this.easMode3SelectAssigneeFrom;
            keyobjets['toid'] = this.easMode3SelectAssigneeTo;
        } else {
            let selectAssigneeKeyName = 'easMode' + this.easModeBulkAssignment + 'SelectAssignee';
            keyobjets['fromid'] = -1;
            keyobjets['toid'] = this[selectAssigneeKeyName];
        }
        if ((this.easModeBulkAssignment === 3 && isNaN(keyobjets['fromid'])) || isNaN(keyobjets['toid'])) {
            jQuery('#confirmation-modal').modal();
            this.confirmationObject['heading'] = 'Opps!';
            this.confirmationObject['text'] = 'Please select a tester';
            this.confirmationObject['buttonText'] = 'Ok';
            this.confirmationObject['showCancelButton'] = false;
            this.confirmationObject['action'] = SHOW_BULK_ASSIGNMENT_MODAL;
        } else if (this.easModeBulkAssignment === 3 && keyobjets['fromid'] == keyobjets['toid']) {
            jQuery('#confirmation-modal').modal();
            this.confirmationObject['heading'] = 'Opps!';
            this.confirmationObject['text'] = 'Testcases cannot be assigned to same user. Please change the user and try again.';
            this.confirmationObject['buttonText'] = 'Ok';
            this.confirmationObject['showCancelButton'] = false;
            this.confirmationObject['action'] = SHOW_BULK_ASSIGNMENT_MODAL;
        } else {
            let cascaseKeyName = 'easMode' + this.easModeBulkAssignment + 'Checkbox';
            keyobjets['cascade'] = this[cascaseKeyName];
            keyobjets['easmode'] = this.easModeBulkAssignment;
            this.restbulkAssignmentTestcases();
            this.zephyrStore.dispatch(this._testcaseEASAction.bullkAssignmentTestcases(keyobjets, true));
        }
      //display bulk edit warning
        if(this.phaseTree.totalTestcaseCount > 1){
          jQuery('#bulk-operation-warning-modal').modal();
        }

    }

    bulkAssignemntRadioChange(value) {
      this.easModeBulkAssignment = parseInt(value);
      if (this.easModeBulkAssignment === 1) {
        this.easMode2Checkbox = false;
        this.easMode3Checkbox = false;
      } else if (this.easModeBulkAssignment === 2) {
        this.easMode1Checkbox = false;
        this.easMode3Checkbox = false;
      } else if (this.easModeBulkAssignment === 3) {
        this.easMode1Checkbox = false;
        this.easMode2Checkbox = false;
      }
    }

    //function for bulk unstaring of folder
    bulkFolderStarTestcases($event) {
      if (this.treeNodeClicked) {
        this.confirmationObject['heading'] = 'Confirmation Update Flag';
        this.confirmationObject['text'] = 'This will set the flags on all testcases in the selected folder'
                            + '(including its sub folders). This cannot be rolled back. Do you wish to continue?';
        this.confirmationObject['buttonText'] = 'Continue';
        this.confirmationObject['showCancelButton'] = true;
        this.confirmationObject['action'] = STAR_FLAG_BY_FOLDER;
      } else {
        this.confirmationObject['heading'] = 'Opps!';
        this.confirmationObject['text'] = 'Please select a tree node. Then attempt this operation';
        this.confirmationObject['buttonText'] = 'Ok';
        this.confirmationObject['showCancelButton'] = false;
        this.confirmationObject['action'] = NO_ACTION;
      }
    }

    //function for bulk unstaring of folder
    bulkFolderUnstarTestcases($event) {
      if (this.treeNodeClicked) {
        this.confirmationObject['heading'] = 'Confirmation Update Flag';
        this.confirmationObject['text'] = 'This will reset the flags on all testcases in the selected folder'
                            + '(including its sub folders). This cannot be rolled back. Do you wish to continue?';
        this.confirmationObject['buttonText'] = 'Continue';
        this.confirmationObject['showCancelButton'] = true;
        this.confirmationObject['action'] = UNSTAR_FLAG_BY_FOLDER;
      } else {
        this.confirmationObject['heading'] = 'Opps!';
        this.confirmationObject['text'] = 'Please select a tree node. Then attempt this operation';
        this.confirmationObject['buttonText'] = 'Ok';
        this.confirmationObject['showCancelButton'] = false;
        this.confirmationObject['action'] = NO_ACTION;
      }
    }

    bulkFolderUpdateflagApicall(flagValue) {
      this.zephyrStore.dispatch(this._testcaseEASAction.updateAllTestcasesFlagByTreeId(flagValue , this.treeId || this.phaseTree['id']));
       if (flagValue) {
         jQuery('.folder-operations .selected-star-image').hide();
         jQuery('.folder-operations .unselected-star-image').show();
      } else {
        jQuery('.folder-operations .selected-star-image').show();
        jQuery('.folder-operations .unselected-star-image').hide();
      }
    }

    //context menu functions
    easContextMenuItems(node) {
      if(!node) {return;}
      var items =  {};
      if (easPhaseSelf.isFreeForm) {
        //add, delete
        items =  {
              add: { // The 'add' menu item
                  label: 'Add',
                  nodeData : JSON.stringify(node.a_attr),
                  action: easPhaseSelf.showTcrModal.bind(easPhaseSelf, 'add'),
                  'separator_after': true
              },
              edit: { // The 'edit' menu item
                  label: 'Edit',
                  nodeData : JSON.stringify(node.a_attr),
                  action: easPhaseSelf.showTcrModal.bind(easPhaseSelf, 'edit')
              }
          };

        //Delete functionality is not provided for root node, check of presence of parent-id is used.
        if (node.a_attr['data-parentId'] || node.parents[0] != "#") {
          items['delete'] =  { // The 'export' menu item
                      label: 'Delete',
                      nodeData : JSON.stringify(node.a_attr),
                      action: easPhaseSelf.showTcrModal.bind(easPhaseSelf, 'delete')
                  };
          }
      }

      //export to added for all phase types.
      items['export'] =  { // The 'export' menu item
                  label: 'Export',
                  action: easPhaseSelf.showTcrModal.bind(easPhaseSelf, 'export')
              } ;

      return items;
    }
    showTcrModal(action, node) {
        if(this.cmpRef) {
          this.cmpRef.destroy();
        }
        if(action === 'add') {
          let componentFactory = this.resolver.resolveComponentFactory(EasFreeformAddComponent);
          this.cmpRef = this.target.createComponent(componentFactory);
          this.cmpRef.instance.functionCalling(node , this);
          //jQuery('#easAddNodeModal').modal();

         } else if(action === 'edit') {
          let componentFactory = this.resolver.resolveComponentFactory(EasFreeformEditComponent);
          this.cmpRef = this.target.createComponent(componentFactory);
          this.cmpRef.instance.functionCalling(node , this);
          //jQuery('#easEditNodeModal').modal();
        } else if(action === 'delete') {
            let componentFactory = this.resolver.resolveComponentFactory(EasFreeformDeleteComponent);
            this.cmpRef = this.target.createComponent(componentFactory);
            this.cmpRef.instance.functionCalling(node , this);
            //jQuery('#easDeleteNodeModal').modal();
        } else if(action === 'export') {
            let factory = this.resolver.resolveComponentFactory(EasPhaseExportComponent);
            this.cmpRef = this.target.createComponent(factory);
            this.cmpRef.instance.phaseTreeId = this.phaseTreeId;
            this.cmpRef.instance.setFieldsOptions(node, this.releaseId);
        }

    }

    //function to update counts
    updateAllcounts (state) {
      //updating total test cases count
      this.totalAssignedTestcases = (state.testcaseEAS.phaseMap[this.phaseTreeId]
          && state.testcaseEAS.phaseMap[this.phaseTreeId]['assignedTestcaseCount']) || 0 ;
      this.totalTestcases = (state.testcaseEAS.phaseMap[this.phaseTreeId]
          && state.testcaseEAS.phaseMap[this.phaseTreeId]['totalTestcaseCount']) || 0;

      //updating here test cases count
      this.hereTotalTestcasesCount = state.testcaseEAS.hereTotalTestcasesCount;
      this.hereAssignedTestcasesCount = state.testcaseEAS.hereAssignedTestcasesCount;
    }

    //This function is called, whenever breadcumb is clicked
    onBreadCrumbClick ($event) {
       let routerLink = $event.target.dataset.nodeid;
       if (routerLink) {
         this.router.navigateByUrl(routerLink);
       }
     }

     //This function is called when buk-assignment-initial-modal value changes (to whom to assign all testcases)
     bulkAssignmentInitialChange (value) {
       this.initialBulkAssignmentValue = value;
     }

     submitBulkAssignmentInitialChange () {
       let value = this.initialBulkAssignmentValue;
       if (value === 1) {
          this.zephyrStore.dispatch(this._testcaseEASAction.defaultAssignementToCreatorTestcase(this.phaseTreeId));
       } else if (value === 2) {
          let keyobjets = {};
            keyobjets['cyclephaseid'] = this.phaseTreeId;
            keyobjets['treeid'] = this.treeId || this.phaseTree['id'];
            keyobjets['fromid'] = -1;
            keyobjets['toid'] = -10;
            keyobjets['cascade'] = true;
            keyobjets['easmode'] = '2';
          this.zephyrStore.dispatch(this._testcaseEASAction.bullkAssignmentTestcases(keyobjets , false));
       }
       jQuery('#bulk-assignment-initial-modal').modal('hide');
       //display bulk edit warning
       if(this.phaseTree.totalTestcaseCount > 1){
         jQuery('#bulk-operation-warning-modal').modal();
       }
     }

     bulkFolderAssignment ($event) {
       if (this.treeNodeClicked) {
          jQuery('#bulk-assignment-modal').modal();
       } else {
         jQuery('#confirmation-modal').modal();
         this.confirmationObject['heading'] = 'Opps!';
         this.confirmationObject['text'] = 'Please select a tree node. Then attempt this operation';
         this.confirmationObject['buttonText'] = 'Ok';
         this.confirmationObject['showCancelButton'] = false;
         this.confirmationObject['action'] = NO_ACTION;
       }
     }

     syncAPIcall () {
       this.zephyrStore.dispatch(this._testcaseEASAction.syncByCyclephaseidAndTreeid(
       this.phaseTreeId , this.phaseTree['id'] , this.isRemoveDeletednodestestcases));
     }

     mapSyncObjectMessages (syncData) {
       let arrayToBeReturned = [];
       let syncObject = syncData.TCRCatalogTree,
           actionString = syncObject.action,
           noOfTestcasesAdded = syncObject['testcases_added_cumulative'],
           noOfTestcasesDeleted = syncObject['testcases_deleted_cumulative'],
           noOfTestcasesIgnored = syncObject['testcases_ignored_cumulative'],
           isFreeform = false; //Todo - how to calculate
       if (actionString.indexOf('modified') > -1) {
         if (noOfTestcasesAdded > 0 || noOfTestcasesDeleted > 0) {
           if (noOfTestcasesAdded > 0) {
              if (isFreeform) {
                arrayToBeReturned.push(noOfTestcasesAdded + ' testcase(s)/schedule(s) added to this phase.');
                arrayToBeReturned.push(noOfTestcasesIgnored + ' testcase(s)/schedule(s) ignored.');
              } else {
                arrayToBeReturned.push(noOfTestcasesAdded + ' testcase(s) added to this phase.');
                arrayToBeReturned.push(noOfTestcasesDeleted + ' testcase(s) deleted from this phase.');
              }
           }
           if (noOfTestcasesDeleted > 0) {
              arrayToBeReturned.push(noOfTestcasesDeleted + ' testcase(s) deleted from this phase.');
           }
         } else if (noOfTestcasesAdded === 0) {
           if (isFreeform) {
             arrayToBeReturned.push('No testcases/schedules added.');
             arrayToBeReturned.push(noOfTestcasesIgnored + ' testcase(s)/schedule(s) ignored.');
           } else {
             arrayToBeReturned.push('No testcases deleted or added.');
             arrayToBeReturned.push('Duplicates might appear if original nodes/testcases moved.');
           }
         }
       } else {
         if (isFreeform) {
            arrayToBeReturned.push('No testcases/schedules added.');
         } else {
           arrayToBeReturned.push('No testcases deleted or added.');
           arrayToBeReturned.push('Duplicates might appear if original nodes/testcases moved.');
         }
       }
       this.syncMessagesArray = arrayToBeReturned;
       this.recursiveSyncMessagesDisplay(syncObject);
     }

     recursiveSyncMessagesDisplay(syncObject) {
       let keyToBeReffered = 'sourceName';
       if (syncObject['action'].indexOf('add') > -1) {
         this.syncMessagesArray.push('Node "' + syncObject['sourceName'] + '" added.');
       } else if (syncObject['action'].indexOf('del') > -1) {
         this.syncMessagesArray.push('Node "' + syncObject['frozenName'] + '" removed.');
         keyToBeReffered = 'frozenName';
       }
       if (syncObject['testcases_added_cumulative'] > 0 || syncObject['testcases_deleted_cumulative'] > 0) {
         if (syncObject['testcases_added'] > 0) {
           this.syncMessagesArray.push(syncObject['testcases_added'] + ' testacase(s) added to "' + syncObject[keyToBeReffered] + '".');
         }
         if (syncObject['testcases_deleted'] > 0) {
           this.syncMessagesArray.push(syncObject['testcases_deleted']+' testacase(s) deleted from "'+syncObject[keyToBeReffered]+'".');
         }
         if (syncObject['TCRCatalogTree']) {
           if (syncObject['TCRCatalogTree'].constructor === Object) {
             this.recursiveSyncMessagesDisplay(syncObject['TCRCatalogTree']);
           } else if (syncObject['TCRCatalogTree'].constructor === Array) {
             for(let i=0;i<syncObject['TCRCatalogTree'].length; i++) {
               this.recursiveSyncMessagesDisplay(syncObject['TCRCatalogTree'][i]);
             }
           }
         }
       }
     }

     fetchUsersAllocatedToCurrentProject() {
       let currentProject = localStorage.getItem(`${window.tab}-currentProject`) ? JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)) : {};
       if(currentProject && currentProject['id']) {
         this.usersFetched = true;
         this.zephyrStore.dispatch(this._teamAction.fetchTeamDetailsByProjectId(currentProject['id']));
       }
     }

     //Re-adjusting users array to fit the inline_edit.component iterations for select options
     filteringUsersArray (state) {
       this.users = [];
       this.usersWithoutUnassigned = [];
       let teamDet = state.team.teamDetails;
       if(teamDet && teamDet.length) {
         for (let i=0; i<teamDet.length; i++) {
           if (teamDet[i]['accountEnabled']) {
             let userObject  = {};
             userObject['id'] = teamDet[i]['id'] ;
             userObject['value'] = teamDet[i]['firstName'] + ' ' + teamDet[i]['lastName'];
             userObject['text'] = teamDet[i]['firstName'] + ' ' + teamDet[i]['lastName'];
             this.users.push(userObject);
             this.usersWithoutUnassigned.push(userObject);
          }
         }
         let anyoneUserObject = {};
         anyoneUserObject['value'] = 'Anyone';
         anyoneUserObject['text'] = 'Anyone';
         anyoneUserObject['id'] = -10;
         this.users.push(anyoneUserObject);
         this.usersWithoutUnassigned.push(anyoneUserObject);
         this.usersWithoutUnassigned = _.sortBy(this.usersWithoutUnassigned, (user) => {
           return user.value.toLowerCase();
         });
         let unassignedUserObject = {};
         unassignedUserObject['value'] = 'Unassigned';
         unassignedUserObject['text'] = 'Unassigned';
         unassignedUserObject['id'] = 0;
         this.users.push(unassignedUserObject);
         this.users = _.sortBy(this.users, (user) => {
           return user.value.toLowerCase();
         });
       }
     }
     setLeftNavData(state) {
         if(state.project.id) {
             this.navColumns.header.title = state.project.name;
             this.navColumns.header.subtitle = state.project.description;
             this.navColumns.header.link = `/project/${state.project.id}`;
             this.navColumns.header.isSelected = false;
             _.filter(this.navColumns.group.items, (item) => {
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
     // syncModalClicked () {
     //   if (this.treeNodeClicked) {
     //      jQuery('#sync-modal').modal();
     //   } else {
     //     jQuery('#confirmation-modal').modal();
     //     this.confirmationObject['heading'] = 'Opps!';
     //     this.confirmationObject['text'] = 'Please select a tree node. Then attempt this operation';
     //     this.confirmationObject['buttonText'] = 'Ok';
     //     this.confirmationObject['showCancelButton'] = false;
     //     this.confirmationObject['action'] = NO_ACTION;
     //   }
     // }
    phaseGridPageChange(page) {
        let offset = this.gridPageSize * (page - 1);
        this.gridCurrentPage = page;
        let id = this.treeNodeClicked['selectedNodeId'] || this.phaseTree['id'];
        this.zephyrStore.dispatch(this._testcaseEASAction.fetchTestCasesOnTreeClick({
          treeId: id,
          pageSize: this.gridPageSize,
          order: 'id',
          dbsearch: true,
          offset: offset,
          currentPage: page
        }));
        this.updateRouteUrl();
    }
    phaseGridPageSizeChange(value) {
        let offset = 0;
        this.gridCurrentPage = 1;
        this.gridPageSize = Number(value);
        this.clearSelectedTctIds();
        this.zephyrStore.dispatch(this._testcaseEASAction.clearGridData('phaseGrid'));
        let id = this.treeNodeClicked['selectedNodeId'] || this.phaseTree['id'];
        this.zephyrStore.dispatch(this._testcaseEASAction.fetchTestCasesOnTreeClick({
          treeId: id,
          pageSize: this.gridPageSize,
          order: 'id',
          dbsearch: true,
          offset: offset
        }));
        this.updateRouteUrl();
    }

    dismisWarningModal(show){

      // this.performBulkAssignment = show ? true : false;
      jQuery('#bulk-operation-warning-modal').modal('hide');

    }

}
