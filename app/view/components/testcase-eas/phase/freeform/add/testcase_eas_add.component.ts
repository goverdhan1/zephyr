import {NgZone, Component, ViewChild, Input, Output, EventEmitter, AfterViewInit, OnDestroy} from '@angular/core';

import {TestcaseEASFreeFormSearchComponent} from './testcase_eas_add_search.component';
import {TestcaseEASFreeFormCyclesComponent} from './testcase_eas_add_cycles.component';
import {ZephyrStore} from '../../../../../../store/zephyr.store';
import {TestcaseEASAction} from '../../../../../../actions/testcaseEAS.action';

// Constants
import * as FREE_FORM_CONSTANTS from '../testcase_eas_freeform.constant';
import {I18N_MESSAGES, getI18nText} from '../../../../../../utils/messages/messages.en';
import {ASSIGN_TESTCASES_BY_SEARCH_SUCCESS} from '../../../../../../utils/constants/action.events';
import {TestcaseEASFreeFormBrowseComponent} from "./testcase_eas_add_browse.component";

declare var $, _;
declare var Draggable, document;

@Component({
	selector: 'zui-testcase-eas-freeform-add',
	templateUrl: 'testcase_eas_add.html'
})
export class TestcaseEASFreeFormAddComponent implements AfterViewInit, OnDestroy {
    @ViewChild(TestcaseEASFreeFormSearchComponent) testcaseSearchUI: TestcaseEASFreeFormSearchComponent;
    @ViewChild(TestcaseEASFreeFormBrowseComponent) testcaseBrowseUI: TestcaseEASFreeFormBrowseComponent;
    @ViewChild(TestcaseEASFreeFormCyclesComponent) testcaseCycleUI: TestcaseEASFreeFormCyclesComponent;
    @Input() cyclePhaseId;
    @Input() parentTreeId;
    @Input() releaseId;
    @Input() projectId;
    @Output() onTestcaseAdd: EventEmitter<any> = new EventEmitter();
    selectedCycle;

    _includeHierarchy = false;
    _testcaseTab = FREE_FORM_CONSTANTS.TESTCASE_EAS_FREEFORM_SEARCH_TAB;
    _FREE_FORM_CONSTANTS = FREE_FORM_CONSTANTS;
    i18nMessages = I18N_MESSAGES;
    headerDraggable;
    footerDraggable;
    dataKeyboard= true;
    public _confirmationJSON = {
      testcasesAdded : '',
      testcasesIgnored : '',
      nodeList : [
        // 'Hello 123',
        // 'Hello 123',
        // 'Hello 123',
        // 'Hello 123'
      ],
      testcaseList: [
        // 'testcaseList',
        // 'testcaseList',
        // 'testcaseList',
        // 'testcaseList'
      ],
      message : ''
    };
    unsubscribe;
    _selectAll = false;
    _searchText = '';
    _zephyrStore;

	constructor(private _testcaseEASAction: TestcaseEASAction, private zone:NgZone) {
        this._zephyrStore = ZephyrStore.getZephyrStore();

        this.unsubscribe = this._zephyrStore.subscribe(() => {
              let _state = this._zephyrStore.getState();
              if(_state.testcaseEAS.event == ASSIGN_TESTCASES_BY_SEARCH_SUCCESS) {
                  this.showAssignTestcasesConfirmation(_state.testcaseEAS.assignedFreeFormTestcases);
              }
        });

        setTimeout(() => {
		    	this.clearSearchData();
        });
    }

    ngOnDestroy() {
      this.unsubscribe();
    }

