import {Component, Input, Output, EventEmitter, NgZone, OnInit, OnDestroy, AfterViewInit} from '@angular/core';

// var autocomplete = require('jquery-ui/autocomplete');
import {ZephyrStore} from '../../../../store/zephyr.store';
import {ZQLAction} from '../../../../actions/zql.action';

import * as ACTION_EVENTS from '../../../../utils/constants/action.events';
import * as _ZQL_CONSTS from './zql_search.constants';
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
declare var _:any, $: any, zqlParserHandler: any, self: any;

var self;

/**
 * <zui-zql-search
 [releaseId]='releaseId'
 [zqlEntityName]='testcase''
 * ></zui-zql-search>
 * @param releaseId
 * @param zqlEntityName : 'testcase' || 'requirement' || 'testSchedule'
 * @param showFilters
 * @Output onZQLGo
 */
@Component({
  selector: 'zui-zql-search',
  providers: [ZQLAction],
  templateUrl: 'zql_search.html'
})

export class ZQLSearchComponent implements OnInit, OnDestroy, AfterViewInit {
  // Declaration
  @Input() releaseId: number;
  @Input() searchFieldSrcId: string;
  @Input() zqlEntityName: string;
  @Input() showFilters: boolean;
  @Input() hideGoButton: boolean;
  @Input() searchText: string = '';
  @Input() excludingMetadata : Array<Object>;
  @Output() onZQLGo: EventEmitter<any> = new EventEmitter();
  unsubscribe;
  autoCompleteMenuHidden = false;
  _acting = false; // For the store, since it does not have unsubscribe
  _errorMessage = '';
  _lookupKey = '';
  _zqlMetadata = {};
  _zqlValues = [];
  _zqlOptions = [];
  _previousFilters = [];
  _isPreviousSearch = false;
  _zephyrStore;
  _result;
  _timer;
  _searchRefId = '';

  // Constants
  i18nMessages = I18N_MESSAGES;
  constructor(private _zqlAction: ZQLAction, private zone:NgZone) {
    this._zephyrStore = ZephyrStore.getZephyrStore();
    this._acting = true;
    /**
     * Creating the metadata object
     */
    this._zqlMetadata[_ZQL_CONSTS.ZQL_METADATA_KEYS.TESTCASE] = {};
    this._zqlMetadata[_ZQL_CONSTS.ZQL_METADATA_KEYS.REQUIREMENT] = {};
    this._zqlMetadata[_ZQL_CONSTS.ZQL_METADATA_KEYS.TEST_SCHEDULE] = {};

    /**
     * Subscribe to the store
     */
    this.unsubscribe = this._zephyrStore.subscribe(() => {
      if(this._acting) {
        let zql = this._zephyrStore.getState().zql;

        var prevFiltersArr = [];
        //remove duplicates in prevFilters
        if(this.zqlEntityName === 'requirement') {
          prevFiltersArr = zql.previousFiltersRequirement;
        } else {
          prevFiltersArr = zql.previousFilters;
        }

        var uniqueFiltersArr = prevFiltersArr.filter(function(elem, index, self) {
          return index == self.indexOf(elem);
        });

        if(this.zqlEntityName === 'requirement') {
          zql.previousFiltersRequirement = uniqueFiltersArr;
        }else {
          zql.previousFilters = uniqueFiltersArr;
        }

        this.setZQLMetadata(zql);
        this.setZQLValues(zql);
        this.setPreviousFilters(zql);
      }
      self = this;
    });
    /**
     * Get the ZQL metadata
     */
    this.getZQLMetadata();
  }

  ngAfterViewInit() {
    this._searchRefId = `#zql-search-input-${this.searchFieldSrcId}`;
    self = this;

    if ((!$(`#zql-search-input-${this.searchFieldSrcId}`).parents(".modal").length || ($(`#zql-search-input-${this.searchFieldSrcId}`).parents(".modal").hasClass("in")))
      && !$(`#zql-search-input-${this.searchFieldSrcId}`).parents(".gadget-component").length) {
      setTimeout(() => {
        let keyVal = 38;

        $(`#zql-search-input-${this.searchFieldSrcId}`).focus();

        $(`#zql-search-input-${this.searchFieldSrcId}`).trigger ( {
          type: 'keypress', keyCode: keyVal, which: keyVal, charCode: keyVal
        });

        this.hideErrorMessage();
      }, 100);
    }
  }

  onKeyup(e) {
    if (e.which !== 13) {
      this.hideErrorMessage();
    }
  }

