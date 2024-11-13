import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CarpoolService {

  constructor(private http:HttpClient) { }

  private apiUrl=environment.baseUrl+"/carpools"

  getAllCarPoolServices():Observable<any>{
    return this.http.get(this.apiUrl)
  }

  deleteCarPoolService(id:number):Observable<any>{
    return this.http.delete(this.apiUrl+`/${id}`)
  }

  reserveASeatInCarPool(carPoolId:number, userId:number):Observable<any>{
    return this.http.post<any>(this.apiUrl+`/${carPoolId}/users/${userId}`,{})
  }

  addNewCarPoolService(data:any):Observable<any>{
    return this.http.post<any>(this.apiUrl,data)
  }

  getRecentBookingsOfUser(userId:number):Observable<any>{
    return this.http.get<any>(this.apiUrl+`/recent-bookings/${userId}`)
  }


}
