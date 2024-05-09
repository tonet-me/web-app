import {Component, DestroyRef, HostListener, OnInit} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AuthService} from "@core/auth/services/auth.service";
import {SocialProviderEnum} from "@core/auth/enums/social-provider";
import {catchError, iif, map, mergeMap, of} from "rxjs";
import {UserService} from "@shared/services/user.service";
import {Router} from "@angular/router";
import {UploaderService} from "@shared/services/uploader.service";
import {SocialAuthService} from "@abacritt/angularx-social-login";

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
              private socialAuthService: SocialAuthService,
              private uploaderService: UploaderService,
              private destroyRef: DestroyRef) {
  }

  ngOnInit() {
    if (typeof window !== "undefined") {
      this.innerWidth = window.innerWidth
    }
  }


}
