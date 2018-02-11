import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Game } from '../_models/game';
import { AlertService, ActiveGamesService, MapDataService} from '../_services/index';
import { error } from 'selenium-webdriver';
import { GameState } from 'app/_models/game-state';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css']
})
export class GameMenuComponent implements OnInit {

    selectedGameNameParam: string;

    game: Game;

      constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private activeGamesService: ActiveGamesService,
        private mapDataService: MapDataService) {
    this.route.params.subscribe( params => this.selectedGameNameParam = params['gameName']);

  }

  ngOnInit() {
    this.activeGamesService.getGame(this.selectedGameNameParam).subscribe(game => {
        this.game = game;
        if (this.game.gameState === null) {
          this.game.gameState = GameState.RECRUITMENT;
        }
        this.activeGamesService.setCurrentGame(game);
        this.activeGamesService.currentGame.subscribe(g => {
            this.game = g;
            this.mapDataService.initPlayerMarkers(g);
        });
    },
    err => {
        this.alertService.error('Wystąpił błąd podczas pobierania gry');
    });
  }

  finishGame() {
      if (confirm('Czy napewno zakończyć gre? ')) {
        this.activeGamesService.changeGameStatus(this.selectedGameNameParam, GameState.FINISHED)
        .subscribe(
          (response) => {
              this.alertService.success('Zakończono gre: ' + this.selectedGameNameParam);
              this.router.navigate(['']);
          },
          (err) => {
            this.alertService.error('Wystąpił błąd');
          }
        );
    }
  }

  startGame() {
    this.activeGamesService.changeGameStatus(this.selectedGameNameParam, GameState.IN_PROGRESS)
        .subscribe(
          (response) => {
              this.alertService.success('Rozpoczęto gre!');
          },
          (err) => {
              this.alertService.error('Wystąpił błąd');
          }
        );
  }

  startRecuritment() {
    this.activeGamesService.changeGameStatus(this.selectedGameNameParam, GameState.RECRUITMENT)
        .subscribe(
          (response) => {
              this.alertService.success('Ponownie otworzono rekrutacje!');
          },
          (err) => {
              this.alertService.error('Wystąpił błąd');
          }
        );
    }

}
