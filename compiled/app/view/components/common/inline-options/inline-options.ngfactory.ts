/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../app/view/components/common/inline-options/inline-options';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '@angular/core/src/linker/element_ref';
import * as import10 from '@angular/core/src/linker/view_container';
import * as import11 from '../inline_dialog/inline_dialog.directive.ngfactory';
import * as import12 from '../../../../../node_modules/@angular/forms/src/directives/default_value_accessor.ngfactory';
import * as import13 from '../../../../../node_modules/@angular/forms/src/directives/ng_model.ngfactory';
import * as import14 from '../../../../../node_modules/@angular/forms/src/directives/ng_control_status.ngfactory';
import * as import15 from '../../../../../node_modules/@angular/common/src/directives/ng_for.ngfactory';
import * as import16 from '@angular/common/src/pipes/i18n_select_pipe';
import * as import17 from '@angular/core/src/linker/template_ref';
import * as import18 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import19 from '@angular/forms/src/directives/default_value_accessor';
import * as import20 from '@angular/forms/src/directives/control_value_accessor';
import * as import21 from '@angular/forms/src/directives/ng_model';
import * as import22 from '@angular/forms/src/directives/ng_control';
import * as import23 from '@angular/forms/src/directives/ng_control_status';
import * as import24 from '@angular/common/src/directives/ng_for';
import * as import25 from '../../../../../../app/view/components/common/inline_dialog/inline_dialog.directive';
export class Wrapper_InlineOptionsComponent {
  /*private*/ _eventHandler:Function;
  context:import0.InlineOptionsComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  /*private*/ _expr_4:any;
  constructor(p0:any) {
    this._changed = false;
    this.context = new import0.InlineOptionsComponent(p0);
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
    this._expr_2 = import1.UNINITIALIZED;
    this._expr_3 = import1.UNINITIALIZED;
    this._expr_4 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
  }
  check_parentId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.parentId = currValue;
      this._expr_0 = currValue;
    }
  }
  check_options(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.options = currValue;
      this._expr_1 = currValue;
    }
  }
  check_selectedOptions(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_2,currValue))) {
      this._changed = true;
      this.context.selectedOptions = currValue;
      this._expr_2 = currValue;
    }
  }
  check_selectOnlyOne(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_3,currValue))) {
      this._changed = true;
      this.context.selectOnlyOne = currValue;
      this._expr_3 = currValue;
    }
  }
  check_searchPlaceholder(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_4,currValue))) {
      this._changed = true;
      this.context.searchPlaceholder = currValue;
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
var renderType_InlineOptionsComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_InlineOptionsComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.InlineOptionsComponent>;
  _InlineOptionsComponent_0_3:Wrapper_InlineOptionsComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_InlineOptionsComponent_Host0,renderType_InlineOptionsComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zui-inline-options',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_InlineOptionsComponent0(this.viewUtils,this,0,this._el_0);
    this._InlineOptionsComponent_0_3 = new Wrapper_InlineOptionsComponent(new import9.ElementRef(this._el_0));
    this.compView_0.create(this._InlineOptionsComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._InlineOptionsComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.InlineOptionsComponent) && (0 === requestNodeIndex))) { return this._InlineOptionsComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._InlineOptionsComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const InlineOptionsComponentNgFactory:import8.ComponentFactory<import0.InlineOptionsComponent> = new import8.ComponentFactory<import0.InlineOptionsComponent>('zui-inline-options',View_InlineOptionsComponent_Host0,import0.InlineOptionsComponent);
const styles_InlineOptionsComponent:any[] = ([] as any[]);
class View_InlineOptionsComponent1 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _text_8:any;
  _el_9:any;
  _text_10:any;
  _el_11:any;
  _text_12:any;
  _text_13:any;
  _text_14:any;
  /*private*/ _expr_15:any;
  /*private*/ _expr_16:any;
  /*private*/ _expr_17:any;
  /*private*/ _expr_18:any;
  /*private*/ _expr_19:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import10.ViewContainer) {
    super(View_InlineOptionsComponent1,renderType_InlineOptionsComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_15 = import1.UNINITIALIZED;
    this._expr_16 = import1.UNINITIALIZED;
    this._expr_17 = import1.UNINITIALIZED;
    this._expr_18 = import1.UNINITIALIZED;
    this._expr_19 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'div',new import3.InlineArray4(4,'class','col-md-4 row','style','margin: 0px;'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n            ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'div',new import3.InlineArray2(2,'class','zui-checkbox2'),(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n              ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'input',new import3.InlineArray4(4,'name','zui-gadget-checkbox','type','checkbox'),(null as any));
    this._text_5 = this.renderer.createText(this._el_2,'\n              ',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_2,'label',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_7 = this.renderer.createText(this._el_2,'\n            ',(null as any));
    this._text_8 = this.renderer.createText(this._el_0,'\n            ',(null as any));
    this._el_9 = import3.createRenderElement(this.renderer,this._el_0,'div',new import3.InlineArray2(2,'style','width: 60%;'),(null as any));
    this._text_10 = this.renderer.createText(this._el_9,'\n              ',(null as any));
    this._el_11 = import3.createRenderElement(this.renderer,this._el_9,'span',new import3.InlineArray4(4,'class','zui-checkbox2 zui-checkbox-value','id','option'),(null as any));
    this._text_12 = this.renderer.createText(this._el_11,'',(null as any));
    this._text_13 = this.renderer.createText(this._el_9,'\n            ',(null as any));
    this._text_14 = this.renderer.createText(this._el_0,'\n          ',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_4,new import3.InlineArray2(2,'change',(null as any)),this.eventHandler(this.handleEvent_4));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._el_6,
      this._text_7,
      this._text_8,
      this._el_9,
      this._text_10,
      this._el_11,
      this._text_12,
      this._text_13,
      this._text_14
    ]
    ),[disposable_0]);
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_15:boolean = !this.context.$implicit.show;
    if (import3.checkBinding(throwOnChange,this._expr_15,currVal_15)) {
      this.renderer.setElementProperty(this._el_0,'hidden',currVal_15);
      this._expr_15 = currVal_15;
    }
    const currVal_16:any = import3.inlineInterpolate(2,'zui-gadget-checkbox-',this.parentView.context.parentId,'-',this.context.$implicit.id,'');
    if (import3.checkBinding(throwOnChange,this._expr_16,currVal_16)) {
      this.renderer.setElementProperty(this._el_4,'id',currVal_16);
      this._expr_16 = currVal_16;
    }
    const currVal_17:any = import3.inlineInterpolate(1,'',this.context.$implicit.id,'');
    if (import3.checkBinding(throwOnChange,this._expr_17,currVal_17)) {
      this.renderer.setElementProperty(this._el_4,'value',currVal_17);
      this._expr_17 = currVal_17;
    }
    const currVal_18:any = 'zui-gadget-checkbox';
    if (import3.checkBinding(throwOnChange,this._expr_18,currVal_18)) {
      this.renderer.setElementAttribute(this._el_11,'for',((currVal_18 == null)? (null as any): currVal_18.toString()));
      this._expr_18 = currVal_18;
    }
    const currVal_19:any = import3.inlineInterpolate(1,'',this.context.$implicit.text,'');
    if (import3.checkBinding(throwOnChange,this._expr_19,currVal_19)) {
      this.renderer.setText(this._text_12,currVal_19);
      this._expr_19 = currVal_19;
    }
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  handleEvent_4(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'change')) {
      const pd_sub_0:any = ((<any>this.parentView.context._toggleCheckbox($event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}
var renderType_InlineOptionsComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_InlineOptionsComponent,{});
export class View_InlineOptionsComponent0 extends import2.AppView<import0.InlineOptionsComponent> {
  _text_0:any;
  _el_1:any;
  _InlineDialogDirective_1_3:import11.Wrapper_InlineDialogDirective;
  _text_2:any;
  _el_3:any;
  _text_4:any;
  _el_5:any;
  _text_6:any;
  _text_7:any;
  _text_8:any;
  _el_9:any;
  _text_10:any;
  _el_11:any;
  _text_12:any;
  _el_13:any;
  _text_14:any;
  _el_15:any;
  _text_16:any;
  _el_17:any;
  _text_18:any;
  _el_19:any;
  _text_20:any;
  _el_21:any;
  _text_22:any;
  _el_23:any;
  _text_24:any;
  _el_25:any;
  _text_26:any;
  _text_27:any;
  _el_28:any;
  _text_29:any;
  _text_30:any;
  _text_31:any;
  _text_32:any;
  _text_33:any;
  _text_34:any;
  _el_35:any;
  _text_36:any;
  _el_37:any;
  _DefaultValueAccessor_37_3:import12.Wrapper_DefaultValueAccessor;
  _NG_VALUE_ACCESSOR_37_4:any[];
  _NgModel_37_5:import13.Wrapper_NgModel;
  _NgControl_37_6:any;
  _NgControlStatus_37_7:import14.Wrapper_NgControlStatus;
  _text_38:any;
  _el_39:any;
  _el_40:any;
  _text_41:any;
  _text_42:any;
  _el_43:any;
  _text_44:any;
  _el_45:any;
  _text_46:any;
  _text_47:any;
  _text_48:any;
  _text_49:any;
  _el_50:any;
  _text_51:any;
  _anchor_52:any;
  /*private*/ _vc_52:import10.ViewContainer;
  _TemplateRef_52_5:any;
  _NgFor_52_6:import15.Wrapper_NgFor;
  _text_53:any;
  _text_54:any;
  _text_55:any;
  _text_56:any;
  _text_57:any;
  _text_58:any;
  /*private*/ _expr_68:any;
  /*private*/ _expr_69:any;
  /*private*/ _expr_70:any;
  /*private*/ _expr_71:any;
  /*private*/ _expr_72:any;
  /*private*/ _expr_73:any;
  /*private*/ _expr_74:any;
  /*private*/ _expr_75:any;
  /*private*/ _expr_76:any;
  /*private*/ _expr_77:any;
  /*private*/ _expr_78:any;
  _pipe_i18nSelect_0:import16.I18nSelectPipe;
  _pipe_i18nSelect_0_0:any;
  /*private*/ _expr_81:any;
  /*private*/ _expr_82:any;
  /*private*/ _expr_83:any;
  /*private*/ _expr_84:any;
  _pipe_i18nSelect_0_1:any;
  /*private*/ _expr_86:any;
  /*private*/ _expr_87:any;
  /*private*/ _expr_88:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_InlineOptionsComponent0,renderType_InlineOptionsComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
    this._expr_68 = import1.UNINITIALIZED;
    this._expr_69 = import1.UNINITIALIZED;
    this._expr_70 = import1.UNINITIALIZED;
    this._expr_71 = import1.UNINITIALIZED;
    this._expr_72 = import1.UNINITIALIZED;
    this._expr_73 = import1.UNINITIALIZED;
    this._expr_74 = import1.UNINITIALIZED;
    this._expr_75 = import1.UNINITIALIZED;
    this._expr_76 = import1.UNINITIALIZED;
    this._expr_77 = import1.UNINITIALIZED;
    this._expr_78 = import1.UNINITIALIZED;
    this._expr_81 = import1.UNINITIALIZED;
    this._expr_82 = import1.UNINITIALIZED;
    this._expr_83 = import1.UNINITIALIZED;
    this._expr_84 = import1.UNINITIALIZED;
    this._expr_86 = import1.UNINITIALIZED;
    this._expr_87 = import1.UNINITIALIZED;
    this._expr_88 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'  ',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,'div',new import3.InlineArray4(4,'class','zui-inline-dialog','zui-inline-dialog',''),(null as any));
    this._InlineDialogDirective_1_3 = new import11.Wrapper_InlineDialogDirective(new import9.ElementRef(this._el_1));
    this._text_2 = this.renderer.createText(this._el_1,'\n  ',(null as any));
    this._el_3 = import3.createRenderElement(this.renderer,this._el_1,'a',new import3.InlineArray2(2,'class','inline-dialog-trigger'),(null as any));
    this._text_4 = this.renderer.createText(this._el_3,'\n    ',(null as any));
    this._el_5 = import3.createRenderElement(this.renderer,this._el_3,'span',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_6 = this.renderer.createText(this._el_5,'Manage',(null as any));
    this._text_7 = this.renderer.createText(this._el_3,'\n  ',(null as any));
    this._text_8 = this.renderer.createText(this._el_1,'\n  ',(null as any));
    this._el_9 = import3.createRenderElement(this.renderer,this._el_1,'div',new import3.InlineArray2(2,'class','inline-dialog-body'),(null as any));
    this._text_10 = this.renderer.createText(this._el_9,'\n    ',(null as any));
    this._el_11 = import3.createRenderElement(this.renderer,this._el_9,'div',new import3.InlineArray2(2,'class','zui-inline-options inline-dialog-content inline-dialog-content-without-padding'),(null as any));
    this._text_12 = this.renderer.createText(this._el_11,'\n      ',(null as any));
    this._el_13 = import3.createRenderElement(this.renderer,this._el_11,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_14 = this.renderer.createText(this._el_13,'\n        ',(null as any));
    this._el_15 = import3.createRenderElement(this.renderer,this._el_13,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_16 = this.renderer.createText(this._el_15,'\n          ',(null as any));
    this._el_17 = import3.createRenderElement(this.renderer,this._el_15,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_18 = this.renderer.createText(this._el_17,'\n            ',(null as any));
    this._el_19 = import3.createRenderElement(this.renderer,this._el_17,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_20 = this.renderer.createText(this._el_19,'\n              ',(null as any));
    this._el_21 = import3.createRenderElement(this.renderer,this._el_19,'div',new import3.InlineArray2(2,'class','zui-checkbox2'),(null as any));
    this._text_22 = this.renderer.createText(this._el_21,'\n                ',(null as any));
    this._el_23 = import3.createRenderElement(this.renderer,this._el_21,'input',new import3.InlineArray8(6,'class','zui-gadget-checkbox-select-all','name','zui-gadget-checkbox-select-all','type','checkbox'),(null as any));
    this._text_24 = this.renderer.createText(this._el_21,'\n                ',(null as any));
    this._el_25 = import3.createRenderElement(this.renderer,this._el_21,'label',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_26 = this.renderer.createText(this._el_21,'\n              ',(null as any));
    this._text_27 = this.renderer.createText(this._el_19,'\n              ',(null as any));
    this._el_28 = import3.createRenderElement(this.renderer,this._el_19,'span',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_29 = this.renderer.createText(this._el_28,'',(null as any));
    this._text_30 = this.renderer.createText(this._el_19,'\n              ',(null as any));
    this._text_31 = this.renderer.createText(this._el_19,'\n              ',(null as any));
    this._text_32 = this.renderer.createText(this._el_19,'\n            ',(null as any));
    this._text_33 = this.renderer.createText(this._el_17,'\n          ',(null as any));
    this._text_34 = this.renderer.createText(this._el_15,'\n          ',(null as any));
    this._el_35 = import3.createRenderElement(this.renderer,this._el_15,'div',new import3.InlineArray2(2,'class','form-group input-group search-table col-xs-8'),(null as any));
    this._text_36 = this.renderer.createText(this._el_35,'\n            ',(null as any));
    this._el_37 = import3.createRenderElement(this.renderer,this._el_35,'input',new import3.InlineArray8(6,'aria-describedby','emailHelp','class','form-control','type','text'),(null as any));
    this._DefaultValueAccessor_37_3 = new import12.Wrapper_DefaultValueAccessor(this.renderer,new import9.ElementRef(this._el_37));
    this._NG_VALUE_ACCESSOR_37_4 = [this._DefaultValueAccessor_37_3.context];
    this._NgModel_37_5 = new import13.Wrapper_NgModel((null as any),(null as any),(null as any),this._NG_VALUE_ACCESSOR_37_4);
    this._NgControl_37_6 = this._NgModel_37_5.context;
    this._NgControlStatus_37_7 = new import14.Wrapper_NgControlStatus(this._NgControl_37_6);
    this._text_38 = this.renderer.createText(this._el_35,'\n            ',(null as any));
    this._el_39 = import3.createRenderElement(this.renderer,this._el_35,'div',new import3.InlineArray2(2,'class','input-group-addon'),(null as any));
    this._el_40 = import3.createRenderElement(this.renderer,this._el_39,'span',new import3.InlineArray4(4,'aria-hidden','true','class','fa fa-search zui-search-icon'),(null as any));
    this._text_41 = this.renderer.createText(this._el_35,'\n          ',(null as any));
    this._text_42 = this.renderer.createText(this._el_15,'\n          ',(null as any));
    this._el_43 = import3.createRenderElement(this.renderer,this._el_15,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_44 = this.renderer.createText(this._el_43,'\n            ',(null as any));
    this._el_45 = import3.createRenderElement(this.renderer,this._el_43,'button',new import3.InlineArray4(4,'class','close','type','button'),(null as any));
    this._text_46 = this.renderer.createText(this._el_45,'×',(null as any));
    this._text_47 = this.renderer.createText(this._el_43,'\n          ',(null as any));
    this._text_48 = this.renderer.createText(this._el_15,'\n        ',(null as any));
    this._text_49 = this.renderer.createText(this._el_13,'\n        ',(null as any));
    this._el_50 = import3.createRenderElement(this.renderer,this._el_13,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_51 = this.renderer.createText(this._el_50,'\n          ',(null as any));
    this._anchor_52 = this.renderer.createTemplateAnchor(this._el_50,(null as any));
    this._vc_52 = new import10.ViewContainer(52,50,this,this._anchor_52);
    this._TemplateRef_52_5 = new import17.TemplateRef_(this,52,this._anchor_52);
    this._NgFor_52_6 = new import15.Wrapper_NgFor(this._vc_52.vcRef,this._TemplateRef_52_5,this.parentView.injectorGet(import18.IterableDiffers,this.parentIndex),this.ref);
    this._text_53 = this.renderer.createText(this._el_50,'\n        ',(null as any));
    this._text_54 = this.renderer.createText(this._el_13,'\n      ',(null as any));
    this._text_55 = this.renderer.createText(this._el_11,'\n    ',(null as any));
    this._text_56 = this.renderer.createText(this._el_9,'\n  ',(null as any));
    this._text_57 = this.renderer.createText(this._el_1,'\n',(null as any));
    this._text_58 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_3,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_3));
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_23,new import3.InlineArray2(2,'change',(null as any)),this.eventHandler(this.handleEvent_23));
    this._pipe_i18nSelect_0 = new import16.I18nSelectPipe();
    this._pipe_i18nSelect_0_0 = import3.pureProxy2(this._pipe_i18nSelect_0.transform.bind(this._pipe_i18nSelect_0));
    this._pipe_i18nSelect_0_1 = import3.pureProxy2(this._pipe_i18nSelect_0.transform.bind(this._pipe_i18nSelect_0));
    var disposable_2:Function = import3.subscribeToRenderElement(this,this._el_37,new import3.InlineArray8(8,'keypress',(null as any),'ngModelChange',(null as any),'input',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_37));
    this._NgModel_37_5.subscribe(this,this.eventHandler(this.handleEvent_37),true);
    var disposable_3:Function = import3.subscribeToRenderElement(this,this._el_39,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_39));
    var disposable_4:Function = import3.subscribeToRenderElement(this,this._el_45,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_45));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._el_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._el_5,
      this._text_6,
      this._text_7,
      this._text_8,
      this._el_9,
      this._text_10,
      this._el_11,
      this._text_12,
      this._el_13,
      this._text_14,
      this._el_15,
      this._text_16,
      this._el_17,
      this._text_18,
      this._el_19,
      this._text_20,
      this._el_21,
      this._text_22,
      this._el_23,
      this._text_24,
      this._el_25,
      this._text_26,
      this._text_27,
      this._el_28,
      this._text_29,
      this._text_30,
      this._text_31,
      this._text_32,
      this._text_33,
      this._text_34,
      this._el_35,
      this._text_36,
      this._el_37,
      this._text_38,
      this._el_39,
      this._el_40,
      this._text_41,
      this._text_42,
      this._el_43,
      this._text_44,
      this._el_45,
      this._text_46,
      this._text_47,
      this._text_48,
      this._text_49,
      this._el_50,
      this._text_51,
      this._anchor_52,
      this._text_53,
      this._text_54,
      this._text_55,
      this._text_56,
      this._text_57,
      this._text_58
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
    if (((token === import19.DefaultValueAccessor) && (37 === requestNodeIndex))) { return this._DefaultValueAccessor_37_3.context; }
    if (((token === import20.NG_VALUE_ACCESSOR) && (37 === requestNodeIndex))) { return this._NG_VALUE_ACCESSOR_37_4; }
    if (((token === import21.NgModel) && (37 === requestNodeIndex))) { return this._NgModel_37_5.context; }
    if (((token === import22.NgControl) && (37 === requestNodeIndex))) { return this._NgControl_37_6; }
    if (((token === import23.NgControlStatus) && (37 === requestNodeIndex))) { return this._NgControlStatus_37_7.context; }
    if (((token === import17.TemplateRef) && (52 === requestNodeIndex))) { return this._TemplateRef_52_5; }
    if (((token === import24.NgFor) && (52 === requestNodeIndex))) { return this._NgFor_52_6.context; }
    if (((token === import25.InlineDialogDirective) && ((1 <= requestNodeIndex) && (requestNodeIndex <= 57)))) { return this._InlineDialogDirective_1_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const valUnwrapper:any = new import1.ValueUnwrapper();
    this._InlineDialogDirective_1_3.ngDoCheck(this,this._el_1,throwOnChange);
    this._DefaultValueAccessor_37_3.ngDoCheck(this,this._el_37,throwOnChange);
    const currVal_37_1_0:any = this.context.filter;
    this._NgModel_37_5.check_model(currVal_37_1_0,throwOnChange,false);
    this._NgModel_37_5.ngDoCheck(this,this._el_37,throwOnChange);
    this._NgControlStatus_37_7.ngDoCheck(this,this._el_37,throwOnChange);
    const currVal_52_0_0:any = this.context.options;
    this._NgFor_52_6.check_ngForOf(currVal_52_0_0,throwOnChange,false);
    this._NgFor_52_6.ngDoCheck(this,this._anchor_52,throwOnChange);
    this._vc_52.detectChangesInNestedViews(throwOnChange);
    const currVal_68:any = import3.inlineInterpolate(1,'inline-options-',this.context.parentId,'');
    if (import3.checkBinding(throwOnChange,this._expr_68,currVal_68)) {
      this.renderer.setElementProperty(this._el_1,'id',currVal_68);
      this._expr_68 = currVal_68;
    }
    const currVal_69:any = 'zui-inline-options-trigger';
    if (import3.checkBinding(throwOnChange,this._expr_69,currVal_69)) {
      this.renderer.setElementProperty(this._el_5,'className',currVal_69);
      this._expr_69 = currVal_69;
    }
    const currVal_70:any = this.context.hideDialogBox;
    if (import3.checkBinding(throwOnChange,this._expr_70,currVal_70)) {
      this.renderer.setElementProperty(this._el_9,'hidden',currVal_70);
      this._expr_70 = currVal_70;
    }
    const currVal_71:any = import3.inlineInterpolate(1,'inline-options-',this.context.parentId,'-container');
    if (import3.checkBinding(throwOnChange,this._expr_71,currVal_71)) {
      this.renderer.setElementProperty(this._el_9,'id',currVal_71);
      this._expr_71 = currVal_71;
    }
    const currVal_72:any = 'zui-panel-body';
    if (import3.checkBinding(throwOnChange,this._expr_72,currVal_72)) {
      this.renderer.setElementProperty(this._el_13,'className',currVal_72);
      this._expr_72 = currVal_72;
    }
    const currVal_73:any = 'zui-inline-options-header';
    if (import3.checkBinding(throwOnChange,this._expr_73,currVal_73)) {
      this.renderer.setElementProperty(this._el_15,'className',currVal_73);
      this._expr_73 = currVal_73;
    }
    const currVal_74:any = 'row col-md-4 col-xs-12';
    if (import3.checkBinding(throwOnChange,this._expr_74,currVal_74)) {
      this.renderer.setElementProperty(this._el_17,'className',currVal_74);
      this._expr_74 = currVal_74;
    }
    const currVal_75:any = 'clearfix';
    if (import3.checkBinding(throwOnChange,this._expr_75,currVal_75)) {
      this.renderer.setElementProperty(this._el_19,'className',currVal_75);
      this._expr_75 = currVal_75;
    }
    const currVal_76:any = this.context.selectOnlyOne;
    if (import3.checkBinding(throwOnChange,this._expr_76,currVal_76)) {
      this.renderer.setElementProperty(this._el_21,'hidden',currVal_76);
      this._expr_76 = currVal_76;
    }
    const currVal_77:any = import3.inlineInterpolate(1,'select-all-options-',this.context.parentId,'');
    if (import3.checkBinding(throwOnChange,this._expr_77,currVal_77)) {
      this.renderer.setElementProperty(this._el_23,'id',currVal_77);
      this._expr_77 = currVal_77;
    }
    valUnwrapper.reset();
    const currVal_78:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(import3.castByValue(this._pipe_i18nSelect_0_0,this._pipe_i18nSelect_0.transform)('zephyr.common.select.all',this.context.i18nMessages)),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_78,currVal_78))) {
      this.renderer.setElementProperty(this._el_23,'title',currVal_78);
      this._expr_78 = currVal_78;
    }
    const currVal_81:any = 'zui-gadget-label control-label';
    if (import3.checkBinding(throwOnChange,this._expr_81,currVal_81)) {
      this.renderer.setElementProperty(this._el_28,'className',currVal_81);
      this._expr_81 = currVal_81;
    }
    const currVal_82:any = this.context.selectOnlyOne;
    if (import3.checkBinding(throwOnChange,this._expr_82,currVal_82)) {
      this.renderer.setElementProperty(this._el_28,'hidden',currVal_82);
      this._expr_82 = currVal_82;
    }
    const currVal_83:any = 'zui-gadget-checkbox-select-all';
    if (import3.checkBinding(throwOnChange,this._expr_83,currVal_83)) {
      this.renderer.setElementAttribute(this._el_28,'for',((currVal_83 == null)? (null as any): currVal_83.toString()));
      this._expr_83 = currVal_83;
    }
    valUnwrapper.reset();
    const currVal_84:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(import3.castByValue(this._pipe_i18nSelect_0_1,this._pipe_i18nSelect_0.transform)('zephyr.common.select.unselect.all',this.context.i18nMessages)),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_84,currVal_84))) {
      this.renderer.setText(this._text_29,currVal_84);
      this._expr_84 = currVal_84;
    }
    const currVal_86:any = import3.inlineInterpolate(1,'',this.context.searchPlaceholder,' ');
    if (import3.checkBinding(throwOnChange,this._expr_86,currVal_86)) {
      this.renderer.setElementProperty(this._el_37,'placeholder',currVal_86);
      this._expr_86 = currVal_86;
    }
    this._NgControlStatus_37_7.checkHost(this,this,this._el_37,throwOnChange);
    const currVal_87:any = 'pull-right';
    if (import3.checkBinding(throwOnChange,this._expr_87,currVal_87)) {
      this.renderer.setElementProperty(this._el_43,'className',currVal_87);
      this._expr_87 = currVal_87;
    }
    const currVal_88:any = 'row grey-background';
    if (import3.checkBinding(throwOnChange,this._expr_88,currVal_88)) {
      this.renderer.setElementProperty(this._el_50,'className',currVal_88);
      this._expr_88 = currVal_88;
    }
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._InlineDialogDirective_1_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this._vc_52.destroyNestedViews();
    this._NgModel_37_5.ngOnDestroy();
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 52)) { return new View_InlineOptionsComponent1(this.viewUtils,this,52,this._anchor_52,this._vc_52); }
    return (null as any);
  }
  handleEvent_3(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.openDialog(true)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_23(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'change')) {
      const pd_sub_0:any = ((<any>this.context.onSelectAll($event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_37(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._DefaultValueAccessor_37_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'keypress')) {
      const pd_sub_0:any = ((<any>this.context.inputKeyPress($event)) !== false);
      result = (pd_sub_0 && result);
    }
    if ((eventName == 'ngModelChange')) {
      const pd_sub_1:any = ((<any>(this.context.filter = $event)) !== false);
      result = (pd_sub_1 && result);
    }
    return result;
  }
  handleEvent_39(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.searchOptions()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_45(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.hideDialog()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}