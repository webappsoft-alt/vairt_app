import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitTicketPageRoutingModule } from './submit-ticket-routing.module';

import { SubmitTicketPage } from './submit-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitTicketPageRoutingModule
  ],
  declarations: [SubmitTicketPage]
})
export class SubmitTicketPageModule {}
