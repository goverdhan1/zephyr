
import {
  ElementRef, Component, Input, Output, EventEmitter, AfterViewInit,
  OnChanges, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, Inject
} from '@angular/core';
import {Router} from '@angular/router';
import {ZephyrStore} from '../../../store/zephyr.store';

import {InlineDialogDirective} from '../common/inline_dialog/inline_dialog.directive';
import {InlineEditComponent} from '../inline_edit/inline_edit.component';
import {GridPipe} from '../../pipes/grid.pipe';
import {GridAction} from '../../../actions/grid.action';
import {GlobalAction} from '../../../actions/global.action';
import {Resizable} from '../../../utils/scripts/resizable';
import {UtililtyFunctions as UtilityFunctions} from '../../../utils/scripts/utils';
// Constants
import {I18N_MESSAGES} from '../../../utils/messages/messages.en';

import {CUSTOM_COLUMNS_COUNTS, DEFAULT_GRID_STATE} from '../../../reducers/grid.reducer';

import * as GRID_CONSTANTS from './grid.constant';
import {
  FETCH_INITIAL_GRID_STATE_SUCCESS, FETCH_INITIAL_GRID_STATE_SUCCESS_FROM_DB, REFETCH_INITIAL_GRID_STATE_SUCCESS,
  RESET_INITIAL_GRID_STATE_SUCCESS, RESET_INITIAL_GRID_STATE_SUCCESS_FOR_GRID, SET_PROJECT_CUSTOM_FIELDS_SUCCESS,
  UPDATE_GRID_STATE_SUCCESS
} from '../../../utils/constants/action.events';
import {PouchDBPrefsServices} from '../../../services/pouch.db.service';
import {ToastrService} from '../../../services/toastr.service';
import * as Sortable from 'sortablejs';

declare var jQuery: any, _, Draggable:any, PouchDB, window;

/**
 * Grid configuration
 * ------------------
 * headerRow: true/false. Default: true
 * rowCount: default/custom/limitless. Default: 5
 *     If you don't give any value then it is default, if you give value > 0 then custom and if -1 then limitless
 * rowReorder: true/false. Default: false
 * columnCount: default/custom. Default: 5
 *    If you give value > 0 then custom else it is default
 * columnHeaderBackground: true/false. Default: true
 * columnReorder: true/false. Default: false
 * 	Since reorder is handled in column chooser, will allow this only if column chooser is present
 * columnSeparator: true/false. Default: true
 * columnChooser:
 *    show: true/false. Default: false
 *    columnNames: default column headings
 * pagination:
 *    show: true/false. Default: true
 *    currentOfTotal: true/false. Default: true
 *    navBar:
 *      type: simple [1. next, prev 2. last and first (on/off)].  Default: simple
 *            complex [1. next, prev 2. last and first (on/off) 3. page numbers]
 *      isFirstLast: true/false. Default: true
 *    pageSize: true/false. Default: false
 * ------------------------------------------------
 * Label properties
 * labelType: 'text', 'checkbox'. Default: 'text'
 * sortable: true/false
 * resizable: true/false
 * fixedSize: 'px'
 * alwaysShow: true/fasle
 * min: '%'
 * defaultSize: 'px'
 * cellJustification: 'left', 'right', 'center'
 * cell:
 *    visibility: alwaysShow, showOnHover
 *    type: text box, drop down, checkbox, radio, datepicker,
 *          timepicker, buttons, link, icons with call to action, lozenges,
 *          number, color picker (icon with text type of combination), icons with hover [always visible, visible on hover]
 *    action: ''
 * editable: true/false
 * -----------------------------------------------
 * Example:
 * {
	headerRow: true,
	rowCount: GRID_ROW_COUNT_DEFAULT,
	rowReorder: false,
	columnCount: GRID_COLUMN_COUNT_DEFAULT,
	columnHeaderBackground: true,
	columnReorder: false,
	columnSeparator: true,
	columnChooser: {
		show: true
	},
	pagination: {
		show: true,
		currentOfTotal: true,
		navBar: {
			'type': 'simple',
			isFirstLast: true
		},
		pageSize: true
	},
	[{
		labelType: GRID_LABEL_TYPE_CHECKBOX,
		sortable: true,
		resizable: true,
		fixedSize: 'px',
		show: true,
		min: '%',
		defaultSize: 'px',
		cellJustification: 'left',
		cell: {
			visibility: '',
			type: '',
			action: ''
		},
		editable: true
	}]
 }
 */
@Component({
  selector: 'grid',
  templateUrl: 'grid.html',
  providers: [GridAction, GlobalAction, UtilityFunctions]
})

export class GridComponent implements AfterViewInit, OnChanges, OnDestroy {
    @Input() rows: Array<Object>;
    @Input() keyToCheck = null;
    @Input() emitSort = false;
    @Input() noData = false;
    @Input() gridType: string = '';
    @Input() hideReset = false;
    @Input() rowIds: Array<Object>;
    @Input() secondaryIds;
    @Input() executionIds;
    @Input() hideCoverage = false;
    @Input() hideCheckAll = false;
    @Input() keyOnRowSelect: String = null;
    @Input() doDirtyCheck = false;
    @Input() treeType = '';
    @Input() paginationOptions = {
        isFirstPage: true,
        isLastPage: true,
        pageList: [],
        currentOfTotal: '',
        currentIndex: 1,
        lastIndex: 0,
        disabled: false,
        size: null,
        show: true
    };

    @Output() onGridInlineEditSubmit: EventEmitter<any> = new EventEmitter();
    @Output() onGridPrevClick: EventEmitter<any> = new EventEmitter();
    @Output() onGridNextClick: EventEmitter<any> = new EventEmitter();
    @Output() onGridLinkClick: EventEmitter<any> = new EventEmitter();
    @Output() onGridIconClick: EventEmitter<any> = new EventEmitter();
    @Output() onGridRowClick: EventEmitter<any> = new EventEmitter();
    @Output() onGridRowSelection: EventEmitter<any> = new EventEmitter();
    @Output() onGridActionIconClick: EventEmitter<any> = new EventEmitter();
    @Output() onGridRowSelectChange: EventEmitter<any> = new EventEmitter();
    @Output() onGridPageSizeChange: EventEmitter<any> = new EventEmitter();
    @Output() onGridPaginateByIndex: EventEmitter<any> = new EventEmitter();
    @Output() onGridToggleButtonClick: EventEmitter<any> = new EventEmitter();
    @Output() onDragStart: EventEmitter<any> = new EventEmitter();
    @Output() onDragEnd: EventEmitter<any> = new EventEmitter();
    @Output() onDrop: EventEmitter<any> = new EventEmitter();
    @Output() onDialogTrigger: EventEmitter<any> = new EventEmitter();

    @Output() onSort: EventEmitter<any> = new EventEmitter();

    unsubscribe;
    _gridOptions: any = {};
    changeDetectionDebounce;
    afterViewInit = null;
    sortOptions :any = {};
    lastAction = '';
    _resizable;
    _zephyrStore;
    i18nMessages = I18N_MESSAGES;
    _GRID_CONSTANTS = GRID_CONSTANTS;
    isSortableInitialized = false;
    currentResizeCol: {};
    colResizeInstance;
    gridElement;
    scrollbarWidth;
    check_name;
    rowCount;
    dataSavedInDB = false;
    fetchComplete = false;
    isConfirmVisible = false;
    confirmTimeout;

    constructor(private _gridAction: GridAction, private globalAction: GlobalAction, private element: ElementRef,
        private utils: UtilityFunctions, private cdr: ChangeDetectorRef, private _ngZone: NgZone,public router: Router,
                @Inject(PouchDBPrefsServices) private pouchDBSercvice: PouchDBPrefsServices, @Inject(ToastrService) private toastrService:ToastrService) {

        this._zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this._zephyrStore.subscribe(() => {
            let state = this._zephyrStore.getState();

            if(state.grid.event === FETCH_INITIAL_GRID_STATE_SUCCESS && this.gridType) {
                setTimeout(() => {
                  this.setGridOptions(state.grid[this.gridType], FETCH_INITIAL_GRID_STATE_SUCCESS);
                }, 10);
            }

            if (state.grid.event === SET_PROJECT_CUSTOM_FIELDS_SUCCESS && this.gridType) {
              this.ngAfterViewInit();
              this._zephyrStore.dispatch(this._gridAction.clearGridEvents(null));
            }

            if(state.grid.event === RESET_INITIAL_GRID_STATE_SUCCESS_FOR_GRID && this.gridType === state.grid.gridKey) {
                this.setGridOptions(state.grid[this.gridType], FETCH_INITIAL_GRID_STATE_SUCCESS);
            }

            if(state.grid.event === REFETCH_INITIAL_GRID_STATE_SUCCESS && this.gridType) {
              setTimeout(() => {
                this.ngAfterViewInit();
                this._zephyrStore.dispatch(this._gridAction.clearGridEvents(event));
              }, 10);
            }

            if(state.grid.event === FETCH_INITIAL_GRID_STATE_SUCCESS_FROM_DB && this.gridType && !this.fetchComplete) {
              this.fetchComplete = true;
              setTimeout(() => {
                this.setGridOptions(state.grid[this.gridType], FETCH_INITIAL_GRID_STATE_SUCCESS_FROM_DB);
              }, 100);
            }
          try {
                this.check_name = this._gridOptions['columns'][0]['cell']['pipes'][0].args[0].name || 'testcase_select';
            } catch (e) {
                this.check_name = 'testcase_select';
            }
            this.initializeColResize();
        });
        this.scrollbarWidth = this.utils.getScrollbarWidth();
        this.gridElement = jQuery(this.element.nativeElement);
    }

    ngAfterViewInit() {
      let state = this._zephyrStore.getState();

      // console.log("prefs patched   " + this.pouchDBSercvice.prefsPatched);

      if (this.pouchDBSercvice.prefsPatched && (state.grid.customFieldsLoaded || jQuery("zui-administration-left-nav").length > 0 || jQuery("zui-dashboard").length > 0 || jQuery("release-setup-details").length > 0)) {

        if (this.afterViewInit) {
          clearTimeout(this.afterViewInit);
        }

        this.afterViewInit = setTimeout(() => {
          try {

            this.pouchDBSercvice.getValue('grid', this.gridType, (cols) => {
              // console.log(this.gridType + " this is grid");
              // console.log(cols);
              this.setColumnsAfterFetch(cols);
            }, () => {
              // console.log(JSON.stringify(this.pouchDBSercvice.prefs));
              // console.log(this.gridType + " failed");
              this._zephyrStore.dispatch(this._gridAction.fetchInitialGridState(this.gridType));
            });
          } catch(e) {
            // console.error(e);
          }

          this._resizable = new Resizable();
        }, 100);

      } else if (jQuery("zui-project-left-nav").length === 0) {
        setTimeout(() => {
          this.ngAfterViewInit();
        }, 100);
      }

    }

    setColumnsAfterFetch(cols) {
      let doc = _.cloneDeep(DEFAULT_GRID_STATE[this.gridType]);

      let deletedColumns = 0;

      cols.forEach((col:any) => {
        let index = _.findIndex(doc.columns, {labelId: col.id});

        if (index !== -1) {
          doc.columns[index].sequence = col.sequence;
          // doc.columns[index].labelName = col.labelName;
          doc.columns[index].sortable = col.sortable;
          doc.columns[index].fixedSize = col.fixedSize;
          doc.columns[index].min = col.min;
          doc.columns[index].show = col.show;
        } else {
          deletedColumns++;
        }

        // id: val.labelId,
        //   sequence: counter,
        //   labelName : val.labelName,
        //   sortable: val.sortable,
        //   fixedSize: val.fixedSize,
        //   min: val.min

      });

      doc.columns.sort((a,b) => {
        if ((!a.sequence && a.sequence !== 0) || (a.labelName === "Action")) {
          a.sequence = 99999;
        }

        if ((!b.sequence && b.sequence !== 0) || (b.labelName === "Action")) {
          b.sequence = 99999;
        }

        return parseInt(a.sequence) - parseInt(b.sequence);
      });

      // for (let i = 0; i < doc.columns.length; i++) {
      //   let seq = doc.columns[i].sequence;
      //
      //   if (doc.columns[seq]) {
      //     if (seq && seq !== i) {
      //       let temp = doc.columns[i];
      //       doc.columns[i] = doc.columns[seq];
      //       doc.columns[seq] = temp;
      //     }
      //   } else {
      //
      //     while(!doc.columns[seq] && seq >= 0) {
      //       seq--;
      //     }
      //
      //     if (seq >= 0) {
      //       let temp = doc.columns[i];
      //       doc.columns[i] = doc.columns[seq];
      //       doc.columns[seq] = temp;
      //     }
      //   }
      //
      // }


      // let customFieldColumnsSrc = _.filter(DEFAULT_GRID_STATE[this.gridType].columns, {isCustomField: true});
      // let customFieldColumnsTgt = _.filter(doc.columns, {isCustomField: true});
      //
      // let diff = Math.abs(doc.columns.length - DEFAULT_GRID_STATE[this.gridType].columns.length);
      //
      // if (diff !== 0 && diff !== Math.abs(customFieldColumnsSrc.length - customFieldColumnsTgt.length)) {
      //   this.toastrService.warning("The grid state has been changed. Please reset the grid state to see the latest state");
      // }
      //
      // customFieldColumnsSrc.forEach((col) => {
      //   let hasThisCol = _.some(doc.columns, {fieldType : "custom_field", fieldId: col.fieldId});
      //
      //   if (!hasThisCol) {
      //     doc.columns.push(col);
      //   }
      // });
      //
      // let columns = _.cloneDeep(doc.columns);
      //
      // let decrement = 0;
      //
      // columns.forEach((col, index) => {
      //   if (col.fieldType && col.fieldType === "custom_field") {
      //     let columnIndex = _.findIndex(customFieldColumnsSrc, {fieldType : "custom_field", fieldId: col.fieldId});
      //
      //     if (columnIndex === -1) {
      //       doc.columns.splice(index, 1);
      //       decrement++;
      //     } else {
      //       let originalCol =  _.cloneDeep(doc.columns[index - decrement]);
      //       doc.columns[index - decrement] = customFieldColumnsSrc[columnIndex];
      //       doc.columns[index - decrement].show = originalCol.show;
      //       doc.columns[index - decrement].labelName = originalCol.labelName;
      //       doc.columns[index - decrement].fixedSize = originalCol.fixedSize;
      //     }
      //
      //   }
      // });

      this.setGridOptions(doc, undefined);
      this.initializeColResize();
      this._zephyrStore.dispatch(this._gridAction.setInitialGridState(this.gridType, doc));
    }
    move(arr,from,to){
      arr.splice(to,0,arr.splice(from,1)[0]);
      return arr;
    }
    ngOnChanges(changedNode) {

      if (changedNode.hasOwnProperty('rows') && !_.isEqual(changedNode.rows.currentValue, changedNode.rows.previousValue)) {

        setTimeout(() => {
          this.attachDraggableUI();
          this.attachDroppableUI();
        }, 100);

        this.lastAction = '';
        this.triggerChange();
      }

      if (this.changeDetectionDebounce) {
        clearTimeout(this.changeDetectionDebounce);
      }
      let firstDetection = !this.changeDetectionDebounce;
      this.changeDetectionDebounce = setTimeout(() => {

        let state = this._zephyrStore.getState();
        if (!this._gridOptions || !this._gridOptions['columns'] || !this._gridOptions['columns'].length
          || (state.grid[this.gridType] && _.isArray(state.grid[this.gridType].columns) &&
          this._gridOptions['columns'].length != state.grid[this.gridType].columns.length)) {
          if (this.gridType) {
            this.setGridOptions(state.grid[this.gridType], null);
          }
        }
        setTimeout(() => {
          if(this.paginationOptions && this.paginationOptions.size) {
            this.rowCount = this.paginationOptions.size;
            this.triggerChange();
          }
        });

        this.changeDetectionDebounce = null;
      }, 100);
    }
    ngOnDestroy() {
        this.unsubscribe();
        this._zephyrStore.dispatch(this._gridAction.clearGridData(this.gridType));
    }
    cancelDraggable() {
        try {
            let gridRow = jQuery(`#grid-table-${this.gridType}`).find('.flex-bar');
            if (gridRow.draggable && gridRow.draggable('instance')) {
                gridRow.draggable('destroy');
            }
        } catch (err) {
          //  // console.log('could not attach drag to grid', this.gridType, err);
        }
    }
    attachDraggableUI() {
        let gridRow = jQuery(`#grid-table-${this.gridType}`).find('.flex-bar');
        if (!gridRow.draggable) {
            // draggable was not initialized
            return;
        }
        try {

            if (!this.isSortableInitialized && jQuery(`#header-parent-${this.gridType}`).length) {
              this.initializeSortable();
              this.isSortableInitialized = true;
            }

            if (this._gridOptions['gridDND']) {
                let gridDNDOptions = this._gridOptions['gridDNDOptions'] || {};
                let defaultOptions = {
                    cursor: 'move',
                    cursorAt: {'left': 0, 'bottom': 0},
                    appendTo: 'body',
                    iframeFix: true,
                    zIndex: gridDNDOptions.zIndex || false,
                    handle: gridDNDOptions.handle || false,
                    containment: gridDNDOptions.containment || 'document',
                    axis: gridDNDOptions.axis || false,
                    connectToSortable: gridDNDOptions.connectToSortable || (`#grid-table-${this.gridType} tbody`),
                    helper: gridDNDOptions.helper || (ev => {
                        let container = jQuery('<div class="zee-draggable"/>').append('<strong></strong><span></span>');
                        container.data('id', ev.currentTarget.dataset.id).children(':eq(1)').text(` ${jQuery(ev.currentTarget).length} ${gridDNDOptions.dragTitle || 'row'}`);
                        return container;
                    }),
                    start: (event, ui) => {
                        this.onDragStart.emit(ui);
                    },
                    stop: (event, ui) => {
                        jQuery('.js-blur-wrapper').removeClass('blur-overlay-partial');
                        setTimeout(() => {
                            if (!this.isConfirmVisible) {
                                this.onDragEnd.emit(ui);
                                this.triggerChange();
                            }
                        }, 2);
                    },
                    drag: (event, ui) => {

                        setTimeout(() => {
                            if (!this.promptForSave(ui)) {

                                let dropNode = jQuery('.ui-droppable-active.ui-droppable-hover').removeClass('last-node').last();
                                let showAllocate = !_.isEmpty(gridDNDOptions.doAllocate) && this.treeType === gridDNDOptions.doAllocate['source'];
                                if (showAllocate) {
                                    jQuery('.js-blur-wrapper').addClass('blur-overlay-partial');
                                }
                                let isAllocate = showAllocate && dropNode.children('a').data('parenttype') === gridDNDOptions.doAllocate['target'];

                                ui.helper.data('allocate', isAllocate);
                                if (event.ctrlKey || gridDNDOptions.alwaysCopy) {
                                    ui.helper.addClass('copy_drag').children(':eq(0)').text('Copying');
                                } else if (isAllocate) {
                                    ui.helper.removeClass('copy_drag').children(':eq(0)').text('Allocating');
                                } else {
                                    ui.helper.removeClass('copy_drag').children(':eq(0)').text('Moving');
                                }
                                dropNode.addClass('last-node');
                            }

                            ui.helper.data('isConfirmVisible', this.isConfirmVisible);
                        });
                    }
                };
                if (gridDNDOptions.cancel) {
                    defaultOptions['cancel'] = gridDNDOptions.cancel;
                }
                if (gridDNDOptions.scope) {
                    defaultOptions['scope'] = gridDNDOptions.scope;
                }
                if (gridRow.draggable('instance')) {
                    gridRow.draggable('destroy');
                }
                if (!gridDNDOptions.selectDraggable) {
                    gridRow.draggable(defaultOptions);
                    return;
                }

                // set individual drag to unselected rows
                let draggableRows = gridRow.filter((index, item) => !jQuery(item).find('input.grid_checkbox').prop('checked'));
                draggableRows.draggable(defaultOptions);

                // set group drag to selected rows
                draggableRows = gridRow.filter((index, item) => jQuery(item).find('input.grid_checkbox').prop('checked'));

                defaultOptions.helper = () => {
                    let container = jQuery('<div class="zee-draggable"/>').append('<strong></strong><span></span>');
                    let ids = [];
                    draggableRows.each((index, item) => {
                        ids.push(item.dataset.id);
                    });
                    container.data('id', ids.join(',')).children(':eq(1)').text(` ${draggableRows.length} ${gridDNDOptions.dragTitle || 'row'}${draggableRows.length > 1 ? 's' : ''}`);
                    return container;
                };
                draggableRows.draggable(defaultOptions);
            }
        } catch (err) {
          // console.log('could not attach draggable to grid', this.gridType);
        }
    }

    initializeSortable() {
      let that = this;

      Sortable.create(jQuery(`#header-parent-${this.gridType}`)[0], {
        filter: '.dont-sort',
        onEnd: function (/**Event*/evt) {

          if (that._gridOptions.columns[evt.newIndex].labelType === "checkbox" || that._gridOptions.columns[evt.newIndex].labelName.toLocaleLowerCase() === "id"
            || that._gridOptions.columns[evt.newIndex].labelName === "#"
            || that._gridOptions.columns[evt.newIndex].labelName === "Action") {

              let source = jQuery(evt.target).find(`.flex-header-item:eq(${evt.oldIndex + 1})`);
              let target = jQuery(evt.target).find(`.flex-header-item:eq(${evt.newIndex})`);

              target.insertBefore(source);

          } else if (evt.newIndex !== that._gridOptions.columns.length) {
            that._gridOptions.columns  = that.move(that._gridOptions.columns,evt.oldIndex,evt.newIndex);
            that._gridOptions.columns = _.cloneDeep(that._gridOptions.columns);

            that._zephyrStore.dispatch(that._gridAction.updateGridState(that.gridType, that._gridOptions));
          } else {
            setTimeout(() => {
              let source = jQuery(evt.target).find(`.flex-header-item:eq(${evt.oldIndex})`);
              let target = jQuery(evt.target).find(`.flex-header-item:eq(${evt.newI})`);

              target.insertBefore(source);
            }, 100);
          }
        }

      });
    }

    attachDroppableUI() {
        let gridRow = this.gridElement.parent();
        if (!gridRow.droppable) {
            // droppable was not initialized
            return;
        }
        try {
            if (this._gridOptions['gridDrop']) {

                let dropOptions = this._gridOptions['gridDropOptions'];
                let options = {
                    greedy: true,
                    tolerance: 'pointer',
                    accept: dropOptions['accept'] || '*',
                    drop: (event, ui) => {
                        let operation = event.ctrlKey || ui.helper.hasClass('copy_drag') ? 'copy' : 'move';

                        let dragId = ui.helper.data('id').split(',');

                        this.onDrop.emit({dragId, operation});
                        this.triggerChange();
                    }
                };
                if (dropOptions['scope']) {
                    options['scope'] = dropOptions['scope'];
                }

                if (gridRow.droppable('instance')) {
                    gridRow.droppable('destroy');
                }
                gridRow.droppable(options);

            }
        } catch (err) {
            // console.log('could not attach droppable to grid', this.gridType, err);
        }
    }
    /**
     * Attach sortable ui
     */
    attachSortableUI() {
        if(this._gridOptions && this._gridOptions['rowReorder']) {
            jQuery('#grid-table-' + this.gridType + ' tbody').sortable({
                // placeholder: 'grid_row',
                // handle: 'button.zui-grid-handle',
                update: (event, ui) => {
                    // instance.reorderGadgets();
                },
                start: (event, ui) => {
                    // Set the placeholder class, in case the layout changes
                    // jQuery(ui.placeholder).attr('class', '');
                }
            }).disableSelection();
        }
    }

    selectRows(e) {
        if (e.shiftKey) {
          let checkedFound = false;
          let checked = e.target.checked;
          let index = jQuery(e.target).parents('.flex-bar').index();
          let rows = jQuery(e.target).parents('.grid-content').find('.select-flex-row:checked');

          if (rows.length) {
            let firstCheckedRow = jQuery(rows[0]).parents('.flex-bar').index();

            if (firstCheckedRow === index) {
              firstCheckedRow = jQuery(rows[1]).parents('.flex-bar').index();
            }

            _.each(this.gridElement.find('.select-flex-row').slice(index > firstCheckedRow ? firstCheckedRow : index , index > firstCheckedRow ?  index : firstCheckedRow), checkbox => {

              if (jQuery(checkbox).is(checked ? ':not(:checked)' : ':checked')) {
                jQuery(checkbox).trigger('click');
              }

            });

          }

        }
    }

    attachResizableUI() {
        let resizableName = jQuery('#grid-table-' + this.gridType).find('.zui-th-resizable');
        this._resizable.attachResizable(resizableName, resizableName, {
            minHeight: 0,
            maxHeight: 1,
            minWidth: 120,
            maxWidth: 380
        });
    }
    initializeColResize() {
        this.onColumnResizeHover();
        this.colResizeMousedown();
        this.colResizeMouseup();

        if(this.colResizeInstance) {
            this.colResizeInstance.destroy();
        }

        this.colResizeInstance = new Draggable(this.element.nativeElement.querySelector('.resizer-line'), {
            useGPU: true,
            limit:  ((x, y, x0, y0) => {

                y = 0;

                if (this.currentResizeCol) {
                    let rightEnd = this.currentResizeCol['offsetLeft'];
                    let leftEnd = jQuery(this.currentResizeCol).parent().position().left + 50;
                    let resizeEle = jQuery(this.currentResizeCol);
                    let index = resizeEle.closest('[data-col-index]').attr('data-col-index');
                    if((this._gridOptions['columns'][index].flexGrow == '1') &&
                        (x < rightEnd && this.element.nativeElement.offestWidth > 400))  {
                        x = rightEnd;
                    } else if(x < leftEnd) {
                        x = leftEnd;
                    }
                }

                return {x, y};
            }),
            onDragEnd: ((el, x, y, ev) => {
                if (this.currentResizeCol) {
                    let resizeEle = jQuery(this.currentResizeCol);
                    let changedWidth = x - this.currentResizeCol['offsetLeft'];
                    let index = resizeEle.closest('[data-col-index]').attr('data-col-index');
                    let originalWidth = resizeEle.closest('[data-col-index]').width();
                    if(originalWidth + changedWidth < 0) {
                        return;
                    }
                    this._gridOptions['columns'][index].min = originalWidth + changedWidth;
                    this._gridOptions['columns'][index].flexGrow = 0;
                    jQuery(el).removeClass('all-visible');
                    this.triggerChange();

                    setTimeout(() => {
                      this.pouchDBSercvice.putObject('grid', this._gridOptions, this.gridType);
                    }, 100);
                }
            })
        });
    }

    onColumnResizeHover() {
        this.gridElement.on('mouseenter', '.column-resizer', e => {
            this.currentResizeCol = e.currentTarget;
            jQuery(e.currentTarget).closest('.zui-flex-grid').find('.resizer-line').css('left', ((e.currentTarget).offsetLeft - 1) + 'px');
        });
    }

    colResizeMousedown() {
       this.gridElement.on('mousedown', '.resizer-line', ev => {
            jQuery(ev.currentTarget).removeClass('head-visible').addClass('all-visible');
        });
    }

    colResizeMouseup() {
        this.gridElement.on('mouseup', '.resizer-line', ev => {
            jQuery(ev.currentTarget).removeClass('head-visible').removeClass('all-visible');
        });
    }

    /**
     * Select the previously selected checkbox
     */
    initCheckboxSeletion() {
        this.gridElement.find('input#' + this.check_name + '_all').prop('checked', this.isSelectedAllRow());
    }

    isSelectedAllRow() {
      let elem = this.gridElement;
            let rows = this.rows;
            if(Array.isArray(rows) && rows.length && jQuery('#grid-table-' + this.gridType + ' input.grid_checkbox:checked').length === rows.length) {
                jQuery(".grid_checkbox_all." + this.gridType +".select_all" ).prop("checked", true);
                jQuery(this.element.nativeElement).find(".grid_checkbox_all").prop("checked", true);
                return true;
            }

            jQuery(".grid_checkbox_all." + this.gridType +".select_all" ).prop("checked", false);
            jQuery(this.element.nativeElement).find(".grid_checkbox_all").prop("checked", false);
            return false;
    }

    deselectAllCheckbox() {
        jQuery('input.grid_checkbox_all').prop('checked', false);
    }
    isSelectedRow(row) {
        if (this.keyToCheck) {
            return _.includes(this.rowIds, row[this.keyToCheck]);
        }
        return _.includes(this.rowIds, row.id);
    }
    _onGridPrevClick(ev) {
        if (this.promptForSave()) {
            return;
        }
        let _value = this.paginationOptions.currentIndex;
        _value = _value - 1;
        if(_value >= 1) {
            this.paginationOptions.disabled = true;
            this.onGridPrevClick.emit(_value);
        }
    }
    _onGridNextClick(ev) {
        if (this.promptForSave()) {
            return;
        }
        let _value = this.paginationOptions.currentIndex;
        _value = _value + 1;
        if(_value <= this.paginationOptions.lastIndex) {
            this.paginationOptions.disabled = true;
            this.onGridNextClick.emit(_value);
        }
    }
    _onGridFirstClick(value) {
        if (this.promptForSave()) {
            return;
        }
        this.paginationOptions.disabled = true;
        this.onGridPaginateByIndex.emit(value);
    }
    _onGridLastClick(value) {
        if (this.promptForSave()) {
            return;
        }
        this.paginationOptions.disabled = true;
        this.onGridPaginateByIndex.emit(value);
    }
    _onGridPageClick(value) {
        if (this.promptForSave()) {
            return;
        }

        // if clicked on current page, do not navigate
        if (this.paginationOptions.currentIndex === value) {
            return;
        }
        this.paginationOptions.disabled = true;
        this.onGridPaginateByIndex.emit(value);
    }
    onPageSizeSelection(ev) {
        if (this.promptForSave()) {
            ev.target.value = this.rowCount;
            return;
        }
        try {
            this.rowCount = Number(ev.target.value);
        } catch(e) {
          //  // console.log(e);
        }
        this.onGridPageSizeChange.emit(this.rowCount);
    }
    onColumnChooserClick(target, column) {
        column.show = jQuery(target.target).is(':checked');
        this._zephyrStore.dispatch(this._gridAction.updateGridState(this.gridType, this._gridOptions));
    }
    onMultipleColumnSelection(columns, makeServerCall = true) {
        this._gridOptions['columns'] = columns;
        this._zephyrStore.dispatch(this._gridAction.updateGridState(this.gridType, this._gridOptions, makeServerCall));
    }
    onGridSubmit(event, row, key) {
        this.onGridInlineEditSubmit.emit({event, row, key});
    }
    onGridClick(ev) {
        let target = ev.target,
            dataset = target.dataset;
        let trParents = jQuery(target).closest('.flex-bar');

        if((target.className.indexOf('select2-selection') > -1)) {
            return;
        }
        if(target.className.indexOf('grid-column-div') > -1) {
            target = target.parentElement;
        }
        if (target.className.indexOf('tgl-btn') > -1 || (target.firstChild && target.firstChild.className && (target.firstChild.className.indexOf('zui-toggle-wrapper') > -1))) {
            this.onGridToggleButtonClick.emit({
                value: jQuery(target).parent().find('input').prop('checked'),
                id: trParents[0].dataset.id
            });
            return;
        }

        if(target.className.indexOf('grid_link_select_click') > -1) {
            if (this.promptForSave()) {
                return;
            }
            let targetRow = trParents[0];
            jQuery(targetRow).parent().find('.flex-bar').removeClass('selected-row');
            jQuery(targetRow).addClass('selected-row');
            this.onGridRowClick.emit(targetRow);
            this.onGridLinkClick.emit(target);
        } else if(target.className.indexOf('tce-current-defects-detail-url') > -1){
            let currentRelease = {id: 1};
            try {
                currentRelease = JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`));
            } catch (err) {
                // console.log(err);
            }
            let defectId = (jQuery(target).text() || '').trim();
            this.router.navigate(['/defect-tracking/'+ currentRelease.id, {defectId}]);
        } else if(target.className.indexOf('grid_link_click') > -1) {
            this.onGridLinkClick.emit(target);
        } else if(target.className.indexOf('grid-icon') > -1) {
            this.onGridIconClick.emit(target);
        } else if(target.className.indexOf('grid_checkbox_all') > -1) {
            this.toggleAllSelection(target);
        } else if(target.className.indexOf('grid_checkbox') > -1) {
            this.toggleSelection(target);
        } else if (target.className.indexOf('grid-action-icon') > -1) {
            this.onGridActionIconClick.emit(ev);
        } else if (target.className.indexOf('coverage') > -1) {
          this.onDialogTrigger.emit(ev);
        } else if(dataset.sort) {
            this.updateSortColumns(dataset.id);
        } else if (trParents.length > 0) {
            if (this.promptForSave()) {
                return;
            }
            let targetRow = trParents[0];
            jQuery(targetRow).parent().find('.flex-bar').removeClass('selected-row');
            jQuery(targetRow).addClass('selected-row');
            this.onGridRowClick.emit(targetRow);
        }
    }
    updateSortColumns(columnId) {
        this.lastAction = 'sort';

        if(columnId) {
            _.each(this._gridOptions['columns'], (column) => {
                if(column.sortable && !_.isEmpty(column.sortOptions)) {
                    if(column.labelId == columnId) {
                        column.sortOptions.isSorted = true;
                        let _order = column.sortOptions.order;
                        if(column.sortOptions.order == GRID_CONSTANTS['GRID_CELL_SORT_ASC']) {
                            column.sortOptions.order = GRID_CONSTANTS['GRID_CELL_SORT_DESC'];
                        } else {
                            column.sortOptions.order = GRID_CONSTANTS['GRID_CELL_SORT_ASC'];
                        }
                        if(column.sortOptions.reverse) {
                            _order = column.sortOptions.order;
                        }

                        this.sortOptions = {
                          sortType: _order,
                          key: column.sortOptions.key,
                          dataType: column.sortOptions.dataType || 'number',
                          gridType: this.gridType.toUpperCase() + '_GRID'
                        };

                        // if (this.emitSort) {
                        //   this.onSort.emit(this.sortOptions);
                        // } else {
                          this._zephyrStore.dispatch(this._gridAction.sort({
                            sortType: _order,
                            key: column.sortOptions.key,
                            dataType: column.sortOptions.dataType || 'number'
                          }, this.gridType.toUpperCase() + '_GRID'));
                        // }
                        // this.onGridSort.emit(_.merge(column.sortOptions, _sortOptions));
                    } else {
                        column.sortOptions.isSorted = false;
                    }
                }
            });
            // this._zephyrStore.dispatch(this._gridAction.updateGridState(this.gridType, this._gridOptions));
        }
        this.triggerChange();
    }
    getTitle(elHtml, noTitle, index = -1) {
        let _title = jQuery(elHtml).text();

        if(jQuery(elHtml).find('.defect_link').length) {
            let defects = _title.split('D ')[1];
             _title = defects && defects.split(' ').join(', ');
             if(_title) {
                 _title = jQuery.trim(_title);
                 _title = _title.substring(0, _title.length - 1);
                 return _title;
             } else {
                 return '';
             }
        // } else if(jQuery(elHtml).parents('.testcaseIds').length) {
        //     let testcases : any = this.rows[index];
        //     return (testcases.testcaseNames || []).length ? 'Testcase summary:\r\n'+ testcases.testcaseNames.join('\r\n') : 'No Coverage';
          // let requirements : any = this.rows[index];
          // return ((requirements.testcase || {}).requirementNames || []).length ? 'Requirement summary:\r\n'+ requirements.testcase.requirementNames.join('\r\n') : 'No Coverage';
        }

        return _title;
    }
    check_all(isCheck) {
        if (Array.isArray(this._gridOptions['columns']) && this._gridOptions['columns'].length) {
            let check_all_element = jQuery(`#${this.check_name}_all`);
            check_all_element.prop('checked', isCheck);
            this.toggleAllSelection(check_all_element[0]);
        }
    }
    /**
     * toggle between select all and select none
     * Have to define the element name based on checkbox name
     */
    toggleAllSelection(target) {
        if (this.promptForSave()) {
            target.checked = !target.checked;
            return;
        }
        let _rowIds = [],
            _rows = this.rows,
            _secIds = [],
            _executionIds = [];

        // let rowName = 'testcase_select';
        let rowName = this.check_name;
        this.gridElement.find('input[name=' + rowName + ']').each((index, input) => {
            try {
                let _index = jQuery(input).closest('.flex-bar').data('index');
                let _key = this.keyOnRowSelect || this._gridOptions['columns'][0]['cell']['key'];

                let _id  = null;

                if (_key.indexOf('.') !== -1) {
                    _id = _rows[_index];
                    _key.split('.').forEach(k => {
                        _id = _id[k];
                    });
                } else {
                        _id = _rows[_index][_key];
                }
                if(this._gridOptions['secondaryId'] && this._gridOptions['secondaryId'].show) {
                    _secIds.push(_rows[_index][this._gridOptions['secondaryId'].key].id);
                }

                _rowIds.push(_id);

                _executionIds.push(_rows[_index]['executionId']);

            } catch(e) {
             //   // console.log(e);
            }
        });
        if(jQuery(target).prop('checked')) {
            this.gridElement.find('input[name=' + rowName + ']').prop('checked', true);
            this.rowIds = _.union(this.rowIds, _rowIds);

            this.executionIds = _.union(this.executionIds, _executionIds);

            if(this._gridOptions['secondaryId'] && this._gridOptions['secondaryId'].show) {
                this.secondaryIds = _.union(this.secondaryIds, _secIds);
            }
        } else {
            this.gridElement.find('input[name=' + rowName + ']').prop('checked', false);
            this.rowIds = _.difference(this.rowIds, _rowIds);

            this.executionIds = _.difference(this.executionIds, _executionIds);

            if(this._gridOptions['secondaryId'] && this._gridOptions['secondaryId'].show) {
                this.secondaryIds = _.difference(this.secondaryIds, _secIds);
            }
        }
        if(this._gridOptions['secondaryId'] && this._gridOptions['secondaryId'].show) {
            this.onGridRowSelection.emit([this.rowIds, this.secondaryIds, this.executionIds, jQuery(target).prop('checked')]);
        } else {
            this.onGridRowSelection.emit(this.rowIds);
        }

        setTimeout(() => {
            this.attachDraggableUI();
        }, 100);
    }
    toggleSelection(target) {
        if (this.promptForSave()) {
            target.checked = !target.checked;
            return;
        }
        let _rowIds = [],
            _rows = this.rows,
            _secIds = [],
            _executionIds = [];
        try {
            let _index = jQuery(target).closest('.flex-bar').data('index');
            let _key = this.keyOnRowSelect || this._gridOptions['columns'][0]['cell']['key'];
            let _id  = null;

            if (_key.indexOf('.') !== -1) {
                _id = _rows[_index];
                _key.split('.').forEach((k) => {
                    _id = _id[k];
                });
            } else {
                 _id = _rows[_index][_key];
            }
            if(this._gridOptions['secondaryId'] && this._gridOptions['secondaryId'].show) {
                _secIds.push(_rows[_index][this._gridOptions['secondaryId'].key].id);
            }

            _executionIds.push(_rows[_index]['executionId']);

            _rowIds.push(_id);
        } catch(e) {
          //  // console.log(e);
        }

        jQuery(target).parents('.flex-bar').trigger('click');

        if(jQuery(target).prop('checked')) {
            this.rowIds = _.union(this.rowIds, _rowIds);

            this.executionIds = _.union(this.executionIds, _executionIds);

            if(this._gridOptions['secondaryId'] && this._gridOptions['secondaryId'].show) {
                this.secondaryIds = _.union(this.secondaryIds, _secIds);
            }
        } else {
            this.rowIds = _.difference(this.rowIds, _rowIds);

            this.executionIds = _.difference(this.executionIds, _executionIds);

            if(this._gridOptions['secondaryId'] && this._gridOptions['secondaryId'].show) {
                this.secondaryIds = _.difference(this.secondaryIds, _secIds);
            }
        }

        this.initCheckboxSeletion();
        if(this._gridOptions['secondaryId'] && this._gridOptions['secondaryId'].show) {
            this.onGridRowSelection.emit([this.rowIds, this.secondaryIds, this.executionIds]);
        } else {
            this.onGridRowSelection.emit(this.rowIds);
        }

        setTimeout(() => {
            this.attachDraggableUI();
        }, 100);
    }
    getSortableClass(column) {
        let _className = '';
        if(column.sortable) {
            if(column.sortOptions.order == GRID_CONSTANTS['GRID_CELL_SORT_ASC']) {
                _className = 'zui-grid-sort-icon fa fa-1 fa-sort-' + GRID_CONSTANTS['GRID_CELL_SORT_DESC'];
            } else {
                _className = 'zui-grid-sort-icon fa fa-1 fa-sort-' + GRID_CONSTANTS['GRID_CELL_SORT_ASC'];
            }
            if(column.sortOptions.isSorted)
                _className += ' active';
        }

        return _className;
    }
    /**
     * Show/hide action buttons
     */
    showActionIcons(row, action) {
        return ((action.show) || _.result(row, action.key));
    }

    checkIfActionDisabled(row, action) {
      return !(!row.hideActions || (row.hideActions && row.hideActions.indexOf(action.name) === -1));
    }
    /**
     * Set grid options
     * clear the event
     */
    setGridOptions(gridOptions, event) {
        try {
            this._gridOptions = JSON.parse(JSON.stringify(gridOptions));

            if (this.hideCheckAll) {
              let index = _.findIndex(this._gridOptions.columns, {'labelClass': 'grid_checkbox_all'});

              if (index !== -1) {
                this._gridOptions.columns.splice(index, 1);
              }

            }

            this._gridOptions.columns.forEach((col) => {

              if (col.labelName.toLocaleLowerCase() === "id") {
                col.isId = true;
              }

            });

            if (this.hideCoverage) {
              let index = _.findIndex(this._gridOptions.columns, {labelName : 'Coverage'});

              if (index >= 0) {
                this._gridOptions.columns.splice(index, 1);
              }

            }

            jQuery(`#grid-table-${this.gridType} .flex-bar`).each((index, element) => {
                if (jQuery(element).draggable('instance')) {
                    jQuery(element).draggable('destroy');
                }
            });
            if(event) {
                this._zephyrStore.dispatch(this._gridAction.clearGridEvents(event));
            }
        } catch (err) {
            //// console.log(err, 'error setting grid options', gridOptions, this.gridType);
        }
    }
    setConfirm() {
        this.confirmTimeout = setTimeout(() => {
            this.confirmTimeout = null;
            this.isConfirmVisible = false;
        }, 50);
    }
    promptForSave(ui = false) {
        if (this.isConfirmVisible) {
            clearTimeout(this.confirmTimeout);
            this.setConfirm();
            return;
        }
        let isDirty = this._zephyrStore.getState().global.isDirty;
        if (this.doDirtyCheck && isDirty) {
            this.isConfirmVisible = true;
            if (!confirm('There is unsaved data in the testcase. Are you sure you want to continue?')) {
                if (ui) {
                    this.onDragEnd.emit(ui);
                }
                this.setConfirm();
                return true;
            }
            if (ui) {
                this.onDragEnd.emit(ui);
            }
            this.setConfirm();
            this._zephyrStore.dispatch(this.globalAction.clearDirtyCheck());
            return false;
        }
        return false;

    }
    getToggleClass(row) {
        let _toggleClass = 'zui-toggle';
        if(parseInt(row.id) <= 10) {
            _toggleClass += ' disabled';
        }
        return _toggleClass;
    }
    isToggleOn(row) {
        if (row && row.active == 'true') {
            return true;
        }
        return false;
    }

    escapeTags(pieces, ...substitutions) {
        // console.log(string, val);
        let reEscape = /[&<>'"]/g,
            oEscape = {
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              "'": '&#39;',
              '"': '&quot;'
            };

        let fnEscape = m => oEscape[m];
        let result = substitutions.map((substitution, index) => String.prototype.replace.call(substitution, reEscape, fnEscape) + pieces[index + 1]);

        return pieces[0] + result.join('');
    }


    resetPrefs() {
      jQuery(`#reset-warning-popup-${this.gridType}`).modal('show');
    }

    resetPrefsConfirmClose() {
      jQuery(`#reset-warning-popup-${this.gridType}`).modal('hide');
    }

    resetPrefsConfirm() {
      this.resetPrefsConfirmClose();
      this.dataSavedInDB = false;
      this.toastrService.info('Grid state reset successfully');
      this._zephyrStore.dispatch(this._gridAction.resetInitialGridState(this.gridType));
    }

    getTextField(val) {
        // replace new line character by <br> and wrap each line in span
        // escaping tags using tagged template literals to allow HTML unsafe characters
        // console.log('value is', val);
        return (val || '').split(/\r|\n/).map(item => '<span>' + this.escapeTags`${item}` + '</span>').join('<br/>');
    }
    triggerChange() {
        if (this.changeDetectionDebounce) {
            clearTimeout(this.changeDetectionDebounce);
        }
        let firstDetection = !this.changeDetectionDebounce;
        this.changeDetectionDebounce = setTimeout(() => {
            this.changeDetectionDebounce = null;
            if(this.cdr) { this.cdr.markForCheck(); }
        }, firstDetection ? 200 : 300);
    }
}
