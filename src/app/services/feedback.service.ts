import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient) { }

  private apiUrl=environment.baseUrl+'/feedback'

  getAllFeedbacks():Observable<any>{
    return this.http.get(this.apiUrl)
  }

  deleteFeedbackById(id:number):Observable<any>{
    return this.http.delete(this.apiUrl+`/${id}`)
  }
  
}
