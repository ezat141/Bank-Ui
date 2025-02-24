import { Injectable } from '@angular/core';
import { getToken, localhost } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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

  deactivateUser(id:number):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${getToken()}`);
    return this.http.put<any>(`${this.baseUrl}/user/${id}/deactivate`, {}, {headers});

  }
  activateUser(id:number):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${getToken()}`);
    return this.http.put<any>(`${this.baseUrl}/user/${id}/activate`, {}, {headers});
  }
}
