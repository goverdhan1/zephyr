import {Injectable, Inject} from '@angular/core';
import * as types from '../utils/constants/action.types';

@Injectable()
export class LeftnavAction {
    fetchLeftNavDetails(type, entries) {
        let data = {
            navType: type,
            data: entries
        };
        return {type: types.FETCH_LEFT_NAV_DATA, data};
    }
    setLeftNavReleaseDetails(type, releases) {
        let data = {
            navType: type,
            releases: releases
        };
        return {type: types.SET_LEFT_NAV_RELEASE_DETAILS, data};
    }
    setLeftNavPermissions(type) {
        let data = {
            navType: type
        };
        return {type: types.SET_LEFT_NAV_PERMISSIONS, data};
    }
    setProjectDetails(type, project, activeItem) {
        let data = {
            navType: type,
            project: project,
            activeItem: activeItem
        };
        return {type: types.SET_LEFT_NAV_PROJECT_DETAILS, data};
    }
    setActiveItem(type, activeGroup, activeItem) {
        let data = {
            navType: type,
            activeGroup: activeGroup,
            activeItem: activeItem
        };
        return {type: types.SET_LEFT_NAV_ACTIVE_ITEM, data};
    }
}
