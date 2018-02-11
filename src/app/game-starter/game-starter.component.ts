import { Component, OnInit } from '@angular/core';
import { Team } from '../_models/team';
import { Router, ActivatedRoute } from '@angular/router';
import { Game } from '../_models/game';
import { AlertService, ActiveGamesService, TeamsService } from '../_services/index';

@Component({
  selector: 'app-game-starter',
  templateUrl: './game-starter.component.html',
  styleUrls: ['./game-starter.component.css']
})
export class GameStarterComponent implements OnInit {
  teamsMap: Array<Team>;
  game: Game = new Game();

  isSelectAll = false;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private activeGamesService: ActiveGamesService,
        private teamsService: TeamsService
      ) { }

  ngOnInit() {
    this.teamsMap = this.teamsService.getAllTeams();
  }

  selectAllTeams() {
      this.teamsMap.forEach(team => {
        team.checked = this.isSelectAll;
      });
  }
  onSubmit() {
    this.game.teams = this.teamsMap.filter(team => team.checked);
    this.activeGamesService.addActiveGame(this.game)
              .subscribe(
                data => {
                    if (data.name !== null && data.name !== '') {
                      this.alertService.success('Gra dodana pomyślnie', true);
                      this.router.navigate(['/']);
                    } else {
                      this.alertService.error('Wystąpił błąd');
                    }
                },
                error => {
                    this.showError(error);
                });
  }
  showError(error: string) {
    const message = JSON.parse(error).message;
    this.alertService.error(message);
  }
}
