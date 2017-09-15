/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../../../app/view/components/testcase-eas/phase/tree/delete/eas_freeform_delete.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '../../../../../../../../app/actions/testcaseEAS.action';
import * as import9 from '@angular/router/src/router_state';
import * as import10 from '../../../../../../../../app/view/components/common/modal/modal.component';
import * as import11 from '../../../../common/modal/modal.component.ngfactory';
import * as import12 from '@angular/core/src/linker/element_ref';
export class Wrapper_EasFreeformDeleteComponent {
  /*private*/ _eventHandler:Function;
  context:import0.EasFreeformDeleteComponent;
  /*private*/ _changed:boolean;
  constructor(p0:any,p1:any) {
    this._changed = false;
    this.context = new import0.EasFreeformDeleteComponent(p0,p1);
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
var renderType_EasFreeformDeleteComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_EasFreeformDeleteComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.EasFreeformDeleteComponent>;
  _EasFreeformDeleteComponent_0_3:Wrapper_EasFreeformDeleteComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_EasFreeformDeleteComponent_Host0,renderType_EasFreeformDeleteComponent_Host,import5.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'ng-component',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_EasFreeformDeleteComponent0(this.viewUtils,this,0,this._el_0);
    this._EasFreeformDeleteComponent_0_3 = new Wrapper_EasFreeformDeleteComponent(this.injectorGet(import8.TestcaseEASAction,this.parentIndex),this.injectorGet(import9.ActivatedRoute,this.parentIndex));
    this.compView_0.create(this._EasFreeformDeleteComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import7.ComponentRef_<any>(0,this,this._el_0,this._EasFreeformDeleteComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.EasFreeformDeleteComponent) && (0 === requestNodeIndex))) { return this._EasFreeformDeleteComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._EasFreeformDeleteComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._EasFreeformDeleteComponent_0_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const EasFreeformDeleteComponentNgFactory:import7.ComponentFactory<import0.EasFreeformDeleteComponent> = new import7.ComponentFactory<import0.EasFreeformDeleteComponent>('ng-component',View_EasFreeformDeleteComponent_Host0,import0.EasFreeformDeleteComponent);
const styles_EasFreeformDeleteComponent:any[] = ([] as any[]);
var renderType_EasFreeformDeleteComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_EasFreeformDeleteComponent,{});
export class View_EasFreeformDeleteComponent0 extends import1.AppView<import0.EasFreeformDeleteComponent> {
  _el_0:any;
  compView_0:import1.AppView<import10.ModalComponent>;
  _ModalComponent_0_3:import11.Wrapper_ModalComponent;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _el_8:any;
  _text_9:any;
  _el_10:any;
  _text_11:any;
  _text_12:any;
  _text_13:any;
  _text_14:any;
  _text_15:any;
  _text_16:any;
  _el_17:any;
  _text_18:any;
  _el_19:any;
  _text_20:any;
  _text_21:any;
  _el_22:any;
  _text_23:any;
  _text_24:any;
  _text_25:any;
  _text_26:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_EasFreeformDeleteComponent0,renderType_EasFreeformDeleteComponent,import5.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'zui-modal',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_0 = new import11.View_ModalComponent0(this.viewUtils,this,0,this._el_0);
    this._ModalComponent_0_3 = new import11.Wrapper_ModalComponent(new import12.ElementRef(this._el_0),this.compView_0.ref);
    this._text_1 = this.renderer.createText((null as any),'\n    ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,(null as any),'zui-modal-body',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n		',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'div',new import3.InlineArray2(2,'class','subform'),(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'\n			',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_4,'div',new import3.InlineArray2(2,'class','row'),(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'\n				',(null as any));
    this._el_8 = import3.createRenderElement(this.renderer,this._el_6,'div',new import3.InlineArray2(2,'class','col-md-12'),(null as any));
    this._text_9 = this.renderer.createText(this._el_8,'\n					',(null as any));
    this._el_10 = import3.createRenderElement(this.renderer,this._el_8,'p',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_11 = this.renderer.createText(this._el_10,'Selected tree node will be deleted. This cannot be rolled back. Do you wish to continue?',(null as any));
    this._text_12 = this.renderer.createText(this._el_8,'\n				',(null as any));
    this._text_13 = this.renderer.createText(this._el_6,'\n			',(null as any));
    this._text_14 = this.renderer.createText(this._el_4,'\n		',(null as any));
    this._text_15 = this.renderer.createText(this._el_2,'\n    ',(null as any));
    this._text_16 = this.renderer.createText((null as any),'\n    ',(null as any));
    this._el_17 = import3.createRenderElement(this.renderer,(null as any),'zui-modal-footer',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_18 = this.renderer.createText(this._el_17,'\n		',(null as any));
    this._el_19 = import3.createRenderElement(this.renderer,this._el_17,'button',new import3.InlineArray8(6,'class','zui-btn zui-btn-sec','data-dismiss','modal','type','button'),(null as any));
    this._text_20 = this.renderer.createText(this._el_19,'No',(null as any));
    this._text_21 = this.renderer.createText(this._el_17,'\n		',(null as any));
    this._el_22 = import3.createRenderElement(this.renderer,this._el_17,'button',new import3.InlineArray4(4,'class','zui-btn zui-btn-primary','type','button'),(null as any));
    this._text_23 = this.renderer.createText(this._el_22,'Yes',(null as any));
    this._text_24 = this.renderer.createText(this._el_17,'\n    ',(null as any));
    this._text_25 = this.renderer.createText((null as any),'\n',(null as any));
    this.compView_0.create(this._ModalComponent_0_3.context);
    this._text_26 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_22,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_22));
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
      this._text_12,
      this._text_13,
      this._text_14,
      this._text_15,
      this._text_16,
      this._el_17,
      this._text_18,
      this._el_19,
      this._text_20,
      this._text_21,
      this._el_22,
      this._text_23,
      this._text_24,
      this._text_25,
      this._text_26
    ]
    ),[disposable_0]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import10.ModalComponent) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 25)))) { return this._ModalComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = 'Confirm Delete';
    this._ModalComponent_0_3.check_title(currVal_0_0_0,throwOnChange,false);
    const currVal_0_0_1:any = 'easDeleteNodeModal';
    this._ModalComponent_0_3.check_modalId(currVal_0_0_1,throwOnChange,false);
    const currVal_0_0_2:any = 'small';
    this._ModalComponent_0_3.check_modalSize(currVal_0_0_2,throwOnChange,false);
    this._ModalComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._ModalComponent_0_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._ModalComponent_0_3.ngOnDestroy();
  }
  visitProjectableNodesInternal(nodeIndex:number,ngContentIndex:number,cb:any,ctx:any):void {
    if (((nodeIndex == 0) && (ngContentIndex == 0))) {  }
    if (((nodeIndex == 0) && (ngContentIndex == 1))) { cb(this._el_2,ctx); }
    if (((nodeIndex == 0) && (ngContentIndex == 2))) { cb(this._el_17,ctx); }
  }
  handleEvent_22(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.deleteFreeformNode($event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}