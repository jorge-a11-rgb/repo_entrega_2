import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';

import { PreguntaClaveComponent } from 'src/app/components/pregunta-clave/pregunta-clave.component';
import { FormularioPage } from './formulario.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioPage,
    children:[
      {
        path:'pregunta-clave',
        component: PreguntaClaveComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// eslint-disable-next-line eol-last
export class FormularioPageRoutingModule {}
