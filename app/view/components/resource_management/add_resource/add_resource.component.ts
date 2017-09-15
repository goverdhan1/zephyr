import {Component,OnDestroy } from '@angular/core';
//import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control} from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {UserAction} from '../../../../actions/user.action';
import {AdminAction} from '../../../../actions/admin.action';
import { ADMIN_PREFERENCES} from '../../admin/admin.constant';
import {BreadCrumbComponent} from '../../common/breadcrumb/bread_crumb.component';

declare var jQuery: any;

const NO_ACTION = 'NO_ACTION';

@Component({
  selector: 'add-resource',
  viewProviders: [UserAction ,AdminAction ],
  templateUrl: 'add_resource.html'
})



export class AddResourceComponent implements OnDestroy {
    zephyrStore;
    state;
    resourceForm : FormGroup;
    unsubscribe;
    breadCrumbsList;
    resource_managementDetailsLink = '/resource_management/details';

    roles = [];
    adminPrefuserTypes = [];

    isAccountEnabled = true;
    isCustomizeUsername = false;

    confirmationObject:any;
    constructor( fb: FormBuilder, private _userAction: UserAction,
                    public router: Router , private _adminAction: AdminAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.breadCrumbsList = [{text:'Resource Management' , id:this.resource_managementDetailsLink} , {text:'Add Resource' , id:null}];
        //Initializing of select options for resource_management usertype.
        this.adminPrefuserTypes = this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.RESOURCE_MANAGEMENT_USERTYPE_LOV] &&
                                    JSON.parse(this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.RESOURCE_MANAGEMENT_USERTYPE_LOV]);
        //Initializing information of diff roles.
        let roleArray = this.zephyrStore.getState().roles.rolesGrid.sortedRows;
        if (roleArray.length > 0) {
          this.roles = roleArray.filter(function (roleObject){
                        return roleObject.hasManagerApp == 0;
            });
        } else {
              this.zephyrStore.dispatch(this._adminAction.getRolesTypes());
        }

        this.resourceForm = fb.group({
          firstName: ['', Validators.required],
          lastName : ['',Validators.required],
          type:[''],
          roles : ['' , Validators.required],
          title : [''],
          location : ['',Validators.required],
          workPhoneNumber : [''],
          mobilePhoneNumber : [''],
          homePhoneNumber : [''],
          email : ['',Validators.required],
          address1 : [''],
          address2 : [''],
          city : [''],
          country : [''],
          state : [''],
          postalCode : [''],
          username : [''],
          accountEnabled : [true],
          credentialsExpired : ['']
         });

        this.unsubscribe = this.zephyrStore.subscribe(() => {
            this.state  = this.zephyrStore.getState();

            //Initializing information of diff roles.
            let roleArray = this.state.roles.rolesGrid.sortedRows;
            if (roleArray.length > 0) {
              this.roles = roleArray.filter(function (roleObject){
                            return roleObject.hasManagerApp == 0;
                });
            }

            //Initializing of select options for resource_management usertype.
            this.adminPrefuserTypes = this.state.adminPref[ADMIN_PREFERENCES.RESOURCE_MANAGEMENT_USERTYPE_LOV] &&
                                    JSON.parse(this.state.adminPref[ADMIN_PREFERENCES.RESOURCE_MANAGEMENT_USERTYPE_LOV]);
        });
    }
    onResourceFormSubmit(formValues) {
      for (var key in formValues) {
          if (formValues.hasOwnProperty(key)) {
            var val = formValues[key];
            if (key === 'roles') {
              let roleArray = [];
              roleArray = this.roles.filter(function(roleOBject) {
                          return roleOBject.id == val;
              });
              formValues[key] = roleArray;
            }
          }
        }
       let profileImageSrc = jQuery('#output').attr('src');
       let formDataPic = null;
       if (profileImageSrc && !profileImageSrc.includes('default')) {
         let $uploadResourceProfilePic = jQuery('#uploadResourceProfilePic');
         formDataPic = new FormData($uploadResourceProfilePic[0]);
         let uploadFileURL = '/flex/upload/document/genericattachment';
       }
       if (formDataPic) {
         this.zephyrStore.dispatch(this._userAction.addUserComplete(formValues , formDataPic));
       } else {
         this.zephyrStore.dispatch(this._userAction.addUser(formValues));
       }
       //this.zephyrStore.dispatch(this._userAction.addUser(formValues));
       this.router.navigateByUrl(this.resource_managementDetailsLink);

    }

    ngOnDestroy() {
      this.unsubscribe();
    }

    onBreadCrumbClick ($event) {
       let routerLink = $event.target.dataset.nodeid;
       if (routerLink) {
         this.router.navigateByUrl(routerLink);
        }
     }

    accountEnabledCheckboxClicked (value) {
      this.isAccountEnabled = value;
    }

    customizeUsernameCheckboxClicked (value) {
      this.isCustomizeUsername = value;
    }

    onKeyupUserName (value?:any) {
      let username = '';
      if (!this.isCustomizeUsername) {
       username = this.resourceForm.controls['firstName'].value + '.' + this.resourceForm.controls['lastName'].value;
       (<FormControl>this.resourceForm.controls['username'])
          .setValue(username);
      }
    }

    resetResourceForm () {
      // (<FormControl>this.resourceForm.controls['firstName'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['lastName'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['type'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['title'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['roles'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['location'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['workPhoneNumber'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['mobilePhoneNumber'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['homePhoneNumber'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['email'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['address1'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['address2'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['country'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['city'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['state'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['postalCode'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['username'])
      //     .setValue('');
      // (<FormControl>this.resourceForm.controls['accountEnabled'])
      //     .setValue(true);
      // (<FormControl>this.resourceForm.controls['credentialsExpired'])
      //     .setValue('');
      // let imageSrc= 'view/assets/images/default-image.png';
      // jQuery('#output').attr('src' , imageSrc);
      this.router.navigateByUrl(this.resource_managementDetailsLink);

    }

    resetUsersPassword () {
      jQuery('#confirmation-modal').modal();
      this.confirmationObject['heading'] = 'Information';
      this.confirmationObject['text'] = 'user\'s password has been reset, please save to apply changes';
      this.confirmationObject['buttonText'] = 'OK';
      this.confirmationObject['showCancelButton'] = false;
      this.confirmationObject['action'] = NO_ACTION;
      (<FormControl>this.resourceForm.controls['credentialsExpired'])
          .setValue(true);
    }

    confirmationActionCall($event) {
      let actionString = $event.target.value;
      if (actionString === NO_ACTION) {
        jQuery('#confirmation-modal').modal('hide');
      }
    }

    loadFile ($event) {
      let src = URL.createObjectURL($event.target.files[0]);
      jQuery('#output').attr('src' , src);
    }

    triggerLoadFile () {
      jQuery('#userImg').trigger('click');
    }

  }
