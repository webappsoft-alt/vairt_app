import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExitInvestmentPage } from './exit-investment.page';

const routes: Routes = [
  {
    path: '',
    component: ExitInvestmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExitInvestmentPageRoutingModule {}
