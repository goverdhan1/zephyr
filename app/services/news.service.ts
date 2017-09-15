import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {NewsModel} from '../models/news.model';
import {getRequestHeader} from '../utils/api/api.utils';
// Constants
import {API_PATH} from '../utils/constants/api.constants';

@Injectable()
export class NewsService {
    _newsList: NewsModel[];
    constructor(public http: any) {}
    getNewsByProjectId(projectId) {
        /*
         * Get news by projectId
         */
        let getNewsByProjectIdURL = API_PATH.BASE_ENDPOINT
            + API_PATH.API_VERSION_V3
            + API_PATH.GET_NEWS_BY_PROJECT_ID + projectId;

        return this.http.get(getNewsByProjectIdURL, {
            headers: getRequestHeader()
        })
        .map(response => response.json());
    }
}
