import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestAccountInfoPage } from './invest-account-info.page';

const routes: Routes = [
  {
    path: '',
    component: InvestAccountInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestAccountInfoPageRoutingModule {}
