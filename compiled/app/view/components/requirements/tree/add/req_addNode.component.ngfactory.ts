/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../../app/view/components/requirements/tree/add/req_addNode.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '@angular/router/src/router_state';
import * as import9 from '@angular/forms/src/form_builder';
import * as import10 from '@angular/core/src/linker/query_list';
import * as import11 from '../../../../../../../app/view/components/common/modal/modal.component';
import * as import12 from '../../../common/modal/modal.component.ngfactory';
import * as import13 from '../../../../../../node_modules/@angular/forms/src/directives/reactive_directives/form_group_directive.ngfactory';
import * as import14 from '../../../../../../node_modules/@angular/forms/src/directives/ng_control_status.ngfactory';
import * as import15 from '../../../../../../node_modules/@angular/forms/src/directives/default_value_accessor.ngfactory';
import * as import16 from '../../../../../../node_modules/@angular/forms/src/directives/validators.ngfactory';
import * as import17 from '../../../../../../node_modules/@angular/forms/src/directives/reactive_directives/form_control_name.ngfactory';
import * as import18 from '@angular/core/src/change_detection/change_detection_util';
import * as import19 from '@angular/core/src/linker/element_ref';
import * as import20 from '@angular/forms/src/directives/default_value_accessor';
import * as import21 from '@angular/forms/src/directives/validators';
import * as import22 from '@angular/forms/src/validators';
import * as import23 from '@angular/forms/src/directives/control_value_accessor';
import * as import24 from '@angular/forms/src/directives/reactive_directives/form_control_name';
import * as import25 from '@angular/forms/src/directives/ng_control';
import * as import26 from '@angular/forms/src/directives/ng_control_status';
import * as import27 from '@angular/forms/src/directives/reactive_directives/form_group_directive';
import * as import28 from '@angular/forms/src/directives/control_container';
export class Wrapper_ReqAddNodeComponent {
  /*private*/ _eventHandler:Function;
  context:import0.ReqAddNodeComponent;
  /*private*/ _changed:boolean;
  subscription0:any;
  subscription1:any;
  constructor(p0:any,p1:any) {
    this._changed = false;
    this.context = new import0.ReqAddNodeComponent(p0,p1);
  }
  ngOnDetach(view:import1.AppView<any>,componentView:import1.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    (this.subscription0 && this.subscription0.unsubscribe());
    (this.subscription1 && this.subscription1.unsubscribe());
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
  subscribe(view:import1.AppView<any>,_eventHandler:any,emit0:boolean,emit1:boolean):void {
    this._eventHandler = _eventHandler;
    if (emit0) { (this.subscription0 = this.context.createNode.subscribe(_eventHandler.bind(view,'createNode'))); }
    if (emit1) { (this.subscription1 = this.context.destroyComponent.subscribe(_eventHandler.bind(view,'destroyComponent'))); }
  }
}
var renderType_ReqAddNodeComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_ReqAddNodeComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.ReqAddNodeComponent>;
  _ReqAddNodeComponent_0_3:Wrapper_ReqAddNodeComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ReqAddNodeComponent_Host0,renderType_ReqAddNodeComponent_Host,import5.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'ng-component',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_ReqAddNodeComponent0(this.viewUtils,this,0,this._el_0);
    this._ReqAddNodeComponent_0_3 = new Wrapper_ReqAddNodeComponent(this.injectorGet(import8.ActivatedRoute,this.parentIndex),this.injectorGet(import9.FormBuilder,this.parentIndex));
    this.compView_0.create(this._ReqAddNodeComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import7.ComponentRef_<any>(0,this,this._el_0,this._ReqAddNodeComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.ReqAddNodeComponent) && (0 === requestNodeIndex))) { return this._ReqAddNodeComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._ReqAddNodeComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._ReqAddNodeComponent_0_3.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const ReqAddNodeComponentNgFactory:import7.ComponentFactory<import0.ReqAddNodeComponent> = new import7.ComponentFactory<import0.ReqAddNodeComponent>('ng-component',View_ReqAddNodeComponent_Host0,import0.ReqAddNodeComponent);
const styles_ReqAddNodeComponent:any[] = ([] as any[]);
var renderType_ReqAddNodeComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_ReqAddNodeComponent,{});
export class View_ReqAddNodeComponent0 extends import1.AppView<import0.ReqAddNodeComponent> {
  _viewQuery_ModalComponent_0:import10.QueryList<any>;
  _el_0:any;
  compView_0:import1.AppView<import11.ModalComponent>;
  _ModalComponent_0_3:import12.Wrapper_ModalComponent;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _el_4:any;
  _FormGroupDirective_4_3:import13.Wrapper_FormGroupDirective;
  _ControlContainer_4_4:any;
  _NgControlStatusGroup_4_5:import14.Wrapper_NgControlStatusGroup;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _el_8:any;
  _text_9:any;
  _el_10:any;
  _el_11:any;
  _text_12:any;
  _el_13:any;
  _text_14:any;
  _text_15:any;
  _text_16:any;
  _el_17:any;
  _el_18:any;
  _DefaultValueAccessor_18_3:import15.Wrapper_DefaultValueAccessor;
  _MaxLengthValidator_18_4:import16.Wrapper_MaxLengthValidator;
  _NG_VALIDATORS_18_5:any[];
  _NG_VALUE_ACCESSOR_18_6:any[];
  _FormControlName_18_7:import17.Wrapper_FormControlName;
  _NgControl_18_8:any;
  _NgControlStatus_18_9:import14.Wrapper_NgControlStatus;
  _text_19:any;
  _text_20:any;
  _el_21:any;
  _text_22:any;
  _el_23:any;
  _el_24:any;
  _text_25:any;
  _text_26:any;
  _el_27:any;
  _el_28:any;
  _DefaultValueAccessor_28_3:import15.Wrapper_DefaultValueAccessor;
  _MaxLengthValidator_28_4:import16.Wrapper_MaxLengthValidator;
  _NG_VALIDATORS_28_5:any[];
  _NG_VALUE_ACCESSOR_28_6:any[];
  _FormControlName_28_7:import17.Wrapper_FormControlName;
  _NgControl_28_8:any;
  _NgControlStatus_28_9:import14.Wrapper_NgControlStatus;
  _text_29:any;
  _text_30:any;
  _text_31:any;
  _text_32:any;
  _text_33:any;
  _el_34:any;
  _text_35:any;
  _el_36:any;
  _text_37:any;
  _text_38:any;
  _el_39:any;
  _text_40:any;
  _text_41:any;
  _text_42:any;
  _text_43:any;
  /*private*/ _expr_64:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ReqAddNodeComponent0,renderType_ReqAddNodeComponent,import5.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
    this._expr_64 = import18.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._viewQuery_ModalComponent_0 = new import10.QueryList<any>();
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'zui-modal',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_0 = new import12.View_ModalComponent0(this.viewUtils,this,0,this._el_0);
    this._ModalComponent_0_3 = new import12.Wrapper_ModalComponent(new import19.ElementRef(this._el_0),this.compView_0.ref);
    this._text_1 = this.renderer.createText((null as any),'\n    ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,(null as any),'zui-modal-body',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n        ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'form',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._FormGroupDirective_4_3 = new import13.Wrapper_FormGroupDirective((null as any),(null as any));
    this._ControlContainer_4_4 = this._FormGroupDirective_4_3.context;
    this._NgControlStatusGroup_4_5 = new import14.Wrapper_NgControlStatusGroup(this._ControlContainer_4_4);
    this._text_5 = this.renderer.createText(this._el_4,'\n            ',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_4,'span',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'\n                ',(null as any));
    this._el_8 = import3.createRenderElement(this.renderer,this._el_6,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_9 = this.renderer.createText(this._el_8,'\n                    ',(null as any));
    this._el_10 = import3.createRenderElement(this.renderer,this._el_8,'span',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._el_11 = import3.createRenderElement(this.renderer,this._el_10,'label',new import3.InlineArray2(2,'for','addNodeName'),(null as any));
    this._text_12 = this.renderer.createText(this._el_11,'Name: (',(null as any));
    this._el_13 = import3.createRenderElement(this.renderer,this._el_11,'i',new import3.InlineArray2(2,'class','ast-red'),(null as any));
    this._text_14 = this.renderer.createText(this._el_13,'*',(null as any));
    this._text_15 = this.renderer.createText(this._el_11,')',(null as any));
    this._text_16 = this.renderer.createText(this._el_8,'\n                    ',(null as any));
    this._el_17 = import3.createRenderElement(this.renderer,this._el_8,'span',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._el_18 = import3.createRenderElement(this.renderer,this._el_17,'input',new import3.InlineArray16(14,'class','form-control','formControlName','name','id','addNodeName','maxlength','225','name','reqNodeName','type','text','value',''),(null as any));
    this._DefaultValueAccessor_18_3 = new import15.Wrapper_DefaultValueAccessor(this.renderer,new import19.ElementRef(this._el_18));
    this._MaxLengthValidator_18_4 = new import16.Wrapper_MaxLengthValidator();
    this._NG_VALIDATORS_18_5 = [this._MaxLengthValidator_18_4.context];
    this._NG_VALUE_ACCESSOR_18_6 = [this._DefaultValueAccessor_18_3.context];
    this._FormControlName_18_7 = new import17.Wrapper_FormControlName(this._ControlContainer_4_4,this._NG_VALIDATORS_18_5,(null as any),this._NG_VALUE_ACCESSOR_18_6);
    this._NgControl_18_8 = this._FormControlName_18_7.context;
    this._NgControlStatus_18_9 = new import14.Wrapper_NgControlStatus(this._NgControl_18_8);
    this._text_19 = this.renderer.createText(this._el_8,'\n                ',(null as any));
    this._text_20 = this.renderer.createText(this._el_6,'\n                ',(null as any));
    this._el_21 = import3.createRenderElement(this.renderer,this._el_6,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_22 = this.renderer.createText(this._el_21,'\n                    ',(null as any));
    this._el_23 = import3.createRenderElement(this.renderer,this._el_21,'span',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._el_24 = import3.createRenderElement(this.renderer,this._el_23,'label',new import3.InlineArray2(2,'for','addNodeDescription'),(null as any));
    this._text_25 = this.renderer.createText(this._el_24,'Description:',(null as any));
    this._text_26 = this.renderer.createText(this._el_21,'\n                    ',(null as any));
    this._el_27 = import3.createRenderElement(this.renderer,this._el_21,'span',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._el_28 = import3.createRenderElement(this.renderer,this._el_27,'textarea',new import3.InlineArray16(16,'class','form-control','formControlName','description','id','addNodeDescription','maxlength','1024','name','nodeDescription','rows','5','type','text','value',''),(null as any));
    this._DefaultValueAccessor_28_3 = new import15.Wrapper_DefaultValueAccessor(this.renderer,new import19.ElementRef(this._el_28));
    this._MaxLengthValidator_28_4 = new import16.Wrapper_MaxLengthValidator();
    this._NG_VALIDATORS_28_5 = [this._MaxLengthValidator_28_4.context];
    this._NG_VALUE_ACCESSOR_28_6 = [this._DefaultValueAccessor_28_3.context];
    this._FormControlName_28_7 = new import17.Wrapper_FormControlName(this._ControlContainer_4_4,this._NG_VALIDATORS_28_5,(null as any),this._NG_VALUE_ACCESSOR_28_6);
    this._NgControl_28_8 = this._FormControlName_28_7.context;
    this._NgControlStatus_28_9 = new import14.Wrapper_NgControlStatus(this._NgControl_28_8);
    this._text_29 = this.renderer.createText(this._el_21,'\n                ',(null as any));
    this._text_30 = this.renderer.createText(this._el_6,'\n            ',(null as any));
    this._text_31 = this.renderer.createText(this._el_4,'\n        ',(null as any));
    this._text_32 = this.renderer.createText(this._el_2,'\n    ',(null as any));
    this._text_33 = this.renderer.createText((null as any),'\n    ',(null as any));
    this._el_34 = import3.createRenderElement(this.renderer,(null as any),'zui-modal-footer',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_35 = this.renderer.createText(this._el_34,'\n        ',(null as any));
    this._el_36 = import3.createRenderElement(this.renderer,this._el_34,'button',new import3.InlineArray8(6,'class','zui-btn zui-btn-sec','data-dismiss','modal','type','button'),(null as any));
    this._text_37 = this.renderer.createText(this._el_36,'Cancel',(null as any));
    this._text_38 = this.renderer.createText(this._el_34,'\n        ',(null as any));
    this._el_39 = import3.createRenderElement(this.renderer,this._el_34,'button',new import3.InlineArray8(6,'class','zui-btn zui-btn-primary','id','reqAddNodeModalSave','type','button'),(null as any));
    this._text_40 = this.renderer.createText(this._el_39,'Create',(null as any));
    this._text_41 = this.renderer.createText(this._el_34,'\n    ',(null as any));
    this._text_42 = this.renderer.createText((null as any),'\n',(null as any));
    this.compView_0.create(this._ModalComponent_0_3.context);
    this._text_43 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_4,new import3.InlineArray4(4,'submit',(null as any),'reset',(null as any)),this.eventHandler(this.handleEvent_4));
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_18,new import3.InlineArray8(6,'keypress',(null as any),'input',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_18));
    var disposable_2:Function = import3.subscribeToRenderElement(this,this._el_28,new import3.InlineArray4(4,'input',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_28));
    var disposable_3:Function = import3.subscribeToRenderElement(this,this._el_36,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_36));
    var disposable_4:Function = import3.subscribeToRenderElement(this,this._el_39,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_39));
    this._viewQuery_ModalComponent_0.reset([this._ModalComponent_0_3.context]);
    this.context.modal = this._viewQuery_ModalComponent_0.first;
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
      this._el_11,
      this._text_12,
      this._el_13,
      this._text_14,
      this._text_15,
      this._text_16,
      this._el_17,
      this._el_18,
      this._text_19,
      this._text_20,
      this._el_21,
      this._text_22,
      this._el_23,
      this._el_24,
      this._text_25,
      this._text_26,
      this._el_27,
      this._el_28,
      this._text_29,
      this._text_30,
      this._text_31,
      this._text_32,
      this._text_33,
      this._el_34,
      this._text_35,
      this._el_36,
      this._text_37,
      this._text_38,
      this._el_39,
      this._text_40,
      this._text_41,
      this._text_42,
      this._text_43
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
    if (((token === import20.DefaultValueAccessor) && (18 === requestNodeIndex))) { return this._DefaultValueAccessor_18_3.context; }
    if (((token === import21.MaxLengthValidator) && (18 === requestNodeIndex))) { return this._MaxLengthValidator_18_4.context; }
    if (((token === import22.NG_VALIDATORS) && (18 === requestNodeIndex))) { return this._NG_VALIDATORS_18_5; }
    if (((token === import23.NG_VALUE_ACCESSOR) && (18 === requestNodeIndex))) { return this._NG_VALUE_ACCESSOR_18_6; }
    if (((token === import24.FormControlName) && (18 === requestNodeIndex))) { return this._FormControlName_18_7.context; }
    if (((token === import25.NgControl) && (18 === requestNodeIndex))) { return this._NgControl_18_8; }
    if (((token === import26.NgControlStatus) && (18 === requestNodeIndex))) { return this._NgControlStatus_18_9.context; }
    if (((token === import20.DefaultValueAccessor) && (28 === requestNodeIndex))) { return this._DefaultValueAccessor_28_3.context; }
    if (((token === import21.MaxLengthValidator) && (28 === requestNodeIndex))) { return this._MaxLengthValidator_28_4.context; }
    if (((token === import22.NG_VALIDATORS) && (28 === requestNodeIndex))) { return this._NG_VALIDATORS_28_5; }
    if (((token === import23.NG_VALUE_ACCESSOR) && (28 === requestNodeIndex))) { return this._NG_VALUE_ACCESSOR_28_6; }
    if (((token === import24.FormControlName) && (28 === requestNodeIndex))) { return this._FormControlName_28_7.context; }
    if (((token === import25.NgControl) && (28 === requestNodeIndex))) { return this._NgControl_28_8; }
    if (((token === import26.NgControlStatus) && (28 === requestNodeIndex))) { return this._NgControlStatus_28_9.context; }
    if (((token === import27.FormGroupDirective) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 31)))) { return this._FormGroupDirective_4_3.context; }
    if (((token === import28.ControlContainer) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 31)))) { return this._ControlContainer_4_4; }
    if (((token === import26.NgControlStatusGroup) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 31)))) { return this._NgControlStatusGroup_4_5.context; }
    if (((token === import11.ModalComponent) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 42)))) { return this._ModalComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._ModalComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_4_0_0:any = this.context.addNodeForm;
    this._FormGroupDirective_4_3.check_form(currVal_4_0_0,throwOnChange,false);
    this._FormGroupDirective_4_3.ngDoCheck(this,this._el_4,throwOnChange);
    this._NgControlStatusGroup_4_5.ngDoCheck(this,this._el_4,throwOnChange);
    this._DefaultValueAccessor_18_3.ngDoCheck(this,this._el_18,throwOnChange);
    const currVal_18_1_0:any = '225';
    this._MaxLengthValidator_18_4.check_maxlength(currVal_18_1_0,throwOnChange,false);
    this._MaxLengthValidator_18_4.ngDoCheck(this,this._el_18,throwOnChange);
    const currVal_18_2_0:any = 'name';
    this._FormControlName_18_7.check_name(currVal_18_2_0,throwOnChange,false);
    this._FormControlName_18_7.ngDoCheck(this,this._el_18,throwOnChange);
    this._NgControlStatus_18_9.ngDoCheck(this,this._el_18,throwOnChange);
    this._DefaultValueAccessor_28_3.ngDoCheck(this,this._el_28,throwOnChange);
    const currVal_28_1_0:any = '1024';
    this._MaxLengthValidator_28_4.check_maxlength(currVal_28_1_0,throwOnChange,false);
    this._MaxLengthValidator_28_4.ngDoCheck(this,this._el_28,throwOnChange);
    const currVal_28_2_0:any = 'description';
    this._FormControlName_28_7.check_name(currVal_28_2_0,throwOnChange,false);
    this._FormControlName_28_7.ngDoCheck(this,this._el_28,throwOnChange);
    this._NgControlStatus_28_9.ngDoCheck(this,this._el_28,throwOnChange);
    this._NgControlStatusGroup_4_5.checkHost(this,this,this._el_4,throwOnChange);
    this._MaxLengthValidator_18_4.checkHost(this,this,this._el_18,throwOnChange);
    this._NgControlStatus_18_9.checkHost(this,this,this._el_18,throwOnChange);
    this._MaxLengthValidator_28_4.checkHost(this,this,this._el_28,throwOnChange);
    this._NgControlStatus_28_9.checkHost(this,this,this._el_28,throwOnChange);
    const currVal_64:any = this.context.addNodeForm.invalid;
    if (import3.checkBinding(throwOnChange,this._expr_64,currVal_64)) {
      this.renderer.setElementProperty(this._el_39,'disabled',currVal_64);
      this._expr_64 = currVal_64;
    }
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._ModalComponent_0_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._FormControlName_18_7.ngOnDestroy();
    this._FormControlName_28_7.ngOnDestroy();
    this._FormGroupDirective_4_3.ngOnDestroy();
    this._ModalComponent_0_3.ngOnDestroy();
  }
  visitProjectableNodesInternal(nodeIndex:number,ngContentIndex:number,cb:any,ctx:any):void {
    if (((nodeIndex == 0) && (ngContentIndex == 0))) {  }
    if (((nodeIndex == 0) && (ngContentIndex == 1))) { cb(this._el_2,ctx); }
    if (((nodeIndex == 0) && (ngContentIndex == 2))) { cb(this._el_34,ctx); }
  }
  handleEvent_4(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._FormGroupDirective_4_3.handleEvent(eventName,$event) && result);
    return result;
  }
  handleEvent_18(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._DefaultValueAccessor_18_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'keypress')) {
      const pd_sub_0:any = ((<any>this.context.inputKeyPress($event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_28(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._DefaultValueAccessor_28_3.handleEvent(eventName,$event) && result);
    return result;
  }
  handleEvent_36(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.removeModal()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_39(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.createReqNode()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}