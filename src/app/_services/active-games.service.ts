import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/timer'
import { GlobalVariable } from '../_config/global';
import { AuthenticationService } from './authentication.service';
import { SessionStorage } from 'ngx-webstorage';
import { Game } from '../_models/game';
import { Team } from '../_models/team';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GameState } from 'app/_models/game-state';

@Injectable()
export class ActiveGamesService {
  private baseApiUrl = GlobalVariable.BASE_API_URL;
  private notFinishedGames= [];

  private currentGameSubject = new BehaviorSubject(new Game());
  currentGame = this.currentGameSubject.asObservable();

  @SessionStorage('authInfo')
  private auth;

  @SessionStorage('userLogin')
  private userLogin;

  gameUpdateTimer = Observable.timer(1 * 1000, 10 * 1000);

  constructor(private http: Http,
              private authService: AuthenticationService) {
    this.gameUpdateTimer.subscribe(tick => {
      const currentValue = this.currentGameSubject.getValue();
      if (currentValue.name != null && currentValue.name !== '') {
        this.getGame(currentValue.name).subscribe(game => {
          this.setCurrentGame(game);
        });
      }
    });
  }

  activeGames() {
    const options = this.authService.getAuthOptions();
    const url = '/users/' + this.userLogin + '/games?active=true';
    return this.http.get(this.baseApiUrl + url, options)
        .map((response: Response) => {
            if (response.status === 200) {
               return JSON.parse(response.text());
            }
        });
  }

  addActiveGame(game: Game): Observable<Game> {
    const subject = new Subject<any>();
    const options = this.authService.getAuthOptions();
    const url = '/users/' + this.userLogin + '/games/' + game.name + '?gamePassword=' + game.password;
    this.http.post(this.baseApiUrl + url, '', options).subscribe(
                data => {
                  this.addTeamsToGame(game, game.teams);
                  subject.next(game);
                  return subject.asObservable();
                },
                error => {
                  console.log('ERROR: game not added: ' + game);
                  subject.next(new Game());
                  return subject.asObservable();
                });
    return subject.asObservable();
  }

  addTeamsToGame(game: Game, teams: Team[]) {
    const options = this.authService.getAuthOptions();
    const url = '/users/' + this.userLogin + '/games/' + game.name + '/teams/';
    teams.forEach(team => {
      this.http.post(this.baseApiUrl + url + team.name, '', options).subscribe(
                data => {
                  console.log('team added: ' + team);
                },
                error => {
                  console.log('ERROR: team not added: ' + team);
                });
    });
  }

  getGame(gameName: string) {
    const options = this.authService.getAuthOptions();
    const url = '/users/' + this.userLogin + '/games/' + gameName;
    return this.http.get(this.baseApiUrl + url, options)
        .map((response: Response) => {
            if (response.status === 200) {
                console.log(response.text());
               const game = JSON.parse(response.text());
               return game;
            }
        });
  }

  setCurrentGame(game: Game) {
    this.currentGameSubject.next(game);
  }

  changeGameStatus(gameName: string, gameStatus: GameState) {
    const options = this.authService.getAuthOptions();
    const url = '/users/' + this.userLogin + '/games/' + gameName + '/status?gameState=' + gameStatus;
    this.currentGame.subscribe(g => {
      g.gameState = gameStatus;
    })
    return this.http.post(this.baseApiUrl + url, '', options);
  }
}
