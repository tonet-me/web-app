import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {GoogleSigninButtonModule} from "@abacritt/angularx-social-login";
import {InlineSvgComponent} from "@shared/component/inline-svg/inline-svg.component";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    GoogleSigninButtonModule,
    NgOptimizedImage,
    InlineSvgComponent,
  ],
})
export class AuthModule { }
