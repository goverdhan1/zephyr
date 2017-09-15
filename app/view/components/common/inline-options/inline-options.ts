import {Component, Input, Output, EventEmitter, ElementRef, AfterViewInit} from '@angular/core';
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
declare var _: any, jQuery: any;

@Component({
    selector: 'zui-inline-options',
    templateUrl: 'inline-options.html'
})
export class InlineOptionsComponent {
    @Input() parentId;//If in a single page multiple inline options are defined then parentId is used to distinguish between them.
    @Input() options = [];
    @Input() selectedOptions = [];
    @Input() selectOnlyOne = false;
    @Input() searchPlaceholder = 'Search';

    public filter : string = "";
    public lastSearchTerm : string = "";
    hideDialogBox = false;

    i18nMessages = I18N_MESSAGES;

    constructor(private el: ElementRef) {
     // console.log('');
    }

    openDialog(value) {
      this.hideDialogBox = false;
      this.filter = '';
      this.lastSearchTerm = '';
      let markSelectAll = true;

      this.markSelectedOptions(this.selectedOptions, true);

      this.options.forEach(option => {
        option.show = true;
        let element;
        if(this.parentId) {
          element = jQuery('#zui-gadget-checkbox-' + this.parentId + '-' + option.id);
        } else {
          element = jQuery('#zui-gadget-checkbox--' + option.id);
        }
        markSelectAll = markSelectAll && element.is(":checked");
      });
      jQuery('.zui-gadget-checkbox-select-all').prop('checked', markSelectAll && this.options.length > 0);
    }

    //value is whether to mark selected or unselected. true to select and false to unselect
    markSelectedOptions(optionsToMark, value) {
      optionsToMark.forEach(optionId => {
        this.markOption(optionId, value);
      });
    }

    markOption(id, value) {
      if(this.parentId) {
        jQuery('#zui-gadget-checkbox-' + this.parentId + '-' + id).prop('checked', value);
      } else {
        jQuery('#zui-gadget-checkbox--' + id).prop('checked', value);
      }
    }

    inputKeyPress(event) {
      if (event.which == 13 || event.keyCode == 13) {
        jQuery('.zui-gadget-checkbox-select-all').prop('checked', false);
        this.searchOptions();
      }
      return true;
    }

    searchOptions() {
      if (!_.isEqual(this.lastSearchTerm, this.filter)) {
        let markSelectAll = true;
        let hasAtleastOneMarked = false;//if there is no matching result with the search that user performed then no need to mark selectAll checkbox.
        this.options.forEach((option) => {
          option.show = _.startsWith(option.text.toLocaleLowerCase(), this.filter.toLocaleLowerCase());
          if(option.show) {
            hasAtleastOneMarked = true;
            let element;
            if(this.parentId) {
              element = jQuery('#zui-gadget-checkbox-' + this.parentId + '-' + option.id);
            } else {
              element = jQuery('#zui-gadget-checkbox--' + option.id);
            }
            markSelectAll = markSelectAll && element.is(":checked");
          }
        });

        jQuery(".zui-gadget-checkbox-select-all").prop("checked", markSelectAll && hasAtleastOneMarked);
        this.lastSearchTerm = this.filter;
      }
    }

    changeAll(value) {
      jQuery(`#inline-options-${this.parentId}-container`).find('input[name=zui-gadget-checkbox]').prop("checked", value);
    }

    onSelectAll(checkbox) {
      //this.selectedOptions.splice(0, this.selectedOptions.length);
      this.options.forEach(option => {
        if(option.show) {
          if(checkbox.currentTarget.checked) {
            this.markOption(option.id, true);
            if(this.selectedOptions.indexOf(option.id) === -1) {
              this.selectedOptions.push(option.id);
            }
          } else {
            this.markOption(option.id, false);
            let index = this.selectedOptions.indexOf(option.id);
            if(index !== -1) {
              this.selectedOptions.splice(index, 1);
            }
          }
        }
      });
    }

    onUnSelectAll() {
      this.selectedOptions.splice(0, this.selectedOptions.length);
      this.options.forEach(option => {
        this.selectedOptions.push(option.id);
      });
      this.changeAll(false);
      this.selectedOptions.splice(0, this.selectedOptions.length);
      jQuery('.zui-gadget-checkbox-select-all').prop('checked', false);
    }

    _toggleCheckbox(data) {
      //console.log(data);
      //this.config.cycles = this.config.cycles || [];
      let _optionId = data.currentTarget.value;
      if(data.currentTarget.checked) {
        if(this.selectOnlyOne) {
          this.onUnSelectAll();
        }
        this.selectedOptions.push(_optionId);
        if(this.selectOnlyOne) {
          this.markSelectedOptions(this.selectedOptions, true);
        }
      } else {
        let i = 0;
        this.selectedOptions.forEach(optionId => {
          if(optionId == _optionId) {
            this.selectedOptions.splice(i, 1);
          } else {
            i++;
          }
        });
      }

      if (!data.currentTarget.checked) {
        jQuery(`#select-all-options-${this.parentId}`).prop("checked", false);
      }
    }

    hideDialog() {
      this.hideDialogBox = true;
    }
}
