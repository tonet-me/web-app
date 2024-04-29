import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from "./layout.component";
import {LayoutRoutingModule} from "./layout-routing.module";
import {HeaderComponent} from "@shared/component/layout/header/header.component";
import {FooterComponent} from "@shared/component/layout/footer/footer.component";



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
