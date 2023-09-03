import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiquidateModalPageRoutingModule } from './liquidate-modal-routing.module';

import { LiquidateModalPage } from './liquidate-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiquidateModalPageRoutingModule
  ],
  declarations: [LiquidateModalPage]
})
export class LiquidateModalPageModule {}
