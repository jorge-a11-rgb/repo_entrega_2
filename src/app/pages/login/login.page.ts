/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

import { DBTaskService } from 'src/app/services/dbtask.service';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Usuario_pass } from 'src/app/model/Usuario_pass';
import { ActivatedRoute } from '@angular/router';
   @Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public us: Usuario_pass = new Usuario_pass();

  field: string = '';

  constructor(
    public toastController: ToastController,
    public dbtaskService: DBTaskService,
    public alertController: AlertController,
    private activeroute: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    public authenticationService: AuthenticationService
  ) {
    this.us = new Usuario_pass();
    this.us.nombreUsuario = '';
    this.us.clave = null;
    const navigationExtras: NavigationExtras = {
    state: {
    usuario: this.us.nombreUsuario
  }
};}
  ngOnInit() {}
  /**
   * Función que permite el inicio de sesión y acceder
   * * al Home
   */
  ingresar() {

    // Se valida que el usuario ingreso todos los datos
    if (this.validateModel(this.us)) {
      // Se obtiene si existe alguna data de sesión
      this.authenticationService.login(this.us);
    } else {
      // eslint-disable-next-line @typescript-eslint/quotes
      this.presentToast('Falta: ' + this.field);
    }
  }
  registrar() {
    this.createSesionData(this.us);
  }
  /*** Función que genera (registra) una nueva sesión
   * @param login
   */
  createSesionData(login: any) {
    if (this.validateModel(login)) {
      // Se valida que se ingresen todos los datos
      /**
       * Se hace una copia del login, se hace así ya que
       * el operador '=' no haceuna copia de los datos, si no
       * que crea una nueva referencia a los mismos datos.
       * Por eso se utiliza el Object.assign
       */
      // eslint-disable-next-line prefer-const
      let copy = Object.assign({}, login);
      copy.Active = 1; // Se agrega el valor active = 1 a la copia
      this.dbtaskService
        .createSesionData(copy) // la copia se le apsa a la función para crear la sesion
        .then((data) => {
          // si la sentencia se ejecuto correctamente
          // eslint-disable-next-line @typescript-eslint/quotes
          this.presentToast('Bienvenido'); // Se muestra el mensaje de bienvenido
          // eslint-disable-next-line @typescript-eslint/quotes
          this.storage.set('USER_DATA', data); // Se setea el USER_DATA en el storage
          this.router.navigate(['home']); // Se navega hasta el home
          const navigationExtras: NavigationExtras = {
            state: {
              usuario: this.us.nombreUsuario
            }
          };

        })
        .catch((error) => {
          // eslint-disable-next-line @typescript-eslint/quotes
          this.presentToast('El usuario ya existe');
        });
    } else {
      // eslint-disable-next-line @typescript-eslint/quotes
      this.presentToast('Falta: ' + this.field);
    }
  }
  /**
   * validateModel sirve para validar que se ingrese algo en los
   * campos del html mediante su modelo
   */
  validateModel(model: any) {
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    // eslint-disable-next-line no-var
    for (var [key, value] of Object.entries(model)) {
      // Si un valor es "" se retornara false y se avisara de lo faltante
      // eslint-disable-next-line @typescript-eslint/quotes
      if (value === '') {
        // Se asigna el campo faltante
        this.field = key;
        // Se retorna false
        return false;
      }
    }
    return true;
  }
  /*** Muestra un toast al usuario
   * @param message Mensaje a presentar al usuario
   * @param duration Duración el toast, este es opcional
   */
  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      // eslint-disable-next-line object-shorthand
      message: message,
      duration: duration ? duration : 2000,
    });
    toast.present();
  }
  /**
   * Función parte del ciclo de vida de un componente
   */
   ionViewWillEnter(){
    // console.log('ionViewDidEnter');
    //   console.log('// Se valida que exista una sesión activa');
    //   this.dbtaskService.sesionActive()
    //   .then((data)=>{
    //     console.log(data);
    //     console.log('// Revisar si data es undefined');
    //     if(data !== undefined){
    //       console.log('// data NO es undefined');
    //       console.log('// Grabar USER_DATA con metodo set');
    //       this.storage.set('USER_DATA', data);
    //       console.log('// Navegar a home');
    //       this.router.navigate(['home']);
    //     }
    //   })
    //   .catch((error)=>{
    //     console.log('No pudo obtener la sesiòn activa con this.dbtaskService.sesionActive()');
    //     console.error(error);
    //     this.router.navigate(['login']);
    //     const navigationExtras: NavigationExtras = {
    //       state: {
    //         usuario: this.us.nombreUsuario
    //       }
    //     };
    //   });
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Creación de Usuario',
      message:
        'Mensaje <strong>El usuario no existe, desea registrarse?</strong>',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
        },
        {
          text: 'SI',
          handler: () => {
            this.createSesionData(this.us);
          },
        },
      ],
    });

    await alert.present();
  }
  public limpiarFormulario(): void {
    for (const [key, value] of Object.entries(this.us)) {
      Object.defineProperty(this.us, key, { value: '' });
    }
  }
}
