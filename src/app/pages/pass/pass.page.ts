/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */

import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { $ } from 'protractor';
import { createAnimation } from '@ionic/angular';
import { Animation } from '@ionic/angular';
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */

import { AnimationController } from '@ionic/angular';
import { toastController } from '@ionic/core';
import { pass } from 'src/app/model/pass';
import { Usuario } from 'src/app/model/Usuario';
import { DBTaskService } from 'src/app/services/dbtask.service';
import { ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { Sesion } from 'src/app/model/Sesion';
import { observable } from 'rxjs';
@Component({
  selector: 'app-pass',
  templateUrl: './pass.page.html',
  styleUrls: ['./pass.page.scss'],
})
export class PassPage implements OnInit, AfterViewInit {
  [x: string]: any;
  @ViewChild('titulo3', { read: ElementRef, static: true }) titulo3: ElementRef;
  @ViewChild('ti4', { read: ElementRef, static: true }) ti4: ElementRef;
  @ViewChild('ti5', { read: ElementRef, static: true }) ti5: ElementRef;
  @ViewChild('ti6', { read: ElementRef, static: true }) ti6: ElementRef;
  @ViewChild('ti7', { read: ElementRef, static: true }) ti7: ElementRef;

  public sesion: Sesion = new Sesion();
  public validarUsuario(sesion: Sesion): boolean {
    const mensajeError = sesion.validarUsuario();

    if (mensajeError) {
      this.mostrarMensaje(mensajeError);
      return false;
    }

    return true;
  }

  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private alertController: AlertController,
    private animationController: AnimationController,
    private DBTaskService: DBTaskService,
    public toastController: ToastController
  ) {
    this.sesion = new Sesion();
    this.sesion.Password = '';
    this.sesion.Password2 = '';
    this.sesion.User_name = '';
    this.sesion.segundo_apellido_materno = '';
    this.active = 1;
  }
  public ngAfterViewInit(): void {
    // eslint-disable-next-line prefer-const
    let animation = this.animationController
      .create()
      .addElement(this.titulo3.nativeElement)
      .addElement(this.ti4.nativeElement)
      .addElement(this.ti5.nativeElement)
      .addElement(this.ti6.nativeElement)
      .addElement(this.ti7.nativeElement)
      .duration(4000)

      .fromTo('opacity', 0.1, 5);

    document.querySelector('#limpiar2').addEventListener('click', () => {
      animation.play();
    });
  }

  public ngOnInit(): void {}

  public Restableser(): void {
    const sesion = new Sesion();
    sesion.Password = this.sesion.Password;
    sesion.Password2 = this.sesion.Password2;
    sesion.User_name = this.sesion.User_name;
    sesion.segundo_apellido_materno = this.sesion.segundo_apellido_materno;
    sesion.active = this.sesion.active;
    this.DBTaskService.actualizarClave(sesion);
    this.presentToast('Contraseña actualizada');
    const navigationExtras: NavigationExtras = {
      state: {
        sesion: this.sesion.User_name,
      },
    };
    this.router.navigate(['/login'], navigationExtras);
  }
  public limpiarFormulario(): void {
    for (const [key, value] of Object.entries(this.sesion)) {
      Object.defineProperty(this.sesion, key, { value: '' });
    }
  }

  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 6000,
    });
    toast.present();
  }
  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      // eslint-disable-next-line object-shorthand
      message: message,
      duration: duration ? duration : 2000,
    });
    toast.present();
  }
}
