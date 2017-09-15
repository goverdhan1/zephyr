export interface TestcaseModel {
    id: number;
    name: string;
    description: string;
    priority: string;
    tag: string;
    lastModifiedOn: Date;
    creationDate: Date;
    comments: string;
    isComplex: Boolean;
    estimatedTime: number;
    writerId: number;
    creatorId: number;
    lastUpdaterId: number;
    oldId: number;
    automated: boolean;
    scriptId: number;
    scriptName: string;
    requirementIds: Array<number>;
    attachmentCount: number;
    automatedDefault: boolean;
}
