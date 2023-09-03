import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PledgeModalPage } from './pledge-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PledgeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PledgeModalPageRoutingModule {}
