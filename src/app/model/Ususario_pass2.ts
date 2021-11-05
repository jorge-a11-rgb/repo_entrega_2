// eslint-disable-next-line @typescript-eslint/naming-convention
export class Usuario_pass2 {
  public password1 = '';
  public password2 = '';

  public validarPassword1(): string {
    if (this.password1.trim() === '') {
      return 'Para restablecer la cuenta debe ingresar la contraseña';
    }
    for(let i = 0; i < this.password1.length; i++) {
      if ('0123456789'.indexOf(this.password1.charAt(i)) === -1) {
        return 'La contraseña debe ser numérica';
      }
    }
    if (this.password1.length > 4) {
      return 'La contraseña debe ser numérica de 4 dígitos';
    }
    return '';
  }

  public validarPassword2(): string {
    if (this.password2.trim() === '') {
      return 'Debe repetir la contraseña';
    }
    for(let i = 0; i < this.password2.length; i++) {
      if ('0123456789'.indexOf(this.password2.charAt(i)) === -1) {
        return 'La contraseña debe ser numérica';
      }
    }
    if (this.password2.length > 4) {
      return 'La contraseña debe ser numérica de 4 dígitos';
    }
    if(this.password2.trim()!==this.password1){
      return 'Las contraseñas deben ser iguales';
    }
    return '';
  }

  public validarpass(): string {
    return this.validarPassword1()
      || this.validarPassword2();
  }
}
