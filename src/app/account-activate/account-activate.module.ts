import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountActivatePageRoutingModule } from './account-activate-routing.module';

import { AccountActivatePage } from './account-activate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountActivatePageRoutingModule
  ],
  declarations: [AccountActivatePage]
})
export class AccountActivatePageModule {}
