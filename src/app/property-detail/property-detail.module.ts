import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropertyDetailPageRoutingModule } from './property-detail-routing.module';

import { PropertyDetailPage } from './property-detail.page';
import { LazyLoadImageModule } from 'ng-lazyload-image'; // <-- include ScrollHooks

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertyDetailPageRoutingModule,
    LazyLoadImageModule
  ],
  declarations: [PropertyDetailPage]
})
export class PropertyDetailPageModule {}
