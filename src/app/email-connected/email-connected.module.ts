import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailConnectedPageRoutingModule } from './email-connected-routing.module';

import { EmailConnectedPage } from './email-connected.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailConnectedPageRoutingModule
  ],
  declarations: [EmailConnectedPage]
})
export class EmailConnectedPageModule {}
