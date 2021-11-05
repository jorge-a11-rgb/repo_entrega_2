/* eslint-disable id-blacklist */
/* eslint-disable @typescript-eslint/naming-convention */
export class Sesion {
  public User_name: string;
  public Password: string;
  public Password2: string;
public segundo_apellido_materno: string;
public active = 1;



  public validarNombreUsuario(): string {
    if (this.User_name.trim() === '') {
      return 'Para ingresar al sistema debe ingresar un nombre de usuario.';
    }

  }

  public validarPassword(): string {
    if (this.Password.trim() === '') {
      return 'Para entrar al sistema debe ingresar la contraseña';
    }
    if(this.Password !== this.Password2){
      return 'Las claves deben ser iguales';
    }
  }

  public validarUsuario(): string {
    return this.validarNombreUsuario()
      || this.validarPassword();
  }
}
