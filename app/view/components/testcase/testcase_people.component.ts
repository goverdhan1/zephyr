import {Component, Input, OnDestroy} from '@angular/core';
//import {ROUTER_DIRECTIVES} from '@angular/router';
declare var _:any;

//import {ExpanderDirective} from '../../directives/expander/expander.directive';
//import {UserDetailComponent} from '../common/user/user_detail.component';
import {ZephyrStore} from '../../../store/zephyr.store';
// import {TestcaseAction} from '../../../actions/testcase.action';

// Constants
import {TESTCASE_PEOPLE} from './testcase.constant';

@Component({
	selector: TESTCASE_PEOPLE,
	templateUrl: 'testcase_people.html'
})
export class TestcasePeopleComponent implements OnDestroy {
    @Input() editable;
    people = {
        createdBy: '',
        createdOn: null
    };
    action: string = 'zee-expand';
    zephyrStore;
    unsubscribe;
    constructor() {
        this.zephyrStore = ZephyrStore.getZephyrStore();
		this.unsubscribe = this.zephyrStore.subscribe((x) => {
            this.setPeopleDetails(this.zephyrStore.getState());
		});
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    setPeopleDetails(state) {
        let _creatorId = state.testcase.testcase.testcase.creatorId;
        this.people.createdBy = _creatorId || '';
        this.people.createdOn = state.testcase.testcase.testcase.tcCreationDate || '';
    }
}
