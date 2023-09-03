import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentalBreakdownModalPageRoutingModule } from './rental-breakdown-modal-routing.module';

import { RentalBreakdownModalPage } from './rental-breakdown-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RentalBreakdownModalPageRoutingModule
  ],
  declarations: [RentalBreakdownModalPage]
})
export class RentalBreakdownModalPageModule {}
