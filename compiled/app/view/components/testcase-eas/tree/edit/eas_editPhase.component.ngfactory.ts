/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../../../app/view/components/testcase-eas/tree/edit/eas_editPhase.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '../../../../../../../app/actions/testcaseEAS.action';
import * as import9 from '@angular/forms/src/form_builder';
import * as import10 from '../../../../../../node_modules/@angular/forms/src/directives/reactive_directives/form_group_directive.ngfactory';
import * as import11 from '../../../../../../node_modules/@angular/forms/src/directives/ng_control_status.ngfactory';
import * as import12 from '../../../../../../../app/view/components/common/modal/modal.component';
import * as import13 from '../../../common/modal/modal.component.ngfactory';
import * as import14 from '../../../../../../node_modules/@angular/forms/src/directives/default_value_accessor.ngfactory';
import * as import15 from '../../../../../../node_modules/@angular/forms/src/directives/reactive_directives/form_control_directive.ngfactory';
import * as import16 from '../../../../../../../app/view/components/common/calendar/calendar.component';
import * as import17 from '../../../common/calendar/calendar.component.ngfactory';
import * as import18 from '@angular/common/src/pipes/date_pipe';
import * as import19 from '@angular/core/src/change_detection/change_detection_util';
import * as import20 from '@angular/core/src/linker/element_ref';
import * as import21 from '@angular/core/src/i18n/tokens';
import * as import22 from '@angular/forms/src/directives/default_value_accessor';
import * as import23 from '@angular/forms/src/directives/control_value_accessor';
import * as import24 from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import * as import25 from '@angular/forms/src/directives/ng_control';
import * as import26 from '@angular/forms/src/directives/ng_control_status';
import * as import27 from '@angular/forms/src/directives/reactive_directives/form_group_directive';
import * as import28 from '@angular/forms/src/directives/control_container';
export class Wrapper_EasEditPhaseComponent {
  /*private*/ _eventHandler:Function;
  context:import0.EasEditPhaseComponent;
  /*private*/ _changed:boolean;
  constructor(p0:any,p1:any) {
    this._changed = false;
    this.context = new import0.EasEditPhaseComponent(p0,p1);
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
var renderType_EasEditPhaseComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_EasEditPhaseComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.EasEditPhaseComponent>;
  _EasEditPhaseComponent_0_3:Wrapper_EasEditPhaseComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_EasEditPhaseComponent_Host0,renderType_EasEditPhaseComponent_Host,import5.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'ng-component',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_EasEditPhaseComponent0(this.viewUtils,this,0,this._el_0);
    this._EasEditPhaseComponent_0_3 = new Wrapper_EasEditPhaseComponent(this.injectorGet(import8.TestcaseEASAction,this.parentIndex),this.injectorGet(import9.FormBuilder,this.parentIndex));
    this.compView_0.create(this._EasEditPhaseComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import7.ComponentRef_<any>(0,this,this._el_0,this._EasEditPhaseComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.EasEditPhaseComponent) && (0 === requestNodeIndex))) { return this._EasEditPhaseComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._EasEditPhaseComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._EasEditPhaseComponent_0_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const EasEditPhaseComponentNgFactory:import7.ComponentFactory<import0.EasEditPhaseComponent> = new import7.ComponentFactory<import0.EasEditPhaseComponent>('ng-component',View_EasEditPhaseComponent_Host0,import0.EasEditPhaseComponent);
const styles_EasEditPhaseComponent:any[] = ([] as any[]);
var renderType_EasEditPhaseComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_EasEditPhaseComponent,{});
export class View_EasEditPhaseComponent0 extends import1.AppView<import0.EasEditPhaseComponent> {
  _el_0:any;
  _FormGroupDirective_0_3:import10.Wrapper_FormGroupDirective;
  _ControlContainer_0_4:any;
  _NgControlStatusGroup_0_5:import11.Wrapper_NgControlStatusGroup;
  _text_1:any;
  _el_2:any;
  compView_2:import1.AppView<import12.ModalComponent>;
  _ModalComponent_2_3:import13.Wrapper_ModalComponent;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _el_8:any;
  _text_9:any;
  _el_10:any;
  _text_11:any;
  _el_12:any;
  _text_13:any;
  _el_14:any;
  _el_15:any;
  _text_16:any;
  _text_17:any;
  _el_18:any;
  _text_19:any;
  _text_20:any;
  _text_21:any;
  _el_22:any;
  _text_23:any;
  _el_24:any;
  _el_25:any;
  _text_26:any;
  _text_27:any;
  _el_28:any;
  _text_29:any;
  _text_30:any;
  _text_31:any;
  _el_32:any;
  _text_33:any;
  _el_34:any;
  _el_35:any;
  _text_36:any;
  _text_37:any;
  _el_38:any;
  _text_39:any;
  _text_40:any;
  _text_41:any;
  _text_42:any;
  _text_43:any;
  _text_44:any;
  _el_45:any;
  _text_46:any;
  _el_47:any;
  _text_48:any;
  _el_49:any;
  _text_50:any;
  _el_51:any;
  _text_52:any;
  _el_53:any;
  _el_54:any;
  _text_55:any;
  _text_56:any;
  _el_57:any;
  _text_58:any;
  _text_59:any;
  _el_60:any;
  _DefaultValueAccessor_60_3:import14.Wrapper_DefaultValueAccessor;
  _NG_VALUE_ACCESSOR_60_4:any[];
  _FormControlDirective_60_5:import15.Wrapper_FormControlDirective;
  _NgControl_60_6:any;
  _NgControlStatus_60_7:import11.Wrapper_NgControlStatus;
  _text_61:any;
  _text_62:any;
  _el_63:any;
  _text_64:any;
  _el_65:any;
  _el_66:any;
  _text_67:any;
  _text_68:any;
  _el_69:any;
  _text_70:any;
  _text_71:any;
  _text_72:any;
  _el_73:any;
  _text_74:any;
  _el_75:any;
  compView_75:import1.AppView<import16.CalendarComponent>;
  _CalendarComponent_75_3:import17.Wrapper_CalendarComponent;
  _text_76:any;
  _text_77:any;
  _text_78:any;
  _text_79:any;
  _el_80:any;
  _text_81:any;
  _el_82:any;
  _el_83:any;
  _text_84:any;
  _text_85:any;
  _el_86:any;
  _text_87:any;
  _text_88:any;
  _text_89:any;
  _el_90:any;
  _text_91:any;
  _el_92:any;
  compView_92:import1.AppView<import16.CalendarComponent>;
  _CalendarComponent_92_3:import17.Wrapper_CalendarComponent;
  _text_93:any;
  _text_94:any;
  _text_95:any;
  _text_96:any;
  _text_97:any;
  _text_98:any;
  _text_99:any;
  _text_100:any;
  _el_101:any;
  _text_102:any;
  _el_103:any;
  _text_104:any;
  _text_105:any;
  _el_106:any;
  _text_107:any;
  _text_108:any;
  _text_109:any;
  _text_110:any;
  _text_111:any;
  /*private*/ _expr_126:any;
  /*private*/ _expr_127:any;
  _pipe_date_0:import18.DatePipe;
  _pipe_date_0_0:any;
  /*private*/ _expr_130:any;
  _pipe_date_0_1:any;
  /*private*/ _expr_132:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_EasEditPhaseComponent0,renderType_EasEditPhaseComponent,import5.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
    this._expr_126 = import19.UNINITIALIZED;
    this._expr_127 = import19.UNINITIALIZED;
    this._expr_130 = import19.UNINITIALIZED;
    this._expr_132 = import19.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'form',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._FormGroupDirective_0_3 = new import10.Wrapper_FormGroupDirective((null as any),(null as any));
    this._ControlContainer_0_4 = this._FormGroupDirective_0_3.context;
    this._NgControlStatusGroup_0_5 = new import11.Wrapper_NgControlStatusGroup(this._ControlContainer_0_4);
    this._text_1 = this.renderer.createText(this._el_0,'\n	',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'zui-modal',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_2 = new import13.View_ModalComponent0(this.viewUtils,this,2,this._el_2);
    this._ModalComponent_2_3 = new import13.Wrapper_ModalComponent(new import20.ElementRef(this._el_2),this.compView_2.ref);
    this._text_3 = this.renderer.createText((null as any),'\n	    ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,(null as any),'zui-modal-body',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_5 = this.renderer.createText(this._el_4,'\n				',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_4,'div',new import3.InlineArray2(2,'class','subform'),(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'\n					',(null as any));
    this._el_8 = import3.createRenderElement(this.renderer,this._el_6,'div',new import3.InlineArray2(2,'class','row'),(null as any));
    this._text_9 = this.renderer.createText(this._el_8,'\n						',(null as any));
    this._el_10 = import3.createRenderElement(this.renderer,this._el_8,'div',new import3.InlineArray2(2,'class','col-md-12'),(null as any));
    this._text_11 = this.renderer.createText(this._el_10,'\n							',(null as any));
    this._el_12 = import3.createRenderElement(this.renderer,this._el_10,'div',new import3.InlineArray2(2,'class','clearfix'),(null as any));
    this._text_13 = this.renderer.createText(this._el_12,'\n								',(null as any));
    this._el_14 = import3.createRenderElement(this.renderer,this._el_12,'label',new import3.InlineArray2(2,'for',''),(null as any));
    this._el_15 = import3.createRenderElement(this.renderer,this._el_14,'b',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_16 = this.renderer.createText(this._el_15,'Cycle',(null as any));
    this._text_17 = this.renderer.createText(this._el_12,'\n								',(null as any));
    this._el_18 = import3.createRenderElement(this.renderer,this._el_12,'span',new import3.InlineArray2(2,'class','field-value'),(null as any));
    this._text_19 = this.renderer.createText(this._el_18,'',(null as any));
    this._text_20 = this.renderer.createText(this._el_12,'\n							',(null as any));
    this._text_21 = this.renderer.createText(this._el_10,'\n							',(null as any));
    this._el_22 = import3.createRenderElement(this.renderer,this._el_10,'div',new import3.InlineArray2(2,'class','clearfix'),(null as any));
    this._text_23 = this.renderer.createText(this._el_22,'\n								',(null as any));
    this._el_24 = import3.createRenderElement(this.renderer,this._el_22,'label',new import3.InlineArray2(2,'for',''),(null as any));
    this._el_25 = import3.createRenderElement(this.renderer,this._el_24,'b',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_26 = this.renderer.createText(this._el_25,'Start',(null as any));
    this._text_27 = this.renderer.createText(this._el_22,'\n								',(null as any));
    this._el_28 = import3.createRenderElement(this.renderer,this._el_22,'span',new import3.InlineArray2(2,'class','field-value'),(null as any));
    this._text_29 = this.renderer.createText(this._el_28,'',(null as any));
    this._text_30 = this.renderer.createText(this._el_22,'\n							',(null as any));
    this._text_31 = this.renderer.createText(this._el_10,'\n							',(null as any));
    this._el_32 = import3.createRenderElement(this.renderer,this._el_10,'div',new import3.InlineArray2(2,'class','clearfix'),(null as any));
    this._text_33 = this.renderer.createText(this._el_32,'\n								',(null as any));
    this._el_34 = import3.createRenderElement(this.renderer,this._el_32,'label',new import3.InlineArray2(2,'for',''),(null as any));
    this._el_35 = import3.createRenderElement(this.renderer,this._el_34,'b',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_36 = this.renderer.createText(this._el_35,'End',(null as any));
    this._text_37 = this.renderer.createText(this._el_32,'\n								',(null as any));
    this._el_38 = import3.createRenderElement(this.renderer,this._el_32,'span',new import3.InlineArray2(2,'class','field-value'),(null as any));
    this._text_39 = this.renderer.createText(this._el_38,'',(null as any));
    this._text_40 = this.renderer.createText(this._el_32,'\n							',(null as any));
    this._text_41 = this.renderer.createText(this._el_10,'\n						',(null as any));
    this._text_42 = this.renderer.createText(this._el_8,'\n					',(null as any));
    this._text_43 = this.renderer.createText(this._el_6,'\n				',(null as any));
    this._text_44 = this.renderer.createText(this._el_4,'\n				',(null as any));
    this._el_45 = import3.createRenderElement(this.renderer,this._el_4,'div',new import3.InlineArray2(2,'class','subform'),(null as any));
    this._text_46 = this.renderer.createText(this._el_45,'\n					',(null as any));
    this._el_47 = import3.createRenderElement(this.renderer,this._el_45,'div',new import3.InlineArray2(2,'class','row'),(null as any));
    this._text_48 = this.renderer.createText(this._el_47,'\n						',(null as any));
    this._el_49 = import3.createRenderElement(this.renderer,this._el_47,'div',new import3.InlineArray2(2,'class','col-md-12'),(null as any));
    this._text_50 = this.renderer.createText(this._el_49,'\n							',(null as any));
    this._el_51 = import3.createRenderElement(this.renderer,this._el_49,'div',new import3.InlineArray2(2,'class','clearfix'),(null as any));
    this._text_52 = this.renderer.createText(this._el_51,'\n								',(null as any));
    this._el_53 = import3.createRenderElement(this.renderer,this._el_51,'label',new import3.InlineArray2(2,'for',''),(null as any));
    this._el_54 = import3.createRenderElement(this.renderer,this._el_53,'b',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_55 = this.renderer.createText(this._el_54,'Phase',(null as any));
    this._text_56 = this.renderer.createText(this._el_53,' ',(null as any));
    this._el_57 = import3.createRenderElement(this.renderer,this._el_53,'i',new import3.InlineArray2(2,'class','ast-red'),(null as any));
    this._text_58 = this.renderer.createText(this._el_57,'*',(null as any));
    this._text_59 = this.renderer.createText(this._el_51,'\n								',(null as any));
    this._el_60 = import3.createRenderElement(this.renderer,this._el_51,'input',new import3.InlineArray8(6,'class','form-control','style','width: 222px;','type','text'),(null as any));
    this._DefaultValueAccessor_60_3 = new import14.Wrapper_DefaultValueAccessor(this.renderer,new import20.ElementRef(this._el_60));
    this._NG_VALUE_ACCESSOR_60_4 = [this._DefaultValueAccessor_60_3.context];
    this._FormControlDirective_60_5 = new import15.Wrapper_FormControlDirective((null as any),(null as any),this._NG_VALUE_ACCESSOR_60_4);
    this._NgControl_60_6 = this._FormControlDirective_60_5.context;
    this._NgControlStatus_60_7 = new import11.Wrapper_NgControlStatus(this._NgControl_60_6);
    this._text_61 = this.renderer.createText(this._el_51,'\n							',(null as any));
    this._text_62 = this.renderer.createText(this._el_49,'\n							',(null as any));
    this._el_63 = import3.createRenderElement(this.renderer,this._el_49,'div',new import3.InlineArray2(2,'class','clearfix'),(null as any));
    this._text_64 = this.renderer.createText(this._el_63,'\n								',(null as any));
    this._el_65 = import3.createRenderElement(this.renderer,this._el_63,'label',new import3.InlineArray2(2,'for',''),(null as any));
    this._el_66 = import3.createRenderElement(this.renderer,this._el_65,'b',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_67 = this.renderer.createText(this._el_66,'Start Date',(null as any));
    this._text_68 = this.renderer.createText(this._el_65,' ',(null as any));
    this._el_69 = import3.createRenderElement(this.renderer,this._el_65,'i',new import3.InlineArray2(2,'class','ast-red'),(null as any));
    this._text_70 = this.renderer.createText(this._el_69,'*',(null as any));
    this._text_71 = this.renderer.createText(this._el_63,'\n								',(null as any));
    this._text_72 = this.renderer.createText(this._el_63,'\n								',(null as any));
    this._el_73 = import3.createRenderElement(this.renderer,this._el_63,'div',new import3.InlineArray2(2,'class','datepicker-wrap'),(null as any));
    this._text_74 = this.renderer.createText(this._el_73,'\n									',(null as any));
    this._el_75 = import3.createRenderElement(this.renderer,this._el_73,'calendar',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_75 = new import17.View_CalendarComponent0(this.viewUtils,this,75,this._el_75);
    this._CalendarComponent_75_3 = new import17.Wrapper_CalendarComponent(new import20.ElementRef(this._el_75));
    this._text_76 = this.renderer.createText((null as any),'\n									',(null as any));
    this.compView_75.create(this._CalendarComponent_75_3.context);
    this._text_77 = this.renderer.createText(this._el_73,'\n								',(null as any));
    this._text_78 = this.renderer.createText(this._el_63,'\n							',(null as any));
    this._text_79 = this.renderer.createText(this._el_49,'\n							',(null as any));
    this._el_80 = import3.createRenderElement(this.renderer,this._el_49,'div',new import3.InlineArray2(2,'class','clearfix'),(null as any));
    this._text_81 = this.renderer.createText(this._el_80,'\n								',(null as any));
    this._el_82 = import3.createRenderElement(this.renderer,this._el_80,'label',new import3.InlineArray2(2,'for',''),(null as any));
    this._el_83 = import3.createRenderElement(this.renderer,this._el_82,'b',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_84 = this.renderer.createText(this._el_83,'End Date',(null as any));
    this._text_85 = this.renderer.createText(this._el_82,' ',(null as any));
    this._el_86 = import3.createRenderElement(this.renderer,this._el_82,'i',new import3.InlineArray2(2,'class','ast-red'),(null as any));
    this._text_87 = this.renderer.createText(this._el_86,'*',(null as any));
    this._text_88 = this.renderer.createText(this._el_80,'\n								',(null as any));
    this._text_89 = this.renderer.createText(this._el_80,'\n								',(null as any));
    this._el_90 = import3.createRenderElement(this.renderer,this._el_80,'div',new import3.InlineArray2(2,'class','datepicker-wrap'),(null as any));
    this._text_91 = this.renderer.createText(this._el_90,'\n									',(null as any));
    this._el_92 = import3.createRenderElement(this.renderer,this._el_90,'calendar',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_92 = new import17.View_CalendarComponent0(this.viewUtils,this,92,this._el_92);
    this._CalendarComponent_92_3 = new import17.Wrapper_CalendarComponent(new import20.ElementRef(this._el_92));
    this._text_93 = this.renderer.createText((null as any),'\n									',(null as any));
    this.compView_92.create(this._CalendarComponent_92_3.context);
    this._text_94 = this.renderer.createText(this._el_90,'\n								',(null as any));
    this._text_95 = this.renderer.createText(this._el_80,'\n							',(null as any));
    this._text_96 = this.renderer.createText(this._el_49,'\n						',(null as any));
    this._text_97 = this.renderer.createText(this._el_47,'\n					',(null as any));
    this._text_98 = this.renderer.createText(this._el_45,'\n				',(null as any));
    this._text_99 = this.renderer.createText(this._el_4,'\n	    ',(null as any));
    this._text_100 = this.renderer.createText((null as any),'\n	    ',(null as any));
    this._el_101 = import3.createRenderElement(this.renderer,(null as any),'zui-modal-footer',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_102 = this.renderer.createText(this._el_101,'\n			',(null as any));
    this._el_103 = import3.createRenderElement(this.renderer,this._el_101,'button',new import3.InlineArray8(6,'class','zui-btn zui-btn-sec','data-dismiss','modal','type','button'),(null as any));
    this._text_104 = this.renderer.createText(this._el_103,'Cancel',(null as any));
    this._text_105 = this.renderer.createText(this._el_101,'\n			',(null as any));
    this._el_106 = import3.createRenderElement(this.renderer,this._el_101,'button',new import3.InlineArray4(4,'class','zui-btn zui-btn-primary','type','submit'),(null as any));
    this._text_107 = this.renderer.createText(this._el_106,'Save',(null as any));
    this._text_108 = this.renderer.createText(this._el_101,'\n	    ',(null as any));
    this._text_109 = this.renderer.createText((null as any),'\n	',(null as any));
    this.compView_2.create(this._ModalComponent_2_3.context);
    this._text_110 = this.renderer.createText(this._el_0,'\n',(null as any));
    this._text_111 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_0,new import3.InlineArray8(6,'ngSubmit',(null as any),'submit',(null as any),'reset',(null as any)),this.eventHandler(this.handleEvent_0));
    this._FormGroupDirective_0_3.subscribe(this,this.eventHandler(this.handleEvent_0),true);
    this._pipe_date_0 = new import18.DatePipe(this.parentView.injectorGet(import21.LOCALE_ID,this.parentIndex));
    this._pipe_date_0_0 = import3.pureProxy2(this._pipe_date_0.transform.bind(this._pipe_date_0));
    this._pipe_date_0_1 = import3.pureProxy2(this._pipe_date_0.transform.bind(this._pipe_date_0));
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_60,new import3.InlineArray4(4,'input',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_60));
    var disposable_2:Function = import3.subscribeToRenderElement(this,this._el_75,new import3.InlineArray2(2,'validateDate',(null as any)),this.eventHandler(this.handleEvent_75));
    this._CalendarComponent_75_3.subscribe(this,this.eventHandler(this.handleEvent_75),true);
    var disposable_3:Function = import3.subscribeToRenderElement(this,this._el_92,new import3.InlineArray2(2,'validateDate',(null as any)),this.eventHandler(this.handleEvent_92));
    this._CalendarComponent_92_3.subscribe(this,this.eventHandler(this.handleEvent_92),true);
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
      this._el_12,
      this._text_13,
      this._el_14,
      this._el_15,
      this._text_16,
      this._text_17,
      this._el_18,
      this._text_19,
      this._text_20,
      this._text_21,
      this._el_22,
      this._text_23,
      this._el_24,
      this._el_25,
      this._text_26,
      this._text_27,
      this._el_28,
      this._text_29,
      this._text_30,
      this._text_31,
      this._el_32,
      this._text_33,
      this._el_34,
      this._el_35,
      this._text_36,
      this._text_37,
      this._el_38,
      this._text_39,
      this._text_40,
      this._text_41,
      this._text_42,
      this._text_43,
      this._text_44,
      this._el_45,
      this._text_46,
      this._el_47,
      this._text_48,
      this._el_49,
      this._text_50,
      this._el_51,
      this._text_52,
      this._el_53,
      this._el_54,
      this._text_55,
      this._text_56,
      this._el_57,
      this._text_58,
      this._text_59,
      this._el_60,
      this._text_61,
      this._text_62,
      this._el_63,
      this._text_64,
      this._el_65,
      this._el_66,
      this._text_67,
      this._text_68,
      this._el_69,
      this._text_70,
      this._text_71,
      this._text_72,
      this._el_73,
      this._text_74,
      this._el_75,
      this._text_76,
      this._text_77,
      this._text_78,
      this._text_79,
      this._el_80,
      this._text_81,
      this._el_82,
      this._el_83,
      this._text_84,
      this._text_85,
      this._el_86,
      this._text_87,
      this._text_88,
      this._text_89,
      this._el_90,
      this._text_91,
      this._el_92,
      this._text_93,
      this._text_94,
      this._text_95,
      this._text_96,
      this._text_97,
      this._text_98,
      this._text_99,
      this._text_100,
      this._el_101,
      this._text_102,
      this._el_103,
      this._text_104,
      this._text_105,
      this._el_106,
      this._text_107,
      this._text_108,
      this._text_109,
      this._text_110,
      this._text_111
    ]
    ),[
      disposable_0,
      disposable_1,
      disposable_2,
      disposable_3
    ]
    );
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import22.DefaultValueAccessor) && (60 === requestNodeIndex))) { return this._DefaultValueAccessor_60_3.context; }
    if (((token === import23.NG_VALUE_ACCESSOR) && (60 === requestNodeIndex))) { return this._NG_VALUE_ACCESSOR_60_4; }
    if (((token === import24.FormControlDirective) && (60 === requestNodeIndex))) { return this._FormControlDirective_60_5.context; }
    if (((token === import25.NgControl) && (60 === requestNodeIndex))) { return this._NgControl_60_6; }
    if (((token === import26.NgControlStatus) && (60 === requestNodeIndex))) { return this._NgControlStatus_60_7.context; }
    if (((token === import16.CalendarComponent) && ((75 <= requestNodeIndex) && (requestNodeIndex <= 76)))) { return this._CalendarComponent_75_3.context; }
    if (((token === import16.CalendarComponent) && ((92 <= requestNodeIndex) && (requestNodeIndex <= 93)))) { return this._CalendarComponent_92_3.context; }
    if (((token === import12.ModalComponent) && ((2 <= requestNodeIndex) && (requestNodeIndex <= 109)))) { return this._ModalComponent_2_3.context; }
    if (((token === import27.FormGroupDirective) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 110)))) { return this._FormGroupDirective_0_3.context; }
    if (((token === import28.ControlContainer) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 110)))) { return this._ControlContainer_0_4; }
    if (((token === import26.NgControlStatusGroup) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 110)))) { return this._NgControlStatusGroup_0_5.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const valUnwrapper:any = new import19.ValueUnwrapper();
    const currVal_0_0_0:any = this.context.editPhaseForm;
    this._FormGroupDirective_0_3.check_form(currVal_0_0_0,throwOnChange,false);
    this._FormGroupDirective_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this._NgControlStatusGroup_0_5.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_2_0_0:any = 'Edit Phase';
    this._ModalComponent_2_3.check_title(currVal_2_0_0,throwOnChange,false);
    const currVal_2_0_1:any = 'easEditNodeModal';
    this._ModalComponent_2_3.check_modalId(currVal_2_0_1,throwOnChange,false);
    const currVal_2_0_2:any = 'small';
    this._ModalComponent_2_3.check_modalSize(currVal_2_0_2,throwOnChange,false);
    this._ModalComponent_2_3.ngDoCheck(this,this._el_2,throwOnChange);
    this._DefaultValueAccessor_60_3.ngDoCheck(this,this._el_60,throwOnChange);
    const currVal_60_1_0:any = this.context.editPhaseForm.controls['name'];
    this._FormControlDirective_60_5.check_form(currVal_60_1_0,throwOnChange,false);
    this._FormControlDirective_60_5.ngDoCheck(this,this._el_60,throwOnChange);
    this._NgControlStatus_60_7.ngDoCheck(this,this._el_60,throwOnChange);
    const currVal_75_0_0:any = this.context.editPhaseForm.controls['startDate'];
    this._CalendarComponent_75_3.check_formkey(currVal_75_0_0,throwOnChange,false);
    const currVal_75_0_1:any = this.context.startDate;
    this._CalendarComponent_75_3.check_model(currVal_75_0_1,throwOnChange,false);
    const currVal_75_0_2:any = this.context.startMinDate;
    this._CalendarComponent_75_3.check_minDate(currVal_75_0_2,throwOnChange,false);
    const currVal_75_0_3:any = this.context.startMaxDate;
    this._CalendarComponent_75_3.check_maxDate(currVal_75_0_3,throwOnChange,false);
    this._CalendarComponent_75_3.ngDoCheck(this,this._el_75,throwOnChange);
    const currVal_92_0_0:any = this.context.editPhaseForm.controls['endDate'];
    this._CalendarComponent_92_3.check_formkey(currVal_92_0_0,throwOnChange,false);
    const currVal_92_0_1:any = this.context.endDate;
    this._CalendarComponent_92_3.check_model(currVal_92_0_1,throwOnChange,false);
    const currVal_92_0_2:any = this.context.endMinDate;
    this._CalendarComponent_92_3.check_minDate(currVal_92_0_2,throwOnChange,false);
    const currVal_92_0_3:any = this.context.endMaxDate;
    this._CalendarComponent_92_3.check_maxDate(currVal_92_0_3,throwOnChange,false);
    this._CalendarComponent_92_3.ngDoCheck(this,this._el_92,throwOnChange);
    this._NgControlStatusGroup_0_5.checkHost(this,this,this._el_0,throwOnChange);
    const currVal_126:any = import3.inlineInterpolate(1,'',this.context.cycleInfo.name,'');
    if (import3.checkBinding(throwOnChange,this._expr_126,currVal_126)) {
      this.renderer.setText(this._text_19,currVal_126);
      this._expr_126 = currVal_126;
    }
    valUnwrapper.reset();
    const currVal_127:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(import3.castByValue(this._pipe_date_0_0,this._pipe_date_0.transform)(this.context.cycleInfo.startDate,'MM/dd/yyyy')),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_127,currVal_127))) {
      this.renderer.setText(this._text_29,currVal_127);
      this._expr_127 = currVal_127;
    }
    valUnwrapper.reset();
    const currVal_130:any = import3.inlineInterpolate(1,'',valUnwrapper.unwrap(import3.castByValue(this._pipe_date_0_1,this._pipe_date_0.transform)(this.context.cycleInfo.endDate,'MM/dd/yyyy')),'');
    if ((valUnwrapper.hasWrappedValue || import3.checkBinding(throwOnChange,this._expr_130,currVal_130))) {
      this.renderer.setText(this._text_39,currVal_130);
      this._expr_130 = currVal_130;
    }
    this._NgControlStatus_60_7.checkHost(this,this,this._el_60,throwOnChange);
    const currVal_132:any = this.context.isFormInValid(this.context.editPhaseForm);
    if (import3.checkBinding(throwOnChange,this._expr_132,currVal_132)) {
      this.renderer.setElementProperty(this._el_106,'disabled',currVal_132);
      this._expr_132 = currVal_132;
    }
    this.compView_2.internalDetectChanges(throwOnChange);
    this.compView_75.internalDetectChanges(throwOnChange);
    this.compView_92.internalDetectChanges(throwOnChange);
    if (!throwOnChange) {
      if ((this.numberOfChecks === 0)) { this._CalendarComponent_75_3.context.ngAfterViewInit(); }
      if ((this.numberOfChecks === 0)) { this._CalendarComponent_92_3.context.ngAfterViewInit(); }
      if ((this.numberOfChecks === 0)) { this._ModalComponent_2_3.context.ngAfterViewInit(); }
    }
  }
  destroyInternal():void {
    this.compView_2.destroy();
    this.compView_75.destroy();
    this.compView_92.destroy();
    this._FormControlDirective_60_5.ngOnDestroy();
    this._CalendarComponent_75_3.ngOnDestroy();
    this._CalendarComponent_92_3.ngOnDestroy();
    this._ModalComponent_2_3.ngOnDestroy();
    this._FormGroupDirective_0_3.ngOnDestroy();
  }
  visitProjectableNodesInternal(nodeIndex:number,ngContentIndex:number,cb:any,ctx:any):void {
    if (((nodeIndex == 2) && (ngContentIndex == 0))) {  }
    if (((nodeIndex == 2) && (ngContentIndex == 1))) { cb(this._el_4,ctx); }
    if (((nodeIndex == 2) && (ngContentIndex == 2))) { cb(this._el_101,ctx); }
  }
  handleEvent_0(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._FormGroupDirective_0_3.handleEvent(eventName,$event) && result);
    if ((eventName == 'ngSubmit')) {
      const pd_sub_0:any = ((<any>this.context.editPhaseFormSubmit(this.context.editPhaseForm.value)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_60(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._DefaultValueAccessor_60_3.handleEvent(eventName,$event) && result);
    return result;
  }
  handleEvent_75(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'validateDate')) {
      const pd_sub_0:any = ((<any>this.context.resetDates($event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_92(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'validateDate')) {
      const pd_sub_0:any = ((<any>this.context.resetDates($event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}