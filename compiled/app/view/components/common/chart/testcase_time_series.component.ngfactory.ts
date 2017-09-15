/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../app/view/components/common/chart/testcase_time_series.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '../../../../../../app/actions/chart.action';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '@angular/http/src/http';
import * as import10 from '@angular/core/src/change_detection/change_detection_util';
import * as import11 from '@angular/core/src/security';
export class Wrapper_TestcaseTimeSeriesChartComponent {
  /*private*/ _eventHandler:Function;
  context:import0.TestcaseTimeSeriesChartComponent;
  /*private*/ _changed:boolean;
  constructor(p0:any) {
    this._changed = false;
    this.context = new import0.TestcaseTimeSeriesChartComponent(p0);
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
var renderType_TestcaseTimeSeriesChartComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_TestcaseTimeSeriesChartComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.TestcaseTimeSeriesChartComponent>;
  _ChartAction_0_3:import5.ChartAction;
  _TestcaseTimeSeriesChartComponent_0_4:Wrapper_TestcaseTimeSeriesChartComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_TestcaseTimeSeriesChartComponent_Host0,renderType_TestcaseTimeSeriesChartComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zee-testcase-time-series',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_TestcaseTimeSeriesChartComponent0(this.viewUtils,this,0,this._el_0);
    this._ChartAction_0_3 = new import5.ChartAction(this.injectorGet(import9.Http,this.parentIndex));
    this._TestcaseTimeSeriesChartComponent_0_4 = new Wrapper_TestcaseTimeSeriesChartComponent(this._ChartAction_0_3);
    this.compView_0.create(this._TestcaseTimeSeriesChartComponent_0_4.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._TestcaseTimeSeriesChartComponent_0_4.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import5.ChartAction) && (0 === requestNodeIndex))) { return this._ChartAction_0_3; }
    if (((token === import0.TestcaseTimeSeriesChartComponent) && (0 === requestNodeIndex))) { return this._TestcaseTimeSeriesChartComponent_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._TestcaseTimeSeriesChartComponent_0_4.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._TestcaseTimeSeriesChartComponent_0_4.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const TestcaseTimeSeriesChartComponentNgFactory:import8.ComponentFactory<import0.TestcaseTimeSeriesChartComponent> = new import8.ComponentFactory<import0.TestcaseTimeSeriesChartComponent>('zee-testcase-time-series',View_TestcaseTimeSeriesChartComponent_Host0,import0.TestcaseTimeSeriesChartComponent);
const styles_TestcaseTimeSeriesChartComponent:any[] = ([] as any[]);
var renderType_TestcaseTimeSeriesChartComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_TestcaseTimeSeriesChartComponent,{});
export class View_TestcaseTimeSeriesChartComponent0 extends import1.AppView<import0.TestcaseTimeSeriesChartComponent> {
  _text_0:any;
  _el_1:any;
  _text_2:any;
  _el_3:any;
  _text_4:any;
  _text_5:any;
  _text_6:any;
  _el_7:any;
  _text_8:any;
  _el_9:any;
  _text_10:any;
  _text_11:any;
  _text_12:any;
  /*private*/ _expr_13:any;
  /*private*/ _expr_14:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_TestcaseTimeSeriesChartComponent0,renderType_TestcaseTimeSeriesChartComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
    this._expr_13 = import10.UNINITIALIZED;
    this._expr_14 = import10.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n        ',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,'div',new import3.InlineArray2(2,'class','zee-module-header'),(null as any));
    this._text_2 = this.renderer.createText(this._el_1,'\n            ',(null as any));
    this._el_3 = import3.createRenderElement(this.renderer,this._el_1,'span',new import3.InlineArray2(2,'class','zee-module-header-left'),(null as any));
    this._text_4 = this.renderer.createText(this._el_3,'\n            Top 20 Testcase’s having most Defects from Last 5 Releases',(null as any));
    this._text_5 = this.renderer.createText(this._el_1,'\n        ',(null as any));
    this._text_6 = this.renderer.createText(parentRenderNode,'\n        ',(null as any));
    this._el_7 = import3.createRenderElement(this.renderer,parentRenderNode,'div',new import3.InlineArray2(2,'id','zee-time-series-graph'),(null as any));
    this._text_8 = this.renderer.createText(this._el_7,'\n            ',(null as any));
    this._el_9 = import3.createRenderElement(this.renderer,this._el_7,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_10 = this.renderer.createText(this._el_9,'\n                Our machine learning tells us that you have to execute\n                 Cloning, Login and Provision phases as they have more number of defects.',(null as any));
    this._text_11 = this.renderer.createText(this._el_7,'\n        ',(null as any));
    this._text_12 = this.renderer.createText(parentRenderNode,'\n    ',(null as any));
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
      this._text_11,
      this._text_12
    ]
    ),(null as any));
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_13:any = '0px';
    if (import3.checkBinding(throwOnChange,this._expr_13,currVal_13)) {
      this.renderer.setElementStyle(this._el_3,'margin-left',((this.viewUtils.sanitizer.sanitize(import11.SecurityContext.STYLE,currVal_13) == null)? (null as any): this.viewUtils.sanitizer.sanitize(import11.SecurityContext.STYLE,currVal_13).toString()));
      this._expr_13 = currVal_13;
    }
    const currVal_14:any = 'zee-time-series-highlight-message';
    if (import3.checkBinding(throwOnChange,this._expr_14,currVal_14)) {
      this.renderer.setElementProperty(this._el_9,'className',currVal_14);
      this._expr_14 = currVal_14;
    }
  }
}