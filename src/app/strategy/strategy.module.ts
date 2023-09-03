import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StrategyPageRoutingModule } from './strategy-routing.module';

import { StrategyPage } from './strategy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StrategyPageRoutingModule
  ],
  declarations: [StrategyPage]
})
export class StrategyPageModule {}
