import {Component, Input, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';

import {ZephyrStore} from '../../../../store/zephyr.store';
import {ReportAction} from '../../../../actions/report.action';
import {AdminAction} from '../../../../actions/admin.action';

// Constants
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import * as EXPORT_CONSTANTS from './export.constant';
import {GENERATE_REPORT_TEMPLATE_SUCCESS, FETCH_REPORT_TEMPLATE_SUCCESS} from '../../../../utils/constants/action.events';
import {API_PATH} from '../../../../utils/constants/api.constants';

declare var jQuery: any, _: any, moment;

@Component({
    selector: 'zui-export',
    providers: [ReportAction, AdminAction],
    templateUrl: 'export.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportComponent implements AfterViewInit, OnDestroy {
    @Input() fieldOptions;
    @Input() isSearchView;
    public _filters = [];
    unsubscribe;
    _previousValue = {};
    showDirtyCheckModal = false;
    _metadata = {
        detail: '',
        fields: [],
        filters: []
    };
    _detailTypeData = []; // Contain the detail types

    _isTypeData = false;
    _outputType = {
        checked: true,
        value: EXPORT_CONSTANTS.CUSTOM_REPORT_OUTPUT_PDF
    };
    _fields = {};
    _reportType = {
        checked: true,
        value: EXPORT_CONSTANTS.CUSTOM_REPORT_DETAIL_SUMMARY
    };
    _isReportToDashboard = false;
    _isReportToProject = false;
    _preferences = {};
    _zephyrStore;
    _fieldPipeParams = {
        delimiter: '\n'
    };
    _performSave = true;
    _downloadLink = '';
    i18nMessages = I18N_MESSAGES;
    _EXPORT_CONSTANTS = EXPORT_CONSTANTS; // Assigning it here to use in templates
    syncMessages = {
      'success' : 'Syncing completed successfully',
      'failure' : 'Syncing failed'
    };
    changeDetectionDebounce;
    constructor(private _reportAction: ReportAction, private _adminAction: AdminAction, private cdr: ChangeDetectorRef) {
        this._zephyrStore = ZephyrStore.getZephyrStore();

        this.unsubscribe = this._zephyrStore.subscribe(() => {
            let _state = this._zephyrStore.getState();
            if(_state.report.event == FETCH_REPORT_TEMPLATE_SUCCESS) {
                this._zephyrStore.dispatch(this._reportAction.clearReportEvent());
                this.setMetadata(_state);
                this.setPreferences(_state);
            }
            let fieldOptionsId = this.fieldOptions ? this.fieldOptions.id || '' : '';
            if(_state.report.event == GENERATE_REPORT_TEMPLATE_SUCCESS + fieldOptionsId) {
                this._zephyrStore.dispatch(this._reportAction.clearReportEvent());
                let report = _state.report.report;
                if(Array.isArray(report) && report.length) {
                    this.initFileDownload(report);
                } else {
                    this._zephyrStore.dispatch(this._reportAction.onError(this.i18nMessages['zephyr.export.download.nodata.title']));
                }
            }
            this.triggerChange();
        });
    }
    initExportModal() {
        this._reportType = {
            checked: true,
            value: EXPORT_CONSTANTS.CUSTOM_REPORT_DETAIL_SUMMARY
        };
        this._isTypeData = false;
        this._outputType = {
            checked: true,
            value: EXPORT_CONSTANTS.CUSTOM_REPORT_OUTPUT_PDF
        };
        this._detailTypeData = []; // Contain the detail types
        this._isReportToDashboard = false;
        this._isReportToProject = false;
        this._performSave = true;
        this._downloadLink = '';

    }
    ngAfterViewInit() {
        setTimeout(() => {
            let _state = this._zephyrStore.getState();

            if (!_state.adminPref || !_state.adminPref.isUpdated) {
              this.getAllPreferences();
            }

            jQuery('#zui-export-modal-' + this.fieldOptions.id).on('show.bs.modal', () => {
                this.initExportModal();
                let _state = this._zephyrStore.getState();
                this.setMetadata(_state);
                this.setPreferences(_state);
                this._outputType.value = this._EXPORT_CONSTANTS.CUSTOM_REPORT_OUTPUT_PDF;
                jQuery('#zui-export-checkbox-select-all').prop('checked', false);
                jQuery('#zui-export-title-' + this.fieldOptions.id).val(this.fieldOptions.label);
                this._isTypeData = false;
                this.triggerChange();
            }).on('shown.bs.modal', () => {
                this.displayFilterUIComponents();
                this.triggerChange();
                this.clickFirstEl();
            });

        }, 10);
    }

    showDatepicker() {
        jQuery('.datepicker').show();
    }

    closeDatepicker() {
        jQuery('.datepicker').hide();
    }

    clickFirstEl() {
      setTimeout(() => {
        if (jQuery('.export-options').length) {
          jQuery('.export-options').first().trigger('click');
        } else {

          setTimeout(() => {
            this.clickFirstEl();
          }, 100);

        }
      }, 100);
    }

    ngOnDestroy() {
        this.unsubscribe();
        jQuery('#zui-export-modal-' + this.fieldOptions.id).remove();
    }
    /**
     * Attach the UI components for the filters
     */
    displayFilterUIComponents() {
        let _fieldOptionId = this.fieldOptions.id;

        jQuery('#zui-export-select-report-to-dashboard-' + _fieldOptionId).select2({
            width: 150,
            minimumResultsForSearch: -1
        }).select2('val', []);

        jQuery('#zui-export-select-report-to-project-' + _fieldOptionId).select2({
            width: 120,
            minimumResultsForSearch: -1
        }).select2('val', []);

        let jQueryseletedEl = jQuery('#zui-export-modal-' + _fieldOptionId + ' .zui-panel-tab-bar-heading-label')[0];
        jQuery('.zui-panel-tab-bar-heading-label').removeClass('selected');
        jQuery(jQueryseletedEl).addClass('selected');
        jQuery('.zui-panel-row-wrapper').off('mouseenter').on('mouseenter', ev => {
            this.scrollToFilter(ev);
        });
        this.resizeFilterUI();
        jQuery('#zui-export-radio-output-pdf-' + this.fieldOptions.id).prop('checked', true); // Check the output pdf
    }
    scrollToFilter(ev) {
        let elID = jQuery(jQuery(ev.currentTarget).data('target'));
        if(!elID.hasClass('selected')) {
            jQuery('.zui-panel-tab-bar-heading-label').removeClass('selected');
            elID.addClass('selected');
        }
    }
    resizeFilterUI() {
        let  _height = jQuery(jQuery('.zui-panel-tab-bar-heading-label.selected').data('target')).css('height');

        if(_height) {
            jQuery('#zui-panel-tab-bar-body-filters-' + this.fieldOptions.id).css('height', _height);
        }
    }
    /**
     * File download
     */
    initFileDownload(report) {
        this._downloadLink = report[0];
        setTimeout(()=>{
            jQuery('#zui-export-modal-' + this.fieldOptions.id + '-download').modal();
        }, 30);

    }
    /**
     * @Events
     * Download file on click
     */
    onClickDownloadFile() {
        document.getElementById('export-file-download-iframe')['src'] = API_PATH.BASE_FLEX + '/' +  this._downloadLink;
        this.closeModal();
    }
    jobCompleted(response) {
        if(response && response.length) {
            this._zephyrStore.dispatch(this._reportAction._onGenerateReportTemplate(response, this.fieldOptions.id));
        } else {
            let error = {
                'status': 34,
                'errorMsg':'140004,No Data Present for Report Generation.',
                'errorCode':'110z01',
                '_body': {
                    'errorMsg':'No Data Present for Report Generation.',
                    'errorCode':'110z01'
                }
            };
            this._zephyrStore.dispatch(this._reportAction.onError(error));
        }
    }
    /**
     * Get the metadata
     */
    getExportMetadata(reportType) {
        this._zephyrStore.dispatch(this._reportAction.getReportTemplate(EXPORT_CONSTANTS[reportType]));
    }
    /**
     * Get all preference, if logged in user is a manager
     */
    getAllPreferences() {
        let user = this._zephyrStore.getState().loggedInUser;
        let isManager = (user.roles || []).filter((role) => 'manager' === role.name);
        if (isManager.length) {
            this._zephyrStore.dispatch(this._adminAction.getAllPref());
        }
    }

     setFieldsOptions(fO) {
        this.fieldOptions = fO;
     }
    /**
     * Set the metadata
     */
    setMetadata(state) {
        this._metadata = state.report.metadata;
        this._fields = this.getDefaultFields(null);
        this.buildDetails();

        // keeping a copy and reassigning it back to the metadata after setting previous value.
        // this is required because in setMetadataValues we set few variables as false which doesn't come from server.
        let metadataCopy = _.cloneDeep(this._metadata);
        this.setMetadataValues();
        this._previousValue = _.cloneDeep(this._metadata);
        this._metadata = _.cloneDeep(metadataCopy);
    }
    /**
     * Set the preferences
     * build the filters
     */
    setPreferences(state) {
        let _preferences = {};

        if(Array.isArray(this._metadata.filters) && this._metadata.filters.length) {
            try {
                this._filters = this._metadata.filters && JSON.parse(JSON.stringify(this._metadata.filters));
            } catch(e) {
                //console.log(e);
            }
            _preferences = state.adminPref;
            //console.log('this filters', this._filters);
            this._filters = this._filters.map(_filter => {

                let _preference = _preferences[_filter.value];
                //console.log('filter inn filter type',_filter.filterType );
                if((_filter.filterType == EXPORT_CONSTANTS.CUSTOM_REPORT_FILTER_BINARY_ALL) // filterType: 'binaryAll', 'preferenceKey'
                    || (_filter.filterType == EXPORT_CONSTANTS.CUSTOM_REPORT_FILTER_PREF_KEY)) {
                    try {
                        _preference = _preference &&
                          JSON.parse(_preference).map(item => ({id: item.id, text: item.value, color: item.color || ''}));
                    } catch(e) {
                      //  console.log(e);
                    }
                } else if((_filter.filterType == EXPORT_CONSTANTS.CUSTOM_REPORT_FILTER_USER_LIST) // filterType: 'userList', 'assignedTo'
                    || (_filter.filterType == EXPORT_CONSTANTS.CUSTOM_REPORT_FILTER_ASSIGNED_TO)) {
                    if(state.global.users.length) {
                        _preference = this.getUsersFilter(state.global.users, _filter.filterType);
                    }
                } else if(_filter.filterType == EXPORT_CONSTANTS.CUSTOM_REPORT_FILTER_DATE_RANGE) { // filterType: 'dateRange'
                    _preference = {from: null, to: null};
                }
                _filter['preference'] = _preference;

                return _filter;
            });

        }
    }
    /**
     * Get users filter
     * Populates Project users and Anyone User.
     * Each entry is of type Object with fields: 'id' (user's id) and 'value' (user's name).
     * It creates a array of user object.
     */
    getUsersFilter(users, filterType) {
        let _users = [],
            showUnassigned = true;

        // If filterType 'userList' then filter out the 'Anyone' user and
        // set showUnassigned to false;
        if(filterType == EXPORT_CONSTANTS.CUSTOM_REPORT_FILTER_USER_LIST) {
            showUnassigned = false;
            _users = users.filter(user => user.username != EXPORT_CONSTANTS.CUSTOM_FILTER_USER_ANYONE_USERNAME);
        } else {
            _users = users;
        }
        // Create a map of {id: jQueryid, value: jQueryvalue}
        _users = _users.map(user => ({id: user.id, text: user.fullName}));
        // Assign unassigned user
        if (showUnassigned) {
            let _unassignedUser = {
                id: EXPORT_CONSTANTS.CUSTOM_FILTER_USER_UNASSIGNED_ID,
                value: EXPORT_CONSTANTS.CUSTOM_FILTER_USER_UNASSIGNED_VALUE
            };
            _users.push(_unassignedUser);
        }
        return _users;
    }
    /**
     * Get the fields checked/unchecked status
     * @value state can be true, false and null
     * true: set all fields to true
     * false: set all fields to false
     * null: set all fields to isDefault staus
     */
    getDefaultFields(value) {
        let _fieldsJSON = {};

        this._metadata.fields.forEach(_field => {
            _fieldsJSON[_field.label] = (value || value === false) ? value : _field.isDefault;
        });
        return _fieldsJSON;
    }
    /***
     * Build details
     */
    buildDetails(): void {
        let detailList = _.split(this._metadata.detail, ',');
        this._detailTypeData = [];

        detailList.forEach(detailID => {
            if(detailID == EXPORT_CONSTANTS.CUSTOM_REPORT_DETAIL_SUMMARY) {
                let _summaryTypeData = {
                    type: 'summary',
                    value: detailID,
                    label: I18N_MESSAGES['zephyr.export.report.type.summary']
                };
                this._detailTypeData.push(_summaryTypeData);
            } else if(detailID == EXPORT_CONSTANTS.CUSTOM_REPORT_DETAIL_DETAILED) {
                let _detailedTypeData = {
                    type: 'detailed',
                    value: detailID,
                    label: I18N_MESSAGES['zephyr.export.report.type.detailed']
                };
                this._detailTypeData.push(_detailedTypeData);
            } else if(detailID == EXPORT_CONSTANTS.CUSTOM_REPORT_DETAIL_DATA) {
                let _dataTypeData = {
                    type: 'data',
                    value: detailID,
                    label: I18N_MESSAGES['zephyr.export.report.type.data']
                };
                this._detailTypeData.push(_dataTypeData);
            }
        });
    }

    navigateToFilter(ev) {

        jQuery(ev.target).addClass('selected').siblings().removeClass('selected');
        setTimeout(() => {
            // allow for click to complete before changing the DOM
            this.resizeFilterUI();
            let element = jQuery(jQuery(ev.target).data('target'));
            if(element.length) {
                element[0].scrollIntoView(false); //  scroll to element
            }
            jQuery('body').animate({
                scrollTop: jQuery(ev.target).offset().top
            }, {
                duration: 'slow', easing: 'swing'
            });

        }, 10);

    }
    /**
     * @Events
     * Click on Un Select
     */
    onUnSelectAll() {
        this._fields = this.getDefaultFields(false);
        jQuery('#zui-export-checkbox-select-all').prop('checked', false);
    }
    /**
     * @Events
     * Click on Select
     */
    onSelectAll(value) {
        if(jQuery(value).prop('checked')) {
            this._fields = this.getDefaultFields(true);
        } else {
            this._fields = this.getDefaultFields(null);
        }
    }
    onReportDashboardChange(ev) {
        this._isReportToDashboard = !this._isReportToDashboard;
        if(this._isReportToDashboard) {
            this._isReportToProject = false;
        }
        jQuery(ev.target).prop('checked', this._isReportToDashboard);
    }
    onReportProjectChange(ev) {
        this._isReportToProject = !this._isReportToProject;
        if(this._isReportToProject) {
            this._isReportToDashboard = false;
        }
        jQuery(ev.target).prop('checked', this._isReportToProject);
    }
    /**
     * Update the metadata fields to contain the fields isSelected
     */
    setSelectedFields() {
        let _fieldsSelected = Object.keys(this._fields).filter(key => this._fields[key] === true);
        if(!_fieldsSelected.length) {
            jQuery('.zui-export-fields-error .form-control-label')
                .html(I18N_MESSAGES['zephyr.export.fields.select.error.message']);
            this._performSave = false;
            return;
        }
        jQuery('.zui-export-fields-error .form-control-label').html('');
        this._metadata.fields.forEach(_field => {
            _field['isSelected'] = this._fields[_field.label];
        });
    }
    setSelectedFilters() {
        this._metadata.filters.forEach(_filter => {
            let _selectedValues = null,
                _selectedFromTimestamp = null,
                _selectedToTimeStamp = null;

            if((_filter.filterType == EXPORT_CONSTANTS.CUSTOM_REPORT_FILTER_BINARY_ALL)) { // 'binaryAll'
                _selectedValues = [jQuery('input[name=zui-export-report-binary-' + _filter.id + ']:checked').val()];
            } else if(_filter.filterType == EXPORT_CONSTANTS.CUSTOM_REPORT_FILTER_PREF_KEY) { // 'preferenceKey'
                if(!jQuery('#zui-export-checkbox-filter-' + _filter.id + '-all').prop('checked')) {
                    _selectedValues = jQuery('#zui-select-user-picker-' + _filter.id).val();
                } else {
                    let match = this._filters.filter(filter => filter.uniqueId === _filter.uniqueId)[0];
                    if(match) {
                        _selectedValues = match.preference.map(value => value.id);
                    }
                }
            } else if((_filter.filterType == EXPORT_CONSTANTS.CUSTOM_REPORT_FILTER_USER_LIST) // 'userList', 'assignedTo'
                || (_filter.filterType == EXPORT_CONSTANTS.CUSTOM_REPORT_FILTER_ASSIGNED_TO)) {
                if(!jQuery('#zui-export-checkbox-filter-' + _filter.id + '-all').prop('checked')) {
                    _selectedValues = jQuery('#zui-select-user-picker-' + _filter.id).val();
                }
                //console.log('filter.filterType and selected values', _filter.filterType, _filter.label, _selectedValues);
            } else if(_filter.filterType == EXPORT_CONSTANTS.CUSTOM_REPORT_FILTER_DATE_RANGE) { // 'dateRange'

                jQuery('.zui-export-filter-date-error .form-control-label').html('');

                let _selectedToDate = jQuery('input[name=zui-export-filter-date-' + _filter.id + '-to]').val() || null,
                    _selectedFromDate = jQuery('input[name=zui-export-filter-date-' + _filter.id + '-from]').val() || null;

                _selectedFromTimestamp = new Date(_selectedFromDate).getTime();
                _selectedToTimeStamp = (new Date(moment(_selectedToDate).endOf('day'))).getTime();


              // Added _selectedToTimeStamp check to allow only from date too.
                if(_selectedToTimeStamp && _selectedToTimeStamp < _selectedFromTimestamp) {
                  jQuery('.zui-export-filter-date-error .form-control-label').html(I18N_MESSAGES['zephyr.export.date.validation.error.message']);
                  this._performSave = false;

                }
            }

            if(Array.isArray(_selectedValues)) {
                if (_selectedValues.every(item => item)) {
                    _filter['selectedValues'] =  _selectedValues; // Set the selected values
                }
            } else if (_selectedValues) {
                _filter['selectedValues'] =  _selectedValues; // Set the selected values
            }
            if(_selectedFromTimestamp) {
                _filter['selectedFromDate'] =  _selectedFromTimestamp; // set the from date
            }
            if(_selectedToTimeStamp) {
                _filter['selectedToDate'] = _selectedToTimeStamp; // set the to date
            }
        });
    }
    /**
     * set the selected output
     */
    setSelectedOutput() {
        this._metadata['selectedOutput'] = this._outputType.value || 0;
    }
    /**
     * set the selected detail
     */
    setSelectedDetail() {
        this._metadata['selectedDetail'] = Number(this._reportType.value || 0);
    }
    /**
     * Set the selected report type
     */
    setSelectedReportType() {
        if(!this._reportType || !this._reportType.value) {
            return;
        }
        this._metadata['selectedDetail'] = Number(this._reportType.value);
    }
    /**
     * set post to dashboard
     * if selected then set the post to section
     */
    setPostToDashboard() {
        let _postToDashboard = EXPORT_CONSTANTS.CUSTOM_REPORT_POST_TO_DASHBOARD_NONE;
        let _postToSection = null;
        if(this._isReportToDashboard) {
            _postToDashboard = EXPORT_CONSTANTS.CUSTOM_REPORT_POST_TO_DASHBOARD_DEPARTMENT;
            _postToSection = jQuery('#zui-export-select-report-to-dashboard-' + this.fieldOptions.id).val();
        } else if(this._isReportToProject) {
            _postToDashboard = EXPORT_CONSTANTS.CUSTOM_REPORT_POST_TO_DASHBOARD_PROJECT;
            _postToSection = jQuery('#zui-export-select-report-to-project-' + this.fieldOptions.id).val();
        }
        if(_postToDashboard != EXPORT_CONSTANTS.CUSTOM_REPORT_POST_TO_DASHBOARD_NONE && !_postToSection) {
            jQuery('.zui-export-report-to-error .form-control-label')
                .html(I18N_MESSAGES['zephyr.export.post.report.select.section.error.message']);
            this._performSave = false;
        } else {
            jQuery('.zui-export-report-to-error .form-control-label').html('');
        }
        this._metadata['postToDashboard'] = _postToDashboard;
        this._metadata['postToSection'] = _postToSection;
    }
    /**
     * set the selected title
     */
    setTitle() {
        let _title = jQuery('#zui-export-title-' + this.fieldOptions.id).val();
        if(!_title) {
            jQuery('.zui-export-title-error .form-control-label').html(I18N_MESSAGES['zephyr.export.title.error.message']);
            this._performSave = false;
        } else {
            jQuery('.zui-export-title-error .form-control-label').html(''); // Clear the error message
            this._metadata['title'] = _title;
        }
    }

    checkFormDirty(ev) {
      let previousFormString = JSON.stringify(this._previousValue);

      let metadataCopy = _.cloneDeep(this._metadata);
      this.setMetadataValues();
      let currentFormString = JSON.stringify(this._metadata);

      if(currentFormString !== previousFormString) {
        this.showDirtyCheckModal = true;
      } else {
        jQuery('#zui-export-modal-' + this.fieldOptions.id).modal('hide');
      }

      this._metadata = _.cloneDeep(metadataCopy);
    }

    continueNavigation() {
      this.showDirtyCheckModal = false;
      jQuery('#zui-export-modal-' + this.fieldOptions.id).modal('hide');
    }

    dismissNavigation() {
      this.showDirtyCheckModal = false;
    }

    setMetadataValues() {
      // Set the selected fields
      this.setSelectedFields();
      // Set the selected filters
      this.setSelectedFilters();
      // set the selected report type
      this.setSelectedReportType();
      // set the selected output
      this.setSelectedOutput();
      // set the selected detail
      this.setSelectedDetail();
      // set the selected post to dashboard
      this.setPostToDashboard();
      // set the title
      this.setTitle();
    }
    /**
     * On save, perform report generation
     */
    generateReport() {
        // Initially set it to true, on validation this value is updated
        this._performSave = true;
        this.setMetadataValues();
        this._reportType.value = this._detailTypeData[0].value ;
        if(this._performSave) {
            if (this.fieldOptions.hasOwnProperty('isSecondSearchCriteria')) {
                if (this.fieldOptions['isSecondSearchCriteria']) {
                    this._metadata['exportCriteria'] = this.fieldOptions.searchCriteria2;
                } else {
                    this._metadata['exportCriteria'] = this.fieldOptions.searchCriteria1;
                }
            } else {
                this._metadata['exportCriteria'] = this.fieldOptions.searchCriteria;
            }
            this._metadata['exportType'] =  EXPORT_CONSTANTS[this.fieldOptions.exportType];
            this._metadata['releaseId'] = this.fieldOptions.releaseId;
            jQuery('#zui-export-modal-' + this.fieldOptions.id).modal('hide');
            this._zephyrStore.dispatch(this._reportAction.generateReportTemplate(this._metadata, '-export'));
        }
    }

    reportTypeChange(_type) {
      this._reportType.value = _type.value;
      this._isTypeData = (_type.value == this._EXPORT_CONSTANTS.CUSTOM_REPORT_DETAIL_DATA) ? true: false;
    }

    closeModal() {
      jQuery('#zui-export-modal-' + this.fieldOptions.id + '-download').modal('hide');
      jQuery('.modal-backdrop').remove();

      jQuery('.export-options').first().trigger('click');

      setTimeout(() => {
        jQuery('.modal-backdrop').remove();
      });
    }
    triggerChange() {
        if (this.changeDetectionDebounce) {
            clearTimeout(this.changeDetectionDebounce);
        }
        let firstDetection = !this.changeDetectionDebounce;
        this.changeDetectionDebounce = setTimeout(() => {
            this.changeDetectionDebounce = null;
            if(this.cdr) { this.cdr.markForCheck(); }
        }, firstDetection ? 200 : 300);
    }
}
