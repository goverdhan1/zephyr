export const RELEASE_INIT_STATE = {
	name: '',
	startDate: new Date(),
	status: false,
	id: '',
	description: '',
	endDate: new Date(),
    externalSystem:''
};

export const RELEASE_CLONE_INIT_STATE = {
    targetProjectId: '',
    oldReleaseId : '',
    defaultUserId : '',
    releaseStartDate : '',
    assignment: false,
    cycle: false,
    document: false,
    execution: false,
    executionAtt: false,
    executionComment: false,
    stepExecution: false,
    stepExecutionAtt: false,
    stepExecutionComment: false,
    defectMap: false,
    requirement: false,
    reqTcMap: false,
    tcc: false,
    tcAtt: false,
    applyDateShift: false,
    reqAtt: false
};

export const CLONE_RELEASE_STEP_EXECUTION =   {
    key : 'stepExecution',
    label : 'Clone Step Execution Results',
    child : [ { key : 'stepExecutionComment',
                label : 'Step Execution Comments'
            },
            { key : 'stepExecutionAtt',
                label : 'Step Execution Attachments'
            }
    ]
};
export const CLONE_RELEASE_EXECUTION = {
    key : 'execution',
    label : 'Clone Execution Results',
    child : [ { key : 'defectMap',
                label : 'Execution-Defect Mappings'
            },
            { key : 'executionComment',
                label : 'Execution Comments'
            },
            { key : 'executionAtt',
                label : 'Execution Attachments'
            },CLONE_RELEASE_STEP_EXECUTION
    ]
};
export const CLONE_RELEASE_CYCLE_PHASE = {
    key : 'assignment' ,
    label : 'Cycle Phase Assignments' ,
    child : [CLONE_RELEASE_EXECUTION]
};
export const CLONE_RELEASE_CYCLES = {
    key : 'cycle',
    label : 'Clone Cycles',
    child : [ { key : 'applyDateShift',
                label:'Apply offset to cycles too'
            },
                CLONE_RELEASE_CYCLE_PHASE
    ]

};
export const CLONE_RELEASE_TEST_REPOSITORY = {
    key : 'tcc',
    label : 'Clone Test Repository',
    child : [
        {
            key : 'tcAtt',
            label:'Testcase Attachments'
        },
        CLONE_RELEASE_CYCLES
    ]
};
export const CLONE_RELEASE_REQUIREMENT_REPOSITORY = {
    key : 'requirement',
    label : 'Clone Requirement Repository',
    child : [{ key : 'reqTcMap',
                label : 'Requirment Testcase Mapping'
            },
            { key : 'reqAtt',
                label : 'Requirment Attachments'
            }
        ]
};
export const CLONE_RELEASE_TREE = [
    CLONE_RELEASE_TEST_REPOSITORY,
    CLONE_RELEASE_REQUIREMENT_REPOSITORY,
    {
        key : 'document',
        label : 'Clone Documents'
    }
];
