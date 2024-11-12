import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  apiUrl=environment.baseUrl+"/notifications";

  getAllNotificationsOfUser(userId:number):Observable<any>{
    return this.http.get<any>(this.apiUrl+`/user/${userId}`)
  }
}
