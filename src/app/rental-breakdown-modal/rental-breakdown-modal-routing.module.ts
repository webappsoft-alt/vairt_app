import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentalBreakdownModalPage } from './rental-breakdown-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RentalBreakdownModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentalBreakdownModalPageRoutingModule {}
