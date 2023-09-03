import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlipSalebreakdownDetailPageRoutingModule } from './flip-salebreakdown-detail-routing.module';

import { FlipSalebreakdownDetailPage } from './flip-salebreakdown-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlipSalebreakdownDetailPageRoutingModule
  ],
  declarations: [FlipSalebreakdownDetailPage]
})
export class FlipSalebreakdownDetailPageModule {}
