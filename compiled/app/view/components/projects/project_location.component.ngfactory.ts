/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../app/view/components/projects/project_location.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '../../../../../app/actions/team.action';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '@angular/http/src/http';
import * as import10 from '@angular/core/src/linker/view_container';
import * as import11 from '@angular/core/src/change_detection/change_detection_util';
import * as import12 from '../../../../node_modules/@angular/common/src/directives/ng_for.ngfactory';
import * as import13 from '@angular/core/src/linker/template_ref';
import * as import14 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import15 from '@angular/common/src/directives/ng_for';
export class Wrapper_ProjectLocationComponent {
  /*private*/ _eventHandler:Function;
  context:import0.ProjectLocationComponent;
  /*private*/ _changed:boolean;
  constructor(p0:any) {
    this._changed = false;
    this.context = new import0.ProjectLocationComponent(p0);
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
var renderType_ProjectLocationComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_ProjectLocationComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.ProjectLocationComponent>;
  _TeamAction_0_3:import5.TeamAction;
  _ProjectLocationComponent_0_4:Wrapper_ProjectLocationComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ProjectLocationComponent_Host0,renderType_ProjectLocationComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zee-location-tab-content',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_ProjectLocationComponent0(this.viewUtils,this,0,this._el_0);
    this._TeamAction_0_3 = new import5.TeamAction(this.injectorGet(import9.Http,this.parentIndex));
    this._ProjectLocationComponent_0_4 = new Wrapper_ProjectLocationComponent(this._TeamAction_0_3);
    this.compView_0.create(this._ProjectLocationComponent_0_4.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._ProjectLocationComponent_0_4.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import5.TeamAction) && (0 === requestNodeIndex))) { return this._TeamAction_0_3; }
    if (((token === import0.ProjectLocationComponent) && (0 === requestNodeIndex))) { return this._ProjectLocationComponent_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._ProjectLocationComponent_0_4.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const ProjectLocationComponentNgFactory:import8.ComponentFactory<import0.ProjectLocationComponent> = new import8.ComponentFactory<import0.ProjectLocationComponent>('zee-location-tab-content',View_ProjectLocationComponent_Host0,import0.ProjectLocationComponent);
const styles_ProjectLocationComponent:any[] = ([] as any[]);
class View_ProjectLocationComponent1 extends import1.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _text_4:any;
  _el_5:any;
  _text_6:any;
  _text_7:any;
  _el_8:any;
  _text_9:any;
  _text_10:any;
  /*private*/ _expr_11:any;
  /*private*/ _expr_12:any;
  /*private*/ _expr_13:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import10.ViewContainer) {
    super(View_ProjectLocationComponent1,renderType_ProjectLocationComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_11 = import11.UNINITIALIZED;
    this._expr_12 = import11.UNINITIALIZED;
    this._expr_13 = import11.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'tr',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n                ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'td',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'',(null as any));
    this._text_4 = this.renderer.createText(this._el_0,'\n                ',(null as any));
    this._el_5 = import3.createRenderElement(this.renderer,this._el_0,'td',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_6 = this.renderer.createText(this._el_5,'',(null as any));
    this._text_7 = this.renderer.createText(this._el_0,'\n                ',(null as any));
    this._el_8 = import3.createRenderElement(this.renderer,this._el_0,'td',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_9 = this.renderer.createText(this._el_8,'',(null as any));
    this._text_10 = this.renderer.createText(this._el_0,'\n            ',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._text_4,
      this._el_5,
      this._text_6,
      this._text_7,
      this._el_8,
      this._text_9,
      this._text_10
    ]
    ),(null as any));
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_11:any = import3.inlineInterpolate(1,'',(this.context.index + 1),'');
    if (import3.checkBinding(throwOnChange,this._expr_11,currVal_11)) {
      this.renderer.setText(this._text_3,currVal_11);
      this._expr_11 = currVal_11;
    }
    const currVal_12:any = import3.inlineInterpolate(1,'',this.context.$implicit.location,'');
    if (import3.checkBinding(throwOnChange,this._expr_12,currVal_12)) {
      this.renderer.setText(this._text_6,currVal_12);
      this._expr_12 = currVal_12;
    }
    const currVal_13:any = import3.inlineInterpolate(1,'',this.context.$implicit.count,'');
    if (import3.checkBinding(throwOnChange,this._expr_13,currVal_13)) {
      this.renderer.setText(this._text_9,currVal_13);
      this._expr_13 = currVal_13;
    }
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
var renderType_ProjectLocationComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_ProjectLocationComponent,{});
export class View_ProjectLocationComponent0 extends import1.AppView<import0.ProjectLocationComponent> {
  _el_0:any;
  _text_1:any;
  _text_2:any;
  _el_3:any;
  _text_4:any;
  _el_5:any;
  _text_6:any;
  _el_7:any;
  _text_8:any;
  _el_9:any;
  _text_10:any;
  _text_11:any;
  _el_12:any;
  _text_13:any;
  _text_14:any;
  _el_15:any;
  _text_16:any;
  _text_17:any;
  _text_18:any;
  _text_19:any;
  _el_20:any;
  _text_21:any;
  _anchor_22:any;
  /*private*/ _vc_22:import10.ViewContainer;
  _TemplateRef_22_5:any;
  _NgFor_22_6:import12.Wrapper_NgFor;
  _text_23:any;
  _text_24:any;
  _text_25:any;
  _text_26:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ProjectLocationComponent0,renderType_ProjectLocationComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'div',new import3.InlineArray2(2,'class','zee-location-chart-wrapper'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n    ',(null as any));
    this._text_2 = this.renderer.createText(this._el_0,'\n    ',(null as any));
    this._el_3 = import3.createRenderElement(this.renderer,this._el_0,'table',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_4 = this.renderer.createText(this._el_3,'\n        ',(null as any));
    this._el_5 = import3.createRenderElement(this.renderer,this._el_3,'thead',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_6 = this.renderer.createText(this._el_5,'\n            ',(null as any));
    this._el_7 = import3.createRenderElement(this.renderer,this._el_5,'tr',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_8 = this.renderer.createText(this._el_7,'\n                ',(null as any));
    this._el_9 = import3.createRenderElement(this.renderer,this._el_7,'th',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_10 = this.renderer.createText(this._el_9,'#',(null as any));
    this._text_11 = this.renderer.createText(this._el_7,'\n                ',(null as any));
    this._el_12 = import3.createRenderElement(this.renderer,this._el_7,'th',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_13 = this.renderer.createText(this._el_12,'Location',(null as any));
    this._text_14 = this.renderer.createText(this._el_7,'\n                ',(null as any));
    this._el_15 = import3.createRenderElement(this.renderer,this._el_7,'th',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_16 = this.renderer.createText(this._el_15,'No. of Users',(null as any));
    this._text_17 = this.renderer.createText(this._el_7,'\n            ',(null as any));
    this._text_18 = this.renderer.createText(this._el_5,'\n        ',(null as any));
    this._text_19 = this.renderer.createText(this._el_3,'\n        ',(null as any));
    this._el_20 = import3.createRenderElement(this.renderer,this._el_3,'tbody',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_21 = this.renderer.createText(this._el_20,'\n            ',(null as any));
    this._anchor_22 = this.renderer.createTemplateAnchor(this._el_20,(null as any));
    this._vc_22 = new import10.ViewContainer(22,20,this,this._anchor_22);
    this._TemplateRef_22_5 = new import13.TemplateRef_(this,22,this._anchor_22);
    this._NgFor_22_6 = new import12.Wrapper_NgFor(this._vc_22.vcRef,this._TemplateRef_22_5,this.parentView.injectorGet(import14.IterableDiffers,this.parentIndex),this.ref);
    this._text_23 = this.renderer.createText(this._el_20,'\n        ',(null as any));
    this._text_24 = this.renderer.createText(this._el_3,'\n    ',(null as any));
    this._text_25 = this.renderer.createText(this._el_0,'\n',(null as any));
    this._text_26 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._el_5,
      this._text_6,
      this._el_7,
      this._text_8,
      this._el_9,
      this._text_10,
      this._text_11,
      this._el_12,
      this._text_13,
      this._text_14,
      this._el_15,
      this._text_16,
      this._text_17,
      this._text_18,
      this._text_19,
      this._el_20,
      this._text_21,
      this._anchor_22,
      this._text_23,
      this._text_24,
      this._text_25,
      this._text_26
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import13.TemplateRef) && (22 === requestNodeIndex))) { return this._TemplateRef_22_5; }
    if (((token === import15.NgFor) && (22 === requestNodeIndex))) { return this._NgFor_22_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_22_0_0:any = this.context.locationData;
    this._NgFor_22_6.check_ngForOf(currVal_22_0_0,throwOnChange,false);
    this._NgFor_22_6.ngDoCheck(this,this._anchor_22,throwOnChange);
    this._vc_22.detectChangesInNestedViews(throwOnChange);
  }
  destroyInternal():void {
    this._vc_22.destroyNestedViews();
  }
  createEmbeddedViewInternal(nodeIndex:number):import1.AppView<any> {
    if ((nodeIndex == 22)) { return new View_ProjectLocationComponent1(this.viewUtils,this,22,this._anchor_22,this._vc_22); }
    return (null as any);
  }
}