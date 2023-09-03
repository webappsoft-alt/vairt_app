import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareReferralPage } from './share-referral.page';

const routes: Routes = [
  {
    path: '',
    component: ShareReferralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareReferralPageRoutingModule {}
