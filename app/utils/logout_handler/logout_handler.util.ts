import {API_PATH} from '../constants/api.constants';
import {ZephyrStore} from '../../store/zephyr.store';
import {ADMIN_PREFERENCES} from '../../view/components/admin/admin.constant';

declare var jQuery:any, _;

export class LogoutHandlerUtil {
    static _instance;
    private isShowingLogoutTimerPrompt = false;
    private _logoutTimerHandler;
    private _tickerTime = 120;
    private timeoutValue = 90;
    private initDone = false;

    static getInstance() {
        if (!this._instance) {
            this._instance = new LogoutHandlerUtil();
        }
        return this._instance;
    }

    constructor() {

    }

    handleLogoutTimer() {
        if(!this.initDone) {
            return;
        }
        clearTimeout(this._logoutTimerHandler);
        this._logoutTimerHandler = setTimeout(() => {
          this.showPopUp();
        }, this.timeoutValue);
    }

    initHandler() {
        let state = ZephyrStore.getZephyrStore().getState();
        if(state && state.adminPref && state.adminPref.isUpdated) {
            this.timeoutValue = state.adminPref[ADMIN_PREFERENCES.ADMIN_APP_TIMEOUT];
            if(!this.timeoutValue) {
                this.timeoutValue = 90;
            }
            if(this.timeoutValue>2) {
                this.timeoutValue = this.timeoutValue - 2;
                this.timeoutValue = this.timeoutValue * 60 * 1000;
                this._tickerTime = 120;
            } else {
                this.timeoutValue = (this.timeoutValue * 60 * 1000)/2;
                this._tickerTime = this.timeoutValue/1000;
            }
            this._tickerTime -= 10;
            this._logoutTimerHandler = setTimeout(() => {
                this.showPopUp();
            }, this.timeoutValue);
            jQuery('#zee-admin-auto-logout-warning').on('show.bs.modal',() => {
              this.isShowingLogoutTimerPrompt = true;
            });
            jQuery('#zee-admin-auto-logout-warning').on('hide.bs.modal',() => {
              this.isShowingLogoutTimerPrompt = false;
            });
            this.initDone = true;
        }
    }

    clearTimer(){
        clearTimeout(this._logoutTimerHandler);
        jQuery('#zee-admin-auto-logout-warning').modal('hide');
        this.initDone = false;
    }

    showPopUp() {
        if(!this.isShowingLogoutTimerPrompt) {
          jQuery('#zee-admin-auto-logout-warning').modal('show');
        }
    }

    getTickerTime() {
      return this._tickerTime;
    }

}
