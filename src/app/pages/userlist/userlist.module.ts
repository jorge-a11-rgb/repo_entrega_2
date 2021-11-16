import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserlistPageRoutingModule } from './userlist-routing.module';

import { UserlistPage } from './userlist.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserlistPageRoutingModule,
    FormsModule, RouterModule
  ],
  declarations: [UserlistPage]
})
export class UserlistPageModule {}
