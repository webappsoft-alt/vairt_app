import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PushNotiDetailPageRoutingModule } from './push-noti-detail-routing.module';

import { PushNotiDetailPage } from './push-noti-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PushNotiDetailPageRoutingModule
  ],
  declarations: [PushNotiDetailPage]
})
export class PushNotiDetailPageModule {}
