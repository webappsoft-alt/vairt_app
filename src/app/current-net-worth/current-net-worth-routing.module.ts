import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentNetWorthPage } from './current-net-worth.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentNetWorthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentNetWorthPageRoutingModule {}
