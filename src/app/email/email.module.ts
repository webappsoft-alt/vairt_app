import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailPageRoutingModule } from './email-routing.module';

import { EmailPage } from './email.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EmailPageRoutingModule
  ],
  declarations: [EmailPage]
})
export class EmailPageModule {}
