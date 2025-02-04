import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { localhost, saveToken } from '../../environments/environments';
import { AccountRegister } from '../../models/accountRegister/account-register';
import { AuthService } from '../../services/auth/auth.service';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11)]],
      address: ['', Validators.required]
    });
  }


  submitForm() {
    if (this.signupForm.valid) {
        this.authService.register(this.signupForm.value as AccountRegister).subscribe({
          next: response => {
            saveToken(response.token)
            this.router.navigate(['home']);
            console.log(response);
          },
          error: error => {
            console.error('There was an error!', error);
          }
        });
    }
  }
}
