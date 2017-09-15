import {Component, Input} from '@angular/core';
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';

declare var jQuery: any, _;

@Component({
    selector: 'zee-import-dialog-requirement',
    templateUrl: 'requirement_import.html'
})
export class RequirementsImportComponent {
    @Input() fieldOptions;
    @Input() syncClicked;
    i18nMessages = I18N_MESSAGES;
    exportFromExcel() {
        jQuery('#zui-import-modal-choice').modal('hide');
        jQuery('#zee-import-modal-requirement').modal();
    }
    exportFromJIRA() {
        jQuery('#zui-import-modal-choice').modal('hide');
        jQuery('#zee-import-modal-requirement-jira').modal();
    }
}
