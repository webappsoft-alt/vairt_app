import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NetWorthModalPage } from './net-worth-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NetWorthModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetWorthModalPageRoutingModule {}
