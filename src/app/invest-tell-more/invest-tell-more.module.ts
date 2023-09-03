import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestTellMorePageRoutingModule } from './invest-tell-more-routing.module';

import { InvestTellMorePage } from './invest-tell-more.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestTellMorePageRoutingModule
  ],
  declarations: [InvestTellMorePage]
})
export class InvestTellMorePageModule {}
