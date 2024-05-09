import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardManagementComponent} from "./card-management.component";
import {CardManagementRoutingModule} from "./card-management-routing.module";
import {BreadcrumbComponent} from "@shared/component/breadcrumb/breadcrumb.component";
import {StepNavigationComponent} from "@shared/component/step-navigation/step-navigation.component";
import {BasicInfoComponent} from "./pages/basic-info/basic-info.component";
import {
  BasicInfoFormComponent
} from "@app/modules/card-management/components/basic-info-form/basic-info-form.component";
import {FormSubmitDirective} from "@shared/directives/form-submit.directive";
import {UploaderComponent} from "@shared/component/uploader/uploader.component";
import {RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {ReactiveFormsModule} from "@angular/forms";
import {InputDirective} from "@shared/directives/input.directive";
import {SocialMediaComponent} from "./pages/social-media/social-media.component";
import {SocialMediaFormComponent} from "./components/social-media-form/social-media-form.component";
import {ContactInformationComponent} from "./pages/contact-information/contact-information.component";
import {
  ContactInformationFormComponent
} from "./components/contact-information-form/contact-information-form.component";
import {ExtraLinkComponent} from "./pages/extra-link/extra-link.component";
import {ExtraLinkFormComponent} from "./components/extra-link-form/extra-link-form.component";
import {SwitchComponent} from "@shared/component/switch/switch.component";
import {InlineSvgComponent} from "@shared/component/inline-svg/inline-svg.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormPrefixDirective} from "@shared/directives/form-prefix.directive";
import {ReplaceSpaceDirective} from "@shared/directives/replace-space.directive";
import {FormArrayPipe} from "@shared/pipes/formArray.pipe";


@NgModule({
  declarations: [
    CardManagementComponent,
    BasicInfoComponent,
    BasicInfoFormComponent,
    SocialMediaComponent,
    SocialMediaFormComponent,
    ContactInformationComponent,
    ContactInformationFormComponent,
    ExtraLinkComponent,
    ExtraLinkFormComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RxReactiveFormsModule,
        CardManagementRoutingModule,
        BreadcrumbComponent,
        StepNavigationComponent,
        FormSubmitDirective,
        UploaderComponent,
        InputDirective,
        SwitchComponent,
        InlineSvgComponent,
        NgSelectModule,
        FormPrefixDirective,
        ReplaceSpaceDirective,
        FormArrayPipe,
    ]
})
export class CardManagementModule {
}
