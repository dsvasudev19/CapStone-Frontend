import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private url=environment.baseUrl+'/users';

  getAllUsers():Observable<any>{
    return this.http.get(this.url);
  }

  getUserById(id:number):Observable<any>{
    return this.http.get(this.url+`/${id}`)
  }

  addNewUser(data:any):Observable<any>{
    return this.http.post(this.url,data);
  }

  updateUserDetails(id:number,data:any):Observable<any>{
    return this.http.put(this.url+`/${id}`,data)
  }

  deleteUserById(id:number):Observable<any>{
    return this.http.delete(this.url+`/${id}`)
  }

  getAllOperators():Observable<any>{
    return this.http.get(this.url+"/operators")
  }

  deleteOperatorById(id:number):Observable<any>{
    return this.http.delete(this.url+`/${id}`)
  }
}