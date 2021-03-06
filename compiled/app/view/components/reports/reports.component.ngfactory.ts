/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../app/view/components/reports/reports.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '@angular/router/src/router_state';
import * as import9 from '@angular/router/src/router';
import * as import10 from '../../../../../app/view/components/common/leftnav/project/project_leftnav.component';
import * as import11 from '../../../../../app/actions/leftnav.action';
import * as import12 from '../common/leftnav/project/project_leftnav.component.ngfactory';
import * as import13 from '@angular/core/src/linker/view_container';
import * as import14 from '../../../../node_modules/@angular/router/src/directives/router_outlet.ngfactory';
import * as import15 from '../../../../../app/actions/user.action';
import * as import16 from '@angular/router/src/router_outlet_map';
import * as import17 from '@angular/core/src/linker/component_factory_resolver';
import * as import18 from '@angular/router/src/directives/router_outlet';
export class Wrapper_ReportsComponent {
  /*private*/ _eventHandler:Function;
  context:import0.ReportsComponent;
  /*private*/ _changed:boolean;
  constructor(p0:any,p1:any) {
    this._changed = false;
    this.context = new import0.ReportsComponent(p0,p1);
  }
  ngOnDetach(view:import1.AppView<any>,componentView:import1.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
  }
  ngDoCheck(view:import1.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this._changed;
    this._changed = false;
    if (!throwOnChange) { if ((view.numberOfChecks === 0)) { this.context.ngOnInit(); } }
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
var renderType_ReportsComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_ReportsComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.ReportsComponent>;
  _ReportsComponent_0_3:Wrapper_ReportsComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ReportsComponent_Host0,renderType_ReportsComponent_Host,import5.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'reports',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_ReportsComponent0(this.viewUtils,this,0,this._el_0);
    this._ReportsComponent_0_3 = new Wrapper_ReportsComponent(this.injectorGet(import8.ActivatedRoute,this.parentIndex),this.injectorGet(import9.Router,this.parentIndex));
    this.compView_0.create(this._ReportsComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import7.ComponentRef_<any>(0,this,this._el_0,this._ReportsComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.ReportsComponent) && (0 === requestNodeIndex))) { return this._ReportsComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._ReportsComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const ReportsComponentNgFactory:import7.ComponentFactory<import0.ReportsComponent> = new import7.ComponentFactory<import0.ReportsComponent>('reports',View_ReportsComponent_Host0,import0.ReportsComponent);
const styles_ReportsComponent:any[] = ([] as any[]);
var renderType_ReportsComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_ReportsComponent,{});
export class View_ReportsComponent0 extends import1.AppView<import0.ReportsComponent> {
  _el_0:any;
  compView_0:import1.AppView<import10.ProjectLeftNavComponent>;
  _LeftnavAction_0_3:import11.LeftnavAction;
  _ProjectLeftNavComponent_0_4:import12.Wrapper_ProjectLeftNavComponent;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _el_8:any;
  _text_9:any;
  _el_10:any;
  _text_11:any;
  _text_12:any;
  _text_13:any;
  _text_14:any;
  _text_15:any;
  _el_16:any;
  _text_17:any;
  _el_18:any;
  /*private*/ _vc_18:import13.ViewContainer;
  _RouterOutlet_18_5:import14.Wrapper_RouterOutlet;
  _text_19:any;
  _text_20:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ReportsComponent0,renderType_ReportsComponent,import5.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'zui-project-left-nav',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_0 = new import12.View_ProjectLeftNavComponent0(this.viewUtils,this,0,this._el_0);
    this._LeftnavAction_0_3 = new import11.LeftnavAction();
    this._ProjectLeftNavComponent_0_4 = new import12.Wrapper_ProjectLeftNavComponent(this.parentView.injectorGet(import8.ActivatedRoute,this.parentIndex),this.parentView.injectorGet(import15.UserAction,this.parentIndex),this.parentView.injectorGet(import9.Router,this.parentIndex),this._LeftnavAction_0_3,this.compView_0.ref);
    this.compView_0.create(this._ProjectLeftNavComponent_0_4.context);
    this._text_1 = this.renderer.createText(parentRenderNode,'\n\n',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,parentRenderNode,'section',new import3.InlineArray4(4,'class','reports-content','role','main'),(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n\n  ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'div',new import3.InlineArray2(2,'class','module-subheader clearfix'),(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'\n    ',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_4,'div',new import3.InlineArray2(2,'class','left-navs'),(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'\n      ',(null as any));
    this._el_8 = import3.createRenderElement(this.renderer,this._el_6,'h3',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_9 = this.renderer.createText(this._el_8,'\n        ',(null as any));
    this._el_10 = import3.createRenderElement(this.renderer,this._el_8,'b',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_11 = this.renderer.createText(this._el_10,'Reports',(null as any));
    this._text_12 = this.renderer.createText(this._el_8,'\n      ',(null as any));
    this._text_13 = this.renderer.createText(this._el_6,'\n    ',(null as any));
    this._text_14 = this.renderer.createText(this._el_4,'\n  ',(null as any));
    this._text_15 = this.renderer.createText(this._el_2,'\n\n  ',(null as any));
    this._el_16 = import3.createRenderElement(this.renderer,this._el_2,'div',new import3.InlineArray2(2,'class','clearfix'),(null as any));
    this._text_17 = this.renderer.createText(this._el_2,'\n  ',(null as any));
    this._el_18 = import3.createRenderElement(this.renderer,this._el_2,'router-outlet',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._vc_18 = new import13.ViewContainer(18,2,this,this._el_18);
    this._RouterOutlet_18_5 = new import14.Wrapper_RouterOutlet(this.parentView.injectorGet(import16.RouterOutletMap,this.parentIndex),this._vc_18.vcRef,this.parentView.injectorGet(import17.ComponentFactoryResolver,this.parentIndex),(null as any));
    this._text_19 = this.renderer.createText(this._el_2,'\n\n\n',(null as any));
    this._text_20 = this.renderer.createText(parentRenderNode,'\n',(null as any));
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
      this._el_10,
      this._text_11,
      this._text_12,
      this._text_13,
      this._text_14,
      this._text_15,
      this._el_16,
      this._text_17,
      this._el_18,
      this._text_19,
      this._text_20
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import11.LeftnavAction) && (0 === requestNodeIndex))) { return this._LeftnavAction_0_3; }
    if (((token === import10.ProjectLeftNavComponent) && (0 === requestNodeIndex))) { return this._ProjectLeftNavComponent_0_4.context; }
    if (((token === import18.RouterOutlet) && (18 === requestNodeIndex))) { return this._RouterOutlet_18_5.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = 'reports';
    this._ProjectLeftNavComponent_0_4.check_activeItemKey(currVal_0_0_0,throwOnChange,false);
    if (this._ProjectLeftNavComponent_0_4.ngDoCheck(this,this._el_0,throwOnChange)) { this.compView_0.markAsCheckOnce(); }
    this._RouterOutlet_18_5.ngDoCheck(this,this._el_18,throwOnChange);
    this._vc_18.detectChangesInNestedViews(throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._ProjectLeftNavComponent_0_4.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this._vc_18.destroyNestedViews();
    this.compView_0.destroy();
    this._ProjectLeftNavComponent_0_4.ngOnDestroy();
    this._RouterOutlet_18_5.ngOnDestroy();
  }
}