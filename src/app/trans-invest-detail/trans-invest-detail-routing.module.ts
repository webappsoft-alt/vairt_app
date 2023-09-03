import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransInvestDetailPage } from './trans-invest-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TransInvestDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransInvestDetailPageRoutingModule {}
