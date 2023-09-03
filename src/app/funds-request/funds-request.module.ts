import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FundsRequestPageRoutingModule } from './funds-request-routing.module';

import { FundsRequestPage } from './funds-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FundsRequestPageRoutingModule
  ],
  declarations: [FundsRequestPage]
})
export class FundsRequestPageModule {}
