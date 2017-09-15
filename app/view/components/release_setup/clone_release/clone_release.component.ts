import {
  Component, OnInit, AfterViewInit, OnDestroy, EventEmitter, Output, Input, OnChanges,
  ChangeDetectorRef
} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
//import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {ReleaseAction} from '../../../../actions/release.action';
import {ProjectAction} from '../../../../actions/project.action';
import {JobStatusComponent} from '../../common/job_status/job_status.component';
import {MANAGER_ROLE_ID} from '../../admin/customizations/customizations.constant';
import {UtililtyFunctions} from '../../../../utils/scripts/utils';
import {RELEASE_DATE_FORMAT} from '../../../../utils/constants/application.constants';

declare var jQuery: any, moment: any, _: any, window;

const CLONE_RELEASE_CONFIRMED = 'CLONE_RELEASE_CONFIRMED';
const ANYONE_USER_ID = -10; //Considerng anyone user-id to be fixed as -10
const DASHBOARD_ROLE = 'dashboard'; //Considerng anyone user-id to be fixed as -10
const NO_ACTION = 'NO_ACTION';

@Component({
  selector: 'clone-release',
  viewProviders: [ReleaseAction],
  templateUrl: 'clone_release.html'
})

export class CloneReleaseComponent implements AfterViewInit, OnDestroy {
    @Output() refreshReleases: EventEmitter<any> = new EventEmitter();
    zephyrStore;
    state;
    isShowForm:boolean;
    public cloneForm : FormGroup;
    projects= [];
    users = [];
    releases = [];
    breadCrumbsList;
    idCurrentUser;
    offset;
    cloneTreeDom;
    unsubscribe;
    filteredReleases = [];
    dateReleaseSelected;
    confirmationObject : any = {};
    formValues = {};//form object of clone-form
    datesValidation = {
      'startDateMin' : undefined,
      'startDateMax' : undefined
    };
    releaseDateSelected;
    currentProject = {};
    defaultSelectedResourceId;
    showDirtyCheckModal = false;
    _previousValue = {};
    cloneMessages = {};

    constructor( fb: FormBuilder, private _releaseAction: ReleaseAction  ,public router: Router, private route: ActivatedRoute,
                private _projectAction: ProjectAction, private cdr: ChangeDetectorRef) {
        this.zephyrStore = ZephyrStore.getZephyrStore();

       //this function initializes the options of cloning in clone form
        this.buildingCloneForm();
        this.zephyrStore.dispatch(this._projectAction.fetchUsersAllocatedToAllProjects());
        this.breadCrumbsList = [{text:'Release Setup' , id:'/release_setup/details'}];
        this.cloneMessages = {
          'success' : 'Cloned successfully',
          'failure' : 'Cloning failed'
        };
        this.isShowForm = false; //Initially hiding clone form form UI

        this.offset = 0;

        this.idCurrentUser = this.zephyrStore.getState().loggedInUser.id;
        //filtering projects according to user logged in
        this.filterProjects();

        //clone form assignments
        this.cloneForm = fb.group({
          targetProjectId: ['', Validators.required],
          oldReleaseId : ['',Validators.required],
          defaultUserId : [this.idCurrentUser , Validators.required],
          releaseStartDate : [undefined, Validators.required],
          assignment: [false],
          cycle:[false],
          document : [false],
          execution : [false],
          executionAtt: [false],
          executionComment:[false],
          stepExecution : [false],
          stepExecutionAtt : [false],
          stepExecutionComment: [false],
          defectMap:[false],
          requirement : [false],
          reqTcMap : [false],
          tcc: [false],
          tcAtt:[false],
          applyDateShift : [false],
          reqAtt : [false]
         });

        this.releases = this.zephyrStore.getState().release.allReleases || [];

        this.unsubscribe = this.zephyrStore.subscribe(() => {
            this.state  = this.zephyrStore.getState();

            this.idCurrentUser = this.state.loggedInUser.id;

            this.filterUsers();
            //filtering projects according to user logged in
            this.filterProjects();

            //Re-adjusting releases array to fit the iterations for select options
            this.filteredReleases = this.state.release.releaseSetupGrid.sortedRows;
              for (let i=0; i <this.filteredReleases.length; i++) {
                let release = this.filteredReleases[i];
                this.filteredReleases[i]['value'] = release.id;
              }

            this.releases = this.zephyrStore.getState().release.allReleases || [];
        });

    }

    //This function confirms cloning of release
    onCloneFormSubmit(formValues) {
      let isFormValid = false;
      for (var key in formValues) {
          if (formValues.hasOwnProperty(key)) {
            var val = formValues[key];
            if (key === 'releaseStartDate') {
              formValues['relStartDate'] = val;
              let d = new Date (val);
              val = d.getTime();
              formValues[key] = val;
            } else if (key === 'targetProjectId') {
              formValues[key] = this.currentProject['id'];
            } else if (val === true) {
              isFormValid = true;
            }
          }
        }
      this.formValues = formValues;

      if (isFormValid) {
        //Confirmation to clone release
        jQuery('#confirmation-modal-clone').modal();
        this.confirmationObject['heading'] = 'Confirmation';
        this.confirmationObject['text'] = 'Based on the size of the release being cloned and the options selected,' +
                    'this process can take a long time to complete. The release being cloned will be locked and '+
                    'unavailable to users during this process. Any unsaved data will be lost and API access to this '+
                    'release will also be impacted. It is highly recommended that this feature be used during '+
                    'off-peak hours so users are not affected. Please inform users of this impact.\n' +
                    'Do you wish to continue?';
        this.confirmationObject['buttonText'] = 'Yes';
        this.confirmationObject['showCancelButton'] = true;
        this.confirmationObject['action'] = CLONE_RELEASE_CONFIRMED;
      } else {
        jQuery('#confirmation-modal-clone').modal();
        this.confirmationObject['heading'] = 'Validation error';
        this.confirmationObject['text'] = 'Please select at least one of these options:\n' +
                    '\'Clone Testcase Repository\'\n'+
                    '\'Clone requirement repository\'\n';
                    // '\'Clone Documents\'.';
        this.confirmationObject['buttonText'] = 'Ok';
        this.confirmationObject['showCancelButton'] = false;
        this.confirmationObject['action'] = NO_ACTION;
      }
    }

    //API call to clone release
    clonedReleaseAPIcall() {
       //API call to clone release
       let componentId = '-cloneRelease';
      this.zephyrStore.dispatch(this._releaseAction.cloneRelease(this.formValues, componentId));
    }

    filterUsers() {
      this.users = this.zephyrStore.getState().global.users &&
        JSON.parse(JSON.stringify(this.zephyrStore.getState().global.users));
      this.currentProject = JSON.parse(localStorage.getItem(`${window.tab}-currentProject`)) || {};
      let utililtyFunction = new UtililtyFunctions();
      this.users = utililtyFunction.getUserMap (this.users,this.zephyrStore.getState().project.members|| []);
      let isCurrentUserInList = false;
      let usersLength = this.users.length;
      for (let i=0; i < usersLength; i++) {
        let user = this.users[i];
        let isRoleDashboard = _.findIndex(user.roles, {'name' : DASHBOARD_ROLE}) !== -1;

        if (user.id === ANYONE_USER_ID || isRoleDashboard) {
          this.users.splice( i , 1);
          i--;
          usersLength--;
        } else {
          if (user.id == this.idCurrentUser) {
            isCurrentUserInList = true;
          }
        }
      }
      //This is for default selection of resource
      //INFO: if cuurentLoggedin user is there in list, select that. Otherwise select default first option
      isCurrentUserInList ? this.defaultSelectedResourceId = this.idCurrentUser : this.defaultSelectedResourceId =
                  this.users[0] && this.users[0].id;
    }

    confirmationActionCall($event) {
      let actionString = $event.target.value;
      if (actionString === CLONE_RELEASE_CONFIRMED) {
        jQuery('#confirmation-modal-clone').modal('hide');
         this.clonedReleaseAPIcall();
      } else {
        jQuery('#confirmation-modal-clone').modal('hide');
      }
    }

    //This function initalises thfe checkbox tree as JSON object.
    buildingCloneForm () {

      //initializing tree Array
      let stepExecutionObject =   { key : 'stepExecution',
                                 label : 'Clone Step Execution Results',
                                 child : [ { key : 'stepExecutionComment',
                                             label : 'Step Execution Comments'
                                           },
                                           { key : 'stepExecutionAtt',
                                             label : 'Step Execution Attachments'
                                           }
                                 ]
          };
      let executionObject = { key : 'execution',
                              label : 'Clone Execution Results',
                              child : [ { key : 'defectMap',
                                         label : 'Execution-Defect Mappings'
                                       },
                                       { key : 'executionComment',
                                         label : 'Execution Comments'
                                       },
                                       { key : 'executionAtt',
                                         label : 'Execution Attachments'
                                       },stepExecutionObject
                             ]
                        };
      let cyclePhaseObject = { key : 'assignment' ,
                               label : 'Cycle Phase Assignments' ,
                               child : [executionObject]

                             };
      let cyclesObject = { key : 'cycle',
                           label : 'Clone Cycles',
                           child : [ { key : 'applyDateShift',
                                       label:'Apply 0 day offset to cycles too'
                                    },
                                     cyclePhaseObject
                          ]

                       };
      let testcaseRepository = { key : 'tcc',
                                 label : 'Clone Testcase Repository',
                                 child : [ { key : 'tcAtt',
                                             label:'Testcase Attachments'
                                          },
                                           cyclesObject
                                ]
                       };
      let requirementRepository = { key : 'requirement',
                                    label : 'Clone Requirement Repository',
                                    child : [{ key : 'reqTcMap',
                                               label : 'Requirment Testcase Mapping'
                                             },
                                             { key : 'reqAtt',
                                               label : 'Requirment Attachments'
                                             }
                                          ]
                            };
      let treeArray = [testcaseRepository,
                       requirementRepository
                      ];

      this.cloneTreeDom = jQuery('<div class="cloneFormTree">   </div>');
      this.buildingTreeCloneForm (treeArray , this.cloneTreeDom , 0);
      //if(this.cloneForm)
      //  console.log('First --> ' + this.cloneForm.value);
    }
    //This function initalisez the defualt values and classes of checkbox tree
     buildingTreeCloneForm (treeArray , dom , levelCounter) {
       let leftMarginValue = levelCounter ? '30px' : '0px';
       for (let i=0 ; i <treeArray.length ; i++) {
         let var1 = jQuery ('<div data-level="' +levelCounter + '" style="margin-left:' + leftMarginValue+'"  class="clearfix "> </div>'),
             var2 = jQuery ('<label for="'+treeArray[i].key+'">'+ treeArray[i].label+ '</label>'),
             var3 = jQuery ('<span class="zui-checkbox2"><input id="'+treeArray[i].key+'" type="checkbox"/><label for="'+treeArray[i].key+
                           '"></label></span>');

             var1.append(var3);
             var1.append(var2);
             dom.append(var1);

             if (treeArray[i].child) {
               let counter = levelCounter;
               this.buildingTreeCloneForm (treeArray[i].child , var1 , counter + 1);
             }
       }
     }

     //This function appends the checkbox tree
     ngAfterViewInit () {
       jQuery('.cloneTreeWrapper').append(this.cloneTreeDom);
       let divArray = jQuery( 'div.cloneTreeWrapper').find('div');
       for (let i=1;i <divArray.length ; i++) {
           if ( divArray[i].dataset.level == 0 || divArray[i].dataset.level == 1) {
               continue;
           } else {
                divArray[i].className = divArray[i].className  + ' disabled';
           }
         }
         //if(this.cloneForm)
//          console.log('Second --> ' + JSON.stringify(this.cloneForm.value));
     }

     //To update classes and values of checkbox tree and clone form, when clicked in UI
     cloneTreeClicked ($event) {
       let checkboxId;
       let checkboxValue;
       if ($event.target.localName === 'input') {
           checkboxId = $event.target.getAttribute('id');
           checkboxValue = jQuery($event.target).prop('checked');
       } else if ($event.target.localName === 'label') {
           checkboxId = $event.target.getAttribute('for');
           checkboxValue = jQuery($event.target).siblings().prop('checked');
       } else return -1;
       if (checkboxId) {
         (<FormControl>this.cloneForm.controls[checkboxId])
            .setValue(checkboxValue);
         if (checkboxValue) {
             jQuery($event.target).parents('div').eq(0).children('div').removeClass('disabled');
         } else {
           jQuery($event.target).parents('div').eq(0).find('div').addClass('disabled');
           let inputArray = jQuery($event.target).parents('div').eq(0).find('input');
           for (let i=1;i <inputArray.length ; i++) {
             let idInputElement = inputArray[i].getAttribute('id');
             inputArray[i].checked = false;
             (<FormControl>this.cloneForm.controls[idInputElement])
                .setValue(false);
           }
         }
       }
       return -1;
     }

     jobProgressRefreshClicked($event) {
       this.isShowForm = false;
       this.refreshReleases.emit($event);
     }

     cloneCompleted($event) {
       this.isShowForm = false;
       this.refreshReleases.emit($event);

     }

     ngOnDestroy() {
      this.unsubscribe();
    }

    setCloneFormDetails(selectedRelease) {
      if (selectedRelease) {
        this.cloneForm.controls['targetProjectId'].setValue(selectedRelease.projectId);
        this.onChnangeProjectSelect(selectedRelease.projectId);
        this.cloneForm.controls['oldReleaseId'].setValue(selectedRelease.id);
      }
    }

