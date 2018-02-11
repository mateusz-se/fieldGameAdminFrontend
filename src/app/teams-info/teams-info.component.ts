import { Component, OnInit } from '@angular/core';
import { ActiveGamesService } from 'app/_services';
import { Game } from 'app/_models/game';
import {TeamInfoComponent} from 'app/team-info/team-info.component';
import { NotEmptyTeamPipe } from 'app/not-empty-team.pipe';
@Component({
  selector: 'app-teams-info',
  templateUrl: './teams-info.component.html',
  styleUrls: ['./teams-info.component.css']
})
export class TeamsInfoComponent implements OnInit {

  currentGame: Game;

  constructor(private activeGamesService: ActiveGamesService) { }

  ngOnInit() {
    this.activeGamesService.currentGame.subscribe(game => {
      this.currentGame = game;
    })
  }

}
