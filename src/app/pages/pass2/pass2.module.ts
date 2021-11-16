import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pass2PageRoutingModule } from './pass2-routing.module';

import { Pass2Page } from './pass2.page';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pass2PageRoutingModule,
    MatSliderModule,
    FormsModule, RouterModule
  ],
  declarations: [Pass2Page]
})
export class Pass2PageModule {}
