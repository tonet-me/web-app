import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "@core/auth/services/auth.service";
import {environment} from "@environments/environment";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService)
  if (authService.isAuthenticated() && req.url.includes(environment.apiUrl)) {
    let authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authService.accessToken}`),
    });
    return next(authRequest)
  }
  return next(req);
};
