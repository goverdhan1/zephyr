/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../app/view/components/testcase/operations/testcase_map.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '../../../../../../app/actions/tcr.action';
import * as import10 from '../../../../../../app/actions/testcase.action';
import * as import11 from '../../../../../../app/view/components/mapTestReq/map_test_req.component';
import * as import12 from '../../../../../../app/actions/mapTestReq.action';
import * as import13 from '../../mapTestReq/map_test_req.component.ngfactory';
import * as import14 from '@angular/http/src/http';
export class Wrapper_TestcaseMapComponent {
  /*private*/ _eventHandler:Function;
  context:import0.TestcaseMapComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  constructor(p0:any,p1:any) {
    this._changed = false;
    this.context = new import0.TestcaseMapComponent(p0,p1);
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
    this._expr_2 = import1.UNINITIALIZED;
    this._expr_3 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    this.context.ngOnDestroy();
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
  check_releaseId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_2,currValue))) {
      this._changed = true;
      this.context.releaseId = currValue;
      this._expr_2 = currValue;
    }
  }
  check_testcaseIds(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_3,currValue))) {
      this._changed = true;
      this.context.testcaseIds = currValue;
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
var renderType_TestcaseMapComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_TestcaseMapComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.TestcaseMapComponent>;
  _TestcaseMapComponent_0_3:Wrapper_TestcaseMapComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_TestcaseMapComponent_Host0,renderType_TestcaseMapComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zee-map-dialog',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_TestcaseMapComponent0(this.viewUtils,this,0,this._el_0);
    this._TestcaseMapComponent_0_3 = new Wrapper_TestcaseMapComponent(this.injectorGet(import9.TCRAction,this.parentIndex),this.injectorGet(import10.TestcaseAction,this.parentIndex));
    this.compView_0.create(this._TestcaseMapComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._TestcaseMapComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.TestcaseMapComponent) && (0 === requestNodeIndex))) { return this._TestcaseMapComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._TestcaseMapComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._TestcaseMapComponent_0_3.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const TestcaseMapComponentNgFactory:import8.ComponentFactory<import0.TestcaseMapComponent> = new import8.ComponentFactory<import0.TestcaseMapComponent>('zee-map-dialog',View_TestcaseMapComponent_Host0,import0.TestcaseMapComponent);
const styles_TestcaseMapComponent:any[] = ([] as any[]);
var renderType_TestcaseMapComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_TestcaseMapComponent,{});
export class View_TestcaseMapComponent0 extends import2.AppView<import0.TestcaseMapComponent> {
  _el_0:any;
  compView_0:import2.AppView<import11.MapTestReqComponent>;
  _MapTestReqAction_0_3:import12.MapTestReqAction;
  _TestcaseAction_0_4:import10.TestcaseAction;
  _MapTestReqComponent_0_5:import13.Wrapper_MapTestReqComponent;
  _text_1:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_TestcaseMapComponent0,renderType_TestcaseMapComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'map-req-test',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_0 = new import13.View_MapTestReqComponent0(this.viewUtils,this,0,this._el_0);
    this._MapTestReqAction_0_3 = new import12.MapTestReqAction(this.parentView.injectorGet(import14.Http,this.parentIndex));
    this._TestcaseAction_0_4 = new import10.TestcaseAction(this.parentView.injectorGet(import14.Http,this.parentIndex));
    this._MapTestReqComponent_0_5 = new import13.Wrapper_MapTestReqComponent(this._MapTestReqAction_0_3,this._TestcaseAction_0_4,this.compView_0.ref);
    this.compView_0.create(this._MapTestReqComponent_0_5.context);
    this._text_1 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_0,new import3.InlineArray2(2,'onSaveMap',(null as any)),this.eventHandler(this.handleEvent_0));
    this._MapTestReqComponent_0_5.subscribe(this,this.eventHandler(this.handleEvent_0),true);
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1
    ]
    ),[disposable_0]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import12.MapTestReqAction) && (0 === requestNodeIndex))) { return this._MapTestReqAction_0_3; }
    if (((token === import10.TestcaseAction) && (0 === requestNodeIndex))) { return this._TestcaseAction_0_4; }
    if (((token === import11.MapTestReqComponent) && (0 === requestNodeIndex))) { return this._MapTestReqComponent_0_5.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = '-bulk';
    this._MapTestReqComponent_0_5.check_buttonId(currVal_0_0_0,throwOnChange,false);
    const currVal_0_0_1:any = this.context.isEditabe();
    this._MapTestReqComponent_0_5.check_editable(currVal_0_0_1,throwOnChange,false);
    const currVal_0_0_2:any = 'Map Req';
    this._MapTestReqComponent_0_5.check_buttonText(currVal_0_0_2,throwOnChange,false);
    const currVal_0_0_3:any = 'Map Requirements To Testcases';
    this._MapTestReqComponent_0_5.check_title(currVal_0_0_3,throwOnChange,false);
    const currVal_0_0_4:any = 'req';
    this._MapTestReqComponent_0_5.check_type(currVal_0_0_4,throwOnChange,false);
    const currVal_0_0_5:any = this.context.testcaseIds;
    this._MapTestReqComponent_0_5.check_gridId(currVal_0_0_5,throwOnChange,false);
    const currVal_0_0_6:any = true;
    this._MapTestReqComponent_0_5.check_isBulk(currVal_0_0_6,throwOnChange,false);
    if (this._MapTestReqComponent_0_5.ngDoCheck(this,this._el_0,throwOnChange)) { this.compView_0.markAsCheckOnce(); }
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { this._MapTestReqComponent_0_5.context.ngAfterViewChecked(); }
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._MapTestReqComponent_0_5.ngOnDestroy();
  }
  handleEvent_0(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'onSaveMap')) {
      const pd_sub_0:any = ((<any>this.context.saveMap($event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}