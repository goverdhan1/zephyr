import {Injectable, EventEmitter, Output} from '@angular/core';

@Injectable()
export class ZephyrEventService {

    @Output()
    public routeChange: EventEmitter<any>;

    constructor() {
        this.routeChange = new EventEmitter();
    }
}
