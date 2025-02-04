import { CurrencyPipe, DatePipe, JsonPipe, NgClass, NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap, interval } from 'rxjs';
import { AccountService } from '../../services/account/account.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    JsonPipe,
    DatePipe,
    CurrencyPipe,
    TitleCasePipe

  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger(100, [
            animate('0.3s ease-out', style({ opacity: 1, transform: 'none' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('itemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('0.2s ease-out', style({ opacity: 1, transform: 'none' }))
      ]),
      transition(':leave', [
        animate('0.2s ease-in', style({ opacity: 0, transform: 'translateX(20px)' }))
      ])
    ]),
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.2s ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class TransactionsComponent implements OnInit, OnDestroy {
  transactions!: any[];
  subscription!: Subscription;
  constructor(private accountService: AccountService) { }
  ngOnInit(): void {
    this.getAccountTransactions();
    this.subscription = interval(10000).subscribe(() => {
      this.getAccountTransactions();
    });



  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



  getAccountTransactions():void {
    this.accountService.getAccountTransactions().pipe(
      tap(transactions => {
      this.transactions = transactions;
      })
    ).subscribe({
      error: error => {
      console.error('Error fetching transactions:', error);
      }
    });
  }

  trackById(index: number, transaction: any): string {
    return `${transaction.createdAt}_${transaction.amount}_${transaction.transactionType}`;
  }

  getTransactionIcon(type: string): string {
    switch(type) {
      case 'DEPOSIT':
        return 'fas fa-arrow-circle-down text-success';
      case 'WITHDRAWAL':
        return 'fas fa-arrow-circle-up text-danger';
      default:
        return 'fas fa-exchange-alt text-primary';
    }
  }
}

