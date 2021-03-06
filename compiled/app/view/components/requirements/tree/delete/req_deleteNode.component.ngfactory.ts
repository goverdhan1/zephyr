/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../../app/view/components/requirements/tree/delete/req_deleteNode.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '@angular/router/src/router_state';
import * as import9 from '@angular/core/src/linker/view_container';
import * as import10 from '@angular/core/src/change_detection/change_detection_util';
import * as import11 from '@angular/core/src/linker/query_list';
import * as import12 from '../../../../../../../app/view/components/common/modal/modal.component';
import * as import13 from '../../../common/modal/modal.component.ngfactory';
import * as import14 from '../../../../../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import15 from '@angular/core/src/linker/element_ref';
import * as import16 from '@angular/core/src/linker/template_ref';
import * as import17 from '@angular/common/src/directives/ng_if';
export class Wrapper_ReqDeleteNodeComponent {
  /*private*/ _eventHandler:Function;
  context:import0.ReqDeleteNodeComponent;
  /*private*/ _changed:boolean;
  subscription0:any;
  subscription1:any;
  subscription2:any;
  constructor(p0:any) {
    this._changed = false;
    this.context = new import0.ReqDeleteNodeComponent(p0);
  }
  ngOnDetach(view:import1.AppView<any>,componentView:import1.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    (this.subscription0 && this.subscription0.unsubscribe());
    (this.subscription1 && this.subscription1.unsubscribe());
    (this.subscription2 && this.subscription2.unsubscribe());
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
  subscribe(view:import1.AppView<any>,_eventHandler:any,emit0:boolean,emit1:boolean,emit2:boolean):void {
    this._eventHandler = _eventHandler;
    if (emit0) { (this.subscription0 = this.context.deleteNode.subscribe(_eventHandler.bind(view,'deleteNode'))); }
    if (emit1) { (this.subscription1 = this.context.deallocateNode.subscribe(_eventHandler.bind(view,'deallocateNode'))); }
    if (emit2) { (this.subscription2 = this.context.destroyComponent.subscribe(_eventHandler.bind(view,'destroyComponent'))); }
  }
}
var renderType_ReqDeleteNodeComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_ReqDeleteNodeComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.ReqDeleteNodeComponent>;
  _ReqDeleteNodeComponent_0_3:Wrapper_ReqDeleteNodeComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ReqDeleteNodeComponent_Host0,renderType_ReqDeleteNodeComponent_Host,import5.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'ng-component',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_ReqDeleteNodeComponent0(this.viewUtils,this,0,this._el_0);
    this._ReqDeleteNodeComponent_0_3 = new Wrapper_ReqDeleteNodeComponent(this.injectorGet(import8.ActivatedRoute,this.parentIndex));
    this.compView_0.create(this._ReqDeleteNodeComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import7.ComponentRef_<any>(0,this,this._el_0,this._ReqDeleteNodeComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.ReqDeleteNodeComponent) && (0 === requestNodeIndex))) { return this._ReqDeleteNodeComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._ReqDeleteNodeComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._ReqDeleteNodeComponent_0_3.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const ReqDeleteNodeComponentNgFactory:import7.ComponentFactory<import0.ReqDeleteNodeComponent> = new import7.ComponentFactory<import0.ReqDeleteNodeComponent>('ng-component',View_ReqDeleteNodeComponent_Host0,import0.ReqDeleteNodeComponent);
const styles_ReqDeleteNodeComponent:any[] = ([] as any[]);
class View_ReqDeleteNodeComponent1 extends import1.AppView<any> {
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
  /*private*/ _expr_12:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_ReqDeleteNodeComponent1,renderType_ReqDeleteNodeComponent,import5.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_12 = import10.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'span',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'label',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n            Deleting the node ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'b',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'',(null as any));
    this._text_6 = this.renderer.createText(this._el_2,', will delete all the nodes underneath it including any data you may have created. Click on “Delete” if you want to do that.\n            ',(null as any));
    this._el_7 = import3.createRenderElement(this.renderer,this._el_2,'br',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_8 = this.renderer.createText(this._el_2,'\n            You can also deallocate this node, where it will get deallocated from the current release, but will not be deleted and can be found in the Global tree. Click on “Deallocate” if you want to do that.\n            ',(null as any));
    this._el_9 = import3.createRenderElement(this.renderer,this._el_2,'br',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_10 = this.renderer.createText(this._el_2,'\n        ',(null as any));
    this._text_11 = this.renderer.createText(this._el_0,'\n      ',(null as any));
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
      this._text_11
    ]
    ),(null as any));
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_12:any = import3.inlineInterpolate(1,'',this.parentView.context.nodeName,'');
    if (import3.checkBinding(throwOnChange,this._expr_12,currVal_12)) {
      this.renderer.setText(this._text_5,currVal_12);
      this._expr_12 = currVal_12;
    }
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
class View_ReqDeleteNodeComponent2 extends import1.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _text_4:any;
  _el_5:any;
  _text_6:any;
  _el_7:any;
  _text_8:any;
  /*private*/ _expr_9:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_ReqDeleteNodeComponent2,renderType_ReqDeleteNodeComponent,import5.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_9 = import10.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'span',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n          Deleting this node ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'b',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'',(null as any));
    this._text_4 = this.renderer.createText(this._el_0,' will permanently remove all nodes underneath it including requirements and their mapping to all Releases and testcases.\n          ',(null as any));
    this._el_5 = import3.createRenderElement(this.renderer,this._el_0,'br',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_6 = this.renderer.createText(this._el_0,'\n          Are you sure you want to continue?\n          ',(null as any));
    this._el_7 = import3.createRenderElement(this.renderer,this._el_0,'br',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_8 = this.renderer.createText(this._el_0,'\n      ',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._text_4,
      this._el_5,
      this._text_6,
      this._el_7,
      this._text_8
    ]
    ),(null as any));
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_9:any = import3.inlineInterpolate(1,'',this.parentView.context.nodeName,'');
    if (import3.checkBinding(throwOnChange,this._expr_9,currVal_9)) {
      this.renderer.setText(this._text_3,currVal_9);
      this._expr_9 = currVal_9;
    }
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
class View_ReqDeleteNodeComponent3 extends import1.AppView<any> {
  _el_0:any;
  _text_1:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_ReqDeleteNodeComponent3,renderType_ReqDeleteNodeComponent,import5.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'button',new import3.InlineArray2(2,'class','zui-btn zui-btn-primary'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'Deallocate',(null as any));
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
      const pd_sub_0:any = ((<any>this.parentView.context.deallocateReqNode($event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}
var renderType_ReqDeleteNodeComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_ReqDeleteNodeComponent,{});
export class View_ReqDeleteNodeComponent0 extends import1.AppView<import0.ReqDeleteNodeComponent> {
  _viewQuery_ModalComponent_0:import11.QueryList<any>;
  _el_0:any;
  compView_0:import1.AppView<import12.ModalComponent>;
  _ModalComponent_0_3:import13.Wrapper_ModalComponent;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _anchor_6:any;
  /*private*/ _vc_6:import9.ViewContainer;
  _TemplateRef_6_5:any;
  _NgIf_6_6:import14.Wrapper_NgIf;
  _text_7:any;
  _anchor_8:any;
  /*private*/ _vc_8:import9.ViewContainer;
  _TemplateRef_8_5:any;
  _NgIf_8_6:import14.Wrapper_NgIf;
  _text_9:any;
  _text_10:any;
  _text_11:any;
  _el_12:any;
  _text_13:any;
  _el_14:any;
  _text_15:any;
  _text_16:any;
  _anchor_17:any;
  /*private*/ _vc_17:import9.ViewContainer;
  _TemplateRef_17_5:any;
  _NgIf_17_6:import14.Wrapper_NgIf;
  _text_18:any;
  _el_19:any;
  _text_20:any;
  _text_21:any;
  _text_22:any;
  _text_23:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ReqDeleteNodeComponent0,renderType_ReqDeleteNodeComponent,import5.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._viewQuery_ModalComponent_0 = new import11.QueryList<any>();
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'zui-modal',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_0 = new import13.View_ModalComponent0(this.viewUtils,this,0,this._el_0);
    this._ModalComponent_0_3 = new import13.Wrapper_ModalComponent(new import15.ElementRef(this._el_0),this.compView_0.ref);
    this._text_1 = this.renderer.createText((null as any),'\n  ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,(null as any),'zui-modal-body',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n    ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'\n      ',(null as any));
    this._anchor_6 = this.renderer.createTemplateAnchor(this._el_4,(null as any));
    this._vc_6 = new import9.ViewContainer(6,4,this,this._anchor_6);
    this._TemplateRef_6_5 = new import16.TemplateRef_(this,6,this._anchor_6);
    this._NgIf_6_6 = new import14.Wrapper_NgIf(this._vc_6.vcRef,this._TemplateRef_6_5);
    this._text_7 = this.renderer.createText(this._el_4,'\n      ',(null as any));
    this._anchor_8 = this.renderer.createTemplateAnchor(this._el_4,(null as any));
    this._vc_8 = new import9.ViewContainer(8,4,this,this._anchor_8);
    this._TemplateRef_8_5 = new import16.TemplateRef_(this,8,this._anchor_8);
    this._NgIf_8_6 = new import14.Wrapper_NgIf(this._vc_8.vcRef,this._TemplateRef_8_5);
    this._text_9 = this.renderer.createText(this._el_4,'\n    ',(null as any));
    this._text_10 = this.renderer.createText(this._el_2,'\n  ',(null as any));
    this._text_11 = this.renderer.createText((null as any),'\n  ',(null as any));
    this._el_12 = import3.createRenderElement(this.renderer,(null as any),'zui-modal-footer',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_13 = this.renderer.createText(this._el_12,'\n  ',(null as any));
    this._el_14 = import3.createRenderElement(this.renderer,this._el_12,'button',new import3.InlineArray4(4,'class','zui-btn zui-btn-sec','data-dismiss','modal'),(null as any));
    this._text_15 = this.renderer.createText(this._el_14,'Cancel',(null as any));
    this._text_16 = this.renderer.createText(this._el_12,'\n    ',(null as any));
    this._anchor_17 = this.renderer.createTemplateAnchor(this._el_12,(null as any));
    this._vc_17 = new import9.ViewContainer(17,12,this,this._anchor_17);
    this._TemplateRef_17_5 = new import16.TemplateRef_(this,17,this._anchor_17);
    this._NgIf_17_6 = new import14.Wrapper_NgIf(this._vc_17.vcRef,this._TemplateRef_17_5);
    this._text_18 = this.renderer.createText(this._el_12,'\n    ',(null as any));
    this._el_19 = import3.createRenderElement(this.renderer,this._el_12,'button',new import3.InlineArray2(2,'class','zui-btn zui-btn-primary'),(null as any));
    this._text_20 = this.renderer.createText(this._el_19,'Delete',(null as any));
    this._text_21 = this.renderer.createText(this._el_12,'\n\n  ',(null as any));
    this._text_22 = this.renderer.createText((null as any),'\n',(null as any));
    this.compView_0.create(this._ModalComponent_0_3.context);
    this._text_23 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_0,new import3.InlineArray2(2,'onOpen',(null as any)),this.eventHandler(this.handleEvent_0));
    this._ModalComponent_0_3.subscribe(this,this.eventHandler(this.handleEvent_0),false,false,true,false);
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_19,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_19));
    this._viewQuery_ModalComponent_0.reset([this._ModalComponent_0_3.context]);
    this.context.modal = this._viewQuery_ModalComponent_0.first;
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._anchor_6,
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
      this._anchor_17,
      this._text_18,
      this._el_19,
      this._text_20,
      this._text_21,
      this._text_22,
      this._text_23
    ]
    ),[
      disposable_0,
      disposable_1
    ]
    );
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import16.TemplateRef) && (6 === requestNodeIndex))) { return this._TemplateRef_6_5; }
    if (((token === import17.NgIf) && (6 === requestNodeIndex))) { return this._NgIf_6_6.context; }
    if (((token === import16.TemplateRef) && (8 === requestNodeIndex))) { return this._TemplateRef_8_5; }
    if (((token === import17.NgIf) && (8 === requestNodeIndex))) { return this._NgIf_8_6.context; }
    if (((token === import16.TemplateRef) && (17 === requestNodeIndex))) { return this._TemplateRef_17_5; }
    if (((token === import17.NgIf) && (17 === requestNodeIndex))) { return this._NgIf_17_6.context; }
    if (((token === import12.ModalComponent) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 22)))) { return this._ModalComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = 'Delete Node';
    this._ModalComponent_0_3.check_title(currVal_0_0_0,throwOnChange,false);
    const currVal_0_0_1:any = 'reqDeleteNodeModal';
    this._ModalComponent_0_3.check_modalId(currVal_0_0_1,throwOnChange,false);
    const currVal_0_0_2:any = 'medium';
    this._ModalComponent_0_3.check_modalSize(currVal_0_0_2,throwOnChange,false);
    this._ModalComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_6_0_0:any = this.context.isDeAllocate;
    this._NgIf_6_6.check_ngIf(currVal_6_0_0,throwOnChange,false);
    this._NgIf_6_6.ngDoCheck(this,this._anchor_6,throwOnChange);
    const currVal_8_0_0:boolean = !this.context.isDeAllocate;
    this._NgIf_8_6.check_ngIf(currVal_8_0_0,throwOnChange,false);
    this._NgIf_8_6.ngDoCheck(this,this._anchor_8,throwOnChange);
    const currVal_17_0_0:any = this.context.isDeAllocate;
    this._NgIf_17_6.check_ngIf(currVal_17_0_0,throwOnChange,false);
    this._NgIf_17_6.ngDoCheck(this,this._anchor_17,throwOnChange);
    this._vc_6.detectChangesInNestedViews(throwOnChange);
    this._vc_8.detectChangesInNestedViews(throwOnChange);
    this._vc_17.detectChangesInNestedViews(throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._ModalComponent_0_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this._vc_6.destroyNestedViews();
    this._vc_8.destroyNestedViews();
    this._vc_17.destroyNestedViews();
    this.compView_0.destroy();
    this._ModalComponent_0_3.ngOnDestroy();
  }
  visitProjectableNodesInternal(nodeIndex:number,ngContentIndex:number,cb:any,ctx:any):void {
    if (((nodeIndex == 0) && (ngContentIndex == 0))) {  }
    if (((nodeIndex == 0) && (ngContentIndex == 1))) { cb(this._el_2,ctx); }
    if (((nodeIndex == 0) && (ngContentIndex == 2))) { cb(this._el_12,ctx); }
  }
  createEmbeddedViewInternal(nodeIndex:number):import1.AppView<any> {
    if ((nodeIndex == 6)) { return new View_ReqDeleteNodeComponent1(this.viewUtils,this,6,this._anchor_6,this._vc_6); }
    if ((nodeIndex == 8)) { return new View_ReqDeleteNodeComponent2(this.viewUtils,this,8,this._anchor_8,this._vc_8); }
    if ((nodeIndex == 17)) { return new View_ReqDeleteNodeComponent3(this.viewUtils,this,17,this._anchor_17,this._vc_17); }
    return (null as any);
  }
  handleEvent_0(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'onOpen')) {
      const pd_sub_0:any = ((<any>this.context.onOpen()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_19(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.deleteReqNode($event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}