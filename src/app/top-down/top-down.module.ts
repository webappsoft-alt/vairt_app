import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopDownPageRoutingModule } from './top-down-routing.module';

import { TopDownPage } from './top-down.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopDownPageRoutingModule
  ],
  declarations: [TopDownPage]
})
export class TopDownPageModule {}
