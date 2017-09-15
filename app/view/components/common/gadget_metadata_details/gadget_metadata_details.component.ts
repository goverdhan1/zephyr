import {
  Component,
  Input, Output, EventEmitter,
  OnDestroy
} from '@angular/core';
import {Router} from '@angular/router';

declare var jQuery, _;
// Constants

@Component({
	selector: 'zui-gadget-metadata',
  templateUrl: 'gadget_metadata_details.html'
})

export class GadgetMetadataDetailsComponent {

  @Input() projectName : string = "";
  @Input() releaseName : string = "";
  @Input() refreshRate : string = "";
  @Input() lastRefresh : string = "";

}
