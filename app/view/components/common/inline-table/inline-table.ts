import {Component, Input, Output, EventEmitter, ElementRef, AfterViewInit} from '@angular/core';
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
declare var _: any, jQuery: any;

@Component({
    selector: 'zui-inline-table',
    templateUrl: 'inline-table.html'
})
export class InlineTableComponent {
    @Input() parentId;//If in a single page multiple inline options are defined then parentId is used to distinguish between them.
    @Input() options = [];
    @Input() columns = [];
    @Input() searchOn = [];
    @Input() key = '';
    @Input() selectedOptions = [];
    @Input() searchPlaceholder = 'Search';

    hideDialogBox = true;
    selections = [];
    i18nMessages = I18N_MESSAGES;

    public filter : string = "";
    public lastSearchTerm : string = "";


    private identifiers = [];
    private masterOptions = [];


    constructor() {
      // console.log('');
    }


    inputKeyPress(event) {
      if (event.which == 13 || event.keyCode == 13) {
        this.searchTable();
      }
      return true;
    }

    searchTable() {
      if (!_.isEqual(this.lastSearchTerm, this.filter)) {
        this.options.forEach((option) => {
          option.show = true;

          _.forEach(this.searchOn, (token) => {
            option.show = _.startsWith(token.split('.').reduce((o,i)=>o[i], option).toLocaleLowerCase(),
              this.filter.trim().toLocaleLowerCase());

            if (option.show === true) {
              return false;
            }

            return true;
          });

        });

        jQuery("#select-all-options").prop("checked", false);
        this.lastSearchTerm = this.filter;
      }
    }

    openDialog(value) {
      this.hideDialogBox = false;

      this.masterOptions = _.cloneDeep(this.options);

      this.options.forEach(option => {
        option.identifier = this.getRowIdentifier(option);
        this.identifiers.push(this.getRowIdentifier(option));
        option.marked = false;
        option.show = true;
      });

      this.markSelectedOptions(value);
    }

    //value is whether to mark selected or unselected. true to select and false to unselect
    markSelectedOptions(value) {

      this.options.forEach(option => {
        if (this.selectedOptions.indexOf(option.identifier) !== -1 && option.show) {
          option.marked = value;

          if (!value) {
            this.selectedOptions.splice(this.selectedOptions.indexOf(option.identifier), 1);
          }
        }
      });
    }

    onSelectAll(checkbox) {
      let status = checkbox.currentTarget.checked;

      if(checkbox.currentTarget.checked) {

        this.options.forEach(option => {
          if (option.show && this.selectedOptions.indexOf(option.identifier) === -1) {
            this.selectedOptions.push(option.identifier);
            option.marked = true;
          }
        });
      } else {
        this.markSelectedOptions(false);
        // this.selectedOptions.splice(0, this.selectedOptions.length);
      }
    }

    getRowIdentifier(row) {
      return this.key.split(".").reduce((o, i) => o[i], row);
    }

    addToSelected(checkbox, row) {
      if(checkbox.currentTarget.checked) {
        this.selectedOptions.push(row.identifier);
      } else {
        this.selectedOptions.splice(this.selectedOptions.indexOf(this.getRowIdentifier(row)), 1);

        // this.selectedOptions.splice(0, this.selectedOptions.length);
      }
    }

    onUnSelectAll() {
      // this.selectedOptions.splice(0, this.selectedOptions.length);
      // this.options.forEach(option => {
      //   this.selectedOptions.push(option.id);
      // });
      // this.markSelectedOptions(false);
      this.selectedOptions.splice(0, this.selectedOptions.length);
      jQuery('.zui-gadget-checkbox-select-all').prop('checked', false);
    }

    _toggleCheckbox(data) {
     // console.log(data);
      //this.config.cycles = this.config.cycles || [];
      let _optionId = Number(data.currentTarget.value);
      if(data.currentTarget.checked) {
        this.selectedOptions.push(_optionId);
      } else {
        let i = 0;
        this.selectedOptions.forEach(optionId => {
          if(optionId === _optionId) {
            this.selectedOptions.splice(i, 1);
          } else {
            i++;
          }
        });
      }
    }

    hideDialog() {
      this.hideDialogBox = true;
    }
}
