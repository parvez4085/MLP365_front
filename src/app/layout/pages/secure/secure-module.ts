import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SecureDashboard } from './secure-dashboard/secure-dashboard';
import { VendorList } from './vendor-list/vendor-list';
import { VendorCreate } from './vendor-create/vendor-create';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Dashboard',
        component:SecureDashboard
      },
      {
        path:'VendorList',
        component:VendorList
      },
      {
        path:'VendorCreate',
        component:VendorCreate
      }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SecureModule { }
