import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositInstructionsPage } from './deposit-instructions.page';

const routes: Routes = [
  {
    path: '',
    component: DepositInstructionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositInstructionsPageRoutingModule {}
