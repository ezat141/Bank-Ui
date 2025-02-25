import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../../services/account/account.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-accounts',
  imports: [ReactiveFormsModule, NgIf, NgForOf, CommonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent implements OnInit {
  accounts: any[] = [];
  selectedAccount: any = null;
  transactionType: 'deposit' | 'withdraw' | null = null;
  transactionForm: FormGroup;

  constructor(private accountService: AccountService, private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      amount: ['', Validators.required],
      cvv: [''],
    });
  }
  ngOnInit(): void {
    this.accountService.getUserAccounts().subscribe({
      next: (data) => {
        console.log(data);
        this.accounts = data;
      },
      error: (error) => console.error('Error fetching accounts', error),
    });
  }

  selectAccountForTransaction(account: any, type: 'deposit' | 'withdraw') {
    this.selectedAccount = account;
    this.transactionType = type;
    if (type === 'withdraw') {
      this.transactionForm
        .get('cvv')
        ?.setValidators([Validators.required]);
    } else {
      this.transactionForm.get('cvv')?.clearValidators();
    }
    this.transactionForm.get('cvv')?.updateValueAndValidity();
    this.transactionForm.reset();
  }

  performTransaction() {
    if (this.transactionForm.valid && this.selectedAccount) {
      const amount = this.transactionForm.value.amount;
      if (this.transactionType === 'deposit') {
        this.accountService
          .deposit(this.selectedAccount.cardNumber, amount)
          .subscribe({
            next: (response) => {
              console.log('Deposit successful:', response);
              if (response.success) {
                this.resetTransaction();
                this.refreshAccounts();
              }
            },
            error: (error) => {
              console.error('Deposit failed:', error);
            },
          });
      } else if (this.transactionType === 'withdraw') {
        const cvv = this.transactionForm.value.cvv;
        this.accountService
          .withdraw(this.selectedAccount.cardNumber, cvv, amount)
          .subscribe({
            next: (response) => {
              console.log('Withdrawal successful:', response);
              if (response.success) {
                this.resetTransaction();
                this.refreshAccounts();
              }
              
            },
            error: (error) => {
              console.error('Withdrawal failed:', error);
            },
          });
      }
    }
  }

  /** Reset transaction state */
  public resetTransaction() {
    this.transactionForm.reset();
    this.selectedAccount = null;
    this.transactionType = null;
  }

  /** Refresh the accounts list after a transaction */
  private refreshAccounts() {
    this.accountService.getUserAccounts().subscribe({
      next: (accounts) => (this.accounts = accounts),
      error: (error) => console.error('Failed to refresh accounts:', error),
    });
  }
}
