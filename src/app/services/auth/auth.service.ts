import { Injectable } from '@angular/core';
import {getToken, localhost} from "../../environments/environments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import { AccountLogin } from '../../models/accountLogin/account-login';
import { AccountRegister } from '../../models/accountRegister/account-register';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = localhost();

  constructor(private http: HttpClient) { }

  authenticate(accountLoginDetails: AccountLogin): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/authenticate`, accountLoginDetails);
  }

  register(accountRegisterDetails: AccountRegister): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, accountRegisterDetails);
  }

  IsValidToken(): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${getToken()}`);
    return this.http.get<any>(`${this.baseUrl}/token/validation`, {headers}).pipe(
      map(response => response.status === 'success'),
      catchError(error => of(false))
    );
  }
}
