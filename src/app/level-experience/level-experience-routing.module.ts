import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LevelExperiencePage } from './level-experience.page';

const routes: Routes = [
  {
    path: '',
    component: LevelExperiencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevelExperiencePageRoutingModule {}
