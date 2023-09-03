import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithdrawlRequestPage } from './withdrawl-request.page';

const routes: Routes = [
  {
    path: '',
    component: WithdrawlRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawlRequestPageRoutingModule {}
