import {
  Component,
  Output,
  Input,
  EventEmitter,
  AfterViewInit,
  OnChanges,
  ElementRef,
  Inject
} from '@angular/core';

declare var jQuery: any, _: any;

@Component({
  selector: 'zee-multi-select',
  templateUrl: 'multi-select.html'
})

export class MultiSelectComponent implements AfterViewInit, OnChanges {
  @Input() selectClass = '';
  @Input() selectId = '';
  @Input() items = [];
  @Input() active = [];
  @Input() placeholder = '';

  @Output() onChange: EventEmitter < any > = new EventEmitter();

  private elementRef: ElementRef;
  private element;
  private selectedItems = [];

  constructor(@Inject(ElementRef) elementRef: ElementRef) {
    this.elementRef = elementRef;
  }
  ngOnChanges(changedNode) {

    if (changedNode.items || changedNode.active) {

      this.items.forEach((item) => {

        if (this.active.indexOf(item.id) !== -1) {
          item.selected = true;
        } else {
          item.selected = false;
        }

      });

    }
  }
  ngAfterViewInit() {
    let self = this;

    setTimeout(() => {
      jQuery(`#${this.selectId}`).multiselect({
        includeSelectAllOption: true,
        enableFiltering: true,

        onSelectAll: function() {
          self.selectedItems = _.map(self.items, 'id');
        },

        onDeselectAll: function() {
          self.selectedItems = [];
        },

        onChange: function(option, checked, select) {
          if (option) {
            let index = jQuery(option).index();

            if (checked) {
              self.selectedItems.push(self.items[index].id);
            } else {
              self.selectedItems.splice(self.selectedItems.indexOf(self.items[index].id), 1);
            }
          } else if (!checked) {
            self.selectedItems = [];
          }

          self.onChange.emit({
            selection: self.selectedItems
          });
        }
      });

      // this.element.select2(options).on('select2:select', ev => {
      //   let text = ev.params.data.text;
      //   let stringId = ev.params.data.id;
      //   let numId = Number(stringId);
      //   let id = isNaN(numId) ? stringId : numId;
      //   this.active.push(stringId);
      //   if (text && id != undefined && id != null && (isNaN(numId) ? stringId.length > 0 : true)) {
      //     this.onSelect.emit({
      //       text,
      //       id
      //     });
      //   }
      //   setTimeout(() => {
      //     this.change = true;
      //   }, 10);
      // }).on('select2:unselect', ev => {
      //   let text = ev.params.data.text;
      //   let stringId = ev.params.data.id;
      //   let numId = Number(stringId);
      //   let id = isNaN(numId) ? stringId : numId;
      //
      //   if (-1 !== this.active.indexOf(stringId)) {
      //     this.active.splice(this.active.indexOf(stringId), 1);
      //   }
      //   this.element.select2('close');
      //   if (text && id != undefined && id != null && (isNaN(numId) ? stringId.length > 0 : true)) {
      //     this.onUnselect.emit({
      //       text,
      //       id
      //     });
      //   }
      //   setTimeout(() => {
      //     this.change = true;
      //   }, 10);
      // }).on('select2:selecting', ev => {
      //   // do not select a value which  is already present
      //   let values = jQuery(ev.currentTarget).select2('val');
      //   return -1 === (Array.isArray(values) ? values : []).indexOf(ev.params.args.data.id);
      // }).on('select2:unselecting', ev => {
      //
      //   // add temp data attribute so that select2 can be closed on clear
      //   this.element.data('unselect', 'true');
      //   setTimeout(() => {
      //     this.element.removeData('unselect');
      //   }, 100);
      //
      //   // if tag is manually cleared or if removeOnSelect, clear the tag
      //   // if already added tag is selected again (mouse click) do nothing
      //   if (!(ev.params.args.data.element || this.removeOnSelect)) {
      //     this.element.select2('close');
      //     return false;
      //   }
      //   return true;
      // }).on('select2:open', ev => {
      //   if (this.element.data('unselect')) {
      //     this.element.select2('close');
      //     this.element.removeData('unselect');
      //     return;
      //   }
      //   this.element.removeData('unselect');
      //   let type = 'open';
      //   let target = ev.target;
      //   this.onToggle.emit({
      //     type,
      //     target
      //   });
      //   this.determineChange();
      // }).on('select2:close', ev => {
      //   if (this.closeDebounce) {
      //     clearTimeout(this.closeDebounce);
      //   }
      //   this.closeDebounce = setTimeout(() => {
      //     this.element.next().find('.select2-search__field').off('click.select2').on('click.select2', ev => {
      //       this.isClick = true;
      //       setTimeout(() => {
      //         this.isClick = false;
      //       }, 50);
      //     });
      //     this.closeDebounce = null;
      //     let type = 'close';
      //     let target = ev.target;
      //
      //     let text = (ev.params.originalSelect2Event || {
      //       data: {}
      //     }).data.text;
      //     let stringId = (ev.params.originalSelect2Event || {
      //       data: {}
      //     }).data.id;
      //     let numId = Number(stringId);
      //     let id = isNaN(numId) ? stringId : numId;
      //
      //     this.onToggle.emit({
      //       type,
      //       target,
      //       ev,
      //       text,
      //       id
      //     });
      //   }, 100);
      //
      // }).val(this.active).trigger('change');
    });
  }
  determineChange() {
    // if (this.change && !this.isClick && !this.element.next().find('.select2-search__field').val() && this.saveOnEnter) {
    //   this.element.select2('close');
    //   // this.onSubmit.emit();
    //   this.change = false;
    // }
  }
}
