/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../app/view/components/notifications/notifications.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '../../../../../app/actions/notification.action';
import * as import7 from '@angular/core/src/linker/view_type';
import * as import8 from '@angular/core/src/change_detection/constants';
import * as import9 from '@angular/core/src/linker/component_factory';
import * as import10 from '@angular/http/src/http';
import * as import11 from '@angular/core/src/zone/ng_zone';
import * as import12 from '../common/inline_dialog/inline_dialog.directive.ngfactory';
import * as import13 from '../../../../node_modules/@angular/common/src/directives/ng_class.ngfactory';
import * as import14 from '../../../../../app/view/components/notifications/notification.list.component';
import * as import15 from './notification.list.component.ngfactory';
import * as import16 from '@angular/core/src/linker/element_ref';
import * as import17 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import18 from '@angular/core/src/change_detection/differs/keyvalue_differs';
import * as import19 from '@angular/common/src/directives/ng_class';
import * as import20 from '../../../../../app/view/components/common/inline_dialog/inline_dialog.directive';
export class Wrapper_NotificationsComponent {
  /*private*/ _eventHandler:Function;
  context:import0.NotificationsComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  subscription0:any;
  constructor(p0:any,p1:any,p2:any) {
    this._changed = false;
    this.context = new import0.NotificationsComponent(p0,p1,p2);
    this._expr_0 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    (this.subscription0 && this.subscription0.unsubscribe());
  }
  check_appId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.appId = currValue;
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
  subscribe(view:import2.AppView<any>,_eventHandler:any,emit0:boolean):void {
    this._eventHandler = _eventHandler;
    if (emit0) { (this.subscription0 = this.context.onNotificationApply.subscribe(_eventHandler.bind(view,'onNotificationApply'))); }
  }
}
var renderType_NotificationsComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_NotificationsComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.NotificationsComponent>;
  _NotificationAction_0_3:import6.NotificationAction;
  _NotificationsComponent_0_4:Wrapper_NotificationsComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_NotificationsComponent_Host0,renderType_NotificationsComponent_Host,import7.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import8.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import9.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'notifications',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_NotificationsComponent0(this.viewUtils,this,0,this._el_0);
    this._NotificationAction_0_3 = new import6.NotificationAction(this.injectorGet(import10.Http,this.parentIndex));
    this._NotificationsComponent_0_4 = new Wrapper_NotificationsComponent(this._NotificationAction_0_3,this.injectorGet(import11.NgZone,this.parentIndex),this.compView_0.ref);
    this.compView_0.create(this._NotificationsComponent_0_4.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import9.ComponentRef_<any>(0,this,this._el_0,this._NotificationsComponent_0_4.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import6.NotificationAction) && (0 === requestNodeIndex))) { return this._NotificationAction_0_3; }
    if (((token === import0.NotificationsComponent) && (0 === requestNodeIndex))) { return this._NotificationsComponent_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    if (this._NotificationsComponent_0_4.ngDoCheck(this,this._el_0,throwOnChange)) { this.compView_0.markAsCheckOnce(); }
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._NotificationsComponent_0_4.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const NotificationsComponentNgFactory:import9.ComponentFactory<import0.NotificationsComponent> = new import9.ComponentFactory<import0.NotificationsComponent>('notifications',View_NotificationsComponent_Host0,import0.NotificationsComponent);
const styles_NotificationsComponent:any[] = ([] as any[]);
var renderType_NotificationsComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_NotificationsComponent,{});
export class View_NotificationsComponent0 extends import2.AppView<import0.NotificationsComponent> {
  _el_0:any;
  _InlineDialogDirective_0_3:import12.Wrapper_InlineDialogDirective;
  _text_1:any;
  _el_2:any;
  _NgClass_2_3:import13.Wrapper_NgClass;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _text_8:any;
  _text_9:any;
  _text_10:any;
  _el_11:any;
  _text_12:any;
  _el_13:any;
  _text_14:any;
  _el_15:any;
  compView_15:import2.AppView<import14.NotificationListComponent>;
  _NotificationListComponent_15_3:import15.Wrapper_NotificationListComponent;
  _text_16:any;
  _text_17:any;
  _text_18:any;
  _text_19:any;
  _map_24:any;
  /*private*/ _expr_25:any;
  /*private*/ _expr_26:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_NotificationsComponent0,renderType_NotificationsComponent,import7.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import8.ChangeDetectorStatus.CheckOnce);
    this._map_24 = import3.pureProxy1((p0:any):{[key: string]:any} => {
      return {'notification-disable-pointer': p0};
    });
    this._expr_25 = import1.UNINITIALIZED;
    this._expr_26 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import9.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'div',new import3.InlineArray8(6,'class','zui-inline-dialog','title','Notifications','zui-inline-dialog',''),(null as any));
    this._InlineDialogDirective_0_3 = new import12.Wrapper_InlineDialogDirective(new import16.ElementRef(this._el_0));
    this._text_1 = this.renderer.createText(this._el_0,'\n  ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'a',new import3.InlineArray2(2,'class','inline-dialog-trigger'),(null as any));
    this._NgClass_2_3 = new import13.Wrapper_NgClass(this.parentView.injectorGet(import17.IterableDiffers,this.parentIndex),this.parentView.injectorGet(import18.KeyValueDiffers,this.parentIndex),new import16.ElementRef(this._el_2),this.renderer);
    this._text_3 = this.renderer.createText(this._el_2,'\n    ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'span',new import3.InlineArray2(2,'class','notification-wrapper'),(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'\n        ',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_4,'span',new import3.InlineArray2(2,'class','notification-count'),(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'',(null as any));
    this._text_8 = this.renderer.createText(this._el_4,'\n    ',(null as any));
    this._text_9 = this.renderer.createText(this._el_2,'\n  ',(null as any));
    this._text_10 = this.renderer.createText(this._el_0,'\n  ',(null as any));
    this._el_11 = import3.createRenderElement(this.renderer,this._el_0,'div',new import3.InlineArray2(2,'class','inline-dialog-body'),(null as any));
    this._text_12 = this.renderer.createText(this._el_11,'\n	  ',(null as any));
    this._el_13 = import3.createRenderElement(this.renderer,this._el_11,'div',new import3.InlineArray2(2,'class','inline-dialog-content grid-column-chooser-content inline-dialog-content-without-padding notification-content'),(null as any));
    this._text_14 = this.renderer.createText(this._el_13,'\n	    ',(null as any));
    this._el_15 = import3.createRenderElement(this.renderer,this._el_13,'notification-list',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_15 = new import15.View_NotificationListComponent0(this.viewUtils,this,15,this._el_15);
    this._NotificationListComponent_15_3 = new import15.Wrapper_NotificationListComponent();
    this.compView_15.create(this._NotificationListComponent_15_3.context);
    this._text_16 = this.renderer.createText(this._el_13,'\n	  ',(null as any));
    this._text_17 = this.renderer.createText(this._el_11,'\n  ',(null as any));
    this._text_18 = this.renderer.createText(this._el_0,'\n',(null as any));
    this._text_19 = this.renderer.createText(parentRenderNode,'\n\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_15,new import3.InlineArray4(4,'applyNotification',(null as any),'discardNotification',(null as any)),this.eventHandler(this.handleEvent_15));
    this._NotificationListComponent_15_3.subscribe(this,this.eventHandler(this.handleEvent_15),true,true);
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
      this._text_10,
      this._el_11,
      this._text_12,
      this._el_13,
      this._text_14,
      this._el_15,
      this._text_16,
      this._text_17,
      this._text_18,
      this._text_19
    ]
    ),[disposable_0]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import19.NgClass) && ((2 <= requestNodeIndex) && (requestNodeIndex <= 9)))) { return this._NgClass_2_3.context; }
    if (((token === import14.NotificationListComponent) && (15 === requestNodeIndex))) { return this._NotificationListComponent_15_3.context; }
    if (((token === import20.InlineDialogDirective) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 18)))) { return this._InlineDialogDirective_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = 'hover';
    this._InlineDialogDirective_0_3.check_interactionHandler(currVal_0_0_0,throwOnChange,false);
    this._InlineDialogDirective_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_2_0_0:any = 'inline-dialog-trigger';
    this._NgClass_2_3.check_klass(currVal_2_0_0,throwOnChange,false);
    const currVal_2_0_1:any = this._map_24((this.context.notificationCount == 0));
    this._NgClass_2_3.check_ngClass(currVal_2_0_1,throwOnChange,false);
    this._NgClass_2_3.ngDoCheck(this,this._el_2,throwOnChange);
    const currVal_15_0_0:any = this.context.notificationList;
    this._NotificationListComponent_15_3.check_notificationList(currVal_15_0_0,throwOnChange,false);
    this._NotificationListComponent_15_3.ngDoCheck(this,this._el_15,throwOnChange);
    const currVal_25:any = import3.inlineInterpolate(1,'',this.context.notificationCount,'');
    if (import3.checkBinding(throwOnChange,this._expr_25,currVal_25)) {
      this.renderer.setText(this._text_7,currVal_25);
      this._expr_25 = currVal_25;
    }
    const currVal_26:boolean = !this.context.notificationCount;
    if (import3.checkBinding(throwOnChange,this._expr_26,currVal_26)) {
      this.renderer.setElementProperty(this._el_11,'hidden',currVal_26);
      this._expr_26 = currVal_26;
    }
    this.compView_15.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._InlineDialogDirective_0_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_15.destroy();
    this._NotificationListComponent_15_3.ngOnDestroy();
  }
  handleEvent_15(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'applyNotification')) {
      const pd_sub_0:any = ((<any>this.context.applyNotifications($event)) !== false);
      result = (pd_sub_0 && result);
    }
    if ((eventName == 'discardNotification')) {
      const pd_sub_1:any = ((<any>this.context.discardNotifications($event)) !== false);
      result = (pd_sub_1 && result);
    }
    return result;
  }
}