import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateBankDetailPage } from './update-bank-detail.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateBankDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateBankDetailPageRoutingModule {}
