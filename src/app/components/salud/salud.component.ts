/* eslint-disable prefer-const */

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


import { createAnimation } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';






@Component({
  selector: 'app-salud',
  templateUrl: './salud.component.html',
  styleUrls: ['./salud.component.scss'],
})
export class SaludComponent implements OnInit, AfterViewInit {
  [x: string]: any;

  @ViewChild('titulo3', { read: ElementRef, static: true}) titulo3: ElementRef;



   constructor(
        private animationController: AnimationController
        ,private router: Router
        ,private activateroute: ActivatedRoute
        ,private alterControler: AlertController) {
          if (this.router.getCurrentNavigation().extras.state) {
            this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
          }
        }

  public ngAfterViewInit(): void {
    let animation = this.animationController.create()
      .addElement(this.titulo3.nativeElement)
      .duration(4000)
      .iterations(Infinity)
      .fromTo('opacity', 1, 0.2);

    animation.play();
  }


public ngOnInit() {

}



}
