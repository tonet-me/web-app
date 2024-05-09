import {CanActivateFn, Router} from "@angular/router";
import {inject, PLATFORM_ID} from "@angular/core";
import {AuthService} from "@core/auth/services/auth.service";
import {isPlatformBrowser} from "@angular/common";

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const platformId = inject(PLATFORM_ID)
  if (isPlatformBrowser(platformId)) {
    if (!authService.isAuthenticated() && router.url !== '/auth') {
      router.navigate(['/auth']).then()
    }

    return authService.isAuthenticated();
  }
  return false
}
