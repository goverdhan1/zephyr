import {Component  , OnDestroy , Output , EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {ProjectAction} from '../../../../actions/project.action';
import {DefectsAction} from '../../../../actions/defects.action';
import { ADMIN_PREFERENCES} from '../../admin/admin.constant';
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';
import {LEAD_ROLE_ID , TESTER_ROLE_ID} from '../../admin/customizations/customizations.constant';

declare var jQuery: any, _;
declare var moment: any;

const ISOLATIONLEVEL_VALUE = 0;
const SYSTEM_TYPE_4 = 4;
const ANYONE_USER_ID = -10;
const HIDE_PROJECT_FORM = 'HIDE_PROJECT_FORM';

@Component({
  selector: 'project-form',
  viewProviders: [ProjectAction, DefectsAction],
  templateUrl: 'project_form.html'
})

export class ProjectFormComponent implements OnDestroy {
    @Output() confirmationDialogueData: EventEmitter<any> = new EventEmitter();
    zephyrStore;
    projectForm : FormGroup;
    adminPrefProjectType = [];
    unsubscribe;
    isolationLevelValue; //text to deiplay project type
    isolationLevelId; //project type id
    i18nMessages;
    isShowForm : boolean; //to control display of project-form
    isAdd : boolean; //boolean to differentiate between add form or edit form
    defectSystem; //containes information about the defect system
    defectProjects = []; //List of defects projects
    isDefectOn : boolean; //boolean to check if linked to jira or not
    projectDataobject = { //object to contain dates data for datePicker integration
      startDate : undefined,
      endDate : undefined,
      minDateValidation : undefined,
      maxDateValidation: undefined,
      isDatesValidated : true,
    };
    isApiFiredDefectProjects: boolean;//variable to make API call for defects-projects once
    users; //gloabl variable to contain all the users lits
    leadUsers;//array containg users only with lead role
    selectedLead;//variable to bind selected/current lead of a project
    allocatedResources = [];//variable to bind allocated resources to project
    newAllocatedResources;//Variable to get changed allocated resources
    prevSelectedLead;// initial lead of the project
    globalList;//filtered list of the users to be passed as global list to unselected-selected-list component
    projectDataOBject = {};//stores the data passed to it
    initialFormValues;
    isFormDirty = false;
    allProj = [];
    constructor( fb: FormBuilder, private _projectAction: ProjectAction,private _defectAction: DefectsAction) {
        this.zephyrStore = ZephyrStore.getZephyrStore();
        //Initializing with constant values and with data already stored in store
        this.i18nMessages = I18N_MESSAGES;
        this.isShowForm = false;
        this.isAdd = false;
        this.isApiFiredDefectProjects = false;
        this.isFormDirty = false;
        let state = this.zephyrStore.getState();
        this.defectProjects = state.linkNewDefect.jiraProjects || [];
        this.defectSystem = state.global.defectSystem || {};
        this.selectedLead = '';
        this.initialFormValues = undefined;
        this.isDefectOn = this.defectSystem['systemType'] == SYSTEM_TYPE_4;
        if (state.adminPref[ADMIN_PREFERENCES.PROJECT_TYPE_LOV]) {
          this.adminPrefProjectType = JSON.parse(state.adminPref[ADMIN_PREFERENCES.PROJECT_TYPE_LOV]);
        }
        this.users = state.resourceManagement.users.length > 0 ? state.resourceManagement.users : state.global.users;
        let leadUsers = [];
        let users = this.users;
        this.users.forEach((user, index) => {
          user.name = user.firstName + ' ' + user.lastName;
          //removing anyone user from the resources list
          if (user.id == ANYONE_USER_ID) {
            users.splice(index,1);
            index--;
          }
          if (user.roles[0] && user.roles[0].id == LEAD_ROLE_ID && user.accountEnabled) {
            leadUsers.push(user);
          }
        });
        this.users = users;
        this.leadUsers = leadUsers;

        this.leadUsers.sort((o1, o2) => naturalSorter(o1.name.toLocaleLowerCase(), o2.name.toLocaleLowerCase()));

        this.globalList = this.getGlobalUsers(this.users);
        //Initializing and resetting form to default values
        this.projectForm = fb.group({
          name: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.{2,100}$)(?!^[\\s]+)(?=.*[\\s]*$)(?=.*[\\S]+).*$')])],
          startDate : [undefined,Validators.required],
          id:[0],
          description : ['',Validators.pattern('^(.|[\n\r]){0,255}$')],
          endDate : [undefined],
          isolationLevel : [ISOLATIONLEVEL_VALUE],
          dashboardSecured : [false],
          dashboardUrl : ['', Validators.compose([Validators.required, Validators.pattern('^.{4,125}$')])],
          dashboardRestricted : [false],
          externalSystem : ['']
         });
        //For default setting of project type
        this.projectTypeChanged(ISOLATIONLEVEL_VALUE);

        //Making API call to fetch jira projects only when it is linked to it
        if (this.isDefectOn && !this.isApiFiredDefectProjects) {
          //Making API call to fetch all jira projects
          this.isApiFiredDefectProjects = true;
          this.zephyrStore.dispatch(this._defectAction.getJIRAProjects({useAdmin: true}));
        }

        this.projectForm.valueChanges.subscribe(data => {
            this.isFormDirty = this.ifFormDirty();
        });

        this.unsubscribe = this.zephyrStore.subscribe(() => {
            let state = this.zephyrStore.getState();
            this.allProj = state.projects.projects;
            this.defectProjects = state.linkNewDefect.jiraProjects || [];
            this.defectSystem = state.global.defectSystem || {};
            this.users = state.resourceManagement.users.length > 0 ?
                      state.resourceManagement.users : state.global.users;
            let leadUsers = [];
            let users = this.users;
            this.users.forEach((user, index) => {
              //removing anyone user from the resources list
              if (user.id == ANYONE_USER_ID) {
                users.splice(index,1);
                index--;
              }
              user.name = user.firstName + ' ' + user.lastName;
              if (user.roles[0] && user.roles[0].id == LEAD_ROLE_ID && user.accountEnabled) {
                leadUsers.push(user);
              }
            });
            this.users = users;
            this.leadUsers = leadUsers;

            this.leadUsers.sort((o1, o2) => naturalSorter(o1.name.toLocaleLowerCase(), o2.name.toLocaleLowerCase()));

            // this.leadUsers = _.sortBy(this.leadUsers, (res) => res.name.toLocaleUpperCase());

            this.globalList = this.getGlobalUsers(this.users);
            this.isDefectOn = this.defectSystem['systemType'] == SYSTEM_TYPE_4;
            this.adminPrefProjectType = state.adminPref[ADMIN_PREFERENCES.PROJECT_TYPE_LOV] && JSON.parse(state.adminPref[ADMIN_PREFERENCES.PROJECT_TYPE_LOV]);
            //For default setting of project type
            this.projectTypeChanged(ISOLATIONLEVEL_VALUE);

            //Making API call to fetch jira projects only when it is linked to it
            if (this.isDefectOn && !this.isApiFiredDefectProjects) {
              //Making API call to fetch all jira projects
              this.isApiFiredDefectProjects = true;
              this.zephyrStore.dispatch(this._defectAction.getJIRAProjects({useAdmin: true}));
            }
        });
    }
    getGlobalUsers(users) {
        // Filtering by enabled users
        let _users =  users.filter(user => user.accountEnabled);
        // Sorting allocated resources by name
        // _users = _.orderBy(_users, [obj => obj.fullName.toLowerCase()]);

        _users.sort((o1, o2) => naturalSorter(o1.fullName.toLocaleLowerCase(), o2.fullName.toLocaleLowerCase()));
        return _users;
    }

    //Function called when form is submitted
    onProjectFormSubmit(formValues) {
      if(formValues.startDate) {
        formValues['projectStartDate'] = formValues.startDate;
      }
      if(formValues.endDate) {
        formValues['projectEndDate'] = formValues.endDate;
      }
      Object.keys(formValues).forEach(key => {
          var val = formValues[key];
          if (key === 'startDate' || key === 'endDate') {
            if (!val) {
              delete formValues[key];
              return;
            }
            let date = new Date(val);
            val = date.getTime();
            formValues[key] = val;
          } else if (key === 'id' && this.isAdd) {
            formValues[key] = 0;
          }
      });
      if(this.projectDataOBject['members']) {
        this.projectDataOBject['members'] = this.projectDataOBject['members'].filter(member => {
            if (member.role && member.role.id == LEAD_ROLE_ID) {
                return false;
            }
            return true;
          });
          if (this.selectedLead != '') {
            this.projectDataOBject['members'] = this.projectDataOBject['members'].filter(member=> {
              if (member.userId && member.userId == this.selectedLead) {
                return false;
              }
              return true;
            });
          }
        }
        //code for editting members key of the form
        let members = [];
        //check, process only if resource list id edited
        if (this.newAllocatedResources) {
          let allUsers = this.users;
          let allocatedResources = this.allocatedResources || [];
          this.newAllocatedResources.forEach(resource=> {
              let matchFound = false;
              allocatedResources.forEach(resource2=> {
                //If match is found, then push the same object and check for role-object.
                //INFO:if role id is '2', then assign role id as '3'
                if(resource2.userId == resource.id) {
                  matchFound = true;
                  if (resource2.role.id == LEAD_ROLE_ID) {
                    resource2.role = {id:TESTER_ROLE_ID};
                  }
                  members.push(resource2);
                  //return -1;
                }
              });
              //INFO:If mmatch is not found, create an object with id '0' and assign role.
              //INFO:If role of that user is lead, role object is manipulated and role-id is changed to '3'
              if (!matchFound) {
                  let projectTeamObject = {
                    userId : resource.id,
                    id : 0
                  };
                  let roleObject;
                  allUsers.forEach(user=> {
                    if (user.id == resource.id) {
                      if (user.roles[0] && user.roles[0].id == LEAD_ROLE_ID) {
                        roleObject = {id:TESTER_ROLE_ID};
                      } else {
                        roleObject = user.roles[0];
                      }
                    }
                  });
                  projectTeamObject['role'] = roleObject;
                  members.push(projectTeamObject);
              }
          });
        }
        //Check, process only if lead is assigned
        if (this.selectedLead != '') {
          let allUsers = this.users;
          let selectedLead = this.selectedLead;
          let projectTeamObject = {
            userId : this.selectedLead,
            id : 0
          };
          let roleObject;
          allUsers.forEach(user=> {
            if (user.id == selectedLead) {
              roleObject = user.roles[0];
            }
          });
          projectTeamObject['role'] = roleObject;
          members.push(projectTeamObject);
        }
        //INFO:If any of the resource or lead is changed, then only send memebers key
        //If nothing is changed, passing members as null
        if (!this.newAllocatedResources && this.prevSelectedLead == this.selectedLead) {
          members = null;
        } else if (this.prevSelectedLead != this.selectedLead && !this.newAllocatedResources && this.projectDataOBject['members']) {
         members = members.concat(this.projectDataOBject['members']);
        }
        formValues['members'] = members;
        formValues['status'] = 2;

        let state = this.zephyrStore.getState();
        if (this.isAdd) {
          this.zephyrStore.dispatch(this._projectAction.addNewProject(formValues, state.loggedInUser.id));
        } else {
          this.zephyrStore.dispatch(this._projectAction.editProject(formValues, state.loggedInUser.id));
        }
       this.isShowForm = false;
       this.initialFormValues = undefined;
    }

    //Function called when project type is changed.
    //Updates the view and controller with the new value
    projectTypeChanged(id) {
     let projectTypeValue = '';
     let projectIsolationLevelValue  = id;
     if (this.adminPrefProjectType) {
       this.adminPrefProjectType.forEach(object => {
            if (object.id == projectIsolationLevelValue) {
                projectTypeValue = object.value;
            }
        });
      }
      this.isolationLevelValue = projectTypeValue;
      this.projectForm.patchValue({isolationLevel: id});
      this.isolationLevelId = id;
    }

    //Function called when component is destroyed
    ngOnDestroy() {
      this.unsubscribe();
    }

    //Function to set dashboard URL of the project
    projectNamechange(projectName) {
      let url = projectName.trim().replace(/ /g, '-').toLowerCase() + '-dashboard';
      let id = (<FormControl>this.projectForm.controls['id']).value;
      let isDuplicate = this.checkDuplicateUrl(url, id);
      if(isDuplicate) {
          url = url + '-' + Math.floor(Math.random() * 10000);
      }
      url = url.substr(0, 125);
      (<FormControl>this.projectForm.controls['dashboardUrl']).setValue(url);
      this.checkDuplicateProjectName(projectName);
    }
    checkDuplicateProjectName(projectName) {
        if (-1 === this.allProj.map(item => (item.name || '').toLowerCase()).indexOf((projectName || '').trim().toLowerCase())) {
            return;
        }
        this.projectForm.controls['name'].setErrors({unique:true});
    }

    checkDuplicateUrl(url, id) {
        let isDuplicate = false;
        let state = this.zephyrStore.getState();
        let projectSetupGrid = state.projectSetup.projectSetupGrid;
        projectSetupGrid.rows.forEach(dataObject => {
            if(dataObject.id != id && (dataObject.dashboardUrl || '').toLowerCase() === url ) {
                isDuplicate = true;
            }
        });
        return isDuplicate;
    }

    //This function is called clicked on ADD button
    //It resets form and intializes form to default values in view and controller.
    resetForm () {
      this.selectedLead = '';
      this.prevSelectedLead = '';
      this.newAllocatedResources = undefined;
      this.allocatedResources = [];
      this.projectDataOBject = {};
      this.users = this.users || [];
      this.globalList = this.getGlobalUsers(this.users);
      this.initialFormValues = {
        id:0,
        name:'',
        description:'',
        dashboardSecured:false,
        dashboardRestricted :false,
        externalSystem : '',
        isolationLevel:ISOLATIONLEVEL_VALUE,
        dashboardUrl:'',
        startDate: undefined,
        endDate : undefined
      };
      //this.projectForm.reset();
      this.projectForm.patchValue({
        id:0,
        name:'',
        description:'',
        dashboardSecured:false,
        dashboardRestricted :false,
        externalSystem : '',
        isolationLevel:ISOLATIONLEVEL_VALUE,
        dashboardUrl:'',
        startDate: undefined,
        endDate : undefined
       });
      //For default setting of project type
      this.projectTypeChanged(ISOLATIONLEVEL_VALUE);
      this.projectDataobject['startDate'] = undefined;
      this.projectDataobject['endDate'] = undefined;
      this.projectDataobject['minDateValidation'] = undefined;
      this.projectDataobject['maxDateValidation'] = undefined;
      this.projectDataobject['isDatesValidated'] = true;
    }

    //This function is called on change of start date and updates the validation for end date
    onChangeStartDate ($event) {
      this.projectDataobject['minDateValidation']  = moment(moment(this.projectForm.value.startDate,'MM/DD/YYYY').unix() *1000)._d;
      if (this.projectForm.value.endDate &&
          new Date(this.projectForm.value.endDate).getTime() < new Date(this.projectForm.value.startDate).getTime()) {
        this.projectDataobject['isDatesValidated'] = false;
      } else {
        this.projectDataobject['isDatesValidated'] = true;
      }
    }

    //This function is called on change of end date and updates the validation for start date
    onChangeEndDate($event) {
      this.projectDataobject['maxDateValidation']  = moment(moment(this.projectForm.value.endDate,'MM/DD/YYYY').unix() *1000)._d;
      if (this.projectForm.value.endDate &&
          new Date(this.projectForm.value.endDate).getTime() < new Date(this.projectForm.value.startDate).getTime()) {
        this.projectDataobject['isDatesValidated'] = false;
      } else {
        this.projectDataobject['isDatesValidated'] = true;
      }
    }

    //This function is called when any grid row is clicked
    //Restets and pre-fills the form, date-object, project type information
    updateForm(projectDataOBject) {
      this.selectedLead = '';
      this.prevSelectedLead = '';
      this.newAllocatedResources = undefined;
      this.projectDataOBject = projectDataOBject;
      this.globalList = this.getGlobalUsers(this.users);

      this.initialFormValues = JSON.parse(JSON.stringify(projectDataOBject));
      //this.projectForm.reset();
      projectDataOBject = JSON.parse(JSON.stringify(projectDataOBject));
      this.projectForm.patchValue({
         name:projectDataOBject.name,
         //startDate :moment(projectDataOBject.startDate)._d,
         id:projectDataOBject.id,
         description : projectDataOBject.description,
         //endDate : projectDataOBject.endDate && moment(projectDataOBject.endDate)._d,
         isolationLevel : projectDataOBject.isolationLevel,
         dashboardSecured : projectDataOBject.dashboardSecured,
         dashboardUrl : projectDataOBject.dashboardUrl,
         dashboardRestricted : projectDataOBject.dashboardRestricted,
         externalSystem : projectDataOBject.externalSystem || ''
       });
      //TODO : for same value, date picker shows date in different format
      if (!projectDataOBject.endDate) {
        this.projectForm.patchValue({
          endDate:undefined
        });
      }
      this.projectDataobject['startDate'] = moment(projectDataOBject.startDate)._d;
      this.projectDataobject['endDate'] = projectDataOBject.endDate && moment(projectDataOBject.endDate)._d;
      this.projectTypeChanged(projectDataOBject.isolationLevel);
      this.allocatedResources = [];
      projectDataOBject.members.forEach(member => {
        if (member.role && member.role.id == LEAD_ROLE_ID) {
          this.selectedLead = member.userId;
          this.prevSelectedLead = member.userId;
          //function called to remove lead from global-list.
          this.onChangeLead(member.userId, false);
        } else {
          this.users.forEach(user => {
            if (user.id === member.userId) {
               this.allocatedResources.push({id : member.userId, name : user.name});
            }
          });

          // // Sorting allocated resources by name
          // this.allocatedResources = _.orderBy(this.allocatedResources, [obj => obj.name.toLowerCase()]);

          this.allocatedResources.sort((o1, o2) => naturalSorter(o1.name, o2.name));
        }
      });
    }

    //This function hides the form
    hideForm() {
      this.isShowForm = false;
      this.initialFormValues = undefined;
    }

    //This function is called, when resources are edited
    selectedResources(resources) {
      this.newAllocatedResources = resources.selectedList || [];
      this.isFormDirty = true;
    }

    //This function is called when lead is changed.
    //This function removes the selected lead from global-list, newAllocatedResources-list, allocatedResources-list
    onChangeLead(newLead , isMarkFormDirty) {
      //filtering global-list

      let globallist = JSON.parse(JSON.stringify(this.users)) || [];
      globallist.forEach((object, index) => {
        if (object.id == newLead) {
          globallist.splice(index ,1);
          //return -1;
        }
      });
      this.globalList = this.getGlobalUsers(globallist);
      //filtering newAllocatedResources
      if (this.newAllocatedResources) {
        let newAllocatedResources = this.newAllocatedResources;
        newAllocatedResources.forEach((object, index) => {
          if (object.id == newLead) {
            newAllocatedResources.splice(index ,1);
            //return -1;
          }
        });
        this.newAllocatedResources = newAllocatedResources;
      }
       //filtering allocatedResources
      let allocatedResources = this.allocatedResources;
      allocatedResources.forEach((object, index) => {
          if (object.id == newLead) {
            allocatedResources.splice(index ,1);
            //return -1;
          }
        });
      this.allocatedResources = allocatedResources;

      this.allocatedResources.sort((o1, o2) => naturalSorter(o1.name.toLocaleLowerCase(), o2.name.toLocaleLowerCase()));
      //filtering array of initial allocated resources
      // let allocatedResourcesArray = this.projectDataOBject.members || [];
      // allocatedResourcesArray.forEach((object, index) => {
      //     if (object.userId == newLead) {
      //       allocatedResourcesArray.splice(index ,1);
      //       //return -1;
      //     }
      //   });
      // this.projectDataOBject.members = allocatedResourcesArray;
      this.isFormDirty = this.isFormDirty || isMarkFormDirty;
    }

    ifFormDirty() {
      let isFormDirty = false;
      if (this.initialFormValues) {
        for (let property in this.projectForm.value) {
            if (this.projectForm.value.hasOwnProperty(property)) {
                if (property == 'startDate' || property == 'endDate' || property == 'externalSystem') {
                  let date = new Date(this.projectForm.value[property]);
                  let val = property == 'externalSystem' ? this.projectForm.value[property] : date.getTime();
                  if (!(this.initialFormValues[property] || this.projectForm.value[property]) || this.initialFormValues[property] == val) {
                    continue;
                  } else {
                    isFormDirty = true;
                    break;
                  }
                } else {
                  if (this.initialFormValues[property] == this.projectForm.value[property]) {
                    continue;
                  } else {
                    isFormDirty = true;
                    break;
                  }
                }
            }
        }
        isFormDirty = isFormDirty || this.newAllocatedResources || !(this.prevSelectedLead == this.selectedLead);
      }
      return isFormDirty;
    }

    cancelFormConfirmation() {
      if (this.isFormDirty) {
        let confirmationObject : any = {};
        confirmationObject['heading'] = 'Unsaved changes';
        confirmationObject['text'] = 'You have some unsaved changes. Are you sure you want to continue?';
        confirmationObject['buttonText'] = 'Continue';
        confirmationObject['showCancelButton'] = true;
        confirmationObject['cancelButtonText'] = 'cancel';
        confirmationObject['action'] = HIDE_PROJECT_FORM;
        this.confirmationDialogueData.emit(confirmationObject);
      } else {
        this.hideForm();
      }
    }
  }

function naturalSorter(as, bs){
  var a, b, a1, b1, i= 0, n, L,
    rx=/(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;
  if(as=== bs) return 0;
  a= as.toLowerCase().match(rx);
  b= bs.toLowerCase().match(rx);
  L= a.length;
  while(i<L){
    if(!b[i]) return 1;
    a1= a[i];
      b1= b[i++];
    if(a1!== b1){
      n= a1-b1;
      if(!isNaN(n)) return n;
      return a1>b1? 1:-1;
    }
  }
  return b[i]? -1:0;
}
