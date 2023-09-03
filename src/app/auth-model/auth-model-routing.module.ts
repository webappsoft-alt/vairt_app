import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthModelPage } from './auth-model.page';

const routes: Routes = [
  {
    path: '',
    component: AuthModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthModelPageRoutingModule {}
