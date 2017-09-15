import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'reports',
    templateUrl: 'reports.html'

})


export class ReportsComponent implements OnInit {


    constructor(private route: ActivatedRoute, private router: Router) {


    }

    ngOnInit() {

    }


}
