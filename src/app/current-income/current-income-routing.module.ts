import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentIncomePage } from './current-income.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentIncomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentIncomePageRoutingModule {}
