import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthModelPageRoutingModule } from './auth-model-routing.module';

import { AuthModelPage } from './auth-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthModelPageRoutingModule
  ],
  declarations: [AuthModelPage]
})
export class AuthModelPageModule {}
