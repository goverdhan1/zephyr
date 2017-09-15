"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var zephyr_store_1 = require('../../../store/zephyr.store');
var aq_action_1 = require('../../../actions/aq.action');
var release_action_1 = require('../../../actions/release.action');
var global_action_1 = require('../../../actions/global.action');
var project_leftnav_data_1 = require('../projects/project_leftnav.data');
var testcase_action_1 = require('../../../actions/testcase.action');
var notification_store_1 = require('../../../store/notification.store');
var AutomationQualityComponent = (function () {
    function AutomationQualityComponent(router, _automationQualityAction, _adminAction, cdr, injector, _testcaseAction, _notificationAction, _releaseAction, route, globalAction) {
        var _this = this;
        this.router = router;
        this._automationQualityAction = _automationQualityAction;
        this._adminAction = _adminAction;
        this.cdr = cdr;
        this.injector = injector;
        this._testcaseAction = _testcaseAction;
        this._notificationAction = _notificationAction;
        this._releaseAction = _releaseAction;
        this.route = route;
        this.globalAction = globalAction;
        this.inRelease = true;
        this.navColumns = project_leftnav_data_1.ZEE_NAV_COLUMNS;
        this._zephyrStore = zephyr_store_1.default.getZephyrStore();
        this._notificationStore = notification_store_1.default.getNotificationStore();
        this.unsubscribe = this._zephyrStore.subscribe(function () {
            var state = _this._zephyrStore.getState();
            _this.setLeftNavData(state);
            _this.releases = state.release.releases;
            _this.setReleasesDropdown(_this.releases);
        });
    }
    AutomationQualityComponent.prototype.ngAfterViewInit = function () {
        $('[title="Automation Quality"]').addClass("selected");
    };
    AutomationQualityComponent.prototype.ngOnInit = function () {
    };
    AutomationQualityComponent.prototype.ngOnDestroy = function () {
        $('[title="Automation Quality"]').removeClass("selected");
    };
    //*****Left Nav
    AutomationQualityComponent.prototype.setLeftNavData = function (state) {
        if (state.project.id) {
            this.navColumns.header.title = state.project.name;
            this.navColumns.header.subtitle = state.project.description;
            this.navColumns.header.link = "/project/" + state.project.id;
            this.navColumns.header.isSelected = false;
            _.filter(this.navColumns.group.items, function (item) {
                if (item.key == 'automation-quality') {
                    item.isActive = true;
                }
                else {
                    item.isActive = false;
                }
            });
        }
    };
    AutomationQualityComponent.prototype.navigateToProject = function (ev) {
        if (this.navColumns.header.link.length) {
            this.router.navigateByUrl(this.navColumns.header.link);
        }
    };
    AutomationQualityComponent.prototype.setReleasesDropdown = function (releases) {
        if (releases && releases.length) {
            this.releases = releases.map(function (obj) {
                return { id: obj.id, text: obj.name };
            });
            this.navColumns.releases = this.releases;
        }
    };
    AutomationQualityComponent.prototype.toggleInReleaseRequirements = function (ev) {
        this.inRelease = !this.inRelease;
    };
    AutomationQualityComponent = __decorate([
        core_1.Component({
            selector: 'zee-automation-quality',
            templateUrl: './view/components/automation-quality/aq.html',
            viewProviders: [aq_action_1.default, release_action_1.default, testcase_action_1.default, global_action_1.default],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], AutomationQualityComponent);
    return AutomationQualityComponent;
}());
exports.AutomationQualityComponent = AutomationQualityComponent;
//*****Left Nav
