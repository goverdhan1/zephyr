/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../app/view/components/dashboard/gadgets/project_release_selection_gadget.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '../../../../../../app/actions/release.action';
import * as import7 from '@angular/core/src/linker/view_type';
import * as import8 from '@angular/core/src/change_detection/constants';
import * as import9 from '@angular/core/src/linker/component_factory';
import * as import10 from '@angular/http/src/http';
import * as import11 from '../../../../../node_modules/@angular/forms/src/directives/select_control_value_accessor.ngfactory';
import * as import12 from '../../../../../node_modules/@angular/forms/src/directives/select_multiple_control_value_accessor.ngfactory';
import * as import13 from '@angular/core/src/linker/view_container';
import * as import14 from '@angular/core/src/linker/element_ref';
import * as import15 from '@angular/forms/src/directives/select_control_value_accessor';
import * as import16 from '@angular/forms/src/directives/select_multiple_control_value_accessor';
import * as import17 from '../../../../../node_modules/@angular/forms/src/directives/ng_model.ngfactory';
import * as import18 from '../../../../../node_modules/@angular/forms/src/directives/ng_control_status.ngfactory';
import * as import19 from '../../../../../node_modules/@angular/common/src/directives/ng_for.ngfactory';
import * as import20 from '@angular/common/src/pipes/i18n_select_pipe';
import * as import21 from '@angular/core/src/linker/template_ref';
import * as import22 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import23 from '@angular/common/src/directives/ng_for';
import * as import24 from '@angular/forms/src/directives/control_value_accessor';
import * as import25 from '@angular/forms/src/directives/ng_model';
import * as import26 from '@angular/forms/src/directives/ng_control';
import * as import27 from '@angular/forms/src/directives/ng_control_status';
export class Wrapper_ZQLProjectReleaseSelectionComponent {
  /*private*/ _eventHandler:Function;
  context:import0.ZQLProjectReleaseSelectionComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  subscription0:any;
  constructor(p0:any) {
    this._changed = false;
    this.context = new import0.ZQLProjectReleaseSelectionComponent(p0);
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    this.context.ngOnDestroy();
    (this.subscription0 && this.subscription0.unsubscribe());
  }
  check_releaseId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.releaseId = currValue;
      this._expr_0 = currValue;
    }
  }
  check_projectId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.projectId = currValue;
      this._expr_1 = currValue;
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
    if (emit0) { (this.subscription0 = this.context.onProjectReleaseSelection.subscribe(_eventHandler.bind(view,'onProjectReleaseSelection'))); }
  }
}
var renderType_ZQLProjectReleaseSelectionComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_ZQLProjectReleaseSelectionComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.ZQLProjectReleaseSelectionComponent>;
  _ReleaseAction_0_3:import6.ReleaseAction;
  _ZQLProjectReleaseSelectionComponent_0_4:Wrapper_ZQLProjectReleaseSelectionComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ZQLProjectReleaseSelectionComponent_Host0,renderType_ZQLProjectReleaseSelectionComponent_Host,import7.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import8.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import9.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zui-gadgets-project-release',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_ZQLProjectReleaseSelectionComponent0(this.viewUtils,this,0,this._el_0);
    this._ReleaseAction_0_3 = new import6.ReleaseAction(this.injectorGet(import10.Http,this.parentIndex));
    this._ZQLProjectReleaseSelectionComponent_0_4 = new Wrapper_ZQLProjectReleaseSelectionComponent(this._ReleaseAction_0_3);
    this.compView_0.create(this._ZQLProjectReleaseSelectionComponent_0_4.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import9.ComponentRef_<any>(0,this,this._el_0,this._ZQLProjectReleaseSelectionComponent_0_4.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import6.ReleaseAction) && (0 === requestNodeIndex))) { return this._ReleaseAction_0_3; }
    if (((token === import0.ZQLProjectReleaseSelectionComponent) && (0 === requestNodeIndex))) { return this._ZQLProjectReleaseSelectionComponent_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._ZQLProjectReleaseSelectionComponent_0_4.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._ZQLProjectReleaseSelectionComponent_0_4.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._ZQLProjectReleaseSelectionComponent_0_4.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const ZQLProjectReleaseSelectionComponentNgFactory:import9.ComponentFactory<import0.ZQLProjectReleaseSelectionComponent> = new import9.ComponentFactory<import0.ZQLProjectReleaseSelectionComponent>('zui-gadgets-project-release',View_ZQLProjectReleaseSelectionComponent_Host0,import0.ZQLProjectReleaseSelectionComponent);
const styles_ZQLProjectReleaseSelectionComponent:any[] = ([] as any[]);
class View_ZQLProjectReleaseSelectionComponent1 extends import2.AppView<any> {
  _el_0:any;
  _NgSelectOption_0_3:import11.Wrapper_NgSelectOption;
  _NgSelectMultipleOption_0_4:import12.Wrapper_NgSelectMultipleOption;
  _text_1:any;
  /*private*/ _expr_4:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import13.ViewContainer) {
    super(View_ZQLProjectReleaseSelectionComponent1,renderType_ZQLProjectReleaseSelectionComponent,import7.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import8.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_4 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import9.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'option',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._NgSelectOption_0_3 = new import11.Wrapper_NgSelectOption(new import14.ElementRef(this._el_0),this.renderer,(<View_ZQLProjectReleaseSelectionComponent0>this.parentView)._SelectControlValueAccessor_6_3.context);
    this._NgSelectMultipleOption_0_4 = new import12.Wrapper_NgSelectMultipleOption(new import14.ElementRef(this._el_0),this.renderer,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import15.NgSelectOption) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) { return this._NgSelectOption_0_3.context; }
    if (((token === import16.NgSelectMultipleOption) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) { return this._NgSelectMultipleOption_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = import3.inlineInterpolate(1,'',this.context.$implicit.id,'');
    this._NgSelectOption_0_3.check_value(currVal_0_0_0,throwOnChange,false);
    this._NgSelectOption_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_0_1_0:any = import3.inlineInterpolate(1,'',this.context.$implicit.id,'');
    this._NgSelectMultipleOption_0_4.check_value(currVal_0_1_0,throwOnChange,false);
    this._NgSelectMultipleOption_0_4.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_4:any = import3.inlineInterpolate(1,'',this.context.$implicit.name,'');
    if (import3.checkBinding(throwOnChange,this._expr_4,currVal_4)) {
      this.renderer.setText(this._text_1,currVal_4);
      this._expr_4 = currVal_4;
    }
  }
  destroyInternal():void {
    this._NgSelectOption_0_3.ngOnDestroy();
    this._NgSelectMultipleOption_0_4.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
class View_ZQLProjectReleaseSelectionComponent2 extends import2.AppView<any> {
  _el_0:any;
  _NgSelectOption_0_3:import11.Wrapper_NgSelectOption;
  _NgSelectMultipleOption_0_4:import12.Wrapper_NgSelectMultipleOption;
  _text_1:any;
  /*private*/ _expr_4:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import13.ViewContainer) {
    super(View_ZQLProjectReleaseSelectionComponent2,renderType_ZQLProjectReleaseSelectionComponent,import7.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import8.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_4 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import9.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'option',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._NgSelectOption_0_3 = new import11.Wrapper_NgSelectOption(new import14.ElementRef(this._el_0),this.renderer,(<View_ZQLProjectReleaseSelectionComponent0>this.parentView)._SelectControlValueAccessor_17_3.context);
    this._NgSelectMultipleOption_0_4 = new import12.Wrapper_NgSelectMultipleOption(new import14.ElementRef(this._el_0),this.renderer,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import15.NgSelectOption) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) { return this._NgSelectOption_0_3.context; }
    if (((token === import16.NgSelectMultipleOption) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) { return this._NgSelectMultipleOption_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = import3.inlineInterpolate(1,'',this.context.$implicit.id,'');
    this._NgSelectOption_0_3.check_value(currVal_0_0_0,throwOnChange,false);
    this._NgSelectOption_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_0_1_0:any = import3.inlineInterpolate(1,'',this.context.$implicit.id,'');
    this._NgSelectMultipleOption_0_4.check_value(currVal_0_1_0,throwOnChange,false);
    this._NgSelectMultipleOption_0_4.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_4:any = import3.inlineInterpolate(1,'',this.context.$implicit.name,'');
    if (import3.checkBinding(throwOnChange,this._expr_4,currVal_4)) {
      this.renderer.setText(this._text_1,currVal_4);
      this._expr_4 = currVal_4;
    }
  }
  destroyInternal():void {
    this._NgSelectOption_0_3.ngOnDestroy();
    this._NgSelectMultipleOption_0_4.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
var renderType_ZQLProjectReleaseSelectionComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_ZQLProjectReleaseSelectionComponent,{});
export class View_ZQLProjectReleaseSelectionComponent0 extends import2.AppView<import0.ZQLProjectReleaseSelectionComponent> {
  _text_0:any;
  _el_1:any;
  _text_2:any;
  _el_3:any;
  _text_4:any;
  _text_5:any;
  _el_6:any;
  _SelectControlValueAccessor_6_3:import11.Wrapper_SelectControlValueAccessor;
  _NG_VALUE_ACCESSOR_6_4:any[];
  _NgModel_6_5:import17.Wrapper_NgModel;
  _NgControl_6_6:any;
  _NgControlStatus_6_7:import18.Wrapper_NgControlStatus;
  _text_7:any;
  _anchor_8:any;
  /*private*/ _vc_8:import13.ViewContainer;
  _TemplateRef_8_5:any;
  _NgFor_8_6:import19.Wrapper_NgFor;
  _text_9:any;
  _text_10:any;
  _text_11:any;
  _el_12:any;
  _text_13:any;
  _el_14:any;
  _text_15:any;
  _text_16:any;
  _el_17:any;
  _SelectControlValueAccessor_17_3:import11.Wrapper_SelectControlValueAccessor;
  _NG_VALUE_ACCESSOR_17_4:any[];
  _NgModel_17_5:import17.Wrapper_NgModel;
  _NgControl_17_6:any;
  _NgControlStatus_17_7:import18.Wrapper_NgControlStatus;
  _text_18:any;
  _anchor_19:any;
  /*private*/ _vc_19:import13.ViewContainer;
  _TemplateRef_19_5:any;
  _NgFor_19_6:import19.Wrapper_NgFor;
  _text_20:any;
  _text_21:any;
  _text_22:any;
  /*private*/ _expr_39:any;
  /*private*/ _expr_40:any;
  _pipe_i18nSelect_0:import20.I18nSelectPipe;
  _pipe_i18nSelect_0_0:any;
  /*private*/ _expr_43:any;
  /*private*/ _expr_44:any;
  _pipe_i18nSelect_0_1:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ZQLProjectReleaseSelectionComponent0,renderType_ZQLProjectReleaseSelectionComponent,import7.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import8.ChangeDetectorStatus.CheckAlways);
    this._expr_39 = import1.UNINITIALIZED;
    this._expr_40 = import1.UNINITIALIZED;
    this._expr_43 = import1.UNINITIALIZED;
    this._expr_44 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import9.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n        ',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_2 = this.renderer.createText(this._el_1,'\n            ',(null as any));
    this._el_3 = import3.createRenderElement(this.renderer,this._el_1,'label',new import3.InlineArray2(2,'for','dashboard-name'),(null as any));
    this._text_4 = this.renderer.createText(this._el_3,'',(null as any));
    this._text_5 = this.renderer.createText(this._el_1,'\n            ',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_1,'select',new import3.InlineArray2(2,'placeholder','Select Project'),(null as any));
    this._SelectControlValueAccessor_6_3 = new import11.Wrapper_SelectControlValueAccessor(this.renderer,new import14.ElementRef(this._el_6));
    this._NG_VALUE_ACCESSOR_6_4 = [this._SelectControlValueAccessor_6_3.context];
    this._NgModel_6_5 = new import17.Wrapper_NgModel((null as any),(null as any),(null as any),this._NG_VALUE_ACCESSOR_6_4);
    this._NgControl_6_6 = this._NgModel_6_5.context;
    this._NgControlStatus_6_7 = new import18.Wrapper_NgControlStatus(this._NgControl_6_6);
    this._text_7 = this.renderer.createText(this._el_6,'\n                ',(null as any));
    this._anchor_8 = this.renderer.createTemplateAnchor(this._el_6,(null as any));
    this._vc_8 = new import13.ViewContainer(8,6,this,this._anchor_8);
    this._TemplateRef_8_5 = new import21.TemplateRef_(this,8,this._anchor_8);
    this._NgFor_8_6 = new import19.Wrapper_NgFor(this._vc_8.vcRef,this._TemplateRef_8_5,this.parentView.injectorGet(import22.IterableDiffers,this.parentIndex),this.ref);
    this._text_9 = this.renderer.createText(this._el_6,'\n            ',(null as any));
    this._text_10 = this.renderer.createText(this._el_1,'\n        ',(null as any));
    this._text_11 = this.renderer.createText(parentRenderNode,'\n        ',(null as any));
    this._el_12 = import3.createRenderElement(this.renderer,parentRenderNode,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_13 = this.renderer.createText(this._el_12,'\n            ',(null as any));
    this._el_14 = import3.createRenderElement(this.renderer,this._el_12,'label',new import3.InlineArray2(2,'for','dashboard-name'),(null as any));
    this._text_15 = this.renderer.createText(this._el_14,'',(null as any));
    this._text_16 = this.renderer.createText(this._el_12,'\n            ',(null as any));
    this._el_17 = import3.createRenderElement(this.renderer,this._el_12,'select',new import3.InlineArray2(2,'placeholder','Select Release'),(null as any));
    this._SelectControlValueAccessor_17_3 = new import11.Wrapper_SelectControlValueAccessor(this.renderer,new import14.ElementRef(this._el_17));
    this._NG_VALUE_ACCESSOR_17_4 = [this._SelectControlValueAccessor_17_3.context];
    this._NgModel_17_5 = new import17.Wrapper_NgModel((null as any),(null as any),(null as any),this._NG_VALUE_ACCESSOR_17_4);
    this._NgControl_17_6 = this._NgModel_17_5.context;
    this._NgControlStatus_17_7 = new import18.Wrapper_NgControlStatus(this._NgControl_17_6);
    this._text_18 = this.renderer.createText(this._el_17,'\n                ',(null as any));
    this._anchor_19 = this.renderer.createTemplateAnchor(this._el_17,(null as any));
    this._vc_19 = new import13.ViewContainer(19,17,this,this._anchor_19);
    this._TemplateRef_19_5 = new import21.TemplateRef_(this,19,this._anchor_19);
    this._NgFor_19_6 = new import19.Wrapper_NgFor(this._vc_19.vcRef,this._TemplateRef_19_5,this.parentView.injectorGet(import22.IterableDiffers,this.parentIndex),this.ref);
    this._text_20 = this.renderer.createText(this._el_17,'\n            ',(null as any));
    this._text_21 = this.renderer.createText(this._el_12,'\n        ',(null as any));
    this._text_22 = this.renderer.createText(parentRenderNode,'\n    ',(null as any));
    this._pipe_i18nSelect_0 = new import20.I18nSelectPipe();
    this._pipe_i18nSelect_0_0 = import3.pureProxy2(this._pipe_i18nSelect_0.transform.bind(this._pipe_i18nSelect_0));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_6,new import3.InlineArray4(4,'change',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_6));
    this._pipe_i18nSelect_0_1 = import3.pureProxy2(this._pipe_i18nSelect_0.transform.bind(this._pipe_i18nSelect_0));
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_17,new import3.InlineArray4(4,'change',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_17));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._el_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._text_5,
      this._el_6,
      this._text_7,
      this._anchor_8,
      this._text_9,
      this._text_10,
      this._text_11,
      this._el_12,
      this._text_13,
      this._el_14,
      this._text_15,
      this._text_16,
      this._el_17,
      this._text_18,
      this._anchor_19,
      this._text_20,
      this._text_21,
      this._text_22
    ]
    ),[
      disposable_0,
      disposable_1
    ]
    );
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import21.TemplateRef) && (8 === requestNodeIndex))) { return this._TemplateRef_8_5; }
    if (((token === import23.NgFor) && (8 === requestNodeIndex))) { return this._NgFor_8_6.context; }
    if (((token === import15.SelectControlValueAccessor) && ((6 <= requestNodeIndex) && (requestNodeIndex <= 9)))) { return this._SelectControlValueAccessor_6_3.context; }
    if (((token === import24.NG_VALUE_ACCESSOR) && ((6 <= requestNodeIndex) && (requestNodeIndex <= 9)))) { return this._NG_VALUE_ACCESSOR_6_4; }
    if (((token === import25.NgModel) && ((6 <= requestNodeIndex) && (requestNodeIndex <= 9)))) { return this._NgModel_6_5.context; }
    if (((token === import26.NgControl) && ((6 <= requestNodeIndex) && (requestNodeIndex <= 9)))) { return this._NgControl_6_6; }
    if (((token === import27.NgControlStatus) && ((6 <= requestNodeIndex) && (requestNodeIndex <= 9)))) { return this._NgControlStatus_6_7.context; }
    if (((token === import21.TemplateRef) && (19 === requestNodeIndex))) { return this._TemplateRef_19_5; }
    if (((token === import23.NgFor) && (19 === requestNodeIndex))) { return this._NgFor_19_6.context; }
    if (((token === import15.SelectControlValueAccessor) && ((17 <= requestNodeIndex) && (requestNodeIndex <= 20)))) { return this._SelectControlValueAccessor_17_3.context; }
    if (((token === import24.NG_VALUE_ACCESSOR) && ((17 <= requestNodeIndex) && (requestNodeIndex <= 20)))) { return this._NG_VALUE_ACCESSOR_17_4; }
    if (((token === import25.NgModel) && ((17 <= requestNodeIndex) && (requestNodeIndex <= 20)))) { return this._NgModel_17_5.context; }
    if (((token === import26.NgControl) && ((17 <= requestNodeIndex) && (requestNodeIndex <= 20)))) { return this._NgControl_17_6; }
    if (((token === import27.NgControlStatus) && ((17 <= requestNodeIndex) && (requestNodeIndex <= 20)))) { return this._NgControlStatus_17_7.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const valUnwrapper:any = new import1.ValueUnwrapper();
    this._SelectControlValueAccessor_6_3.ngDoCheck(this,this._el_6,throwOnChange);
    const currVal_6_1_0:any = this.context.projectId;
    this._NgModel_6_5.check_model(currVal_6_1_0,throwOnChange,false);
    this._NgModel_6_5.ngDoCheck(this,this._el_6,throwOnChange);
    this._NgControlStatus_6_7.ngDoCheck(this,this._el_6,throwOnChange);
    const currVal_8_0_0:any = this.context._projects;
    this._NgFor_8_6.check_ngForOf(currVal_8_0_0,throwOnChange,false);
    this._NgFor_8_6.ngDoCheck(this,this._anchor_8,throwOnChange);
    this._SelectControlValueAccessor_17_3.ngDoCheck(this,this._el_17,throwOnChange);
    const currVal_17_1_0:any = this.context.releaseId;
    this._NgModel_17_5.check_model(currVal_17_1_0,throwOnChange,false);
    this._NgModel_17_5.ngDoCheck(this,this._el_17,throwOnChange);
    this._NgControlStatus_17_7.ngDoCheck(this,this._el_17,throwOnChange);
    const currVal_19_0_0:any = this.context._releases;
    this._NgFor_19_6.check_ngForOf(currVal_19_0_0,throwOnChange,false);
    this._NgFor_19_6.ngDoCheck(this,this._anchor_19,throwOnChange);
    this._vc_8.detectChangesInNestedViews(throwOnChange);
    this._vc_19.detectChangesInNestedViews(throwOnChange);
    const currVal_39:any = 'form-group';
    if (import3.checkBinding(throwOnChange,this._expr_39,currVal_39)) {
      this.renderer.setElementProperty(this._el_1,'className',currVal_39);
      this._expr_39 = currVal_39;
    }
    valUnwrapper.reset();
    const currVal_40:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(import3.castByValue(this._pipe_i18nSelect_0_0,this._pipe_i18nSelect_0.transform)('zephyr.project.name',this.context.i18nMessages)),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_40,currVal_40))) {
      this.renderer.setText(this._text_4,currVal_40);
      this._expr_40 = currVal_40;
    }
    this._NgControlStatus_6_7.checkHost(this,this,this._el_6,throwOnChange);
    const currVal_43:any = 'form-group';
    if (import3.checkBinding(throwOnChange,this._expr_43,currVal_43)) {
      this.renderer.setElementProperty(this._el_12,'className',currVal_43);
      this._expr_43 = currVal_43;
    }
    valUnwrapper.reset();
    const currVal_44:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(import3.castByValue(this._pipe_i18nSelect_0_1,this._pipe_i18nSelect_0.transform)('zephyr.release.name',this.context.i18nMessages)),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_44,currVal_44))) {
      this.renderer.setText(this._text_15,currVal_44);
      this._expr_44 = currVal_44;
    }
    this._NgControlStatus_17_7.checkHost(this,this,this._el_17,throwOnChange);
  }
  destroyInternal():void {
    this._vc_8.destroyNestedViews();
    this._vc_19.destroyNestedViews();
    this._NgModel_6_5.ngOnDestroy();
    this._NgModel_17_5.ngOnDestroy();
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 8)) { return new View_ZQLProjectReleaseSelectionComponent1(this.viewUtils,this,8,this._anchor_8,this._vc_8); }
    if ((nodeIndex == 19)) { return new View_ZQLProjectReleaseSelectionComponent2(this.viewUtils,this,19,this._anchor_19,this._vc_19); }
    return (null as any);
  }
  handleEvent_6(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._SelectControlValueAccessor_6_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'change')) {
      const pd_sub_0:any = ((<any>this.context.onProjectSelect($event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_17(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._SelectControlValueAccessor_17_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'change')) {
      const pd_sub_0:any = ((<any>this.context.onReleaseSelect($event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}