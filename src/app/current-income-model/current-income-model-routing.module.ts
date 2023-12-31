import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentIncomeModelPage } from './current-income-model.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentIncomeModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentIncomeModelPageRoutingModule {}
