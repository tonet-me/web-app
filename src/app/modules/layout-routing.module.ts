import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./layout.component";
import {completeProfileGuard} from "@shared/guards/complete-profile.guard";


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
        canActivate: [completeProfileGuard]
      },
      {path: 'setting', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class LayoutRoutingModule {
}
