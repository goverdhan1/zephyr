/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../app/view/components/common/estimated_time/estimated_time.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '@angular/core/src/linker/view_container';
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
import * as import22 from '../../../../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import23 from '@angular/core/src/linker/template_ref';
import * as import24 from '@angular/common/src/directives/ng_if';
export class Wrapper_EstimatedTimeComponent {
  /*private*/ _eventHandler:Function;
  context:import0.EstimatedTimeComponent;
  /*private*/ _changed:boolean;
  /*private*/ _changes:{[key: string]:any};
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  subscription0:any;
  subscription1:any;
  constructor() {
    this._changed = false;
    this._changes = {};
    this.context = new import0.EstimatedTimeComponent();
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    (this.subscription0 && this.subscription0.unsubscribe());
    (this.subscription1 && this.subscription1.unsubscribe());
  }
  check_value(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.value = currValue;
      this._changes['value'] = new import1.SimpleChange(this._expr_0,currValue);
      this._expr_0 = currValue;
    }
  }
  check_editMode(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.editMode = currValue;
      this._changes['editMode'] = new import1.SimpleChange(this._expr_1,currValue);
      this._expr_1 = currValue;
    }
  }
  ngDoCheck(view:import2.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this._changed;
    this._changed = false;
    if (!throwOnChange) { if (changed) {
      this.context.ngOnChanges(this._changes);
      this._changes = {};
    } }
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
    if (emit0) { (this.subscription0 = this.context.onDurationUpdate.subscribe(_eventHandler.bind(view,'onDurationUpdate'))); }
    if (emit1) { (this.subscription1 = this.context.onValidate.subscribe(_eventHandler.bind(view,'onValidate'))); }
  }
}
var renderType_EstimatedTimeComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_EstimatedTimeComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.EstimatedTimeComponent>;
  _EstimatedTimeComponent_0_3:Wrapper_EstimatedTimeComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_EstimatedTimeComponent_Host0,renderType_EstimatedTimeComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zui-estimated-time',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_EstimatedTimeComponent0(this.viewUtils,this,0,this._el_0);
    this._EstimatedTimeComponent_0_3 = new Wrapper_EstimatedTimeComponent();
    this.compView_0.create(this._EstimatedTimeComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._EstimatedTimeComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.EstimatedTimeComponent) && (0 === requestNodeIndex))) { return this._EstimatedTimeComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._EstimatedTimeComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._EstimatedTimeComponent_0_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._EstimatedTimeComponent_0_3.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const EstimatedTimeComponentNgFactory:import8.ComponentFactory<import0.EstimatedTimeComponent> = new import8.ComponentFactory<import0.EstimatedTimeComponent>('zui-estimated-time',View_EstimatedTimeComponent_Host0,import0.EstimatedTimeComponent);
const styles_EstimatedTimeComponent:any[] = ([] as any[]);
class View_EstimatedTimeComponent1 extends import2.AppView<any> {
  _el_0:any;
  _el_1:any;
  _text_2:any;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _text_6:any;
  _el_7:any;
  _text_8:any;
  /*private*/ _expr_9:any;
  /*private*/ _expr_10:any;
  /*private*/ _expr_11:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_EstimatedTimeComponent1,renderType_EstimatedTimeComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_9 = import1.UNINITIALIZED;
    this._expr_10 = import1.UNINITIALIZED;
    this._expr_11 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,this._el_0,'span',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_2 = this.renderer.createText(this._el_1,'',(null as any));
    this._text_3 = this.renderer.createText(this._el_0,':',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_0,'span',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'',(null as any));
    this._text_6 = this.renderer.createText(this._el_0,':',(null as any));
    this._el_7 = import3.createRenderElement(this.renderer,this._el_0,'span',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_8 = this.renderer.createText(this._el_7,'',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._el_1,
      this._text_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._text_6,
      this._el_7,
      this._text_8
    ]
    ),(null as any));
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_9:any = import3.inlineInterpolate(1,'',this.parentView.context.dayText,'');
    if (import3.checkBinding(throwOnChange,this._expr_9,currVal_9)) {
      this.renderer.setText(this._text_2,currVal_9);
      this._expr_9 = currVal_9;
    }
    const currVal_10:any = import3.inlineInterpolate(1,'',this.parentView.context.hourText,'');
    if (import3.checkBinding(throwOnChange,this._expr_10,currVal_10)) {
      this.renderer.setText(this._text_5,currVal_10);
      this._expr_10 = currVal_10;
    }
    const currVal_11:any = import3.inlineInterpolate(1,'',this.parentView.context.minuteText,'');
    if (import3.checkBinding(throwOnChange,this._expr_11,currVal_11)) {
      this.renderer.setText(this._text_8,currVal_11);
      this._expr_11 = currVal_11;
    }
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
class View_EstimatedTimeComponent2 extends import2.AppView<any> {
  _el_0:any;
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
  _el_4:any;
  _DefaultValueAccessor_4_3:import10.Wrapper_DefaultValueAccessor;
  _MaxLengthValidator_4_4:import11.Wrapper_MaxLengthValidator;
  _NG_VALIDATORS_4_5:any[];
  _NG_VALUE_ACCESSOR_4_6:any[];
  _NgModel_4_7:import12.Wrapper_NgModel;
  _NgControl_4_8:any;
  _NgControlStatus_4_9:import13.Wrapper_NgControlStatus;
  _text_5:any;
  _el_6:any;
  _DefaultValueAccessor_6_3:import10.Wrapper_DefaultValueAccessor;
  _MaxLengthValidator_6_4:import11.Wrapper_MaxLengthValidator;
  _NG_VALIDATORS_6_5:any[];
  _NG_VALUE_ACCESSOR_6_6:any[];
  _NgModel_6_7:import12.Wrapper_NgModel;
  _NgControl_6_8:any;
  _NgControlStatus_6_9:import13.Wrapper_NgControlStatus;
  _text_7:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import9.ViewContainer) {
    super(View_EstimatedTimeComponent2,renderType_EstimatedTimeComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'div',new import3.InlineArray2(2,'class','estimate-time-edit'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n             ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'input',new import3.InlineArray8(8,'class','form-control','id','dayText','maxlength','2','type','text'),(null as any));
    this._DefaultValueAccessor_2_3 = new import10.Wrapper_DefaultValueAccessor(this.renderer,new import14.ElementRef(this._el_2));
    this._MaxLengthValidator_2_4 = new import11.Wrapper_MaxLengthValidator();
    this._NG_VALIDATORS_2_5 = [this._MaxLengthValidator_2_4.context];
    this._NG_VALUE_ACCESSOR_2_6 = [this._DefaultValueAccessor_2_3.context];
    this._NgModel_2_7 = new import12.Wrapper_NgModel((null as any),this._NG_VALIDATORS_2_5,(null as any),this._NG_VALUE_ACCESSOR_2_6);
    this._NgControl_2_8 = this._NgModel_2_7.context;
    this._NgControlStatus_2_9 = new import13.Wrapper_NgControlStatus(this._NgControl_2_8);
    this._text_3 = this.renderer.createText(this._el_0,'\n            ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_0,'input',new import3.InlineArray8(8,'class','form-control','id','hourText','maxlength','2','type','text'),(null as any));
    this._DefaultValueAccessor_4_3 = new import10.Wrapper_DefaultValueAccessor(this.renderer,new import14.ElementRef(this._el_4));
    this._MaxLengthValidator_4_4 = new import11.Wrapper_MaxLengthValidator();
    this._NG_VALIDATORS_4_5 = [this._MaxLengthValidator_4_4.context];
    this._NG_VALUE_ACCESSOR_4_6 = [this._DefaultValueAccessor_4_3.context];
    this._NgModel_4_7 = new import12.Wrapper_NgModel((null as any),this._NG_VALIDATORS_4_5,(null as any),this._NG_VALUE_ACCESSOR_4_6);
    this._NgControl_4_8 = this._NgModel_4_7.context;
    this._NgControlStatus_4_9 = new import13.Wrapper_NgControlStatus(this._NgControl_4_8);
    this._text_5 = this.renderer.createText(this._el_0,'\n            ',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_0,'input',new import3.InlineArray8(8,'class','form-control','id','minuteText','maxlength','2','type','text'),(null as any));
    this._DefaultValueAccessor_6_3 = new import10.Wrapper_DefaultValueAccessor(this.renderer,new import14.ElementRef(this._el_6));
    this._MaxLengthValidator_6_4 = new import11.Wrapper_MaxLengthValidator();
    this._NG_VALIDATORS_6_5 = [this._MaxLengthValidator_6_4.context];
    this._NG_VALUE_ACCESSOR_6_6 = [this._DefaultValueAccessor_6_3.context];
    this._NgModel_6_7 = new import12.Wrapper_NgModel((null as any),this._NG_VALIDATORS_6_5,(null as any),this._NG_VALUE_ACCESSOR_6_6);
    this._NgControl_6_8 = this._NgModel_6_7.context;
    this._NgControlStatus_6_9 = new import13.Wrapper_NgControlStatus(this._NgControl_6_8);
    this._text_7 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_2,new import3.InlineArray16(10,'ngModelChange',(null as any),'keypress',(null as any),'blur',(null as any),'change',(null as any),'input',(null as any)),this.eventHandler(this.handleEvent_2));
    this._NgModel_2_7.subscribe(this,this.eventHandler(this.handleEvent_2),true);
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_4,new import3.InlineArray16(10,'ngModelChange',(null as any),'keypress',(null as any),'blur',(null as any),'change',(null as any),'input',(null as any)),this.eventHandler(this.handleEvent_4));
    this._NgModel_4_7.subscribe(this,this.eventHandler(this.handleEvent_4),true);
    var disposable_2:Function = import3.subscribeToRenderElement(this,this._el_6,new import3.InlineArray16(10,'ngModelChange',(null as any),'keypress',(null as any),'blur',(null as any),'change',(null as any),'input',(null as any)),this.eventHandler(this.handleEvent_6));
    this._NgModel_6_7.subscribe(this,this.eventHandler(this.handleEvent_6),true);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._el_6,
      this._text_7
    ]
    ),[
      disposable_0,
      disposable_1,
      disposable_2
    ]
    );
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
    if (((token === import15.DefaultValueAccessor) && (4 === requestNodeIndex))) { return this._DefaultValueAccessor_4_3.context; }
    if (((token === import16.MaxLengthValidator) && (4 === requestNodeIndex))) { return this._MaxLengthValidator_4_4.context; }
    if (((token === import17.NG_VALIDATORS) && (4 === requestNodeIndex))) { return this._NG_VALIDATORS_4_5; }
    if (((token === import18.NG_VALUE_ACCESSOR) && (4 === requestNodeIndex))) { return this._NG_VALUE_ACCESSOR_4_6; }
    if (((token === import19.NgModel) && (4 === requestNodeIndex))) { return this._NgModel_4_7.context; }
    if (((token === import20.NgControl) && (4 === requestNodeIndex))) { return this._NgControl_4_8; }
    if (((token === import21.NgControlStatus) && (4 === requestNodeIndex))) { return this._NgControlStatus_4_9.context; }
    if (((token === import15.DefaultValueAccessor) && (6 === requestNodeIndex))) { return this._DefaultValueAccessor_6_3.context; }
    if (((token === import16.MaxLengthValidator) && (6 === requestNodeIndex))) { return this._MaxLengthValidator_6_4.context; }
    if (((token === import17.NG_VALIDATORS) && (6 === requestNodeIndex))) { return this._NG_VALIDATORS_6_5; }
    if (((token === import18.NG_VALUE_ACCESSOR) && (6 === requestNodeIndex))) { return this._NG_VALUE_ACCESSOR_6_6; }
    if (((token === import19.NgModel) && (6 === requestNodeIndex))) { return this._NgModel_6_7.context; }
    if (((token === import20.NgControl) && (6 === requestNodeIndex))) { return this._NgControl_6_8; }
    if (((token === import21.NgControlStatus) && (6 === requestNodeIndex))) { return this._NgControlStatus_6_9.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._DefaultValueAccessor_2_3.ngDoCheck(this,this._el_2,throwOnChange);
    const currVal_2_1_0:any = '2';
    this._MaxLengthValidator_2_4.check_maxlength(currVal_2_1_0,throwOnChange,false);
    this._MaxLengthValidator_2_4.ngDoCheck(this,this._el_2,throwOnChange);
    const currVal_2_2_0:any = this.parentView.context.dayText;
    this._NgModel_2_7.check_model(currVal_2_2_0,throwOnChange,false);
    this._NgModel_2_7.ngDoCheck(this,this._el_2,throwOnChange);
    this._NgControlStatus_2_9.ngDoCheck(this,this._el_2,throwOnChange);
    this._DefaultValueAccessor_4_3.ngDoCheck(this,this._el_4,throwOnChange);
    const currVal_4_1_0:any = '2';
    this._MaxLengthValidator_4_4.check_maxlength(currVal_4_1_0,throwOnChange,false);
    this._MaxLengthValidator_4_4.ngDoCheck(this,this._el_4,throwOnChange);
    const currVal_4_2_0:any = this.parentView.context.hourText;
    this._NgModel_4_7.check_model(currVal_4_2_0,throwOnChange,false);
    this._NgModel_4_7.ngDoCheck(this,this._el_4,throwOnChange);
    this._NgControlStatus_4_9.ngDoCheck(this,this._el_4,throwOnChange);
    this._DefaultValueAccessor_6_3.ngDoCheck(this,this._el_6,throwOnChange);
    const currVal_6_1_0:any = '2';
    this._MaxLengthValidator_6_4.check_maxlength(currVal_6_1_0,throwOnChange,false);
    this._MaxLengthValidator_6_4.ngDoCheck(this,this._el_6,throwOnChange);
    const currVal_6_2_0:any = this.parentView.context.minuteText;
    this._NgModel_6_7.check_model(currVal_6_2_0,throwOnChange,false);
    this._NgModel_6_7.ngDoCheck(this,this._el_6,throwOnChange);
    this._NgControlStatus_6_9.ngDoCheck(this,this._el_6,throwOnChange);
    this._MaxLengthValidator_2_4.checkHost(this,this,this._el_2,throwOnChange);
    this._NgControlStatus_2_9.checkHost(this,this,this._el_2,throwOnChange);
    this._MaxLengthValidator_4_4.checkHost(this,this,this._el_4,throwOnChange);
    this._NgControlStatus_4_9.checkHost(this,this,this._el_4,throwOnChange);
    this._MaxLengthValidator_6_4.checkHost(this,this,this._el_6,throwOnChange);
    this._NgControlStatus_6_9.checkHost(this,this,this._el_6,throwOnChange);
  }
  destroyInternal():void {
    this._NgModel_2_7.ngOnDestroy();
    this._NgModel_4_7.ngOnDestroy();
    this._NgModel_6_7.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  handleEvent_2(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._DefaultValueAccessor_2_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'ngModelChange')) {
      const pd_sub_0:any = ((<any>(this.parentView.context.dayText = $event)) !== false);
      result = (pd_sub_0 && result);
    }
    if ((eventName == 'keypress')) {
      const pd_sub_1:any = ((<any>this.parentView.context.isNumberValid($event)) !== false);
      result = (pd_sub_1 && result);
    }
    if ((eventName == 'blur')) {
      const pd_sub_2:any = ((<any>this.parentView.context.onDayFocusout($event)) !== false);
      result = (pd_sub_2 && result);
    }
    if ((eventName == 'change')) {
      const pd_sub_3:any = ((<any>this.parentView.context.validateDay($event)) !== false);
      result = (pd_sub_3 && result);
    }
    return result;
  }
  handleEvent_4(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._DefaultValueAccessor_4_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'ngModelChange')) {
      const pd_sub_0:any = ((<any>(this.parentView.context.hourText = $event)) !== false);
      result = (pd_sub_0 && result);
    }
    if ((eventName == 'keypress')) {
      const pd_sub_1:any = ((<any>this.parentView.context.isNumberValid($event)) !== false);
      result = (pd_sub_1 && result);
    }
    if ((eventName == 'blur')) {
      const pd_sub_2:any = ((<any>this.parentView.context.onHourFocusout($event)) !== false);
      result = (pd_sub_2 && result);
    }
    if ((eventName == 'change')) {
      const pd_sub_3:any = ((<any>this.parentView.context.validateHour($event)) !== false);
      result = (pd_sub_3 && result);
    }
    return result;
  }
  handleEvent_6(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._DefaultValueAccessor_6_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'ngModelChange')) {
      const pd_sub_0:any = ((<any>(this.parentView.context.minuteText = $event)) !== false);
      result = (pd_sub_0 && result);
    }
    if ((eventName == 'keypress')) {
      const pd_sub_1:any = ((<any>this.parentView.context.isNumberValid($event)) !== false);
      result = (pd_sub_1 && result);
    }
    if ((eventName == 'blur')) {
      const pd_sub_2:any = ((<any>this.parentView.context.onMinuteFocusout($event)) !== false);
      result = (pd_sub_2 && result);
    }
    if ((eventName == 'change')) {
      const pd_sub_3:any = ((<any>this.parentView.context.validateMinute($event)) !== false);
      result = (pd_sub_3 && result);
    }
    return result;
  }
}
var renderType_EstimatedTimeComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_EstimatedTimeComponent,{});
export class View_EstimatedTimeComponent0 extends import2.AppView<import0.EstimatedTimeComponent> {
  _text_0:any;
  _anchor_1:any;
  /*private*/ _vc_1:import9.ViewContainer;
  _TemplateRef_1_5:any;
  _NgIf_1_6:import22.Wrapper_NgIf;
  _text_2:any;
  _anchor_3:any;
  /*private*/ _vc_3:import9.ViewContainer;
  _TemplateRef_3_5:any;
  _NgIf_3_6:import22.Wrapper_NgIf;
  _text_4:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_EstimatedTimeComponent0,renderType_EstimatedTimeComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n        ',(null as any));
    this._anchor_1 = this.renderer.createTemplateAnchor(parentRenderNode,(null as any));
    this._vc_1 = new import9.ViewContainer(1,(null as any),this,this._anchor_1);
    this._TemplateRef_1_5 = new import23.TemplateRef_(this,1,this._anchor_1);
    this._NgIf_1_6 = new import22.Wrapper_NgIf(this._vc_1.vcRef,this._TemplateRef_1_5);
    this._text_2 = this.renderer.createText(parentRenderNode,'\n        ',(null as any));
    this._anchor_3 = this.renderer.createTemplateAnchor(parentRenderNode,(null as any));
    this._vc_3 = new import9.ViewContainer(3,(null as any),this,this._anchor_3);
    this._TemplateRef_3_5 = new import23.TemplateRef_(this,3,this._anchor_3);
    this._NgIf_3_6 = new import22.Wrapper_NgIf(this._vc_3.vcRef,this._TemplateRef_3_5);
    this._text_4 = this.renderer.createText(parentRenderNode,'\n    ',(null as any));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._anchor_1,
      this._text_2,
      this._anchor_3,
      this._text_4
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import23.TemplateRef) && (1 === requestNodeIndex))) { return this._TemplateRef_1_5; }
    if (((token === import24.NgIf) && (1 === requestNodeIndex))) { return this._NgIf_1_6.context; }
    if (((token === import23.TemplateRef) && (3 === requestNodeIndex))) { return this._TemplateRef_3_5; }
    if (((token === import24.NgIf) && (3 === requestNodeIndex))) { return this._NgIf_3_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_1_0_0:boolean = !this.context.editMode;
    this._NgIf_1_6.check_ngIf(currVal_1_0_0,throwOnChange,false);
    this._NgIf_1_6.ngDoCheck(this,this._anchor_1,throwOnChange);
    const currVal_3_0_0:any = this.context.editMode;
    this._NgIf_3_6.check_ngIf(currVal_3_0_0,throwOnChange,false);
    this._NgIf_3_6.ngDoCheck(this,this._anchor_3,throwOnChange);
    this._vc_1.detectChangesInNestedViews(throwOnChange);
    this._vc_3.detectChangesInNestedViews(throwOnChange);
  }
  destroyInternal():void {
    this._vc_1.destroyNestedViews();
    this._vc_3.destroyNestedViews();
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 1)) { return new View_EstimatedTimeComponent1(this.viewUtils,this,1,this._anchor_1,this._vc_1); }
    if ((nodeIndex == 3)) { return new View_EstimatedTimeComponent2(this.viewUtils,this,3,this._anchor_3,this._vc_3); }
    return (null as any);
  }
}