import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginModel, loginPayload, tokensModel} from "@core/auth/models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _accessTokenKey: string = 'access_token';
  private _refreshTokenKey: string = 'refresh_token';

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
  }

  get accessToken(): string {
    return this.cookieService.get(this._accessTokenKey)
  }

  set accessToken(token: string) {
    this.cookieService.set(this._accessTokenKey, token, {secure: true})
  }

  get refreshToken(): string {
    return this.cookieService.get(this._refreshTokenKey)
  }

  getNewToken() {
    return this.http.post<tokensModel>('users/refresh-token', {refresh_token: this.refreshToken})
  }

  setTokens(tokens: tokensModel) {
    this.refreshToken = tokens.refresh_token
    this.accessToken = tokens.access_token
  }

  set refreshToken(token: string) {
    this.cookieService.set(this._refreshTokenKey, token, {secure: true})
  }

  isAuthenticated(): boolean {
    return !!this.accessToken
  }


  login(values: loginPayload): Observable<LoginModel> {
    return this.http.post<LoginModel>('users/login-or-register', values)
  }


  logout() {
    this.cookieService.deleteAll();
    //todo change this with route later
    window.location.href = window.location.origin + '/auth'
  }
}
