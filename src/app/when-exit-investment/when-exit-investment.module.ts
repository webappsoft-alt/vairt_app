import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhenExitInvestmentPageRoutingModule } from './when-exit-investment-routing.module';

import { WhenExitInvestmentPage } from './when-exit-investment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhenExitInvestmentPageRoutingModule
  ],
  declarations: [WhenExitInvestmentPage]
})
export class WhenExitInvestmentPageModule {}
