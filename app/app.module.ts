import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA, ApplicationRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES_MAIN } from './utils/constants/router-config.constants';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { XHRBackend, RequestOptions, Http } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import 'tether/dist/js/tether.min';

import { AppComponent }  from './view/components/app/app.component';
import { DatepickerModule } from 'ng2-bootstrap';
import { ReportsComponent } from './view/components/reports/reports.component';
import { TCEPGraphComponent } from './view/components/reports/TCEPGraph.component';
import { TCEPPhaseComponent } from './view/components/reports/TCEPPhase.component';


import { NvD3Module } from 'ng2-nvd3';
import { Select2Module } from 'ng2-select2';
import 'd3';
import 'nvd3';

import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';

import {ZephyrStore} from './store/zephyr.store';

import './assets/styles/app.scss';

import 'select2/dist/js/select2.js';

import 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';

import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/autoresize/plugin';
import 'tinymce/plugins/autoresize/plugin';
import 'tinymce/themes/modern/theme.min.js';
import 'tinymce/plugins/paste/plugin.min.js';
import 'tinymce/plugins/link/plugin.min.js';
import 'tinymce/plugins/textcolor/plugin.min.js';
import 'tinymce/plugins/lists/plugin.min.js';
import 'tinymce/plugins/legacyoutput/plugin.min.js';
import 'tinymce/plugins/autoresize/plugin.js';

import '../node_modules/Highcharts/highcharts.js';
import '../node_modules/Highcharts/modules/drilldown.js';
import '../node_modules/Highcharts/modules/exporting.js';
import '../node_modules/Highcharts/modules/no-data-to-display.js';

import 'bootstrap/dist/js/bootstrap.min';
import './assets/libs/zql_parser/zql.parser';
import './assets/libs/zql_parser/zql.parser.handler';
import './assets/libs/jquery_ui/jquery.ui.draggable';
import './assets/libs/jquery_ui/jquery.ui.touch';
import './assets/libs/colorpicker/colorpicker';
import 'jquery-ui/ui/widgets/autocomplete';
import 'jstree/dist/jstree';
import 'masonry-layout/dist/masonry.pkgd.min';
import './assets/libs/atmosphere/atmosphere';
import 'sidr/dist/jquery.sidr.min';

import './assets/libs/d3/d3_3_5_6.min.js';
import './assets/libs/d3/nv.d3_1_8_5.min.js';


// import '../../../assets/styles/app';


//import {ReleaseTestcaseStatusGadgetComponent} from './view/components/dashboard/dashboard_gadget.component';

import {CustomContextMenuComponent} from './view/components/common/custom_context_menu/custom_context_menu.component';
import { ModalComponent }  from './view/components/common/modal/modal.component';
import { TabsComponent }  from './view/components/common/tabs/tabs.component';
import { CanActivateOnLoginGaurd }  from './services/modules/can_activate_routes.service';
import { EmptyURLComponent } from './view/components/app/empty_url.component';
import { DashboardComponent }  from './view/components/dashboard/dashboard.component';
import { DashboardGadgetComponent }  from './view/components/dashboard/dashboard_gadget.component';
import { DashboardFormComponent }  from './view/components/dashboard/dashboard_form/dashboard_form.component';
import { DashboardsComponent } from './view/components/dashboard/dashboards.component';
import { ZQLSearchReportComponent } from './view/components/dashboard/gadgets/zql/zql_report.component';
import { TestCaseDistByPhaseComponent } from './view/components/dashboard/gadgets/testcase_dist_by_phase.component';
import { TopNavComponent } from './view/components/common/topnav/topnav.component';
import { AutosizeDirective } from './view/components/common/autosize/autosize.directive';
import { ZeCounterComponent } from './view/components/common/ze_counter/ze_counter.component';

import { ReleaseStatusRequirementsGadgetComponent }  from './view/components/dashboard/gadgets/release_status_requirements/release_status_requirements.component';

import { ReleaseAutomationStatusGadgetComponent }  from './view/components/dashboard/gadgets/release_automation_status/release_automation_status.component';

import { ReleaseTestcaseStatusGadgetComponent }  from './view/components/dashboard/gadgets/release_status_testcases/release_status_testcases.component';

import { FooterComponent } from './view/components/common/footer/footer.component';
import { MessageComponent } from './view/components/common/message/message.component';
import { ProjectLeftNavComponent } from './view/components/common/leftnav/project/project_leftnav.component';
import { AdminLeftNavComponent } from './view/components/common/leftnav/administration/admin_leftnav.component';
import { LeftNavComponent } from './view/components/common/leftnav/leftnav.component';
import { PaginatorComponent } from './view/components/common/paginator/paginator.component';
import { InlineEditComponent } from './view/components/inline_edit/inline_edit.component';
import { InlineRowsEditComponent } from './view/components/inline_edit/inline_rows_edit.component';
import { GridComponent } from './view/components/grid/grid.component';
import { InputFieldComponent } from './view/components/common/customfield/input_field.component';
import { TextareaFieldComponent } from './view/components/common/customfield/textarea_field.component';
import { SelectFieldComponent } from './view/components/common/customfield/select_field.component';
import { ValidationDirective } from './view/directives/validation/validation.directive';
import { InlineDialogDirective } from './view/components/common/inline_dialog/inline_dialog.directive';
import { InlineTableDirective } from './view/components/common/inline_dialog/inline_table.directive';
import { InlineCalendarDirective } from './view/components/common/inline_calendar/inline_calendar.directive';
import { PositionCalendarDirective } from './view/components/common/position_calendar/position_calendar.directive';
import { SelectComponent } from './view/components/common/select/select.component';
import { ProjectDetailsComponent } from './view/components/projects/project_details.component';
import { ProjectReleasesComponent } from './view/components/projects/project_releases.component';
import { ProjectTeamLocationComponent } from './view/components/projects/project_team_location.component';
import { ProjectNewsComponent } from './view/components/projects/project_news.component';
import { ProjectTeamComponent } from './view/components/projects/project_team.component';
import { ProjectLocationComponent } from './view/components/projects/project_location.component';
import { ContentModule1Component } from './view/components/common/modules/module1';
import { GadgetContentModuleComponent } from './view/components/common/modules-gadgets/module';
import { PieChartDirective } from './view/directives/charts/pie_chart.directive';
import { BarChartDirective } from './view/directives/charts/bar_chart.directive';
import { RequirementCreateComponent } from './view/components/requirements/operations/requirement_create.component';
import { RequirementDeleteComponent } from './view/components/requirements/operations/requirement_delete.component';
import { RequirementExportComponent } from './view/components/requirements/operations/requirement_export.component';
import { ReleaseDetailsComponent } from './view/components/release/release_details.component';
import { ReleaseCalenderComponent } from './view/components/release/release_calender.component';
import { ReleaseReportComponent } from './view/components/release/release_report.component';
import { BreadCrumbComponent } from './view/components/common/breadcrumb/bread_crumb.component';
import { JobStatusComponent } from './view/components/common/job_status/job_status.component';
import { UnselectedSelectedListComponent } from './view/components/common/unselected_selected_list/unselected_selected_list.component';
import { TreeComponent } from './view/components/common/tree/tree.component';
import { TestcaseEASFreeFormAddComponent } from './view/components/testcase-eas/phase/freeform/add/testcase_eas_add.component';
import { EasFreeformAddComponent } from './view/components/testcase-eas/phase/tree/add/eas_freeform_add.component';
import { EasFreeformEditComponent } from './view/components/testcase-eas/phase/tree/edit/eas_freeform_edit.component';
import { EasFreeformDeleteComponent } from './view/components/testcase-eas/phase/tree/delete/eas_freeform_delete.component';
import { TestcaseEASPhaseGridComponent } from './view/components/testcase-eas/phase/phase_grid/phase_grid.component';
import { ZQLSearchComponent } from  './view/components/common/search/zql_search.component';
import { ExportComponent } from './view/components/common/export/export.component';
import { ImportComponent } from './view/components/common/import/import.component';
import { RichTextEditorComponent } from './view/components/common/editor/rich_text_editor.component';
import { ReqOperationComponent } from './view/components/requirements/operations/requirement.operations.component';
import { RequirementDetailsComponent } from './view/components/requirements/requirement_details.component';
import { RequirementsImportComponent } from './view/components/requirements/operations/requirement_import.component';
import { RequirementsImportJIRAComponent } from './view/components/requirements/operations/requirement_import_jira.component';
import { MapTestReqComponent } from './view/components/mapTestReq/map_test_req.component';

import { TestcaseCreateComponent } from './view/components/testcase/operations/testcase_create.component';
import { TestcaseDeleteComponent } from './view/components/testcase/operations/testcase_delete.component';
import { TestcaseExportComponent } from './view/components/testcase/operations/testcase_export.component';
import { TestcaseAddCreateComponent } from './view/components/testcase/operations/testcase_add_create.component';
import { TestcaseMapComponent } from './view/components/testcase/operations/testcase_map.component';
import { TceExportComponent } from './view/components/tce/operations/tce_export.component';
import { TceExecuteMultipleComponent } from './view/components/tce/operations/tce_execute_multiple.component';
import { ZephyrSearchComponent } from  './view/components/common/search/zephyr_search.component';
import { TcrBulkOperaionsComponent } from './view/components/tcr/operations/tcr_bulk_operations.component';
import { TceBulkOperationsComponent } from './view/components/tce/operations/tce_bulk_operations.component';
import { TestcaseImportComponent } from './view/components/testcase/operations/testcase_import.component';
import { TcrCreateTestcaseComponent } from './view/components/tcr/operations/tcr_create_testcase.component';
import { TcrBulkEditComponent } from './view/components/tcr/operations/tcr_bulk_edit.component';
import { TceBulkEditComponent } from './view/components/tce/operations/tce_bulk_edit.component';
import { TcrGridComponent } from './view/components/tcr/tcr_grid.component';
import { TcrTreeComponent } from './view/components/tcr/tree/tcr_tree.component';
import { ListDetailViewComponent } from './view/components/common/list_detail/list_detail_view.component';
import { EasAddCycleComponent } from './view/components/testcase-eas/tree/add/eas_addCycle.component';
import { EasAddPhaseComponent } from './view/components/testcase-eas/tree/add/eas_addPhase.component';
import { EasEditCycleComponent } from './view/components/testcase-eas/tree/edit/eas_editCycle.component';
import { EasEditPhaseComponent } from './view/components/testcase-eas/tree/edit/eas_editPhase.component';
import { EasPhaseExportComponent } from './view/components/testcase-eas/phase/tree/export/eas_phase_export.component';
import { EasCloneCycleComponent } from './view/components/testcase-eas/tree/clone/eas_cloneCycle.component';
import { EasDeleteNodeComponent } from './view/components/testcase-eas/tree/delete/eas_deleteNode.component';
import { EasExportNodeComponent } from './view/components/testcase-eas/tree/export/eas_exportNode.component';
import { TestcaseEASFreeFormSearchComponent } from './view/components/testcase-eas/phase/freeform/add/testcase_eas_add_search.component';
import { TestcaseEASFreeFormBrowseComponent } from './view/components/testcase-eas/phase/freeform/add/testcase_eas_add_browse.component';
import { TestcaseEASFreeFormCyclesComponent } from './view/components/testcase-eas/phase/freeform/add/testcase_eas_add_cycles.component';
import { TestDistChartDirective } from './view/directives/charts/test_dist_chart.directive';
import { ZQLProjectReleaseSelectionComponent } from  './view/components/dashboard/gadgets/project_release_selection_gadget.component';

import { TestcasePrimaryNavComponent } from './view/components/testcase/testcase_primary_nav.component';
import { TestcaseDetailsComponent } from  './view/components/testcase/testcase_details.component';
import { TestcaseStepGridComponent } from  './view/components/testcase/testcase_step_grid.component';
import { TestcaseExecutionDetailsComponent } from  './view/components/testcase/testcase_execution_details.component';
import { TestcaseStepDetailsComponent } from  './view/components/testcase/testcase_step_details.component';
import { TestcaseAttachmentsComponent } from  './view/components/testcase/testcase_attachments.component';
import { TestcaseRequirementsComponent } from  './view/components/testcase/testcase_requirements.component';
import { TestcaseHistoryComponent } from  './view/components/testcase/testcase_history.component';
import { TestcasePeopleComponent } from  './view/components/testcase/testcase_people.component';
import { TestcaseExecutionPeopleComponent } from  './view/components/testcase/testcase_execution_people.component';
import { TestcaseAutomationComponent } from  './view/components/testcase/testcase_automation.component';
import { TestcaseTimeComponent } from  './view/components/testcase/testcase_time.component';
import { TestcaseExecutionTimeComponent } from  './view/components/testcase/testcase_execution_time.component';
import { TestcaseCustomFieldComponent } from  './view/components/testcase/testcase_customfield.component';
import { ExpanderDirective } from './view/directives/expander/expander.directive';
import { CustomFieldComponent } from './view/components/common/customfield/customfield.component';
import { UserDetailComponent } from './view/components/common/user/user_detail.component';
import { AttachmentComponent } from './view/components/common/attachment/attachment.component';
import { AttachmentsComponent } from './view/components/common/attachments/attachments.component';

import { AboutComponent } from './view/components/common/about/about.component';
import { ProjectsComponent } from './view/components/projects/projects.component';
import { ReleaseComponent } from './view/components/release/release.component';
import { TestcaseComponent } from './view/components/testcase/testcase.component';
import { LoginComponent } from './view/components/login/login.component';
import { LoginSSOComponent } from './view/components/login/loginSSO.component';
import { UserComponent } from './view/components/user/user.component';
import { TcrComponent } from './view/components/tcr/tcr.component';
import { AutomationQualityComponent } from './view/components/quality_trends/aq/aq.component';
import { TcrGlobalTreeComponent } from './view/components/tcr/global_tree/tcr_global_tree.component';
import { RequirementsComponent } from './view/components/requirements/requirements.component';
import { ReqAddNodeComponent } from './view/components/requirements/tree/add/req_addNode.component';
import { ReqSyncNodeComponent } from './view/components/requirements/tree/sync/req_syncNode.component';
import { ReqRenameNodeComponent } from './view/components/requirements/tree/rename/req_renameNode.component';
import { ReqDeleteNodeComponent } from './view/components/requirements/tree/delete/req_deleteNode.component';
import { AdminComponent } from './view/components/admin/admin.component';
import { ReleaseSetupComponent } from './view/components/release_setup/release_setup.component';
import { AddReleaseComponent } from './view/components/release_setup/add_release/add_release.component';
import { TestcaseEASComponent } from './view/components/testcase-eas/testcase-eas.component';
import { TestcaseExecutionComponent } from './view/components/tce/testcase-execution.component';
import { ProjectComponent } from './view/components/projects/project.component';
import { SystemConfigComponent } from './view/components/admin/system-configuration/system-configuration.component';
import { SystemAdminComponent } from './view/components/admin/system-admin/system-admin.component';
import { UserAuthComponent } from './view/components/admin/user-auth/user-auth.component';
import { DefectTrackingIntegrationComponent } from './view/components/admin/defect-tracking/defect-tracking-integration.component';
import { CustomizationsComponent } from './view/components/admin/customizations/customizations.component';
import { RolesModalComponent } from './view/components/admin/customizations/roles/roles.component';
import { FieldsModalComponent } from './view/components/admin/customizations/fields/fields.component';
import { EstimatedTimeModalComponent } from './view/components/admin/customizations/estimated_time/estimated_time.component';
import { SchedulingModalComponent } from './view/components/admin/customizations/scheduling/scheduling.component';
import { HistoryModalComponent } from './view/components/admin/customizations/history/history.component';
import { MiscellaneousModalComponent } from './view/components/admin/customizations/miscellaneous/miscellaneous.component';
import { ExecutionStatusModalComponent } from './view/components/admin/customizations/execution_status/execution_status.component';
import { AboutZephyrComponent } from './view/components/admin/about-zephyr/about-zephyr.component';
import { TestCaseEASCycleComponent } from './view/components/testcase-eas/cycle/testcase-eas-cycle.component';
import { TestcaseEASPhaseComponent } from './view/components/testcase-eas/phase/testcase-eas-phase.component';
import { ReleaseSetupDetailsComponent } from './view/components/release_setup/release_setup_details/release_setup_details.component';
import { CloneReleaseComponent } from './view/components/release_setup/clone_release/clone_release.component';
import { ReleaseFormComponent } from './view/components/release_setup/release_form/release_form.component';
import { ChangePasswordComponent} from './view/components/common/change_password/change_password.component';
import { ResetPasswordComponent} from './view/components/common/reset_password/reset_password.component';
import { ProjectSetupComponent } from './view/components/project_setup/project_setup.component';
import { ProjectSetupDetailsComponent } from './view/components/project_setup/project_setup_details/project_setup_details.component';
import { ProjectFormComponent } from './view/components/project_setup/project_form/project_form.component';
import { ResourceManagementComponent } from './view/components/resource_management/resource_management.component';
import { AddResourceComponent } from './view/components/resource_management/add_resource/add_resource.component';
import { ResourceManagementDetailsComponent } from './view/components/resource_management/resource_management_details/resource_management_details.component';
import { TestcaseTimeSeriesChartComponent } from './view/components/common/chart/testcase_time_series.component';

import { TcrAddNodeComponent } from './view/components/tcr/tree/add/tcr_addNode.component';
import { TcrRenameNodeComponent } from './view/components/tcr/tree/rename/tcr_renameNode.component';
import { TcrDeleteNodeComponent } from './view/components/tcr/tree/delete/tcr_deleteNode.component';
import { FindAndAddComponent } from './view/components/tcr/tree/find_and_add/find_and_add.component';
import { CalendarComponent } from './view/components/common/calendar/calendar.component';
import { EstimatedTimeComponent } from './view/components/common/estimated_time/estimated_time.component';
import { NotificationsComponent } from './view/components/notifications/notifications.component';
import { NotificationListComponent } from './view/components/notifications/notification.list.component';

import { ListParserPipe } from './view/pipes/list_parser.pipe';
import { TraceabilityDefectsPipe } from './view/pipes/traceablitity_defects.pipe';
import { InlineEditPipe } from './view/pipes/inline_edit.pipe';
import { GridPipe } from './view/pipes/grid.pipe';
import { ObjectKeyResolvePipe } from './view/pipes/object_key_pipe';
import { SafeHtmlPipe } from './view/pipes/safe.html.pipe';
import { TrimString } from './view/pipes/trim_string.pipe';
import { TimeParserPipe } from './view/pipes/time_parser.pipe';
import { LinkPipe } from './view/pipes/link.pipe';
import { DeepCopy } from './view/pipes/deep_copy.pipe';
import { ObjectParserPipe } from './view/pipes/object_parser.pipe';
import { CheckboxPipe } from './view/pipes/checkbox.pipe';
import { GridActionsPipe } from './view/pipes/grid_actions.pipe';
import { ImportConstantsPipe } from './view/pipes/import_constants.pipe';
import { SanitizationPipe } from './view/pipes/sanitization.pipe';
// import {NgStringPipesModule} from 'ng2-pipes/src/app/pipes';
import { ShortenPipe } from 'ng2-pipes/src/app/pipes/string/shorten';

//DTS
import {DefectTrackingComponent} from './view/components/defects/defect_tracking/defect_tracking.component';
import {DefectLinkComponent} from './view/components/defects/defect_link/defect_link.component';
import {DefectSummaryComponent} from './view/components/defects/defect_tracking/summary/defect_summary.component';
import {DefectTrackingSearchComponent} from './view/components/defects/defect_tracking/search/defect_tracking_search.component';
import {DefectExportComponent} from './view/components/defects/defect_tracking/search/export/defect_export.component';
import {DefectsAdvancedSearchComponent} from './view/components/defects/defect_tracking/search/advanced/defects_advanced_search.component';
import {DefectsAdvancedSearchFinderComponent} from './view/components/defects/defect_tracking/search/advanced/defects_advanced_search_finder.component';
import {DefectsBasicSearchComponent} from './view/components/defects/defect_tracking/search/basic/defects_basic_search.component';
import {DefectBasicDetailComponent} from './view/components/defects/defect_tracking/details/basic/defect_basic_detail.component';
import {DefectAdvancedDetailComponent} from './view/components/defects/defect_tracking/details/advanced/defect_advanced_detail.component';
import {CurrentlyLinkedDefectsComponent} from './view/components/defects/defect_link/currently_linked/currently_linked_defects.component';
import {UpdateDefectUserComponent} from './view/components/defects/defect_tracking/update_user/update_defect_user.component';
import {JQLComponent} from './view/components/common/jql/jql.component';
import {CreateDefectFormComponent} from './view/components/defects/defect_link/create_defect/create_defect_form.component';
import {CDArrayComponent} from './view/components/defects/defect_link/create_defect/fields/cd_array.component';
import {CDUserComponent} from './view/components/defects/defect_link/create_defect/fields/cd_user.component';
import {CDTextComponent} from './view/components/defects/defect_link/create_defect/fields/cd_text.component';
import {CDLabelComponent} from './view/components/defects/defect_link/create_defect/fields/cd_label.component';
import {CDDateComponent} from './view/components/defects/defect_link/create_defect/fields/cd_date.component';
import {CDCommentsComponent} from './view/components/defects/defect_link/create_defect/fields/cd_comments.component';
import {CDOptionWithChildComponent} from './view/components/defects/defect_link/create_defect/fields/cd_optionwithchild.component';
import {DefectBulkEditComponent} from './view/components/defects/defect_tracking/search/bulkEdit/defect_bulk_edit.component';
import {FileNewDefectModalComponent} from './view/components/defects/defect_tracking/file_new_defect_modal/file_new_defect_modal.component';
import {FileNewDefectComponent} from './view/components/defects/defect_link/create_defect/file_new_defect.component';


import {ZephyrEventService} from './services/zephyr.event.service';
import {ZephyrErrorHandler} from './services/error.handler.service';
import {EventHttpService} from './services/event-http.service';
import {SlimLoadingBarModule, SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {ProjectStatusGadgetComponent} from './view/components/dashboard/gadgets/project_status/project_status.component';
import {ReleaseDefectsStatusGadgetComponent} from './view/components/dashboard/gadgets/release_defects_status/release_defects_status.component';
import {EscapeHTMLPipe} from './view/pipes/escape_html.pipe';
import {FormDirtyDialogComponent} from './view/components/form_dirty_dialog/form_dirty_dialog.component';
import {ReleaseStatusExecutionProgressGadgetComponent} from './view/components/dashboard/gadgets/release_status_execution_progress/release_status_execution_progress.component';
import {ResourceFormComponent} from './view/components/resource_management/resource_form.component';
import {PreferenceFormComponent} from './view/components/defects_admin/defects_admin_form.component';
import {ReleaseStatusOpenDefectsGadgetComponent} from './view/components/dashboard/gadgets/release_status_open_defects/release_status_open_defects.component';
import {GadgetContentModule1Component} from './view/components/common/module-gadget-1/module-gadget-1';
import {InlineOptionsComponent} from './view/components/common/inline-options/inline-options';
import {InlineTableComponent} from './view/components/common/inline-table/inline-table';
import {ReleaseStatusExecutionOverviewGadgetComponent} from './view/components/dashboard/gadgets/release_status_execution_overview/release_status_execution_overview.component';
import {BarChartComponent} from './view/components/common/chart/bar/bar_chart';
import {ReloginDialogComponent} from './view/components/relogin-dialog/relogin_dialog.component';
import {ReleaseStatusAutomationByPhaseTagGadgetComponent} from './view/components/dashboard/gadgets/release_status_automation_by_phase_tag/release_status_automation_by_phase_tag';

import {ReleaseRequirementsTraceabilityComponent} from './view/components/dashboard/gadgets/release_requirements_traceablity/release_requirements_traceablity.component';
import {DefectsAdminComponent} from './view/components/defects_admin/defects_admin.component';
import {ReleaseDailyPulseComponent} from "./view/components/dashboard/gadgets/release_daily_pulse/release_daily_pulse.component";
import {ReleaseStatusExecutionRemainingGadgetComponent} from './view/components/dashboard/gadgets/release_status_execution_remaining/release_status_execution_remaining';

import {LineChartAqComponent} from "./view/components/quality_trends/aq/charts/aq-charts.component";
import {DateRangePickerComponent} from "./view/components/common/date_range_picker/date_range_picker.component";
import {GadgetMetadataDetailsComponent} from "./view/components/common/gadget_metadata_details/gadget_metadata_details.component";
import {ToastrService} from "./services/toastr.service";
import {InlineTableZQLComponent} from "./view/components/common/inline-table-zql/inline-table-zql";
import {DrillDownBarChartComponent} from "./view/components/common/chart/drilldown-stacked-bar/drilldown-stacked-bar";

import { ZautomationComponent } from './view/components/zautomation/zautomation.component';
import { QualityTrendsComponent } from './view/components/quality_trends/quality_trends.component';
import { PipComponent } from './view/components/quality_trends/pip/pip.component';
import { aa1Component } from './view/components/quality_trends/aa1/aa1.component';
import { PaComponent } from './view/components/quality_trends/pa/pa.component';
import {MultiSelectComponent} from "./view/components/common/multi-select/multi-select.component";
import { PouchDBPrefsServices } from "./services/pouch.db.service";
import {CoverageGridComponent} from "./view/components/common/coverage-grid/coverage-grid.component";
import { InvisibleDirective } from "./view/components/common/invisible/invisible.directive";
import { ReindexHealthModalComponent } from './view/components/admin/customizations/reindex_health/reindex_health.component';
import {LineChartComponent} from "./view/components/common/chart/line/line_chart";

//import { APP_ROUTER_PROVIDERS } from './utils/constants/router-config.constants';

type StoreType = {
  rootState: {
	  [key: string]: any
  },
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};


export function httpClientFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, loadingService: SlimLoadingBarService): Http {
	return new EventHttpService(xhrBackend, requestOptions, loadingService);
}


