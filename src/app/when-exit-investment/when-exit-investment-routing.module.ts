import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhenExitInvestmentPage } from './when-exit-investment.page';

const routes: Routes = [
  {
    path: '',
    component: WhenExitInvestmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhenExitInvestmentPageRoutingModule {}
