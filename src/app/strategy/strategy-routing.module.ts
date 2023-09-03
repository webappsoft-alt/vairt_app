import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StrategyPage } from './strategy.page';

const routes: Routes = [
  {
    path: '',
    component: StrategyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StrategyPageRoutingModule {}
