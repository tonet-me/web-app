import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "@core/http/auth.interceptor";
import {errorInterceptor} from "@core/http/error.interceptor";
import {baseUrlInterceptor} from "@core/http/base-url.interceptor";
import {jwtRefreshInterceptor} from "@core/http/jwt-refresh.interceptor";
import {GoogleLoginProvider, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import {ColorSchemeService} from "@shared/services/color-scheme.service";
import {AppInit} from "@app/app.init";
import {environment} from "@environments/environment";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([
      baseUrlInterceptor,
      authInterceptor,
      errorInterceptor,
      jwtRefreshInterceptor
    ])),
    provideAnimations(), // required animations providers
    provideToastr({
      progressBar: true,
    }), // Toastr providers
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
