import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WithdrawlRequestPageRoutingModule } from './withdrawl-request-routing.module';

import { WithdrawlRequestPage } from './withdrawl-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WithdrawlRequestPageRoutingModule
  ],
  declarations: [WithdrawlRequestPage]
})
export class WithdrawlRequestPageModule {}
