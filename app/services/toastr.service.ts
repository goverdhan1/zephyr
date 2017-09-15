import {Injectable} from '@angular/core';

declare var toastr: any;
declare var _: any;

@Injectable()
export class ToastrService {

    constructor() {
        toastr.options = {
          'closeButton': true,
          'debug': false,
          'newestOnTop': false,
          'progressBar': false,
          'positionClass': 'toast-top-right',
          'preventDuplicates': false,
          'onclick': null,
          'showDuration': '300',
          'hideDuration': '100',
          'timeOut': '500',
          'extendedTimeOut': '5000',
          'showEasing': 'swing',
          'hideEasing': 'linear',
          'showMethod': 'fadeIn',
          'hideMethod': 'fadeOut'
        };
    }


    showToastr(flag, messageDetails, toastrOptions) {
        let options = _.cloneDeep(toastr.options);
        toastr.options = Object.assign(toastr.options, toastrOptions);

        if (messageDetails.data && messageDetails.data._body) {
            toastr[flag](JSON.parse(messageDetails.data._body).errorMsg, _.startCase(_.toLower(flag)));
        } else if (messageDetails.data && messageDetails.data.errorMsg) {
          toastr[flag](messageDetails.data.errorMsg, _.startCase(_.toLower(flag)));
        } else if (messageDetails.data) {
          toastr[flag](messageDetails.data, _.startCase(_.toLower(flag)));
        } else if (messageDetails.title) {
            toastr[flag](messageDetails.description, messageDetails.title);
        } else {
            toastr[flag](messageDetails);
        }

        toastr.options = options;
    }

    success(messageDetails, toastrOptions: any = toastr.options) {
        this.showToastr('success', messageDetails, toastrOptions);
    }

    error(messageDetails, toastrOptions: any = toastr.options) {
        let options = _.cloneDeep(toastrOptions);
        options['closeButton'] = true;
        options['timeOut'] = '5000';
        Object.assign(toastrOptions, options);
        this.showToastr('error', messageDetails, toastrOptions);
    }

    info(messageDetails, toastrOptions: any = toastr.options) {
        this.showToastr('info', messageDetails, toastrOptions);
    }

    warning(messageDetails, toastrOptions: any = toastr.options) {
        this.showToastr('warning', messageDetails, toastrOptions);
    }
}
