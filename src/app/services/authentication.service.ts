/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
import { DebugEventListener, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { DBTaskService } from './dbtask.service';
import { debug } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Se crea un sujeto al cual van a observar y el que se actualizara con un valor booleano
  authState = new BehaviorSubject(false);
  constructor(
    private router: Router,
    private storage: Storage,
    public dbtaskService: DBTaskService,
    public toastController: ToastController
  )
  {
    this.isLogged();
  }
  /**
   * Valida si existe un usuario iniciado
   */
  isLogged(){
    console.log('Estoy dentro de isLogged');
    try {
      this.storage.get("USER_DATA").
        then(
          (response) => {
            console.log('isLogged response');
            console.log(response);
            if(response !== null){
              console.log('USER_DATA viene CON DATOS.');
              console.log('Poner true en authState.');
              this.authState.next(true); //Se establece en verdadero el estado de la authentication
            } else {
              console.log('USER_DATA viene vacio.');
            }
            return true;
          },
          (resp) => {
            console.log('No logro obtener USER_DATA.');
          }
      )
    }
    catch(error) {
      console.log('Error en isLogged(), cayo en el catch.');
      console.log(error);
      return false;
    }
  }

  /**
   * Función que permite cerrar la sesión actual
   * actualiza el sesion_data de SQLite
   */
  logout(){
    console.log('// Se obtiene la informacion almacenada en storage mediante la clave "USER_DATA"');
    this.storage.get("USER_DATA").then((data)=>{
      console.log('// Como quiere cerrar la sesión se cambia active a 0');
      console.log(data);
      console.log('// Se usa la función del servicio "deactivateSessions"');
      this.dbtaskService.deactivateSessions()
      // Manejamos la respuesta correcta
      .then((response)=>{
        console.log('// Se valida que efectuo una modificación en alguna fila');
        if(response.rowsAffected>=1){
          console.log('// Se remueve el valor de USER_DATA');
          this.storage.remove("USER_DATA");
          console.log('// Cambiar authState a false');
          this.authState.next(false);
          console.log('// Se rederige al login');
          this.router.navigate(['login']);
        }
      })
      .catch((error)=>console.error(error))
    });
  }

  login(login: any){
    console.log('// Se obtiene si existe alguna data de sesión');
    this.storage = new Storage();
    this.storage.create();
    this.dbtaskService.getSesionData(login)
    .then((data) => {
      console.log('// Si se ejecuto correctamente la consulta');
      console.log('// Mostrar datos de la consulta');
      console.log(data);
      if(data === undefined) {
        console.log('// Es undefined por lo que no retorno firmas');
        this.presentToast('Credenciales Incorrectas')
      } else {
        console.log('// Si no es undefined es por que el usuario y la password coincidieron con algun registro');
        console.log('Cambiar data.active = 1');
        data.active = 1;
        console.log('Actualizar datos de sesione BD');
        this.dbtaskService.updateSesionData(data)
        .then((response)=> {
          console.log('LOGRO ACTUALIZAR LA SESION CON ACTIVE EN 1');
          console.log(response);
          console.log('Actualizar datos de sesion en STORAGE');
          this.storage.set("USER_DATA", data); // Guardamos la data retornada
          this.authState.next(true);
          console.log('Navega hasta el home');
          this.router.navigate(['home'])
        });
      }
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  async presentToast(message: string, duration?: number){
    const toast = await this.toastController.create(
      {
        message: message,
        duration:duration?duration:2000
      }
    );
    toast.present();
  }
  isAuthenticated() {
    return this.authState.value;
  }
}
