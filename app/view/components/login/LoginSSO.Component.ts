
import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
// import {RouteParams} from '@angular/router-deprecated';
// import {TranslatePipe} from 'ng2-translate/ng2-translate';
import { ZephyrStore } from '../../../store/zephyr.store';
import { LoginAction } from '../../../actions/login.action';
import { AdminAction } from '../../../actions/admin.action';


@Component({
   selector: 'loginsso',
  //directives: [ FORM_DIRECTIVES],
  template: '<div></div>'
})

export class LoginSSOComponent implements OnInit {
  public zephyrStore;

  constructor( public router: Router,private _adminaction:AdminAction, private _loginAction: LoginAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
    this.zephyrStore.dispatch(this._loginAction.doLoginSAML());

    this.zephyrStore.subscribe(() => {

    /*  if(this.zephyrStore.getState().adminPref) {
        this.isSaml = this.zephyrStore.getState().adminPref['IS_SAML_AUTHNICATED'];
        let adminState = this.zephyrStore.getState().adminPref;
        if(adminState && adminState['event'] === 'IS_SAML_AUTHNICATED') {
          this.zephyrStore.dispatch(this._adminaction.clearAdminEvents());
          this.isSaml = adminState['IS_SAML_AUTHNICATED'];


          if((!this.zephyrStore.getState().loggedInUser ||
            !Object.keys(this.zephyrStore.getState().loggedInUser).length) && localStorage.getItem('userInfo')) {

            if(this.isSaml=='Y') {
              this.zephyrStore.dispatch(this._loginAction.doLoginSAML());
              // this.router.navigate(['/project', 1]);
            }
          }
        }
      }*/

    });

  };

  ngOnInit() { }


}
