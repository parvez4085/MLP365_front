import { Routes } from '@angular/router';
import { Public } from './layout/public/public';
import { Secure } from './layout/secure/secure';
import { loginGuard } from './Guards/login-guard';
import { authGuard } from './Guards/auth-guard';
export const routes: Routes = [
  {
    path: '',
    component: Public,
    canActivate:[loginGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./layout/pages/public/public-module').then(m => m.PublicModule)
      },
    ]
  },
  {
    path: "DD",
    component:Secure,
    canActivate:[authGuard],
    loadChildren: () => import('./layout/pages/secure/secure-module').then(m => m.SecureModule)
  }


];

