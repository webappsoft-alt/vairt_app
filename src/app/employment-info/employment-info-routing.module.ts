import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmploymentInfoPage } from './employment-info.page';

const routes: Routes = [
  {
    path: '',
    component: EmploymentInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmploymentInfoPageRoutingModule {}
