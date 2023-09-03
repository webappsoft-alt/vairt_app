import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionDetailModalPage } from './transaction-detail-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionDetailModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionDetailModalPageRoutingModule {}
