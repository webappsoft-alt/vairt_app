import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportViewPageRoutingModule } from './support-view-routing.module';

import { SupportViewPage } from './support-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportViewPageRoutingModule
  ],
  declarations: [SupportViewPage]
})
export class SupportViewPageModule {}
