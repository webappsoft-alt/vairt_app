import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasedPropertyPageRoutingModule } from './purchased-property-routing.module';

import { PurchasedPropertyPage } from './purchased-property.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchasedPropertyPageRoutingModule
  ],
  declarations: [PurchasedPropertyPage]
})
export class PurchasedPropertyPageModule {}
