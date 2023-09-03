import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllowLocationPageRoutingModule } from './allow-location-routing.module';

import { AllowLocationPage } from './allow-location.page';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllowLocationPageRoutingModule
  ],
  declarations: [AllowLocationPage]
})
export class AllowLocationPageModule {}
