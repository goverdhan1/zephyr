/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../app/view/components/testcase/operations/testcase_import.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '../../../../../../app/view/components/common/import/import.component';
import * as import10 from '../../../../../../app/actions/import.action';
import * as import11 from '../../common/import/import.component.ngfactory';
import * as import12 from '@angular/http/src/http';
import * as import13 from '@angular/forms/src/form_builder';
import * as import14 from '@angular/router/src/router_state';
import * as import15 from '@angular/core/src/zone/ng_zone';
export class Wrapper_TestcaseImportComponent {
  /*private*/ _eventHandler:Function;
  context:import0.TestcaseImportComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  constructor() {
    this._changed = false;
    this.context = new import0.TestcaseImportComponent();
    this._expr_0 = import1.UNINITIALIZED;
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
var renderType_TestcaseImportComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_TestcaseImportComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.TestcaseImportComponent>;
  _TestcaseImportComponent_0_3:Wrapper_TestcaseImportComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_TestcaseImportComponent_Host0,renderType_TestcaseImportComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zee-import-dialog',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_TestcaseImportComponent0(this.viewUtils,this,0,this._el_0);
    this._TestcaseImportComponent_0_3 = new Wrapper_TestcaseImportComponent();
    this.compView_0.create(this._TestcaseImportComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._TestcaseImportComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.TestcaseImportComponent) && (0 === requestNodeIndex))) { return this._TestcaseImportComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._TestcaseImportComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const TestcaseImportComponentNgFactory:import8.ComponentFactory<import0.TestcaseImportComponent> = new import8.ComponentFactory<import0.TestcaseImportComponent>('zee-import-dialog',View_TestcaseImportComponent_Host0,import0.TestcaseImportComponent);
const styles_TestcaseImportComponent:any[] = ([] as any[]);
var renderType_TestcaseImportComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_TestcaseImportComponent,{});
export class View_TestcaseImportComponent0 extends import2.AppView<import0.TestcaseImportComponent> {
  _text_0:any;
  _el_1:any;
  compView_1:import2.AppView<import9.ImportComponent>;
  _ImportAction_1_3:import10.ImportAction;
  _ImportComponent_1_4:import11.Wrapper_ImportComponent;
  _text_2:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_TestcaseImportComponent0,renderType_TestcaseImportComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n        ',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,'zui-import',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_1 = new import11.View_ImportComponent0(this.viewUtils,this,1,this._el_1);
    this._ImportAction_1_3 = new import10.ImportAction(this.parentView.injectorGet(import12.Http,this.parentIndex));
    this._ImportComponent_1_4 = new import11.Wrapper_ImportComponent(this.parentView.injectorGet(import13.FormBuilder,this.parentIndex),this._ImportAction_1_3,this.parentView.injectorGet(import14.ActivatedRoute,this.parentIndex),this.parentView.injectorGet(import15.NgZone,this.parentIndex),this.compView_1.ref);
    this.compView_1.create(this._ImportComponent_1_4.context);
    this._text_2 = this.renderer.createText(parentRenderNode,'\n    ',(null as any));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._el_1,
      this._text_2
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import10.ImportAction) && (1 === requestNodeIndex))) { return this._ImportAction_1_3; }
    if (((token === import9.ImportComponent) && (1 === requestNodeIndex))) { return this._ImportComponent_1_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_1_0_0:any = this.context.fieldOptions;
    this._ImportComponent_1_4.check_fieldOptions(currVal_1_0_0,throwOnChange,false);
    this._ImportComponent_1_4.ngDoCheck(this,this._el_1,throwOnChange);
    this.compView_1.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._ImportComponent_1_4.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_1.destroy();
    this._ImportComponent_1_4.ngOnDestroy();
  }
}