    clearSearchData() {
      if (this.testcaseSearchUI) {
        this.testcaseSearchUI.tcrGridUI.clearSelectedTctIds();
        this.testcaseSearchUI.tcrGridUI.clearGridRows();
        this.testcaseSearchUI.tcrGridUI.initGridData();
      }

      if (this.testcaseBrowseUI) {
        this.testcaseBrowseUI.tcrGridUI.clearSelectedTctIds();
        this.testcaseBrowseUI.tcrGridUI.clearGridRows();
        this.testcaseBrowseUI.tcrGridUI.initGridData();
      }

      if (this.testcaseCycleUI) {
          if(this.testcaseCycleUI.tcrGridUI) {
            this.testcaseCycleUI.tcrGridUI.clearSelectedTctIds();
            this.testcaseCycleUI.tcrGridUI.phaseGridRows = [];
          }
        this.testcaseCycleUI.goClicked = false;
      }
    }

    closeModal() {
      $('input[type=checkbox]#zui-search-save-all').prop('checked', false);
      this.onTestcaseAdd.emit();

      this.zone.run(() => {
        this.clearSearchData();
        $('#zui-eas-freform-add-testcase-modal').modal('hide');
      });
    }

    showAssignTestcasesConfirmation(testcaseStatus) {
        let $testcaseStatusEl = $.parseXML(testcaseStatus),
            $selectedEl = $($testcaseStatusEl);
        // Clear the event
        this._zephyrStore.dispatch(this._testcaseEASAction.clearEvents(ASSIGN_TESTCASES_BY_SEARCH_SUCCESS));
        // Hide the add testcase modal
        // $('#zui-eas-freform-add-testcase-modal').modal('hide');
        // Show the confirmation modal
        // TODO: Change dialog to message
        // Set the confirmation message
        this._confirmationJSON['nodeList'] = [];
        this._confirmationJSON['testcaseList'] = [];
        let isImported = false;
        $selectedEl.find('TCRCatalogTree').each((_index, el) => {
            if(_index == 0) {
                this._confirmationJSON['testcasesAdded'] =
                    getI18nText('zephyr.eas.freeform.add.testcase.search.added', [$(el).attr('testcases_added_cumulative')]);
                this._confirmationJSON['testcasesIgnored'] =
                    getI18nText('zephyr.eas.freeform.add.testcase.search.ignored', [$(el).attr('testcases_ignored_cumulative')]);
                	isImported = $(el).attr('testcases_added_cumulative') > 0;
                }
             if($(el).attr('action') == 'added') {
                this._confirmationJSON['nodeList'].push(getI18nText(
                    'zephyr.eas.freeform.add.testcase.search.node.added',
                    [$(el).attr('sourceName')]
                ));
                 this._confirmationJSON['testcaseList'].push(getI18nText(
                    'zephyr.eas.freeform.add.testcase.search.node.testcases.added',
                    [$(el).attr('testcases_added'), $(el).attr('sourceName')]
                ));
            }
            if($(el).attr('action') == 'modified' && $(el).attr('testcases_added') != 0 ) {
                this._confirmationJSON['testcaseList'].push(getI18nText(
                    'zephyr.eas.freeform.add.testcase.search.node.testcases.added',
                    [$(el).attr('testcases_added'), $(el).attr('sourceName')]
                ));
            }

            if(isImported) {
                this._confirmationJSON['message'] = I18N_MESSAGES['zephyr.eas.freeform.add.testcase.search.success'];
            } else {
                this._confirmationJSON['message'] = I18N_MESSAGES['zephyr.eas.freeform.add.testcase.search.no.testcases'];
            }
         });

        setTimeout(() => {
          this.headerDraggable = new Draggable($('#testcase-modal-confirmation .modal-content')[0], {
            handle: $('#testcase-modal-confirmation .modal-header'),
          });

          this.footerDraggable = new Draggable($('#testcase-modal-confirmation .modal-content')[0], {
            handle: $('#testcase-modal-confirmation .modal-footer'),
          });

          $("#testcaseAdded span").text(this._confirmationJSON.testcasesAdded);
          $("#testcaseIgnored span").text(this._confirmationJSON.testcasesIgnored);

          $("#nodeList li").remove();

          this._confirmationJSON.nodeList.forEach((node) => {
            // if (node.length > 70) {
            //   $("#nodeList").append(`<li title="${node}">${node.substring(0,70)}</li>`);
            // } else {
              $("#nodeList").append(`<li>${node}</li>`);
            // }
            // if (node.length > 70) {
            //   $("#nodeList").append(`<li title="${node}">${node.substring(0,70)}</li>`);
            // } else {
            //   $("#nodeList").append(`<li>${node}</li>`);
            // }
          });

          $("#testcaseList li").remove();

          this._confirmationJSON.testcaseList.forEach((testcase) => {
            // if (testcase.length > 70) {
            //   $("#nodeList").append(`<li title="${testcase}">${testcase.substring(0,70)}</li>`);
            // } else {
              $("#nodeList").append(`<li>${testcase}</li>`);
            // }
            // if (testcase.length > 70) {
            //   $("#nodeList").append(`<li title="${testcase}">${testcase.substring(0,70)}</li>`);
            // } else {
            //   $("#nodeList").append(`<li>${testcase}</li>`);
            // }
          });

          $("#confirmationMessage span").text(this._confirmationJSON.message);

          $('#testcase-modal-confirmation').modal('show');
        }, 0);
    }
    ngAfterViewInit() {
		$('#testcase-modal-confirmation').on('hide.bs.modal', () => {
			// this.onTestcaseAdd.emit();
		});
        $('#zui-eas-freform-add-testcase-modal').on('hide.bs.modal', () => {
            this._includeHierarchy = false;
            this._selectAll = false;
            // Clear the previous search and select the Quick tab
			this._testcaseTab = this._FREE_FORM_CONSTANTS.TESTCASE_EAS_FREEFORM_SEARCH_TAB;
            $('#zui-search-textarea').val('');
            $('#zui-search-quick').trigger('click');
      });
    }

