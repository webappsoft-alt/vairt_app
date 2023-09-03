import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiquidatePasswordPageRoutingModule } from './liquidate-password-routing.module';

import { LiquidatePasswordPage } from './liquidate-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiquidatePasswordPageRoutingModule
  ],
  declarations: [LiquidatePasswordPage]
})
export class LiquidatePasswordPageModule {}
