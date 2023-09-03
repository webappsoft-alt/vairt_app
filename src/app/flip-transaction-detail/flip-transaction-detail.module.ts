import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlipTransactionDetailPageRoutingModule } from './flip-transaction-detail-routing.module';

import { FlipTransactionDetailPage } from './flip-transaction-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlipTransactionDetailPageRoutingModule
  ],
  declarations: [FlipTransactionDetailPage]
})
export class FlipTransactionDetailPageModule {}
