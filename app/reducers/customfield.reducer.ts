import * as types from '../utils/constants/action.types';

declare var _;

const initialState = {
    customFields: {
        testcase: [],
        requirement: []
    },
    customFieldTypes: [],
    fieldError: {},
    event: ''
};

function parsePickList(list) {
    try {
        return list ? JSON.parse(list).map(field=>({id: field.id, text: field.text || field.value})) : [];
    } catch (e) {
       // console.log('error in parsing custom field data', e, list);
        return [];
    }
};

export function customField(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_CUSTOM_FIELDS:
            state['customFields'][action.data.fieldType] = action.data.customFields;
            return state;
        case types.FETCH_CUSTOM_FIELD_TYPES:
            state['customFieldTypes'] = action.data;
            return state;
        case types.FETCH_CUSTOM_FIELD_PICKLIST_PREFERENCE:
            let preference = action.data.preference;
            let type = action.data.fieldType;
            state.customFields[type].forEach(customField => {
                if(`${type}.${customField.fieldName}.LOV` === (preference.name || preference.key)) {
                    customField['fieldValues'] = parsePickList(preference.value);
                }
            });
            return state;
        case types.ADD_CUSTOM_FIELD:
            state['customFields'][action.data.fieldType] = state['customFields'][action.data.fieldType].concat(action.data.customFields);
            return state;
        case types.DELETE_CUSTOM_FIELD:
            state['customFields'][action.data.fieldType] = state['customFields'][action.data.fieldType].filter(item => String(item.id) !== String(action.data.id));
            return state;

        case types.EDIT_CUSTOM_FIELD:
            let field = state['customFields'][action.data.fieldType].filter(item => item.fieldName === action.data.field.fieldName)[0];
            if (field) {
                Object.assign(field, action.data.field);
            }
            return state;
        case types.SHOW_UNIQUE_CUSTOM_FIELD_ERROR:
            state['event'] = 'SHOW_UNIQUE_CUSTOM_FIELD_ERROR';
            state.fieldError = action.data;
            return state;
        case types.CLEAR_CUSTOM_FIELD_EVENT:
            state['event'] = '';
            state.fieldError = {};
            return state;
        default:
            return state;
    }
}
