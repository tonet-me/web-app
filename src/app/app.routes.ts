import {Routes} from '@angular/router';
import {AuthGuard} from "@core/auth/guards/auth.guard";
import {UnauthenticatedGuard} from "@core/auth/guards/unauthenticated.guard";
import {C404Component} from "@shared/component/c404/c404.component";

export const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule),
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: '',
    loadChildren: () => import('./modules/layout.module').then(m => m.LayoutModule),
    canActivate: [AuthGuard]
  },
  {path: '**', title: 'My Tonet | Not Found', component: C404Component, pathMatch: "full"},
];
