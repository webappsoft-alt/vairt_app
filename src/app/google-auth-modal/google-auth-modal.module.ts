import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoogleAuthModalPageRoutingModule } from './google-auth-modal-routing.module';

import { GoogleAuthModalPage } from './google-auth-modal.page';
import { LazyLoadImageModule } from 'ng-lazyload-image'; // <-- include ScrollHooks

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LazyLoadImageModule,
    GoogleAuthModalPageRoutingModule
  ],
  declarations: [GoogleAuthModalPage]
})
export class GoogleAuthModalPageModule {}
