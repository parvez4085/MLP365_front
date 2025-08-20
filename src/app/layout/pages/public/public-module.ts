import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { PublicDashboard } from './public-dashboard/public-dashboard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PublicDashboard
      },
      {
        path: 'Home',
        component: PublicDashboard
      },
      {
        path: 'login',
        component: Login
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PublicModule { }
