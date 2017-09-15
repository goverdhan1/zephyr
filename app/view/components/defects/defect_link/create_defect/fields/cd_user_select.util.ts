import {API_PATH, getApiPath} from '../../../../../../utils/constants/api.constants';
import {getRequestHeader} from '../../../../../../utils/api/api.utils';

export var USER_SELECT_OPTIONS = {
    ajax: {
        url: API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 +
            getApiPath('GET_SEARCH_TERM_BY_USERNAME', ['user']),
        headers: getRequestHeader({
            'includeAcceptType': true
        }, true),
        queryParams: null,
        searchParam: 'partialusername'
    }
};

