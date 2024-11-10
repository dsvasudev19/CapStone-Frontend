import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  private apiUrl = environment.baseUrl + '/buses';
  constructor(private http: HttpClient) {}

  getAllBuses(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addNewBus(data:any):Observable<any>{
    return this.http.post(this.apiUrl,data)
  }

  addScheduleToBus(busId:number,scheduleData:any):Observable<any>{
    return this.http.post(this.apiUrl+`/${busId}/schedules`,scheduleData)
  }

  deleteBusById(id:number):Observable<any>{
    return this.http.delete(this.apiUrl+`/${id}`)
  }
}
