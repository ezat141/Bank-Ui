import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account/account.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AsyncPipe, CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  accountBalance$!: Observable<any>;
  cardNumber$!: Observable<String>;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cardNumber$ = this.accountService.getAccountCardNumber();
    console.log(this.cardNumber$)
    this.accountBalance$ = this.accountService.getAccountBalance();
  }

  viewTransactions() {
    this.router.navigate(['transactions']);
  }
}
