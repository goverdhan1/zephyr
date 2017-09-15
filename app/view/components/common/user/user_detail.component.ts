import {Component, Input, OnChanges} from '@angular/core';
import {Router} from '@angular/router';

import {ZephyrStore} from '../../../../store/zephyr.store';
declare var AJS: any, // Declaring AJS as global
    _:any;
@Component({
    selector:   'user-detail',
    template: `
        <a *ngIf="user">{{user.firstName}}&nbsp;{{user.lastName}}</a>
    `,
    styles: [
        `a {
            cursor: pointer;
        };`
    ]
})

export class UserDetailComponent implements OnChanges {
    @Input() userId: any;
    zephyrStore;
    user : any;
    constructor(public router: Router) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
    }
    ngOnChanges(changedNode) {
        let _users = this.zephyrStore.getState().global.users;
        this.userId = parseInt(this.userId);
        if(this.userId && _users.length) {
            this.user = this.getUser(_users, this.userId);
        }
    }
    navigateToUser(ev) {
        // this.router.navigate(['User', {id: this.userId}]);
    }
    getUser(users, userId) {
        let _user = _.filter(users, (user) => {
            return (user.id === userId);
        })[0];
        return _user || {'firstName': 'Unassigned',  'lastName': ''};
    }
}
