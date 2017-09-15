import 'jquery-ui/ui/widgets/resizable';
declare var jQuery: any;

export class Resizable {

    attachResizable(resizableContainer, resizableTrigger, options) {

        if(resizableContainer.resizable( 'instance' )) {
			resizableContainer.resizable('destroy');
		}
		resizableContainer.resizable({
	        handles: {
	            w: resizableTrigger
	        },
	        minWidth: options.minWidth,
            maxWidth: options.maxWidth,
            minHeight: options.minHeight,
            maxHeight: options.maxHeight,
		    resize: function(event, ui) {
				if(options.lockHeight) {
      				ui.size.height = ui.originalSize.height;
				}
				if(options.lockWidth) {
		      		ui.size.width = ui.originalSize.width;
				}
		    }
	    });
	}
	attachDefaultResizable(resizableContainer) {
		if(resizableContainer.resizable( 'instance' )) {
			resizableContainer.resizable('destroy');
		}
		resizableContainer.resizable({
			handles: 'n, e, s, w, ne, se, sw, nw',
			minWidth: '100%'
		});
	}
}
