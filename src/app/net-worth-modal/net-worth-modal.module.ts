import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NetWorthModalPageRoutingModule } from './net-worth-modal-routing.module';

import { NetWorthModalPage } from './net-worth-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NetWorthModalPageRoutingModule
  ],
  declarations: [NetWorthModalPage]
})
export class NetWorthModalPageModule {}
