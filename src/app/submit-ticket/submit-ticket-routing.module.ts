import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmitTicketPage } from './submit-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitTicketPageRoutingModule {}
