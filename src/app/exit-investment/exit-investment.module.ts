import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExitInvestmentPageRoutingModule } from './exit-investment-routing.module';

import { ExitInvestmentPage } from './exit-investment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExitInvestmentPageRoutingModule
  ],
  declarations: [ExitInvestmentPage]
})
export class ExitInvestmentPageModule {}
