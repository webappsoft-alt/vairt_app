import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestContactInfoPageRoutingModule } from './invest-contact-info-routing.module';

import { InvestContactInfoPage } from './invest-contact-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestContactInfoPageRoutingModule
  ],
  declarations: [InvestContactInfoPage]
})
export class InvestContactInfoPageModule {}
