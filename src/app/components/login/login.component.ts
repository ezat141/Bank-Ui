import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AccountLogin} from "../../models/accountLogin/account-login";
import {getToken, saveToken} from "../../environments/environments";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.authService.authenticate(this.loginForm.value as AccountLogin).subscribe({
        next: response => {
          saveToken(response.token);
          console.log('Saved token:', getToken());
          this.authService.IsValidToken().subscribe(isValid => {
            console.log('Is token valid?', isValid);
            if(isValid){
              const role = this.authService.getUserRole();
              console.log('User role:', role);
              if(role === 'ADMIN'){
                this.router.navigate(['/admin']);
              }
              else{
                this.router.navigate(['home']);
              }

            }else{

            console.error('Invalid token received');
            }
          })
        },
        error: error => {
          console.error('Login failed', error);
        }
      });
    }
  }
}
