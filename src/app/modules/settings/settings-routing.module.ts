import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SettingsComponent} from "./settings.component";
import {
  ModifyPersonalInfoComponent
} from "./pages/modify-personal-info/modify-personal-info.component";
import {completeProfileGuard} from "@shared/guards/complete-profile.guard";


const routes: Routes = [
  {path: '', component: SettingsComponent, canActivate: [completeProfileGuard]},
  {path: 'personal-information', component: ModifyPersonalInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SettingsRoutingModule {
}
