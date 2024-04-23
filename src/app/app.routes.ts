import {Routes} from '@angular/router';
import {C404Component} from "@shared/component/c404/c404.component";
import {AuthGuard} from "@core/auth/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layout.module').then(m => m.LayoutModule),
    canActivate: [AuthGuard]
  },
  {path: 'auth', loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule)},
  {path: '404', title: 'My Tonet | Not Found', component: C404Component},
  {path: '**', redirectTo: '404'}
];
