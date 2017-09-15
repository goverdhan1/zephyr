/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../app/view/components/tce/operations/tce_bulk_operations.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '../../../../../../app/view/components/tce/operations/tce_execute_multiple.component';
import * as import10 from './tce_execute_multiple.component.ngfactory';
import * as import11 from '@angular/core/src/linker/view_container';
import * as import12 from '../../../../../../app/actions/testcaseExecution.action';
import * as import13 from '../../../../../../app/actions/notification.action';
import * as import14 from '@angular/core/src/zone/ng_zone';
import * as import15 from '../../../../../../app/services/toastr.service';
import * as import16 from '@angular/core/src/linker/query_list';
import * as import17 from '../../../../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import18 from '../../../../../../app/view/components/tce/operations/tce_export.component';
import * as import19 from './tce_export.component.ngfactory';
import * as import20 from '@angular/core/src/linker/template_ref';
import * as import21 from '@angular/common/src/directives/ng_if';
export class Wrapper_TceBulkOperationsComponent {
  /*private*/ _eventHandler:Function;
  context:import0.TceBulkOperationsComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  /*private*/ _expr_4:any;
  /*private*/ _expr_5:any;
  /*private*/ _expr_6:any;
  /*private*/ _expr_7:any;
  /*private*/ _expr_8:any;
  /*private*/ _expr_9:any;
  /*private*/ _expr_10:any;
  /*private*/ _expr_11:any;
  /*private*/ _expr_12:any;
  /*private*/ _expr_13:any;
  /*private*/ _expr_14:any;
  constructor() {
    this._changed = false;
    this.context = new import0.TceBulkOperationsComponent();
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
    this._expr_2 = import1.UNINITIALIZED;
    this._expr_3 = import1.UNINITIALIZED;
    this._expr_4 = import1.UNINITIALIZED;
    this._expr_5 = import1.UNINITIALIZED;
    this._expr_6 = import1.UNINITIALIZED;
    this._expr_7 = import1.UNINITIALIZED;
    this._expr_8 = import1.UNINITIALIZED;
    this._expr_9 = import1.UNINITIALIZED;
    this._expr_10 = import1.UNINITIALIZED;
    this._expr_11 = import1.UNINITIALIZED;
    this._expr_12 = import1.UNINITIALIZED;
    this._expr_13 = import1.UNINITIALIZED;
    this._expr_14 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
  }
  check_isSearchView(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.isSearchView = currValue;
      this._expr_0 = currValue;
    }
  }
  check_isMenuShown(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.isMenuShown = currValue;
      this._expr_1 = currValue;
    }
  }
  check_tcrCatalogTreeId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_2,currValue))) {
      this._changed = true;
      this.context.tcrCatalogTreeId = currValue;
      this._expr_2 = currValue;
    }
  }
  check_tcrCatalogTreeName(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_3,currValue))) {
      this._changed = true;
      this.context.tcrCatalogTreeName = currValue;
      this._expr_3 = currValue;
    }
  }
  check_tctIds(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_4,currValue))) {
      this._changed = true;
      this.context.tctIds = currValue;
      this._expr_4 = currValue;
    }
  }
  check_testcaseIds(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_5,currValue))) {
      this._changed = true;
      this.context.testcaseIds = currValue;
      this._expr_5 = currValue;
    }
  }
  check_releaseId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_6,currValue))) {
      this._changed = true;
      this.context.releaseId = currValue;
      this._expr_6 = currValue;
    }
  }
  check_tceGridRows(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_7,currValue))) {
      this._changed = true;
      this.context.tceGridRows = currValue;
      this._expr_7 = currValue;
    }
  }
  check_executionIds(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_8,currValue))) {
      this._changed = true;
      this.context.executionIds = currValue;
      this._expr_8 = currValue;
    }
  }
  check_exportPrefix(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_9,currValue))) {
      this._changed = true;
      this.context.exportPrefix = currValue;
      this._expr_9 = currValue;
    }
  }
  check_fieldOptions(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_10,currValue))) {
      this._changed = true;
      this.context.fieldOptions = currValue;
      this._expr_10 = currValue;
    }
  }
  check_statuses(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_11,currValue))) {
      this._changed = true;
      this.context.statuses = currValue;
      this._expr_11 = currValue;
    }
  }
  check_isAdvancedSearch(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_12,currValue))) {
      this._changed = true;
      this.context.isAdvancedSearch = currValue;
      this._expr_12 = currValue;
    }
  }
  check_searchText(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_13,currValue))) {
      this._changed = true;
      this.context.searchText = currValue;
      this._expr_13 = currValue;
    }
  }
  check_inRelease(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_14,currValue))) {
      this._changed = true;
      this.context.inRelease = currValue;
      this._expr_14 = currValue;
    }
  }
  ngDoCheck(view:import2.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this._changed;
    this._changed = false;
    return changed;
  }
  checkHost(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any,throwOnChange:boolean):void {
  }
  handleEvent(eventName:string,$event:any):boolean {
    var result:boolean = true;
    return result;
  }
  subscribe(view:import2.AppView<any>,_eventHandler:any):void {
    this._eventHandler = _eventHandler;
  }
}
var renderType_TceBulkOperationsComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_TceBulkOperationsComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.TceBulkOperationsComponent>;
  _TceBulkOperationsComponent_0_3:Wrapper_TceBulkOperationsComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_TceBulkOperationsComponent_Host0,renderType_TceBulkOperationsComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zui-tce-bulk-operations',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_TceBulkOperationsComponent0(this.viewUtils,this,0,this._el_0);
    this._TceBulkOperationsComponent_0_3 = new Wrapper_TceBulkOperationsComponent();
    this.compView_0.create(this._TceBulkOperationsComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._TceBulkOperationsComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.TceBulkOperationsComponent) && (0 === requestNodeIndex))) { return this._TceBulkOperationsComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._TceBulkOperationsComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const TceBulkOperationsComponentNgFactory:import8.ComponentFactory<import0.TceBulkOperationsComponent> = new import8.ComponentFactory<import0.TceBulkOperationsComponent>('zui-tce-bulk-operations',View_TceBulkOperationsComponent_Host0,import0.TceBulkOperationsComponent);
const styles_TceBulkOperationsComponent:any[] = ([] as any[]);
class View_TceBulkOperationsComponent1 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import9.TceExecuteMultipleComponent>;
  _TceExecuteMultipleComponent_0_3:import10.Wrapper_TceExecuteMultipleComponent;
  _text_1:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import11.ViewContainer) {
    super(View_TceBulkOperationsComponent1,renderType_TceBulkOperationsComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'zee-execute-multiple-dialog-tce',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_0 = new import10.View_TceExecuteMultipleComponent0(this.viewUtils,this,0,this._el_0);
    this._TceExecuteMultipleComponent_0_3 = new import10.Wrapper_TceExecuteMultipleComponent(this.parentView.parentView.injectorGet(import12.TestcaseExecutionAction,this.parentView.parentIndex),this.parentView.parentView.injectorGet(import13.NotificationAction,this.parentView.parentIndex),this.parentView.parentView.injectorGet(import14.NgZone,this.parentView.parentIndex),this.parentView.parentView.injectorGet(import15.ToastrService,this.parentView.parentIndex));
    this._text_1 = this.renderer.createText((null as any),'\n    ',(null as any));
    this.compView_0.create(this._TceExecuteMultipleComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import9.TceExecuteMultipleComponent) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) { return this._TceExecuteMultipleComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = this.parentView.context.releaseId;
    this._TceExecuteMultipleComponent_0_3.check_releaseId(currVal_0_0_0,throwOnChange,false);
    const currVal_0_0_1:any = this.parentView.context.testcaseIds;
    this._TceExecuteMultipleComponent_0_3.check_testcaseIds(currVal_0_0_1,throwOnChange,false);
    const currVal_0_0_2:any = this.parentView.context.tceGridRows;
    this._TceExecuteMultipleComponent_0_3.check_tceGridRows(currVal_0_0_2,throwOnChange,false);
    const currVal_0_0_3:any = this.parentView.context.tcrCatalogTreeName;
    this._TceExecuteMultipleComponent_0_3.check_tcrCatalogTreeName(currVal_0_0_3,throwOnChange,false);
    const currVal_0_0_4:any = this.parentView.context.tcrCatalogTreeId;
    this._TceExecuteMultipleComponent_0_3.check_tcrCatalogTreeId(currVal_0_0_4,throwOnChange,false);
    const currVal_0_0_5:any = this.parentView.context.executionIds;
    this._TceExecuteMultipleComponent_0_3.check_executionIds(currVal_0_0_5,throwOnChange,false);
    const currVal_0_0_6:any = this.parentView.context.statuses;
    this._TceExecuteMultipleComponent_0_3.check_statuses(currVal_0_0_6,throwOnChange,false);
    this._TceExecuteMultipleComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._TceExecuteMultipleComponent_0_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._TceExecuteMultipleComponent_0_3.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
var renderType_TceBulkOperationsComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_TceBulkOperationsComponent,{});
export class View_TceBulkOperationsComponent0 extends import2.AppView<import0.TceBulkOperationsComponent> {
  _viewQuery_TceExportComponent_0:import16.QueryList<any>;
  _el_0:any;
  _text_1:any;
  _anchor_2:any;
  /*private*/ _vc_2:import11.ViewContainer;
  _TemplateRef_2_5:any;
  _NgIf_2_6:import17.Wrapper_NgIf;
  _text_3:any;
  _el_4:any;
  compView_4:import2.AppView<import18.TceExportComponent>;
  _TceExportComponent_4_3:import19.Wrapper_TceExportComponent;
  _text_5:any;
  _text_6:any;
  /*private*/ _expr_13:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_TceBulkOperationsComponent0,renderType_TceBulkOperationsComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
    this._expr_13 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._viewQuery_TceExportComponent_0 = new import16.QueryList<any>();
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n    ',(null as any));
    this._anchor_2 = this.renderer.createTemplateAnchor(this._el_0,(null as any));
    this._vc_2 = new import11.ViewContainer(2,0,this,this._anchor_2);
    this._TemplateRef_2_5 = new import20.TemplateRef_(this,2,this._anchor_2);
    this._NgIf_2_6 = new import17.Wrapper_NgIf(this._vc_2.vcRef,this._TemplateRef_2_5);
    this._text_3 = this.renderer.createText(this._el_0,'\n    ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_0,'zee-export-dialog-tce',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_4 = new import19.View_TceExportComponent0(this.viewUtils,this,4,this._el_4);
    this._TceExportComponent_4_3 = new import19.Wrapper_TceExportComponent();
    this.compView_4.create(this._TceExportComponent_4_3.context);
    this._text_5 = this.renderer.createText(this._el_0,'\n',(null as any));
    this._text_6 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._viewQuery_TceExportComponent_0.reset([this._TceExportComponent_4_3.context]);
    this.context.tceExport = this._viewQuery_TceExportComponent_0.first;
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._anchor_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._text_6
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import20.TemplateRef) && (2 === requestNodeIndex))) { return this._TemplateRef_2_5; }
    if (((token === import21.NgIf) && (2 === requestNodeIndex))) { return this._NgIf_2_6.context; }
    if (((token === import18.TceExportComponent) && (4 === requestNodeIndex))) { return this._TceExportComponent_4_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_2_0_0:boolean = !this.context.isSearchView;
    this._NgIf_2_6.check_ngIf(currVal_2_0_0,throwOnChange,false);
    this._NgIf_2_6.ngDoCheck(this,this._anchor_2,throwOnChange);
    const currVal_4_0_0:any = this.context.tceBulkOptions['export'];
    this._TceExportComponent_4_3.check_fieldOptions(currVal_4_0_0,throwOnChange,false);
    const currVal_4_0_1:any = this.context.testcaseIds;
    this._TceExportComponent_4_3.check_testcaseIds(currVal_4_0_1,throwOnChange,false);
    const currVal_4_0_2:any = this.context.tcrCatalogTreeId;
    this._TceExportComponent_4_3.check_tcrCatalogTreeId(currVal_4_0_2,throwOnChange,false);
    const currVal_4_0_3:boolean = !this.context.isMenuShown;
    this._TceExportComponent_4_3.check_isDisabled(currVal_4_0_3,throwOnChange,false);
    const currVal_4_0_4:any = this.context.releaseId;
    this._TceExportComponent_4_3.check_releaseId(currVal_4_0_4,throwOnChange,false);
    const currVal_4_0_5:any = this.context.executionIds;
    this._TceExportComponent_4_3.check_executionIds(currVal_4_0_5,throwOnChange,false);
    const currVal_4_0_6:any = this.context.exportPrefix;
    this._TceExportComponent_4_3.check_exportPrefix(currVal_4_0_6,throwOnChange,false);
    const currVal_4_0_7:any = this.context.isSearchView;
    this._TceExportComponent_4_3.check_isSearchView(currVal_4_0_7,throwOnChange,false);
    const currVal_4_0_8:any = this.context.isAdvancedSearch;
    this._TceExportComponent_4_3.check_isAdvancedSearch(currVal_4_0_8,throwOnChange,false);
    const currVal_4_0_9:any = this.context.searchText;
    this._TceExportComponent_4_3.check_searchText(currVal_4_0_9,throwOnChange,false);
    const currVal_4_0_10:any = this.context.inRelease;
    this._TceExportComponent_4_3.check_inRelease(currVal_4_0_10,throwOnChange,false);
    this._TceExportComponent_4_3.ngDoCheck(this,this._el_4,throwOnChange);
    this._vc_2.detectChangesInNestedViews(throwOnChange);
    const currVal_13:any = 'zee-primary-buttons';
    if (import3.checkBinding(throwOnChange,this._expr_13,currVal_13)) {
      this.renderer.setElementProperty(this._el_0,'className',currVal_13);
      this._expr_13 = currVal_13;
    }
    this.compView_4.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._TceExportComponent_4_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this._vc_2.destroyNestedViews();
    this.compView_4.destroy();
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 2)) { return new View_TceBulkOperationsComponent1(this.viewUtils,this,2,this._anchor_2,this._vc_2); }
    return (null as any);
  }
}