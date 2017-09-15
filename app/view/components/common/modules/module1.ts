import {Component, Input} from '@angular/core';
declare var _: any;

@Component({
    selector: 'zui-summary-box',
    templateUrl: 'module1.html'
})
export class ContentModule1Component {
    @Input() summary;
    @Input() applyBreak: boolean = false;
    @Input() headerCentered: boolean = false;
    @Input() showOnHover: boolean = true;
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
