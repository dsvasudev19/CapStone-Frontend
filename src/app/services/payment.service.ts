import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }
  
  private apiUrl=environment.baseUrl+"/payment";

  getAllPaymentTransactions():Observable<any>{
    return this.http.get(this.apiUrl+"/transactions");
  }

}
