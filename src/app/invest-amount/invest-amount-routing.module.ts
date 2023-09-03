import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestAmountPage } from './invest-amount.page';

const routes: Routes = [
  {
    path: '',
    component: InvestAmountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestAmountPageRoutingModule {}
