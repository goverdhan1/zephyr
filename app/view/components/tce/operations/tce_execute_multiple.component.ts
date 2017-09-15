import {Component, NgZone, Input, OnChanges, SimpleChanges, AfterViewInit, OnDestroy, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Moment } from 'moment';

import {ZephyrStore} from '../../../../store/zephyr.store';
import {NotificationStore} from '../../../../store/notification.store';

import {TestcaseExecutionAction} from '../../../../actions/testcaseExecution.action';
import {NotificationAction} from '../../../../actions/notification.action';

// Constants
import { TCE_ZBOT_GRID_TYPE, TCE_ZBOT_GRID_OPTIONS, TCE_ZBOT_GRID_PAGINATION } from '../tce_grid.constant';
import { TESTCASE_EXECUTE_MULTIPLE_DIALOG_TCE } from '../../testcase/testcase.constant';
import { NOTIFICATION_APP_CONSTANTS, NOTIFICATION_STATE_CONSTANTS, NOTIFICATION_ENTITY_CONSTANTS } from '../../../../utils/constants/notification.constants';
import { TCE_EXECUTION_ZBOT } from '../../../../utils/constants/tce_execution.constants';
import { APPLY_NOTIFICATION } from '../../../../utils/constants/action.events';
import { ToastrService } from '../../../../services/toastr.service';

import { checkIfAutoApplyRequired, constructNotificationStoreMetadata } from '../../../../utils/notification/notification.util';

declare var $, moment: any, _: any;

@Component({
	selector: TESTCASE_EXECUTE_MULTIPLE_DIALOG_TCE,
    templateUrl: 'tce_execute_multiple.html'
})

export class TceExecuteMultipleComponent implements OnChanges, AfterViewInit, OnDestroy {
    zephyrStore;
    notificationStore;
    @Input() releaseId;
    @Input() testcaseIds;
    @Input() tceGridRows;
    @Input() tcrCatalogTreeName;
    @Input() tcrCatalogTreeId;
    @Input() executionIds;
    @Input() statuses;
    allPathsAvailable = [];
    tceZbotGridRows = [];
    zbot:any = {
        'parameter': '',
        'execution': true,
        'parallelScripts': false,
        'status': '3'
    };
    hostsAndIps = [];
    agents = [];
    agentToken;
    testcaseExecutionList = [];
    currentLoggedInUserId;
    currentTimeStamp;
    currentTimeStampFormatted;
    executeFlag = false;
    batchStatus;
    isZbotEnabled = true;
    agentMap = {};
    prevBatchId;
    _agentAppTriggerState = NOTIFICATION_STATE_CONSTANTS.WAITING;
    notificationUnsubscribe;
    appId = NOTIFICATION_APP_CONSTANTS.AGENTS_APP.name;
    _tceZbotGridType = TCE_ZBOT_GRID_TYPE;

    constructor(private _testcaseExecutionAction: TestcaseExecutionAction, private notificationAction:NotificationAction, private zone:NgZone, @Inject(ToastrService) private toastrService:ToastrService) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.notificationStore = NotificationStore.getNotificationStore();
        let state = this.zephyrStore.getState();
        this.currentLoggedInUserId = state.loggedInUser.id;

        this.zephyrStore.subscribe(() => {
            this.getHostsAndIps(state.tce.agents);
            this.refreshAgentMap(state.tce.agents);
            if(state.tce.batch && state.tce.batch.id && state.tce.event === 'UPDATED_BATCH') {
                this.zephyrStore.dispatch(this._testcaseExecutionAction.clearEventExecution('UPDATED_BATCH'));
                this.filterAndDisplayZBotStatus(state.tce.batch);
            }

            if (state.tce.event === 'SORT_TCE_ZBOT_GRID') {
              this.tceZbotGridRows = state.tce.tceZbotGrid.rows;
              this.zephyrStore.dismissModal(this._testcaseExecutionAction._clearTCEEvent());
            }
        });

