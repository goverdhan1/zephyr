import {Component , OnDestroy , Input , Output , EventEmitter , AfterViewInit , Inject , ElementRef} from '@angular/core';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {GlobalAction} from '../../../../actions/global.action';
import * as events from '../../../../utils/constants/action.events';


declare var jQuery: any,_:any;
declare var self: any;

const DELETE = 'DELETE';
const NO_ACTION = 'NO_ACTION';

@Component({
  selector: 'attachment',
  templateUrl: 'attachment.html',
  providers : [GlobalAction]
})

export class AttachmentComponent implements OnDestroy, AfterViewInit {
    @Input() entityType : string; //pass 'testcase' for testcase module; pass 'requirement' for requirement module ;
                                  // used in API call for adding the attachment to that entity
    @Input() isEditAvaiable : boolean; //weather user can add/delete attachment or not
    @Input() id : number; //id of that testcase/requirement
    @Output() emitAttachmentCount: EventEmitter<any> = new EventEmitter(); //emits the count of attachment when it is added/deleted
    zephyrStore;
    unsubscribe;
    widthLoader: number;
    timeInterval ;
    selectedAttachmentIndex : number;
    selectedAttachment= {};
    showAdd:boolean;
    showLoader:boolean;
    confirmationObject = {};
    attachmentsArray = [];
    currentLoggedInUserId : number;
    attachmentActionFired : boolean;
    private elementRef: ElementRef;
    constructor(@Inject(ElementRef) elementRef: ElementRef, private _globalAction : GlobalAction) {
        this.elementRef = elementRef;
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.widthLoader = 0;
        this.selectedAttachmentIndex = 0;
        this.showLoader = false;
        this.showAdd = this.attachmentsArray.length > 0 ? false : true;
        this.currentLoggedInUserId = this.zephyrStore.getState().loggedInUser.id;
        this.isEditAvaiable = false;
        this.selectedAttachment = this.attachmentsArray.length > 0 ? this.attachmentsArray[0] : {'typeImage' : false , 'path' : ''};
        this.unsubscribe = this.zephyrStore.subscribe(() => {
            let state  = this.zephyrStore.getState();
            let event = state.global.event;
            let that = this;
            this.attachmentsArray = Array.isArray(state.global.attachment.list[this.id]) && state.global.attachment.list[this.id].length ? state.global.attachment.list[this.id][0] : [];
            this.showAdd = this.attachmentsArray.length > 0 ? false : true;
            this.selectedAttachment = this.attachmentsArray.length > 0 ? this.attachmentsArray[0] : {'typeImage' : false , 'path' : ''};
            this.formatAttachmentArray();
            jQuery('#attachment-modal .modal-body').removeClass('loader');
            if ((event === events.DELETE_ATTACHMENT_SUCCESS || event === events.SET_ATTACHMENT_PATH_PARTICUALR_ITEM_SUCCESS && this.attachmentActionFired)) {
                // Emitting count of attachments to parent component.
                this.attachmentActionFired = false;
                this.zephyrStore.dispatch(this._globalAction.clearGlobalEvents());

                this.emitAttachmentCount.emit({count: this.attachmentsArray.length, id: this.id, attachmentType: this.entityType});

                if (event === events.SET_ATTACHMENT_PATH_PARTICUALR_ITEM_SUCCESS) {
                    this.removeLoader();
                }
            } else if (event === events.ERROR_EVENT) {
                this.zephyrStore.dispatch(this._globalAction.clearGlobalEvents());
                this.removeLoader();
            }
        });
    }

    loadFile (event) {
      let uploadFileForm = jQuery('#attachment-modal #uploadFileForm');
      let formData = new FormData(uploadFileForm[0]);
      if (event.target.files && event.target.files[0] != null ) { //checking wheather file is uploaded or not
        let files = event.target.files;
        let fileSize = [];
        Object.keys(files).forEach(function(key) {
          fileSize.push({'name':files[key]['name'],'fileSize':files[key]['size']});
        });

        this.loaderScreen();
        //API call to upload file to Server and it Returns with the path.
        this.attachmentActionFired = true;
        this.zephyrStore.dispatch(this._globalAction.uploadAttachment(formData, this.id ,fileSize, this.currentLoggedInUserId));
      }

      //clear the input after upload
      jQuery('#attachment-modal #uploadFileForm').find('#uploadFile').val("");
    }
    chooseFileButtonClicked () {
      jQuery('#attachment-modal #uploadFile').trigger('click');
    }
    handleDragOver (event) {
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }
    handleFileSelect (event) {
      event.stopPropagation();
      event.preventDefault();

      let files = event.dataTransfer.files; // FileList object.
      let fileSize =[];
      if(files && files[0] != null){
        Object.keys(files).forEach(function(key) {
          fileSize.push({'name':files[key]['name'],'fileSize':files[key]['size']});
        });
        let formData;
        let uploadFileForm = jQuery('#attachment-modal #uploadFileForm'),
          input = uploadFileForm.find('input[type="file"]');
        formData = new FormData(uploadFileForm[0]);
        if(input && input.attr('name').length > 0) {
          Object.keys(files).forEach(function(key) {
            formData.append(input.attr('name'), files[key]);
          });
        }
        //formData.append( input.attr('name'), f );
        this.loaderScreen();
        this.attachmentActionFired = true;
        //API call to upload file to Server and it Returns with the path.
        this.zephyrStore.dispatch(this._globalAction.uploadAttachment(formData, this.id , fileSize, this.currentLoggedInUserId));
      }

    }

    ngOnDestroy() {
      this.unsubscribe();
    }

    loaderScreen() {
      this.showLoader = true;
      clearInterval(this.timeInterval);
      this.widthLoader = 0;
      this.timeInterval = setInterval(() => {
        this.widthLoader = this.widthLoader < 80 ? this.widthLoader + 1 : this.widthLoader;
      }, 100);
    }

    removeLoader () {
      this.widthLoader = 100;
      clearInterval(this.timeInterval);
      setTimeout(() => {
          this.showLoader = false;
          this.selectedAttachmentIndex = 0;
          // this.showAdd = false;
          jQuery('#attachment-modal .carousel').carousel(this.selectedAttachmentIndex);
      }, 2000);
    }

    formatAttachmentArray () {
        if (Array.isArray(this.attachmentsArray)) {
            this.attachmentsArray.forEach(object => {

                let fileNameArray = (object.name || '').split('.');
                let fileExtension = fileNameArray[fileNameArray.length - 1];

                // TOOD : Without passing absolute path, it does not work.
                object['downloadLink'] = '/flex/download?action=download&fileId='+ object.refId;

                if ((/(gif|jpg|jpeg|tiff|png)$/i).test(fileExtension)) {
                    object['typeImage'] = true;
                    // TOOD : Without passing absolute path, image is not properly rendered.
                    object['path'] = '/flex/download?action=view&fileId='+ object.refId;
                }
            });
            if (this.attachmentsArray.length > 0 ) {
                this.selectedAttachmentIndex = 0;
                jQuery('#attachment-modal .carousel').carousel(this.selectedAttachmentIndex);
            }
        }
    }

    attachmentListClicked(index) {
      this.selectedAttachmentIndex = index;
      jQuery('#attachment-modal .carousel').carousel(index);
      this.selectedAttachment = this.attachmentsArray[index];
      this.showAdd = false;
    }

    deleteAttachmentClicked (event) {
      let wrapper = jQuery(event.target).closest('.attachment-info-wrapper').addClass('delete-attachment-confirmation');
    }
    addAttachmentClicked () {
      this.showAdd = true;
      this.showLoader = false;
      this.selectedAttachmentIndex = -1;
    }

    ngAfterViewInit() {
        jQuery(this.elementRef.nativeElement).find('#carousel-example-generic-one').on('slide.bs.carousel', ev => {
            this.selectedAttachmentIndex = Number(ev.relatedTarget && ev.relatedTarget.dataset && ev.relatedTarget.dataset.index);
        });
        jQuery('#attachment-modal').on('shown.bs.modal', e => {
          this.fetchAttachments();
        });
    }

    fetchAttachments () {
       //API call to fetch attachment list
       let formData = {};
           formData['itemid'] = this.id;
           formData['type'] = this.entityType;
       jQuery('#attachment-modal .modal-body').addClass('loader');
       this.zephyrStore.dispatch(this._globalAction.fetchAttachments(formData));
    }

    cancelDelete(event) {
      let wrapper = jQuery(event.target).closest('.attachment-info-wrapper').removeClass('delete-attachment-confirmation');
    }

    deleteAttachment(id, event) {
      let wrapper = jQuery(event.target).closest('.attachment-info-wrapper').removeClass('delete-attachment-confirmation');
      //API call for deleting the attachment
      this.attachmentActionFired = true;
      this.zephyrStore.dispatch(this._globalAction.deleteAttachment(id , this.id));
    }

    leftCarousal(ev) {
      jQuery('#carousel-example-generic-one').carousel('prev');
    }

    rightCarousal(ev) {
      jQuery('#carousel-example-generic-one').carousel('prev');
    }
    // confirmationActionCall($event) {
    //   let actionString = $event.target.value;
    //   if (actionString === DELETE) {
    //       //API call to be made here if its common or id to be emitted out
    //       this.onDeleteClick.emit(this.attachmentsArray[this.attachmentIndexToBeDeleted]['id']);
    //       console.log('API to delete Attachment of id ' , this.attachmentsArray[this.attachmentIndexToBeDeleted]['id']);
    //       jQuery('#confirmation-modal').modal('hide');
    //   }else if (actionString === NO_ACTION) {
    //     jQuery('#confirmation-modal').modal('hide');
    //   }
    // }
  }
