import { Injectable } from '@angular/core';
import { getToken, localhost } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = localhost();

  constructor(private http: HttpClient) { }

  getAllUsers():Observable<any[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${getToken()}`);
    return this.http.get<any[]>(`${this.baseUrl}/user/users`, {headers});
  }
}
