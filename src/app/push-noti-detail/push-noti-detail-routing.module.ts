import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PushNotiDetailPage } from './push-noti-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PushNotiDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PushNotiDetailPageRoutingModule {}
