import { Observer } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../_config/global';
import { AuthenticationService } from './authentication.service';
import { SessionStorage } from 'ngx-webstorage';
import { ActiveGamesService } from 'app/_services';
import { QuestPreset } from 'app/_models/quest-preset';
import { Quest } from 'app/_models/quest';

@Injectable()
export class QuestPresetService {
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  @SessionStorage('authInfo')
  private auth;

  @SessionStorage('userLogin')
  private userLogin;

  constructor(private http: Http,
              private authService: AuthenticationService,
            private activeGamesService: ActiveGamesService) { }

    addPreset(questPreset: Quest) {
        const url = '/users/' + this.userLogin + '/questPresets';
        const cords = questPreset.cooidinates == null ? '' : questPreset.cooidinates;
        const coords = cords.split(' ');
        const questType = questPreset.questType == null ? '' : questPreset.questType;
        const questTitle = questPreset.title == null ? '' : questPreset.title;
        const questDesc = questPreset.description == null ? '' : questPreset.description;
        const questLat = coords.length === 2 ? coords[0] : '0';
        const questLon = coords.length === 2 ? coords[1] : '0';
        const radius = questPreset.radius == null ? '1' : questPreset.radius;
        const points = questPreset.points == null ? '1' : questPreset.points;
        const params = '?questType=' +  questType  +
        '&questTitle=' + questTitle +
        '&questDescription=' + questDesc +
        '&questLat=' + questLat +
        '&questLon=' + questLon +
        '&radius=' + radius +
        '&questPoints=' + points;

        return this.http.post(this.baseApiUrl + url + params, '', this.authService.getAuthOptions())
            .subscribe(
                data => {
                        return 'OK';
                    },
                    error => {
                    });
    }

    getQuestPresets() {
        const url = '/users/' + this.userLogin + '/questPresets';
        return this.http.get(this.baseApiUrl + url, this.authService.getAuthOptions())
        .map((response: Response) => {
            if (response.status === 200) {
               return JSON.parse(response.text());
            }
        });
    }

    removeQuestPreset(questPreset: QuestPreset) {
        const url = '/users/' + this.userLogin + '/questPresets/' + questPreset.id;
        return this.http.delete(this.baseApiUrl + url,  this.authService.getAuthOptions());
    }
}
