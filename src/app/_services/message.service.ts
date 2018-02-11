import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { GlobalVariable } from '../_config/global';
import { AuthenticationService } from './authentication.service';
import { SessionStorage } from 'ngx-webstorage';
import { Message } from '../_models/message';
import { Game } from '../_models/game';
import { Team } from '../_models/team';
import { Player } from '../_models/player';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
  private baseApiUrl = GlobalVariable.BASE_API_URL;


  @SessionStorage('authInfo')
  private auth;

  @SessionStorage('userLogin')
  private userLogin;

  constructor(private http: Http,
              private authService: AuthenticationService) { }

  send(game: Game, message: Message) {
    const url = '/users/' + this.userLogin + '/games/' + game.name;
    if (message.type === 'all') {
      this.sendToTeamsInGame(game.teams, url, message);
    } else if (message.type === 'team') {
      const team: Team = game.teams.find(t => t.name === message.reciver);
      this.sendToTeamsInGame(new Array(team), url, message);
    } else if (message.type === 'player') {
      game.teams.forEach(t => {
        t.players.filter(p => p.name === message.reciver)
        .forEach(p => {
          this.sendToPlayerInTeam(new Array(p), url + '/teams/' + t.name, message);
        });
      });
    }
  }


  private sendToTeamsInGame(teams: Team[], url: string, message: Message) {
    teams.forEach(t => {
      this.sendToPlayerInTeam(t.players, url + '/teams/' + t.name, message);
    });
  }

  private sendToPlayerInTeam(players: Player[], url: string, message: Message) {
    const options = this.authService.getAuthOptions();
    const params = '?messageTitle=' + message.title + '&messageText=' + message.body;
    players.forEach(p => {
      this.http.post(this.baseApiUrl + url + '/players/' + p.name + '/messages' + params, '', options).subscribe(
                data => {
                },
                error => {
                  console.log('ERROR: team not added: ' + p.name);
                });
    });
  }

}
