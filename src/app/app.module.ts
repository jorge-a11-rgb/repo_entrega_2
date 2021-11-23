import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonBackButton, IonicModule, IonicRouteStrategy, IonTabButton, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PreguntaClaveComponent } from './components/pregunta-clave/pregunta-clave.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DBTaskService } from './services/dbtask.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { Storage } from '@ionic/storage';
import { SaludComponent } from './components/salud/salud.component';
import { isPlatform } from '@ionic/core';



const getConfig = () =>{
  if(isPlatform('hybrid')){
    return {
      backButtonText: 'Previous',
      tabButtonLayout: 'label-hide'

    };
  }
  if(isPlatform('ios')){
    return {
      backButtonText: 'Previous',
      tabButtonLayout: 'label-hide'

    };
  }
  if(isPlatform('android')){
    return {
      backButtonText: 'Previous',
      tabButtonLayout: 'label-hide'

    };
  }
  if(isPlatform('desktop')){
    return {
      backButtonText: 'Previous',
      tabButtonLayout: 'label-hide'

    };
  }
  if(isPlatform('cordova')){
    return {
      backButtonText: 'Previous',
      tabButtonLayout: 'label-hide'

    };
  }
  if(isPlatform('ipad')){
    return {
      backButtonText: 'Previous',
      tabButtonLayout: 'label-hide'

    };
  }

  if(isPlatform('tablet')){
    return {
      backButtonText: 'Previous',
      tabButtonLayout: 'label-hide'

    };
  }
  if(isPlatform('capacitor')){
    return {
      backButtonText: 'Previous',
      tabButtonLayout: 'label-hide'

    };
  }
  return {
    menuIcon: 'ellipsis-vertical'
  };
};




@NgModule({
  declarations: [AppComponent,  PreguntaClaveComponent, SaludComponent],
  entryComponents: [],
  imports: [HttpClientModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    BrowserAnimationsModule, FormsModule, IonicModule.forRoot({
      rippleEffect: false,
      mode: 'md'
    })
],
  providers: [
    SQLite,
    DBTaskService,
    AuthGuardService,
    AuthenticationService,
    StatusBar,
    SplashScreen,
    Storage,
    DBTaskService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  private db: SQLiteObject;

  constructor(private platform: Platform, private dbTaskService: DBTaskService, private storage: Storage) {

    console.log('Verificar si la plataforma ya está lista para funcionar.');
    this.platform.ready().then(() => {

      console.log('Crear BD SQLite.');
      const sqlite: SQLite = new SQLite();
      sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db) => {
          console.log('La BD SQLite fue creada.');

          console.log('Asignar la BD a una propiedad de la clase.');
          this.db = db;
          this.storage.create();
          this.dbTaskService.setDatabase(db);
          this.dbTaskService.createTables();
          console.log('Seleccionar todos los registros de la tabla.');
          this.db.executeSql('SELECT * FROM sesion_data', [])

          .then((data) => {
            console.log('La instrucción select fue ejecutada con éxito');

            console.log('El objeto devuelto por executeSql es el siguiente.');
            console.log(data);

            console.log('Recorrer todas las filas y mostrar los items devueltos.');
            for (let i = 0; i < data.rows.length; i++) {
            console.log(data.rows.item(i));
            }

            console.log('Recorrer todas las filas y mostrar los nombres de usuarios.');
            for (let i = 0; i < data.rows.length; i++) {
            console.log(data.rows.item(i).user_name);
            console.log(data.rows.item(i).password);
            console.log(data.rows.item(i).segundo_apellido_materno);
            }
          })
          .catch(e => {
            console.log('Error al seleccionar registros con SELECT en la BD.');
            console.log(e);
          });





        //   console.log('Crear una nueva tabla, pero siempre y cuando no haya sido creada antes.');
        //   this.db.executeSql('CREATE TABLE IF NOT EXISTS usuarios(nombre_usuario VARCHAR(50))', [])

        //     .then(() => {
        //       console.log('La tabla fue creada.');

        //       console.log('Insertar un nuevo registro a la tabla.');
        //       this.db.executeSql('INSERT INTO usuarios VALUES(\'Cristián Gómez Vega\')', [])

        //       .then(() => {
        //         console.log('El registro nuevo fue insertado en la tabla.');

        //         console.log('Seleccionar todos los registros de la tabla.');
        //         this.db.executeSql('SELECT * FROM usuarios', [])

        //         .then((data) => {
        //           console.log('La instrucción select fue ejecutada con éxito');

        //           console.log('El objeto devuelto por executeSql es el siguiente.');
        //           console.log(data);

        //           console.log('Recorrer todas las filas y mostrar los items devueltos.');
        //           for (let i = 0; i < data.rows.length; i++) {
        //             console.log(data.rows.item(i));
        //           }

        //           console.log('Recorrer todas las filas y mostrar los nombres de usuarios.');
        //           for (let i = 0; i < data.rows.length; i++) {
        //             console.log(data.rows.item(i).nombre_usuario);
        //           }
        //         })
        //         .catch(e => {
        //           console.log('Error al seleccionar registros con SELECT en la BD.');
        //           console.log(e);
        //         });
        //       })
        //       .catch(e => {
        //         console.log('Error al insertar registros con INSERT en la BD.');
        //         console.log(e);
        //       });
        //     })
        //     .catch(e => {
        //       console.log('Error al crear la tabla con CREATE TABLE.');
        //       console.log(e);
        //     });
        // })
        // .catch(e => {
        //   console.log('Error al crear la BD con sqlite.create.');
        //   console.log(e);
        });
      console.log('Saliendo del constructor...');
    });
  }
}

