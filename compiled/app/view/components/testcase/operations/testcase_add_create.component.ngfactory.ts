/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../app/view/components/testcase/operations/testcase_add_create.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '../../../../../../app/view/components/tcr/operations/tcr_create_testcase.component';
import * as import10 from '../../tcr/operations/tcr_create_testcase.component.ngfactory';
import * as import11 from '@angular/forms/src/form_builder';
import * as import12 from '../../../../../../app/actions/testcase.action';
export class Wrapper_TestcaseAddCreateComponent {
  /*private*/ _eventHandler:Function;
  context:import0.TestcaseAddCreateComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  constructor() {
    this._changed = false;
    this.context = new import0.TestcaseAddCreateComponent();
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
    this._expr_2 = import1.UNINITIALIZED;
    this._expr_3 = import1.UNINITIALIZED;
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
  check_isDisabled(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.isDisabled = currValue;
      this._expr_1 = currValue;
    }
  }
  check_tcrCatalogTreeId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_2,currValue))) {
      this._changed = true;
      this.context.tcrCatalogTreeId = currValue;
      this._expr_2 = currValue;
    }
  }
  check_releaseId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_3,currValue))) {
      this._changed = true;
      this.context.releaseId = currValue;
      this._expr_3 = currValue;
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
var renderType_TestcaseAddCreateComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_TestcaseAddCreateComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.TestcaseAddCreateComponent>;
  _TestcaseAddCreateComponent_0_3:Wrapper_TestcaseAddCreateComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_TestcaseAddCreateComponent_Host0,renderType_TestcaseAddCreateComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zee-add-create-dialog',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_TestcaseAddCreateComponent0(this.viewUtils,this,0,this._el_0);
    this._TestcaseAddCreateComponent_0_3 = new Wrapper_TestcaseAddCreateComponent();
    this.compView_0.create(this._TestcaseAddCreateComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._TestcaseAddCreateComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.TestcaseAddCreateComponent) && (0 === requestNodeIndex))) { return this._TestcaseAddCreateComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._TestcaseAddCreateComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const TestcaseAddCreateComponentNgFactory:import8.ComponentFactory<import0.TestcaseAddCreateComponent> = new import8.ComponentFactory<import0.TestcaseAddCreateComponent>('zee-add-create-dialog',View_TestcaseAddCreateComponent_Host0,import0.TestcaseAddCreateComponent);
const styles_TestcaseAddCreateComponent:any[] = ([] as any[]);
var renderType_TestcaseAddCreateComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_TestcaseAddCreateComponent,{});
export class View_TestcaseAddCreateComponent0 extends import2.AppView<import0.TestcaseAddCreateComponent> {
  _el_0:any;
  _text_1:any;
  _text_2:any;
  _el_3:any;
  compView_3:import2.AppView<import9.TcrCreateTestcaseComponent>;
  _TcrCreateTestcaseComponent_3_3:import10.Wrapper_TcrCreateTestcaseComponent;
  _text_4:any;
  _text_5:any;
  /*private*/ _expr_8:any;
  /*private*/ _expr_9:any;
  /*private*/ _expr_10:any;
  /*private*/ _expr_11:any;
  /*private*/ _expr_12:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_TestcaseAddCreateComponent0,renderType_TestcaseAddCreateComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
    this._expr_8 = import1.UNINITIALIZED;
    this._expr_9 = import1.UNINITIALIZED;
    this._expr_10 = import1.UNINITIALIZED;
    this._expr_11 = import1.UNINITIALIZED;
    this._expr_12 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'button',new import3.InlineArray4(4,'data-toggle','modal','type','button'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'',(null as any));
    this._text_2 = this.renderer.createText(parentRenderNode,'\n\n',(null as any));
    this._el_3 = import3.createRenderElement(this.renderer,parentRenderNode,'tcr-create-testcase',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_3 = new import10.View_TcrCreateTestcaseComponent0(this.viewUtils,this,3,this._el_3);
    this._TcrCreateTestcaseComponent_3_3 = new import10.Wrapper_TcrCreateTestcaseComponent(this.parentView.injectorGet(import11.FormBuilder,this.parentIndex),this.parentView.injectorGet(import12.TestcaseAction,this.parentIndex));
    this._text_4 = this.renderer.createText((null as any),'\n',(null as any));
    this.compView_3.create(this._TcrCreateTestcaseComponent_3_3.context);
    this._text_5 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._text_5
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import9.TcrCreateTestcaseComponent) && ((3 <= requestNodeIndex) && (requestNodeIndex <= 4)))) { return this._TcrCreateTestcaseComponent_3_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_3_0_0:any = this.context.testcase;
    this._TcrCreateTestcaseComponent_3_3.check_testcase(currVal_3_0_0,throwOnChange,false);
    const currVal_3_0_1:any = this.context.tcrCatalogTreeId;
    this._TcrCreateTestcaseComponent_3_3.check_tcrCatalogTreeId(currVal_3_0_1,throwOnChange,false);
    const currVal_3_0_2:any = this.context.releaseId;
    this._TcrCreateTestcaseComponent_3_3.check_releaseId(currVal_3_0_2,throwOnChange,false);
    const currVal_3_0_3:any = this.context.fieldOptions;
    this._TcrCreateTestcaseComponent_3_3.check_fieldOptions(currVal_3_0_3,throwOnChange,false);
    this._TcrCreateTestcaseComponent_3_3.ngDoCheck(this,this._el_3,throwOnChange);
    const currVal_8:any = 'btn btn-secondary zui-operations-trigger';
    if (import3.checkBinding(throwOnChange,this._expr_8,currVal_8)) {
      this.renderer.setElementProperty(this._el_0,'className',currVal_8);
      this._expr_8 = currVal_8;
    }
    const currVal_9:any = this.context.isDisabled;
    if (import3.checkBinding(throwOnChange,this._expr_9,currVal_9)) {
      this.renderer.setElementProperty(this._el_0,'disabled',currVal_9);
      this._expr_9 = currVal_9;
    }
    const currVal_10:any = import3.inlineInterpolate(1,'zui-modal-trigger-',this.context.fieldOptions.id,'');
    if (import3.checkBinding(throwOnChange,this._expr_10,currVal_10)) {
      this.renderer.setElementProperty(this._el_0,'id',currVal_10);
      this._expr_10 = currVal_10;
    }
    const currVal_11:any = ('#zee-create-edit-modal-' + this.context.fieldOptions.id);
    if (import3.checkBinding(throwOnChange,this._expr_11,currVal_11)) {
      this.renderer.setElementAttribute(this._el_0,'data-target',((currVal_11 == null)? (null as any): currVal_11.toString()));
      this._expr_11 = currVal_11;
    }
    const currVal_12:any = import3.inlineInterpolate(1,'',this.context.fieldOptions.header,'');
    if (import3.checkBinding(throwOnChange,this._expr_12,currVal_12)) {
      this.renderer.setText(this._text_1,currVal_12);
      this._expr_12 = currVal_12;
    }
    this.compView_3.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_3.destroy();
  }
}