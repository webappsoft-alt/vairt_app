import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestAccountInfoPageRoutingModule } from './invest-account-info-routing.module';

import { InvestAccountInfoPage } from './invest-account-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestAccountInfoPageRoutingModule
  ],
  declarations: [InvestAccountInfoPage]
})
export class InvestAccountInfoPageModule {}
