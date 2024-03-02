import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {SettingsRoutingModule} from "@app/modules/settings/settings-routing.module";
import {SettingsComponent} from "@app/modules/settings/settings.component";
import {BreadcrumbComponent} from "@shared/component/breadcrumb/breadcrumb.component";
import {SwitchComponent} from "@shared/component/switch/switch.component";
import {InlineSvgComponent} from "@shared/component/inline-svg/inline-svg.component";
import {ButtonComponent} from "@shared/component/button/button.component";
import {
  ModifyPersonalInfoComponent
} from "@app/modules/settings/pages/modify-personal-info/modify-personal-info.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {UploaderComponent} from "@shared/component/uploader/uploader.component";
import {PersonalFormComponent} from "./components/personal-form/personal-form.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {GetImageUrlPipe} from "@shared/pipes/get-image-url.pipe";
import {FormSubmitDirective} from "@shared/directives/form-submit.directive";
import {InputDirective} from "@shared/directives/input.directive";
import {ImageCropperModule} from "ngx-image-cropper";


@NgModule({
  declarations: [SettingsComponent, ModifyPersonalInfoComponent, PersonalFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    SettingsRoutingModule,
    BreadcrumbComponent,
    SwitchComponent,
    InlineSvgComponent,
    ButtonComponent,
    UploaderComponent,
    NgSelectModule,
    GetImageUrlPipe,
    FormSubmitDirective,
    InputDirective,
    ImageCropperModule
  ]
})
export class SettingsModule {
}
