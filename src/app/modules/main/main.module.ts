import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainComponent} from "./main.component";
import {MainRoutingModule} from "./main-routing.module";
import {InlineSvgComponent} from "@shared/component/inline-svg/inline-svg.component";
import {GetImageUrlPipe} from "@shared/pipes/get-image-url.pipe";



@NgModule({
  declarations: [MainComponent],
    imports: [
        CommonModule,
        MainRoutingModule,
        InlineSvgComponent,
        GetImageUrlPipe
    ]
})
export class MainModule { }
