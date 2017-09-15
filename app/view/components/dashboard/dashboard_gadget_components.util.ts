/**
 * File to configure the reports, trends, metrics
 */
import {ZQLSearchReportComponent} from './gadgets/zql/zql_report.component';
import {TestCaseDistByPhaseComponent} from './gadgets/testcase_dist_by_phase.component';
import {ReleaseStatusRequirementsGadgetComponent} from './gadgets/release_status_requirements/release_status_requirements.component';
import {ReleaseTestcaseStatusGadgetComponent} from './gadgets/release_status_testcases/release_status_testcases.component';
import {ReleaseAutomationStatusGadgetComponent} from './gadgets/release_automation_status/release_automation_status.component';
import {ProjectStatusGadgetComponent} from './gadgets/project_status/project_status.component';
import {ReleaseDefectsStatusGadgetComponent} from './gadgets/release_defects_status/release_defects_status.component';

import {ReleaseStatusExecutionProgressGadgetComponent} from
'./gadgets/release_status_execution_progress/release_status_execution_progress.component';
import {ReleaseStatusOpenDefectsGadgetComponent} from './gadgets/release_status_open_defects/release_status_open_defects.component';
import {ReleaseStatusExecutionOverviewGadgetComponent}
  from './gadgets/release_status_execution_overview/release_status_execution_overview.component';
import {ReleaseStatusAutomationByPhaseTagGadgetComponent} from
  './gadgets/release_status_automation_by_phase_tag/release_status_automation_by_phase_tag';

import {ReleaseRequirementsTraceabilityComponent} from
  './gadgets/release_requirements_traceablity/release_requirements_traceablity.component';

const SYSTEM_TYPE_4 = 4;
const SYSTEM_TYPE_1 = 1;
import {ZephyrStore} from '../../../store/zephyr.store';
import {ReleaseDailyPulseComponent} from "./gadgets/release_daily_pulse/release_daily_pulse.component";
import {ReleaseStatusExecutionRemainingGadgetComponent} from
  './gadgets/release_status_execution_remaining/release_status_execution_remaining';

export var getGadgetComponentByName = function(name) {
    let gadgetComponents = {
        'ZQLSearchReportComponent': ZQLSearchReportComponent,
        'ReleaseStatusRequirementsGadgetComponent': ReleaseStatusRequirementsGadgetComponent,
        'ReleaseTestcaseStatusGadgetComponent': ReleaseTestcaseStatusGadgetComponent,
        'ProjectStatusGadgetComponent': ProjectStatusGadgetComponent,
        // 'ProjectStatusGadgetComponent': ReleaseRequirementsTraceabilityComponent,
        'ReleaseAutomationStatusGadgetComponent': ReleaseAutomationStatusGadgetComponent,
        'ReleaseRequirementsTraceabilityComponent': ReleaseRequirementsTraceabilityComponent,
        'ReleaseStatusExecutionProgressGadgetComponent': ReleaseStatusExecutionProgressGadgetComponent,
        'ReleaseDefectsStatusGadgetComponent' : ReleaseDefectsStatusGadgetComponent,
        'ReleaseStatusOpenDefectsGadgetComponent': ReleaseStatusOpenDefectsGadgetComponent,
        'ReleaseStatusExecutionOverviewGadgetComponent': ReleaseStatusExecutionOverviewGadgetComponent,
        'ReleaseStatusAutomationByPhaseTagGadgetComponent': ReleaseStatusAutomationByPhaseTagGadgetComponent,
        'ReleaseDailyPulseComponent' : ReleaseDailyPulseComponent,
        'ReleaseStatusExecutionRemainingGadgetComponent': ReleaseStatusExecutionRemainingGadgetComponent
    };
    return gadgetComponents[name];
};


export function checkDefectTrackingEnabled() {
  let _zephyrStore = ZephyrStore.getZephyrStore();

  let defectsystem = _zephyrStore.getState().global.defectSystem;

  if(!defectsystem || defectsystem['systemType'] != SYSTEM_TYPE_4 || defectsystem['systemType'] != SYSTEM_TYPE_1) {
    return false;
  } else {
    return true;
  }
}
