import { Component } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-account',
  imports: [NgIf, RouterLink],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  accountCreated = false;
  newAccount:any;
  errorMessage:string | null = null;
  constructor(private accountService: AccountService, private router: Router) {}

  createAccount(){
    this.accountService.createAccount().subscribe({
      next: (response) => {
        this.newAccount = response;
        this.accountCreated = true;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = 'Failed to create account. Please try again.';
        console.error('Error creating account', error);
      }
    })

  }

}
