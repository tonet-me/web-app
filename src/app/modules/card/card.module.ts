import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from "@app/modules/card/card.component";
import {CardRoutingModule} from "@app/modules/card/card-routing.module";
import {BreadcrumbComponent} from "@shared/component/breadcrumb/breadcrumb.component";
import {GetImageUrlPipe} from "@shared/pipes/get-image-url.pipe";
import {InlineSvgComponent} from "@shared/component/inline-svg/inline-svg.component";
import {UserCardComponent} from "@shared/component/user-card/user-card.component";
import {SocialMediaNamePipe} from "@app/modules/card/pipes/social-media-name.pipe";
import {QRCodeModule} from "angularx-qrcode";



@NgModule({
    declarations: [CardComponent],
    exports: [
        CardComponent
    ],
  imports: [
    CommonModule,
    CardRoutingModule,
    BreadcrumbComponent,
    GetImageUrlPipe,
    InlineSvgComponent,
    UserCardComponent,
    SocialMediaNamePipe,
    QRCodeModule,
  ]
})
export class CardModule { }
