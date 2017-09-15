/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../../app/view/components/testcase-eas/tree/delete/eas_deleteNode.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '../../../../../../../app/actions/testcaseEAS.action';
import * as import9 from '@angular/forms/src/form_builder';
import * as import10 from '../../../../../../node_modules/@angular/forms/src/directives/reactive_directives/form_group_directive.ngfactory';
import * as import11 from '../../../../../../node_modules/@angular/forms/src/directives/ng_control_status.ngfactory';
import * as import12 from '../../../../../../../app/view/components/common/modal/modal.component';
import * as import13 from '../../../common/modal/modal.component.ngfactory';
import * as import14 from '@angular/core/src/change_detection/change_detection_util';
import * as import15 from '@angular/core/src/linker/element_ref';
import * as import16 from '@angular/forms/src/directives/reactive_directives/form_group_directive';
import * as import17 from '@angular/forms/src/directives/control_container';
import * as import18 from '@angular/forms/src/directives/ng_control_status';
export class Wrapper_EasDeleteNodeComponent {
  /*private*/ _eventHandler:Function;
  context:import0.EasDeleteNodeComponent;
  /*private*/ _changed:boolean;
  constructor(p0:any,p1:any) {
    this._changed = false;
    this.context = new import0.EasDeleteNodeComponent(p0,p1);
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
var renderType_EasDeleteNodeComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_EasDeleteNodeComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.EasDeleteNodeComponent>;
  _EasDeleteNodeComponent_0_3:Wrapper_EasDeleteNodeComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_EasDeleteNodeComponent_Host0,renderType_EasDeleteNodeComponent_Host,import5.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'ng-component',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_EasDeleteNodeComponent0(this.viewUtils,this,0,this._el_0);
    this._EasDeleteNodeComponent_0_3 = new Wrapper_EasDeleteNodeComponent(this.injectorGet(import8.TestcaseEASAction,this.parentIndex),this.injectorGet(import9.FormBuilder,this.parentIndex));
    this.compView_0.create(this._EasDeleteNodeComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import7.ComponentRef_<any>(0,this,this._el_0,this._EasDeleteNodeComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.EasDeleteNodeComponent) && (0 === requestNodeIndex))) { return this._EasDeleteNodeComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._EasDeleteNodeComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._EasDeleteNodeComponent_0_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const EasDeleteNodeComponentNgFactory:import7.ComponentFactory<import0.EasDeleteNodeComponent> = new import7.ComponentFactory<import0.EasDeleteNodeComponent>('ng-component',View_EasDeleteNodeComponent_Host0,import0.EasDeleteNodeComponent);
const styles_EasDeleteNodeComponent:any[] = ([] as any[]);
var renderType_EasDeleteNodeComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_EasDeleteNodeComponent,{});
export class View_EasDeleteNodeComponent0 extends import1.AppView<import0.EasDeleteNodeComponent> {
  _el_0:any;
  _FormGroupDirective_0_3:import10.Wrapper_FormGroupDirective;
  _ControlContainer_0_4:any;
  _NgControlStatusGroup_0_5:import11.Wrapper_NgControlStatusGroup;
  _text_1:any;
  _el_2:any;
  compView_2:import1.AppView<import12.ModalComponent>;
  _ModalComponent_2_3:import13.Wrapper_ModalComponent;
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
  _text_15:any;
  _text_16:any;
  _text_17:any;
  _text_18:any;
  _el_19:any;
  _text_20:any;
  _el_21:any;
  _text_22:any;
  _text_23:any;
  _el_24:any;
  _text_25:any;
  _text_26:any;
  _text_27:any;
  _text_28:any;
  _text_29:any;
  /*private*/ _expr_35:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_EasDeleteNodeComponent0,renderType_EasDeleteNodeComponent,import5.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
    this._expr_35 = import14.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'form',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._FormGroupDirective_0_3 = new import10.Wrapper_FormGroupDirective((null as any),(null as any));
    this._ControlContainer_0_4 = this._FormGroupDirective_0_3.context;
    this._NgControlStatusGroup_0_5 = new import11.Wrapper_NgControlStatusGroup(this._ControlContainer_0_4);
    this._text_1 = this.renderer.createText(this._el_0,'\n	',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'zui-modal',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_2 = new import13.View_ModalComponent0(this.viewUtils,this,2,this._el_2);
    this._ModalComponent_2_3 = new import13.Wrapper_ModalComponent(new import15.ElementRef(this._el_2),this.compView_2.ref);
    this._text_3 = this.renderer.createText((null as any),'\n	    ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,(null as any),'zui-modal-body',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'\n			',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_4,'div',new import3.InlineArray2(2,'class','subform'),(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'\n				',(null as any));
    this._el_8 = import3.createRenderElement(this.renderer,this._el_6,'div',new import3.InlineArray2(2,'class','row'),(null as any));
    this._text_9 = this.renderer.createText(this._el_8,'\n					',(null as any));
    this._el_10 = import3.createRenderElement(this.renderer,this._el_8,'div',new import3.InlineArray2(2,'class','col-md-12'),(null as any));
    this._text_11 = this.renderer.createText(this._el_10,'\n						',(null as any));
    this._el_12 = import3.createRenderElement(this.renderer,this._el_10,'p',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_13 = this.renderer.createText(this._el_12,'',(null as any));
    this._text_14 = this.renderer.createText(this._el_10,'\n					',(null as any));
    this._text_15 = this.renderer.createText(this._el_8,'\n				',(null as any));
    this._text_16 = this.renderer.createText(this._el_6,'\n			',(null as any));
    this._text_17 = this.renderer.createText(this._el_4,'\n	    ',(null as any));
    this._text_18 = this.renderer.createText((null as any),'\n	    ',(null as any));
    this._el_19 = import3.createRenderElement(this.renderer,(null as any),'zui-modal-footer',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_20 = this.renderer.createText(this._el_19,'\n			',(null as any));
    this._el_21 = import3.createRenderElement(this.renderer,this._el_19,'button',new import3.InlineArray8(6,'class','zui-btn zui-btn-sec','data-dismiss','modal','type','button'),(null as any));
    this._text_22 = this.renderer.createText(this._el_21,'Cancel',(null as any));
    this._text_23 = this.renderer.createText(this._el_19,'\n			',(null as any));
    this._el_24 = import3.createRenderElement(this.renderer,this._el_19,'button',new import3.InlineArray4(4,'class','zui-btn zui-btn-primary','type','submit'),(null as any));
    this._text_25 = this.renderer.createText(this._el_24,'Delete',(null as any));
    this._text_26 = this.renderer.createText(this._el_19,'\n	    ',(null as any));
    this._text_27 = this.renderer.createText((null as any),'\n	',(null as any));
    this.compView_2.create(this._ModalComponent_2_3.context);
    this._text_28 = this.renderer.createText(this._el_0,'\n',(null as any));
    this._text_29 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_0,new import3.InlineArray8(6,'ngSubmit',(null as any),'submit',(null as any),'reset',(null as any)),this.eventHandler(this.handleEvent_0));
    this._FormGroupDirective_0_3.subscribe(this,this.eventHandler(this.handleEvent_0),true);
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
      this._text_15,
      this._text_16,
      this._text_17,
      this._text_18,
      this._el_19,
      this._text_20,
      this._el_21,
      this._text_22,
      this._text_23,
      this._el_24,
      this._text_25,
      this._text_26,
      this._text_27,
      this._text_28,
      this._text_29
    ]
    ),[disposable_0]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import12.ModalComponent) && ((2 <= requestNodeIndex) && (requestNodeIndex <= 27)))) { return this._ModalComponent_2_3.context; }
    if (((token === import16.FormGroupDirective) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 28)))) { return this._FormGroupDirective_0_3.context; }
    if (((token === import17.ControlContainer) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 28)))) { return this._ControlContainer_0_4; }
    if (((token === import18.NgControlStatusGroup) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 28)))) { return this._NgControlStatusGroup_0_5.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = this.context.deleteCycleForm;
    this._FormGroupDirective_0_3.check_form(currVal_0_0_0,throwOnChange,false);
    this._FormGroupDirective_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this._NgControlStatusGroup_0_5.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_2_0_0:any = (this.context.nodeType? ('Delete ' + this.context.nodeType): 'Delete Node');
    this._ModalComponent_2_3.check_title(currVal_2_0_0,throwOnChange,false);
    const currVal_2_0_1:any = 'easDeleteNodeModal';
    this._ModalComponent_2_3.check_modalId(currVal_2_0_1,throwOnChange,false);
    const currVal_2_0_2:any = 'small';
    this._ModalComponent_2_3.check_modalSize(currVal_2_0_2,throwOnChange,false);
    this._ModalComponent_2_3.ngDoCheck(this,this._el_2,throwOnChange);
    this._NgControlStatusGroup_0_5.checkHost(this,this,this._el_0,throwOnChange);
    const currVal_35:any = import3.inlineInterpolate(1,'Are you sure you want to delete ',this.context.nodeInfo.name,' ?');
    if (import3.checkBinding(throwOnChange,this._expr_35,currVal_35)) {
      this.renderer.setText(this._text_13,currVal_35);
      this._expr_35 = currVal_35;
    }
    this.compView_2.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._ModalComponent_2_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_2.destroy();
    this._ModalComponent_2_3.ngOnDestroy();
    this._FormGroupDirective_0_3.ngOnDestroy();
  }
  visitProjectableNodesInternal(nodeIndex:number,ngContentIndex:number,cb:any,ctx:any):void {
    if (((nodeIndex == 2) && (ngContentIndex == 0))) {  }
    if (((nodeIndex == 2) && (ngContentIndex == 1))) { cb(this._el_4,ctx); }
    if (((nodeIndex == 2) && (ngContentIndex == 2))) { cb(this._el_19,ctx); }
  }
  handleEvent_0(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._FormGroupDirective_0_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'ngSubmit')) {
      const pd_sub_0:any = ((<any>this.context.deleteCycleFormSubmit(this.context.deleteCycleForm.value)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}