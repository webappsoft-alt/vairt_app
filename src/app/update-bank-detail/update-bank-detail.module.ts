import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateBankDetailPageRoutingModule } from './update-bank-detail-routing.module';

import { UpdateBankDetailPage } from './update-bank-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateBankDetailPageRoutingModule
  ],
  declarations: [UpdateBankDetailPage]
})
export class UpdateBankDetailPageModule {}
