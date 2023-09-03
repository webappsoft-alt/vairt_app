import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitizenshipPageRoutingModule } from './citizenship-routing.module';

import { CitizenshipPage } from './citizenship.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CitizenshipPageRoutingModule
  ],
  declarations: [CitizenshipPage]
})
export class CitizenshipPageModule {}
