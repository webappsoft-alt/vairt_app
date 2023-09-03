import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoogleAuthPage } from './google-auth.page';

const routes: Routes = [
  {
    path: '',
    component: GoogleAuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleAuthPageRoutingModule {}
