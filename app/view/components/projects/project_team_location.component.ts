import { NgZone} from '@angular/core';
import {Component, ViewChild} from '@angular/core';
import {PROJECT_TEAM_LOCATION_COMPONENT} from './project.constant';
import {ProjectTeamComponent} from './project_team.component';

declare var $;

@Component({
	selector: PROJECT_TEAM_LOCATION_COMPONENT,
	templateUrl: 'project_team_location.html'
})
export class ProjectTeamLocationComponent {
  @ViewChild(ProjectTeamComponent) projTeam: ProjectTeamComponent;
  constructor(private zone:NgZone) {

  }


	refreshView() {
      this.projTeam.refreshView();
  }
  //
  // refreshLocalView() {
  //
  //   setTimeout(() => {
  //     this.zone.run(() => {
  //       $('project-team-location').click();
  //     });
  //   }, 100);
  //
  // }
}
