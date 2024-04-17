import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {GoogleSigninButtonModule} from "@abacritt/angularx-social-login";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    GoogleSigninButtonModule,
    NgOptimizedImage,
  ],
})
export class AuthModule { }
