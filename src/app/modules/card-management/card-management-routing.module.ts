import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CardManagementComponent} from "./card-management.component";
import {BasicInfoComponent} from "./pages/basic-info/basic-info.component";
import {SocialMediaComponent} from "./pages/social-media/social-media.component";
import {ExtraLinkComponent} from "./pages/extra-link/extra-link.component";
import {ContactInformationComponent} from "./pages/contact-information/contact-information.component";
import {getAllCountriesResolver} from "@shared/resolver/get-all-countries.resolver";
import {cardManagementStepsGuard} from "@app/modules/card-management/guards/card-management-steps.guard";
import {singleCardInfoResolver} from "@shared/resolver/single-card-info.resolver";


const routes: Routes = [
  {
    path: '',
    component: CardManagementComponent,
    title: 'My Tonet | Add Card',
    children: [
      {path: 'basic-info', component: BasicInfoComponent},
      {path: 'social-media', component: SocialMediaComponent, canMatch: [cardManagementStepsGuard]},
      {
        path: 'contract-information',
        component: ContactInformationComponent,
        canMatch: [cardManagementStepsGuard],
        resolve: {countries: getAllCountriesResolver}
      },
      {path: 'extra-link', component: ExtraLinkComponent, canMatch: [cardManagementStepsGuard]},
      {path: '', redirectTo: 'basic-info', pathMatch: 'full'}
    ]
  },
  {
    path: ':id',
    title: 'My Tonet | Edit Card',
    resolve: {cardData: singleCardInfoResolver},
    component: CardManagementComponent,
    children: [
      {path: 'basic-info', component: BasicInfoComponent},
      {path: 'social-media', component: SocialMediaComponent},
      {
        path: 'contract-information',
        component: ContactInformationComponent,
        resolve: {countries: getAllCountriesResolver}
      },
      {path: 'extra-link', component: ExtraLinkComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CardManagementRoutingModule {
}
