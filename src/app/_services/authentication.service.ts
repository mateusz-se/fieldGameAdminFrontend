import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { GlobalVariable } from '../_config/global';
import { SessionStorage } from 'ngx-webstorage';
import { ActiveGamesService } from 'app/_services';
import { Game } from 'app/_models/game';
import { RequestOptions } from '@angular/http/src/base_request_options';


@Injectable()
export class AuthenticationService {
    private baseApiUrl = GlobalVariable.BASE_API_URL;

    @SessionStorage('authInfo')
    private auth;

    @SessionStorage('userLogin')
    private userLogin;

    @SessionStorage('currentUser')
    private currentUser;

    private currenUserSubject: Subject<string> = new Subject<string>();

    constructor(private http: Http) { }

    login(login: string, password: string) {
        const headers = new Headers();
        this.userLogin = login;
        this.auth = window.btoa(login + ':' + password);
        headers.append('Authorization', 'Basic ' + this.auth);
        return this.http.get(this.baseApiUrl, {
                headers: headers
            })
            .map((response: Response) => {
                if (response.status === 200) {
                    this.setCurrentUser(JSON.stringify(login));
                }
            });
    }

    logout() {
        this.setCurrentUser(null);
    }

    private setCurrentUser(userName: string) {
        this.currentUser = userName;
        this.currenUserSubject.next(this.currentUser);
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getCurrenUserSubject() {
        return this.currenUserSubject;
    }

    getAuthOptions() {
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + this.auth);
        const options = new RequestOptions({ headers: headers });
        return options;
    }
}
