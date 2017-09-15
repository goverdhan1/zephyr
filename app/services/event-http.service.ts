import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response, ConnectionBackend} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { Subject }    from 'rxjs/Subject';
import {LogoutHandlerUtil} from '../utils/logout_handler/logout_handler.util';
import {ToastrService} from './toastr.service';
import {I18N_MESSAGES} from '../utils/messages/messages.en';

declare var jQuery:any, _;

@Injectable()
export class EventHttpService extends Http {
  public httpCallCompletedObservable;
  public httpCallStartedObservable;

  private currentRequests: number = 0;
  private totalRequests: number = 0;
  private isShowingError = false;
  private skipNwTimeout = 'false';
  private skipNwTimeoutCount = 5;
  private currentNwTimeoutCount = 0;

  private httpCallCompleted = new Subject<any>();
  private httpCallStarted = new Subject<any>();

  public constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions,
                     private loadingBar: SlimLoadingBarService) {
    super(_backend, _defaultOptions);

    this.httpCallCompletedObservable = this.httpCallCompleted.asObservable();
    this.httpCallStartedObservable = this.httpCallStarted.asObservable();
    jQuery('#zui-relogin-prompt').on('shown.bs.modal',() => {
      this.isShowingError = true;
    });
    jQuery('#zui-relogin-prompt').on('hide.bs.modal',() => {
      this.isShowingError = false;
    });
    this.skipNwTimeout = jQuery('#skipNwTimeout').val();
    this.skipNwTimeoutCount = parseInt(jQuery('#skipNwTimeoutCount').val(),10);
  }

  public get(url: string, options?: RequestOptionsArgs, skipLoadingIndicator:boolean = false, skipSessionCheck:boolean = false) : Observable<Response> {
    if(!skipLoadingIndicator) {
      this.incrementRequestCount();
    }

    //console.debug('before every call this request to be made');
    options.headers.append('Accept', 'application/json');
    this.fixIE(options);
    LogoutHandlerUtil.getInstance().handleLogoutTimer();
    // var response = super.get(url, options).cache();  // __webpack_aot
    var response = super.get(url, options).share();
    response.subscribe(null, error => {
        this.parseError(error);
      if(!skipLoadingIndicator) {
        this.decrementRequestCount();
      }
      if(!skipSessionCheck) {
        this.handleSessionTimeout(error);
      }
      //console.debug('after every call this response to be had');

    }, () => {
      if(!skipLoadingIndicator) {
        this.decrementRequestCount();
      }
      this.currentNwTimeoutCount = 0;
      //console.debug('after every call this response to be had');

    });
    return response;
  }

  handleSessionTimeout(error) {
    let msg = error._body && _.isString(error._body) && JSON.parse(error._body)['errorMsg'] || '';
    let nwMsg = error._body && _.isString(error._body) && JSON.parse(error._body)['errno'] || '';
    if(!this.isShowingError && ((error.status === 401 && msg.toLowerCase() === 'Token found to be null'.toLowerCase())
        // || nwMsg == 'ECONNREFUSED')) {
       || nwMsg == 'ECONNREFUSED' || error.status === 0)) {
      if(nwMsg == 'ECONNREFUSED' || error.status === 0) {
        if(this.skipNwTimeout == 'true') {
            return;
        }
        this.currentNwTimeoutCount++;
        if(this.currentNwTimeoutCount<=this.skipNwTimeoutCount) {
            let msgData = {'title':nwMsg || 'Error','description': error.statusText || I18N_MESSAGES['zephyr.relogin.dialog.network.message']};
            new ToastrService().error(msgData);
            return;
        }
        this.currentNwTimeoutCount = 0;
        jQuery('#zui-relogin-prompt').data('issue-type',1);
      }
      jQuery('#zui-relogin-prompt').modal('show');
    } else {
        this.currentNwTimeoutCount = 0;
    }
  }


  public post(url: string, body: any, options?: RequestOptionsArgs, skipLoadingIndicator:boolean = false): Observable<any> {
    if(!skipLoadingIndicator) {
      this.incrementRequestCount();
    }
    this.fixIE(options);
    LogoutHandlerUtil.getInstance().handleLogoutTimer();
    //var response = super.post(url, body, options).cache(); // __webpack_aot
    var response = super.post(url, body, options).share();
    response.subscribe(null, error => {
        this.parseError(error);
      if(!skipLoadingIndicator) {
        this.decrementRequestCount();
      }
      this.handleSessionTimeout(error);
    }, () => {
      if(!skipLoadingIndicator) {
        this.decrementRequestCount();
      }
      this.currentNwTimeoutCount = 0;
    });
    return response;
  }

  public put(url: string, body: string, options?: RequestOptionsArgs, skipLoadingIndicator:boolean = false): Observable<Response> {
    if(!skipLoadingIndicator) {
      this.incrementRequestCount();
    }

    this.fixIE(options);
    LogoutHandlerUtil.getInstance().handleLogoutTimer();
    // var response = super.put(url, body, options).cache(); // __webpack_aot
    var response = super.put(url, body, options).share();
    response.subscribe(null, error => {
      this.parseError(error);

      if(!skipLoadingIndicator) {
        this.decrementRequestCount();
      }

      this.handleSessionTimeout(error);
    }, () => {
      if(!skipLoadingIndicator) {
        this.decrementRequestCount();
      }

      this.currentNwTimeoutCount = 0;
    });
    return response;
  }

  public delete(url: string, options?: RequestOptionsArgs, skipLoadingIndicator:boolean = false): Observable<Response> {
    if(!skipLoadingIndicator) {
      this.incrementRequestCount();
    }
    LogoutHandlerUtil.getInstance().handleLogoutTimer();
    // var response = super.delete(url, options).cache();  // __webpack_aot
    var response = super.delete(url, options).share();
    response.subscribe(null, error => {
        this.parseError(error);
      if(!skipLoadingIndicator) {
        this.decrementRequestCount();
      }
      this.handleSessionTimeout(error);
    }, () => {
      if(!skipLoadingIndicator) {
        this.decrementRequestCount();
      }
      this.currentNwTimeoutCount = 0;
    });
    return response;
  }

  public decrementRequestCount() {
    let interval;
    if (--this.currentRequests == 0) {
        clearInterval(interval);
        this.loadingBar.complete();
      this.totalRequests = 0;
      // let zeMainApp = document.getElementById('ze-main-app');
      // if(zeMainApp) {
      //   document.getElementById('ze-main-app').classList.remove('ze-main-app-loading');
      // }

      this.httpCallCompleted.next('');
    } else {

      //Fix for https://defects.yourzephyr.com/browse/ZEPHYR-14520
      clearInterval(interval);
      interval = setInterval(() => {
        let progress = this.loadingBar.progress;
        if(progress === 99) {
          this.loadingBar.progress = 98;
        }
      }, 400);

      // let currentApiProgress = ((this.totalRequests - this.currentRequests)/this.totalRequests) * 100;
      // currentApiProgress = currentApiProgress > 90 ? 90: currentApiProgress;
      // this.loadingBar.progress = this.loadingBar.progress > currentApiProgress ? this.loadingBar.progress: currentApiProgress;
    }
  }
 public parseError(error) {
      let err_obj = {'errorMsg':''};
      if(error._body && typeof(error._body) === 'object') {
        error._body = JSON.stringify(error._body);
        return;
      }
      try{
        if(typeof(JSON.parse(error._body)) != 'object' && !isNaN(error._body)) {
          err_obj.errorMsg = error._body;
          error._body = JSON.stringify(err_obj);
        }
      }catch (e){
        err_obj.errorMsg = error._body;
        error._body = JSON.stringify(err_obj);
      }
      return ;
  }
  public incrementRequestCount() {
    if (this.currentRequests == 0 && this.totalRequests == 0) {
      this.loadingBar.progress = 0;
      this.loadingBar.start();
      this.httpCallStarted.next('');

      // let zeMainApp = document.getElementById('ze-main-app');
      // if(zeMainApp) {
      //   document.getElementById('ze-main-app').classList.add('ze-main-app-loading');
      // }
    }
    this.totalRequests++;
    this.currentRequests++;
  }

  private fixIE (opts) {
    if (navigator.userAgent.indexOf('MSIE') != -1) {
          var detectIEregexp = /MSIE (\d+\.\d+);/ ;//test for MSIE x.x
        } else {
            var detectIEregexp = /Trident.*rv[ :]*(\d+\.\d+)/ ;//test for rv:x.x or rv x.x where Trident string exists
            }
            if (detectIEregexp.test(navigator.userAgent)) { //if some form of IE
              let d = Date.now();
              let data: string = "_ze=";
              let queryString: string =  data.concat(String(d));
              if (jQuery.isEmptyObject(opts.search)) {
                opts.search = queryString;
              } else {
                opts.search += `&${queryString}`;
              }
            }
            return opts;
    }


}
