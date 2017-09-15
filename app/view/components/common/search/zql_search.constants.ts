declare var $: any;

export const ZQL_METADATA_KEYS = {
    'TESTCASE': 'testcase',
    'REQUIREMENT': 'requirement',
    'TEST_SCHEDULE': 'testSchedule'
};

export const ZQL_VALUES_KEYS = {
    'PARTIAL_TEXT': 'partialtext',
    'RELEASE_ID': 'releasid',
    'OFFSET': 'offset',
    'PAGE_SIZE': 'pagesize'
};

export const ZQL_CONSTANTS = {
    'PAGE_SIZE': 10,
    'INITIAL_OFFSET': 0,
    'ENTITY_NAME': 'entityName',
    'NAME': 'name',
    'DATA_TYPE': 'dataType',
    'LOOKUP': 'lookup',
    'LOOKUP_KEY': 'lookupKey',
    'VISIBLE': 'visible',
    'OPERATOR_TO_FIELD_MAP': 'operatorToFieldMap',
    'OPERATORS': 'operators',
    'PARSE_VALUE': 'value',
    'POSITION_TOP': 'top',
    'testcase': 'ZEPHYR_TESTCASE_FILTERS',
    'requirement': 'ZEPHYR_REQUIREMENT_FILTERS',
    'testSchedule': 'ZEPHYR_TEST_SCHEDULE_FILTERS'
};

export const AUTOCOMPLETE_KEY_CODES = [
    $.ui.keyCode.ENTER,
    $.ui.keyCode.BACKSPACE,
    $.ui.keyCode.ESCAPE,
    $.ui.keyCode.TAB,
    $.ui.keyCode.PAGE_UP,
    $.ui.keyCode.PAGE_DOWN
];
