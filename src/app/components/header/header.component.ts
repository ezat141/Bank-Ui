import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { getToken, logOut } from '../../environments/environments';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router, private authService: AuthService) {
  }
  isAuthenticated() {
    return getToken() != null && this.authService.IsValidToken();
  }

  get isAdmin(): boolean {
    const role = this.authService.getUserRole();
    return role === 'ADMIN';
  }

  logout() {
    logOut()
    this.router.navigate(['']);
  }
}
