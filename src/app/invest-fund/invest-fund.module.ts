import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestFundPageRoutingModule } from './invest-fund-routing.module';

import { InvestFundPage } from './invest-fund.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestFundPageRoutingModule
  ],
  declarations: [InvestFundPage]
})
export class InvestFundPageModule {}
