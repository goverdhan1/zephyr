import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {ExportComponent} from '../../../../common/export/export.component';
import {TCR_BULK_OPERATION_OPTIONS} from '../../../../tcr/operations/tcr_operations.constant';

declare var jQuery: any;
declare var _: any;

@Component({
    templateUrl: 'eas_phase_export.html'
})

export class EasPhaseExportComponent implements AfterViewInit {
    @ViewChild(ExportComponent) exportCmp: ExportComponent;
    _reportType;
    phaseTreeId;
    fieldOptions;
    constructor() {
      this.fieldOptions = _.cloneDeep(TCR_BULK_OPERATION_OPTIONS['export']);
    }

    ngAfterViewInit() {
       jQuery('.zui-export-modal').find('.modal').modal();
    }


    setFieldsOptions(node, releaseId) {
      let _searchCriteria = 'cyclePhaseId:' +this.phaseTreeId+ ';displayStep:true',
          _getMetadata = false;
      if(this.exportCmp && this._reportType != 'CUSTOM_REPORT_TYPE_CYCLE_PHASE_ASSIGN') {
          this._reportType = 'CUSTOM_REPORT_TYPE_CYCLE_PHASE_ASSIGN';
          _getMetadata = true;
      }
      this.fieldOptions['searchCriteria'] = _searchCriteria;
      this.fieldOptions['title'] = 'Customize and Export Reports';
      this.fieldOptions['releaseId'] = releaseId;
      this.fieldOptions['label'] = 'Assignment Report';
      if(_getMetadata)
         this.exportCmp.getExportMetadata(this._reportType);
    }
}
