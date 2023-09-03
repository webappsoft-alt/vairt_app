import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiquidateModalPage } from './liquidate-modal.page';

const routes: Routes = [
  {
    path: '',
    component: LiquidateModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiquidateModalPageRoutingModule {}
