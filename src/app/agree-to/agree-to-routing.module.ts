import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgreeToPage } from './agree-to.page';

const routes: Routes = [
  {
    path: '',
    component: AgreeToPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreeToPageRoutingModule {}
