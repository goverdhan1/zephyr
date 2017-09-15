/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../../../app/view/components/testcase-eas/phase/tree/edit/eas_freeform_edit.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '../../../../../../../../app/actions/testcaseEAS.action';
import * as import9 from '@angular/forms/src/form_builder';
import * as import10 from '@angular/router/src/router_state';
import * as import11 from '../../../../../../../node_modules/@angular/forms/src/directives/reactive_directives/form_group_directive.ngfactory';
import * as import12 from '../../../../../../../node_modules/@angular/forms/src/directives/ng_control_status.ngfactory';
import * as import13 from '../../../../../../../../app/view/components/common/modal/modal.component';
import * as import14 from '../../../../common/modal/modal.component.ngfactory';
import * as import15 from '../../../../../../../node_modules/@angular/forms/src/directives/default_value_accessor.ngfactory';
import * as import16 from '../../../../../../../node_modules/@angular/forms/src/directives/reactive_directives/form_control_directive.ngfactory';
import * as import17 from '@angular/core/src/change_detection/change_detection_util';
import * as import18 from '@angular/core/src/linker/element_ref';
import * as import19 from '@angular/forms/src/directives/default_value_accessor';
import * as import20 from '@angular/forms/src/directives/control_value_accessor';
import * as import21 from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import * as import22 from '@angular/forms/src/directives/ng_control';
import * as import23 from '@angular/forms/src/directives/ng_control_status';
import * as import24 from '@angular/forms/src/directives/reactive_directives/form_group_directive';
import * as import25 from '@angular/forms/src/directives/control_container';
export class Wrapper_EasFreeformEditComponent {
  /*private*/ _eventHandler:Function;
  context:import0.EasFreeformEditComponent;
  /*private*/ _changed:boolean;
  constructor(p0:any,p1:any,p2:any) {
    this._changed = false;
    this.context = new import0.EasFreeformEditComponent(p0,p1,p2);
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
var renderType_EasFreeformEditComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_EasFreeformEditComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.EasFreeformEditComponent>;
  _EasFreeformEditComponent_0_3:Wrapper_EasFreeformEditComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_EasFreeformEditComponent_Host0,renderType_EasFreeformEditComponent_Host,import5.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'ng-component',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_EasFreeformEditComponent0(this.viewUtils,this,0,this._el_0);
    this._EasFreeformEditComponent_0_3 = new Wrapper_EasFreeformEditComponent(this.injectorGet(import8.TestcaseEASAction,this.parentIndex),this.injectorGet(import9.FormBuilder,this.parentIndex),this.injectorGet(import10.ActivatedRoute,this.parentIndex));
    this.compView_0.create(this._EasFreeformEditComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import7.ComponentRef_<any>(0,this,this._el_0,this._EasFreeformEditComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.EasFreeformEditComponent) && (0 === requestNodeIndex))) { return this._EasFreeformEditComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._EasFreeformEditComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._EasFreeformEditComponent_0_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const EasFreeformEditComponentNgFactory:import7.ComponentFactory<import0.EasFreeformEditComponent> = new import7.ComponentFactory<import0.EasFreeformEditComponent>('ng-component',View_EasFreeformEditComponent_Host0,import0.EasFreeformEditComponent);
const styles_EasFreeformEditComponent:any[] = ([] as any[]);
var renderType_EasFreeformEditComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_EasFreeformEditComponent,{});
export class View_EasFreeformEditComponent0 extends import1.AppView<import0.EasFreeformEditComponent> {
  _el_0:any;
  _FormGroupDirective_0_3:import11.Wrapper_FormGroupDirective;
  _ControlContainer_0_4:any;
  _NgControlStatusGroup_0_5:import12.Wrapper_NgControlStatusGroup;
  _text_1:any;
  _el_2:any;
  compView_2:import1.AppView<import13.ModalComponent>;
  _ModalComponent_2_3:import14.Wrapper_ModalComponent;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _el_8:any;
  _text_9:any;
  _el_10:any;
  _text_11:any;
  _el_12:any;
  _text_13:any;
  _text_14:any;
  _el_15:any;
  _DefaultValueAccessor_15_3:import15.Wrapper_DefaultValueAccessor;
  _NG_VALUE_ACCESSOR_15_4:any[];
  _FormControlDirective_15_5:import16.Wrapper_FormControlDirective;
  _NgControl_15_6:any;
  _NgControlStatus_15_7:import12.Wrapper_NgControlStatus;
  _text_16:any;
  _text_17:any;
  _el_18:any;
  _text_19:any;
  _el_20:any;
  _text_21:any;
  _text_22:any;
  _el_23:any;
  _DefaultValueAccessor_23_3:import15.Wrapper_DefaultValueAccessor;
  _NG_VALUE_ACCESSOR_23_4:any[];
  _FormControlDirective_23_5:import16.Wrapper_FormControlDirective;
  _NgControl_23_6:any;
  _NgControlStatus_23_7:import12.Wrapper_NgControlStatus;
  _text_24:any;
  _text_25:any;
  _text_26:any;
  _text_27:any;
  _text_28:any;
  _el_29:any;
  _text_30:any;
  _el_31:any;
  _text_32:any;
  _text_33:any;
  _el_34:any;
  _text_35:any;
  _text_36:any;
  _text_37:any;
  _text_38:any;
  _text_39:any;
  /*private*/ _expr_55:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_EasFreeformEditComponent0,renderType_EasFreeformEditComponent,import5.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
    this._expr_55 = import17.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'form',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._FormGroupDirective_0_3 = new import11.Wrapper_FormGroupDirective((null as any),(null as any));
    this._ControlContainer_0_4 = this._FormGroupDirective_0_3.context;
    this._NgControlStatusGroup_0_5 = new import12.Wrapper_NgControlStatusGroup(this._ControlContainer_0_4);
    this._text_1 = this.renderer.createText(this._el_0,'\n	',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'zui-modal',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_2 = new import14.View_ModalComponent0(this.viewUtils,this,2,this._el_2);
    this._ModalComponent_2_3 = new import14.Wrapper_ModalComponent(new import18.ElementRef(this._el_2),this.compView_2.ref);
    this._text_3 = this.renderer.createText((null as any),'\n	    ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,(null as any),'zui-modal-body',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'\n	    	',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_4,'div',new import3.InlineArray2(2,'class','row'),(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'\n	    		',(null as any));
    this._el_8 = import3.createRenderElement(this.renderer,this._el_6,'div',new import3.InlineArray2(2,'class','col-md-6 col-xs-12'),(null as any));
    this._text_9 = this.renderer.createText(this._el_8,'\n	 	        	',(null as any));
    this._el_10 = import3.createRenderElement(this.renderer,this._el_8,'div',new import3.InlineArray2(2,'class','clearfix'),(null as any));
    this._text_11 = this.renderer.createText(this._el_10,'\n	 	        		',(null as any));
    this._el_12 = import3.createRenderElement(this.renderer,this._el_10,'label',new import3.InlineArray2(2,'for','node-name'),(null as any));
    this._text_13 = this.renderer.createText(this._el_12,'Name',(null as any));
    this._text_14 = this.renderer.createText(this._el_10,'\n	 	        		',(null as any));
    this._el_15 = import3.createRenderElement(this.renderer,this._el_10,'input',new import3.InlineArray8(6,'class','form-control','id','node-name','type','text'),(null as any));
    this._DefaultValueAccessor_15_3 = new import15.Wrapper_DefaultValueAccessor(this.renderer,new import18.ElementRef(this._el_15));
    this._NG_VALUE_ACCESSOR_15_4 = [this._DefaultValueAccessor_15_3.context];
    this._FormControlDirective_15_5 = new import16.Wrapper_FormControlDirective((null as any),(null as any),this._NG_VALUE_ACCESSOR_15_4);
    this._NgControl_15_6 = this._FormControlDirective_15_5.context;
    this._NgControlStatus_15_7 = new import12.Wrapper_NgControlStatus(this._NgControl_15_6);
    this._text_16 = this.renderer.createText(this._el_10,'\n	 	        	',(null as any));
    this._text_17 = this.renderer.createText(this._el_8,'\n	 	        	',(null as any));
    this._el_18 = import3.createRenderElement(this.renderer,this._el_8,'div',new import3.InlineArray2(2,'class','clearfix'),(null as any));
    this._text_19 = this.renderer.createText(this._el_18,'\n	 	        		',(null as any));
    this._el_20 = import3.createRenderElement(this.renderer,this._el_18,'label',new import3.InlineArray2(2,'for','node-description'),(null as any));
    this._text_21 = this.renderer.createText(this._el_20,'Description',(null as any));
    this._text_22 = this.renderer.createText(this._el_18,'\n	 	        		',(null as any));
    this._el_23 = import3.createRenderElement(this.renderer,this._el_18,'input',new import3.InlineArray8(6,'class','form-control','id','node-description','type','text'),(null as any));
    this._DefaultValueAccessor_23_3 = new import15.Wrapper_DefaultValueAccessor(this.renderer,new import18.ElementRef(this._el_23));
    this._NG_VALUE_ACCESSOR_23_4 = [this._DefaultValueAccessor_23_3.context];
    this._FormControlDirective_23_5 = new import16.Wrapper_FormControlDirective((null as any),(null as any),this._NG_VALUE_ACCESSOR_23_4);
    this._NgControl_23_6 = this._FormControlDirective_23_5.context;
    this._NgControlStatus_23_7 = new import12.Wrapper_NgControlStatus(this._NgControl_23_6);
    this._text_24 = this.renderer.createText(this._el_18,'\n	 	        	',(null as any));
    this._text_25 = this.renderer.createText(this._el_8,'\n	 	        ',(null as any));
    this._text_26 = this.renderer.createText(this._el_6,'\n	        ',(null as any));
    this._text_27 = this.renderer.createText(this._el_4,'\n	    ',(null as any));
    this._text_28 = this.renderer.createText((null as any),'\n	    ',(null as any));
    this._el_29 = import3.createRenderElement(this.renderer,(null as any),'zui-modal-footer',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_30 = this.renderer.createText(this._el_29,'\n			',(null as any));
    this._el_31 = import3.createRenderElement(this.renderer,this._el_29,'button',new import3.InlineArray8(6,'class','zui-btn zui-btn-sec','data-dismiss','modal','type','button'),(null as any));
    this._text_32 = this.renderer.createText(this._el_31,'Cancel',(null as any));
    this._text_33 = this.renderer.createText(this._el_29,'\n			',(null as any));
    this._el_34 = import3.createRenderElement(this.renderer,this._el_29,'button',new import3.InlineArray4(4,'class','zui-btn zui-btn-primary','type','submit'),(null as any));
    this._text_35 = this.renderer.createText(this._el_34,'Save',(null as any));
    this._text_36 = this.renderer.createText(this._el_29,'\n	    ',(null as any));
    this._text_37 = this.renderer.createText((null as any),'\n	',(null as any));
    this.compView_2.create(this._ModalComponent_2_3.context);
    this._text_38 = this.renderer.createText(this._el_0,'\n',(null as any));
    this._text_39 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_0,new import3.InlineArray8(6,'ngSubmit',(null as any),'submit',(null as any),'reset',(null as any)),this.eventHandler(this.handleEvent_0));
    this._FormGroupDirective_0_3.subscribe(this,this.eventHandler(this.handleEvent_0),true);
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_15,new import3.InlineArray4(4,'input',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_15));
    var disposable_2:Function = import3.subscribeToRenderElement(this,this._el_23,new import3.InlineArray4(4,'input',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_23));
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
      this._el_10,
      this._text_11,
      this._el_12,
      this._text_13,
      this._text_14,
      this._el_15,
      this._text_16,
      this._text_17,
      this._el_18,
      this._text_19,
      this._el_20,
      this._text_21,
      this._text_22,
      this._el_23,
      this._text_24,
      this._text_25,
      this._text_26,
      this._text_27,
      this._text_28,
      this._el_29,
      this._text_30,
      this._el_31,
      this._text_32,
      this._text_33,
      this._el_34,
      this._text_35,
      this._text_36,
      this._text_37,
      this._text_38,
      this._text_39
    ]
    ),[
      disposable_0,
      disposable_1,
      disposable_2
    ]
    );
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import19.DefaultValueAccessor) && (15 === requestNodeIndex))) { return this._DefaultValueAccessor_15_3.context; }
    if (((token === import20.NG_VALUE_ACCESSOR) && (15 === requestNodeIndex))) { return this._NG_VALUE_ACCESSOR_15_4; }
    if (((token === import21.FormControlDirective) && (15 === requestNodeIndex))) { return this._FormControlDirective_15_5.context; }
    if (((token === import22.NgControl) && (15 === requestNodeIndex))) { return this._NgControl_15_6; }
    if (((token === import23.NgControlStatus) && (15 === requestNodeIndex))) { return this._NgControlStatus_15_7.context; }
    if (((token === import19.DefaultValueAccessor) && (23 === requestNodeIndex))) { return this._DefaultValueAccessor_23_3.context; }
    if (((token === import20.NG_VALUE_ACCESSOR) && (23 === requestNodeIndex))) { return this._NG_VALUE_ACCESSOR_23_4; }
    if (((token === import21.FormControlDirective) && (23 === requestNodeIndex))) { return this._FormControlDirective_23_5.context; }
    if (((token === import22.NgControl) && (23 === requestNodeIndex))) { return this._NgControl_23_6; }
    if (((token === import23.NgControlStatus) && (23 === requestNodeIndex))) { return this._NgControlStatus_23_7.context; }
    if (((token === import13.ModalComponent) && ((2 <= requestNodeIndex) && (requestNodeIndex <= 37)))) { return this._ModalComponent_2_3.context; }
    if (((token === import24.FormGroupDirective) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 38)))) { return this._FormGroupDirective_0_3.context; }
    if (((token === import25.ControlContainer) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 38)))) { return this._ControlContainer_0_4; }
    if (((token === import23.NgControlStatusGroup) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 38)))) { return this._NgControlStatusGroup_0_5.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = this.context.editNodeForm;
    this._FormGroupDirective_0_3.check_form(currVal_0_0_0,throwOnChange,false);
    this._FormGroupDirective_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this._NgControlStatusGroup_0_5.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_2_0_0:any = 'easEditNodeModal';
    this._ModalComponent_2_3.check_modalId(currVal_2_0_0,throwOnChange,false);
    const currVal_2_0_1:any = 'small';
    this._ModalComponent_2_3.check_modalSize(currVal_2_0_1,throwOnChange,false);
    this._ModalComponent_2_3.ngDoCheck(this,this._el_2,throwOnChange);
    this._DefaultValueAccessor_15_3.ngDoCheck(this,this._el_15,throwOnChange);
    const currVal_15_1_0:any = this.context.editNodeForm.controls['name'];
    this._FormControlDirective_15_5.check_form(currVal_15_1_0,throwOnChange,false);
    this._FormControlDirective_15_5.ngDoCheck(this,this._el_15,throwOnChange);
    this._NgControlStatus_15_7.ngDoCheck(this,this._el_15,throwOnChange);
    this._DefaultValueAccessor_23_3.ngDoCheck(this,this._el_23,throwOnChange);
    const currVal_23_1_0:any = this.context.editNodeForm.controls['description'];
    this._FormControlDirective_23_5.check_form(currVal_23_1_0,throwOnChange,false);
    this._FormControlDirective_23_5.ngDoCheck(this,this._el_23,throwOnChange);
    this._NgControlStatus_23_7.ngDoCheck(this,this._el_23,throwOnChange);
    this._NgControlStatusGroup_0_5.checkHost(this,this,this._el_0,throwOnChange);
    this._NgControlStatus_15_7.checkHost(this,this,this._el_15,throwOnChange);
    this._NgControlStatus_23_7.checkHost(this,this,this._el_23,throwOnChange);
    const currVal_55:any = this.context.isFormInValid(this.context.editNodeForm);
    if (import3.checkBinding(throwOnChange,this._expr_55,currVal_55)) {
      this.renderer.setElementProperty(this._el_34,'disabled',currVal_55);
      this._expr_55 = currVal_55;
    }
    this.compView_2.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._ModalComponent_2_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_2.destroy();
    this._FormControlDirective_15_5.ngOnDestroy();
    this._FormControlDirective_23_5.ngOnDestroy();
    this._ModalComponent_2_3.ngOnDestroy();
    this._FormGroupDirective_0_3.ngOnDestroy();
  }
  visitProjectableNodesInternal(nodeIndex:number,ngContentIndex:number,cb:any,ctx:any):void {
    if (((nodeIndex == 2) && (ngContentIndex == 0))) {  }
    if (((nodeIndex == 2) && (ngContentIndex == 1))) { cb(this._el_4,ctx); }
    if (((nodeIndex == 2) && (ngContentIndex == 2))) { cb(this._el_29,ctx); }
  }
  handleEvent_0(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._FormGroupDirective_0_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'ngSubmit')) {
      const pd_sub_0:any = ((<any>this.context.editFreeformNode(this.context.editNodeForm.value)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_15(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._DefaultValueAccessor_15_3.handleEvent(eventName,$event) && result);
    return result;
  }
  handleEvent_23(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._DefaultValueAccessor_23_3.handleEvent(eventName,$event) && result);
    return result;
  }
}