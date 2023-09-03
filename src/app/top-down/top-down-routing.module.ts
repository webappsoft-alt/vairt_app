import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopDownPage } from './top-down.page';

const routes: Routes = [
  {
    path: '',
    component: TopDownPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopDownPageRoutingModule {}
