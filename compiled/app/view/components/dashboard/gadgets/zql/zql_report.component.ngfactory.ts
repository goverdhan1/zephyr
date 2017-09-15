/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../../app/view/components/dashboard/gadgets/zql/zql_report.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '@angular/core/src/linker/query_list';
import * as import9 from '../../../../../../../app/view/components/tcr/tcr_grid.component';
import * as import10 from '../../../../../../../app/actions/tcr.action';
import * as import11 from '../../../../../../../app/actions/notification.action';
import * as import12 from '../../../../../../../app/actions/grid.action';
import * as import13 from '../../../tcr/tcr_grid.component.ngfactory';
import * as import14 from '../../../../../../node_modules/@angular/forms/src/directives/default_value_accessor.ngfactory';
import * as import15 from '../../../../../../node_modules/@angular/forms/src/directives/ng_model.ngfactory';
import * as import16 from '../../../../../../node_modules/@angular/forms/src/directives/ng_control_status.ngfactory';
import * as import17 from '../../../../../../node_modules/@angular/forms/src/directives/select_control_value_accessor.ngfactory';
import * as import18 from '../../../../../../node_modules/@angular/forms/src/directives/select_multiple_control_value_accessor.ngfactory';
import * as import19 from '../../../../../../../app/view/components/common/search/zql_search.component';
import * as import20 from '../../../../../../../app/actions/zql.action';
import * as import21 from '../../../common/search/zql_search.component.ngfactory';
import * as import22 from '@angular/common/src/pipes/i18n_select_pipe';
import * as import23 from '@angular/core/src/change_detection/change_detection_util';
import * as import24 from '@angular/http/src/http';
import * as import25 from '../../../../../../../app/services/pouch.db.service';
import * as import26 from '@angular/core/src/linker/element_ref';
import * as import27 from '@angular/core/src/zone/ng_zone';
import * as import28 from '@angular/forms/src/directives/default_value_accessor';
import * as import29 from '@angular/forms/src/directives/control_value_accessor';
import * as import30 from '@angular/forms/src/directives/ng_model';
import * as import31 from '@angular/forms/src/directives/ng_control';
import * as import32 from '@angular/forms/src/directives/ng_control_status';
import * as import33 from '@angular/forms/src/directives/select_control_value_accessor';
import * as import34 from '@angular/forms/src/directives/select_multiple_control_value_accessor';
import * as import35 from '@angular/core/src/security';
export class Wrapper_ZQLSearchReportComponent {
  /*private*/ _eventHandler:Function;
  context:import0.ZQLSearchReportComponent;
  /*private*/ _changed:boolean;
  subscription0:any;
  subscription1:any;
  constructor() {
    this._changed = false;
    this.context = new import0.ZQLSearchReportComponent();
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
    if (emit0) { (this.subscription0 = this.context.onEditModeUpdate.subscribe(_eventHandler.bind(view,'onEditModeUpdate'))); }
    if (emit1) { (this.subscription1 = this.context.onSaveUpdate.subscribe(_eventHandler.bind(view,'onSaveUpdate'))); }
  }
}
var renderType_ZQLSearchReportComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_ZQLSearchReportComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.ZQLSearchReportComponent>;
  _ZQLSearchReportComponent_0_3:Wrapper_ZQLSearchReportComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ZQLSearchReportComponent_Host0,renderType_ZQLSearchReportComponent_Host,import5.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zui-zql-chart',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_ZQLSearchReportComponent0(this.viewUtils,this,0,this._el_0);
    this._ZQLSearchReportComponent_0_3 = new Wrapper_ZQLSearchReportComponent();
    this.compView_0.create(this._ZQLSearchReportComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import7.ComponentRef_<any>(0,this,this._el_0,this._ZQLSearchReportComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.ZQLSearchReportComponent) && (0 === requestNodeIndex))) { return this._ZQLSearchReportComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._ZQLSearchReportComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._ZQLSearchReportComponent_0_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._ZQLSearchReportComponent_0_3.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const ZQLSearchReportComponentNgFactory:import7.ComponentFactory<import0.ZQLSearchReportComponent> = new import7.ComponentFactory<import0.ZQLSearchReportComponent>('zui-zql-chart',View_ZQLSearchReportComponent_Host0,import0.ZQLSearchReportComponent);
const styles_ZQLSearchReportComponent:any[] = ['.zui-disable-pointer[_ngcontent-%COMP%] {\n            opacity: 0.4;\n	        pointer-events: none;\n        }\n        .zui-zql-gadget-wrapper[_ngcontent-%COMP%] {\n            display: inline-block;\n            width: 100%;\n        }'];
var renderType_ZQLSearchReportComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.Emulated,styles_ZQLSearchReportComponent,{});
export class View_ZQLSearchReportComponent0 extends import1.AppView<import0.ZQLSearchReportComponent> {
  _viewQuery_TcrGridComponent_0:import8.QueryList<any>;
  _text_0:any;
  _el_1:any;
  _text_2:any;
  _el_3:any;
  compView_3:import1.AppView<import9.TcrGridComponent>;
  _TCRAction_3_3:import10.TCRAction;
  _NotificationAction_3_4:import11.NotificationAction;
  _GridAction_3_5:import12.GridAction;
  _TcrGridComponent_3_6:import13.Wrapper_TcrGridComponent;
  _text_4:any;
  _text_5:any;
  _text_6:any;
  _el_7:any;
  _text_8:any;
  _el_9:any;
  _text_10:any;
  _el_11:any;
  _text_12:any;
  _el_13:any;
  _text_14:any;
  _text_15:any;
  _el_16:any;
  _DefaultValueAccessor_16_3:import14.Wrapper_DefaultValueAccessor;
  _NG_VALUE_ACCESSOR_16_4:any[];
  _NgModel_16_5:import15.Wrapper_NgModel;
  _NgControl_16_6:any;
  _NgControlStatus_16_7:import16.Wrapper_NgControlStatus;
  _text_17:any;
  _text_18:any;
  _el_19:any;
  _text_20:any;
  _el_21:any;
  _text_22:any;
  _text_23:any;
  _el_24:any;
  _SelectControlValueAccessor_24_3:import17.Wrapper_SelectControlValueAccessor;
  _NG_VALUE_ACCESSOR_24_4:any[];
  _NgModel_24_5:import15.Wrapper_NgModel;
  _NgControl_24_6:any;
  _NgControlStatus_24_7:import16.Wrapper_NgControlStatus;
  _text_25:any;
  _el_26:any;
  _NgSelectOption_26_3:import17.Wrapper_NgSelectOption;
  _NgSelectMultipleOption_26_4:import18.Wrapper_NgSelectMultipleOption;
  _text_27:any;
  _text_28:any;
  _text_29:any;
  _text_30:any;
  _text_31:any;
  _el_32:any;
  _text_33:any;
  _el_34:any;
  _text_35:any;
  _text_36:any;
  _el_37:any;
  compView_37:import1.AppView<import19.ZQLSearchComponent>;
  _ZQLAction_37_3:import20.ZQLAction;
  _ZQLSearchComponent_37_4:import21.Wrapper_ZQLSearchComponent;
  _text_38:any;
  _text_39:any;
  _text_40:any;
  _el_41:any;
  _text_42:any;
  _el_43:any;
  _text_44:any;
  _text_45:any;
  _el_46:any;
  _text_47:any;
  _text_48:any;
  _text_49:any;
  _text_50:any;
  /*private*/ _expr_72:any;
  /*private*/ _expr_73:any;
  /*private*/ _expr_74:any;
  /*private*/ _expr_75:any;
  /*private*/ _expr_76:any;
  /*private*/ _expr_77:any;
  _pipe_i18nSelect_0:import22.I18nSelectPipe;
  _pipe_i18nSelect_0_0:any;
  /*private*/ _expr_80:any;
  /*private*/ _expr_81:any;
  /*private*/ _expr_82:any;
  _pipe_i18nSelect_0_1:any;
  /*private*/ _expr_84:any;
  /*private*/ _expr_85:any;
  _pipe_i18nSelect_0_2:any;
  /*private*/ _expr_87:any;
  /*private*/ _expr_88:any;
  /*private*/ _expr_89:any;
  /*private*/ _expr_90:any;
  /*private*/ _expr_91:any;
  _pipe_i18nSelect_0_3:any;
  /*private*/ _expr_93:any;
  _pipe_i18nSelect_0_4:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ZQLSearchReportComponent0,renderType_ZQLSearchReportComponent,import5.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
    this._expr_72 = import23.UNINITIALIZED;
    this._expr_73 = import23.UNINITIALIZED;
    this._expr_74 = import23.UNINITIALIZED;
    this._expr_75 = import23.UNINITIALIZED;
    this._expr_76 = import23.UNINITIALIZED;
    this._expr_77 = import23.UNINITIALIZED;
    this._expr_80 = import23.UNINITIALIZED;
    this._expr_81 = import23.UNINITIALIZED;
    this._expr_82 = import23.UNINITIALIZED;
    this._expr_84 = import23.UNINITIALIZED;
    this._expr_85 = import23.UNINITIALIZED;
    this._expr_87 = import23.UNINITIALIZED;
    this._expr_88 = import23.UNINITIALIZED;
    this._expr_89 = import23.UNINITIALIZED;
    this._expr_90 = import23.UNINITIALIZED;
    this._expr_91 = import23.UNINITIALIZED;
    this._expr_93 = import23.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._viewQuery_TcrGridComponent_0 = new import8.QueryList<any>();
    this._text_0 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_2 = this.renderer.createText(this._el_1,'\n    ',(null as any));
    this._el_3 = import3.createRenderElement(this.renderer,this._el_1,'zui-tcr-grid',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_3 = new import13.View_TcrGridComponent0(this.viewUtils,this,3,this._el_3);
    this._TCRAction_3_3 = new import10.TCRAction(this.parentView.injectorGet(import24.Http,this.parentIndex));
    this._NotificationAction_3_4 = new import11.NotificationAction(this.parentView.injectorGet(import24.Http,this.parentIndex));
    this._GridAction_3_5 = new import12.GridAction(this.parentView.injectorGet(import24.Http,this.parentIndex),this.parentView.injectorGet(import25.PouchDBPrefsServices,this.parentIndex));
    this._TcrGridComponent_3_6 = new import13.Wrapper_TcrGridComponent(this._TCRAction_3_3,this._NotificationAction_3_4,this.compView_3.ref,this._GridAction_3_5,this.parentView.injectorGet(import25.PouchDBPrefsServices,this.parentIndex));
    this.compView_3.create(this._TcrGridComponent_3_6.context);
    this._text_4 = this.renderer.createText(this._el_1,'\n',(null as any));
    this._text_5 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._text_6 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_7 = import3.createRenderElement(this.renderer,parentRenderNode,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_8 = this.renderer.createText(this._el_7,'\n    ',(null as any));
    this._el_9 = import3.createRenderElement(this.renderer,this._el_7,'fieldset',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_10 = this.renderer.createText(this._el_9,'\n        ',(null as any));
    this._el_11 = import3.createRenderElement(this.renderer,this._el_9,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_12 = this.renderer.createText(this._el_11,'\n            ',(null as any));
    this._el_13 = import3.createRenderElement(this.renderer,this._el_11,'label',new import3.InlineArray2(2,'for','dashboard-name'),(null as any));
    this._text_14 = this.renderer.createText(this._el_13,'',(null as any));
    this._text_15 = this.renderer.createText(this._el_11,'\n            ',(null as any));
    this._el_16 = import3.createRenderElement(this.renderer,this._el_11,'input',new import3.InlineArray8(6,'id','dashboard-name','placeholder','Name','type','text'),(null as any));
    this._DefaultValueAccessor_16_3 = new import14.Wrapper_DefaultValueAccessor(this.renderer,new import26.ElementRef(this._el_16));
    this._NG_VALUE_ACCESSOR_16_4 = [this._DefaultValueAccessor_16_3.context];
    this._NgModel_16_5 = new import15.Wrapper_NgModel((null as any),(null as any),(null as any),this._NG_VALUE_ACCESSOR_16_4);
    this._NgControl_16_6 = this._NgModel_16_5.context;
    this._NgControlStatus_16_7 = new import16.Wrapper_NgControlStatus(this._NgControl_16_6);
    this._text_17 = this.renderer.createText(this._el_11,'\n        ',(null as any));
    this._text_18 = this.renderer.createText(this._el_9,'\n        ',(null as any));
    this._el_19 = import3.createRenderElement(this.renderer,this._el_9,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_20 = this.renderer.createText(this._el_19,'\n            ',(null as any));
    this._el_21 = import3.createRenderElement(this.renderer,this._el_19,'label',new import3.InlineArray2(2,'for','zui-report-entitytype'),(null as any));
    this._text_22 = this.renderer.createText(this._el_21,'',(null as any));
    this._text_23 = this.renderer.createText(this._el_19,'\n            ',(null as any));
    this._el_24 = import3.createRenderElement(this.renderer,this._el_19,'select',new import3.InlineArray2(2,'id','dashboard-start-from'),(null as any));
    this._SelectControlValueAccessor_24_3 = new import17.Wrapper_SelectControlValueAccessor(this.renderer,new import26.ElementRef(this._el_24));
    this._NG_VALUE_ACCESSOR_24_4 = [this._SelectControlValueAccessor_24_3.context];
    this._NgModel_24_5 = new import15.Wrapper_NgModel((null as any),(null as any),(null as any),this._NG_VALUE_ACCESSOR_24_4);
    this._NgControl_24_6 = this._NgModel_24_5.context;
    this._NgControlStatus_24_7 = new import16.Wrapper_NgControlStatus(this._NgControl_24_6);
    this._text_25 = this.renderer.createText(this._el_24,'\n                ',(null as any));
    this._el_26 = import3.createRenderElement(this.renderer,this._el_24,'option',new import3.InlineArray2(2,'value','testcase'),(null as any));
    this._NgSelectOption_26_3 = new import17.Wrapper_NgSelectOption(new import26.ElementRef(this._el_26),this.renderer,this._SelectControlValueAccessor_24_3.context);
    this._NgSelectMultipleOption_26_4 = new import18.Wrapper_NgSelectMultipleOption(new import26.ElementRef(this._el_26),this.renderer,(null as any));
    this._text_27 = this.renderer.createText(this._el_26,'',(null as any));
    this._text_28 = this.renderer.createText(this._el_24,'\n                ',(null as any));
    this._text_29 = this.renderer.createText(this._el_24,'\n            ',(null as any));
    this._text_30 = this.renderer.createText(this._el_19,'\n        ',(null as any));
    this._text_31 = this.renderer.createText(this._el_9,'\n        ',(null as any));
    this._el_32 = import3.createRenderElement(this.renderer,this._el_9,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_33 = this.renderer.createText(this._el_32,'\n            ',(null as any));
    this._el_34 = import3.createRenderElement(this.renderer,this._el_32,'label',new import3.InlineArray2(2,'for','zui-report-entitytype'),(null as any));
    this._text_35 = this.renderer.createText(this._el_34,'ZQL',(null as any));
    this._text_36 = this.renderer.createText(this._el_32,'\n            ',(null as any));
    this._el_37 = import3.createRenderElement(this.renderer,this._el_32,'zui-zql-search',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_37 = new import21.View_ZQLSearchComponent0(this.viewUtils,this,37,this._el_37);
    this._ZQLAction_37_3 = new import20.ZQLAction(this.parentView.injectorGet(import24.Http,this.parentIndex));
    this._ZQLSearchComponent_37_4 = new import21.Wrapper_ZQLSearchComponent(this._ZQLAction_37_3,this.parentView.injectorGet(import27.NgZone,this.parentIndex));
    this.compView_37.create(this._ZQLSearchComponent_37_4.context);
    this._text_38 = this.renderer.createText(this._el_32,'\n        ',(null as any));
    this._text_39 = this.renderer.createText(this._el_9,'\n    ',(null as any));
    this._text_40 = this.renderer.createText(this._el_7,'\n    ',(null as any));
    this._el_41 = import3.createRenderElement(this.renderer,this._el_7,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_42 = this.renderer.createText(this._el_41,'\n        ',(null as any));
    this._el_43 = import3.createRenderElement(this.renderer,this._el_41,'button',new import3.InlineArray4(4,'class','btn btn-default','type','button'),(null as any));
    this._text_44 = this.renderer.createText(this._el_43,'',(null as any));
    this._text_45 = this.renderer.createText(this._el_41,'\n        ',(null as any));
    this._el_46 = import3.createRenderElement(this.renderer,this._el_41,'button',new import3.InlineArray4(4,'class','btn btn-default','type','button'),(null as any));
    this._text_47 = this.renderer.createText(this._el_46,'',(null as any));
    this._text_48 = this.renderer.createText(this._el_41,'\n    ',(null as any));
    this._text_49 = this.renderer.createText(this._el_7,'\n',(null as any));
    this._text_50 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._pipe_i18nSelect_0 = new import22.I18nSelectPipe();
    this._pipe_i18nSelect_0_0 = import3.pureProxy2(this._pipe_i18nSelect_0.transform.bind(this._pipe_i18nSelect_0));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_16,new import3.InlineArray8(6,'ngModelChange',(null as any),'input',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_16));
    this._NgModel_16_5.subscribe(this,this.eventHandler(this.handleEvent_16),true);
    this._pipe_i18nSelect_0_1 = import3.pureProxy2(this._pipe_i18nSelect_0.transform.bind(this._pipe_i18nSelect_0));
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_24,new import3.InlineArray8(6,'ngModelChange',(null as any),'change',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_24));
    this._NgModel_24_5.subscribe(this,this.eventHandler(this.handleEvent_24),true);
    this._pipe_i18nSelect_0_2 = import3.pureProxy2(this._pipe_i18nSelect_0.transform.bind(this._pipe_i18nSelect_0));
    var disposable_2:Function = import3.subscribeToRenderElement(this,this._el_43,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_43));
    this._pipe_i18nSelect_0_3 = import3.pureProxy2(this._pipe_i18nSelect_0.transform.bind(this._pipe_i18nSelect_0));
    var disposable_3:Function = import3.subscribeToRenderElement(this,this._el_46,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_46));
    this._pipe_i18nSelect_0_4 = import3.pureProxy2(this._pipe_i18nSelect_0.transform.bind(this._pipe_i18nSelect_0));
    this._viewQuery_TcrGridComponent_0.reset([this._TcrGridComponent_3_6.context]);
    this.context.tcrGridCmp = this._viewQuery_TcrGridComponent_0.first;
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._el_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._text_5,
      this._text_6,
      this._el_7,
      this._text_8,
      this._el_9,
      this._text_10,
      this._el_11,
      this._text_12,
      this._el_13,
      this._text_14,
      this._text_15,
      this._el_16,
      this._text_17,
      this._text_18,
      this._el_19,
      this._text_20,
      this._el_21,
      this._text_22,
      this._text_23,
      this._el_24,
      this._text_25,
      this._el_26,
      this._text_27,
      this._text_28,
      this._text_29,
      this._text_30,
      this._text_31,
      this._el_32,
      this._text_33,
      this._el_34,
      this._text_35,
      this._text_36,
      this._el_37,
      this._text_38,
      this._text_39,
      this._text_40,
      this._el_41,
      this._text_42,
      this._el_43,
      this._text_44,
      this._text_45,
      this._el_46,
      this._text_47,
      this._text_48,
      this._text_49,
      this._text_50
    ]
    ),[
      disposable_0,
      disposable_1,
      disposable_2,
      disposable_3
    ]
    );
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import10.TCRAction) && (3 === requestNodeIndex))) { return this._TCRAction_3_3; }
    if (((token === import11.NotificationAction) && (3 === requestNodeIndex))) { return this._NotificationAction_3_4; }
    if (((token === import12.GridAction) && (3 === requestNodeIndex))) { return this._GridAction_3_5; }
    if (((token === import9.TcrGridComponent) && (3 === requestNodeIndex))) { return this._TcrGridComponent_3_6.context; }
    if (((token === import28.DefaultValueAccessor) && (16 === requestNodeIndex))) { return this._DefaultValueAccessor_16_3.context; }
    if (((token === import29.NG_VALUE_ACCESSOR) && (16 === requestNodeIndex))) { return this._NG_VALUE_ACCESSOR_16_4; }
    if (((token === import30.NgModel) && (16 === requestNodeIndex))) { return this._NgModel_16_5.context; }
    if (((token === import31.NgControl) && (16 === requestNodeIndex))) { return this._NgControl_16_6; }
    if (((token === import32.NgControlStatus) && (16 === requestNodeIndex))) { return this._NgControlStatus_16_7.context; }
    if (((token === import33.NgSelectOption) && ((26 <= requestNodeIndex) && (requestNodeIndex <= 27)))) { return this._NgSelectOption_26_3.context; }
    if (((token === import34.NgSelectMultipleOption) && ((26 <= requestNodeIndex) && (requestNodeIndex <= 27)))) { return this._NgSelectMultipleOption_26_4.context; }
    if (((token === import33.SelectControlValueAccessor) && ((24 <= requestNodeIndex) && (requestNodeIndex <= 29)))) { return this._SelectControlValueAccessor_24_3.context; }
    if (((token === import29.NG_VALUE_ACCESSOR) && ((24 <= requestNodeIndex) && (requestNodeIndex <= 29)))) { return this._NG_VALUE_ACCESSOR_24_4; }
    if (((token === import30.NgModel) && ((24 <= requestNodeIndex) && (requestNodeIndex <= 29)))) { return this._NgModel_24_5.context; }
    if (((token === import31.NgControl) && ((24 <= requestNodeIndex) && (requestNodeIndex <= 29)))) { return this._NgControl_24_6; }
    if (((token === import32.NgControlStatus) && ((24 <= requestNodeIndex) && (requestNodeIndex <= 29)))) { return this._NgControlStatus_24_7.context; }
    if (((token === import20.ZQLAction) && (37 === requestNodeIndex))) { return this._ZQLAction_37_3; }
    if (((token === import19.ZQLSearchComponent) && (37 === requestNodeIndex))) { return this._ZQLSearchComponent_37_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const valUnwrapper:any = new import23.ValueUnwrapper();
    const currVal_3_0_0:any = import3.EMPTY_ARRAY;
    this._TcrGridComponent_3_6.check_selectedTctIds(currVal_3_0_0,throwOnChange,false);
    const currVal_3_0_1:any = true;
    this._TcrGridComponent_3_6.check_isSearchView(currVal_3_0_1,throwOnChange,false);
    const currVal_3_0_2:any = true;
    this._TcrGridComponent_3_6.check_isAdvancedSearch(currVal_3_0_2,throwOnChange,false);
    const currVal_3_0_3:any = 1;
    this._TcrGridComponent_3_6.check_releaseId(currVal_3_0_3,throwOnChange,false);
    if (this._TcrGridComponent_3_6.ngDoCheck(this,this._el_3,throwOnChange)) { this.compView_3.markAsCheckOnce(); }
    this._DefaultValueAccessor_16_3.ngDoCheck(this,this._el_16,throwOnChange);
    const currVal_16_1_0:any = this.context.gadgetName;
    this._NgModel_16_5.check_model(currVal_16_1_0,throwOnChange,false);
    this._NgModel_16_5.ngDoCheck(this,this._el_16,throwOnChange);
    this._NgControlStatus_16_7.ngDoCheck(this,this._el_16,throwOnChange);
    this._SelectControlValueAccessor_24_3.ngDoCheck(this,this._el_24,throwOnChange);
    const currVal_24_1_0:any = this.context.componentOptions.params.entityType;
    this._NgModel_24_5.check_model(currVal_24_1_0,throwOnChange,false);
    this._NgModel_24_5.ngDoCheck(this,this._el_24,throwOnChange);
    this._NgControlStatus_24_7.ngDoCheck(this,this._el_24,throwOnChange);
    const currVal_26_0_0:any = 'testcase';
    this._NgSelectOption_26_3.check_value(currVal_26_0_0,throwOnChange,false);
    this._NgSelectOption_26_3.ngDoCheck(this,this._el_26,throwOnChange);
    const currVal_26_1_0:any = 'testcase';
    this._NgSelectMultipleOption_26_4.check_value(currVal_26_1_0,throwOnChange,false);
    this._NgSelectMultipleOption_26_4.ngDoCheck(this,this._el_26,throwOnChange);
    const currVal_37_0_0:any = 1;
    this._ZQLSearchComponent_37_4.check_releaseId(currVal_37_0_0,throwOnChange,false);
    const currVal_37_0_1:any = this.context.componentOptions.id;
    this._ZQLSearchComponent_37_4.check_searchFieldSrcId(currVal_37_0_1,throwOnChange,false);
    const currVal_37_0_2:any = this.context.componentOptions.params.entityType;
    this._ZQLSearchComponent_37_4.check_zqlEntityName(currVal_37_0_2,throwOnChange,false);
    const currVal_37_0_3:any = false;
    this._ZQLSearchComponent_37_4.check_showFilters(currVal_37_0_3,throwOnChange,false);
    const currVal_37_0_4:any = true;
    this._ZQLSearchComponent_37_4.check_hideGoButton(currVal_37_0_4,throwOnChange,false);
    const currVal_37_0_5:any = this.context.componentOptions.params.searchText;
    this._ZQLSearchComponent_37_4.check_searchText(currVal_37_0_5,throwOnChange,false);
    this._ZQLSearchComponent_37_4.ngDoCheck(this,this._el_37,throwOnChange);
    const currVal_72:any = import3.inlineInterpolate(1,'zui-gadget-view-mode-',this.context.componentOptions.id,'');
    if (import3.checkBinding(throwOnChange,this._expr_72,currVal_72)) {
      this.renderer.setElementProperty(this._el_1,'id',currVal_72);
      this._expr_72 = currVal_72;
    }
    const currVal_73:any = import3.inlineInterpolate(1,'zui-tcr-grid-',this.context.componentOptions.id,'');
    if (import3.checkBinding(throwOnChange,this._expr_73,currVal_73)) {
      this.renderer.setElementProperty(this._el_3,'id',currVal_73);
      this._expr_73 = currVal_73;
    }
    const currVal_74:any = import3.EMPTY_ARRAY;
    if (import3.checkBinding(throwOnChange,this._expr_74,currVal_74)) {
      this.renderer.setElementProperty(this._el_3,'selectedTreeNode',currVal_74);
      this._expr_74 = currVal_74;
    }
    const currVal_75:any = import3.inlineInterpolate(1,'zui-gadget-edit-mode-',this.context.componentOptions.id,'');
    if (import3.checkBinding(throwOnChange,this._expr_75,currVal_75)) {
      this.renderer.setElementProperty(this._el_7,'id',currVal_75);
      this._expr_75 = currVal_75;
    }
    const currVal_76:any = 'form-group';
    if (import3.checkBinding(throwOnChange,this._expr_76,currVal_76)) {
      this.renderer.setElementProperty(this._el_11,'className',currVal_76);
      this._expr_76 = currVal_76;
    }
    valUnwrapper.reset();
    const currVal_77:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(import3.castByValue(this._pipe_i18nSelect_0_0,this._pipe_i18nSelect_0.transform)('zephyr.dashboard.name',this.context.i18nMessages)),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_77,currVal_77))) {
      this.renderer.setText(this._text_14,currVal_77);
      this._expr_77 = currVal_77;
    }
    const currVal_80:any = 'form-control';
    if (import3.checkBinding(throwOnChange,this._expr_80,currVal_80)) {
      this.renderer.setElementProperty(this._el_16,'className',currVal_80);
      this._expr_80 = currVal_80;
    }
    this._NgControlStatus_16_7.checkHost(this,this,this._el_16,throwOnChange);
    const currVal_81:any = 'form-group';
    if (import3.checkBinding(throwOnChange,this._expr_81,currVal_81)) {
      this.renderer.setElementProperty(this._el_19,'className',currVal_81);
      this._expr_81 = currVal_81;
    }
    valUnwrapper.reset();
    const currVal_82:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(import3.castByValue(this._pipe_i18nSelect_0_1,this._pipe_i18nSelect_0.transform)('zephyr.search.entity.type',this.context.i18nMessages)),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_82,currVal_82))) {
      this.renderer.setText(this._text_22,currVal_82);
      this._expr_82 = currVal_82;
    }
    const currVal_84:any = 'form-control';
    if (import3.checkBinding(throwOnChange,this._expr_84,currVal_84)) {
      this.renderer.setElementProperty(this._el_24,'className',currVal_84);
      this._expr_84 = currVal_84;
    }
    this._NgControlStatus_24_7.checkHost(this,this,this._el_24,throwOnChange);
    valUnwrapper.reset();
    const currVal_85:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(import3.castByValue(this._pipe_i18nSelect_0_2,this._pipe_i18nSelect_0.transform)('zephyr.search.entity.type.testcase',this.context.i18nMessages)),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_85,currVal_85))) {
      this.renderer.setText(this._text_27,currVal_85);
      this._expr_85 = currVal_85;
    }
    const currVal_87:any = (!this.context.componentOptions.params.entityType? 'form-group zui-disable-pointer zui-zql-gadget-wrapper': 'form-group zui-zql-gadget-wrapper');
    if (import3.checkBinding(throwOnChange,this._expr_87,currVal_87)) {
      this.renderer.setElementProperty(this._el_32,'className',currVal_87);
      this._expr_87 = currVal_87;
    }
    const currVal_88:any = import3.inlineInterpolate(1,'zui-zql-search-',this.context.componentOptions.id,'');
    if (import3.checkBinding(throwOnChange,this._expr_88,currVal_88)) {
      this.renderer.setElementProperty(this._el_37,'id',currVal_88);
      this._expr_88 = currVal_88;
    }
    const currVal_89:any = 'inline';
    if (import3.checkBinding(throwOnChange,this._expr_89,currVal_89)) {
      this.renderer.setElementStyle(this._el_37,'display',((this.viewUtils.sanitizer.sanitize(import35.SecurityContext.STYLE,currVal_89) == null)? (null as any): this.viewUtils.sanitizer.sanitize(import35.SecurityContext.STYLE,currVal_89).toString()));
      this._expr_89 = currVal_89;
    }
    const currVal_90:any = 20;
    if (import3.checkBinding(throwOnChange,this._expr_90,currVal_90)) {
      this.renderer.setElementStyle(this._el_41,'margin-top',((this.viewUtils.sanitizer.sanitize(import35.SecurityContext.STYLE,currVal_90) == null)? (null as any): (this.viewUtils.sanitizer.sanitize(import35.SecurityContext.STYLE,currVal_90).toString() + 'px')));
      this._expr_90 = currVal_90;
    }
    valUnwrapper.reset();
    const currVal_91:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(import3.castByValue(this._pipe_i18nSelect_0_3,this._pipe_i18nSelect_0.transform)('zephyr.button.save',this.context.i18nMessages)),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_91,currVal_91))) {
      this.renderer.setText(this._text_44,currVal_91);
      this._expr_91 = currVal_91;
    }
    valUnwrapper.reset();
    const currVal_93:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(import3.castByValue(this._pipe_i18nSelect_0_4,this._pipe_i18nSelect_0.transform)('zephyr.button.cancel',this.context.i18nMessages)),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_93,currVal_93))) {
      this.renderer.setText(this._text_47,currVal_93);
      this._expr_93 = currVal_93;
    }
    this.compView_3.internalDetectChanges(throwOnChange);
    this.compView_37.internalDetectChanges(throwOnChange);
    if (!throwOnChange) {
      this._TcrGridComponent_3_6.context.ngAfterViewChecked();
      if ((this.numberOfChecks === 0)) { this._ZQLSearchComponent_37_4.context.ngAfterViewInit(); }
    }
  }
  destroyInternal():void {
    this.compView_3.destroy();
    this.compView_37.destroy();
    this._TcrGridComponent_3_6.ngOnDestroy();
    this._NgModel_16_5.ngOnDestroy();
    this._NgSelectOption_26_3.ngOnDestroy();
    this._NgSelectMultipleOption_26_4.ngOnDestroy();
    this._NgModel_24_5.ngOnDestroy();
    this._ZQLSearchComponent_37_4.ngOnDestroy();
  }
  handleEvent_16(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._DefaultValueAccessor_16_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'ngModelChange')) {
      const pd_sub_0:any = ((<any>(this.context.gadgetName = $event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_24(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._SelectControlValueAccessor_24_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'ngModelChange')) {
      const pd_sub_0:any = ((<any>(this.context.componentOptions.params.entityType = $event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_43(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.onSaveEditGadget()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_46(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.onCancelEditGadget()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}