import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Team } from 'app/_models/team';
import { GlobalVariable } from 'app/_config/global';
import { SessionStorage } from 'ngx-webstorage';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Marker } from 'app/_models/marker';
import { AuthenticationService } from 'app/_services';

@Injectable()
export class GeolocationService {
    private baseApiUrl = GlobalVariable.BASE_API_URL;
    private notFinishedGames= [];

    @SessionStorage('authInfo')
    private auth;

    @SessionStorage('userLogin')
    private userLogin;

    constructor(private http: Http,
        private authService: AuthenticationService) { }

    getCurrentPosition(): Observable<Position> {
        return new Observable((observer: Observer<Position>) => {
            // Invokes getCurrentPosition method of Geolocation API.
            navigator.geolocation.getCurrentPosition(
                (position: Position) => {
                    observer.next(position);
                    observer.complete();
                },
                (error: PositionError) => {
                    console.log('Geolocation service: ' + error.message);
                    observer.error(error);
                }
            );
        });
    }

    getPlayerPosition(gameName: string, teamName: string, playerName: string) {
        const options = this.authService.getAuthOptions();
        const url = '/users/' + this.userLogin + '/games/' + gameName + '/teams/' + teamName
        + '/players/' + playerName;
        return this.http.get(this.baseApiUrl + url, options)
        .map((response: Response) => {
            if (response.status === 200) {
               return JSON.parse(response.text());
            }
        });

    }
}
