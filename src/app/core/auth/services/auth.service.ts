import {Injectable, OnInit} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginModel, loginPayload, tokensModel} from "@core/auth/models/auth.model";
import {Router} from "@angular/router";
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private _accessTokenKey: string = 'access_token';
  private _refreshTokenKey: string = 'refresh_token';

  SocialAuth$ = this.socialAuthService.authState;

  constructor(private socialAuthService: SocialAuthService,
              private http: HttpClient,
              private cookieService: CookieService) {
  }

  ngOnInit() {
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
    this.socialAuthService.signOut(true).then()
    //todo change this with route later
    window.location.href = window.location.origin  + '/auth'
  }
}
