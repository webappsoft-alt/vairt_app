import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoogleAuthModalPage } from './google-auth-modal.page';

const routes: Routes = [
  {
    path: '',
    component: GoogleAuthModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleAuthModalPageRoutingModule {}
