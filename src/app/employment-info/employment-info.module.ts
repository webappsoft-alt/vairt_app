import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmploymentInfoPageRoutingModule } from './employment-info-routing.module';

import { EmploymentInfoPage } from './employment-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmploymentInfoPageRoutingModule
  ],
  declarations: [EmploymentInfoPage]
})
export class EmploymentInfoPageModule {}
