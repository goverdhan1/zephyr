import {Injectable, Inject} from '@angular/core';
import * as types from '../utils/constants/action.types';
import {NewsService} from '../services/news.service';
import {Http} from '@angular/http';
import * as messageTypes from '../utils/constants/messages.types';

@Injectable()
export class NewsAction {
    private _newsService;
    constructor(@Inject(Http) private _http: any) {
        this._newsService = new NewsService(_http);
    }

    fetchNewsByProjectId(projectId) {
        return (dispatch) => {
            return this._newsService.getNewsByProjectId(projectId).subscribe((news) => {
                dispatch(this._fetchNewsByProjectId(news));
            }, (error) => {
                dispatch(this.onError(error));
            });
        };
    }
    _fetchNewsByProjectId(data) {
        return { type: types.FETCH_NEWS_BY_PROJECT_ID, data };
    }
    onError(data) {
        return {
            type: types.SHOW_TOAST,
            data: ({type: messageTypes.ERROR, data})
        };
    }
}
