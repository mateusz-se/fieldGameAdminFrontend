import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core/';
import { Team } from 'app/_models/team';

@Component({
  selector: 'app-team-info',
  template: `
  <mat-card>
    <mat-card-header>
      <div mat-card-avatar [ngClass]="team.name"></div>
      <mat-card-title><strong>{{team.name | teamName}}</strong></mat-card-title>
    </mat-card-header>
    <mat-card-content>
        <div *ngFor="let player of team.players">
          {{player.name}} ({{player.points}})
        </div>
    </mat-card-content>
  </mat-card>
  `,
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {

  @Input() team: Team;

  constructor() { }

  ngOnInit() {
  }

}