  /**
   * On init, get the previous filters
   */
  ngOnInit() {
    if(this.showFilters) {
      let storageParams = {
        key: _ZQL_CONSTS.ZQL_CONSTANTS[this.zqlEntityName],
        position: _ZQL_CONSTS.ZQL_CONSTANTS.POSITION_TOP
      };
      this._zephyrStore.dispatch(this._zqlAction.fetchPreviousFilters(storageParams));
    }
  }
  ngOnDestroy() {
    this._acting = false;
    this.unsubscribe();
    $(".ui-autocomplete").remove();
  }
  clearValue() {
    $(this._searchRefId).val('');
  }
  /**
   * Make a rest call to fetch the metadata
   */
  getZQLMetadata() {
    setTimeout(() => {
      /*let projectId = (JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)) ?
                          JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)).id : {});*/
      this._zephyrStore.dispatch(this._zqlAction.fetchZQLMetadata());
    }, 500);
  }
  /**
   * Rest call to get the zql values based on lookupKey
   */
  getZQLValues(key, text, releaseId, offset) {
    let _key = key,
      _queryParams = {};

    _queryParams[_ZQL_CONSTS.ZQL_VALUES_KEYS.PARTIAL_TEXT] = text;
    _queryParams[_ZQL_CONSTS.ZQL_VALUES_KEYS.RELEASE_ID] = releaseId;
    _queryParams[_ZQL_CONSTS.ZQL_VALUES_KEYS.OFFSET] = offset;
    _queryParams[_ZQL_CONSTS.ZQL_VALUES_KEYS.PAGE_SIZE] = _ZQL_CONSTS.ZQL_CONSTANTS.PAGE_SIZE;
    this._zephyrStore.dispatch(this._zqlAction.fetchZQLValues(_key, _queryParams));
  }
  /**
   * Set the metadata from store
   */
  setZQLMetadata(zql) {
    if(zql.event == ACTION_EVENTS.FETCH_ZQL_METADATA_SUCCESS && zql.metadata && _.isPlainObject(zql.metadata)) {
      this._zqlMetadata[_ZQL_CONSTS.ZQL_METADATA_KEYS.TESTCASE] =
        this.processZqlMetadataForEntity(zql.metadata[_ZQL_CONSTS.ZQL_METADATA_KEYS.TESTCASE]);
      this._zqlMetadata[_ZQL_CONSTS.ZQL_METADATA_KEYS.REQUIREMENT] =
        this.processZqlMetadataForEntity(zql.metadata[_ZQL_CONSTS.ZQL_METADATA_KEYS.REQUIREMENT]);
      this._zqlMetadata[_ZQL_CONSTS.ZQL_METADATA_KEYS.TEST_SCHEDULE] =
        this.processZqlMetadataForEntity(zql.metadata[_ZQL_CONSTS.ZQL_METADATA_KEYS.TEST_SCHEDULE]);
      setTimeout(() => {
        this.clearZQLEvent(ACTION_EVENTS.FETCH_ZQL_METADATA_SUCCESS);
      },50);
      this.populateAutocomplete('', 0);
    }
  }
  /**
   * Set the zql values from store
   */
  setZQLValues(zql) {
    if(zql.event == ACTION_EVENTS.FETCH_ZQL_VALUES_SUCCESS && zql.values && _.isArray(zql.values)) {
      this._zqlValues = zql.values;
      setTimeout(() => {
        this.clearZQLEvent(ACTION_EVENTS.FETCH_ZQL_VALUES_SUCCESS);
      },50);
      this._zqlOptions = this.parseResultForAutoComplete(this._zqlValues, _ZQL_CONSTS.ZQL_CONSTANTS.PARSE_VALUE);
      this.showPopupWithValues(this._zqlOptions);
    }
  }
  /**
   * Set the zql values from store
   */
  setPreviousFilters(zql) {
    //tcr or requirement filters

    if(this.zqlEntityName === 'requirement') {
      this._previousFilters = zql.previousFiltersRequirement;
    } else {
      this._previousFilters = zql.previousFilters;
    }

    if(zql.event == ACTION_EVENTS.FETCH_PREVIOUS_FILTERS_SUCCESS) {
      this.clearZQLEvent(ACTION_EVENTS.FETCH_PREVIOUS_FILTERS_SUCCESS);
    }
  }
  /**
   * Clear the event
   */
  clearZQLEvent(event) {
    this._zephyrStore.dispatch(this._zqlAction.clearZQLEvent(event));
  }
  /**
   * Processing ZQL metadata for each entity
   */
  processZqlMetadataForEntity(entityData) {
    let entries = [];
    for (var key in entityData) {
      if (entityData.hasOwnProperty(key)) {
        if (this.entityToBeIncluded(entityData[key])) {
          entries.push(this.convertToSimpleObject(entityData[key]));
        }
      }
    }
    return entries;
  }
  /*
   * Object conversion into a simple format.
   * */
  convertToSimpleObject(zqlField) {
    let entity = {};
    entity[_ZQL_CONSTS.ZQL_CONSTANTS.ENTITY_NAME] = zqlField[_ZQL_CONSTS.ZQL_CONSTANTS.ENTITY_NAME];
    entity[_ZQL_CONSTS.ZQL_CONSTANTS.NAME] = zqlField[_ZQL_CONSTS.ZQL_CONSTANTS.NAME];
    entity[_ZQL_CONSTS.ZQL_CONSTANTS.DATA_TYPE] = zqlField[_ZQL_CONSTS.ZQL_CONSTANTS.DATA_TYPE];
    // ignore isVisible
    entity[_ZQL_CONSTS.ZQL_CONSTANTS.LOOKUP] = zqlField[_ZQL_CONSTS.ZQL_CONSTANTS.LOOKUP];
    entity[_ZQL_CONSTS.ZQL_CONSTANTS.LOOKUP_KEY] = zqlField[_ZQL_CONSTS.ZQL_CONSTANTS.LOOKUP_KEY];
    entity[_ZQL_CONSTS.ZQL_CONSTANTS.VISIBLE] = zqlField[_ZQL_CONSTS.ZQL_CONSTANTS.VISIBLE];
    let opArray = [];
    for (let opName in zqlField[_ZQL_CONSTS.ZQL_CONSTANTS.OPERATOR_TO_FIELD_MAP]) {
      opArray.push(opName);
    }
    entity[_ZQL_CONSTS.ZQL_CONSTANTS.OPERATORS] = opArray ;
    return entity ;
  }
  populateAutocomplete(text, position) {
    if(this.zqlEntityName) {
      this._result = zqlParserHandler.doParse(text, this._zqlMetadata[this.zqlEntityName], position);
      if(this._result.myoptions.appErrorMessage) {
        // this._errorMessage = this._result.myoptions.appErrorMessage;
        return;
      } else if (this._result && this._result.myoptions.userChoices) {
        this._zqlOptions = this._result.myoptions.userChoices;
        this._zqlOptions = this.parseResultForAutoComplete(this._result.myoptions.userChoices, '');
        this.showPopupWithValues(this._zqlOptions);
      } else if (this._result && this._result.myoptions.lookupField) {
        var field = this._result.myoptions.lookupField ;
        this._lookupKey = field[_ZQL_CONSTS.ZQL_CONSTANTS.LOOKUP_KEY];
        this.getOptions(this._lookupKey, this._result.myoptions.lookupValue);
      } else {
        this._zqlOptions = [];
        this.showPopupWithValues(this._zqlOptions);
      }
      if(this._result.syntaxError && this._result.syntaxError.message) {
        this.zone.run(() => {
          // this._errorMessage = this._result.syntaxError.message;
          // this._errorMessage += ` At offset ${(this._result.syntaxError.offset + 1)}.`;
        });
      } else
        this._errorMessage = '';
    } else {
      //  console.log('Enter valid entity name');
    }
  }
  /**
   * Parse result to match autocomplete data options for values
   */
  parseResultForAutoComplete(choices, type) {
    return _.map(choices, (choice, index) => {
      let _choice = (type == _ZQL_CONSTS.ZQL_CONSTANTS.PARSE_VALUE) ? choice[0]: choice,
        _text = (type == _ZQL_CONSTS.ZQL_CONSTANTS.PARSE_VALUE) ? '"' + _choice + '"': _choice;
      return {
        label: _choice,
        value: encodeURIComponent(_choice),
        text: _text
      };
    });
  }


