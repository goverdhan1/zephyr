import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {TestcaseTreeModel} from '../models/testcasetree.model';

declare var _:any;
// Constants
import {API_PATH, getApiPath} from '../utils/constants/api.constants';
import {getRequestHeader} from '../utils/api/api.utils';

@Injectable()
export class TestcaseService {
    public testcase: TestcaseTreeModel;
    constructor(public http: any) {
    }
    getTestcases() {
        // TODO
        // return Promise.resolve(this.testcases);
    }
    getTestcaseById(id) {
        let _testcaseByIdURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_TESTCASE_BY_ID + id;

        return this.http.get(_testcaseByIdURL, {
            headers: getRequestHeader()
        }, true).map(response => response.json());
    }
    getTestcasePathByTestcaseTreeId(tctid) {
        let _testcasePathByTCTIDURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3 + API_PATH.GET_TESTCASE_PATH_BY_TCT_ID + tctid;

        return this.http.get(_testcasePathByTCTIDURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    updateTestcaseDetailsById(testcase) {
        let _testcasePathByTCTIDURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + getApiPath('UPDATE_TESTCASE_DETAILS_BY_ID', [testcase.id]);

        return this.http.put(_testcasePathByTCTIDURL, JSON.stringify(testcase), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    deletTestcaseByTCTID(tctIds) {
        let _testcasePathByTCTIDURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + getApiPath('DELETE_TESTCASES_BY_TCTID', [tctIds]);
        let _deleteIdsURL = this.getRepeatedQueryParams('ids', tctIds);

        return this.http.delete(_testcasePathByTCTIDURL + _deleteIdsURL, {
            headers: getRequestHeader()
        }).map(response => response.json());
    }
    addTestcase(testcase) {
        let _createTestcaseURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + API_PATH.CREATE_TESTCASE;

        return this.http.post(_createTestcaseURL, JSON.stringify(testcase), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    cloneTestcase(sourceEntryId, targetEntryId, sourceItemIds, bool) {
        let _sourceItemURL = this.getRepeatedQueryParams('sourceitemids', sourceItemIds);
        let _cloneTestcaseURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
            + getApiPath('CLONE_TESTCASE', [sourceEntryId, targetEntryId]);

        if(bool) {
            _cloneTestcaseURL += _sourceItemURL;
        }

        return this.http.post(_cloneTestcaseURL, bool ? {} : JSON.stringify(sourceItemIds), {
            headers: getRequestHeader({
                'includeAcceptType': true
            })
        }).map(response => response.json());
    }
    getAllTags() {
      let _allTagsURL = API_PATH.BASE_ENDPOINT + API_PATH.API_VERSION_V3
          + getApiPath('GET_ALL_TAGS', []);

      return this.http.get(_allTagsURL, {
        headers: getRequestHeader()
      }).map(response => response.json());
    }

    /**
     * @param key
     * @param items []
     * @Output string
     * Example:
     * Input: getRepeatedQueryParams('ids', [1,2,3])
     * Output: ?ids=1&ids=2&ids=3
     */
    getRepeatedQueryParams(key, items) {
        let _itemURL = '';
        _.each(items, (_itemId, _i) => {
            _itemURL += key + '=' + _itemId;
            if((_i + 1) != items.length) {
                _itemURL += '&';
            }
            if(_i == 0) {
                _itemURL = '?' + _itemURL;
            }
        });
        return _itemURL;
    }
}
