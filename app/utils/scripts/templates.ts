declare var jQuery: any;

export class Templates {

    defectPopover(popoverContent) {
        return `<form id="popoverContent" class="defect-details-popover">
            <div>
                <label>ID : </label><span class="bold">${popoverContent.alternateId}</span>
            </div>
            <div>
                <label>Status : </label><span class="bold">${popoverContent.status}</span>
            </div>
            <div>
                <label>Summary : </label><span class="bold">${popoverContent.shortDesc || ''}</span>
            </div>
        </form>`;
	}

    defectPopoverInTce(popoverContent) {
        if(!popoverContent) {
            return '';
        }
        return `<form id="popoverContent" class="defect-details-popover">
            <div>
                <label>ID : </label><span class="bold">${popoverContent.externalId}</span>
            </div>
            <div>
                <label>Status : </label><span class="bold">${popoverContent.status}</span>
            </div>
            <div>
                <label>Summary : </label><span class="bold">${popoverContent.description || ''}</span>
            </div>
            <div>
                <label>Priority : </label><span class="bold">${popoverContent.priority || ''}</span>
            </div>
        </form>`;
    }
}
