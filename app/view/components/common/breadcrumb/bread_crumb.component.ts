import {Component, Input} from '@angular/core';

@Component({
	selector: 'bread-crumb',
	templateUrl: 'bread_crumb.html',
  styles: [`
      .bread-crumb-wrapper li{
          display: inline-block;
		      padding-right: 5px;
      }
      
      .zui-breadcrumb {
        margin-top: 7px;
        margin-left: 1px;
      }
  `]
})

export class BreadCrumbComponent {
	@Input() breadCrumbsList: Array<Object>;
}
