import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgreeToPageRoutingModule } from './agree-to-routing.module';

import { AgreeToPage } from './agree-to.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgreeToPageRoutingModule
  ],
  declarations: [AgreeToPage]
})
export class AgreeToPageModule {}
