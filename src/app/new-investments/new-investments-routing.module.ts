import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewInvestmentsPage } from './new-investments.page';

const routes: Routes = [
  {
    path: '',
    component: NewInvestmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewInvestmentsPageRoutingModule {}
