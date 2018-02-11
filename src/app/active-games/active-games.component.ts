import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, ActiveGamesService } from '../_services/index';
import { Game } from '../_models/game';

@Component({
  selector: 'app-active-games',
  templateUrl: './active-games.component.html',
  styleUrls: ['./active-games.component.css']
})
export class ActiveGamesComponent implements OnInit {

    games: Game[];

    selectedGame: Game;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private authService: AuthenticationService,
        private activeGamesService: ActiveGamesService) { }

  ngOnInit() {
      this.activeGamesService.activeGames()
            .subscribe(
                data => {
                    if (data === undefined || data === null || data.length === 0) {
                        this.router.navigate(['gameSetup']);
                    } else {
                        this.games = data;
                        this.selectedGame = this.games[0];
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.router.navigate(['login']);
                });
    }
  onSubmit() {
        this.router.navigate(['gameMenu', this.selectedGame.name]);
  }
}
