import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "@shared/services/user.service";
import {map} from "rxjs";

export const completeProfileGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)
  return userService.getUserData$().pipe(
    map((user) => {
      if (user?.first_name && user.last_name) {
        return true
      } else {
        router.navigate(['/setting/personal-information'], {queryParams: {new_user: true}}).then()
        return false
      }
    })
  )
};
