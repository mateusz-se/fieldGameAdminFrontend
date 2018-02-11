import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs/BehaviorSubject';
import { Marker } from '../_models/marker';
import { Team } from 'app/_models/team';
import { Game } from 'app/_models/game';
import { Player } from 'app/_models/player';
import { google } from '@agm/core/services/google-maps-types';
import { QuestInfo } from 'app/_models/quest-info';
import { GeolocationService, ActiveGamesService, TeamsService } from 'app/_services';
import { QuestService } from 'app/_services/quest.service';
import { GlobalVariable } from 'app/_config/global';
import { SessionStorage } from 'ngx-webstorage';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { AuthenticationService } from 'app/_services/authentication.service';

@Injectable()
export class MapDataService {

  private baseApiUrl = GlobalVariable.BASE_API_URL;

  @SessionStorage('authInfo')
  private auth;

  @SessionStorage('userLogin')
  private userLogin;


  private markerSource = new BehaviorSubject(new Marker());
  currentMarker = this.markerSource.asObservable();

  private playerMarkersSource = new BehaviorSubject(new Array<Marker>());
  playerMarkers = this.playerMarkersSource.asObservable();

  constructor(private geolocationService: GeolocationService,
  private activeGamesService: ActiveGamesService,
  private http: Http,
  private authService: AuthenticationService,
  private teamService: TeamsService
) {
 }

  changeCurrentMarker(lat: number, lng: number) {
      const marker = new Marker();
      marker.lat = lat;
      marker.lng = lng;
      this.markerSource.next(marker);
  }

  resetMarker() {
    this.markerSource.next(new Marker());
  }

  initPlayerMarkers(currentGame: Game) {
      this.resetPlayerMarkers();
      if (currentGame !== undefined && currentGame !== null && (currentGame.update == null || currentGame.update === true)) {
          const markers: Marker[] = [];
          currentGame.teams.forEach(t => {
              const iconUrl = '/app/assets/images/' + t.name + '.png';
              t.players.forEach(p => {
                  this.geolocationService.getPlayerPosition(currentGame.name, t.name, p.name).subscribe(
                    playerData => {
                      if ((playerData !== undefined && playerData !== null || playerData.length !== 0)
                          && playerData.positions.length !== 0) {
                          const marker: Marker = new Marker();
                          marker.iconUrl = iconUrl;
                          marker.label = p.name;
                          marker.lat = playerData.positions[0].lat;
                          marker.lng = playerData.positions[0].lon;
                          marker.team = this.teamService.mapTeamName(t.name);
                          marker.points = p.points;
                          markers.push(marker);
                          this.playerMarkersSource.next(markers);
                          this.finishQuestIfNeeded(currentGame.name, t, p, marker.lat, marker.lng);
                      }
                    },
                      error => {
                    });
              });
          });
        }
  }

  finishQuestIfNeeded(gameName: string, team: Team, player: Player, lat: number, lon: number) {
    player.quests
      .filter(q => q.questType === 'walkToDirection' && q.finished === false)
      .forEach(q => {
        const distance = this.calculateDistanece(q.lat, q.lon, lat, lon);
        if (distance <= q.radius) {
          const qi = new QuestInfo();
          qi.gameName = gameName;
          qi.team = team;
          qi.player = player;
          qi.quest = q;
          if (q.teamHash !== '0') {
            this.finishForGroup(gameName, team, q.teamHash);
          } else {
            this.finishQuest(qi);
          }
        }
    });
  }
  finishForGroup(gameName: string, team: Team, teamHash: string) {
    team.players.forEach(p => {
      p.quests.filter(q => q.teamHash === teamHash).forEach(q => {
        const qi = new QuestInfo();
        qi.gameName = gameName;
        qi.team = team;
        qi.player = p;
        q.finished = true;
        qi.quest = q;
        this.finishQuest(qi);
      });
    })
  }

  calculateDistanece(questLat: number, questLng: number, playerLat: number, playerLng: number) {
    const p = 0.017453292519943295;    // Math.PI / 180
    const c = Math.cos;
    const a = 0.5 - c((questLat - playerLat) * p) / 2 + c(playerLat * p) * c ((questLat) * p) * (1 - c(((questLng - playerLng) * p))) / 2;
    const dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }

  finishQuest(questInfo: QuestInfo) {
    const options = this.authService.getAuthOptions();
    const url = '/users/' + this.userLogin + '/games/' + questInfo.gameName +
    '/teams/' + questInfo.team.name + '/players/' + questInfo.player.name +
    '/quests/' + questInfo.quest.id + '/finish';
    this.http.post(this.baseApiUrl + url, '', options).subscribe(
      data => {
        this.activeGamesService.getGame(questInfo.gameName).subscribe(game => {
          game.update = false;
          this.activeGamesService.setCurrentGame(game);
        });
      },
      error => {
      });
  }

  resetPlayerMarkers() {
     this.playerMarkersSource.next(new Array<Marker>());
  }


}


