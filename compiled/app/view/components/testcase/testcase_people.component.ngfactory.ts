/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../app/view/components/testcase/testcase_people.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '@angular/core/src/linker/view_container';
import * as import10 from '../../directives/expander/expander.directive.ngfactory';
import * as import11 from '../../../../../app/view/components/common/user/user_detail.component';
import * as import12 from '../common/user/user_detail.component.ngfactory';
import * as import13 from '../../../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import14 from '@angular/core/src/linker/element_ref';
import * as import15 from '@angular/router/src/router';
import * as import16 from '@angular/core/src/linker/template_ref';
import * as import17 from '@angular/common/src/directives/ng_if';
import * as import18 from '../../../../../app/view/directives/expander/expander.directive';
export class Wrapper_TestcasePeopleComponent {
  /*private*/ _eventHandler:Function;
  context:import0.TestcasePeopleComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  constructor() {
    this._changed = false;
    this.context = new import0.TestcasePeopleComponent();
    this._expr_0 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    this.context.ngOnDestroy();
  }
  check_editable(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.editable = currValue;
      this._expr_0 = currValue;
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
var renderType_TestcasePeopleComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_TestcasePeopleComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.TestcasePeopleComponent>;
  _TestcasePeopleComponent_0_3:Wrapper_TestcasePeopleComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_TestcasePeopleComponent_Host0,renderType_TestcasePeopleComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zee-panel-content7',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_TestcasePeopleComponent0(this.viewUtils,this,0,this._el_0);
    this._TestcasePeopleComponent_0_3 = new Wrapper_TestcasePeopleComponent();
    this.compView_0.create(this._TestcasePeopleComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._TestcasePeopleComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.TestcasePeopleComponent) && (0 === requestNodeIndex))) { return this._TestcasePeopleComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._TestcasePeopleComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._TestcasePeopleComponent_0_3.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const TestcasePeopleComponentNgFactory:import8.ComponentFactory<import0.TestcasePeopleComponent> = new import8.ComponentFactory<import0.TestcasePeopleComponent>('zee-panel-content7',View_TestcasePeopleComponent_Host0,import0.TestcasePeopleComponent);
const styles_TestcasePeopleComponent:any[] = ([] as any[]);
class View_TestcasePeopleComponent1 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_TestcasePeopleComponent1,renderType_TestcasePeopleComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_2 = import1.UNINITIALIZED;
    this._expr_3 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'span',new import3.InlineArray2(2,'id','zee-cf-1'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1
    ]
    ),(null as any));
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_2:any = 'zee-column-value';
    if (import3.checkBinding(throwOnChange,this._expr_2,currVal_2)) {
      this.renderer.setElementProperty(this._el_0,'className',currVal_2);
      this._expr_2 = currVal_2;
    }
    const currVal_3:any = import3.inlineInterpolate(1,'\n                            ',this.parentView.context.people.createdOn,'\n                        ');
    if (import3.checkBinding(throwOnChange,this._expr_3,currVal_3)) {
      this.renderer.setText(this._text_1,currVal_3);
      this._expr_3 = currVal_3;
    }
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
var renderType_TestcasePeopleComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_TestcasePeopleComponent,{});
export class View_TestcasePeopleComponent0 extends import2.AppView<import0.TestcasePeopleComponent> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _ExpanderDirective_2_3:import10.Wrapper_ExpanderDirective;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _text_8:any;
  _text_9:any;
  _el_10:any;
  _text_11:any;
  _el_12:any;
  _text_13:any;
  _el_14:any;
  _text_15:any;
  _el_16:any;
  _text_17:any;
  _el_18:any;
  _el_19:any;
  _text_20:any;
  _text_21:any;
  _el_22:any;
  _text_23:any;
  _el_24:any;
  compView_24:import2.AppView<import11.UserDetailComponent>;
  _UserDetailComponent_24_3:import12.Wrapper_UserDetailComponent;
  _text_25:any;
  _text_26:any;
  _text_27:any;
  _text_28:any;
  _el_29:any;
  _text_30:any;
  _el_31:any;
  _text_32:any;
  _el_33:any;
  _el_34:any;
  _text_35:any;
  _text_36:any;
  _anchor_37:any;
  /*private*/ _vc_37:import9.ViewContainer;
  _TemplateRef_37_5:any;
  _NgIf_37_6:import13.Wrapper_NgIf;
  _text_38:any;
  _text_39:any;
  _text_40:any;
  _text_41:any;
  _text_42:any;
  _text_43:any;
  _text_44:any;
  /*private*/ _expr_51:any;
  /*private*/ _expr_52:any;
  /*private*/ _expr_53:any;
  /*private*/ _expr_54:any;
  /*private*/ _expr_55:any;
  /*private*/ _expr_56:any;
  /*private*/ _expr_57:any;
  /*private*/ _expr_58:any;
  /*private*/ _expr_59:any;
  /*private*/ _expr_60:any;
  /*private*/ _expr_61:any;
  /*private*/ _expr_62:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_TestcasePeopleComponent0,renderType_TestcasePeopleComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
    this._expr_51 = import1.UNINITIALIZED;
    this._expr_52 = import1.UNINITIALIZED;
    this._expr_53 = import1.UNINITIALIZED;
    this._expr_54 = import1.UNINITIALIZED;
    this._expr_55 = import1.UNINITIALIZED;
    this._expr_56 = import1.UNINITIALIZED;
    this._expr_57 = import1.UNINITIALIZED;
    this._expr_58 = import1.UNINITIALIZED;
    this._expr_59 = import1.UNINITIALIZED;
    this._expr_60 = import1.UNINITIALIZED;
    this._expr_61 = import1.UNINITIALIZED;
    this._expr_62 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n    ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'zee-expander',new import3.InlineArray2(2,'id','zee-testcase-details-module'),(null as any));
    this._ExpanderDirective_2_3 = new import10.Wrapper_ExpanderDirective(new import14.ElementRef(this._el_2));
    this._text_3 = this.renderer.createText(this._el_2,'\n        ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'div',new import3.InlineArray2(2,'id','zee-testcase-details-module-heading'),(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'\n            ',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_4,'h5',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'People',(null as any));
    this._text_8 = this.renderer.createText(this._el_4,'\n         ',(null as any));
    this._text_9 = this.renderer.createText(this._el_2,'\n         ',(null as any));
    this._el_10 = import3.createRenderElement(this.renderer,this._el_2,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_11 = this.renderer.createText(this._el_10,'\n             ',(null as any));
    this._el_12 = import3.createRenderElement(this.renderer,this._el_10,'ul',new import3.InlineArray2(2,'class','zee-details-column-list clearfix'),(null as any));
    this._text_13 = this.renderer.createText(this._el_12,'\n                ',(null as any));
    this._el_14 = import3.createRenderElement(this.renderer,this._el_12,'li',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_15 = this.renderer.createText(this._el_14,'\n                    ',(null as any));
    this._el_16 = import3.createRenderElement(this.renderer,this._el_14,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_17 = this.renderer.createText(this._el_16,'\n                        ',(null as any));
    this._el_18 = import3.createRenderElement(this.renderer,this._el_16,'strong',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._el_19 = import3.createRenderElement(this.renderer,this._el_18,'b',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_20 = this.renderer.createText(this._el_19,'Created By',(null as any));
    this._text_21 = this.renderer.createText(this._el_16,'\n                        ',(null as any));
    this._el_22 = import3.createRenderElement(this.renderer,this._el_16,'span',new import3.InlineArray2(2,'id','zee-cf-1'),(null as any));
    this._text_23 = this.renderer.createText(this._el_22,'\n                            ',(null as any));
    this._el_24 = import3.createRenderElement(this.renderer,this._el_22,'user-detail',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_24 = new import12.View_UserDetailComponent0(this.viewUtils,this,24,this._el_24);
    this._UserDetailComponent_24_3 = new import12.Wrapper_UserDetailComponent(this.parentView.injectorGet(import15.Router,this.parentIndex));
    this.compView_24.create(this._UserDetailComponent_24_3.context);
    this._text_25 = this.renderer.createText(this._el_22,'\n                        ',(null as any));
    this._text_26 = this.renderer.createText(this._el_16,'\n                    ',(null as any));
    this._text_27 = this.renderer.createText(this._el_14,'\n                ',(null as any));
    this._text_28 = this.renderer.createText(this._el_12,'\n                ',(null as any));
    this._el_29 = import3.createRenderElement(this.renderer,this._el_12,'li',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_30 = this.renderer.createText(this._el_29,'\n                    ',(null as any));
    this._el_31 = import3.createRenderElement(this.renderer,this._el_29,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_32 = this.renderer.createText(this._el_31,'\n                        ',(null as any));
    this._el_33 = import3.createRenderElement(this.renderer,this._el_31,'strong',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._el_34 = import3.createRenderElement(this.renderer,this._el_33,'b',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_35 = this.renderer.createText(this._el_34,'Created On',(null as any));
    this._text_36 = this.renderer.createText(this._el_31,'\n                        ',(null as any));
    this._anchor_37 = this.renderer.createTemplateAnchor(this._el_31,(null as any));
    this._vc_37 = new import9.ViewContainer(37,31,this,this._anchor_37);
    this._TemplateRef_37_5 = new import16.TemplateRef_(this,37,this._anchor_37);
    this._NgIf_37_6 = new import13.Wrapper_NgIf(this._vc_37.vcRef,this._TemplateRef_37_5);
    this._text_38 = this.renderer.createText(this._el_31,'\n                    ',(null as any));
    this._text_39 = this.renderer.createText(this._el_29,'\n                ',(null as any));
    this._text_40 = this.renderer.createText(this._el_12,'\n             ',(null as any));
    this._text_41 = this.renderer.createText(this._el_10,'\n        ',(null as any));
    this._text_42 = this.renderer.createText(this._el_2,'\n    ',(null as any));
    this._text_43 = this.renderer.createText(this._el_0,'\n',(null as any));
    this._text_44 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._el_6,
      this._text_7,
      this._text_8,
      this._text_9,
      this._el_10,
      this._text_11,
      this._el_12,
      this._text_13,
      this._el_14,
      this._text_15,
      this._el_16,
      this._text_17,
      this._el_18,
      this._el_19,
      this._text_20,
      this._text_21,
      this._el_22,
      this._text_23,
      this._el_24,
      this._text_25,
      this._text_26,
      this._text_27,
      this._text_28,
      this._el_29,
      this._text_30,
      this._el_31,
      this._text_32,
      this._el_33,
      this._el_34,
      this._text_35,
      this._text_36,
      this._anchor_37,
      this._text_38,
      this._text_39,
      this._text_40,
      this._text_41,
      this._text_42,
      this._text_43,
      this._text_44
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import11.UserDetailComponent) && (24 === requestNodeIndex))) { return this._UserDetailComponent_24_3.context; }
    if (((token === import16.TemplateRef) && (37 === requestNodeIndex))) { return this._TemplateRef_37_5; }
    if (((token === import17.NgIf) && (37 === requestNodeIndex))) { return this._NgIf_37_6.context; }
    if (((token === import18.ExpanderDirective) && ((2 <= requestNodeIndex) && (requestNodeIndex <= 42)))) { return this._ExpanderDirective_2_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_2_0_0:any = this.context.action;
    this._ExpanderDirective_2_3.check_action(currVal_2_0_0,throwOnChange,false);
    this._ExpanderDirective_2_3.ngDoCheck(this,this._el_2,throwOnChange);
    const currVal_24_0_0:any = this.context.people.createdBy;
    this._UserDetailComponent_24_3.check_userId(currVal_24_0_0,throwOnChange,false);
    this._UserDetailComponent_24_3.ngDoCheck(this,this._el_24,throwOnChange);
    const currVal_37_0_0:any = this.context.people.createdOn;
    this._NgIf_37_6.check_ngIf(currVal_37_0_0,throwOnChange,false);
    this._NgIf_37_6.ngDoCheck(this,this._anchor_37,throwOnChange);
    this._vc_37.detectChangesInNestedViews(throwOnChange);
    const currVal_51:any = 'zee-testcase-people-wrapper';
    if (import3.checkBinding(throwOnChange,this._expr_51,currVal_51)) {
      this.renderer.setElementProperty(this._el_0,'className',currVal_51);
      this._expr_51 = currVal_51;
    }
    const currVal_52:any = 'zee-module zee-module-toggle-wrapper';
    if (import3.checkBinding(throwOnChange,this._expr_52,currVal_52)) {
      this.renderer.setElementProperty(this._el_2,'className',currVal_52);
      this._expr_52 = currVal_52;
    }
    const currVal_53:any = 'zee-module-header';
    if (import3.checkBinding(throwOnChange,this._expr_53,currVal_53)) {
      this.renderer.setElementProperty(this._el_4,'className',currVal_53);
      this._expr_53 = currVal_53;
    }
    const currVal_54:any = 'zee-module-title';
    if (import3.checkBinding(throwOnChange,this._expr_54,currVal_54)) {
      this.renderer.setElementProperty(this._el_6,'className',currVal_54);
      this._expr_54 = currVal_54;
    }
    const currVal_55:any = 'zee-module-content';
    if (import3.checkBinding(throwOnChange,this._expr_55,currVal_55)) {
      this.renderer.setElementProperty(this._el_10,'className',currVal_55);
      this._expr_55 = currVal_55;
    }
    const currVal_56:any = 'zee-column';
    if (import3.checkBinding(throwOnChange,this._expr_56,currVal_56)) {
      this.renderer.setElementProperty(this._el_14,'className',currVal_56);
      this._expr_56 = currVal_56;
    }
    const currVal_57:any = 'zee-column-wrap';
    if (import3.checkBinding(throwOnChange,this._expr_57,currVal_57)) {
      this.renderer.setElementProperty(this._el_16,'className',currVal_57);
      this._expr_57 = currVal_57;
    }
    const currVal_58:any = 'zee-column-name';
    if (import3.checkBinding(throwOnChange,this._expr_58,currVal_58)) {
      this.renderer.setElementProperty(this._el_18,'className',currVal_58);
      this._expr_58 = currVal_58;
    }
    const currVal_59:any = 'zee-column-value';
    if (import3.checkBinding(throwOnChange,this._expr_59,currVal_59)) {
      this.renderer.setElementProperty(this._el_22,'className',currVal_59);
      this._expr_59 = currVal_59;
    }
    const currVal_60:any = 'zee-column';
    if (import3.checkBinding(throwOnChange,this._expr_60,currVal_60)) {
      this.renderer.setElementProperty(this._el_29,'className',currVal_60);
      this._expr_60 = currVal_60;
    }
    const currVal_61:any = 'zee-column-wrap';
    if (import3.checkBinding(throwOnChange,this._expr_61,currVal_61)) {
      this.renderer.setElementProperty(this._el_31,'className',currVal_61);
      this._expr_61 = currVal_61;
    }
    const currVal_62:any = 'zee-column-name';
    if (import3.checkBinding(throwOnChange,this._expr_62,currVal_62)) {
      this.renderer.setElementProperty(this._el_33,'className',currVal_62);
      this._expr_62 = currVal_62;
    }
    this.compView_24.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._ExpanderDirective_2_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this._vc_37.destroyNestedViews();
    this.compView_24.destroy();
    this._ExpanderDirective_2_3.ngOnDestroy();
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 37)) { return new View_TestcasePeopleComponent1(this.viewUtils,this,37,this._anchor_37,this._vc_37); }
    return (null as any);
  }
}