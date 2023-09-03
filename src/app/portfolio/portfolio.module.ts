import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortfolioPageRoutingModule } from './portfolio-routing.module';

import { PortfolioPage } from './portfolio.page';
import { LazyLoadImageModule } from 'ng-lazyload-image'; // <-- include ScrollHooks

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortfolioPageRoutingModule,
    LazyLoadImageModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [PortfolioPage]
})
export class PortfolioPageModule {}
