import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  registerOrder(order: any): Observable<any> {
    return this.http.post(this.baseUrl, order);
  }

  deleteOrder(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  updateOrder(order: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/${order.orderId}`, order);
}


  updateOrderStatus(id: any, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/status?status=${status}`, {});
  }
}
