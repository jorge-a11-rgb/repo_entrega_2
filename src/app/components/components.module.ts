import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule }  from '@ionic/angular';

import { PreguntaClaveComponent } from './pregunta-clave/pregunta-clave.component';
import { SaludComponent } from './salud/salud.component';
@NgModule({

  declarations: [

  ],
  imports: [
    FormsModule,
  ],

  exports: [
    FormsModule
  ]
})
export class ComponentsModule {}
