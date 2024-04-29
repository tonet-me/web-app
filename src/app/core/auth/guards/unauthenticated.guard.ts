import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "@core/auth/services/auth.service";

export const UnauthenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.isAuthenticated()) {
    router.navigate(['']).then()
  }
  return !authService.isAuthenticated();
}
