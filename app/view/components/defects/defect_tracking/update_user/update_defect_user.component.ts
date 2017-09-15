import {Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {I18N_MESSAGES} from '../../../../../utils/messages/messages.en';
import {DefectsAction} from '../../../../../actions/defects.action';
import {ZephyrStore} from '../../../../../store/zephyr.store';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {UtililtyFunctions} from '../../../../../utils/scripts/utils';

declare var jQuery: any, _;

@Component({
    selector: 'zee-update-defect-user',
    templateUrl: 'update_defect_user.html',
    viewProviders: [DefectsAction]
})

export class UpdateDefectUserComponent implements AfterViewInit, OnDestroy, OnChanges {
    @Output() onShowUpdateUserModal: EventEmitter<any> = new EventEmitter();
    @Output() onCloseUpdateUserModal: EventEmitter<any> = new EventEmitter();
    @Output() onDeleteUser: EventEmitter<any> = new EventEmitter();
    @Input() isModal;
    @Input() isResetDTUser;
    unsubscribe;
    updateDefectUserForm: FormGroup;
    userCreationType;
    defectSystem;
    defectUserState;
    utilityFunctions;
    i18nMessages = I18N_MESSAGES;
    showPassword = {
        password : false,
        reEnterPassword : false
    };
    private _zephyrStore;
    constructor(private fb: FormBuilder, public router: Router, private _defectsAction: DefectsAction) {
        this._zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this._zephyrStore.subscribe((x) => {
            this.onStateChange();
        });
        this.initForm();
        this.utilityFunctions = new UtililtyFunctions();;
    }
    ngAfterViewInit() {
        this.defectSystem = this._zephyrStore.getState().global.defectSystem;
        this.defectUserState = this._zephyrStore.getState().defectUser;
    }
    ngOnChanges(changedNode) {
        if(this.isResetDTUser) {
            let usernameVal = this.defectUserState && this.defectUserState.user && this.defectUserState.user.userName;
            this.updateDefectUserForm.controls['username'].setValue(usernameVal);
            this.updateDefectUserForm.controls['password'].setValue('');
            this.updateDefectUserForm.controls['reEnterPassword'].setValue('');
        }
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    onStateChange() {
        let defectUserState = this._zephyrStore.getState().defectUser;
        if(defectUserState.event === 'GET_DEFECT_USER') {
            this._zephyrStore.dispatch(this._defectsAction.clearDefectUserEvent());
            this.onGetUser(defectUserState.user);
        }
        if(defectUserState.event === 'GET_ADMIN_SETUP_DEFECT_USER') {
            this._zephyrStore.dispatch(this._defectsAction.clearDefectUserEvent());
            this.onGetAdminSetupUser(defectUserState.adminSetupState);
        }
        if(defectUserState.event === 'UPDATE_DEFECT_USER') {
            this._zephyrStore.dispatch(this._defectsAction.clearDefectUserEvent());
            this._zephyrStore.dispatch(this._defectsAction.dispatchSuccess(this.i18nMessages['zephyr.defect.user.updated.successfully']));
            this.onShowUpdateUserModal.emit('false');
        }
        if(defectUserState.event === 'DELETE_DEFECT_USER') {
            this._zephyrStore.dispatch(this._defectsAction.clearDefectUserEvent());
            this._zephyrStore.dispatch(this._defectsAction.dispatchSuccess(this.i18nMessages['zephyr.defect.user.deleted.successfully']));
            this.onDeleteUser.emit();
        }
    }
    initForm() {
        this.updateDefectUserForm = this.fb.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          reEnterPassword: ['', Validators.required]
        });
    }
    onGetUser(user) {
        if(!user) {
            this.userCreationType = 'CREATE';
            this.onShowUpdateUserModal.emit('true');
        } else {
            if(user.hasOwnProperty('password') && !user['password']) {
                delete user['password'];
            }
            this.defectSystem = this._zephyrStore.getState().global.defectSystem;
            this._zephyrStore.dispatch(this._defectsAction.getAdminSetupUser(
                this.getUserForAdminSetup(user), this.defectSystem));
        }
    }
    onGetAdminSetupUser(adminSetupState) {
        if(adminSetupState === 'ERROR') {
            this.userCreationType = 'UPDATE';
            this.onShowUpdateUserModal.emit('true');
        } else if(adminSetupState === 'NETWORK_ERROR') {
            this.userCreationType = 'UPDATE';
            this.onShowUpdateUserModal.emit('false');
        } else {
            this.onShowUpdateUserModal.emit('false');
        }
    }
    onUserUpdate() {
        let formValue = this.updateDefectUserForm.value;
        if(formValue.password !== formValue.reEnterPassword) {
            this._zephyrStore.dispatch(this._defectsAction.dispatchError(this.i18nMessages['zephyr.defect.password.not.matched']));
            return;
        }
        let userObj = {};
        let state = this._zephyrStore.getState();
        if(this.userCreationType === 'UPDATE') {
            userObj['id'] = this._zephyrStore.getState().defectUser.user.id;
            userObj['userId'] = this._zephyrStore.getState().defectUser.user.userId;
            userObj['userName'] = formValue.username;
            userObj['password'] = formValue.password;
            userObj['lastSuccessfulLogin'] = true;
        } else if(this.userCreationType === 'CREATE') {
            this.defectSystem = state.global.defectSystem;
            userObj['userId'] = state.loggedInUser.id;
            userObj['userName'] = formValue.username;
            userObj['userType'] = 'user';
            userObj['password'] = formValue.password;
            userObj['defectTrackingSystem'] = this.defectSystem;
        }
        this._zephyrStore.dispatch(this._defectsAction.updateUser(userObj,
            this.userCreationType));
    }
    encryptPassword(password) {
        return this.utilityFunctions.shiftString(password, 1);
    }
    getUserForAdminSetup(user) {
        let userObj = {};
        userObj['username'] = user.userName;
        userObj['password'] = this.encryptPassword(user.password);
        return userObj;
    }
    onResetUserUpdate() {
        this.userCreationType = 'UPDATE';
        this.onUserUpdate();
    }
    deleteUser() {
        jQuery('#defect-delete-user-modal').modal('hide');
        let userId = this._zephyrStore.getState().defectUser.user.id;
        this._zephyrStore.dispatch(this._defectsAction.deleteUser(userId));
    }
    closeUpdateUserModal() {
        this.onCloseUpdateUserModal.emit();
    }

    closeDeleteUserModal() {
        jQuery('#defect-delete-user-modal').modal('hide');
    }
    showDeleteUserPopup() {
        jQuery('#defect-delete-user-modal').modal();
    }
    showpasswordClicked(key) {
        this.showPassword[key] = true;
    }
    hidePasswordClicked(key) {
        this.showPassword[key] = false;
    }
   checkPassword(updateDefectUserForm){
      if (updateDefectUserForm){
        if(updateDefectUserForm.controls.password._value && updateDefectUserForm.controls.reEnterPassword._value ){
          if (updateDefectUserForm.controls.password._value === updateDefectUserForm.controls.reEnterPassword._value) {
            jQuery('zui-modal zui-modal-footer .zui-btn.zui-btn-primary').removeClass('disabled');
          } else {
            jQuery('zui-modal zui-modal-footer .zui-btn.zui-btn-primary').addClass('disabled');
          }
      }else {
          jQuery('zui-modal zui-modal-footer .zui-btn.zui-btn-primary').addClass('disabled');
        }
      }
    }
}
