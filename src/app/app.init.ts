import {UserService} from "@shared/services/user.service";
import {map, Observable, of} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "@core/auth/services/auth.service";
import {UserModel} from "@shared/models/user.model";

export function AppInit(): () => Observable<UserModel | boolean> {

  const userService = inject(UserService)
  const authService = inject(AuthService)

  return () => {
    if (authService.isAuthenticated()) {
      return userService.getUserApi().pipe(
        map((res) => userService.userData = res!.user)
      )
    } else {
      return of(true)
    }
  }
}
