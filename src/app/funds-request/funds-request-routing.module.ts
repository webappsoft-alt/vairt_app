import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundsRequestPage } from './funds-request.page';

const routes: Routes = [
  {
    path: '',
    component: FundsRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundsRequestPageRoutingModule {}
