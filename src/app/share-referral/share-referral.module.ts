import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareReferralPageRoutingModule } from './share-referral-routing.module';

import { ShareReferralPage } from './share-referral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareReferralPageRoutingModule
  ],
  declarations: [ShareReferralPage]
})
export class ShareReferralPageModule {}
