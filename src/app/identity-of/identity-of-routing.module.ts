import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentityOfPage } from './identity-of.page';

const routes: Routes = [
  {
    path: '',
    component: IdentityOfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentityOfPageRoutingModule {}
