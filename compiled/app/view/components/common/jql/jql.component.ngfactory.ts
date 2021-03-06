/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../app/view/components/common/jql/jql.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '@angular/http/src/http';
import * as import10 from '../../../../../node_modules/@angular/forms/src/directives/default_value_accessor.ngfactory';
import * as import11 from '../../../../../node_modules/@angular/forms/src/directives/validators.ngfactory';
import * as import12 from '../../../../../node_modules/@angular/forms/src/directives/ng_model.ngfactory';
import * as import13 from '../../../../../node_modules/@angular/forms/src/directives/ng_control_status.ngfactory';
import * as import14 from '@angular/core/src/linker/element_ref';
import * as import15 from '@angular/forms/src/directives/default_value_accessor';
import * as import16 from '@angular/forms/src/directives/validators';
import * as import17 from '@angular/forms/src/validators';
import * as import18 from '@angular/forms/src/directives/control_value_accessor';
import * as import19 from '@angular/forms/src/directives/ng_model';
import * as import20 from '@angular/forms/src/directives/ng_control';
import * as import21 from '@angular/forms/src/directives/ng_control_status';
export class Wrapper_JQLComponent {
  /*private*/ _eventHandler:Function;
  context:import0.JQLComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  subscription0:any;
  subscription1:any;
  constructor(p0:any) {
    this._changed = false;
    this.context = new import0.JQLComponent(p0);
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    (this.subscription0 && this.subscription0.unsubscribe());
    (this.subscription1 && this.subscription1.unsubscribe());
  }
  check_jqlFieldId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.jqlFieldId = currValue;
      this._expr_0 = currValue;
    }
  }
  check_hideSubmitButton(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.hideSubmitButton = currValue;
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
  subscribe(view:import2.AppView<any>,_eventHandler:any,emit0:boolean,emit1:boolean):void {
    this._eventHandler = _eventHandler;
    if (emit0) { (this.subscription0 = this.context.searchDefectsByJQL.subscribe(_eventHandler.bind(view,'searchDefectsByJQL'))); }
    if (emit1) { (this.subscription1 = this.context.OnEnter.subscribe(_eventHandler.bind(view,'OnEnter'))); }
  }
}
var renderType_JQLComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_JQLComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.JQLComponent>;
  _JQLComponent_0_3:Wrapper_JQLComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_JQLComponent_Host0,renderType_JQLComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zee-jql',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_JQLComponent0(this.viewUtils,this,0,this._el_0);
    this._JQLComponent_0_3 = new Wrapper_JQLComponent(this.injectorGet(import9.Http,this.parentIndex));
    this.compView_0.create(this._JQLComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._JQLComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.JQLComponent) && (0 === requestNodeIndex))) { return this._JQLComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._JQLComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._JQLComponent_0_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._JQLComponent_0_3.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const JQLComponentNgFactory:import8.ComponentFactory<import0.JQLComponent> = new import8.ComponentFactory<import0.JQLComponent>('zee-jql',View_JQLComponent_Host0,import0.JQLComponent);
const styles_JQLComponent:any[] = ([] as any[]);
var renderType_JQLComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_JQLComponent,{});
export class View_JQLComponent0 extends import2.AppView<import0.JQLComponent> {
  _text_0:any;
  _text_1:any;
  _el_2:any;
  _DefaultValueAccessor_2_3:import10.Wrapper_DefaultValueAccessor;
  _MaxLengthValidator_2_4:import11.Wrapper_MaxLengthValidator;
  _NG_VALIDATORS_2_5:any[];
  _NG_VALUE_ACCESSOR_2_6:any[];
  _NgModel_2_7:import12.Wrapper_NgModel;
  _NgControl_2_8:any;
  _NgControlStatus_2_9:import13.Wrapper_NgControlStatus;
  _text_3:any;
  /*private*/ _expr_11:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_JQLComponent0,renderType_JQLComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
    this._expr_11 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n\n',(null as any));
    this._text_1 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,parentRenderNode,'input',new import3.InlineArray16(14,'autocomplete','off','class','text form-control jqltext','filterid','','maxlength','2000','name','jqltext','type','text','value',''),(null as any));
    this._DefaultValueAccessor_2_3 = new import10.Wrapper_DefaultValueAccessor(this.renderer,new import14.ElementRef(this._el_2));
    this._MaxLengthValidator_2_4 = new import11.Wrapper_MaxLengthValidator();
    this._NG_VALIDATORS_2_5 = [this._MaxLengthValidator_2_4.context];
    this._NG_VALUE_ACCESSOR_2_6 = [this._DefaultValueAccessor_2_3.context];
    this._NgModel_2_7 = new import12.Wrapper_NgModel((null as any),this._NG_VALIDATORS_2_5,(null as any),this._NG_VALUE_ACCESSOR_2_6);
    this._NgControl_2_8 = this._NgModel_2_7.context;
    this._NgControlStatus_2_9 = new import13.Wrapper_NgControlStatus(this._NgControl_2_8);
    this._text_3 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_2,new import3.InlineArray8(8,'ngModelChange',(null as any),'keypress',(null as any),'input',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_2));
    this._NgModel_2_7.subscribe(this,this.eventHandler(this.handleEvent_2),true);
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._text_1,
      this._el_2,
      this._text_3
    ]
    ),[disposable_0]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import15.DefaultValueAccessor) && (2 === requestNodeIndex))) { return this._DefaultValueAccessor_2_3.context; }
    if (((token === import16.MaxLengthValidator) && (2 === requestNodeIndex))) { return this._MaxLengthValidator_2_4.context; }
    if (((token === import17.NG_VALIDATORS) && (2 === requestNodeIndex))) { return this._NG_VALIDATORS_2_5; }
    if (((token === import18.NG_VALUE_ACCESSOR) && (2 === requestNodeIndex))) { return this._NG_VALUE_ACCESSOR_2_6; }
    if (((token === import19.NgModel) && (2 === requestNodeIndex))) { return this._NgModel_2_7.context; }
    if (((token === import20.NgControl) && (2 === requestNodeIndex))) { return this._NgControl_2_8; }
    if (((token === import21.NgControlStatus) && (2 === requestNodeIndex))) { return this._NgControlStatus_2_9.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._DefaultValueAccessor_2_3.ngDoCheck(this,this._el_2,throwOnChange);
    const currVal_2_1_0:any = '2000';
    this._MaxLengthValidator_2_4.check_maxlength(currVal_2_1_0,throwOnChange,false);
    this._MaxLengthValidator_2_4.ngDoCheck(this,this._el_2,throwOnChange);
    const currVal_2_2_0:any = 'jqltext';
    this._NgModel_2_7.check_name(currVal_2_2_0,throwOnChange,false);
    const currVal_2_2_1:any = this.context.jqlQuery;
    this._NgModel_2_7.check_model(currVal_2_2_1,throwOnChange,false);
    this._NgModel_2_7.ngDoCheck(this,this._el_2,throwOnChange);
    this._NgControlStatus_2_9.ngDoCheck(this,this._el_2,throwOnChange);
    const currVal_11:any = import3.inlineInterpolate(1,'',this.context.jqlFieldId,'');
    if (import3.checkBinding(throwOnChange,this._expr_11,currVal_11)) {
      this.renderer.setElementProperty(this._el_2,'id',currVal_11);
      this._expr_11 = currVal_11;
    }
    this._MaxLengthValidator_2_4.checkHost(this,this,this._el_2,throwOnChange);
    this._NgControlStatus_2_9.checkHost(this,this,this._el_2,throwOnChange);
  }
  destroyInternal():void {
    this._NgModel_2_7.ngOnDestroy();
  }
  handleEvent_2(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._DefaultValueAccessor_2_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'ngModelChange')) {
      const pd_sub_0:any = ((<any>(this.context.jqlQuery = $event)) !== false);
      result = (pd_sub_0 && result);
    }
    if ((eventName == 'keypress')) {
      const pd_sub_1:any = ((<any>this.context.inputKeyPress($event)) !== false);
      result = (pd_sub_1 && result);
    }
    return result;
  }
}