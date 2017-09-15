import {
  Component,
  Output,
  Input,
  EventEmitter,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  ElementRef,
  Inject
} from '@angular/core';

declare var jQuery: any, _: any;

@Component({
  selector: 'zee-select',
  templateUrl: 'select.html'
})

export class SelectComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() selectClass = '';
  @Input() selectId = '';
  @Input() allowClear = false;
  @Input() items = [];
  @Input() active = [];
  @Input() tags;
  @Input() multiple = false;
  @Input() placeholder = '';
  @Input() editOptions;
  @Input() hideSearch = false;
  @Input() removeOnSelect = false;
  @Input() saveOnEnter = false;
  @Input() formkey;
  @Input() checkBoxMultiple;

  @Output() onSelect: EventEmitter < any > = new EventEmitter();
  @Output() onUnselect: EventEmitter < any > = new EventEmitter();
  @Output() onToggle: EventEmitter < any > = new EventEmitter();
  @Output() onSubmit: EventEmitter < any > = new EventEmitter();
  @Output() onInit: EventEmitter < any > = new EventEmitter();
  @Output() onResult: EventEmitter < any > = new EventEmitter();

  optItems;
  private elementRef: ElementRef;
  private element;
  private closeDebounce;
  private change = false;
  private isClick = false;
  private searching = false;

  constructor(@Inject(ElementRef) elementRef: ElementRef) {
    this.elementRef = elementRef;
    this.element = jQuery(elementRef.nativeElement).children('select');
  }
  ngOnDestroy() {
    jQuery('#select2--results').closest('.select2-container').remove();
    jQuery('.zui-content-layout.layout6').off('scroll');
  }
  ngOnChanges(changedNode) {
    this.element = this.element.length ? this.element : jQuery(this.elementRef.nativeElement).children('select');

    Object.keys(changedNode).forEach(key => {
      switch (key) {
        case 'items':
          if (!_.isEqual(this.optItems, this.items)) {
            this.optItems = this.items;
            setTimeout(() => {
                this.element.val(this.active).trigger('change');
            });
          }
          break;
        case 'active':
            setTimeout(() => {
                this.element.val(this.active).trigger('change');
            });
            break;
        default:
            break;
        }
    });
  }
  ngAfterViewInit() {
    this.element = this.element.length ? this.element : jQuery(this.elementRef.nativeElement).children('select');

    let options = {
      placeholder: this.placeholder,
      allowClear: this.allowClear
    };

    if (this.hideSearch) {
      options['minimumResultsForSearch'] = Infinity;
    }
    if (_.isBoolean(this.tags) && this.tags) {
      this.tags = {
        token: [' ', ',']
      };
    }
    if (_.isObject(this.tags) && !_.isEmpty(this.tags)) {
      this.multiple = true;
      options['tags'] = true;
      options['tokenSeparators'] = this.tags.token || [' ', ','];
      options['createTag'] = this.tags.createTag instanceof Function ? this.tags.createTag : tag => ({
        id: tag.term,
        text: tag.term,
        isNew: true
      });
    }

    if (this.editOptions && this.editOptions.templateSelection) {
      options['templateSelection'] = this.editOptions.templateSelection;
      options['templateResult'] = this.editOptions.templateResult;
    }

    if (this.editOptions && this.editOptions.ajax && _.isObject(this.editOptions.ajax)) {
      let ajax = this.editOptions.ajax;
      options['ajax'] = {
        url: ajax.url,
        dataType: 'json',
        delay: 250,
        headers: ajax.headers,
        data: params => {
            if (!params.term || this.element.data('unselect')) {
                return false;
            }
            this.searching = true;
            let dataParams = {
                [ajax.searchParam]: params.term
            };
            if (ajax.queryParams && _.isObject(ajax.queryParams)) {
                jQuery.extend(dataParams, ajax.queryParams);
            }
            return dataParams;
        },
        processResults: result => {
            jQuery(this.element).next().find('.select2-search__field').focus();
            this.searching = false;

            let data = {
              results: result.map(data => (_.isObject(data) ? {
                id: data.id || data.key || data.text || data.value || '',
                text: data.text || data.value || '',
                color: data.color || ''
              } : {
                id: data,
                text: data
              }))
            };

            this.onResult.emit({element: this.element, data});
            return data;
        }
      };
      options['escapeMarkup'] = markup => markup;
      options['minimumInputLength'] = 1;
      options['templateResult'] = result => `<option style="color:${result.color};" value="${result.id || ''}">${_.escape(result.text || '')}</option>`;
      options['templateSelection'] = a => _.escape(a.text);
    }

    setTimeout(() => {

      this.change = false;
      this.element.select2(options).on('select2:select', ev => {
        let text = ev.params.data.text;
        text = _.isObject(text) ? text.text || '' : text || '';

        let stringId = ev.params.data.id;
        let numId = Number(stringId);
        let id = isNaN(numId) ? stringId : numId;
        this.active.push(stringId);
        if (text && id != undefined && id != null && (isNaN(numId) ? stringId.length > 0 : true)) {
            this.onSelect.emit({text, id});
        }
        setTimeout(() => {
          this.change = true;
        }, 10);
      }).on('select2:unselect', ev => {
        let text = ev.params.data.text;
        text = _.isObject(text) ? text.text || '' : text || '';

        let stringId = ev.params.data.id;
        let numId = Number(stringId);
        let id = isNaN(numId) ? stringId : numId;

        if (-1 !== this.active.indexOf(stringId)) {
          this.active.splice(this.active.indexOf(stringId), 1);
        }
        this.element.select2('close');
        if (text && id != undefined && id != null && (isNaN(numId) ? stringId.length > 0 : true)) {
            this.onUnselect.emit({text, id});
        }
        setTimeout(() => {
          this.change = true;
        }, 10);
      }).on('select2:selecting', ev => {
        // do not select a value which  is already present
        let values = jQuery(ev.currentTarget).select2('val');
        return -1 === (Array.isArray(values) ? values : []).indexOf(ev.params.args.data.id);
      }).on('select2:unselecting', ev => {

        // add temp data attribute so that select2 can be closed on clear
        this.element.data('unselect', true);
        setTimeout(() => {
            this.element.data('unselect', false);
        }, 100);

        // if tag is manually cleared or if removeOnSelect, clear the tag
        // if already added tag is selected again (mouse click) do nothing
        if (!(ev.params.args.data.element || this.removeOnSelect)) {
            this.element.select2('close');
            return false;
        }
        return true;
      }).on('select2:open', ev => {
        setTimeout(() => {
            if (this.element.data('unselect') || !(document.body.contains(ev.target))) {
                this.element.select2('close');
                return;
            }
            this.element.data('unselect', false);
            let type = 'open';
            let target = ev.target;
            this.onToggle.emit({type, target});
            this.determineChange();
        });
      }).on('select2:closing', () => {
        return !this.searching;
      }).on('select2:close', ev => {
        jQuery('#select2--results').closest('.select2-container').remove();
        if (this.closeDebounce) {
          clearTimeout(this.closeDebounce);
        }
        this.closeDebounce = setTimeout(() => {
          this.element.next().find('.select2-search__field').off('click.select2').on('click.select2', () => {
            this.isClick = true;
            setTimeout(() => {
              this.isClick = false;
            }, 50);
          });
          this.closeDebounce = null;
          let type = 'close';
          let target = ev.target;

          let text = (ev.params.originalSelect2Event || {
            data: {}
          }).data.text;
          let stringId = (ev.params.originalSelect2Event || {
            data: {}
          }).data.id;

          let numId = Number(stringId);
          let id = isNaN(numId) ? stringId : numId;

          this.onToggle.emit({type, target, ev, text, id});
        }, 100);

      }).val(this.active).trigger('change');

      setTimeout(() => {
        this.onInit.emit(this.element);
      });
    });

  }
  escapeHTML(value) {
    return _.isObject(value) ? _.escape(value.text || '') : _.escape(value || '');
  }
  getId(id) {
    return id || 0 === id ? id : '';
  }
  determineChange() {
    if (this.change && !this.isClick && !this.element.next().find('.select2-search__field').val() && this.saveOnEnter) {
      this.element.select2('close');
      this.onSubmit.emit();
      this.change = false;
    }
  }
}
