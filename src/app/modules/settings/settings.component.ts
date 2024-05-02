import {Component} from '@angular/core';
import {ColorSchemeService} from "@shared/services/color-scheme.service";
import {AuthService} from "@core/auth/services/auth.service";
import {UserService} from "@shared/services/user.service";

@Component({
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  isDarkMode: boolean = false

  constructor(public colorSchemeService: ColorSchemeService,
              protected userService: UserService,
              private authService: AuthService) {
    this.isDarkMode = colorSchemeService.DarkTheme()
  }

  handleTheme() {
    this.isDarkMode = !this.isDarkMode
    this.colorSchemeService.setDarkTheme(this.isDarkMode)
  }

  logout() {
    this.authService.logout()

  }
}
