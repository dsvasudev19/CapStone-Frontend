import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getActiveUsersCount(): Observable<any> {
    return this.http.get(this.apiUrl + '/users/user-count');
  }

  getActiveRoutesCount(): Observable<any> {
    return this.http.get(this.apiUrl + '/routes/count');
  }

  getOperatingBusesCount(): Observable<any> {
    return this.http.get(this.apiUrl + '/buses/count');
  }

  getCarPoolBookingsCount():Observable<any>{
    return this.http.get(this.apiUrl+"/carpools/bookings-count")
  }


  getRegistrationsDataForTheYear(): Observable<any> {
    let today = new Date();
    let year = today.getFullYear();
    return this.http.get(this.apiUrl + '/users/registrations/' + year);
  }


}
