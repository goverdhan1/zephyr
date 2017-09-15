import { Routes } from '@angular/router';
import { CanActivateOnLoginGaurd } from '../../services/modules/can_activate_routes.service';
import { AboutComponent } from '../../view/components/common/about/about.component';
import { ProjectsComponent } from '../../view/components/projects/projects.component';
import { ReleaseComponent } from '../../view/components/release/release.component';
import { TestcaseComponent } from '../../view/components/testcase/testcase.component';
import { LoginComponent } from '../../view/components/login/login.component';
import { LoginSSOComponent } from '../../view/components/login/loginSSO.component';
import { UserComponent } from '../../view/components/user/user.component';
import { TcrComponent } from '../../view/components/tcr/tcr.component';
import { RequirementsComponent } from '../../view/components/requirements/requirements.component';
import { AdminComponent } from '../../view/components/admin/admin.component';
import { ReleaseSetupComponent } from '../../view/components/release_setup/release_setup.component';
import { TestcaseEASComponent } from '../../view/components/testcase-eas/testcase-eas.component';
import { TestcaseExecutionComponent } from '../../view/components/tce/testcase-execution.component';
import { ProjectComponent } from '../../view/components/projects/project.component';
import { SystemConfigComponent } from '../../view/components/admin/system-configuration/system-configuration.component';
import { SystemAdminComponent } from '../../view/components/admin/system-admin/system-admin.component';
import { UserAuthComponent } from '../../view/components/admin/user-auth/user-auth.component';
import { DefectTrackingIntegrationComponent } from '../../view/components/admin/defect-tracking/defect-tracking-integration.component';
import { CustomizationsComponent } from '../../view/components/admin/customizations/customizations.component';
import { AboutZephyrComponent } from '../../view/components/admin/about-zephyr/about-zephyr.component';
import { TestCaseEASCycleComponent } from '../../view/components/testcase-eas/cycle/testcase-eas-cycle.component';
import { TestcaseEASPhaseComponent } from '../../view/components/testcase-eas/phase/testcase-eas-phase.component';
import { ReleaseSetupDetailsComponent } from '../../view/components/release_setup/release_setup_details/release_setup_details.component';
import { CloneReleaseComponent } from '../../view/components/release_setup/clone_release/clone_release.component';
import { ProjectSetupComponent } from '../../view/components/project_setup/project_setup.component';
import { ProjectSetupDetailsComponent } from '../../view/components/project_setup/project_setup_details/project_setup_details.component';
import { ResourceManagementComponent } from '../../view/components/resource_management/resource_management.component';
import { ResourceManagementDetailsComponent } from
  '../../view/components/resource_management/resource_management_details/resource_management_details.component';
import { AutomationQualityComponent } from "../../view/components/quality_trends/aq/aq.component";
//import { AddResourceComponent } from '../../view/components/resource_management/add_resource/add_resource.component';
import { DashboardsComponent } from '../../view/components/dashboard/dashboards.component';
import { DashboardComponent } from '../../view/components/dashboard/dashboard.component';
import { DefectTrackingComponent } from '../../view/components/defects/defect_tracking/defect_tracking.component';
import { AppComponent } from '../../view/components/app/app.component';
import { EmptyURLComponent } from '../../view/components/app/empty_url.component';
import { DefectsAdminComponent } from '../../view/components/defects_admin/defects_admin.component';

import { ZautomationComponent } from '../../view/components/zautomation/zautomation.component';
import { QualityTrendsComponent } from '../../view/components/quality_trends/quality_trends.component';
import { PipComponent } from '../../view/components/quality_trends/pip/pip.component';
import { aa1Component } from '../../view/components/quality_trends/aa1/aa1.component';
import { PaComponent } from '../../view/components/quality_trends/pa/pa.component';

import { ReportsComponent } from '../../view/components/reports/reports.component';
import { TCEPPhaseComponent } from '../../view/components/reports/TCEPPhase.component';
import { TCEPGraphComponent } from '../../view/components/reports/TCEPGraph.component';

export const ROUTES_MAIN: Routes = [
  { path: '', component: EmptyURLComponent },
  { path: 'saml/sso', component: LoginSSOComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about/:id', component: AboutComponent },
  {
    path: 'project', component: ProjectsComponent,
    children: [
      { path: '', redirectTo: ':id', pathMatch: 'full' },
      { path: ':id', component: ProjectComponent }
    ], canActivate: [CanActivateOnLoginGaurd]
  },
  {
    path: 'resource_management', component: ResourceManagementComponent,
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: ResourceManagementDetailsComponent }
    ]
  },
  {
    path: 'project_setup', component: ProjectSetupComponent,
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: ProjectSetupDetailsComponent }
    ]
  },
  { path: 'defects_admin', component: DefectsAdminComponent },
  { path: 'release/:id', component: ReleaseComponent },
  { path: 'testcase/:id', component: TestcaseComponent, canActivate: [CanActivateOnLoginGaurd] },
  {
    path: 'testcase-eas', component: TestcaseEASComponent,
    children: [
      { path: '', redirectTo: 'cycle/:id', pathMatch: 'full' },
      { path: 'cycle/:id', component: TestCaseEASCycleComponent },
      { path: 'phase/:id', component: TestcaseEASPhaseComponent }
    ], canActivate: [CanActivateOnLoginGaurd]
  },
  { path: 'user/:id', component: UserComponent },
  { path: 'tcr/:id', component: TcrComponent, canActivate: [CanActivateOnLoginGaurd] },
  { path: 'tce/:id', component: TestcaseExecutionComponent, canActivate: [CanActivateOnLoginGaurd] },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'systemConfig', pathMatch: 'full' },
      { path: 'systemConfig', component: SystemConfigComponent },
      { path: 'systemAdmin', component: SystemAdminComponent },
      { path: 'userAuth', component: UserAuthComponent },
      { path: 'defectTrackingIntegration', component: DefectTrackingIntegrationComponent },
      { path: 'customizations', component: CustomizationsComponent },
      { path: 'aboutZephyr', component: AboutZephyrComponent }
    ]
  },
  {
    path: 'release_setup', component: ReleaseSetupComponent,
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: ReleaseSetupDetailsComponent },
      { path: 'clone/:id', component: CloneReleaseComponent },
      { path: 'clone', component: CloneReleaseComponent }
    ], canActivate: [CanActivateOnLoginGaurd]
  },
  { path: 'requirements/:id', component: RequirementsComponent, canActivate: [CanActivateOnLoginGaurd] },
  { path: 'dashboard/:id', component: DashboardComponent, canActivate: [CanActivateOnLoginGaurd] },
  { path: 'dashboards', component: DashboardsComponent, canActivate: [CanActivateOnLoginGaurd] },
  { path: 'dashboards/:id', component: DashboardsComponent, canActivate: [CanActivateOnLoginGaurd] },
  { path: 'defect-tracking/:id', component: DefectTrackingComponent, canActivate: [CanActivateOnLoginGaurd] },
  { path: 'zautomation/:id', component: ZautomationComponent, canActivate: [CanActivateOnLoginGaurd] },
  {
    path: 'quality-trends/:id', component: QualityTrendsComponent, canActivate: [CanActivateOnLoginGaurd],
    children: [
      { path: '', redirectTo: 'pip', pathMatch: 'full' },
      { path: 'pip', component: PipComponent },
      { path: 'aa1', component: aa1Component },
      { path: 'pa', component: PaComponent },
      { path: 'aq', component: AutomationQualityComponent }
    ]
  },
  { path: 'reports/:id', component: ReportsComponent, canActivate: [CanActivateOnLoginGaurd],
  children: [
    { path: '', redirectTo: 'tcepgraph', pathMatch: 'full' },
    { path:'tcepgraph', component: TCEPGraphComponent},
    { path:'tcepphase/:id', component: TCEPPhaseComponent}
  ]
 }
];
