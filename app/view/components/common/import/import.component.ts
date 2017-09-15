import {Component, Input, AfterViewInit, NgZone, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import * as Observable from 'rxjs/Observable';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {ZephyrStore} from '../../../../store/zephyr.store';
import {ImportAction} from '../../../../actions/import.action';

import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';

import {
  CLEAR_IMPORT_EVENT,CLEAR_IMPORT_STATE_EVENT,
  IMPORT_CREATE_JOBS_SUCCESS,
  IMPORT_CREATE_SAVED_MAPS_SUCCESS, IMPORT_UPDATE_SAVED_MAPS_SUCCESS,
  IMPORT_UPDATE_SAVED_MAPS} from '../../../../utils/constants/action.types';

import {SAVED_MAPS_GRID_TYPE, IMPORT_JOBS_GRID_TYPE, IMPORT_JOBS_GRID_PAGINATION, IMPORT_MAPS_GRID_PAGINATION} from './import_grid.constant';

declare var _:any, jQuery:any, moment:any;

@Component({
    selector: 'zui-import',
    providers: [ImportAction],
    templateUrl: 'import.html'
})
export class ImportComponent implements AfterViewInit, OnDestroy {
	@Input() fieldOptions;
    zephyrStore;
    releaseId;

    importForm: FormGroup;
    jobsForm: FormGroup;
    jobHistory: any = [];
    savedMapsGridColumns: Array<Object> = [];
    savedMapsGridRows: Array<Object> = [];
    importJobsGridRows: Array<Object> = [];
    importJobsGridColumns: Array<Object> = [];
    isNext = false;
    deleteMapId;
    originalRow = {
      mapName: '',
      rowNumber: '',
      fields: {},
      selectedMapDiscriminator: '',
      savedMapsFields: [],
      mapDescription: '',
      mapId: 0,
      clickedSavedMapButton: ''
    };
    savedMapGridType = SAVED_MAPS_GRID_TYPE;
    importJobsGridType = IMPORT_JOBS_GRID_TYPE;
    noMapData = false;
    noJobData = false;
    savedMaps = {
        mapName: '',
        rowNumber: '',
        fields: {},
        selectedMapDiscriminator: '',
        savedMapsFields: [],
        mapDescription: '',
        mapId: 0,
        clickedSavedMapButton: ''
    };

    jobCurrentPage = IMPORT_JOBS_GRID_PAGINATION.currentIndex;
    jobSize = IMPORT_JOBS_GRID_PAGINATION.size;
    jobPaginationOptions = IMPORT_JOBS_GRID_PAGINATION;

    mapCurrentPage = IMPORT_MAPS_GRID_PAGINATION.currentIndex;
    mapSize = IMPORT_MAPS_GRID_PAGINATION.size;
    mapPaginationOptions = IMPORT_MAPS_GRID_PAGINATION;

    mapDiscriminators;
    clickedSavedMapButton;
    clickedImportJobsButton;
    showInstructions = true;
    showSavedMaps = false;
    showImportJobs = false;
    showEditSavedMaps = false;
    showUnsavedChangesPopup=false;
    showModalUnsavedRefresh= false;
    showModalUnsavedAdd = false;
    showEditImportJobs = false;
    uploadFormData ;
    deleteJobId;
    deletedJobMaps: {};

    isValidationForDiscNotReq;

    importJob = {
        jobId: 0,
        selectedFieldMap: '',
        jobName: '',
        jobServerInput : '',
        jobDate: new Date(),
        jobFile: 'local',
        jobHistory: []
    };
    jobUploadStatus = false;
    fileNameChanged = false;
    mandatoryFields;
    savedMapsDiscPref;
    previousMapValue;
    showMapDirtyCheckModal = false;
    previousJobValue;
    showJobDirtyCheckModal = false;
    unsubscribe;
    jobFileUploadStatusMap = {};
    jobStatusId = '-importJob';
    imoprtJobMessages = {
      'success' : 'Import completed successfully',
      'failure' : 'Import failed'
    };
    i18nMessages = I18N_MESSAGES;
    private jobId;
    private _datePipe;
    private changeDetectionDebounce;
    constructor(private fb: FormBuilder, private _importAction: ImportAction, private route: ActivatedRoute,
        private zone: NgZone, private cdr: ChangeDetectorRef) {

        this.route.params.subscribe(params => {
            this.releaseId = params['id'];
        });

        this.deletedJobMaps = {};

        this._datePipe = new DatePipe('en-US');

        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.unsubscribe = this.zephyrStore.subscribe(() => {
            this.zone.run(() => {
                this.onStateChange();
            });
        });

        this.jobsForm = this.fb.group({});

        this.importForm = this.fb.group({});

    }
    ngAfterViewInit() {
        jQuery('#zee-import-modal-' + this.fieldOptions.id).on('hidden.bs.modal', ev => {
            if(ev.target === ev.currentTarget) {
                this.dismissModal();
            }
        });
    }
    ngOnDestroy() {
        this.unsubscribe();
    }


    loadImportInstructions() {
        this.displayImportInstructions();
    }

    navigate(isNext) {
        this.isNext = isNext;

        if (this.showEditSavedMaps && this.importForm.dirty) {
            jQuery('#zui-unsaved-changes-prompt').modal();
        } else {
            this.continueNavigation(isNext);
        }
    }

    dismissNavigation() {
        jQuery('#zui-unsaved-changes-prompt').modal('hide');
    }


    dismissJobsChangeModal() {
        jQuery('#zui-unsaved-changes-prompt-jobs').modal('hide');
    }

    continueNavigation(isNext) {
        isNext ? this.loadImportJobs() : this.loadImportInstructions();
    }

    goToSavedMaps() {
        if (this.showEditImportJobs && (JSON.stringify(this.originalRow) !== JSON.stringify(this.importJob))) {
            jQuery('#zui-unsaved-changes-prompt-jobs').modal();
        } else {
            this.loadSavedMaps();
        }
    }

    loadSavedMaps() {
        this.resetJobsForm();

        this.originalRow = _.cloneDeep(this.savedMaps);
        this.displaySavedMaps();
        this.getSavedMaps();
        this.getMapDiscriminators();
    }
    loadImportJobs() {
        this.showJobDirtyCheckModal = false;
        this.displayImportJobs();
        this.getImportJobs();
    }

    bindAutocomplete() {
        jQuery(document).on('keyup', '#jobServerInput', ev => {
            let folderName = ev.target.value;
            this.checkJobsFolder(folderName).subscribe(data => {
                if(!Object.keys(data).length && (typeof data === 'object')) {
                    data = 0;
                }
                let msg = data + ' file(s) found.';
                jQuery('#autocompleteResult').empty().append(jQuery('<div>').text(msg));
            }, (error) => {
                if(error.errorMg = 'importResource.validate.folder.location') {
                    let msg = 'Invalid folder!';
                    jQuery('#autocompleteResult').empty().append(jQuery('<div>')).text(msg);
                }
            });
        });
    }
    checkJobsFolder(folderName) {
        return this._importAction.checkJobsFolder(folderName);
    }
    onStateChange() {
        let imports = this.zephyrStore.getState().imports;

        this.jobHistory = imports.importJobs.history;
        if (imports.event !== CLEAR_IMPORT_STATE_EVENT) {

          if (imports.event === 'IMPORT_REQ_FROM_JIRA') {
              return;
          }

          let mapsGrid = jQuery('#grid-table-saved_maps');
          let currMap = mapsGrid.find('.flex-bar.selected-row').data('index');

          this.fileNameChanged = false;

          this.savedMapsGridColumns = imports.savedMaps.grid.columns || [];
          this.savedMapsGridRows = imports.savedMaps.grid.rows || [];
          this.noMapData = imports.savedMaps.grid.noData || false;

          this.importJobsGridColumns = imports.importJobs.grid.columns || [];
          this.importJobsGridRows = imports.importJobs.grid.rows || [];
          this.noJobData = imports.importJobs.grid.noData || false;

          this.jobPaginationOptions = imports.importJobs.grid.paginationOptions;
          this.jobSize = imports.importJobs.grid.size;
          this.jobCurrentPage = imports.importJobs.grid.currentPage;

          this.mapPaginationOptions = imports.savedMaps.grid.paginationOptions;
          this.mapSize = imports.savedMaps.grid.size;
          this.mapCurrentPage = imports.savedMaps.grid.currentPage;

          this.mapDiscriminators = imports.savedMaps.discriminators;
          this.savedMaps.savedMapsFields = JSON.parse(JSON.stringify(imports.savedMaps.savedMapsFields));

          if(this.fieldOptions && this.fieldOptions.type) {
            this.savedMapsDiscPref = this.getSavedMapsDiscPref();
          }

          if (imports.deletedId !== undefined && imports.deletedId !== -1) {
            let target = this.deletedJobMaps[imports.deletedId];
            jQuery(target).removeClass('disabled');
            delete this.deletedJobMaps[imports.deletedId];
          }

          if (imports.savedMaps.event === IMPORT_CREATE_SAVED_MAPS_SUCCESS) {
            this.zephyrStore.dispatch(this._importAction.clearImportEvents());
            this.onDiscriminatorChange(this.savedMaps.selectedMapDiscriminator);
            this.originalRow = _.cloneDeep(this.savedMaps);
            setTimeout(() => {
              let grid_row = jQuery('#savedMaps-grid .flex-bar');
              jQuery('#grid-table-saved_maps').find('.flex-bar:last').trigger('click');
              grid_row.parent().scrollTop(grid_row.height() * grid_row.length);
            });
          }

          if (imports.savedMaps.event === IMPORT_UPDATE_SAVED_MAPS_SUCCESS) {
              this.zephyrStore.dispatch(this._importAction.clearImportEvents());

              setTimeout(() => {
                let grid_row = mapsGrid.find('.flex-bar');
                  let length = grid_row.length;
                  grid_row = grid_row.filter((index, item) => jQuery(item).data('index') === currMap);
                  grid_row.trigger('click').parent().scrollTop(grid_row.height() * length);
              });
          }

          if (imports.importJobs.event === IMPORT_CREATE_JOBS_SUCCESS) {
            this.zephyrStore.dispatch(this._importAction.clearImportEvents());
            this.originalRow = _.cloneDeep(this.importJob);

            setTimeout(() => {
                let grid_row = jQuery('#importJobs-grid .flex-bar');
                jQuery('#grid-table-import_jobs').find('.flex-bar:last').trigger('click');
                grid_row.parent().scrollTop(grid_row.height() * grid_row.length);
            });
          }

          this.showEditSavedMaps = false;
        }

    }
    getSavedMapsDiscPref() {
        let adminPref = this.zephyrStore.getState().adminPref;
        return {
            'byemptyrow': adminPref[this.fieldOptions.type + '.zie.zephyrFields.discriminator.requiredField.byemptyrow.LOV'],
            'byidchange': adminPref[this.fieldOptions.type + '.zie.zephyrFields.discriminator.requiredField.byidchange.LOV'],
            'bytestcasenamechange': adminPref[this.fieldOptions.type +
                '.zie.zephyrFields.discriminator.requiredField.bytestcasenamechange.LOV']
        };
    }
    getMapDiscriminators() {
        let lov = this.fieldOptions.type + '.zie.zephyrFields.discriminator.LOV';
        this.zephyrStore.dispatch(this._importAction.getSavedMapsDiscriminators(lov));
    }
    continueRefresh(type) {
        switch(type) {
            case 'map': this.continueGetSavedMaps();
            break;
            case 'importjob': this.continueGetImportJob();
            break;
        }
    }
    getSavedMaps() {
        let isDirtyMap = false;
        if (this.showSavedMaps && this.showEditSavedMaps) {
            if(JSON.stringify(this.originalRow) !== JSON.stringify(this.savedMaps)) {
              isDirtyMap = true;
            }
        }
        if (isDirtyMap) {
            this.showModalUnsavedRefresh = true;
        } else {
            this.continueRefresh('map');
        }
    }
    continueGetSavedMaps() {
        let state = this.zephyrStore.getState();
        let customFields = state.customField && state.customField.customFields[this.fieldOptions.type];
        customFields = customFields.filter(item => item.allProject || ~item.projectIds.indexOf(state.project.id));
        this.zephyrStore.dispatch(this._importAction.getSavedMaps(this.fieldOptions.type, customFields));
        this.cancelUnsavedRefreshDialog();
    }
    cancelUnsavedRefreshDialog() {
        this.showModalUnsavedRefresh = false;
    }
    getImportJobs() {
        let isDirtyMap = false;
        if (this.showImportJobs && this.showEditImportJobs) {
            if(JSON.stringify(this.originalRow) !== JSON.stringify(this.importJob)) {
              isDirtyMap = true;
            }
        }
        if (isDirtyMap) {
            this.showModalUnsavedRefresh = true;
        } else {
            this.continueRefresh('importjob');
        }
    }
    continueGetImportJob() {
        this.zephyrStore.dispatch(this._importAction.getImportJobs(this.fieldOptions.type));
        this.showModalUnsavedRefresh = false;
    }
    displayImportInstructions() {
        this.showInstructions = true;
        this.showSavedMaps = false;
        this.showImportJobs = false;
    }
    displaySavedMaps() {
        this.showInstructions = false;
        this.showSavedMaps = true;
        this.showImportJobs = false;
    }
    displayImportJobs() {
        this.showInstructions = false;
        this.showSavedMaps = false;
        this.showImportJobs = true;
    }

    savedMapsGridRowClick(target) {
        let mapData = this.savedMapsGridRows[target.dataset.index];
        let noData = false;

        if (!mapData) {
            // let imports = this.zephyrStore.getState().imports;
            let discriminator = this.mapDiscriminators && this.mapDiscriminators[0];
            discriminator = discriminator ? discriminator.id : '';
            noData = true;
            mapData = {
                'name': '',
                'rowNumber': '',
                'fieldMapDetails': this.savedMaps.savedMapsFields,
                'startingRowNumber': '',
                'discriminator': discriminator,
                'description': ''
            };
        }

        this.savedMaps.savedMapsFields = mapData['fieldMapDetails'];
        this.savedMaps.mapId = mapData['id'];
        this.savedMaps.mapName = mapData['name'];
        this.savedMaps.rowNumber = mapData['startingRowNumber'];
        this.savedMaps.mapDescription = mapData['description'];
        this.savedMaps.selectedMapDiscriminator = mapData['discriminator'];
        this.savedMaps.clickedSavedMapButton = 'update';
        this.showEditSavedMaps = true;
        this.isValidationForDiscNotReq = false;

        if (noData) {
            let discriminatorId = this.mapDiscriminators && this.mapDiscriminators[0] && this.mapDiscriminators[0].id;
            this.onDiscriminatorChange(discriminatorId);
        }

        this.setValidationForImportFields(false);
        this.onDiscriminatorChange(this.savedMaps.selectedMapDiscriminator);

    }

    setValidationForImportFields(fromHTML = false) {
        let previousState = _.cloneDeep(this.savedMaps);
        this.savedMaps.fields = {};

        let validations = {
            'savedMaps.mapName': [this.savedMaps.mapName, Validators.compose([Validators.required, Validators.pattern('^.{1,50}$')])],
            'savedMaps.rowNumber':
            [this.savedMaps.rowNumber, Validators.compose([Validators.required, Validators.pattern('^[1-9]+\d*$')])],
            'savedMaps.selectedMapDiscriminator': [this.savedMaps.selectedMapDiscriminator],
            'savedMaps.mapDescription': [this.savedMaps.mapDescription, Validators.pattern('^(.|[\n\r]){0,255}$')],
        };

        this.savedMaps.savedMapsFields.map((field, index) => {
            this.savedMaps.fields[field.zephyrField] = field.mappedField;

            field.controlName = `savedMaps.fields.${field.zephyrField}`;

            if (field.displayName.indexOf('*') !== -1) {
                validations[`savedMaps.fields.${field.zephyrField}`] =
                    [field.mappedField, Validators.compose([Validators.required, Validators.pattern('^.{1,2}$')])];
            } else {
                validations[`savedMaps.fields.${field.zephyrField}`] = [field.mappedField];
            }

        });

        this.importForm = this.fb.group(validations);

        if (!fromHTML || (this.originalRow['selectedMapDiscriminator'] === previousState.selectedMapDiscriminator && _.isEqual(this.originalRow, previousState))) {

          this.originalRow = _.cloneDeep(this.savedMaps);
        }

        this.previousMapValue = this.currentMap();

    }

    savedMapsIconClick($event) {
        let target = $event.target;
        target = jQuery(target).closest('.flex-bar')[0];
        this.deleteMapId = this.savedMapsGridRows[target.dataset.index]['id'];
        jQuery('#zui-import-modal-map-delete').modal();
    }
    onClickDeleteMap() {
        this.zephyrStore.dispatch(this._importAction.deleteSavedMaps(this.deleteMapId));
        jQuery('#zui-import-modal-map-delete').modal('hide');
    }
    validateSavedMaps() {
        let validation = true;
        if(!this.savedMaps.mapName || !this.savedMaps.rowNumber || !this.savedMaps.selectedMapDiscriminator) {
            validation = false;
        }
        if(this.mandatoryFields && this.mandatoryFields.length) {
            this.mandatoryFields.forEach(field => {
                let index = _.indexOf(this.savedMaps.savedMapsFields, _.find(
                        this.savedMaps.savedMapsFields,
                        {zephyrField: parseInt(field, 10)
                    }
                ));

                if(!this.savedMaps.savedMapsFields[index]['mappedField']) {
                    validation = false;
                }
            });
        }
        return validation;
    }
    createSavedMaps() {
        this.savedMaps.savedMapsFields.map(field => {
            delete field.controlName;
        });

        let updatedMap =  this.savedMaps.savedMapsFields.filter(field => field['mappedField'] && field['mappedField'].length >= 1);

        let data = {'name': this.savedMaps.mapName, 'description': this.savedMaps.mapDescription, 'creationDate': new Date(Date.now()),
            'startingRowNumber': this.savedMaps.rowNumber, 'discriminator': this.savedMaps.selectedMapDiscriminator,
             'fieldMapDetails': updatedMap, 'fieldMapEntityType': this.fieldOptions.type};

      if(!this.validateSavedMaps()) {
            return;
        };

        if(this.savedMaps.clickedSavedMapButton === 'update') {
            data['id'] = this.savedMaps.mapId;
            this.zephyrStore.dispatch(this._importAction.updateSavedMaps(data, DatePipe));
        } else {
            this.zephyrStore.dispatch(this._importAction.createSavedMaps(data, DatePipe));
        }
    }
    onDiscriminatorChange(selectedVal, fromHTML = false) {
        this.savedMaps.selectedMapDiscriminator = selectedVal;
        try {
            this.mandatoryFields = JSON.parse(this.savedMapsDiscPref[selectedVal]);
        } catch(err) {
            this.mandatoryFields = [];
        }
        this.savedMaps.savedMapsFields.forEach(field => {
            if(this.mandatoryFields.indexOf(field['zephyrField'].toString()) > -1) {
                field['displayName'] = field['displayName'].split(' *')[0] + ' *';
            } else {
                field['displayName'] = field['displayName'].split(' *')[0];
            }
        });
        this.originalRow.savedMapsFields.forEach(field => {
          if(this.mandatoryFields.indexOf(field['zephyrField'].toString()) > -1) {
            field['displayName'] = field['displayName'].split(' *')[0] + ' *';
          } else {
            field['displayName'] = field['displayName'].split(' *')[0];
          }
        });

        if(this.importForm.touched) {
            this.setValidationForImportFields(fromHTML);
        }

        //ZEPHYR-12810
        this.isValidationForDiscNotReq = false;
    }
    clearSavedMaps() {
        this.jobHistory = [];
        this.savedMaps.mapId = 0;
        this.savedMaps.mapName = '';
        this.savedMaps.rowNumber = '';
        this.savedMaps.mapDescription = '';
        this.savedMaps.selectedMapDiscriminator = this.mapDiscriminators && this.mapDiscriminators[0].id;
        this.savedMaps.savedMapsFields = this.savedMaps.savedMapsFields.map(fields => ({
            'displayName': fields['displayName'],
            'zephyrField': fields['zephyrField'],
            'mappedField': ''
        }));

    }
  clearOriginalRowMaps() {
    this.jobHistory = [];
    this.originalRow.mapId = 0;
    this.originalRow.mapName = '';
    this.originalRow.rowNumber = '';
    this.originalRow.mapDescription = '';
    this.originalRow.selectedMapDiscriminator = this.mapDiscriminators && this.mapDiscriminators[0].id;
    this.originalRow.savedMapsFields = this.originalRow.savedMapsFields.map(fields => ({
      'displayName': fields['displayName'],
      'zephyrField': fields['zephyrField'],
      'mappedField': ''
    }));

  }


    cancelSavedMaps(ev) {
        ev.preventDefault();

      let savedMaps = this.currentMap();
      if(this.previousMapValue !== savedMaps ) {
          this.showMapDirtyCheckModal = true;
        } else {
          this.clearSavedMaps();
          this.clearOriginalRowMaps();
          this.showEditSavedMaps = false;
        }
    }

    dismissImportMapsDialog($event) {
      this.showUnsavedChangesPopup = false;
      this.showInstructions = true;
      this.showSavedMaps = false;
      this.showImportJobs = false;
      jQuery('.zee-import-modal').modal('hide');
      setTimeout(() => {
        jQuery('.modal-backdrop').remove();
      }, 100);
    }

    cancelClosingDialog(ev) {
      this.showUnsavedChangesPopup = false;
    }

    continueMapNavigation() {
      this.showMapDirtyCheckModal = false;
      this.clearSavedMaps();
      this.clearOriginalRowMaps();
      this.showEditSavedMaps = false;
    }

    dismissMapNavigation() {
      jQuery('#zui-unsaved-changes-prompt').modal('hide');
      this.showMapDirtyCheckModal = false;
    }

    continueAdd(type) {
        switch(type) {
            case 'map': this.continueAddSavedMaps();
            break;
            case 'importjob': this.continueAddImportJobs();
            break;
        }
    }
    addSavedMaps() {
        let isDirtyMap = false;
        if (this.showSavedMaps && this.showEditSavedMaps) {
            if(JSON.stringify(this.originalRow) !== JSON.stringify(this.savedMaps)) {
              isDirtyMap = true;
            }
        }
        if (isDirtyMap) {
            this.showModalUnsavedAdd = true;
        } else {
            this.continueAdd('map');
        }
    }
    continueAddSavedMaps() {
        this.showModalUnsavedAdd = false;
        this.clearSavedMaps();
        this.clearOriginalRowMaps();
        //ZEPHYR-12555
        this.savedMapsGridRowClick({dataset: {index: -1}});
        this.savedMaps.clickedSavedMapButton = 'add';
        this.originalRow.clickedSavedMapButton = 'add';
        this.showEditSavedMaps = true;
        let previousMapValue = JSON.parse(this.previousMapValue);
        previousMapValue['clickedSavedMapButton'] = this.savedMaps.clickedSavedMapButton;
        this.previousMapValue = JSON.stringify(previousMapValue);
        setTimeout(() => {
        jQuery('.zee-import-modal-body #addmap').trigger('focus');
      },200);
    }
    isMapInvalid() {
        return this.previousMapValue === this.currentMap() || this.importForm.invalid;
    }
    currentMap() {
        let savedMaps = JSON.parse(JSON.stringify(this.savedMaps));
        savedMaps.savedMapsFields.forEach(item => {
            item.displayName = item.displayName.replace(' *', '');
        });
        return JSON.stringify(savedMaps);
    }
    clearImportFields() {
        this.importJob.jobId = 0;
        this.importJob.jobName = '';
        this.importJob.jobDate = (new Date());
        this.importJob.selectedFieldMap = null;
        this.importJob.jobServerInput = '';
        this.importJob.jobHistory = [];
        this.jobHistory = [];
        this.importJob.jobFile = 'local';
    }
    addImportJobs() {
        let isDirtyMap = false;
        if (this.showImportJobs && this.showEditImportJobs) {
            if(JSON.stringify(this.originalRow) !== JSON.stringify(this.importJob)) {
              isDirtyMap = true;
            }
        }
        if (isDirtyMap) {
            this.showModalUnsavedAdd = true;
        } else {
            this.continueAdd('importjob');
        }
    }
    continueAddImportJobs() {
        this.showModalUnsavedAdd = false;
        this.clearImportFields();
        this.clickedImportJobsButton = 'add';
        this.showEditImportJobs = true;
        this.previousJobValue = JSON.stringify(this.importJob);
        let validations = {
            'importJob.jobName': [this.importJob.jobName, Validators.required],
            'importJob.selectedFieldMap': [this.importJob.selectedFieldMap, Validators.required],
            'importJob.jobDate': [this.importJob.jobDate, Validators.required]

        };

        this.jobsForm = this.fb.group(validations);
       setTimeout(() => {
        jQuery('.importJobs-details #job-name').trigger('focus');
      },200);

    }
    isJobInvalid() {
        return (this.jobsForm.invalid || JSON.stringify(this.importJob) === this.previousJobValue
                || this.importJob.selectedFieldMap === null || this.importJob.selectedFieldMap === 'Select Map'
                || this.importJob.jobServerInput === "");
    }

    updateJobIndex(value) {
        this.jobCurrentPage = value;
        this.zephyrStore.dispatch(this._importAction.updateJobsPagination(this.jobCurrentPage, this.jobSize));
    }
    updateJobPageSize(value) {
        this.jobSize = value;
        this.jobCurrentPage = 1;
        this.zephyrStore.dispatch(this._importAction.updateJobsPagination(this.jobCurrentPage, this.jobSize));
    }
    updateMapIndex(value) {
        this.mapCurrentPage = value;
        this.zephyrStore.dispatch(this._importAction.updateMapsPagination(this.mapCurrentPage, this.mapSize));
    }
    updateMapPageSize(value) {
        this.mapSize = value;
        this.mapCurrentPage = 1;
        this.zephyrStore.dispatch(this._importAction.updateMapsPagination(this.mapCurrentPage, this.mapSize));
    }
    importJobsGridRowClick(target) {

        let jobData = this.importJobsGridRows[target.dataset.index];
        this.importJob.jobId = jobData['id'];
        this.importJob.jobName = jobData['name'];
        this.importJob.jobFile = 'local';
        let selectedFieldMap = jobData['fieldMapId'] === undefined ? jobData['fieldMap'].id : jobData['fieldMapId'];
        this.importJob.selectedFieldMap = String(selectedFieldMap);
        this.importJob.jobServerInput = jobData['folder'];
        this.importJob.jobDate = jobData['scheduledDate'];
        this.clickedImportJobsButton = 'update';

        this.zephyrStore.dispatch(this._importAction.loadImportJobById(this.importJob.jobId));

        if(!this.showEditImportJobs) {
            this.bindAutocomplete();
        }

        this.showEditImportJobs = true;

        this.originalRow = _.cloneDeep(this.importJob);
        this.previousJobValue = JSON.stringify(this.importJob);

        let validations = {
            'importJob.jobName': [jobData['name'], Validators.required],
            'importJob.selectedFieldMap': [String(selectedFieldMap), Validators.required],
            'importJob.jobDate': [jobData['scheduledDate'], Validators.required]
        };

        this.jobsForm = this.fb.group(validations);
        jQuery('input[name=import]').val('');
    }
    importJobsIconClick($event) {
        let target = jQuery($event.target);
        let tr = target.closest('.flex-bar').trigger('click')[0];

        if (target.hasClass('deleteJobs')) {
            this.deleteImportJobs(tr);
        } else if(target.hasClass('runJobs')) {
            this.runImportJobs(tr, 'run');
        } else if(target.hasClass('reRunJobs')) {
            this.runImportJobs(tr, 're-run');
        }
    }
    deleteImportJobs(target) {
        this.deleteJobId = this.importJobsGridRows[target.dataset.index]['id'];
        jQuery('#zui-import-modal-job-delete').modal();
    }
    onClickDeleteJob() {
        this.zephyrStore.dispatch(this._importAction.deleteImportJobs(this.deleteJobId));
        jQuery('#zui-import-modal-job-delete').modal('hide');
        this.showEditImportJobs = false;
    }
    runImportJobs(target, action) {
        let jobId = this.importJobsGridRows[target.dataset.index]['id'];
        this.jobId = jobId;
        if(this.jobFileUploadStatusMap && this.jobFileUploadStatusMap[jobId] === 'false'){
            jQuery('#importRunError-modal').modal();
            return;
        }
        this.deletedJobMaps[jobId] = target;
        jQuery(target).addClass('disabled');
        this.zephyrStore.dispatch(this._importAction.runImportJobs(jobId, action, this.jobStatusId));
    }
    jobCompleted(ev) {

        let reqType = this.fieldOptions.type;
        let projectId = this.zephyrStore.getState().project.id;

        ev = ev || {};
        if (this.jobId) {
            setTimeout(() => {
                if (!ev.fail) {
                    this.zephyrStore.dispatch(this._importAction.fetchImportedTreeData(this.releaseId, reqType, projectId));
                }
                this.zephyrStore.dispatch(this._importAction.getImportJobsById(this.jobId));
                this.jobId = null;
            }, 3000);
        }
    }
    cancelImportJobs(ev) {
       if(this.jobsForm.dirty) {
          this.showJobDirtyCheckModal = true;
        } else {
          this.resetJobsForm();
          if (ev) {
              ev.preventDefault();
          }
        }
    }

    resetJobsForm() {
      this.clearImportFields();
      this.showEditImportJobs = false;

    }

    continueJobNavigation(ev) {
      this.showJobDirtyCheckModal = false;
      this.clearImportFields();
      this.showEditImportJobs = false;
      if (ev) {
        ev.preventDefault();
      }

    }

    dismissJobNavigation(ev) {
      //jQuery('#zui-unsaved-changes-prompt').modal('hide');
      this.showJobDirtyCheckModal = false;
    }

    jobFileUploadStatusCB() {
        if(this.importJob.jobFile === 'local') {
            return (response) => {
                this.jobFileUploadStatusMap[response] = 'true';
            };
        }
        return null;
    }

    checkJobUpload() {
        if(this.importJob.jobFile === 'local') {
           return (response) => {
                let jobId = response.id;
                this.jobFileUploadStatusMap[jobId] = 'false';
                this._importAction.uploadFile(jobId,this.uploadFormData , this.jobFileUploadStatusCB());
                this.showEditImportJobs = false;

            };
        }
        this.showEditImportJobs = false;
        return null;
    }
    onFileUploadChange(event) {
        let file = null;
        let $uploadJobForm = jQuery('#uploadFileForm');
        this.uploadFormData = new FormData($uploadJobForm[0]);
        let input = $uploadJobForm.find('uploadFileDrag');

      if(event.ev.dataTransfer) {
            file = event.ev.dataTransfer.files[0];
        } else {
            file = event.ev.target.files[0];
        }
        if(input) {
          this.uploadFormData = event.formData;
       }
        this.importJob.jobServerInput = file.name;
        this.jobUploadStatus = true;
        this.fileNameChanged = true;

    }
    validateImportJobs() {
        let validation = true;
        if(!this.importJob.jobName || !this.importJob.selectedFieldMap || !this.importJob.jobServerInput) {
            validation = false;
        }
        return validation;
    }
    createImportJobs(ev) {
        ev.preventDefault();
        let data = {'name': this.importJob.jobName, 'scheduledDate': moment(this.importJob.jobDate).valueOf(), 'folder': this.importJob.jobServerInput,
            'fileExtension': '.xls', 'fieldMapId': parseInt(this.importJob.selectedFieldMap),
            'releaseId': parseInt(this.releaseId), 'importEntityType': this.fieldOptions.type,
            'status': '11000',
            'isUpload': this.jobUploadStatus};

        if(!this.validateImportJobs()) {
            return;
        };

        if(this.clickedImportJobsButton === 'update') {
            data['id'] = this.importJob.jobId;
            this.zephyrStore.dispatch(this._importAction.updateImportJobs(data, this.checkJobUpload()));
        } else {
            this.zephyrStore.dispatch(this._importAction.createImportJobs(data, this.checkJobUpload()));
        }
    }
    dismissDeleteModal() {
        jQuery('.deleteModal').modal('hide');
    }

    dismissModal() {
      let shouldCloseModal = true;

      if(this.jobFileUploadStatusMap) {
        this.jobFileUploadStatusMap = {};
      }

      if (this.showSavedMaps) {
          // ev.preventDefault();

        if(JSON.stringify(this.originalRow) !== JSON.stringify(this.savedMaps)) {
          shouldCloseModal = false;
          }
      } else if (this.showImportJobs) {
        if (this.showEditImportJobs && (JSON.stringify(this.originalRow) !== JSON.stringify(this.importJob))) {
          shouldCloseModal = false;
        }
      }

      if (shouldCloseModal) {
        this.dismissImportMapsDialog(null);
      } else {
        this.showUnsavedChangesPopup = true;
      }

    }
    getDescription() {
        return this.showInstructions ? I18N_MESSAGES['zephyr.import.instructions.title'] :
                this.showSavedMaps ? I18N_MESSAGES['zephyr.import.savedMaps.title']:
                  this.showImportJobs ? I18N_MESSAGES['zephyr.import.importJobs.title'] : '';
    }
    getMessage(msg) {
        return I18N_MESSAGES[msg];
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
