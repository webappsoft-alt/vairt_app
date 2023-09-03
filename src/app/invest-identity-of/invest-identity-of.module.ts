import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestIdentityOfPageRoutingModule } from './invest-identity-of-routing.module';

import { InvestIdentityOfPage } from './invest-identity-of.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestIdentityOfPageRoutingModule
  ],
  declarations: [InvestIdentityOfPage]
})
export class InvestIdentityOfPageModule {}
