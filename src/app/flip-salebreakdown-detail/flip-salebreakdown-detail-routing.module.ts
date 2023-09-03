import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlipSalebreakdownDetailPage } from './flip-salebreakdown-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FlipSalebreakdownDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlipSalebreakdownDetailPageRoutingModule {}
