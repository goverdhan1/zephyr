import {TestcaseModel} from '../models/testcase.model';

export interface TestcaseTreeModel {
    id: number;
    tcrCatalogTreeId: number;
    testcase: TestcaseModel;
    revision: number;
    stateFlag: number;
    lastModifiedOn: Date;
    original: boolean;
}
