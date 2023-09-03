import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositFundsPageRoutingModule } from './deposit-funds-routing.module';

import { DepositFundsPage } from './deposit-funds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositFundsPageRoutingModule
  ],
  declarations: [DepositFundsPage]
})
export class DepositFundsPageModule {}
