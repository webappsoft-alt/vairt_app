import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgreeTcPage } from './agree-tc.page';

const routes: Routes = [
  {
    path: '',
    component: AgreeTcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreeTcPageRoutingModule {}
