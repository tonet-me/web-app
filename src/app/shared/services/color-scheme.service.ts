import {Inject, Injectable, signal} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ColorSchemeService {
  DarkTheme = signal<boolean>(this._getInitMode());

  constructor(@Inject(DOCUMENT) private document: Document) {
    this._updateMode(this.DarkTheme())
  }

  private _getInitMode() {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('theme') !== null) {
        return localStorage.getItem('theme') === 'dark'
      } else {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        return darkThemeMq.matches
      }
    }
    return true
  }

  private _updateMode(mode: boolean) {
    this.document.body.setAttribute('color-scheme', mode ? 'dark' : 'light')
  }

  setDarkTheme(themeStatus: boolean): void {
    this._updateMode(themeStatus)
    localStorage.setItem('theme', themeStatus ? 'dark' : 'light');
    this.DarkTheme.update(() => themeStatus);
  }
}
