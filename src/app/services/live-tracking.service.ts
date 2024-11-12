import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LiveTrackingService {
  apiUrl=environment.baseUrl+"/realtime"
  constructor(private http:HttpClient) { }

  getLiveLocation(busId:number):Observable<any>{
    return this.http.get<any>(this.apiUrl+`/bus/${busId}`)
  }

  postLiveLocation(busId:number,data:any):Observable<any>{
    return this.http.post<any>(this.apiUrl+`/${busId}`,data)
  }

}
