import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentIncomePageRoutingModule } from './current-income-routing.module';

import { CurrentIncomePage } from './current-income.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentIncomePageRoutingModule
  ],
  declarations: [CurrentIncomePage]
})
export class CurrentIncomePageModule {}
