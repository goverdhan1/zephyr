import { FETCH_LEFT_NAV_DATA, CLEAR_LEFT_NAV_EVENTS, SET_LEFT_NAV_PERMISSIONS,
    SET_LEFT_NAV_PROJECT_DETAILS, SET_LEFT_NAV_RELEASE_DETAILS,
    SET_LEFT_NAV_ACTIVE_ITEM} from '../utils/constants/action.types';
import {FETCH_LEFT_NAV_DATA_SUCCESS} from '../utils/constants/action.events';
declare var _, jQuery, window:any;
import {PROJECT_NAV_COLUMNS} from '../utils/constants/project_leftnav.constants';
import {ZEE_NAV_ADMIN_COLUMNS} from '../utils/constants/admin_leftnav.constants';
import {UtililtyFunctions} from '../utils/scripts/utils';

const initialState = {
    project: _.cloneDeep(PROJECT_NAV_COLUMNS),
    administration: _.cloneDeep(ZEE_NAV_ADMIN_COLUMNS),
    event: ''
};

export function leftNavReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LEFT_NAV_DATA:
            state[action.data.navType] = _.cloneDeep(initialState[action.data.navType]);
            state['event'] = FETCH_LEFT_NAV_DATA_SUCCESS;
            return state;
        case SET_LEFT_NAV_RELEASE_DETAILS:
            processProjectData(state[action.data.navType], action.data.releases);
            state['event'] = ''; // Clearing the FETCH_LEFT_NAV_DATA_SUCCESS event
            return state;
        case SET_LEFT_NAV_PROJECT_DETAILS:
            setProjectDetails(state[action.data.navType], action.data.project, action.data.activeItem);
            return state;
        case SET_LEFT_NAV_PERMISSIONS:
            let _utililtyFunctions = new UtililtyFunctions();
            state['project'] =
            _utililtyFunctions.getAllAccessibleApps(_.cloneDeep(initialState['project']));
            state['administration'] =
            _utililtyFunctions.getAllAccessibleApps(_.cloneDeep(initialState['administration']));
            return state;
        case SET_LEFT_NAV_ACTIVE_ITEM:
            updateActiveItem(state[action.data.navType], action.data.activeGroup, action.data.activeItem);
            return state;
        case CLEAR_LEFT_NAV_EVENTS:
            state['event'] = '';
            return state;
        default:
            return state;
    }
}
function processProjectData(data, releases) {
    setCurrentRelease(data);
}
function setCurrentRelease(data) {
    let _release = getCurrentReleaseFromLocalStorage();
    if(_release) {
        data.subHeader.name = _release.text;
        data.subHeader.id = _release.id;
    }
}
function getCurrentReleaseFromLocalStorage() {
    try {
        return JSON.parse(localStorage.getItem(`${window.tab}-currentRelease`));
    } catch(e) {
        return null;
    }
}

function setProjectDetails(data, project, activeItem) {
    data.header.title = project.name;
    data.header.subtitle = project.description;
    data.header.link = `/project/${project.id}`;
    data.header.isSelected = false;
    _.each(data.group, (item) => {
        if(item.key == activeItem) {
            item.isEnabled = true;
        } else {
            item.isEnabled = false;
        }
    });
}

/**
 * Update the Active item state
 */
function updateActiveItem(data, activeGroup, activeItem) {
    data.group.forEach((group) => {
        group.isEnabled = (group.key == activeGroup) ? true : false;
        if(activeItem && _.isArray(group.items)) {
            group.items.forEach((item) => {
                item.isEnabled = (item.key == activeItem) ? true : false;
            });
        }
    });
}
