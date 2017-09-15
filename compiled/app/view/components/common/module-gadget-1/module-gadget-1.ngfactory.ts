/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../app/view/components/common/module-gadget-1/module-gadget-1';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '@angular/core/src/linker/view_container';
import * as import10 from '../../../../../node_modules/@angular/common/src/directives/ng_for.ngfactory';
import * as import11 from '@angular/core/src/linker/template_ref';
import * as import12 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import13 from '@angular/common/src/directives/ng_for';
import * as import14 from '../../../../../node_modules/@angular/common/src/directives/ng_class.ngfactory';
import * as import15 from '../../../../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import16 from '@angular/core/src/change_detection/differs/keyvalue_differs';
import * as import17 from '@angular/core/src/linker/element_ref';
import * as import18 from '@angular/common/src/directives/ng_if';
import * as import19 from '@angular/common/src/directives/ng_class';
import * as import20 from '@angular/core/src/security';
export class Wrapper_GadgetContentModule1Component {
  /*private*/ _eventHandler:Function;
  context:import0.GadgetContentModule1Component;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  constructor() {
    this._changed = false;
    this.context = new import0.GadgetContentModule1Component();
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
var renderType_GadgetContentModule1Component_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_GadgetContentModule1Component_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.GadgetContentModule1Component>;
  _GadgetContentModule1Component_0_3:Wrapper_GadgetContentModule1Component;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_GadgetContentModule1Component_Host0,renderType_GadgetContentModule1Component_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zee-content-module-gadget-1',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_GadgetContentModule1Component0(this.viewUtils,this,0,this._el_0);
    this._GadgetContentModule1Component_0_3 = new Wrapper_GadgetContentModule1Component();
    this.compView_0.create(this._GadgetContentModule1Component_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._GadgetContentModule1Component_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.GadgetContentModule1Component) && (0 === requestNodeIndex))) { return this._GadgetContentModule1Component_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._GadgetContentModule1Component_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const GadgetContentModule1ComponentNgFactory:import8.ComponentFactory<import0.GadgetContentModule1Component> = new import8.ComponentFactory<import0.GadgetContentModule1Component>('zee-content-module-gadget-1',View_GadgetContentModule1Component_Host0,import0.GadgetContentModule1Component);
const styles_GadgetContentModule1Component:any[] = ([] as any[]);
class View_GadgetContentModule1Component2 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_GadgetContentModule1Component2,renderType_GadgetContentModule1Component,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'span',new import3.InlineArray2(2,'class','group-hover-trigger'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n            ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'i',new import3.InlineArray4(4,'aria-hidden','true','class','fa fa-info-circle'),(null as any));
    this._text_3 = this.renderer.createText(this._el_0,'\n          ',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3
    ]
    ),(null as any));
    return (null as any);
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
class View_GadgetContentModule1Component3 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _text_6:any;
  _el_7:any;
  _text_8:any;
  _text_9:any;
  _text_10:any;
  /*private*/ _expr_11:any;
  /*private*/ _expr_12:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_GadgetContentModule1Component3,renderType_GadgetContentModule1Component,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_11 = import1.UNINITIALIZED;
    this._expr_12 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'span',new import3.InlineArray2(2,'class','group-hover-wrapper hide'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n            ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n              ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'span',new import3.InlineArray2(2,'style','float: left;'),(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'',(null as any));
    this._text_6 = this.renderer.createText(this._el_2,'\n              ',(null as any));
    this._el_7 = import3.createRenderElement(this.renderer,this._el_2,'span',new import3.InlineArray2(2,'style','float: right;'),(null as any));
    this._text_8 = this.renderer.createText(this._el_7,'',(null as any));
    this._text_9 = this.renderer.createText(this._el_2,'\n            ',(null as any));
    this._text_10 = this.renderer.createText(this._el_0,'\n          ',(null as any));
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
      this._text_9,
      this._text_10
    ]
    ),(null as any));
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_11:any = import3.inlineInterpolate(1,'',this.context.$implicit.name,':');
    if (import3.checkBinding(throwOnChange,this._expr_11,currVal_11)) {
      this.renderer.setText(this._text_5,currVal_11);
      this._expr_11 = currVal_11;
    }
    const currVal_12:any = import3.inlineInterpolate(1,'',this.context.$implicit.count,'');
    if (import3.checkBinding(throwOnChange,this._expr_12,currVal_12)) {
      this.renderer.setText(this._text_8,currVal_12);
      this._expr_12 = currVal_12;
    }
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
class View_GadgetContentModule1Component5 extends import2.AppView<any> {
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
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_GadgetContentModule1Component5,renderType_GadgetContentModule1Component,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_11 = import1.UNINITIALIZED;
    this._expr_12 = import1.UNINITIALIZED;
    this._expr_13 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'div',new import3.InlineArray2(2,'class','col-md-6 row item-center'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'span',new import3.InlineArray4(4,'class','zee-module1-item-name col-md-6','style','text-align: right; padding: 0px; margin-right: 10px; word-wrap: break-word;'),(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'',(null as any));
    this._text_4 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this._el_5 = import3.createRenderElement(this.renderer,this._el_0,'span',new import3.InlineArray2(2,'style','margin-right: 5px;'),(null as any));
    this._text_6 = this.renderer.createText(this._el_5,':',(null as any));
    this._text_7 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this._el_8 = import3.createRenderElement(this.renderer,this._el_0,'span',new import3.InlineArray2(2,'class','col-md-3;'),(null as any));
    this._text_9 = this.renderer.createText(this._el_8,'',(null as any));
    this._text_10 = this.renderer.createText(this._el_0,'\n      ',(null as any));
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
    const currVal_11:any = import3.inlineInterpolate(1,'\n          ',this.context.$implicit.name,'\n        ');
    if (import3.checkBinding(throwOnChange,this._expr_11,currVal_11)) {
      this.renderer.setText(this._text_3,currVal_11);
      this._expr_11 = currVal_11;
    }
    const currVal_12:any = this.context.$implicit.highlightCount;
    if (import3.checkBinding(throwOnChange,this._expr_12,currVal_12)) {
      this.renderer.setElementClass(this._el_8,'aui-lozenge',currVal_12);
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
class View_GadgetContentModule1Component4 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  _text_2:any;
  _anchor_3:any;
  /*private*/ _vc_3:import9.ViewContainer;
  _TemplateRef_3_5:any;
  _NgFor_3_6:import10.Wrapper_NgFor;
  _text_4:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_GadgetContentModule1Component4,renderType_GadgetContentModule1Component,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'div',new import3.InlineArray2(2,'class','row'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n      ',(null as any));
    this._text_2 = this.renderer.createText(this._el_0,'\n      ',(null as any));
    this._anchor_3 = this.renderer.createTemplateAnchor(this._el_0,(null as any));
    this._vc_3 = new import9.ViewContainer(3,0,this,this._anchor_3);
    this._TemplateRef_3_5 = new import11.TemplateRef_(this,3,this._anchor_3);
    this._NgFor_3_6 = new import10.Wrapper_NgFor(this._vc_3.vcRef,this._TemplateRef_3_5,this.parentView.parentView.injectorGet(import12.IterableDiffers,this.parentView.parentIndex),this.parentView.parentView.ref);
    this._text_4 = this.renderer.createText(this._el_0,'\n    ',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._text_2,
      this._anchor_3,
      this._text_4
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import11.TemplateRef) && (3 === requestNodeIndex))) { return this._TemplateRef_3_5; }
    if (((token === import13.NgFor) && (3 === requestNodeIndex))) { return this._NgFor_3_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_3_0_0:any = this.context.$implicit.items;
    this._NgFor_3_6.check_ngForOf(currVal_3_0_0,throwOnChange,false);
    this._NgFor_3_6.ngDoCheck(this,this._anchor_3,throwOnChange);
    this._vc_3.detectChangesInNestedViews(throwOnChange);
  }
  destroyInternal():void {
    this._vc_3.destroyNestedViews();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 3)) { return new View_GadgetContentModule1Component5(this.viewUtils,this,3,this._anchor_3,this._vc_3); }
    return (null as any);
  }
}
class View_GadgetContentModule1Component1 extends import2.AppView<any> {
  _el_0:any;
  _NgClass_0_3:import14.Wrapper_NgClass;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _text_8:any;
  _el_9:any;
  _text_10:any;
  _el_11:any;
  _text_12:any;
  _text_13:any;
  _anchor_14:any;
  /*private*/ _vc_14:import9.ViewContainer;
  _TemplateRef_14_5:any;
  _NgIf_14_6:import15.Wrapper_NgIf;
  _text_15:any;
  _anchor_16:any;
  /*private*/ _vc_16:import9.ViewContainer;
  _TemplateRef_16_5:any;
  _NgFor_16_6:import10.Wrapper_NgFor;
  _text_17:any;
  _text_18:any;
  _text_19:any;
  _el_20:any;
  _text_21:any;
  _anchor_22:any;
  /*private*/ _vc_22:import9.ViewContainer;
  _TemplateRef_22_5:any;
  _NgFor_22_6:import10.Wrapper_NgFor;
  _text_23:any;
  _text_24:any;
  _map_35:any;
  /*private*/ _expr_36:any;
  /*private*/ _expr_37:any;
  /*private*/ _expr_38:any;
  /*private*/ _expr_39:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_GadgetContentModule1Component1,renderType_GadgetContentModule1Component,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._map_35 = import3.pureProxy1((p0:any):{[key: string]:any} => {
      return {'content-center': p0};
    });
    this._expr_36 = import1.UNINITIALIZED;
    this._expr_37 = import1.UNINITIALIZED;
    this._expr_38 = import1.UNINITIALIZED;
    this._expr_39 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._NgClass_0_3 = new import14.Wrapper_NgClass(this.parentView.injectorGet(import12.IterableDiffers,this.parentIndex),this.parentView.injectorGet(import16.KeyValueDiffers,this.parentIndex),new import17.ElementRef(this._el_0),this.renderer);
    this._text_1 = this.renderer.createText(this._el_0,'\n  ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'div',new import3.InlineArray2(2,'class','col-md-2'),(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n    ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'div',new import3.InlineArray2(2,'class','text-center'),(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'\n      ',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_4,'span',new import3.InlineArray2(2,'class','zee-module1-title'),(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'',(null as any));
    this._text_8 = this.renderer.createText(this._el_4,'\n      ',(null as any));
    this._el_9 = import3.createRenderElement(this.renderer,this._el_4,'br',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_10 = this.renderer.createText(this._el_4,'\n      ',(null as any));
    this._el_11 = import3.createRenderElement(this.renderer,this._el_4,'span',new import3.InlineArray2(2,'class','zee-module1-summary-name'),(null as any));
    this._text_12 = this.renderer.createText(this._el_11,'',(null as any));
    this._text_13 = this.renderer.createText(this._el_4,'\n      ',(null as any));
    this._anchor_14 = this.renderer.createTemplateAnchor(this._el_4,(null as any));
    this._vc_14 = new import9.ViewContainer(14,4,this,this._anchor_14);
    this._TemplateRef_14_5 = new import11.TemplateRef_(this,14,this._anchor_14);
    this._NgIf_14_6 = new import15.Wrapper_NgIf(this._vc_14.vcRef,this._TemplateRef_14_5);
    this._text_15 = this.renderer.createText(this._el_4,'\n      ',(null as any));
    this._anchor_16 = this.renderer.createTemplateAnchor(this._el_4,(null as any));
    this._vc_16 = new import9.ViewContainer(16,4,this,this._anchor_16);
    this._TemplateRef_16_5 = new import11.TemplateRef_(this,16,this._anchor_16);
    this._NgFor_16_6 = new import10.Wrapper_NgFor(this._vc_16.vcRef,this._TemplateRef_16_5,this.parentView.injectorGet(import12.IterableDiffers,this.parentIndex),this.parentView.ref);
    this._text_17 = this.renderer.createText(this._el_4,'\n    ',(null as any));
    this._text_18 = this.renderer.createText(this._el_2,'\n  ',(null as any));
    this._text_19 = this.renderer.createText(this._el_0,'\n  ',(null as any));
    this._el_20 = import3.createRenderElement(this.renderer,this._el_0,'div',new import3.InlineArray2(2,'class','col-md-10'),(null as any));
    this._text_21 = this.renderer.createText(this._el_20,'\n    ',(null as any));
    this._anchor_22 = this.renderer.createTemplateAnchor(this._el_20,(null as any));
    this._vc_22 = new import9.ViewContainer(22,20,this,this._anchor_22);
    this._TemplateRef_22_5 = new import11.TemplateRef_(this,22,this._anchor_22);
    this._NgFor_22_6 = new import10.Wrapper_NgFor(this._vc_22.vcRef,this._TemplateRef_22_5,this.parentView.injectorGet(import12.IterableDiffers,this.parentIndex),this.parentView.ref);
    this._text_23 = this.renderer.createText(this._el_20,'\n  ',(null as any));
    this._text_24 = this.renderer.createText(this._el_0,'\n',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._el_6,
      this._text_7,
      this._text_8,
      this._el_9,
      this._text_10,
      this._el_11,
      this._text_12,
      this._text_13,
      this._anchor_14,
      this._text_15,
      this._anchor_16,
      this._text_17,
      this._text_18,
      this._text_19,
      this._el_20,
      this._text_21,
      this._anchor_22,
      this._text_23,
      this._text_24
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import11.TemplateRef) && (14 === requestNodeIndex))) { return this._TemplateRef_14_5; }
    if (((token === import18.NgIf) && (14 === requestNodeIndex))) { return this._NgIf_14_6.context; }
    if (((token === import11.TemplateRef) && (16 === requestNodeIndex))) { return this._TemplateRef_16_5; }
    if (((token === import13.NgFor) && (16 === requestNodeIndex))) { return this._NgFor_16_6.context; }
    if (((token === import11.TemplateRef) && (22 === requestNodeIndex))) { return this._TemplateRef_22_5; }
    if (((token === import13.NgFor) && (22 === requestNodeIndex))) { return this._NgFor_22_6.context; }
    if (((token === import19.NgClass) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 24)))) { return this._NgClass_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = import3.inlineInterpolate(1,'zee-module1-wrapper ',this.parentView.context.summary.class,' row');
    this._NgClass_0_3.check_klass(currVal_0_0_0,throwOnChange,false);
    const currVal_0_0_1:any = this._map_35(this.parentView.context.headerCentered);
    this._NgClass_0_3.check_ngClass(currVal_0_0_1,throwOnChange,false);
    this._NgClass_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_14_0_0:any = (this.parentView.context.summary && this.parentView.context.summary.hoverItems);
    this._NgIf_14_6.check_ngIf(currVal_14_0_0,throwOnChange,false);
    this._NgIf_14_6.ngDoCheck(this,this._anchor_14,throwOnChange);
    const currVal_16_0_0:any = this.parentView.context.summary.hoverItems;
    this._NgFor_16_6.check_ngForOf(currVal_16_0_0,throwOnChange,false);
    this._NgFor_16_6.ngDoCheck(this,this._anchor_16,throwOnChange);
    const currVal_22_0_0:any = this.parentView.context.summary.groups;
    this._NgFor_22_6.check_ngForOf(currVal_22_0_0,throwOnChange,false);
    this._NgFor_22_6.ngDoCheck(this,this._anchor_22,throwOnChange);
    this._vc_14.detectChangesInNestedViews(throwOnChange);
    this._vc_16.detectChangesInNestedViews(throwOnChange);
    this._vc_22.detectChangesInNestedViews(throwOnChange);
    const currVal_36:any = this.parentView.context.summary.color;
    if (import3.checkBinding(throwOnChange,this._expr_36,currVal_36)) {
      this.renderer.setElementStyle(this._el_6,'color',((this.viewUtils.sanitizer.sanitize(import20.SecurityContext.STYLE,currVal_36) == null)? (null as any): this.viewUtils.sanitizer.sanitize(import20.SecurityContext.STYLE,currVal_36).toString()));
      this._expr_36 = currVal_36;
    }
    const currVal_37:any = import3.inlineInterpolate(1,'',this.parentView.context.summary.count,'');
    if (import3.checkBinding(throwOnChange,this._expr_37,currVal_37)) {
      this.renderer.setText(this._text_7,currVal_37);
      this._expr_37 = currVal_37;
    }
    const currVal_38:any = this.parentView.context.summary.color;
    if (import3.checkBinding(throwOnChange,this._expr_38,currVal_38)) {
      this.renderer.setElementStyle(this._el_11,'border-bottom-color',((this.viewUtils.sanitizer.sanitize(import20.SecurityContext.STYLE,currVal_38) == null)? (null as any): this.viewUtils.sanitizer.sanitize(import20.SecurityContext.STYLE,currVal_38).toString()));
      this._expr_38 = currVal_38;
    }
    const currVal_39:any = import3.inlineInterpolate(1,'',this.parentView.context.summary.name,'');
    if (import3.checkBinding(throwOnChange,this._expr_39,currVal_39)) {
      this.renderer.setText(this._text_12,currVal_39);
      this._expr_39 = currVal_39;
    }
  }
  destroyInternal():void {
    this._vc_14.destroyNestedViews();
    this._vc_16.destroyNestedViews();
    this._vc_22.destroyNestedViews();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 14)) { return new View_GadgetContentModule1Component2(this.viewUtils,this,14,this._anchor_14,this._vc_14); }
    if ((nodeIndex == 16)) { return new View_GadgetContentModule1Component3(this.viewUtils,this,16,this._anchor_16,this._vc_16); }
    if ((nodeIndex == 22)) { return new View_GadgetContentModule1Component4(this.viewUtils,this,22,this._anchor_22,this._vc_22); }
    return (null as any);
  }
}
var renderType_GadgetContentModule1Component:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_GadgetContentModule1Component,{});
export class View_GadgetContentModule1Component0 extends import2.AppView<import0.GadgetContentModule1Component> {
  _anchor_0:any;
  /*private*/ _vc_0:import9.ViewContainer;
  _TemplateRef_0_5:any;
  _NgIf_0_6:import15.Wrapper_NgIf;
  _text_1:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_GadgetContentModule1Component0,renderType_GadgetContentModule1Component,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._anchor_0 = this.renderer.createTemplateAnchor(parentRenderNode,(null as any));
    this._vc_0 = new import9.ViewContainer(0,(null as any),this,this._anchor_0);
    this._TemplateRef_0_5 = new import11.TemplateRef_(this,0,this._anchor_0);
    this._NgIf_0_6 = new import15.Wrapper_NgIf(this._vc_0.vcRef,this._TemplateRef_0_5);
    this._text_1 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._anchor_0,
      this._text_1
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import11.TemplateRef) && (0 === requestNodeIndex))) { return this._TemplateRef_0_5; }
    if (((token === import18.NgIf) && (0 === requestNodeIndex))) { return this._NgIf_0_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = this.context.summary;
    this._NgIf_0_6.check_ngIf(currVal_0_0_0,throwOnChange,false);
    this._NgIf_0_6.ngDoCheck(this,this._anchor_0,throwOnChange);
    this._vc_0.detectChangesInNestedViews(throwOnChange);
  }
  destroyInternal():void {
    this._vc_0.destroyNestedViews();
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 0)) { return new View_GadgetContentModule1Component1(this.viewUtils,this,0,this._anchor_0,this._vc_0); }
    return (null as any);
  }
}