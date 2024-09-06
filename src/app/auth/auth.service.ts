import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor() { }

  httpClient = inject(HttpClient);
  baseUrl = import.meta.env.NG_APP_PUBLIC_DBURL;

  login(data: any) {
    this.httpClient.get<any>(`${this.baseUrl}login`)
    .subscribe(res => {
      const user = res.find((curr: any) => {
        return curr.username === data.username && curr.password === data.password;
      });

      if(user) {
        localStorage.setItem('authUser', JSON.stringify(user));
      }
    
    })
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }

  usernameMatched(data: any) {
    this.httpClient.get<any>(`${this.baseUrl}login`).subscribe(res => {
      const user = res.find((curr: any) => {
        return curr.username === data.username;
      });

      if(user) {
        localStorage.setItem('exist', JSON.stringify(user));
      }
    })
  }

  setToken() {
    localStorage.setItem('resetPasswordToken', 'true');
  }

  tokenIsSet() {
    return localStorage.getItem('resetPasswordToken') !== null;
  }

  removeToken() {
    localStorage.removeItem('resetPasswordToken');
  }

}
