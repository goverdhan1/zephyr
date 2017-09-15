import {RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/rx';

import {isLoggedin}  from '../../utils/constants/is-loggedin';

/**
 * CanActivateOnLoginGaurd
 * If the user is not logged in then deactivate the route navigation
 * Else navigate him to the login page and set the next_url
 * After login user will be navigated to this URL
 */
@Injectable()
export class CanActivateOnLoginGaurd implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    let _nextURL = '';
    try {
      _nextURL = route['_routerState']['url'];
    } catch (e) {
      //console.log(e);
    }
    if(!isLoggedin()) {
        let _href = '<%= APP_BASE %>login';
        if(_nextURL) {
            _href += '?next_url=' + encodeURIComponent(_nextURL);
        }
        window.location.href = _href;
    }
    return isLoggedin();
  }
}
