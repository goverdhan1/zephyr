import { TestCaseEASCycleComponent } from './cycle/testcase-eas-cycle.component';
import { TestcaseEASPhaseComponent } from './phase/testcase-eas-phase.component';

export const ROUTES_TESTCASE = [
    { path: '/cycle/:id', component: TestCaseEASCycleComponent },
    { path: '/phase/:id', component: TestcaseEASPhaseComponent }
];
