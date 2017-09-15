import {Component, Input} from '@angular/core';
declare var _: any;

@Component({
    selector: 'zee-gadget-module',
    templateUrl: 'module.html'
})
export class GadgetContentModuleComponent {
    @Input() summary;
    isGreaterThanTwo: any;
    isExpanded: boolean = false;
    constructor() {

        this.isGreaterThanTwo = () => {
            let flag = false;
            if (this.summary) {
                this.summary.groups.map((group, index) => {
                    if (group.items) {
                        flag = flag || group.items.length > 2;
                    }
                });
            }
            return flag;
        };

        if (this.summary) {
            this.summary.forEach((group, index) => {
                this.isGreaterThanTwo = this.isGreaterThanTwo && group.items.length > 2;
            });
        }

    }

    viewAllItems() {
        this.isExpanded = !this.isExpanded;
    }
}
