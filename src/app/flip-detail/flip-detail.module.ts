import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlipDetailPageRoutingModule } from './flip-detail-routing.module';

import { FlipDetailPage } from './flip-detail.page';
import { LazyLoadImageModule } from 'ng-lazyload-image'; // <-- include ScrollHooks

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LazyLoadImageModule,
    FlipDetailPageRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [FlipDetailPage]
})
export class FlipDetailPageModule {}
