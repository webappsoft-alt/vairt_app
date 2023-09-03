import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestInfoPageRoutingModule } from './invest-info-routing.module';

import { InvestInfoPage } from './invest-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestInfoPageRoutingModule
  ],
  declarations: [InvestInfoPage]
})
export class InvestInfoPageModule {}
