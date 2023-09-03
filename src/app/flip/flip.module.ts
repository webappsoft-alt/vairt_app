import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlipPageRoutingModule } from './flip-routing.module';

import { FlipPage } from './flip.page';
import { LazyLoadImageModule } from 'ng-lazyload-image'; // <-- include ScrollHooks

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlipPageRoutingModule,
    LazyLoadImageModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [FlipPage]
})
export class FlipPageModule {}
