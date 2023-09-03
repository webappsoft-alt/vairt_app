import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdentityOfPageRoutingModule } from './identity-of-routing.module';

import { IdentityOfPage } from './identity-of.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdentityOfPageRoutingModule
  ],
  declarations: [IdentityOfPage]
})
export class IdentityOfPageModule {}
