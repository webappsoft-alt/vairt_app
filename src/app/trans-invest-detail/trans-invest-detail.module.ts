import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransInvestDetailPageRoutingModule } from './trans-invest-detail-routing.module';

import { TransInvestDetailPage } from './trans-invest-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransInvestDetailPageRoutingModule
  ],
  declarations: [TransInvestDetailPage]
})
export class TransInvestDetailPageModule {}
