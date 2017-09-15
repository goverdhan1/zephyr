import {Router} from '@angular/router';

export class IsLoggedIn {
    constructor(public router: Router) {
       // console.log(router);
    }
}

export function isLoggedin() {
  return !!localStorage.getItem('base64Value');
}

export function getNextPageURL(router) {
  let _urls = router.url.split('?next_url=');
  let _nextURL = _urls[1] || '';
  if(_nextURL) {
    try {
      _nextURL = _nextURL.split(';')[0] || '';
    } catch (e) {
      //  console.log(e);
    }
  }
  return _nextURL;
}
