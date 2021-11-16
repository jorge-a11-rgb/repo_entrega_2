/* eslint-disable prefer-const */

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { $ } from 'protractor';

import { createAnimation } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, AfterViewInit {
  [x: string]: any;

  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;
  @ViewChild('titulo2', { read: ElementRef, static: true}) titulo2: ElementRef;

  nombreUsuario = '';
  userName = '';
  usuarios: any;
   constructor(
        private animationController: AnimationController
        ,private router: Router
        ,private activateroute: ActivatedRoute
        ,private alterControler: AlertController
        ,public authenticationService: AuthenticationService
        ,public storage: Storage)
      {
        this.storage.get('USER_DATA')
        .then(
          (response) => {
            console.log('USER_DATA fue obtenido');
            console.log('Ver contenido de response');
            console.log(response);

            if(response !== null){
              console.log('Logro obtener USER_DATA  .');
              this.nombreUsuario = response.user_name;
            } else {
              console.log('No logro obtener USER_DATA.');
            }
            return true;
          },
          (resp) => {
            console.log('No logro obtener USER_DATA.');
          }
        );
      }

  public ngAfterViewInit(): void {

    let animation = this.animationController.create()
      .addElement(this.titulo.nativeElement)
      .addElement(this.titulo2.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'translate(0px)', 'translate(100px)')
      .fromTo('opacity', 1, 0.2);

    animation.play();
  }


ngOnInit() {
  console.log('Ejecutando ngOnInit');
}

cerrarSesion() {
  this.authenticationService.logout();
}
ionViewWillEnter() {
  this.authenticationService.getUserDataFromStorage().then(
    (response) => {
      console.log('ionViewWillEnter');
      console.log(response);
      this.userName = response.user_name;
    }
  );
  this.setPublicacion(null, null, '', '', '');
  this.getPublicaciones();
}

}
