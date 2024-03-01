import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {loadingInterceptor} from "@core/http/loading.interceptor";
import {authInterceptor} from "@core/http/auth.interceptor";
import {errorInterceptor} from "@core/http/error.interceptor";
import {baseUrlInterceptor} from "@core/http/base-url.interceptor";
import {jwtRefreshInterceptor} from "@core/http/jwt-refresh.interceptor";
import {GoogleLoginProvider, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import {ColorSchemeService} from "@shared/services/color-scheme.service";
import {AppInit} from "@app/app.init";
import {UserService} from "@shared/services/user.service";
import {environment} from "@environments/environment";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";
import {AuthService} from "@core/auth/services/auth.service";
import {AuthGuard} from "@core/auth/guards/auth.guard";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([
      baseUrlInterceptor,
      authInterceptor,
      loadingInterceptor,
      errorInterceptor,
      jwtRefreshInterceptor
    ])),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientID, {oneTapEnabled: false}),

          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: AppInit,
      deps: [ColorSchemeService],
    },
  ]
};
