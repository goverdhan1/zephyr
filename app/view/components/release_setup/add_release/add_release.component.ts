import {Component } from '@angular/core';
import {Router} from '@angular/router';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {ReleaseAction} from '../../../../actions/release.action';

declare var jQuery: any, moment: any, _;
import {RELEASE_INIT_STATE} from '../release_setup.constant';
@Component({
  selector: 'add-release',
  viewProviders: [ReleaseAction],
  templateUrl: 'add_release.html'
})


export class AddReleaseComponent {
    zephyrStore;
    state;
    breadCrumbsList;
    release_setupDetailsLink = '/release_setup/details';
    releaseForm:any = RELEASE_INIT_STATE;
    constructor( private _releaseAction: ReleaseAction, public router: Router) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.breadCrumbsList = [{text:'Release Setup' , id:this.release_setupDetailsLink}];
    }

    onReleaseFormSubmit(formValues) {
      for (var key in formValues) {
          if (formValues.hasOwnProperty(key)) {
            var val = formValues[key];
            if (key === 'startDate' || key === 'endDate') {
              if (!val) {
                delete formValues[key];
                continue;
              }
              let date = new Date(val);
                val = date.getTime();
              formValues[key] = val;
            } else if (key === 'status') {
              val = val === false ? 0 : 1;
              formValues[key] = val;
            }
          }
        }
        delete formValues['id'];
        //TODO:set project id of current project selected.
        formValues['projectId'] = 1;
        this.zephyrStore.dispatch(this._releaseAction.addRelease(formValues));
        this.router.navigateByUrl(this.release_setupDetailsLink);
    }
    onBreadCrumbClick ($event) {
       let routerLink = $event.target.dataset.nodeid;
       this.router.navigateByUrl(routerLink);
     }
     resetReleaseForm() {
        this.releaseForm = _.cloneDeep(RELEASE_INIT_STATE);
        let routerLink = this.release_setupDetailsLink;
        this.router.navigateByUrl(routerLink);
    }
  }
