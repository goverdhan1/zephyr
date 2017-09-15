import {  Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ZephyrStore} from '../../../../store/zephyr.store';

import {AutomationQualityAction} from '../../../../actions/aq.action';

@Component({
  selector: 'aq',
  templateUrl: 'aq.html',
  viewProviders: [AutomationQualityAction],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AutomationQualityComponent implements OnInit {

  unsubscribe;
  inRelease = true;
  public navColumns;
  public releases;

  private _zephyrStore;


  constructor(public router: Router, private _automationQualityAction: AutomationQualityAction, private cdr: ChangeDetectorRef,
              private route: ActivatedRoute) { }

   ngOnInit() {
  }


}
