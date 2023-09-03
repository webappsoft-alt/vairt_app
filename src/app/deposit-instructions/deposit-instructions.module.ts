import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositInstructionsPageRoutingModule } from './deposit-instructions-routing.module';

import { DepositInstructionsPage } from './deposit-instructions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositInstructionsPageRoutingModule
  ],
  declarations: [DepositInstructionsPage]
})
export class DepositInstructionsPageModule {}