    //Resetting the clone form
    resetCLoneForm(idReleaseClicked) {
      this.cloneForm.reset();
      this.currentProject = JSON.parse(localStorage.getItem(`${window.tab}-currentProject`));

      //If particular release is to be cloned, sets the data according to that release
      if (idReleaseClicked) {
        (<FormControl>this.cloneForm.controls['targetProjectId'])
            .setValue(this.currentProject['id']); //fetching projectid from localstorage

        //filtering releases according to project selcted
        let projectId = this.currentProject['id'];
        this.filteredReleases = this.releases.filter((release) => {
                         return release.projectId == projectId;
                      });

        //Updating start date of selected release
         for (var i=0 ;i < this.filteredReleases.length ; i++) {
           if (this.filteredReleases[i].id == idReleaseClicked)
             this.dateReleaseSelected = this.filteredReleases[i].startDate;
         }
        (<FormControl>this.cloneForm.controls['releaseStartDate'])
          .setValue(this.dateReleaseSelected && moment(this.dateReleaseSelected).format(RELEASE_DATE_FORMAT));
        this.offset = 7;
        this.updateOffsetInformLabel();

        if (this.currentProject['endDate']) {
          if (((this.dateReleaseSelected + (7*24*60*60*1000)) <= this.currentProject['endDate']) &&
                  ((this.dateReleaseSelected + (7*24*60*60*1000)) >= this.currentProject['startDate'])) {
            this.releaseDateSelected = this.dateReleaseSelected && moment(this.dateReleaseSelected).add(7, 'days')._d;
          } else {
            this.releaseDateSelected = this.currentProject['startDate'] && moment(this.currentProject['startDate'])._d;
          }
        } else {
           this.releaseDateSelected = this.dateReleaseSelected && moment(this.dateReleaseSelected).add(7, 'days')._d;
        }
        //updating start date validation
        this.datesValidation.startDateMin = moment(this.currentProject['startDate'])._d;
        this.datesValidation.startDateMax = this.currentProject['endDate'] &&
                              moment(this.currentProject['endDate'])._d;

      } else { //If no release is selected, updates the form with default values
        this.cloneForm.controls['targetProjectId'].setValue('');

        (<FormControl>this.cloneForm.controls['releaseStartDate'])
          .setValue(undefined);

        this.releaseDateSelected = undefined;

        this.filteredReleases = [];

        //updating start date validation
        this.datesValidation.startDateMin = moment(this.currentProject['startDate'])._d;
        this.datesValidation.startDateMax = this.currentProject['endDate'] &&
                              moment(this.currentProject['endDate'])._d;

        this.offset = 0;
        this.updateOffsetInformLabel();
      }

      this.isShowForm = true;
      (<FormControl>this.cloneForm.controls['oldReleaseId'])
          .setValue(idReleaseClicked);
      (<FormControl>this.cloneForm.controls['defaultUserId'])
          .setValue(this.defaultSelectedResourceId);
      (<FormControl>this.cloneForm.controls['assignment'])
          .setValue(false);
      (<FormControl>this.cloneForm.controls['cycle'])
          .setValue(false);
      (<FormControl>this.cloneForm.controls['document'])
          .setValue(false);
      (<FormControl>this.cloneForm.controls['execution'])
          .setValue(false);
      (<FormControl>this.cloneForm.controls['executionAtt'])
          .setValue(false);
      (<FormControl>this.cloneForm.controls['executionComment'])
          .setValue(false);
      (<FormControl>this.cloneForm.controls['stepExecution'])
          .setValue(false);
      (<FormControl>this.cloneForm.controls['stepExecutionAtt'])
          .setValue(false);
      (<FormControl>this.cloneForm.controls['stepExecutionComment'])
          .setValue(false);
      (<FormControl>this.cloneForm.controls['defectMap'])
          .setValue(false);
      (<FormControl>this.cloneForm.controls['requirement'])
          .setValue(true);
      (<FormControl>this.cloneForm.controls['reqTcMap'])
          .setValue(false);
      (<FormControl>this.cloneForm.controls['tcc'])
          .setValue(true);
      (<FormControl>this.cloneForm.controls['tcAtt'])
          .setValue(false);
      (<FormControl>this.cloneForm.controls['applyDateShift'])
          .setValue(false);
      (<FormControl>this.cloneForm.controls['reqAtt'])
          .setValue(false);

      //updating ui of checkbox tree
      let dom = jQuery( 'div.cloneTreeWrapper');
      let divArray = dom.find('div');
      idReleaseClicked ? dom.addClass('currentProjectRelease') : dom.removeClass('currentProjectRelease');
      if (idReleaseClicked) {
          (<FormControl>this.cloneForm.controls['reqAtt'])
              .setValue(false);
          dom.addClass('currentProjectRelease');
          dom.find('div[data-level*=0]:nth-child(2) div[data-level*=1]:last-child label').attr('title' , 'By default attachment carry with requirement within same project');
          dom.find('div[data-level*=0]:nth-child(2) div[data-level*=1]:last-child label').removeAttr('for');
      } else {
          dom.removeClass('currentProjectRelease');
          dom.find('div[data-level*=0]:nth-child(2) div[data-level*=1]:last-child label').attr('for' , 'reqAtt');
          dom.find('div[data-level*=0]:nth-child(2) div[data-level*=1]:last-child label').removeAttr('title');
      }
      for (let i=1;i <divArray.length ; i++) {
          if ( divArray[i].dataset.level == 0 || divArray[i].dataset.level == 1) {
              divArray[i].className = divArray[i].className.replace(new RegExp('disabled', 'g'), '');
          } else {
               divArray[i].className = divArray[i].className  + ' disabled';
          }
        }

      jQuery('.cloneTreeWrapper input').prop('checked' , false);
      jQuery('.cloneTreeWrapper input#tcc').prop('checked' , true);
      jQuery('.cloneTreeWrapper input#requirement').prop('checked' , true);
      if(this.cloneForm) {
        //console.log(JSON.stringify(this.cloneForm.value));
        this._previousValue = _.cloneDeep(this.cloneForm.value);
        this._previousValue['releaseStartDate'] = moment(_.cloneDeep(this.releaseDateSelected)).format(RELEASE_DATE_FORMAT);
      }
    }

    cancelCloneForm () {
      let previousFormString = JSON.stringify(this._previousValue);
      let currentFormString = JSON.stringify(this.cloneForm.value);

//      console.log('previous --> ' + previousFormString);
  //    console.log('current --> ' + currentFormString);
      if(previousFormString !== currentFormString) {
        this.showDirtyCheckModal = true;
      } else {
        this.hideCloneForm();
      }
    }

    continueNavigation(event) {
      this.showDirtyCheckModal = false;
      setTimeout(() => {
        this.hideCloneForm();
        if(this.cdr) { this.cdr.markForCheck(); }
      }, 10);
    }

    dismissNavigation(event) {
      //jQuery('#zui-unsaved-changes-prompt').modal('hide');
      this.showDirtyCheckModal = false;
    }

    hideCloneForm() {
      this.isShowForm = false;
    }

    //This Function filters the release, on change of project.
    //Sets default value of release,start date and offset.
    onChnangeProjectSelect (projectId) {
      this.filteredReleases = this.releases.filter((release) => {
                       return release.projectId == projectId;
                    });
      (<FormControl>this.cloneForm.controls['oldReleaseId'])
          .setValue('');
      // (<FormControl>this.cloneForm.controls['releaseStartDate'])
      //     .setValue(undefined);
      //this.releaseDateSelected = undefined;
      //this.offset = 0;
      this.currentProject = JSON.parse(localStorage.getItem(`${window.tab}-currentProject`));
      let dom = jQuery( 'div.cloneTreeWrapper');
      if (projectId == this.currentProject['id']) {
          (<FormControl>this.cloneForm.controls['reqAtt'])
              .setValue(false);
          dom.addClass('currentProjectRelease');
          dom.find('div[data-level*=0]:nth-child(2) div[data-level*=1]:last-child label').attr('title' , 'By default attachment carry with requirement within same project');
          dom.find('div[data-level*=0]:nth-child(2) div[data-level*=1]:last-child label').removeAttr('for');
      } else {
          dom.removeClass('currentProjectRelease');
          dom.find('div[data-level*=0]:nth-child(2) div[data-level*=1]:last-child label').attr('for' , 'reqAtt');
          dom.find('div[data-level*=0]:nth-child(2) div[data-level*=1]:last-child label').removeAttr('title');
      }
    }

    //This function updates the startdate, depending on release selected and sets offset to 0
    onChangeReleaseSelect (releaseId) {
      //Updating start date of selected release
       for (var i=0 ;i < this.filteredReleases.length ; i++) {
         if (this.filteredReleases[i].id == releaseId)
           this.dateReleaseSelected = this.filteredReleases[i].startDate;
       }
      // (<FormControl>this.cloneForm.controls['releaseStartDate'])
      //     .setValue(this.dateReleaseSelected && moment(this.dateReleaseSelected)._d);
      if (this.currentProject['endDate']) {
        if ((this.dateReleaseSelected + (7*24*60*60*1000)) <= this.currentProject['endDate']) {
          this.releaseDateSelected = this.dateReleaseSelected && moment(this.dateReleaseSelected).add(7, 'days')._d;
        } else {
          this.releaseDateSelected = this.currentProject['endDate'] && moment(this.currentProject['endDate'])._d;
        }
      } else {
         this.releaseDateSelected = this.dateReleaseSelected && moment(this.dateReleaseSelected).add(7, 'days')._d;
      }
      this._previousValue['releaseStartDate'] = moment(_.cloneDeep(this.releaseDateSelected)).format(RELEASE_DATE_FORMAT);
    }

    //This function updates the offset, on change of startdate
    onChangeStartDate ($event) {
      this.offset = this.dateDiffInDays (new Date(this.dateReleaseSelected) ,new Date(this.cloneForm.value.releaseStartDate));
      this.updateOffsetInformLabel();
    }

    //This fucntion calculates the days differnce
    dateDiffInDays (a, b) {
      let _MS_PER_DAY = 1000 * 60 * 60 * 24;
      // Discard the time and time-zone information.
      let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      let utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    //This function filters the project according to the user
    filterProjects() {
      let projects = this.zephyrStore.getState().projects.projects || [];

      if (!(this.zephyrStore.getState().loggedInUser.roles && this.zephyrStore.getState().loggedInUser.roles[0] &&
                this.zephyrStore.getState().loggedInUser.roles[0].id == MANAGER_ROLE_ID)) {
        let allocatedProjIds = this.zephyrStore.getState().projects.userAllocatedProjects;
        if(allocatedProjIds) {
            projects = projects.filter(project => allocatedProjIds.indexOf(project.id) > -1);
        }
      }
      this.projects = projects;
    }

    updateOffsetInformLabel() {
      let dom = jQuery( 'div.cloneTreeWrapper');
      dom.find('label[for=applyDateShift]').eq(1).text('Apply ' + this.offset + ' day offset to cycles to');
    }
    isFormInValid(form) {
      // No need for dirty check on Save button.
      return !form.valid;
    }
  }
