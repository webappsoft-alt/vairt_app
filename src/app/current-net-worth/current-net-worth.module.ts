import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentNetWorthPageRoutingModule } from './current-net-worth-routing.module';

import { CurrentNetWorthPage } from './current-net-worth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentNetWorthPageRoutingModule
  ],
  declarations: [CurrentNetWorthPage]
})
export class CurrentNetWorthPageModule {}