@NgModule({
  declarations: [AppComponent,
                    CustomContextMenuComponent,
                    ModalComponent,
                    TabsComponent,
                    EmptyURLComponent,
                    TopNavComponent,
                    FooterComponent,
                    MessageComponent,
                    LeftNavComponent,
                    ProjectLeftNavComponent,
                    AdminLeftNavComponent,
                    InlineEditComponent,
                    AutosizeDirective,
                    InvisibleDirective,
                    InlineRowsEditComponent,
                    GridComponent,
                    InputFieldComponent,
                    TextareaFieldComponent,
                    SelectFieldComponent,
                    ValidationDirective,
                    InlineDialogDirective,
					InlineTableDirective,
                    InlineCalendarDirective,
                    DateRangePickerComponent,
                    PositionCalendarDirective,
                    SelectComponent,
                    MultiSelectComponent,
                    TestcasePrimaryNavComponent,
                    ProjectDetailsComponent,
                    ProjectReleasesComponent,
                    ProjectTeamLocationComponent,
                    ProjectNewsComponent,
                    ProjectTeamComponent,
                    ProjectLocationComponent,
                    ContentModule1Component,
                    GadgetContentModuleComponent,
                    GadgetContentModule1Component,
                    ReleaseAutomationStatusGadgetComponent,
                    InlineTableComponent,
                    InlineTableZQLComponent,
                    ChangePasswordComponent,
                    ResetPasswordComponent,
                    PieChartDirective,
                    BarChartDirective,
                    LineChartAqComponent,
                    LineChartComponent,
                    RequirementCreateComponent,
                    RequirementDeleteComponent,
                    RequirementExportComponent,
                    ReleaseDetailsComponent,
                    ReleaseCalenderComponent,
                    ReleaseReportComponent,
                    BreadCrumbComponent,
                    JobStatusComponent,
                    UnselectedSelectedListComponent,
                    TestcaseEASFreeFormAddComponent,
                    EasFreeformAddComponent,
                    EasFreeformEditComponent,
                    EasFreeformDeleteComponent,
                    TestcaseEASPhaseGridComponent,
                    TreeComponent,
                    ZQLSearchComponent,
                    ExportComponent,
                    ImportComponent,
                    ReqOperationComponent,
                    RichTextEditorComponent,
                    RequirementDetailsComponent,
                    RequirementsImportComponent,
                    RequirementsImportJIRAComponent,
                    MapTestReqComponent,

                    DashboardComponent,
                    DashboardGadgetComponent,
                    DashboardFormComponent,
                    DashboardsComponent,
                    ReleaseTestcaseStatusGadgetComponent,
                    ReleaseStatusRequirementsGadgetComponent,
                    ProjectStatusGadgetComponent,
                    ReleaseStatusExecutionProgressGadgetComponent,
                    ReleaseStatusOpenDefectsGadgetComponent,
                    ReleaseStatusExecutionOverviewGadgetComponent,
                    ReportsComponent,
                    TCEPGraphComponent,
                    TCEPPhaseComponent,


                    TestcaseCreateComponent,
                    TestcaseDeleteComponent,
                    TestcaseExportComponent,
                    TceExportComponent,
                    TceExecuteMultipleComponent,
                    TcrCreateTestcaseComponent,
                    TestcaseAddCreateComponent,
                    TestcaseMapComponent,
                    TcrBulkEditComponent,
                    TceBulkEditComponent,
                    ZephyrSearchComponent,
                    TcrBulkOperaionsComponent,
                    TceBulkOperationsComponent,
                    TestcaseImportComponent,
                    TcrGridComponent,
                    TcrTreeComponent,
                    ListDetailViewComponent,
                    EasAddCycleComponent,
                    EasAddPhaseComponent,
                    EasEditCycleComponent,
                    EasEditPhaseComponent,
                    EasCloneCycleComponent,
                    EasDeleteNodeComponent,
                    EasExportNodeComponent,
                    TestcaseEASFreeFormSearchComponent,
                    TestcaseEASFreeFormBrowseComponent,
                    TestcaseEASFreeFormCyclesComponent,
                    TestcaseDetailsComponent,
                    TestcaseStepDetailsComponent,
                    TestcaseAttachmentsComponent,
                    AttachmentsComponent,
                    TestcaseRequirementsComponent,
                    TestcaseHistoryComponent,
                    TestcasePeopleComponent,
                    TestcaseExecutionPeopleComponent,
                    TestcaseAutomationComponent,
                    TestcaseTimeComponent,
                    TestcaseExecutionTimeComponent,
                    TestcaseCustomFieldComponent,
                    TestcaseStepGridComponent,
                    TestcaseExecutionDetailsComponent,
                    ExpanderDirective,
                    CustomFieldComponent,
                    UserDetailComponent,
                    ProjectComponent,
                    AboutComponent,
                    ProjectsComponent,
                    ReleaseComponent,
                    TestcaseComponent,
                    LoginComponent,
                    LoginSSOComponent,
                    AttachmentComponent,
                    UserComponent,
                    TcrComponent,
                    TcrGlobalTreeComponent,
                    AutomationQualityComponent,
                    RequirementsComponent,
                    AdminComponent,
                    ReleaseSetupComponent,
                    AddReleaseComponent,
                    TestcaseEASComponent,
                    TestcaseExecutionComponent,
                    SystemConfigComponent,
                    SystemAdminComponent,
                    UserAuthComponent,
                    DefectTrackingIntegrationComponent,
                    CustomizationsComponent,
                    RolesModalComponent,
                    FieldsModalComponent,
                    EstimatedTimeModalComponent,
                    SchedulingModalComponent,
                    HistoryModalComponent,
                    MiscellaneousModalComponent,
                    ExecutionStatusModalComponent,
                    AboutZephyrComponent,
                    TestCaseEASCycleComponent,
                    TestcaseEASPhaseComponent,
                    ReleaseSetupDetailsComponent,
                    CloneReleaseComponent,
                    ReleaseFormComponent,
                    ProjectSetupComponent,
                    ProjectSetupDetailsComponent,
                    ProjectFormComponent,
                    ResourceManagementComponent,
                    AddResourceComponent,
                    ResourceManagementDetailsComponent,
                    PaginatorComponent,

                    CoverageGridComponent,

                    ReqAddNodeComponent,
                    ReqRenameNodeComponent,
                    ReqDeleteNodeComponent,
                    ReqSyncNodeComponent,

                    TcrAddNodeComponent,
                    TcrRenameNodeComponent,
                    TcrDeleteNodeComponent,
                    FindAndAddComponent,
                    CalendarComponent,
                    EstimatedTimeComponent,

                    NotificationsComponent,
                    NotificationListComponent,

                    ZQLSearchReportComponent,
                    TestCaseDistByPhaseComponent,
                    ZQLProjectReleaseSelectionComponent,
                    TestDistChartDirective,
                    TestcaseTimeSeriesChartComponent,
                    EasPhaseExportComponent,

                    DefectsAdminComponent,
                    PreferenceFormComponent,
                    DefectTrackingComponent,
                    DefectLinkComponent,
                    DefectSummaryComponent,
                    DefectTrackingSearchComponent,
                    DefectExportComponent,
                    DefectsAdvancedSearchComponent,
                    DefectsAdvancedSearchFinderComponent,
                    DefectsBasicSearchComponent,
                    DefectBasicDetailComponent,
                    DefectAdvancedDetailComponent,
                    CurrentlyLinkedDefectsComponent,
                    UpdateDefectUserComponent,
                    JQLComponent,
                    CreateDefectFormComponent,
                    CDArrayComponent,
                    CDUserComponent,
                    CDTextComponent,
                    CDLabelComponent,
                    CDDateComponent,
                    CDCommentsComponent,
                    CDOptionWithChildComponent,
                    DefectBulkEditComponent,
                    FileNewDefectModalComponent,
                    FileNewDefectComponent,
                    FormDirtyDialogComponent,
                    ResourceFormComponent,
                    InlineOptionsComponent,

                    TrimString,
                    ListParserPipe,
                    TraceabilityDefectsPipe,
                    InlineEditPipe,
                    GridPipe,
                    ObjectKeyResolvePipe,
                    ShortenPipe,
                    TimeParserPipe,
                    SafeHtmlPipe,
                    LinkPipe,
                    DeepCopy,
                    ObjectParserPipe,
                    CheckboxPipe,
                    GridActionsPipe,
                    ImportConstantsPipe,
                    SanitizationPipe,
                    EscapeHTMLPipe,
                    ReleaseDefectsStatusGadgetComponent,
                    ReleaseStatusAutomationByPhaseTagGadgetComponent,
                    ReleaseRequirementsTraceabilityComponent,
                    GadgetMetadataDetailsComponent,
                    BarChartComponent,
                    DrillDownBarChartComponent,
                    ReleaseDailyPulseComponent,
                    ReloginDialogComponent,
                    ReleaseStatusExecutionRemainingGadgetComponent,
                    ZautomationComponent,
                    ReindexHealthModalComponent,
                    QualityTrendsComponent,
                    PaComponent,
                    PipComponent,
                    aa1Component,
                    ZeCounterComponent
                  ],
     entryComponents: [EasAddPhaseComponent,
                       EasEditCycleComponent,
                       ReleaseStatusRequirementsGadgetComponent,
                       ReleaseAutomationStatusGadgetComponent,
                       TcrAddNodeComponent,
                       TcrRenameNodeComponent,
                       TcrDeleteNodeComponent,
                       ReqAddNodeComponent,
                       ReqRenameNodeComponent,
                       ReqDeleteNodeComponent,
                       ReqSyncNodeComponent,
                       EasEditPhaseComponent,
                       EasCloneCycleComponent,
                       EasDeleteNodeComponent,
                       EasExportNodeComponent,
                       ExportComponent,
                       EasFreeformAddComponent,
                       EasFreeformEditComponent,
                       EasFreeformDeleteComponent,
                       EasAddCycleComponent,
                       ZQLSearchReportComponent,
                       TestCaseDistByPhaseComponent,
                       FindAndAddComponent,
                       ReleaseDailyPulseComponent,
                       EasPhaseExportComponent,
                       ReleaseRequirementsTraceabilityComponent,
                       ReleaseTestcaseStatusGadgetComponent,
                       ProjectStatusGadgetComponent,
                       ReleaseDefectsStatusGadgetComponent,
                       DashboardGadgetComponent,
                       ReleaseStatusExecutionProgressGadgetComponent,
                       ReleaseStatusOpenDefectsGadgetComponent,
                       ReleaseStatusExecutionOverviewGadgetComponent,
                       ReleaseStatusAutomationByPhaseTagGadgetComponent,
                       BarChartComponent,
                       DrillDownBarChartComponent,
                       ReloginDialogComponent,
                       ReleaseStatusExecutionRemainingGadgetComponent,
                       ResetPasswordComponent,
                       ZautomationComponent,
                       QualityTrendsComponent,
                       PaComponent,
                       PipComponent,
                       aa1Component,
                       LineChartAqComponent

                     ],
     imports: [
       	DatepickerModule.forRoot(),
         BrowserModule,
         FormsModule,
         ReactiveFormsModule,
         ChartsModule,
         HttpModule,
         RouterModule.forRoot(ROUTES_MAIN, { useHash: false }),
         SlimLoadingBarModule.forRoot(),
         NvD3Module,
         Select2Module
       ],
       schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
       providers: [    ZephyrEventService,
         EventHttpService,
         ToastrService,
    	PouchDBPrefsServices,
         CanActivateOnLoginGaurd,
         {
           provide: Http, useClass: EventHttpService, useFactory: httpClientFactory,
           deps: [XHRBackend, RequestOptions, SlimLoadingBarService]
         }
       ],

     bootstrap:    [ AppComponent ]
})

