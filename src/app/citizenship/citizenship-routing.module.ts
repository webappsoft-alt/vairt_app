import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitizenshipPage } from './citizenship.page';

const routes: Routes = [
  {
    path: '',
    component: CitizenshipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitizenshipPageRoutingModule {}
