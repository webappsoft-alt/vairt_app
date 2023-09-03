import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoogleAuthPageRoutingModule } from './google-auth-routing.module';

import { GoogleAuthPage } from './google-auth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleAuthPageRoutingModule
  ],
  declarations: [GoogleAuthPage]
})
export class GoogleAuthPageModule {}
