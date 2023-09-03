import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestAmountPageRoutingModule } from './invest-amount-routing.module';

import { InvestAmountPage } from './invest-amount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestAmountPageRoutingModule
  ],
  declarations: [InvestAmountPage]
})
export class InvestAmountPageModule {}
