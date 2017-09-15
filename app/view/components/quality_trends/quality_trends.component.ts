import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import {ZephyrStore} from "../../../store/zephyr.store";

@Component({
  selector: 'quality-trends',
  templateUrl: 'quality_trends.html'
})

export class QualityTrendsComponent implements OnInit {
  public qualityTrendsList: Array<Select2OptionData>;
  zephyrStore = ZephyrStore.getZephyrStore();
  state = this.zephyrStore.getState();
  projectId = this.state.project.id;
  releaseId = this.state.release.summaries.releaseId;
  unsubscribe;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.zephyrStore = ZephyrStore.getZephyrStore();
    this.unsubscribe = this.zephyrStore.subscribe(() => {
      this.state = this.zephyrStore.getState();
      this.projectId = this.state.project.id;
      this.releaseId = this.state.release.summaries.releaseId;
    });

  }

  ngOnInit() {
    this.qualityTrendsList = [
      {
        id: 'pip',
        text: 'Process Improvement Predictions'
      },
      {
        id: 'pa',
        text: 'Plan vs Actual'
      },
      // {
      //   id: 'apa',
      //   text: 'Advanced Plan vs Actual'
      // },
      {
        id: 'aa1',
        text: 'Best Cases for Automation'
      },
      {
       id: 'aq',
       text: 'Automation Impact'
      }

    ];
  }

  public changeRoute(e: any) {
    setTimeout(() => {
      this.router.navigate(['/quality-trends/' + this.releaseId + '/' + e.value]); //this needs to be changed to release id
    }, 100);
  }

}
