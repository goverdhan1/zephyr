/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../../app/view/components/requirements/tree/sync/req_syncNode.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '../../../../../../node_modules/@angular/forms/src/directives/checkbox_value_accessor.ngfactory';
import * as import9 from '../../../../../../node_modules/@angular/forms/src/directives/ng_model.ngfactory';
import * as import10 from '../../../../../../node_modules/@angular/forms/src/directives/ng_control_status.ngfactory';
import * as import11 from '@angular/core/src/linker/element_ref';
import * as import12 from '@angular/forms/src/directives/checkbox_value_accessor';
import * as import13 from '@angular/forms/src/directives/control_value_accessor';
import * as import14 from '@angular/forms/src/directives/ng_model';
import * as import15 from '@angular/forms/src/directives/ng_control';
import * as import16 from '@angular/forms/src/directives/ng_control_status';
export class Wrapper_ReqSyncNodeComponent {
  /*private*/ _eventHandler:Function;
  context:import0.ReqSyncNodeComponent;
  /*private*/ _changed:boolean;
  subscription0:any;
  constructor() {
    this._changed = false;
    this.context = new import0.ReqSyncNodeComponent();
  }
  ngOnDetach(view:import1.AppView<any>,componentView:import1.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
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
    if (emit0) { (this.subscription0 = this.context.syncNode.subscribe(_eventHandler.bind(view,'syncNode'))); }
  }
}
var renderType_ReqSyncNodeComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_ReqSyncNodeComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.ReqSyncNodeComponent>;
  _ReqSyncNodeComponent_0_3:Wrapper_ReqSyncNodeComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ReqSyncNodeComponent_Host0,renderType_ReqSyncNodeComponent_Host,import5.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'ng-component',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_ReqSyncNodeComponent0(this.viewUtils,this,0,this._el_0);
    this._ReqSyncNodeComponent_0_3 = new Wrapper_ReqSyncNodeComponent();
    this.compView_0.create(this._ReqSyncNodeComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import7.ComponentRef_<any>(0,this,this._el_0,this._ReqSyncNodeComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.ReqSyncNodeComponent) && (0 === requestNodeIndex))) { return this._ReqSyncNodeComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._ReqSyncNodeComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._ReqSyncNodeComponent_0_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._ReqSyncNodeComponent_0_3.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const ReqSyncNodeComponentNgFactory:import7.ComponentFactory<import0.ReqSyncNodeComponent> = new import7.ComponentFactory<import0.ReqSyncNodeComponent>('ng-component',View_ReqSyncNodeComponent_Host0,import0.ReqSyncNodeComponent);
const styles_ReqSyncNodeComponent:any[] = ([] as any[]);
var renderType_ReqSyncNodeComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_ReqSyncNodeComponent,{});
export class View_ReqSyncNodeComponent0 extends import1.AppView<import0.ReqSyncNodeComponent> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _el_8:any;
  _text_9:any;
  _text_10:any;
  _el_11:any;
  _text_12:any;
  _text_13:any;
  _text_14:any;
  _el_15:any;
  _text_16:any;
  _el_17:any;
  _text_18:any;
  _el_19:any;
  _text_20:any;
  _el_21:any;
  _text_22:any;
  _text_23:any;
  _text_24:any;
  _text_25:any;
  _el_26:any;
  _text_27:any;
  _el_28:any;
  _text_29:any;
  _el_30:any;
  _text_31:any;
  _el_32:any;
  _CheckboxControlValueAccessor_32_3:import8.Wrapper_CheckboxControlValueAccessor;
  _NG_VALUE_ACCESSOR_32_4:any[];
  _NgModel_32_5:import9.Wrapper_NgModel;
  _NgControl_32_6:any;
  _NgControlStatus_32_7:import10.Wrapper_NgControlStatus;
  _text_33:any;
  _el_34:any;
  _text_35:any;
  _text_36:any;
  _text_37:any;
  _text_38:any;
  _text_39:any;
  _el_40:any;
  _text_41:any;
  _el_42:any;
  _text_43:any;
  _el_44:any;
  _text_45:any;
  _el_46:any;
  _CheckboxControlValueAccessor_46_3:import8.Wrapper_CheckboxControlValueAccessor;
  _NG_VALUE_ACCESSOR_46_4:any[];
  _NgModel_46_5:import9.Wrapper_NgModel;
  _NgControl_46_6:any;
  _NgControlStatus_46_7:import10.Wrapper_NgControlStatus;
  _text_47:any;
  _el_48:any;
  _text_49:any;
  _text_50:any;
  _text_51:any;
  _text_52:any;
  _text_53:any;
  _text_54:any;
  _el_55:any;
  _text_56:any;
  _el_57:any;
  _text_58:any;
  _text_59:any;
  _el_60:any;
  _text_61:any;
  _text_62:any;
  _text_63:any;
  _text_64:any;
  _text_65:any;
  _text_66:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ReqSyncNodeComponent0,renderType_ReqSyncNodeComponent,import5.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'div',new import3.InlineArray16(10,'class','modal fade reqSyncNodeModal','data-backdrop','static','id','reqSyncNodeModal','role','dialog','tabindex','-1'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n    ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'div',new import3.InlineArray2(2,'class','modal-dialog medium'),(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n        ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'div',new import3.InlineArray2(2,'class','modal-content'),(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'\n            ',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_4,'div',new import3.InlineArray2(2,'class','modal-header'),(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'\n                ',(null as any));
    this._el_8 = import3.createRenderElement(this.renderer,this._el_6,'button',new import3.InlineArray8(6,'class','close','data-dismiss','modal','type','button'),(null as any));
    this._text_9 = this.renderer.createText(this._el_8,'×',(null as any));
    this._text_10 = this.renderer.createText(this._el_6,'\n                ',(null as any));
    this._el_11 = import3.createRenderElement(this.renderer,this._el_6,'h4',new import3.InlineArray2(2,'class','modal-title'),(null as any));
    this._text_12 = this.renderer.createText(this._el_11,'External Requirement Sync',(null as any));
    this._text_13 = this.renderer.createText(this._el_6,'\n            ',(null as any));
    this._text_14 = this.renderer.createText(this._el_4,'\n            ',(null as any));
    this._el_15 = import3.createRenderElement(this.renderer,this._el_4,'div',new import3.InlineArray2(2,'class','modal-body'),(null as any));
    this._text_16 = this.renderer.createText(this._el_15,'\n                ',(null as any));
    this._el_17 = import3.createRenderElement(this.renderer,this._el_15,'div',new import3.InlineArray2(2,'class','row'),(null as any));
    this._text_18 = this.renderer.createText(this._el_17,'\n                    ',(null as any));
    this._el_19 = import3.createRenderElement(this.renderer,this._el_17,'span',new import3.InlineArray2(2,'class','col-md-12'),(null as any));
    this._text_20 = this.renderer.createText(this._el_19,'\n                        ',(null as any));
    this._el_21 = import3.createRenderElement(this.renderer,this._el_19,'label',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_22 = this.renderer.createText(this._el_21,'\n                            This selection will sync the complete release with external system\n                        ',(null as any));
    this._text_23 = this.renderer.createText(this._el_19,'\n                    ',(null as any));
    this._text_24 = this.renderer.createText(this._el_17,'\n                ',(null as any));
    this._text_25 = this.renderer.createText(this._el_15,'\n                ',(null as any));
    this._el_26 = import3.createRenderElement(this.renderer,this._el_15,'div',new import3.InlineArray2(2,'class','row'),(null as any));
    this._text_27 = this.renderer.createText(this._el_26,'\n                    ',(null as any));
    this._el_28 = import3.createRenderElement(this.renderer,this._el_26,'span',new import3.InlineArray2(2,'class','col-md-12'),(null as any));
    this._text_29 = this.renderer.createText(this._el_28,'\n                        ',(null as any));
    this._el_30 = import3.createRenderElement(this.renderer,this._el_28,'div',new import3.InlineArray2(2,'class','zui-checkbox2'),(null as any));
    this._text_31 = this.renderer.createText(this._el_30,'\n                            ',(null as any));
    this._el_32 = import3.createRenderElement(this.renderer,this._el_30,'input',new import3.InlineArray4(4,'id','req-cascade','type','checkbox'),(null as any));
    this._CheckboxControlValueAccessor_32_3 = new import8.Wrapper_CheckboxControlValueAccessor(this.renderer,new import11.ElementRef(this._el_32));
    this._NG_VALUE_ACCESSOR_32_4 = [this._CheckboxControlValueAccessor_32_3.context];
    this._NgModel_32_5 = new import9.Wrapper_NgModel((null as any),(null as any),(null as any),this._NG_VALUE_ACCESSOR_32_4);
    this._NgControl_32_6 = this._NgModel_32_5.context;
    this._NgControlStatus_32_7 = new import10.Wrapper_NgControlStatus(this._NgControl_32_6);
    this._text_33 = this.renderer.createText(this._el_30,'\n                            ',(null as any));
    this._el_34 = import3.createRenderElement(this.renderer,this._el_30,'label',new import3.InlineArray2(2,'for','req-cascade'),(null as any));
    this._text_35 = this.renderer.createText(this._el_34,'Apply to subnodes ?',(null as any));
    this._text_36 = this.renderer.createText(this._el_30,'\n                        ',(null as any));
    this._text_37 = this.renderer.createText(this._el_28,'\n                    ',(null as any));
    this._text_38 = this.renderer.createText(this._el_26,'\n                ',(null as any));
    this._text_39 = this.renderer.createText(this._el_15,'\n                ',(null as any));
    this._el_40 = import3.createRenderElement(this.renderer,this._el_15,'div',new import3.InlineArray2(2,'class','row'),(null as any));
    this._text_41 = this.renderer.createText(this._el_40,'\n                    ',(null as any));
    this._el_42 = import3.createRenderElement(this.renderer,this._el_40,'span',new import3.InlineArray2(2,'class','col-md-12'),(null as any));
    this._text_43 = this.renderer.createText(this._el_42,'\n                        ',(null as any));
    this._el_44 = import3.createRenderElement(this.renderer,this._el_42,'div',new import3.InlineArray2(2,'class','zui-checkbox2'),(null as any));
    this._text_45 = this.renderer.createText(this._el_44,'\n                            ',(null as any));
    this._el_46 = import3.createRenderElement(this.renderer,this._el_44,'input',new import3.InlineArray4(4,'id','req-retry-delete','type','checkbox'),(null as any));
    this._CheckboxControlValueAccessor_46_3 = new import8.Wrapper_CheckboxControlValueAccessor(this.renderer,new import11.ElementRef(this._el_46));
    this._NG_VALUE_ACCESSOR_46_4 = [this._CheckboxControlValueAccessor_46_3.context];
    this._NgModel_46_5 = new import9.Wrapper_NgModel((null as any),(null as any),(null as any),this._NG_VALUE_ACCESSOR_46_4);
    this._NgControl_46_6 = this._NgModel_46_5.context;
    this._NgControlStatus_46_7 = new import10.Wrapper_NgControlStatus(this._NgControl_46_6);
    this._text_47 = this.renderer.createText(this._el_44,'\n                            ',(null as any));
    this._el_48 = import3.createRenderElement(this.renderer,this._el_44,'label',new import3.InlineArray2(2,'for','req-retry-delete'),(null as any));
    this._text_49 = this.renderer.createText(this._el_48,'Retry deleted requirements ?',(null as any));
    this._text_50 = this.renderer.createText(this._el_44,'\n                        ',(null as any));
    this._text_51 = this.renderer.createText(this._el_42,'\n                    ',(null as any));
    this._text_52 = this.renderer.createText(this._el_40,'\n                ',(null as any));
    this._text_53 = this.renderer.createText(this._el_15,'\n            ',(null as any));
    this._text_54 = this.renderer.createText(this._el_4,'\n            ',(null as any));
    this._el_55 = import3.createRenderElement(this.renderer,this._el_4,'div',new import3.InlineArray2(2,'class','modal-footer'),(null as any));
    this._text_56 = this.renderer.createText(this._el_55,'\n            ',(null as any));
    this._el_57 = import3.createRenderElement(this.renderer,this._el_55,'button',new import3.InlineArray8(6,'class','zui-btn zui-btn-sec','data-dismiss','modal','type','button'),(null as any));
    this._text_58 = this.renderer.createText(this._el_57,'Cancel',(null as any));
    this._text_59 = this.renderer.createText(this._el_55,'\n                ',(null as any));
    this._el_60 = import3.createRenderElement(this.renderer,this._el_55,'button',new import3.InlineArray4(4,'class','zui-btn zui-btn-primary','type','button'),(null as any));
    this._text_61 = this.renderer.createText(this._el_60,'Sync',(null as any));
    this._text_62 = this.renderer.createText(this._el_55,'\n\n            ',(null as any));
    this._text_63 = this.renderer.createText(this._el_4,'\n        ',(null as any));
    this._text_64 = this.renderer.createText(this._el_2,'\n    ',(null as any));
    this._text_65 = this.renderer.createText(this._el_0,'\n',(null as any));
    this._text_66 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_32,new import3.InlineArray8(6,'ngModelChange',(null as any),'change',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_32));
    this._NgModel_32_5.subscribe(this,this.eventHandler(this.handleEvent_32),true);
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_46,new import3.InlineArray8(6,'ngModelChange',(null as any),'change',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_46));
    this._NgModel_46_5.subscribe(this,this.eventHandler(this.handleEvent_46),true);
    var disposable_2:Function = import3.subscribeToRenderElement(this,this._el_60,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_60));
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
      this._el_11,
      this._text_12,
      this._text_13,
      this._text_14,
      this._el_15,
      this._text_16,
      this._el_17,
      this._text_18,
      this._el_19,
      this._text_20,
      this._el_21,
      this._text_22,
      this._text_23,
      this._text_24,
      this._text_25,
      this._el_26,
      this._text_27,
      this._el_28,
      this._text_29,
      this._el_30,
      this._text_31,
      this._el_32,
      this._text_33,
      this._el_34,
      this._text_35,
      this._text_36,
      this._text_37,
      this._text_38,
      this._text_39,
      this._el_40,
      this._text_41,
      this._el_42,
      this._text_43,
      this._el_44,
      this._text_45,
      this._el_46,
      this._text_47,
      this._el_48,
      this._text_49,
      this._text_50,
      this._text_51,
      this._text_52,
      this._text_53,
      this._text_54,
      this._el_55,
      this._text_56,
      this._el_57,
      this._text_58,
      this._text_59,
      this._el_60,
      this._text_61,
      this._text_62,
      this._text_63,
      this._text_64,
      this._text_65,
      this._text_66
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
    if (((token === import12.CheckboxControlValueAccessor) && (32 === requestNodeIndex))) { return this._CheckboxControlValueAccessor_32_3.context; }
    if (((token === import13.NG_VALUE_ACCESSOR) && (32 === requestNodeIndex))) { return this._NG_VALUE_ACCESSOR_32_4; }
    if (((token === import14.NgModel) && (32 === requestNodeIndex))) { return this._NgModel_32_5.context; }
    if (((token === import15.NgControl) && (32 === requestNodeIndex))) { return this._NgControl_32_6; }
    if (((token === import16.NgControlStatus) && (32 === requestNodeIndex))) { return this._NgControlStatus_32_7.context; }
    if (((token === import12.CheckboxControlValueAccessor) && (46 === requestNodeIndex))) { return this._CheckboxControlValueAccessor_46_3.context; }
    if (((token === import13.NG_VALUE_ACCESSOR) && (46 === requestNodeIndex))) { return this._NG_VALUE_ACCESSOR_46_4; }
    if (((token === import14.NgModel) && (46 === requestNodeIndex))) { return this._NgModel_46_5.context; }
    if (((token === import15.NgControl) && (46 === requestNodeIndex))) { return this._NgControl_46_6; }
    if (((token === import16.NgControlStatus) && (46 === requestNodeIndex))) { return this._NgControlStatus_46_7.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._CheckboxControlValueAccessor_32_3.ngDoCheck(this,this._el_32,throwOnChange);
    const currVal_32_1_0:any = this.context.isCascade;
    this._NgModel_32_5.check_model(currVal_32_1_0,throwOnChange,false);
    this._NgModel_32_5.ngDoCheck(this,this._el_32,throwOnChange);
    this._NgControlStatus_32_7.ngDoCheck(this,this._el_32,throwOnChange);
    this._CheckboxControlValueAccessor_46_3.ngDoCheck(this,this._el_46,throwOnChange);
    const currVal_46_1_0:any = this.context.retryDeleted;
    this._NgModel_46_5.check_model(currVal_46_1_0,throwOnChange,false);
    this._NgModel_46_5.ngDoCheck(this,this._el_46,throwOnChange);
    this._NgControlStatus_46_7.ngDoCheck(this,this._el_46,throwOnChange);
    this._NgControlStatus_32_7.checkHost(this,this,this._el_32,throwOnChange);
    this._NgControlStatus_46_7.checkHost(this,this,this._el_46,throwOnChange);
  }
  destroyInternal():void {
    this._NgModel_32_5.ngOnDestroy();
    this._NgModel_46_5.ngOnDestroy();
  }
  handleEvent_32(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._CheckboxControlValueAccessor_32_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'ngModelChange')) {
      const pd_sub_0:any = ((<any>(this.context.isCascade = $event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_46(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._CheckboxControlValueAccessor_46_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'ngModelChange')) {
      const pd_sub_0:any = ((<any>(this.context.retryDeleted = $event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_60(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.syncReqNode()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}