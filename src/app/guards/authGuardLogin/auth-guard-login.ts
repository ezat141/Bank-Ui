import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../../services/auth/auth.service";
import { getToken } from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLogin implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!getToken() || !this.authService.IsValidToken()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
