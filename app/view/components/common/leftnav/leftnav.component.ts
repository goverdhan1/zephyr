import {Component, Input, Output, EventEmitter, OnInit, ElementRef, Inject, OnDestroy, OnChanges, AfterViewInit, AfterContentChecked, ChangeDetectorRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {PROJECT_SETUP_APPLICATION_ID , RESOURCE_MANAGEMENT_APPLICATION_ID} from '../../admin/customizations/customizations.constant';

import {ProjectAction} from '../../../../actions/project.action';
import {GlobalAction} from '../../../../actions/global.action';

declare var location: any, jQuery: any, _: any, window: any;

const SYSTEM_TYPE_4 = 4;
const SYSTEM_TYPE_1 = 1;

@Component({
	selector: 'left-nav',
	templateUrl: 'leftnav.html',
	viewProviders: [ProjectAction, GlobalAction]
})
export class LeftNavComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, AfterContentChecked {
	@Input() columns;
    @Input() activeItemKey;
    @Input() groupItemKey;
    @Input() hideSubHeader;
    @Output() onHeaderLinkClick: EventEmitter<any> = new EventEmitter();
    @Output() onItemClick: EventEmitter<any> = new EventEmitter();
    @Output() onNavigateByURL: EventEmitter<any> = new EventEmitter();
    id: string;
    sidebar;
    selectedEntity = {};
    selectedNestedEntity = {};
    elementRef: ElementRef;
    zephyrStore;
    unsubscribe;
    projectId = 0;
    navToggle;
    leftnavDocked = false;
    private isSelect = false;
    private doDirtyCheck = true;
    constructor(@Inject(ElementRef) elementRef: ElementRef, public router: Router, private _projectAction: ProjectAction, private globalAction: GlobalAction, private cdr: ChangeDetectorRef) {

	  this.elementRef = elementRef;

      this.zephyrStore = ZephyrStore.getZephyrStore();
      this.unsubscribe = this.zephyrStore.subscribe(() => {
		  if (this.columns && this.columns.header && this.columns.header.title && 'Administration' !== this.columns.header.title) {
			  let project = (this.columns.header.link || '').split('/');
			  let projectId = Number(project[project.length - 1]);
			  if (!isNaN(projectId) && projectId && projectId !== this.projectId) {
			  	this.projectId = projectId;
				this.zephyrStore.dispatch(this.globalAction.updateCustomFieldProject(projectId));
			  }
		  }
        if (this.columns && this.columns.group) {
          let isDtIntegrated = this.checkDTIntegration();
          let dtGroup = _.find(this.columns.group, {key: 'defect-tracking'});
          if(dtGroup) {
            dtGroup.isActive = isDtIntegrated;
          }
          let dtAdminGroup = _.find(this.columns.group, {key: 'defects-admin'});
          if(dtAdminGroup) {
            dtAdminGroup.isActive = isDtIntegrated;
          }
			let automationGroup = _.find(this.columns.group, {key: 'zautomation'});
			let autoLicense = this.zephyrStore.getState().license.automation;
          // let state = this.zephyrStore.getState().license;
          // if(automationGroup) {
          //   automationGroup.permission = automationGroup.permission ? automationGroup.permission : false;
          // }

          if(automationGroup && autoLicense.length>0) {
            if(autoLicense === 'VALID' && automationGroup ) {
              automationGroup.permission = true;
              automationGroup.isActive = true;
            } else if(autoLicense === 'INVALID' && automationGroup){
              automationGroup.permission = true;
              automationGroup.isActive = false;
            } else{
              automationGroup.permission = false;
              automationGroup.isActive = false;
          }
          }

          if(this.columns.subHeader && !this.columns.subHeader.id ){
            if(this.columns.subHeader.lastVisitedItems.length > 0){
              this.columns.subHeader.id = 1;
              this.columns.subHeader.name = this.columns.subHeader.lastVisitedItems[0].text;
              this.columns.subHeader.title = this.columns.subHeader.lastVisitedItems[0].text;
            }

            // }
          }

        }
      });
      if(jQuery('body').hasClass('collapse-nav')) {
        this.navToggle = 'fa-chevron-right';
        this.leftnavDocked = false;
      } else {
        this.navToggle = 'fa-chevron-left';
        this.leftnavDocked = true;
      }

      setTimeout(() => {
        jQuery('.sidr').on('click.dropdownleftnav', function(e) {
          if (!jQuery(e.target).hasClass('dropdown-toggle') && jQuery(e.target).parents('.dropdown').length === 0) {
            jQuery('#project-release-dropdown').removeClass('open');
          }
        });
      });
    }

	ngAfterContentChecked() {
		jQuery('#release-dropdown').parent().off('hidden.bs.dropdown').on('hidden.bs.dropdown', ev => {

			setTimeout(() => {
				if (this.isSelect && !ev.relatedTarget.parentNode.classList.contains('open')) {
					jQuery(ev.relatedTarget).dropdown('toggle');
	        		setTimeout(() => {
	          			jQuery('.select2-search__field').focus();
	        		});
				}
			}, 10);
		});
	}
	ngAfterViewInit() {
		jQuery('#custom-backdrop').off('click.release').on('click.release', ev => {
		  jQuery('#project-release-dropdown').removeClass('open');
		  jQuery(ev.target).removeClass('backdrop-show');
		});
	}
    ngOnDestroy() {
      this.unsubscribe();
      jQuery('.sidr.left').off('click.dropdownleftnav');
    }

    ngOnChanges(changes) {
      if(changes){
          if (this.columns && this.columns.group) {
            let isDtIntegrated = this.checkDTIntegration();
            let dtGroup = _.find(this.columns.group, {key: 'defect-tracking'});
            if(dtGroup) {
              dtGroup.isActive = isDtIntegrated;
            }
            let dtAdminGroup = _.find(this.columns.group, {key: 'defects-admin'});
            if(dtAdminGroup) {
              dtAdminGroup.isActive = isDtIntegrated;
            }
            let automationGroup = _.find(this.columns.group, {key: 'zautomation'});
            let autoLicense = this.zephyrStore.getState().license.automation;

            if(automationGroup && autoLicense.length > 0) {
              if (autoLicense === 'VALID' && automationGroup) {
                automationGroup.permission = true;
                automationGroup.isActive = true;
              } else if (autoLicense === 'INVALID' && automationGroup) {
                automationGroup.permission = true;
                automationGroup.isActive = false;
              } else {
                automationGroup.permission = false;
                automationGroup.isActive = false;
              }
            }
          }
      }


    }

    dropdownToggle() {
      jQuery('#custom-backdrop').toggleClass('backdrop-show');
    }

    ngOnInit() {
      jQuery('#responsive-menu-button').sidr();
    }
	onNavToggle() {
		jQuery('body').toggleClass('collapse-nav');
		jQuery('.leftnav-list').removeClass('expanded-on-hover');
		this.leftnavDocked = !this.leftnavDocked;
		if (jQuery('body').hasClass('collapse-nav')) {
		  jQuery('.sidr > ul li ul').slideUp();
		  this.navToggle = 'fa-chevron-right';
		} else {
		  jQuery('.sidr > ul li ul').slideDown();
		  this.navToggle = 'fa-chevron-left';
		}
		this.cdr.markForCheck();
	}

    // onHoverLeftnav(){
    //   if(!this.leftnavDocked)
    //     jQuery('left-nav').addClass('expanded-on-hover');
    // }

    // onHoverOutLeftnav(){
    //   jQuery('left-nav').removeClass('expanded-on-hover');
    // }
    navigateBasedOnDataType(entity) {
      this.onNavigateByURL.emit({
        link: entity.link
      });
    }

    navigateToURL(entity, parent) {
		if (this.promptForSave()) {
			return;
		}
      	if(parent == undefined) {
        	this.selectedEntity = entity;
        	this.selectedNestedEntity = {};
      	} else {
        	this.selectedEntity = parent;
        	this.selectedNestedEntity = entity;
      	}
      	if (!entity.link) {
			return;
		}

      	this.navigateBasedOnDataType(entity);
      	this.activeItemKey = entity.key;
    }
    _onHeaderLinkClick(ev) {
		if (this.promptForSave()) {
			return;
		}
      	this.onHeaderLinkClick.emit(ev);
      	setTimeout(() => {
        	this.zephyrStore.dispatch(this._projectAction.updateProjectReleaseGrid());
      	}, 100);
    }
    goToItem(ev) {
		if (this.promptForSave()) {
			return;
		}
      	this.onItemClick.emit(ev);
    }
	onToggle(ev) {
		this.isSelect = 'open' === ev.type;
	}
    isNavItemDisabled(navItem) {
      return !navItem.isActive;
    }

    checkDTIntegration() {
        let defectsystem = this.zephyrStore.getState().global.defectSystem;
        if(defectsystem && defectsystem['systemType'] == SYSTEM_TYPE_4) {
          return true;
        }
        return false;
    }
	checkForDirty(ev) {
		if (this.promptForSave()) {
			return;
		}
		if (this.columns && this.columns.subHeader) {
			let subHeader = this.columns.subHeader;
			this.router.navigate([`/${subHeader.link || ''}`, subHeader.id || '']);
		}
	}
	promptForSave() {
        let isDirty = this.zephyrStore.getState().global.isDirty;
        if (this.doDirtyCheck && isDirty && !confirm('There is unsaved data in the testcase. Are you sure you want to continue?')) {
            return true;
        }
        this.zephyrStore.dispatch(this.globalAction.clearDirtyCheck());
        return false;

    }
}
