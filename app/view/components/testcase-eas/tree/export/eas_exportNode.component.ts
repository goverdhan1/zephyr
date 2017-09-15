import {Component, AfterViewInit, ViewChild} from '@angular/core';
//import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control} from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {ActivatedRoute} from '@angular/router';
import {TestcaseEASAction} from '../../../../../actions/testcaseEAS.action';
import {ExportComponent} from '../../../common/export/export.component';

import {ZephyrStore} from '../../../../../store/zephyr.store';
import {TCR_BULK_OPERATION_OPTIONS, TCR_BULK_OPERATION} from '../../../tcr/operations/tcr_operations.constant';


declare var jQuery: any;
declare var _: any;

@Component({
    templateUrl: 'eas_exportNode.html'
})

export class EasExportNodeComponent implements AfterViewInit {
    @ViewChild(ExportComponent) exportCmp: ExportComponent;
    cycleInfo;
    modalId;
    _reportType;
    fieldOptions = _.cloneDeep(TCR_BULK_OPERATION_OPTIONS['export']);
    private zephyrStore;
    constructor(private _testcaseEASAction: TestcaseEASAction) {
        //this._releaseId = params.getParam('id');
        this.zephyrStore = ZephyrStore.getZephyrStore();
    }

    ngAfterViewInit() {
       //jQuery('#easExportNodeModal').modal();
       jQuery('.zui-export-modal').find('.modal').modal();
    }


    setFieldsOptions(node, releaseId) {
      if(!node.item) {
        node['item'] = {
          nodeData: JSON.stringify(node.a_attr)
        };
      }
      var parsedNode = JSON.parse(node.item.nodeData)['data-node'],
        _searchCriteria, _getMetadata;

      switch(parsedNode) {
        case 'cycle' :
          _searchCriteria = 'cycleId:' + JSON.parse(node.item.nodeData)['data-id'];
          _getMetadata = false;
          if(this.exportCmp && this._reportType != 'CYCLE') {
            this._reportType = 'CYCLE';
            _getMetadata = true;
          }
//          console.log('field options', this.fieldOptions);
          break;

        case 'phase' :
          this.fieldOptions.exportType = 'TestSchedule';
          _searchCriteria = 'cyclePhaseId:' + JSON.parse(node.item.nodeData)['data-id'] + ';displayStep:true';
          _getMetadata = false;
          if(this.exportCmp && this._reportType != 'CUSTOM_REPORT_TYPE_CYCLE_PHASE') {
            this._reportType = 'CUSTOM_REPORT_TYPE_CYCLE_PHASE';
            _getMetadata = true;
          }
          break;
      }


      this.fieldOptions['searchCriteria'] = _searchCriteria;
      this.fieldOptions['title'] = 'Customize and Export Reports';
      this.fieldOptions['releaseId'] = releaseId;
      this.fieldOptions['subTitle'] = 'Phase Report';
      this.fieldOptions['label'] = 'Assignment Report';
      if(_getMetadata)
          this.exportCmp.getExportMetadata(this._reportType);
      }


}
