import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestIdentityOfPage } from './invest-identity-of.page';

const routes: Routes = [
  {
    path: '',
    component: InvestIdentityOfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestIdentityOfPageRoutingModule {}
