import {Component , OnDestroy , OnChanges , Input , Output , EventEmitter , AfterViewInit,ViewChild, ChangeDetectorRef  } from '@angular/core';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {GlobalAction} from '../../../../actions/global.action';
import {DefectsAction} from '../../../../actions/defects.action';
import {ExpanderDirective} from '../../../directives/expander/expander.directive';
import * as events from '../../../../utils/constants/action.events';

declare var jQuery: any, moment: any,_:any;

// import './attachments.scss';

const DELETE = 'DELETE';
const NO_ACTION = 'NO_ACTION';

@Component({
  selector: 'attachments',
  templateUrl: 'attachments.html',
  providers : [GlobalAction, DefectsAction]
})

export class AttachmentsComponent implements OnDestroy, AfterViewInit {
    @ViewChild('attachmentsWrapper') attachmentsWrapper;
    @Input() entityType : string; //pass 'testcase' for testcase module; pass 'requirement' for requirement module ;
                                  // used in API call for adding the attachment to that entity
    @Input() isdefectView : boolean;
    @Input() uploadType : string;
    @Input() multiple : boolean = true;
    @Input() acceptType : string;
    @Input() isEditAvaiable : boolean; //weather user can add/delete attachment or not
    @Input() id : number; // id of that testcase/requirement
    @Output() emitAttachmentCount: EventEmitter<any> = new EventEmitter(); // emits the count of attachment when it is added/deleted
    zephyrStore;
    unsubscribe;
    widthLoader: number; // variable to control width of loader (progress bar)
    timeInterval ; // time interval variable for showing progress of loading the attachment
    showLoader:boolean; // boolean to control, when to show loader when not
    confirmationObject:any = {};
    attachmentsArray = []; // non-filtered Array of attachments
    currentLoggedInUserId : number;
    attachmentIndexToBeDeleted : number; // Index of attachment to be deleted
    newAttachment = []; // newly added attachment object
    currentPreviewAttachment:any = {}; // object of attachmeng being currently previewd
    previewableAttachmetnsArray = []; // filtered array of previewable attachments
    selectedPreviewableAttachmentIndex : number; // to highlight attachment being shown in carousel
    isShowAll : boolean; // boolean to control show-all-attachments in attachment-preview-modal below carousel
    isDragOver : boolean; // boolean to add class of drag-over-effect
    attachmentActionFired : boolean;
    acceptFileType = '';
    constructor(private _globalAction : GlobalAction, private _defectsAction : DefectsAction, private cdr: ChangeDetectorRef) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        this.widthLoader = 0;
        this.isShowAll = false;
        this.showLoader = false;
        this.currentLoggedInUserId = this.zephyrStore.getState().loggedInUser.id;
        this.isEditAvaiable = false;
        this.formatAttachmentArray();
        this.unsubscribe = this.zephyrStore.subscribe(() => {
             let state  = this.zephyrStore.getState();
             let event = state.global.event;

             if(this.isdefectView) {
               this.removeLoader();
               this.attachmentsArray = [].concat(state.linkNewDefect.attachmentData);
               if(this.attachmentsArray && this.attachmentsArray.length) {
                 this.formatDefectAttachmentArray();
                 if(this.cdr) { this.cdr.markForCheck(); }
               }
             } else if(this.uploadType ==='import' || this.uploadType ==='sso'  ) {
               this.removeLoader();
             } else {
               this.attachmentsArray = Array.isArray(state.global.attachment.list[this.id]) && state.global.attachment.list[this.id].length ? state.global.attachment.list[this.id][0] : [];
               this.formatAttachmentArray();
               if(this.cdr) { this.cdr.markForCheck(); }
             }
             if (((event === events.DELETE_ATTACHMENT_SUCCESS) || (event === events.SET_ATTACHMENT_PATH_PARTICUALR_ITEM_SUCCESS))
                   && this.attachmentActionFired) {
                this.attachmentActionFired = false;
                this.zephyrStore.dispatch(this._globalAction.clearGlobalEvents());

                this.emitAttachmentCount.emit({count: this.attachmentsArray.length, id: this.id, attachmentType: this.entityType });

                if (event === events.SET_ATTACHMENT_PATH_PARTICUALR_ITEM_SUCCESS) {
                   this.removeLoader();
                 }
             } else if (event === events.ERROR_EVENT) {
                this.zephyrStore.dispatch(this._globalAction.clearGlobalEvents());
                this.attachmentActionFired = false;
                this.removeLoader();
              }
        });
    }

    //This function uploades the file to server when uploaded from browse feature (in UI)
    loadFile (event) {
      let uploadFileForm = jQuery(this.attachmentsWrapper.nativeElement).find('#uploadFileForm');

      event.stopPropagation();
      event.preventDefault();

      let files = null,
        input = null,
        uploadFileSize=[],newFiles=[];
      if(event.dataTransfer) {
        files = event.dataTransfer.files;
        input = uploadFileForm.find('input[type="file"]');
      } else if(event.target) {
        files = event.target.files;

      }
      if (files && files[0] != null) { //checking wheather file is uploaded or not
        this.newAttachment = [];

        Object.keys(files).forEach(function(key) {
              uploadFileSize.push({'name':files[key]['name'],'fileSize':files[key]['size']});
              newFiles.push(files[key]);
        });
        this.newAttachment = newFiles;

        //API call to upload file to Server and it Returns with the path.
        this.attachmentActionFired = true;

        let formData = new FormData(uploadFileForm[0]);
        if(input && input.attr('name').length > 0) {
          Object.keys(files).forEach(function(key) {
            formData.append(input.attr('name'), files[key]);
          });

        }
        if(this.isdefectView) {
                Object.keys(files).forEach(key => {
          formData.append('filedesc', files[key].name);
          formData.append('action', 'upload');
          formData.append('comments', 'File uploaded from zephyr');
          formData.append('bugId', this.id);
          formData.append('filename', files[key].name);
          });
          this.zephyrStore.dispatch(this._defectsAction.uploadAttachmentForDefect(formData, this.id, uploadFileSize, this.currentLoggedInUserId));
          //show screen loader
          this.loaderScreen();
        } else if(this.uploadType ==='SSO') {
          //let fileSize = uploadFileSize.length > 0? uploadFileSize[0].fileSize :0;
          this.showLoader = false;
          this.zephyrStore.dispatch(this._globalAction.uploadSSOCertificate(formData, 0 ,uploadFileSize[0].fileSize, this.currentLoggedInUserId));
        } else if(this.uploadType ==='import') {
          this.showLoader = false;
          this.acceptFileType = this.acceptType;
          if(files[0].type.indexOf('excel') ){
            this.emitAttachmentCount.emit({ev: event, formData: formData});
            }else {
            return;
            }
        } else {
          //show screen loader
          this.zephyrStore.dispatch(this._globalAction.uploadAttachment(formData, this.id , uploadFileSize, this.currentLoggedInUserId));
          //setTimeout(()=>{
            this.loaderScreen();
         // });

        }
      }
      setTimeout(()=>{
        //clear the input after upload
        jQuery(this.attachmentsWrapper.nativeElement).find('#uploadFile').val("");
      });
    }

    //This function triggers the hidden input(type=file), when clicked on browse feature (in UI)
    chooseFileButtonClicked () {
      this.acceptFileType = this.acceptType;
      jQuery(this.attachmentsWrapper.nativeElement).find('#uploadFile').trigger('click');
    }

    //This event is fired when file is being dropped in the Div. It adds drag-over-effect class.
    handleDragOver (event) {
      event.stopPropagation();
      event.preventDefault();
      this.isDragOver = true;
      event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    //This event is fired when dragged file enter's the Div. It adds drag-over-effect class.
    onDragEnter() {
      this.isDragOver = true;
    }

    //This event is fired when dragged file leaves the Div. It removes drag-over-effect class.
    onDragLeave() {
      this.isDragOver = false;
    }

    ngOnDestroy() {
      this.unsubscribe();
    }

    // This function handles the loader screen. Makes the loader visible and increases the progress/width of loader.
    loaderScreen() {
      this.showLoader = true;
      clearInterval(this.timeInterval);
      this.widthLoader = 0;
      this.timeInterval = setInterval(() => {
        this.widthLoader = this.widthLoader < 80 ? this.widthLoader + 1 : this.widthLoader;
      }, 100);
    }

    // This function removes the loader from the screen.
    removeLoader() {
      this.widthLoader = 100;
      clearInterval(this.timeInterval);
      this.showLoader = false;
    }

    // This function formats the defects attachmentsArray and previewableAttachmentArray
    formatDefectAttachmentArray() {
        this.previewableAttachmetnsArray = [];
        if(this.attachmentsArray.length > 0) {
            this.attachmentsArray.forEach(object => {
                let fileNameArray = object.name.split('.');
                let fileExtension = fileNameArray[fileNameArray.length - 1];

                object['downloadLink'] = object.url;
                object['timeStamp'] = this.calcUploadTimeStamp(object.timeStamp);
                if ((/(gif|jpg|jpeg|tiff|png)$/i).test(fileExtension)) {
                    object['typeImage'] = true;
                    // TOOD : Without passing absolute path, image is not properly rendered.
                    object['path'] = object.url;
                    this.previewableAttachmetnsArray.push(object);
                }
            });
        }
    }

    // This function formats the attachmentsArray and previewableAttachmentArray
    formatAttachmentArray() {
      this.previewableAttachmetnsArray = [];
      if(this.attachmentsArray.length > 0) {
        this.attachmentsArray.forEach((object,index) => {
            let fileNameArray = object.name.split('.');
            let fileExtension = fileNameArray[fileNameArray.length - 1];

          // TOOD : Without passing absolute path, it does not work.
          object['downloadLink'] = '/flex/download?action=download&fileId=' + object.refId;
          //let tt = !isNumber(object.timeStamp)? object.timeStamp:parseInt(object.timeStamp);
          object['timeStamp'] = _.isNumber(object.timeStamp)? this.calcUploadTimeStamp(object.timeStamp):object.timeStamp;
          let fileSize = Number(object.fileSize);
          if (!isNaN(fileSize)) {
              object['fileSize'] = this.getReadableFileSizeString(fileSize);
          }

          //appending to attachmentArray as requiren in UI and Download
          this.attachmentsArray[index]['downloadLink'] = object.downloadLink;
          this.attachmentsArray[index]['timeStamp'] = object.timeStamp;
          this.attachmentsArray[index]['fileSize'] = object.fileSize;

          if ((/(gif|jpg|jpeg|tiff|png)$/i).test(fileExtension)) {
            this.attachmentsArray[index]['typeImage'] = true;
            this.attachmentsArray[index]['path'] = object.downloadLink;

            object['typeImage'] = true;
            // TOOD : Without passing absolute path, image is not properly rendered.
            object['path'] = object.downloadLink;
            this.previewableAttachmetnsArray.push(object);
          }
        });
      }
    }

    // This function provides confirmation for deleting the attachment.
    deleteAttachmentClicked(id) {
      jQuery('#confirmation-modal').modal();
      this.confirmationObject['heading'] = 'Delete Confirmation';
      this.confirmationObject['text'] = 'Do you want to delete this Attachment? ';
      this.confirmationObject['buttonText'] = 'Delete';
      this.confirmationObject['showCancelButton'] = true;
      this.confirmationObject['action'] = DELETE;
      this.attachmentIndexToBeDeleted = id;
    }

    // This function is called when particular attachment is clicked.
    attachmentClicked(event , attachmentObejct , attachmentArrayIndex) {
      if (event.target.className.indexOf('delete-image') > -1) {
        //Checks if delete icon is clicked
        this.deleteAttachmentClicked(attachmentObejct.id);
      } else if (attachmentObejct.typeImage) {
        //Opens preview for attachments, whose preview is available
        this.currentPreviewAttachment = this.attachmentsArray[attachmentArrayIndex];
        this.previewableAttachmetnsArray.forEach((object, index) => {
          if (object.id === this.currentPreviewAttachment['id']) {
            this.selectedPreviewableAttachmentIndex = index;
          }
        });
        jQuery(this.attachmentsWrapper.nativeElement).find('.carousel').carousel(this.selectedPreviewableAttachmentIndex);
        jQuery(this.attachmentsWrapper.nativeElement).find('#attachments-preview-modal').modal();
        this.isShowAll = false;
      } else {
        //Downloading the clicked attahcment whose preview is not available
        window.open(attachmentObejct.downloadLink, '_self');
      }
    }

    ngAfterViewInit() {
        // It attaches the listener whenever carousel-slide is changed, to highlight the currently previewd attachment
       jQuery(this.attachmentsWrapper.nativeElement).find('#carousel-example-generic').on('slide.bs.carousel', ev => {
            let selectedPreviewableAttachmentIndex = 0;
            selectedPreviewableAttachmentIndex = parseInt(ev.relatedTarget?ev.relatedTarget.dataset.index:0);
            this.selectedPreviewableAttachmentIndex = selectedPreviewableAttachmentIndex;
            this.currentPreviewAttachment = this.previewableAttachmetnsArray[selectedPreviewableAttachmentIndex] || {};
            this.cdr.detectChanges();
            this.setHorizontalScrollBarPosition();
        });
    }

    confirmationActionCall(event) {
      let actionString = event.target.value;
      if (actionString === DELETE) {
          this.attachmentActionFired = true;
          // API call for deleting the attachment
          this.zephyrStore.dispatch(this._globalAction.deleteAttachment(this.attachmentIndexToBeDeleted, this.id));
          jQuery('#confirmation-modal').modal('hide');
      } else if (actionString === NO_ACTION) {
        jQuery('#confirmation-modal').modal('hide');
      }
    }

    // This function changes the boolean value of showing-all-attachments
    showAllPreviewableAttachments () {
      this.isShowAll = true;
    }

    // This function is called when attachment is clicked in previewing-screen. It changes the carousel-slide and other data of the modal.
    changeCarouselPreview (i) {
      this.selectedPreviewableAttachmentIndex = i;
      jQuery(this.attachmentsWrapper.nativeElement).find('.carousel').carousel(this.selectedPreviewableAttachmentIndex);
    }

    // This function calculates the time, when attachment was uploaded
    calcUploadTimeStamp (timeStamp) {
      let i = -1;
      let currentDate = new Date (),
          currentDateMs = currentDate.getTime(),
          attachmentDate = new Date (timeStamp),
          attachmetnDateMs = attachmentDate.getTime(),
          msDiff = Math.abs((currentDateMs - attachmetnDateMs)/1000);
      let timeString = '';
      if (msDiff <= 60) {
        return 'just now'; //retunrs 'just now' when time difference is 1 minute.
      } else if (msDiff <= 600 && msDiff > 60) {
        return 'few mins ago'; //retunns 'few minutes' when time difference is less than 10 min.
      } else if (msDiff <= 60*60 && msDiff > 600) {
        return  Math.round(msDiff/60) + ' mins ago'; //returns 'no of minutes' when time difference is more than 10 min
      } else if (msDiff <= 24*60*60 && msDiff >60*60) {
        return (Math.round(msDiff/3600) + (Math.round(msDiff/3600) > 1 ? ' hrs ago' : ' hr ago')); //returns 'no of hrs' when
                                                                                    //time difference is more than 60 min.
      } else {
        return moment(attachmetnDateMs).format('YYYY-MM-DD');//returns 'date' when time difference is more than 24 hrs.
      }
    }

    // This function calculates the file-size-string
    getReadableFileSizeString (fileSizeInBytes) {
      let i = -1;
      let byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
      do {
          fileSizeInBytes = fileSizeInBytes / 1024;
          i++;
      } while (fileSizeInBytes > 1024);

      return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    }

    // This method sets the scroll bar position on click of carousel prev/next buttons.
    setHorizontalScrollBarPosition () {
      let widthShowAllAttchmnetsDiv = jQuery(this.attachmentsWrapper.nativeElement).find('.show-all-previewable-attachments').outerWidth(),
          expectedLeftAbsolutePosition = 170 * (this.selectedPreviewableAttachmentIndex + 1),//170px is space occupied by each thumbnail
          widthToBeScrolled = expectedLeftAbsolutePosition - widthShowAllAttchmnetsDiv;

      widthToBeScrolled > 0 ?
            jQuery(this.attachmentsWrapper.nativeElement).find('.show-all-previewable-attachments').scrollLeft(widthToBeScrolled) :
            jQuery(this.attachmentsWrapper.nativeElement).find('.show-all-previewable-attachments').scrollLeft(0);
    }
  }
