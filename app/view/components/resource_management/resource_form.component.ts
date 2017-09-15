import {Component,OnDestroy, OnChanges, SimpleChanges, Input, Output, EventEmitter, } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ZephyrStore} from '../../../store/zephyr.store';
import {AdminAction} from '../../../actions/admin.action';
import { ADMIN_PREFERENCES} from '../admin/admin.constant';
import { MANAGER_ROLE_ID, DEFECT_USER_ROLE_ID } from '../admin/customizations/customizations.constant';

declare var jQuery: any, self: any, _:any;

const LOGOUT_DOUBLE_CONFIRMATION = 'LOGOUT_DOUBLE_CONFIRMATION';
const LOGOUT = 'LOGOUT';
const NO_ACTION = 'NO_ACTION';

@Component({
  selector: 'resource-form',
  viewProviders: [ AdminAction ],
  templateUrl: 'resource_form.html'
})

export class ResourceFormComponent implements OnChanges, OnDestroy {
    @Input() allResources;
    @Input() resourceObject;
    @Input() allProjects;
    @Input() projectsAllocated = [];
    @Output() onFormSubmit: EventEmitter<any> = new EventEmitter();
    @Output() onFormCancel: EventEmitter<any> = new EventEmitter();
    @Output() onConfirmActionCall: EventEmitter<any> = new EventEmitter();
    @Output() onResetUsersPassword: EventEmitter<any> = new EventEmitter();
    @Output() onProjectAllocation: EventEmitter<any> = new EventEmitter();

    formtype;
    zephyrStore;
    state;
    resourceForm : FormGroup;
    unsubscribe;

    roles = [];
    adminPrefuserTypes = [];
    globalProjects = [];
    selectedProjects = [];
    isAccountEnabled = true;
    isCustomizeUsername = false;
    resourceRoleArray = [];
    formChangesFlag = false;

    confirmationObject = {};
    constructor( fb: FormBuilder, public router: Router , private _adminAction: AdminAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();

        // Initializing of select options for resource_management usertype.
        this.adminPrefuserTypes = this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.RESOURCE_MANAGEMENT_USERTYPE_LOV] &&
                                    JSON.parse(this.zephyrStore.getState().adminPref[ADMIN_PREFERENCES.RESOURCE_MANAGEMENT_USERTYPE_LOV]);

        // Initializing information of diff roles.
        let roleArray = this.zephyrStore.getState().roles.rolesGrid.sortedRows;
        if (roleArray.length > 0) {
            this.roles = roleArray.filter(roleObject => roleObject.id !== MANAGER_ROLE_ID && roleObject.id !== DEFECT_USER_ROLE_ID);
        } else {
            this.zephyrStore.dispatch(this._adminAction.getRolesTypes());
        }

        this.resourceForm = fb.group({
          firstName: ['', Validators.compose([Validators.required, Validators.pattern('^.{2,100}$')])],
          lastName : ['',Validators.compose([Validators.required, Validators.pattern('^.{2,100}$')])],
          type:[''],
          roles : ['' , Validators.required],
          title : ['', Validators.pattern('^.{0,50}$')],
          location : ['',Validators.compose([Validators.required, Validators.pattern('^.{2,50}$')])],
          workPhoneNumber : ['', Validators.pattern('^.{0,32}$')],
          mobilePhoneNumber : ['', Validators.pattern('^.{0,32}$')],
          homePhoneNumber : ['', Validators.pattern('^.{0,32}$')],
          email : ['',Validators.compose([Validators.required, this.emailValidator, this.uniqueEmail])],
          address1 : ['', Validators.pattern('^.{0,150}$')],
          address2 : ['', Validators.pattern('^.{0,150}$')],
          city : ['', Validators.pattern('^.{0,50}$')],
          country : ['', Validators.pattern('^.{0,100}$')],
          state : ['', Validators.pattern('^.{0,100}$')],
          postalCode : ['', Validators.pattern('^.{0,15}$')],
          username : ['', Validators.compose([Validators.pattern('^.{2,255}$'), this.uniqueUsername])],
          accountEnabled : [true],
          credentialsExpired : [''],
          id : ['']
         });
        self = this;
        this.unsubscribe = this.zephyrStore.subscribe(() => {
            this.state  = this.zephyrStore.getState();

            // Initializing information of diff roles.
            let roleArray = this.state.roles.rolesGrid.sortedRows;
            if (roleArray.length > 0) {
              this.roles = roleArray.filter(roleObject => roleObject.id !== MANAGER_ROLE_ID && roleObject.id !== DEFECT_USER_ROLE_ID);
            }

            // Initializing of select options for resource_management usertype.
            this.adminPrefuserTypes = this.state.adminPref[ADMIN_PREFERENCES.RESOURCE_MANAGEMENT_USERTYPE_LOV] &&
                JSON.parse(this.state.adminPref[ADMIN_PREFERENCES.RESOURCE_MANAGEMENT_USERTYPE_LOV]);
        });
    }



    ngOnChanges(changes: SimpleChanges) {
      if(changes['resourceObject']) {
        this.updateResourceForm(changes['resourceObject'].currentValue);
      }
      if(changes['allProjects']) {
        this.globalProjects = changes['allProjects'].currentValue;
      }
      if(changes['projectsAllocated']) {
        let selectedProjects = this.globalProjects.filter(project => project.id === changes['projectsAllocated'].currentValue.filter(id => id === project.id)[0]);

        this.selectedProjects = _.sortBy(selectedProjects, entry => entry.name.toLowerCase());
      }
    }

    updateProjects(resources) {
      this.formChangesFlag = true;
      this.onProjectAllocation.emit(resources.selectedList);
    }

    resourceFormSubmit(formValues) {
        formValues.username = formValues.username.toLowerCase();
        formValues.email = formValues.email.toLowerCase();

        Object.keys(formValues).forEach(key => {
            let val = formValues[key];
            if (key === 'roles') {
              let roleArray = this.roles.filter(roleOBject => roleOBject.id == val);
              formValues.userType = (roleArray.length && roleArray[0].id == 5) ? 2 : 0;
              formValues.chargeableFlag = (roleArray.length && roleArray[0].id == 5) ? false : true;
              formValues[key] = roleArray;
            }
        });

        // console.log('formValues', formValues);
        // TODO: remove it disable user credentials expiry
        // formValues['credentialsExpired'] = false;

        this.onFormSubmit.emit(formValues);
    }

    enableSave() {
      return !this.resourceForm.valid || !(this.resourceForm.dirty || this.formChangesFlag);
    }

    isDirty() {
      return this.resourceForm.dirty || this.formChangesFlag;
    }

    resetForm() {
      this.formChangesFlag = false;
      this.resourceForm.reset();
    }

    updateResourceForm(resourceDataOBject) {
      this.resetForm();
      this.resourceRoleArray = (resourceDataOBject && resourceDataOBject.id && resourceDataOBject.id == 1) ? resourceDataOBject.roles : this.roles;

      if(!resourceDataOBject) {
        return;
      }

      let isAddResource = !Object.keys(resourceDataOBject).length;

      this.formtype = isAddResource ? 'Add' : 'Edit';
      resourceDataOBject.accountEnabled = isAddResource ? true : resourceDataOBject.accountEnabled;
      this.isAccountEnabled = resourceDataOBject.accountEnabled;
      this.isCustomizeUsername = false;
      this.resourceForm.patchValue({
        id : isAddResource ? null : resourceDataOBject.id,
        firstName : resourceDataOBject.firstName,
        lastName :resourceDataOBject.lastName,
        type : isAddResource ? '' : resourceDataOBject.type || '',
        title : resourceDataOBject.title,
        roles : isAddResource ? '' : resourceDataOBject.roles && resourceDataOBject.roles.length && resourceDataOBject.roles[0].id,
        location : resourceDataOBject.location,
        workPhoneNumber : resourceDataOBject.workPhoneNumber,
        mobilePhoneNumber : resourceDataOBject.mobilePhoneNumber,
        homePhoneNumber : resourceDataOBject.homePhoneNumber,
        email : resourceDataOBject.email,
        address1 : resourceDataOBject.address1,
        address2 : resourceDataOBject.address2,
        country : resourceDataOBject.country,
        city : resourceDataOBject.city,
        state : resourceDataOBject.state,
        postalCode : resourceDataOBject.postalCode,
        username : resourceDataOBject.username,
        accountEnabled : resourceDataOBject.accountEnabled,
        credentialsExpired : isAddResource ? true : resourceDataOBject.credentialsExpired,
      });
      // console.log('this.resourceForm', this.resourceForm);
      // if changing name of default Image, same is to be changed in function onResourceFormSubmit
      // in this syntax "profileImageSrc.includes('default') and in its HTMl file"

      let imageSource = (jQuery('#environment-type').val() === 'dev') ? 'html5/assets/images/default-image.png' : 'assets/images/default-image.png';
      if (resourceDataOBject.picture) {
          // TODO : to be taken care for absolute path of image
          imageSource = '/flex/download?action=view&fileId=' + resourceDataOBject.picture;
      }
      jQuery('#output').attr('src' , imageSource);
    }

    ngOnDestroy() {
      this.unsubscribe();
    }

    accountEnabledCheckboxClicked (value) {
      this.isAccountEnabled = value;
    }

    customizeUsernameCheckboxClicked (value) {
      this.isCustomizeUsername = value;
    }

    onKeyupUserName (ev?:any) {
      let username = '';
      let firstname, lastname;
      username = (this.resourceForm.controls['firstName'].value || '') +
      (this.resourceForm.controls['lastName'].value ? '.' + this.resourceForm.controls['lastName'].value : '');
      (<FormControl>this.resourceForm.controls['username']).setValue(username);
    }

    resetResourceForm () {
      // this.updateResourceForm(this.resourceObject);
      this.onFormCancel.emit();
    }

    resetUsersPassword () {
      this.onResetUsersPassword.emit();

      (<FormControl>this.resourceForm.controls['credentialsExpired']).setValue(true);
      this.resourceForm.controls['credentialsExpired'].markAsDirty();
    }

    loadFile(event) {
      let src = URL.createObjectURL(event.target.files[0]);
      jQuery('#output').attr('src' , src);
      this.formChangesFlag = true;
    }

    triggerLoadFile() {
      jQuery('#userImg').trigger('click');
    }

    private emailValidator(email) {
      // disallowed name : ()<>,;:\\\"[] `~!#$%^&*={}|/?'
      // disallowed domain chars: ()<>,;:\\\"[] `~!#$%^&*+={}|/?'
      // var regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      var regEx = /^(([^<>()\[\]\.,;:\s@\"\\\`~!#$%^&*={}|/?']+(\.[^<>()\[\]\.,;:\s@\"\\\`~!#$%^&*={}|/?']+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"\\\`~!#$%^&*+={}|/?']+\.)+[^<>()[\]\.,;:\s@\"\\\`~!#$%^&*+={}|/?']{2,})$/i;

      // var regEx = /^[a-zA-Z0-9_\+-]+(\.[a-zA-Z0-9_\+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.([a-zA-Z]{2,})$/;

      if(regEx.test(email.value)) {
        return null;
      }
      return { 'invalidName': true };
    }

    private uniqueEmail(email) {
      if (!(self.allResources && self.allResources.length) || !self.formtype) {
        return;
      }

      let allResources = self.formtype === 'Add' ? self.allResources : self.allResources.filter(resource => resource.id !== self.resourceObject.id);
      let match = allResources.filter(resourceEmail => resourceEmail.email == email.value);

      if(!(match && match.length)) {
        return null;
      }
      return {'invalidName': true };
    }

    private uniqueUsername(username) {
      if (!(self.allResources && self.allResources.length) || !self.formtype) {
        return;
      }

      let allResources = self.formtype === 'Add' ? self.allResources : self.allResources.filter(resource => resource.id !== self.resourceObject.id);
      let match = allResources.filter(resourceName => resourceName.username && username.value && resourceName.username.toLowerCase() == username.value.toLowerCase());

      if(!(match && match.length)) {
        return null;
      }

      if(!jQuery('#resource-customizausername:checked').length) {
        jQuery('#resource-customizausername').trigger('click');
      }

      return {'invalidName': true };
    }

  }
