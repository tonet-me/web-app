import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "@core/auth/services/auth.service";
import {environment} from "@environments/environment";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService)
  let authRequest;
  if (authService.isAuthenticated() && req.url.includes(environment.apiUrl)) {
    authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authService.accessToken}`),
    });
  } else {
    authRequest = req
  }
  return next(authRequest);
};
