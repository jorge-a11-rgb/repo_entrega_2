import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pass2Page } from './pass2.page';

const routes: Routes = [
  {
    path: '',
    component: Pass2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pass2PageRoutingModule {}
