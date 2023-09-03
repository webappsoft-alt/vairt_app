import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestInfoPage } from './invest-info.page';

const routes: Routes = [
  {
    path: '',
    component: InvestInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestInfoPageRoutingModule {}
