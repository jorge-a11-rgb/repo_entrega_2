/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */

import {
  Component,
  OnInit,
  ɵisDefaultChangeDetectionStrategy,
} from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {
  AlertController,
  AnimationController,
  ToastController,
} from '@ionic/angular';
import { DBTaskService } from 'src/app/services/dbtask.service';

import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Sesion } from 'src/app/model/Sesion';
import { Usuario } from 'src/app/model/Usuario';
import { observable } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit, AfterViewInit {
  @ViewChild('i', { read: ElementRef, static: true }) i: ElementRef;

  public sesion: Sesion = new Sesion();

  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private alertController: AlertController,
    private animationController: AnimationController,
    private DBTaskService: DBTaskService,
    public toastController: ToastController
  ) {
    this.sesion = new Sesion();
    this.sesion.User_name = '';
    this.sesion.Password = null;
    this.sesion.Password2 = null;
    this.sesion.segundo_apellido_materno = '';
  }

  ngOnInit(): void {}
  public ngAfterViewInit(): void {
    // eslint-disable-next-line prefer-const
    let animation = this.animationController
      .create()
      .addElement(this.i.nativeElement)
      .iterations(Infinity)
      .duration(1500)
      .fromTo('opacity', 0.1, 5);
    animation.play();
  }
  public validarUsuario(sesion: Sesion): boolean {
    const mensajeError = sesion.validarUsuario();
    if (mensajeError !== undefined && mensajeError!=='') {
      this.mostrarMensaje(mensajeError);
      return false;
    }

    return true;
  }
  registrar() {
    const sesion = new Sesion();
    sesion.User_name = this.sesion.User_name;
    sesion.segundo_apellido_materno = this.sesion.segundo_apellido_materno;
    sesion.Password = this.sesion.Password;
    sesion.Password2 = this.sesion.Password2;
    sesion.active = 0;
    if (!this.validarUsuario(this.sesion)) {

      return;
    } else {
      this.DBTaskService.createSesionData(sesion);
      this.presentToast('Usuario registrado');
      this.router.navigate(['login']);
    }
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
      message: message,
      duration: duration ? duration : 2000,
    });
    toast.present();
  }
}
