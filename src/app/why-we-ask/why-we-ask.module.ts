import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhyWeAskPageRoutingModule } from './why-we-ask-routing.module';

import { WhyWeAskPage } from './why-we-ask.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhyWeAskPageRoutingModule
  ],
  declarations: [WhyWeAskPage]
})
export class WhyWeAskPageModule {}
