import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassPageRoutingModule } from './pass-routing.module';

import { PassPage } from './pass.page';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassPageRoutingModule,
    MatSliderModule,
    FormsModule, RouterModule
  ],
  declarations: [PassPage]
})
export class PassPageModule {}
