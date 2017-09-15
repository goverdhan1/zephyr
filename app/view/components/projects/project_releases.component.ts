import {Component} from '@angular/core';
import {Router} from '@angular/router';

//import {PaginationDirective} from '../../../view/directives/pagination/pagination.directive';
import {GridAction} from '../../../actions/grid.action';

// Constants
import {PROJECT_RELEASES_COMPONENT} from './project.constant';
// import {GridComponent} from '../grid/grid.component';
import {ZephyrStore} from '../../../store/zephyr.store';
import {PROJECT_RELEASE_GRID_TYPE, PROJECT_RELEASE_GRID_OPTIONS, PROJECT_RELEASE_GRID_PAGINATION} from './project_release_grid.constant';

declare var jQuery, window;

@Component({
	selector: PROJECT_RELEASES_COMPONENT,
	templateUrl: 'project_releases.html',
	//directives: [ROUTER_DIRECTIVES, GridComponent],
	// directives: [ROUTER_DIRECTIVES, GridComponent],
  	providers: [GridAction]
})
export class ProjectReleasesComponent {
    public releases;
    zephyrStore;
	releaseGridColumns: Array<Object>;
	releaseGridRows: Array<Object>;
	paginationOptions = PROJECT_RELEASE_GRID_PAGINATION;
	_releaseGridType = PROJECT_RELEASE_GRID_TYPE;
	private _gridSize;
	private _currentPage = 1;
	constructor(private _gridAction: GridAction, private router: Router) {
		this._gridSize = 50;
		this.zephyrStore = ZephyrStore.getZephyrStore();
		this.zephyrStore.subscribe(() => {
			let _state = this.zephyrStore.getState();
			this.releases = _state.release.releases;
			this.releaseGridRows = _state.release.releaseGrid.rows;
			this.releaseGridRows = this.releaseGridRows.filter(function(release) {
				return !release['status'];
			});
			this.paginationOptions = _state.release.releaseGrid.paginationOptions;
		});
		this.initializeGrid();
    }
	initializeGrid() {
		this.zephyrStore.dispatch(this._gridAction.initializeGrid({
			size: this._gridSize,
			currentPage: this._currentPage
		}, 'PROJECT_RELEASE_GRID'));
	}
	releaseGridPrevClick(value) {
		this._currentPage = value;
		this.zephyrStore.dispatch(this._gridAction.prevPage({
			size: this._gridSize,
			currentPage: this._currentPage
		}, 'PROJECT_RELEASE_GRID'));
	}
	releaseGridNextClick(value) {
		this._currentPage = value;
		this.zephyrStore.dispatch(this._gridAction.nextPage({
			size: this._gridSize,
			currentPage: this._currentPage
		}, 'PROJECT_RELEASE_GRID'));
	}
	releaseGridPageSizeChange(value) {
		this._gridSize = value;
		this._currentPage = 1;
        this.zephyrStore.dispatch(this._gridAction.initializeGrid({
			size: this._gridSize,
			currentPage: this._currentPage
		}, 'PROJECT_RELEASE_GRID'));
    }
	releaseGridPaginateByIndex(value) {
		this._currentPage = value;
        this.zephyrStore.dispatch(this._gridAction.initializeGrid({
			size: this._gridSize,
			currentPage: this._currentPage
		}, 'PROJECT_RELEASE_GRID'));
	}
	releaseGridLinkClick(target) {
		let index = jQuery(target).closest('div.flex-bar').data('index');
		let dataset = this.releaseGridRows[index];
		if(dataset && dataset['id']) {
			//Setting current release data in local-storage
			localStorage.setItem(`${window.tab}-currentRelease` , JSON.stringify({'id' :dataset['id'] , 'text':dataset['name'] }));
			this.router.navigate(['/release', dataset['id']]);
		}
	}
}
