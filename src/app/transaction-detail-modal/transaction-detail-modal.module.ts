import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionDetailModalPageRoutingModule } from './transaction-detail-modal-routing.module';

import { TransactionDetailModalPage } from './transaction-detail-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionDetailModalPageRoutingModule
  ],
  declarations: [TransactionDetailModalPage]
})
export class TransactionDetailModalPageModule {}
