import {Component, Input} from '@angular/core';

declare var AJS;

@Component({
    selector: 'zee-import-dialog',
	template: `
        <zui-import
            [fieldOptions]="fieldOptions"
        ></zui-import>
    `
})
export class TestcaseImportComponent {
    @Input() fieldOptions;
}
