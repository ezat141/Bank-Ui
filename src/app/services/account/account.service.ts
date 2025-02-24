import { Injectable } from '@angular/core';
import {getToken, localhost} from "../../environments/environments";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = localhost();

  constructor(private http: HttpClient) { }

  getAccountBalance() : Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${getToken()}`);
    return this.http.get<any>(`${this.baseUrl}/account/balance`, {headers});
  }

  getAccountTransactions(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${getToken()}`);
    return this.http.get<any>(`${this.baseUrl}/account/transactions`, {headers});
  }

  getAccountCardNumber(): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${getToken()}`);
    return this.http.get<string>(`${this.baseUrl}/account/cardNumber`, {headers});
  }

  createAccount(): Observable<any> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${getToken()}`);
      return this.http.post<any>(`${this.baseUrl}/account`, {}, { headers });



  }
}
