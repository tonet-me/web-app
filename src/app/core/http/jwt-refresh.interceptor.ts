import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, switchMap, throwError} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "@core/auth/services/auth.service";

export const jwtRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  let isRefreshing: boolean = false
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (!isRefreshing) {
            isRefreshing = true;
            // Token expired; attempt to refresh it
            if (authService.isAuthenticated()) {
              return authService.getNewToken().pipe(
                switchMap((res) => {
                  isRefreshing = false;
                  authService.setTokens(res)
                  const updatedRequest = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${authService.accessToken}`),
                  });
                  return next(updatedRequest);
                  // Retry the original request with the new token
                }),
                catchError(() => {
                  // Refresh token failed; log out the user or handle the error
                  // For example, you can redirect to the login page
                  authService.logout();
                  return throwError(() => 'Token refresh failed');
                })
              );
            }
          }
        }
        return throwError(() => error);
      }
    )
  )
};
