import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchasedPropertyPage } from './purchased-property.page';

const routes: Routes = [
  {
    path: '',
    component: PurchasedPropertyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchasedPropertyPageRoutingModule {}
