import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestmentDetailPageRoutingModule } from './investment-detail-routing.module';

import { InvestmentDetailPage } from './investment-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestmentDetailPageRoutingModule
  ],
  declarations: [InvestmentDetailPage]
})
export class InvestmentDetailPageModule {}
