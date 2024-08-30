import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  httpClient = inject(HttpClient);
  baseUrl = import.meta.env.NG_APP_PUBLIC_DBURL;

  login(data: any) {
    return this.httpClient.post(`${this.baseUrl}login`, data)
    .pipe(tap((result) => {
      localStorage.setItem('authUser', JSON.stringify(result));
    }));
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
   
    return localStorage.getItem('authUser') !== null;
    
  }
}
