import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentIncomeModelPageRoutingModule } from './current-income-model-routing.module';

import { CurrentIncomeModelPage } from './current-income-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentIncomeModelPageRoutingModule
  ],
  declarations: [CurrentIncomeModelPage]
})
export class CurrentIncomeModelPageModule {}
