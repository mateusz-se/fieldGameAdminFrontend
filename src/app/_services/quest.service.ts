import { Observer } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../_config/global';
import { AuthenticationService } from './authentication.service';
import { SessionStorage } from 'ngx-webstorage';
import { Message } from '../_models/message';
import { Game } from '../_models/game';
import { Team } from '../_models/team';
import { Player } from '../_models/player';
import { Quest } from '../_models/quest';
import { Subject } from 'rxjs/Subject';
import { QuestInfo } from 'app/_models/quest-info';
import { ActiveGamesService } from 'app/_services';

@Injectable()
export class QuestService {
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  @SessionStorage('authInfo')
  private auth;

  @SessionStorage('userLogin')
  private userLogin;

  constructor(private http: Http,
              private authService: AuthenticationService,
            private activeGamesService: ActiveGamesService) { }

  add(quest: Quest, game: Game) {
    const url = '/users/' + this.userLogin + '/games/' + game.name;
    if (quest.reciverType === 'team') {
      const team: Team = game.teams.find(t => t.name === quest.reciver);
      this.sendToTeamsInGame(team, url, quest, game.name);
    } else if (quest.reciverType === 'player') {
      const playerTeam = this.findTeamWithPlayer(game.teams, quest.reciver);
      if (playerTeam != null) {
        this.sendToPlayerInTeam(quest.reciver, url + '/teams/' + playerTeam.name , quest, game.name, '0');
      }
    }
  }


  private findTeamWithPlayer(teams: Team[], playerName: string) {
    for (const team of teams) {
      for (const player of team.players) {
        if (player.name === playerName) {
          return team;
        }
      }
    }
    return null;
  }


  private sendToTeamsInGame(team: Team, url: string, quest: Quest, gameName: string) {
    const hash = this.generateHash();
    team.players.forEach(p => {
      this.sendToPlayerInTeam(p.name, url + '/teams/' + team.name, quest, gameName, hash);
    });
  }

  private sendToPlayerInTeam(playerName: string, url: string, quest: Quest, gameName: string, hash: string) {
    const options =  this.authService.getAuthOptions();
    const coords = quest.cooidinates.split(' ');
    const params = '?questType=' +  quest.questType  +
    '&questTitle=' + quest.title +
    '&questDescription=' + quest.description +
    '&questLat=' + coords[0] +
    '&questLon=' + coords[1] +
    '&radius=' + quest.radius +
    '&questPoints=' + quest.points +
    '&teamHash=' + hash;

      this.http.post(this.baseApiUrl + url + '/players/' + playerName + '/quests' + params, '', options).subscribe(
                data => {
                  this.activeGamesService.getGame(gameName).subscribe(game => {
                    this.activeGamesService.setCurrentGame(game);
                  });
                },
                error => {
                  console.log('ERROR: team not added: ' + playerName);
                });
  }

  private generateHash() {
    let hash = '';
    const signs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 15; i++) {
        hash += signs.charAt(Math.floor(Math.random() * signs.length));
    }
    return hash;
  }

  getQuestTypeName(questType: string) {
    if (questType === 'walkToDirection') {
      return 'dotrzyj do celu';
    } else {
      return 'znajdź przedmiot';
    }
  }

  getQuestPicturesIds(questInfo: QuestInfo) {
    const options =  this.authService.getAuthOptions();
    const url = '/users/' + this.userLogin + '/games/' + questInfo.gameName +
    '/teams/' + questInfo.team.name + '/players/' + questInfo.player.name +
    '/quests/' + questInfo.quest.id + '/pictures';
    return this.http.get(this.baseApiUrl + url, options)
    .map((response: Response) => {
      if (response.status === 200) {
         const ids = JSON.parse(response.text());
         return ids;
      }
    });
  }

  getQuestPictures(questInfo: QuestInfo, id: number) {
    const options =  this.authService.getAuthOptions();
    const url = '/users/' + this.userLogin + '/games/' + questInfo.gameName +
    '/teams/' + questInfo.team.name + '/players/' + questInfo.player.name +
    '/quests/' + questInfo.quest.id + '/pictures/' + id;

    return this.http.get(this.baseApiUrl + url, options)
    .map((response: Response) => {
      if (response.status === 200) {
         return JSON.parse(response.text());
      }
    });
  }

  rejectPhoto(questInfo: QuestInfo) {
    const options =  this.authService.getAuthOptions();
    const url = '/users/' + this.userLogin + '/games/' + questInfo.gameName +
    '/teams/' + questInfo.team.name + '/players/' + questInfo.player.name +
    '/quests/' + questInfo.quest.id + '/bad_picture';
    this.http.post(this.baseApiUrl + url, '', options).subscribe(
      data => {
        this.activeGamesService.getGame(questInfo.gameName).subscribe(game => {
          this.activeGamesService.setCurrentGame(game);
        });
      },
      error => {
      });
  }

  finishQuest(questInfo: QuestInfo) {
    const options =  this.authService.getAuthOptions();
    const url = '/users/' + this.userLogin + '/games/' + questInfo.gameName +
    '/teams/' + questInfo.team.name + '/players/' + questInfo.player.name +
    '/quests/' + questInfo.quest.id + '/finish';
    this.http.post(this.baseApiUrl + url, '', options).subscribe(
      data => {
        this.activeGamesService.getGame(questInfo.gameName).subscribe(game => {
          this.activeGamesService.setCurrentGame(game);
        });
      },
      error => {
      });
  }
}
