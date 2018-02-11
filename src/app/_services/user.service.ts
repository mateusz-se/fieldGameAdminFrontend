import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../_models/user';
import { GlobalVariable } from '../_config/global';

@Injectable()
export class UserService {
  private baseApiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: Http) { }

  create(user: User) {
    const params = '?login=' + user.login + '&password=' + user.password;
    return this.http.post(this.baseApiUrl + '/users' + params, '');
  }
}
