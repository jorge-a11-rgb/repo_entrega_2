import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FormularioPageRoutingModule } from './formulario-routing.module';
import { PreguntaClaveComponent } from 'src/app/components/pregunta-clave/pregunta-clave.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormularioPage } from './formulario.page';
import { SaludComponent } from 'src/app/components/salud/salud.component';



@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    // See: HomePageRoutingModule
    FormularioPageRoutingModule
  ],
  declarations: [FormularioPage],
  entryComponents:[
 PreguntaClaveComponent, SaludComponent
  ]
})
export class FormularioPageModule {}

