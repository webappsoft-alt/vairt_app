import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestmentDetailPage } from './investment-detail.page';

const routes: Routes = [
  {
    path: '',
    component: InvestmentDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentDetailPageRoutingModule {}
