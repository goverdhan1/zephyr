import {API_PATH, getApiPath} from '../../../utils/constants/api.constants';
import {getRequestHeader} from '../../../utils/api/api.utils';

export var TAG_SELECT_OPTIONS = {
    ajax: {
        url: API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
            getApiPath('GET_SEARCH_TERM_BY_FIELDNAME', ['TCRCatalogTreeTestcase']),
        headers: getRequestHeader({
            'includeAcceptType': true
        }, true),
        queryParams: {fieldname: 'testcase.tag', maxcount: 10},
        searchParam: 'startingwith'
    }
};

export var PRIORITY_SELECT_OPTIONS = {
    width: '100%'
};
