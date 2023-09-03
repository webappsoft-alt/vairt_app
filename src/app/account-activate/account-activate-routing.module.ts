import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountActivatePage } from './account-activate.page';

const routes: Routes = [
  {
    path: '',
    component: AccountActivatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountActivatePageRoutingModule {}
