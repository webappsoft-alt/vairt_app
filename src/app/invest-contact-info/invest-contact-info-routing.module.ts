import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestContactInfoPage } from './invest-contact-info.page';

const routes: Routes = [
  {
    path: '',
    component: InvestContactInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestContactInfoPageRoutingModule {}
