/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../app/view/components/common/inline-table-zql/inline-table-zql';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '../../../../../../app/actions/requirements.action';
import * as import7 from '@angular/core/src/linker/view_type';
import * as import8 from '@angular/core/src/change_detection/constants';
import * as import9 from '@angular/core/src/linker/component_factory';
import * as import10 from '@angular/http/src/http';
import * as import11 from '../../../../../../app/view/components/grid/grid.component';
import * as import12 from '../../../../../../app/actions/grid.action';
import * as import13 from '../../../../../../app/actions/global.action';
import * as import14 from '../../../../../../app/utils/scripts/utils';
import * as import15 from '../../grid/grid.component.ngfactory';
import * as import16 from '@angular/core/src/linker/view_container';
import * as import17 from '../../../../../../app/services/pouch.db.service';
import * as import18 from '@angular/core/src/linker/element_ref';
import * as import19 from '@angular/core/src/zone/ng_zone';
import * as import20 from '@angular/router/src/router';
import * as import21 from '../../../../../../app/services/toastr.service';
import * as import22 from '../../../../../../app/view/components/common/search/zephyr_search.component';
import * as import23 from '../search/zephyr_search.component.ngfactory';
import * as import24 from '../../../../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import25 from '@angular/core/src/linker/template_ref';
import * as import26 from '@angular/common/src/directives/ng_if';
import * as import27 from '@angular/core/src/linker/query_list';
import * as import28 from '../inline_dialog/inline_table.directive.ngfactory';
import * as import29 from '../../../../../node_modules/@angular/common/src/directives/ng_class.ngfactory';
import * as import30 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import31 from '@angular/core/src/change_detection/differs/keyvalue_differs';
import * as import32 from '@angular/common/src/directives/ng_class';
import * as import33 from '../../../../../../app/view/components/common/inline_dialog/inline_table.directive';
export class Wrapper_InlineTableZQLComponent {
  /*private*/ _eventHandler:Function;
  context:import0.InlineTableZQLComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  /*private*/ _expr_4:any;
  /*private*/ _expr_5:any;
  subscription0:any;
  constructor(p0:any) {
    this._changed = false;
    this.context = new import0.InlineTableZQLComponent(p0);
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
    this._expr_2 = import1.UNINITIALIZED;
    this._expr_3 = import1.UNINITIALIZED;
    this._expr_4 = import1.UNINITIALIZED;
    this._expr_5 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    this.context.ngOnDestroy();
    (this.subscription0 && this.subscription0.unsubscribe());
  }
  check_parentId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.parentId = currValue;
      this._expr_0 = currValue;
    }
  }
  check_releaseId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.releaseId = currValue;
      this._expr_1 = currValue;
    }
  }
  check_columns(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_2,currValue))) {
      this._changed = true;
      this.context.columns = currValue;
      this._expr_2 = currValue;
    }
  }
  check_searchOn(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_3,currValue))) {
      this._changed = true;
      this.context.searchOn = currValue;
      this._expr_3 = currValue;
    }
  }
  check_key(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_4,currValue))) {
      this._changed = true;
      this.context.key = currValue;
      this._expr_4 = currValue;
    }
  }
  check_selectedOptions(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_5,currValue))) {
      this._changed = true;
      this.context.selectedOptions = currValue;
      this._expr_5 = currValue;
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
  subscribe(view:import2.AppView<any>,_eventHandler:any,emit0:boolean):void {
    this._eventHandler = _eventHandler;
    if (emit0) { (this.subscription0 = this.context.onRowSelection.subscribe(_eventHandler.bind(view,'onRowSelection'))); }
  }
}
var renderType_InlineTableZQLComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_InlineTableZQLComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.InlineTableZQLComponent>;
  _RequirementsAction_0_3:import6.RequirementsAction;
  _InlineTableZQLComponent_0_4:Wrapper_InlineTableZQLComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_InlineTableZQLComponent_Host0,renderType_InlineTableZQLComponent_Host,import7.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import8.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import9.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zui-inline-table-zql',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_InlineTableZQLComponent0(this.viewUtils,this,0,this._el_0);
    this._RequirementsAction_0_3 = new import6.RequirementsAction(this.injectorGet(import10.Http,this.parentIndex));
    this._InlineTableZQLComponent_0_4 = new Wrapper_InlineTableZQLComponent(this._RequirementsAction_0_3);
    this.compView_0.create(this._InlineTableZQLComponent_0_4.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import9.ComponentRef_<any>(0,this,this._el_0,this._InlineTableZQLComponent_0_4.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import6.RequirementsAction) && (0 === requestNodeIndex))) { return this._RequirementsAction_0_3; }
    if (((token === import0.InlineTableZQLComponent) && (0 === requestNodeIndex))) { return this._InlineTableZQLComponent_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._InlineTableZQLComponent_0_4.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._InlineTableZQLComponent_0_4.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._InlineTableZQLComponent_0_4.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const InlineTableZQLComponentNgFactory:import9.ComponentFactory<import0.InlineTableZQLComponent> = new import9.ComponentFactory<import0.InlineTableZQLComponent>('zui-inline-table-zql',View_InlineTableZQLComponent_Host0,import0.InlineTableZQLComponent);
const styles_InlineTableZQLComponent:any[] = ([] as any[]);
class View_InlineTableZQLComponent2 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import11.GridComponent>;
  _GridAction_0_3:import12.GridAction;
  _GlobalAction_0_4:import13.GlobalAction;
  _UtililtyFunctions_0_5:import14.UtililtyFunctions;
  _GridComponent_0_6:import15.Wrapper_GridComponent;
  _text_1:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import16.ViewContainer) {
    super(View_InlineTableZQLComponent2,renderType_InlineTableZQLComponent,import7.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import8.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
  }
  createInternal(rootSelector:string):import9.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'grid',new import3.InlineArray2(2,'class','req-grid-table'),(null as any));
    this.compView_0 = new import15.View_GridComponent0(this.viewUtils,this,0,this._el_0);
    this._GridAction_0_3 = new import12.GridAction(this.parentView.parentView.parentView.injectorGet(import10.Http,this.parentView.parentView.parentIndex),this.parentView.parentView.parentView.injectorGet(import17.PouchDBPrefsServices,this.parentView.parentView.parentIndex));
    this._GlobalAction_0_4 = new import13.GlobalAction(this.parentView.parentView.parentView.injectorGet(import10.Http,this.parentView.parentView.parentIndex));
    this._UtililtyFunctions_0_5 = new import14.UtililtyFunctions();
    this._GridComponent_0_6 = new import15.Wrapper_GridComponent(this._GridAction_0_3,this._GlobalAction_0_4,new import18.ElementRef(this._el_0),this._UtililtyFunctions_0_5,this.compView_0.ref,this.parentView.parentView.parentView.injectorGet(import19.NgZone,this.parentView.parentView.parentIndex),this.parentView.parentView.parentView.injectorGet(import20.Router,this.parentView.parentView.parentIndex),this.parentView.parentView.parentView.injectorGet(import17.PouchDBPrefsServices,this.parentView.parentView.parentIndex),this.parentView.parentView.parentView.injectorGet(import21.ToastrService,this.parentView.parentView.parentIndex));
    this._text_1 = this.renderer.createText((null as any),'\n        ',(null as any));
    this.compView_0.create(this._GridComponent_0_6.context);
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_0,new import3.InlineArray16(12,'onGridRowSelection',(null as any),'onGridPrevClick',(null as any),'onGridNextClick',(null as any),'onGridPaginateByIndex',(null as any),'onGridPageSizeChange',(null as any),'onGridLinkClick',(null as any)),this.eventHandler(this.handleEvent_0));
    this._GridComponent_0_6.subscribe(this,this.eventHandler(this.handleEvent_0),false,true,true,true,false,false,true,false,false,true,true,false,false,false,false,false,false);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1
    ]
    ),[disposable_0]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import12.GridAction) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) { return this._GridAction_0_3; }
    if (((token === import13.GlobalAction) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) { return this._GlobalAction_0_4; }
    if (((token === import14.UtililtyFunctions) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) { return this._UtililtyFunctions_0_5; }
    if (((token === import11.GridComponent) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) { return this._GridComponent_0_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = this.parentView.parentView.context.viewReqGridRows;
    this._GridComponent_0_6.check_rows(currVal_0_0_0,throwOnChange,false);
    const currVal_0_0_1:any = this.parentView.parentView.context._reqGridType;
    this._GridComponent_0_6.check_gridType(currVal_0_0_1,throwOnChange,false);
    const currVal_0_0_2:any = this.parentView.parentView.context.selectedOptions;
    this._GridComponent_0_6.check_rowIds(currVal_0_0_2,throwOnChange,false);
    const currVal_0_0_3:any = this.parentView.parentView.context.paginationOptions;
    this._GridComponent_0_6.check_paginationOptions(currVal_0_0_3,throwOnChange,false);
    this._GridComponent_0_6.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._GridComponent_0_6.context.ngAfterViewInit(); } }
  }
  dirtyParentQueriesInternal():void {
    (<View_InlineTableZQLComponent0>this.parentView.parentView)._viewQuery_GridComponent_0.setDirty();
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._GridComponent_0_6.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  handleEvent_0(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'onGridRowSelection')) {
      const pd_sub_0:any = ((<any>this.parentView.parentView.context.reqGridRowSelection($event)) !== false);
      result = (pd_sub_0 && result);
    }
    if ((eventName == 'onGridPrevClick')) {
      const pd_sub_1:any = ((<any>this.parentView.parentView.context.reqGridPrevClick($event)) !== false);
      result = (pd_sub_1 && result);
    }
    if ((eventName == 'onGridNextClick')) {
      const pd_sub_2:any = ((<any>this.parentView.parentView.context.reqGridNextClick($event)) !== false);
      result = (pd_sub_2 && result);
    }
    if ((eventName == 'onGridPaginateByIndex')) {
      const pd_sub_3:any = ((<any>this.parentView.parentView.context.reqGridPaginateByIndex($event)) !== false);
      result = (pd_sub_3 && result);
    }
    if ((eventName == 'onGridPageSizeChange')) {
      const pd_sub_4:any = ((<any>this.parentView.parentView.context.reqGridPageSizeChange($event)) !== false);
      result = (pd_sub_4 && result);
    }
    if ((eventName == 'onGridLinkClick')) {
      const pd_sub_5:any = ((<any>this.parentView.parentView.context.reqGridLinkClick($event)) !== false);
      result = (pd_sub_5 && result);
    }
    return result;
  }
}
class View_InlineTableZQLComponent3 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _text_4:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import16.ViewContainer) {
    super(View_InlineTableZQLComponent3,renderType_InlineTableZQLComponent,import7.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import8.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
  }
  createInternal(rootSelector:string):import9.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'h3',new import3.InlineArray2(2,'class','component-heading zee-content-title text-center config-error'),(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n          Please select a release to search requirements.\n        ',(null as any));
    this._text_4 = this.renderer.createText(this._el_0,'\n      ',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._text_4
    ]
    ),(null as any));
    return (null as any);
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
class View_InlineTableZQLComponent1 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _el_8:any;
  compView_8:import2.AppView<import22.ZephyrSearchComponent>;
  _ZephyrSearchComponent_8_3:import23.Wrapper_ZephyrSearchComponent;
  _text_9:any;
  _text_10:any;
  _text_11:any;
  _el_12:any;
  _text_13:any;
  _el_14:any;
  _text_15:any;
  _text_16:any;
  _text_17:any;
  _text_18:any;
  _text_19:any;
  _text_20:any;
  _text_21:any;
  _text_22:any;
  _text_23:any;
  _text_24:any;
  _text_25:any;
  _text_26:any;
  _text_27:any;
  _text_28:any;
  _text_29:any;
  _text_30:any;
  _text_31:any;
  _text_32:any;
  _text_33:any;
  _text_34:any;
  _text_35:any;
  _text_36:any;
  _text_37:any;
  _text_38:any;
  _text_39:any;
  _text_40:any;
  _text_41:any;
  _text_42:any;
  _text_43:any;
  _text_44:any;
  _text_45:any;
  _text_46:any;
  _text_47:any;
  _text_48:any;
  _text_49:any;
  _text_50:any;
  _text_51:any;
  _anchor_52:any;
  /*private*/ _vc_52:import16.ViewContainer;
  _TemplateRef_52_5:any;
  _NgIf_52_6:import24.Wrapper_NgIf;
  _text_53:any;
  _anchor_54:any;
  /*private*/ _vc_54:import16.ViewContainer;
  _TemplateRef_54_5:any;
  _NgIf_54_6:import24.Wrapper_NgIf;
  _text_55:any;
  /*private*/ _expr_64:any;
  /*private*/ _expr_65:any;
  /*private*/ _expr_66:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import16.ViewContainer) {
    super(View_InlineTableZQLComponent1,renderType_InlineTableZQLComponent,import7.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import8.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_64 = import1.UNINITIALIZED;
    this._expr_65 = import1.UNINITIALIZED;
    this._expr_66 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import9.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n\n          ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'section',new import3.InlineArray2(2,'class','zui-search-details-container'),(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'\n            ',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_4,'div',new import3.InlineArray4(4,'class','zee-layout','style','padding: 10px;'),(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'\n              ',(null as any));
    this._el_8 = import3.createRenderElement(this.renderer,this._el_6,'zui-zephyr-search',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_8 = new import23.View_ZephyrSearchComponent0(this.viewUtils,this,8,this._el_8);
    this._ZephyrSearchComponent_8_3 = new import23.Wrapper_ZephyrSearchComponent();
    this.compView_8.create(this._ZephyrSearchComponent_8_3.context);
    this._text_9 = this.renderer.createText(this._el_6,'\n            ',(null as any));
    this._text_10 = this.renderer.createText(this._el_4,'\n          ',(null as any));
    this._text_11 = this.renderer.createText(this._el_2,'\n\n          ',(null as any));
    this._el_12 = import3.createRenderElement(this.renderer,this._el_2,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_13 = this.renderer.createText(this._el_12,'\n            ',(null as any));
    this._el_14 = import3.createRenderElement(this.renderer,this._el_12,'button',new import3.InlineArray4(4,'class','close','type','button'),(null as any));
    this._text_15 = this.renderer.createText(this._el_14,'×',(null as any));
    this._text_16 = this.renderer.createText(this._el_12,'\n          ',(null as any));
    this._text_17 = this.renderer.createText(this._el_2,'\n        ',(null as any));
    this._text_18 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this._text_19 = this.renderer.createText(this._el_0,'\n          ',(null as any));
    this._text_20 = this.renderer.createText(this._el_0,'\n            ',(null as any));
    this._text_21 = this.renderer.createText(this._el_0,'\n              ',(null as any));
    this._text_22 = this.renderer.createText(this._el_0,'\n                ',(null as any));
    this._text_23 = this.renderer.createText(this._el_0,'\n                  ',(null as any));
    this._text_24 = this.renderer.createText(this._el_0,'\n                    ',(null as any));
    this._text_25 = this.renderer.createText(this._el_0,'\n                           ',(null as any));
    this._text_26 = this.renderer.createText(this._el_0,'\n                    ',(null as any));
    this._text_27 = this.renderer.createText(this._el_0,'\n                  ',(null as any));
    this._text_28 = this.renderer.createText(this._el_0,'\n                ',(null as any));
    this._text_29 = this.renderer.createText(this._el_0,'\n                ',(null as any));
    this._text_30 = this.renderer.createText(this._el_0,'\n                ',(null as any));
    this._text_31 = this.renderer.createText(this._el_0,'\n              ',(null as any));
    this._text_32 = this.renderer.createText(this._el_0,'\n            ',(null as any));
    this._text_33 = this.renderer.createText(this._el_0,'\n            ',(null as any));
    this._text_34 = this.renderer.createText(this._el_0,'\n              ',(null as any));
    this._text_35 = this.renderer.createText(this._el_0,'\n                ',(null as any));
    this._text_36 = this.renderer.createText(this._el_0,'\n                  ',(null as any));
    this._text_37 = this.renderer.createText(this._el_0,'\n                    ',(null as any));
    this._text_38 = this.renderer.createText(this._el_0,'\n                    ',(null as any));
    this._text_39 = this.renderer.createText(this._el_0,'\n                  ',(null as any));
    this._text_40 = this.renderer.createText(this._el_0,'\n                ',(null as any));
    this._text_41 = this.renderer.createText(this._el_0,'\n                ',(null as any));
    this._text_42 = this.renderer.createText(this._el_0,'\n                ',(null as any));
    this._text_43 = this.renderer.createText(this._el_0,'\n              ',(null as any));
    this._text_44 = this.renderer.createText(this._el_0,'\n            ',(null as any));
    this._text_45 = this.renderer.createText(this._el_0,'\n          ',(null as any));
    this._text_46 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this._text_47 = this.renderer.createText(this._el_0,'\n\n        ',(null as any));
    this._text_48 = this.renderer.createText(this._el_0,'\n          ',(null as any));
    this._text_49 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this._text_50 = this.renderer.createText(this._el_0,'\n      ',(null as any));
    this._text_51 = this.renderer.createText(this._el_0,'\n\n        ',(null as any));
    this._anchor_52 = this.renderer.createTemplateAnchor(this._el_0,(null as any));
    this._vc_52 = new import16.ViewContainer(52,0,this,this._anchor_52);
    this._TemplateRef_52_5 = new import25.TemplateRef_(this,52,this._anchor_52);
    this._NgIf_52_6 = new import24.Wrapper_NgIf(this._vc_52.vcRef,this._TemplateRef_52_5);
    this._text_53 = this.renderer.createText(this._el_0,'\n\n      ',(null as any));
    this._anchor_54 = this.renderer.createTemplateAnchor(this._el_0,(null as any));
    this._vc_54 = new import16.ViewContainer(54,0,this,this._anchor_54);
    this._TemplateRef_54_5 = new import25.TemplateRef_(this,54,this._anchor_54);
    this._NgIf_54_6 = new import24.Wrapper_NgIf(this._vc_54.vcRef,this._TemplateRef_54_5);
    this._text_55 = this.renderer.createText(this._el_0,'\n\n    ',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_8,new import3.InlineArray2(2,'onSearchGo',(null as any)),this.eventHandler(this.handleEvent_8));
    this._ZephyrSearchComponent_8_3.subscribe(this,this.eventHandler(this.handleEvent_8),true);
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_14,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_14));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._el_6,
      this._text_7,
      this._el_8,
      this._text_9,
      this._text_10,
      this._text_11,
      this._el_12,
      this._text_13,
      this._el_14,
      this._text_15,
      this._text_16,
      this._text_17,
      this._text_18,
      this._text_19,
      this._text_20,
      this._text_21,
      this._text_22,
      this._text_23,
      this._text_24,
      this._text_25,
      this._text_26,
      this._text_27,
      this._text_28,
      this._text_29,
      this._text_30,
      this._text_31,
      this._text_32,
      this._text_33,
      this._text_34,
      this._text_35,
      this._text_36,
      this._text_37,
      this._text_38,
      this._text_39,
      this._text_40,
      this._text_41,
      this._text_42,
      this._text_43,
      this._text_44,
      this._text_45,
      this._text_46,
      this._text_47,
      this._text_48,
      this._text_49,
      this._text_50,
      this._text_51,
      this._anchor_52,
      this._text_53,
      this._anchor_54,
      this._text_55
    ]
    ),[
      disposable_0,
      disposable_1
    ]
    );
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import22.ZephyrSearchComponent) && (8 === requestNodeIndex))) { return this._ZephyrSearchComponent_8_3.context; }
    if (((token === import25.TemplateRef) && (52 === requestNodeIndex))) { return this._TemplateRef_52_5; }
    if (((token === import26.NgIf) && (52 === requestNodeIndex))) { return this._NgIf_52_6.context; }
    if (((token === import25.TemplateRef) && (54 === requestNodeIndex))) { return this._TemplateRef_54_5; }
    if (((token === import26.NgIf) && (54 === requestNodeIndex))) { return this._NgIf_54_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_8_0_0:any = this.parentView.context.searchText;
    this._ZephyrSearchComponent_8_3.check_searchText(currVal_8_0_0,throwOnChange,false);
    const currVal_8_0_1:any = this.parentView.context.releaseId[0];
    this._ZephyrSearchComponent_8_3.check_releaseId(currVal_8_0_1,throwOnChange,false);
    const currVal_8_0_2:any = 'req-search';
    this._ZephyrSearchComponent_8_3.check_searchFieldSrcId(currVal_8_0_2,throwOnChange,false);
    const currVal_8_0_3:any = 'true';
    this._ZephyrSearchComponent_8_3.check_fullWidthText(currVal_8_0_3,throwOnChange,false);
    const currVal_8_0_4:any = 'requirement';
    this._ZephyrSearchComponent_8_3.check_zqlEntityName(currVal_8_0_4,throwOnChange,false);
    const currVal_8_0_5:any = 'true';
    this._ZephyrSearchComponent_8_3.check_showFilters(currVal_8_0_5,throwOnChange,false);
    const currVal_8_0_6:any = this.parentView.context.isAdvancedSearch;
    this._ZephyrSearchComponent_8_3.check_isAdvancedSearch(currVal_8_0_6,throwOnChange,false);
    const currVal_8_0_7:any = false;
    this._ZephyrSearchComponent_8_3.check_searchOnChange(currVal_8_0_7,throwOnChange,false);
    this._ZephyrSearchComponent_8_3.ngDoCheck(this,this._el_8,throwOnChange);
    const currVal_52_0_0:any = this.parentView.context.viewReqGridRows.length;
    this._NgIf_52_6.check_ngIf(currVal_52_0_0,throwOnChange,false);
    this._NgIf_52_6.ngDoCheck(this,this._anchor_52,throwOnChange);
    const currVal_54_0_0:boolean = !this.parentView.context.releaseId.length;
    this._NgIf_54_6.check_ngIf(currVal_54_0_0,throwOnChange,false);
    this._NgIf_54_6.ngDoCheck(this,this._anchor_54,throwOnChange);
    this._vc_52.detectChangesInNestedViews(throwOnChange);
    this._vc_54.detectChangesInNestedViews(throwOnChange);
    const currVal_64:any = 'zui-panel-body';
    if (import3.checkBinding(throwOnChange,this._expr_64,currVal_64)) {
      this.renderer.setElementProperty(this._el_0,'className',currVal_64);
      this._expr_64 = currVal_64;
    }
    const currVal_65:any = 'zui-inline-options-header';
    if (import3.checkBinding(throwOnChange,this._expr_65,currVal_65)) {
      this.renderer.setElementProperty(this._el_2,'className',currVal_65);
      this._expr_65 = currVal_65;
    }
    const currVal_66:any = 'pull-right';
    if (import3.checkBinding(throwOnChange,this._expr_66,currVal_66)) {
      this.renderer.setElementProperty(this._el_12,'className',currVal_66);
      this._expr_66 = currVal_66;
    }
    this.compView_8.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._ZephyrSearchComponent_8_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this._vc_52.destroyNestedViews();
    this._vc_54.destroyNestedViews();
    this.compView_8.destroy();
    this._ZephyrSearchComponent_8_3.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 52)) { return new View_InlineTableZQLComponent2(this.viewUtils,this,52,this._anchor_52,this._vc_52); }
    if ((nodeIndex == 54)) { return new View_InlineTableZQLComponent3(this.viewUtils,this,54,this._anchor_54,this._vc_54); }
    return (null as any);
  }
  handleEvent_8(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'onSearchGo')) {
      const pd_sub_0:any = ((<any>this.parentView.context.onSearchGo($event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_14(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.parentView.context.hideDialog()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}
var renderType_InlineTableZQLComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_InlineTableZQLComponent,{});
export class View_InlineTableZQLComponent0 extends import2.AppView<import0.InlineTableZQLComponent> {
  _viewQuery_GridComponent_0:import27.QueryList<any>;
  _el_0:any;
  _InlineTableDirective_0_3:import28.Wrapper_InlineTableDirective;
  _text_1:any;
  _el_2:any;
  _NgClass_2_3:import29.Wrapper_NgClass;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _text_6:any;
  _text_7:any;
  _el_8:any;
  _text_9:any;
  _el_10:any;
  _text_11:any;
  _anchor_12:any;
  /*private*/ _vc_12:import16.ViewContainer;
  _TemplateRef_12_5:any;
  _NgIf_12_6:import24.Wrapper_NgIf;
  _text_13:any;
  _text_14:any;
  _text_15:any;
  /*private*/ _expr_22:any;
  _map_23:any;
  /*private*/ _expr_24:any;
  /*private*/ _expr_25:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_InlineTableZQLComponent0,renderType_InlineTableZQLComponent,import7.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import8.ChangeDetectorStatus.CheckAlways);
    this._expr_22 = import1.UNINITIALIZED;
    this._map_23 = import3.pureProxy1((p0:any):{[key: string]:any} => {
      return {disabled: p0};
    });
    this._expr_24 = import1.UNINITIALIZED;
    this._expr_25 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import9.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._viewQuery_GridComponent_0 = new import27.QueryList<any>();
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'div',new import3.InlineArray4(4,'class','zui-inline-dialog','zui-inline-table',''),(null as any));
    this._InlineTableDirective_0_3 = new import28.Wrapper_InlineTableDirective(new import18.ElementRef(this._el_0));
    this._text_1 = this.renderer.createText(this._el_0,'\n  ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'a',new import3.InlineArray2(2,'class','inline-table-trigger'),(null as any));
    this._NgClass_2_3 = new import29.Wrapper_NgClass(this.parentView.injectorGet(import30.IterableDiffers,this.parentIndex),this.parentView.injectorGet(import31.KeyValueDiffers,this.parentIndex),new import18.ElementRef(this._el_2),this.renderer);
    this._text_3 = this.renderer.createText(this._el_2,'\n    ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'span',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'Manage',(null as any));
    this._text_6 = this.renderer.createText(this._el_2,'\n  ',(null as any));
    this._text_7 = this.renderer.createText(this._el_0,'\n  ',(null as any));
    this._el_8 = import3.createRenderElement(this.renderer,this._el_0,'div',new import3.InlineArray4(4,'class','inline-table-body','id','inline-table-zql'),(null as any));
    this._text_9 = this.renderer.createText(this._el_8,'\n    ',(null as any));
    this._el_10 = import3.createRenderElement(this.renderer,this._el_8,'div',new import3.InlineArray2(2,'class','zui-inline-options zui-inline-table inline-table-content inline-table-content-without-padding'),(null as any));
    this._text_11 = this.renderer.createText(this._el_10,'\n      ',(null as any));
    this._anchor_12 = this.renderer.createTemplateAnchor(this._el_10,(null as any));
    this._vc_12 = new import16.ViewContainer(12,10,this,this._anchor_12);
    this._TemplateRef_12_5 = new import25.TemplateRef_(this,12,this._anchor_12);
    this._NgIf_12_6 = new import24.Wrapper_NgIf(this._vc_12.vcRef,this._TemplateRef_12_5);
    this._text_13 = this.renderer.createText(this._el_10,'\n  ',(null as any));
    this._text_14 = this.renderer.createText(this._el_8,'\n',(null as any));
    this._text_15 = this.renderer.createText(this._el_0,'\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_2,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_2));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._text_6,
      this._text_7,
      this._el_8,
      this._text_9,
      this._el_10,
      this._text_11,
      this._anchor_12,
      this._text_13,
      this._text_14,
      this._text_15
    ]
    ),[disposable_0]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import32.NgClass) && ((2 <= requestNodeIndex) && (requestNodeIndex <= 6)))) { return this._NgClass_2_3.context; }
    if (((token === import25.TemplateRef) && (12 === requestNodeIndex))) { return this._TemplateRef_12_5; }
    if (((token === import26.NgIf) && (12 === requestNodeIndex))) { return this._NgIf_12_6.context; }
    if (((token === import33.InlineTableDirective) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 15)))) { return this._InlineTableDirective_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._InlineTableDirective_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_2_0_0:any = 'inline-table-trigger';
    this._NgClass_2_3.check_klass(currVal_2_0_0,throwOnChange,false);
    const currVal_2_0_1:any = this._map_23(!this.context.releaseId);
    this._NgClass_2_3.check_ngClass(currVal_2_0_1,throwOnChange,false);
    this._NgClass_2_3.ngDoCheck(this,this._el_2,throwOnChange);
    const currVal_12_0_0:any = this.context.releaseId.length;
    this._NgIf_12_6.check_ngIf(currVal_12_0_0,throwOnChange,false);
    this._NgIf_12_6.ngDoCheck(this,this._anchor_12,throwOnChange);
    this._vc_12.detectChangesInNestedViews(throwOnChange);
    const currVal_22:any = import3.inlineInterpolate(1,'inline-options-',this.context.parentId,'');
    if (import3.checkBinding(throwOnChange,this._expr_22,currVal_22)) {
      this.renderer.setElementProperty(this._el_0,'id',currVal_22);
      this._expr_22 = currVal_22;
    }
    const currVal_24:any = 'zui-inline-options-trigger';
    if (import3.checkBinding(throwOnChange,this._expr_24,currVal_24)) {
      this.renderer.setElementProperty(this._el_4,'className',currVal_24);
      this._expr_24 = currVal_24;
    }
    const currVal_25:any = this.context.hideDialogBox;
    if (import3.checkBinding(throwOnChange,this._expr_25,currVal_25)) {
      this.renderer.setElementProperty(this._el_8,'hidden',currVal_25);
      this._expr_25 = currVal_25;
    }
    if (!throwOnChange) {
      if (this._viewQuery_GridComponent_0.dirty) {
          this._viewQuery_GridComponent_0.reset([this._vc_12.mapNestedViews(View_InlineTableZQLComponent1,(nestedView:View_InlineTableZQLComponent1):any => {
              return [nestedView._vc_52.mapNestedViews(View_InlineTableZQLComponent2,(nestedView:View_InlineTableZQLComponent2):any => {
                return [nestedView._GridComponent_0_6.context];
            })];
        })]);
        this.context.gridComponent = this._viewQuery_GridComponent_0.first;
      }
      if ((this.numberOfChecks === 0)) { this._InlineTableDirective_0_3.context.ngAfterViewInit(); }
    }
  }
  destroyInternal():void {
    this._vc_12.destroyNestedViews();
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 12)) { return new View_InlineTableZQLComponent1(this.viewUtils,this,12,this._anchor_12,this._vc_12); }
    return (null as any);
  }
  handleEvent_2(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.openDialog(true)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}