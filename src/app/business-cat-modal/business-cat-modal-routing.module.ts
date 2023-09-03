import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessCatModalPage } from './business-cat-modal.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessCatModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessCatModalPageRoutingModule {}
