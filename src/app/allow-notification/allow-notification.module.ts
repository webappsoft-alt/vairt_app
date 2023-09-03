import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllowNotificationPageRoutingModule } from './allow-notification-routing.module';

import { AllowNotificationPage } from './allow-notification.page';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllowNotificationPageRoutingModule
  ],
  declarations: [AllowNotificationPage]
})
export class AllowNotificationPageModule {}
