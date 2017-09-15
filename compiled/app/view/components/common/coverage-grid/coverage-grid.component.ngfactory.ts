/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../app/view/components/common/coverage-grid/coverage-grid.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '../../../../../../app/actions/requirements.action';
import * as import7 from '../../../../../../app/actions/tcr.action';
import * as import8 from '@angular/core/src/linker/view_type';
import * as import9 from '@angular/core/src/change_detection/constants';
import * as import10 from '@angular/core/src/linker/component_factory';
import * as import11 from '@angular/http/src/http';
import * as import12 from '../../../../../../app/view/components/common/modal/modal.component';
import * as import13 from '../modal/modal.component.ngfactory';
import * as import14 from '../../../../../../app/view/components/grid/grid.component';
import * as import15 from '../../../../../../app/actions/grid.action';
import * as import16 from '../../../../../../app/actions/global.action';
import * as import17 from '../../../../../../app/utils/scripts/utils';
import * as import18 from '../../grid/grid.component.ngfactory';
import * as import19 from '@angular/core/src/linker/element_ref';
import * as import20 from '../../../../../../app/services/pouch.db.service';
import * as import21 from '@angular/core/src/zone/ng_zone';
import * as import22 from '@angular/router/src/router';
import * as import23 from '../../../../../../app/services/toastr.service';
export class Wrapper_CoverageGridComponent {
  /*private*/ _eventHandler:Function;
  context:import0.CoverageGridComponent;
  /*private*/ _changed:boolean;
  /*private*/ _changes:{[key: string]:any};
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  constructor(p0:any,p1:any) {
    this._changed = false;
    this._changes = {};
    this.context = new import0.CoverageGridComponent(p0,p1);
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
    this._expr_2 = import1.UNINITIALIZED;
    this._expr_3 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    this.context.ngOnDestroy();
  }
  check_gridType(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.gridType = currValue;
      this._changes['gridType'] = new import1.SimpleChange(this._expr_0,currValue);
      this._expr_0 = currValue;
    }
  }
  check_ids(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.ids = currValue;
      this._changes['ids'] = new import1.SimpleChange(this._expr_1,currValue);
      this._expr_1 = currValue;
    }
  }
  check_releaseId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_2,currValue))) {
      this._changed = true;
      this.context.releaseId = currValue;
      this._changes['releaseId'] = new import1.SimpleChange(this._expr_2,currValue);
      this._expr_2 = currValue;
    }
  }
  check_useRelease(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_3,currValue))) {
      this._changed = true;
      this.context.useRelease = currValue;
      this._changes['useRelease'] = new import1.SimpleChange(this._expr_3,currValue);
      this._expr_3 = currValue;
    }
  }
  ngDoCheck(view:import2.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this._changed;
    this._changed = false;
    if (!throwOnChange) { if (changed) {
      this.context.ngOnChanges(this._changes);
      this._changes = {};
    } }
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
var renderType_CoverageGridComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_CoverageGridComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.CoverageGridComponent>;
  _RequirementsAction_0_3:import6.RequirementsAction;
  _TCRAction_0_4:import7.TCRAction;
  _CoverageGridComponent_0_5:Wrapper_CoverageGridComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_CoverageGridComponent_Host0,renderType_CoverageGridComponent_Host,import8.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import9.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import10.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zui-coverage-grid',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_CoverageGridComponent0(this.viewUtils,this,0,this._el_0);
    this._RequirementsAction_0_3 = new import6.RequirementsAction(this.injectorGet(import11.Http,this.parentIndex));
    this._TCRAction_0_4 = new import7.TCRAction(this.injectorGet(import11.Http,this.parentIndex));
    this._CoverageGridComponent_0_5 = new Wrapper_CoverageGridComponent(this._RequirementsAction_0_3,this._TCRAction_0_4);
    this.compView_0.create(this._CoverageGridComponent_0_5.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import10.ComponentRef_<any>(0,this,this._el_0,this._CoverageGridComponent_0_5.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import6.RequirementsAction) && (0 === requestNodeIndex))) { return this._RequirementsAction_0_3; }
    if (((token === import7.TCRAction) && (0 === requestNodeIndex))) { return this._TCRAction_0_4; }
    if (((token === import0.CoverageGridComponent) && (0 === requestNodeIndex))) { return this._CoverageGridComponent_0_5.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._CoverageGridComponent_0_5.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._CoverageGridComponent_0_5.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const CoverageGridComponentNgFactory:import10.ComponentFactory<import0.CoverageGridComponent> = new import10.ComponentFactory<import0.CoverageGridComponent>('zui-coverage-grid',View_CoverageGridComponent_Host0,import0.CoverageGridComponent);
const styles_CoverageGridComponent:any[] = ([] as any[]);
var renderType_CoverageGridComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_CoverageGridComponent,{});
export class View_CoverageGridComponent0 extends import2.AppView<import0.CoverageGridComponent> {
  _el_0:any;
  compView_0:import2.AppView<import12.ModalComponent>;
  _ModalComponent_0_3:import13.Wrapper_ModalComponent;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _el_8:any;
  compView_8:import2.AppView<import14.GridComponent>;
  _GridAction_8_3:import15.GridAction;
  _GlobalAction_8_4:import16.GlobalAction;
  _UtililtyFunctions_8_5:import17.UtililtyFunctions;
  _GridComponent_8_6:import18.Wrapper_GridComponent;
  _text_9:any;
  _text_10:any;
  _text_11:any;
  _text_12:any;
  _text_13:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_CoverageGridComponent0,renderType_CoverageGridComponent,import8.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import9.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import10.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'zui-modal',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_0 = new import13.View_ModalComponent0(this.viewUtils,this,0,this._el_0);
    this._ModalComponent_0_3 = new import13.Wrapper_ModalComponent(new import19.ElementRef(this._el_0),this.compView_0.ref);
    this._text_1 = this.renderer.createText((null as any),'\n    ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,(null as any),'zui-modal-body',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n        ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'div',new import3.InlineArray2(2,'class','import-saved-maps'),(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'\n            ',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_4,'div',new import3.InlineArray4(4,'class','flex-column-stretch','id','savedMaps-grid'),(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'\n                ',(null as any));
    this._el_8 = import3.createRenderElement(this.renderer,this._el_6,'grid',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_8 = new import18.View_GridComponent0(this.viewUtils,this,8,this._el_8);
    this._GridAction_8_3 = new import15.GridAction(this.parentView.injectorGet(import11.Http,this.parentIndex),this.parentView.injectorGet(import20.PouchDBPrefsServices,this.parentIndex));
    this._GlobalAction_8_4 = new import16.GlobalAction(this.parentView.injectorGet(import11.Http,this.parentIndex));
    this._UtililtyFunctions_8_5 = new import17.UtililtyFunctions();
    this._GridComponent_8_6 = new import18.Wrapper_GridComponent(this._GridAction_8_3,this._GlobalAction_8_4,new import19.ElementRef(this._el_8),this._UtililtyFunctions_8_5,this.compView_8.ref,this.parentView.injectorGet(import21.NgZone,this.parentIndex),this.parentView.injectorGet(import22.Router,this.parentIndex),this.parentView.injectorGet(import20.PouchDBPrefsServices,this.parentIndex),this.parentView.injectorGet(import23.ToastrService,this.parentIndex));
    this.compView_8.create(this._GridComponent_8_6.context);
    this._text_9 = this.renderer.createText(this._el_6,'\n            ',(null as any));
    this._text_10 = this.renderer.createText(this._el_4,'\n      ',(null as any));
    this._text_11 = this.renderer.createText(this._el_2,'\n    ',(null as any));
    this._text_12 = this.renderer.createText((null as any),'\n',(null as any));
    this.compView_0.create(this._ModalComponent_0_3.context);
    this._text_13 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_8,new import3.InlineArray2(2,'onGridLinkClick',(null as any)),this.eventHandler(this.handleEvent_8));
    this._GridComponent_8_6.subscribe(this,this.eventHandler(this.handleEvent_8),false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false);
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
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
      this._text_12,
      this._text_13
    ]
    ),[disposable_0]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import15.GridAction) && (8 === requestNodeIndex))) { return this._GridAction_8_3; }
    if (((token === import16.GlobalAction) && (8 === requestNodeIndex))) { return this._GlobalAction_8_4; }
    if (((token === import17.UtililtyFunctions) && (8 === requestNodeIndex))) { return this._UtililtyFunctions_8_5; }
    if (((token === import14.GridComponent) && (8 === requestNodeIndex))) { return this._GridComponent_8_6.context; }
    if (((token === import12.ModalComponent) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 12)))) { return this._ModalComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = (this.context.entityType + ' Coverage Details');
    this._ModalComponent_0_3.check_title(currVal_0_0_0,throwOnChange,false);
    const currVal_0_0_1:any = 'zee-coverage-modal';
    this._ModalComponent_0_3.check_modalId(currVal_0_0_1,throwOnChange,false);
    const currVal_0_0_2:any = ' zee-import-modal';
    this._ModalComponent_0_3.check_modalClass(currVal_0_0_2,throwOnChange,false);
    const currVal_0_0_3:any = 'large';
    this._ModalComponent_0_3.check_modalSize(currVal_0_0_3,throwOnChange,false);
    this._ModalComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_8_0_0:any = this.context.rows;
    this._GridComponent_8_6.check_rows(currVal_8_0_0,throwOnChange,false);
    const currVal_8_0_1:any = this.context.gridType;
    this._GridComponent_8_6.check_gridType(currVal_8_0_1,throwOnChange,false);
    const currVal_8_0_2:any = true;
    this._GridComponent_8_6.check_hideCoverage(currVal_8_0_2,throwOnChange,false);
    const currVal_8_0_3:any = true;
    this._GridComponent_8_6.check_hideCheckAll(currVal_8_0_3,throwOnChange,false);
    this._GridComponent_8_6.ngDoCheck(this,this._el_8,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    this.compView_8.internalDetectChanges(throwOnChange);
    if (!throwOnChange) {
      if ((this.numberOfChecks === 0)) { this._GridComponent_8_6.context.ngAfterViewInit(); }
      if ((this.numberOfChecks === 0)) { this._ModalComponent_0_3.context.ngAfterViewInit(); }
    }
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this.compView_8.destroy();
    this._GridComponent_8_6.ngOnDestroy();
    this._ModalComponent_0_3.ngOnDestroy();
  }
  visitProjectableNodesInternal(nodeIndex:number,ngContentIndex:number,cb:any,ctx:any):void {
    if (((nodeIndex == 0) && (ngContentIndex == 0))) {  }
    if (((nodeIndex == 0) && (ngContentIndex == 1))) { cb(this._el_2,ctx); }
    if (((nodeIndex == 0) && (ngContentIndex == 2))) {  }
  }
  handleEvent_8(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'onGridLinkClick')) {
      const pd_sub_0:any = ((<any>this.context.reqGridLinkClick($event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}