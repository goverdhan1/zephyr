/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../../../app/view/components/testcase-eas/phase/freeform/add/testcase_eas_add_browse.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '../../../../../../../../app/actions/tcr.action';
import * as import7 from '@angular/core/src/linker/view_type';
import * as import8 from '@angular/core/src/change_detection/constants';
import * as import9 from '@angular/core/src/linker/component_factory';
import * as import10 from '@angular/http/src/http';
import * as import11 from '../../../../../../../../app/actions/testcaseEAS.action';
import * as import12 from '@angular/core/src/zone/ng_zone';
import * as import13 from '../../../../../../../../app/view/components/common/tree/tree.component';
import * as import14 from '../../../../../../../../app/actions/global.action';
import * as import15 from '../../../../common/tree/tree.component.ngfactory';
import * as import16 from '@angular/core/src/linker/view_container';
import * as import17 from '../../../../../../../../app/services/toastr.service';
import * as import18 from '@angular/core/src/linker/query_list';
import * as import19 from '../../../../../../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import20 from '../../../../../../../../app/view/components/tcr/tcr_grid.component';
import * as import21 from '../../../../../../../../app/actions/notification.action';
import * as import22 from '../../../../../../../../app/actions/grid.action';
import * as import23 from '../../../../tcr/tcr_grid.component.ngfactory';
import * as import24 from '@angular/core/src/linker/template_ref';
import * as import25 from '../../../../../../../../app/services/pouch.db.service';
import * as import26 from '@angular/common/src/directives/ng_if';
export class Wrapper_TestcaseEASFreeFormBrowseComponent {
  /*private*/ _eventHandler:Function;
  context:import0.TestcaseEASFreeFormBrowseComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  /*private*/ _expr_4:any;
  constructor(p0:any,p1:any,p2:any) {
    this._changed = false;
    this.context = new import0.TestcaseEASFreeFormBrowseComponent(p0,p1,p2);
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
    this._expr_2 = import1.UNINITIALIZED;
    this._expr_3 = import1.UNINITIALIZED;
    this._expr_4 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    this.context.ngOnDestroy();
  }
  check_releaseId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.releaseId = currValue;
      this._expr_0 = currValue;
    }
  }
  check_cyclePhaseId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.cyclePhaseId = currValue;
      this._expr_1 = currValue;
    }
  }
  check_parentTreeId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_2,currValue))) {
      this._changed = true;
      this.context.parentTreeId = currValue;
      this._expr_2 = currValue;
    }
  }
  check_projectId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_3,currValue))) {
      this._changed = true;
      this.context.projectId = currValue;
      this._expr_3 = currValue;
    }
  }
  check_includeHierarchy(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_4,currValue))) {
      this._changed = true;
      this.context.includeHierarchy = currValue;
      this._expr_4 = currValue;
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
var renderType_TestcaseEASFreeFormBrowseComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_TestcaseEASFreeFormBrowseComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.TestcaseEASFreeFormBrowseComponent>;
  _TCRAction_0_3:import6.TCRAction;
  _TestcaseEASFreeFormBrowseComponent_0_4:Wrapper_TestcaseEASFreeFormBrowseComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_TestcaseEASFreeFormBrowseComponent_Host0,renderType_TestcaseEASFreeFormBrowseComponent_Host,import7.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import8.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import9.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zui-testcase-eas-freeform-add-browse',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_TestcaseEASFreeFormBrowseComponent0(this.viewUtils,this,0,this._el_0);
    this._TCRAction_0_3 = new import6.TCRAction(this.injectorGet(import10.Http,this.parentIndex));
    this._TestcaseEASFreeFormBrowseComponent_0_4 = new Wrapper_TestcaseEASFreeFormBrowseComponent(this._TCRAction_0_3,this.injectorGet(import11.TestcaseEASAction,this.parentIndex),this.injectorGet(import12.NgZone,this.parentIndex));
    this.compView_0.create(this._TestcaseEASFreeFormBrowseComponent_0_4.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import9.ComponentRef_<any>(0,this,this._el_0,this._TestcaseEASFreeFormBrowseComponent_0_4.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import6.TCRAction) && (0 === requestNodeIndex))) { return this._TCRAction_0_3; }
    if (((token === import0.TestcaseEASFreeFormBrowseComponent) && (0 === requestNodeIndex))) { return this._TestcaseEASFreeFormBrowseComponent_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._TestcaseEASFreeFormBrowseComponent_0_4.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._TestcaseEASFreeFormBrowseComponent_0_4.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._TestcaseEASFreeFormBrowseComponent_0_4.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const TestcaseEASFreeFormBrowseComponentNgFactory:import9.ComponentFactory<import0.TestcaseEASFreeFormBrowseComponent> = new import9.ComponentFactory<import0.TestcaseEASFreeFormBrowseComponent>('zui-testcase-eas-freeform-add-browse',View_TestcaseEASFreeFormBrowseComponent_Host0,import0.TestcaseEASFreeFormBrowseComponent);
const styles_TestcaseEASFreeFormBrowseComponent:any[] = ([] as any[]);
class View_TestcaseEASFreeFormBrowseComponent1 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  compView_2:import2.AppView<import13.TreeComponent>;
  _GlobalAction_2_3:import14.GlobalAction;
  _TreeComponent_2_4:import15.Wrapper_TreeComponent;
  _text_3:any;
  /*private*/ _expr_7:any;
  _arr_8:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import16.ViewContainer) {
    super(View_TestcaseEASFreeFormBrowseComponent1,renderType_TestcaseEASFreeFormBrowseComponent,import7.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import8.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_7 = import1.UNINITIALIZED;
    this._arr_8 = import3.pureProxy2((p0:any,p1:any):any[] => {
      return [
        p0,
        p1
      ]
      ;
    });
  }
  createInternal(rootSelector:string):import9.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'section',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n            ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'tree-view',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_2 = new import15.View_TreeComponent0(this.viewUtils,this,2,this._el_2);
    this._GlobalAction_2_3 = new import14.GlobalAction(this.parentView.parentView.injectorGet(import10.Http,this.parentView.parentIndex));
    this._TreeComponent_2_4 = new import15.Wrapper_TreeComponent(this._GlobalAction_2_3,this.parentView.parentView.injectorGet(import17.ToastrService,this.parentView.parentIndex));
    this.compView_2.create(this._TreeComponent_2_4.context);
    this._text_3 = this.renderer.createText(this._el_0,'\n          ',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_2,new import3.InlineArray4(4,'onTreeNodeClick',(null as any),'onTreeNodeSelect',(null as any)),this.eventHandler(this.handleEvent_2));
    this._TreeComponent_2_4.subscribe(this,this.eventHandler(this.handleEvent_2),false,false,false,false,true,false,true,false,false,false,false);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3
    ]
    ),[disposable_0]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import14.GlobalAction) && (2 === requestNodeIndex))) { return this._GlobalAction_2_3; }
    if (((token === import13.TreeComponent) && (2 === requestNodeIndex))) { return this._TreeComponent_2_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_2_0_0:any = 'checkbox';
    this._TreeComponent_2_4.check_options(currVal_2_0_0,throwOnChange,false);
    const currVal_2_0_1:any = this.parentView.context.treeData;
    this._TreeComponent_2_4.check_treeData(currVal_2_0_1,throwOnChange,false);
    const currVal_2_0_2:any = this._arr_8('dnd','contextmenu');
    this._TreeComponent_2_4.check_removeFromDefault(currVal_2_0_2,throwOnChange,false);
    const currVal_2_0_3:any = true;
    this._TreeComponent_2_4.check_showFilter(currVal_2_0_3,throwOnChange,false);
    const currVal_2_0_4:any = '-tcrBrowse';
    this._TreeComponent_2_4.check_treeContext(currVal_2_0_4,throwOnChange,false);
    const currVal_2_0_5:any = this.parentView.context.selectedNodes;
    this._TreeComponent_2_4.check_selectedNodes(currVal_2_0_5,throwOnChange,false);
    const currVal_2_0_6:any = true;
    this._TreeComponent_2_4.check_threeStateCheckbox(currVal_2_0_6,throwOnChange,false);
    this._TreeComponent_2_4.ngDoCheck(this,this._el_2,throwOnChange);
    const currVal_7:any = 'tree-tcr';
    if (import3.checkBinding(throwOnChange,this._expr_7,currVal_7)) {
      this.renderer.setElementProperty(this._el_0,'className',currVal_7);
      this._expr_7 = currVal_7;
    }
    this.compView_2.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_2.destroy();
    this._TreeComponent_2_4.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  handleEvent_2(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'onTreeNodeClick')) {
      const pd_sub_0:any = ((<any>this.parentView.context.onTcrTreeClick($event)) !== false);
      result = (pd_sub_0 && result);
    }
    if ((eventName == 'onTreeNodeSelect')) {
      const pd_sub_1:any = ((<any>this.parentView.context.onTreeNodeSelect($event)) !== false);
      result = (pd_sub_1 && result);
    }
    return result;
  }
}
var renderType_TestcaseEASFreeFormBrowseComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_TestcaseEASFreeFormBrowseComponent,{});
export class View_TestcaseEASFreeFormBrowseComponent0 extends import2.AppView<import0.TestcaseEASFreeFormBrowseComponent> {
  _viewQuery_TcrGridComponent_0:import18.QueryList<any>;
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
  _el_11:any;
  _text_12:any;
  _el_13:any;
  _text_14:any;
  _el_15:any;
  _text_16:any;
  _el_17:any;
  _text_18:any;
  _anchor_19:any;
  /*private*/ _vc_19:import16.ViewContainer;
  _TemplateRef_19_5:any;
  _NgIf_19_6:import19.Wrapper_NgIf;
  _text_20:any;
  _text_21:any;
  _el_22:any;
  _text_23:any;
  _el_24:any;
  _el_25:any;
  _text_26:any;
  _text_27:any;
  _el_28:any;
  _text_29:any;
  _el_30:any;
  _text_31:any;
  _el_32:any;
  _text_33:any;
  _el_34:any;
  compView_34:import2.AppView<import20.TcrGridComponent>;
  _TCRAction_34_3:import6.TCRAction;
  _NotificationAction_34_4:import21.NotificationAction;
  _GridAction_34_5:import22.GridAction;
  _TcrGridComponent_34_6:import23.Wrapper_TcrGridComponent;
  _text_35:any;
  _text_36:any;
  _text_37:any;
  _text_38:any;
  _text_39:any;
  _text_40:any;
  _text_41:any;
  _text_42:any;
  /*private*/ _expr_52:any;
  /*private*/ _expr_53:any;
  /*private*/ _expr_54:any;
  /*private*/ _expr_55:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_TestcaseEASFreeFormBrowseComponent0,renderType_TestcaseEASFreeFormBrowseComponent,import7.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import8.ChangeDetectorStatus.CheckAlways);
    this._expr_52 = import1.UNINITIALIZED;
    this._expr_53 = import1.UNINITIALIZED;
    this._expr_54 = import1.UNINITIALIZED;
    this._expr_55 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import9.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._viewQuery_TcrGridComponent_0 = new import18.QueryList<any>();
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'zui-add-tab-browse-component',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n  ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'h5',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n    ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'span',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'     ',(null as any));
    this._text_6 = this.renderer.createText(this._el_2,'\n    ',(null as any));
    this._el_7 = import3.createRenderElement(this.renderer,this._el_2,'span',new import3.InlineArray2(2,'id','browse-count'),(null as any));
    this._text_8 = this.renderer.createText(this._el_7,'',(null as any));
    this._text_9 = this.renderer.createText(this._el_2,'\n  ',(null as any));
    this._text_10 = this.renderer.createText(this._el_0,'\n\n  ',(null as any));
    this._el_11 = import3.createRenderElement(this.renderer,this._el_0,'div',new import3.InlineArray2(2,'class','zui-content-layout layout5'),(null as any));
    this._text_12 = this.renderer.createText(this._el_11,'\n    ',(null as any));
    this._el_13 = import3.createRenderElement(this.renderer,this._el_11,'div',new import3.InlineArray2(2,'class','row upper-split'),(null as any));
    this._text_14 = this.renderer.createText(this._el_13,'\n      ',(null as any));
    this._el_15 = import3.createRenderElement(this.renderer,this._el_13,'div',new import3.InlineArray2(2,'class','col-md-12 resizable-flex-wrapper'),(null as any));
    this._text_16 = this.renderer.createText(this._el_15,'\n        ',(null as any));
    this._el_17 = import3.createRenderElement(this.renderer,this._el_15,'div',new import3.InlineArray4(4,'class','zui-flex-h-resizable','id','tcr-h-resizer'),(null as any));
    this._text_18 = this.renderer.createText(this._el_17,'\n          ',(null as any));
    this._anchor_19 = this.renderer.createTemplateAnchor(this._el_17,(null as any));
    this._vc_19 = new import16.ViewContainer(19,17,this,this._anchor_19);
    this._TemplateRef_19_5 = new import24.TemplateRef_(this,19,this._anchor_19);
    this._NgIf_19_6 = new import19.Wrapper_NgIf(this._vc_19.vcRef,this._TemplateRef_19_5);
    this._text_20 = this.renderer.createText(this._el_17,'\n        ',(null as any));
    this._text_21 = this.renderer.createText(this._el_15,'\n        ',(null as any));
    this._el_22 = import3.createRenderElement(this.renderer,this._el_15,'div',new import3.InlineArray4(4,'class','zui-w-handle','id','tcr-h-resizer-handle'),(null as any));
    this._text_23 = this.renderer.createText(this._el_22,'\n          ',(null as any));
    this._el_24 = import3.createRenderElement(this.renderer,this._el_22,'i',new import3.InlineArray4(4,'aria-hidden','true','class','fa fa-ellipsis-v'),(null as any));
    this._el_25 = import3.createRenderElement(this.renderer,this._el_22,'i',new import3.InlineArray4(4,'aria-hidden','true','class','fa fa-ellipsis-v'),(null as any));
    this._text_26 = this.renderer.createText(this._el_22,'\n        ',(null as any));
    this._text_27 = this.renderer.createText(this._el_15,'\n        ',(null as any));
    this._el_28 = import3.createRenderElement(this.renderer,this._el_15,'div',new import3.InlineArray2(2,'class','zui-flex-h-fixed'),(null as any));
    this._text_29 = this.renderer.createText(this._el_28,'\n          ',(null as any));
    this._el_30 = import3.createRenderElement(this.renderer,this._el_28,'section',new import3.InlineArray2(2,'id','testcase-grid-panel'),(null as any));
    this._text_31 = this.renderer.createText(this._el_30,'\n            ',(null as any));
    this._el_32 = import3.createRenderElement(this.renderer,this._el_30,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_33 = this.renderer.createText(this._el_32,'\n              ',(null as any));
    this._el_34 = import3.createRenderElement(this.renderer,this._el_32,'zui-tcr-grid',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_34 = new import23.View_TcrGridComponent0(this.viewUtils,this,34,this._el_34);
    this._TCRAction_34_3 = new import6.TCRAction(this.parentView.injectorGet(import10.Http,this.parentIndex));
    this._NotificationAction_34_4 = new import21.NotificationAction(this.parentView.injectorGet(import10.Http,this.parentIndex));
    this._GridAction_34_5 = new import22.GridAction(this.parentView.injectorGet(import10.Http,this.parentIndex),this.parentView.injectorGet(import25.PouchDBPrefsServices,this.parentIndex));
    this._TcrGridComponent_34_6 = new import23.Wrapper_TcrGridComponent(this._TCRAction_34_3,this._NotificationAction_34_4,this.compView_34.ref,this._GridAction_34_5,this.parentView.injectorGet(import25.PouchDBPrefsServices,this.parentIndex));
    this.compView_34.create(this._TcrGridComponent_34_6.context);
    this._text_35 = this.renderer.createText(this._el_32,'\n            ',(null as any));
    this._text_36 = this.renderer.createText(this._el_30,'\n          ',(null as any));
    this._text_37 = this.renderer.createText(this._el_28,'\n        ',(null as any));
    this._text_38 = this.renderer.createText(this._el_15,'\n      ',(null as any));
    this._text_39 = this.renderer.createText(this._el_13,'\n    ',(null as any));
    this._text_40 = this.renderer.createText(this._el_11,'\n  ',(null as any));
    this._text_41 = this.renderer.createText(this._el_0,'\n',(null as any));
    this._text_42 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_34,new import3.InlineArray4(4,'onClearSelectedTctIds',(null as any),'onTcrGridRowSelection',(null as any)),this.eventHandler(this.handleEvent_34));
    this._TcrGridComponent_34_6.subscribe(this,this.eventHandler(this.handleEvent_34),false,true,false,true,false,false);
    this._viewQuery_TcrGridComponent_0.reset([this._TcrGridComponent_34_6.context]);
    this.context.tcrGridUI = this._viewQuery_TcrGridComponent_0.first;
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
      this._text_9,
      this._text_10,
      this._el_11,
      this._text_12,
      this._el_13,
      this._text_14,
      this._el_15,
      this._text_16,
      this._el_17,
      this._text_18,
      this._anchor_19,
      this._text_20,
      this._text_21,
      this._el_22,
      this._text_23,
      this._el_24,
      this._el_25,
      this._text_26,
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
      this._text_40,
      this._text_41,
      this._text_42
    ]
    ),[disposable_0]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import24.TemplateRef) && (19 === requestNodeIndex))) { return this._TemplateRef_19_5; }
    if (((token === import26.NgIf) && (19 === requestNodeIndex))) { return this._NgIf_19_6.context; }
    if (((token === import6.TCRAction) && (34 === requestNodeIndex))) { return this._TCRAction_34_3; }
    if (((token === import21.NotificationAction) && (34 === requestNodeIndex))) { return this._NotificationAction_34_4; }
    if (((token === import22.GridAction) && (34 === requestNodeIndex))) { return this._GridAction_34_5; }
    if (((token === import20.TcrGridComponent) && (34 === requestNodeIndex))) { return this._TcrGridComponent_34_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_19_0_0:any = this.context._releaseIdObs;
    this._NgIf_19_6.check_ngIf(currVal_19_0_0,throwOnChange,false);
    this._NgIf_19_6.ngDoCheck(this,this._anchor_19,throwOnChange);
    const currVal_34_0_0:any = this.context.selectedTctIds;
    this._TcrGridComponent_34_6.check_selectedTctIds(currVal_34_0_0,throwOnChange,false);
    const currVal_34_0_1:any = this.context.secondaryIds;
    this._TcrGridComponent_34_6.check_secIds(currVal_34_0_1,throwOnChange,false);
    const currVal_34_0_2:any = false;
    this._TcrGridComponent_34_6.check_isSearchView(currVal_34_0_2,throwOnChange,false);
    const currVal_34_0_3:any = false;
    this._TcrGridComponent_34_6.check_isAdvancedSearch(currVal_34_0_3,throwOnChange,false);
    const currVal_34_0_4:any = true;
    this._TcrGridComponent_34_6.check_emitBrowseEvent(currVal_34_0_4,throwOnChange,false);
    const currVal_34_0_5:any = false;
    this._TcrGridComponent_34_6.check_showCoverage(currVal_34_0_5,throwOnChange,false);
    const currVal_34_0_6:any = this.context.releaseId;
    this._TcrGridComponent_34_6.check_releaseId(currVal_34_0_6,throwOnChange,false);
    if (this._TcrGridComponent_34_6.ngDoCheck(this,this._el_34,throwOnChange)) { this.compView_34.markAsCheckOnce(); }
    this._vc_19.detectChangesInNestedViews(throwOnChange);
    const currVal_52:any = import3.inlineInterpolate(2,'',this.context.total.nodes,' node(s), ',this.context.total.count,' testcase(s) selected.');
    if (import3.checkBinding(throwOnChange,this._expr_52,currVal_52)) {
      this.renderer.setText(this._text_8,currVal_52);
      this._expr_52 = currVal_52;
    }
    const currVal_53:any = 'testcase-grid grid-10-row-fix';
    if (import3.checkBinding(throwOnChange,this._expr_53,currVal_53)) {
      this.renderer.setElementProperty(this._el_32,'className',currVal_53);
      this._expr_53 = currVal_53;
    }
    const currVal_54:any = this.context.selectedTreeNode;
    if (import3.checkBinding(throwOnChange,this._expr_54,currVal_54)) {
      this.renderer.setElementProperty(this._el_34,'selectedTreeNode',currVal_54);
      this._expr_54 = currVal_54;
    }
    const currVal_55:any = false;
    if (import3.checkBinding(throwOnChange,this._expr_55,currVal_55)) {
      this.renderer.setElementProperty(this._el_34,'showContextMenu',currVal_55);
      this._expr_55 = currVal_55;
    }
    this.compView_34.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { this._TcrGridComponent_34_6.context.ngAfterViewChecked(); }
  }
  destroyInternal():void {
    this._vc_19.destroyNestedViews();
    this.compView_34.destroy();
    this._TcrGridComponent_34_6.ngOnDestroy();
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 19)) { return new View_TestcaseEASFreeFormBrowseComponent1(this.viewUtils,this,19,this._anchor_19,this._vc_19); }
    return (null as any);
  }
  handleEvent_34(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'onClearSelectedTctIds')) {
      const pd_sub_0:any = ((<any>this.context.clearSelectedTctIds($event)) !== false);
      result = (pd_sub_0 && result);
    }
    if ((eventName == 'onTcrGridRowSelection')) {
      const pd_sub_1:any = ((<any>this.context.tcrGridRowSelection($event)) !== false);
      result = (pd_sub_1 && result);
    }
    return result;
  }
}