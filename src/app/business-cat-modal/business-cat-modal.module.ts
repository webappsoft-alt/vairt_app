import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessCatModalPageRoutingModule } from './business-cat-modal-routing.module';

import { BusinessCatModalPage } from './business-cat-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessCatModalPageRoutingModule
  ],
  declarations: [BusinessCatModalPage]
})
export class BusinessCatModalPageModule {}
