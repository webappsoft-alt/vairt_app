import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiquidatePasswordPage } from './liquidate-password.page';

const routes: Routes = [
  {
    path: '',
    component: LiquidatePasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiquidatePasswordPageRoutingModule {}
