import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewInvestmentsPageRoutingModule } from './new-investments-routing.module';

import { NewInvestmentsPage } from './new-investments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewInvestmentsPageRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

  declarations: [NewInvestmentsPage]
})
export class NewInvestmentsPageModule {}
