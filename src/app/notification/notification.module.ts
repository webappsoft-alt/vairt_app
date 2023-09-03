import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';

import { NotificationPage } from './notification.page';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
