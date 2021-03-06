/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../../app/view/components/admin/customizations/scheduling/scheduling.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '../../../../../../../app/actions/admin.action';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '@angular/http/src/http';
import * as import10 from '../../../../../../../app/services/pouch.db.service';
import * as import11 from '@angular/core/src/zone/ng_zone';
import * as import12 from '../../../../../../node_modules/@angular/forms/src/directives/select_control_value_accessor.ngfactory';
import * as import13 from '../../../../../../node_modules/@angular/forms/src/directives/select_multiple_control_value_accessor.ngfactory';
import * as import14 from '@angular/core/src/linker/view_container';
import * as import15 from '@angular/core/src/change_detection/change_detection_util';
import * as import16 from '@angular/core/src/linker/element_ref';
import * as import17 from '@angular/forms/src/directives/select_control_value_accessor';
import * as import18 from '@angular/forms/src/directives/select_multiple_control_value_accessor';
import * as import19 from '../../../../../../../app/view/components/common/modal/modal.component';
import * as import20 from '../../../common/modal/modal.component.ngfactory';
import * as import21 from '../../../../../../node_modules/@angular/forms/src/directives/ng_model.ngfactory';
import * as import22 from '../../../../../../node_modules/@angular/forms/src/directives/ng_control_status.ngfactory';
import * as import23 from '../../../../../../node_modules/@angular/common/src/directives/ng_for.ngfactory';
import * as import24 from '@angular/core/src/linker/template_ref';
import * as import25 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import26 from '@angular/common/src/directives/ng_for';
import * as import27 from '@angular/forms/src/directives/control_value_accessor';
import * as import28 from '@angular/forms/src/directives/ng_model';
import * as import29 from '@angular/forms/src/directives/ng_control';
import * as import30 from '@angular/forms/src/directives/ng_control_status';
export class Wrapper_SchedulingModalComponent {
  /*private*/ _eventHandler:Function;
  context:import0.SchedulingModalComponent;
  /*private*/ _changed:boolean;
  subscription0:any;
  constructor(p0:any,p1:any) {
    this._changed = false;
    this.context = new import0.SchedulingModalComponent(p0,p1);
  }
  ngOnDetach(view:import1.AppView<any>,componentView:import1.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    this.context.ngOnDestroy();
    (this.subscription0 && this.subscription0.unsubscribe());
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
  subscribe(view:import1.AppView<any>,_eventHandler:any,emit0:boolean):void {
    this._eventHandler = _eventHandler;
    if (emit0) { (this.subscription0 = this.context.confirmationDialogueData.subscribe(_eventHandler.bind(view,'confirmationDialogueData'))); }
  }
}
var renderType_SchedulingModalComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_SchedulingModalComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.SchedulingModalComponent>;
  _AdminAction_0_3:import5.AdminAction;
  _SchedulingModalComponent_0_4:Wrapper_SchedulingModalComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_SchedulingModalComponent_Host0,renderType_SchedulingModalComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'scheduling-modal',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_SchedulingModalComponent0(this.viewUtils,this,0,this._el_0);
    this._AdminAction_0_3 = new import5.AdminAction(this.injectorGet(import9.Http,this.parentIndex),this.injectorGet(import10.PouchDBPrefsServices,this.parentIndex));
    this._SchedulingModalComponent_0_4 = new Wrapper_SchedulingModalComponent(this._AdminAction_0_3,this.injectorGet(import11.NgZone,this.parentIndex));
    this.compView_0.create(this._SchedulingModalComponent_0_4.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._SchedulingModalComponent_0_4.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import5.AdminAction) && (0 === requestNodeIndex))) { return this._AdminAction_0_3; }
    if (((token === import0.SchedulingModalComponent) && (0 === requestNodeIndex))) { return this._SchedulingModalComponent_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._SchedulingModalComponent_0_4.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._SchedulingModalComponent_0_4.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._SchedulingModalComponent_0_4.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const SchedulingModalComponentNgFactory:import8.ComponentFactory<import0.SchedulingModalComponent> = new import8.ComponentFactory<import0.SchedulingModalComponent>('scheduling-modal',View_SchedulingModalComponent_Host0,import0.SchedulingModalComponent);
const styles_SchedulingModalComponent:any[] = ([] as any[]);
class View_SchedulingModalComponent1 extends import1.AppView<any> {
  _el_0:any;
  _NgSelectOption_0_3:import12.Wrapper_NgSelectOption;
  _NgSelectMultipleOption_0_4:import13.Wrapper_NgSelectMultipleOption;
  _text_1:any;
  /*private*/ _expr_4:any;
  /*private*/ _expr_5:any;
  /*private*/ _expr_6:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import14.ViewContainer) {
    super(View_SchedulingModalComponent1,renderType_SchedulingModalComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_4 = import15.UNINITIALIZED;
    this._expr_5 = import15.UNINITIALIZED;
    this._expr_6 = import15.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'option',new import3.InlineArray2(2,'id','time-hour-select'),(null as any));
    this._NgSelectOption_0_3 = new import12.Wrapper_NgSelectOption(new import16.ElementRef(this._el_0),this.renderer,(<View_SchedulingModalComponent0>this.parentView)._SelectControlValueAccessor_23_3.context);
    this._NgSelectMultipleOption_0_4 = new import13.Wrapper_NgSelectMultipleOption(new import16.ElementRef(this._el_0),this.renderer,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import17.NgSelectOption) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) { return this._NgSelectOption_0_3.context; }
    if (((token === import18.NgSelectMultipleOption) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) { return this._NgSelectMultipleOption_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._NgSelectOption_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this._NgSelectMultipleOption_0_4.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_4:any = (this.parentView.context.etlHourSelect == this.context.index);
    if (import3.checkBinding(throwOnChange,this._expr_4,currVal_4)) {
      this.renderer.setElementProperty(this._el_0,'selected',currVal_4);
      this._expr_4 = currVal_4;
    }
    const currVal_5:any = this.context.index;
    if (import3.checkBinding(throwOnChange,this._expr_5,currVal_5)) {
      this.renderer.setElementAttribute(this._el_0,'value',((currVal_5 == null)? (null as any): currVal_5.toString()));
      this._expr_5 = currVal_5;
    }
    const currVal_6:any = import3.inlineInterpolate(1,'',this.context.index,'');
    if (import3.checkBinding(throwOnChange,this._expr_6,currVal_6)) {
      this.renderer.setText(this._text_1,currVal_6);
      this._expr_6 = currVal_6;
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
class View_SchedulingModalComponent2 extends import1.AppView<any> {
  _el_0:any;
  _NgSelectOption_0_3:import12.Wrapper_NgSelectOption;
  _NgSelectMultipleOption_0_4:import13.Wrapper_NgSelectMultipleOption;
  _text_1:any;
  /*private*/ _expr_4:any;
  /*private*/ _expr_5:any;
  /*private*/ _expr_6:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import14.ViewContainer) {
    super(View_SchedulingModalComponent2,renderType_SchedulingModalComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_4 = import15.UNINITIALIZED;
    this._expr_5 = import15.UNINITIALIZED;
    this._expr_6 = import15.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'option',new import3.InlineArray2(2,'id','time-min-select'),(null as any));
    this._NgSelectOption_0_3 = new import12.Wrapper_NgSelectOption(new import16.ElementRef(this._el_0),this.renderer,(<View_SchedulingModalComponent0>this.parentView)._SelectControlValueAccessor_40_3.context);
    this._NgSelectMultipleOption_0_4 = new import13.Wrapper_NgSelectMultipleOption(new import16.ElementRef(this._el_0),this.renderer,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import17.NgSelectOption) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) { return this._NgSelectOption_0_3.context; }
    if (((token === import18.NgSelectMultipleOption) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 1)))) { return this._NgSelectMultipleOption_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._NgSelectOption_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this._NgSelectMultipleOption_0_4.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_4:any = (this.parentView.context.etlMmSelect == this.context.index);
    if (import3.checkBinding(throwOnChange,this._expr_4,currVal_4)) {
      this.renderer.setElementProperty(this._el_0,'selected',currVal_4);
      this._expr_4 = currVal_4;
    }
    const currVal_5:any = this.context.index;
    if (import3.checkBinding(throwOnChange,this._expr_5,currVal_5)) {
      this.renderer.setElementAttribute(this._el_0,'value',((currVal_5 == null)? (null as any): currVal_5.toString()));
      this._expr_5 = currVal_5;
    }
    const currVal_6:any = import3.inlineInterpolate(1,'',this.context.index,'');
    if (import3.checkBinding(throwOnChange,this._expr_6,currVal_6)) {
      this.renderer.setText(this._text_1,currVal_6);
      this._expr_6 = currVal_6;
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
var renderType_SchedulingModalComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_SchedulingModalComponent,{});
export class View_SchedulingModalComponent0 extends import1.AppView<import0.SchedulingModalComponent> {
  _el_0:any;
  compView_0:import1.AppView<import19.ModalComponent>;
  _ModalComponent_0_3:import20.Wrapper_ModalComponent;
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
  _el_12:any;
  _text_13:any;
  _el_14:any;
  _text_15:any;
  _el_16:any;
  _text_17:any;
  _el_18:any;
  _text_19:any;
  _text_20:any;
  _el_21:any;
  _text_22:any;
  _el_23:any;
  _SelectControlValueAccessor_23_3:import12.Wrapper_SelectControlValueAccessor;
  _NG_VALUE_ACCESSOR_23_4:any[];
  _NgModel_23_5:import21.Wrapper_NgModel;
  _NgControl_23_6:any;
  _NgControlStatus_23_7:import22.Wrapper_NgControlStatus;
  _text_24:any;
  _anchor_25:any;
  /*private*/ _vc_25:import14.ViewContainer;
  _TemplateRef_25_5:any;
  _NgFor_25_6:import23.Wrapper_NgFor;
  _text_26:any;
  _text_27:any;
  _text_28:any;
  _text_29:any;
  _text_30:any;
  _el_31:any;
  _text_32:any;
  _el_33:any;
  _text_34:any;
  _el_35:any;
  _text_36:any;
  _text_37:any;
  _el_38:any;
  _text_39:any;
  _el_40:any;
  _SelectControlValueAccessor_40_3:import12.Wrapper_SelectControlValueAccessor;
  _NG_VALUE_ACCESSOR_40_4:any[];
  _NgModel_40_5:import21.Wrapper_NgModel;
  _NgControl_40_6:any;
  _NgControlStatus_40_7:import22.Wrapper_NgControlStatus;
  _text_41:any;
  _anchor_42:any;
  /*private*/ _vc_42:import14.ViewContainer;
  _TemplateRef_42_5:any;
  _NgFor_42_6:import23.Wrapper_NgFor;
  _text_43:any;
  _text_44:any;
  _text_45:any;
  _text_46:any;
  _text_47:any;
  _text_48:any;
  _text_49:any;
  _text_50:any;
  _el_51:any;
  _text_52:any;
  _el_53:any;
  _text_54:any;
  _text_55:any;
  _el_56:any;
  _text_57:any;
  _text_58:any;
  _text_59:any;
  /*private*/ _expr_78:any;
  /*private*/ _expr_79:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_SchedulingModalComponent0,renderType_SchedulingModalComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
    this._expr_78 = import15.UNINITIALIZED;
    this._expr_79 = import15.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'zui-modal',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_0 = new import20.View_ModalComponent0(this.viewUtils,this,0,this._el_0);
    this._ModalComponent_0_3 = new import20.Wrapper_ModalComponent(new import16.ElementRef(this._el_0),this.compView_0.ref);
    this._text_1 = this.renderer.createText((null as any),'\n	',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,(null as any),'zui-modal-body',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n	    ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'p',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'',(null as any));
    this._text_6 = this.renderer.createText(this._el_2,'\n	    ',(null as any));
    this._el_7 = import3.createRenderElement(this.renderer,this._el_2,'div',new import3.InlineArray2(2,'class','subform'),(null as any));
    this._text_8 = this.renderer.createText(this._el_7,'\n	    	',(null as any));
    this._el_9 = import3.createRenderElement(this.renderer,this._el_7,'p',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_10 = this.renderer.createText(this._el_9,' Time (millitary format) ',(null as any));
    this._text_11 = this.renderer.createText(this._el_7,'\n	    	',(null as any));
    this._el_12 = import3.createRenderElement(this.renderer,this._el_7,'div',new import3.InlineArray2(2,'class','row'),(null as any));
    this._text_13 = this.renderer.createText(this._el_12,'\n		        	',(null as any));
    this._el_14 = import3.createRenderElement(this.renderer,this._el_12,'div',new import3.InlineArray2(2,'class','col-md-6 col-xs-12'),(null as any));
    this._text_15 = this.renderer.createText(this._el_14,'\n		        		',(null as any));
    this._el_16 = import3.createRenderElement(this.renderer,this._el_14,'div',new import3.InlineArray2(2,'class','clearfix'),(null as any));
    this._text_17 = this.renderer.createText(this._el_16,'\n						',(null as any));
    this._el_18 = import3.createRenderElement(this.renderer,this._el_16,'label',new import3.InlineArray2(2,'for','time-hour-select'),(null as any));
    this._text_19 = this.renderer.createText(this._el_18,'HH24',(null as any));
    this._text_20 = this.renderer.createText(this._el_16,'\n						',(null as any));
    this._el_21 = import3.createRenderElement(this.renderer,this._el_16,'div',new import3.InlineArray2(2,'class','zui-select'),(null as any));
    this._text_22 = this.renderer.createText(this._el_21,'\n							',(null as any));
    this._el_23 = import3.createRenderElement(this.renderer,this._el_21,'select',new import3.InlineArray2(2,'class','form-control'),(null as any));
    this._SelectControlValueAccessor_23_3 = new import12.Wrapper_SelectControlValueAccessor(this.renderer,new import16.ElementRef(this._el_23));
    this._NG_VALUE_ACCESSOR_23_4 = [this._SelectControlValueAccessor_23_3.context];
    this._NgModel_23_5 = new import21.Wrapper_NgModel((null as any),(null as any),(null as any),this._NG_VALUE_ACCESSOR_23_4);
    this._NgControl_23_6 = this._NgModel_23_5.context;
    this._NgControlStatus_23_7 = new import22.Wrapper_NgControlStatus(this._NgControl_23_6);
    this._text_24 = this.renderer.createText(this._el_23,'\n								',(null as any));
    this._anchor_25 = this.renderer.createTemplateAnchor(this._el_23,(null as any));
    this._vc_25 = new import14.ViewContainer(25,23,this,this._anchor_25);
    this._TemplateRef_25_5 = new import24.TemplateRef_(this,25,this._anchor_25);
    this._NgFor_25_6 = new import23.Wrapper_NgFor(this._vc_25.vcRef,this._TemplateRef_25_5,this.parentView.injectorGet(import25.IterableDiffers,this.parentIndex),this.ref);
    this._text_26 = this.renderer.createText(this._el_23,'\n							',(null as any));
    this._text_27 = this.renderer.createText(this._el_21,'\n						',(null as any));
    this._text_28 = this.renderer.createText(this._el_16,'\n			         ',(null as any));
    this._text_29 = this.renderer.createText(this._el_14,'\n				',(null as any));
    this._text_30 = this.renderer.createText(this._el_12,'\n				',(null as any));
    this._el_31 = import3.createRenderElement(this.renderer,this._el_12,'div',new import3.InlineArray2(2,'class','col-md-6 col-xs-12'),(null as any));
    this._text_32 = this.renderer.createText(this._el_31,'\n					',(null as any));
    this._el_33 = import3.createRenderElement(this.renderer,this._el_31,'div',new import3.InlineArray2(2,'class','clearfix'),(null as any));
    this._text_34 = this.renderer.createText(this._el_33,'\n						',(null as any));
    this._el_35 = import3.createRenderElement(this.renderer,this._el_33,'label',new import3.InlineArray2(2,'for','time-min-select'),(null as any));
    this._text_36 = this.renderer.createText(this._el_35,'MM',(null as any));
    this._text_37 = this.renderer.createText(this._el_33,'\n						',(null as any));
    this._el_38 = import3.createRenderElement(this.renderer,this._el_33,'div',new import3.InlineArray2(2,'class','zui-select'),(null as any));
    this._text_39 = this.renderer.createText(this._el_38,'\n							',(null as any));
    this._el_40 = import3.createRenderElement(this.renderer,this._el_38,'select',new import3.InlineArray2(2,'class','form-control'),(null as any));
    this._SelectControlValueAccessor_40_3 = new import12.Wrapper_SelectControlValueAccessor(this.renderer,new import16.ElementRef(this._el_40));
    this._NG_VALUE_ACCESSOR_40_4 = [this._SelectControlValueAccessor_40_3.context];
    this._NgModel_40_5 = new import21.Wrapper_NgModel((null as any),(null as any),(null as any),this._NG_VALUE_ACCESSOR_40_4);
    this._NgControl_40_6 = this._NgModel_40_5.context;
    this._NgControlStatus_40_7 = new import22.Wrapper_NgControlStatus(this._NgControl_40_6);
    this._text_41 = this.renderer.createText(this._el_40,'\n								',(null as any));
    this._anchor_42 = this.renderer.createTemplateAnchor(this._el_40,(null as any));
    this._vc_42 = new import14.ViewContainer(42,40,this,this._anchor_42);
    this._TemplateRef_42_5 = new import24.TemplateRef_(this,42,this._anchor_42);
    this._NgFor_42_6 = new import23.Wrapper_NgFor(this._vc_42.vcRef,this._TemplateRef_42_5,this.parentView.injectorGet(import25.IterableDiffers,this.parentIndex),this.ref);
    this._text_43 = this.renderer.createText(this._el_40,'\n							',(null as any));
    this._text_44 = this.renderer.createText(this._el_38,'\n					    ',(null as any));
    this._text_45 = this.renderer.createText(this._el_33,'\n				    ',(null as any));
    this._text_46 = this.renderer.createText(this._el_31,'\n				',(null as any));
    this._text_47 = this.renderer.createText(this._el_12,'\n			',(null as any));
    this._text_48 = this.renderer.createText(this._el_7,'\n		',(null as any));
    this._text_49 = this.renderer.createText(this._el_2,'\n	',(null as any));
    this._text_50 = this.renderer.createText((null as any),'\n	',(null as any));
    this._el_51 = import3.createRenderElement(this.renderer,(null as any),'zui-modal-footer',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_52 = this.renderer.createText(this._el_51,'\n		',(null as any));
    this._el_53 = import3.createRenderElement(this.renderer,this._el_51,'button',new import3.InlineArray4(4,'class','zui-btn zui-btn-sec','type','button'),(null as any));
    this._text_54 = this.renderer.createText(this._el_53,'Cancel',(null as any));
    this._text_55 = this.renderer.createText(this._el_51,'\n		',(null as any));
    this._el_56 = import3.createRenderElement(this.renderer,this._el_51,'button',new import3.InlineArray4(4,'class','zui-btn zui-btn-primary','type','button'),(null as any));
    this._text_57 = this.renderer.createText(this._el_56,'Save',(null as any));
    this._text_58 = this.renderer.createText(this._el_51,'\n	',(null as any));
    this._text_59 = this.renderer.createText((null as any),'\n',(null as any));
    this.compView_0.create(this._ModalComponent_0_3.context);
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_0,new import3.InlineArray2(2,'onBeforeClose',(null as any)),this.eventHandler(this.handleEvent_0));
    this._ModalComponent_0_3.subscribe(this,this.eventHandler(this.handleEvent_0),false,true,false,false);
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_23,new import3.InlineArray8(6,'ngModelChange',(null as any),'change',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_23));
    this._NgModel_23_5.subscribe(this,this.eventHandler(this.handleEvent_23),true);
    var disposable_2:Function = import3.subscribeToRenderElement(this,this._el_40,new import3.InlineArray8(6,'ngModelChange',(null as any),'change',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_40));
    this._NgModel_40_5.subscribe(this,this.eventHandler(this.handleEvent_40),true);
    var disposable_3:Function = import3.subscribeToRenderElement(this,this._el_53,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_53));
    var disposable_4:Function = import3.subscribeToRenderElement(this,this._el_56,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_56));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
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
      this._el_12,
      this._text_13,
      this._el_14,
      this._text_15,
      this._el_16,
      this._text_17,
      this._el_18,
      this._text_19,
      this._text_20,
      this._el_21,
      this._text_22,
      this._el_23,
      this._text_24,
      this._anchor_25,
      this._text_26,
      this._text_27,
      this._text_28,
      this._text_29,
      this._text_30,
      this._el_31,
      this._text_32,
      this._el_33,
      this._text_34,
      this._el_35,
      this._text_36,
      this._text_37,
      this._el_38,
      this._text_39,
      this._el_40,
      this._text_41,
      this._anchor_42,
      this._text_43,
      this._text_44,
      this._text_45,
      this._text_46,
      this._text_47,
      this._text_48,
      this._text_49,
      this._text_50,
      this._el_51,
      this._text_52,
      this._el_53,
      this._text_54,
      this._text_55,
      this._el_56,
      this._text_57,
      this._text_58,
      this._text_59
    ]
    ),[
      disposable_0,
      disposable_1,
      disposable_2,
      disposable_3,
      disposable_4
    ]
    );
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import24.TemplateRef) && (25 === requestNodeIndex))) { return this._TemplateRef_25_5; }
    if (((token === import26.NgFor) && (25 === requestNodeIndex))) { return this._NgFor_25_6.context; }
    if (((token === import17.SelectControlValueAccessor) && ((23 <= requestNodeIndex) && (requestNodeIndex <= 26)))) { return this._SelectControlValueAccessor_23_3.context; }
    if (((token === import27.NG_VALUE_ACCESSOR) && ((23 <= requestNodeIndex) && (requestNodeIndex <= 26)))) { return this._NG_VALUE_ACCESSOR_23_4; }
    if (((token === import28.NgModel) && ((23 <= requestNodeIndex) && (requestNodeIndex <= 26)))) { return this._NgModel_23_5.context; }
    if (((token === import29.NgControl) && ((23 <= requestNodeIndex) && (requestNodeIndex <= 26)))) { return this._NgControl_23_6; }
    if (((token === import30.NgControlStatus) && ((23 <= requestNodeIndex) && (requestNodeIndex <= 26)))) { return this._NgControlStatus_23_7.context; }
    if (((token === import24.TemplateRef) && (42 === requestNodeIndex))) { return this._TemplateRef_42_5; }
    if (((token === import26.NgFor) && (42 === requestNodeIndex))) { return this._NgFor_42_6.context; }
    if (((token === import17.SelectControlValueAccessor) && ((40 <= requestNodeIndex) && (requestNodeIndex <= 43)))) { return this._SelectControlValueAccessor_40_3.context; }
    if (((token === import27.NG_VALUE_ACCESSOR) && ((40 <= requestNodeIndex) && (requestNodeIndex <= 43)))) { return this._NG_VALUE_ACCESSOR_40_4; }
    if (((token === import28.NgModel) && ((40 <= requestNodeIndex) && (requestNodeIndex <= 43)))) { return this._NgModel_40_5.context; }
    if (((token === import29.NgControl) && ((40 <= requestNodeIndex) && (requestNodeIndex <= 43)))) { return this._NgControl_40_6; }
    if (((token === import30.NgControlStatus) && ((40 <= requestNodeIndex) && (requestNodeIndex <= 43)))) { return this._NgControlStatus_40_7.context; }
    if (((token === import19.ModalComponent) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 59)))) { return this._ModalComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = 'Trend Data Collection Daily Scheduling';
    this._ModalComponent_0_3.check_title(currVal_0_0_0,throwOnChange,false);
    const currVal_0_0_1:any = 'scheduling-modal';
    this._ModalComponent_0_3.check_modalId(currVal_0_0_1,throwOnChange,false);
    const currVal_0_0_2:any = 'medium';
    this._ModalComponent_0_3.check_modalSize(currVal_0_0_2,throwOnChange,false);
    this._ModalComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this._SelectControlValueAccessor_23_3.ngDoCheck(this,this._el_23,throwOnChange);
    const currVal_23_1_0:any = this.context.etlHourSelect;
    this._NgModel_23_5.check_model(currVal_23_1_0,throwOnChange,false);
    this._NgModel_23_5.ngDoCheck(this,this._el_23,throwOnChange);
    this._NgControlStatus_23_7.ngDoCheck(this,this._el_23,throwOnChange);
    const currVal_25_0_0:any = this.context.hourRepeatConstant;
    this._NgFor_25_6.check_ngForOf(currVal_25_0_0,throwOnChange,false);
    this._NgFor_25_6.ngDoCheck(this,this._anchor_25,throwOnChange);
    this._SelectControlValueAccessor_40_3.ngDoCheck(this,this._el_40,throwOnChange);
    const currVal_40_1_0:any = this.context.etlMmSelect;
    this._NgModel_40_5.check_model(currVal_40_1_0,throwOnChange,false);
    this._NgModel_40_5.ngDoCheck(this,this._el_40,throwOnChange);
    this._NgControlStatus_40_7.ngDoCheck(this,this._el_40,throwOnChange);
    const currVal_42_0_0:any = this.context.minuteRepeatConstant;
    this._NgFor_42_6.check_ngForOf(currVal_42_0_0,throwOnChange,false);
    this._NgFor_42_6.ngDoCheck(this,this._anchor_42,throwOnChange);
    this._vc_25.detectChangesInNestedViews(throwOnChange);
    this._vc_42.detectChangesInNestedViews(throwOnChange);
    const currVal_78:any = import3.inlineInterpolate(1,'You can setup Zephyr to automatically collect trending data on a daily basis. Please select what time this should happen, in the ',this.context.etlTimeZone,' timezone.');
    if (import3.checkBinding(throwOnChange,this._expr_78,currVal_78)) {
      this.renderer.setText(this._text_5,currVal_78);
      this._expr_78 = currVal_78;
    }
    this._NgControlStatus_23_7.checkHost(this,this,this._el_23,throwOnChange);
    this._NgControlStatus_40_7.checkHost(this,this,this._el_40,throwOnChange);
    const currVal_79:any = this.context.isFormValid();
    if (import3.checkBinding(throwOnChange,this._expr_79,currVal_79)) {
      this.renderer.setElementProperty(this._el_56,'disabled',currVal_79);
      this._expr_79 = currVal_79;
    }
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._ModalComponent_0_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this._vc_25.destroyNestedViews();
    this._vc_42.destroyNestedViews();
    this.compView_0.destroy();
    this._NgModel_23_5.ngOnDestroy();
    this._NgModel_40_5.ngOnDestroy();
    this._ModalComponent_0_3.ngOnDestroy();
  }
  visitProjectableNodesInternal(nodeIndex:number,ngContentIndex:number,cb:any,ctx:any):void {
    if (((nodeIndex == 0) && (ngContentIndex == 0))) {  }
    if (((nodeIndex == 0) && (ngContentIndex == 1))) { cb(this._el_2,ctx); }
    if (((nodeIndex == 0) && (ngContentIndex == 2))) { cb(this._el_51,ctx); }
  }
  createEmbeddedViewInternal(nodeIndex:number):import1.AppView<any> {
    if ((nodeIndex == 25)) { return new View_SchedulingModalComponent1(this.viewUtils,this,25,this._anchor_25,this._vc_25); }
    if ((nodeIndex == 42)) { return new View_SchedulingModalComponent2(this.viewUtils,this,42,this._anchor_42,this._vc_42); }
    return (null as any);
  }
  handleEvent_0(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'onBeforeClose')) {
      const pd_sub_0:any = ((<any>this.context.cancelEtlTimingConfirmation()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_23(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._SelectControlValueAccessor_23_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'ngModelChange')) {
      const pd_sub_0:any = ((<any>(this.context.etlHourSelect = $event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_40(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._SelectControlValueAccessor_40_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'ngModelChange')) {
      const pd_sub_0:any = ((<any>(this.context.etlMmSelect = $event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_53(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.cancelEtlTimingConfirmation()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_56(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.saveEtlTiming()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}