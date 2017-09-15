/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../app/view/components/projects/projects.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '../../../../../app/actions/release.action';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '@angular/http/src/http';
import * as import10 from '../../../../../app/services/zephyr.event.service';
import * as import11 from '@angular/router/src/router';
import * as import12 from '../../../../../app/view/components/common/leftnav/project/project_leftnav.component';
import * as import13 from '../../../../../app/actions/leftnav.action';
import * as import14 from '../common/leftnav/project/project_leftnav.component.ngfactory';
import * as import15 from '@angular/core/src/linker/view_container';
import * as import16 from '../../../../node_modules/@angular/router/src/directives/router_outlet.ngfactory';
import * as import17 from '@angular/router/src/router_state';
import * as import18 from '../../../../../app/actions/user.action';
import * as import19 from '@angular/router/src/router_outlet_map';
import * as import20 from '@angular/core/src/linker/component_factory_resolver';
import * as import21 from '@angular/router/src/directives/router_outlet';
export class Wrapper_ProjectsComponent {
  /*private*/ _eventHandler:Function;
  context:import0.ProjectsComponent;
  /*private*/ _changed:boolean;
  constructor(p0:any,p1:any,p2:any) {
    this._changed = false;
    this.context = new import0.ProjectsComponent(p0,p1,p2);
  }
  ngOnDetach(view:import1.AppView<any>,componentView:import1.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    this.context.ngOnDestroy();
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
var renderType_ProjectsComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_ProjectsComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.ProjectsComponent>;
  _ReleaseAction_0_3:import5.ReleaseAction;
  _ProjectsComponent_0_4:Wrapper_ProjectsComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ProjectsComponent_Host0,renderType_ProjectsComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'zee-projects',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_ProjectsComponent0(this.viewUtils,this,0,this._el_0);
    this._ReleaseAction_0_3 = new import5.ReleaseAction(this.injectorGet(import9.Http,this.parentIndex));
    this._ProjectsComponent_0_4 = new Wrapper_ProjectsComponent(this.injectorGet(import10.ZephyrEventService,this.parentIndex),this.injectorGet(import11.Router,this.parentIndex),this._ReleaseAction_0_3);
    this.compView_0.create(this._ProjectsComponent_0_4.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._ProjectsComponent_0_4.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import5.ReleaseAction) && (0 === requestNodeIndex))) { return this._ReleaseAction_0_3; }
    if (((token === import0.ProjectsComponent) && (0 === requestNodeIndex))) { return this._ProjectsComponent_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._ProjectsComponent_0_4.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._ProjectsComponent_0_4.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const ProjectsComponentNgFactory:import8.ComponentFactory<import0.ProjectsComponent> = new import8.ComponentFactory<import0.ProjectsComponent>('zee-projects',View_ProjectsComponent_Host0,import0.ProjectsComponent);
const styles_ProjectsComponent:any[] = ([] as any[]);
var renderType_ProjectsComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_ProjectsComponent,{});
export class View_ProjectsComponent0 extends import1.AppView<import0.ProjectsComponent> {
  _text_0:any;
  _text_1:any;
  _el_2:any;
  compView_2:import1.AppView<import12.ProjectLeftNavComponent>;
  _LeftnavAction_2_3:import13.LeftnavAction;
  _ProjectLeftNavComponent_2_4:import14.Wrapper_ProjectLeftNavComponent;
  _text_3:any;
  _el_4:any;
  /*private*/ _vc_4:import15.ViewContainer;
  _RouterOutlet_4_5:import16.Wrapper_RouterOutlet;
  _text_5:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ProjectsComponent0,renderType_ProjectsComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._text_1 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,parentRenderNode,'zui-project-left-nav',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_2 = new import14.View_ProjectLeftNavComponent0(this.viewUtils,this,2,this._el_2);
    this._LeftnavAction_2_3 = new import13.LeftnavAction();
    this._ProjectLeftNavComponent_2_4 = new import14.Wrapper_ProjectLeftNavComponent(this.parentView.injectorGet(import17.ActivatedRoute,this.parentIndex),this.parentView.injectorGet(import18.UserAction,this.parentIndex),this.parentView.injectorGet(import11.Router,this.parentIndex),this._LeftnavAction_2_3,this.compView_2.ref);
    this.compView_2.create(this._ProjectLeftNavComponent_2_4.context);
    this._text_3 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,parentRenderNode,'router-outlet',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._vc_4 = new import15.ViewContainer(4,(null as any),this,this._el_4);
    this._RouterOutlet_4_5 = new import16.Wrapper_RouterOutlet(this.parentView.injectorGet(import19.RouterOutletMap,this.parentIndex),this._vc_4.vcRef,this.parentView.injectorGet(import20.ComponentFactoryResolver,this.parentIndex),(null as any));
    this._text_5 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._el_4,
      this._text_5
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import13.LeftnavAction) && (2 === requestNodeIndex))) { return this._LeftnavAction_2_3; }
    if (((token === import12.ProjectLeftNavComponent) && (2 === requestNodeIndex))) { return this._ProjectLeftNavComponent_2_4.context; }
    if (((token === import21.RouterOutlet) && (4 === requestNodeIndex))) { return this._RouterOutlet_4_5.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_2_0_0:any = true;
    this._ProjectLeftNavComponent_2_4.check_hideSubHeader(currVal_2_0_0,throwOnChange,false);
    if (this._ProjectLeftNavComponent_2_4.ngDoCheck(this,this._el_2,throwOnChange)) { this.compView_2.markAsCheckOnce(); }
    this._RouterOutlet_4_5.ngDoCheck(this,this._el_4,throwOnChange);
    this._vc_4.detectChangesInNestedViews(throwOnChange);
    this.compView_2.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._ProjectLeftNavComponent_2_4.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this._vc_4.destroyNestedViews();
    this.compView_2.destroy();
    this._ProjectLeftNavComponent_2_4.ngOnDestroy();
    this._RouterOutlet_4_5.ngOnDestroy();
  }
}