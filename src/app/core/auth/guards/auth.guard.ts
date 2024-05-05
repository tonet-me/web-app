import {CanActivateFn, CanMatchFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "@core/auth/services/auth.service";

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/auth'])
    return false
  }
}
