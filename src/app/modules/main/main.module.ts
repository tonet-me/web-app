import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MainComponent} from "./main.component";
import {MainRoutingModule} from "./main-routing.module";
import {InlineSvgComponent} from "@shared/component/inline-svg/inline-svg.component";
import {GetImageUrlPipe} from "@shared/pipes/get-image-url.pipe";
import {SwitchComponent} from "@shared/component/switch/switch.component";
import {QRCodeModule} from "angularx-qrcode";
import {ClickOutsideDirective} from "@shared/directives/click-outside.directive";
import {ConfirmModalComponent} from "@shared/component/confirm-modal/confirm-modal.component";
import {UserCardComponent} from "@shared/component/user-card/user-card.component";


@NgModule({
  declarations: [MainComponent],
    imports: [
        CommonModule,
        MainRoutingModule,
        InlineSvgComponent,
        GetImageUrlPipe,
        SwitchComponent,
        QRCodeModule,
        ClickOutsideDirective,
        ConfirmModalComponent,
        UserCardComponent,
        NgOptimizedImage,
    ]
})
export class MainModule {
}