  hideErrorMessage() {
    $("#zql-error").hide();
  }

  showErrorMessage() {
    $("#zql-error").show();
  }

  /**
   * On Click of Go get the zql and pass it to parent component
   */
  onGoClick(dontShowMessage = false) {
    // if (this._errorMessage.length && !dontShowMessage) {
    //   this.showErrorMessage();
    // } else {
    //   //console.log(this.autoCompleteMenuHidden);
      if(this.autoCompleteMenuHidden) {
        return;
      }
      let _zqlText = this.searchText = $( this._searchRefId ).val();
      this._result = zqlParserHandler.doParse(_zqlText, this._zqlMetadata[this.zqlEntityName], _zqlText.length);
      if(this._result.syntaxError) {
        this._errorMessage = this._result.syntaxError.message;
        return;
      }
      this._errorMessage = '';
      this.onZQLGo.emit($.trim(_zqlText));
      let storageParams = {
        key: _ZQL_CONSTS.ZQL_CONSTANTS[this.zqlEntityName],
        value: _zqlText,
        position: _ZQL_CONSTS.ZQL_CONSTANTS.POSITION_TOP
      };
      if(!this._isPreviousSearch) {
        this._zephyrStore.dispatch(this._zqlAction.createPreviousFilter(storageParams));
      }
      this._isPreviousSearch = false;
    // }
  }
  /**
   * Perform search on click of previous filter
   */
  performSearch(ev, value) {
    if(!value || value == '0') {
      return;
    }
    $( this._searchRefId ).val(value);
    this._isPreviousSearch = true;
    this.onGoClick();
  }
  autoCompleteKeyDownOps(ev) {
    this.autoCompleteMenuHidden = false;
    if( (ev.keyCode === $.ui.keyCode.TAB) &&
      $(this._searchRefId).autocomplete( 'instance' ).menu.active ) {
      ev.preventDefault();
    }
    if( ev.keyCode === $.ui.keyCode.ENTER) {
      self.onGoClick();
    }
  }
  autoCompleteKeyUpOps(ev) {
    this.autoCompleteMenuHidden = false;
    clearTimeout(this._timer);
    //this._timer = setTimeout(() => {
    if( (ev.keyCode == $.ui.keyCode.UP || ev.keyCode == $.ui.keyCode.DOWN) &&
      $(this._searchRefId).autocomplete( 'instance' ).menu.active ) {
      ev.preventDefault();
      return;
    }
    let _text = $(this._searchRefId).val();
    if(ev.keyCode == $.ui.keyCode.BACKSPACE) {
      this.populateAutocomplete(_text, ev.target.selectionStart);
      return;
    }
    if(!_.includes(_ZQL_CONSTS.AUTOCOMPLETE_KEY_CODES, ev.keyCode)) {
      //  console.log('"' + _text + '"');
      if(/\s/g.test(_text)) {
        this._timer = setTimeout(() => {
          this.populateAutocomplete(_text, ev.target.selectionStart);
        }, 50);
      }
      return;
    }
    //}, 250);
  }
  /**
   * attach autocomplete box
   */
  showPopupWithValues(data) {
    let searchItemMaxLength = 80;

    function split( val ) {
      // TODO: update the regex
      return val.split(' ');
    }
    function extractLast( term ) {
      return split( term ).pop();
    }

    let self = this;

    $(this._searchRefId)
    // don't navigate away from the field on tab when selecting an item
      .unbind('keydown', this.autoCompleteKeyDownOps)
      .bind( 'keydown', this.autoCompleteKeyDownOps)
      .unbind('keyup', $.proxy(this.autoCompleteKeyUpOps, this))
      .bind('keyup', $.proxy(this.autoCompleteKeyUpOps, this))
      .autocomplete({
        minLength: 0,
        source: function(request, response) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            data, extractLast(request.term)));
        },
        focus: function(ev, ui) {
          // prevent value inserted on focus
          return false;
        },
        select: function(ev, ui) {
          var terms = split(this.value);
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push(ui.item.text);
          this.value = terms.join(' ');
          self.autoCompleteMenuHidden = true;
          // self.onGoClick();
          self.hideErrorMessage();
          return false;
        }
      })
      .autocomplete('instance')._renderItem = (ul, item) => {
      this.hideErrorMessage();

      if(item.label.length > searchItemMaxLength) {
        return $('<li title=' + item.text + '>')
          .append('<a>' + item.label.substr(0, searchItemMaxLength) + '...' + '</a>')
          .appendTo(ul);
      } else {
        return $('<li>')
          .append('<a>' + item.label + '</a>')
          .appendTo(ul);
      }
    };
  }
  /**
   * get ZQL options
   */
  getOptions(key, value) {
    value = value || '';
    value = value.replace(/(^"|"$)/g, ''); // Remove first and last quotes
    this.getZQLValues(key, value, this.releaseId, _ZQL_CONSTS.ZQL_CONSTANTS.INITIAL_OFFSET);
  }
  /**
   * removes unrequired metadata from the list
   */


  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.onGoClick();
    }
  }

  entityToBeIncluded (entity) {
    let excludingMetadata = this.excludingMetadata,
      toBeIncluded = true;
    _.each(excludingMetadata , (metadataName) => {
      if (metadataName === entity.name) {
        toBeIncluded = false;
      }
    });
    return toBeIncluded;
  }
}
