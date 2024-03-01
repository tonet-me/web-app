import {Component, DestroyRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AuthService} from "@core/auth/services/auth.service";
import {SocialProviderEnum} from "@core/auth/enums/social-provider";
import {filter, iif, map, mergeMap, of, Subscription, switchMap} from "rxjs";
import {UserService} from "@shared/services/user.service";
import {Router} from "@angular/router";
import {GoogleLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {UploaderService} from "@shared/services/uploader.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  innerWidth!: number;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private uploaderService: UploaderService,
              private destroyRef: DestroyRef) {
  }

  ngOnInit() {
    if (typeof window !== "undefined") {
      this.innerWidth = window.innerWidth
    }
    this.authService.SocialAuth$.pipe(
      takeUntilDestroyed(this.destroyRef),
      mergeMap((socialUser) => {
        return this.authService.login({
          provider_id: SocialProviderEnum.Google,
          token: socialUser.idToken
        }).pipe(
          mergeMap((data) => {
            this.authService.setTokens(data.tokens)
            return iif(() => data.new_user,
              this.uploaderService.getFileFromUrl(socialUser.photoUrl.split('=s')[0].concat('=s400-c')).pipe(
                mergeMap((file) => {
                  return this.uploaderService.uploadImage(file).pipe(mergeMap((res) => {
                    return this.userService.updateUser({profile_photo_url: res["file-name"]}).pipe(
                      map(() => {
                        return {...data, user: {...data.user, profile_photo_url: res["file-name"]}}
                      })
                    )
                  }))
                })
              ), of(data))
          }))
      }),
    ).subscribe((res) => {
      this.userService.userData = res.user
      this.router.navigate([res.new_user ? '/setting/personal-information?new_user=true' : '']).then()
    });
  }


}
