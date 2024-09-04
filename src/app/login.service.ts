import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  
  baseUrl: string = import.meta.env.NG_APP_PUBLIC_DBURL;
  
  constructor(public http: HttpClient) { }

  getUserList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'login');
  }

 // Update the details of an item
  updatePassword(id: number, data: any): Observable<any> {
    console.log(id);
    console.log(data);
    return this.http.put(`${this.baseUrl}login/${id}`, data);
  }

 
}
