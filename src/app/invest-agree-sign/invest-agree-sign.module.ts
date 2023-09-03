import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestAgreeSignPageRoutingModule } from './invest-agree-sign-routing.module';

import { InvestAgreeSignPage } from './invest-agree-sign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestAgreeSignPageRoutingModule
  ],
  declarations: [InvestAgreeSignPage]
})
export class InvestAgreeSignPageModule {}
