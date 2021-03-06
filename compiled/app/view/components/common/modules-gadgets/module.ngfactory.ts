/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../app/view/components/common/modules-gadgets/module';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '@angular/core/src/linker/view_container';
import * as import10 from '@angular/core/src/security';
import * as import11 from '../../../../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import12 from '@angular/core/src/linker/template_ref';
import * as import13 from '@angular/common/src/directives/ng_if';
import * as import14 from '../../../../../node_modules/@angular/common/src/directives/ng_for.ngfactory';
import * as import15 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import16 from '@angular/common/src/directives/ng_for';
export class Wrapper_GadgetContentModuleComponent {
  /*private*/ _eventHandler:Function;
  context:import0.GadgetContentModuleComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  constructor() {
    this._changed = false;
    this.context = new import0.GadgetContentModuleComponent();
    this._expr_0 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
  }
  check_summary(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.summary = currValue;
      this._expr_0 = currValue;
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
var renderType_GadgetContentModuleComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_GadgetContentModuleComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.GadgetContentModuleComponent>;
  _GadgetContentModuleComponent_0_3:Wrapper_GadgetContentModuleComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_GadgetContentModuleComponent_Host0,renderType_GadgetContentModuleComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zee-gadget-module',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_GadgetContentModuleComponent0(this.viewUtils,this,0,this._el_0);
    this._GadgetContentModuleComponent_0_3 = new Wrapper_GadgetContentModuleComponent();
    this.compView_0.create(this._GadgetContentModuleComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._GadgetContentModuleComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.GadgetContentModuleComponent) && (0 === requestNodeIndex))) { return this._GadgetContentModuleComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._GadgetContentModuleComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const GadgetContentModuleComponentNgFactory:import8.ComponentFactory<import0.GadgetContentModuleComponent> = new import8.ComponentFactory<import0.GadgetContentModuleComponent>('zee-gadget-module',View_GadgetContentModuleComponent_Host0,import0.GadgetContentModuleComponent);
const styles_GadgetContentModuleComponent:any[] = ([] as any[]);
class View_GadgetContentModuleComponent4 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_GadgetContentModuleComponent4,renderType_GadgetContentModuleComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_2 = import1.UNINITIALIZED;
    this._expr_3 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'span',new import3.InlineArray2(2,'class','zee-module1-title  metric'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1
    ]
    ),(null as any));
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_2:any = this.parentView.parentView.parentView.parentView.context.summary.color;
    if (import3.checkBinding(throwOnChange,this._expr_2,currVal_2)) {
      this.renderer.setElementStyle(this._el_0,'color',((this.viewUtils.sanitizer.sanitize(import10.SecurityContext.STYLE,currVal_2) == null)? (null as any): this.viewUtils.sanitizer.sanitize(import10.SecurityContext.STYLE,currVal_2).toString()));
      this._expr_2 = currVal_2;
    }
    const currVal_3:any = import3.inlineInterpolate(1,'',this.parentView.context.$implicit.count,'');
    if (import3.checkBinding(throwOnChange,this._expr_3,currVal_3)) {
      this.renderer.setText(this._text_1,currVal_3);
      this._expr_3 = currVal_3;
    }
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
class View_GadgetContentModuleComponent5 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_GadgetContentModuleComponent5,renderType_GadgetContentModuleComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_2 = import1.UNINITIALIZED;
    this._expr_3 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'span',new import3.InlineArray2(2,'class','zee-module1-summary-name'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1
    ]
    ),(null as any));
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_2:any = this.parentView.parentView.parentView.parentView.context.summary.color;
    if (import3.checkBinding(throwOnChange,this._expr_2,currVal_2)) {
      this.renderer.setElementStyle(this._el_0,'border-bottom-color',((this.viewUtils.sanitizer.sanitize(import10.SecurityContext.STYLE,currVal_2) == null)? (null as any): this.viewUtils.sanitizer.sanitize(import10.SecurityContext.STYLE,currVal_2).toString()));
      this._expr_2 = currVal_2;
    }
    const currVal_3:any = import3.inlineInterpolate(1,'',this.parentView.context.$implicit.name,'');
    if (import3.checkBinding(throwOnChange,this._expr_3,currVal_3)) {
      this.renderer.setText(this._text_1,currVal_3);
      this._expr_3 = currVal_3;
    }
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
class View_GadgetContentModuleComponent3 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  _anchor_2:any;
  /*private*/ _vc_2:import9.ViewContainer;
  _TemplateRef_2_5:any;
  _NgIf_2_6:import11.Wrapper_NgIf;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _anchor_6:any;
  /*private*/ _vc_6:import9.ViewContainer;
  _TemplateRef_6_5:any;
  _NgIf_6_6:import11.Wrapper_NgIf;
  _text_7:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_GadgetContentModuleComponent3,renderType_GadgetContentModuleComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'div',new import3.InlineArray2(2,'class','col-xs-6 text-left'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n            ',(null as any));
    this._anchor_2 = this.renderer.createTemplateAnchor(this._el_0,(null as any));
    this._vc_2 = new import9.ViewContainer(2,0,this,this._anchor_2);
    this._TemplateRef_2_5 = new import12.TemplateRef_(this,2,this._anchor_2);
    this._NgIf_2_6 = new import11.Wrapper_NgIf(this._vc_2.vcRef,this._TemplateRef_2_5);
    this._text_3 = this.renderer.createText(this._el_0,'\n            ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_0,'br',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_5 = this.renderer.createText(this._el_0,'\n          ',(null as any));
    this._anchor_6 = this.renderer.createTemplateAnchor(this._el_0,(null as any));
    this._vc_6 = new import9.ViewContainer(6,0,this,this._anchor_6);
    this._TemplateRef_6_5 = new import12.TemplateRef_(this,6,this._anchor_6);
    this._NgIf_6_6 = new import11.Wrapper_NgIf(this._vc_6.vcRef,this._TemplateRef_6_5);
    this._text_7 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._anchor_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._anchor_6,
      this._text_7
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import12.TemplateRef) && (2 === requestNodeIndex))) { return this._TemplateRef_2_5; }
    if (((token === import13.NgIf) && (2 === requestNodeIndex))) { return this._NgIf_2_6.context; }
    if (((token === import12.TemplateRef) && (6 === requestNodeIndex))) { return this._TemplateRef_6_5; }
    if (((token === import13.NgIf) && (6 === requestNodeIndex))) { return this._NgIf_6_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_2_0_0:any = ((this.context.index < 2) || this.parentView.parentView.parentView.context.isExpanded);
    this._NgIf_2_6.check_ngIf(currVal_2_0_0,throwOnChange,false);
    this._NgIf_2_6.ngDoCheck(this,this._anchor_2,throwOnChange);
    const currVal_6_0_0:any = ((this.context.index < 2) || this.parentView.parentView.parentView.context.isExpanded);
    this._NgIf_6_6.check_ngIf(currVal_6_0_0,throwOnChange,false);
    this._NgIf_6_6.ngDoCheck(this,this._anchor_6,throwOnChange);
    this._vc_2.detectChangesInNestedViews(throwOnChange);
    this._vc_6.detectChangesInNestedViews(throwOnChange);
  }
  destroyInternal():void {
    this._vc_2.destroyNestedViews();
    this._vc_6.destroyNestedViews();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 2)) { return new View_GadgetContentModuleComponent4(this.viewUtils,this,2,this._anchor_2,this._vc_2); }
    if ((nodeIndex == 6)) { return new View_GadgetContentModuleComponent5(this.viewUtils,this,6,this._anchor_6,this._vc_6); }
    return (null as any);
  }
}
class View_GadgetContentModuleComponent2 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  _anchor_2:any;
  /*private*/ _vc_2:import9.ViewContainer;
  _TemplateRef_2_5:any;
  _NgFor_2_6:import14.Wrapper_NgFor;
  _text_3:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_GadgetContentModuleComponent2,renderType_GadgetContentModuleComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'div',new import3.InlineArray2(2,'class','col-xs-8 row zee-module1-group-wrapper'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this._anchor_2 = this.renderer.createTemplateAnchor(this._el_0,(null as any));
    this._vc_2 = new import9.ViewContainer(2,0,this,this._anchor_2);
    this._TemplateRef_2_5 = new import12.TemplateRef_(this,2,this._anchor_2);
    this._NgFor_2_6 = new import14.Wrapper_NgFor(this._vc_2.vcRef,this._TemplateRef_2_5,this.parentView.parentView.injectorGet(import15.IterableDiffers,this.parentView.parentIndex),this.parentView.parentView.ref);
    this._text_3 = this.renderer.createText(this._el_0,'\n    ',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._anchor_2,
      this._text_3
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import12.TemplateRef) && (2 === requestNodeIndex))) { return this._TemplateRef_2_5; }
    if (((token === import16.NgFor) && (2 === requestNodeIndex))) { return this._NgFor_2_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_2_0_0:any = this.context.$implicit.items;
    this._NgFor_2_6.check_ngForOf(currVal_2_0_0,throwOnChange,false);
    this._NgFor_2_6.ngDoCheck(this,this._anchor_2,throwOnChange);
    this._vc_2.detectChangesInNestedViews(throwOnChange);
  }
  destroyInternal():void {
    this._vc_2.destroyNestedViews();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 2)) { return new View_GadgetContentModuleComponent3(this.viewUtils,this,2,this._anchor_2,this._vc_2); }
    return (null as any);
  }
}
class View_GadgetContentModuleComponent1 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _text_6:any;
  _el_7:any;
  _text_8:any;
  _el_9:any;
  _text_10:any;
  _text_11:any;
  _text_12:any;
  _anchor_13:any;
  /*private*/ _vc_13:import9.ViewContainer;
  _TemplateRef_13_5:any;
  _NgFor_13_6:import14.Wrapper_NgFor;
  _text_14:any;
  /*private*/ _expr_18:any;
  /*private*/ _expr_19:any;
  /*private*/ _expr_20:any;
  /*private*/ _expr_21:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_GadgetContentModuleComponent1,renderType_GadgetContentModuleComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_18 = import1.UNINITIALIZED;
    this._expr_19 = import1.UNINITIALIZED;
    this._expr_20 = import1.UNINITIALIZED;
    this._expr_21 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'div',new import3.InlineArray2(2,'class','zee-module1-wrapper row'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n\n    ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'div',new import3.InlineArray2(2,'class','col-xs-4 text-left'),(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n      ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'span',new import3.InlineArray2(2,'class','zee-module1-title metric'),(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'',(null as any));
    this._text_6 = this.renderer.createText(this._el_2,'\n      ',(null as any));
    this._el_7 = import3.createRenderElement(this.renderer,this._el_2,'br',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_8 = this.renderer.createText(this._el_2,'\n      ',(null as any));
    this._el_9 = import3.createRenderElement(this.renderer,this._el_2,'span',new import3.InlineArray2(2,'class','zee-module1-summary-name'),(null as any));
    this._text_10 = this.renderer.createText(this._el_9,'',(null as any));
    this._text_11 = this.renderer.createText(this._el_2,'\n    ',(null as any));
    this._text_12 = this.renderer.createText(this._el_0,'\n\n    ',(null as any));
    this._anchor_13 = this.renderer.createTemplateAnchor(this._el_0,(null as any));
    this._vc_13 = new import9.ViewContainer(13,0,this,this._anchor_13);
    this._TemplateRef_13_5 = new import12.TemplateRef_(this,13,this._anchor_13);
    this._NgFor_13_6 = new import14.Wrapper_NgFor(this._vc_13.vcRef,this._TemplateRef_13_5,this.parentView.injectorGet(import15.IterableDiffers,this.parentIndex),this.parentView.ref);
    this._text_14 = this.renderer.createText(this._el_0,'\n\n',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._text_6,
      this._el_7,
      this._text_8,
      this._el_9,
      this._text_10,
      this._text_11,
      this._text_12,
      this._anchor_13,
      this._text_14
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import12.TemplateRef) && (13 === requestNodeIndex))) { return this._TemplateRef_13_5; }
    if (((token === import16.NgFor) && (13 === requestNodeIndex))) { return this._NgFor_13_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_13_0_0:any = this.parentView.context.summary.groups;
    this._NgFor_13_6.check_ngForOf(currVal_13_0_0,throwOnChange,false);
    this._NgFor_13_6.ngDoCheck(this,this._anchor_13,throwOnChange);
    this._vc_13.detectChangesInNestedViews(throwOnChange);
    const currVal_18:any = this.parentView.context.summary.color;
    if (import3.checkBinding(throwOnChange,this._expr_18,currVal_18)) {
      this.renderer.setElementStyle(this._el_4,'color',((this.viewUtils.sanitizer.sanitize(import10.SecurityContext.STYLE,currVal_18) == null)? (null as any): this.viewUtils.sanitizer.sanitize(import10.SecurityContext.STYLE,currVal_18).toString()));
      this._expr_18 = currVal_18;
    }
    const currVal_19:any = import3.inlineInterpolate(1,'',this.parentView.context.summary.count,'');
    if (import3.checkBinding(throwOnChange,this._expr_19,currVal_19)) {
      this.renderer.setText(this._text_5,currVal_19);
      this._expr_19 = currVal_19;
    }
    const currVal_20:any = this.parentView.context.summary.color;
    if (import3.checkBinding(throwOnChange,this._expr_20,currVal_20)) {
      this.renderer.setElementStyle(this._el_9,'border-bottom-color',((this.viewUtils.sanitizer.sanitize(import10.SecurityContext.STYLE,currVal_20) == null)? (null as any): this.viewUtils.sanitizer.sanitize(import10.SecurityContext.STYLE,currVal_20).toString()));
      this._expr_20 = currVal_20;
    }
    const currVal_21:any = import3.inlineInterpolate(1,'',this.parentView.context.summary.name,'');
    if (import3.checkBinding(throwOnChange,this._expr_21,currVal_21)) {
      this.renderer.setText(this._text_10,currVal_21);
      this._expr_21 = currVal_21;
    }
  }
  destroyInternal():void {
    this._vc_13.destroyNestedViews();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 13)) { return new View_GadgetContentModuleComponent2(this.viewUtils,this,13,this._anchor_13,this._vc_13); }
    return (null as any);
  }
}
class View_GadgetContentModuleComponent6 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_GadgetContentModuleComponent6,renderType_GadgetContentModuleComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'a',new import3.InlineArray2(2,'class','zee-module1-view-all'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n    Show More >\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_0,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_0));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1
    ]
    ),[disposable_0]);
    return (null as any);
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  handleEvent_0(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.parentView.context.viewAllItems()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}
class View_GadgetContentModuleComponent7 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_GadgetContentModuleComponent7,renderType_GadgetContentModuleComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'a',new import3.InlineArray2(2,'class','zee-module1-view-all'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n    Show less <\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_0,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_0));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1
    ]
    ),[disposable_0]);
    return (null as any);
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  handleEvent_0(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.parentView.context.viewAllItems()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}
var renderType_GadgetContentModuleComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_GadgetContentModuleComponent,{});
export class View_GadgetContentModuleComponent0 extends import2.AppView<import0.GadgetContentModuleComponent> {
  _anchor_0:any;
  /*private*/ _vc_0:import9.ViewContainer;
  _TemplateRef_0_5:any;
  _NgIf_0_6:import11.Wrapper_NgIf;
  _text_1:any;
  _anchor_2:any;
  /*private*/ _vc_2:import9.ViewContainer;
  _TemplateRef_2_5:any;
  _NgIf_2_6:import11.Wrapper_NgIf;
  _text_3:any;
  _anchor_4:any;
  /*private*/ _vc_4:import9.ViewContainer;
  _TemplateRef_4_5:any;
  _NgIf_4_6:import11.Wrapper_NgIf;
  _text_5:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_GadgetContentModuleComponent0,renderType_GadgetContentModuleComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._anchor_0 = this.renderer.createTemplateAnchor(parentRenderNode,(null as any));
    this._vc_0 = new import9.ViewContainer(0,(null as any),this,this._anchor_0);
    this._TemplateRef_0_5 = new import12.TemplateRef_(this,0,this._anchor_0);
    this._NgIf_0_6 = new import11.Wrapper_NgIf(this._vc_0.vcRef,this._TemplateRef_0_5);
    this._text_1 = this.renderer.createText(parentRenderNode,'\n\n  ',(null as any));
    this._anchor_2 = this.renderer.createTemplateAnchor(parentRenderNode,(null as any));
    this._vc_2 = new import9.ViewContainer(2,(null as any),this,this._anchor_2);
    this._TemplateRef_2_5 = new import12.TemplateRef_(this,2,this._anchor_2);
    this._NgIf_2_6 = new import11.Wrapper_NgIf(this._vc_2.vcRef,this._TemplateRef_2_5);
    this._text_3 = this.renderer.createText(parentRenderNode,'\n\n',(null as any));
    this._anchor_4 = this.renderer.createTemplateAnchor(parentRenderNode,(null as any));
    this._vc_4 = new import9.ViewContainer(4,(null as any),this,this._anchor_4);
    this._TemplateRef_4_5 = new import12.TemplateRef_(this,4,this._anchor_4);
    this._NgIf_4_6 = new import11.Wrapper_NgIf(this._vc_4.vcRef,this._TemplateRef_4_5);
    this._text_5 = this.renderer.createText(parentRenderNode,'\n\n',(null as any));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._anchor_0,
      this._text_1,
      this._anchor_2,
      this._text_3,
      this._anchor_4,
      this._text_5
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import12.TemplateRef) && (0 === requestNodeIndex))) { return this._TemplateRef_0_5; }
    if (((token === import13.NgIf) && (0 === requestNodeIndex))) { return this._NgIf_0_6.context; }
    if (((token === import12.TemplateRef) && (2 === requestNodeIndex))) { return this._TemplateRef_2_5; }
    if (((token === import13.NgIf) && (2 === requestNodeIndex))) { return this._NgIf_2_6.context; }
    if (((token === import12.TemplateRef) && (4 === requestNodeIndex))) { return this._TemplateRef_4_5; }
    if (((token === import13.NgIf) && (4 === requestNodeIndex))) { return this._NgIf_4_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = this.context.summary;
    this._NgIf_0_6.check_ngIf(currVal_0_0_0,throwOnChange,false);
    this._NgIf_0_6.ngDoCheck(this,this._anchor_0,throwOnChange);
    const currVal_2_0_0:any = (((this.context.summary && this.context.summary.viewAll) && !this.context.isExpanded) && this.context.isGreaterThanTwo);
    this._NgIf_2_6.check_ngIf(currVal_2_0_0,throwOnChange,false);
    this._NgIf_2_6.ngDoCheck(this,this._anchor_2,throwOnChange);
    const currVal_4_0_0:any = (((this.context.summary && this.context.summary.viewAll) && this.context.isExpanded) && this.context.isGreaterThanTwo);
    this._NgIf_4_6.check_ngIf(currVal_4_0_0,throwOnChange,false);
    this._NgIf_4_6.ngDoCheck(this,this._anchor_4,throwOnChange);
    this._vc_0.detectChangesInNestedViews(throwOnChange);
    this._vc_2.detectChangesInNestedViews(throwOnChange);
    this._vc_4.detectChangesInNestedViews(throwOnChange);
  }
  destroyInternal():void {
    this._vc_0.destroyNestedViews();
    this._vc_2.destroyNestedViews();
    this._vc_4.destroyNestedViews();
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 0)) { return new View_GadgetContentModuleComponent1(this.viewUtils,this,0,this._anchor_0,this._vc_0); }
    if ((nodeIndex == 2)) { return new View_GadgetContentModuleComponent6(this.viewUtils,this,2,this._anchor_2,this._vc_2); }
    if ((nodeIndex == 4)) { return new View_GadgetContentModuleComponent7(this.viewUtils,this,4,this._anchor_4,this._vc_4); }
    return (null as any);
  }
}