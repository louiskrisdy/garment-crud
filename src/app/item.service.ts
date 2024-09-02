import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ItemService {
  
  baseUrl: string = import.meta.env.NG_APP_PUBLIC_DBURL;
  
  constructor(private http: HttpClient) { }

  // Get item list
  getItemList(): Observable<any> {
    return this.http.get(this.baseUrl + 'items');
  }

  // Add new item to the inventory
  addItem(data: any): Observable <any> {
    return this.http.post(this.baseUrl + 'items', data);
  }

  // Update the details of an item
  updateItem(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}items/${id}`, data);
  }

  // Delete an item
  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}items/${id}`);
  }

}
