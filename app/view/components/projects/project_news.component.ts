import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
declare var AJS: any; // Declaring AJS as global

// Constants
import {PROJECT_NEWS_COMPONENT} from './project.constant';
import {ZephyrStore} from '../../../store/zephyr.store';
import {NewsAction} from '../../../actions/news.action';

@Component({
	selector: PROJECT_NEWS_COMPONENT,
	templateUrl: 'project_news.html',
	//directives: [ROUTER_DIRECTIVES],
	viewProviders: [NewsAction]
})
export class ProjectNewsComponent {
	_newsList;
	private _zephyrStore;
	private _projectId;
    constructor(private _newsAction: NewsAction, private route: ActivatedRoute) {
		// this._projectId = params.getParam('id');
		this.route.params.subscribe(params => {
       this._projectId = params['id'];
    });
		this._zephyrStore = ZephyrStore.getZephyrStore();
		this._zephyrStore.subscribe((x) => {
			this._newsList = this._zephyrStore.getState().news;
		});
		this.getNews();
    }
	getNews() {
		this._zephyrStore.dispatch(this._newsAction.fetchNewsByProjectId(this._projectId));
	}
}