export class AppModule {
	_zephyrStore: any;
  constructor(private appRef: ApplicationRef) {
    ZephyrStore.createZephyrStore({});
  	this._zephyrStore = ZephyrStore.getZephyrStore();
  }

  public hmrOnInit(store: StoreType) {
  	let state = this._zephyrStore.getState();
    if (!store || !store.rootState) {
    	return;
    }
    // restore state by dispatch a SET_ROOT_STATE action
    if (store.rootState) {
      this._zephyrStore.dispatch({
        type: 'SET_ROOT_STATE',
        data: store.rootState
      });
    }
    if ('restoreInputValues' in store) {
    	store.restoreInputValues();
    };
    this.appRef.tick();
    document.body.removeChild(document.getElementById('hmrLoader'));
    Object.keys(store).forEach(prop => delete store[prop]);
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
	let state = this._zephyrStore.getState();

    Object.assign(store, {
    	rootState: state,
	    disposeOldHosts: createNewHosts(cmpLocation),
	    restoreInputValues: createInputTransfer()
    });
    removeNgStyles();

  	let hmrIndicator = document.createElement("div");
  	hmrIndicator.id = 'hmrLoader';
  	hmrIndicator.appendChild(document.createTextNode("Hot Module Replacement in action.."));
  	document.body.appendChild(hmrIndicator);
  }

  public hmrAfterDestroy(store: StoreType) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;

  }
}