        this.notificationUnsubscribe = this.notificationStore.subscribe(() => {
            let notification = this.notificationStore.getState().notification;
            let appData = notification && notification.ui_details[NOTIFICATION_APP_CONSTANTS.AGENTS_APP.name];
            if(appData && appData.event == APPLY_NOTIFICATION && this._agentAppTriggerState == NOTIFICATION_STATE_CONSTANTS.WAITING) {
                this._agentAppTriggerState = NOTIFICATION_STATE_CONSTANTS.APPLY_IN_PROGRESS;
                let waitTime = checkIfAutoApplyRequired(NOTIFICATION_APP_CONSTANTS.AGENTS_APP.name, notification);
                this._agentAppTriggerState = NOTIFICATION_STATE_CONSTANTS.WAITING;
                this.handleAgentUpdates(appData.notification_messages);
                this.notificationStore.dispatch(this.notificationAction.applyNotification(NOTIFICATION_APP_CONSTANTS.AGENTS_APP.name,true));
            }
        });
    }

    ngAfterViewInit() {
        let curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.AGENT, '', '', '');
        this.notificationStore.dispatch(this.notificationAction.subscribeToTopic(curMetadata, '', this.appId));
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes['testcaseIds']) {

          let selectedTestcases = changes['testcaseIds'].currentValue;

          let allAutomated = false;

          if (selectedTestcases.length) {

            let selectedTestCasesRow = this.tceGridRows.filter(row => selectedTestcases.indexOf(row.testcase.id) !== -1);
            let automatedSelectedTestCases = selectedTestCasesRow.filter(row => row.testcase.automated);

            allAutomated = selectedTestCasesRow.length > 0 && automatedSelectedTestCases.length > 0;
          } else {
            allAutomated = false;
          }

          this.isZbotEnabled = !allAutomated;
        }
    }

    getAutomatedRows() {
        if(this.tceGridRows && this.tceGridRows) {
            this.tceZbotGridRows = _.cloneDeep(this.tceGridRows).filter(row => this.testcaseIds.indexOf(row.testcase.id) > -1 && row.testcase.automated);
        }

        // add indices for order
        this.tceZbotGridRows.forEach((row, i) => {
            row.testcase['orderId'] = i + 1;
        });

        this.allPathsAvailable = this.tceZbotGridRows.filter(tce => {
            if (!tce.testcase.scriptPath || tce.testcase.scriptPath.trim().length === 0) {
                return tce.testcase.id;
            }
        });

        this.zephyrStore.dispatch(this._testcaseExecutionAction.setTCERows(this.tceZbotGridRows));
    }

    getAgentData() {
        this.zephyrStore.dispatch(this._testcaseExecutionAction.fetchAgents());
    }

    setCurrentTime() {
        this.currentTimeStamp = moment.now();
        this.currentTimeStampFormatted = moment().format('MMMM Do YYYY, h:mm:ss a');
    }

    executeMultiple() {
        // $('#zbot-execution').prop('checked', false);
        $('#zbot-parallelscripts').prop('checked', false);
        $('#zbot-parameter').val('');
        this.getAutomatedRows();
        this.getAgentData();
        this.setCurrentTime();
        $('#execute-multiple-modal').modal('show');
        this.tceZbotGridRows = JSON.parse(JSON.stringify(this.tceZbotGridRows));
        $('#zbot-execution').prop('checked', true);
        this.zbot.parallelScripts = false;

        setTimeout(() => {
          $('#zbot-agent').val($('#zbot-agent option:first').val());
          this.setCurrentAgentToken($('#zbot-agent option:first').val());
          $('.rt-status').empty();
        }, 10);
    }

    cancelZbotForm() {
        $('#execute-multiple-modal').modal('hide');
        $('.rt-status').empty();
        this.executeFlag = false;
    }

    closeZbotValidationModal() {
        $('#zbot-confirm-modal').modal('hide');
    }

    dismissModal() {
        this.cancelZbotForm();
    }

    createTestcaseExecutionList() {
//        console.log('tceZbotGridRows', this.tceZbotGridRows);
        this.testcaseExecutionList = this.tceZbotGridRows.map(row => ({
            tcId: row.testcase.id,
            name: row.testcase.scriptName,
            scriptId: row.testcase.scriptId,
            scriptPath: row.testcase.scriptPath,
            releaseTestScheduleId: (row.executionId).toString(),
            status: row.testcase.status
        }));
    }

    setStatus(value) {
        this.zbot.status = value;
    }

    handleAgentUpdates(notificationMsgs) {
        notificationMsgs.forEach(message => {
          try {
            message = JSON.parse(message);
          } catch (err) {
            // console.log('message is already parsed');
          }

          if(message.entityName == NOTIFICATION_ENTITY_CONSTANTS.AGENT){
            let agent;
            if(message && message.action && message.action == 'ADD'){
              // fetch agent for token message.entityId
               this.getAgentData();
            } else if(message && message.action && message.action == 'UPDATE'){
              agent = this.agentMap[message.entityId];
              if(agent){
                if(message.data['AGENT_STATUS']){
                  agent.status = message.data['AGENT_STATUS'] as Number;
                }
                if(message.data['REALTIME_STATUS']){
                  agent.realtimeStatus = message.data['REALTIME_STATUS'] as String;
                }
                // update the store with the updated agent info
                this.zephyrStore.dispatch(this._testcaseExecutionAction._updateAgents(this.agents));
              } else {
                // fetch agent for token message.entityId
                this.getAgentData();
              }
            } else if(message && message.action && message.action == 'DELETE'){
              agent = this.agentMap[message.entityId];
              if(agent){
                //remove agent from store
                this.zephyrStore.dispatch(this._testcaseExecutionAction._deleteAgents());
              }
            }
          } else if(message.entityName == NOTIFICATION_ENTITY_CONSTANTS.TESTCASEBATCHEXECUTION) {
            if(message && message.action && message.action == 'ADD'){

            } else if(message && message.action && message.action == 'UPDATE'){
                // fetch batch execution for message.topicEntityId and then use that status
                this.zephyrStore.dispatch(this._testcaseExecutionAction.getBatch(message.topicEntityId));
            } else if(message && message.action && message.action == 'DELETE'){

            }
          }
        });
    }

    handleBatchNotificationSubscription(batchId) {
        if(batchId) {
          let curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTCASEBATCHEXECUTION, batchId, '', '');
          let prevMetadata;
          if(this.prevBatchId) {
            prevMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTCASEBATCHEXECUTION, this.prevBatchId, '', '');
          }
          this.prevBatchId = batchId;
          this.notificationStore.dispatch(this.notificationAction.subscribeToTopic(curMetadata, prevMetadata, this.appId));
        }
    }

    ngOnDestroy() {
        let curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.AGENT, '', '', '');
        this.notificationStore.dispatch(this.notificationAction.unSubscribeFromTopic(curMetadata, this.appId));
        if(this.prevBatchId) {
            curMetadata = constructNotificationStoreMetadata(NOTIFICATION_ENTITY_CONSTANTS.TESTCASEBATCHEXECUTION, this.prevBatchId, '', '');
            this.notificationStore.dispatch(this.notificationAction.unSubscribeFromTopic(curMetadata, this.appId));
        }
        this.notificationUnsubscribe();
    }

    refreshAgentMap(agents) {
        this.agentMap = {};
        agents.forEach(agent => {
            this.agentMap[agent.token] = agent;
        });
    }

    getHostsAndIps(agents) {
        this.agents = agents;
        this.hostsAndIps = agents.map(agent => agent.agentHostAndIp);
        this.setAgentToken(agents);
    }

    setAgentToken(agents) {
        if(Array.isArray(agents) && agents.length) {
            let hostName = $('select[name*="zbot-agent"] option:selected').text();
            let agent = hostName && hostName.length ? (agents.filter(agent => agent.agentHostAndIp === hostName)[0] || {}) : agents[0];

            this.agentToken = agent.token;
        }
    }

    setCurrentAgentToken(hostName) {
        this.agentToken = (this.agents.filter(agent => agent.agentHostAndIp === hostName)[0] || {}).token;
        this.executeFlag = false;
    }

    onZbotFormSubmit(formValues) {
        // if (this.allPathsAvailable.length) {
        //
        //   let ids = _.map(this.allPathsAvailable, 'testcase.id');
        //
        //   this.toastrService.info(`Testcase(s) with id ${ids.join(',')} don't have script paths.`, {
        //     'showDuration': '3000',
        //     'hideDuration': '1000',
        //     'timeOut': '5000'
        //   });
        // }

        this.createTestcaseExecutionList();
        $('.rt-status').empty();
        $('#zbotRealTimeStatus').append('<label>Executing...</label>');

        if (!this.agentToken) {
          $('#zbot-confirm-modal').modal('show');
          return;
        }

        let batchObj = {
          'id': this.currentTimeStamp,
          'createDate': this.currentTimeStamp,
          'userId': this.currentLoggedInUserId,
          'agentToken': this.agentToken,
          'testcaseExecutionList': this.testcaseExecutionList,
          'updateTestcaseStatus': parseInt(this.zbot.status),
          'parallelExecution': $('#zbot-parallelscripts').prop('checked'),
          'status': 1,
          'zbotParameter': ''
        };

        if ($('#zbot-parameter').val().length) {
          let params = $('#zbot-parameter').val();

          if (formValues.parameter && formValues.parameter.length) {
            let params = formValues.parameter;

            let cycles = this.zephyrStore.getState().testcaseEAS.cycles;
            let cyclePhasesArr = cycles.map(item => item.cyclePhases);
            let currentCyclePhaseId = this.tceZbotGridRows[0].cyclePhaseId;
            let cyclePhases = [].concat.apply([], cyclePhasesArr);
            let cyclePhase = _.find(cyclePhases, {id: currentCyclePhaseId});

            let cycle = _.find(cycles, {id: cyclePhase.cycleId});

            params = params.replace(new RegExp('@@uid@@', 'g'), ` zephyrUserId=${this.currentLoggedInUserId}`);
            params = params.replace(new RegExp('@@rid@@', 'g'), ` zephyrReleaseId=${this.releaseId}`);

            params = params.replace(new RegExp('@@cid@@', 'g'), ` ${this.checkAndReplace('zephyrCycleId', cycle.id, false)}`);
            params = params.replace(new RegExp('@@cname@@', 'g'), ` ${this.checkAndReplace('zephyrCycleName', cycle.name, true)}`);
            params = params.replace(new RegExp('@@cpid@@', 'g'), ` ${this.checkAndReplace('zephyrCpId', cyclePhase.id, false)}`);
            params = params.replace(new RegExp('@@build@@', 'g'), ` ${this.checkAndReplace('zephyrBuildName', cycle.build, true)}`);
            params = params.replace(new RegExp('@@env@@', 'g'), ` ${this.checkAndReplace('zephyrEnvName', cycle.environment, true)}`);
            params = params.replace(new RegExp('@@nid@@', 'g'), ` ${this.checkAndReplace('zephyrRepoId', this.tcrCatalogTreeId, false)}`);
            params = params.replace(new RegExp('@@nname@@', 'g'), ` ${this.checkAndReplace('zephyrRepoName', this.tcrCatalogTreeName, true)}`);

            batchObj.zbotParameter = params;
          }
        }

        this.zephyrStore.dispatch(this._testcaseExecutionAction.executeBatch(batchObj, this.executeFlag));
        this.executeFlag = this.executeFlag || true;

        this.handleBatchNotificationSubscription(batchObj.id);
      }

    checkAndReplace(text, val, addQuotes) {
        return val ? addQuotes ? `${text}="${val}"` : `${text}=${val}` : '';
    }

    filterAndDisplayZBotStatus(batch) {
        let tceRows = _.cloneDeep(this.zephyrStore.getState().tce.tceGrid.rows);

        this.testcaseIds = batch.testcaseExecutionList.map(item => item.tcId);

        this.tceZbotGridRows = tceRows.filter(row => this.testcaseIds.indexOf(row.testcase.id) > -1 && row.testcase.automated);

        this.batchStatus = batch.status;

        $('.rt-status').empty();

        batch.testcaseExecutionList.forEach(bat => {
          if(bat.status && this.batchStatus === 4) {
            let statusMessage = '<p>' + TCE_EXECUTION_ZBOT.ZBOT_EXECUTION_STATUS + '</p>';
            $('.rt-status').append(statusMessage);
            this.tceZbotGridRows = this.tceZbotGridRows.map((row, i) => {
              if(row.testcase.id === bat.tcId) {
                row.testcase.realtTimeStatus = bat.status;
                // $('#grid-table-tce_zbot .flex-bar').eq(i).find('.flex-data-item:last-child').text(bat.status);
              }

              row.testcase['orderId'] = i + 1;
              return row;
            });
          }
        });

        setTimeout(() => {
          batch.testcaseExecutionList.forEach(bat => {

            if(bat.status && this.batchStatus === 4) {

              this.tceZbotGridRows.forEach((row, i) => {
                if(row.testcase.id === bat.tcId) {
                  $('#grid-table-tce_zbot .flex-bar').eq(i).find('.flex-data-item:last-child').text(bat.status);
                }
              });

            }

          });

          this.batchStatus = null;
        }, 100);

    }
}
