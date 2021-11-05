import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
  public authenticationService: AuthenticationService,
  public router: Router)
  { }
  canActivate(): boolean{
    return this.authenticationService.isAuthenticated();
  }
}
