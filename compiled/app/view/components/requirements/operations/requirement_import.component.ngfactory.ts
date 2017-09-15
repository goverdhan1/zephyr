/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../app/view/components/requirements/operations/requirement_import.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '../../../../../../app/view/components/requirements/operations/requirement_import_jira.component';
import * as import10 from '../../../../../../app/actions/defects.action';
import * as import11 from '../../../../../../app/actions/import.action';
import * as import12 from './requirement_import_jira.component.ngfactory';
import * as import13 from '@angular/core/src/linker/view_container';
import * as import14 from '@angular/http/src/http';
import * as import15 from '@angular/router/src/router_state';
import * as import16 from '@angular/router/src/router';
import * as import17 from '../../../../../../app/view/components/common/import/import.component';
import * as import18 from '../../common/import/import.component.ngfactory';
import * as import19 from '../../../../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import20 from '@angular/common/src/pipes/i18n_select_pipe';
import * as import21 from '@angular/forms/src/form_builder';
import * as import22 from '@angular/core/src/zone/ng_zone';
import * as import23 from '@angular/core/src/linker/template_ref';
import * as import24 from '@angular/common/src/directives/ng_if';
export class Wrapper_RequirementsImportComponent {
  /*private*/ _eventHandler:Function;
  context:import0.RequirementsImportComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  constructor() {
    this._changed = false;
    this.context = new import0.RequirementsImportComponent();
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
  }
  check_fieldOptions(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.fieldOptions = currValue;
      this._expr_0 = currValue;
    }
  }
  check_syncClicked(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.syncClicked = currValue;
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
  subscribe(view:import2.AppView<any>,_eventHandler:any):void {
    this._eventHandler = _eventHandler;
  }
}
var renderType_RequirementsImportComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_RequirementsImportComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.RequirementsImportComponent>;
  _RequirementsImportComponent_0_3:Wrapper_RequirementsImportComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_RequirementsImportComponent_Host0,renderType_RequirementsImportComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zee-import-dialog-requirement',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_RequirementsImportComponent0(this.viewUtils,this,0,this._el_0);
    this._RequirementsImportComponent_0_3 = new Wrapper_RequirementsImportComponent();
    this.compView_0.create(this._RequirementsImportComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._RequirementsImportComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.RequirementsImportComponent) && (0 === requestNodeIndex))) { return this._RequirementsImportComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._RequirementsImportComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const RequirementsImportComponentNgFactory:import8.ComponentFactory<import0.RequirementsImportComponent> = new import8.ComponentFactory<import0.RequirementsImportComponent>('zee-import-dialog-requirement',View_RequirementsImportComponent_Host0,import0.RequirementsImportComponent);
const styles_RequirementsImportComponent:any[] = ([] as any[]);
class View_RequirementsImportComponent1 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import9.RequirementsImportJIRAComponent>;
  _DefectsAction_0_3:import10.DefectsAction;
  _ImportAction_0_4:import11.ImportAction;
  _RequirementsImportJIRAComponent_0_5:import12.Wrapper_RequirementsImportJIRAComponent;
  /*private*/ _expr_5:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import13.ViewContainer) {
    super(View_RequirementsImportComponent1,renderType_RequirementsImportComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_5 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'zui-import-req-jira',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_0 = new import12.View_RequirementsImportJIRAComponent0(this.viewUtils,this,0,this._el_0);
    this._DefectsAction_0_3 = new import10.DefectsAction(this.parentView.injectorGet(import14.Http,this.parentIndex));
    this._ImportAction_0_4 = new import11.ImportAction(this.parentView.injectorGet(import14.Http,this.parentIndex));
    this._RequirementsImportJIRAComponent_0_5 = new import12.Wrapper_RequirementsImportJIRAComponent(this.parentView.injectorGet(import15.ActivatedRoute,this.parentIndex),this.parentView.injectorGet(import16.Router,this.parentIndex),this._DefectsAction_0_3,this._ImportAction_0_4);
    this.compView_0.create(this._RequirementsImportJIRAComponent_0_5.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import10.DefectsAction) && (0 === requestNodeIndex))) { return this._DefectsAction_0_3; }
    if (((token === import11.ImportAction) && (0 === requestNodeIndex))) { return this._ImportAction_0_4; }
    if (((token === import9.RequirementsImportJIRAComponent) && (0 === requestNodeIndex))) { return this._RequirementsImportJIRAComponent_0_5.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._RequirementsImportJIRAComponent_0_5.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_5:any = this.parentView.context.fieldOptions;
    if (import3.checkBinding(throwOnChange,this._expr_5,currVal_5)) {
      this.renderer.setElementProperty(this._el_0,'fieldOptions',currVal_5);
      this._expr_5 = currVal_5;
    }
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._RequirementsImportJIRAComponent_0_5.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
var renderType_RequirementsImportComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_RequirementsImportComponent,{});
export class View_RequirementsImportComponent0 extends import2.AppView<import0.RequirementsImportComponent> {
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
  _text_21:any;
  _el_22:any;
  _text_23:any;
  _text_24:any;
  _el_25:any;
  _text_26:any;
  _text_27:any;
  _text_28:any;
  _text_29:any;
  _text_30:any;
  _text_31:any;
  _text_32:any;
  _el_33:any;
  compView_33:import2.AppView<import17.ImportComponent>;
  _ImportAction_33_3:import11.ImportAction;
  _ImportComponent_33_4:import18.Wrapper_ImportComponent;
  _text_34:any;
  _anchor_35:any;
  /*private*/ _vc_35:import13.ViewContainer;
  _TemplateRef_35_5:any;
  _NgIf_35_6:import19.Wrapper_NgIf;
  /*private*/ _expr_42:any;
  /*private*/ _expr_43:any;
  /*private*/ _expr_44:any;
  /*private*/ _expr_45:any;
  /*private*/ _expr_46:any;
  /*private*/ _expr_47:any;
  _pipe_i18nSelect_0:import20.I18nSelectPipe;
  _pipe_i18nSelect_0_0:any;
  /*private*/ _expr_50:any;
  /*private*/ _expr_51:any;
  _pipe_i18nSelect_0_1:any;
  /*private*/ _expr_53:any;
  _pipe_i18nSelect_0_2:any;
  /*private*/ _expr_55:any;
  _pipe_i18nSelect_0_3:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_RequirementsImportComponent0,renderType_RequirementsImportComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
    this._expr_42 = import1.UNINITIALIZED;
    this._expr_43 = import1.UNINITIALIZED;
    this._expr_44 = import1.UNINITIALIZED;
    this._expr_45 = import1.UNINITIALIZED;
    this._expr_46 = import1.UNINITIALIZED;
    this._expr_47 = import1.UNINITIALIZED;
    this._expr_50 = import1.UNINITIALIZED;
    this._expr_51 = import1.UNINITIALIZED;
    this._expr_53 = import1.UNINITIALIZED;
    this._expr_55 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'div',new import3.InlineArray8(8,'data-backdrop','static','id','zui-import-modal-choice','role','dialog','tabindex','-1'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n    ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n        ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'\n            ',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_4,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'\n                ',(null as any));
    this._el_8 = import3.createRenderElement(this.renderer,this._el_6,'button',new import3.InlineArray8(6,'class','close','data-dismiss','modal','type','button'),(null as any));
    this._text_9 = this.renderer.createText(this._el_8,'×',(null as any));
    this._text_10 = this.renderer.createText(this._el_6,'\n                ',(null as any));
    this._el_11 = import3.createRenderElement(this.renderer,this._el_6,'h4',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_12 = this.renderer.createText(this._el_11,'',(null as any));
    this._text_13 = this.renderer.createText(this._el_6,'\n            ',(null as any));
    this._text_14 = this.renderer.createText(this._el_4,'\n            ',(null as any));
    this._el_15 = import3.createRenderElement(this.renderer,this._el_4,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_16 = this.renderer.createText(this._el_15,'\n                ',(null as any));
    this._el_17 = import3.createRenderElement(this.renderer,this._el_15,'div',new import3.InlineArray2(2,'style','text-align: center;'),(null as any));
    this._text_18 = this.renderer.createText(this._el_17,'\n                    ',(null as any));
    this._el_19 = import3.createRenderElement(this.renderer,this._el_17,'button',new import3.InlineArray2(2,'class','btn btn-secondary'),(null as any));
    this._text_20 = this.renderer.createText(this._el_19,'',(null as any));
    this._text_21 = this.renderer.createText(this._el_17,'\n                    ',(null as any));
    this._el_22 = import3.createRenderElement(this.renderer,this._el_17,'button',new import3.InlineArray2(2,'class','btn btn-secondary'),(null as any));
    this._text_23 = this.renderer.createText(this._el_22,'',(null as any));
    this._text_24 = this.renderer.createText(this._el_17,'\n                    ',(null as any));
    this._el_25 = import3.createRenderElement(this.renderer,this._el_17,'button',new import3.InlineArray4(4,'class','btn btn-secondary','data-dismiss','modal'),(null as any));
    this._text_26 = this.renderer.createText(this._el_25,'',(null as any));
    this._text_27 = this.renderer.createText(this._el_17,'\n                ',(null as any));
    this._text_28 = this.renderer.createText(this._el_15,'\n            ',(null as any));
    this._text_29 = this.renderer.createText(this._el_4,'\n        ',(null as any));
    this._text_30 = this.renderer.createText(this._el_2,'\n    ',(null as any));
    this._text_31 = this.renderer.createText(this._el_0,'\n',(null as any));
    this._text_32 = this.renderer.createText(parentRenderNode,'\n\n',(null as any));
    this._el_33 = import3.createRenderElement(this.renderer,parentRenderNode,'zui-import',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_33 = new import18.View_ImportComponent0(this.viewUtils,this,33,this._el_33);
    this._ImportAction_33_3 = new import11.ImportAction(this.parentView.injectorGet(import14.Http,this.parentIndex));
    this._ImportComponent_33_4 = new import18.Wrapper_ImportComponent(this.parentView.injectorGet(import21.FormBuilder,this.parentIndex),this._ImportAction_33_3,this.parentView.injectorGet(import15.ActivatedRoute,this.parentIndex),this.parentView.injectorGet(import22.NgZone,this.parentIndex),this.compView_33.ref);
    this.compView_33.create(this._ImportComponent_33_4.context);
    this._text_34 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._anchor_35 = this.renderer.createTemplateAnchor(parentRenderNode,(null as any));
    this._vc_35 = new import13.ViewContainer(35,(null as any),this,this._anchor_35);
    this._TemplateRef_35_5 = new import23.TemplateRef_(this,35,this._anchor_35);
    this._NgIf_35_6 = new import19.Wrapper_NgIf(this._vc_35.vcRef,this._TemplateRef_35_5);
    this._pipe_i18nSelect_0 = new import20.I18nSelectPipe();
    this._pipe_i18nSelect_0_0 = import3.pureProxy2(this._pipe_i18nSelect_0.transform.bind(this._pipe_i18nSelect_0));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_19,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_19));
    this._pipe_i18nSelect_0_1 = import3.pureProxy2(this._pipe_i18nSelect_0.transform.bind(this._pipe_i18nSelect_0));
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_22,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_22));
    this._pipe_i18nSelect_0_2 = import3.pureProxy2(this._pipe_i18nSelect_0.transform.bind(this._pipe_i18nSelect_0));
    this._pipe_i18nSelect_0_3 = import3.pureProxy2(this._pipe_i18nSelect_0.transform.bind(this._pipe_i18nSelect_0));
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
      this._text_21,
      this._el_22,
      this._text_23,
      this._text_24,
      this._el_25,
      this._text_26,
      this._text_27,
      this._text_28,
      this._text_29,
      this._text_30,
      this._text_31,
      this._text_32,
      this._el_33,
      this._text_34,
      this._anchor_35
    ]
    ),[
      disposable_0,
      disposable_1
    ]
    );
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import11.ImportAction) && (33 === requestNodeIndex))) { return this._ImportAction_33_3; }
    if (((token === import17.ImportComponent) && (33 === requestNodeIndex))) { return this._ImportComponent_33_4.context; }
    if (((token === import23.TemplateRef) && (35 === requestNodeIndex))) { return this._TemplateRef_35_5; }
    if (((token === import24.NgIf) && (35 === requestNodeIndex))) { return this._NgIf_35_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const valUnwrapper:any = new import1.ValueUnwrapper();
    const currVal_33_0_0:any = this.context.fieldOptions;
    this._ImportComponent_33_4.check_fieldOptions(currVal_33_0_0,throwOnChange,false);
    this._ImportComponent_33_4.ngDoCheck(this,this._el_33,throwOnChange);
    const currVal_35_0_0:boolean = !this.context.syncClicked;
    this._NgIf_35_6.check_ngIf(currVal_35_0_0,throwOnChange,false);
    this._NgIf_35_6.ngDoCheck(this,this._anchor_35,throwOnChange);
    this._vc_35.detectChangesInNestedViews(throwOnChange);
    const currVal_42:any = 'modal fade zui-import-modal-choice';
    if (import3.checkBinding(throwOnChange,this._expr_42,currVal_42)) {
      this.renderer.setElementProperty(this._el_0,'className',currVal_42);
      this._expr_42 = currVal_42;
    }
    const currVal_43:any = 'modal-dialog small';
    if (import3.checkBinding(throwOnChange,this._expr_43,currVal_43)) {
      this.renderer.setElementProperty(this._el_2,'className',currVal_43);
      this._expr_43 = currVal_43;
    }
    const currVal_44:any = 'modal-content';
    if (import3.checkBinding(throwOnChange,this._expr_44,currVal_44)) {
      this.renderer.setElementProperty(this._el_4,'className',currVal_44);
      this._expr_44 = currVal_44;
    }
    const currVal_45:any = 'modal-header';
    if (import3.checkBinding(throwOnChange,this._expr_45,currVal_45)) {
      this.renderer.setElementProperty(this._el_6,'className',currVal_45);
      this._expr_45 = currVal_45;
    }
    const currVal_46:any = 'modal-title';
    if (import3.checkBinding(throwOnChange,this._expr_46,currVal_46)) {
      this.renderer.setElementProperty(this._el_11,'className',currVal_46);
      this._expr_46 = currVal_46;
    }
    valUnwrapper.reset();
    const currVal_47:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(import3.castByValue(this._pipe_i18nSelect_0_0,this._pipe_i18nSelect_0.transform)('zephyr.operation.import.choice.title',this.context.i18nMessages)),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_47,currVal_47))) {
      this.renderer.setText(this._text_12,currVal_47);
      this._expr_47 = currVal_47;
    }
    const currVal_50:any = 'modal-body';
    if (import3.checkBinding(throwOnChange,this._expr_50,currVal_50)) {
      this.renderer.setElementProperty(this._el_15,'className',currVal_50);
      this._expr_50 = currVal_50;
    }
    valUnwrapper.reset();
    const currVal_51:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(import3.castByValue(this._pipe_i18nSelect_0_1,this._pipe_i18nSelect_0.transform)('zephyr.requirement.export.jira',this.context.i18nMessages)),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_51,currVal_51))) {
      this.renderer.setText(this._text_20,currVal_51);
      this._expr_51 = currVal_51;
    }
    valUnwrapper.reset();
    const currVal_53:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(import3.castByValue(this._pipe_i18nSelect_0_2,this._pipe_i18nSelect_0.transform)('zephyr.requirement.export.excel',this.context.i18nMessages)),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_53,currVal_53))) {
      this.renderer.setText(this._text_23,currVal_53);
      this._expr_53 = currVal_53;
    }
    valUnwrapper.reset();
    const currVal_55:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(import3.castByValue(this._pipe_i18nSelect_0_3,this._pipe_i18nSelect_0.transform)('zephyr.button.cancel',this.context.i18nMessages)),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_55,currVal_55))) {
      this.renderer.setText(this._text_26,currVal_55);
      this._expr_55 = currVal_55;
    }
    this.compView_33.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._ImportComponent_33_4.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this._vc_35.destroyNestedViews();
    this.compView_33.destroy();
    this._ImportComponent_33_4.ngOnDestroy();
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 35)) { return new View_RequirementsImportComponent1(this.viewUtils,this,35,this._anchor_35,this._vc_35); }
    return (null as any);
  }
  handleEvent_19(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.exportFromJIRA()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_22(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.exportFromExcel()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}