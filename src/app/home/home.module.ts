import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ExpandableComponent } from "../components/expandable/expandable.component";
import { LazyLoadImageModule } from 'ng-lazyload-image'; // <-- include ScrollHooks
import { NgCircleProgressModule } from 'ng-circle-progress';
import {RoundProgressModule} from 'angular-svg-round-progressbar';


@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LazyLoadImageModule,
    RoundProgressModule,
      // NgCircleProgressModule.forRoot({
      //   "backgroundPadding": 7,
      //   "radius": 40,
      //   "space": -2,
      //   "outerStrokeWidth": 2,
      //   "outerStrokeColor": "#000",
      //   "innerStrokeColor": "#e7e8ea",
      //   "subtitleColor":"#000",
      //   "innerStrokeWidth": 2,
      //   "subtitle":'Invested',
      //   "animateTitle": false,
      //   //"animationDuration": 1000,
      //   "showUnits": true,
      //   "clockwise": false
      // })
  ],
  declarations: [HomePage,ExpandableComponent]
})
export class HomePageModule {}
