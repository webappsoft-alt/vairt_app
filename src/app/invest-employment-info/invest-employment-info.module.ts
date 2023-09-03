import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestEmploymentInfoPageRoutingModule } from './invest-employment-info-routing.module';

import { InvestEmploymentInfoPage } from './invest-employment-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestEmploymentInfoPageRoutingModule
  ],
  declarations: [InvestEmploymentInfoPage]
})
export class InvestEmploymentInfoPageModule {}
