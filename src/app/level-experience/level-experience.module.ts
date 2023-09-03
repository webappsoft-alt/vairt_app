import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LevelExperiencePageRoutingModule } from './level-experience-routing.module';

import { LevelExperiencePage } from './level-experience.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LevelExperiencePageRoutingModule
  ],
  declarations: [LevelExperiencePage]
})
export class LevelExperiencePageModule {}
