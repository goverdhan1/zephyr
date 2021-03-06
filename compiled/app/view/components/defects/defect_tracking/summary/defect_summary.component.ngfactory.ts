/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../../app/view/components/defects/defect_tracking/summary/defect_summary.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '../../../../../../../app/actions/defects.action';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '@angular/http/src/http';
import * as import10 from '@angular/router/src/router_state';
import * as import11 from '../../../../../../../app/view/components/common/modules/module1';
import * as import12 from '../../../common/modules/module1.ngfactory';
import * as import13 from '@angular/core/src/linker/view_container';
import * as import14 from '../../../../../../node_modules/@angular/common/src/directives/ng_for.ngfactory';
import * as import15 from '@angular/core/src/linker/template_ref';
import * as import16 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import17 from '@angular/common/src/directives/ng_for';
export class Wrapper_DefectSummaryComponent {
  /*private*/ _eventHandler:Function;
  context:import0.DefectSummaryComponent;
  /*private*/ _changed:boolean;
  constructor(p0:any,p1:any) {
    this._changed = false;
    this.context = new import0.DefectSummaryComponent(p0,p1);
  }
  ngOnDetach(view:import1.AppView<any>,componentView:import1.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
  }
  ngDoCheck(view:import1.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this._changed;
    this._changed = false;
    return changed;
  }
  checkHost(view:import1.AppView<any>,componentView:import1.AppView<any>,el:any,throwOnChange:boolean):void {
  }
  handleEvent(eventName:string,$event:any):boolean {
    var result:boolean = true;
    return result;
  }
  subscribe(view:import1.AppView<any>,_eventHandler:any):void {
    this._eventHandler = _eventHandler;
  }
}
var renderType_DefectSummaryComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_DefectSummaryComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.DefectSummaryComponent>;
  _DefectsAction_0_3:import5.DefectsAction;
  _DefectSummaryComponent_0_4:Wrapper_DefectSummaryComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_DefectSummaryComponent_Host0,renderType_DefectSummaryComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zee-defect-summary',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_DefectSummaryComponent0(this.viewUtils,this,0,this._el_0);
    this._DefectsAction_0_3 = new import5.DefectsAction(this.injectorGet(import9.Http,this.parentIndex));
    this._DefectSummaryComponent_0_4 = new Wrapper_DefectSummaryComponent(this.injectorGet(import10.ActivatedRoute,this.parentIndex),this._DefectsAction_0_3);
    this.compView_0.create(this._DefectSummaryComponent_0_4.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._DefectSummaryComponent_0_4.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import5.DefectsAction) && (0 === requestNodeIndex))) { return this._DefectsAction_0_3; }
    if (((token === import0.DefectSummaryComponent) && (0 === requestNodeIndex))) { return this._DefectSummaryComponent_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._DefectSummaryComponent_0_4.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._DefectSummaryComponent_0_4.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const DefectSummaryComponentNgFactory:import8.ComponentFactory<import0.DefectSummaryComponent> = new import8.ComponentFactory<import0.DefectSummaryComponent>('zee-defect-summary',View_DefectSummaryComponent_Host0,import0.DefectSummaryComponent);
const styles_DefectSummaryComponent:any[] = ([] as any[]);
class View_DefectSummaryComponent1 extends import1.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  compView_2:import1.AppView<import11.ContentModule1Component>;
  _ContentModule1Component_2_3:import12.Wrapper_ContentModule1Component;
  _text_3:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import13.ViewContainer) {
    super(View_DefectSummaryComponent1,renderType_DefectSummaryComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'div',new import3.InlineArray2(2,'class','zui-defect-summary-list'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n            ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'zui-summary-box',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_2 = new import12.View_ContentModule1Component0(this.viewUtils,this,2,this._el_2);
    this._ContentModule1Component_2_3 = new import12.Wrapper_ContentModule1Component();
    this.compView_2.create(this._ContentModule1Component_2_3.context);
    this._text_3 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import11.ContentModule1Component) && (2 === requestNodeIndex))) { return this._ContentModule1Component_2_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_2_0_0:any = this.context.$implicit;
    this._ContentModule1Component_2_3.check_summary(currVal_2_0_0,throwOnChange,false);
    this._ContentModule1Component_2_3.ngDoCheck(this,this._el_2,throwOnChange);
    this.compView_2.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_2.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
var renderType_DefectSummaryComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_DefectSummaryComponent,{});
export class View_DefectSummaryComponent0 extends import1.AppView<import0.DefectSummaryComponent> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _text_6:any;
  _text_7:any;
  _el_8:any;
  _text_9:any;
  _anchor_10:any;
  /*private*/ _vc_10:import13.ViewContainer;
  _TemplateRef_10_5:any;
  _NgFor_10_6:import14.Wrapper_NgFor;
  _text_11:any;
  _text_12:any;
  _text_13:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_DefectSummaryComponent0,renderType_DefectSummaryComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'div',new import3.InlineArray2(2,'class','zui-defect-summary-container'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n    ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'div',new import3.InlineArray2(2,'class','defect-summary-header defects-header'),(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n        ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'h5',new import3.InlineArray2(2,'class','zee-content-subtitle'),(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'Defects Linked to Execution',(null as any));
    this._text_6 = this.renderer.createText(this._el_2,'\n    ',(null as any));
    this._text_7 = this.renderer.createText(this._el_0,'\n    ',(null as any));
    this._el_8 = import3.createRenderElement(this.renderer,this._el_0,'div',new import3.InlineArray2(2,'class','zui-defect-summary-wrapper'),(null as any));
    this._text_9 = this.renderer.createText(this._el_8,'\n        ',(null as any));
    this._anchor_10 = this.renderer.createTemplateAnchor(this._el_8,(null as any));
    this._vc_10 = new import13.ViewContainer(10,8,this,this._anchor_10);
    this._TemplateRef_10_5 = new import15.TemplateRef_(this,10,this._anchor_10);
    this._NgFor_10_6 = new import14.Wrapper_NgFor(this._vc_10.vcRef,this._TemplateRef_10_5,this.parentView.injectorGet(import16.IterableDiffers,this.parentIndex),this.ref);
    this._text_11 = this.renderer.createText(this._el_8,'\n    ',(null as any));
    this._text_12 = this.renderer.createText(this._el_0,'\n',(null as any));
    this._text_13 = this.renderer.createText(parentRenderNode,'\n',(null as any));
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
      this._anchor_10,
      this._text_11,
      this._text_12,
      this._text_13
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import15.TemplateRef) && (10 === requestNodeIndex))) { return this._TemplateRef_10_5; }
    if (((token === import17.NgFor) && (10 === requestNodeIndex))) { return this._NgFor_10_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_10_0_0:any = this.context.summaries;
    this._NgFor_10_6.check_ngForOf(currVal_10_0_0,throwOnChange,false);
    this._NgFor_10_6.ngDoCheck(this,this._anchor_10,throwOnChange);
    this._vc_10.detectChangesInNestedViews(throwOnChange);
  }
  destroyInternal():void {
    this._vc_10.destroyNestedViews();
  }
  createEmbeddedViewInternal(nodeIndex:number):import1.AppView<any> {
    if ((nodeIndex == 10)) { return new View_DefectSummaryComponent1(this.viewUtils,this,10,this._anchor_10,this._vc_10); }
    return (null as any);
  }
}