    dismissModal() {
        // this.closeModal();
        $('#testcase-modal-confirmation').modal('hide');
    }
    /**
     * On click of tab, show the respective content
     */
    onClickOfTab(ev) {
        let _tabName = $(ev.target).data('target-name');
        if(_tabName) {
            // $('.zui-modal-tab-bar-heading-label').removeClass('selected');
            // $(ev.target).addClass('selected');
            this._testcaseTab = _tabName;

            if (this.testcaseBrowseUI) {
              this.testcaseBrowseUI.tcrGridUI.clearSelectedTctIds();
              this.testcaseBrowseUI.tcrGridUI.clearGridRows();
              this.testcaseBrowseUI.tcrGridUI.initGridData();
              // this.testcaseBrowseUI.reset();
            }
        }
    }
    addFreeformTestcases() {
        if(this._testcaseTab == FREE_FORM_CONSTANTS.TESTCASE_EAS_FREEFORM_SEARCH_TAB) {
            this.testcaseSearchUI.addTestcasesOnSearch();
        } else if(this._testcaseTab == FREE_FORM_CONSTANTS.TESTCASE_EAS_FREEFORM_BROWSE_TAB) {
          this.testcaseBrowseUI.addTestcases();
        } else if(this._testcaseTab == FREE_FORM_CONSTANTS.TESTCASE_EAS_FREEFORM_CYCLES_TAB) {
            this.testcaseCycleUI.addTestcases();
        }
    }
    isFormValid() {
        if(this._testcaseTab == FREE_FORM_CONSTANTS.TESTCASE_EAS_FREEFORM_SEARCH_TAB) {
            if(this.testcaseSearchUI && this.testcaseSearchUI.tcrGridUI &&
            this.testcaseSearchUI.tcrGridUI.selectedTctIds) {
                return (!$('input[type=checkbox]#zui-search-save-all').prop('checked') &&
                    !this.testcaseSearchUI.tcrGridUI.selectedTctIds.length);
            }
        } else if(this._testcaseTab == FREE_FORM_CONSTANTS.TESTCASE_EAS_FREEFORM_CYCLES_TAB) {
            if(this.testcaseCycleUI && this.testcaseCycleUI.selectedTctIds) {
                return !this.testcaseCycleUI.selectedTctIds.length;
            }
        }
        return false;
    }
}
