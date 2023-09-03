import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgreeTcPageRoutingModule } from './agree-tc-routing.module';

import { AgreeTcPage } from './agree-tc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgreeTcPageRoutingModule
  ],
  declarations: [AgreeTcPage]
})
export class AgreeTcPageModule {}
