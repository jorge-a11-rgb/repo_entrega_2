import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';

import { ToastController } from '@ionic/angular';
import { Usuario_pass2 } from 'src/app/model/Ususario_pass2';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pass2',
  templateUrl: './pass2.page.html',
  styleUrls: ['./pass2.page.scss'],
})
export class Pass2Page implements OnInit, AfterViewInit {
  @ViewChild('titulo4', { read: ElementRef, static: true}) titulo4: ElementRef;
  @ViewChild('titulo5', { read: ElementRef, static: true}) titulo5: ElementRef;



  public usuario: Usuario_pass2;

  constructor(private router: Router, private toastController: ToastController, private activeroute: ActivatedRoute
    , private alertController: AlertController
    , private animationController: AnimationController) {
    this.usuario = new Usuario_pass2();
    this.usuario.password1 = '';
    this.usuario.password2 = '';
  }
  public ngAfterViewInit(): void {
    // eslint-disable-next-line prefer-const
    let animation = this.animationController.create()
      .addElement(this.titulo4.nativeElement)
      .addElement(this.titulo5.nativeElement)
      .duration(1500)
      .fromTo('transform', 'translate(0px)', 'translate(100px)')
      .fromTo('opacity', 0.10, 1);

      document.querySelector('#limpiar3').addEventListener('click', () => {
        animation.play();
      });
  }
  public ngOnInit(): void {

  }

  public ingresar(): void {

    if(!this.validarUsuario(this.usuario)) {
      return;
    }

    this.mostrarMensaje('Contraseña reestablecida');


    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/login'], navigationExtras);
  }


  public validarUsuario(usuario: Usuario_pass2): boolean {

    const mensajeError = usuario.validarpass();

    if (mensajeError) {
      this.mostrarMensaje(mensajeError);
      return false;
    }

    return true;
  }

  /**
   * Muestra un toast al usuario
   *
   * @param mensaje Mensaje a presentar al usuario
   * @param duracion Duración el toast, este es opcional
   */
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
  public limpiarFormulario(): void{
    for (const [key, value] of Object.entries(this.usuario)) {
      Object.defineProperty(this.usuario, key, {value: ''});
  }

}

}
