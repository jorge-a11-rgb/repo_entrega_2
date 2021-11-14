import { Component, OnInit, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { APIClientService } from 'src/app/services/apiclient.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage {

  userName = '';
  usuarios: any;
  publicacion: any = {
    userId: 1,
    id: null,
    title: '',
    body: '',
    name: ''
  };
  publicaciones: any;
  publicacionSeleccionada: string;

  constructor(
    private api: APIClientService,
    private toastController: ToastController,
    private authenticationService: AuthenticationService) {
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

  cambiarUsuario($event: number) {
    this.setPublicacion($event, null, '', '', '');
  }


  limpiarPublicacion() {
    this.setPublicacion(null, null, '', '', '');
  }
  setPublicacion(userId, pubId, title, body, name) {


    this.publicacion.userId = userId;
    this.publicacion.id = pubId;
    this.publicacion.title = title;
    this.publicacion.body = body;
    this.publicacion.name = name;

    const uid = userId === null? 'no seleccionado' : userId;
    const pid = pubId === null? 'nueva' : pubId;
    this.publicacionSeleccionada = `(userId: ${uid} - pubId: ${pid})`;
  }



  getPublicaciones() {

    this.api.getPublicaciones().subscribe((publicaciones) => {

      this.api.getUsuarios().subscribe((usuarios) => {
        publicaciones.forEach(publicacion => {
          publicacion.name = usuarios.find(u => u.id === publicacion.userId).name;
        });

        publicaciones.reverse();
        this.publicaciones = publicaciones;
      });
    });
  }

  guardarPublicacion() {
    if (this.publicacion.title.trim() === '') {
      this.mostrarMensaje('Antes de hacer una publicación debe llenar el título.');
      return;
    }
    if (this.publicacion.body.trim() === '') {
      this.mostrarMensaje('Antes de hacer una publicación debe llenar el cuerpo.');
      return;
    }
    if (this.publicacion.id === null) {
      this.crearPublicacion();
    }
    else {
      this.actualizarPublicacion();
    }
  }

  crearPublicacion() {
    this.api.createPublicacion(this.publicacion).subscribe(
      (data) => {
        this.mostrarMensaje(`PUBLICACION CREADA CORRECTAMENTE: ${data.id} ${data.title}...`);
        this.limpiarPublicacion();
        this.getPublicaciones();
      },
      (error) => this.mostrarError('NO FUE POSIBLE CREAR LA PUBLICACION.', error)
    );
  }
  actualizarPublicacion() {
    this.api.updatePublicacion(this.publicacion).subscribe(
      (data) => {
        this.mostrarMensaje(`PUBLICACION ACTUALIZADA CORRECTAMENTE: ${data.id} ${data.title}...`);
        this.limpiarPublicacion();
        this.getPublicaciones();
      },
      (error) => this.mostrarError('NO FUE POSIBLE ACTUALIZAR LA PUBLICACION.', error)
    );
  }

  editarPublicacion($event){
    const pub = $event;
    this.setPublicacion(pub.userId, pub.id, pub.title, pub.body, pub.name);
    document.getElementById('topOfPage').scrollIntoView({block: 'end', behavior: 'smooth'});
  }
  eliminarPublicacion($event){
    const pubId = $event.id;
    this.api.deletePublicacion(pubId).subscribe(
      (data) => {
        this.mostrarMensaje(`PUBLICACION ELIMINADA CORRECTAMENTE: ${pubId}...`);
        this.limpiarPublicacion();
        this.getPublicaciones();
      },
      (error) => this.mostrarError('NO FUE POSIBLE ELIMINAR LA PUBLICACION.', error)
    );
  }
  getIdentificadorItemPublicacion(index, item) {
    return item.id;
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: 'success'
    });
    toast.present();
  }
  async mostrarError(mensaje, error) {
    console.log(mensaje);
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: 'danger'
    });
    toast.present();
    throw error;
  }

}
