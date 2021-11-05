export class ValidacionUs {
  public nombreUsuario = '';


  public validarNombreUsuario(): string {
    if (this.nombreUsuario.trim() === '') {
      return 'Para ingresar al sistema debe ingresar un nombre de usuario.';
    }
    if (this.nombreUsuario.trim() !== 'Jorge12') {
      return 'El nombre de usuario es incorrecto';
    }
    return '';
  }


  public validarUsuario(): string {
    return this.validarNombreUsuario();
  }
}
